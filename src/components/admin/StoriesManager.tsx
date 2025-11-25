import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Plus, X, Edit2, Video, FileText, CalendarIcon, Trash2, MessageCircle, Star, Eye, EyeOff, Save } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Calendar } from '../ui/calendar';
import { Checkbox } from '../ui/checkbox';
import { DeleteConfirmDialog } from './DeleteConfirmDialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';
import { toast } from 'sonner';
import { format } from 'date-fns';

interface Story {
  id: string;
  type: 'text' | 'video';
  category: string;

  // Text story fields
  name?: string;
  email?: string;
  role?: string;
  location?: string;
  image?: string;
  imageFile?: File;
  text?: string;

  // Video story fields
  title?: string;
  youtubeUrl?: string;

  // Common fields
  date: string;
  status?: 'Submitted' | 'In-Review' | 'Approved' | 'Rejected';
  featured?: boolean;
  is_visible?: boolean;
  created_at?: string;
  created_by?: string | null;
  thumbnail_url?: string;
}

interface ValidationErrors {
  name?: string;
  email?: string;
  role?: string;
  location?: string;
  text?: string;
  title?: string;
  youtubeUrl?: string;
  image?: string;
}

const CATEGORIES = [
  'Guinness World Records',
  'Asian Book of Records',
  'Ingenious Charm World Record',
  'Song Writing Classes',
  'Bible School Training',
  'Hallel Summer Kids Training'
];

// Date Picker Component
function DatePicker({ 
  value, 
  onChange,
  className 
}: { 
  value: string; 
  onChange: (date: string) => void;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  
  // Parse the date string (YYYY-MM-DD) correctly as local date
  const parseDateValue = (v?: string) => {
    if (!v) return undefined;
    // If it's already a Date string or Date-like, normalize to a Date
    try {
      // if value contains a T (ISO datetime), take the date portion
      let s = String(v);
      if (s.includes('T')) s = s.split('T')[0];
      // If value looks like YYYY-MM-DD, parse parts
      const parts = s.split('-').map(p => Number(p));
      if (parts.length === 3 && parts.every(p => !Number.isNaN(p))) {
        const [year, month, day] = parts;
        return new Date(year, month - 1, day);
      }
      // Fallback: try Date constructor
      const d = new Date(s);
      if (!isNaN(d.getTime())) return d;
    } catch (e) {
      // ignore and return undefined below
    }
    return undefined;
  };

  const dateValue = parseDateValue(value);
  
  const today = new Date();
  today.setHours(23, 59, 59, 999); // Set to end of today
  
  const handleSelect = (date: Date | undefined) => {
    if (date) {
      // Format date using local timezone to avoid off-by-one errors
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      onChange(`${year}-${month}-${day}`);
      setOpen(false);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={`w-full justify-start text-left !bg-[#2e2e2e] border-gray-600 text-white hover:bg-[#2e2e2e] hover:text-white cursor-pointer ${className || ''}`}
            style={{ backgroundColor: '#2e2e2e', color: '#fff' }}
          >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {dateValue ? format(dateValue, 'PPP') : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 !bg-[#2e2e2e] border-gray-600" align="start" style={{ backgroundColor: '#2e2e2e', color: '#fff' }}>
        <Calendar
          mode="single"
          selected={dateValue}
          onSelect={handleSelect}
          disabled={(date) => date > today}
          initialFocus
          className="!bg-[#2e2e2e] text-white"
        />
      </PopoverContent>
    </Popover>
  );
}

export function StoriesManager() {
  const [stories, setStories] = useState<Story[]>([]);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>(CATEGORIES[0]);
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [filterType, setFilterType] = useState<string>('All');
  const [validationErrors, setValidationErrors] = useState<Record<string, ValidationErrors>>({});
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; id: string; name: string }>({
    open: false,
    id: '',
    name: '',
  });

  // Unsaved-form confirmation dialog state
  const [unsavedDialog, setUnsavedDialog] = useState<{ open: boolean; pendingType?: 'text' | 'video' | null }>(
    { open: false, pendingType: null }
  );

  // Authorization helper
  function getAuthHeaders(contentType?: string) {
    let token = '';
    if (typeof window !== 'undefined') {
      const raw = localStorage.getItem('admin_token') || '';
      if (raw) {
        try {
          const parsed = JSON.parse(raw);
          token = parsed?.token || raw;
        } catch (e) {
          token = raw;
        }
      }
    }
    const headers: Record<string, string> = {};
    if (contentType) headers['Content-Type'] = contentType;
    if (token) headers['Authorization'] = `Bearer ${token}`;
    return headers;
  }

  // Fetch stories from server
  const fetchStories = async () => {
    try {
      const resp = await fetch('/api/admin/stories', { headers: getAuthHeaders() });
      const j = await resp.json();
      if (j && j.success) {
        // map server rows into client UI shape
        const mapped = (j.data || []).map((it: any) => mapRowToClient(it));
        setStories(mapped);
      }
      else toast.error(j?.error || 'Failed to fetch stories');
    } catch (err) {
      logDevError('Error fetching stories', err);
      toast.error('Failed to fetch stories');
    }
  };

  useEffect(() => { void fetchStories(); }, []);

  // Helper to log errors in development only (keeps console tidy in production)
  const logDevError = (...args: any[]) => {
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.error(...args);
    }
  };

  // Keep any new (temp) story's category in sync with the top-level category selector
  useEffect(() => {
    setStories(prev => prev.map(s => s.id.startsWith('temp-') ? { ...s, category: filterCategory } : s));
  }, [filterCategory]);

  // Character limits
  const CHAR_LIMITS = {
    name: 100,
    role: 50,
    location: 100,
    image: 500,
    title: 200,
    youtubeUrl: 500,
    text: 1000,
    email: 254
  };

  // Image upload constraints
  const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2 MB
  const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png'];

  // Map a server DB row to the UI Story shape, preserving any existing client-only fields
  const mapRowToClient = (row: any, existing?: Story): Story => {
    const type = row.media_type || (row.type as any) || 'text';
    const base: any = {
      id: String(row.id),
      type,
      category: existing?.category || row.category || CATEGORIES[0],
      // prefer explicit `date` column if present, otherwise fall back to created_at
      date: ((): string => {
        const raw = row.date ?? row.created_at ?? existing?.date ?? new Date().toISOString();
        const s = String(raw);
        // strip time portion if present (ISO datetime)
        if (s.includes('T')) return s.split('T')[0];
        // if contains space-separated time, take first token
        if (s.includes(' ')) return s.split(' ')[0];
        // otherwise return as-is (may already be YYYY-MM-DD)
        return s.substring(0, 10);
      })(),
      status: row.status || existing?.status || 'Submitted',
      featured: typeof row.featured !== 'undefined' ? !!row.featured : !!existing?.featured,
      is_visible: typeof row.is_visible !== 'undefined' ? !!row.is_visible : (existing?.is_visible ?? true),
      created_at: row.created_at || existing?.created_at,
      created_by: row.created_by ?? existing?.created_by ?? null,
    };

    if (type === 'text') {
      const name = row.title || existing?.name || '';
      const email = row.email || existing?.email || '';
      // Prefer explicit role/location columns if present, otherwise fall back to legacy `summary` parsing
      let role = '';
      let location = '';
      if (row.role || row.location) {
        role = row.role || existing?.role || '';
        location = row.location || existing?.location || '';
      } else {
        const combined = row.summary || '';
        const parts = combined.split('•').map((p: string) => p.trim()).filter(Boolean);
        if (parts.length === 0) {
          role = existing?.role || '';
          location = existing?.location || '';
        } else if (parts.length === 1) {
          role = '';
          location = parts[0];
        } else {
          role = parts[0];
          location = parts.slice(1).join(' • ');
        }
      }
      return {
        ...base,
        name,
        email,
        role,
        location,
        image: row.thumbnail_url || existing?.image || '',
        text: row.body || existing?.text || '',
      } as Story;
    }

    // video
    return {
      ...base,
      title: row.title || existing?.title || '',
      youtubeUrl: row.video_url || existing?.youtubeUrl || '',
      thumbnail_url: row.thumbnail_url || existing?.thumbnail_url || '',
      // include role/location for video stories as DB has these columns
      role: row.role || existing?.role || '',
      location: row.location || existing?.location || ''
    } as Story;
  };

  const validateStory = (story: Story): ValidationErrors => {
    const errors: ValidationErrors = {};

      if (story.type === 'text') {
      // Text story validation
      if (!story.name?.trim()) {
        errors.name = 'Full name is required';
      } else if (/\d/.test(story.name)) {
        errors.name = 'Name cannot contain numbers';
      } else if (story.name.length > CHAR_LIMITS.name) {
        errors.name = `Name must be ${CHAR_LIMITS.name} characters or less`;
      }

      if (story.email) {
        const emailRe = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        if (!emailRe.test(story.email)) {
          errors.email = 'Invalid email address';
        } else if (story.email.length > CHAR_LIMITS.email) {
          errors.email = `Email must be ${CHAR_LIMITS.email} characters or less`;
        }
      }

      if (!story.role?.trim()) {
        errors.role = 'Role is required';
      } else if (/\d/.test(story.role)) {
        errors.role = 'Role cannot contain numbers';
      } else if (story.role.length > CHAR_LIMITS.role) {
        errors.role = `Role must be ${CHAR_LIMITS.role} characters or less`;
      }

      if (!story.location?.trim()) {
        errors.location = 'Location is required';
      } else if (/\d/.test(story.location)) {
        errors.location = 'Location cannot contain numbers';
      } else if (story.location.length > CHAR_LIMITS.location) {
        errors.location = `Location must be ${CHAR_LIMITS.location} characters or less`;
      }

      if (!story.text?.trim()) {
        errors.text = 'Testimony/Story text is required';
      } else if (story.text.length > CHAR_LIMITS.text) {
        errors.text = `Text must be ${CHAR_LIMITS.text} characters or less`;
      }

      // Image validation if present (story.image may be a data URL or external URL)
      const imgAny = (story as any).imageFile as File | undefined;
      if (imgAny) {
        if (!ALLOWED_IMAGE_TYPES.includes(imgAny.type)) {
          errors.image = 'Only JPG and PNG files are supported';
        } else if (imgAny.size > MAX_IMAGE_SIZE) {
          errors.image = `Image must be ${Math.round(MAX_IMAGE_SIZE/1024/1024)}MB or smaller`;
        }
      }
    } else if (story.type === 'video') {
      // Video story validation
      if (!story.title?.trim()) {
        errors.title = 'Title is required';
      } else if (story.title.length > CHAR_LIMITS.title) {
        errors.title = `Title must be ${CHAR_LIMITS.title} characters or less`;
      }

      if (!story.youtubeUrl?.trim()) {
        errors.youtubeUrl = 'YouTube URL is required';
      } else if (story.youtubeUrl.length > CHAR_LIMITS.youtubeUrl) {
        errors.youtubeUrl = `URL must be ${CHAR_LIMITS.youtubeUrl} characters or less`;
      } else if (!isValidYouTubeUrl(story.youtubeUrl)) {
        errors.youtubeUrl = 'Please enter a valid YouTube URL';
      }
        // Require role and location for video stories as well
        if (!story.role?.trim()) {
          errors.role = 'Role is required';
        } else if (/\d/.test(story.role)) {
          errors.role = 'Role cannot contain numbers';
        } else if (story.role.length > CHAR_LIMITS.role) {
          errors.role = `Role must be ${CHAR_LIMITS.role} characters or less`;
        }

        if (!story.location?.trim()) {
          errors.location = 'Location is required';
        } else if (/\d/.test(story.location)) {
          errors.location = 'Location cannot contain numbers';
        } else if (story.location.length > CHAR_LIMITS.location) {
          errors.location = `Location must be ${CHAR_LIMITS.location} characters or less`;
        }
    }

    return errors;
  };

  const isValidYouTubeUrl = (url: string): boolean => {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[\w-]+/;
    return youtubeRegex.test(url);
  };

  // Handle image file selection for a given story id (stable callback)
  const handleImageFileChange = useCallback((id: string, file?: File | null) => {
    const story = stories.find(s => s.id === id);
    if (!story) return;

    if (!file) {
      // clear file
      handleUpdate(id, 'image', '');
      handleUpdate(id, 'imageFile' as any, undefined);
      // clear image errors
      const newErrors = { ...validationErrors };
      if (newErrors[id]) { delete newErrors[id].image; setValidationErrors(newErrors); }
      return;
    }

    // validate type
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      const newErrors = { ...validationErrors };
      newErrors[id] = { ...(newErrors[id] || {}), image: 'Only JPG and PNG files are supported' };
      setValidationErrors(newErrors);
      return;
    }
    if (file.size > MAX_IMAGE_SIZE) {
      const newErrors = { ...validationErrors };
      newErrors[id] = { ...(newErrors[id] || {}), image: `Image must be ${Math.round(MAX_IMAGE_SIZE/1024/1024)}MB or smaller` };
      setValidationErrors(newErrors);
      return;
    }

    // read as data url and store in story.image; also store file object
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      handleUpdate(id, 'image', result);
      handleUpdate(id, 'imageFile' as any, file);
      const newErrors = { ...validationErrors };
      if (newErrors[id]) { delete newErrors[id].image; setValidationErrors(newErrors); }
    };
    reader.readAsDataURL(file);
  }, [stories, validationErrors]);

  const handleSaveStory = (storyId: string) => {
    (async () => {
      const story = stories.find(s => s.id === storyId);
      if (!story) return;

      const errors = validateStory(story);
      if (Object.keys(errors).length > 0) {
        setValidationErrors({ ...validationErrors, [storyId]: errors });
        toast.error('Please fix the validation errors');
        return;
      }

      // Clear validation errors for this story
      const newErrors = { ...validationErrors };
      delete newErrors[storyId];
      setValidationErrors(newErrors);

      try {
        // If it's a temp id, create (POST), otherwise update (PUT)
        if (story.id.startsWith('temp-')) {
          // If an image file was selected, upload it to blob first and use returned URL
          let uploadedThumbnail: string | null = null;
          const imgFile = (story as any).imageFile as File | undefined;
              if (imgFile) {
            try {
              const form = new FormData();
              form.append('file', imgFile);
              const upResp = await fetch('/api/admin/upload/thumbnail', { method: 'POST', headers: getAuthHeaders(), body: form });
              const upJ = await upResp.json();
              if (upJ && upJ.success) {
                uploadedThumbnail = upJ.url || upJ.thumbRef || null;
              } else {
                toast.error(upJ?.error || 'Failed to upload image');
                return;
              }
            } catch (err) {
              logDevError('Upload error', err);
              toast.error('Failed to upload image');
              return;
            }
          }

          const payload: any = {
            title: story.type === 'text' ? (story.name || 'Untitled') : (story.title || 'Untitled'),
            // send role and location separately
            category: story.category || null,
            role: story.role || null,
            location: story.location || null,
            body: story.type === 'text' ? story.text || null : null,
            // include optional email for text stories
            email: story.type === 'text' ? story.email || null : null,
            date: story.date || null,
            media_type: story.type,
            video_url: story.type === 'video' ? story.youtubeUrl || null : null,
            thumbnail_url: uploadedThumbnail ?? story.image ?? null,
          };
          const resp = await fetch('/api/admin/stories', { method: 'POST', headers: getAuthHeaders('application/json'), body: JSON.stringify(payload) });
          const j = await resp.json();
          if (j && j.success) {
            // replace temp id with returned story mapped to client shape
            const mapped = mapRowToClient(j.data, story);
            setStories(s => s.map(x => x.id === storyId ? mapped : x));
            toast.success('Story created');
          } else {
            toast.error(j?.error || 'Failed to create story');
            return;
          }
          } else {
          // Build an updates payload that matches DB column names
          const updates: any = { id: Number(story.id) };
          // If image file selected, upload first
          let uploadedThumbnail: string | null = null;
          const imgFile = (story as any).imageFile as File | undefined;
          if (imgFile) {
            try {
              const form = new FormData();
              form.append('file', imgFile);
              const upResp = await fetch('/api/admin/upload/thumbnail', { method: 'POST', headers: getAuthHeaders(), body: form });
              const upJ = await upResp.json();
              if (upJ && upJ.success) {
                uploadedThumbnail = upJ.url || upJ.thumbRef || null;
              } else {
                toast.error(upJ?.error || 'Failed to upload image');
                return;
              }
            } catch (err) {
              logDevError('Upload error', err);
              toast.error('Failed to upload image');
              return;
            }
          }
          if (story.type === 'text') {
            updates.title = story.name || story.title || '';
            updates.category = story.category || null;
            // send role and location fields separately
            updates.role = story.role || null;
            updates.location = story.location || null;
            updates.email = story.email || null;
            updates.body = story.text || null;
            updates.media_type = 'text';
            updates.thumbnail_url = uploadedThumbnail ?? story.image ?? (story as any).thumbnail_url ?? null;
            // include date for text stories
            updates.date = story.date || null;
          } else {
            updates.title = story.title || '';
            updates.category = story.category || null;
            updates.video_url = (story as any).youtubeUrl || null;
            updates.role = story.role || null;
            updates.location = story.location || null;
            updates.media_type = 'video';
            updates.thumbnail_url = uploadedThumbnail ?? story.image ?? (story as any).thumbnail_url ?? null;
            // include date for video stories too
            updates.date = story.date || null;
          }
          // include visible/status if present in UI
          if (typeof story.is_visible !== 'undefined') updates.is_visible = story.is_visible;
          if (story.status) updates.status = story.status;

          const resp = await fetch('/api/admin/stories', { method: 'PUT', headers: getAuthHeaders('application/json'), body: JSON.stringify(updates) });
          const j = await resp.json();
          if (j && j.success) {
            const mapped = mapRowToClient(j.data, story);
            setStories(s => s.map(x => x.id === story.id ? mapped : x));
            toast.success('Story updated');
          } else {
            toast.error(j?.error || 'Failed to update story');
            return;
          }
        }
        setEditingId(null);
      } catch (err) {
        logDevError('Save story error', err);
        toast.error('Failed to save story');
      }
    })();
  };

  const handleAddTextStory = () => {
    // If a form is already open, show the in-app confirmation modal
    if (editingId) {
      setUnsavedDialog({ open: true, pendingType: 'text' });
      return;
    }

    // otherwise open new immediately
    const newStory: Story = {
      id: `temp-${Date.now()}`,
      type: 'text',
      category: filterCategory,
      name: '',
      role: '',
      date: new Date().toISOString().split('T')[0],
      location: '',
      image: '',
      text: '',
      status: 'Submitted',
      featured: false
    };
    setStories(prev => [newStory, ...prev]);
    setEditingId(newStory.id);
  };

  const handleAddVideoStory = () => {
    if (editingId) {
      setUnsavedDialog({ open: true, pendingType: 'video' });
      return;
    }

    const newStory: Story = {
      id: `temp-${Date.now()}`,
      type: 'video',
      category: filterCategory,
      title: '',
      date: new Date().toISOString().split('T')[0],
      youtubeUrl: '',
      role: '',
      location: '',
      status: 'Submitted',
      featured: false
    };
    setStories(prev => [newStory, ...prev]);
    setEditingId(newStory.id);
  };

  const handleDelete = (id: string) => {
    const story = stories.find(s => s.id === id);
    const rawName = story?.type === 'text' ? story.name : story?.title;
    const name = sanitizeInlineLabel(rawName) || '';
    setDeleteDialog({ open: true, id: String(id), name });
  };

  const confirmDelete = () => {
    (async () => {
      try {
        // If it's a temp id, just remove locally
        if (String(deleteDialog.id).startsWith('temp-')) {
          setStories(s => s.filter(x => x.id !== deleteDialog.id));
          toast.success('Story removed');
          setDeleteDialog({ open: false, id: '', name: '' });
          return;
        }
        const resp = await fetch(`/api/admin/stories?ids=${deleteDialog.id}`, { method: 'DELETE', headers: getAuthHeaders() });
        const j = await resp.json();
        if (j && j.success) {
          // refetch stories to keep things consistent
          await fetchStories();
          toast.success(j.message || 'Deleted');
        } else {
          toast.error(j?.error || 'Failed to delete');
        }
      } catch (err) {
        logDevError('Delete story error', err);
        toast.error('Failed to delete');
      } finally {
        setDeleteDialog({ open: false, id: '', name: '' });
      }
    })();
  };

  // Handlers for the unsaved-form modal actions
  const handleUnsavedSaveDraft = () => {
    const current = stories.find(s => s.id === editingId);
    if (current) {
      try {
        localStorage.setItem(`story_draft_${current.id}`, JSON.stringify(current));
        toast.success('Draft saved');
      } catch (e) {
        logDevError('Failed to save draft', e);
        toast.error('Failed to save draft');
      }
    }

    // create the requested new form and prepend it using a functional update to avoid stale state
    if (unsavedDialog.pendingType === 'text') {
      const newStory: Story = {
        id: `temp-${Date.now()}`,
        type: 'text',
        category: filterCategory,
        name: '',
        role: '',
        date: new Date().toISOString().split('T')[0],
        location: '',
        image: '',
        text: '',
        status: 'Submitted',
        featured: false
      };
      setStories(prev => [newStory, ...prev]);
      setEditingId(newStory.id);
    } else if (unsavedDialog.pendingType === 'video') {
      const newStory: Story = {
        id: `temp-${Date.now()}`,
        type: 'video',
        category: filterCategory,
        title: '',
        date: new Date().toISOString().split('T')[0],
        youtubeUrl: '',
        status: 'Submitted',
        featured: false
      };
      setStories(prev => [newStory, ...prev]);
      setEditingId(newStory.id);
    }
    setUnsavedDialog({ open: false, pendingType: null });
  };

  const handleUnsavedDiscard = () => {
    const currentId = editingId;
    // remove the temp draft (functional update)
    setStories(prev => prev.filter(s => s.id !== currentId));
    try { if (currentId) localStorage.removeItem(`story_draft_${currentId}`); } catch (e) {}
    setEditingId(null);

    // open new form (functional prepend)
    if (unsavedDialog.pendingType === 'text') {
      const newStory: Story = {
        id: `temp-${Date.now()}`,
        type: 'text',
        category: filterCategory,
        name: '',
        role: '',
        date: new Date().toISOString().split('T')[0],
        location: '',
        image: '',
        text: '',
        status: 'Submitted',
        featured: false
      };
      setStories(prev => [newStory, ...prev]);
      setEditingId(newStory.id);
    } else if (unsavedDialog.pendingType === 'video') {
      const newStory: Story = {
        id: `temp-${Date.now()}`,
        type: 'video',
        category: filterCategory,
        title: '',
        date: new Date().toISOString().split('T')[0],
        youtubeUrl: '',
        status: 'Submitted',
        featured: false
      };
      setStories(prev => [newStory, ...prev]);
      setEditingId(newStory.id);
    }
    setUnsavedDialog({ open: false, pendingType: null });
  };

  const handleUnsavedCancel = () => {
    setUnsavedDialog({ open: false, pendingType: null });
  };

  const handleCancel = (id: string) => {
    const story = stories.find(s => s.id === id);
    
    // If it's a new story (empty fields), delete it
    if (story) {
      if (String(story.id).startsWith('temp-')) {
        setStories(prev => prev.filter(s => s.id !== id));
      } else if (story.type === 'text' && !story.name && !story.role && !story.location && !story.text) {
        setStories(prev => prev.filter(s => s.id !== id));
      } else if (story.type === 'video' && !story.title && !story.youtubeUrl) {
        setStories(prev => prev.filter(s => s.id !== id));
      }
    }
    
    // Clear validation errors
    const newErrors = { ...validationErrors };
    delete newErrors[id];
    setValidationErrors(newErrors);
    setEditingId(null);
  };

  const handleUpdate = useCallback((id: string, field: keyof Story, rawValue: any) => {
    // sanitize value before updating state
    let value = rawValue;
    if (typeof value === 'string' && (field === 'name' || field === 'role' || field === 'location')) {
      value = value.replace(/\d/g, '');
    }

    // Single state update using functional setter to avoid stale closures
    setStories(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s));

    // Clear validation error for this field when user starts typing
    setValidationErrors(prev => {
      if (!prev[id]) return prev;
      const copy = { ...prev };
      if (copy[id]) {
        const fieldCopy = { ...copy[id] };
        delete fieldCopy[field as keyof ValidationErrors];
        if (Object.keys(fieldCopy).length === 0) {
          delete copy[id];
        } else {
          copy[id] = fieldCopy;
        }
      }
      return copy;
    });
  }, []);

  const handleStatusChange = (id: string, newStatus: 'Submitted' | 'In-Review' | 'Approved' | 'Rejected') => {
    (async () => {
      try {
        const resp = await fetch('/api/admin/stories', { method: 'PUT', headers: getAuthHeaders('application/json'), body: JSON.stringify({ id: Number(id), status: newStatus }) });
        const j = await resp.json();
          if (j && j.success) {
          // map server response back into UI shape, preserving existing client fields
          const existing = stories.find(s => s.id === id);
          const mapped = mapRowToClient(j.data, existing);
          setStories(s => s.map(x => x.id === id ? mapped : x));
          toast.success(`Story status updated to ${newStatus}`);
        } else {
          toast.error(j?.error || 'Failed to update status');
        }
      } catch (err) {
        logDevError('Status update error', err);
        toast.error('Failed to update status');
      }
    })();
  };

  const toggleVisibility = (story: Story) => {
    (async () => {
      try {
        const resp = await fetch('/api/admin/stories', { method: 'PUT', headers: getAuthHeaders('application/json'), body: JSON.stringify({ id: Number(story.id), is_visible: !story.is_visible }) });
        const j = await resp.json();
        if (j && j.success) {
          const mapped = mapRowToClient(j.data, story);
          setStories(s => s.map(x => x.id === story.id ? mapped : x));
          toast.success('Visibility updated');
        } else {
          toast.error(j?.error || 'Failed to update visibility');
        }
      } catch (err) {
        logDevError('Visibility toggle error', err);
        toast.error('Failed to update visibility');
      }
    })();
  };

  const getStatusColor = (status?: string) => {
    const colors: Record<string, string> = {
      'Submitted': 'bg-yellow-900/30 text-yellow-400 border-yellow-700',
      'In-Review': 'bg-blue-900/30 text-blue-400 border-blue-700',
      'Approved': 'bg-green-900/30 text-green-400 border-green-700',
      'Rejected': 'bg-red-900/30 text-red-400 border-red-700',
    };
    return colors[status || 'Submitted'] || colors['Submitted'];
  };

  const getPublishedBadgeColor = (isVisible?: boolean) => {
    // Always return a tailwind class set string for the published/draft badge
    if (isVisible) return 'px-2 py-0.5 text-xs rounded border bg-green-900/30 text-green-400 border-green-700';
    return 'px-2 py-0.5 text-xs rounded border bg-gray-800/30 text-gray-300 border-gray-700';
  };

  // Format date for display in cards (e.g., "Nov 17, 2025")
  const formatCardDate = (d?: string) => {
    try {
      if (!d) return '';
      const s = String(d).includes('T') ? String(d).split('T')[0] : String(d).split(' ')[0];
      const parts = s.split('-').map(p => Number(p));
      if (parts.length === 3 && parts.every(p => !Number.isNaN(p))) {
        const [y, m, day] = parts;
        return format(new Date(y, m - 1, day), 'MMM dd, yyyy');
      }
      const dt = new Date(d);
      if (!isNaN(dt.getTime())) return format(dt, 'MMM dd, yyyy');
    } catch (e) {
      // ignore and fallback
    }
    return String(d).substring(0, 10);
  };

  // Hide accidental small type labels like 'text' or 'video' when rendering
  const sanitizeInlineLabel = (s?: string) => {
    if (!s) return '';
    const t = String(s).trim();
    const low = t.toLowerCase();
    if (low === 'text' || low === 'video') return '';
    return t;
  };

  // Compute filtered stories (memoized — avoids recalculation on every render)
  const filteredStories = useMemo(() => {
    let res = stories;
    if (filterCategory) res = res.filter(s => s.category === filterCategory);
    if (filterType !== 'All') res = res.filter(s => s.type === filterType);
    if (filterStatus !== 'All') res = res.filter(s => s.status === filterStatus);
    return res;
  }, [stories, filterCategory, filterStatus, filterType]);

  // Counts for the currently selected category
  const countsInCategory = useMemo(() => {
    const items = stories.filter(s => s.category === filterCategory);
    return {
      total: items.length,
      text: items.filter(s => s.type === 'text').length,
      video: items.filter(s => s.type === 'video').length,
      published: items.filter(s => s.is_visible).length,
      draft: items.filter(s => !s.is_visible).length,
    };
  }, [stories, filterCategory]);

  const statusCounts = useMemo(() => ({
    All: stories.length,
    Submitted: stories.filter(s => s.status === 'Submitted').length,
    'In-Review': stories.filter(s => s.status === 'In-Review').length,
    Approved: stories.filter(s => s.status === 'Approved').length,
    Rejected: stories.filter(s => s.status === 'Rejected').length,
  }), [stories]);

  return (
    <div
      className="p-6"
      style={{ ['--input-background' as any]: '#2e2e2e', ['--input' as any]: '#2e2e2e' }}
    >
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-white mb-1">Stories Management</h2>
          <p className="text-sm text-gray-400">Review and approve testimonies from your community</p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={handleAddTextStory}
            className="flex items-center gap-3 px-4 py-2 bg-[#111] text-white border border-[#FDB813] rounded-md hover:bg-[#0d0d0d] transition-colors cursor-pointer"
          >
            <span className="inline-flex items-center justify-center h-5 w-5 rounded-full">
              <Plus size={14} className="text-white" />
            </span>
            <span className="font-medium">Add Text Story</span>
          </Button>
          <Button
            onClick={handleAddVideoStory}
            className="flex items-center gap-3 px-4 py-2 bg-[#111] text-white border border-[#FDB813] rounded-md hover:bg-[#0d0d0d] transition-colors cursor-pointer"
          >
            <span className="inline-flex items-center justify-center h-5 w-5 rounded-full">
              <Plus size={14} className="text-white" />
            </span>
            <span className="font-medium">Add Video Story</span>
          </Button>
        </div>
      </div>

      {/* Status Filter */}
      <div className="mb-6 flex gap-2 flex-wrap">
          {(['All', 'Submitted', 'In-Review', 'Approved', 'Rejected'] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-2 rounded-lg text-sm transition-colors cursor-pointer ${
              filterStatus === status
                ? 'bg-[#FDB813] text-black'
                : 'bg-black border border-gray-700 text-gray-300 hover:bg-[#2E2E2E]'
            }`}
          >
            {status} <span className="ml-1 text-sm font-medium opacity-90">({statusCounts[status]})</span>
          </button>
        ))}
      </div>

      {/* Category Filter */}
      <div className="mb-4">
        <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-64 !bg-[#2e2e2e] text-white border-2 border-[#FDB813] rounded-lg px-3 py-2 cursor-pointer" style={{ backgroundColor: '#2e2e2e', color: '#fff' }}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="!bg-[#2e2e2e] border-2 border-[#FDB813] rounded-lg" style={{ backgroundColor: '#2e2e2e', color: '#fff' }}>
              {CATEGORIES.map(cat => (
                <SelectItem key={cat} value={cat} className="!bg-[#2e2e2e] text-white cursor-pointer hover:bg-blue-600 hover:text-white px-3 py-2">{cat}</SelectItem>
              ))}
            </SelectContent>
        </Select>
        <div className="mt-2 text-white text-base font-medium">
          Total: <span className="text-[#FDB813]">{countsInCategory.total}</span> story(s)
          <span className="mx-2">|</span>
          Published: <span className="text-[#FDB813]">{countsInCategory.published}</span>
        </div>
      </div>

      {/* Type Filter (show counts for selected category) */}
      <div className="mb-4 flex gap-2 flex-wrap">
        <button
          onClick={() => setFilterType('All')}
          className={`px-4 py-2 rounded-lg text-sm transition-colors cursor-pointer ${
            filterType === 'All' ? 'bg-[#FDB813] text-black' : 'bg-black border border-gray-700 text-gray-300 hover:bg-[#2E2E2E]'
          }`}
        >
          All ({countsInCategory.total})
        </button>
        <button
          onClick={() => setFilterType('text')}
          className={`px-4 py-2 rounded-lg text-sm transition-colors cursor-pointer ${
            filterType === 'text' ? 'bg-[#FDB813] text-black' : 'bg-black border border-gray-700 text-gray-300 hover:bg-[#2E2E2E]'
          }`}
        >
          Text Story ({countsInCategory.text})
        </button>
        <button
          onClick={() => setFilterType('video')}
          className={`px-4 py-2 rounded-lg text-sm transition-colors cursor-pointer ${
            filterType === 'video' ? 'bg-[#FDB813] text-black' : 'bg-black border border-gray-700 text-gray-300 hover:bg-[#2E2E2E]'
          }`}
        >
          Video Story ({countsInCategory.video})
        </button>
      </div>

      <div className="space-y-4">
        {filteredStories.length === 0 ? (
          <div className="text-center py-12 bg-black border border-gray-700 rounded-lg">
            <MessageCircle size={48} className="mx-auto text-gray-600 mb-3" />
            <p className="text-gray-400">No stories in this category.</p>
          </div>
        ) : (
          filteredStories.map((story) => (
            <div key={story.id} className="bg-black p-5 rounded-lg border border-gray-700 hover:shadow-sm transition-shadow">
              {editingId === story.id ? (
              <div className="space-y-4">
                {/* Story Type Badge */}
                <div className="flex items-center gap-2 mb-2">
                  {story.type === 'text' ? (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-600 text-white text-xs">
                      <FileText size={12} />
                      Text Story
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-red-600 text-white text-xs">
                      <Video size={12} />
                      Video Story
                    </span>
                  )}
                  <span className={`${getPublishedBadgeColor(story.is_visible)} ml-2`}>{story.is_visible ? 'Published' : 'Draft'}</span>
                </div>

                {/* Category (for new stories the category is taken from the top filter; existing stories remain editable) */}
                <div className="space-y-2">
                  <Label className="text-gray-300">Category <span className="text-red-500">*</span></Label>
                  {story.id.startsWith('temp-') ? (
                    <Input
                      value={filterCategory}
                      readOnly
                      className="!bg-[#2e2e2e] border-gray-600 text-white rounded-lg px-3 py-2 cursor-default"
                    />
                  ) : (
                    <Select 
                      value={story.category} 
                      onValueChange={(value) => handleUpdate(story.id, 'category', value)}
                    >
                      <SelectTrigger className="!bg-[#2e2e2e] text-white border-2 border-[#FDB813] rounded-lg px-3 py-2 cursor-pointer" style={{ backgroundColor: '#2e2e2e', color: '#fff' }}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="!bg-[#2e2e2e] border-2 border-[#FDB813] rounded-lg" style={{ backgroundColor: '#2e2e2e', color: '#fff' }}>
                        {CATEGORIES.map(cat => (
                          <SelectItem key={cat} value={cat} className="!bg-[#2e2e2e] text-white cursor-pointer hover:bg-blue-600 hover:text-white px-3 py-2">{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>

                {story.type === 'text' ? (
                  // Text Story Fields
                  <>
                    <div className="grid grid-cols-2 gap-3">
                      {/* Full Name */}
                      <div className="space-y-2">
                        <Label className="text-gray-300">
                          Full Name <span className="text-red-500">*</span>
                          <span className="text-xs text-gray-500 ml-2">
                            ({(story.name || '').length}/{CHAR_LIMITS.name})
                          </span>
                        </Label>
                        <Input
                          value={story.name || ''}
                          onChange={(e) => handleUpdate(story.id, 'name', e.target.value.slice(0, CHAR_LIMITS.name))}
                          placeholder="Full Name"
                          className={`!bg-[#2e2e2e] border-gray-600 text-white ${
                            validationErrors[story.id]?.name ? 'border-red-500' : ''
                          }`}
                          maxLength={CHAR_LIMITS.name}
                        />
                        {validationErrors[story.id]?.name && (
                          <p className="text-xs text-red-500">{validationErrors[story.id].name}</p>
                        )}
                        {/* Email (optional) */}
                        <div className="mt-2">
                          <Label className="text-gray-300 mb-1">Email</Label>
                          <Input
                            value={story.email || ''}
                            onChange={(e) => handleUpdate(story.id, 'email', e.target.value.slice(0, CHAR_LIMITS.email))}
                            placeholder="example@domain.com"
                            className={`!bg-[#2e2e2e] border-gray-600 text-white ${
                              validationErrors[story.id]?.email ? 'border-red-500' : ''
                            }`}
                            maxLength={CHAR_LIMITS.email}
                          />
                          {validationErrors[story.id]?.email && (
                            <p className="text-xs text-red-500">{validationErrors[story.id].email}</p>
                          )}
                        </div>
                      </div>

                      {/* Role */}
                      <div className="space-y-2">
                        <Label className="text-gray-300">
                          Role <span className="text-red-500">*</span>
                          <span className="text-xs text-gray-500 ml-2">
                            ({(story.role || '').length}/{CHAR_LIMITS.role})
                          </span>
                        </Label>
                        <Input
                          value={story.role || ''}
                          onChange={(e) => handleUpdate(story.id, 'role', e.target.value.slice(0, CHAR_LIMITS.role))}
                          placeholder="Role (e.g., Participant, Student)"
                          className={`!bg-[#2e2e2e] border-gray-600 text-white ${
                            validationErrors[story.id]?.role ? 'border-red-500' : ''
                          }`}
                          maxLength={CHAR_LIMITS.role}
                        />
                        {validationErrors[story.id]?.role && (
                          <p className="text-xs text-red-500">{validationErrors[story.id].role}</p>
                        )}
                      </div>

                      {/* Date */}
                      <div className="space-y-2">
                        <Label className="text-gray-300">Date <span className="text-red-500">*</span></Label>
                        <DatePicker
                          value={story.date}
                          onChange={(date) => handleUpdate(story.id, 'date', date)}
                        />
                      </div>

                      {/* Location */}
                      <div className="space-y-2">
                        <Label className="text-gray-300">
                          Location <span className="text-red-500">*</span>
                          <span className="text-xs text-gray-500 ml-2">
                            ({(story.location || '').length}/{CHAR_LIMITS.location})
                          </span>
                        </Label>
                        <Input
                          value={story.location || ''}
                          onChange={(e) => handleUpdate(story.id, 'location', e.target.value.slice(0, CHAR_LIMITS.location))}
                          placeholder="Location (e.g., Mumbai, India)"
                          className={`!bg-[#2e2e2e] border-gray-600 text-white ${
                            validationErrors[story.id]?.location ? 'border-red-500' : ''
                          }`}
                          maxLength={CHAR_LIMITS.location}
                        />
                        {validationErrors[story.id]?.location && (
                          <p className="text-xs text-red-500">{validationErrors[story.id].location}</p>
                        )}
                      </div>
                    </div>

                    {/* Profile Image Upload or URL */}
                    <div className="space-y-2">
                      <Label className="text-gray-300">Profile Image (optional)</Label>
                      <div
                        role="button"
                        tabIndex={0}
                        aria-label="Upload profile image. Click or drag image to upload"
                        className="flex items-center justify-center w-full px-4 py-6 border-2 border-dashed rounded-md border-gray-700 !bg-[#2e2e2e] text-gray-300 cursor-pointer"
                        onClick={() => document.getElementById(`file-input-${story.id}`)?.click()}
                        onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            document.getElementById(`file-input-${story.id}`)?.click();
                          }
                        }}
                        onDragOver={(e) => { e.preventDefault(); }}
                        onDrop={(e) => {
                          e.preventDefault();
                          const f = e.dataTransfer?.files?.[0];
                          if (f) handleImageFileChange(story.id, f);
                        }}
                      >
                        <input
                          id={`file-input-${story.id}`}
                          type="file"
                          accept=".jpg,.jpeg,.png"
                          onChange={(e) => handleImageFileChange(story.id, e.target.files?.[0] || undefined)}
                          className="hidden"
                        />
                        <div className="text-center">
                          <div className="mb-1 font-medium">Click or drag image here to upload</div>
                          <div className="text-xs text-gray-500">PNG or JPG, max 2MB</div>
                        </div>
                      </div>
                      {validationErrors[story.id]?.image && (
                        <p className="text-xs text-red-500">{validationErrors[story.id].image}</p>
                      )}

                      {story.image && (
                        <div className="mt-2">
                          <img src={story.image} alt="preview" className="w-24 h-24 object-cover rounded-full border border-gray-700" />
                        </div>
                      )}
                    </div>

                    {/* Testimony/Story Text */}
                    <div className="space-y-2">
                      <Label className="text-gray-300">
                        Testimony/Story Text <span className="text-red-500">*</span>
                        <span className="text-xs text-gray-500 ml-2">
                          ({(story.text || '').length}/{CHAR_LIMITS.text})
                        </span>
                      </Label>
                      <Textarea
                        value={story.text || ''}
                        onChange={(e) => handleUpdate(story.id, 'text', e.target.value.slice(0, CHAR_LIMITS.text))}
                        placeholder="Testimony/Story Text"
                        className={`!bg-[#2e2e2e] border-gray-600 text-white ${
                          validationErrors[story.id]?.text ? 'border-red-500' : ''
                        }`}
                        rows={5}
                        maxLength={CHAR_LIMITS.text}
                      />
                      {validationErrors[story.id]?.text && (
                        <p className="text-xs text-red-500">{validationErrors[story.id].text}</p>
                      )}
                    </div>
                  </>
                ) : (
                  // Video Story Fields
                  <>
                    {/* Title */}
                    <div className="space-y-2">
                      <Label className="text-gray-300">
                        Title <span className="text-red-500">*</span>
                        <span className="text-xs text-gray-500 ml-2">
                          ({(story.title || '').length}/{CHAR_LIMITS.title})
                        </span>
                      </Label>
                        <Input
                        value={story.title || ''}
                        onChange={(e) => handleUpdate(story.id, 'title', e.target.value.slice(0, CHAR_LIMITS.title))}
                        placeholder="Video Title"
                        className={`!bg-[#2e2e2e] border-gray-600 text-white ${
                          validationErrors[story.id]?.title ? 'border-red-500' : ''
                        }`}
                        maxLength={CHAR_LIMITS.title}
                      />
                      {validationErrors[story.id]?.title && (
                        <p className="text-xs text-red-500">{validationErrors[story.id].title}</p>
                      )}
                    </div>

                    {/* Role (for video stories) - moved here per request */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label className="text-gray-300">Role <span className="text-red-500">*</span></Label>
                        <Input
                          value={story.role || ''}
                          onChange={(e) => handleUpdate(story.id, 'role', e.target.value.slice(0, CHAR_LIMITS.role))}
                          placeholder="Role (e.g., Participant, Student)"
                          className={`!bg-[#2e2e2e] border-gray-600 text-white ${validationErrors[story.id]?.role ? 'border-red-500' : ''}`}
                          maxLength={CHAR_LIMITS.role}
                        />
                        {validationErrors[story.id]?.role && (
                          <p className="text-xs text-red-500">{validationErrors[story.id].role}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label className="text-gray-300">Location <span className="text-red-500">*</span></Label>
                        <Input
                          value={story.location || ''}
                          onChange={(e) => handleUpdate(story.id, 'location', e.target.value.slice(0, CHAR_LIMITS.location))}
                          placeholder="Location (e.g., Mumbai, India)"
                          className={`!bg-[#2e2e2e] border-gray-600 text-white ${validationErrors[story.id]?.location ? 'border-red-500' : ''}`}
                          maxLength={CHAR_LIMITS.location}
                        />
                        {validationErrors[story.id]?.location && (
                          <p className="text-xs text-red-500">{validationErrors[story.id].location}</p>
                        )}
                      </div>
                    </div>

                    {/* Date */}
                    <div className="space-y-2">
                      <Label className="text-gray-300">Date <span className="text-red-500">*</span></Label>
                      <DatePicker
                        value={story.date}
                        onChange={(date) => handleUpdate(story.id, 'date', date)}
                      />
                    </div>

                    {/* YouTube URL */}
                    <div className="space-y-2">
                      <Label className="text-gray-300">
                        YouTube URL <span className="text-red-500">*</span>
                        <span className="text-xs text-gray-500 ml-2">
                          ({(story.youtubeUrl || '').length}/{CHAR_LIMITS.youtubeUrl})
                        </span>
                      </Label>
                      <Input
                        value={story.youtubeUrl || ''}
                        onChange={(e) => handleUpdate(story.id, 'youtubeUrl', e.target.value.slice(0, CHAR_LIMITS.youtubeUrl))}
                        placeholder="https://www.youtube.com/watch?v=..."
                        className={`!bg-[#2e2e2e] border-gray-600 text-white ${
                          validationErrors[story.id]?.youtubeUrl ? 'border-red-500' : ''
                        }`}
                        maxLength={CHAR_LIMITS.youtubeUrl}
                      />
                      {validationErrors[story.id]?.youtubeUrl && (
                        <p className="text-xs text-red-500">{validationErrors[story.id].youtubeUrl}</p>
                      )}
                      <p className="text-xs text-gray-500">
                        Paste the full YouTube URL (e.g., https://www.youtube.com/watch?v=dQw4w9WgXcQ)
                      </p>
                    </div>
                  </>
                )}

                {/* Status and Featured */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-gray-300">Status <span className="text-red-500">*</span></Label>
                    <Select 
                      value={story.status || 'Submitted'} 
                      onValueChange={(value: any) => handleUpdate(story.id, 'status', value)}
                    >
                        <SelectTrigger className="!bg-[#2e2e2e] text-white border-2 border-[#FDB813] rounded-lg px-3 py-2 cursor-pointer" style={{ backgroundColor: '#2e2e2e', color: '#fff' }}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="!bg-[#2e2e2e] border-2 border-[#FDB813] rounded-lg" style={{ backgroundColor: '#2e2e2e', color: '#fff' }}>
                          <SelectItem value="Submitted" className="!bg-[#2e2e2e] text-white cursor-pointer hover:bg-blue-600 hover:text-white px-3 py-2">Submitted</SelectItem>
                          <SelectItem value="In-Review" className="!bg-[#2e2e2e] text-white cursor-pointer hover:bg-blue-600 hover:text-white px-3 py-2">In-Review</SelectItem>
                          <SelectItem value="Approved" className="!bg-[#2e2e2e] text-white cursor-pointer hover:bg-blue-600 hover:text-white px-3 py-2">Approved</SelectItem>
                          <SelectItem value="Rejected" className="!bg-[#2e2e2e] text-white cursor-pointer hover:bg-blue-600 hover:text-white px-3 py-2">Rejected</SelectItem>
                        </SelectContent>
                    </Select>
                  </div>
                  {/* Featured checkbox removed per design change */}
                </div>

                {/* Action Buttons - moved to right and add icon on Save */}
                <div className="flex gap-2 justify-end">
                  <Button
                    onClick={() => handleCancel(story.id)}
                    className="bg-[#2E2E2E] hover:bg-[#1a1a1a] text-white border border-gray-600 cursor-pointer flex items-center"
                  >
                    <X size={16} className="mr-1" />
                    Cancel
                  </Button>
                  <Button
                    onClick={() => handleSaveStory(story.id)}
                    className="bg-[#FDB813] hover:bg-[#e5a610] text-black cursor-pointer flex items-center"
                  >
                    <Save size={16} className="mr-2" />
                    Save
                  </Button>
                </div>
              </div>
            ) : (
              // View Mode
              <div>
                <div className="flex items-start gap-4 mb-3">
                  {story.type === 'text' && story.image && (
                    <img 
                      src={story.image} 
                      alt={story.name}
                      className="w-16 h-16 object-cover rounded-full flex-shrink-0"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          {story.type === 'text' ? (
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-600 text-white text-xs">
                              <FileText size={12} />
                              Text Story
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-red-600 text-white text-xs">
                              <Video size={12} />
                              Video Story
                            </span>
                          )}
                          <h4 className="text-white">
                            {story.type === 'text' ? sanitizeInlineLabel(story.name) : sanitizeInlineLabel(story.title)}
                          </h4>
                          <span className={`px-2 py-0.5 text-xs rounded border ${getStatusColor(story.status)}`}>
                            {story.status || 'Submitted'}
                          </span>
                          <span className={`${getPublishedBadgeColor(story.is_visible)} ml-2`}>{story.is_visible ? 'Published' : 'Draft'}</span>
                          <span className={`ml-2 ${getPublishedBadgeColor(story.is_visible)}`}>{story.is_visible ? 'Published' : 'Draft'}</span>
                          {story.featured && (
                            <span className="px-2 py-0.5 bg-yellow-900/30 text-yellow-400 text-xs rounded">
                              Featured
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-400">
                          {([story.role, story.location].filter(Boolean).join(' • '))}
                          {((story.role || story.location) && story.date) ? ' • ' : ''}
                          {story.date ? formatCardDate(story.date) : ''}
                        </p>
                        {story.email ? (
                          <p className="text-sm text-gray-300 mt-1">{story.email}</p>
                        ) : null}
                        <p className="text-xs text-[#FDB813] mt-1">{story.category}</p>
                      </div>
                      <div className="flex gap-1 ml-4">
                        <Button
                          size="sm"
                          onClick={() => toggleVisibility(story)}
                          className="bg-[#2E2E2E] hover:rounded-md border border-[#FDB813] bg-[#2E2E2E] hover:bg-[#1a1a1a] text-white transition-colors"
                          aria-label={story.is_visible ? 'Unpublish' : 'Publish'}
                          title={story.is_visible ? 'Unpublish' : 'Publish'}
                        >
                          {story.is_visible ? <Eye size={18} /> : <EyeOff size={18} />}
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => setEditingId(story.id)}
                          className="rounded-md border border-[#FDB813] bg-[#2E2E2E] hover:bg-[#1a1a1a] text-white px-3 flex items-center gap-2 transition-colors"
                          aria-label="Edit"
                          title="Edit"
                        >
                          <Edit2 size={16} />
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleDelete(story.id)}
                          className="rounded-md border border-[#FDB813] bg-[#2E2E2E] hover:bg-[#1a1a1a] text-white p-2 transition-colors"
                          aria-label="Delete"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </div>
                    {story.type === 'text' && story.text && (
                      <p className="text-gray-300 text-sm mb-3 italic">"{story.text}"</p>
                    )}
                    {story.type === 'video' && story.youtubeUrl && (
                      <p className="text-gray-300 text-sm mb-3">
                        <a 
                          href={story.youtubeUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:underline cursor-pointer"
                        >
                          {story.youtubeUrl}
                        </a>
                      </p>
                    )}
                  </div>
                </div>
                
                {/* Status Actions */}
                <div className="flex gap-2">
                  {story.status !== 'In-Review' && (
                    <button
                      onClick={() => handleStatusChange(story.id, 'In-Review')}
                      className="px-3 py-1 text-xs bg-blue-900/30 text-blue-400 rounded hover:bg-blue-900/50 transition-colors cursor-pointer"
                    >
                      Mark In-Review
                    </button>
                  )}
                  {story.status !== 'Approved' && (
                    <button
                      onClick={() => handleStatusChange(story.id, 'Approved')}
                      className="px-3 py-1 text-xs bg-green-900/30 text-green-400 rounded hover:bg-green-900/50 transition-colors cursor-pointer"
                    >
                      Approve
                    </button>
                  )}
                  {story.status !== 'Rejected' && (
                    <button
                      onClick={() => handleStatusChange(story.id, 'Rejected')}
                      className="px-3 py-1 text-xs bg-red-900/30 text-red-400 rounded hover:bg-red-900/50 transition-colors cursor-pointer"
                    >
                      Reject
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
          ))
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        open={deleteDialog.open}
        onOpenChange={(open) => setDeleteDialog({ ...deleteDialog, open })}
        onConfirm={confirmDelete}
        itemType="story"
        itemName={deleteDialog.name}
      />

      {/* Unsaved-form confirmation modal (use AlertDialog to match delete dialog styling) */}
      <AlertDialog open={unsavedDialog.open} onOpenChange={(open) => setUnsavedDialog({ open, pendingType: open ? unsavedDialog.pendingType : null })}>
        <AlertDialogContent className="bg-[#2E2E2E] border-gray-700">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white text-xl">Save draft?</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-300 text-base">You have an unsaved story open.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-[#1a1a1a] hover:bg-[#2E2E2E] text-white hover:text-[#FDB813] border-gray-600">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleUnsavedDiscard} className="bg-[#FDB813] hover:bg-[#e5a610] text-black">
              Discard
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
