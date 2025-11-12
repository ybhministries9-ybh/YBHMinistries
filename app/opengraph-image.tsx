import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Yeshua Beth Hallel Ministries';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fff',
          backgroundImage: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #60a5fa 100%)',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '80px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontSize: 80,
              fontWeight: 900,
              color: 'white',
              marginBottom: 30,
              letterSpacing: '-0.02em',
            }}
          >
            YBH Ministries
          </div>
          <div
            style={{
              fontSize: 36,
              color: 'rgba(255, 255, 255, 0.95)',
              textAlign: 'center',
              maxWidth: 900,
              marginBottom: 20,
            }}
          >
            Empowering Worship & Transforming Lives
          </div>
          <div
            style={{
              fontSize: 28,
              color: 'rgba(255, 255, 255, 0.85)',
              fontWeight: 300,
            }}
          >
            Faith • Music • Ministry
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
