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
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0b1220',
        }}
      >
        <div style={{ flex: '0 0 360px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src={'/logo/ybh.png'} alt="YBH logo" style={{ width: 320, height: 'auto', borderRadius: 8 }} />
        </div>
        <div style={{ flex: '1', padding: '40px 60px', color: '#ffffff' }}>
          <div style={{ fontSize: 56, fontWeight: 800, marginBottom: 14, lineHeight: 1.05 }}>
            Yeshua Beth Hallel Ministries - Empowering Worship & Faith
          </div>
          <div style={{ fontSize: 28, fontWeight: 400, opacity: 0.95, marginTop: 10, maxWidth: 760 }}>
            Transforming lives through worship, faith, and ministry. Offering Bible college, music school, church services, and conferences.
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
