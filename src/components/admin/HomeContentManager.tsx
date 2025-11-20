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
          src={(image as any).signedThumbUrl || (image as any).signedUrl || image.image_url} 
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
  const [homeVideo, setHomeVideo] = useState<HomeVideo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Hero Image Upload State
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [isUploadingImages, setIsUploadingImages] = useState(false);
  const [isDragActive, setIsDragActive] = useState(false);
    const [MAX_IMAGE_SIZE] = [2 * 1024 * 1024]; // 2MB
    const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png'];
    const [filePreviews, setFilePreviews] = useState<string[]>([]);

    // create object URLs for previews and clean up
    useEffect(() => {
      // cleanup old previews
      setFilePreviews(prev => {
        prev.forEach(u => { try { URL.revokeObjectURL(u); } catch {} });
        return [];
      });
      const urls = imageFiles.map(f => URL.createObjectURL(f));
      setFilePreviews(urls);
      return () => {
        urls.forEach(u => { try { URL.revokeObjectURL(u); } catch {} });
      };
    }, [imageFiles]);
  
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
    
    const response = await fetch('/api/admin/upload/thumbnail', {
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
              <div>
                <div
                  className={`flex items-center justify-center w-full px-4 py-6 border-2 border-dashed rounded-md ${isDragActive ? 'border-[#FDB813] bg-[#1a1a1a]' : 'border-gray-700 bg-black'} text-gray-300 cursor-pointer`}
                  onClick={() => document.getElementById('imageFiles')?.click()}
                  onDragOver={(e) => { e.preventDefault(); setIsDragActive(true); }}
                  onDragEnter={(e) => { e.preventDefault(); setIsDragActive(true); }}
                  onDragLeave={(e) => { e.preventDefault(); setIsDragActive(false); }}
                  onDrop={(e) => {
                    e.preventDefault();
                    setIsDragActive(false);
                    const files = Array.from(e.dataTransfer?.files || []);
                    if (files.length > 0) {
                      const images = files.filter(f => ALLOWED_IMAGE_TYPES.includes(f.type) && f.size <= MAX_IMAGE_SIZE);
                      setImageFiles(images);
                    }
                  }}
                >
                  <input
                    id="imageFiles"
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    multiple
                    onChange={(e) => {
                      const files = Array.from(e.target.files || []);
                      const images = files.filter(f => ALLOWED_IMAGE_TYPES.includes(f.type) && f.size <= MAX_IMAGE_SIZE);
                      setImageFiles(images);
                    }}
                    className="hidden"
                  />

                  <div className="text-center">
                    <div className="mb-1 font-medium">Click or drag image here to upload</div>
                    <div className="text-xs text-gray-500">PNG or JPG, max 2MB</div>
                  </div>
                </div>

                {/* Previews of selected files */}
                {imageFiles.length > 0 && (
                  <div className="mt-3">
                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-10 gap-3">
                      {imageFiles.map((file, idx) => (
                        <div key={idx} className="relative bg-black border border-gray-700 rounded overflow-hidden flex flex-col">
                          {/* Square preview area */}
                          <div className="w-full aspect-square bg-gray-900 overflow-hidden relative">
                            {filePreviews[idx] ? (
                              <img src={filePreviews[idx]} alt={file.name} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <ImageIcon className="text-gray-500" />
                              </div>
                            )}

                            {/* Bottom overlay with filename and delete button */}
                            <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm px-2 py-1 flex items-center justify-between">
                              <div className="text-xs text-white truncate" title={file.name}>{file.name}</div>
                              <button
                                onClick={(e) => { e.stopPropagation(); const newFiles = [...imageFiles]; newFiles.splice(idx, 1); setImageFiles(newFiles); }}
                                className="p-1 bg-red-600 hover:bg-red-700 text-white rounded ml-2"
                                aria-label={`Remove ${file.name}`}
                                title="Remove"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
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
                  className="px-4 py-2 text-black rounded transition-all cursor-pointer"
                  style={{ backgroundColor: accentGold }}
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
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
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
            <div className="mb-4 p-2 bg-yellow-900/20 border border-yellow-700/50 rounded text-xs">
              <span className="text-white"><strong>Note:</strong> Max 500MB. Upload a file (drag & drop supported).</span>
            </div>
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
