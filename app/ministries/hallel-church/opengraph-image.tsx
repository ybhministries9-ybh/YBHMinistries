import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Hallel Church - YBH Ministries';
export const size = { width: 1200, height: 630 };
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
          backgroundImage: 'linear-gradient(135deg, #14532d 0%, #16a34a 50%, #4ade80 100%)',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '80px', textAlign: 'center' }}>
          <div style={{ fontSize: 72, fontWeight: 900, color: 'white', marginBottom: 30 }}>
            Hallel Church
          </div>
          <div style={{ fontSize: 36, color: 'rgba(255, 255, 255, 0.95)', maxWidth: 900, marginBottom: 20 }}>
            Spirit-Filled Worship & Bible Teaching
          </div>
          <div style={{ fontSize: 28, color: 'rgba(255, 255, 255, 0.85)', fontWeight: 300 }}>
            YBH Ministries
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
