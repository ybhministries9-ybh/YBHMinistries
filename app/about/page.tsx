import { Metadata } from 'next';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Yeshua Beth Hallel Ministries, our mission, vision, and commitment to empowering worship and transforming lives through faith-based education and ministry.',
  openGraph: {
    title: 'About YBH Ministries',
    description: 'Discover our mission to empower worship and transform lives through faith, music, and ministry.',
  },
};

export default function About() {
  return <AboutClient />;
}
