import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { sanitizeInput } from '@/lib/security';
import { Plus, X, Edit2, Video, FileText, CalendarIcon, Trash2, MessageCircle, Eye, EyeOff, Save, Loader2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Calendar } from '../ui/calendar';
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
  phone?: string;       // combined value stored in DB: e.g. "+911234567890"
  phoneCode?: string;   // UI-only: country dial code, e.g. "+91"
  phoneNumber?: string; // UI-only: 10-digit number part
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
  category?: string;
  phone?: string;
  role?: string;
  location?: string;
  text?: string;
  title?: string;
  youtubeUrl?: string;
  image?: string;
}

// Country dial codes for phone field
const COUNTRY_CODES: { code: string; label: string }[] = [
  { code: '+1', label: '+1 (US/Canada)' },
  { code: '+7', label: '+7 (Russia/Kazakhstan)' },
  { code: '+20', label: '+20 (Egypt)' },
  { code: '+27', label: '+27 (South Africa)' },
  { code: '+30', label: '+30 (Greece)' },
  { code: '+31', label: '+31 (Netherlands)' },
  { code: '+32', label: '+32 (Belgium)' },
  { code: '+33', label: '+33 (France)' },
  { code: '+34', label: '+34 (Spain)' },
  { code: '+36', label: '+36 (Hungary)' },
  { code: '+39', label: '+39 (Italy)' },
  { code: '+40', label: '+40 (Romania)' },
  { code: '+41', label: '+41 (Switzerland)' },
  { code: '+43', label: '+43 (Austria)' },
  { code: '+44', label: '+44 (UK)' },
  { code: '+45', label: '+45 (Denmark)' },
  { code: '+46', label: '+46 (Sweden)' },
  { code: '+47', label: '+47 (Norway)' },
  { code: '+48', label: '+48 (Poland)' },
  { code: '+49', label: '+49 (Germany)' },
  { code: '+51', label: '+51 (Peru)' },
  { code: '+52', label: '+52 (Mexico)' },
  { code: '+53', label: '+53 (Cuba)' },
  { code: '+54', label: '+54 (Argentina)' },
  { code: '+55', label: '+55 (Brazil)' },
  { code: '+56', label: '+56 (Chile)' },
  { code: '+57', label: '+57 (Colombia)' },
  { code: '+58', label: '+58 (Venezuela)' },
  { code: '+60', label: '+60 (Malaysia)' },
  { code: '+61', label: '+61 (Australia)' },
  { code: '+62', label: '+62 (Indonesia)' },
  { code: '+63', label: '+63 (Philippines)' },
  { code: '+64', label: '+64 (New Zealand)' },
  { code: '+65', label: '+65 (Singapore)' },
  { code: '+66', label: '+66 (Thailand)' },
  { code: '+81', label: '+81 (Japan)' },
  { code: '+82', label: '+82 (South Korea)' },
  { code: '+84', label: '+84 (Vietnam)' },
  { code: '+86', label: '+86 (China)' },
  { code: '+90', label: '+90 (Turkey)' },
  { code: '+91', label: '+91 (India)' },
  { code: '+92', label: '+92 (Pakistan)' },
  { code: '+93', label: '+93 (Afghanistan)' },
  { code: '+94', label: '+94 (Sri Lanka)' },
  { code: '+95', label: '+95 (Myanmar)' },
  { code: '+98', label: '+98 (Iran)' },
  { code: '+212', label: '+212 (Morocco)' },
  { code: '+213', label: '+213 (Algeria)' },
  { code: '+216', label: '+216 (Tunisia)' },
  { code: '+218', label: '+218 (Libya)' },
  { code: '+220', label: '+220 (Gambia)' },
  { code: '+221', label: '+221 (Senegal)' },
  { code: '+222', label: '+222 (Mauritania)' },
  { code: '+223', label: '+223 (Mali)' },
  { code: '+224', label: '+224 (Guinea)' },
  { code: '+225', label: '+225 (Ivory Coast)' },
  { code: '+226', label: '+226 (Burkina Faso)' },
  { code: '+227', label: '+227 (Niger)' },
  { code: '+228', label: '+228 (Togo)' },
  { code: '+229', label: '+229 (Benin)' },
  { code: '+230', label: '+230 (Mauritius)' },
  { code: '+231', label: '+231 (Liberia)' },
  { code: '+232', label: '+232 (Sierra Leone)' },
  { code: '+233', label: '+233 (Ghana)' },
  { code: '+234', label: '+234 (Nigeria)' },
  { code: '+235', label: '+235 (Chad)' },
  { code: '+236', label: '+236 (Central African Republic)' },
  { code: '+237', label: '+237 (Cameroon)' },
  { code: '+238', label: '+238 (Cape Verde)' },
  { code: '+239', label: '+239 (São Tomé and Príncipe)' },
  { code: '+240', label: '+240 (Equatorial Guinea)' },
  { code: '+241', label: '+241 (Gabon)' },
  { code: '+242', label: '+242 (Republic of the Congo)' },
  { code: '+243', label: '+243 (DR Congo)' },
  { code: '+244', label: '+244 (Angola)' },
  { code: '+245', label: '+245 (Guinea-Bissau)' },
  { code: '+246', label: '+246 (British Indian Ocean Territory)' },
  { code: '+248', label: '+248 (Seychelles)' },
  { code: '+249', label: '+249 (Sudan)' },
  { code: '+250', label: '+250 (Rwanda)' },
  { code: '+251', label: '+251 (Ethiopia)' },
  { code: '+252', label: '+252 (Somalia)' },
  { code: '+253', label: '+253 (Djibouti)' },
  { code: '+254', label: '+254 (Kenya)' },
  { code: '+255', label: '+255 (Tanzania)' },
  { code: '+256', label: '+256 (Uganda)' },
  { code: '+257', label: '+257 (Burundi)' },
  { code: '+258', label: '+258 (Mozambique)' },
  { code: '+260', label: '+260 (Zambia)' },
  { code: '+261', label: '+261 (Madagascar)' },
  { code: '+262', label: '+262 (Reunion)' },
  { code: '+263', label: '+263 (Zimbabwe)' },
  { code: '+264', label: '+264 (Namibia)' },
  { code: '+265', label: '+265 (Malawi)' },
  { code: '+266', label: '+266 (Lesotho)' },
  { code: '+267', label: '+267 (Botswana)' },
  { code: '+268', label: '+268 (Swaziland)' },
  { code: '+269', label: '+269 (Comoros)' },
  { code: '+290', label: '+290 (Saint Helena)' },
  { code: '+291', label: '+291 (Eritrea)' },
  { code: '+297', label: '+297 (Aruba)' },
  { code: '+298', label: '+298 (Faroe Islands)' },
  { code: '+299', label: '+299 (Greenland)' },
  { code: '+350', label: '+350 (Gibraltar)' },
  { code: '+351', label: '+351 (Portugal)' },
  { code: '+352', label: '+352 (Luxembourg)' },
  { code: '+353', label: '+353 (Ireland)' },
  { code: '+354', label: '+354 (Iceland)' },
  { code: '+355', label: '+355 (Albania)' },
  { code: '+356', label: '+356 (Malta)' },
  { code: '+357', label: '+357 (Cyprus)' },
  { code: '+358', label: '+358 (Finland)' },
  { code: '+359', label: '+359 (Bulgaria)' },
  { code: '+370', label: '+370 (Lithuania)' },
  { code: '+371', label: '+371 (Latvia)' },
  { code: '+372', label: '+372 (Estonia)' },
  { code: '+373', label: '+373 (Moldova)' },
  { code: '+374', label: '+374 (Armenia)' },
  { code: '+375', label: '+375 (Belarus)' },
  { code: '+376', label: '+376 (Andorra)' },
  { code: '+377', label: '+377 (Monaco)' },
  { code: '+380', label: '+380 (Ukraine)' },
  { code: '+381', label: '+381 (Serbia)' },
  { code: '+382', label: '+382 (Montenegro)' },
  { code: '+385', label: '+385 (Croatia)' },
  { code: '+386', label: '+386 (Slovenia)' },
  { code: '+387', label: '+387 (Bosnia and Herzegovina)' },
  { code: '+389', label: '+389 (Macedonia)' },
  { code: '+420', label: '+420 (Czech Republic)' },
  { code: '+421', label: '+421 (Slovakia)' },
  { code: '+423', label: '+423 (Liechtenstein)' },
  { code: '+500', label: '+500 (Falkland Islands)' },
  { code: '+501', label: '+501 (Belize)' },
  { code: '+502', label: '+502 (Guatemala)' },
  { code: '+503', label: '+503 (El Salvador)' },
  { code: '+504', label: '+504 (Honduras)' },
  { code: '+505', label: '+505 (Nicaragua)' },
  { code: '+506', label: '+506 (Costa Rica)' },
  { code: '+507', label: '+507 (Panama)' },
  { code: '+508', label: '+508 (Saint Pierre and Miquelon)' },
  { code: '+509', label: '+509 (Haiti)' },
  { code: '+590', label: '+590 (Guadeloupe)' },
  { code: '+591', label: '+591 (Bolivia)' },
  { code: '+592', label: '+592 (Guyana)' },
  { code: '+593', label: '+593 (Ecuador)' },
  { code: '+594', label: '+594 (French Guiana)' },
  { code: '+595', label: '+595 (Paraguay)' },
  { code: '+596', label: '+596 (Martinique)' },
  { code: '+597', label: '+597 (Suriname)' },
  { code: '+598', label: '+598 (Uruguay)' },
  { code: '+599', label: '+599 (Netherlands Antilles)' },
  { code: '+670', label: '+670 (East Timor)' },
  { code: '+672', label: '+672 (Norfolk Island)' },
  { code: '+673', label: '+673 (Brunei)' },
  { code: '+674', label: '+674 (Nauru)' },
  { code: '+675', label: '+675 (Papua New Guinea)' },
  { code: '+676', label: '+676 (Tonga)' },
  { code: '+677', label: '+677 (Solomon Islands)' },
  { code: '+678', label: '+678 (Vanuatu)' },
  { code: '+679', label: '+679 (Fiji)' },
  { code: '+680', label: '+680 (Palau)' },
  { code: '+682', label: '+682 (Cook Islands)' },
  { code: '+685', label: '+685 (Samoa)' },
  { code: '+686', label: '+686 (Kiribati)' },
  { code: '+688', label: '+688 (Tuvalu)' },
  { code: '+689', label: '+689 (French Polynesia)' },
  { code: '+690', label: '+690 (Tokelau)' },
  { code: '+691', label: '+691 (Micronesia)' },
  { code: '+692', label: '+692 (Marshall Islands)' },
  { code: '+850', label: '+850 (North Korea)' },
  { code: '+852', label: '+852 (Hong Kong)' },
  { code: '+853', label: '+853 (Macau)' },
  { code: '+855', label: '+855 (Cambodia)' },
  { code: '+856', label: '+856 (Laos)' },
  { code: '+880', label: '+880 (Bangladesh)' },
  { code: '+886', label: '+886 (Taiwan)' },
  { code: '+960', label: '+960 (Maldives)' },
  { code: '+961', label: '+961 (Lebanon)' },
  { code: '+962', label: '+962 (Jordan)' },
  { code: '+963', label: '+963 (Syria)' },
  { code: '+964', label: '+964 (Iraq)' },
  { code: '+965', label: '+965 (Kuwait)' },
  { code: '+966', label: '+966 (Saudi Arabia)' },
  { code: '+967', label: '+967 (Yemen)' },
  { code: '+968', label: '+968 (Oman)' },
  { code: '+970', label: '+970 (Palestine)' },
  { code: '+971', label: '+971 (UAE)' },
  { code: '+972', label: '+972 (Israel)' },
  { code: '+973', label: '+973 (Bahrain)' },
  { code: '+974', label: '+974 (Qatar)' },
  { code: '+975', label: '+975 (Bhutan)' },
  { code: '+976', label: '+976 (Mongolia)' },
  { code: '+977', label: '+977 (Nepal)' },
  { code: '+992', label: '+992 (Tajikistan)' },
  { code: '+993', label: '+993 (Turkmenistan)' },
  { code: '+994', label: '+994 (Azerbaijan)' },
  { code: '+995', label: '+995 (Georgia)' },
  { code: '+996', label: '+996 (Kyrgyzstan)' },
  { code: '+998', label: '+998 (Uzbekistan)' },
];

// Sort codes longest-first for reliable parsing
const SORTED_COUNTRY_CODES = [...COUNTRY_CODES].sort((a, b) => b.code.length - a.code.length);

/** Parse a combined phone string into { phoneCode, phoneNumber }. */
function parsePhoneField(combined: string): { phoneCode: string; phoneNumber: string } {
  if (!combined) return { phoneCode: '+91', phoneNumber: '' };
  if (combined.startsWith('+')) {
    for (const c of SORTED_COUNTRY_CODES) {
      if (combined.startsWith(c.code)) {
        return { phoneCode: c.code, phoneNumber: combined.slice(c.code.length) };
      }
    }
  }
  // No code found – treat whole value as number, default code India
  return { phoneCode: '+91', phoneNumber: combined };
}

const ALL_CATEGORY = 'All';
const CATEGORIES = [
  ALL_CATEGORY,
  'Guinness World Record',
  'London College of Music (LCM)',
  'Online Free Course (Keyboard & Guitar)',
  'Kids Summer Camp',
  'Hallel Conference',
  'Song Writing Classes',
  'Hallel Bible School',
];
const DEFAULT_STORY_CATEGORY = CATEGORIES[1];

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
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectStoryId, setRejectStoryId] = useState<string | null>(null);
  const [rejectMessage, setRejectMessage] = useState('');
  // Track which story's dropzone is active (hovered/dragged) to show accent border
  const [dragActiveId, setDragActiveId] = useState<string | null>(null);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [isDeletingImageId, setIsDeletingImageId] = useState<string | null>(null);
  // image delete UI: no immediate server-side deletion; deletion occurs on Save
  const [activeTab, setActiveTab] = useState<'text' | 'video'>('text');
  const [filterCategory, setFilterCategory] = useState<string>(ALL_CATEGORY);
  const [filterStatus, setFilterStatus] = useState<string>('All');
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

  // Character limits
  const CHAR_LIMITS = {
    name: 100,
    role: 100,
    location: 100,
    image: 500,
    title: 100,
    youtubeUrl: 500,
    text: 5000,
    email: 254,
    phone: 10
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
      category: existing?.category || row.category || DEFAULT_STORY_CATEGORY,
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
      const rawPhone = row.phone || existing?.phone || '';
      const { phoneCode, phoneNumber } = parsePhoneField(rawPhone);
      const phone = rawPhone;
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
        phoneCode,
        phoneNumber,
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

    if (!story.category || story.category === ALL_CATEGORY) {
      errors.category = 'Please select a specific category';
    }

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

      if (!story.phoneNumber?.trim()) {
        errors.phone = 'Phone is required';
      } else {
        const phoneRe = /^[0-9]{1,10}$/;
        if (!phoneRe.test(story.phoneNumber)) {
          errors.phone = 'Phone must contain digits only (max 10)';
        } else if (story.phoneNumber.length > CHAR_LIMITS.phone) {
          errors.phone = `Phone must be ${CHAR_LIMITS.phone} digits or less`;
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
      } else if ((story.text || '').trim().length < 4) {
        errors.text = 'Testimony must be at least 4 characters';
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
        errors.title = 'Full name is required';
      } else if (story.title.length > CHAR_LIMITS.title) {
        errors.title = `Full name must be ${CHAR_LIMITS.title} characters or less`;
      }

      if (!story.youtubeUrl?.trim()) {
        errors.youtubeUrl = 'YouTube URL is required';
      } else if (story.youtubeUrl.length > CHAR_LIMITS.youtubeUrl) {
        errors.youtubeUrl = `URL must be ${CHAR_LIMITS.youtubeUrl} characters or less`;
      } else if (!isValidYouTubeUrl(story.youtubeUrl)) {
        errors.youtubeUrl = 'Please enter a valid YouTube URL';
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
            // include optional email for story notifications
            email: story.email || null,
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
            updates.email = story.email || null;
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
        setEditModalOpen(false);
      } catch (err) {
        logDevError('Save story error', err);
        toast.error('Failed to save story');
      }
    })();
  };

  const handleAddTextStory = () => {
    setActiveTab('text');
    // If a form is already open, show the in-app confirmation modal
    if (editingId) {
      setUnsavedDialog({ open: true, pendingType: 'text' });
      return;
    }

    // otherwise open new immediately
    const newStory: Story = {
      id: `temp-${Date.now()}`,
      type: 'text',
      category: filterCategory === ALL_CATEGORY ? DEFAULT_STORY_CATEGORY : filterCategory,
      name: '',
      role: '',
      date: new Date().toISOString().split('T')[0],
      location: '',
      image: '',
      text: '',
      status: 'Submitted',
      featured: false,
      is_visible: true,
      phone: '',
      phoneCode: '+91',
      phoneNumber: '',
    };
    setStories(prev => [newStory, ...prev]);
    setEditingId(newStory.id);
    setEditModalOpen(true);
  };

  const handleAddVideoStory = () => {
    setActiveTab('video');
    if (editingId) {
      setUnsavedDialog({ open: true, pendingType: 'video' });
      return;
    }

    const newStory: Story = {
      id: `temp-${Date.now()}`,
      type: 'video',
      category: filterCategory === ALL_CATEGORY ? DEFAULT_STORY_CATEGORY : filterCategory,
      title: '',
      date: new Date().toISOString().split('T')[0],
      youtubeUrl: '',
      role: '',
      location: '',
      status: 'Submitted',
      featured: false,
      is_visible: true
    };
    setStories(prev => [newStory, ...prev]);
    setEditingId(newStory.id);
    setEditModalOpen(true);
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
      setActiveTab('text');
      const newStory: Story = {
        id: `temp-${Date.now()}`,
        type: 'text',
        category: filterCategory === ALL_CATEGORY ? DEFAULT_STORY_CATEGORY : filterCategory,
        name: '',
        role: '',
        date: new Date().toISOString().split('T')[0],
        location: '',
        image: '',
        text: '',
        status: 'Submitted',
        featured: false,
        phone: '',
        phoneCode: '+91',
        phoneNumber: '',
      };
      setStories(prev => [newStory, ...prev]);
      setEditingId(newStory.id);
      setEditModalOpen(true);
    } else if (unsavedDialog.pendingType === 'video') {
      setActiveTab('video');
      const newStory: Story = {
        id: `temp-${Date.now()}`,
        type: 'video',
        category: filterCategory === ALL_CATEGORY ? DEFAULT_STORY_CATEGORY : filterCategory,
        title: '',
        date: new Date().toISOString().split('T')[0],
        youtubeUrl: '',
        status: 'Submitted',
        featured: false
      };
      setStories(prev => [newStory, ...prev]);
      setEditingId(newStory.id);
      setEditModalOpen(true);
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
      setActiveTab('text');
      const newStory: Story = {
        id: `temp-${Date.now()}`,
        type: 'text',
        category: filterCategory === ALL_CATEGORY ? DEFAULT_STORY_CATEGORY : filterCategory,
        name: '',
        role: '',
        date: new Date().toISOString().split('T')[0],
        location: '',
        image: '',
        text: '',
        status: 'Submitted',
        featured: false,
        phone: '',
        phoneCode: '+91',
        phoneNumber: '',
      };
      setStories(prev => [newStory, ...prev]);
      setEditingId(newStory.id);
      setEditModalOpen(true);
    } else if (unsavedDialog.pendingType === 'video') {
      setActiveTab('video');
      const newStory: Story = {
        id: `temp-${Date.now()}`,
        type: 'video',
        category: filterCategory === ALL_CATEGORY ? DEFAULT_STORY_CATEGORY : filterCategory,
        title: '',
        date: new Date().toISOString().split('T')[0],
        youtubeUrl: '',
        status: 'Submitted',
        featured: false
      };
      setStories(prev => [newStory, ...prev]);
      setEditingId(newStory.id);
      setEditModalOpen(true);
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
    setEditModalOpen(false);
  };

  const handleUpdate = useCallback((id: string, field: keyof Story, rawValue: any) => {
    // sanitize value before updating state
    let value = rawValue;
    if (typeof value === 'string' && (field === 'name' || field === 'role' || field === 'location')) {
      value = value.replace(/\d/g, '');
    }

    // When phoneCode or phoneNumber changes, keep phone (combined) in sync
    setStories(prev => prev.map(s => {
      if (s.id !== id) return s;
      const updated = { ...s, [field]: value };
      if (field === 'phoneCode' || field === 'phoneNumber') {
        const code = field === 'phoneCode' ? value : (s.phoneCode || '+91');
        const num = field === 'phoneNumber' ? value : (s.phoneNumber || '');
        updated.phone = `${code}${num}`;
      }
      return updated;
    }));

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

  const handleStatusChange = (id: string, newStatus: 'Submitted' | 'In-Review' | 'Approved' | 'Rejected', staffMessage?: string) => {
    (async () => {
      try {
        const resp = await fetch('/api/admin/stories', { method: 'PUT', headers: getAuthHeaders('application/json'), body: JSON.stringify({ id: Number(id), status: newStatus, ...(staffMessage ? { staffMessage } : {}) }) });
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
  const tabCounts = useMemo(() => ({
    text: stories.filter((s) => s.type === 'text').length,
    video: stories.filter((s) => s.type === 'video').length,
  }), [stories]);

  const storiesForActiveTab = useMemo(() => stories.filter((s) => s.type === activeTab), [stories, activeTab]);

  const filteredStories = useMemo(() => {
    let res = storiesForActiveTab;
    if (filterCategory && filterCategory !== ALL_CATEGORY) res = res.filter(s => s.category === filterCategory);
    if (filterStatus !== 'All') res = res.filter(s => s.status === filterStatus);
    return res;
  }, [storiesForActiveTab, filterCategory, filterStatus]);

  const visibleStories = useMemo(() => {
    const persistedStories = filteredStories.filter((s) => !s.id.startsWith('temp-'));
    const editingTempStory = stories.find((s) => s.id === editingId && s.id.startsWith('temp-'));
    return editingTempStory ? [...persistedStories, editingTempStory] : persistedStories;
  }, [editingId, filteredStories, stories]);

  // Counts for the currently selected category
  const countsInCategory = useMemo(() => {
    const items = filterCategory === ALL_CATEGORY
      ? storiesForActiveTab
      : storiesForActiveTab.filter(s => s.category === filterCategory);
    return {
      total: items.length,
      published: items.filter(s => s.is_visible).length,
    };
  }, [storiesForActiveTab, filterCategory]);

  const statusCounts = useMemo(() => ({
    All: storiesForActiveTab.length,
    Submitted: storiesForActiveTab.filter(s => s.status === 'Submitted').length,
    'In-Review': storiesForActiveTab.filter(s => s.status === 'In-Review').length,
    Approved: storiesForActiveTab.filter(s => s.status === 'Approved').length,
    Rejected: storiesForActiveTab.filter(s => s.status === 'Rejected').length,
  }), [storiesForActiveTab]);

  const activeTabTitle = activeTab === 'text' ? 'Text Stories' : 'Video Stories';
  const activeTabDescription = activeTab === 'text'
    ? 'Manage written testimonies and story submissions.'
    : 'Manage video testimonies and story submissions.';
  const addStoryForActiveTab = activeTab === 'text' ? handleAddTextStory : handleAddVideoStory;
  const addStoryButtonLabel = activeTab === 'text' ? 'Add Text Story' : 'Add Video Story';
  const fullGridSpanClass = 'col-span-full';

  const extractYouTubeVideoId = (url?: string) => {
    if (!url) return '';
    const trimmed = url.trim();
    const match = trimmed.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{6,})/i);
    return match?.[1] || '';
  };

  const getStoryVideoThumbnail = (story: Story) => {
    if (story.thumbnail_url) return story.thumbnail_url;
    const videoId = extractYouTubeVideoId(story.youtubeUrl);
    return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : '';
  };

  return (
    <div
      className="p-6"
      style={{ ['--input-background' as any]: '#2e2e2e', ['--input' as any]: '#2e2e2e' }}
    >
      <div className="mb-6">
        <div>
          <h2 className="text-3xl font-bold text-white mb-1">Stories Management</h2>
          <p className="text-sm text-gray-400">Review and approve testimonies from your community</p>
        </div>
      </div>

      <div className="border-b border-gray-700 mb-6">
        <div className="flex gap-1 overflow-x-auto">
          {[
            { key: 'text' as const, label: 'Text Stories', icon: FileText, count: tabCounts.text },
            { key: 'video' as const, label: 'Video Stories', icon: Video, count: tabCounts.video },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-6 py-3 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'border-[#FDB813] text-[#FDB813] bg-[#2E2E2E]'
                    : 'border-transparent text-gray-400 hover:text-white hover:bg-[#2E2E2E]'
                }`}
              >
                <Icon size={18} />
                <span>{tab.label}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${isActive ? 'bg-[#FDB813] text-black' : 'bg-[#111] text-gray-300 border border-gray-600'}`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex flex-row items-center justify-between gap-4">
          <div>
            <p className="text-lg text-gray-400">{activeTabDescription}</p>
          </div>
          <Button
            onClick={addStoryForActiveTab}
            className="flex items-center gap-3 px-4 py-2 bg-[#111] text-white border border-[#FDB813] rounded-md hover:bg-[#3E3E3E] transition-colors cursor-pointer shrink-0"
          >
            <span className="inline-flex items-center justify-center h-5 w-5 rounded-full">
              <Plus size={14} className="text-white" />
            </span>
            <span className="font-medium">{addStoryButtonLabel}</span>
          </Button>
        </div>

        <div className="flex gap-2 flex-wrap">
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

        <div>
          <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-full sm:w-80 !bg-[#2e2e2e] text-white border-2 border-[#FDB813] rounded-lg px-3 py-2 cursor-pointer" style={{ backgroundColor: '#2e2e2e', color: '#fff' }}>
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

      <div className="bg-black rounded-lg p-4 mt-2">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch">
        {visibleStories.length === 0 ? (
          <div className={`${fullGridSpanClass} text-center py-12 bg-black border border-gray-700 rounded-lg`}>
            <MessageCircle size={48} className="mx-auto text-gray-600 mb-3" />
            <p className="text-gray-400">No {activeTab === 'text' ? 'text' : 'video'} stories in this category.</p>
          </div>
        ) : (
          visibleStories.map((story) => (
            <div
              key={story.id}
              className={story.id.startsWith('temp-') ? 'hidden' : ''}
            >
              {editingId === story.id && editModalOpen ? createPortal(
              <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center bg-black/70 overflow-y-auto py-8 px-4" onClick={(e) => { if (e.target === e.currentTarget) handleCancel(story.id); }}>
                <div className="bg-[#2e2e2e] rounded-lg border border-gray-700 w-full max-w-5xl mx-auto shadow-2xl my-4 max-h-[calc(100vh-4rem)] flex flex-col" style={{ backgroundColor: '#2e2e2e' }}>
                  <div className="flex items-center justify-between p-4 border-b border-gray-700 shrink-0">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                      {story.type === 'text' ? <FileText size={18} /> : <Video size={18} />}
                      {story.id.startsWith('temp-') ? (story.type === 'text' ? 'Add Text Story' : 'Add Video Story') : 'Edit Story'}
                    </h3>
                    <button onClick={() => handleCancel(story.id)} className="text-gray-400 hover:text-white p-1.5 rounded-md transition-colors" aria-label="Close">
                      <X size={20} />
                    </button>
                  </div>
                  <div className="p-5 overflow-y-auto flex-1" style={{ ['--input-background' as any]: 'black', ['--input' as any]: 'black', ['--background' as any]: 'black' }}>
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

                {/* Category */}
                <div className="space-y-2">
                  <Label className="text-gray-300">Category <span className="text-red-500">*</span></Label>
                  <Select
                    value={story.category}
                    onValueChange={(value) => handleUpdate(story.id, 'category', value)}
                  >
                    <SelectTrigger className={`!bg-black text-white border-2 rounded-lg px-3 py-2 cursor-pointer ${validationErrors[story.id]?.category ? 'border-red-500' : 'border-[#FDB813]'}`} style={{ backgroundColor: '#000', color: '#fff' }}>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent className="!bg-black border-2 border-[#FDB813] rounded-lg" style={{ backgroundColor: '#000', color: '#fff' }}>
                      {CATEGORIES.filter(cat => cat !== ALL_CATEGORY).map(cat => (
                        <SelectItem key={cat} value={cat} className="!bg-black text-white cursor-pointer hover:bg-blue-600 hover:text-white px-3 py-2">{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {validationErrors[story.id]?.category && (
                    <p className="text-xs text-red-500">{validationErrors[story.id].category}</p>
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
                          className={`!bg-black border-gray-600 text-white ${
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
                          className={`!bg-black border-gray-600 text-white ${
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
                          className={`!bg-black border-gray-600 text-white ${
                            validationErrors[story.id]?.email ? 'border-red-500' : ''
                          }`}
                          maxLength={CHAR_LIMITS.email}
                        />
                        {validationErrors[story.id]?.email && (
                          <p className="text-xs text-red-500">{validationErrors[story.id].email}</p>
                        )}
                      </div>

                      {/* Phone */}
                      <div className="space-y-2">
                        <Label className="text-gray-300">Phone <span className="text-red-500">*</span> <span className="text-xs text-gray-500 ml-2">({(story.phoneNumber||'').length}/{CHAR_LIMITS.phone})</span></Label>
                        <div className="flex gap-2">
                          <Select
                            value={story.phoneCode || '+91'}
                            onValueChange={(value) => handleUpdate(story.id, 'phoneCode', value)}
                          >
                            <SelectTrigger className="!bg-black text-white border border-gray-600 rounded-md w-40 shrink-0" style={{ backgroundColor: '#000', color: '#fff' }}>
                              <SelectValue placeholder="+91" />
                            </SelectTrigger>
                            <SelectContent className="!bg-black border border-gray-600 rounded-md max-h-60 overflow-y-auto" style={{ backgroundColor: '#000', color: '#fff' }}>
                              {COUNTRY_CODES.map(c => (
                                <SelectItem key={c.code} value={c.code} className="!bg-black text-white cursor-pointer hover:bg-blue-600 hover:text-white px-3 py-1 text-sm">{c.label}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <Input
                            value={story.phoneNumber || ''}
                            onChange={(e) => handleUpdate(story.id, 'phoneNumber', e.target.value.replace(/\D/g, '').slice(0, CHAR_LIMITS.phone))}
                            placeholder="Phone number"
                            className={`!bg-black border-gray-600 text-white flex-1 ${
                              validationErrors[story.id]?.phone ? 'border-red-500' : ''
                            }`}
                            maxLength={CHAR_LIMITS.phone}
                            inputMode="numeric"
                            required
                          />
                        </div>
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
                          className={`!bg-black border-gray-600 text-white ${
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
                        aria-label="Upload profile image. Click or drag profile image to upload"
                        className={`flex items-center justify-center w-full px-4 py-6 border-2 border-dashed rounded-md text-gray-300 cursor-pointer ${dragActiveId === story.id ? 'border-[#FDB813] bg-[#1a1a1a]' : 'border-gray-700 !bg-black'}`}
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
                          <div className="mb-1 font-medium">Click or drag profile image here to upload</div>
                          <div className="text-xs text-gray-500">PNG or JPG, max 2MB</div>
                        </div>
                      </div>
                      {validationErrors[story.id]?.image && (
                        <p className="text-xs text-red-500">{validationErrors[story.id].image.replace('Image', 'Profile Image')}</p>
                      )}

                      {story.image && (
                        <div className="mt-2 relative inline-block">
                          <img src={story.image} alt="profile preview" className="w-24 h-24 object-cover rounded-full border border-gray-700" />
                          <button
                            type="button"
                            aria-label="Delete profile image"
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
                            className={`w-full px-3 py-2 bg-black rounded-md border ${validationErrors[story.id]?.text ? 'border-red-500' : 'border-gray-600'} text-white focus:outline-none`} 
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
                    {/* Full Name */}
                    <div className="space-y-2">
                      <Label className="text-gray-300">
                        Full Name <span className="text-red-500">*</span>
                        <span className="text-xs text-gray-500 ml-2">
                          ({(story.title || '').length}/{CHAR_LIMITS.title})
                        </span>
                      </Label>
                      <Input
                        value={story.title || ''}
                        onChange={(e) => handleUpdate(story.id, 'title', e.target.value.slice(0, CHAR_LIMITS.title))}
                        placeholder="Full Name"
                        className={`!bg-black border-gray-600 text-white ${
                          validationErrors[story.id]?.title ? 'border-red-500' : ''
                        }`}
                        maxLength={CHAR_LIMITS.title}
                      />
                      {validationErrors[story.id]?.title && (
                        <p className="text-xs text-red-500">{validationErrors[story.id].title}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label className="text-gray-300">
                        Location <span className="text-red-500">*</span>
                        <span className="text-xs text-gray-500 ml-2">({(story.location || '').length}/{CHAR_LIMITS.location})</span>
                      </Label>
                      <Input
                        value={story.location || ''}
                        onChange={(e) => handleUpdate(story.id, 'location', e.target.value.slice(0, CHAR_LIMITS.location))}
                        placeholder="Location (e.g., Mumbai, India)"
                        className={`!bg-black border-gray-600 text-white ${validationErrors[story.id]?.location ? 'border-red-500' : ''}`}
                        maxLength={CHAR_LIMITS.location}
                      />
                      {validationErrors[story.id]?.location && (
                        <p className="text-xs text-red-500">{validationErrors[story.id].location}</p>
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
                        className={`!bg-black border-gray-600 text-white ${
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
                  </div>
                </div>
              </div>, document.body) : null}
              <div className="bg-[#2E2E2E] rounded-lg shadow-lg hover:shadow-xl transition-all border-2 border-transparent hover:border-[#FDB813] flex flex-col h-full overflow-hidden">
                {story.type === 'video' && (
                  <div className="relative aspect-video bg-gray-900">
                    {getStoryVideoThumbnail(story) ? (
                      <img
                        src={getStoryVideoThumbnail(story)}
                        alt={story.title || 'Video story thumbnail'}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-500">
                        <Video size={42} />
                      </div>
                    )}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/35">
                      <div className="w-14 h-14 rounded-full bg-[#FDB813] flex items-center justify-center">
                        <Video size={24} className="text-black" />
                      </div>
                    </div>
                  </div>
                )}
                <div className={`flex-1 ${story.type === 'text' ? 'p-4' : 'p-5 flex items-start gap-4 mb-3'}`}>
                  {story.type === 'text' ? (
                    <div className="flex h-full flex-col">
                      <div className="mb-4 relative flex items-start gap-3">
                        <div className="flex items-center min-w-0 pr-16">
                          <div className="w-14 h-14 rounded-full overflow-hidden mr-3 flex-shrink-0 bg-[#3a3a3a] border border-gray-600 flex items-center justify-center">
                            {story.image ? (
                              <img
                                src={story.image}
                                alt={story.name || 'Story image'}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="flex flex-col items-center justify-center w-full h-full">
                                <span className="text-gray-400 text-[10px] font-semibold leading-tight">No</span>
                                <span className="text-gray-400 text-[10px] font-semibold leading-tight">Photo</span>
                              </div>
                            )}
                          </div>
                          <div className="min-w-0">
                            <h4 className="text-white font-medium truncate">{sanitizeInlineLabel(story.name) || 'Untitled text story'}</h4>
                            <p className="text-white text-sm truncate">{story.role}</p>
                            <div className="flex flex-col text-white text-xs mt-1 gap-0.5">
                              <span>{story.date ? formatCardDate(story.date) : ''}</span>
                              <span>{story.location}</span>
                            </div>
                          </div>
                        </div>
                        <div className="absolute top-0 right-0 flex flex-col gap-1 shrink-0">
                          <Button
                            size="sm"
                            onClick={() => toggleVisibility(story)}
                            className="rounded-md border border-[#FDB813] bg-[#1a1a1a] hover:bg-black text-white p-2 transition-colors"
                            aria-label={story.is_visible ? 'Unpublish' : 'Publish'}
                            title={story.is_visible ? 'Unpublish' : 'Publish'}
                          >
                            {story.is_visible ? <EyeOff size={16} /> : <Eye size={16} />}
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => { setEditingId(story.id); setEditModalOpen(true); }}
                            className="rounded-md border border-[#FDB813] bg-[#1a1a1a] hover:bg-black text-white p-2 transition-colors"
                            aria-label="Edit"
                            title="Edit"
                          >
                            <Edit2 size={16} />
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleDelete(story.id)}
                            className="rounded-md border border-[#FDB813] bg-[#1a1a1a] hover:bg-black text-white p-2 transition-colors"
                            aria-label="Delete"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </div>
                      <div className="mb-2 flex items-center gap-2 flex-wrap">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-600 text-white text-xs">
                          <FileText size={12} />
                          Text Story
                        </span>
                        <span className={`px-2 py-0.5 text-xs rounded border ${getStatusColor(story.status)}`}>
                          {story.status || 'Submitted'}
                        </span>
                        <span className={getPublishedBadgeColor(story.is_visible)}>
                          {story.is_visible ? 'Published' : 'Draft'}
                        </span>
                      </div>
                      {story.email ? <p className="text-sm text-gray-300 mb-1">{story.email}</p> : null}
                      {story.phone ? <p className="text-sm text-gray-300 mb-3">{story.phone}</p> : null}
                      <p className="text-xs text-[#FDB813] mb-3">{story.category}</p>
                      {story.text ? (
                        <div
                          className="text-white text-sm text-left leading-relaxed flex-grow break-words whitespace-normal overflow-hidden max-w-full italic"
                          style={{ wordBreak: 'normal', overflowWrap: 'break-word' }}
                          dangerouslySetInnerHTML={{ __html: sanitizeInput(story.text, 180) || '' }}
                        />
                      ) : null}
                    </div>
                  ) : (
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-red-600 text-white text-xs">
                            <Video size={12} />
                            Video Story
                          </span>
                          <h4 className="text-white">
                            {sanitizeInlineLabel(story.title)}
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
                          className="rounded-md border border-[#FDB813] bg-[#1a1a1a] hover:bg-black text-white p-2 transition-colors"
                          aria-label={story.is_visible ? 'Unpublish' : 'Publish'}
                          title={story.is_visible ? 'Unpublish' : 'Publish'}
                        >
                          {story.is_visible ? <EyeOff size={16} /> : <Eye size={16} />}
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => { setEditingId(story.id); setEditModalOpen(true); }}
                          className="rounded-md border border-[#FDB813] bg-[#1a1a1a] hover:bg-black text-white p-2 transition-colors"
                          aria-label="Edit"
                          title="Edit"
                        >
                          <Edit2 size={16} />
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleDelete(story.id)}
                          className="rounded-md border border-[#FDB813] bg-[#1a1a1a] hover:bg-black text-white p-2 transition-colors"
                          aria-label="Delete"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </div>
                  </div>
                  )}
                </div>
                
                {/* Status Actions */}
                <div className="flex gap-2 flex-wrap px-5 pb-5 pt-0">
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
                      onClick={() => {
                        setRejectStoryId(story.id);
                        setRejectMessage('');
                        setShowRejectModal(true);
                      }}
                      className="px-3 py-1 text-xs bg-red-900/30 text-red-400 rounded hover:bg-red-900/50 transition-colors cursor-pointer"
                    >
                      Reject
                    </button>
                  )}
                </div>
              </div>
          </div>
          ))
        )}
      </div>
      </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        open={deleteDialog.open}
        onOpenChange={(open) => setDeleteDialog({ ...deleteDialog, open })}
        onConfirm={confirmDelete}
        itemType="story"
        itemName={deleteDialog.name}
      />

      {showRejectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-[#1a1a1a] rounded-lg border border-gray-600 p-6 w-full max-w-md mx-4 shadow-2xl">
            <h3 className="text-lg font-semibold text-white mb-4">Reject Story</h3>
            <label className="block text-sm text-gray-300 mb-2">Message to the submitter (optional, max 100 characters)</label>
            <textarea
              value={rejectMessage}
              onChange={(e) => setRejectMessage(e.target.value.slice(0, 100))}
              maxLength={100}
              rows={3}
              className="w-full px-3 py-2 bg-black border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#FDB813] resize-none"
              placeholder="Enter message for the submitter..."
            />
            <div className="text-xs text-gray-400 mt-1 text-right">{rejectMessage.length}/100</div>
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => {
                  setShowRejectModal(false);
                  setRejectStoryId(null);
                  setRejectMessage('');
                }}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg cursor-pointer transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  const storyId = rejectStoryId;
                  const staffMessage = rejectMessage.trim();
                  setShowRejectModal(false);
                  setRejectStoryId(null);
                  setRejectMessage('');
                  if (storyId) await handleStatusChange(storyId, 'Rejected', staffMessage);
                }}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg cursor-pointer transition-colors"
              >
                Confirm Reject
              </button>
            </div>
          </div>
        </div>
      )}

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
