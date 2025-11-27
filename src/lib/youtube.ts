// Utilities for working with YouTube URLs and metadata
export function extractYouTubeId(url: string | null | undefined): string | null {
  if (!url) return null;
  const s = String(url).trim();
  try {
    if (s.includes('youtube.com/watch?v=')) return s.split('v=')[1]?.split('&')[0] || null;
    if (s.includes('youtu.be/')) return s.split('youtu.be/')[1]?.split('?')[0] || null;
    if (s.includes('youtube.com/shorts/')) return s.split('shorts/')[1]?.split('?')[0] || null;
    // Support live stream short links like: https://www.youtube.com/live/<id>
    if (s.includes('youtube.com/live/')) return s.split('live/')[1]?.split('?')[0] || null;
  } catch (err) {
    return null;
  }
  return null;
}

// Parse ISO8601 duration (e.g. PT1H2M30S) into human-friendly H:MM:SS or M:SS
export function parseISO8601Duration(iso: string | null | undefined): string {
  if (!iso) return '';
  const m = String(iso).match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!m) return '';
  const h = parseInt(m[1] || '0', 10);
  const mm = parseInt(m[2] || '0', 10);
  const ss = parseInt(m[3] || '0', 10);
  if (h > 0) return `${h}:${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}`;
  return `${mm}:${String(ss).padStart(2, '0')}`;
}

// Client helper: call server proxy to fetch meta for a given video id
export async function fetchYouTubeMeta(videoId: string) {
  if (!videoId) return null;
  try {
    const res = await fetch(`/api/youtube/${encodeURIComponent(videoId)}`);
    if (!res.ok) return null;
    const data = await res.json();
    return data;
  } catch (err) {
    return null;
  }
}

// Convenience: given a YouTube URL or id, return the title (or null)
export async function fetchYouTubeTitle(urlOrId: string | null | undefined): Promise<string | null> {
  const id = extractYouTubeId(urlOrId || '') || String(urlOrId || '').trim();
  if (!id) return null;
  try {
    const meta = await fetchYouTubeMeta(id);
    return meta?.title || null;
  } catch (err) {
    return null;
  }
}
