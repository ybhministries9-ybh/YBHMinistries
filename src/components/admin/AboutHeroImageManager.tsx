import { useState, useEffect, useCallback } from 'react';
import { Upload, Link as LinkIcon, Trash2, Image as ImageIcon, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { accentGold } from '../../utils/theme';
import { ConfirmDialog } from './ConfirmDialog';

interface AboutHeroImage {
  id: number;
  image_url: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

const RECOMMENDED_SIZES = '1920x1080 / 2560×1440 / 3840×2160 pixels';
const SUPPORTED_FORMATS = 'JPG, PNG';

export function AboutHeroImageManager() {
  const [heroImage, setHeroImage] = useState<AboutHeroImage | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [uploadMethod, setUploadMethod] = useState<'file' | 'url'>('file');

  // Fetch existing hero image
  const fetchHeroImage = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/about/hero-image');
      const result = await response.json();
      
      if (result.success && result.data) {
        setHeroImage(result.data);
      }
    } catch (error) {
      console.error('Error fetching hero image:', error);
      toast.error('Failed to fetch hero image');
    }
  }, []);

  useEffect(() => {
    fetchHeroImage();
  }, [fetchHeroImage]);

  // Cleanup object URLs on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Revoke previous preview URL to prevent memory leaks
    if (previewUrl && previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl);
    }

    setImageFile(file);
    const preview = URL.createObjectURL(file);
    setPreviewUrl(preview);
  }, [previewUrl]);

  const clearFileInput = useCallback(() => {
    const fileInput = document.getElementById('hero-image-file') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
    setImageFile(null);
    if (previewUrl && previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl('');
  }, [previewUrl]);

  const handleUploadFile = useCallback(async () => {
    if (!imageFile) return;

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', imageFile);
      formData.append('created_by', 'admin');

      const response = await fetch('/api/admin/about/hero-image', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        toast.success('Hero image uploaded successfully!');
        clearFileInput();
        await fetchHeroImage();
      } else {
        toast.error(result.error || 'Failed to upload image');
      }
    } catch (error) {
      console.error('Error uploading hero image:', error);
      toast.error('Failed to upload hero image');
    } finally {
      setIsLoading(false);
    }
  }, [imageFile, clearFileInput, fetchHeroImage]);

  const handleUploadUrl = useCallback(async () => {
    const trimmedUrl = imageUrl.trim();
    if (!trimmedUrl) {
      toast.error('Please enter an image URL');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/admin/about/hero-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image_url: trimmedUrl,
          created_by: 'admin',
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success('Hero image URL saved successfully!');
        setImageUrl('');
        setPreviewUrl('');
        await fetchHeroImage();
      } else {
        toast.error(result.error || 'Failed to save URL');
      }
    } catch (error) {
      console.error('Error saving hero image URL:', error);
      toast.error('Failed to save hero image URL');
    } finally {
      setIsLoading(false);
    }
  }, [imageUrl, fetchHeroImage]);

  const handleDelete = useCallback(async () => {
    if (!heroImage) return;

    setIsLoading(true);
    try {
      const response = await fetch(`/api/admin/about/hero-image?id=${heroImage.id}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (result.success) {
        toast.success('Hero image deleted successfully!');
        setHeroImage(null);
        setPreviewUrl('');
        setDeleteDialogOpen(false);
      } else {
        toast.error(result.error || 'Failed to delete image');
      }
    } catch (error) {
      console.error('Error deleting hero image:', error);
      toast.error('Failed to delete hero image');
    } finally {
      setIsLoading(false);
    }
  }, [heroImage]);

  const handleUrlChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setImageUrl(url);
    setPreviewUrl(url);
  }, []);

  return (
    <div className="space-y-6">
      {/* Hero Image Section */}
      <div className="bg-black rounded-lg p-6 border border-[#3a3a3a]">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl text-white flex items-center gap-2">
              <ImageIcon className="text-[#FDB813]" size={24} />
              Hero Image
            </h3>
            <p className="text-gray-400 text-sm mt-1">
              Manage the hero image displayed at the top of the About page
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Current Hero Image Display */}
          {heroImage && (
            <div className="bg-[#2E2E2E] rounded-lg p-4 border border-[#3a3a3a]">
              <Label className="text-gray-300 text-sm mb-2 block">Current Hero Image</Label>
              <div className="relative rounded-lg overflow-hidden bg-black border border-[#3a3a3a] group">
                <img
                  src={heroImage.image_url}
                  alt="About hero"
                  className="w-full h-auto object-contain"
                />
                <button
                  onClick={() => setDeleteDialogOpen(true)}
                  disabled={isLoading}
                  className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white rounded-lg transition-all cursor-pointer shadow-lg opacity-0 group-hover:opacity-100"
                  style={{ cursor: isLoading ? 'default' : 'pointer' }}
                  title="Delete Image"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Last updated: {new Date(heroImage.updated_at).toLocaleString()}
              </p>
            </div>
          )}

          {/* Upload Section */}
          <div className="bg-[#2E2E2E] rounded-lg p-6 border border-[#3a3a3a] space-y-4">
            <h4 className="text-white text-lg font-medium">
              {heroImage ? 'Update Hero Image' : 'Upload Hero Image'}
            </h4>

            {/* Upload Method Toggle - Tab Design with Underline */}
            <div className="flex border-b border-[#3a3a3a] mb-6">
              <button
                onClick={() => setUploadMethod('file')}
                className={`flex items-center gap-2 py-3 px-6 transition-all cursor-pointer relative ${
                  uploadMethod === 'file'
                    ? 'text-[#FDB813]'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
                style={{ cursor: 'pointer' }}
              >
                <Upload className="w-4 h-4" />
                <span className="font-medium">Upload File</span>
                {uploadMethod === 'file' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FDB813]" />
                )}
              </button>
              <button
                onClick={() => setUploadMethod('url')}
                className={`flex items-center gap-2 py-3 px-6 transition-all cursor-pointer relative ${
                  uploadMethod === 'url'
                    ? 'text-[#FDB813]'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
                style={{ cursor: 'pointer' }}
              >
                <LinkIcon className="w-4 h-4" />
                <span className="font-medium">Add URL</span>
                {uploadMethod === 'url' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FDB813]" />
                )}
              </button>
            </div>

            {/* File Upload Method */}
            {uploadMethod === 'file' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="hero-image-file" className="text-gray-300">Select Image File</Label>
                  <div className="flex items-stretch bg-black border border-[#3a3a3a] rounded-md overflow-hidden">
                    <label htmlFor="hero-image-file" className="bg-[#FDB813] text-black px-4 py-2 cursor-pointer hover:bg-[#e5a610] transition-colors whitespace-nowrap flex items-center font-semibold">
                      Choose File
                    </label>
                    <span className="text-white px-2 flex items-center">:</span>
                    <span className="text-white px-3 flex-1 flex items-center truncate">
                      {imageFile ? imageFile.name : 'No file chosen'}
                    </span>
                    <Input
                      id="hero-image-file"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      disabled={isLoading}
                      className="hidden"
                    />
                  </div>
                  <p className="text-sm text-gray-500">
                    Recommended size: {RECOMMENDED_SIZES}. Supports {SUPPORTED_FORMATS}.
                  </p>
                </div>

                {previewUrl && imageFile && (
                  <div className="space-y-2">
                    <Label className="text-gray-300 text-sm">Preview</Label>
                    <div className="rounded-lg overflow-hidden bg-black border border-[#3a3a3a] flex justify-center">
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="max-w-[50%] h-auto object-contain"
                      />
                    </div>
                  </div>
                )}

                <Button
                  onClick={handleUploadFile}
                  disabled={!imageFile || isLoading}
                  className="w-full text-black font-medium hover:opacity-90 cursor-pointer"
                  style={{ backgroundColor: accentGold, cursor: !imageFile || isLoading ? 'default' : 'pointer' }}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Image
                    </>
                  )}
                </Button>
              </div>
            )}

            {/* URL Upload Method */}
            {uploadMethod === 'url' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="image-url" className="text-gray-300">Image URL</Label>
                  <Input
                    id="image-url"
                    type="url"
                    placeholder="https://example.com/hero-image.jpg"
                    value={imageUrl}
                    onChange={handleUrlChange}
                    disabled={isLoading}
                    className="bg-black border-[#3a3a3a] text-white placeholder:text-gray-600"
                  />
                  <p className="text-sm text-gray-500">
                    Enter a publicly accessible image URL
                  </p>
                </div>

                {previewUrl && imageUrl && (
                  <div className="space-y-2">
                    <Label className="text-gray-300 text-sm">Preview</Label>
                    <div className="rounded-lg overflow-hidden bg-black border border-[#3a3a3a] flex justify-center">
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="max-w-[50%] h-auto object-contain"
                        onError={() => setPreviewUrl('')}
                      />
                    </div>
                  </div>
                )}

                <Button
                  onClick={handleUploadUrl}
                  disabled={!imageUrl.trim() || isLoading}
                  className="w-full text-black font-medium hover:opacity-90 cursor-pointer"
                  style={{ backgroundColor: accentGold, cursor: !imageUrl.trim() || isLoading ? 'default' : 'pointer' }}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <ImageIcon className="w-4 h-4 mr-2" />
                      Save Image URL
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>

          {/* Info Box */}
          <div className="p-4 bg-[#2E2E2E] border border-[#FDB813] rounded-lg">
            <h4 className="font-semibold text-[#FDB813] mb-2">Default Fallback Image</h4>
            <p className="text-sm text-gray-300">
              If no image is uploaded or if database connection fails, the website will automatically display a default hero image for the About page.
            </p>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteDialogOpen}
        title="Delete Hero Image"
        message="Are you sure you want to delete this hero image? This action cannot be undone. The website will use the default fallback image."
        onConfirm={handleDelete}
        onCancel={() => setDeleteDialogOpen(false)}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />
    </div>
  );
}
