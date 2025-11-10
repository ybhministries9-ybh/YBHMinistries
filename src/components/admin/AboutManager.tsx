import { useState, useEffect, useRef } from 'react';
import { Upload, Image as ImageIcon, X, AlertCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Alert, AlertDescription } from '../ui/alert';
import { toast } from 'sonner';
import { API_ENDPOINTS, apiCall } from '../../utils/api-config';

interface AboutHeroImage {
  id: number;
  imageUrl: string;
  altText: string;
}

export function AboutManager() {
  const [heroImage, setHeroImage] = useState<AboutHeroImage | null>(null);
  const [loadingHeroImage, setLoadingHeroImage] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newHeroImage, setNewHeroImage] = useState({
    imageUrl: '',
    altText: 'About Us Hero Image',
  });
  const [uploadingImage, setUploadingImage] = useState(false);
  
  const imageFileRef = useRef<HTMLInputElement>(null);

  // Fetch hero image on mount
  useEffect(() => {
    fetchHeroImage();
  }, []);

  const fetchHeroImage = async () => {
    setLoadingHeroImage(true);
    
    // Use the same endpoint as Home page hero images, but filter for About page
    const { data, error } = await apiCall(API_ENDPOINTS.heroImages.list);
    
    if (error) {
      console.error('Failed to fetch About hero image:', error);
      // Use fallback data
      setHeroImage({
        id: 1,
        imageUrl: 'https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/About/hero/3.jpg',
        altText: 'About Us Hero Image',
      });
    } else if (data && Array.isArray(data) && data.length > 0) {
      // In a real implementation, you'd filter for About page images
      // For now, we'll use the first image or fallback
      const aboutImage = data.find((img: any) => img.page === 'about') || null;
      if (aboutImage) {
        setHeroImage({
          id: aboutImage.id,
          imageUrl: aboutImage.desktopUrl,
          altText: aboutImage.altText,
        });
      } else {
        // Use fallback
        setHeroImage({
          id: 1,
          imageUrl: 'https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/About/hero/3.jpg',
          altText: 'About Us Hero Image',
        });
      }
    } else {
      // No images found, use fallback
      setHeroImage({
        id: 1,
        imageUrl: 'https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/About/hero/3.jpg',
        altText: 'About Us Hero Image',
      });
    }
    
    setLoadingHeroImage(false);
  };

  const handleImageFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file');
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error('Image size must be less than 10MB');
      return;
    }

    setUploadingImage(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      
      setNewHeroImage({
        ...newHeroImage,
        imageUrl: data.url,
      });

      toast.success('Image uploaded successfully');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload image');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleAddOrUpdateImage = async () => {
    if (!newHeroImage.imageUrl) {
      toast.error('Please upload an image or provide a URL');
      return;
    }

    setUploadingImage(true);

    // If there's an existing image, update it; otherwise, create new
    if (heroImage) {
      // Update existing image
      const { error } = await apiCall(
        API_ENDPOINTS.heroImages.update(heroImage.id),
        {
          method: 'PUT',
          body: JSON.stringify({
            desktopUrl: newHeroImage.imageUrl,
            mobileUrl: newHeroImage.imageUrl,
            altText: newHeroImage.altText,
            page: 'about',
          }),
        }
      );

      if (error) {
        toast.error('Failed to update hero image');
        setUploadingImage(false);
        return;
      }

      setHeroImage({
        id: heroImage.id,
        imageUrl: newHeroImage.imageUrl,
        altText: newHeroImage.altText,
      });

      toast.success('Hero image updated successfully');
    } else {
      // Create new image
      const { data, error } = await apiCall(
        API_ENDPOINTS.heroImages.create,
        {
          method: 'POST',
          body: JSON.stringify({
            desktopUrl: newHeroImage.imageUrl,
            mobileUrl: newHeroImage.imageUrl,
            altText: newHeroImage.altText,
            displayOrder: 1,
            isActive: true,
            page: 'about',
          }),
        }
      );

      if (error) {
        toast.error('Failed to add hero image');
        setUploadingImage(false);
        return;
      }

      if (data && typeof data === 'object' && 'id' in data) {
        setHeroImage({
          id: (data as any).id,
          imageUrl: newHeroImage.imageUrl,
          altText: newHeroImage.altText,
        });
      }

      toast.success('Hero image added successfully');
    }

    setUploadingImage(false);
    setShowAddForm(false);
    setNewHeroImage({
      imageUrl: '',
      altText: 'About Us Hero Image',
    });
  };

  const handleDeleteImage = async () => {
    if (!heroImage) return;

    toast('Are you sure you want to delete the hero image?', {
      description: 'This action cannot be undone.',
      action: {
        label: 'Delete',
        onClick: async () => {
          const { error } = await apiCall(
            API_ENDPOINTS.heroImages.delete(heroImage.id),
            { method: 'DELETE' }
          );

          if (error) {
            toast.error('Failed to delete hero image');
          } else {
            setHeroImage(null);
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

  const handleEditImage = () => {
    if (heroImage) {
      setNewHeroImage({
        imageUrl: heroImage.imageUrl,
        altText: heroImage.altText,
      });
      setShowAddForm(true);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl text-white">About Page Manager</h2>
          <p className="text-gray-400 text-sm mt-1">
            Manage the hero image for the About page
          </p>
        </div>
      </div>

      {/* Preview Notice */}
      <Alert className="bg-[#1a1a1a] border-[#FDB813]">
        <AlertCircle className="h-4 w-4 text-[#FDB813]" />
        <AlertDescription className="text-gray-300">
          <strong className="text-[#FDB813]">Preview Mode:</strong> Changes made here use fallback data and will not persist after refresh.
        </AlertDescription>
      </Alert>

      {/* Hero Image Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl text-white flex items-center gap-2">
              <ImageIcon className="text-[#FDB813]" size={24} />
              Hero Image
            </h3>
            <p className="text-gray-400 text-sm mt-1">
              Only one hero image is supported for the About page
            </p>
          </div>
          {!showAddForm && (
            <Button
              onClick={() => {
                if (heroImage) {
                  handleEditImage();
                } else {
                  setShowAddForm(true);
                  setNewHeroImage({
                    imageUrl: '',
                    altText: 'About Us Hero Image',
                  });
                }
              }}
              className="bg-[#FDB813] hover:bg-[#e5a610] text-black"
            >
              {heroImage ? 'Update Hero Image' : 'Add Hero Image'}
            </Button>
          )}
        </div>

        <div className="space-y-4">
          {/* Current Hero Image Display */}
          {!showAddForm && heroImage && (
            <div className="bg-black p-4 rounded-lg border border-gray-700">
              <div className="aspect-video bg-black rounded overflow-hidden mb-3 border border-gray-700">
                <img 
                  src={heroImage.imageUrl} 
                  alt={heroImage.altText} 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="space-y-2">
                <div>
                  <Label className="text-gray-400 text-xs">Alt Text</Label>
                  <p className="text-white text-sm">{heroImage.altText}</p>
                </div>
                <div>
                  <Label className="text-gray-400 text-xs">Image URL</Label>
                  <p className="text-gray-400 text-xs break-all">{heroImage.imageUrl}</p>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button
                  onClick={handleEditImage}
                  className="bg-[#FDB813] hover:bg-[#e5a610] text-black"
                >
                  Update Image
                </Button>
                <Button
                  onClick={handleDeleteImage}
                  className="bg-[#2E2E2E] hover:bg-[#1a1a1a] text-[#FDB813] border border-[#FDB813]"
                >
                  Delete Image
                </Button>
              </div>
            </div>
          )}

          {/* No Image State */}
          {!showAddForm && !heroImage && !loadingHeroImage && (
            <div className="bg-[#2E2E2E] p-8 rounded-lg border border-gray-700">
              <div className="flex flex-col items-center justify-center text-center">
                <ImageIcon size={48} className="text-gray-600 mb-3" />
                <h4 className="text-white mb-2">No Hero Image Added</h4>
                <p className="text-gray-400 text-sm mb-4">
                  Add a hero image to showcase at the top of the About page.
                </p>
                <Button
                  onClick={() => setShowAddForm(true)}
                  className="bg-[#FDB813] hover:bg-[#e5a610] text-black"
                >
                  Add Hero Image
                </Button>
              </div>
            </div>
          )}

          {/* Loading State */}
          {loadingHeroImage && (
            <div className="bg-[#2E2E2E] p-8 rounded-lg border border-gray-700">
              <div className="flex flex-col items-center justify-center text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FDB813] mb-3"></div>
                <p className="text-gray-400 text-sm">Loading hero image...</p>
              </div>
            </div>
          )}

          {/* Add/Edit Form */}
          {showAddForm && (
            <div className="bg-black p-6 rounded-lg border border-gray-700 space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-white text-lg">
                  {heroImage ? 'Update Hero Image' : 'Add Hero Image'}
                </h4>
                <button
                  onClick={() => {
                    setShowAddForm(false);
                    setNewHeroImage({
                      imageUrl: '',
                      altText: 'About Us Hero Image',
                    });
                  }}
                  className="text-gray-400 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                {/* Image Upload */}
                <div className="space-y-2">
                  <Label htmlFor="imageFile" className="text-gray-300">Upload Image</Label>
                  <div className="space-y-2">
                    <input
                      ref={imageFileRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileUpload}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      onClick={() => imageFileRef.current?.click()}
                      disabled={uploadingImage}
                      className="w-full bg-[#2E2E2E] hover:bg-[#3E3E3E] text-white border border-[#FDB813]"
                    >
                      <Upload size={16} className="mr-2" />
                      {uploadingImage ? 'Uploading...' : 'Upload Image'}
                    </Button>
                    
                    {/* Manual URL Input */}
                    <div className="relative">
                      <Input
                        id="imageUrl"
                        placeholder="Or paste image URL here"
                        value={newHeroImage.imageUrl}
                        onChange={(e) => setNewHeroImage({ ...newHeroImage, imageUrl: e.target.value })}
                        className="bg-black border-gray-600 text-white pr-8 selection:bg-[#FDB813] selection:text-black"
                      />
                      {newHeroImage.imageUrl && (
                        <button
                          type="button"
                          onClick={() => setNewHeroImage({ ...newHeroImage, imageUrl: '' })}
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>
                    
                    {newHeroImage.imageUrl && (
                      <div className="aspect-video bg-black rounded overflow-hidden border border-gray-700">
                        <img src={newHeroImage.imageUrl} alt="Image preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Alt Text */}
                <div className="space-y-2">
                  <Label htmlFor="altText" className="text-gray-300">Alt Text (for accessibility)</Label>
                  <Input
                    id="altText"
                    placeholder="About Us Hero Image"
                    value={newHeroImage.altText}
                    onChange={(e) => setNewHeroImage({ ...newHeroImage, altText: e.target.value })}
                    className="bg-black border-gray-600 text-white selection:bg-[#FDB813] selection:text-black"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button 
                    onClick={handleAddOrUpdateImage} 
                    disabled={uploadingImage || !newHeroImage.imageUrl}
                    className="flex-1 bg-[#FDB813] text-black hover:bg-[#e5a711]"
                  >
                    {uploadingImage ? 'Saving...' : (heroImage ? 'Update Hero Image' : 'Add Hero Image')}
                  </Button>
                  <Button
                    onClick={() => {
                      setShowAddForm(false);
                      setNewHeroImage({
                        imageUrl: '',
                        altText: 'About Us Hero Image',
                      });
                    }}
                    className="bg-[#2E2E2E] hover:bg-[#1a1a1a] text-white border border-gray-600"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
