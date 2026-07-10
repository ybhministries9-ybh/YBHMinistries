import { useState, useEffect, useRef } from 'react';
import { Plus, Trash2, Edit2, Calendar, X, Save, Loader2, Eye, EyeOff } from 'lucide-react';
import { DeleteConfirmDialog } from './DeleteConfirmDialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import DateInput from '../ui/date-input';
import { Textarea } from '../ui/textarea';
import { toast } from 'sonner';
import usePresignUpload from '@/hooks/usePresignUpload';
import { useAdminUser } from '@/hooks/useAdminUser';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogOverlay,
} from '../ui/dialog';

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  type: 'conference' | 'class' | 'record';
  description: string;
  extendedDescription: string;
  capacity: string;
  imageUrl: string;
  videoUrl: string;
  speakers: string[];
  whatToBring: string[];
  registration: {
    enabled: boolean;
    description?: string;
    nationalFee?: number;
    internationalFee?: number;
    registrationFee?: number;
    enable24hrWorshipForm?: boolean;
  };
  published: boolean;
}

export function EventsManager() {
  const { isViewer } = useAdminUser();
  const [dragOverId, setDragOverId] = useState<string | null>(null);
  const [dragOverVideoId, setDragOverVideoId] = useState<string | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [showDiscardConfirm, setShowDiscardConfirm] = useState(false);
  // Validation state: map eventId -> field -> error message
  const [validationErrors, setValidationErrors] = useState<Record<string, Record<string, string>>>({});

  const MAX_VIDEO_BYTES = 300 * 1024 * 1024;

  const { upload: uploadEventVideo, progress: videoUploadProgress, error: videoUploadError, setProgress: setVideoUploadProgress } =
    usePresignUpload({ prefix: 'events/videos' });

  // Character limits
  const LIMITS = {
    title: 100,
    location: 100,
    time: 50,
    capacity: 20,
    description: 200,
    extendedDescription: 2000,
    speaker: 100,
    bringItem: 200,
    registrationDescription: 500,
  } as const;

  // Fetch events from API
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const rawToken = localStorage.getItem('admin_token');
      let token = '';
      if (rawToken) try { token = JSON.parse(rawToken).token || rawToken } catch (e) { token = rawToken }
      const headers = token ? { 'Authorization': `Bearer ${token}` } : undefined;
      const response = await fetch('/api/admin/events', { headers });
      const result = await response.json();
      
      if (result.success) {
        setEvents(result.data);
      } else {
        toast.error('Failed to load events');
      }
    } catch (error) {
      console.error('Error fetching events:', error);
      toast.error('Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    const hasTemp = events.some(e => e.id.startsWith('temp-'));
    if (hasTemp) {
      setShowDiscardConfirm(true);
      return;
    }

    const createNew = () => {
      const newEvent: Event = {
        id: `temp-${Date.now()}`,
        title: '',
        date: '',
        time: '',
        location: '',
        type: 'conference',
        description: '',
        extendedDescription: '',
        capacity: '',
        imageUrl: '',
        videoUrl: '',
        speakers: [],
        whatToBring: [],
        registration: {
          enabled: false,
          description: '',
          nationalFee: 0,
          internationalFee: 0,
          registrationFee: 0,
          enable24hrWorshipForm: false
        },
        published: true
      };
      setEvents(prev => [newEvent, ...prev]);
      setExpandedId(newEvent.id);
      setEditingId(newEvent.id);
    };

    createNew();
  };

  const handleSave = async (event: Event) => {
    try {
      const isNew = event.id.startsWith('temp-');
      const url = '/api/admin/events';
      const method = isNew ? 'POST' : 'PUT';
      const rawToken = localStorage.getItem('admin_token');
      let token = '';
      if (rawToken) try { token = JSON.parse(rawToken).token || rawToken } catch (e) { token = rawToken }
      // If a file was selected for this event, upload it first and replace imageUrl
      let imageUrlToUse = event.imageUrl || '';
      const selectedFile = selectedFilesRef.current.get(event.id);
      if (selectedFile) {
        const fd = new FormData();
        fd.append('file', selectedFile, selectedFile.name);
        const uploadHeaders: Record<string,string> = {};
        if (token) uploadHeaders['Authorization'] = `Bearer ${token}`;
        const uploadResp = await fetch('/api/admin/upload/event-image', {
          method: 'POST',
          headers: uploadHeaders,
          body: fd
        });
        const uploadResult = await uploadResp.json();
        if (uploadResult.success && uploadResult.url) {
          imageUrlToUse = uploadResult.url;
        } else {
          toast.error('Failed to upload event image');
          return;
        }
      }

      // If a video was selected, upload directly to R2 from the client app and store r2:// path
      let videoUrlToUse = event.videoUrl || '';
      const selectedVideo = selectedVideoFilesRef.current.get(event.id);
      if (selectedVideo) {
        if (!isAllowedVideo(selectedVideo)) {
          toast.error('Please select an MP4 or MOV file');
          return;
        }
        if (selectedVideo.size > MAX_VIDEO_BYTES) {
          toast.error('Video must be 300MB or smaller');
          return;
        }

        const uploadResult = await uploadEventVideo(selectedVideo, undefined, { category: 'events', skipConfirm: true });
        if (!uploadResult.ok) {
          toast.error(uploadResult.error || 'Failed to upload event video');
          return;
        }
        const r2Ref = uploadResult.data?.presign?.r2Ref as string | undefined;
        if (!r2Ref) {
          toast.error('Failed to upload event video (missing R2 reference)');
          return;
        }
        videoUrlToUse = r2Ref;
      }

      const headers: Record<string,string> = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const body = { ...event, imageUrl: imageUrlToUse, videoUrl: videoUrlToUse };

      const response = await fetch(url, {
        method,
        headers,
        body: JSON.stringify(body)
      });

      const result = await response.json();
      
      if (result.success) {
        toast.success(isNew ? 'Event created successfully' : 'Event updated successfully');
        setEditingId(null);
        // Close the expanded edit form and show the card
        setExpandedId(null);
        // If we uploaded a file for this event, clear the selected file reference
        if (selectedFile) selectedFilesRef.current.delete(event.id);
        if (selectedVideo) {
          selectedVideoFilesRef.current.delete(event.id);
          setSelectedVideoInfo(prev => {
            if (!prev[event.id]) return prev;
            const copy = { ...prev };
            delete copy[event.id];
            return copy;
          });
          setVideoUploadProgress(null);
        }
        fetchEvents(); // Refresh the list
      } else {
        toast.error(result.error || 'Failed to save event');
      }
    } catch (error) {
      console.error('Error saving event:', error);
      toast.error('Failed to save event');
    }
  };

  const validateEvent = (event: Event) => {
    const errors: Record<string, string> = {};
    if (!event.title || !event.title.trim()) errors.title = 'Title is required';
    else if (event.title.length > LIMITS.title) errors.title = `Title must be ≤ ${LIMITS.title} characters`;

    if (!event.date) errors.date = 'Date is required';
    if (!event.time || !event.time.trim()) errors.time = 'Time is required';
    else if (event.time.length > LIMITS.time) errors.time = `Time must be ≤ ${LIMITS.time} characters`;

    if (!event.location || !event.location.trim()) errors.location = 'Location is required';
    else if (event.location.length > LIMITS.location) errors.location = `Location must be ≤ ${LIMITS.location} characters`;

    if (!event.capacity || !String(event.capacity).trim()) errors.capacity = 'Capacity is required';
    else if (String(event.capacity).length > LIMITS.capacity) errors.capacity = `Capacity must be ≤ ${LIMITS.capacity} characters`;

    if (!event.description || !event.description.trim()) errors.description = 'Short description is required';
    else if (event.description.length > LIMITS.description) errors.description = `Short description must be ≤ ${LIMITS.description} characters`;

    if (!event.extendedDescription || !event.extendedDescription.trim()) errors.extendedDescription = 'Extended description is required';
    else if (event.extendedDescription.length > LIMITS.extendedDescription) errors.extendedDescription = `Extended description must be ≤ ${LIMITS.extendedDescription} characters`;

    // speakers
    for (let i = 0; i < event.speakers.length; i++) {
      const s = event.speakers[i] || '';
      if (s.length > LIMITS.speaker) errors[`speakers.${i}`] = `Speaker must be ≤ ${LIMITS.speaker} characters`;
    }

    // whatToBring
    for (let i = 0; i < event.whatToBring.length; i++) {
      const it = event.whatToBring[i] || '';
      if (it.length > LIMITS.bringItem) errors[`whatToBring.${i}`] = `Item must be ≤ ${LIMITS.bringItem} characters`;
    }

    // registration description
    if (event.registration?.description && event.registration.description.length > LIMITS.registrationDescription) {
      errors.registrationDescription = `Registration description must be ≤ ${LIMITS.registrationDescription} characters`;
    }

    return errors;
  };

  const onSaveClick = async (event: Event) => {
    const errors = validateEvent(event);
    if (Object.keys(errors).length > 0) {
      setValidationErrors(prev => ({ ...prev, [event.id]: errors }));
      toast.error('Please fix validation errors before saving');
      return;
    }
    // clear validation for this event
    setValidationErrors(prev => { const c = { ...prev }; delete c[event.id]; return c; });
    await handleSave(event);
  };

  const handleDelete = async (id: string) => {
    try {
      // If it's a temporary (unsaved) event, just remove from state
      if (id.startsWith('temp-')) {
        setEvents(prev => prev.filter(e => e.id !== id));
        setDeleteConfirm(null);
        toast.success('Event removed');
        return;
      }

      const rawToken = localStorage.getItem('admin_token');
      let token = '';
      if (rawToken) try { token = JSON.parse(rawToken).token || rawToken } catch (e) { token = rawToken }
      const headers = token ? { 'Authorization': `Bearer ${token}` } : undefined;
      const response = await fetch(`/api/admin/events?id=${id}`, {
        method: 'DELETE',
        headers
      });

      const result = await response.json();
      
        if (result.success) {
        setEvents(prev => prev.filter(e => e.id !== id));
        setDeleteConfirm(null);
        toast.success('Event deleted successfully');
      } else {
        toast.error(result.error || 'Failed to delete event');
      }
    } catch (error) {
      console.error('Error deleting event:', error);
      toast.error('Failed to delete event');
    }
  };

  const handleUpdate = (id: string, updates: Partial<Event>) => {
    setEvents(prev => prev.map(event => 
      event.id === id ? { ...event, ...updates } : event
    ));
  };

  const togglePublished = async (event: Event) => {
    const updatedEvent = { ...event, published: !event.published };
    handleUpdate(event.id, { published: !event.published });
    
    // If it's not a new event, save to API
    if (!event.id.startsWith('temp-')) {
      await handleSave(updatedEvent);
    }
  };

  const addArrayItem = (eventId: string, field: 'speakers' | 'whatToBring') => {
    const event = events.find(e => e.id === eventId);
    if (event) {
      handleUpdate(eventId, {
        [field]: [...event[field], '']
      });
    }
  };

  const updateArrayItem = (eventId: string, field: 'speakers' | 'whatToBring', index: number, value: string) => {
    const event = events.find(e => e.id === eventId);
    if (event) {
      const newArray = [...event[field]];
      newArray[index] = value;
      handleUpdate(eventId, { [field]: newArray });
    }
  };

  const removeArrayItem = (eventId: string, field: 'speakers' | 'whatToBring', index: number) => {
    const event = events.find(e => e.id === eventId);
    if (event) {
      const newArray = event[field].filter((_, i) => i !== index);
      handleUpdate(eventId, { [field]: newArray });
    }
  };

  // Manage object URLs created for image previews so we can revoke them later
  const generatedUrlsRef = useRef<Set<string>>(new Set());
  // Track the selected File objects per-event so we can upload them when saving
  const selectedFilesRef = useRef<Map<string, File>>(new Map());
  const selectedVideoFilesRef = useRef<Map<string, File>>(new Map());
  // Local map of resolved preview URLs (handles blob:, https and presigned r2 URLs)
  const [previewUrls, setPreviewUrls] = useState<Record<string, string>>({});
  const [selectedVideoInfo, setSelectedVideoInfo] = useState<Record<string, { name: string; size: number }>>({});

  const formatBytes = (bytes: number) => {
    if (!Number.isFinite(bytes) || bytes <= 0) return '0 B';
    const units = ['B', 'KB', 'MB', 'GB'];
    let i = 0;
    let v = bytes;
    while (v >= 1024 && i < units.length - 1) {
      v /= 1024;
      i++;
    }
    return `${v.toFixed(i === 0 ? 0 : 1)} ${units[i]}`;
  };

  const isAllowedVideo = (file: File) => {
    const name = (file.name || '').toLowerCase();
    const isExtOk = name.endsWith('.mp4') || name.endsWith('.mov');
    const isTypeOk = file.type === 'video/mp4' || file.type === 'video/quicktime';
    return isExtOk || isTypeOk;
  };

  const handleImageFileSelect = (eventId: string, file?: File | null) => {
    const ev = events.find(e => e.id === eventId);
    if (!ev) return;
    // Revoke previous object URL if we created it
    try {
      if (ev.imageUrl && ev.imageUrl.startsWith('blob:') && generatedUrlsRef.current.has(ev.imageUrl)) {
        URL.revokeObjectURL(ev.imageUrl);
        generatedUrlsRef.current.delete(ev.imageUrl);
      }
    } catch (e) {
      // ignore
    }

    if (!file) {
      // Remove selected file if any
      selectedFilesRef.current.delete(eventId);
      handleUpdate(eventId, { imageUrl: '' });
      return;
    }

    // Save the File reference for later upload and create an object URL for preview
    selectedFilesRef.current.set(eventId, file);
    const url = URL.createObjectURL(file);
    generatedUrlsRef.current.add(url);
    handleUpdate(eventId, { imageUrl: url });
  };

  const handleVideoFileSelect = (eventId: string, file?: File | null) => {
    if (!file) {
      selectedVideoFilesRef.current.delete(eventId);
      setSelectedVideoInfo(prev => {
        if (!prev[eventId]) return prev;
        const copy = { ...prev };
        delete copy[eventId];
        return copy;
      });
      handleUpdate(eventId, { videoUrl: '' });
      return;
    }

    if (!isAllowedVideo(file)) {
      toast.error('Please select an MP4 or MOV file');
      return;
    }
    if (file.size > MAX_VIDEO_BYTES) {
      toast.error('Video must be 300MB or smaller');
      return;
    }

    selectedVideoFilesRef.current.set(eventId, file);
    setSelectedVideoInfo(prev => ({ ...prev, [eventId]: { name: file.name, size: file.size } }));
  };

  // Cleanup generated object URLs on unmount
  useEffect(() => {
    return () => {
      for (const u of generatedUrlsRef.current) {
        try { URL.revokeObjectURL(u); } catch (e) {}
      }
      generatedUrlsRef.current.clear();
    };
  }, []);

  // Resolve preview URLs for events that reference R2 (r2://...) or already have http/blob URLs
  useEffect(() => {
    let canceled = false;

    async function resolveForEvent(ev: Event) {
      if (!ev.imageUrl) {
        setPreviewUrls(prev => {
          if (!prev[ev.id]) return prev;
          const copy = { ...prev };
          delete copy[ev.id];
          return copy;
        });
        return;
      }

      // If it's an object URL or http(s) already, use it directly
      if (ev.imageUrl.startsWith('blob:') || ev.imageUrl.startsWith('http') || ev.imageUrl.startsWith('data:')) {
        setPreviewUrls(prev => ({ ...prev, [ev.id]: ev.imageUrl }));
        return;
      }

      // Handle r2://bucket/key references
      if (ev.imageUrl.startsWith('r2://')) {
        try {
          const rest = ev.imageUrl.slice('r2://'.length);
          const parts = rest.split('/').filter(Boolean);
          // bucket is parts[0], key is rest
          const bucket = parts.shift();
          const key = parts.join('/');
          if (!key) return;
          const resp = await fetch('/api/r2/presign-get', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ key, expiresIn: 3600 })
          });
          if (!resp.ok) return;
          const json = await resp.json();
          if (canceled) return;
          if (json && json.url) {
            setPreviewUrls(prev => ({ ...prev, [ev.id]: json.url }));
          }
        } catch (e) {
          // ignore
        }
        return;
      }

      // Fallback: try to use event.imageUrl directly
      setPreviewUrls(prev => ({ ...prev, [ev.id]: ev.imageUrl }));
    }

    for (const ev of events) {
      // Only resolve if not already present or changed
      if (!ev.imageUrl && previewUrls[ev.id]) {
        // will be removed by resolveForEvent
        resolveForEvent(ev);
      } else if (ev.imageUrl && previewUrls[ev.id] !== ev.imageUrl && !(ev.imageUrl.startsWith('r2://') && previewUrls[ev.id])) {
        // if ev.imageUrl is r2:// and we already have a presigned url, skip
        resolveForEvent(ev);
      }
    }

    return () => { canceled = true; };
  }, [events]);

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#FDB813]" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Discard confirmation dialog shown when attempting to open a new form while a temp exists */}
      <Dialog open={showDiscardConfirm} onOpenChange={(open) => setShowDiscardConfirm(open)}>
        <DialogOverlay />
          <DialogContent hideClose className="bg-[#2E2E2E] text-white max-w-md">
            <DialogHeader>
              <DialogTitle className="text-xl">Save draft?</DialogTitle>
            </DialogHeader>
            <DialogDescription className="mb-6 text-gray-300">You have an unsaved event open.</DialogDescription>
            <DialogFooter>
              <Button onClick={() => setShowDiscardConfirm(false)} className="bg-[#2E2E2E] hover:bg-[#3E3E3E] text-white border border-gray-700 px-4 py-2 rounded-md">Cancel</Button>
              <Button onClick={() => {
              // cleanup temp events and then create a fresh one
              const tempEvents = events.filter(e => e.id.startsWith('temp-'));
              for (const te of tempEvents) {
                try {
                  if (te.imageUrl && te.imageUrl.startsWith('blob:') && generatedUrlsRef.current.has(te.imageUrl)) {
                    URL.revokeObjectURL(te.imageUrl);
                    generatedUrlsRef.current.delete(te.imageUrl);
                  }
                } catch (e) {}
                try { selectedFilesRef.current.delete(te.id); } catch (e) {}
                try { selectedVideoFilesRef.current.delete(te.id); } catch (e) {}
              }
              setEvents(prev => prev.filter(e => !e.id.startsWith('temp-')));
              setSelectedVideoInfo({});
              // create new
              const newEvent: Event = {
                id: `temp-${Date.now()}`,
                title: '', date: '', time: '', location: '', type: 'conference',
                description: '', extendedDescription: '', capacity: '', imageUrl: '', videoUrl: '',
                speakers: [], whatToBring: [], registration: { enabled: false, description: '', nationalFee: 0, internationalFee: 0, registrationFee: 0 },
                published: true
              };
              setEvents(prev => [newEvent, ...prev]);
              setExpandedId(newEvent.id);
              setEditingId(newEvent.id);
                setShowDiscardConfirm(false);
              }} className="bg-[#FDB813] hover:bg-[#e5a711] text-black px-4 py-2 rounded-md">Discard</Button>
          </DialogFooter>
          </DialogContent>
      </Dialog>
      {/* Header removed as requested */}

      {/* Stats and Add Button */}
      <div className="flex items-center justify-between rounded-lg bg-transparent">
        <div className="text-white text-base font-medium">
          Total: <span className="text-[#FDB813] font-bold">{events.length}</span> Event(s)
          {' | '}
          Published: <span className="text-[#FDB813] font-bold">{events.filter(e => e.published).length}</span>
        </div>
        <Button
          title="Add a new event"
          onClick={handleAdd}
          disabled={isViewer}
          className={`bg-[#2E2E2E] text-white border border-[#FDB813] hover:bg-[#3E3E3E] px-4 py-2 rounded-md font-semibold flex items-center gap-2${isViewer ? ' opacity-50 cursor-not-allowed' : ''}`}
        >
          <Plus size={16} className="text-white mr-2" />
          Add Event
        </Button>
      </div>

      {/* Events List */}
      {events.length === 0 ? (
        <div className="text-center py-12 bg-black rounded-lg border border-gray-700">
          <Calendar size={48} className="mx-auto mb-4 text-gray-600" />
          <p className="text-gray-400">No events yet. Click "Add Event" to create one.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {events.map((event) => {
            const isExpanded = expandedId === event.id;
            const isEditing = editingId === event.id;
            const isNew = event.id.startsWith('temp-');

            return (
              <div
                key={event.id}
                className="bg-black rounded-lg border border-gray-700 overflow-hidden"
              >
                {/* Event Header */}
                <div className="p-4 flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-white font-semibold text-lg">{event.title}</h3>
                      <span className="px-2 py-1 rounded text-xs font-medium bg-green-900 text-green-300">{event.published ? 'Published' : 'Draft'}</span>
                      <span className="px-2 py-1 rounded text-xs bg-[#2E2E2E] text-gray-300">
                        {event.type}
                      </span>
                    </div>
                    <div className="text-gray-400 text-sm mt-1">
                      {event.date} • {event.time} • {event.location}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Show publish/unpublish button only when not editing the event (keep it on the card only) */}
                    {!isEditing && (
                      <Button
                        title={event.published ? 'Unpublish event' : 'Publish event'}
                        onClick={() => togglePublished(event)}
                        disabled={isViewer}
                        className={`h-9 w-9 p-2 flex items-center justify-center rounded-md border border-[#FDB813] bg-[#2E2E2E] hover:bg-[#3E3E3E] text-white cursor-pointer${isViewer ? ' opacity-50 cursor-not-allowed' : ''}`}
                      >
                        {event.published ? <EyeOff size={16} /> : <Eye size={16} />}
                      </Button>
                    )}
                    {/* Expand/collapse button removed as requested */}
                    {!isEditing && (
                      <>
                        <Button
                          title={isViewer ? 'View' : 'Edit'}
                          onClick={() => {
                            setExpandedId(isExpanded ? null : event.id);
                            if (!isExpanded && !isViewer) setEditingId(event.id);
                          }}
                          className="h-9 w-9 p-2 flex items-center justify-center rounded-md border border-[#FDB813] bg-[#2E2E2E] hover:bg-[#3E3E3E] text-white cursor-pointer"
                        >
                          <Edit2 size={16}  />
                        </Button>

                        <DeleteConfirmDialog
                          open={deleteConfirm === event.id}
                          onOpenChange={(open) => setDeleteConfirm(open ? event.id : null)}
                          onConfirm={() => handleDelete(event.id)}
                          title={`Delete Events?`}
                          description={`Are you sure you want to delete this event${event.title ? ` "${event.title}"` : ''}? This action cannot be undone.`}
                          itemName={event.title}
                          itemType="event"
                        />
                        <Button
                          title="Delete"
                          onClick={() => setDeleteConfirm(event.id)}
                          disabled={isViewer}
                          className={`h-9 w-9 p-2 flex items-center justify-center rounded-md border border-[#FDB813] bg-[#2E2E2E] hover:bg-[#3E3E3E] text-white cursor-pointer${isViewer ? ' opacity-50 cursor-not-allowed' : ''}`}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </>
                    )}
                  </div>
                </div>

                {/* Event Details (Expanded) */}
                {isExpanded && (
                  <div className="border-t border-gray-700 p-4 space-y-4">
                    {/* Basic Info */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-white mb-1 block">Event Title <span className="text-[#FDB813]">*</span></label>
                        <Input
                          value={event.title}
                          onChange={(e) => handleUpdate(event.id, { title: e.target.value })}
                          placeholder="Enter event title"
                          className="bg-[#2E2E2E] border-gray-600 text-white"
                          disabled={!isEditing}
                          maxLength={LIMITS.title}
                        />
                        <div className="flex items-center justify-between mt-1">
                          <div className="text-xs text-gray-400">{(validationErrors[event.id]?.title) ? <span className="text-red-400">{validationErrors[event.id].title}</span> : <span>&nbsp;</span>}</div>
                          <div className="text-xs text-gray-400">{event.title.length}/{LIMITS.title}</div>
                        </div>
                      </div>

                      <div>
                        <label className="text-sm text-white mb-1 block">Event Type <span className="text-[#FDB813]">*</span></label>
                        <select
                          value={event.type}
                          onChange={(e) => handleUpdate(event.id, { type: e.target.value as any })}
                          className="w-full bg-[#2E2E2E] border border-gray-600 text-white rounded-md px-3 py-2 cursor-pointer"
                          disabled={!isEditing}
                        >
                          <option value="conference">Conference</option>
                          <option value="class">Class</option>
                          <option value="record">Record Attempt</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="text-sm text-white mb-1 block">Date <span className="text-[#FDB813]">*</span></label>
                          <DateInput
                            value={event.date}
                            onChange={(v) => handleUpdate(event.id, { date: v })}
                            allowFuture={true}
                            disabled={!isEditing}
                            className="bg-[#2E2E2E] border-gray-600 text-white"
                          />
                        <div className="text-xs mt-1">{validationErrors[event.id]?.date ? <span className="text-red-400">{validationErrors[event.id].date}</span> : <span>&nbsp;</span>}</div>
                      </div>
                      <div>
                        <label className="text-sm text-white mb-1 block">Time <span className="text-[#FDB813]">*</span></label>
                        <Input
                          value={event.time}
                          onChange={(e) => handleUpdate(event.id, { time: e.target.value })}
                          placeholder="10:00 AM - 5:00 PM"
                          className="bg-[#2E2E2E] border-gray-600 text-white"
                          disabled={!isEditing}
                          maxLength={LIMITS.time}
                        />
                        <div className="flex items-center justify-between mt-1">
                          <div className="text-xs text-gray-400">{validationErrors[event.id]?.time ? <span className="text-red-400">{validationErrors[event.id].time}</span> : <span>&nbsp;</span>}</div>
                          <div className="text-xs text-gray-400">{event.time.length}/{LIMITS.time}</div>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm text-white mb-1 block">Location <span className="text-[#FDB813]">*</span></label>
                        <Input
                          value={event.location}
                          onChange={(e) => handleUpdate(event.id, { location: e.target.value })}
                          placeholder="City, Country"
                          className="bg-[#2E2E2E] border-gray-600 text-white"
                          disabled={!isEditing}
                          maxLength={LIMITS.location}
                        />
                        <div className="flex items-center justify-between mt-1">
                          <div className="text-xs text-gray-400">{validationErrors[event.id]?.location ? <span className="text-red-400">{validationErrors[event.id].location}</span> : <span>&nbsp;</span>}</div>
                          <div className="text-xs text-gray-400">{event.location.length}/{LIMITS.location}</div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm text-white mb-1 block">Capacity <span className="text-[#FDB813]">*</span></label>
                      <Input
                        value={event.capacity}
                        onChange={(e) => handleUpdate(event.id, { capacity: e.target.value })}
                        placeholder="e.g., 100 or 'Unlimited'"
                        className="bg-[#2E2E2E] border-gray-600 text-white"
                        disabled={!isEditing}
                        maxLength={LIMITS.capacity}
                      />
                      <div className="flex items-center justify-between mt-1">
                        <div className="text-xs text-gray-400">{validationErrors[event.id]?.capacity ? <span className="text-red-400">{validationErrors[event.id].capacity}</span> : <span>&nbsp;</span>}</div>
                        <div className="text-xs text-gray-400">{String(event.capacity).length}/{LIMITS.capacity}</div>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm text-white mb-1 block">Short Description <span className="text-[#FDB813]">*</span></label>
                      <Textarea
                        value={event.description}
                        onChange={(e) => handleUpdate(event.id, { description: e.target.value })}
                        placeholder="Brief description for event card"
                        className="bg-[#2E2E2E] border-gray-600 text-white"
                        rows={2}
                        disabled={!isEditing}
                        maxLength={LIMITS.description}
                      />
                      <div className="flex items-center justify-between mt-1">
                        <div className="text-xs text-gray-400">{validationErrors[event.id]?.description ? <span className="text-red-400">{validationErrors[event.id].description}</span> : <span>&nbsp;</span>}</div>
                        <div className="text-xs text-gray-400">{event.description.length}/{LIMITS.description}</div>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm text-white mb-1 block">Extended Description <span className="text-[#FDB813]">*</span></label>
                      <Textarea
                        value={event.extendedDescription}
                        onChange={(e) => handleUpdate(event.id, { extendedDescription: e.target.value })}
                        placeholder="Detailed description for event detail page"
                        className="bg-[#2E2E2E] border-gray-600 text-white"
                        rows={4}
                        disabled={!isEditing}
                        maxLength={LIMITS.extendedDescription}
                      />
                      <div className="flex items-center justify-between mt-1">
                        <div className="text-xs text-gray-400">{validationErrors[event.id]?.extendedDescription ? <span className="text-red-400">{validationErrors[event.id].extendedDescription}</span> : <span>&nbsp;</span>}</div>
                        <div className="text-xs text-gray-400">{event.extendedDescription.length}/{LIMITS.extendedDescription}</div>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm text-white mb-1 block">Event Image</label>
                      <div
                        id={`drop-area-${event.id}`}
                        onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); setDragOverId(event.id); }}
                        onDragEnter={(e) => { e.preventDefault(); e.stopPropagation(); setDragOverId(event.id); }}
                        onDragLeave={(e) => { e.preventDefault(); e.stopPropagation(); if (dragOverId === event.id) setDragOverId(null); }}
                        onDrop={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          if (!isEditing) return;
                          const f = e.dataTransfer?.files?.[0];
                          if (f && f.type.startsWith('image/')) {
                            handleImageFileSelect(event.id, f);
                          }
                          // clear highlight after drop
                          if (dragOverId === event.id) setDragOverId(null);
                        }}
                        onClick={() => {
                          if (!isEditing) return;
                          const input = document.getElementById(`file-input-${event.id}`) as HTMLInputElement | null;
                          input?.click();
                        }}
                        className={`w-full h-40 rounded-md bg-[#1a1a1a] flex items-center justify-center cursor-pointer ${dragOverId === event.id ? 'border border-[#FDB813] ring-2 ring-[#FDB813]/30' : 'border border-gray-600'} ${!isEditing ? 'opacity-60 pointer-events-none' : ''}`}
                      >
                        <input id={`file-input-${event.id}`} type="file" accept="image/*" className="hidden" onChange={(e) => {
                          if (!isEditing) return;
                          const f = e.target.files?.[0];
                          if (f) handleImageFileSelect(event.id, f);
                        }} />

                        {previewUrls[event.id] ? (
                          <img src={previewUrls[event.id]} alt="preview" className="max-h-full max-w-full object-contain" onError={(ev) => { (ev.target as HTMLImageElement).style.display = 'none'; }} />
                        ) : event.imageUrl ? (
                          <img src={event.imageUrl} alt="preview" className="max-h-full max-w-full object-contain" onError={(ev) => { (ev.target as HTMLImageElement).style.display = 'none'; }} />
                        ) : (
                          <div className="text-center text-gray-400">
                            <div className="mb-1">Click or drag & drop an image here</div>
                            <div className="text-xs">PNG / JPG — single image</div>
                          </div>
                        )}
                      </div>
                      {isEditing && event.imageUrl && (
                        <div className="mt-2 flex items-center gap-2">
                          <Button size="sm" onClick={() => handleImageFileSelect(event.id, null)} className="bg-red-600 hover:bg-red-700 text-white">Remove Image</Button>
                          <span className="text-gray-400 text-sm">Current image shown above</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="text-sm text-white mb-1 block">Event Video</label>
                      <div
                        id={`video-drop-area-${event.id}`}
                        onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); setDragOverVideoId(event.id); }}
                        onDragEnter={(e) => { e.preventDefault(); e.stopPropagation(); setDragOverVideoId(event.id); }}
                        onDragLeave={(e) => { e.preventDefault(); e.stopPropagation(); if (dragOverVideoId === event.id) setDragOverVideoId(null); }}
                        onDrop={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          if (!isEditing) return;
                          const f = e.dataTransfer?.files?.[0];
                          if (f) handleVideoFileSelect(event.id, f);
                          if (dragOverVideoId === event.id) setDragOverVideoId(null);
                        }}
                        onClick={() => {
                          if (!isEditing) return;
                          const input = document.getElementById(`video-file-input-${event.id}`) as HTMLInputElement | null;
                          input?.click();
                        }}
                        className={`w-full rounded-md bg-[#1a1a1a] px-4 py-3 cursor-pointer ${dragOverVideoId === event.id ? 'border border-[#FDB813] ring-2 ring-[#FDB813]/30' : 'border border-gray-600'} ${!isEditing ? 'opacity-60 pointer-events-none' : ''}`}
                      >
                        <input
                          id={`video-file-input-${event.id}`}
                          type="file"
                          accept="video/mp4,video/quicktime,.mp4,.mov"
                          className="hidden"
                          onChange={(e) => {
                            if (!isEditing) return;
                            const f = e.target.files?.[0];
                            if (f) handleVideoFileSelect(event.id, f);
                          }}
                        />

                        {selectedVideoInfo[event.id] ? (
                          <div className="text-gray-200">
                            <div className="font-medium truncate">{selectedVideoInfo[event.id].name}</div>
                            <div className="text-xs text-gray-400">{formatBytes(selectedVideoInfo[event.id].size)}</div>
                            {editingId === event.id && typeof videoUploadProgress === 'number' && (
                              <div className="mt-2 text-xs text-gray-400">Uploading: {videoUploadProgress}%</div>
                            )}
                            {editingId === event.id && videoUploadError && (
                              <div className="mt-2 text-xs text-red-400">{videoUploadError}</div>
                            )}
                          </div>
                        ) : event.videoUrl ? (
                          <div className="text-gray-200">
                            <div className="font-medium truncate">
                              Current video: {String(event.videoUrl).split('/').pop()}
                            </div>
                            <div className="text-xs text-gray-400">Click to replace or use Remove Video</div>
                          </div>
                        ) : (
                          <div className="text-gray-400">
                            <div className="mb-1">Click or drag & drop a video here</div>
                            <div className="text-xs">MP4 / MOV, max 300MB</div>
                          </div>
                        )}
                      </div>

                      {isEditing && (selectedVideoInfo[event.id] || event.videoUrl) && (
                        <div className="mt-2 flex items-center gap-2">
                          <Button size="sm" onClick={() => handleVideoFileSelect(event.id, null)} className="bg-red-600 hover:bg-red-700 text-white">Remove Video</Button>
                          {selectedVideoInfo[event.id] ? (
                            <span className="text-gray-400 text-sm">Selected video shown above</span>
                          ) : (
                            <span className="text-gray-400 text-sm">Current video will be removed on save</span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Speakers */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm text-white">Speakers / Instructors</label>
                        {isEditing && (
                          <Button
                            onClick={() => addArrayItem(event.id, 'speakers')}
                            className="bg-[#FDB813] hover:bg-[#e5a711] text-black cursor-pointer"
                            size="sm"
                          >
                            <Plus size={14} className="mr-1" />
                            Add Speaker
                          </Button>
                        )}
                      </div>
                      <div className="space-y-2">
                        {event.speakers.map((speaker, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <Input
                              value={speaker}
                              onChange={(e) => updateArrayItem(event.id, 'speakers', index, e.target.value)}
                              placeholder="Speaker name"
                              className="bg-[#2E2E2E] border-gray-600 text-white"
                              maxLength={LIMITS.speaker}
                              disabled={!isEditing}
                            />
                            <div className="flex items-center justify-between">
                              <div className="text-xs text-gray-400">{validationErrors[event.id]?.[`speakers.${index}`] ? <span className="text-red-400">{validationErrors[event.id][`speakers.${index}`]}</span> : <span>&nbsp;</span>}</div>
                              <div className="text-xs text-gray-400">{speaker.length}/{LIMITS.speaker}</div>
                            </div>
                            {isEditing && (
                              <Button
                                onClick={() => removeArrayItem(event.id, 'speakers', index)}
                                className="bg-red-600 hover:bg-red-700 text-white cursor-pointer"
                                size="sm"
                              >
                                <X size={14} />
                              </Button>
                            )}
                          </div>
                        ))}
                        {event.speakers.length === 0 && (
                          <p className="text-gray-500 text-sm">No speakers added</p>
                        )}
                      </div>
                    </div>

                    {/* What to Bring */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm text-white">What to Bring</label>
                        {isEditing && (
                          <Button
                            onClick={() => addArrayItem(event.id, 'whatToBring')}
                            className="bg-[#FDB813] hover:bg-[#e5a711] text-black cursor-pointer"
                            size="sm"
                          >
                            <Plus size={14} className="mr-1" />
                            Add Item
                          </Button>
                        )}
                      </div>
                      <div className="space-y-2">
                        {event.whatToBring.map((item, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <Input
                              value={item}
                              onChange={(e) => updateArrayItem(event.id, 'whatToBring', index, e.target.value)}
                              placeholder="Item to bring"
                                className="bg-[#2E2E2E] border-gray-600 text-white"
                                maxLength={LIMITS.bringItem}
                              disabled={!isEditing}
                            />
                              <div className="flex items-center justify-between">
                                <div className="text-xs text-gray-400">{validationErrors[event.id]?.[`whatToBring.${index}`] ? <span className="text-red-400">{validationErrors[event.id][`whatToBring.${index}`]}</span> : <span>&nbsp;</span>}</div>
                                <div className="text-xs text-gray-400">{item.length}/{LIMITS.bringItem}</div>
                              </div>
                            {isEditing && (
                              <Button
                                onClick={() => removeArrayItem(event.id, 'whatToBring', index)}
                                className="bg-red-600 hover:bg-red-700 text-white cursor-pointer"
                                size="sm"
                              >
                                <X size={14} />
                              </Button>
                            )}
                          </div>
                        ))}
                        {event.whatToBring.length === 0 && (
                          <p className="text-gray-500 text-sm">No items added</p>
                        )}
                      </div>
                    </div>

                    {/* Registration */}
                    <div className="border-t border-gray-700 pt-4">
                      <div className="flex items-center gap-2 mb-3">
                        <input
                          type="checkbox"
                          checked={event.registration.enabled}
                          onChange={(e) => handleUpdate(event.id, {
                            registration: { ...event.registration, enabled: e.target.checked }
                          })}
                          className="cursor-pointer"
                          disabled={!isEditing}
                        />
                        <label className="text-sm text-white">Enable Registration</label>
                      </div>

                      <div className="flex items-center gap-2 mb-3">
                        <input
                          type="checkbox"
                          checked={!!event.registration.enable24hrWorshipForm}
                          onChange={(e) => handleUpdate(event.id, {
                            registration: { ...event.registration, enable24hrWorshipForm: e.target.checked }
                          })}
                          className="cursor-pointer"
                          disabled={!isEditing}
                        />
                        <label className="text-sm text-white">Enable 24 Hours Worship Form (only for 24 Hours Worship Event)</label>
                      </div>

                      {event.registration.enabled && (
                        <div className="space-y-4 pl-6">
                          <div>
                            <label className="text-sm text-white mb-1 block">Registration Description</label>
                            <Textarea
                              value={event.registration.description || ''}
                              onChange={(e) => handleUpdate(event.id, {
                                registration: { ...event.registration, description: e.target.value }
                              })}
                              placeholder="Registration information..."
                              className="bg-[#2E2E2E] border-gray-600 text-white"
                              rows={2}
                              disabled={!isEditing}
                              maxLength={LIMITS.registrationDescription}
                            />
                            <div className="flex items-center justify-between mt-1">
                              <div className="text-xs text-gray-400">{validationErrors[event.id]?.registrationDescription ? <span className="text-red-400">{validationErrors[event.id].registrationDescription}</span> : <span>&nbsp;</span>}</div>
                              <div className="text-xs text-gray-400">{(event.registration.description || '').length}/{LIMITS.registrationDescription}</div>
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-4">
                            <div>
                              <label className="text-sm text-white mb-1 block">National Fee (₹)</label>
                              <Input
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                placeholder="0"
                                value={event.registration.nationalFee ?? ''}
                                onChange={(e) => {
                                  const onlyDigits = e.target.value.replace(/\D+/g, '');
                                  handleUpdate(event.id, { registration: { ...event.registration, nationalFee: parseInt(onlyDigits) || 0 } });
                                }}
                                onPaste={(e) => {
                                  const paste = (e.clipboardData || (window as any).clipboardData).getData('text');
                                  if (/\D/.test(paste)) e.preventDefault();
                                }}
                                className="bg-[#2E2E2E] border-gray-600 text-white"
                                disabled={!isEditing}
                              />
                            </div>
                            <div>
                              <label className="text-sm text-white mb-1 block">International Fee (₹)</label>
                              <Input
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                placeholder="0"
                                value={event.registration.internationalFee ?? ''}
                                onChange={(e) => {
                                  const onlyDigits = e.target.value.replace(/\D+/g, '');
                                  handleUpdate(event.id, { registration: { ...event.registration, internationalFee: parseInt(onlyDigits) || 0 } });
                                }}
                                onPaste={(e) => {
                                  const paste = (e.clipboardData || (window as any).clipboardData).getData('text');
                                  if (/\D/.test(paste)) e.preventDefault();
                                }}
                                className="bg-[#2E2E2E] border-gray-600 text-white"
                                disabled={!isEditing}
                              />
                            </div>
                            <div>
                              <label className="text-sm text-white mb-1 block">Registration Fee (₹)</label>
                              <Input
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                placeholder="0"
                                value={event.registration.registrationFee ?? ''}
                                onChange={(e) => {
                                  const onlyDigits = e.target.value.replace(/\D+/g, '');
                                  handleUpdate(event.id, { registration: { ...event.registration, registrationFee: parseInt(onlyDigits) || 0 } });
                                }}
                                onPaste={(e) => {
                                  const paste = (e.clipboardData || (window as any).clipboardData).getData('text');
                                  if (/\D/.test(paste)) e.preventDefault();
                                }}
                                className="bg-[#2E2E2E] border-gray-600 text-white"
                                disabled={!isEditing}
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    {isEditing && (
                      <div className="flex items-center justify-end gap-2 pt-4 border-t border-gray-700">
                        <Button
                          title="Cancel"
                          onClick={() => {
                            if (isNew) {
                              setEvents(prev => prev.filter(e => e.id !== event.id));
                            }
                            setEditingId(null);
                            setExpandedId(null);
                          }}
                          className="bg-[#2E2E2E] hover:bg-[#3E3E3E] text-white cursor-pointer"
                        >
                          <X size={16} className="mr-2" />
                          Cancel
                        </Button>
                        <Button
                          title="Save"
                          onClick={() => onSaveClick(event)}
                          className="bg-[#FDB813] hover:bg-[#e5a711] text-black font-semibold cursor-pointer"
                        >
                          <Save size={16} className="mr-2" />
                          Save Event
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
