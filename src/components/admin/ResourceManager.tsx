import { useState, useEffect, useRef } from 'react';
import { Save, Plus, Trash2, Book, Video, Music, FileText, Youtube, Calendar, Upload, X, Eye, EyeOff, Edit2, GripVertical, ChevronDown, ChevronUp } from 'lucide-react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { fetchYouTubeTitle, fetchYouTubeMeta, extractYouTubeId } from '../../lib/youtube';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { DeleteConfirmDialog } from './DeleteConfirmDialog';
import { ImageUpload } from './ImageUpload';
import { MultipleImageUpload } from './MultipleImageUpload';
import { FileUpload } from './FileUpload';
import { toast } from 'sonner';

// Validation limits (shared between managers)
const TITLE_MAX = 150;
const AUTHOR_MAX = 100;
const DESCRIPTION_MAX = 2000;
const LANGUAGE_MAX = 50;
const PAGES_MIN = 0;
const PAGES_MAX = 1000;
const PRICE_MIN = 0;
const PRICE_MAX = 10000;

// Helper to format dates in admin lists (returns empty string for invalid values)
const formatAdminDate = (dateInput: any) => {
  if (!dateInput && dateInput !== 0) return '';
  let date: Date;
  if (dateInput instanceof Date) date = dateInput;
  else if (typeof dateInput === 'number') date = new Date(dateInput);
  else date = new Date(String(dateInput));
  if (isNaN(date.getTime())) return '';
  try {
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' });
  } catch (err) {
    return '';
  }
};

// Normalize a date value to an HTML date input value (YYYY-MM-DD) or empty string
const toDateInputValue = (dateInput: any) => {
  if (!dateInput && dateInput !== 0) return '';
  try {
    // If already a Date
    if (dateInput instanceof Date) return dateInput.toISOString().split('T')[0];
    const s = String(dateInput).trim();
    if (!s) return '';
    // If contains YYYY-MM-DD, use that
    const match = s.match(/(\d{4}-\d{2}-\d{2})/);
    if (match) return match[1];
    // Try Date parse
    const dt = new Date(s);
    if (!isNaN(dt.getTime())) return dt.toISOString().split('T')[0];
  } catch (err) {
    // ignore
  }
  return '';
};

// Pick first non-empty value from args
const pickFirst = (...vals: any[]) => {
  for (const v of vals) {
    if (v === 0) return v;
    if (v) return v;
  }
  return null;
};

// Helper to run async work in controlled-size batches to avoid spiky network load
const runInBatches = async (items: any[], batchSize: number, fn: (item: any) => Promise<any>) : Promise<any[]> => {
  const results: any[] = [];
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    // await this batch before starting next to keep concurrency bounded
    // eslint-disable-next-line no-await-in-loop
    const res = await Promise.all(batch.map(fn));
    results.push(...res);
  }
  return results;
};

interface MusicBook {
  id: string;
  title: string;
  author: string;
  price: number;
  pages: number;
  language: string;
  coverImage: string;
  additionalImages: string[];
  description: string;
  publishDate: string;
  published?: boolean;
}

interface WorshipVideo {
  id: string;
  youtubeUrl: string;
  published?: boolean;
  youtubeTitle?: string;
  datePosted?: string | null;
  displayOrder?: number | null;
}

interface Sermon {
  id: string;
  youtubeUrl: string;
  published?: boolean;
  youtubeTitle?: string;
}

interface BibleStudy {
  id: string;
  title: string;
  author: string;
  pages: number;
  date: string;
  fileType: string;
  fileUrl: string;
  thumbnailUrl: string;
  description: string;
  published?: boolean;
}

type ResourceType = 'books' | 'worship' | 'sermons';

export function ResourceManager() {
  const [activeTab, setActiveTab] = useState<ResourceType>('books');

  // Validation limits
  // Validation limits (moved to module scope)

  // Form errors: map resourceId -> { fieldName: message }
  const [formErrors, setFormErrors] = useState<Record<string, Record<string, string>>>({});

  // (moved into individual managers that need them)

  const setFieldErrors = (id: string, errors: Record<string, string>) => {
    setFormErrors(prev => ({ ...prev, [id]: { ...(prev[id] || {}), ...errors } }));
  };

  const clearFieldErrors = (id: string, fields?: string[]) => {
    if (!id) return;
    // field error clearing handled by parent ResourceManager
    setFormErrors(prev => {
      const copy = { ...prev };
      if (!copy[id]) return prev;
      if (!fields || fields.length === 0) {
        delete copy[id];
      } else {
        for (const f of fields) delete copy[id][f];
        if (Object.keys(copy[id]).length === 0) delete copy[id];
      }
      return copy;
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Resources Management</h2>
        <p className="text-gray-400">Manage all resource content for the website</p>
        <p className="text-xs text-gray-400 mt-1">Fields marked <span className="text-red-400">*</span> are required.</p>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-700">
        <div className="flex gap-1 overflow-x-auto">
          {[
            { key: 'books', label: 'Music Books', icon: Book, count: 0 },
            { key: 'worship', label: 'Worship Videos', icon: Music, count: 0 },
            { key: 'sermons', label: 'Sermons', icon: Video, count: 0 }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as ResourceType)}
                className={`flex items-center gap-2 px-6 py-3 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'border-[#FDB813] text-[#FDB813] bg-[#2E2E2E]'
                    : 'border-transparent text-gray-400 hover:text-white hover:bg-[#2E2E2E]'
                }`}
              >
                <Icon size={18} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === 'books' && <MusicBooksManager formErrors={formErrors} setFieldErrors={setFieldErrors} clearFieldErrors={clearFieldErrors} />}
        {activeTab === 'worship' && <WorshipVideosManager formErrors={formErrors} setFieldErrors={setFieldErrors} clearFieldErrors={clearFieldErrors} />}
        {activeTab === 'sermons' && <SermonsManager formErrors={formErrors} setFieldErrors={setFieldErrors} clearFieldErrors={clearFieldErrors} />}
      </div>
    </div>
  );
}

// Music Books Manager Sub-Component
function MusicBooksManager({ formErrors, setFieldErrors, clearFieldErrors }: { formErrors: Record<string, Record<string, string>>; setFieldErrors: (id: string, errors: Record<string,string>) => void; clearFieldErrors: (id: string, fields?: string[]) => void }) {
  const [books, setBooks] = useState<MusicBook[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState<string | null>(null);
  const [expandedBook, setExpandedBook] = useState<string | null>(null);
  const [showAdditionalImagesUpload, setShowAdditionalImagesUpload] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Keep track of files selected in ImageUpload but not yet uploaded (upload occurs on Save)
  const selectedFilesRef = useRef<Map<string, File>>(new Map());
  // Keep track of additional images selected per resource (but not uploaded yet)
  const selectedAdditionalFilesRef = useRef<Map<string, File[]>>(new Map());

  // Fetch books from database
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      // include auth token for admin endpoints so server can set created_by/updated_by
      const rawToken = localStorage.getItem('admin_token');
      let token = '';
      if (rawToken) try { token = JSON.parse(rawToken).token || rawToken } catch (e) { token = rawToken }
      const headers = token ? { 'Authorization': `Bearer ${token}` } : undefined;
      const response = await fetch('/api/admin/resources?type=books', { headers });
      if (!response.ok) throw new Error('Failed to fetch books');
      const data = await response.json();
      
      // Transform API response to match component interface
      const transformedBooks = (data.data || []).map((book: any) => ({
        id: book.id.toString(),
        title: book.title || '',
        author: book.author || '',
        price: book.price || 0,
        pages: book.pages || 0,
        language: book.language || 'English',
        coverImage: book.cover_image || '',
        additionalImages: book.additional_images || [],
        description: book.description || '',
        publishDate: book.publish_date || '',
        published: book.published === true || book.published === 't' || false
      }));
      
      setBooks(transformedBooks);
    } catch (error) {
      console.error('Error fetching books:', error);
      toast.error('Failed to load books');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    const newBook: MusicBook = {
      id: 'new-' + Date.now().toString(),
      title: '',
      author: '',
      price: undefined,
      pages: undefined,
      language: 'English',
      coverImage: '',
      additionalImages: [],
      description: '',
      publishDate: '',
      published: false
    };
    setBooks([newBook, ...books]);
    setEditingId(newBook.id);
    setExpandedBook(newBook.id);
  };

  const handleUpdate = (id: string, updates: Partial<MusicBook>) => {
    setBooks(books.map(b => b.id === id ? { ...b, ...updates } : b));
    // field error clearing handled by parent ResourceManager
  };

  const togglePublished = async (id: string) => {
    const book = books.find(b => b.id === id);
    if (!book) return;

    const newPublished = !book.published;

    // Optimistic UI update
    handleUpdate(id, { published: newPublished });

    // If it's a new unsaved book, just update locally
    if (id.startsWith('new-')) {
      toast.success(newPublished ? 'Marked as published' : 'Marked as draft');
      return;
    }

    try {
      const rawToken = localStorage.getItem('admin_token');
      let token = '';
      if (rawToken) try { token = JSON.parse(rawToken).token || rawToken } catch (e) { token = rawToken }
      const headers: Record<string,string> = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const body: any = {
        type: 'books',
        id,
        title: book.title,
        author: book.author,
        price: Number(book.price),
        pages: Number(book.pages),
        language: book.language,
        cover_image: book.coverImage,
        additional_images: book.additionalImages,
        description: book.description,
        publish_date: book.publishDate,
        published: newPublished
      };

      const response = await fetch(`/api/admin/resources?type=books&id=${id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to update published state');
      }

      const result = await response.json();

      const updated = {
        id: result.data.id.toString(),
        title: result.data.title || '',
        author: result.data.author || '',
        price: result.data.price || 0,
        pages: result.data.pages || 0,
        language: result.data.language || 'English',
        coverImage: result.data.cover_image || '',
        additionalImages: result.data.additional_images || [],
        description: result.data.description || '',
        publishDate: result.data.publish_date || '',
        published: result.data.published === true || result.data.published === 't' || false
      } as MusicBook;

      setBooks(books.map(b => b.id === id ? updated : b));
      toast.success(newPublished ? 'Book published' : 'Book unpublished');
    } catch (error) {
      console.error('Error toggling published:', error);
      // Revert optimistic update
      handleUpdate(id, { published: !newPublished });
      toast.error('Failed to update published state');
    }
  };

  const handleDelete = (id: string) => {
    setBookToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (bookToDelete) {
      try {
        // If it's a new unsaved book, uploaded blobs exist but DB row doesn't.
        // Call admin blob-delete API to remove uploaded files (cover + additional images).
        if (bookToDelete.startsWith('new-')) {
          const book = books.find(b => b.id === bookToDelete);
          const urls: string[] = [];
          if (book) {
            if (book.coverImage) urls.push(book.coverImage);
            if (Array.isArray(book.additionalImages) && book.additionalImages.length) {
              urls.push(...book.additionalImages.filter(Boolean));
            }
          }

          if (urls.length) {
            try {
              await fetch('/api/admin/blob', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ urls })
              });
            } catch (blobErr) {
              console.error('Failed to clean up uploaded blobs for cancelled book:', blobErr);
            }
          }
        } else {
          // Only delete from DB if it's not a new unsaved book
          const rawToken = localStorage.getItem('admin_token');
          let token = '';
          if (rawToken) try { token = JSON.parse(rawToken).token || rawToken } catch (e) { token = rawToken }
          const headers = token ? { 'Authorization': `Bearer ${token}` } : undefined;
          const response = await fetch(`/api/admin/resources?type=books&id=${bookToDelete}`, {
            method: 'DELETE',
            headers
          });
          if (!response.ok) throw new Error('Failed to delete book');
        }

        setBooks(books.filter(b => b.id !== bookToDelete));
        toast.success('Book deleted successfully');
      } catch (error) {
        console.error('Error deleting book:', error);
        toast.error('Failed to delete book');
      }
      setBookToDelete(null);
    }
    setDeleteDialogOpen(false);
  };

  const handleSave = async (id: string) => {
    const book = books.find(b => b.id === id);
    if (!book) return;

    // Validate required fields and build per-field errors
    const fieldErrors: Record<string, string> = {};
    if (!book.title || book.title.trim().length === 0) fieldErrors.title = 'Title is required';
    else if (book.title.length > TITLE_MAX) fieldErrors.title = `Title must be at most ${TITLE_MAX} characters`;

    if (!book.author || book.author.trim().length === 0) fieldErrors.author = 'Author is required';
    else if (book.author.length > AUTHOR_MAX) fieldErrors.author = `Author must be at most ${AUTHOR_MAX} characters`;

    if (!book.language || book.language.trim().length === 0) fieldErrors.language = 'Language is required';
    else if (book.language.length > LANGUAGE_MAX) fieldErrors.language = `Language must be at most ${LANGUAGE_MAX} characters`;

    if (!book.coverImage && !selectedFilesRef.current.has(id)) fieldErrors.coverImage = 'Cover image is required';

    if (!book.publishDate || book.publishDate.trim().length === 0) fieldErrors.publishDate = 'Publish date is required';

    const priceNum = Number(book.price);
    if (isNaN(priceNum)) fieldErrors.price = 'Price is required';
    else if (priceNum < PRICE_MIN || priceNum > PRICE_MAX) fieldErrors.price = `Price must be between ${PRICE_MIN} and ${PRICE_MAX}`;

    const pagesNum = Number(book.pages);
    if (isNaN(pagesNum)) fieldErrors.pages = 'Pages is required';
    else if (pagesNum < PAGES_MIN || pagesNum > PAGES_MAX) fieldErrors.pages = `Pages must be between ${PAGES_MIN} and ${PAGES_MAX}`;

    if (book.description && book.description.length > DESCRIPTION_MAX) fieldErrors.description = `Description must be at most ${DESCRIPTION_MAX} characters`;

    if (Object.keys(fieldErrors).length > 0) {
      setFieldErrors(id, fieldErrors);
      return;
    }

    try {
      // If a file was selected via ImageUpload (but not uploaded), upload it now so we can include the URL in the saved resource
      const selectedFile = selectedFilesRef.current.get(id);
      if (selectedFile) {
        try {
          const formData = new FormData();
          formData.append('file', selectedFile);
          formData.append('folder', `resources/books/${book.id}`);
          const uploadResp = await fetch('/api/upload', { method: 'POST', body: formData });
          const uploadResult = await uploadResp.json();
          if (uploadResp.ok && uploadResult.url) {
            // update the book coverImage locally so validation and body use the uploaded URL
            handleUpdate(book.id, { coverImage: uploadResult.url });
            // clear selected file tracking
            selectedFilesRef.current.delete(id);
            // also reflect in local variable
            book.coverImage = uploadResult.url;
          } else {
            throw new Error(uploadResult.error || 'Image upload failed');
          }
        } catch (uploadErr) {
          setFieldErrors(id, { coverImage: String(uploadErr?.message || uploadErr) });
          return;
        }
      }
      const isNew = id.startsWith('new-');
      const method = isNew ? 'POST' : 'PUT';
      // include auth token so server can set created_by/updated_by
      const rawToken = localStorage.getItem('admin_token');
      let token = '';
      if (rawToken) try { token = JSON.parse(rawToken).token || rawToken } catch (e) { token = rawToken }
      const headers: Record<string,string> = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;
      // Always include type in body
      const body: any = {
        type: 'books',
        title: book.title,
        author: book.author,
        price: Number(book.price),
        pages: Number(book.pages),
        language: book.language,
        cover_image: book.coverImage,
        additional_images: book.additionalImages,
        description: book.description,
        publish_date: book.publishDate,
        published: book.published === true ? true : false,
      };
      if (!isNew) body.id = id;

      // If additional images were selected via MultipleImageUpload, upload them now and append URLs
      try {
        const additionalSelected = selectedAdditionalFilesRef.current.get(id) || [];
        if (additionalSelected.length > 0) {
          const uploadedUrls: string[] = [];
          for (const f of additionalSelected) {
            const fd = new FormData();
            fd.append('file', f);
            fd.append('folder', `resources/books/${book.id}`);
            const r = await fetch('/api/upload', { method: 'POST', body: fd });
            const resJson = await r.json();
            if (r.ok && resJson.url) {
              uploadedUrls.push(resJson.url);
            } else {
              throw new Error(resJson.error || 'Additional image upload failed');
            }
          }
          if (uploadedUrls.length > 0) {
            // merge into book and body
            book.additionalImages = [...book.additionalImages, ...uploadedUrls];
            selectedAdditionalFilesRef.current.delete(id);
          }
        }
      } catch (uploadErr) {
        setFieldErrors(id, { additionalImages: String(uploadErr?.message || uploadErr) });
        return;
      }
      const url = isNew ? `/api/admin/resources?type=books` : `/api/admin/resources?type=books&id=${id}`;
      const response = await fetch(url, {
        method,
        headers,
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to save book');
      }

      const result = await response.json();

      // Update local state with the saved book (includes DB id)
      if (isNew) {
        const d = result.data;
        const saved: MusicBook = {
          id: d.id.toString(),
          title: d.title || '',
          author: d.author || '',
          price: d.price || 0,
          pages: d.pages || 0,
          language: d.language || 'English',
          coverImage: d.cover_image || '',
          additionalImages: d.additional_images || [],
          description: d.description || '',
          publishDate: d.publish_date || '',
          published: d.published === true || d.published === 't' || false
        };
        setBooks(books.map(b => b.id === id ? saved : b));
      }

      // Clear any field errors and finish
      clearFieldErrors(id);
      setEditingId(null);
      toast.success('Book saved successfully');
    } catch (error) {
      console.error('Error saving book:', error);
      toast.error('Failed to save book: ' + (error?.message || 'Unknown error'));
    }
  };

  return (
    <div className="space-y-4">
      {/* Add Button */}
      <div className="flex justify-between items-center">
        <div className="text-white text-base font-medium">
          Total: <span className="text-[#FDB813] font-bold">{books.length}</span> book(s)
          {' | '}
          Published: <span className="text-[#FDB813] font-bold">{books.filter(b => b.published).length}</span>
        </div>
        <Button
          onClick={handleAdd}
          className="bg-[#2E2E2E] hover:bg-[#3E3E3E] text-white border border-[#FDB813]"
        >
          <Plus size={16} className="mr-2" />
          Add Music Book
        </Button>
      </div>
      {loading ? (
        <div className="text-center py-12 bg-black rounded-lg border border-gray-700">
          <Book size={48} className="mx-auto mb-4 text-gray-600" />
          <p className="text-gray-400">No music books yet. Click "Add Music Book" to create one.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {books.map((book) => {
            const isEditing = editingId === book.id;
            const isExpanded = expandedBook === book.id;

            return (
              <div key={book.id} className={`bg-black rounded-lg border border-gray-700 ${String(book.id).startsWith('new-') ? 'new-resource-form' : ''}`}>
                {/* Header */}
                <div className="p-4 flex items-center justify-between">
                  <div className="flex-1">
                    {isEditing ? (
                      <div>
                        <label className="text-sm text-white mb-1 block">Title <span className="text-red-400">*</span></label>
                        <Input
                          id={`field-${book.id}-title`}
                          value={book.title}
                          onChange={(e) => handleUpdate(book.id, { title: e.target.value })}
                          placeholder="Book Title"
                          className="bg-black border-gray-600 text-white text-lg mb-2"
                          maxLength={TITLE_MAX}
                          aria-invalid={!!formErrors[book.id]?.title}
                          aria-describedby={formErrors[book.id]?.title ? `error-${book.id}-title` : undefined}
                        />
                        <div className="text-xs text-gray-400">{book.title?.length || 0}/{TITLE_MAX} characters</div>
                        {isEditing && formErrors[book.id]?.title && (
                          <div id={`error-${book.id}-title`} role="alert" className="text-sm text-red-400 mt-1">{formErrors[book.id].title}</div>
                        )}
                      </div>
                    ) : (
                      <h3 className="text-white text-lg mb-1">{book.title || 'Untitled Book'}</h3>
                    )}
                    <div className="flex flex-wrap gap-3 text-sm text-gray-400">
                      <span>by {book.author || 'Unknown Author'}</span>
                      <span className="text-[#FDB813]">₹{book.price}</span>
                      <span>{book.pages} pages</span>
                      <span className="inline-flex items-center justify-center px-2 py-0.5 bg-[#FDB813] bg-opacity-20 text-black rounded">
                        {book.language}
                      </span>
                      {/* Published / Draft status badge (header only) */}
                      <span className="ml-2 inline-flex items-center justify-center px-2 py-0.5 rounded text-xs font-medium bg-green-900 text-green-300">
                        {book.published ? 'Published' : 'Draft'}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 self-start">
                    <Button
                      title={isExpanded ? 'Collapse' : 'Expand'}
                      onClick={() => setExpandedBook(isExpanded ? null : book.id)}
                      size="sm"
                      className="h-9 w-9 p-2 flex items-center justify-center rounded-md border border-[#FDB813] bg-[#2E2E2E] hover:bg-[#1a1a1a] text-white"
                    >
                      {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </Button>
                    {isEditing ? (
                      <></>
                    ) : (
                      <>
                        <Button
                          title={book.published ? 'Unpublish' : 'Publish'}
                          onClick={() => togglePublished(book.id)}
                          size="sm"
                          className="h-9 w-9 p-2 flex items-center justify-center rounded-md border border-[#FDB813] bg-[#2E2E2E] hover:bg-[#1a1a1a] text-white"
                        >
                          {book.published ? <EyeOff size={14} /> : <Eye size={14} />}
                        </Button>
                        <Button
                          title="Edit"
                          aria-label="Edit"
                          onClick={() => setEditingId(book.id)}
                          size="sm"
                          className="h-9 w-9 p-2 flex items-center justify-center rounded-md rounded-md border border-[#FDB813] bg-[#2E2E2E] hover:bg-[#1a1a1a] text-white"
                        >
                          <Edit2 size={14} />
                        </Button>
                        <Button
                          title="Delete"
                          onClick={() => handleDelete(book.id)}
                          size="sm"
                          className="h-9 w-9 p-2 flex items-center justify-center rounded-md border border-[#FDB813] bg-[#2E2E2E] hover:bg-[#1a1a1a] text-white"
                        >
                          <Trash2 size={14} />
                        </Button>
                      </>
                    )}
                  </div>
                </div>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className={`px-4 pb-4 space-y-4 border-t border-gray-700 pt-4 ${book.id && String(book.id).startsWith('new-') ? 'new-resource-form' : ''}`}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                          <label className="text-sm text-white mb-1 block">Author <span className="text-red-400">*</span></label>
                          <Input
                            id={`field-${book.id}-author`}
                            value={book.author}
                            onChange={(e) => handleUpdate(book.id, { author: e.target.value })}
                            placeholder="Author Name"
                            className="bg-black border-gray-600 text-white"
                            disabled={!isEditing}
                            maxLength={AUTHOR_MAX}
                            aria-invalid={!!formErrors[book.id]?.author}
                            aria-describedby={formErrors[book.id]?.author ? `error-${book.id}-author` : undefined}
                          />
                          {isEditing && <div className="text-xs text-gray-400">{book.author?.length || 0}/{AUTHOR_MAX} characters</div>}
                          {isEditing && formErrors[book.id]?.author && (
                            <div id={`error-${book.id}-author`} role="alert" className="text-sm text-red-400 mt-1">{formErrors[book.id].author}</div>
                          )}
                      </div>
                      <div>
                        <label className="text-sm text-white mb-1 block">Language <span className="text-red-400">*</span></label>
                        <Input
                          id={`field-${book.id}-language`}
                          value={book.language}
                          onChange={(e) => handleUpdate(book.id, { language: e.target.value })}
                          placeholder="Language"
                          className="bg-black border-gray-600 text-white"
                          disabled={!isEditing}
                          maxLength={LANGUAGE_MAX}
                          aria-invalid={!!formErrors[book.id]?.language}
                          aria-describedby={formErrors[book.id]?.language ? `error-${book.id}-language` : undefined}
                        />
                        {isEditing && <div className="text-xs text-gray-400">Max {LANGUAGE_MAX} characters</div>}
                        {isEditing && formErrors[book.id]?.language && (
                          <div id={`error-${book.id}-language`} role="alert" className="text-sm text-red-400 mt-1">{formErrors[book.id].language}</div>
                        )}
                      </div>
                      <div>
                        <label className="text-sm text-white mb-1 block">Price (₹) <span className="text-red-400">*</span></label>
                        <Input
                          id={`field-${book.id}-price`}
                          type="number"
                          value={book.price === undefined ? '' : book.price}
                          onChange={(e) => handleUpdate(book.id, { price: e.target.value === '' ? undefined : parseFloat(e.target.value) })}
                          placeholder="Price (₹)"
                          className="bg-black border-gray-600 text-white"
                          disabled={!isEditing}
                          min={PRICE_MIN}
                          max={PRICE_MAX}
                          step={0.01}
                          aria-invalid={!!formErrors[book.id]?.price}
                          aria-describedby={formErrors[book.id]?.price ? `error-${book.id}-price` : undefined}
                        />
                        {isEditing && <div className="text-xs text-gray-400">Min ₹{PRICE_MIN} — Max ₹{PRICE_MAX}</div>}
                        {isEditing && formErrors[book.id]?.price && (
                          <div id={`error-${book.id}-price`} role="alert" className="text-sm text-red-400 mt-1">{formErrors[book.id].price}</div>
                        )}
                      </div>
                      <div>
                        <label className="text-sm text-white mb-1 block">Pages <span className="text-red-400">*</span></label>
                        <Input
                          id={`field-${book.id}-pages`}
                          type="number"
                          value={book.pages === undefined ? '' : book.pages}
                          onChange={(e) => handleUpdate(book.id, { pages: e.target.value === '' ? undefined : parseInt(e.target.value) })}
                          placeholder="Number of Pages"
                          className="bg-black border-gray-600 text-white"
                          disabled={!isEditing}
                          min={PAGES_MIN}
                          max={PAGES_MAX}
                          aria-invalid={!!formErrors[book.id]?.pages}
                          aria-describedby={formErrors[book.id]?.pages ? `error-${book.id}-pages` : undefined}
                        />
                        {isEditing && <div className="text-xs text-gray-400">Min {PAGES_MIN} — Max {PAGES_MAX} pages</div>}
                        {isEditing && formErrors[book.id]?.pages && (
                          <div id={`error-${book.id}-pages`} role="alert" className="text-sm text-red-400 mt-1">{formErrors[book.id].pages}</div>
                        )}
                      </div>
                      <div>
                        <label className="text-sm text-white mb-1 block">Publish Date <span className="text-red-400">*</span></label>
                        <Input
                          id={`field-${book.id}-publishDate`}
                          type="date"
                          value={book.publishDate}
                          onChange={(e) => handleUpdate(book.id, { publishDate: e.target.value })}
                          placeholder="Publish Date"
                          className="bg-black border-gray-600 text-white"
                          disabled={!isEditing}
                          aria-invalid={!!formErrors[book.id]?.publishDate}
                          aria-describedby={formErrors[book.id]?.publishDate ? `error-${book.id}-publishDate` : undefined}
                        />
                        {isEditing && formErrors[book.id]?.publishDate && (
                          <div id={`error-${book.id}-publishDate`} role="alert" className="text-sm text-red-400 mt-1">{formErrors[book.id].publishDate}</div>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm text-white mb-1 block">Description <span className="text-gray-400 text-xs">(optional)</span></label>
                      <Textarea
                        value={book.description}
                        onChange={(e) => handleUpdate(book.id, { description: e.target.value })}
                        placeholder="Book description"
                        className="bg-black border-gray-600 text-white"
                        rows={3}
                        disabled={!isEditing}
                        maxLength={DESCRIPTION_MAX}
                      />
                      {isEditing && <div className="text-xs text-gray-400">{book.description?.length || 0}/{DESCRIPTION_MAX} characters</div>}
                      {isEditing && formErrors[book.id]?.description && (
                        <div id={`error-${book.id}-description`} role="alert" className="text-sm text-red-400 mt-1">{formErrors[book.id].description}</div>
                      )}
                    </div>

                    {/* Move Published checkbox to the end of the form, left aligned */}
                    <div className="mt-4">
                      <div className="flex items-center mb-2">
                        <input
                          type="checkbox"
                          checked={book.published === true}
                          onChange={e => handleUpdate(book.id, { published: e.target.checked })}
                          className="form-checkbox h-4 w-4 text-[#FDB813] border-gray-600 rounded focus:ring-[#FDB813] mr-2"
                          disabled={!isEditing}
                          aria-checked={book.published === true}
                          aria-label="Published"
                        />
                        <span className="text-sm text-white">Published</span>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm text-white mb-2 block">Cover Image <span className="text-red-400">*</span></label>
                      {isEditing ? (
                        <>
                          <div className="space-y-3">
                            <ImageUpload
                              bucket={`resources/books/${book.id}`}
                              onUploadComplete={(url) => handleUpdate(book.id, { coverImage: url })}
                              onFileSelect={(file) => {
                                try {
                                  if (file) selectedFilesRef.current.set(book.id, file);
                                  else selectedFilesRef.current.delete(book.id);
                                } catch (e) {}
                              }}
                              currentImage={book.coverImage}
                              imageType="gallery"
                            />
                            {/* Manual image URL input removed as requested */}
                          </div>
                          {formErrors[book.id]?.coverImage && (
                            <div id={`error-${book.id}-coverImage`} role="alert" className="text-sm text-red-400 mt-1">{formErrors[book.id].coverImage}</div>
                          )}
                        </>
                      ) : (
                        book.coverImage && (
                          <div className="mt-2">
                            {book.coverImage ? (
                              <img
                                src={book.coverImage || undefined}
                                alt="Cover preview"
                                className="w-full h-48 object-cover rounded border border-gray-600"
                                onError={(e) => {
                                  e.currentTarget.style.display = 'none';
                                }}
                              />
                            ) : null}
                          </div>
                        )
                      )}
                    </div>

                    <div>
                      <label className="text-sm text-white mb-2 block">Additional Images (Gallery)</label>
                      {isEditing && (
                        <div className="space-y-3 mb-3">
                          <Button
                            onClick={() => setShowAdditionalImagesUpload(book.id)}
                            className="w-full bg-[#2E2E2E] hover:bg-[#3E3E3E] text-white border border-[#FDB813]"
                            type="button"
                          >
                            <Upload size={16} className="mr-2" />
                            Upload Multiple Images
                          </Button>
                          {/* Additional image URLs text area removed as requested */}
                        </div>
                      )}
                      {book.additionalImages.length > 0 && (
                        <div className="mt-3 grid grid-cols-4 md:grid-cols-6 gap-2">
                          {book.additionalImages.map((url, index) => (
                            <div key={index} className="relative group flex items-center justify-center bg-[#1a1a1a] rounded overflow-hidden">
                              {url ? (
                                <img
                                  src={url || undefined}
                                  alt={`Additional ${index + 1}`}
                                  className="w-full h-auto object-contain rounded"
                                  style={{ maxHeight: '8rem' }}
                                  onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                  }}
                                />
                              ) : null}
                              {isEditing && (
                                <Button
                                  onClick={() => {
                                    const newImages = book.additionalImages.filter((_, i) => i !== index);
                                    handleUpdate(book.id, { additionalImages: newImages });
                                  }}
                                  variant="destructive"
                                  size="sm"
                                  className="absolute top-2 right-2 z-10"
                                  type="button"
                                >
                                  <X size={16} />
                                </Button>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                    {/* Footer actions for the expanded form */}
                    {isEditing && (
                      <div className="mt-4 sticky bottom-0 z-40 flex justify-end gap-3 bg-gradient-to-t from-black/60 to-transparent py-2">
                        <Button
                          onClick={() => {
                            setEditingId(null);
                            // Remove the book if it's empty (newly added)
                            if (!book.title && !book.coverImage) {
                              setBooks(books.filter(b => b.id !== book.id));
                            }
                          }}
                          className="h-9 px-4 bg-[#2E2E2E] hover:bg-[#3E3E3E] text-white border border-gray-600 flex items-center gap-2"
                        >
                          <X size={14} />
                          Cancel
                        </Button>
                        <Button
                          onClick={() => handleSave(book.id)}
                          className="h-9 px-4 bg-[#FDB813] hover:bg-[#e5a711] text-black flex items-center gap-2"
                        >
                          <Save size={14} />
                          Save
                        </Button>
                      </div>
                    )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={confirmDelete}
        title="Delete Music Book"
        description="Are you sure you want to delete this book? This action cannot be undone."
      />

      {showAdditionalImagesUpload && (
        <MultipleImageUpload
            onUploadComplete={(images) => {
              const bookId = showAdditionalImagesUpload;
              const book = books.find(b => b.id === bookId);
              if (book) {
                const newUrls = images.map(img => img.url);
                handleUpdate(bookId, { 
                  additionalImages: [...book.additionalImages, ...newUrls] 
                });
                // store the files so they can be uploaded on Save
                try {
                  const files = images.map(img => img.file).filter(Boolean) as File[];
                  if (files.length > 0) selectedAdditionalFilesRef.current.set(bookId, files);
                } catch (e) {}
                toast.success(`${images.length} image(s) added successfully!`);
              }
              setShowAdditionalImagesUpload(null);
            }}
          onClose={() => setShowAdditionalImagesUpload(null)}
          category={showAdditionalImagesUpload ? `resources/books/${showAdditionalImagesUpload}` : 'resources/books'}
        />
      )}
    </div>
  );
}

// Worship Videos Manager Sub-Component
function WorshipVideosManager({ formErrors, setFieldErrors, clearFieldErrors }: { formErrors: Record<string, Record<string, string>>; setFieldErrors: (id: string, errors: Record<string,string>) => void; clearFieldErrors: (id: string, fields?: string[]) => void }) {
  const [videos, setVideos] = useState<WorshipVideo[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [videoToDelete, setVideoToDelete] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  // Reorder mode state: when true, user can drag cards and then Save Order to persist
  const [reorderMode, setReorderMode] = useState(false);
  const [originalVideosSnapshot, setOriginalVideosSnapshot] = useState<WorshipVideo[] | null>(null);

  useEffect(() => {
    fetchVideos();
  }, []);

  // DnD sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );
  

  const fetchVideos = async () => {
    try {
      setLoading(true);
      const rawToken = localStorage.getItem('admin_token');
      let token = '';
      if (rawToken) try { token = JSON.parse(rawToken).token || rawToken } catch (e) { token = rawToken }
      const headers = token ? { 'Authorization': `Bearer ${token}` } : undefined;
      const response = await fetch('/api/admin/resources?type=worship', { headers });
      if (!response.ok) throw new Error('Failed to fetch worship videos');
      const data = await response.json();
      
      // Transform API response to match component interface (include display_order)
      const transformedVideos = (data.data || []).map((video: any) => ({
        id: video.id.toString(),
        // Prefer stored title/date_posted from DB; admin will fetch/update metadata when saving
        youtubeUrl: video.youtube_url || '',
        published: video.published === true || video.published === 't' || false,
        youtubeTitle: video.title || '',
        datePosted: video.date_posted || video.created_at || null,
        displayOrder: typeof video.display_order !== 'undefined' && video.display_order !== null ? Number(video.display_order) : null
      }));

      // Fetch YouTube metadata for items missing title or date (batched to avoid spiky load)
      const withMeta = await runInBatches(transformedVideos, 6, async (v) => {
        try {
          if ((v.youtubeTitle && v.youtubeTitle.length > 0) && v.datePosted) return v;
          const vid = extractYouTubeId(v.youtubeUrl || '');
          if (!vid) return v;
          const meta = await fetchYouTubeMeta(vid);
          return {
            ...v,
            youtubeTitle: v.youtubeTitle || meta?.title || '',
            datePosted: v.datePosted || meta?.publishedAt || null
          };
        } catch (e) {
          return v;
        }
      });

      // If displayOrder exists on items, sort by it ascending (lower number = higher in list)
      withMeta.sort((a, b) => {
        const aHas = typeof a.displayOrder === 'number' && !isNaN(a.displayOrder);
        const bHas = typeof b.displayOrder === 'number' && !isNaN(b.displayOrder);
        if (aHas && bHas) return a.displayOrder - b.displayOrder;
        if (aHas) return -1;
        if (bHas) return 1;
        return 0;
      });

      setVideos(withMeta);
    } catch (error) {
      console.error('Error fetching worship videos:', error);
      toast.error('Failed to load worship videos');
    } finally {
      setLoading(false);
    }
  };

  // NOTE: Single-call batch save is implemented by `saveOrder()` below.

  // Note: ordering is handled by dnd-kit drag end handler (saves immediately)

  // Sortable video card used by dnd-kit
  // Build a small helper to get youtube thumbnail for admin preview
  const getYouTubeThumbnail = (url: string) => {
    if (!url) return '';
    try {
      let videoId = '';
      if (url.includes('youtube.com/watch?v=')) videoId = url.split('v=')[1]?.split('&')[0];
      else if (url.includes('youtu.be/')) videoId = url.split('youtu.be/')[1]?.split('?')[0];
      else if (url.includes('youtube.com/shorts/')) videoId = url.split('shorts/')[1]?.split('?')[0];
      return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : '';
    } catch (err) {
      return '';
    }
  };

  function SortableVideoCard({ video, sortable }: { video: WorshipVideo; sortable?: boolean }) {
    let attributes = {} as any;
    let listeners = {} as any;
    let setNodeRef: any = undefined;
    let transform: any = undefined;
    let transition: any = undefined;
    let isDragging = false;
    if (sortable) {
      const sortableResult = useSortable({ id: video.id });
      attributes = sortableResult.attributes;
      listeners = sortableResult.listeners;
      setNodeRef = sortableResult.setNodeRef;
      transform = sortableResult.transform;
      transition = sortableResult.transition;
      isDragging = sortableResult.isDragging;
    }
    const style = { transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.6 : 1 };

    const outerRefProps = sortable && setNodeRef ? { ref: setNodeRef } : {};

    return (
      <div {...outerRefProps} style={style} className={`${!video.published ? 'opacity-70' : ''}`}>
        <div className="relative bg-black rounded-lg border border-gray-700 overflow-hidden">
          {/* Drag handle (left edge) - only shown when sortable */}
          {sortable ? (
            <div {...attributes} {...listeners} className="absolute left-2 top-2 z-40 cursor-grab active:cursor-grabbing p-1 text-gray-200 bg-black/40 rounded-md hover:text-white">
              <GripVertical />
            </div>
          ) : null}

          {/* Square thumbnail */}
          <div className="aspect-square bg-[#111111] w-full flex items-center justify-center relative">
            {getYouTubeThumbnail(video.youtubeUrl) ? (
              <img src={getYouTubeThumbnail(video.youtubeUrl)} alt={video.youtubeTitle || ''} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-600">No preview</div>
            )}

            {/* Bottom overlay with title, date and badge (badge on right) */}
            <div
              className="absolute left-0 right-0 bottom-0 px-3 py-2 flex items-center justify-between gap-3"
              style={{ backgroundColor: 'rgba(0,0,0,0.64)', backdropFilter: 'blur(6px)' }}
            >
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-white truncate" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.9)' }}>{video.youtubeTitle || 'Untitled'}</h3>
                <div className="mt-1 flex items-center gap-2 text-xs text-gray-300">
                  <Calendar size={12} />
                  <span>{formatAdminDate(video.datePosted)}</span>
                </div>
              </div>

              <div className="flex-shrink-0 ml-3">
                {video.published ? (
                  <span className="inline-flex items-center justify-center px-2 py-0.5 rounded text-xs font-medium bg-green-900 text-green-300">Published</span>
                ) : (
                  <span className="inline-flex items-center justify-center px-2 py-0.5 rounded text-xs font-medium bg-gray-700 text-gray-300">Draft</span>
                )}
              </div>
            </div>

            {/* Overlay action buttons top-right */}
            <div className="absolute top-2 right-2 z-30 flex items-center gap-2">
              <button
                title={video.published ? 'Unpublish' : 'Publish'}
                onClick={() => togglePublishedVideo(video.id)}
                className="h-8 w-8 p-1 flex items-center justify-center rounded-md border border-[#FDB813] bg-[#2E2E2E] hover:bg-[#1a1a1a] text-white"
              >
                {video.published ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
              <button
                title="Edit"
                onClick={() => setEditingId(video.id)}
                className="h-8 w-8 p-1 flex items-center justify-center rounded-md border border-[#FDB813] bg-[#2E2E2E] hover:bg-[#1a1a1a] text-white"
              >
                <Edit2 size={14} />
              </button>
              <button
                title="Delete"
                onClick={() => handleDelete(video.id)}
                className="h-8 w-8 p-1 flex items-center justify-center rounded-md border border-[#FDB813] bg-[#2E2E2E] hover:bg-[#1a1a1a] text-white"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const togglePublishedVideo = async (id: string) => {
    const video = videos.find(v => v.id === id);
    if (!video) return;
    const newPublished = !video.published;
    // optimistic
    handleUpdate(video.id, { published: newPublished });

    if (id.startsWith('new-')) {
      toast.success(newPublished ? 'Marked as published' : 'Marked as draft');
      return;
    }

    try {
      const rawToken = localStorage.getItem('admin_token');
      let token = '';
      if (rawToken) try { token = JSON.parse(rawToken).token || rawToken } catch (e) { token = rawToken }
      const headers: Record<string,string> = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const body = {
        type: 'worship',
        id,
        youtube_url: video.youtubeUrl,
        published: newPublished
      };

      const res = await fetch(`/api/admin/resources?type=worship&id=${id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(body)
      });

      if (!res.ok) throw new Error('Failed to update');
      const json = await res.json();
      const d = json.data;
      handleUpdate(id, { published: d.published === true || d.published === 't' || false });
      toast.success(newPublished ? 'Video published' : 'Video unpublished');
    } catch (err) {
      console.error(err);
      handleUpdate(id, { published: !newPublished });
      toast.error('Failed to update published state');
    }
  };

  const handleAdd = () => {
    // Show the old-style add form (not a card)
    setAddingNew(true);
  };

  // State for adding new worship item via separate form
  const [addingNew, setAddingNew] = useState(false);
  const [newYoutubeUrl, setNewYoutubeUrl] = useState('');
  const [newPublished, setNewPublished] = useState(true);

  const cancelAddNew = () => {
    setAddingNew(false);
    setNewYoutubeUrl('');
    setNewPublished(true);
    clearFieldErrors('new');
  };

  const saveNewFromForm = async () => {
    // Basic validation
    if (!newYoutubeUrl || newYoutubeUrl.trim().length === 0) {
      setFieldErrors('new', { youtubeUrl: 'YouTube URL is required' });
      return;
    }

    try {
      const vid = extractYouTubeId(newYoutubeUrl || '');
      let metaTitle: string | null = null;
      let metaPublishedAt: string | null = null;
      if (vid) {
        try {
          const meta = await fetchYouTubeMeta(vid);
          if (meta) {
            metaTitle = meta.title || null;
            metaPublishedAt = meta.publishedAt || null;
          }
        } catch (err) {
          // ignore
        }
      }

      const rawToken = localStorage.getItem('admin_token');
      let token = '';
      if (rawToken) try { token = JSON.parse(rawToken).token || rawToken } catch (e) { token = rawToken }
      const headers: Record<string,string> = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const body: any = {
        type: 'worship',
        youtube_url: newYoutubeUrl,
        title: metaTitle,
        date_posted: metaPublishedAt,
        published: newPublished === true
      };

      const response = await fetch('/api/admin/resources?type=worship', {
        method: 'POST',
        headers,
        body: JSON.stringify(body)
      });
      if (!response.ok) throw new Error('Failed to save new worship video');
      const result = await response.json();
      const d = result.data;
      const saved: WorshipVideo = {
        id: d.id.toString(),
        youtubeUrl: newYoutubeUrl,
        published: d.published === true || d.published === 't' || newPublished,
        youtubeTitle: d.title || metaTitle || '',
        datePosted: d.date_posted || metaPublishedAt || null,
        displayOrder: null
      };

      // Insert at front and persist display_order
      const newList = [saved, ...videos.map(v => ({ ...v }))].map((v, i) => ({ ...v, displayOrder: i }));
      setVideos(newList);

      try {
        const rawToken2 = localStorage.getItem('admin_token');
        let token2 = '';
        if (rawToken2) try { token2 = JSON.parse(rawToken2).token || rawToken2 } catch (e) { token2 = rawToken2 }
        const headers2: Record<string,string> = { 'Content-Type': 'application/json' };
        if (token2) headers2['Authorization'] = `Bearer ${token2}`;

        const items = newList.filter(v => v.id && !String(v.id).startsWith('new-')).map((v, i) => ({ id: v.id, display_order: i }));
        if (items.length) {
          const res = await fetch('/api/admin/resources/order', {
            method: 'POST',
            headers: headers2,
            body: JSON.stringify({ items })
          });
          if (!res.ok) throw new Error('Failed to persist display order for new item');
        }
      } catch (err) {
        console.error('Failed to persist order after saving new worship video (form):', err);
        toast.error('Saved video but failed to update order on server');
        await fetchVideos();
      }

      clearFieldErrors('new');
      setAddingNew(false);
      setNewYoutubeUrl('');
      setNewPublished(true);
      toast.success('Worship video saved');
    } catch (err) {
      console.error(err);
      toast.error('Failed to save worship video');
    }
  };

  const handleUpdate = (id: string, updates: Partial<WorshipVideo>) => {
    setVideos(videos.map(v => v.id === id ? { ...v, ...updates } : v));
    const fields = Object.keys(updates || {});
    if (fields.length) clearFieldErrors(id, fields as string[]);
  };

  const handleDelete = (id: string) => {
    setVideoToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (videoToDelete) {
      try {
        if (!videoToDelete.startsWith('new-')) {
              const rawToken = localStorage.getItem('admin_token');
              let token = '';
              if (rawToken) try { token = JSON.parse(rawToken).token || rawToken } catch (e) { token = rawToken }
              const headers = token ? { 'Authorization': `Bearer ${token}` } : undefined;
              const response = await fetch(`/api/admin/resources?type=worship&id=${videoToDelete}`, {
                method: 'DELETE',
                headers
              });
          if (!response.ok) throw new Error('Failed to delete video');
        }
        setVideos(videos.filter(v => v.id !== videoToDelete));
        toast.success('Worship video deleted successfully');
      } catch (error) {
        console.error('Error deleting video:', error);
        toast.error('Failed to delete video');
      }
      setVideoToDelete(null);
    }
    setDeleteDialogOpen(false);
  };

  const handleSave = async (id: string) => {
    const video = videos.find(v => v.id === id);
    if (!video) return;

    try {
      // Validate fields for worship video
      const fieldErrors: Record<string, string> = {};
      if (!video.youtubeUrl || video.youtubeUrl.trim().length === 0) fieldErrors.youtubeUrl = 'YouTube URL is required';

      if (Object.keys(fieldErrors).length > 0) {
        setFieldErrors(id, fieldErrors);
        return;
      }

      const isNew = id.startsWith('new-');
      const method = isNew ? 'POST' : 'PUT';
      const rawToken = localStorage.getItem('admin_token');
      let token = '';
      if (rawToken) try { token = JSON.parse(rawToken).token || rawToken } catch (e) { token = rawToken }
      const headers: Record<string,string> = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      // Try to fetch YouTube metadata (title + publishedAt) to persist with the record
      // Try to fetch YouTube metadata (title + publishedAt) to persist with the record
      let metaTitle: string | null = null;
      let metaPublishedAt: string | null = null;
      try {
        const vid = extractYouTubeId(video.youtubeUrl || '');
        if (vid) {
          const meta = await fetchYouTubeMeta(vid);
          if (meta) {
            metaTitle = meta.title || null;
            metaPublishedAt = meta.publishedAt || null;
          }
        }
      } catch (err) {
        // ignore metadata lookup failures
      }

      const body: any = {
        type: 'worship',
        ...(isNew ? {} : { id }),
        youtube_url: video.youtubeUrl,
        title: metaTitle,
        date_posted: metaPublishedAt,
        published: video.published === true
      };

      const url = isNew ? `/api/admin/resources?type=worship` : `/api/admin/resources?type=worship&id=${id}`;
      const response = await fetch(url, {
        method,
        headers,
        body: JSON.stringify(body)
      });

      if (!response.ok) throw new Error('Failed to save video');
      
      const result = await response.json();
      
      if (result && result.data) {
        const d = result.data;
        const savedId = d.id ? d.id.toString() : null;
        const savedItem = {
          ...video,
          id: savedId || video.id,
          youtubeTitle: d.title || video.youtubeTitle,
          datePosted: d.date_posted || video.datePosted,
          published: d.published === true || d.published === 't' || video.published
        } as WorshipVideo;

        if (isNew) {
          // replace the temporary new item and move saved item to the front
          const withoutNew = videos.filter(v => v.id !== id);
          const reordered = [savedItem, ...withoutNew.map(v => ({ ...v }))].map((v, i) => ({ ...v, displayOrder: i }));
          setVideos(reordered);

          // Persist the new display_order for saved items so DB reflects UI order
          try {
            const rawToken2 = localStorage.getItem('admin_token');
            let token2 = '';
            if (rawToken2) try { token2 = JSON.parse(rawToken2).token || rawToken2 } catch (e) { token2 = rawToken2 }
            const headers2: Record<string,string> = { 'Content-Type': 'application/json' };
            if (token2) headers2['Authorization'] = `Bearer ${token2}`;

            const items = reordered
              .filter(v => v.id && !String(v.id).startsWith('new-'))
              .map((v, i) => ({ id: v.id, display_order: i }));

            if (items.length) {
              const res = await fetch('/api/admin/resources/order', {
                method: 'POST',
                headers: headers2,
                body: JSON.stringify({ items })
              });
              if (!res.ok) throw new Error('Failed to persist display order for new item');
            }
          } catch (err) {
            console.error('Failed to persist order after saving new worship video:', err);
            toast.error('Saved video but failed to update order on server');
            // optional: refetch list to ensure UI matches DB
            await fetchVideos();
          }
        } else {
          setVideos(videos.map((v, idx) => v.id === id ? { ...savedItem, displayOrder: v.displayOrder ?? idx } : v));
        }
      }
      clearFieldErrors(id);
      setEditingId(null);
      toast.success('Worship video saved successfully');
    } catch (error) {
      console.error('Error saving video:', error);
      toast.error('Failed to save video');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="text-white text-base font-medium">
          Total: <span className="text-[#FDB813] font-bold">{videos.length}</span> video(s)
          {' | '}
          Published: <span className="text-[#FDB813] font-bold">{videos.filter(v => v.published).length}</span>
        </div>
        <div className="flex items-center gap-3">
          {!reorderMode ? (
            <Button
              onClick={() => { setOriginalVideosSnapshot([...videos]); setReorderMode(true); }}
              className="bg-[#2E2E2E] hover:bg-[#3E3E3E] text-white border border-[#FDB813]"
            >
              <GripVertical size={16} className="mr-2" />
              Enable Reorder
            </Button>
          ) : (
            <div className="flex items-center gap-2">
              <Button onClick={() => { setVideos(originalVideosSnapshot ?? videos); setOriginalVideosSnapshot(null); setReorderMode(false); }} className="h-9 px-4 bg-[#2E2E2E] hover:bg-[#3E3E3E] text-white border border-gray-600">
                <X size={16} className="mr-2" />
                Cancel</Button>
              <Button onClick={async () => {
                // Save order
                try {
                  const items = videos.filter(v => v.id && !String(v.id).startsWith('new-')).map((v, i) => ({ id: v.id, display_order: i }));
                  const rawToken = localStorage.getItem('admin_token');
                  let token = '';
                  if (rawToken) try { token = JSON.parse(rawToken).token || rawToken } catch (e) { token = rawToken }
                  const headers: Record<string,string> = { 'Content-Type': 'application/json' };
                  if (token) headers['Authorization'] = `Bearer ${token}`;
                  const res = await fetch('/api/admin/resources/order', { method: 'POST', headers, body: JSON.stringify({ items }) });
                  if (!res.ok) throw new Error('Failed to save order');
                  toast.success('Order saved');
                  setOriginalVideosSnapshot(null);
                  setReorderMode(false);
                } catch (err) {
                  console.error('Failed to save order:', err);
                  toast.error('Failed to save order');
                }
              }} className="h-9 px-4 bg-[#FDB813] hover:bg-[#e5a711] text-black">
                <Save size={16} className="mr-2" />
                Save Order</Button>
            </div>
          )}

          <Button
            onClick={handleAdd}
            className="bg-[#2E2E2E] hover:bg-[#3E3E3E] text-white border border-[#FDB813]"
          >
            <Plus size={16} className="mr-2" />
            Add Worship Video
          </Button>
        </div>
      </div>

      {/* Old-style add form (shown when addingNew) */}
      {addingNew && (
        <div className="bg-black rounded-lg border border-gray-700 p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
            <div className="md:col-span-2">
              <label className="text-sm text-white mb-1 block">YouTube URL <span className="text-[#FDB813]">*</span></label>
              <Input
                value={newYoutubeUrl}
                onChange={(e) => setNewYoutubeUrl(e.target.value)}
                placeholder="https://youtu.be/..."
                className="bg-[#2e2e2e] border-gray-600 text-white"
                style={{ backgroundColor: '#2e2e2e' }}
              />
              {formErrors['new']?.youtubeUrl && (
                <div className="bg-black text-sm text-red-400 mt-1">{formErrors['new'].youtubeUrl}</div>
              )}
            </div>
            <div className="flex items-center justify-end gap-3">
              <div className="flex items-center mr-4">
                <input type="checkbox" checked={newPublished} onChange={(e) => setNewPublished(e.target.checked)} className="form-checkbox h-4 w-4 text-[#FDB813] border-gray-600 rounded mr-2" />
                <span className="text-sm text-white">Publish</span>
              </div>
              <div className="flex items-center gap-3">
                <Button onClick={cancelAddNew} className="h-9 px-4 bg-[#2E2E2E] hover:bg-[#3E3E3E] text-white border border-gray-600 flex items-center gap-2">
                  <X size={14} />
                  Cancel
                </Button>
                <Button onClick={saveNewFromForm} className="h-9 px-4 bg-[#FDB813] hover:bg-[#e5a711] text-black flex items-center gap-2">
                  <Save size={14} />
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-center py-12 bg-black rounded-lg border border-gray-700">
          <Music size={48} className="mx-auto mb-4 text-gray-600 animate-pulse" />
          <p className="text-gray-400">Loading videos...</p>
        </div>
      ) : videos.length === 0 ? (
        <div className="text-center py-12 bg-black rounded-lg border border-gray-700">
          <Music size={48} className="mx-auto mb-4 text-gray-600" />
          <p className="text-gray-400">No worship videos yet. Click "Add Worship Video" to create one.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {reorderMode ? (
            <>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-400">🔧 Reorder mode enabled — drag cards into the desired order, then click <strong>Save Order</strong>.</p>
                <div className="text-sm text-gray-400">Drag handle on left of each card</div>
              </div>

              <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={(event) => {
                const { active, over } = event;
                if (!over || active.id === over.id) return;
                const oldIndex = videos.findIndex(v => v.id === active.id);
                const newIndex = videos.findIndex(v => v.id === over.id);
                if (oldIndex === -1 || newIndex === -1) return;
                const newOrder = arrayMove(videos, oldIndex, newIndex).map((v, i) => ({ ...v, displayOrder: i }));
                setVideos(newOrder);
              }}>
                <SortableContext items={videos.map(v => v.id)} strategy={verticalListSortingStrategy}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {videos.map((video) => (
                      <SortableVideoCard key={video.id} video={video} sortable={true} />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            </>
          ) : (
            <>
              <p className="text-sm text-gray-400">Click "Enable Reorder" to reorder multiple cards and save in one request.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {videos.map((video) => (
                  <SortableVideoCard key={video.id} video={video} sortable={false} />
                ))}
              </div>
            </>
          )}
        </div>
      )}

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={confirmDelete}
        title="Delete Worship Video"
        description="Are you sure you want to delete this worship video? This action cannot be undone."
      />
    </div>
  );
}

// Sermons Manager Sub-Component
function SermonsManager({ formErrors, setFieldErrors, clearFieldErrors }: { formErrors: Record<string, Record<string, string>>; setFieldErrors: (id: string, errors: Record<string,string>) => void; clearFieldErrors: (id: string, fields?: string[]) => void }) {
  const [sermons, setSermons] = useState<WorshipVideo[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [sermonToDelete, setSermonToDelete] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Reorder mode + snapshot
  const [reorderMode, setReorderMode] = useState(false);
  const [originalSnapshot, setOriginalSnapshot] = useState<WorshipVideo[] | null>(null);

  // Add-new state (old-style form)
  const [addingNew, setAddingNew] = useState(false);
  const [newYoutubeUrl, setNewYoutubeUrl] = useState('');
  const [newPublished, setNewPublished] = useState(true);

  // DnD sensors (local to sermons manager)
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  useEffect(() => {
    fetchSermons();
  }, []);

  const fetchSermons = async () => {
    try {
      setLoading(true);
      const rawToken = localStorage.getItem('admin_token');
      let token = '';
      if (rawToken) try { token = JSON.parse(rawToken).token || rawToken } catch (e) { token = rawToken }
      const headers = token ? { 'Authorization': `Bearer ${token}` } : undefined;
      const response = await fetch('/api/admin/resources?type=sermons', { headers });
      if (!response.ok) throw new Error('Failed to fetch sermons');
      const data = await response.json();

      const transformed = (data.data || []).map((s: any) => ({
        id: s.id.toString(),
        youtubeUrl: s.youtube_url || '',
        published: s.published === true || s.published === 't' || false,
        youtubeTitle: s.title || '',
        datePosted: s.date_posted || s.created_at || null,
        displayOrder: typeof s.display_order !== 'undefined' && s.display_order !== null ? Number(s.display_order) : null
      }));

      // Fetch YouTube titles/dates for missing metadata in batches
      const withMeta = await runInBatches(transformed, 6, async (v: any) => {
        try {
          if ((v.youtubeTitle && v.youtubeTitle.length > 0) && v.datePosted) return v;
          const vid = extractYouTubeId(v.youtubeUrl || '');
          if (!vid) return v;
          const meta = await fetchYouTubeMeta(vid);
          return { ...v, youtubeTitle: v.youtubeTitle || meta?.title || '', datePosted: v.datePosted || meta?.publishedAt || null };
        } catch (e) {
          return v;
        }
      });

      // sort by displayOrder if present
      withMeta.sort((a: any, b: any) => {
        const aHas = typeof a.displayOrder === 'number' && !isNaN(a.displayOrder);
        const bHas = typeof b.displayOrder === 'number' && !isNaN(b.displayOrder);
        if (aHas && bHas) return a.displayOrder - b.displayOrder;
        if (aHas) return -1;
        if (bHas) return 1;
        return 0;
      });

      setSermons(withMeta);
    } catch (error) {
      console.error('Error fetching sermons:', error);
      toast.error('Failed to load sermons');
    } finally {
      setLoading(false);
    }
  };

  const getYouTubeThumbnail = (url: string) => {
    if (!url) return '';
    try {
      let videoId = '';
      if (url.includes('youtube.com/watch?v=')) videoId = url.split('v=')[1]?.split('&')[0];
      else if (url.includes('youtu.be/')) videoId = url.split('youtu.be/')[1]?.split('?')[0];
      else if (url.includes('youtube.com/shorts/')) videoId = url.split('shorts/')[1]?.split('?')[0];
      return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : '';
    } catch (err) { return ''; }
  };

  function SortableSermonCard({ sermon, sortable }: { sermon: WorshipVideo; sortable?: boolean }) {
    let attributes: any = {};
    let listeners: any = {};
    let setNodeRef: any = undefined;
    let transform: any = undefined;
    let transition: any = undefined;
    let isDragging = false;
    if (sortable) {
      const r = useSortable({ id: sermon.id });
      attributes = r.attributes; listeners = r.listeners; setNodeRef = r.setNodeRef; transform = r.transform; transition = r.transition; isDragging = r.isDragging;
    }
    const style = { transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.6 : 1 };
    const outerRefProps = sortable && setNodeRef ? { ref: setNodeRef } : {};

    return (
      <div {...outerRefProps} style={style} className={`${!sermon.published ? 'opacity-70' : ''}`}>
        <div className="relative bg-black rounded-lg border border-gray-700 overflow-hidden">
          {sortable ? (
            <div {...attributes} {...listeners} className="absolute left-2 top-2 z-40 cursor-grab active:cursor-grabbing p-1 text-gray-200 bg-black/40 rounded-md hover:text-white">
              <GripVertical />
            </div>
          ) : null}
          <div className="aspect-square bg-[#111111] w-full flex items-center justify-center relative">
            {getYouTubeThumbnail(sermon.youtubeUrl) ? (
              <img src={getYouTubeThumbnail(sermon.youtubeUrl)} alt={sermon.youtubeTitle || ''} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-600">No preview</div>
            )}

            <div className="absolute left-0 right-0 bottom-0 px-3 py-2 flex items-center justify-between gap-3" style={{ backgroundColor: 'rgba(0,0,0,0.64)', backdropFilter: 'blur(6px)' }}>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-white truncate" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.9)' }}>{sermon.youtubeTitle || 'Untitled'}</h3>
                <div className="mt-1 flex items-center gap-2 text-xs text-gray-300"><Calendar size={12} /><span>{formatAdminDate(sermon.datePosted)}</span></div>
              </div>
              <div className="flex-shrink-0 ml-3">
                {sermon.published ? (
                  <span className="inline-flex items-center justify-center px-2 py-0.5 rounded text-xs font-medium bg-green-900 text-green-300">Published</span>
                ) : (
                  <span className="inline-flex items-center justify-center px-2 py-0.5 rounded text-xs font-medium bg-gray-700 text-gray-300">Draft</span>
                )}
              </div>
            </div>

            <div className="absolute top-2 right-2 z-30 flex items-center gap-2">
              <button title={sermon.published ? 'Unpublish' : 'Publish'} onClick={() => togglePublishedSermon(sermon.id)} className="h-8 w-8 p-1 flex items-center justify-center rounded-md border border-[#FDB813] bg-[#2E2E2E] hover:bg-[#1a1a1a] text-white">{sermon.published ? <EyeOff size={14} /> : <Eye size={14} />}</button>
              <button title="Edit" onClick={() => setEditingId(sermon.id)} className="h-8 w-8 p-1 flex items-center justify-center rounded-md border border-[#FDB813] bg-[#2E2E2E] hover:bg-[#1a1a1a] text-white"><Edit2 size={14} /></button>
              <button title="Delete" onClick={() => handleDelete(sermon.id)} className="h-8 w-8 p-1 flex items-center justify-center rounded-md border border-[#FDB813] bg-[#2E2E2E] hover:bg-[#1a1a1a] text-white"><Trash2 size={14} /></button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const togglePublishedSermon = async (id: string) => {
    const sermon = sermons.find(s => s.id === id);
    if (!sermon) return;
    const newPublished = !sermon.published;
    handleUpdate(id, { published: newPublished });
    if (id.startsWith('new-')) {
      toast.success(newPublished ? 'Marked as published' : 'Marked as draft');
      return;
    }
    try {
      const rawToken = localStorage.getItem('admin_token');
      let token = '';
      if (rawToken) try { token = JSON.parse(rawToken).token || rawToken } catch (e) { token = rawToken }
      const headers: Record<string,string> = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const body = { type: 'sermons', id, youtube_url: sermon.youtubeUrl, published: newPublished };
      const res = await fetch(`/api/admin/resources?type=sermons&id=${id}`, { method: 'PUT', headers, body: JSON.stringify(body) });
      if (!res.ok) throw new Error('Failed to update');
      const json = await res.json();
      handleUpdate(id, { published: json.data.published === true || json.data.published === 't' || false });
      toast.success(newPublished ? 'Sermon published' : 'Sermon unpublished');
    } catch (err) {
      console.error(err);
      handleUpdate(id, { published: !newPublished });
      toast.error('Failed to update published state');
    }
  };

  const handleAdd = () => setAddingNew(true);

  const cancelAddNew = () => { setAddingNew(false); setNewYoutubeUrl(''); setNewPublished(true); clearFieldErrors('new'); };

  const saveNewFromForm = async () => {
    if (!newYoutubeUrl || newYoutubeUrl.trim().length === 0) { setFieldErrors('new', { youtubeUrl: 'YouTube URL is required' }); return; }
    try {
      const vid = extractYouTubeId(newYoutubeUrl || '');
      let metaTitle: string | null = null; let metaPublishedAt: string | null = null;
      if (vid) {
        try { const meta = await fetchYouTubeMeta(vid); if (meta) { metaTitle = meta.title || null; metaPublishedAt = meta.publishedAt || null; } } catch (e) {}
      }
      const rawToken = localStorage.getItem('admin_token'); let token = '';
      if (rawToken) try { token = JSON.parse(rawToken).token || rawToken } catch (e) { token = rawToken }
      const headers: Record<string,string> = { 'Content-Type': 'application/json' }; if (token) headers['Authorization'] = `Bearer ${token}`;
      const body: any = { type: 'sermons', youtube_url: newYoutubeUrl, title: metaTitle, date_posted: metaPublishedAt, published: newPublished === true };
      const response = await fetch('/api/admin/resources?type=sermons', { method: 'POST', headers, body: JSON.stringify(body) });
      if (!response.ok) throw new Error('Failed to save new sermon');
      const result = await response.json(); const d = result.data;
      const saved: WorshipVideo = { id: d.id.toString(), youtubeUrl: newYoutubeUrl, published: d.published === true || d.published === 't' || newPublished, youtubeTitle: d.title || metaTitle || '', datePosted: d.date_posted || metaPublishedAt || null, displayOrder: null };

      const newList = [saved, ...sermons.map(v => ({ ...v }))].map((v, i) => ({ ...v, displayOrder: i }));
      setSermons(newList);

      try {
        const rawToken2 = localStorage.getItem('admin_token'); let token2 = '';
        if (rawToken2) try { token2 = JSON.parse(rawToken2).token || rawToken2 } catch (e) { token2 = rawToken2 }
        const headers2: Record<string,string> = { 'Content-Type': 'application/json' }; if (token2) headers2['Authorization'] = `Bearer ${token2}`;
        const items = newList.filter(v => v.id && !String(v.id).startsWith('new-')).map((v, i) => ({ id: v.id, display_order: i }));
        if (items.length) {
          const res = await fetch('/api/admin/resources/order', { method: 'POST', headers: headers2, body: JSON.stringify({ items, type: 'sermons' }) });
          if (!res.ok) throw new Error('Failed to persist display order for new item');
        }
      } catch (err) {
        console.error('Failed to persist order after saving new sermon (form):', err);
        toast.error('Saved sermon but failed to update order on server');
        await fetchSermons();
      }

      clearFieldErrors('new'); setAddingNew(false); setNewYoutubeUrl(''); setNewPublished(true); toast.success('Sermon saved');
    } catch (err) { console.error(err); toast.error('Failed to save sermon'); }
  };

  const handleUpdate = (id: string, updates: Partial<WorshipVideo>) => { setSermons(sermons.map(s => s.id === id ? { ...s, ...updates } : s)); const fields = Object.keys(updates || {}); if (fields.length) clearFieldErrors(id, fields as string[]); };

  const handleDelete = (id: string) => { setSermonToDelete(id); setDeleteDialogOpen(true); };

  const confirmDelete = async () => {
    if (sermonToDelete) {
      try {
        if (!sermonToDelete.startsWith('new-')) {
          const response = await fetch(`/api/admin/resources?type=sermons&id=${encodeURIComponent(sermonToDelete)}`, { method: 'DELETE' });
          if (!response.ok) throw new Error('Failed to delete sermon');
        }
        setSermons(sermons.filter(s => s.id !== sermonToDelete));
        toast.success('Sermon deleted successfully');
      } catch (error) { console.error('Error deleting sermon:', error); toast.error('Failed to delete sermon'); }
      setSermonToDelete(null);
    }
    setDeleteDialogOpen(false);
  };

  const handleSave = async (id: string) => {
    const sermon = sermons.find(s => s.id === id);
    if (!sermon) return;
    try {
      const fieldErrors: Record<string,string> = {};
      if (!sermon.youtubeUrl || sermon.youtubeUrl.trim().length === 0) fieldErrors.youtubeUrl = 'YouTube URL is required';
      if (Object.keys(fieldErrors).length > 0) { setFieldErrors(id, fieldErrors); return; }

      const isNew = id.startsWith('new-');
      const rawToken = localStorage.getItem('admin_token'); let token = '';
      if (rawToken) try { token = JSON.parse(rawToken).token || rawToken } catch (e) { token = rawToken }
      const headers: Record<string,string> = { 'Content-Type': 'application/json' }; if (token) headers['Authorization'] = `Bearer ${token}`;

      let metaTitle: string | null = null; let metaPublishedAt: string | null = null;
      try { const vid = extractYouTubeId(sermon.youtubeUrl || ''); if (vid) { const meta = await fetchYouTubeMeta(vid); if (meta) { metaTitle = meta.title || null; metaPublishedAt = meta.publishedAt || null; } } } catch (err) {}

      const body: any = { type: 'sermons', ...(isNew ? {} : { id }), youtube_url: sermon.youtubeUrl, title: metaTitle, date_posted: metaPublishedAt, published: sermon.published === true };
      const url = isNew ? `/api/admin/resources?type=sermons` : `/api/admin/resources?type=sermons&id=${id}`;
      const response = await fetch(url, { method: isNew ? 'POST' : 'PUT', headers, body: JSON.stringify(body) });
      if (!response.ok) throw new Error('Failed to save sermon');
      const result = await response.json(); if (result && result.data) {
        const d = result.data; const savedId = d.id ? d.id.toString() : null; const savedItem = { ...sermon, id: savedId || sermon.id, youtubeTitle: d.title || sermon.youtubeTitle, datePosted: d.date_posted || sermon.datePosted, published: d.published === true || d.published === 't' || sermon.published } as WorshipVideo;
        if (isNew) {
          const withoutNew = sermons.filter(v => v.id !== id); const reordered = [savedItem, ...withoutNew.map(v => ({ ...v }))].map((v, i) => ({ ...v, displayOrder: i })); setSermons(reordered);
          try {
            const rawToken2 = localStorage.getItem('admin_token'); let token2 = ''; if (rawToken2) try { token2 = JSON.parse(rawToken2).token || rawToken2 } catch (e) { token2 = rawToken2 }
            const headers2: Record<string,string> = { 'Content-Type': 'application/json' }; if (token2) headers2['Authorization'] = `Bearer ${token2}`;
            const items = reordered.filter(v => v.id && !String(v.id).startsWith('new-')).map((v, i) => ({ id: v.id, display_order: i }));
            if (items.length) {
              const res = await fetch('/api/admin/resources/order', { method: 'POST', headers: headers2, body: JSON.stringify({ items, type: 'sermons' }) });
              if (!res.ok) throw new Error('Failed to persist display order for new item');
            }
          } catch (err) { console.error('Failed to persist order after saving new sermon:', err); toast.error('Saved sermon but failed to update order on server'); await fetchSermons(); }
        } else {
          setSermons(sermons.map(v => v.id === id ? { ...savedItem, displayOrder: v.displayOrder ?? undefined } : v));
        }
      }
      clearFieldErrors(id); setEditingId(null); toast.success('Sermon saved successfully');
    } catch (error) { console.error('Error saving sermon:', error); toast.error('Failed to save sermon'); }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="text-white text-base font-medium">Total: <span className="text-[#FDB813] font-bold">{sermons.length}</span> sermon(s) {' | '} Published: <span className="text-[#FDB813] font-bold">{sermons.filter(s => s.published).length}</span></div>
        <div className="flex items-center gap-3">
          {!reorderMode ? (
            <Button onClick={() => { setOriginalSnapshot([...sermons]); setReorderMode(true); }} className="bg-[#2E2E2E] hover:bg-[#3E3E3E] text-white border border-[#FDB813]"><GripVertical size={16} className="mr-2" />Enable Reorder</Button>
          ) : (
            <div className="flex items-center gap-2">
              <Button onClick={() => { setSermons(originalSnapshot ?? sermons); setOriginalSnapshot(null); setReorderMode(false); }} className="h-9 px-4 bg-[#2E2E2E] hover:bg-[#3E3E3E] text-white border border-gray-600">Cancel</Button>
              <Button onClick={async () => {
                try {
                  const items = sermons.filter(v => v.id && !String(v.id).startsWith('new-')).map((v, i) => ({ id: v.id, display_order: i }));
                  const rawToken = localStorage.getItem('admin_token'); let token = ''; if (rawToken) try { token = JSON.parse(rawToken).token || rawToken } catch (e) { token = rawToken }
                  const headers: Record<string,string> = { 'Content-Type': 'application/json' }; if (token) headers['Authorization'] = `Bearer ${token}`;
                  const res = await fetch('/api/admin/resources/order', { method: 'POST', headers, body: JSON.stringify({ items, type: 'sermons' }) });
                  if (!res.ok) throw new Error('Failed to save order'); toast.success('Order saved'); setOriginalSnapshot(null); setReorderMode(false);
                } catch (err) { console.error('Failed to save order:', err); toast.error('Failed to save order'); }
              }} className="h-9 px-4 bg-[#FDB813] hover:bg-[#e5a711]  text-black">Save Order</Button>
            </div>
          )}
          <Button onClick={handleAdd} className="bg-[#2E2E2E] hover:bg-[#3E3E3E] text-white border border-[#FDB813]"><Plus size={16} className="mr-2" />Add Sermon</Button>
        </div>
      </div>

      {addingNew && (
        <div className="bg-black rounded-lg border border-gray-700 p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
            <div className="md:col-span-2">
              <label className="text-sm text-white mb-1 block">YouTube URL <span className="text-[#FDB813]">*</span></label>
              <Input value={newYoutubeUrl} onChange={(e) => setNewYoutubeUrl(e.target.value)} placeholder="https://youtu.be/..." className="bg-[#2e2e2e] border-gray-600 text-white" style={{ backgroundColor: '#2e2e2e' }} />
              {formErrors['new']?.youtubeUrl && (<div className="text-sm text-red-400 mt-1">{formErrors['new'].youtubeUrl}</div>)}
            </div>
            <div className="flex items-center justify-end gap-3">
              <div className="flex items-center mr-4"><input type="checkbox" checked={newPublished} onChange={(e) => setNewPublished(e.target.checked)} className="form-checkbox h-4 w-4 text-[#FDB813] border-gray-600 rounded mr-2" /><span className="text-sm text-white">Publish</span></div>
              <div className="flex items-center gap-3"><Button onClick={cancelAddNew} className="h-9 px-4 bg-[#2E2E2E] hover:bg-[#3E3E3E] text-white border border-gray-600 flex items-center gap-2"><X size={14} />Cancel</Button><Button onClick={saveNewFromForm} className="h-9 px-4 bg-[#FDB813] hover:bg-[#e5a711] text-black flex items-center gap-2"><Save size={14} />Save</Button></div>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-center py-12 bg-black rounded-lg border border-gray-700"><Video size={48} className="mx-auto mb-4 text-gray-600 animate-pulse" /><p className="text-gray-400">Loading sermons...</p></div>
      ) : sermons.length === 0 ? (
        <div className="text-center py-12 bg-black rounded-lg border border-gray-700"><Video size={48} className="mx-auto mb-4 text-gray-600" /><p className="text-gray-400">No sermons yet. Click "Add Sermon" to create one.</p></div>
      ) : (
        <div className="space-y-3">
          {reorderMode ? (
            <>
              <div className="flex items-center justify-between"><p className="text-sm text-gray-400">🔧 Reorder mode enabled — drag cards into the desired order, then click <strong>Save Order</strong>.</p><div className="text-sm text-gray-400">Drag handle on left of each card</div></div>
              <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={(event) => {
                const { active, over } = event; if (!over || active.id === over.id) return; const oldIndex = sermons.findIndex(v => v.id === active.id); const newIndex = sermons.findIndex(v => v.id === over.id); if (oldIndex === -1 || newIndex === -1) return; const newOrder = arrayMove(sermons, oldIndex, newIndex).map((v, i) => ({ ...v, displayOrder: i })); setSermons(newOrder);
              }}>
                <SortableContext items={sermons.map(v => v.id)} strategy={verticalListSortingStrategy}><div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">{sermons.map((s) => (<SortableSermonCard key={s.id} sermon={s} sortable={true} />))}</div></SortableContext>
              </DndContext>
            </>
          ) : (
            <>
              <p className="text-sm text-gray-400">Click "Enable Reorder" to reorder multiple cards and save in one request.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">{sermons.map(s => (<SortableSermonCard key={s.id} sermon={s} sortable={false} />))}</div>
            </>
          )}
        </div>
      )}

      <DeleteConfirmDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen} onConfirm={confirmDelete} title="Delete Sermon" description="Are you sure you want to delete this sermon? This action cannot be undone." />
    </div>
  );
}

// Bible Studies Manager Sub-Component
function BibleStudiesManager({ formErrors, setFieldErrors, clearFieldErrors }: { formErrors: Record<string, Record<string, string>>; setFieldErrors: (id: string, errors: Record<string,string>) => void; clearFieldErrors: (id: string, fields?: string[]) => void }) {
  const [studies, setStudies] = useState<BibleStudy[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [studyToDelete, setStudyToDelete] = useState<string | null>(null);
  // File upload mode removed: always show file upload component
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudies();
  }, []);

  const fetchStudies = async () => {
    try {
      setLoading(true);
      const rawToken = localStorage.getItem('admin_token');
      let token = '';
      if (rawToken) try { token = JSON.parse(rawToken).token || rawToken } catch (e) { token = rawToken }
      const headers = token ? { 'Authorization': `Bearer ${token}` } : undefined;
      const response = await fetch('/api/admin/resources?type=bibleStudies', { headers });
      if (!response.ok) throw new Error('Failed to fetch Bible studies');
      const data = await response.json();
      
      // Transform API response to match component interface
      const transformedStudies = (data.data || []).map((study: any) => ({
        id: study.id.toString(),
        title: study.title || '',
        author: study.author || '',
        pages: study.pages || 0,
        date: toDateInputValue(pickFirst(study.study_date, study.publish_date, study.published_at, study.created_at, study.date)),
        fileType: study.file_type || 'PDF',
        fileUrl: study.file_url || '',
        thumbnailUrl: study.thumbnail_url || '',
        description: study.description || '',
        published: study.published === true || study.published === 't' || false
      }));
      
      setStudies(transformedStudies);
    } catch (error) {
      console.error('Error fetching Bible studies:', error);
      toast.error('Failed to load Bible studies');
    } finally {
      setLoading(false);
    }
  };

  const togglePublishedStudy = async (id: string) => {
    const study = studies.find(s => s.id === id);
    if (!study) return;
    const newPublished = !study.published;
    handleUpdate(id, { published: newPublished });
    if (id.startsWith('new-')) {
      toast.success(newPublished ? 'Marked as published' : 'Marked as draft');
      return;
    }
    try {
      const rawToken = localStorage.getItem('admin_token');
      let token = '';
      if (rawToken) try { token = JSON.parse(rawToken).token || rawToken } catch (e) { token = rawToken }
      const headers: Record<string,string> = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const body = {
        type: 'bibleStudies',
        id,
        title: study.title,
        author: study.author,
        pages: study.pages,
        study_date: study.date,
        file_type: study.fileType,
        file_url: study.fileUrl,
        thumbnail_url: study.thumbnailUrl,
        description: study.description,
        published: newPublished
      };

      const res = await fetch(`/api/admin/resources?type=bibleStudies&id=${id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(body)
      });
      if (!res.ok) throw new Error('Failed to update');
      const json = await res.json();
      handleUpdate(id, { published: json.data.published === true || json.data.published === 't' || false });
      toast.success(newPublished ? 'Study published' : 'Study unpublished');
    } catch (err) {
      console.error(err);
      handleUpdate(id, { published: !newPublished });
      toast.error('Failed to update published state');
    }
  };

  const handleAdd = () => {
    const newStudy: BibleStudy = {
      id: 'new-' + Date.now().toString(),
      title: '',
      author: '',
      pages: 0,
      date: new Date().toISOString().split('T')[0],
      fileType: 'PDF',
      fileUrl: '',
      thumbnailUrl: '',
      description: ''
    };
    setStudies([newStudy, ...studies]);
    setEditingId(newStudy.id);
  };

  const handleUpdate = (id: string, updates: Partial<BibleStudy>) => {
    setStudies(studies.map(s => s.id === id ? { ...s, ...updates } : s));
    const fields = Object.keys(updates || {});
    if (fields.length) clearFieldErrors(id, fields as string[]);
  };

  const handleDelete = (id: string) => {
    setStudyToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (studyToDelete) {
      try {
        if (!studyToDelete.startsWith('new-')) {
          const response = await fetch(`/api/admin/resources?type=bibleStudies&id=${encodeURIComponent(studyToDelete)}`, {
            method: 'DELETE'
          });
          if (!response.ok) throw new Error('Failed to delete Bible study');
        }
        setStudies(studies.filter(s => s.id !== studyToDelete));
        toast.success('Bible study deleted successfully');
      } catch (error) {
        console.error('Error deleting Bible study:', error);
        toast.error('Failed to delete Bible study');
      }
      setStudyToDelete(null);
    }
    setDeleteDialogOpen(false);
  };

  const handleSave = async (id: string) => {
    const study = studies.find(s => s.id === id);
    if (!study) return;

    try {
      // Validate study fields
      const fieldErrors: Record<string, string> = {};
      if (!study.title || study.title.trim().length === 0) fieldErrors.title = 'Title is required';
      else if (study.title.length > TITLE_MAX) fieldErrors.title = `Title must be at most ${TITLE_MAX} characters`;

      if (!study.author || study.author.trim().length === 0) fieldErrors.author = 'Author is required';
      else if (study.author.length > AUTHOR_MAX) fieldErrors.author = `Author must be at most ${AUTHOR_MAX} characters`;

      const pagesNum = Number(study.pages);
      if (isNaN(pagesNum)) fieldErrors.pages = 'Pages is required';
      else if (pagesNum < PAGES_MIN || pagesNum > PAGES_MAX) fieldErrors.pages = `Pages must be between ${PAGES_MIN} and ${PAGES_MAX}`;

      if (!study.fileUrl || study.fileUrl.trim().length === 0) fieldErrors.fileUrl = 'File URL is required';

      if (Object.keys(fieldErrors).length > 0) {
        setFieldErrors(id, fieldErrors);
        return;
      }

      const isNew = id.startsWith('new-');
      const method = isNew ? 'POST' : 'PUT';
      const rawToken = localStorage.getItem('admin_token');
      let token = '';
      if (rawToken) try { token = JSON.parse(rawToken).token || rawToken } catch (e) { token = rawToken }
      const headers: Record<string,string> = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const body = {
        type: 'bibleStudies',
        ...(isNew ? {} : { id }),
        title: study.title,
        author: study.author,
        pages: study.pages,
        study_date: study.date,
        file_type: study.fileType,
        file_url: study.fileUrl,
        thumbnail_url: study.thumbnailUrl,
        description: study.description,
        published: true
      };

      const url = isNew ? `/api/admin/resources?type=bibleStudies` : `/api/admin/resources?type=bibleStudies&id=${id}`;
      const response = await fetch(url, {
        method,
        headers,
        body: JSON.stringify(body)
      });

      if (!response.ok) throw new Error('Failed to save Bible study');
      
      const result = await response.json();
      
      if (isNew) {
        const d = result.data;
        const saved: BibleStudy = {
          id: d.id.toString(),
          title: d.title || '',
          author: d.author || '',
          pages: d.pages || 0,
          date: toDateInputValue(pickFirst(d.study_date, d.publish_date, d.published_at, d.created_at, d.date)),
          fileType: d.file_type || 'PDF',
          fileUrl: d.file_url || '',
          thumbnailUrl: d.thumbnail_url || '',
          description: d.description || '',
          published: d.published === true || d.published === 't' || false
        };
        setStudies(studies.map(s => s.id === id ? saved : s));
      }
      clearFieldErrors(id);
      setEditingId(null);
      toast.success('Bible study saved successfully');
    } catch (error) {
      console.error('Error saving Bible study:', error);
      toast.error('Failed to save Bible study');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="text-white text-base font-medium">
          Total: <span className="text-[#FDB813] font-bold">{studies.length}</span> study(ies)
          {' | '}
          Published: <span className="text-[#FDB813] font-bold">{studies.filter(s => s.published).length}</span>
        </div>
        <Button
          onClick={handleAdd}
          className="bg-[#2E2E2E] hover:bg-[#3E3E3E] text-white border border-[#FDB813]"
        >
          <Plus size={16} className="mr-2" />
          Add Bible Study
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-12 bg-black rounded-lg border border-gray-700">
          <FileText size={48} className="mx-auto mb-4 text-gray-600 animate-pulse" />
          <p className="text-gray-400">Loading Bible studies...</p>
        </div>
      ) : studies.length === 0 ? (
        <div className="text-center py-12 bg-black rounded-lg border border-gray-700">
          <FileText size={48} className="mx-auto mb-4 text-gray-600" />
          <p className="text-gray-400">No Bible studies yet. Click "Add Bible Study" to create one.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {studies.map((study) => {
            const isEditing = editingId === study.id;

            return (
              <div key={study.id} className="bg-black p-4 rounded-lg border border-gray-700">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    {study.thumbnailUrl ? (
                      <img
                        src={study.thumbnailUrl}
                        alt={study.title}
                        className="w-32 h-20 object-cover rounded border border-gray-600"
                      />
                    ) : (
                      <div className="w-32 h-20 bg-black rounded flex items-center justify-center border border-gray-600">
                        <FileText size={32} className="text-gray-600" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 space-y-3">
                    {isEditing ? (
                      <>
                        <div>
                          <label className="text-sm text-white mb-1.5 block">Study Title</label>
                          <Input
                            id={`field-${study.id}-title`}
                            value={study.title}
                            onChange={(e) => handleUpdate(study.id, { title: e.target.value })}
                            placeholder="Enter study title"
                            className="bg-black border-gray-600 text-white"
                            maxLength={TITLE_MAX}
                            aria-invalid={!!formErrors[study.id]?.title}
                            aria-describedby={formErrors[study.id]?.title ? `error-${study.id}-title` : undefined}
                          />
                          {isEditing && <div className="text-xs text-gray-400">{study.title?.length || 0}/{TITLE_MAX} characters</div>}
                          {isEditing && formErrors[study.id]?.title && (
                            <div id={`error-${study.id}-title`} role="alert" className="text-sm text-red-400 mt-1">{formErrors[study.id].title}</div>
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-sm text-white mb-1.5 block">Author</label>
                            <Input
                              id={`field-${study.id}-author`}
                              value={study.author}
                              onChange={(e) => handleUpdate(study.id, { author: e.target.value })}
                              placeholder="Author name"
                              className="bg-black border-gray-600 text-white"
                              maxLength={AUTHOR_MAX}
                              aria-invalid={!!formErrors[study.id]?.author}
                              aria-describedby={formErrors[study.id]?.author ? `error-${study.id}-author` : undefined}
                            />
                              {isEditing && formErrors[study.id]?.author && (
                                <div id={`error-${study.id}-author`} role="alert" className="text-sm text-red-400 mt-1">{formErrors[study.id].author}</div>
                              )}
                          </div>
                          <div>
                            <label className="text-sm text-white mb-1.5 block">Pages</label>
                            <Input
                              id={`field-${study.id}-pages`}
                              type="number"
                              value={study.pages}
                              onChange={(e) => handleUpdate(study.id, { pages: parseInt(e.target.value) })}
                              placeholder="Number of pages"
                              className="bg-black border-gray-600 text-white"
                              min={PAGES_MIN}
                              max={PAGES_MAX}
                              aria-invalid={!!formErrors[study.id]?.pages}
                              aria-describedby={formErrors[study.id]?.pages ? `error-${study.id}-pages` : undefined}
                            />
                              {isEditing && formErrors[study.id]?.pages && (
                                <div id={`error-${study.id}-pages`} role="alert" className="text-sm text-red-400 mt-1">{formErrors[study.id].pages}</div>
                              )}
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-sm text-white mb-1.5 block">Date</label>
                            <Input
                              type="date"
                              value={study.date}
                              onChange={(e) => handleUpdate(study.id, { date: e.target.value })}
                              className="bg-black border-gray-600 text-white"
                            />
                          </div>
                          <div>
                            <label className="text-sm text-white mb-1.5 block">File Type</label>
                            <Input
                              value={study.fileType}
                              onChange={(e) => handleUpdate(study.id, { fileType: e.target.value })}
                              placeholder="e.g., PDF"
                              className="bg-black border-gray-600 text-white"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-sm text-white mb-1.5 block">File URL or Upload</label>
                            <FileUpload
                              onUploadComplete={(url) => handleUpdate(study.id, { fileUrl: url })}
                              currentFile={study.fileUrl?.startsWith('data:') ? study.fileUrl : ''}
                              maxSizeMB={10}
                              acceptedFormats={['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']}
                              acceptedExtensions={['.pdf', '.doc', '.docx']}
                              uploadPath="resources/biblestudies"
                            />
                          {formErrors[study.id]?.fileUrl && (
                            <div id={`error-${study.id}-fileUrl`} role="alert" className="text-sm text-red-400 mt-1">{formErrors[study.id].fileUrl}</div>
                          )}
                        </div>
                        <div>
                          <label className="text-sm text-white mb-1.5 block">Description</label>
                          <Textarea
                            value={study.description}
                            onChange={(e) => handleUpdate(study.id, { description: e.target.value })}
                            placeholder="Enter study description"
                            className="bg-black border-gray-600 text-white"
                            rows={2}
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <div className="flex items-center gap-3">
                            <h3 className="text-white text-lg mb-1">{study.title || 'Untitled Study'}</h3>
                            <span className="inline-flex items-center justify-center px-2 py-0.5 rounded text-xs font-medium bg-green-900 text-green-300">{study.published ? 'Published' : 'Draft'}</span>
                          </div>
                          <div className="flex flex-wrap gap-3 text-sm text-gray-400">
                            <span>by {study.author}</span>
                            <span>{study.pages} pages</span>
                            <span className="flex items-center gap-1">
                              <Calendar size={12} />
                              {formatAdminDate(study.date)}
                            </span>
                            <span className="inline-flex items-center justify-center px-2 py-0.5 bg-[#FDB813] bg-opacity-20 text-black rounded">
                              {study.fileType}
                            </span>
                          </div>
                          {study.description && (
                            <p className="text-gray-400 text-sm mt-2">{study.description}</p>
                          )}
                        </div>
                      </>
                    )}
                  </div>

                    <div className="flex gap-2">
                    {isEditing ? (
                      <>
                        <Button
                          title="Save"
                          onClick={() => handleSave(study.id)}
                          size="sm"
                          className="h-9 w-9 p-2 flex items-center justify-center rounded-md bg-[#FDB813] hover:bg-[#e5a610] text-black border border-[#FDB813]"
                        >
                          <Save size={16} />
                        </Button>
                        <Button
                          title="Cancel"
                          onClick={async () => {
                            setEditingId(null);
                            // If this is a newly added unsaved study, clean up uploaded blobs (file + thumbnail)
                            if (study.id && typeof study.id === 'string' && study.id.startsWith('new-')) {
                              const urls: string[] = [];
                              if (study.fileUrl) urls.push(study.fileUrl);
                              if (study.thumbnailUrl) urls.push(study.thumbnailUrl);

                              if (urls.length) {
                                try {
                                  await fetch('/api/admin/blob', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ urls })
                                  });
                                } catch (err) {
                                  console.error('Failed to clean up uploaded blobs for cancelled study:', err);
                                }
                              }

                              // Remove the unsaved study from UI
                              setStudies(studies.filter(s => s.id !== study.id));
                            } else {
                              // Existing behavior: remove if completely empty
                              if (!study.title && !study.fileUrl) {
                                setStudies(studies.filter(s => s.id !== study.id));
                              }
                            }
                          }}
                          size="sm"
                          className="h-9 w-9 p-2 flex items-center justify-center rounded-md border border-gray-600 bg-[#2E2E2E] hover:bg-[#3E3E3E] text-white"
                        >
                          <X size={14} />
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          title={study.published ? 'Unpublish' : 'Publish'}
                          onClick={() => togglePublishedStudy(study.id)}
                          size="sm"
                          className="h-9 w-9 p-2 flex items-center justify-center rounded-md border border-[#FDB813] bg-[#2E2E2E] hover:bg-[#1a1a1a] text-white"
                        >
                          {study.published ? <EyeOff size={14} /> : <Eye size={14} />}
                        </Button>
                        <Button
                          title="Edit"
                          aria-label="Edit"
                          onClick={() => setEditingId(study.id)}
                          size="sm"
                          className="h-9 w-9 p-2 flex items-center justify-center rounded-md border border-[#FDB813] bg-[#2E2E2E] hover:bg-[#1a1a1a] text-white"
                        >
                          <Edit2 size={14} />
                        </Button>
                        <Button
                          title="Delete"
                          onClick={() => handleDelete(study.id)}
                          size="sm"
                          className="h-9 w-9 p-2 flex items-center justify-center rounded-md border border-[#FDB813] bg-[#2E2E2E] hover:bg-[#1a1a1a] text-white"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={confirmDelete}
        title="Delete Bible Study"
        description="Are you sure you want to delete this Bible study? This action cannot be undone."
      />
    </div>
  );
}
