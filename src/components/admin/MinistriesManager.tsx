import { useState, useEffect, useRef } from 'react';
import { Upload, Plus, Trash2, Edit2, Book, X, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { Alert, AlertDescription } from '../ui/alert';
import { toast } from 'sonner@2.0.3';
import { API_ENDPOINTS, apiCall } from '../../utils/api-config';

interface Ministry {
  id: string;
  name: string;
  slug: string;
  heroImageUrl: string;
  isActive: boolean;
}

export function MinistriesManager() {
  const [ministries, setMinistries] = useState<Ministry[]>([
    {
      id: '1',
      name: 'Hallel Music School',
      slug: 'hms',
      heroImageUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      isActive: true
    },
    {
      id: '2',
      name: 'Hallel Bible School',
      slug: 'bible-school',
      heroImageUrl: 'https://images.unsplash.com/photo-1519791883288-dc8bd696e667?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      isActive: true
    },
    {
      id: '3',
      name: 'Hallel Conferences',
      slug: 'conferences',
      heroImageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      isActive: true
    },
    {
      id: '4',
      name: 'Hallel Worship Day',
      slug: 'worship-day',
      heroImageUrl: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      isActive: true
    },
    {
      id: '5',
      name: 'Hallel Bible College',
      slug: 'bible-college',
      heroImageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      isActive: true
    },
    {
      id: '6',
      name: 'HMS Summer Training',
      slug: 'summer-training',
      heroImageUrl: 'https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      isActive: true
    },
    {
      id: '7',
      name: 'Hallel Church',
      slug: 'church',
      heroImageUrl: 'https://images.unsplash.com/photo-1438032005730-c779502df39b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      isActive: true
    }
  ]);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploadingImages, setUploadingImages] = useState<Record<string, boolean>>({});
  const imageFileRefs = useRef<Record<string, HTMLInputElement | null>>({});

  // Fetch ministries on mount
  useEffect(() => {
    fetchMinistries();
  }, []);

  const fetchMinistries = async () => {
    // In a real implementation, fetch from API
    // const { data, error } = await apiCall(API_ENDPOINTS.ministries.list);
    // if (!error && data) setMinistries(data);
  };

  const handleImageFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, ministryId: string) => {
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

    setUploadingImages({ ...uploadingImages, [ministryId]: true });

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
      
      handleUpdate(ministryId, 'heroImageUrl', data.url);
      toast.success('Hero image uploaded successfully');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload image');
    } finally {
      setUploadingImages({ ...uploadingImages, [ministryId]: false });
    }
  };

  const handleUpdate = (id: string, field: keyof Ministry, value: any) => {
    setMinistries(ministries.map(m => m.id === id ? { ...m, [field]: value } : m));
  };

  const handleSaveMinistry = async (ministryId: string) => {
    const ministry = ministries.find(m => m.id === ministryId);
    if (!ministry) return;

    // Validate required fields
    if (!ministry.name.trim()) {
      toast.error('Ministry name is required');
      return;
    }

    if (!ministry.heroImageUrl) {
      toast.error('Hero image is required');
      return;
    }

    // In real implementation, save to API
    // const { error } = await apiCall(
    //   API_ENDPOINTS.ministries.update(ministryId),
    //   {
    //     method: 'PUT',
    //     body: JSON.stringify(ministry),
    //   }
    // );

    toast.success('Ministry updated successfully');
    setEditingId(null);
  };

  const handleToggleActive = (id: string) => {
    const ministry = ministries.find(m => m.id === id);
    if (!ministry) return;

    const newStatus = !ministry.isActive;
    handleUpdate(id, 'isActive', newStatus);
    
    toast.success(
      newStatus 
        ? `${ministry.name} is now active` 
        : `${ministry.name} is now inactive`
    );
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl text-white">Ministries Manager</h2>
          <p className="text-gray-400 text-sm mt-1">
            Manage ministry hero images, names, and active status
          </p>
        </div>
      </div>

      {/* Preview Notice */}
      <Alert className="bg-[#1a1a1a] border-[#FDB813]">
        <AlertCircle className="h-4 w-4 !text-[#FDB813]" />
        <AlertDescription className="text-gray-300">
          <strong className="text-[#FDB813]">Preview Mode:</strong> Changes made here use fallback data and will not persist after refresh.
        </AlertDescription>
      </Alert>

      {/* Ministries List */}
      <div className="space-y-4">
        {ministries.map((ministry) => (
          <div key={ministry.id} className="bg-black p-4 rounded-lg border border-gray-700">
            {editingId === ministry.id ? (
              /* Edit Mode */
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-white text-lg flex items-center gap-2">
                    <Book className="text-[#FDB813]" size={20} />
                    Edit Ministry
                  </h4>
                  <button
                    onClick={() => setEditingId(null)}
                    className="text-gray-400 hover:text-white"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Ministry Name */}
                <div className="space-y-2">
                  <Label className="text-gray-300">Ministry Name</Label>
                  <Input
                    value={ministry.name}
                    onChange={(e) => handleUpdate(ministry.id, 'name', e.target.value)}
                    placeholder="Ministry Name"
                    className="bg-black border-gray-600 text-white selection:bg-[#FDB813] selection:text-black"
                  />
                </div>

                {/* Slug (Read-only info) */}
                <div className="space-y-2">
                  <Label className="text-gray-300">URL Slug (Read-only)</Label>
                  <Input
                    value={ministry.slug}
                    disabled
                    className="bg-black border-gray-600 text-gray-500"
                  />
                  <p className="text-xs text-gray-500">
                    This is the URL identifier for the ministry and cannot be changed
                  </p>
                </div>

                {/* Hero Image */}
                <div className="space-y-2">
                  <Label className="text-gray-300">Hero Image</Label>
                  <div className="space-y-2">
                    {/* File Upload Button */}
                    <input
                      ref={(el) => {
                        if (imageFileRefs.current) {
                          imageFileRefs.current[ministry.id] = el;
                        }
                      }}
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageFileUpload(e, ministry.id)}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      onClick={() => imageFileRefs.current[ministry.id]?.click()}
                      disabled={uploadingImages[ministry.id]}
                      className="w-full bg-[#2E2E2E] hover:bg-[#3E3E3E] text-white border border-[#FDB813]"
                    >
                      <Upload size={16} className="mr-2" />
                      {uploadingImages[ministry.id] ? 'Uploading...' : 'Upload Hero Image'}
                    </Button>
                    
                    {/* Manual URL Input */}
                    <div className="relative">
                      <Input
                        placeholder="Or paste image URL here"
                        value={ministry.heroImageUrl}
                        onChange={(e) => handleUpdate(ministry.id, 'heroImageUrl', e.target.value)}
                        className="bg-black border-gray-600 text-white pr-8 selection:bg-[#FDB813] selection:text-black"
                      />
                      {ministry.heroImageUrl && (
                        <button
                          type="button"
                          onClick={() => handleUpdate(ministry.id, 'heroImageUrl', '')}
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>
                    
                    {/* Image Preview */}
                    {ministry.heroImageUrl && (
                      <div className="aspect-video bg-black rounded overflow-hidden border border-gray-700">
                        <img 
                          src={ministry.heroImageUrl} 
                          alt={ministry.name} 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Active Status */}
                <div className="flex items-center space-x-2 py-2">
                  <Checkbox
                    id={`active-${ministry.id}`}
                    checked={ministry.isActive}
                    onCheckedChange={(checked) => handleUpdate(ministry.id, 'isActive', checked)}
                    className="border-gray-600 data-[state=checked]:bg-[#FDB813] data-[state=checked]:border-[#FDB813]"
                  />
                  <Label
                    htmlFor={`active-${ministry.id}`}
                    className="text-gray-300 cursor-pointer"
                  >
                    Active (Ministry is visible on the website)
                  </Label>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <Button
                    onClick={() => handleSaveMinistry(ministry.id)}
                    className="flex-1 bg-[#FDB813] hover:bg-[#e5a610] text-black"
                  >
                    Save Changes
                  </Button>
                  <Button
                    onClick={() => setEditingId(null)}
                    className="bg-[#2E2E2E] hover:bg-[#1a1a1a] text-white border border-gray-600"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              /* View Mode */
              <div className="flex items-start gap-4">
                {/* Hero Image Thumbnail */}
                {ministry.heroImageUrl && (
                  <div className="relative w-40 h-24 flex-shrink-0 rounded overflow-hidden border border-gray-700">
                    <img 
                      src={ministry.heroImageUrl} 
                      alt={ministry.name}
                      className="w-full h-full object-cover"
                    />
                    {!ministry.isActive && (
                      <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                        <EyeOff size={24} className="text-gray-400" />
                      </div>
                    )}
                  </div>
                )}

                {/* Ministry Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Book className="text-[#FDB813]" size={18} />
                        <h4 className="text-white text-lg">{ministry.name}</h4>
                        <span 
                          className={`text-xs px-2 py-1 rounded ${
                            ministry.isActive 
                              ? 'bg-green-600 text-white' 
                              : 'bg-gray-600 text-gray-300'
                          }`}
                        >
                          {ministry.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400">
                        /{ministry.slug}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleToggleActive(ministry.id)}
                        size="sm"
                        className="bg-[#2E2E2E] hover:bg-[#1a1a1a] text-white border border-gray-600"
                        title={ministry.isActive ? 'Deactivate' : 'Activate'}
                      >
                        {ministry.isActive ? <EyeOff size={14} /> : <Eye size={14} />}
                      </Button>
                      <Button
                        onClick={() => setEditingId(ministry.id)}
                        size="sm"
                        className="bg-[#2E2E2E] hover:bg-[#1a1a1a] text-[#FDB813] border border-[#FDB813]"
                      >
                        <Edit2 size={14} className="mr-1" />
                        Edit
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Info Box */}
      <div className="bg-[#1a1a1a] border border-gray-700 rounded-lg p-4">
        <h4 className="text-white mb-2 flex items-center gap-2">
          <AlertCircle size={16} className="!text-[#FDB813]" />
          Ministry Management Information
        </h4>
        <ul className="text-gray-400 text-sm space-y-1">
          <li>• <strong>Hero Image:</strong> Main image displayed at the top of the ministry page (recommended: 1920x1080px)</li>
          <li>• <strong>Ministry Name:</strong> Displayed as the page title and in navigation</li>
          <li>• <strong>Active Status:</strong> When inactive, the ministry won't be visible on the website</li>
          <li>• <strong>URL Slug:</strong> Cannot be changed as it affects page routing and translations</li>
          <li>• All content sections (mission, vision, etc.) are managed through translation files</li>
        </ul>
      </div>
    </div>
  );
}
