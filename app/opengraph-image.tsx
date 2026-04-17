import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Yeshua Beth Hallel Ministries';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  const origin =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://ybhministries.org');
  const logoUrl = `${origin}/logo/ybh.png`;

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0b1220',
          padding: '80px',
        }}
      >
        <img
          src={logoUrl}
          alt="YBH Ministries logo"
          style={{
            width: 980,
            height: 'auto',
            maxHeight: 470,
            objectFit: 'contain',
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
