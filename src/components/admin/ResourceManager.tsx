import { useState, useEffect } from 'react';
import { Save, Plus, Trash2, Edit2, Book, Video, Music, FileText, ShoppingCart, Youtube, Calendar, Clock, Image as ImageIcon, Upload, X, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { DeleteConfirmDialog } from './DeleteConfirmDialog';
import { ImageUpload } from './ImageUpload';
import { MultipleImageUpload } from './MultipleImageUpload';
import { FileUpload } from './FileUpload';
import { toast } from 'sonner';

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
  fullDescription: string;
  publishDate: string;
}

interface WorshipVideo {
  id: string;
  title: string;
  artist: string;
  duration: string;
  date: string;
  youtubeUrl: string;
  description: string;
}

interface Sermon {
  id: string;
  title: string;
  speaker: string;
  duration: string;
  date: string;
  thumbnailUrl: string;
  youtubeUrl: string;
  description: string;
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
}

type ResourceType = 'books' | 'worship' | 'sermons' | 'bible-studies';

export function ResourceManager() {
  const [activeTab, setActiveTab] = useState<ResourceType>('books');

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl text-white mb-2">Resources Management</h2>
        <p className="text-gray-400">Manage all resource content for the website</p>
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
        {activeTab === 'books' && <MusicBooksManager />}
        {activeTab === 'worship' && <WorshipVideosManager />}
        {activeTab === 'sermons' && <SermonsManager />}
        {activeTab === 'bible-studies' && <BibleStudiesManager />}
      </div>
    </div>
  );
}

// Music Books Manager Sub-Component
function MusicBooksManager() {
  const [books, setBooks] = useState<MusicBook[]>([
    {
      id: '1',
      title: 'Hallel Music School - Music Formula',
      author: 'Ps. Augustine Dandingi',
      price: 550,
      pages: 48,
      language: 'English',
      coverImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      additionalImages: [],
      description: 'Comprehensive music theory and practical guide',
      fullDescription: 'This comprehensive worship collection includes traditional and contemporary songs with complete musical chords and lyrics.',
      publishDate: '2025'
    }
  ]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState<string | null>(null);
  const [expandedBook, setExpandedBook] = useState<string | null>(null);
  const [showAdditionalImagesUpload, setShowAdditionalImagesUpload] = useState<string | null>(null);

  const handleAdd = () => {
    const newBook: MusicBook = {
      id: Date.now().toString(),
      title: '',
      author: '',
      price: 0,
      pages: 0,
      language: 'English',
      coverImage: '',
      additionalImages: [],
      description: '',
      fullDescription: '',
      publishDate: new Date().getFullYear().toString()
    };
    setBooks([newBook, ...books]);
    setEditingId(newBook.id);
    setExpandedBook(newBook.id);
  };

  const handleUpdate = (id: string, updates: Partial<MusicBook>) => {
    setBooks(books.map(b => b.id === id ? { ...b, ...updates } : b));
  };

  const handleDelete = (id: string) => {
    setBookToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (bookToDelete) {
      setBooks(books.filter(b => b.id !== bookToDelete));
      toast.success('Book deleted successfully');
      setBookToDelete(null);
    }
    setDeleteDialogOpen(false);
  };

  const handleSave = (id: string) => {
    setEditingId(null);
    toast.success('Book saved successfully');
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

      {/* Books List */}
      {books.length === 0 ? (
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
                      <Input
                        value={book.title}
                        onChange={(e) => handleUpdate(book.id, { title: e.target.value })}
                        placeholder="Book Title"
                        className="bg-black border-gray-600 text-white text-lg mb-2"
                      />
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
                          onClick={() => setEditingId(book.id)}
                          size="sm"
                          className="bg-[#2E2E2E] hover:bg-[#1a1a1a] text-[#FDB813] border border-[#FDB813]"
                        >
                          <Edit2 size={14} />
                        </Button>
                        <Button
                          onClick={() => handleDelete(book.id)}
                          size="sm"
                          className="bg-[#2E2E2E] hover:bg-red-900 text-red-500 border border-red-500"
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
                        <label className="text-sm text-white mb-1 block">Author</label>
                        <Input
                          value={book.author}
                          onChange={(e) => handleUpdate(book.id, { author: e.target.value })}
                          placeholder="Author Name"
                          className="bg-black border-gray-600 text-white"
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <label className="text-sm text-white mb-1 block">Language</label>
                        <Input
                          value={book.language}
                          onChange={(e) => handleUpdate(book.id, { language: e.target.value })}
                          placeholder="Language"
                          className="bg-black border-gray-600 text-white"
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <label className="text-sm text-white mb-1 block">Price (₹)</label>
                        <Input
                          type="number"
                          value={book.price}
                          onChange={(e) => handleUpdate(book.id, { price: parseFloat(e.target.value) })}
                          placeholder="Price"
                          className="bg-black border-gray-600 text-white"
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <label className="text-sm text-white mb-1 block">Pages</label>
                        <Input
                          type="number"
                          value={book.pages}
                          onChange={(e) => handleUpdate(book.id, { pages: parseInt(e.target.value) })}
                          placeholder="Number of Pages"
                          className="bg-black border-gray-600 text-white"
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <label className="text-sm text-white mb-1 block">Publish Date</label>
                        <Input
                          value={book.publishDate}
                          onChange={(e) => handleUpdate(book.id, { publishDate: e.target.value })}
                          placeholder="Year"
                          className="bg-black border-gray-600 text-white"
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm text-white mb-1 block">Short Description</label>
                      <Textarea
                        value={book.description}
                        onChange={(e) => handleUpdate(book.id, { description: e.target.value })}
                        placeholder="Brief description for card view"
                        className="bg-black border-gray-600 text-white"
                        rows={2}
                        disabled={!isEditing}
                      />
                    </div>

                    <div>
                      <label className="text-sm text-white mb-1 block">Full Description</label>
                      <Textarea
                        value={book.fullDescription}
                        onChange={(e) => handleUpdate(book.id, { fullDescription: e.target.value })}
                        placeholder="Detailed description for detail view"
                        className="bg-black border-gray-600 text-white"
                        rows={3}
                        disabled={!isEditing}
                      />
                    </div>

                    <div>
                      <label className="text-sm text-white mb-2 block">Cover Image</label>
                      {isEditing ? (
                        <div className="space-y-3">
                          <ImageUpload
                            bucket="book-covers"
                            onUploadComplete={(url) => handleUpdate(book.id, { coverImage: url })}
                            currentImage={book.coverImage}
                            imageType="gallery"
                          />
                          <div className="text-xs text-gray-500 text-center">OR</div>
                          <Input
                            value={book.coverImage}
                            onChange={(e) => handleUpdate(book.id, { coverImage: e.target.value })}
                            placeholder="Enter image URL manually"
                            className="bg-black border-gray-600 text-white"
                          />
                        </div>
                      ) : (
                        book.coverImage && (
                          <div className="mt-2">
                            <img
                              src={book.coverImage}
                              alt="Cover preview"
                              className="w-full h-48 object-cover rounded border border-gray-600"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                              }}
                            />
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
                          <div className="text-xs text-gray-500 text-center">OR</div>
                          <div className="text-xs text-gray-500 mb-2">
                            Enter image URLs separated by commas
                          </div>
                          <Textarea
                            value={book.additionalImages.join(', ')}
                            onChange={(e) => {
                              const urls = e.target.value.split(',').map(url => url.trim()).filter(Boolean);
                              handleUpdate(book.id, { additionalImages: urls });
                            }}
                            placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                            className="bg-black border-gray-600 text-white"
                            rows={3}
                          />
                        </div>
                      )}
                      {book.additionalImages.length > 0 && (
                        <div className="mt-3 grid grid-cols-4 md:grid-cols-6 gap-2">
                          {book.additionalImages.map((url, index) => (
                            <div key={index} className="relative group">
                              <img
                                src={url}
                                alt={`Additional ${index + 1}`}
                                className="w-full h-20 object-cover rounded border border-gray-600"
                                onError={(e) => {
                                  e.currentTarget.style.display = 'none';
                                }}
                              />
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
          category="book-gallery"
        />
      )}
    </div>
  );
}

// Worship Videos Manager Sub-Component
function WorshipVideosManager() {
  const [videos, setVideos] = useState<WorshipVideo[]>([
    {
      id: '1',
      title: 'Shuddha Hrudayam',
      artist: 'Ps. Augustine Dandingi',
      duration: '7:20',
      date: '2020-08-08',
      youtubeUrl: 'https://youtu.be/ViZtowhZGY4',
      description: 'Beautiful worship song'
    }
  ]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [videoToDelete, setVideoToDelete] = useState<string | null>(null);

  const handleAdd = () => {
    const newVideo: WorshipVideo = {
      id: Date.now().toString(),
      title: '',
      artist: '',
      duration: '',
      date: new Date().toISOString().split('T')[0],
      youtubeUrl: '',
      description: ''
    };
    setVideos([newVideo, ...videos]);
    setEditingId(newVideo.id);
  };

  const handleUpdate = (id: string, updates: Partial<WorshipVideo>) => {
    setVideos(videos.map(v => v.id === id ? { ...v, ...updates } : v));
  };

  const handleDelete = (id: string) => {
    setVideoToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (videoToDelete) {
      setVideos(videos.filter(v => v.id !== videoToDelete));
      toast.success('Worship video deleted successfully');
      setVideoToDelete(null);
    }
    setDeleteDialogOpen(false);
  };

  const handleSave = (id: string) => {
    setEditingId(null);
    toast.success('Worship video saved successfully');
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

      {videos.length === 0 ? (
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
                        <div>
                          <label className="text-sm text-white mb-1.5 block">Video Title</label>
                          <Input
                            value={video.title}
                            onChange={(e) => handleUpdate(video.id, { title: e.target.value })}
                            placeholder="Enter video title"
                            className="bg-black border-gray-600 text-white"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-sm text-white mb-1.5 block">Artist</label>
                            <Input
                              value={video.artist}
                              onChange={(e) => handleUpdate(video.id, { artist: e.target.value })}
                              placeholder="Artist name"
                              className="bg-black border-gray-600 text-white"
                            />
                          </div>
                          <div>
                            <label className="text-sm text-white mb-1.5 block">Duration</label>
                            <Input
                              value={video.duration}
                              onChange={(e) => handleUpdate(video.id, { duration: e.target.value })}
                              placeholder="e.g., 7:20"
                              className="bg-black border-gray-600 text-white"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-sm text-white mb-1.5 block">Upload Date</label>
                          <Input
                            type="date"
                            value={video.date}
                            onChange={(e) => handleUpdate(video.id, { date: e.target.value })}
                            className="bg-black border-gray-600 text-white"
                          />
                        </div>
                        <div>
                          <label className="text-sm text-white mb-1.5 block">YouTube URL</label>
                          <Input
                            value={video.youtubeUrl}
                            onChange={(e) => handleUpdate(video.id, { youtubeUrl: e.target.value })}
                            placeholder="https://youtu.be/..."
                            className="bg-black border-gray-600 text-white"
                          />
                        </div>
                        <div>
                          <label className="text-sm text-white mb-1.5 block">Description</label>
                          <Textarea
                            value={video.description}
                            onChange={(e) => handleUpdate(video.id, { description: e.target.value })}
                            placeholder="Enter video description"
                            className="bg-black border-gray-600 text-white"
                            rows={2}
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <h3 className="text-white text-lg mb-1">{video.title || 'Untitled Video'}</h3>
                          <div className="flex flex-wrap gap-3 text-sm text-gray-400">
                            <span>Artist: {video.artist}</span>
                            <span className="flex items-center gap-1">
                              <Clock size={12} />
                              {video.duration}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar size={12} />
                              {video.date}
                            </span>
                          </div>
                          {video.description && (
                            <p className="text-gray-400 text-sm mt-2">{video.description}</p>
                          )}
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
                            if (!video.title && !video.youtubeUrl) {
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
                          onClick={() => setEditingId(video.id)}
                          size="sm"
                          className="bg-[#2E2E2E] hover:bg-[#1a1a1a] text-[#FDB813] border border-[#FDB813]"
                        >
                          <Edit2 size={14} />
                        </Button>
                        <Button
                          onClick={() => handleDelete(video.id)}
                          size="sm"
                          className="bg-[#2E2E2E] hover:bg-red-900 text-red-500 border border-red-500"
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
function SermonsManager() {
  const [sermons, setSermons] = useState<Sermon[]>([
    {
      id: '1',
      title: 'కుటుంబ ఆరాధనలోని శక్తి',
      speaker: 'Ps. Augustine Dandingi',
      duration: '1:00',
      date: '2025-10-18',
      thumbnailUrl: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=400',
      youtubeUrl: 'https://youtube.com/shorts/ArUfnNDkflQ',
      description: 'కుటుంబ ఆరాధనలోని శక్తి'
    }
  ]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [sermonToDelete, setSermonToDelete] = useState<string | null>(null);

  const handleAdd = () => {
    const newSermon: Sermon = {
      id: Date.now().toString(),
      title: '',
      speaker: '',
      duration: '',
      date: new Date().toISOString().split('T')[0],
      thumbnailUrl: '',
      youtubeUrl: '',
      description: ''
    };
    setSermons([newSermon, ...sermons]);
    setEditingId(newSermon.id);
  };

  const handleUpdate = (id: string, updates: Partial<Sermon>) => {
    setSermons(sermons.map(s => s.id === id ? { ...s, ...updates } : s));
  };

  const handleDelete = (id: string) => {
    setSermonToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (sermonToDelete) {
      setSermons(sermons.filter(s => s.id !== sermonToDelete));
      toast.success('Sermon deleted successfully');
      setSermonToDelete(null);
    }
    setDeleteDialogOpen(false);
  };

  const handleSave = (id: string) => {
    setEditingId(null);
    toast.success('Sermon saved successfully');
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

      {sermons.length === 0 ? (
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
                    {sermon.thumbnailUrl ? (
                      <img
                        src={sermon.thumbnailUrl}
                        alt={sermon.title}
                        className="w-32 h-20 object-cover rounded border border-gray-600"
                      />
                    ) : (
                      <div className="w-32 h-20 bg-black rounded flex items-center justify-center border border-gray-600">
                        <Video size={32} className="text-gray-600" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 space-y-3">
                    {isEditing ? (
                      <>
                        <div>
                          <label className="text-sm text-white mb-1.5 block">Sermon Title</label>
                          <Input
                            value={sermon.title}
                            onChange={(e) => handleUpdate(sermon.id, { title: e.target.value })}
                            placeholder="Enter sermon title"
                            className="bg-black border-gray-600 text-white"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-sm text-white mb-1.5 block">Speaker</label>
                            <Input
                              value={sermon.speaker}
                              onChange={(e) => handleUpdate(sermon.id, { speaker: e.target.value })}
                              placeholder="Speaker name"
                              className="bg-black border-gray-600 text-white"
                            />
                          </div>
                          <div>
                            <label className="text-sm text-white mb-1.5 block">Duration</label>
                            <Input
                              value={sermon.duration}
                              onChange={(e) => handleUpdate(sermon.id, { duration: e.target.value })}
                              placeholder="e.g., 1:00"
                              className="bg-black border-gray-600 text-white"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-sm text-white mb-1.5 block">Date</label>
                          <Input
                            type="date"
                            value={sermon.date}
                            onChange={(e) => handleUpdate(sermon.id, { date: e.target.value })}
                            className="bg-black border-gray-600 text-white"
                          />
                        </div>
                        <div>
                          <label className="text-sm text-white mb-1.5 block">YouTube URL</label>
                          <Input
                            value={sermon.youtubeUrl}
                            onChange={(e) => handleUpdate(sermon.id, { youtubeUrl: e.target.value })}
                            placeholder="https://youtu.be/..."
                            className="bg-black border-gray-600 text-white"
                          />
                        </div>
                        <div>
                          <label className="text-sm text-white mb-1.5 block">Description</label>
                          <Textarea
                            value={sermon.description}
                            onChange={(e) => handleUpdate(sermon.id, { description: e.target.value })}
                            placeholder="Enter sermon description"
                            className="bg-black border-gray-600 text-white"
                            rows={2}
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <h3 className="text-white text-lg mb-1">{sermon.title || 'Untitled Sermon'}</h3>
                          <div className="flex flex-wrap gap-3 text-sm text-gray-400">
                            <span>Speaker: {sermon.speaker}</span>
                            <span className="flex items-center gap-1">
                              <Clock size={12} />
                              {sermon.duration}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar size={12} />
                              {sermon.date}
                            </span>
                          </div>
                          {sermon.description && (
                            <p className="text-gray-400 text-sm mt-2">{sermon.description}</p>
                          )}
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
                            if (!sermon.title && !sermon.youtubeUrl) {
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
                          onClick={() => setEditingId(sermon.id)}
                          size="sm"
                          className="bg-[#2E2E2E] hover:bg-[#1a1a1a] text-[#FDB813] border border-[#FDB813]"
                        >
                          <Edit2 size={14} />
                        </Button>
                        <Button
                          onClick={() => handleDelete(sermon.id)}
                          size="sm"
                          className="bg-[#2E2E2E] hover:bg-red-900 text-red-500 border border-red-500"
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
function BibleStudiesManager() {
  const [studies, setStudies] = useState<BibleStudy[]>([
    {
      id: '1',
      title: 'The Book of Romans',
      author: 'Dr. James White',
      pages: 45,
      date: '2023-01-20',
      fileType: 'PDF',
      fileUrl: '#',
      thumbnailUrl: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=400',
      description: 'An in-depth study of Paul\'s letter to the Romans.'
    }
  ]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [studyToDelete, setStudyToDelete] = useState<string | null>(null);
  const [uploadMode, setUploadMode] = useState<Record<string, boolean>>({});

  const handleAdd = () => {
    const newStudy: BibleStudy = {
      id: Date.now().toString(),
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
  };

  const handleDelete = (id: string) => {
    setStudyToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (studyToDelete) {
      setStudies(studies.filter(s => s.id !== studyToDelete));
      toast.success('Bible study deleted successfully');
      setStudyToDelete(null);
    }
    setDeleteDialogOpen(false);
  };

  const handleSave = (id: string) => {
    setEditingId(null);
    toast.success('Bible study saved successfully');
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

      {studies.length === 0 ? (
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
                            value={study.title}
                            onChange={(e) => handleUpdate(study.id, { title: e.target.value })}
                            placeholder="Enter study title"
                            className="bg-black border-gray-600 text-white"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-sm text-white mb-1.5 block">Author</label>
                            <Input
                              value={study.author}
                              onChange={(e) => handleUpdate(study.id, { author: e.target.value })}
                              placeholder="Author name"
                              className="bg-black border-gray-600 text-white"
                            />
                          </div>
                          <div>
                            <label className="text-sm text-white mb-1.5 block">Pages</label>
                            <Input
                              type="number"
                              value={study.pages}
                              onChange={(e) => handleUpdate(study.id, { pages: parseInt(e.target.value) })}
                              placeholder="Number of pages"
                              className="bg-black border-gray-600 text-white"
                            />
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
                          <div className="flex gap-2 mb-2">
                            <Button
                              type="button"
                              variant={!uploadMode[study.id] ? 'default' : 'outline'}
                              size="sm"
                              onClick={() => {
                                setUploadMode({ ...uploadMode, [study.id]: false });
                              }}
                              className="flex-1"
                            >
                              <Upload className="mr-2" size={16} />
                              Manual URL
                            </Button>
                            <Button
                              type="button"
                              variant={uploadMode[study.id] ? 'default' : 'outline'}
                              size="sm"
                              onClick={() => {
                                setUploadMode({ ...uploadMode, [study.id]: true });
                              }}
                              className="flex-1"
                            >
                              <FileText className="mr-2" size={16} />
                              Upload File
                            </Button>
                          </div>
                          
                          {/* Show manual URL input or file upload based on mode */}
                          {!uploadMode[study.id] ? (
                            <Input
                              value={study.fileUrl}
                              onChange={(e) => handleUpdate(study.id, { fileUrl: e.target.value })}
                              placeholder="https://example.com/file.pdf"
                              className="bg-black border-gray-600 text-white"
                            />
                          ) : (
                            <FileUpload
                              onUploadComplete={(url) => handleUpdate(study.id, { fileUrl: url })}
                              currentFile={study.fileUrl?.startsWith('data:') ? study.fileUrl : ''}
                              maxSizeMB={10}
                              acceptedFormats={['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']}
                              acceptedExtensions={['.pdf', '.doc', '.docx']}
                            />
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
                              {study.date}
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
                          onClick={() => {
                            setEditingId(null);
                            // Remove the study if it's empty (newly added)
                            if (!study.title && !study.fileUrl) {
                              setStudies(studies.filter(s => s.id !== study.id));
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
                          onClick={() => setEditingId(study.id)}
                          size="sm"
                          className="bg-[#2E2E2E] hover:bg-[#1a1a1a] text-[#FDB813] border border-[#FDB813]"
                        >
                          <Edit2 size={14} />
                        </Button>
                        <Button
                          onClick={() => handleDelete(study.id)}
                          size="sm"
                          className="bg-[#2E2E2E] hover:bg-red-900 text-red-500 border border-red-500"
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
