import { useState, useEffect, useMemo, useCallback } from 'react';
import { Upload, Plus, Trash2, Video as VideoIcon, Image as ImageIcon, Calendar, Loader2 } from 'lucide-react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { toast } from 'sonner';
import { accentGold } from '../../utils/theme';
import { ConfirmDialog } from './ConfirmDialog';

interface GalleryItem {
  id: number;
  category: string;
  media_type: 'image' | 'video';
  url: string;
  title: string;
  date: string;
  created_at: string;
  created_by: string;
  updated_at: string;
}

const CATEGORIES = [
  'asian-records',
  'international-star-records',
  'ingenious-record',
  'anniversary',
  'guinness-events',
  'kids-training',
  'lcm-events',
  'hallel-conferences'
];

const CATEGORY_LABELS: Record<string, string> = {
  'asian-records': 'Asian Records',
  'international-star-records': 'International Star Records',
  'ingenious-record': 'Ingenious Record',
  'anniversary': 'Anniversary',
  'guinness-events': 'Guinness Events',
  'kids-training': 'Kids Training',
  'lcm-events': 'LCM Events',
  'hallel-conferences': 'Hallel Conferences'
};

function formatDateToDisplay(isoDate: string): string {
  if (!isoDate) return '';
  try {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, '0');
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  } catch (error) {
    return '';
  }
}

interface MediaCardProps {
  item: GalleryItem;
  onDelete: (id: number) => void;
  isSelected: boolean;
  onToggleSelect: (id: number) => void;
}

function getYouTubeThumbnail(url: string): string | null {
  if (!url) return null;
  
  let videoId = "";
  
  // Handle different YouTube URL formats
  if (url.includes("youtube.com/watch?v=")) {
    videoId = url.split("v=")[1]?.split("&")[0];
  } else if (url.includes("youtu.be/")) {
    videoId = url.split("youtu.be/")[1]?.split("?")[0];
  } else if (url.includes("youtube.com/shorts/")) {
    videoId = url.split("shorts/")[1]?.split("?")[0];
  } else if (url.includes("youtube.com/live/")) {
    videoId = url.split("live/")[1]?.split("?")[0];
  } else if (url.includes("youtube.com/embed/")) {
    videoId = url.split("embed/")[1]?.split("?")[0];
  } else if (url.includes("youtube.com/v/")) {
    videoId = url.split("v/")[1]?.split("?")[0];
  }
  
  if (videoId && videoId.length === 11) {
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  }
  
  return null;
}

function MediaCard({ item, onDelete, isSelected, onToggleSelect }: MediaCardProps) {
  const renderMedia = () => {
    if (item.media_type === 'image') {
      return <img src={item.url} alt={item.title} className="w-full h-full object-cover" />;
    } else {
      // For videos, try to show YouTube thumbnail
      const thumbnail = getYouTubeThumbnail(item.url);
      if (thumbnail) {
        return (
          <div className="relative w-full h-full">
            <img src={thumbnail} alt={item.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" fill="#FF0000"/>
              </svg>
            </div>
          </div>
        );
      } else {
        return <video src={item.url} className="w-full h-full object-cover" controls={false} />;
      }
    }
  };

  return (
    <div
      className={`bg-[#2E2E2E] rounded-lg overflow-hidden hover:bg-[#3a3a3a] transition-all border-2 ${
        isSelected ? 'border-[#FDB813] shadow-lg shadow-[#FDB813]/20' : 'border-[#3a3a3a]'
      }`}
    >
      <div className="relative aspect-square bg-black">
        {renderMedia()}

        {/* Checkbox */}
        <div className="absolute top-2 left-2 z-10">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onToggleSelect(item.id)}
            className="w-5 h-5 rounded cursor-pointer accent-[#FDB813] shadow-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>

        {/* Delete Button */}
        <button
          onClick={() => onDelete(item.id)}
          className="absolute top-2 right-2 z-10 p-2 bg-red-600 hover:bg-red-700 text-white rounded transition-colors cursor-pointer shadow-lg"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      {/* Video Info - Title and Date */}
      {item.media_type === 'video' && (
        <div className="p-3 bg-black/30">
          <p className="text-sm font-medium text-white truncate mb-1">{item.title}</p>
          {item.date && (
            <div className="flex items-center gap-1 text-gray-400 text-xs">
              <Calendar className="h-3 w-3" />
              <span>{item.date}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function GalleryManager() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('asian-records');
  const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>({});
  
  // Memoize filtered items by type for performance
  const imageItems = useMemo(() => filteredItems.filter(item => item.media_type === 'image'), [filteredItems]);
  const videoItems = useMemo(() => filteredItems.filter(item => item.media_type === 'video'), [filteredItems]);

  // Upload states
  const [uploadType, setUploadType] = useState<'file' | 'url'>('file');
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [uploadCategory, setUploadCategory] = useState('asian-records');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({ isOpen: false, current: 0, total: 0 });
  
  // Video entries with individual titles and dates
  const [videoEntries, setVideoEntries] = useState<Array<{ url: string; title: string; date: string }>>([
    { url: '', title: '', date: '' }
  ]);

  // Selection state
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  
  // Memoize selection states
  const selectedImageIds = useMemo(() => 
    imageItems.filter(item => selectedIds.has(item.id)).map(item => item.id),
    [imageItems, selectedIds]
  );
  const selectedVideoIds = useMemo(() => 
    videoItems.filter(item => selectedIds.has(item.id)).map(item => item.id),
    [videoItems, selectedIds]
  );
  const allImagesSelected = useMemo(() => 
    imageItems.length > 0 && imageItems.every(item => selectedIds.has(item.id)),
    [imageItems, selectedIds]
  );
  const allVideosSelected = useMemo(() => 
    videoItems.length > 0 && videoItems.every(item => selectedIds.has(item.id)),
    [videoItems, selectedIds]
  );

  // Dialog state
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    type: 'danger' | 'warning';
  }>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {},
    type: 'warning'
  });

  const fetchCategoryCounts = async () => {
    try {
      const counts: Record<string, number> = {};
      await Promise.all(
        CATEGORIES.map(async (category) => {
          const response = await fetch(`/api/admin/gallery?category=${category}`);
          const result = await response.json();
          if (result.success) {
            counts[category] = result.data?.length || 0;
          }
        })
      );
      setCategoryCounts(counts);
    } catch (error) {
      console.error('Error fetching category counts:', error);
    }
  };

  const fetchGalleryItems = async (category?: string) => {
    try {
      const cat = category || activeCategory;
      const response = await fetch(`/api/admin/gallery?category=${cat}`);
      const result = await response.json();
      if (result.success) {
        setGalleryItems(result.data || []);
        setFilteredItems(result.data || []);
      } else {
        toast.error('Failed to fetch gallery items');
      }
    } catch (error) {
      console.error('Error fetching gallery items:', error);
      toast.error('Error fetching gallery items');
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await Promise.all([fetchGalleryItems(), fetchCategoryCounts()]);
      setIsLoading(false);
    };
    loadData();
  }, []);

  useEffect(() => {
    const loadCategoryData = async () => {
      setIsLoading(true);
      await fetchGalleryItems(activeCategory);
      setIsLoading(false);
      setSelectedIds(new Set());
    };
    loadCategoryData();
  }, [activeCategory]);

  const handleUpload = async () => {
    if (uploadType === 'file' && mediaFiles.length === 0) {
      toast.error('Please select at least one image file');
      return;
    }
    
    if (uploadType === 'url') {
      // Validate video entries
      const validEntries = videoEntries.filter(entry => entry.url.trim());
      
      if (validEntries.length === 0) {
        toast.error('Please enter at least one YouTube URL');
        return;
      }

      // Check if all valid entries have title and date
      for (let i = 0; i < validEntries.length; i++) {
        if (!validEntries[i].title.trim()) {
          toast.error(`Please enter a title for video ${i + 1}`);
          return;
        }
        if (!validEntries[i].date) {
          toast.error(`Please select a date for video ${i + 1}`);
          return;
        }
      }
    }

    setIsUploading(true);

    try {
      let response;

      if (uploadType === 'file') {
        setUploadProgress({ isOpen: true, current: 0, total: mediaFiles.length });
        const formData = new FormData();
        mediaFiles.forEach((file) => {
          formData.append('files', file);
        });
        formData.append('category', uploadCategory);
        formData.append('title', 'Untitled');
        formData.append('date', formatDateToDisplay(new Date().toISOString().split('T')[0]));

        response = await fetch('/api/admin/gallery', {
          method: 'POST',
          body: formData
        });
      } else {
        const validEntries = videoEntries.filter(entry => entry.url.trim());
        setUploadProgress({ isOpen: true, current: 0, total: validEntries.length });

        // Create items from video entries
        const items = validEntries.map((entry) => ({
          category: uploadCategory,
          media_type: 'video',
          url: entry.url.trim(),
          title: entry.title.trim(),
          date: formatDateToDisplay(entry.date)
        }));

        response = await fetch('/api/admin/gallery', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            items: items
          })
        });
      }

      const result = await response.json();

      if (result.success) {
        toast.success(result.message || `Uploaded ${result.data?.length || 0} item(s) successfully`);
        setMediaFiles([]);
        setVideoEntries([{ url: '', title: '', date: '' }]);
        const fileInput = document.getElementById('mediaFiles') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
        await Promise.all([fetchGalleryItems(), fetchCategoryCounts()]);
      } else {
        toast.error(result.error || 'Failed to upload');
      }
    } catch (error) {
      console.error('Error uploading:', error);
      toast.error('Error uploading media');
    } finally {
      setIsUploading(false);
      setUploadProgress({ isOpen: false, current: 0, total: 0 });
    }
  };

  const handleDelete = async (id: number) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Delete Item',
      message: 'Are you sure you want to delete this item? This action cannot be undone.',
      type: 'danger',
      onConfirm: async () => {
        setConfirmDialog({ ...confirmDialog, isOpen: false });
        try {
          const response = await fetch(`/api/admin/gallery?id=${id}`, {
            method: 'DELETE'
          });
          const result = await response.json();

          if (result.success) {
            toast.success('Item deleted successfully');
            setSelectedIds(new Set());
            await Promise.all([fetchGalleryItems(), fetchCategoryCounts()]);
          } else {
            toast.error(result.error || 'Failed to delete item');
          }
        } catch (error) {
          console.error('Error deleting item:', error);
          toast.error('Error deleting item');
        }
      }
    });
  };

  const handleBulkDelete = async () => {
    if (selectedIds.size === 0) {
      toast.error('No items selected');
      return;
    }

    setConfirmDialog({
      isOpen: true,
      title: 'Delete Multiple Items',
      message: `Are you sure you want to delete ${selectedIds.size} item(s)? This action cannot be undone.`,
      type: 'danger',
      onConfirm: async () => {
        setConfirmDialog({ ...confirmDialog, isOpen: false });
        try {
          const ids = Array.from(selectedIds).join(',');
          const response = await fetch(`/api/admin/gallery?ids=${ids}`, {
            method: 'DELETE'
          });
          const result = await response.json();

          if (result.success) {
            toast.success(result.message || 'Items deleted successfully');
            setSelectedIds(new Set());
            await Promise.all([fetchGalleryItems(), fetchCategoryCounts()]);
          } else {
            toast.error(result.error || 'Failed to delete items');
          }
        } catch (error) {
          console.error('Error deleting items:', error);
          toast.error('Error deleting items');
        }
      }
    });
  };

  const handleToggleSelect = (id: number) => {
    const newSelection = new Set(selectedIds);
    if (newSelection.has(id)) {
      newSelection.delete(id);
    } else {
      newSelection.add(id);
    }
    setSelectedIds(newSelection);
  };

  const handleSelectAll = () => {
    if (selectedIds.size === filteredItems.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredItems.map((item) => item.id)));
    }
  };

  const handleSelectAllImages = useCallback(() => {
    const imageIds = imageItems.map(item => item.id);
    const newSelection = new Set(selectedIds);
    
    if (allImagesSelected) {
      imageIds.forEach(id => newSelection.delete(id));
    } else {
      imageIds.forEach(id => newSelection.add(id));
    }
    setSelectedIds(newSelection);
  }, [imageItems, selectedIds, allImagesSelected]);

  const handleSelectAllVideos = useCallback(() => {
    const videoIds = videoItems.map(item => item.id);
    const newSelection = new Set(selectedIds);
    
    if (allVideosSelected) {
      videoIds.forEach(id => newSelection.delete(id));
    } else {
      videoIds.forEach(id => newSelection.add(id));
    }
    setSelectedIds(newSelection);
  }, [videoItems, selectedIds, allVideosSelected]);

  const handleBulkDeleteImages = useCallback(() => {
    if (selectedImageIds.length === 0) {
      toast.error('No images selected');
      return;
    }

    setConfirmDialog({
      isOpen: true,
      title: 'Delete Selected Images',
      message: `Are you sure you want to delete ${selectedImageIds.length} image(s)? This action cannot be undone.`,
      type: 'danger',
      onConfirm: async () => {
        setConfirmDialog({ ...confirmDialog, isOpen: false });
        try {
          const ids = selectedImageIds.join(',');
          const response = await fetch(`/api/admin/gallery?ids=${ids}`, {
            method: 'DELETE'
          });
          const result = await response.json();

          if (result.success) {
            toast.success(result.message || 'Images deleted successfully');
            const newSelection = new Set(selectedIds);
            selectedImageIds.forEach(id => newSelection.delete(id));
            setSelectedIds(newSelection);
            await Promise.all([fetchGalleryItems(), fetchCategoryCounts()]);
          } else {
            toast.error(result.error || 'Failed to delete images');
          }
        } catch (error) {
          console.error('Error deleting images:', error);
          toast.error('Error deleting images');
        }
      }
    });
  }, [selectedImageIds, confirmDialog]);

  const handleBulkDeleteVideos = useCallback(() => {
    if (selectedVideoIds.length === 0) {
      toast.error('No videos selected');
      return;
    }

    setConfirmDialog({
      isOpen: true,
      title: 'Delete Selected Videos',
      message: `Are you sure you want to delete ${selectedVideoIds.length} video(s)? This action cannot be undone.`,
      type: 'danger',
      onConfirm: async () => {
        setConfirmDialog({ ...confirmDialog, isOpen: false });
        try {
          const ids = selectedVideoIds.join(',');
          const response = await fetch(`/api/admin/gallery?ids=${ids}`, {
            method: 'DELETE'
          });
          const result = await response.json();

          if (result.success) {
            toast.success(result.message || 'Videos deleted successfully');
            const newSelection = new Set(selectedIds);
            selectedVideoIds.forEach(id => newSelection.delete(id));
            setSelectedIds(newSelection);
            await Promise.all([fetchGalleryItems(), fetchCategoryCounts()]);
          } else {
            toast.error(result.error || 'Failed to delete videos');
          }
        } catch (error) {
          console.error('Error deleting videos:', error);
          toast.error('Error deleting videos');
        }
      }
    });
  }, [selectedVideoIds, confirmDialog]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64 bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: accentGold }}></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6 bg-black min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white">Gallery Manager</h1>
        <p className="text-gray-400 text-sm mt-1">Manage images and videos for the gallery page</p>
      </div>

      {/* Upload Section */}
      <div className="bg-[#2E2E2E] rounded-lg p-6 border border-[#3a3a3a]">
        <div className="flex items-center gap-2 mb-6">
          <Upload className="h-6 w-6" style={{ color: accentGold }} />
          <h2 className="text-2xl font-bold text-white">Upload Media</h2>
        </div>

        <div className="bg-black rounded-lg p-6 border border-[#3a3a3a]">
          {/* Upload Type Tabs */}
          <div className="flex border-b border-[#3a3a3a] mb-6">
            <button
              onClick={() => setUploadType('file')}
              className={`px-4 py-2 flex items-center gap-2 transition-all cursor-pointer border-b-2 text-sm ${
                uploadType === 'file'
                  ? 'border-[#FDB813] text-[#FDB813] font-medium'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              <Upload className="h-4 w-4" />
              Upload Image File(s)
            </button>
            <button
              onClick={() => setUploadType('url')}
              className={`px-4 py-2 flex items-center gap-2 transition-all cursor-pointer border-b-2 text-sm ${
                uploadType === 'url'
                  ? 'border-[#FDB813] text-[#FDB813] font-medium'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              <Plus className="h-4 w-4" />
              Add Youtube URLs
            </button>
          </div>

          {/* Upload Form */}
          <div className="space-y-4">
            {/* Category */}
            <div>
              <Label htmlFor="uploadCategory" className="text-white mb-2 block">
                Category *
              </Label>
              <select
                id="uploadCategory"
                value={uploadCategory}
                onChange={(e) => setUploadCategory(e.target.value)}
                className="w-full bg-[#2E2E2E] text-white border border-[#3a3a3a] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FDB813]"
              >
                {CATEGORIES.filter((c) => c !== 'all').map((cat) => (
                  <option key={cat} value={cat}>
                    {CATEGORY_LABELS[cat]}
                  </option>
                ))}
              </select>
            </div>

            {/* File or URL Input */}
            {uploadType === 'file' ? (
              <div>
                <Label htmlFor="mediaFiles" className="text-white mb-2 block">
                  Media Files (Images) *
                </Label>
                <div className="flex items-stretch bg-[#2E2E2E] border border-[#3a3a3a] rounded-md overflow-hidden">
                  <label
                    htmlFor="mediaFiles"
                    className="bg-[#FDB813] text-black px-4 py-2 cursor-pointer hover:bg-[#e5a610] transition-colors whitespace-nowrap flex items-center font-semibold"
                  >
                    Choose Files
                  </label>
                  <span className="text-white px-2 flex items-center">:</span>
                  <span className="text-white px-3 flex-1 flex items-center truncate">
                    {mediaFiles.length > 0 ? `${mediaFiles.length} file(s) selected` : 'No files chosen'}
                  </span>
                  <Input
                    id="mediaFiles"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => setMediaFiles(Array.from(e.target.files || []))}
                    className="hidden"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <Label className="text-white mb-2 block">YouTube Videos *</Label>
                {videoEntries.map((entry, index) => (
                  <div key={index} className="p-4 bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg space-y-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-[#FDB813]">Video {index + 1}</span>
                      {videoEntries.length > 1 && (
                        <button
                          onClick={() => setVideoEntries(videoEntries.filter((_, i) => i !== index))}
                          className="text-red-500 hover:text-red-400 text-sm"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    <div>
                      <Label className="text-white text-sm mb-1 block">YouTube URL *</Label>
                      <Input
                        type="text"
                        value={entry.url}
                        onChange={(e) => {
                          const newEntries = [...videoEntries];
                          newEntries[index].url = e.target.value;
                          setVideoEntries(newEntries);
                        }}
                        placeholder="https://www.youtube.com/watch?v=VIDEO_ID"
                        className="bg-[#2E2E2E] text-white border-[#3a3a3a] focus:ring-[#FDB813] font-mono text-sm"
                      />
                    </div>
                    <div>
                      <Label className="text-white text-sm mb-1 block">Title *</Label>
                      <Input
                        type="text"
                        value={entry.title}
                        onChange={(e) => {
                          const newEntries = [...videoEntries];
                          newEntries[index].title = e.target.value;
                          setVideoEntries(newEntries);
                        }}
                        placeholder="Enter video title"
                        className="bg-[#2E2E2E] text-white border-[#3a3a3a] focus:ring-[#FDB813]"
                      />
                    </div>
                    <div>
                      <Label className="text-white text-sm mb-1 block">Date *</Label>
                      <Input
                        type="date"
                        value={entry.date}
                        onChange={(e) => {
                          const newEntries = [...videoEntries];
                          newEntries[index].date = e.target.value;
                          setVideoEntries(newEntries);
                        }}
                        className="bg-[#2E2E2E] text-white border-[#3a3a3a] focus:ring-[#FDB813]"
                      />
                    </div>
                  </div>
                ))}
                <button
                  onClick={() => setVideoEntries([...videoEntries, { url: '', title: '', date: '' }])}
                  className="px-4 py-2 bg-[#2E2E2E] text-white border border-[#3a3a3a] hover:bg-[#3a3a3a] rounded transition-all cursor-pointer flex items-center gap-2 text-sm"
                >
                  <Plus className="h-4 w-4" />
                  Add Another Video
                </button>
              </div>
            )}

            {/* Upload Button */}
            <button
              onClick={handleUpload}
              disabled={isUploading}
              className="px-6 py-2 rounded font-medium text-black transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 flex items-center gap-2"
              style={{ backgroundColor: accentGold }}
            >
              {isUploading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4" />
                  Upload Media
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Gallery Items Section */}
      <div className="bg-[#2E2E2E] rounded-lg p-6 border border-[#3a3a3a]">
        <div className="flex items-center gap-2 mb-6">
          <ImageIcon className="h-6 w-6" style={{ color: accentGold }} />
          <h2 className="text-2xl font-bold text-white">{CATEGORY_LABELS[activeCategory]}</h2>
          <span className="text-sm text-gray-400 ml-2">
            ({filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'})
          </span>
        </div>

        {/* Category Filter List */}
        <div className="mb-6">
          <Label className="text-white mb-3 block text-sm font-medium">Select Category</Label>
          <select
            value={activeCategory}
            onChange={(e) => setActiveCategory(e.target.value)}
            className="w-full max-w-md bg-[#1a1a1a] text-white border-2 border-[#4a4a4a] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FDB813] focus:border-[#FDB813] cursor-pointer text-base font-medium hover:border-[#FDB813] transition-all"
          >
            {CATEGORIES.map((category) => (
              <option key={category} value={category} className="bg-[#1a1a1a] text-white py-2">
                {CATEGORY_LABELS[category]}
              </option>
            ))}
          </select>
        </div>

        {/* Gallery Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-12 bg-black rounded-lg border border-[#3a3a3a]">
            <ImageIcon className="h-16 w-16 mx-auto mb-4 text-gray-600" />
            <p className="text-gray-400 text-lg">No items found in this category</p>
            <p className="text-gray-500 text-sm mt-2">Upload some media to get started!</p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Images Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <ImageIcon className="h-5 w-5 text-[#FDB813]" />
                  <h3 className="text-xl font-bold text-white">
                    Images ({imageItems.length})
                  </h3>
                </div>
                {imageItems.length > 0 && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleSelectAllImages}
                      className="px-4 py-2 bg-[#FDB813] text-black border-2 border-[#FDB813] hover:bg-[#e5a510] font-semibold rounded transition-all cursor-pointer text-sm"
                    >
                      {allImagesSelected ? 'Deselect All' : 'Select All'}
                    </button>
                    {selectedImageIds.length > 0 && (
                      <button
                        onClick={handleBulkDeleteImages}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition-all cursor-pointer flex items-center gap-2 text-sm"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete Selected ({selectedImageIds.length})
                      </button>
                    )}
                  </div>
                )}
              </div>
              {imageItems.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {imageItems.map((item) => (
                    <MediaCard
                      key={item.id}
                      item={item}
                      onDelete={handleDelete}
                      isSelected={selectedIds.has(item.id)}
                      onToggleSelect={handleToggleSelect}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-black rounded-lg border border-[#3a3a3a]">
                  <ImageIcon className="h-12 w-12 mx-auto mb-3 text-gray-600" />
                  <p className="text-gray-400">No existing images</p>
                </div>
              )}
            </div>

            {/* Separator */}
            <div className="border-t-2 border-[#FDB813] my-8"></div>

            {/* Videos Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <VideoIcon className="h-5 w-5 text-[#FDB813]" />
                  <h3 className="text-xl font-bold text-white">
                    Videos ({videoItems.length})
                  </h3>
                </div>
                {videoItems.length > 0 && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleSelectAllVideos}
                      className="px-4 py-2 bg-[#FDB813] text-black border-2 border-[#FDB813] hover:bg-[#e5a510] font-semibold rounded transition-all cursor-pointer text-sm"
                    >
                      {allVideosSelected ? 'Deselect All' : 'Select All'}
                    </button>
                    {selectedVideoIds.length > 0 && (
                      <button
                        onClick={handleBulkDeleteVideos}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition-all cursor-pointer flex items-center gap-2 text-sm"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete Selected ({selectedVideoIds.length})
                      </button>
                    )}
                  </div>
                )}
              </div>
              {videoItems.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {videoItems.map((item) => (
                    <MediaCard
                      key={item.id}
                      item={item}
                      onDelete={handleDelete}
                      isSelected={selectedIds.has(item.id)}
                      onToggleSelect={handleToggleSelect}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-black rounded-lg border border-[#3a3a3a]">
                  <VideoIcon className="h-12 w-12 mx-auto mb-3 text-gray-600" />
                  <p className="text-gray-400">No existing videos</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Upload Progress Modal */}
      {uploadProgress.isOpen && (
        <div className="fixed inset-0 bg-[#2a2a2a]/95 flex items-center justify-center z-50">
          <div className="bg-[#3a3a3a] rounded-lg p-8 max-w-md w-full mx-4 border-2 border-[#FDB813]">
            <div className="flex flex-col items-center">
              <Loader2 className="h-12 w-12 animate-spin mb-4" style={{ color: accentGold }} />
              <h3 className="text-xl font-bold text-white mb-2">Uploading Media</h3>
              <p className="text-gray-400 text-sm mb-6">Please wait while we upload your files...</p>
              <div className="w-full bg-[#2E2E2E] rounded-full h-2 mb-4">
                <div
                  className="h-2 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: accentGold,
                    width:
                      uploadProgress.total > 0 ? `${(uploadProgress.current / uploadProgress.total) * 100}%` : '0%'
                  }}
                />
              </div>
              <p className="text-sm text-gray-300">
                {uploadProgress.current} of {uploadProgress.total} completed
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Dialog */}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title={confirmDialog.title}
        message={confirmDialog.message}
        type={confirmDialog.type}
        onConfirm={confirmDialog.onConfirm}
        onCancel={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
      />
    </div>
  );
}
