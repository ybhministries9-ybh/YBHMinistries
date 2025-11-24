import { useState, useCallback } from 'react';
import { Upload, X, Loader2, CheckCircle2, AlertCircle, Image as ImageIcon, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';

// Utility functions for image handling
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};

const validateImageFile = (file: File): { valid: boolean; error?: string } => {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  if (!validTypes.includes(file.type)) {
    return { valid: false, error: 'Invalid file type. Please upload an image file.' };
  }
  return { valid: true };
};

const needsCompression = (file: File): boolean => {
  return file.size > 500 * 1024; // Compress if larger than 500KB
};

const compressImage = (
  file: File,
  settings: { quality: number; maxWidth: number; maxHeight: number }
): Promise<{
  file: File;
  dataUrl: string;
  originalSize: number;
  compressedSize: number;
  compressionRatio: number;
}> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let { width, height } = img;
        
        // Resize if needed
        if (width > settings.maxWidth || height > settings.maxHeight) {
          const ratio = Math.min(settings.maxWidth / width, settings.maxHeight / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }
        
        canvas.width = width;
        canvas.height = height;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Failed to get canvas context'));
          return;
        }
        
        ctx.drawImage(img, 0, 0, width, height);
        
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Failed to compress image'));
              return;
            }
            
            const compressedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now(),
            });
            
            const dataUrl = canvas.toDataURL(file.type, settings.quality);
            const compressionRatio = Math.round((1 - blob.size / file.size) * 100);
            
            resolve({
              file: compressedFile,
              dataUrl,
              originalSize: file.size,
              compressedSize: blob.size,
              compressionRatio,
            });
          },
          file.type,
          settings.quality
        );
      };
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
};

interface UploadedImage {
  id: string;
  file: File;
  preview: string;
  status: 'pending' | 'compressing' | 'complete' | 'error';
  originalSize?: number;
  compressedSize?: number;
  compressionRatio?: number;
  error?: string;
}

interface MultipleImageUploadProps {
  onUploadComplete: (images: { url: string; category: string }[]) => void;
  onClose: () => void;
  category: string;
  maxSizeMB?: number;
}

export function MultipleImageUpload({ 
  onUploadComplete, 
  onClose,
  category,
  maxSizeMB = 5
}: MultipleImageUploadProps) {
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  // Only support file upload mode

  const processFiles = async (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    const maxSizeBytes = maxSizeMB * 1024 * 1024;

    // Create initial entries for all files
    const newImages: UploadedImage[] = fileArray.map((file, index) => ({
      id: `${Date.now()}-${index}`,
      file,
      preview: '',
      status: 'pending' as const,
    }));

    setUploadedImages(prev => [...prev, ...newImages]);
    setIsProcessing(true);

    // Process each file
    for (const image of newImages) {
      try {
        // Validate file
        const validation = validateImageFile(image.file);
        if (!validation.valid) {
          setUploadedImages(prev => prev.map(img =>
            img.id === image.id
              ? { ...img, status: 'error' as const, error: validation.error }
              : img
          ));
          continue;
        }
        // Check file size
        if (image.file.size > maxSizeBytes) {
          setUploadedImages(prev => prev.map(img =>
            img.id === image.id
              ? { ...img, status: 'error' as const, error: `File size must be less than ${maxSizeMB}MB` }
              : img
          ));
          continue;
        }
        // Check if compression is needed
        const shouldCompress = needsCompression(image.file);
        let fileToUpload = image.file;
        let previewUrl = '';
        if (shouldCompress) {
          setUploadedImages(prev => prev.map(img =>
            img.id === image.id
              ? { ...img, status: 'compressing' as const }
              : img
          ));
          try {
            const settings = { quality: 0.85, maxWidth: 1600, maxHeight: 1200 };
            const compressed = await compressImage(image.file, settings);
            fileToUpload = compressed.file;
            previewUrl = compressed.dataUrl;
          } catch (compressionError) {
            fileToUpload = image.file;
          }
        }
        // Upload to Vercel Blob via /api/upload
        const formData = new FormData();
        formData.append('file', fileToUpload);
        formData.append('folder', category);
        try {
          const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
          });
          const result = await response.json();
          if (response.ok && result.url) {
            setUploadedImages(prev => prev.map(img =>
              img.id === image.id
                ? {
                    ...img,
                    status: 'complete' as const,
                    preview: result.url,
                    originalSize: fileToUpload.size,
                    compressedSize: fileToUpload.size,
                    compressionRatio: shouldCompress ? Math.round((1 - fileToUpload.size / image.file.size) * 100) : 0
                  }
                : img
            ));
          } else {
            setUploadedImages(prev => prev.map(img =>
              img.id === image.id
                ? { ...img, status: 'error' as const, error: result.error || 'Failed to upload image' }
                : img
            ));
          }
        } catch (err) {
          setUploadedImages(prev => prev.map(img =>
            img.id === image.id
              ? { ...img, status: 'error' as const, error: 'Failed to upload image' }
              : img
          ));
        }
      } catch (error) {
        setUploadedImages(prev => prev.map(img =>
          img.id === image.id
            ? { ...img, status: 'error' as const, error: 'Failed to process image' }
            : img
        ));
      }
    }
    setIsProcessing(false);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      processFiles(event.target.files);
    }
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  }, []);

  const removeImage = (id: string) => {
    setUploadedImages(prev => prev.filter(img => img.id !== id));
  };

  // URL management functions
  // Removed URL management functions

  const handleComplete = () => {
    // Only handle file upload mode
    const validImages = uploadedImages
      .filter(img => img.status === 'complete')
      .map(img => ({
        url: img.preview,
        category
      }));
    onUploadComplete(validImages);
  };

  const completedCount = uploadedImages.filter(img => img.status === 'complete').length;
  const errorCount = uploadedImages.filter(img => img.status === 'error').length;
  const processingCount = uploadedImages.filter(img => img.status === 'compressing' || img.status === 'pending').length;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-[#1a1a1a] rounded-lg border border-gray-700 w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <div>
            <h3 className="text-xl text-white">Upload Multiple Images</h3>
            <p className="text-sm text-gray-400 mt-1">
              {uploadedImages.length === 0 
                ? 'Select or drag & drop multiple images'
                : `${completedCount} completed, ${errorCount} errors, ${processingCount} processing`}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Only file upload mode supported */}
        <div className="flex-1 overflow-y-auto p-4">
          {uploadedImages.length === 0 ? (
            <label
              className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer transition-all ${
                isDragging
                  ? 'border-[#FDB813] bg-[#FDB813]/10'
                  : 'border-gray-600 hover:bg-[#2E2E2E]'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className={`mb-3 ${isDragging ? 'text-[#FDB813]' : 'text-gray-600'}`} size={48} />
                <p className="text-sm text-gray-300 mb-1">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500">PNG, JPG, GIF, WebP up to {maxSizeMB}MB per file</p>
                <p className="text-xs text-[#FDB813] mt-2">
                  ✨ Select multiple files at once
                </p>
              </div>
              <input
                type="file"
                className="hidden"
                accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                multiple
                onChange={handleFileSelect}
                disabled={isProcessing}
              />
            </label>
          ) : (
            <div className="space-y-4">
              {/* Add More Button */}
              <label className="flex items-center justify-center w-full h-20 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:bg-[#2E2E2E] transition-colors">
                <div className="flex items-center gap-2 text-gray-400">
                  <Upload size={20} />
                  <span className="text-sm">Add More Images</span>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                  multiple
                  onChange={handleFileSelect}
                  disabled={isProcessing}
                />
              </label>

              {/* Image Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {uploadedImages.map((image) => (
                  <div
                    key={image.id}
                    className="relative bg-[#2E2E2E] rounded-lg border border-gray-700 overflow-hidden"
                  >
                    {/* Image Preview */}
                    <div className="aspect-square bg-[#1a1a1a] overflow-hidden flex items-center justify-center">
                      {image.preview ? (
                        <img
                          src={image.preview}
                          alt="Upload preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-gray-600 flex items-center justify-center w-full h-full"><ImageIcon size={36} /></div>
                      )}
                    </div>

                    {/* Status Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex items-end p-2">
                      <div className="w-full">
                        {image.status === 'pending' && (
                          <div className="flex items-center gap-2 text-xs text-gray-400">
                            <Loader2 size={14} className="animate-spin" />
                            <span>Pending...</span>
                          </div>
                        )}
                        {image.status === 'compressing' && (
                          <div className="flex items-center gap-2 text-xs text-[#FDB813]">
                            <Loader2 size={14} className="animate-spin" />
                            <span>Optimizing...</span>
                          </div>
                        )}
                        {image.status === 'complete' && (
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-xs text-green-400">
                              <CheckCircle2 size={14} />
                              <span>Ready</span>
                            </div>
                            {image.compressionRatio && image.compressionRatio > 0 && (
                              <div className="text-[10px] text-green-300">
                                Saved {image.compressionRatio}%
                              </div>
                            )}
                          </div>
                        )}
                        {image.status === 'error' && (
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-xs text-red-400">
                              <AlertCircle size={14} />
                              <span>Error</span>
                            </div>
                            {image.error && (
                              <div className="text-[10px] text-red-300 line-clamp-2">
                                {image.error}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeImage(image.id)}
                      className="absolute top-2 right-2 p-1 bg-black/70 rounded-full text-white hover:bg-red-600 transition-colors z-10"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-4 p-4 border-t border-gray-700">
          <div className="text-sm text-gray-400">
            {uploadedImages.length > 0 && (
              <>
                {completedCount} of {uploadedImages.length} images ready
                {errorCount > 0 && <span className="text-red-400 ml-2">({errorCount} failed)</span>}
              </>
            )}
          </div>
          <div className="flex gap-2">
            <Button
              onClick={onClose}
              className="bg-[#2E2E2E] hover:bg-[#3E3E3E] text-white border border-gray-600"
            >
              Cancel
            </Button>
            <Button
              onClick={handleComplete}
              disabled={completedCount === 0 || isProcessing}
              className="bg-[#FDB813] hover:bg-[#e5a610] text-black"
            >
              <Upload size={16} className="mr-2" />
              Add {completedCount} Image{completedCount !== 1 ? 's' : ''}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
