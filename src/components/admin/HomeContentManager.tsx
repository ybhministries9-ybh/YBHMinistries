import { useState, useEffect } from 'react';
import { Upload, Plus, Trash2, Video as VideoIcon, Image as ImageIcon, GripVertical, X, Save, Loader2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { toast } from 'sonner';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, rectSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { accentGold } from '../../utils/theme';
import { ConfirmDialog } from './ConfirmDialog';

interface HeroImage {
  id: number;
  image_url: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
}

interface HomeVideo {
  id: number;
  video_url: string | null; // Nullable to allow video-only deletion
  thumbnail_image_url: string | null;
  is_active: boolean;
  created_at: string;
}

// Helper to include Authorization header when available
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

function SortableImageCard({ image, onDelete, isSelected, onToggleSelect }: { 
  image: HeroImage;
  onDelete: (id: number) => void;
  isSelected: boolean;
  onToggleSelect: (id: number) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: image.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-[#2E2E2E] rounded-lg overflow-hidden hover:bg-[#3a3a3a] transition-all border-2 ${
        isSelected ? 'border-[#FDB813] shadow-lg shadow-[#FDB813]/20' : 'border-[#3a3a3a]'
      } ${isDragging ? 'shadow-2xl scale-105' : ''}`}
    >
      {/* Image */}
      <div className="relative aspect-video bg-black">
        <img 
          src={image.image_url} 
          alt="Hero image" 
          className="w-full h-full object-cover"
        />
        
        {/* Drag Handle Overlay */}
        <div
          {...attributes}
          {...listeners}
          className="absolute inset-0 cursor-grab active:cursor-grabbing bg-black/0 hover:bg-black/20 transition-colors flex items-center justify-center group"
        >
          <GripVertical className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" />
        </div>

        {/* Checkbox */}
        <div className="absolute top-2 left-2 z-10">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onToggleSelect(image.id)}
            className="w-5 h-5 rounded cursor-pointer accent-[#FDB813] shadow-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>

        {/* Delete Button */}
        <button
          onClick={() => onDelete(image.id)}
          className="absolute top-2 right-2 z-10 p-2 bg-red-600 hover:bg-red-700 text-white rounded transition-colors cursor-pointer shadow-lg"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      {/* Info Bar */}
      <div className="p-3 flex items-center justify-between bg-black/30">
        <div>
          <p className="text-sm font-medium text-white">Image #{image.display_order}</p>
          <p className="text-xs text-gray-500">ID: {image.id}</p>
        </div>
        <div className="text-xs text-gray-400">
          {new Date(image.created_at).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}

export function HomeContentManager() {
  const [heroImages, setHeroImages] = useState<HeroImage[]>([]);
  const [homeVideo, setHomeVideo] = useState<HomeVideo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Hero Image Upload State
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [isUploadingImages, setIsUploadingImages] = useState(false);
  
  // Selection State for bulk delete
  const [selectedImageIds, setSelectedImageIds] = useState<Set<number>>(new Set());
  
  // Dialog State
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
  
  // Video Upload State
  const [videoUploadType, setVideoUploadType] = useState<'file' | 'url'>('file');
  const [thumbnailUploadType, setThumbnailUploadType] = useState<'file' | 'url'>('file');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [videoThumbnailUrl, setVideoThumbnailUrl] = useState('');
  const [isUploadingVideo, setIsUploadingVideo] = useState(false);
  const [isUploadingThumbnail, setIsUploadingThumbnail] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Fetch hero images
  const fetchHeroImages = async () => {
    try {
      const response = await fetch('/api/admin/home/hero-images');
      const result = await response.json();
      if (result.success) {
        setHeroImages(result.data || []);
      } else {
        toast.error('Failed to fetch hero images');
      }
    } catch (error) {
      console.error('Error fetching hero images:', error);
      toast.error('Error fetching hero images');
    }
  };

  // Fetch home video
  const fetchHomeVideo = async () => {
    try {
      const response = await fetch('/api/admin/home/video');
      const result = await response.json();
      if (result.success && result.data) {
        setHomeVideo(result.data);
      }
    } catch (error) {
      console.error('Error fetching home video:', error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await Promise.all([fetchHeroImages(), fetchHomeVideo()]);
      setIsLoading(false);
    };
    loadData();
  }, []);

  // Upload hero images
  const handleUploadImages = async () => {
    if (imageFiles.length === 0) {
      toast.error('Please select at least one image file');
      return;
    }

    setIsUploadingImages(true);
    try {
      const formData = new FormData();
      imageFiles.forEach(file => {
        formData.append('files', file);
      });

      const response = await fetch('/api/admin/home/hero-images', {
        method: 'POST',
        body: formData,
        headers: getAuthHeaders() // FormData: helper will not set Content-Type so browser sets boundary
      });

      const result = await response.json();
      
      if (result.success) {
        toast.success(`Uploaded ${result.data.length} image(s) successfully`);
        setImageFiles([]);
        await fetchHeroImages();
      } else {
        toast.error(result.error || 'Failed to upload images');
      }
    } catch (error) {
      console.error('Error uploading images:', error);
      toast.error('Error uploading images');
    } finally {
      setIsUploadingImages(false);
    }
  };

  // Delete hero image
  const handleDeleteImage = async (id: number) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Delete Image',
      message: 'Are you sure you want to delete this image? This action cannot be undone.',
      type: 'danger',
      onConfirm: async () => {
        setConfirmDialog({ ...confirmDialog, isOpen: false });
        try {
          const response = await fetch(`/api/admin/home/hero-images?id=${id}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
          });
      

          const result = await response.json();
          
          if (result.success) {
            toast.success('Image deleted successfully');
            setSelectedImageIds(new Set()); // Clear selection
            await fetchHeroImages();
          } else {
            toast.error(result.error || 'Failed to delete image');
          }
        } catch (error) {
          console.error('Error deleting image:', error);
          toast.error('Error deleting image');
        }
      }
    });
  };

  // Bulk delete images
  const handleBulkDelete = async () => {
    if (selectedImageIds.size === 0) {
      toast.error('No images selected');
      return;
    }

    setConfirmDialog({
      isOpen: true,
      title: 'Delete Multiple Images',
      message: `Are you sure you want to delete ${selectedImageIds.size} image(s)? This action cannot be undone.`,
      type: 'danger',
      onConfirm: async () => {
        setConfirmDialog({ ...confirmDialog, isOpen: false });
        try {
          const ids = Array.from(selectedImageIds).join(',');
          const response = await fetch(`/api/admin/home/hero-images?ids=${ids}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
          });

          const result = await response.json();
          
          if (result.success) {
            toast.success(result.message || 'Images deleted successfully');
            setSelectedImageIds(new Set()); // Clear selection
            await fetchHeroImages();
          } else {
            toast.error(result.error || 'Failed to delete images');
          }
        } catch (error) {
          console.error('Error deleting images:', error);
          toast.error('Error deleting images');
        }
      }
    });
  };

  // Toggle image selection
  const handleToggleSelect = (id: number) => {
    const newSelection = new Set(selectedImageIds);
    if (newSelection.has(id)) {
      newSelection.delete(id);
    } else {
      newSelection.add(id);
    }
    setSelectedImageIds(newSelection);
  };

  // Select all images
  const handleSelectAll = () => {
    if (selectedImageIds.size === heroImages.length) {
      setSelectedImageIds(new Set()); // Deselect all
    } else {
      setSelectedImageIds(new Set(heroImages.map(img => img.id))); // Select all
    }
  };

  // Reorder hero images
  const handleDragEnd = async (event: any) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = heroImages.findIndex(img => img.id === active.id);
    const newIndex = heroImages.findIndex(img => img.id === over.id);

    const newImages = arrayMove(heroImages, oldIndex, newIndex);
    setHeroImages(newImages);

    // Update display order in database
    try {
      const updates = newImages.map((img, index) => ({
        id: img.id,
        display_order: index + 1,
      }));

      const response = await fetch('/api/admin/home/hero-images', {
        method: 'PATCH',
        headers: getAuthHeaders('application/json'),
        body: JSON.stringify({ action: 'reorder', images: updates }),
      });

      const result = await response.json();
      
      if (!result.success) {
        toast.error('Failed to update image order');
        await fetchHeroImages(); // Revert on error
      } else {
        toast.success('Image order updated');
      }
    } catch (error) {
      console.error('Error updating image order:', error);
      toast.error('Error updating image order');
      await fetchHeroImages(); // Revert on error
    }
  };

  // Upload video only
  const handleUploadVideo = async () => {
    // Validate inputs
    if (videoUploadType === 'file' && !videoFile) {
      toast.error('Please select a video file');
      return;
    }
    if (videoUploadType === 'url' && !videoUrl.trim()) {
      toast.error('Please enter a video URL');
      return;
    }

    // Check file size (Vercel Blob has limits)
    if (videoUploadType === 'file' && videoFile) {
      const maxSize = 500 * 1024 * 1024; // 500MB limit
      if (videoFile.size > maxSize) {
        toast.error('Video file is too large. Maximum size is 500MB. Please compress your video or use a URL instead.');
        return;
      }
    }

    setIsUploadingVideo(true);
    try {
      let response;
      
      if (videoUploadType === 'file') {
        const formData = new FormData();
        formData.append('file', videoFile);
        // Don't include thumbnail here - it has its own upload

        response = await fetch('/api/admin/home/video', {
          method: 'POST',
          body: formData,
          headers: getAuthHeaders() // FormData - let browser set Content-Type
        });
      } else {
        response = await fetch('/api/admin/home/video', {
          method: 'POST',
          headers: getAuthHeaders('application/json'),
          body: JSON.stringify({ video_url: videoUrl }),
        });
      }

      const result = await response.json();
      
      if (result.success) {
        toast.success(result.message || 'Video uploaded successfully');
        setVideoFile(null);
        setVideoUrl('');
        await fetchHomeVideo();
      } else {
        toast.error(result.error || 'Failed to upload video');
      }
    } catch (error) {
      console.error('Error uploading video:', error);
      toast.error(error instanceof Error ? error.message : 'Error uploading video');
    } finally {
      setIsUploadingVideo(false);
    }
  };

  // Upload thumbnail only
  const handleUploadThumbnail = async () => {
    if (!homeVideo) {
      toast.error('Please upload a video first');
      return;
    }

    // Validate inputs
    if (thumbnailUploadType === 'file' && !thumbnailFile) {
      toast.error('Please select a thumbnail image');
      return;
    }
    if (thumbnailUploadType === 'url' && !videoThumbnailUrl.trim()) {
      toast.error('Please enter a thumbnail URL');
      return;
    }

    setIsUploadingThumbnail(true);
    try {
      const response = await fetch(`/api/admin/home/video/thumbnail?id=${homeVideo.id}`, {
        method: 'PUT',
        headers: getAuthHeaders('application/json'),
        body: JSON.stringify({
          thumbnail_image_url: thumbnailUploadType === 'file' 
            ? await uploadThumbnailToBlob(thumbnailFile!)
            : videoThumbnailUrl,
        }),
      });

      const result = await response.json();
      
      if (result.success) {
        toast.success('Thumbnail uploaded successfully');
        setThumbnailFile(null);
        setVideoThumbnailUrl('');
        await fetchHomeVideo();
      } else {
        toast.error(result.error || 'Failed to upload thumbnail');
      }
    } catch (error) {
      console.error('Error uploading thumbnail:', error);
      toast.error('Error uploading thumbnail');
    } finally {
      setIsUploadingThumbnail(false);
    }
  };

  // Helper function to upload thumbnail to blob
  const uploadThumbnailToBlob = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await fetch('/api/admin/upload/thumbnail', {
      method: 'POST',
      body: formData,
      headers: getAuthHeaders() // FormData upload - include auth
    });
    
    const result = await response.json();
    if (!result.success) {
      throw new Error('Failed to upload thumbnail');
    }
    return result.url;
  };

  // Delete thumbnail only
  const handleDeleteThumbnail = async () => {
    if (!homeVideo) return;

    setConfirmDialog({
      isOpen: true,
      title: 'Delete Thumbnail',
      message: 'Are you sure you want to delete the thumbnail image?',
      type: 'warning',
      onConfirm: async () => {
        setConfirmDialog({ ...confirmDialog, isOpen: false });
        try {
          const response = await fetch(`/api/admin/home/video/thumbnail?id=${homeVideo.id}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
          });

          const result = await response.json();
          
          if (result.success) {
            toast.success('Thumbnail deleted successfully');
            await fetchHomeVideo();
          } else {
            toast.error(result.error || 'Failed to delete thumbnail');
          }
        } catch (error) {
          console.error('Error deleting thumbnail:', error);
          toast.error('Error deleting thumbnail');
        }
      }
    });
  };

  // Delete video
  const handleDeleteVideo = async () => {
    if (!homeVideo) return;

    setConfirmDialog({
      isOpen: true,
      title: 'Delete Video',
      message: 'Are you sure you want to delete this video? This action cannot be undone.',
      type: 'danger',
      onConfirm: async () => {
        setConfirmDialog({ ...confirmDialog, isOpen: false });
        try {
          const response = await fetch(`/api/admin/home/video?id=${homeVideo.id}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
          });

          const result = await response.json();
          
          if (result.success) {
            toast.success('Video deleted successfully');
            // Clear the file input fields
            setVideoFile(null);
            setVideoUrl('');
            // Reset the file input element
            const videoFileInput = document.getElementById('videoFile') as HTMLInputElement;
            if (videoFileInput) videoFileInput.value = '';
            
            // Refetch the video data to get updated state (thumbnail may still exist)
            await fetchHomeVideo();
          } else {
            toast.error(result.error || 'Failed to delete video');
          }
        } catch (error) {
          console.error('Error deleting video:', error);
          toast.error('Error deleting video');
        }
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64 bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: accentGold }}></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6 bg-black min-h-screen">
      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white">Home Page Manager</h1>
        <p className="text-gray-400 text-sm mt-1">Manage hero images and video for the home page</p>
      </div>

      {/* Hero Images Section */}
      <div className="bg-[#2E2E2E] rounded-lg p-6 border border-[#3a3a3a]">
        <div className="flex items-center gap-2 mb-6">
          <ImageIcon className="h-6 w-6" style={{ color: accentGold }} />
          <h2 className="text-2xl font-bold text-white">Hero Images</h2>
          <span className="text-sm text-gray-400 ml-2">({heroImages.length} images)</span>
        </div>

        {/* Upload Form */}
        <div className="bg-black rounded-lg p-6 mb-6 border border-[#3a3a3a]">
          <h3 className="text-lg font-semibold mb-4 text-white">Upload New Images</h3>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="imageFiles" className="text-white mb-2 block">Image Files (Multiple)</Label>
              <div className="flex items-stretch bg-[#2E2E2E] border border-[#3a3a3a] rounded-md overflow-hidden">
                <label htmlFor="imageFiles" className="bg-[#FDB813] text-black px-4 py-2 cursor-pointer hover:bg-[#e5a610] transition-colors whitespace-nowrap flex items-center font-semibold">
                  Choose Files
                </label>
                <span className="text-white px-2 flex items-center">:</span>
                <span className="text-white px-3 flex-1 flex items-center truncate">
                  {imageFiles.length > 0 ? `${imageFiles.length} file(s) selected` : 'No file chosen'}
                </span>
                <Input
                  id="imageFiles"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => setImageFiles(Array.from(e.target.files || []))}
                  className="hidden"
                />
              </div>
            </div>
          </div>

          <button
            onClick={handleUploadImages}
            disabled={isUploadingImages || imageFiles.length === 0}
            className="mt-4 px-6 py-2 rounded font-medium text-black transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 flex items-center gap-2"
            style={{ backgroundColor: accentGold }}
          >
            {isUploadingImages ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Uploading Images...
              </>
            ) : (
              'Upload Images'
            )}
          </button>
        </div>

        {/* Images List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Current Images (Drag to Reorder)</h3>
            {heroImages.length > 0 && (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSelectAll}
                  className="px-4 py-2 bg-[#2E2E2E] text-white border border-[#3a3a3a] hover:bg-[#3a3a3a] rounded transition-all cursor-pointer"
                >
                  {selectedImageIds.size === heroImages.length ? 'Deselect All' : 'Select All'}
                </button>
                {selectedImageIds.size > 0 && (
                  <button
                    onClick={handleBulkDelete}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition-all cursor-pointer flex items-center gap-2"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete Selected ({selectedImageIds.size})
                  </button>
                )}
              </div>
            )}
          </div>
          
          {heroImages.length === 0 ? (
            <p className="text-gray-400 text-center py-8 bg-black rounded-lg border border-[#3a3a3a]">No hero images yet. Upload some above!</p>
          ) : (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={heroImages.map(img => img.id)}
                strategy={rectSortingStrategy}
              >
                <div className="grid grid-cols-4 gap-4">
                  {heroImages.map((image) => (
                    <SortableImageCard
                      key={image.id}
                      image={image}
                      onDelete={handleDeleteImage}
                      isSelected={selectedImageIds.has(image.id)}
                      onToggleSelect={handleToggleSelect}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          )}
        </div>
      </div>

      {/* Video Section */}
      <div className="bg-[#2E2E2E] rounded-lg p-6 border border-[#3a3a3a]">
        <div className="flex items-center gap-2 mb-6">
          <VideoIcon className="h-6 w-6" style={{ color: accentGold }} />
          <h2 className="text-2xl font-bold text-white">Home Video</h2>
        </div>

        {/* Current Video & Thumbnail - Side by Side */}
        {homeVideo && (
          <div className="bg-black rounded-lg p-6 mb-6 border border-[#3a3a3a]">
            <h3 className="text-lg font-semibold text-white mb-4">Current Content</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Video Player */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-white mb-3">Video</h4>
                {homeVideo.video_url ? (
                  <div className="relative group">
                    <video
                      src={homeVideo.video_url}
                      poster={homeVideo.thumbnail_image_url || undefined}
                      controls
                      className="w-full rounded-lg border border-[#3a3a3a]"
                    />
                    <button
                      onClick={handleDeleteVideo}
                      className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:bg-red-600"
                      title="Delete video"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <div className="w-full aspect-video flex flex-col items-center justify-center bg-[#2E2E2E] rounded-lg border border-[#3a3a3a]">
                    <VideoIcon className="h-12 w-12 text-gray-600 mb-2" />
                    <p className="text-gray-500 text-sm">No video uploaded</p>
                  </div>
                )}
              </div>
              
              {/* Thumbnail Preview */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-white mb-3">Thumbnail Image</h4>
                {homeVideo.thumbnail_image_url ? (
                  <div className="relative group">
                    <img
                      src={homeVideo.thumbnail_image_url}
                      alt="Video thumbnail"
                      className="w-full rounded-lg border border-[#3a3a3a] object-cover aspect-video"
                    />
                    <button
                      onClick={handleDeleteThumbnail}
                      className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:bg-red-600"
                      title="Delete thumbnail"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <div className="w-full aspect-video flex items-center justify-center bg-[#2E2E2E] rounded-lg border border-[#3a3a3a]">
                    <p className="text-gray-500 text-sm">No thumbnail available</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Upload Forms - Separated */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Video Upload Section */}
          <div className="bg-black rounded-lg p-6 border border-[#3a3a3a]">
            <h3 className="text-lg font-semibold mb-4 text-white">
              {homeVideo ? 'Replace Video' : 'Upload Video'}
            </h3>
            
            {/* Tab-style selector for Video */}
            <div className="flex border-b border-[#3a3a3a] mb-4">
              <button
                onClick={() => setVideoUploadType('file')}
                className={`px-4 py-2 flex items-center gap-2 transition-all cursor-pointer border-b-2 text-sm ${
                  videoUploadType === 'file'
                    ? 'border-[#FDB813] text-[#FDB813] font-medium'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                <Upload className="h-4 w-4" />
                Upload File
              </button>
              <button
                onClick={() => setVideoUploadType('url')}
                className={`px-4 py-2 flex items-center gap-2 transition-all cursor-pointer border-b-2 text-sm ${
                  videoUploadType === 'url'
                    ? 'border-[#FDB813] text-[#FDB813] font-medium'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                <Plus className="h-4 w-4" />
                Add URL
              </button>
            </div>

            {videoUploadType === 'file' && (
              <div className="mb-4 p-2 bg-yellow-900/20 border border-yellow-700/50 rounded text-xs">
                <span className="text-white"><strong>Note:</strong> Max 500MB. Use URL for larger files.</span>
              </div>
            )}

            {videoUploadType === 'file' ? (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="videoFile" className="text-white mb-2 block text-sm">Video File</Label>
                  <div className="flex items-stretch bg-[#2E2E2E] border border-[#3a3a3a] rounded-md overflow-hidden">
                    <label htmlFor="videoFile" className="bg-[#FDB813] text-black px-4 py-2 cursor-pointer hover:bg-[#e5a610] transition-colors whitespace-nowrap flex items-center font-semibold">
                      Choose File
                    </label>
                    <span className="text-white px-2 flex items-center">:</span>
                    <span className="text-white px-3 flex-1 flex items-center truncate">
                      {videoFile ? videoFile.name : 'No file chosen'}
                    </span>
                    <Input
                      id="videoFile"
                      type="file"
                      accept="video/*"
                      onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
                      className="hidden"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="videoUrl" className="text-white mb-2 block text-sm">Video URL</Label>
                  <Input
                    id="videoUrl"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    placeholder="https://example.com/video.mp4"
                    className="bg-[#2E2E2E] border-[#3a3a3a] text-white placeholder:text-gray-500"
                  />
                </div>
              </div>
            )}

            <button
              onClick={handleUploadVideo}
              disabled={isUploadingVideo || (videoUploadType === 'file' && !videoFile) || (videoUploadType === 'url' && !videoUrl.trim())}
              className="mt-4 w-full px-6 py-2 rounded font-medium text-black transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 flex items-center justify-center gap-2"
              style={{ backgroundColor: accentGold }}
            >
              {isUploadingVideo ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                'Upload Video'
              )}
            </button>
          </div>

          {/* Thumbnail Upload Section */}
          <div className="bg-black rounded-lg p-6 border border-[#3a3a3a]">
            <h3 className="text-lg font-semibold mb-4 text-white">
              {homeVideo?.thumbnail_image_url ? 'Replace Thumbnail' : 'Upload Thumbnail'}
            </h3>
            
            {/* Tab-style selector for Thumbnail */}
            <div className="flex border-b border-[#3a3a3a] mb-4">
              <button
                onClick={() => setThumbnailUploadType('file')}
                className={`px-4 py-2 flex items-center gap-2 transition-all cursor-pointer border-b-2 text-sm ${
                  thumbnailUploadType === 'file'
                    ? 'border-[#FDB813] text-[#FDB813] font-medium'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                <Upload className="h-4 w-4" />
                Upload File
              </button>
              <button
                onClick={() => setThumbnailUploadType('url')}
                className={`px-4 py-2 flex items-center gap-2 transition-all cursor-pointer border-b-2 text-sm ${
                  thumbnailUploadType === 'url'
                    ? 'border-[#FDB813] text-[#FDB813] font-medium'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                <Plus className="h-4 w-4" />
                Add URL
              </button>
            </div>

            {thumbnailUploadType === 'file' ? (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="thumbnailFileOnly" className="text-white mb-2 block text-sm">Thumbnail Image</Label>
                  <div className="flex items-stretch bg-[#2E2E2E] border border-[#3a3a3a] rounded-md overflow-hidden">
                    <label htmlFor="thumbnailFileOnly" className="bg-[#FDB813] text-black px-4 py-2 cursor-pointer hover:bg-[#e5a610] transition-colors whitespace-nowrap flex items-center font-semibold">
                      Choose File
                    </label>
                    <span className="text-white px-2 flex items-center">:</span>
                    <span className="text-white px-3 flex-1 flex items-center truncate">
                      {thumbnailFile ? thumbnailFile.name : 'No file chosen'}
                    </span>
                    <Input
                      id="thumbnailFileOnly"
                      type="file"
                      accept="image/*"
                      onChange={(e) => setThumbnailFile(e.target.files?.[0] || null)}
                      className="hidden"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="thumbnailUrlOnly" className="text-white mb-2 block text-sm">Thumbnail URL</Label>
                  <Input
                    id="thumbnailUrlOnly"
                    value={videoThumbnailUrl}
                    onChange={(e) => setVideoThumbnailUrl(e.target.value)}
                    placeholder="https://example.com/thumbnail.jpg"
                    className="bg-[#2E2E2E] border-[#3a3a3a] text-white placeholder:text-gray-500"
                  />
                </div>
              </div>
            )}

            <button
              onClick={handleUploadThumbnail}
              disabled={isUploadingThumbnail || (thumbnailUploadType === 'file' && !thumbnailFile) || (thumbnailUploadType === 'url' && !videoThumbnailUrl.trim())}
              className="mt-4 w-full px-6 py-2 rounded font-medium text-black transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 flex items-center justify-center gap-2"
              style={{ backgroundColor: accentGold }}
            >
              {isUploadingThumbnail ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                'Upload Thumbnail'
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Confirm Dialog */}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title={confirmDialog.title}
        message={confirmDialog.message}
        type={confirmDialog.type}
        onConfirm={confirmDialog.onConfirm}
        onCancel={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
        confirmText="Delete"
        cancelText="Cancel"
      />

      {/* Upload Progress Overlay */}
      {(isUploadingImages || isUploadingVideo || isUploadingThumbnail) && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-[#2E2E2E] rounded-lg p-8 border-2 border-[#FDB813] shadow-2xl max-w-md w-full mx-4">
            <div className="flex flex-col items-center text-center">
              <Loader2 className="h-16 w-16 text-[#FDB813] animate-spin mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                {isUploadingImages ? 'Uploading Images...' : isUploadingVideo ? 'Uploading Video...' : 'Uploading Thumbnail...'}
              </h3>
              <p className="text-gray-400 text-sm">
                Please wait while your {isUploadingImages ? 'images are' : isUploadingVideo ? 'video is' : 'thumbnail is'} being uploaded and processed.
              </p>
              <div className="mt-4 w-full bg-black rounded-full h-2 overflow-hidden">
                <div className="h-full bg-[#FDB813] animate-pulse" style={{ width: '100%' }}></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
