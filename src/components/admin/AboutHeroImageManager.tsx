import { useState, useEffect, useCallback, useRef } from 'react';
import { Upload, Trash2, Image as ImageIcon, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { accentGold } from '../../utils/theme';
import { ConfirmDialog } from './ConfirmDialog';
import { useAdminUser } from '@/hooks/useAdminUser';

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
  const { isViewer } = useAdminUser();
  const [heroImage, setHeroImage] = useState<AboutHeroImage | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  // Only file upload supported here

  // Fetch existing hero image
  const fetchHeroImage = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/about/hero-image');
      const result = await response.json();
      
      if (result.success && result.data) {
        setHeroImage(result.data);
      }
    } catch (error) {
      if (process.env.NODE_ENV !== 'production') console.error('Error fetching hero image:', error);
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

  const processSelectedFile = useCallback((file: File | null) => {
    if (!file) return;
    if (previewUrl && previewUrl.startsWith('blob:')) URL.revokeObjectURL(previewUrl);
    setImageFile(file);
    const preview = URL.createObjectURL(file);
    setPreviewUrl(preview);
  }, [previewUrl]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    processSelectedFile(file);
  }, [processSelectedFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    if (isViewer) return;
    const file = e.dataTransfer?.files?.[0] ?? null;
    processSelectedFile(file);
  }, [processSelectedFile, isViewer]);

  const clearFileInput = useCallback(() => {
    if (fileInputRef.current) fileInputRef.current.value = '';
    setImageFile(null);
    if (previewUrl && previewUrl.startsWith('blob:')) URL.revokeObjectURL(previewUrl);
    setPreviewUrl('');
  }, [previewUrl]);

  const handleUploadFile = useCallback(async () => {
    if (!imageFile) return;

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', imageFile);

      const rawToken = localStorage.getItem('admin_token');
      let token = '';
      if (rawToken) try { token = JSON.parse(rawToken).token || rawToken } catch (e) { token = rawToken }

      const headers: Record<string,string> = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const response = await fetch('/api/admin/about/hero-image', {
        method: 'POST',
        headers,
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
      if (process.env.NODE_ENV !== 'production') console.error('Error uploading hero image:', error);
      toast.error('Failed to upload hero image');
    } finally {
      setIsLoading(false);
    }
  }, [imageFile, clearFileInput, fetchHeroImage]);

  // URL uploads removed — only file uploads supported

  const handleDelete = useCallback(async () => {
    if (!heroImage) return;

    setIsLoading(true);
    try {
      const rawToken = localStorage.getItem('admin_token');
      let token = '';
      if (rawToken) try { token = JSON.parse(rawToken).token || rawToken } catch (e) { token = rawToken }
      const headers: Record<string,string> = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const response = await fetch(`/api/admin/about/hero-image?id=${heroImage.id}`, {
        method: 'DELETE',
        headers
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
      if (process.env.NODE_ENV !== 'production') console.error('Error deleting hero image:', error);
      toast.error('Failed to delete hero image');
    } finally {
      setIsLoading(false);
    }
  }, [heroImage]);

  // URL upload removed — no handler

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
              <div className="relative rounded-lg overflow-hidden group p-2 inline-block">
                <img
                  src={heroImage.image_url}
                  alt="About hero"
                  className="h-60 w-auto object-cover rounded"
                />
                <button
                  onClick={() => setDeleteDialogOpen(true)}
                  disabled={isLoading || isViewer}
                  className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white rounded transition-all cursor-pointer shadow-lg opacity-0 group-hover:opacity-100"
                  style={{ cursor: isLoading || isViewer ? 'default' : 'pointer' }}
                  title="Delete Image"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* Upload Section */}
          <div className="bg-[#2E2E2E] rounded-lg p-6 border border-[#3a3a3a] space-y-4">
            <h4 className="text-white text-lg font-medium">
              {heroImage ? 'Update Hero Image' : 'Upload Hero Image'}
            </h4>

            {/* File Upload */}

            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-gray-300">Image Files (Single)</Label>
                <div
                  onDragOver={handleDragOver}
                  onDragEnter={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => { if (!isViewer) fileInputRef.current?.click(); }}
                  className={`w-full min-h-[120px] flex flex-col items-center justify-center gap-2 bg-black border-2 border-dashed border-[#3a3a3a] rounded-md overflow-hidden cursor-pointer px-4 py-6 ${isDragActive ? 'ring-2 ring-[#FDB813]' : ''}${isViewer ? ' opacity-50 cursor-not-allowed' : ''}`}
                >
                  <input
                    id="hero-image-file"
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    disabled={isLoading || isViewer}
                    className="hidden"
                  />
                  <div className="text-center">
                    <div className="text-gray-200 font-medium">Click or drag image here to upload</div>
                    <div className="text-xs text-gray-500 mt-1">PNG or JPG, max 2MB</div>
                  </div>
                </div>
                <p className="text-sm text-gray-500">
                  Recommended size: {RECOMMENDED_SIZES}. Supports {SUPPORTED_FORMATS}.
                </p>

                <div className="pt-2">
                  <Button
                    onClick={handleUploadFile}
                    disabled={!imageFile || isLoading || isViewer}
                    className="text-black font-medium hover:opacity-90"
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
              </div>

              {previewUrl && imageFile && (
                <div className="space-y-2">
                  <Label className="text-gray-300 text-sm">Preview</Label>
                  <div className="w-full flex justify-start p-0">
                    <div className="relative inline-block">
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="h-40 w-auto object-contain rounded"
                      />

                      {/* filename overlay removed per request */}

                      {/* delete overlay button for preview (clears selection) */}
                      <button
                        onClick={clearFileInput}
                        disabled={isViewer}
                        title="Remove selected file"
                        className={`absolute right-0 top-0 -mt-1 -mr-1 w-8 h-8 flex items-center justify-center bg-red-600 hover:bg-red-700 text-white rounded-sm shadow-lg${isViewer ? ' opacity-50 cursor-not-allowed' : ''}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              
            </div>
          </div>

          {/* Info Box removed per UI update */}
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
