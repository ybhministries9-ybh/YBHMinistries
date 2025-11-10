import { useEffect, useState } from 'react';
import { Image, MessageCircle } from 'lucide-react';

export function DashboardStats() {
  const [stats, setStats] = useState({
    gallery: 0,
    testimonies: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // TODO: Replace with Vercel Postgres queries
      // const [galleryRes, testimoniesRes] = await Promise.all([
      //   fetch('/api/gallery/count'),
      //   fetch('/api/testimonies/count'),
      // ]);

      // Placeholder stats - replace with actual API calls
      setStats({
        gallery: 0,
        testimonies: 0,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const statCards = [
    { label: 'Gallery Items', value: stats.gallery, icon: Image },
    { label: 'Testimonies', value: stats.testimonies, icon: MessageCircle },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      {statCards.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className="bg-[#2E2E2E] rounded-lg shadow-md p-4 border-l-4 border-[#FDB813] hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 rounded-lg bg-[#FDB813] flex items-center justify-center">
                <Icon className="text-black" size={20} />
              </div>
              <span className="text-3xl text-white">{stat.value}</span>
            </div>
            <p className="text-sm text-gray-300">{stat.label}</p>
          </div>
        );
      })}
    </div>
  );
}
