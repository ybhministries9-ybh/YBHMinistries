import { ImageWithFallback } from '../figma/ImageWithFallback';
import { ReactNode } from 'react';

interface MinistryPageProps {
  title: string;
  subtitle: string;
  description: string[];
  imageUrl: string;
  gradient: string;
  features: {
    icon: ReactNode;
    title: string;
    description: string;
    color: string;
  }[];
  ctaTitle: string;
  ctaDescription: string;
  ctaButtonText: string;
}

export function MinistryPageTemplate({
  title,
  subtitle,
  description,
  imageUrl,
  gradient,
  features,
  ctaTitle,
  ctaDescription,
  ctaButtonText
}: MinistryPageProps) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#2E2E2E' }}>
      {/* Hero Image - Full height like Gallery */}
      <div className="relative w-full overflow-hidden" style={{ height: '100vh', minHeight: '100vh' }}>
        <ImageWithFallback
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
          style={{ height: '100vh', minHeight: '100vh' }}
        />
        <div className={`absolute inset-0 ${gradient} flex items-center`}>
          <div className="container mx-auto px-4 text-white">
            <h1 className="text-5xl md:text-6xl mb-4">{title}</h1>
            <p className="text-xl md:text-2xl max-w-3xl">{subtitle}</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Overview */}
        <div className="bg-gray-800/50 rounded-2xl shadow-lg p-8 md:p-12 mb-12 border border-gray-700">
          <h2 className="text-3xl text-white mb-6">About This Ministry</h2>
          {description.map((paragraph, index) => (
            <p key={index} className="text-gray-300 leading-relaxed mb-4">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Features Grid */}
        {features.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-800/50 rounded-xl shadow-lg p-6 text-center border border-gray-700">
                <div className={`${feature.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl text-white mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Call to Action */}
        <div className={`${gradient} rounded-2xl shadow-lg p-8 md:p-12 text-center text-white`}>
          <h2 className="text-3xl md:text-4xl mb-4">{ctaTitle}</h2>
          <p className="text-xl mb-8 opacity-90">{ctaDescription}</p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-full hover:bg-gray-100 transition-colors cursor-pointer">
            {ctaButtonText}
          </button>
        </div>
      </div>
    </div>
  );
}
