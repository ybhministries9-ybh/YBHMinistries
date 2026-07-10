import { useState, useEffect } from 'react';
import { Upload, X, Eye, EyeOff, Image as ImageIcon, AlertCircle, GripVertical, Plus } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Alert, AlertDescription } from '../ui/alert';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { toast } from 'sonner';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { API_ENDPOINTS, apiCall } from '../../utils/api-config';
import { useAdminUser } from '@/hooks/useAdminUser';

interface HeroImage {
  id: number;
  desktopUrl: string;
  mobileUrl: string;
  altText: string;
  displayOrder: number;
  isActive: boolean;
}

function SortableImageCard({ image, onToggle, onDelete, isViewer = false }: {
  image: HeroImage;
  onToggle: (id: number, currentStatus: boolean) => void;
  onDelete: (id: number) => void;
  isViewer?: boolean;
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
      <Card className="overflow-hidden bg-black border-gray-700">
        <div className="flex items-start gap-3 p-4">
          {/* Drag Handle */}
          <div
            {...(isViewer ? {} : attributes)}
            {...(isViewer ? {} : listeners)}
            className={`pt-2 ${isViewer ? 'cursor-default' : 'cursor-grab active:cursor-grabbing'}`}
          >
            <GripVertical className="text-gray-600" size={20} />
          </div>

          {/* Desktop Preview */}
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between mb-2">
              <Label className="text-xs text-gray-300">Desktop (16:9)</Label>
              <Badge variant={image.isActive ? 'default' : 'secondary'} className={image.isActive ? 'bg-[#FDB813] text-black' : 'bg-gray-700 text-gray-300'}>
                {image.isActive ? 'Active' : 'Inactive'}
              </Badge>
            </div>
            <div className="relative aspect-video bg-[#2E2E2E] rounded overflow-hidden">
              <img
                src={image.desktopUrl}
                alt={image.altText}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-xs text-gray-500 truncate">{image.desktopUrl}</p>
          </div>

          {/* Mobile Preview */}
          <div className="w-24 space-y-2">
            <Label className="text-xs text-gray-300">Mobile (9:16)</Label>
            <div className="relative aspect-[9/16] bg-[#2E2E2E] rounded overflow-hidden">
              <img
                src={image.mobileUrl}
                alt={image.altText}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-xs text-gray-500 truncate">{image.mobileUrl.substring(0, 15)}...</p>
          </div>
        </div>

        {/* Actions */}
        <CardContent className="p-4 pt-0 border-t border-gray-700">
          <div className="flex items-center gap-2">
            <Button
              variant={image.isActive ? 'outline' : 'default'}
              size="sm"
              onClick={() => onToggle(image.id, image.isActive)}
              disabled={isViewer}
              className={`flex-1 ${image.isActive ? 'border-gray-600 text-gray-300 hover:bg-[#2E2E2E]' : 'bg-[#FDB813] text-black hover:bg-[#e5a711]'}${isViewer ? ' opacity-50 cursor-not-allowed' : ''}`}
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
              variant="destructive"
              size="sm"
              onClick={() => onDelete(image.id)}
              disabled={isViewer}
              className={`flex-1 bg-red-900/30 text-red-400 hover:bg-red-900/50${isViewer ? ' opacity-50 cursor-not-allowed' : ''}`}
            >
              <X size={16} className="mr-1" />
              Delete
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function HeroImageManager() {
  const { isViewer } = useAdminUser();
  const [heroImages, setHeroImages] = useState<HeroImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newImage, setNewImage] = useState({
    desktopUrl: '',
    mobileUrl: '',
    altText: 'Ministry Hero Image',
  });
  const [uploading, setUploading] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    fetchHeroImages();
  }, []);

  const fetchHeroImages = async () => {
    setLoading(true);
    const { data, error } = await apiCall<{ images: HeroImage[] }>(
      API_ENDPOINTS.heroImages.list
    );

    if (error) {
      toast.error('Failed to load hero images');
      console.error(error);
    } else if (data?.images) {
      setHeroImages(data.images);
    }
    setLoading(false);
  };

  const handleAddImage = async () => {
    if (!newImage.desktopUrl || !newImage.mobileUrl) {
      toast.error('Both desktop and mobile URLs are required');
      return;
    }

    setUploading(true);
    const { data, error } = await apiCall<{ image: HeroImage }>(
      API_ENDPOINTS.heroImages.create,
      {
        method: 'POST',
        body: JSON.stringify(newImage),
      }
    );

    if (error) {
      toast.error(error);
    } else {
      toast.success('Hero image added successfully');
      setNewImage({ desktopUrl: '', mobileUrl: '', altText: 'Ministry Hero Image' });
      setShowAddForm(false);
      await fetchHeroImages();
    }
    setUploading(false);
  };

  const toggleImageVisibility = async (imageId: number, currentStatus: boolean) => {
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

  const deleteImage = async (imageId: number) => {
    if (!confirm('Are you sure you want to delete this hero image?')) {
      return;
    }

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
  };

  const handleDragEnd = async (event: any) => {
    if (isViewer) return;
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

  const activeImagesCount = heroImages.filter(img => img.isActive).length;

  return (
    <div className="p-6 space-y-6">
      <Card className="bg-black border-gray-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-white">
                <ImageIcon className="text-[#FDB813]" />
                Hero Slideshow Images
              </CardTitle>
              <CardDescription className="text-gray-400">
                Manage images for the homepage hero slideshow. Active images will rotate automatically. Drag to reorder.
              </CardDescription>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-400">
                {heroImages.length} images
              </div>
              <div className="text-sm text-green-400">
                {activeImagesCount} active
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Add New Image Section */}
      <Card className="bg-black border-gray-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg text-white">Add New Hero Image</CardTitle>
            <Button
              onClick={() => setShowAddForm(!showAddForm)}
              variant={showAddForm ? 'outline' : 'default'}
              disabled={isViewer}
              className={`${showAddForm ? 'border-gray-600 text-gray-300 hover:bg-[#2E2E2E]' : 'bg-[#FDB813] text-black hover:bg-[#e5a711]'}${isViewer ? ' opacity-50 cursor-not-allowed' : ''}`}
            >
              {showAddForm ? 'Cancel' : <><Plus size={16} className="mr-1" /> Add Image</>}
            </Button>
          </div>
        </CardHeader>
        
        {showAddForm && (
          <CardContent className="space-y-4">
            <Alert className="bg-[#2E2E2E] border-[#FDB813]">
              <AlertCircle className="h-4 w-4 text-[#FDB813]" />
              <AlertDescription className="text-gray-300">
                Upload images to Vercel Blob first, then paste the URLs here. Desktop images should be 16:9 ratio, mobile should be 9:16 ratio.
              </AlertDescription>
            </Alert>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="desktopUrl" className="text-gray-300">Desktop Image URL (16:9)</Label>
                <Input
                  id="desktopUrl"
                  placeholder="https://...blob.vercel-storage.com/desktop.jpg"
                  value={newImage.desktopUrl}
                  onChange={(e) => setNewImage({ ...newImage, desktopUrl: e.target.value })}
                  className="bg-[#2E2E2E] border-gray-600 text-white"
                />
                {newImage.desktopUrl && (
                  <div className="aspect-video bg-[#2E2E2E] rounded overflow-hidden">
                    <img src={newImage.desktopUrl} alt="Desktop preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="mobileUrl" className="text-gray-300">Mobile Image URL (9:16)</Label>
                <Input
                  id="mobileUrl"
                  placeholder="https://...blob.vercel-storage.com/mobile.jpg"
                  value={newImage.mobileUrl}
                  onChange={(e) => setNewImage({ ...newImage, mobileUrl: e.target.value })}
                  className="bg-[#2E2E2E] border-gray-600 text-white"
                />
                {newImage.mobileUrl && (
                  <div className="aspect-[9/16] bg-[#2E2E2E] rounded overflow-hidden max-w-[200px]">
                    <img src={newImage.mobileUrl} alt="Mobile preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="altText" className="text-gray-300">Alt Text (for accessibility)</Label>
              <Input
                id="altText"
                placeholder="Ministry Hero Image"
                value={newImage.altText}
                onChange={(e) => setNewImage({ ...newImage, altText: e.target.value })}
                className="bg-[#2E2E2E] border-gray-600 text-white"
              />
            </div>

            <Button 
              onClick={handleAddImage} 
              disabled={uploading || !newImage.desktopUrl || !newImage.mobileUrl}
              className="w-full bg-[#FDB813] text-black hover:bg-[#e5a711]"
            >
              {uploading ? 'Adding...' : 'Add Hero Image'}
            </Button>
          </CardContent>
        )}
      </Card>

      {/* Images List with Drag and Drop */}
      {loading ? (
        <Card className="bg-black border-gray-700">
          <CardContent className="flex items-center justify-center py-16">
            <p className="text-gray-400">Loading images...</p>
          </CardContent>
        </Card>
      ) : heroImages.length === 0 ? (
        <Card className="bg-black border-gray-700">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <ImageIcon size={64} className="text-gray-600 mb-4" />
            <p className="text-gray-400 text-center mb-4">
              No hero images yet. Add your first image to get started.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          <p className="text-sm text-gray-400">
            💡 Drag images to reorder them. The order will be reflected in the homepage slideshow.
          </p>
          <DndContext
            sensors={isViewer ? [] : sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
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
                    onToggle={toggleImageVisibility}
                    onDelete={deleteImage}
                    isViewer={isViewer}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      )}
    </div>
  );
}
