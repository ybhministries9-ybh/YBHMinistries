import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { sanitizeInput } from '@/lib/security';
import { Plus, X, Edit2, Video, FileText, CalendarIcon, Trash2, MessageCircle, Star, Eye, EyeOff, Save, Loader2 } from 'lucide-react';
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
  phone?: string;
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
  signedThumbUrl?: string | null;
}

interface ValidationErrors {
  name?: string;
  email?: string;
  phone?: string;
  role?: string;
  location?: string;
  text?: string;
  title?: string;
  youtubeUrl?: string;
  image?: string;
}

const CATEGORIES = [
  'Guinness World Records',
  'LCM Classes',
  'Online School',
  'Summer Camp',
  'Hallel Bible School',
  'Song Books',
  'Hallel Conference'
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
  const [text, setText] = useState<string>(value || ''); // Initialize text with value or empty string

  // Parse the date string (YYYY-MM-DD) correctly as local date
  const parseDateValue = (v?: string) => {
    if (!v) return undefined;
    try {
      let s = String(v).trim();
      if (!s) return undefined;
      if (s.includes('T')) s = s.split('T')[0];
      const parts = s.split('-').map(p => Number(p));
      if (parts.length === 3 && parts.every(p => !Number.isNaN(p))) {
        const [year, month, day] = parts;
        return new Date(year, month - 1, day);
      }
      const d = new Date(s);
      if (!isNaN(d.getTime())) return d;
    } catch (e) {
      // ignore
    }
    return undefined;
  };

  useEffect(() => {
    setText(value || '');
  }, [value]);

  const dateValue = parseDateValue(text || value);

  const today = new Date();
  today.setHours(23, 59, 59, 999);

  // displayMonth controls which month/year the calendar shows (so year select can jump)
  const [displayMonth, setDisplayMonth] = useState<Date | undefined>(() => parseDateValue(value));
  // Sync displayMonth when the incoming `value` string changes. Use the string value
  // so we don't trigger the effect on every render due to a freshly-created Date object.
  useEffect(() => {
    const dv = parseDateValue(value);
    setDisplayMonth(prev => {
      if (!dv) return undefined;
      if (!prev || dv.getTime() !== prev.getTime()) return dv;
      return prev;
    });
  }, [value]);

  const handleSelect = (date: Date | undefined) => {
    if (date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const formatted = `${year}-${month}-${day}`;
      setText(formatted);
      onChange(formatted);
      setDisplayMonth(date);
      setOpen(false);
    }
  };

  const handleInputChange = (v: string) => setText(v);

  const handleBlur = () => {
    const s = (text || '').trim();
    if (!s) { onChange(''); return; }
    const parsed = parseDateValue(s);
    if (parsed) {
      const year = parsed.getFullYear();
      const month = String(parsed.getMonth() + 1).padStart(2, '0');
      const day = String(parsed.getDate()).padStart(2, '0');
      const formatted = `${year}-${month}-${day}`;
      setText(formatted);
      onChange(formatted);
      setDisplayMonth(parsed);
    } else {
      setText(value || '');
    }
  };

  const handleClear = () => { setText(''); onChange(''); };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className={`flex items-center gap-2 ${className || ''}`}>
        <div style={{ width: '100%' }} className="relative">
            <Input
              value={text}
              onChange={(e: any) => handleInputChange(e.target.value)}
              onBlur={handleBlur}
              placeholder="YYYY-MM-DD"
              className="!bg-[#2e2e2e] border-gray-600 text-white pl-10 pr-3"
            />
          <PopoverTrigger asChild>
            <button
              type="button"
              aria-label="Open calendar"
              title="Open calendar"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white z-10"
            >
              <CalendarIcon />
            </button>
          </PopoverTrigger>
        </div>
        <button type="button" onClick={handleClear} className="text-xs text-gray-400 hover:text-gray-200">Clear</button>
      </div>
      <PopoverContent className="w-auto p-2 !bg-[#2e2e2e] border-gray-600" align="start" style={{ backgroundColor: '#2e2e2e', color: '#fff' }}>
        <div className="flex items-center justify-between px-2 pb-2 gap-2">
          <div className="flex items-center gap-2">
            <div className="text-sm text-gray-300">Month</div>
            <select
              value={displayMonth ? displayMonth.getMonth() : ''}
              onChange={(e) => {
                const m = Number(e.target.value);
                if (!Number.isFinite(m)) return;
                const y = displayMonth ? displayMonth.getFullYear() : new Date().getFullYear();
                setDisplayMonth(new Date(y, m, 1));
              }}
              className="bg-[#1a1a1a] text-white border border-gray-700 rounded px-2 py-1"
            >
              {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].map((label, i) => (
                <option key={i} value={i}>{label}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <div className="text-sm text-gray-300">Year</div>
            <select
              value={displayMonth ? displayMonth.getFullYear() : ''}
              onChange={(e) => {
                const y = Number(e.target.value);
                if (!Number.isFinite(y)) return;
                const m = displayMonth ? displayMonth.getMonth() : 0;
                setDisplayMonth(new Date(y, m, 1));
              }}
              className="bg-[#1a1a1a] text-white border border-gray-700 rounded px-2 py-1"
            >
              {(() => {
                const years: number[] = [];
                const currentYear = new Date().getFullYear();
                const start = Math.max(1900, currentYear - 100);
                const end = currentYear + 1;
                for (let y = end; y >= start; y--) years.push(y);
                return years.map((yr) => <option key={yr} value={yr}>{yr}</option>);
              })()}
            </select>
          </div>
        </div>
        <Calendar
          mode="single"
          // `selected` should be the actual selected date; `month` controls which
          // month is displayed. This prevents confusion when the user changes the
          // month/year view before picking a day.
          selected={dateValue}
          month={displayMonth}
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
  // Track which story's dropzone is active (hovered/dragged) to show accent border
  const [dragActiveId, setDragActiveId] = useState<string | null>(null);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [isDeletingImageId, setIsDeletingImageId] = useState<string | null>(null);
  // image delete UI: no immediate server-side deletion; deletion occurs on Save
  const [filterCategory, setFilterCategory] = useState<string>(CATEGORIES[0]);
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [filterType, setFilterType] = useState<string>('All');
  const [validationErrors, setValidationErrors] = useState<Record<string, ValidationErrors>>({});
  const [editingOriginals, setEditingOriginals] = useState<Record<string, Story>>({});
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; id: string; name: string }>({
    open: false,
    id: '',
    name: '',
  });

  // Unsaved-form confirmation dialog state
  const [unsavedDialog, setUnsavedDialog] = useState<{ open: boolean; pendingType?: 'text' | 'video' | null }>(
    { open: false, pendingType: null }
  );

  // WYSIWYG editor state for admin edit form (only one story edited at a time)
  const testimonyRef = React.useRef<HTMLDivElement | null>(null);
  const [isTestimonyEmpty, setIsTestimonyEmpty] = useState(true);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);

  const updateFormattingState = useCallback(() => {
    try {
      const sel = document.getSelection();
      if (!sel || !sel.anchorNode || !testimonyRef.current) {
        setIsBold(false); setIsItalic(false); setIsUnderline(false); return;
      }
      if (!testimonyRef.current.contains(sel.anchorNode)) {
        setIsBold(false); setIsItalic(false); setIsUnderline(false); return;
      }
      setIsBold(Boolean((document as any).queryCommandState && (document as any).queryCommandState('bold')));
      setIsItalic(Boolean((document as any).queryCommandState && (document as any).queryCommandState('italic')));
      setIsUnderline(Boolean((document as any).queryCommandState && (document as any).queryCommandState('underline')));
    } catch (e) { /* ignore */ }
  }, []);

  React.useEffect(() => {
    document.addEventListener('selectionchange', updateFormattingState);
    testimonyRef.current?.addEventListener('keyup', updateFormattingState);
    testimonyRef.current?.addEventListener('mouseup', updateFormattingState);
    return () => {
      document.removeEventListener('selectionchange', updateFormattingState);
      testimonyRef.current?.removeEventListener('keyup', updateFormattingState);
      testimonyRef.current?.removeEventListener('mouseup', updateFormattingState);
    };
  }, [updateFormattingState]);

  // Sync the contentEditable when a story enters edit mode
  React.useEffect(() => {
    if (!editingId) return;
    const s = stories.find(x => x.id === editingId);
    const html = (s?.text as string) || '';
    if (testimonyRef.current && testimonyRef.current.innerHTML !== html) {
      testimonyRef.current.innerHTML = html;
    }
    const textOnly = String(html || '').replace(/<[^>]*>/g, '').trim();
    setIsTestimonyEmpty(textOnly.length === 0);
  }, [editingId, stories]);

  // Debounce timer for admin content updates to avoid frequent state updates
  const adminUpdateTimer = React.useRef<number | null>(null);

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
    role: 100,
    location: 100,
    image: 500,
    title: 200,
    youtubeUrl: 500,
    text: 5000,
    email: 254,
    phone: 15
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
      const phone = row.phone || existing?.phone || '';
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
        phone,
        role,
        location,
        image: (row as any).signedThumbUrl || row.thumbnail_url || existing?.image || '',
        thumbnail_url: row.thumbnail_url || existing?.thumbnail_url || '',
        signedThumbUrl: (row as any).signedThumbUrl || existing?.signedThumbUrl || null,
        text: row.body || existing?.text || '',
      } as Story;
    }

    // video
    return {
      ...base,
      title: row.title || existing?.title || '',
      youtubeUrl: row.video_url || existing?.youtubeUrl || '',
      thumbnail_url: row.thumbnail_url || existing?.thumbnail_url || '',
      signedThumbUrl: (row as any).signedThumbUrl || existing?.signedThumbUrl || null,
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

      if (story.phone) {
        const phoneRe = /^[0-9+()\-\.\s]+$/;
        if (!phoneRe.test(story.phone)) {
          errors.phone = 'Invalid phone number';
        } else if (story.phone.length > CHAR_LIMITS.phone) {
          errors.phone = `Phone must be ${CHAR_LIMITS.phone} characters or less`;
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
      } else if ((story.text || '').trim().length < 50) {
        errors.text = 'Testimony must be at least 50 characters';
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
    // Accept common YouTube URL formats including watch, youtu.be and shorts
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|shorts\/)|youtu\.be\/)[\w-]+/;
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

  // placeholder now — moved lower after handleUpdate to avoid premature reference

  const handleSaveStory = (storyOrId: string | Story) => {
    (async () => {
      // Prefer the story object passed from the rendered closure to avoid
      // potential React state update ordering races (select change -> save click).
      const story = typeof storyOrId === 'string' ? stories.find(s => s.id === storyOrId) : storyOrId;
      if (!story) return;

      const errors = validateStory(story);
      if (Object.keys(errors).length > 0) {
        setValidationErrors({ ...validationErrors, [story.id]: errors });
        toast.error('Please fix the validation errors');
        return;
      }

      // Clear validation errors for this story
      const newErrors = { ...validationErrors };
      delete newErrors[story.id];
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
              const upResp = await fetch('/api/admin/upload/thumbnail?dest=stories/text/thumbnails/orig', { method: 'POST', headers: getAuthHeaders(), body: form });
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
            phone: story.type === 'text' ? story.phone || null : null,
            date: story.date || null,
            media_type: story.type,
            video_url: story.type === 'video' ? story.youtubeUrl || null : null,
            thumbnail_url: uploadedThumbnail ?? (story as any).thumbnail_url ?? null,
            // include status/visibility/featured from UI so non-default values are persisted
            status: story.status || 'Submitted',
            is_visible: typeof story.is_visible !== 'undefined' ? story.is_visible : true,
            featured: typeof story.featured !== 'undefined' ? story.featured : false,
          };
          const resp = await fetch('/api/admin/stories', { method: 'POST', headers: getAuthHeaders('application/json'), body: JSON.stringify(payload) });
          const j = await resp.json();
          if (j && j.success) {
            // replace temp id with returned story mapped to client shape
            const mapped = mapRowToClient(j.data, story);
            setStories(s => s.map(x => x.id === story.id ? mapped : x));
            toast.success('Story created');
            // remove snapshot store as we saved
            setEditingOriginals(prev => { const copy = { ...prev }; delete copy[story.id]; return copy; });
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
              const upResp = await fetch('/api/admin/upload/thumbnail?dest=stories/text/thumbnails/orig', { method: 'POST', headers: getAuthHeaders(), body: form });
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
            updates.phone = story.phone || null;
            updates.body = story.text || null;
            updates.media_type = 'text';
            updates.thumbnail_url = uploadedThumbnail ?? (story as any).thumbnail_url ?? null;
            // include date for text stories
            updates.date = story.date || null;
          } else {
            updates.title = story.title || '';
            updates.category = story.category || null;
            updates.video_url = (story as any).youtubeUrl || null;
            updates.role = story.role || null;
            updates.location = story.location || null;
            updates.media_type = 'video';
            updates.thumbnail_url = uploadedThumbnail ?? (story as any).thumbnail_url ?? null;
            // include date for video stories too
            updates.date = story.date || null;
          }
          // include visible/status/featured if present in UI
          if (typeof story.is_visible !== 'undefined') updates.is_visible = story.is_visible;
          if (typeof story.featured !== 'undefined') updates.featured = story.featured;
          if (typeof story.status !== 'undefined') updates.status = story.status;

          const resp = await fetch('/api/admin/stories', { method: 'PUT', headers: getAuthHeaders('application/json'), body: JSON.stringify(updates) });
          const j = await resp.json();
          if (j && j.success) {
            const mapped = mapRowToClient(j.data, story);
            setStories(s => s.map(x => x.id === story.id ? mapped : x));
            toast.success('Story updated');
            // remove snapshot store as we saved
            setEditingOriginals(prev => { const copy = { ...prev }; delete copy[story.id]; return copy; });
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
      status: 'Approved',
      featured: false,
      is_visible: true
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
      status: 'Approved',
      featured: false,
      is_visible: true
    };
    setStories(prev => [newStory, ...prev]);
    setEditingId(newStory.id);
  };

  // When an edit session starts, snapshot the existing row so we can restore on Cancel
  useEffect(() => {
    if (!editingId) return;
    const current = stories.find(s => s.id === editingId);
    if (!current) return;
    setEditingOriginals(prev => {
      if (prev[editingId]) return prev; // already captured
      return { ...prev, [editingId]: current };
    });
  }, [editingId, stories]);

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
    
    // Restore original values if we captured a snapshot
    if (editingOriginals[id]) {
      const original = editingOriginals[id];
      setStories(prev => prev.map(s => s.id === id ? original : s));
      setEditingOriginals(prev => { const copy = { ...prev }; delete copy[id]; return copy; });
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

  const handleDeleteImage = useCallback((id: string) => {
    const story = stories.find(s => s.id === id);
    if (!story) return;
    // For temp story, just clear preview state locally
    if (String(id).startsWith('temp-')) {
      handleImageFileChange(id, undefined);
      handleUpdate(id, 'image', '');
      handleUpdate(id, 'imageFile' as any, undefined);
      handleUpdate(id, 'thumbnail_url' as any, null);
      return;
    }
    // For persisted stories: remove preview locally and mark thumbnail for deletion
    // Do not call server; deletion will be done when Save is clicked
    handleUpdate(id, 'image', '');
    handleUpdate(id, 'thumbnail_url' as any, null);
    toast.success('Image removed from preview. Click Save to confirm deletion.');
  }, [stories, handleImageFileChange, handleUpdate]);

  // performDeleteImage removed: image deletion is local-only until Save is clicked

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
            className="flex items-center gap-3 px-4 py-2 bg-[#111] text-white border border-[#FDB813] rounded-md hover:bg-[#3E3E3E] transition-colors cursor-pointer"
          >
            <span className="inline-flex items-center justify-center h-5 w-5 rounded-full">
              <Plus size={14} className="text-white" />
            </span>
            <span className="font-medium">Add Text Story</span>
          </Button>
          <Button
            onClick={handleAddVideoStory}
            className="flex items-center gap-3 px-4 py-2 bg-[#111] text-white border border-[#FDB813] rounded-md hover:bg-[#3E3E3E] transition-colors cursor-pointer"
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
          Total: <span className="text-[#FDB813]">{countsInCategory.total}</span> Story(s)
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

                      {/* Email (required) */}
                      <div className="space-y-2">
                        <Label className="text-gray-300">Email <span className="text-xs text-gray-500 ml-2">({(story.email||'').length}/{CHAR_LIMITS.email})</span></Label>
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

                      {/* Phone (optional) */}
                      <div className="space-y-2">
                        <Label className="text-gray-300">Phone <span className="text-xs text-gray-500 ml-2">({(story.phone||'').length}/{CHAR_LIMITS.phone})</span></Label>
                        <Input
                          value={story.phone || ''}
                          onChange={(e) => handleUpdate(story.id, 'phone', e.target.value.slice(0, CHAR_LIMITS.phone))}
                          placeholder="Phone number"
                          className={`!bg-[#2e2e2e] border-gray-600 text-white ${
                            validationErrors[story.id]?.phone ? 'border-red-500' : ''
                          }`}
                          maxLength={CHAR_LIMITS.phone}
                        />
                        {validationErrors[story.id]?.phone && (
                          <p className="text-xs text-red-500">{validationErrors[story.id].phone}</p>
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
                        className={`flex items-center justify-center w-full px-4 py-6 border-2 border-dashed rounded-md text-gray-300 cursor-pointer ${dragActiveId === story.id ? 'border-[#FDB813] bg-[#1a1a1a]' : 'border-gray-700 !bg-[#2e2e2e]'}`}
                        onClick={() => document.getElementById(`file-input-${story.id}`)?.click()}
                        onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            document.getElementById(`file-input-${story.id}`)?.click();
                          }
                        }}
                        onDragOver={(e) => { e.preventDefault(); setDragActiveId(story.id); }}
                        onDragEnter={(e) => { e.preventDefault(); setDragActiveId(story.id); }}
                        onDragLeave={(e) => { e.preventDefault(); setDragActiveId(prev => prev === story.id ? null : prev); }}
                        onDrop={(e) => {
                          e.preventDefault();
                          const f = e.dataTransfer?.files?.[0];
                          if (f) handleImageFileChange(story.id, f);
                          // briefly highlight dropzone after drop so user gets visual confirmation
                          setDragActiveId(story.id);
                          setTimeout(() => setDragActiveId(prev => prev === story.id ? null : prev), 800);
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
                        <div className="mt-2 relative inline-block">
                          <img src={story.image} alt="preview" className="w-24 h-24 object-cover rounded-full border border-gray-700" />
                          <button
                            type="button"
                            aria-label="Delete image"
                            onClick={async (e) => {
                              e.stopPropagation();
                              handleDeleteImage(story.id);
                            }}
                            className="absolute top-0 right-0 p-1 bg-red-600 hover:bg-red-700 rounded-full text-white shadow-lg"
                          >
                            {isDeletingImageId === story.id ? <Loader2 className="animate-spin h-4 w-4" /> : <Trash2 className="h-4 w-4" />}
                          </button>
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
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <button
                            type="button"
                            onClick={() => { if (!testimonyRef.current) return; testimonyRef.current.focus(); document.execCommand('bold'); updateFormattingState(); }}
                            className={`px-2 py-1 rounded-md border ${isBold ? 'bg-[#FDB813] text-black border-[#e0a300]' : 'bg-[#1f1f1f] text-white border-gray-700'}`}
                          ><strong>B</strong></button>
                          <button
                            type="button"
                            onClick={() => { if (!testimonyRef.current) return; testimonyRef.current.focus(); document.execCommand('italic'); updateFormattingState(); }}
                            className={`px-2 py-1 rounded-md border ${isItalic ? 'bg-[#FDB813] text-black border-[#e0a300]' : 'bg-[#1f1f1f] text-white border-gray-700'}`}
                          ><em>I</em></button>
                          <button
                            type="button"
                            onClick={() => { if (!testimonyRef.current) return; testimonyRef.current.focus(); document.execCommand('underline'); updateFormattingState(); }}
                            className={`px-2 py-1 rounded-md border ${isUnderline ? 'bg-[#FDB813] text-black border-[#e0a300]' : 'bg-[#1f1f1f] text-white border-gray-700'}`}
                          ><span style={{ textDecoration: 'underline' }}>U</span></button>
                          <div className="relative">
                            <button type="button" onClick={() => setShowEmojiPicker(s => !s)} className="px-2 py-1 bg-[#1f1f1f] text-white rounded-md border border-gray-700">😊</button>
                            {showEmojiPicker && (
                              <div className="absolute left-0 mt-2 bg-[#2E2E2E] border border-gray-700 rounded-md p-2 shadow-lg z-20 min-w-[380px]">
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 40px)', gap: '8px', maxHeight: '40vh', overflow: 'auto', padding: '4px' }}>
                                  {[
                                    "😀","😃","😄","😁","😆","😂","🤣","😊","🙂","😉",
                                    "😍","😘","😚","😇","🤩","🤗","🙌","👏","👍","👎",
                                    "🙏","🎉","🔥","✨","💯","❤️","💙","💚","💛","🧡",
                                    "💜","😅","🤪","🤯","😴","😎","🤝","🤲","🤞","🤟"
                                  ].map((e, i) => (
                                    <button key={`${e}-${i}`} type="button" onClick={() => {
                                      if (!testimonyRef.current) return;
                                      testimonyRef.current.focus();
                                      try { document.execCommand('insertText', false, e); } catch (err) {
                                        const sel = document.getSelection(); if (!sel || !sel.rangeCount) return; const range = sel.getRangeAt(0); range.deleteContents(); range.insertNode(document.createTextNode(e)); range.setStartAfter(range.endContainer as Node); sel.removeAllRanges(); sel.addRange(range);
                                      }
                                      const html = testimonyRef.current.innerHTML || '';
                                      handleUpdate(story.id, 'text', html);
                                      setIsTestimonyEmpty(false);
                                      setShowEmojiPicker(false);
                                    }} className="p-2 text-xl flex items-center justify-center">{e}</button>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="relative">
                          <div
                            id={`admin-testimony-${story.id}`}
                            ref={testimonyRef}
                            contentEditable
                            role="textbox"
                            aria-multiline
                            data-placeholder="Testimony/Story Text"
                            onPaste={(e: any) => {
                              try {
                                e.preventDefault();
                                const clipboard = e.clipboardData || (window as any).clipboardData;
                                const html = clipboard && clipboard.getData ? clipboard.getData('text/html') : null;
                                const text = clipboard && clipboard.getData ? clipboard.getData('text/plain') : '';
                                let insertHtml = '';

                                // Helper: sanitize HTML but preserve basic inline tags
                                const sanitizeHtml = (rawHtml: string) => {
                                  try {
                                    const parser = new DOMParser();
                                    const doc = parser.parseFromString(rawHtml, 'text/html');
                                    const allowed = new Set(['B', 'STRONG', 'I', 'EM', 'U', 'BR', 'A']);

                                    const cleanNode = (node: Node): Node | null => {
                                      if (node.nodeType === Node.TEXT_NODE) {
                                        return document.createTextNode(node.textContent || '');
                                      }
                                      if (node.nodeType === Node.ELEMENT_NODE) {
                                        const el = node as HTMLElement;
                                        const tag = el.tagName.toUpperCase();

                                        if (tag === 'IMG') {
                                          // skip images on paste
                                          return null;
                                        }

                                        if (allowed.has(tag)) {
                                          const newEl = document.createElement(tag.toLowerCase());
                                          if (tag === 'A') {
                                            const href = el.getAttribute('href');
                                            if (href) newEl.setAttribute('href', href);
                                            // open in same window by default; caller can handle target if needed
                                          }
                                          // recurse children
                                          el.childNodes.forEach((c) => {
                                            const cc = cleanNode(c);
                                            if (cc) newEl.appendChild(cc);
                                          });
                                          return newEl;
                                        }

                                        // For other elements, unwrap their children (preserve text and inline formatting inside)
                                        const frag = document.createDocumentFragment();
                                        el.childNodes.forEach((c) => {
                                          const cc = cleanNode(c);
                                          if (cc) frag.appendChild(cc);
                                        });
                                        return frag;
                                      }
                                      return null;
                                    };

                                    const frag = document.createDocumentFragment();
                                    doc.body.childNodes.forEach((c) => {
                                      const cc = cleanNode(c);
                                      if (cc) frag.appendChild(cc);
                                    });

                                    const wrapper = document.createElement('div');
                                    wrapper.appendChild(frag);
                                    return wrapper.innerHTML;
                                  } catch (err) {
                                    return rawHtml;
                                  }
                                };

                                if (html) {
                                  // Prefer sanitized HTML when available (preserves bold/italic/underline and links)
                                  insertHtml = sanitizeHtml(html) || sanitizeHtml(text || '');
                                } else {
                                  // Plain text fallback: preserve line breaks and emojis
                                  insertHtml = (text || '').replace(/\n/g, '<br/>');
                                }

                                // Wrap in a span to force white text color while allowing inline tags to apply
                                const wrapped = `<span style="color:#fff">${insertHtml}</span>`;

                                // Try to insert using execCommand; if not available, use Range API
                                const success = document.execCommand && document.execCommand('insertHTML', false, wrapped);
                                if (!success) {
                                  const sel = document.getSelection();
                                  if (sel && sel.rangeCount) {
                                    const range = sel.getRangeAt(0);
                                    range.deleteContents();
                                    const frag = range.createContextualFragment(wrapped);
                                    range.insertNode(frag);
                                    range.collapse(false);
                                    sel.removeAllRanges();
                                    sel.addRange(range);
                                  }
                                }

                                // Update component state after paste
                                setTimeout(() => {
                                  const htmlNow = (e.target as HTMLDivElement).innerHTML || '';
                                  handleUpdate(story.id, 'text', htmlNow);
                                  setIsTestimonyEmpty(String(htmlNow.replace(/<[^>]*>/g, '')).trim().length === 0);
                                }, 0);
                              } catch (err) {
                                // ignore paste errors
                              }
                            }}
                            onInput={(e) => {
                              const html = (e.target as HTMLDivElement).innerHTML || '';
                              const textOnly = String(html || '').replace(/<[^>]*>/g, '');
                              if (textOnly.length > CHAR_LIMITS.text) {
                                const truncated = textOnly.substring(0, CHAR_LIMITS.text);
                                (e.target as HTMLDivElement).innerText = truncated;
                                // flush immediately when truncated
                                if (adminUpdateTimer.current) window.clearTimeout(adminUpdateTimer.current);
                                handleUpdate(story.id, 'text', (e.target as HTMLDivElement).innerHTML);
                                setIsTestimonyEmpty(truncated.trim().length === 0);
                                return;
                              }
                              // debounce updates to reduce re-renders while typing
                              if (adminUpdateTimer.current) window.clearTimeout(adminUpdateTimer.current);
                              adminUpdateTimer.current = window.setTimeout(() => {
                                handleUpdate(story.id, 'text', html);
                                adminUpdateTimer.current = null;
                              }, 300) as unknown as number;
                              setIsTestimonyEmpty(String(textOnly).trim().length === 0);
                            }}
                            onBlur={(e) => {
                              const html = (e.target as HTMLDivElement).innerHTML || '';
                              // flush any pending debounced update
                              if (adminUpdateTimer.current) { window.clearTimeout(adminUpdateTimer.current); adminUpdateTimer.current = null; }
                              handleUpdate(story.id, 'text', html);
                              const textOnly = String(html || '').replace(/<[^>]*>/g, '').trim();
                              setIsTestimonyEmpty(textOnly.length === 0);
                            }}
                            className={`w-full px-3 py-2 bg-[#2e2e2e] rounded-md border ${validationErrors[story.id]?.text ? 'border-red-500' : 'border-gray-600'} text-white focus:outline-none`} 
                            style={{ minHeight: '6rem', outline: 'none' }}
                            suppressContentEditableWarning
                          />

                          {isTestimonyEmpty && (
                            <div className="absolute inset-0 pointer-events-none flex items-start">
                              <div className="px-3 py-2 text-gray-500">Testimony/Story Text</div>
                            </div>
                          )}
                        </div>
                      </div>
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
                      onClick={() => handleSaveStory(story)}
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
                        {story.phone ? (
                          <p className="text-sm text-gray-300 mt-1">{story.phone}</p>
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
                      <div className="text-gray-300 text-sm mb-3 italic" dangerouslySetInnerHTML={{ __html: sanitizeInput(story.text) || '' }} />
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

      {/* Inline image delete: no server call until Save */}

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
