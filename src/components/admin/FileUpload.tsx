import { useState } from 'react';
import { Upload, X, Loader2, AlertCircle, FileText, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/button';

// Utility functions for file handling
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};

const validateFile = (file: File, acceptedTypes: string[]): { valid: boolean; error?: string } => {
  if (!acceptedTypes.includes(file.type)) {
    return { valid: false, error: 'Invalid file type. Please upload a supported file format.' };
  }
  return { valid: true };
};

interface FileUploadProps {
  onUploadComplete: (url: string, fileName?: string) => void;
  currentFile?: string;
  currentFileName?: string;
  maxSizeMB?: number;
  acceptedFormats?: string[];
  acceptedExtensions?: string[];
  label?: string;
}

export function FileUpload({ 
  onUploadComplete, 
  currentFile,
  currentFileName,
  maxSizeMB = 10,
  acceptedFormats = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  acceptedExtensions = ['.pdf', '.doc', '.docx'],
  label = 'Click to upload file'
}: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [fileInfo, setFileInfo] = useState<{ name: string; size: number; url: string } | null>(
    currentFile && currentFileName ? { name: currentFileName, size: 0, url: currentFile } : null
  );
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setError(null);
      
      if (!event.target.files || event.target.files.length === 0) {
        return;
      }

      const file = event.target.files[0];
      
      // Validate file type
      const validation = validateFile(file, acceptedFormats);
      if (!validation.valid) {
        setError(validation.error || 'Invalid file');
        return;
      }

      // Validate file size
      const maxSizeBytes = maxSizeMB * 1024 * 1024;
      if (file.size > maxSizeBytes) {
        setError(`File size must be less than ${maxSizeMB}MB`);
        return;
      }

      setUploading(true);

      // Convert file to data URL for storage (no backend)
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        
        setFileInfo({
          name: file.name,
          size: file.size,
          url: dataUrl
        });
        
        onUploadComplete(dataUrl, file.name);
        setError('Note: File preview only. No backend storage configured.');
        setUploading(false);
      };
      
      reader.onerror = () => {
        setError('Failed to read file');
        setUploading(false);
      };
      
      reader.readAsDataURL(file);

    } catch (error) {
      console.error('Error processing file:', error);
      setError('An unexpected error occurred while processing the file');
      setUploading(false);
    }
  };

  const removeFile = () => {
    setFileInfo(null);
    setError(null);
    onUploadComplete('');
  };

  return (
    <div className="space-y-4">
      {fileInfo ? (
        <div className="space-y-3">
          <div className="bg-[#2E2E2E] border border-gray-600 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 bg-[#FDB813] bg-opacity-20 p-3 rounded-lg">
                <FileText className="text-[#FDB813]" size={24} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium truncate">{fileInfo.name}</p>
                {fileInfo.size > 0 && (
                  <p className="text-gray-400 text-xs mt-1">{formatFileSize(fileInfo.size)}</p>
                )}
                <div className="flex items-center gap-1 mt-2">
                  <CheckCircle2 className="text-green-400" size={14} />
                  <span className="text-green-400 text-xs">File uploaded</span>
                </div>
              </div>
              <Button
                onClick={removeFile}
                variant="destructive"
                size="sm"
                type="button"
              >
                <X size={16} />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:bg-[#2E2E2E] transition-colors">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {uploading ? (
              <>
                <Loader2 className="animate-spin text-[#FDB813] mb-3" size={40} />
                <p className="text-sm text-gray-300">Processing...</p>
              </>
            ) : (
              <>
                <Upload className="text-gray-600 mb-3" size={40} />
                <p className="text-sm text-gray-300 mb-1">{label}</p>
                <p className="text-xs text-gray-500">
                  {acceptedExtensions.join(', ').toUpperCase()} up to {maxSizeMB}MB
                </p>
              </>
            )}
          </div>
          <input
            type="file"
            className="hidden"
            accept={acceptedExtensions.join(',')}
            onChange={handleFileUpload}
            disabled={uploading}
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
      
      {!fileInfo && !uploading && (
        <div className="bg-[#2E2E2E] border border-[#FDB813] rounded-lg p-3">
          <p className="text-xs text-gray-300">
            <strong className="text-[#FDB813]">Preview Mode:</strong> Files are previewed locally. 
            No backend storage is configured, so files will not persist after page refresh.
          </p>
        </div>
      )}
    </div>
  );
}
