import { ImageResponse } from 'next/og';

// Image metadata for 512x512 icon
export const size = {
  width: 512,
  height: 512,
};
export const contentType = 'image/png';

// Image generation
export default function Icon512() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 256,
          background: 'linear-gradient(to bottom right, #1e40af, #3b82f6)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold',
          borderRadius: '10%',
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
