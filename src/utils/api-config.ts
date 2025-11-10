// API Configuration for Vercel Postgres
// Set your Vercel Postgres connection string in environment variables
// POSTGRES_URL=your_connection_string_here

export const API_BASE_URL = '/api'; // Vercel serverless functions

// API Endpoints
export const API_ENDPOINTS = {
  heroImages: {
    list: `${API_BASE_URL}/hero-images`,
    create: `${API_BASE_URL}/hero-images`,
    update: (id: number) => `${API_BASE_URL}/hero-images/${id}`,
    delete: (id: number) => `${API_BASE_URL}/hero-images/${id}`,
    toggle: (id: number) => `${API_BASE_URL}/hero-images/${id}/toggle`,
    reorder: `${API_BASE_URL}/hero-images/reorder`,
  },
};

// Fetch helper with error handling
export async function apiCall<T>(
  url: string,
  options?: RequestInit
): Promise<{ data?: T; error?: string }> {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return { error: errorData.error || `Request failed with status ${response.status}` };
    }

    const data = await response.json();
    return { data };
  } catch (error) {
    console.error('API call error:', error);
    return { error: error instanceof Error ? error.message : 'Network error' };
  }
}
