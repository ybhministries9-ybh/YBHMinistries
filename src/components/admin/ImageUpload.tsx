import { useState } from 'react';
import { Upload, X, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
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

const getCompressionSettings = (imageType: string) => {
  const settings: Record<string, { quality: number; maxWidth: number; maxHeight: number }> = {
    hero: { quality: 0.85, maxWidth: 1920, maxHeight: 1080 },
    gallery: { quality: 0.85, maxWidth: 1600, maxHeight: 1200 },
    ministry: { quality: 0.85, maxWidth: 1200, maxHeight: 900 },
    founder: { quality: 0.85, maxWidth: 1200, maxHeight: 1200 },
    award: { quality: 0.85, maxWidth: 800, maxHeight: 800 },
    testimony: { quality: 0.85, maxWidth: 400, maxHeight: 400 },
  };
  return settings[imageType] || settings.gallery;
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

interface ImageUploadProps {
  bucket: string;
  onUploadComplete: (url: string) => void;
  currentImage?: string;
  maxSizeMB?: number;
  acceptedFormats?: string[];
  imageType?: 'ministry' | 'gallery' | 'award' | 'testimony' | 'founder' | 'hero';
}

export function ImageUpload({ 
  bucket, 
  onUploadComplete, 
  currentImage,
  maxSizeMB = 5,
  acceptedFormats = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'],
  imageType = 'gallery'
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [compressing, setCompressing] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentImage || null);
  const [error, setError] = useState<string | null>(null);
  const [compressionInfo, setCompressionInfo] = useState<{
    originalSize: number;
    compressedSize: number;
    ratio: number;
  } | null>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setError(null);
      setCompressionInfo(null);
      
      if (!event.target.files || event.target.files.length === 0) {
        return;
      }

      const originalFile = event.target.files[0];
      
      // Validate file
      const validation = validateImageFile(originalFile);
      if (!validation.valid) {
        setError(validation.error || 'Invalid file');
        return;
      }

      // Check if compression is needed
      const shouldCompress = needsCompression(originalFile);
      
      let fileToUpload = originalFile;
      let previewUrl = URL.createObjectURL(originalFile);
      
      if (shouldCompress) {
        setCompressing(true);
        
        try {
          // Get optimal compression settings for this image type
          const settings = getCompressionSettings(imageType);
          
          // Compress the image
          const compressed = await compressImage(originalFile, settings);
          
          fileToUpload = compressed.file;
          previewUrl = compressed.dataUrl;
          
          // Store compression info to display to user
          setCompressionInfo({
            originalSize: compressed.originalSize,
            compressedSize: compressed.compressedSize,
            ratio: compressed.compressionRatio
          });
          
          console.log('Image compressed:', {
            original: formatFileSize(compressed.originalSize),
            compressed: formatFileSize(compressed.compressedSize),
            saved: `${compressed.compressionRatio}%`
          });
          
        } catch (compressionError) {
          console.error('Compression failed, using original:', compressionError);
          // If compression fails, use original file
          fileToUpload = originalFile;
        } finally {
          setCompressing(false);
        }
      }

      // Validate final file size
      const maxSizeBytes = maxSizeMB * 1024 * 1024;
      if (fileToUpload.size > maxSizeBytes) {
        setError(`File size must be less than ${maxSizeMB}MB even after compression`);
        return;
      }

      setUploading(true);

      // Use data URL as the image source (no backend storage)
      console.log('Image selected (no backend storage):', {
        bucket,
        fileName: fileToUpload.name,
        size: formatFileSize(fileToUpload.size),
        type: fileToUpload.type
      });

      setPreview(previewUrl);
      onUploadComplete(previewUrl);
      setError('Note: Image preview only. No backend storage configured.');

    } catch (error) {
      console.error('Error processing file:', error);
      setError('An unexpected error occurred while processing the image');
    } finally {
      setUploading(false);
    }
  };

  const removeImage = () => {
    setPreview(null);
    setError(null);
    setCompressionInfo(null);
    onUploadComplete('');
  };

  return (
    <div className="space-y-4">
      {preview ? (
        <div className="space-y-3">
          <div className="relative">
            <img 
              src={preview} 
              alt="Preview" 
              className="w-full h-48 object-cover rounded-lg border border-gray-700"
            />
            <Button
              onClick={removeImage}
              variant="destructive"
              size="sm"
              className="absolute top-2 right-2"
              type="button"
            >
              <X size={16} />
            </Button>
          </div>
          
          {/* Compression Info */}
          {compressionInfo && (
            <div className="bg-green-900/30 border border-green-700 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="text-green-400 mt-0.5" size={18} />
                <div className="flex-1">
                  <p className="text-sm text-green-400 mb-1">
                    Image Optimized Successfully
                  </p>
                  <div className="text-xs text-green-300 space-y-1">
                    <div className="flex justify-between">
                      <span>Original size:</span>
                      <span>{formatFileSize(compressionInfo.originalSize)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Optimized size:</span>
                      <span>{formatFileSize(compressionInfo.compressedSize)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Space saved:</span>
                      <span className="text-green-400">{compressionInfo.ratio}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:bg-[#2E2E2E] transition-colors">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {compressing ? (
              <>
                <Loader2 className="animate-spin text-[#FDB813] mb-3" size={40} />
                <p className="text-sm text-gray-300">Optimizing image...</p>
                <p className="text-xs text-gray-500 mt-1">Compressing while maintaining quality</p>
              </>
            ) : uploading ? (
              <>
                <Loader2 className="animate-spin text-[#FDB813] mb-3" size={40} />
                <p className="text-sm text-gray-300">Processing...</p>
              </>
            ) : (
              <>
                <Upload className="text-gray-600 mb-3" size={40} />
                <p className="text-sm text-gray-300 mb-1">Click to upload image</p>
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF, WebP up to {maxSizeMB}MB
                </p>
                <p className="text-xs text-[#FDB813] mt-2">
                  ✨ Images are automatically optimized
                </p>
              </>
            )}
          </div>
          <input
            type="file"
            className="hidden"
            accept={acceptedFormats.join(',')}
            onChange={handleFileUpload}
            disabled={uploading || compressing}
          />
        </label>
      )}
      
      {error && (
        <div className="bg-yellow-900/30 border border-yellow-700 rounded-lg p-3">
          <div className="flex items-start gap-2">
            <AlertCircle className="text-yellow-400 mt-0.5" size={18} />
            <p className="text-sm text-yellow-300">{error}</p>
          </div>
        </div>
      )}
      
      {!preview && !uploading && !compressing && (
        <div className="bg-[#2E2E2E] border border-[#FDB813] rounded-lg p-3">
          <p className="text-xs text-gray-300">
            <strong className="text-[#FDB813]">Preview Mode:</strong> Images are optimized and previewed locally. 
            No backend storage is configured, so images will not persist after page refresh.
          </p>
        </div>
      )}
    </div>
  );
}
