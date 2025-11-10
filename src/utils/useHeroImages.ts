import { useState, useEffect } from 'react';
import { API_ENDPOINTS, apiCall } from './api-config';

export interface HeroImage {
  id: number;
  desktopUrl: string;
  mobileUrl: string;
  altText: string;
  displayOrder: number;
  isActive: boolean;
}

export function useHeroImages() {
  const [images, setImages] = useState<HeroImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchHeroImages();
  }, []);

  const fetchHeroImages = async () => {
    setLoading(true);
    setError(null);

    // Fetch only active images for frontend display
    const { data, error: apiError } = await apiCall<{ images: HeroImage[] }>(
      `${API_ENDPOINTS.heroImages.list}?activeOnly=true`
    );

    if (apiError) {
      setError(apiError);
      console.error('Failed to fetch hero images:', apiError);
    } else if (data?.images) {
      setImages(data.images);
    }

    setLoading(false);
  };

  return { images, loading, error, refetch: fetchHeroImages };
}
