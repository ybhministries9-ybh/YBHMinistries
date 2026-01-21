import { useState, useEffect } from 'react';
import { Trash2, Video as VideoIcon, Image as ImageIcon, GripVertical, X, Loader2 } from 'lucide-react';
import { Button } from '../ui/button';
import { MultipleImageUpload } from './MultipleImageUpload';
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
  mobile_image_url?: string | null;
  signedUrl?: string | null;
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
          src={
            (image as any).signedMobileThumbUrl || (image as any).signedMobileUrl || (image as any).mobile_image_url ||
            (image as any).signedThumbUrl || (image as any).signedUrl || image.image_url || ''
          }
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

      {/* Info Bar removed: only show image thumbnail as requested */}
    </div>
  );
}

export function HomeContentManager() {
  const [heroImages, setHeroImages] = useState<HeroImage[]>([]);
  const [showUploader, setShowUploader] = useState(false);
  const [uploaderCategory, setUploaderCategory] = useState<'desktop' | 'mobile'>('desktop');
  const [homeVideo, setHomeVideo] = useState<HomeVideo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Hero Image Upload State (modal uploader used)
  const [isUploadingImages, setIsUploadingImages] = useState(false);
  
  // Selection State for bulk delete
  const [selectedImageIds, setSelectedImageIds] = useState<Set<number>>(new Set());
  const [activeTab, setActiveTab] = useState<'desktop' | 'mobile'>('desktop');
  
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
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [isVideoDragActive, setIsVideoDragActive] = useState(false);
  const [isThumbDragActive, setIsThumbDragActive] = useState(false);

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

  // Handle files selected from MultipleImageUpload modal
  const handleModalUploadComplete = async (images: { url: string; file?: File; category: string }[]) => {
    setShowUploader(false);
    if (!images || images.length === 0) return;

    setIsUploadingImages(true);
    try {
      const formData = new FormData();
      images.forEach(img => {
        if (img.file) formData.append('files', img.file);
      });
      // mark mobile uploads
      if (uploaderCategory === 'mobile') formData.append('isMobile', 'true');

      const response = await fetch('/api/admin/home/hero-images', {
        method: 'POST',
        body: formData,
        headers: getAuthHeaders(),
      });
      const result = await response.json();
      if (result.success) {
        toast.success(`Uploaded ${result.data.length} image(s) successfully`);
        await fetchHeroImages();
      } else {
        toast.error(result.error || 'Failed to upload images');
      }
    } catch (err) {
      console.error('Error uploading images from modal:', err);
      toast.error('Error uploading images');
    } finally {
      setIsUploadingImages(false);
    }
  };

  // Uploads are handled via the `MultipleImageUpload` modal; use `handleModalUploadComplete`.

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

  // Bulk delete images (only those selected in the current tab)
  const handleBulkDelete = async () => {
    // Determine currently visible image IDs for the active tab
    const visible = heroImages.filter(img => activeTab === 'mobile' ? Boolean(img.mobile_image_url) : !img.mobile_image_url);
    const visibleIdsSet = new Set(visible.map(v => v.id));
    const selectedInVisible = Array.from(selectedImageIds).filter(id => visibleIdsSet.has(id));

    if (selectedInVisible.length === 0) {
      toast.error('No images selected in the current tab');
      return;
    }

    setConfirmDialog({
      isOpen: true,
      title: 'Delete Multiple Images',
      message: `Are you sure you want to delete ${selectedInVisible.length} image(s)? This action cannot be undone.`,
      type: 'danger',
      onConfirm: async () => {
        setConfirmDialog({ ...confirmDialog, isOpen: false });
        try {
          const ids = selectedInVisible.join(',');
          const response = await fetch(`/api/admin/home/hero-images?ids=${ids}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
          });

          const result = await response.json();
          
          if (result.success) {
            toast.success(result.message || 'Images deleted successfully');
            // Remove only the deleted IDs from the existing selection set
            const newSel = new Set(selectedImageIds);
            selectedInVisible.forEach(id => newSel.delete(id));
            setSelectedImageIds(newSel);
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
    // Only operate on currently visible images (respect activeTab)
    const visible = heroImages.filter(img => activeTab === 'mobile' ? Boolean(img.mobile_image_url) : !img.mobile_image_url);
    const visibleIds = visible.map(v => v.id);
    const allVisibleSelected = visibleIds.every(id => selectedImageIds.has(id));

    if (allVisibleSelected) {
      // Deselect only visible ids
      const newSet = new Set(selectedImageIds);
      visibleIds.forEach(id => newSet.delete(id));
      setSelectedImageIds(newSet);
    } else {
      // Add visible ids to selection
      const newSet = new Set(selectedImageIds);
      visibleIds.forEach(id => newSet.add(id));
      setSelectedImageIds(newSet);
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
      let thumbResult: { url: string } | null = null;
      let finalThumbUrl = videoThumbnailUrl;

      if (thumbnailUploadType === 'file' && thumbnailFile) {
        thumbResult = await uploadThumbnailToBlob(thumbnailFile);
        finalThumbUrl = thumbResult.url;
      }

      const response = await fetch(`/api/admin/home/video/thumbnail?id=${homeVideo.id}`, {
        method: 'PUT',
        headers: getAuthHeaders('application/json'),
        body: JSON.stringify({
          thumbnail_image_url: thumbnailUploadType === 'file' ? finalThumbUrl : videoThumbnailUrl,
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

  // Create an object URL for thumbnail preview when a file is selected
  useEffect(() => {
    if (!thumbnailFile) {
      setThumbnailPreview(null);
      return;
    }
    const url = URL.createObjectURL(thumbnailFile);
    setThumbnailPreview(url);
    return () => {
      try { URL.revokeObjectURL(url); } catch {}
    };
  }, [thumbnailFile]);

  // Helper function to upload thumbnail to blob
  const uploadThumbnailToBlob = async (file: File): Promise<{ url: string }> => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await fetch('/api/admin/upload/thumbnail?dest=home/video/thumbnails/orig', {
      method: 'POST',
      body: formData,
      headers: getAuthHeaders() // FormData upload - include auth
    });
    
    const result = await response.json();
    if (!result.success) {
      throw new Error('Failed to upload thumbnail');
    }
    // Return single url reference
    return { url: result.url || result.thumbRef };
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
    <div className="space-y-8 bg-black min-h-screen">
      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white">Home Management</h1>
        <p className="text-gray-400 text-sm mt-1">Manage hero images and video for the home page</p>
      </div>

      {/* Hero Images Section */}
      <div className="bg-[#2E2E2E] rounded-lg p-6 border border-[#3a3a3a]">
        <div className="flex items-center justify-between gap-2 mb-6">
          <div className="flex items-center gap-2">
            <ImageIcon className="h-6 w-6" style={{ color: accentGold }} />
            <h2 className="text-2xl font-bold text-white">Hero Images</h2>
            <span className="text-sm text-gray-400 ml-2">({heroImages.length} images)</span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={() => { setUploaderCategory('desktop'); setShowUploader(true); }}
              className="px-4 py-2 bg-[#2E2E2E] hover:bg-[#3E3E3E] text-white border border-[#FDB813]"
            >
              Upload Desktop Files
            </Button>

            <Button
              onClick={() => { setUploaderCategory('mobile'); setShowUploader(true); }}
              className="px-4 py-2 bg-[#2E2E2E] hover:bg-[#3E3E3E] text-white border border-[#FDB813]"
            >
              Upload Mobile Files
            </Button>
          </div>
        </div>

        {/* Upload handled via modal uploader buttons above; inline upload form removed */}

        {/* Images List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white">Current Images (Drag to Reorder)</h3>
              <div className="mt-2">
                <div className="border-b border-gray-700">
                  <div className="flex gap-1 overflow-x-auto">
                    {[
                      { key: 'desktop', label: `Desktop (${heroImages.filter(img => !img.mobile_image_url).length})` },
                      { key: 'mobile', label: `Mobile (${heroImages.filter(img => img.mobile_image_url).length})` }
                    ].map((tab) => {
                      const isActive = activeTab === (tab.key as 'desktop' | 'mobile');
                      return (
                        <button
                          key={tab.key}
                          onClick={() => setActiveTab(tab.key as 'desktop' | 'mobile')}
                          className={`flex items-center gap-2 px-6 py-3 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${isActive ? 'border-[#FDB813] text-[#FDB813] bg-[#2E2E2E]' : 'border-transparent text-gray-400 hover:text-white hover:bg-[#2E2E2E]'}`}
                        >
                          <ImageIcon size={17} />
                          <span className="text-md font-medium">{tab.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            {heroImages.length > 0 && (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSelectAll}
                  className="px-4 py-2 text-black rounded transition-all cursor-pointer"
                  style={{ backgroundColor: accentGold }}
                >
                  {(() => {
                    const visible = heroImages.filter(img => activeTab === 'mobile' ? Boolean(img.mobile_image_url) : !img.mobile_image_url);
                    const visibleIds = visible.map(v => v.id);
                    const allVisibleSelected = visibleIds.length > 0 && visibleIds.every(id => selectedImageIds.has(id));
                    return allVisibleSelected ? 'Deselect All' : 'Select All';
                  })()}
                </button>
                {(() => {
                  const visible = heroImages.filter(img => activeTab === 'mobile' ? Boolean(img.mobile_image_url) : !img.mobile_image_url);
                  const visibleIdsSet = new Set(visible.map(v => v.id));
                  const selectedInVisible = Array.from(selectedImageIds).filter(id => visibleIdsSet.has(id));
                  return selectedInVisible.length > 0 ? (
                    <button
                      onClick={handleBulkDelete}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition-all cursor-pointer flex items-center gap-2"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete Selected ({selectedInVisible.length})
                    </button>
                  ) : null;
                })()}
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
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                  {heroImages
                    .filter(img => activeTab === 'mobile' ? Boolean(img.mobile_image_url) : !img.mobile_image_url)
                    .map((image) => (
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
        {showUploader && (
          <MultipleImageUpload
            onUploadComplete={handleModalUploadComplete}
            onClose={() => setShowUploader(false)}
            category={uploaderCategory}
          />
        )}
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
            
            <div className="flex flex-row items-start gap-6 flex-nowrap">
              {/* Video Player */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-white mb-3">Video</h4>
                {homeVideo.video_url ? (
                  <div className="flex items-center justify-center">
                    <div className="w-full lg:w-1/4">
                      <div className="relative group">
                        <video
                          src={homeVideo.video_url}
                          poster={homeVideo.thumbnail_image_url || undefined}
                          controls
                          style={{ width: 'auto', height: '360px' }}
                          className="rounded-lg border border-[#3a3a3a] object-cover"
                        />
                        <button
                          onClick={handleDeleteVideo}
                          className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:bg-red-600"
                          title="Delete video"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <div className="w-full lg:w-1/4 aspect-video flex flex-col items-center justify-center bg-[#2E2E2E] rounded-lg border border-[#3a3a3a]">
                      <VideoIcon className="h-12 w-12 text-gray-600 mb-2" />
                      <p className="text-gray-500 text-sm">No video uploaded</p>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Thumbnail Preview (render as smaller thumbnail) */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-white mb-3">Thumbnail Image</h4>
                {homeVideo.thumbnail_image_url ? (
                  <div className="relative group flex items-center justify-center">
                    <div className="w-full lg:w-1/4">
                      <img
                        src={homeVideo.thumbnail_image_url}
                        alt="Video thumbnail"
                        style={{ width: 'auto', height: '360px' }}
                        className="rounded-lg border border-[#3a3a3a] object-cover"
                      />
                    </div>

                    <button
                      onClick={handleDeleteThumbnail}
                      className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:bg-red-600"
                      title="Delete thumbnail"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <div className="w-full max-w-sm aspect-video flex items-center justify-center bg-[#2E2E2E] rounded-lg border border-[#3a3a3a]">
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
            
            {/* Video file upload (drag & drop) */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="videoFile" className="text-white mb-2 block text-sm">Video File</Label>
                <div
                  className={`flex items-center justify-center w-full px-4 py-6 border-2 border-dashed rounded-md ${isVideoDragActive ? 'border-[#FDB813] bg-[#1a1a1a]' : 'border-gray-700 bg-black'} text-gray-300 cursor-pointer`}
                  onClick={() => document.getElementById('videoFile')?.click()}
                  onDragOver={(e) => { e.preventDefault(); setIsVideoDragActive(true); }}
                  onDragEnter={(e) => { e.preventDefault(); setIsVideoDragActive(true); }}
                  onDragLeave={(e) => { e.preventDefault(); setIsVideoDragActive(false); }}
                  onDrop={(e) => {
                    e.preventDefault();
                    setIsVideoDragActive(false);
                    const f = e.dataTransfer?.files?.[0];
                    if (f && f.type.startsWith('video/')) setVideoFile(f);
                  }}
                >
                  <input
                    id="videoFile"
                    type="file"
                    accept="video/*"
                    onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
                    className="hidden"
                  />

                  <div className="text-center">
                    <div className="mb-1 font-medium">Click or drag video here to upload</div>
                    <div className="text-xs text-gray-500">MP4, MOV, WebM — max 500MB</div>
                  </div>
                </div>
              </div>

              {/* Thumbnail preview moved to the Thumbnail Upload section */}

            </div>

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
            
            {/* Thumbnail file upload (drag & drop) */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="thumbnailFileOnly" className="text-white mb-2 block text-sm">Thumbnail Image</Label>
                <div
                  className={`flex items-center justify-center w-full px-4 py-4 border-2 border-dashed rounded-md ${isThumbDragActive ? 'border-[#FDB813] bg-[#1a1a1a]' : 'border-gray-700 bg-black'} text-gray-300 cursor-pointer`}
                  onClick={() => document.getElementById('thumbnailFileOnly')?.click()}
                  onDragOver={(e) => { e.preventDefault(); setIsThumbDragActive(true); }}
                  onDragEnter={(e) => { e.preventDefault(); setIsThumbDragActive(true); }}
                  onDragLeave={(e) => { e.preventDefault(); setIsThumbDragActive(false); }}
                  onDrop={(e) => {
                    e.preventDefault();
                    setIsThumbDragActive(false);
                    const f = e.dataTransfer?.files?.[0];
                    if (f && f.type.startsWith('image/')) setThumbnailFile(f);
                  }}
                >
                  <input
                    id="thumbnailFileOnly"
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    onChange={(e) => setThumbnailFile(e.target.files?.[0] || null)}
                    className="hidden"
                  />

                  <div className="text-center">
                    <div className="mb-1 font-medium">Click or drag image here to upload</div>
                    <div className="text-xs text-gray-500">PNG or JPG, max 2MB</div>
                  </div>
                </div>
              </div>
              {/* Small preview for selected thumbnail (shows in Thumbnail Upload section) */}
              {thumbnailPreview && (
                <div className="mt-3">
                  <div className="w-28">
                    <div className="relative bg-black border border-gray-700 rounded overflow-hidden">
                      <div className="w-full aspect-square bg-gray-900 overflow-hidden">
                        <img src={thumbnailPreview} alt="Thumbnail preview" className="w-full h-full object-cover" />
                        <button
                          onClick={(e) => { e.stopPropagation(); setThumbnailFile(null); const input = document.getElementById('thumbnailFileOnly') as HTMLInputElement; if (input) input.value = ''; }}
                          className="absolute top-1 right-1 z-10 p-1 bg-red-600 hover:bg-red-700 text-white rounded"
                          title="Remove"
                          aria-label="Remove thumbnail"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

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
