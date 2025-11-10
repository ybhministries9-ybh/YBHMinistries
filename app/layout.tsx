import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';
import '../src/index.css';
import './globals.css';
import '../src/i18n/config';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Yeshua Beth Hallel Ministries',
  description: 'Empowering worship and transforming lives through faith, music, and ministry.',
  keywords: ['ministry', 'worship', 'music school', 'bible college', 'church', 'Telugu ministry'],
  authors: [{ name: 'YBH Ministries' }],
  openGraph: {
    title: 'Yeshua Beth Hallel Ministries',
    description: 'Empowering worship and transforming lives through faith, music, and ministry.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {children}
        <Toaster position="bottom-center" />
      </body>
    </html>
  );
}
