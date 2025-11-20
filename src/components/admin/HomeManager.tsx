import { useState, useEffect, useRef } from 'react';
import { Upload, Plus, Trash2, Edit2, Video as VideoIcon, Image as ImageIcon, Eye, EyeOff, GripVertical, AlertCircle, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Alert, AlertDescription } from '../ui/alert';
import { toast } from 'sonner';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { API_ENDPOINTS, apiCall } from '../../utils/api-config';

const R2_BASE = process.env.NEXT_PUBLIC_R2_PUBLIC_URL || '';

interface VideoContent {
  id: string;
  title: string;
  videoUrl: string;
  posterUrl: string;
  description: string;
}

interface ImageContent {
  id: string;
  url: string;
  alt: string;
  caption?: string;
}

interface HeroImage {
  id: number;
  desktopUrl: string;
  mobileUrl: string;
  altText: string;
  displayOrder: number;
  isActive: boolean;
}

function SortableImageCard({ image, onToggle, onDelete }: { 
  image: HeroImage; 
  onToggle: (id: number, currentStatus: boolean) => void;
  onDelete: (id: number) => void;
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
    <div ref={setNodeRef} style={style} className={`${!image.isActive ? 'opacity-60' : ''}`}>
      <div className="bg-[#2E2E2E] p-4 rounded-lg border border-gray-700 overflow-hidden">
        <div className="flex items-start gap-3">
          {/* Drag Handle */}
          <div 
            {...attributes} 
            {...listeners}
            className="cursor-grab active:cursor-grabbing pt-2"
          >
            <GripVertical className="text-gray-600" size={20} />
          </div>

          {/* Image Preview */}
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between mb-2">
              <Label className="text-xs text-gray-300">Hero Image</Label>
              <Badge className={image.isActive ? 'bg-[#FDB813] text-black' : 'bg-gray-700 text-gray-300'}>
                {image.isActive ? 'Active' : 'Inactive'}
              </Badge>
            </div>
            <div className="relative aspect-video bg-black rounded overflow-hidden">
              <img
                src={image.desktopUrl}
                alt={image.altText}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-xs text-gray-500 truncate">{image.desktopUrl}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-700">
          <Button
            size="sm"
            onClick={() => onToggle(image.id, image.isActive)}
            className={`flex-1 ${image.isActive ? 'bg-[#2E2E2E] border-gray-600 text-gray-300 hover:bg-black' : 'bg-[#FDB813] text-black hover:bg-[#e5a711]'}`}
          >
            {image.isActive ? (
              <>
                <EyeOff size={16} className="mr-1" />
                Hide
              </>
            ) : (
              <>
                <Eye size={16} className="mr-1" />
                Show
              </>
            )}
          </Button>
          <Button
            size="sm"
            onClick={() => onDelete(image.id)}
            className="flex-1 bg-[#2E2E2E] hover:bg-[#1a1a1a] text-[#FDB813] border border-[#FDB813]"
          >
            <Trash2 size={16} className="mr-1" />
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}

export function HomeManager() {
  const [videos, setVideos] = useState<VideoContent[]>([
    {
      id: '1',
      title: 'Our Ministry in Action',
      videoUrl: `${R2_BASE}/Home/Augustine.mp4`,
      posterUrl: `${R2_BASE}/Home/hero/16x9/00.jpg`,
      description: 'Ministry highlights and testimonies'
    }
  ]);

  const [editingVideo, setEditingVideo] = useState<string | null>(null);
  
  // Hero Images State
  const [heroImages, setHeroImages] = useState<HeroImage[]>([]);
  const [loadingHeroImages, setLoadingHeroImages] = useState(true);
  const [showAddHeroForm, setShowAddHeroForm] = useState(false);
  const [newHeroImage, setNewHeroImage] = useState({
    desktopUrl: '',
    mobileUrl: '',
    altText: 'Ministry Hero Image',
  });
  const [manualUrls, setManualUrls] = useState<string[]>(['']);
  const [uploadingHero, setUploadingHero] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [uploadingPoster, setUploadingPoster] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<Array<{
    name: string;
    status: 'uploading' | 'success' | 'error';
    progress: number;
  }>>([]);
  
  const imageFileRef = useRef<HTMLInputElement>(null);
  const videoFileRef = useRef<HTMLInputElement>(null);
  const posterFileRef = useRef<HTMLInputElement>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    fetchHeroImages();
  }, []);



  const handleAddVideo = () => {
    const newVideo: VideoContent = {
      id: Date.now().toString(),
      title: 'New Video',
      videoUrl: '',
      posterUrl: '',
      description: ''
    };
    setVideos([...videos, newVideo]);
    setEditingVideo(newVideo.id);
  };

  const handleDeleteVideo = (id: string) => {
    toast('Are you sure you want to delete this video?', {
      description: 'You can add a new video after deletion.',
      action: {
        label: 'Delete',
        onClick: () => {
          setVideos(videos.filter(v => v.id !== id));
          toast.success('Video deleted successfully');
        },
      },
      cancel: {
        label: 'Cancel',
        onClick: () => {},
      },
    });
  };

  const handleUpdateVideo = (id: string, field: keyof VideoContent, value: string) => {
    setVideos(videos.map(v => v.id === id ? { ...v, [field]: value } : v));
  };

  // File Upload Functions
  const uploadToVercelBlob = async (file: File, folder: string): Promise<string | null> => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch(`/api/upload?folder=${folder}`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      return data.url;
    } catch (error) {
      console.error('Upload error:', error);
      return null;
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error('Image size should be less than 10MB');
      return;
    }

    setUploadingImages(true);
    const url = await uploadToVercelBlob(file, 'hero-images');
    
    if (url) {
      setNewHeroImage({ ...newHeroImage, desktopUrl: url, mobileUrl: url });
      toast.success('Image uploaded successfully');
    } else {
      toast.error('Failed to upload image');
    }
    setUploadingImages(false);
    
    // Reset file input
    if (imageFileRef.current) {
      imageFileRef.current.value = '';
    }
  };

  const handleMultipleImagesUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // Validate all files first
    const validFiles: File[] = [];
    for (const file of files) {
      if (!file.type.startsWith('image/')) {
        toast.error(`${file.name} is not an image file. Skipping.`);
        continue;
      }
      if (file.size > 10 * 1024 * 1024) {
        toast.error(`${file.name} is larger than 10MB. Skipping.`);
        continue;
      }
      validFiles.push(file);
    }

    if (validFiles.length === 0) {
      toast.error('No valid image files to upload');
      return;
    }

    // Initialize progress tracking
    const initialProgress = validFiles.map(file => ({
      name: file.name,
      status: 'uploading' as const,
      progress: 0
    }));
    setUploadProgress(initialProgress);
    setUploadingImages(true);

    toast.success(`Starting upload of ${validFiles.length} image(s)...`);

    // Upload all files
    const uploadPromises = validFiles.map(async (file, index) => {
      try {
        // Update progress to show uploading
        setUploadProgress(prev => 
          prev.map((p, i) => i === index ? { ...p, progress: 50 } : p)
        );

        const url = await uploadToVercelBlob(file, 'hero-images');
        
        if (url) {
          // Update progress to success
          setUploadProgress(prev => 
            prev.map((p, i) => i === index ? { ...p, status: 'success', progress: 100 } : p)
          );

          // Add to hero images via API
          const { data, error } = await apiCall<{ image: HeroImage }>(
            API_ENDPOINTS.heroImages.create,
            {
              method: 'POST',
              body: JSON.stringify({
                desktopUrl: url,
                mobileUrl: url,
                altText: file.name.replace(/\.[^/.]+$/, ''), // Use filename without extension as alt text
              }),
            }
          );

          if (error) {
            throw new Error(error);
          }

          return { success: true, file: file.name };
        } else {
          throw new Error('Upload failed');
        }
      } catch (error) {
        // Update progress to error
        setUploadProgress(prev => 
          prev.map((p, i) => i === index ? { ...p, status: 'error', progress: 0 } : p)
        );
        return { success: false, file: file.name };
      }
    });

    const results = await Promise.all(uploadPromises);
    const successCount = results.filter(r => r.success).length;
    const failCount = results.filter(r => !r.success).length;

    setUploadingImages(false);

    // Show summary
    if (successCount > 0 && failCount === 0) {
      toast.success(`Successfully uploaded ${successCount} image(s)!`);
    } else if (successCount > 0 && failCount > 0) {
      toast.warning(`Uploaded ${successCount} image(s), ${failCount} failed`);
    } else {
      toast.error(`Failed to upload all ${failCount} image(s)`);
    }

    // Clear progress after a delay
    setTimeout(() => {
      setUploadProgress([]);
    }, 3000);

    // Refresh the images list
    await fetchHeroImages();

    // Reset file input
    if (imageFileRef.current) {
      imageFileRef.current.value = '';
    }
  };

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>, videoId: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('video/')) {
      toast.error('Please select a video file');
      return;
    }

    // Validate file size (max 100MB)
    if (file.size > 100 * 1024 * 1024) {
      toast.error('Video size should be less than 100MB');
      return;
    }

    setUploadingVideo(true);
    const url = await uploadToVercelBlob(file, 'videos');
    
    if (url) {
      handleUpdateVideo(videoId, 'videoUrl', url);
      toast.success('Video uploaded successfully');
    } else {
      toast.error('Failed to upload video');
    }
    setUploadingVideo(false);
    
    // Reset file input
    if (videoFileRef.current) {
      videoFileRef.current.value = '';
    }
  };

  const handlePosterUpload = async (e: React.ChangeEvent<HTMLInputElement>, videoId: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error('Image size should be less than 10MB');
      return;
    }

    setUploadingPoster(true);
    const url = await uploadToVercelBlob(file, 'video-posters');
    
    if (url) {
      handleUpdateVideo(videoId, 'posterUrl', url);
      toast.success('Poster image uploaded successfully');
    } else {
      toast.error('Failed to upload poster image');
    }
    setUploadingPoster(false);
    
    // Reset file input
    if (posterFileRef.current) {
      posterFileRef.current.value = '';
    }
  };

  // Hero Image Functions
  const fetchHeroImages = async () => {
    setLoadingHeroImages(true);
    const { data, error } = await apiCall<{ images: HeroImage[] }>(
      API_ENDPOINTS.heroImages.list
    );

    if (error) {
      toast.error('Failed to load hero images');
      console.error(error);
    } else if (data?.images) {
      setHeroImages(data.images);
    }
    setLoadingHeroImages(false);
  };

  const handleAddHeroImage = async () => {
    // Filter out empty URLs
    const validUrls = manualUrls.filter(url => url.trim() !== '');
    
    if (validUrls.length === 0) {
      toast.error('At least one image URL is required');
      return;
    }

    setUploadingHero(true);
    
    // Upload all URLs
    const uploadPromises = validUrls.map(async (url, index) => {
      try {
        const { data, error } = await apiCall<{ image: HeroImage }>(
          API_ENDPOINTS.heroImages.create,
          {
            method: 'POST',
            body: JSON.stringify({
              desktopUrl: url,
              mobileUrl: url,
              altText: `${newHeroImage.altText} ${validUrls.length > 1 ? index + 1 : ''}`
            }),
          }
        );

        if (error) {
          throw new Error(error);
        }
        return { success: true, url };
      } catch (error) {
        return { success: false, url };
      }
    });

    const results = await Promise.all(uploadPromises);
    const successCount = results.filter(r => r.success).length;
    const failCount = results.filter(r => !r.success).length;

    setUploadingHero(false);

    // Show summary
    if (successCount > 0 && failCount === 0) {
      toast.success(`Successfully added ${successCount} hero image(s)!`);
    } else if (successCount > 0 && failCount > 0) {
      toast.warning(`Added ${successCount} image(s), ${failCount} failed`);
    } else {
      toast.error(`Failed to add all ${failCount} image(s)`);
    }

    // Reset form
    setNewHeroImage({ desktopUrl: '', mobileUrl: '', altText: 'Ministry Hero Image' });
    setManualUrls(['']);
    setShowAddHeroForm(false);
    await fetchHeroImages();
  };

  const addUrlField = () => {
    setManualUrls([...manualUrls, '']);
  };

  const removeUrlField = (index: number) => {
    if (manualUrls.length > 1) {
      setManualUrls(manualUrls.filter((_, i) => i !== index));
    }
  };

  const updateUrlField = (index: number, value: string) => {
    const newUrls = [...manualUrls];
    newUrls[index] = value;
    setManualUrls(newUrls);
  };

  const toggleHeroImageVisibility = async (imageId: number, currentStatus: boolean) => {
    const { error } = await apiCall(
      API_ENDPOINTS.heroImages.update(imageId),
      {
        method: 'PATCH',
        body: JSON.stringify({ isActive: !currentStatus }),
      }
    );

    if (error) {
      toast.error('Failed to toggle image visibility');
    } else {
      setHeroImages(images =>
        images.map(img =>
          img.id === imageId ? { ...img, isActive: !currentStatus } : img
        )
      );
      toast.success(`Image ${!currentStatus ? 'enabled' : 'disabled'}`);
    }
  };

  const deleteHeroImage = async (imageId: number) => {
    toast('Are you sure you want to delete this hero image?', {
      description: 'This action cannot be undone.',
      action: {
        label: 'Delete',
        onClick: async () => {
          const { error } = await apiCall(
            API_ENDPOINTS.heroImages.delete(imageId),
            { method: 'DELETE' }
          );

          if (error) {
            toast.error('Failed to delete hero image');
          } else {
            setHeroImages(images => images.filter(img => img.id !== imageId));
            toast.success('Hero image deleted successfully');
          }
        },
      },
      cancel: {
        label: 'Cancel',
        onClick: () => {},
      },
    });
  };

  const handleHeroDragEnd = async (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = heroImages.findIndex(img => img.id === active.id);
      const newIndex = heroImages.findIndex(img => img.id === over.id);

      const newOrder = arrayMove(heroImages, oldIndex, newIndex);
      setHeroImages(newOrder);

      // Send reorder request to API
      const imageIds = newOrder.map(img => img.id);
      const { error } = await apiCall(
        API_ENDPOINTS.heroImages.reorder,
        {
          method: 'POST',
          body: JSON.stringify({ imageIds }),
        }
      );

      if (error) {
        toast.error('Failed to save new order');
        // Revert on error
        await fetchHeroImages();
      } else {
        toast.success('Image order updated');
      }
    }
  };

  const activeHeroImagesCount = heroImages.filter(img => img.isActive).length;

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl text-white mb-2">Home Page Management</h2>
        <p className="text-gray-300">Manage hero images, videos, and featured content</p>
      </div>

      {/* Videos Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl text-white">Ministry Videos</h3>
            <p className="text-sm text-gray-400 mt-1">
              Only one video is supported. {videos.length > 0 ? 'Edit or delete the existing video to change it.' : 'Add your ministry video.'}
            </p>
          </div>
          {videos.length === 0 && (
            <Button
              onClick={handleAddVideo}
              className="bg-[#2E2E2E] hover:bg-[#3E3E3E] text-white border border-[#FDB813]"
            >
              <Plus size={16} className="mr-2" />
              Add Video
            </Button>
          )}
        </div>

        <div className="space-y-4">
          {videos.length === 0 ? (
            <div className="bg-[#2E2E2E] p-8 rounded-lg border border-gray-700">
              <div className="flex flex-col items-center justify-center text-center">
                <VideoIcon size={48} className="text-gray-600 mb-3" />
                <h4 className="text-white mb-2">No Video Added</h4>
                <p className="text-gray-400 text-sm mb-4">
                  Add your ministry video to showcase on the homepage.
                </p>
                <Button
                  onClick={handleAddVideo}
                  className="bg-[#FDB813] hover:bg-[#e5a610] text-black"
                >
                  <Plus size={16} className="mr-2" />
                  Add Ministry Video
                </Button>
              </div>
            </div>
          ) : (
            videos.map((video) => (
              <div key={video.id} className="bg-[#2E2E2E] p-4 rounded-lg border border-gray-700">
                {editingVideo === video.id ? (
                  <div className="space-y-3">
                  <div>
                    <Label className="text-gray-300 mb-2">Video Title</Label>
                    <Input
                      value={video.title}
                      onChange={(e) => handleUpdateVideo(video.id, 'title', e.target.value)}
                      placeholder="Video Title"
                      className="bg-black border-gray-600 text-white selection:bg-[#FDB813] selection:text-black"
                    />
                  </div>

                  <div>
                    <Label className="text-gray-300 mb-2">Video File</Label>
                    <div className="space-y-2">
                      <input
                        ref={videoFileRef}
                        type="file"
                        accept="video/*"
                        onChange={(e) => handleVideoUpload(e, video.id)}
                        className="hidden"
                      />
                      <Button
                        type="button"
                        onClick={() => videoFileRef.current?.click()}
                        disabled={uploadingVideo}
                        className="w-full bg-[#2E2E2E] hover:bg-[#3E3E3E] text-white border border-[#FDB813]"
                      >
                        <Upload size={16} className="mr-2" />
                        {uploadingVideo ? 'Uploading Video...' : 'Upload Video (MP4)'}
                      </Button>
                      <Input
                        value={video.videoUrl}
                        onChange={(e) => handleUpdateVideo(video.id, 'videoUrl', e.target.value)}
                        placeholder="Or paste video URL here"
                        className="bg-black border-gray-600 text-white selection:bg-[#FDB813] selection:text-black"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-gray-300 mb-2">Poster Image</Label>
                    <div className="space-y-2">
                      <input
                        ref={posterFileRef}
                        type="file"
                        accept="image/*"
                        onChange={(e) => handlePosterUpload(e, video.id)}
                        className="hidden"
                      />
                      <Button
                        type="button"
                        onClick={() => posterFileRef.current?.click()}
                        disabled={uploadingPoster}
                        className="w-full bg-[#2E2E2E] hover:bg-[#3E3E3E] text-white border border-[#FDB813]"
                      >
                        <Upload size={16} className="mr-2" />
                        {uploadingPoster ? 'Uploading Poster...' : 'Upload Poster Image'}
                      </Button>
                      <Input
                        value={video.posterUrl}
                        onChange={(e) => handleUpdateVideo(video.id, 'posterUrl', e.target.value)}
                        placeholder="Or paste poster URL here"
                        className="bg-black border-gray-600 text-white selection:bg-[#FDB813] selection:text-black"
                      />
                      {video.posterUrl && (
                        <div className="aspect-video bg-black rounded overflow-hidden max-w-xs border border-gray-700">
                          <img src={video.posterUrl} alt="Poster preview" className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label className="text-gray-300 mb-2">Description</Label>
                    <Textarea
                      value={video.description}
                      onChange={(e) => handleUpdateVideo(video.id, 'description', e.target.value)}
                      placeholder="Video Description"
                      className="bg-black border-gray-600 text-white selection:bg-[#FDB813] selection:text-black"
                      rows={2}
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => setEditingVideo(null)}
                      className="bg-[#FDB813] hover:bg-[#e5a610] text-black"
                    >
                      Done
                    </Button>
                    <Button
                      onClick={() => handleDeleteVideo(video.id)}
                      className="bg-[#2E2E2E] hover:bg-[#1a1a1a] text-[#FDB813] border border-[#FDB813]"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <VideoIcon className="text-[#FDB813]" size={24} />
                    <div>
                      <h4 className="text-white">{video.title}</h4>
                      <p className="text-sm text-gray-400">{video.description || 'No description'}</p>
                    </div>
                  </div>
                  <Button
                    onClick={() => setEditingVideo(video.id)}
                    className="bg-[#2E2E2E] hover:bg-[#1a1a1a] text-[#FDB813] border border-[#FDB813]"
                  >
                    <Edit2 size={16} className="mr-2" />
                    Edit
                  </Button>
                </div>
              )}
            </div>
          ))
          )}
        </div>
      </div>

      {/* Hero Images Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl text-white flex items-center gap-2">
              <ImageIcon className="text-[#FDB813]" size={24} />
              Hero Slideshow Images
            </h3>
            <p className="text-sm text-gray-400 mt-1">
              Manage images for the homepage hero slideshow. Active images will rotate automatically.
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-400">
              {heroImages.length} images
            </div>
            <div className="text-sm text-green-400">
              {activeHeroImagesCount} active
            </div>
          </div>
        </div>

        {/* Add New Hero Image Form */}
        <div className="bg-[#2E2E2E] p-4 rounded-lg border border-gray-700 mb-4">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-white">Add New Hero Image</h4>
            <Button
              onClick={() => {
                setShowAddHeroForm(!showAddHeroForm);
                if (showAddHeroForm) {
                  // Reset form when closing
                  setManualUrls(['']);
                  setNewHeroImage({ desktopUrl: '', mobileUrl: '', altText: 'Ministry Hero Image' });
                }
              }}
              className={showAddHeroForm ? 'bg-[#2E2E2E] border border-gray-600 text-gray-300 hover:bg-black' : 'bg-[#FDB813] text-black hover:bg-[#e5a711]'}
            >
              {showAddHeroForm ? 'Cancel' : <><Plus size={16} className="mr-1" /> Add Image</>}
            </Button>
          </div>
          
          {showAddHeroForm && (
            <div className="space-y-4">
              <Alert className="bg-black border-[#FDB813]">
                <AlertCircle className="h-4 w-4 !text-white" />
                <AlertDescription className="text-gray-300">
                  <strong>Upload multiple files at once!</strong> Select multiple images (up to 20) using the upload button below, or paste existing URL for a single image. Images should be 16:9 ratio (1920x1080 recommended, 2560×1440 / 3840×2160 for 4K images).
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="imageUrl" className="text-gray-300">Image</Label>
                  
                  {/* File Upload Section */}
                  <div className="space-y-2">
                    <input
                      ref={imageFileRef}
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleMultipleImagesUpload}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      onClick={() => imageFileRef.current?.click()}
                      disabled={uploadingImages}
                      className="w-full bg-[#2E2E2E] hover:bg-[#3E3E3E] text-white border border-[#FDB813]"
                    >
                      <Upload size={16} className="mr-2" />
                      {uploadingImages ? 'Uploading...' : 'Upload Images (Multiple)'}
                    </Button>

                    {/* Upload Progress */}
                    {uploadProgress.length > 0 && (
                      <div className="mt-3 space-y-2 max-h-60 overflow-y-auto">
                        <Label className="text-xs text-gray-400">Upload Progress:</Label>
                        {uploadProgress.map((file, index) => (
                          <div key={index} className="flex items-center gap-2 text-xs">
                            {file.status === 'uploading' && (
                              <div className="w-4 h-4 border-2 border-[#FDB813] border-t-transparent rounded-full animate-spin" />
                            )}
                            {file.status === 'success' && (
                              <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                            {file.status === 'error' && (
                              <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            )}
                            <span className={`flex-1 truncate ${
                              file.status === 'success' ? 'text-green-400' : 
                              file.status === 'error' ? 'text-red-400' : 
                              'text-gray-300'
                            }`}>
                              {file.name}
                            </span>
                            <span className="text-gray-500 text-xs">
                              {file.status === 'uploading' && 'Uploading...'}
                              {file.status === 'success' && 'Done'}
                              {file.status === 'error' && 'Failed'}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {/* Manual URL Inputs */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-gray-300 text-sm">Or paste URL(s) below</Label>
                      <Button
                        type="button"
                        onClick={addUrlField}
                        className="h-7 px-2 bg-[#FDB813] hover:bg-[#e5a711] text-black text-xs"
                      >
                        <Plus size={14} className="mr-1" />
                        Add URL
                      </Button>
                    </div>
                    
                    {manualUrls.map((url, index) => (
                      <div key={index} className="space-y-2">
                        <div className="relative">
                          <Input
                            placeholder={`Image URL ${manualUrls.length > 1 ? index + 1 : ''}`}
                            value={url}
                            onChange={(e) => updateUrlField(index, e.target.value)}
                            className="bg-black border-gray-600 text-white pr-20 selection:bg-[#FDB813] selection:text-black"
                          />
                          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                            {url && (
                              <button
                                type="button"
                                onClick={() => updateUrlField(index, '')}
                                className="text-gray-400 hover:text-white"
                                title="Clear"
                              >
                                <X size={16} />
                              </button>
                            )}
                            {manualUrls.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeUrlField(index)}
                                className="text-red-400 hover:text-red-300"
                                title="Remove field"
                              >
                                <Trash2 size={16} />
                              </button>
                            )}
                          </div>
                        </div>
                        
                        {url && (
                          <div className="aspect-video bg-black rounded overflow-hidden border border-gray-700">
                            <img src={url} alt={`Image preview ${index + 1}`} className="w-full h-full object-cover" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="altText" className="text-gray-300">Alt Text (for accessibility)</Label>
                <Input
                  id="altText"
                  placeholder="Ministry Hero Image"
                  value={newHeroImage.altText}
                  onChange={(e) => setNewHeroImage({ ...newHeroImage, altText: e.target.value })}
                  className="bg-black border-gray-600 text-white selection:bg-[#FDB813] selection:text-black"
                />
              </div>

              <Button 
                onClick={handleAddHeroImage} 
                disabled={uploadingHero || !manualUrls.some(url => url.trim() !== '')}
                className="w-full bg-[#FDB813] text-black hover:bg-[#e5a711]"
              >
                {uploadingHero ? 'Adding...' : `Add Hero Image${manualUrls.filter(url => url.trim() !== '').length > 1 ? 's' : ''}`}
              </Button>
            </div>
          )}
        </div>

        {/* Hero Images List with Drag and Drop */}
        {loadingHeroImages ? (
          <div className="bg-[#2E2E2E] p-4 rounded-lg border border-gray-700">
            <div className="flex items-center justify-center py-8">
              <p className="text-gray-400">Loading images...</p>
            </div>
          </div>
        ) : heroImages.length === 0 ? (
          <div className="bg-[#2E2E2E] p-4 rounded-lg border border-gray-700">
            <div className="flex flex-col items-center justify-center py-8">
              <ImageIcon size={48} className="text-gray-600 mb-3" />
              <p className="text-gray-400 text-center">
                No hero images yet. Add your first image to get started.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-gray-400">
              💡 Drag images to reorder them. The order will be reflected in the homepage slideshow.
            </p>
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleHeroDragEnd}
            >
              <SortableContext
                items={heroImages.map(img => img.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-4">
                  {heroImages.map((image) => (
                    <SortableImageCard
                      key={image.id}
                      image={image}
                      onToggle={toggleHeroImageVisibility}
                      onDelete={deleteHeroImage}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          </div>
        )}
      </div>
    </div>
  );
}
