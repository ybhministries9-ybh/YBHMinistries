import { useState } from 'react';
import { Plus, Edit, Trash2, Image as ImageIcon, Video, Calendar, ChevronDown, ChevronUp, CheckSquare, Square, Upload, Link as LinkIcon, X, Images } from 'lucide-react';
import { Button } from '../ui/button';
import { DeleteConfirmDialog } from './DeleteConfirmDialog';
import { toast } from 'sonner';
import { ImageUpload } from './ImageUpload';
import { MultipleImageUpload } from './MultipleImageUpload';

interface GalleryImage {
  id: string;
  url: string;
  category: string;
}

interface GalleryVideo {
  id: string;
  youtubeUrl: string;
  title: string;
  date: string;
  category: string;
}

interface GalleryManagerProps {
  token: string;
}

const GALLERY_CATEGORIES = [
  { key: 'guinness-events', label: 'Guinness World Records Events' },
  { key: 'asian-records', label: 'Asian Book of Records' },
  { key: 'ingenious-record', label: 'Ingenious Charm World Record' },
  { key: 'international-star-records', label: 'International Star Book of Records' },
  { key: 'hallel-conferences', label: 'Hallel Conferences' },
  { key: 'lsm-events', label: 'LSM Events' },
  { key: 'anniversary', label: 'Anniversary (HMS)' }
] as const;

export function GalleryManager({ token }: GalleryManagerProps) {
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [editingImageId, setEditingImageId] = useState<string | null>(null);
  const [editingVideoId, setEditingVideoId] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    images: true,
    videos: true
  });
  const [selectedImages, setSelectedImages] = useState<Set<string>>(new Set());
  const [selectedVideos, setSelectedVideos] = useState<Set<string>>(new Set());
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    type: 'image' | 'video' | 'bulk';
    ids: string[];
    count: number;
  }>({ open: false, type: 'image', ids: [], count: 0 });

  const [uploadMode, setUploadMode] = useState<'file' | 'url'>('file');
  const [showBulkUpload, setShowBulkUpload] = useState(false);
  const [imageUrls, setImageUrls] = useState<string[]>(['']);
  const [videoUrls, setVideoUrls] = useState<Array<{ url: string; title: string; date: string }>>([{ url: '', title: '', date: '' }]);

  // Sample images data
  const [images, setImages] = useState<GalleryImage[]>([
    { id: '1', url: 'https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Guinness/1.jpg', category: 'guinness-events' },
    { id: '2', url: 'https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Guinness/9.jpg', category: 'guinness-events' },
    { id: '3', url: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=1200', category: 'asian-records' },
    { id: '4', url: 'https://images.unsplash.com/photo-1464375117522-1311d6a5b81f?w=1200', category: 'ingenious-record' },
    { id: '5', url: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1200', category: 'hallel-conferences' },
    { id: '6', url: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1200', category: 'guinness-events' },
  ]);

  // Sample videos data
  const [videos, setVideos] = useState<GalleryVideo[]>([
    { 
      id: 'v1', 
      youtubeUrl: 'https://www.youtube.com/watch?v=onjJxyACJ0s', 
      title: 'Guinness World Records REAL BENEFITS ?', 
      date: '18-Jul-2025',
      category: 'guinness-events'
    },
    { 
      id: 'v2', 
      youtubeUrl: 'https://www.youtube.com/watch?v=q-oB60TT9_Y', 
      title: 'HMS Asia Book Records', 
      date: '10-Apr-2024',
      category: 'asian-records'
    },
    { 
      id: 'v3', 
      youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 
      title: 'Hallel Conference Highlights', 
      date: '15-Mar-2024',
      category: 'hallel-conferences'
    },
  ]);



  const handleAddImage = () => {
    const newImage: GalleryImage = {
      id: `img-${Date.now()}`,
      url: '',
      category: filterCategory === 'all' ? 'guinness-events' : filterCategory
    };
    setImages([newImage, ...images]);
    setEditingImageId(newImage.id);
    setUploadMode('file');
    setImageUrls(['']); // Reset URL fields
  };

  const handleAddVideo = () => {
    const newVideo: GalleryVideo = {
      id: `vid-${Date.now()}`,
      youtubeUrl: '',
      title: '',
      date: '',
      category: filterCategory === 'all' ? 'guinness-events' : filterCategory
    };
    setVideos([newVideo, ...videos]);
    setEditingVideoId(newVideo.id);
    setVideoUrls([{ url: '', title: '', date: '' }]); // Reset URL fields
  };

  const handleBulkUploadComplete = (newImages: { url: string; category: string }[]) => {
    const imagesToAdd: GalleryImage[] = newImages.map((img, index) => ({
      id: `img-bulk-${Date.now()}-${index}`,
      url: img.url,
      category: img.category
    }));
    
    setImages([...imagesToAdd, ...images]);
    setShowBulkUpload(false);
    toast.success(`${newImages.length} image${newImages.length > 1 ? 's' : ''} uploaded successfully!`);
  };

  const handleDeleteImage = (id: string) => {
    setDeleteDialog({ open: true, type: 'image', ids: [id], count: 1 });
  };

  const handleDeleteVideo = (id: string) => {
    setDeleteDialog({ open: true, type: 'video', ids: [id], count: 1 });
  };

  const handleBulkDeleteImages = () => {
    if (selectedImages.size === 0) return;
    setDeleteDialog({ 
      open: true, 
      type: 'bulk', 
      ids: Array.from(selectedImages), 
      count: selectedImages.size 
    });
  };

  const handleBulkDeleteVideos = () => {
    if (selectedVideos.size === 0) return;
    setDeleteDialog({ 
      open: true, 
      type: 'bulk', 
      ids: Array.from(selectedVideos), 
      count: selectedVideos.size 
    });
  };

  const confirmDelete = () => {
    if (deleteDialog.type === 'image') {
      setImages(images.filter(img => !deleteDialog.ids.includes(img.id)));
      toast.success('Image deleted successfully');
    } else if (deleteDialog.type === 'video') {
      setVideos(videos.filter(vid => !deleteDialog.ids.includes(vid.id)));
      toast.success('Video deleted successfully');
    } else if (deleteDialog.type === 'bulk') {
      // Determine if bulk delete is for images or videos based on which set has items
      if (deleteDialog.ids.some(id => selectedImages.has(id))) {
        setImages(images.filter(img => !deleteDialog.ids.includes(img.id)));
        setSelectedImages(new Set());
        toast.success(`${deleteDialog.count} image${deleteDialog.count > 1 ? 's' : ''} deleted successfully`);
      } else {
        setVideos(videos.filter(vid => !deleteDialog.ids.includes(vid.id)));
        setSelectedVideos(new Set());
        toast.success(`${deleteDialog.count} video${deleteDialog.count > 1 ? 's' : ''} deleted successfully`);
      }
    }
    setDeleteDialog({ open: false, type: 'image', ids: [], count: 0 });
  };

  const handleUpdateImage = (id: string, field: keyof GalleryImage, value: any) => {
    setImages(images.map(img => img.id === id ? { ...img, [field]: value } : img));
  };

  const handleUpdateVideo = (id: string, field: keyof GalleryVideo, value: any) => {
    setVideos(videos.map(vid => vid.id === id ? { ...vid, [field]: value } : vid));
  };

  // Multiple URL helpers for images
  const addImageUrlField = () => {
    setImageUrls([...imageUrls, '']);
  };

  const removeImageUrlField = (index: number) => {
    if (imageUrls.length > 1) {
      setImageUrls(imageUrls.filter((_, i) => i !== index));
    }
  };

  const updateImageUrlField = (index: number, value: string) => {
    const newUrls = [...imageUrls];
    newUrls[index] = value;
    setImageUrls(newUrls);
  };

  const saveMultipleImageUrls = (imageId: string, category: string) => {
    const validUrls = imageUrls.filter(url => url.trim() !== '');
    
    if (validUrls.length === 0) {
      toast.error('At least one image URL is required');
      return;
    }

    // Remove the placeholder image
    setImages(images.filter(img => img.id !== imageId));

    // Add all valid URLs as new images
    const newImages: GalleryImage[] = validUrls.map((url, index) => ({
      id: `img-${Date.now()}-${index}`,
      url: url,
      category: category
    }));

    setImages([...newImages, ...images.filter(img => img.id !== imageId)]);
    setEditingImageId(null);
    setImageUrls(['']);
    toast.success(`${validUrls.length} image${validUrls.length > 1 ? 's' : ''} added successfully!`);
  };

  // Multiple URL helpers for videos
  const addVideoUrlField = () => {
    setVideoUrls([...videoUrls, { url: '', title: '', date: '' }]);
  };

  const removeVideoUrlField = (index: number) => {
    if (videoUrls.length > 1) {
      setVideoUrls(videoUrls.filter((_, i) => i !== index));
    }
  };

  const updateVideoUrlField = (index: number, field: 'url' | 'title' | 'date', value: string) => {
    const newUrls = [...videoUrls];
    newUrls[index][field] = value;
    setVideoUrls(newUrls);
  };

  const saveMultipleVideoUrls = (videoId: string, category: string) => {
    const validVideos = videoUrls.filter(v => v.url.trim() !== '');
    
    if (validVideos.length === 0) {
      toast.error('At least one video URL is required');
      return;
    }

    // Remove the placeholder video
    setVideos(videos.filter(vid => vid.id !== videoId));

    // Add all valid URLs as new videos
    const newVideos: GalleryVideo[] = validVideos.map((video, index) => ({
      id: `vid-${Date.now()}-${index}`,
      youtubeUrl: video.url,
      title: video.title || `Video ${index + 1}`,
      date: video.date || new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      category: category
    }));

    setVideos([...newVideos, ...videos.filter(vid => vid.id !== videoId)]);
    setEditingVideoId(null);
    setVideoUrls([{ url: '', title: '', date: '' }]);
    toast.success(`${validVideos.length} video${validVideos.length > 1 ? 's' : ''} added successfully!`);
  };

  const toggleSection = (section: string) => {
    setExpandedSections({ ...expandedSections, [section]: !expandedSections[section] });
  };

  const toggleImageSelection = (id: string) => {
    const newSelection = new Set(selectedImages);
    if (newSelection.has(id)) {
      newSelection.delete(id);
    } else {
      newSelection.add(id);
    }
    setSelectedImages(newSelection);
  };

  const toggleVideoSelection = (id: string) => {
    const newSelection = new Set(selectedVideos);
    if (newSelection.has(id)) {
      newSelection.delete(id);
    } else {
      newSelection.add(id);
    }
    setSelectedVideos(newSelection);
  };

  const selectAllImages = () => {
    setSelectedImages(new Set(filteredImages.map(img => img.id)));
  };

  const deselectAllImages = () => {
    setSelectedImages(new Set());
  };

  const selectAllVideos = () => {
    setSelectedVideos(new Set(filteredVideos.map(vid => vid.id)));
  };

  const deselectAllVideos = () => {
    setSelectedVideos(new Set());
  };

  const filteredImages = filterCategory === 'all' 
    ? images 
    : images.filter(img => img.category === filterCategory);

  const filteredVideos = filterCategory === 'all' 
    ? videos 
    : videos.filter(vid => vid.category === filterCategory);

  const getCategoryLabel = (key: string) => {
    return GALLERY_CATEGORIES.find(cat => cat.key === key)?.label || key;
  };

  const getYoutubeThumbnail = (url: string) => {
    const videoId = url.split('v=')[1]?.split('&')[0] || url.split('youtu.be/')[1]?.split('?')[0] || '';
    return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl text-white mb-2">Gallery Management</h2>
        <p className="text-gray-300">Manage gallery images and videos across all event categories</p>
      </div>

      {/* Category Filter */}
      <div className="mb-6 bg-[#2E2E2E] p-4 rounded-lg border border-gray-700">
        <label className="block text-white mb-2">Filter by Category</label>
        <select
          value={filterCategory}
          onChange={(e) => {
            setFilterCategory(e.target.value);
            setSelectedImages(new Set());
            setSelectedVideos(new Set());
          }}
          className="w-full px-3 py-2 bg-[#1a1a1a] border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#FDB813] focus:border-transparent"
        >
          <option value="all">All Categories</option>
          {GALLERY_CATEGORIES.map((cat) => (
            <option key={cat.key} value={cat.key}>{cat.label}</option>
          ))}
        </select>
      </div>

      {/* Images Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4 bg-[#2E2E2E] p-4 rounded-lg border border-gray-700">
          <div className="flex items-center gap-2">
            <ImageIcon size={20} className="text-[#FDB813]" />
            <h3 className="text-xl text-white">Gallery Images</h3>
            <span className="text-sm text-gray-400">({filteredImages.length})</span>
            {selectedImages.size > 0 && (
              <span className="text-sm text-[#FDB813] ml-2">
                {selectedImages.size} selected
              </span>
            )}
          </div>
          <div className="flex gap-2">
            {selectedImages.size > 0 && (
              <>
                <Button
                  onClick={deselectAllImages}
                  size="sm"
                  className="bg-[#1a1a1a] hover:bg-[#2E2E2E] text-white border border-gray-600"
                >
                  Deselect All
                </Button>
                <Button
                  onClick={handleBulkDeleteImages}
                  size="sm"
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  <Trash2 size={14} className="mr-1" />
                  Delete ({selectedImages.size})
                </Button>
              </>
            )}
            {selectedImages.size === 0 && filteredImages.length > 0 && (
              <Button
                onClick={selectAllImages}
                size="sm"
                className="bg-[#1a1a1a] hover:bg-[#2E2E2E] text-white border border-gray-600"
              >
                Select All
              </Button>
            )}
            <Button
              onClick={() => setShowBulkUpload(true)}
              size="sm"
              className="bg-[#FDB813] hover:bg-[#e5a610] text-black"
            >
              <Images size={16} className="mr-2" />
              Upload Multiple
            </Button>
            <Button
              onClick={handleAddImage}
              size="sm"
              className="bg-[#2E2E2E] hover:bg-[#3E3E3E] text-white border border-[#FDB813]"
            >
              <Plus size={16} className="mr-2" />
              Add Single
            </Button>
            <button
              onClick={() => toggleSection('images')}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              {expandedSections.images ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
          </div>
        </div>

        {expandedSections.images && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
            {filteredImages.length === 0 ? (
              <div className="col-span-full text-center py-12 bg-[#2E2E2E] rounded-lg border border-gray-700">
                <ImageIcon size={48} className="mx-auto text-gray-600 mb-3" />
                <p className="text-gray-400">No images in this category yet.</p>
              </div>
            ) : (
              filteredImages.map((image) => (
                <div
                  key={image.id}
                  className={`relative bg-[#2E2E2E] rounded-lg border overflow-hidden group transition-all ${
                    selectedImages.has(image.id)
                      ? 'border-[#FDB813] ring-2 ring-[#FDB813]/50'
                      : 'border-gray-700 hover:border-gray-600'
                  } ${editingImageId === image.id ? 'col-span-full' : ''}`}
                >
                  {editingImageId === image.id ? (
                    // Edit Mode - Full Width
                    <div className="p-4 space-y-4">
                      {/* Upload Mode Toggle */}
                      <div className="flex gap-2 bg-[#1a1a1a] p-1 rounded-lg">
                        <button
                          onClick={() => setUploadMode('file')}
                          className={`flex-1 py-2 px-4 rounded-md text-sm transition-colors ${
                            uploadMode === 'file'
                              ? 'bg-[#FDB813] text-black'
                              : 'bg-transparent text-gray-400 hover:text-white'
                          }`}
                        >
                          <Upload size={16} className="inline mr-2" />
                          Upload File
                        </button>
                        <button
                          onClick={() => setUploadMode('url')}
                          className={`flex-1 py-2 px-4 rounded-md text-sm transition-colors ${
                            uploadMode === 'url'
                              ? 'bg-[#FDB813] text-black'
                              : 'bg-transparent text-gray-400 hover:text-white'
                          }`}
                        >
                          <LinkIcon size={16} className="inline mr-2" />
                          Paste URL
                        </button>
                      </div>

                      {/* File Upload or URL Input */}
                      {uploadMode === 'file' ? (
                        <div>
                          <label className="block text-sm text-white mb-2">Upload Image</label>
                          <ImageUpload
                            bucket="gallery"
                            onUploadComplete={(url) => handleUpdateImage(image.id, 'url', url)}
                            currentImage={image.url}
                            imageType="gallery"
                            maxSizeMB={5}
                          />
                        </div>
                      ) : (
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <label className="block text-sm text-white">Image URL(s)</label>
                            <Button
                              type="button"
                              onClick={addImageUrlField}
                              size="sm"
                              className="h-6 px-2 bg-[#FDB813] hover:bg-[#e5a711] text-black text-xs"
                            >
                              <Plus size={12} className="mr-1" />
                              Add URL
                            </Button>
                          </div>
                          
                          <div className="space-y-3">
                            {imageUrls.map((url, index) => (
                              <div key={index} className="space-y-2">
                                <div className="relative">
                                  <input
                                    type="text"
                                    value={url}
                                    onChange={(e) => updateImageUrlField(index, e.target.value)}
                                    className="w-full px-3 py-2 pr-20 bg-[#1a1a1a] border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#FDB813] focus:border-transparent text-sm"
                                    placeholder={`Image URL ${imageUrls.length > 1 ? index + 1 : ''}`}
                                  />
                                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                                    {url && (
                                      <button
                                        type="button"
                                        onClick={() => updateImageUrlField(index, '')}
                                        className="p-1 text-gray-400 hover:text-white transition-colors"
                                        title="Clear"
                                      >
                                        <X size={14} />
                                      </button>
                                    )}
                                    {imageUrls.length > 1 && (
                                      <button
                                        type="button"
                                        onClick={() => removeImageUrlField(index)}
                                        className="p-1 text-red-400 hover:text-red-300 transition-colors"
                                        title="Remove field"
                                      >
                                        <Trash2 size={14} />
                                      </button>
                                    )}
                                  </div>
                                </div>
                                
                                {url && (
                                  <div className="aspect-video bg-[#1a1a1a] rounded overflow-hidden">
                                    <img
                                      src={url}
                                      alt={`Preview ${index + 1}`}
                                      className="w-full h-full object-cover"
                                      onError={(e) => {
                                        (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23333" width="400" height="300"/%3E%3Ctext fill="%23666" font-family="sans-serif" font-size="20" dy="10.5" font-weight="bold" x="50%25" y="50%25" text-anchor="middle"%3EInvalid Image URL%3C/text%3E%3C/svg%3E';
                                      }}
                                    />
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Category Selection */}
                      <div>
                        <label className="block text-sm text-white mb-2">Category</label>
                        <select
                          value={image.category}
                          onChange={(e) => handleUpdateImage(image.id, 'category', e.target.value)}
                          className="w-full px-3 py-2 bg-[#1a1a1a] border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#FDB813] focus:border-transparent text-sm"
                        >
                          {GALLERY_CATEGORIES.map((cat) => (
                            <option key={cat.key} value={cat.key}>{cat.label}</option>
                          ))}
                        </select>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 pt-2">
                        <Button
                          onClick={() => {
                            if (uploadMode === 'url') {
                              saveMultipleImageUrls(image.id, image.category);
                            } else {
                              setEditingImageId(null);
                            }
                          }}
                          className="flex-1 bg-[#FDB813] hover:bg-[#e5a610] text-black"
                        >
                          {uploadMode === 'url' && imageUrls.filter(u => u.trim() !== '').length > 1 ? 'Add Images' : 'Done'}
                        </Button>
                        <Button
                          onClick={() => {
                            setEditingImageId(null);
                            setImageUrls(['']);
                            // Remove the new empty image if it was just added and has no URL
                            if (!image.url) {
                              setImages(images.filter(img => img.id !== image.id));
                            }
                          }}
                          className="px-4 bg-[#2E2E2E] hover:bg-[#3E3E3E] text-white border border-gray-600"
                        >
                          <X size={16} className="mr-2" />
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    // Compact View Mode
                    <>
                      {/* Selection Checkbox */}
                      <div className="absolute top-2 left-2 z-10">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleImageSelection(image.id);
                          }}
                          className={`p-1 rounded transition-all ${
                            selectedImages.has(image.id)
                              ? 'bg-[#FDB813] text-black'
                              : 'bg-black/60 text-white opacity-0 group-hover:opacity-100'
                          }`}
                        >
                          {selectedImages.has(image.id) ? (
                            <CheckSquare size={20} />
                          ) : (
                            <Square size={20} />
                          )}
                        </button>
                      </div>

                      {/* Image Thumbnail */}
                      <div className="aspect-square bg-[#1a1a1a] overflow-hidden cursor-pointer" onClick={() => setEditingImageId(image.id)}>
                        {image.url ? (
                          <img
                            src={image.url}
                            alt="Gallery"
                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <ImageIcon size={24} className="text-gray-600" />
                          </div>
                        )}
                      </div>

                      {/* Info Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] text-[#FDB813] font-medium truncate flex-1">
                            {getCategoryLabel(image.category)}
                          </span>
                          <div className="flex gap-1 ml-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditingImageId(image.id);
                              }}
                              className="p-1 bg-[#2E2E2E] text-white hover:bg-[#FDB813] hover:text-black rounded transition-colors"
                            >
                              <Edit size={12} />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteImage(image.id);
                              }}
                              className="p-1 bg-[#2E2E2E] text-white hover:bg-red-600 rounded transition-colors"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Videos Section */}
      <div>
        <div className="flex items-center justify-between mb-4 bg-[#2E2E2E] p-4 rounded-lg border border-gray-700">
          <div className="flex items-center gap-2">
            <Video size={20} className="text-[#FDB813]" />
            <h3 className="text-xl text-white">Gallery Videos</h3>
            <span className="text-sm text-gray-400">({filteredVideos.length})</span>
            {selectedVideos.size > 0 && (
              <span className="text-sm text-[#FDB813] ml-2">
                {selectedVideos.size} selected
              </span>
            )}
          </div>
          <div className="flex gap-2">
            {selectedVideos.size > 0 && (
              <>
                <Button
                  onClick={deselectAllVideos}
                  size="sm"
                  className="bg-[#1a1a1a] hover:bg-[#2E2E2E] text-white border border-gray-600"
                >
                  Deselect All
                </Button>
                <Button
                  onClick={handleBulkDeleteVideos}
                  size="sm"
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  <Trash2 size={14} className="mr-1" />
                  Delete ({selectedVideos.size})
                </Button>
              </>
            )}
            {selectedVideos.size === 0 && filteredVideos.length > 0 && (
              <Button
                onClick={selectAllVideos}
                size="sm"
                className="bg-[#1a1a1a] hover:bg-[#2E2E2E] text-white border border-gray-600"
              >
                Select All
              </Button>
            )}
            <Button
              onClick={handleAddVideo}
              size="sm"
              className="bg-[#2E2E2E] hover:bg-[#3E3E3E] text-white border border-[#FDB813]"
            >
              <Plus size={16} className="mr-2" />
              Add Video
            </Button>
            <button
              onClick={() => toggleSection('videos')}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              {expandedSections.videos ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
          </div>
        </div>

        {expandedSections.videos && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {filteredVideos.length === 0 ? (
              <div className="col-span-full text-center py-12 bg-[#2E2E2E] rounded-lg border border-gray-700">
                <Video size={48} className="mx-auto text-gray-600 mb-3" />
                <p className="text-gray-400">No videos in this category yet.</p>
              </div>
            ) : (
              filteredVideos.map((video) => (
                <div
                  key={video.id}
                  className={`relative bg-[#2E2E2E] rounded-lg border overflow-hidden group transition-all ${
                    selectedVideos.has(video.id)
                      ? 'border-[#FDB813] ring-2 ring-[#FDB813]/50'
                      : 'border-gray-700 hover:border-gray-600'
                  } ${editingVideoId === video.id ? 'col-span-full' : ''}`}
                >
                  {editingVideoId === video.id ? (
                    // Edit Mode - Full Width
                    <div className="p-4 space-y-3">
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-sm text-white">Add Video URL(s)</label>
                        <Button
                          type="button"
                          onClick={addVideoUrlField}
                          size="sm"
                          className="h-6 px-2 bg-[#FDB813] hover:bg-[#e5a711] text-black text-xs"
                        >
                          <Plus size={12} className="mr-1" />
                          Add Video
                        </Button>
                      </div>
                      
                      <div className="space-y-4">
                        {videoUrls.map((videoData, index) => (
                          <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3 bg-[#1a1a1a] rounded-lg border border-gray-700">
                            <div className="md:col-span-2 flex items-start justify-between gap-2">
                              <div className="flex-1">
                                <label className="block text-xs text-white mb-1">YouTube URL</label>
                                <input
                                  type="text"
                                  value={videoData.url}
                                  onChange={(e) => updateVideoUrlField(index, 'url', e.target.value)}
                                  className="w-full px-3 py-2 bg-black border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#FDB813] focus:border-transparent text-sm"
                                  placeholder="https://www.youtube.com/watch?v=..."
                                />
                              </div>
                              {videoUrls.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => removeVideoUrlField(index)}
                                  className="mt-5 p-2 text-red-400 hover:text-red-300 transition-colors"
                                  title="Remove video"
                                >
                                  <Trash2 size={16} />
                                </button>
                              )}
                            </div>
                            <div>
                              <label className="block text-xs text-white mb-1">Title</label>
                              <input
                                type="text"
                                value={videoData.title}
                                onChange={(e) => updateVideoUrlField(index, 'title', e.target.value)}
                                className="w-full px-3 py-2 bg-black border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#FDB813] focus:border-transparent text-sm"
                                placeholder="Video title"
                              />
                            </div>
                            <div>
                              <label className="block text-xs text-white mb-1">Date (DD-MMM-YYYY)</label>
                              <div className="relative">
                                <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                  type="text"
                                  value={videoData.date}
                                  onChange={(e) => updateVideoUrlField(index, 'date', e.target.value)}
                                  className="w-full pl-10 pr-3 py-2 bg-black border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#FDB813] focus:border-transparent text-sm"
                                  placeholder="18-Jul-2025"
                                />
                              </div>
                            </div>
                            {videoData.url && (
                              <div className="md:col-span-2">
                                <div className="aspect-video bg-black rounded overflow-hidden">
                                  <img
                                    src={getYoutubeThumbnail(videoData.url)}
                                    alt={videoData.title || `Video ${index + 1}`}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                          <label className="block text-sm text-white mb-1">Category</label>
                          <select
                            value={video.category}
                            onChange={(e) => handleUpdateVideo(video.id, 'category', e.target.value)}
                            className="w-full px-3 py-2 bg-[#1a1a1a] border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#FDB813] focus:border-transparent text-sm"
                          >
                            {GALLERY_CATEGORIES.map((cat) => (
                              <option key={cat.key} value={cat.key}>{cat.label}</option>
                            ))}
                          </select>
                        </div>
                        <div className="md:col-span-2 flex gap-2">
                          <Button
                            onClick={() => {
                              saveMultipleVideoUrls(video.id, video.category);
                            }}
                            className="flex-1 bg-[#FDB813] hover:bg-[#e5a610] text-black"
                          >
                            {videoUrls.filter(v => v.url.trim() !== '').length > 1 ? 'Add Videos' : 'Done'}
                          </Button>
                          <Button
                            onClick={() => {
                              setEditingVideoId(null);
                              setVideoUrls([{ url: '', title: '', date: '' }]);
                              // Remove the new empty video if it was just added and has no URL
                              if (!video.youtubeUrl) {
                                setVideos(videos.filter(vid => vid.id !== video.id));
                              }
                            }}
                            className="px-4 bg-[#2E2E2E] hover:bg-[#3E3E3E] text-white border border-gray-600"
                          >
                            <X size={16} className="mr-2" />
                            Cancel
                          </Button>
                        </div>
                      </div>
                      {video.youtubeUrl && (
                        <div className="aspect-video bg-[#1a1a1a] rounded overflow-hidden">
                          <img
                            src={getYoutubeThumbnail(video.youtubeUrl)}
                            alt={video.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                    </div>
                  ) : (
                    // Compact View Mode
                    <>
                      {/* Selection Checkbox */}
                      <div className="absolute top-2 left-2 z-10">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleVideoSelection(video.id);
                          }}
                          className={`p-1 rounded transition-all ${
                            selectedVideos.has(video.id)
                              ? 'bg-[#FDB813] text-black'
                              : 'bg-black/60 text-white opacity-0 group-hover:opacity-100'
                          }`}
                        >
                          {selectedVideos.has(video.id) ? (
                            <CheckSquare size={20} />
                          ) : (
                            <Square size={20} />
                          )}
                        </button>
                      </div>

                      {/* Video Thumbnail */}
                      <div className="aspect-video bg-[#1a1a1a] overflow-hidden cursor-pointer relative" onClick={() => setEditingVideoId(video.id)}>
                        {video.youtubeUrl ? (
                          <>
                            <img
                              src={getYoutubeThumbnail(video.youtubeUrl)}
                              alt={video.title}
                              className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-12 h-12 bg-black/70 rounded-full flex items-center justify-center">
                                <Video size={24} className="text-white ml-1" />
                              </div>
                            </div>
                          </>
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Video size={24} className="text-gray-600" />
                          </div>
                        )}
                      </div>

                      {/* Info Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <p className="text-xs text-white font-medium truncate mb-1">{video.title || 'Untitled'}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] text-[#FDB813] font-medium truncate flex-1">
                            {getCategoryLabel(video.category)}
                          </span>
                          <div className="flex gap-1 ml-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditingVideoId(video.id);
                              }}
                              className="p-1 bg-[#2E2E2E] text-white hover:bg-[#FDB813] hover:text-black rounded transition-colors"
                            >
                              <Edit size={12} />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteVideo(video.id);
                              }}
                              className="p-1 bg-[#2E2E2E] text-white hover:bg-red-600 rounded transition-colors"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        open={deleteDialog.open}
        onOpenChange={(open) => setDeleteDialog({ ...deleteDialog, open })}
        onConfirm={confirmDelete}
        title={deleteDialog.count > 1 ? 'Confirm Bulk Deletion' : 'Confirm Deletion'}
        description={
          deleteDialog.count > 1
            ? `Are you sure you want to delete ${deleteDialog.count} ${deleteDialog.ids.some(id => selectedImages.has(id)) ? 'images' : 'videos'}? This action cannot be undone.`
            : `Are you sure you want to delete this ${deleteDialog.type}? This action cannot be undone.`
        }
      />

      {/* Bulk Upload Modal */}
      {showBulkUpload && (
        <MultipleImageUpload
          onUploadComplete={handleBulkUploadComplete}
          onClose={() => setShowBulkUpload(false)}
          category={filterCategory === 'all' ? 'guinness-events' : filterCategory}
        />
      )}
    </div>
  );
}
