"use client";
import { motion } from 'framer-motion';
import { RefreshCw, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function MaintenancePage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black text-white">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center gap-6 p-8"
      >
        <div className="w-48 h-24">
          <img src="/logo/ybh.png" alt="YBH Logo" className="w-48 h-24 object-contain" />
        </div>

        <h1 className="text-4xl md:text-7xl font-display font-bold tracking-tight text-center md:text-left">Yeshua Beth Hallel Ministries</h1>
        <p className="text-zinc-300 max-w-md md:max-w-none text-center md:whitespace-nowrap">We're performing scheduled maintenance. We'll be back shortly.</p>

        <div className="mt-4 text-center">
          <a
            href="https://www.youtube.com/watch?v=vq0ZuEIP-4s"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex flex-col sm:flex-row items-center sm:items-start gap-3 bg-[#2E2E2E] border border-zinc-700 text-zinc-100 px-4 py-3 rounded-md shadow-sm hover:bg-[#272727] transition"
            aria-label="Watch our latest message on YouTube"
          >
            <div className="relative">
              <img
                src="https://img.youtube.com/vi/vq0ZuEIP-4s/hqdefault.jpg"
                alt="YouTube thumbnail for Yeshua Beth Hallel Ministries video"
                className="w-36 h-20 object-cover rounded-md flex-shrink-0"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="bg-black/40 rounded-full p-2 opacity-95 transform transition duration-200 group-hover:scale-110">
                  <Play className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
            <div className="text-center sm:text-left">
              <div className="font-semibold">Watch our latest message on YouTube</div>
              <div className="text-sm text-zinc-300">Stay connected with worship and teaching while the site is down</div>
            </div>
          </a>
        </div>

        <div className="pt-2">
          <a href="/" aria-label="Home" className="fixed bottom-20 left-1/2 transform -translate-x-1/2">
          <Button className="group bg-[#2E2E2E] border border-zinc-700 text-zinc-200 px-8 py-4 rounded-lg shadow-md flex items-center gap-3 text-base transform transition-transform duration-150 ease-out hover:scale-105 hover:-translate-y-1 hover:bg-[#272727] cursor-pointer focus:outline-none focus:ring-2 focus:ring-zinc-600">
            <RefreshCw className="h-5 w-5 transform transition-transform duration-300 group-hover:rotate-180" />
            <span className="px-1">Refresh</span>
          </Button>
        </a>
        </div>
      </motion.div>
    </div>
  );
}
