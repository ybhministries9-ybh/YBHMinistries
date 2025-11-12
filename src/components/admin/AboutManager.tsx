import { AboutHeroImageManager } from './AboutHeroImageManager';

export function AboutManager() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-white">About Page Manager</h2>
          <p className="text-gray-400 text-sm mt-1">
            Manage the hero image for the About page
          </p>
        </div>
      </div>

      {/* Hero Image Manager Component */}
      <AboutHeroImageManager />
    </div>
  );
}
