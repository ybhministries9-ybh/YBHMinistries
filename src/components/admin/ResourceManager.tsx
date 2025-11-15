import { useState, useEffect } from 'react';
import { Save, Plus, Trash2, Edit, Book, Video, Music, FileText, ShoppingCart, Youtube, Calendar, Clock, Image as ImageIcon, Upload, X, ChevronDown, ChevronUp, Eye, EyeOff } from 'lucide-react';
import { fetchYouTubeTitle } from '../../lib/youtube';
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

type ResourceType = 'books' | 'worship' | 'sermons' | 'bible-studies';

export function ResourceManager() {
  const [activeTab, setActiveTab] = useState<ResourceType>('books');

  // Validation limits
  // Validation limits (moved to module scope)

  // Form errors: map resourceId -> { fieldName: message }
  const [formErrors, setFormErrors] = useState<Record<string, Record<string, string>>>({});

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
            { key: 'sermons', label: 'Sermons', icon: Video, count: 0 },
            { key: 'bible-studies', label: 'Bible Studies', icon: FileText, count: 0 }
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
        {activeTab === 'bible-studies' && <BibleStudiesManager formErrors={formErrors} setFieldErrors={setFieldErrors} clearFieldErrors={clearFieldErrors} />}
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

  // Fetch books from database
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/resources?type=books');
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
      const currentUser = 'admin';
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
        published: newPublished,
        updated_by: currentUser
      };

      const response = await fetch(`/api/admin/resources?type=books&id=${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
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
          const response = await fetch(`/api/admin/resources?type=books&id=${bookToDelete}`, {
            method: 'DELETE'
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

    if (!book.coverImage) fieldErrors.coverImage = 'Cover image is required';

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
      const isNew = id.startsWith('new-');
      const method = isNew ? 'POST' : 'PUT';
      const currentUser = 'admin'; // TODO: Replace with actual user from auth context
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
      if (isNew) {
        body.created_by = currentUser;
      } else {
        body.id = id;
        body.updated_by = currentUser;
      }

      const url = isNew ? `/api/admin/resources?type=books` : `/api/admin/resources?type=books&id=${id}`;
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to save book');
      }

      const result = await response.json();

      // Update local state with the saved book (includes DB id)
      if (isNew) {
        setBooks(books.map(b => b.id === id ? { ...b, id: result.data.id.toString() } : b));
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
        <div className="text-gray-400">
          Total: <span className="text-[#FDB813] font-bold">{books.length}</span> book(s)
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
              <div key={book.id} className="bg-black rounded-lg border border-gray-700">
                {/* Header */}
                <div className="p-4 flex items-start justify-between">
                  <div className="flex-1">
                    {isEditing ? (
                      <div>
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
                      <span className="px-2 py-0.5 bg-[#FDB813] bg-opacity-20 text-black rounded">
                        {book.language}
                      </span>
                      {/* Published / Draft status badge (header only) */}
                      {book.published ? (
                        <span className="px-2 py-0.5 rounded text-xs font-medium bg-green-900 text-green-300">Published</span>
                      ) : (
                        <span className="ml-2 inline-block text-xs font-semibold px-3 py-1 rounded bg-[#FDB813] text-black">Draft</span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => setExpandedBook(isExpanded ? null : book.id)}
                      size="sm"
                      className="bg-[#2E2E2E] hover:bg-[#1a1a1a] text-white border border-gray-600"
                    >
                      {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </Button>
                    {isEditing ? (
                      <>
                        <Button
                          onClick={() => handleSave(book.id)}
                          size="sm"
                          className="bg-[#FDB813] hover:bg-[#e5a610] text-black"
                        >
                          Save
                        </Button>
                        <Button
                          onClick={() => {
                            setEditingId(null);
                            // Remove the book if it's empty (newly added)
                            if (!book.title && !book.coverImage) {
                              setBooks(books.filter(b => b.id !== book.id));
                            }
                          }}
                          size="sm"
                          className="bg-[#2E2E2E] hover:bg-[#3E3E3E] text-white border border-gray-600"
                        >
                          <X size={14} className="mr-1" />
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          onClick={() => togglePublished(book.id)}
                          size="sm"
                          className="bg-[#2E2E2E] hover:bg-[#1a1a1a] text-white border border-gray-600"
                          title={book.published ? 'Unpublish' : 'Publish'}
                        >
                          {book.published ? <Eye size={14} /> : <EyeOff size={14} />}
                        </Button>
                        <Button
                          onClick={() => setEditingId(book.id)}
                          size="sm"
                          className="bg-[#FDB813] hover:bg-[#e5a610] text-black border border-[#FDB813] rounded-md px-3 flex items-center gap-2"
                        >
                          <Edit size={14} />
                          <span>Edit</span>
                        </Button>
                        <Button
                          onClick={() => handleDelete(book.id)}
                          size="sm"
                          className="bg-[#2E2E2E] hover:bg-red-900 text-white border border-red-500 rounded-md p-2"
                        >
                          <Trash2 size={14} />
                        </Button>
                      </>
                    )}
                  </div>
                </div>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="px-4 pb-4 space-y-4 border-t border-gray-700 pt-4">
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
                            <div key={index} className="relative group">
                              {url ? (
                                <img
                                  src={url || undefined}
                                  alt={`Additional ${index + 1}`}
                                  className="w-full h-20 object-cover rounded border border-gray-600"
                                  onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                  }}
                                />
                              ) : null}
                              {isEditing && (
                                <button
                                  onClick={() => {
                                    const newImages = book.additionalImages.filter((_, i) => i !== index);
                                    handleUpdate(book.id, { additionalImages: newImages });
                                  }}
                                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  <X size={12} />
                                </button>
                              )}
                            </div>
                          ))}
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

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/resources?type=worship');
      if (!response.ok) throw new Error('Failed to fetch worship videos');
      const data = await response.json();
      
      // Transform API response to match component interface
      const transformedVideos = (data.data || []).map((video: any) => ({
        id: video.id.toString(),
        // artist removed from DB; will use YouTube metadata when available
        youtubeUrl: video.youtube_url || '',
        published: video.published === true || video.published === 't' || false,
        youtubeTitle: ''
      }));

      // Fetch YouTube titles for each video (concurrent)
      const withTitles = await Promise.all(transformedVideos.map(async (v) => {
        try {
          const title = await fetchYouTubeTitle(v.youtubeUrl);
          return { ...v, youtubeTitle: title || '' };
        } catch (e) {
          return v;
        }
      }));

      setVideos(withTitles);
    } catch (error) {
      console.error('Error fetching worship videos:', error);
      toast.error('Failed to load worship videos');
    } finally {
      setLoading(false);
    }
  };

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
      const currentUser = 'admin';
      const body = {
        type: 'worship',
        id,
        youtube_url: video.youtubeUrl,
        published: newPublished,
        updated_by: currentUser
      };

      const res = await fetch(`/api/admin/resources?type=worship&id=${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
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
      const newVideo: WorshipVideo = {
        id: 'new-' + Date.now().toString(),
        youtubeUrl: '',
        youtubeTitle: ''
      };
    setVideos([newVideo, ...videos]);
    setEditingId(newVideo.id);
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
              const response = await fetch(`/api/admin/resources?type=worship&id=${videoToDelete}`, {
                method: 'DELETE'
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
      const currentUser = 'admin'; // TODO: Replace with actual user from auth context
      const body = {
        type: 'worship',
        ...(isNew ? {} : { id }),
        youtube_url: video.youtubeUrl,
        published: video.published === true,
        ...(isNew ? { created_by: currentUser } : { updated_by: currentUser })
      };

      const url = isNew ? `/api/admin/resources?type=worship` : `/api/admin/resources?type=worship&id=${id}`;
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (!response.ok) throw new Error('Failed to save video');
      
      const result = await response.json();
      
      if (isNew) {
        setVideos(videos.map(v => v.id === id ? { ...v, id: result.data.id.toString() } : v));
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
        <div className="text-gray-400">
          Total: <span className="text-[#FDB813] font-bold">{videos.length}</span> video(s)
        </div>
        <Button
          onClick={handleAdd}
          className="bg-[#2E2E2E] hover:bg-[#3E3E3E] text-white border border-[#FDB813]"
        >
          <Plus size={16} className="mr-2" />
          Add Worship Video
        </Button>
      </div>

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
          {videos.map((video) => {
            const isEditing = editingId === video.id;

            return (
              <div key={video.id} className="bg-black p-4 rounded-lg border border-gray-700">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-32 h-20 bg-black rounded flex items-center justify-center border border-gray-600">
                      <Youtube size={32} className="text-red-500" />
                    </div>
                  </div>

                  <div className="flex-1 space-y-3">
                    {isEditing ? (
                      <>
                        {/* Title is sourced from YouTube metadata; no artist input in admin */}
                        <div>
                          <label className="text-sm text-white mb-1.5 block">YouTube URL</label>
                          <Input
                            id={`field-${video.id}-youtubeUrl`}
                            value={video.youtubeUrl}
                            onChange={(e) => handleUpdate(video.id, { youtubeUrl: e.target.value })}
                            placeholder="https://youtu.be/..."
                            className="bg-black border-gray-600 text-white"
                            aria-invalid={!!formErrors[video.id]?.youtubeUrl}
                            aria-describedby={formErrors[video.id]?.youtubeUrl ? `error-${video.id}-youtubeUrl` : undefined}
                          />
                          {isEditing && formErrors[video.id]?.youtubeUrl && (
                            <div id={`error-${video.id}-youtubeUrl`} role="alert" className="text-sm text-red-400 mt-1">{formErrors[video.id].youtubeUrl}</div>
                          )}
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <h3 className="text-white text-lg mb-1">{video.youtubeTitle || 'Untitled Video'}</h3>
                            <div className="flex flex-wrap gap-3 text-sm text-gray-400">
                              {/* artist removed — title is from YouTube metadata */}
                            </div>
                        </div>
                      </>
                    )}
                  </div>

                    <div className="flex gap-2">
                    {isEditing ? (
                      <>
                        <Button
                          onClick={() => handleSave(video.id)}
                          size="sm"
                          className="bg-[#FDB813] hover:bg-[#e5a610] text-black"
                        >
                          Save
                        </Button>
                        <Button
                          onClick={() => {
                            setEditingId(null);
                            // Remove the video if it's empty (newly added)
                            if (!video.youtubeUrl) {
                              setVideos(videos.filter(v => v.id !== video.id));
                            }
                          }}
                          size="sm"
                          className="bg-[#2E2E2E] hover:bg-[#3E3E3E] text-white border border-gray-600"
                        >
                          <X size={14} className="mr-1" />
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          onClick={() => togglePublishedVideo(video.id)}
                          size="sm"
                          className="bg-[#2E2E2E] hover:bg-[#1a1a1a] text-white border border-gray-600 rounded-md"
                          title={video.published ? 'Unpublish' : 'Publish'}
                        >
                          {video.published ? <Eye size={14} /> : <EyeOff size={14} />}
                        </Button>
                        <Button
                          onClick={() => setEditingId(video.id)}
                          size="sm"
                          className="bg-[#FDB813] hover:bg-[#e5a610] text-black border border-[#FDB813] rounded-md px-3 flex items-center gap-2"
                        >
                          <Edit size={14} />
                          <span>Edit</span>
                        </Button>
                        <Button
                          onClick={() => handleDelete(video.id)}
                          size="sm"
                          className="bg-[#2E2E2E] hover:bg-red-900 text-white border border-red-500 rounded-md p-2"
                        >
                          <Trash2 size={14} />
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
        title="Delete Worship Video"
        description="Are you sure you want to delete this worship video? This action cannot be undone."
      />
    </div>
  );
}

// Sermons Manager Sub-Component
function SermonsManager({ formErrors, setFieldErrors, clearFieldErrors }: { formErrors: Record<string, Record<string, string>>; setFieldErrors: (id: string, errors: Record<string,string>) => void; clearFieldErrors: (id: string, fields?: string[]) => void }) {
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [sermonToDelete, setSermonToDelete] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSermons();
  }, []);

  const fetchSermons = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/resources?type=sermons');
      if (!response.ok) throw new Error('Failed to fetch sermons');
      const data = await response.json();
      
      // Transform API response to match component interface
      const transformedSermons = (data.data || []).map((sermon: any) => ({
        id: sermon.id.toString(),
        // speaker removed from DB; will use YouTube metadata when available
        youtubeUrl: sermon.youtube_url || '',
        published: sermon.published === true || sermon.published === 't' || false,
        youtubeTitle: ''
      }));

      const withTitles = await Promise.all(transformedSermons.map(async (s) => {
        try {
          const title = await fetchYouTubeTitle(s.youtubeUrl);
          return { ...s, youtubeTitle: title || '' };
        } catch (e) {
          return s;
        }
      }));

      setSermons(withTitles);
    } catch (error) {
      console.error('Error fetching sermons:', error);
      toast.error('Failed to load sermons');
    } finally {
      setLoading(false);
    }
  };

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
      const currentUser = 'admin';
      const body = {
        type: 'sermons',
        id,
        youtube_url: sermon.youtubeUrl,
        published: newPublished,
        updated_by: currentUser
      };

      const res = await fetch(`/api/admin/resources?type=sermons&id=${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
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

  const handleAdd = () => {
    const newSermon: Sermon = {
      id: 'new-' + Date.now().toString(),
      youtubeUrl: ''
    };
    setSermons([newSermon, ...sermons]);
    setEditingId(newSermon.id);
  };

  const handleUpdate = (id: string, updates: Partial<Sermon>) => {
    setSermons(sermons.map(s => s.id === id ? { ...s, ...updates } : s));
    const fields = Object.keys(updates || {});
    if (fields.length) clearFieldErrors(id, fields as string[]);
  };

  const handleDelete = (id: string) => {
    setSermonToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (sermonToDelete) {
      try {
        if (!sermonToDelete.startsWith('new-')) {
          const response = await fetch(`/api/admin/resources?type=sermons&id=${encodeURIComponent(sermonToDelete)}`, {
            method: 'DELETE'
          });
          if (!response.ok) throw new Error('Failed to delete sermon');
        }
        setSermons(sermons.filter(s => s.id !== sermonToDelete));
        toast.success('Sermon deleted successfully');
      } catch (error) {
        console.error('Error deleting sermon:', error);
        toast.error('Failed to delete sermon');
      }
      setSermonToDelete(null);
    }
    setDeleteDialogOpen(false);
  };

  const handleSave = async (id: string) => {
    const sermon = sermons.find(s => s.id === id);
    if (!sermon) return;

    try {
      // Validate sermon fields (title is sourced from YouTube)
      const fieldErrors: Record<string, string> = {};
      if (!sermon.youtubeUrl || sermon.youtubeUrl.trim().length === 0) fieldErrors.youtubeUrl = 'YouTube URL is required';

      if (Object.keys(fieldErrors).length > 0) {
        setFieldErrors(id, fieldErrors);
        return;
      }

      const isNew = id.startsWith('new-');
      const method = isNew ? 'POST' : 'PUT';
      const currentUser = 'admin'; // TODO: Replace with actual user from auth context
      const body = {
        type: 'sermons',
        ...(isNew ? {} : { id }),
        youtube_url: sermon.youtubeUrl,
        published: true,
        ...(isNew ? { created_by: currentUser } : { updated_by: currentUser })
      };

      const url = isNew ? `/api/admin/resources?type=sermons` : `/api/admin/resources?type=sermons&id=${id}`;
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (!response.ok) throw new Error('Failed to save sermon');
      
      const result = await response.json();
      
      if (isNew) {
        setSermons(sermons.map(s => s.id === id ? { ...s, id: result.data.id.toString() } : s));
      }
      clearFieldErrors(id);
      setEditingId(null);
      toast.success('Sermon saved successfully');
    } catch (error) {
      console.error('Error saving sermon:', error);
      toast.error('Failed to save sermon');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="text-gray-400">
          Total: <span className="text-[#FDB813] font-bold">{sermons.length}</span> sermon(s)
        </div>
        <Button
          onClick={handleAdd}
          className="bg-[#2E2E2E] hover:bg-[#3E3E3E] text-white border border-[#FDB813]"
        >
          <Plus size={16} className="mr-2" />
          Add Sermon
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-12 bg-black rounded-lg border border-gray-700">
          <Video size={48} className="mx-auto mb-4 text-gray-600 animate-pulse" />
          <p className="text-gray-400">Loading sermons...</p>
        </div>
      ) : sermons.length === 0 ? (
        <div className="text-center py-12 bg-black rounded-lg border border-gray-700">
          <Video size={48} className="mx-auto mb-4 text-gray-600" />
          <p className="text-gray-400">No sermons yet. Click "Add Sermon" to create one.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {sermons.map((sermon) => {
            const isEditing = editingId === sermon.id;

            return (
              <div key={sermon.id} className="bg-black p-4 rounded-lg border border-gray-700">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-32 h-20 bg-black rounded flex items-center justify-center border border-gray-600">
                      <Youtube size={32} className="text-red-500" />
                    </div>
                  </div>

                  <div className="flex-1 space-y-3">
                    {isEditing ? (
                      <>
                        {/* Title is sourced from YouTube metadata; no title input in admin */}
                        <div className="grid grid-cols-1 gap-3">
                          {/* Speaker removed from DB; title comes from YouTube metadata */}
                        </div>
                        <div>
                          <label className="text-sm text-white mb-1.5 block">YouTube URL</label>
                          <Input
                            id={`field-${sermon.id}-youtubeUrl`}
                            value={sermon.youtubeUrl}
                            onChange={(e) => handleUpdate(sermon.id, { youtubeUrl: e.target.value })}
                            placeholder="https://youtu.be/..."
                            className="bg-black border-gray-600 text-white"
                            aria-invalid={!!formErrors[sermon.id]?.youtubeUrl}
                            aria-describedby={formErrors[sermon.id]?.youtubeUrl ? `error-${sermon.id}-youtubeUrl` : undefined}
                          />
                          {isEditing && formErrors[sermon.id]?.youtubeUrl && (
                            <div id={`error-${sermon.id}-youtubeUrl`} role="alert" className="text-sm text-red-400 mt-1">{formErrors[sermon.id].youtubeUrl}</div>
                          )}
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          {(() => {
                            const hasTitle = !!sermon.youtubeTitle;
                            const isNew = typeof sermon.id === 'string' && sermon.id.startsWith('new-');
                            const placeholder = isNew ? 'Add YouTube URL' : 'Untitled Sermon';
                            return (
                              <h3 className={`text-lg mb-1 ${hasTitle ? 'text-white' : 'text-gray-400'}`}>
                                {hasTitle ? sermon.youtubeTitle : placeholder}
                              </h3>
                            );
                          })()}
                          {/* speaker removed from DB; no label shown */}
                        </div>
                      </>
                    )}
                  </div>

                  <div className="flex gap-2">
                    {isEditing ? (
                      <>
                        <Button
                          onClick={() => handleSave(sermon.id)}
                          size="sm"
                          className="bg-[#FDB813] hover:bg-[#e5a610] text-black"
                        >
                          Save
                        </Button>
                        <Button
                          onClick={() => {
                            setEditingId(null);
                            // Remove the sermon if it's empty (newly added)
                            if (!sermon.youtubeUrl) {
                              setSermons(sermons.filter(s => s.id !== sermon.id));
                            }
                          }}
                          size="sm"
                          className="bg-[#2E2E2E] hover:bg-[#3E3E3E] text-white border border-gray-600"
                        >
                          <X size={14} className="mr-1" />
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          onClick={() => togglePublishedSermon(sermon.id)}
                          size="sm"
                          className="bg-[#2E2E2E] hover:bg-[#1a1a1a] text-white border border-gray-600 rounded-md"
                          title={sermon.published ? 'Unpublish' : 'Publish'}
                        >
                          {sermon.published ? <Eye size={14} /> : <EyeOff size={14} />}
                        </Button>
                        <Button
                          onClick={() => setEditingId(sermon.id)}
                          size="sm"
                          className="bg-[#FDB813] hover:bg-[#e5a610] text-black border border-[#FDB813] rounded-md px-3 flex items-center gap-2"
                        >
                          <Edit size={14} />
                          <span>Edit</span>
                        </Button>
                        <Button
                          onClick={() => handleDelete(sermon.id)}
                          size="sm"
                          className="bg-[#2E2E2E] hover:bg-red-900 text-white border border-red-500 rounded-md p-2"
                        >
                          <Trash2 size={14} />
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
        title="Delete Sermon"
        description="Are you sure you want to delete this sermon? This action cannot be undone."
      />
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
      const response = await fetch('/api/admin/resources?type=bibleStudies');
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
      const currentUser = 'admin';
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
        published: newPublished,
        updated_by: currentUser
      };

      const res = await fetch(`/api/admin/resources?type=bibleStudies&id=${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
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
      const currentUser = 'admin'; // TODO: Replace with actual user from auth context
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
        published: true,
        ...(isNew ? { created_by: currentUser } : { updated_by: currentUser })
      };

      const url = isNew ? `/api/admin/resources?type=bibleStudies` : `/api/admin/resources?type=bibleStudies&id=${id}`;
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (!response.ok) throw new Error('Failed to save Bible study');
      
      const result = await response.json();
      
      if (isNew) {
        setStudies(studies.map(s => s.id === id ? { ...s, id: result.data.id.toString() } : s));
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
        <div className="text-gray-400">
          Total: <span className="text-[#FDB813] font-bold">{studies.length}</span> study(ies)
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
                          <h3 className="text-white text-lg mb-1">{study.title || 'Untitled Study'}</h3>
                          <div className="flex flex-wrap gap-3 text-sm text-gray-400">
                            <span>by {study.author}</span>
                            <span>{study.pages} pages</span>
                            <span className="flex items-center gap-1">
                              <Calendar size={12} />
                              {formatAdminDate(study.date)}
                            </span>
                            <span className="px-2 py-0.5 bg-[#FDB813] bg-opacity-20 text-black rounded">
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
                          onClick={() => handleSave(study.id)}
                          size="sm"
                          className="bg-[#FDB813] hover:bg-[#e5a610] text-black"
                        >
                          Save
                        </Button>
                        <Button
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
                          className="bg-[#2E2E2E] hover:bg-[#3E3E3E] text-white border border-gray-600"
                        >
                          <X size={14} className="mr-1" />
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <>
                          <Button
                            onClick={() => togglePublishedStudy(study.id)}
                            size="sm"
                            className="bg-[#2E2E2E] hover:bg-[#1a1a1a] text-white border border-gray-600 rounded-md"
                            title={study.published ? 'Unpublish' : 'Publish'}
                          >
                            {study.published ? <Eye size={14} /> : <EyeOff size={14} />}
                          </Button>
                          <Button
                            onClick={() => setEditingId(study.id)}
                            size="sm"
                            className="bg-[#FDB813] hover:bg-[#e5a610] text-black border border-[#FDB813] rounded-md px-3 flex items-center gap-2"
                          >
                            <Edit size={14} />
                            <span>Edit</span>
                          </Button>
                          <Button
                            onClick={() => handleDelete(study.id)}
                            size="sm"
                            className="bg-[#2E2E2E] hover:bg-red-900 text-white border border-red-500 rounded-md p-2"
                          >
                            <Trash2 size={14} />
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
