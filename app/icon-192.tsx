import { ImageResponse } from 'next/og';

// Image metadata for 192x192 icon
export const size = {
  width: 192,
  height: 192,
};
export const contentType = 'image/png';

// Image generation
export default function Icon192() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 96,
          background: 'linear-gradient(to bottom right, #1e40af, #3b82f6)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold',
          borderRadius: '20%',
        }}
      >
        YBH
      </div>
    ),
    {
      ...size,
    }
  );
}
