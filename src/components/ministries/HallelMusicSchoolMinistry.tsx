import Link from 'next/link';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Music, Heart, Home, Church, Youtube } from 'lucide-react';
import { Separator } from '../ui/separator';
import { useTranslation } from 'react-i18next';

export function HallelMusicSchoolMinistry() {
  const { t } = useTranslation('ministries');
  
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#000000' }}>
      {/* Hero Section with Background Image */}
      <div className="relative w-full overflow-hidden" style={{ height: '70vh', minHeight: '500px' }}>
        <ImageWithFallback
          src="/images/ministries/hms/1.jpg"
          alt={t('hallelMusicSchoolPage.title')}
          className="w-full h-full object-cover"
          style={{ height: '100vh', minHeight: '500px' }}
        />
        <div className="absolute inset-0 bg-black">
          <div className="absolute top-16 md:top-20 left-0 right-0">
            <div className="container mx-auto px-4 md:px-8">
              <div className="max-w-4xl">
                <div className="flex items-center gap-6 mb-6">
                  <h1 className="text-4xl md:text-6xl text-white">{t('hallelMusicSchoolPage.title')}</h1>
                  <a
                    href="https://www.youtube.com/@HallelMusicSchool"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 transition-all duration-300 hover:scale-110"
                    aria-label={t('hallelMusicSchoolPage.youtubeAriaLabel')}
                  >
                    <Youtube 
                      size={48} 
                      className="text-white hover:text-[#FDB813] transition-colors duration-300"
                    />
                  </a>
                </div>
                <div className="w-32 h-1 rounded-full mb-8" style={{ backgroundColor: '#FDB813' }}></div>
                <p className="text-xl md:text-2xl text-white leading-relaxed">
                  {t('hallelMusicSchoolPage.tagline')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-8 py-16 md:py-24">
        {/* Introduction */}
        <div className="max-w-5xl mx-auto mb-20">
          <p className="text-lg md:text-xl text-white leading-relaxed text-justify">
            {t('hallelMusicSchoolPage.introduction')}
          </p>
        </div>

        {/* Our Mission Section */}
        <section className="max-w-5xl mx-auto mb-20">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl text-white mb-4 pb-3 inline-block relative">
              {t('hallelMusicSchoolPage.ourMission.title')}   
            </h2>
          </div>
          
          <div className="space-y-6">
            <p className="text-lg text-white leading-relaxed text-justify">
              {t('hallelMusicSchoolPage.ourMission.paragraph1')}
            </p>
            
            <p className="text-lg text-white leading-relaxed text-justify">
              {t('hallelMusicSchoolPage.ourMission.paragraph2')}
            </p>
          </div>
        </section>

        {/* Our Purpose Section */}
        <div style={{ backgroundColor: '#2E2E2E', margin: '0 -9999px', padding: '0 9999px' }}>
          <section className="max-w-5xl mx-auto mb-20 py-12">
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl text-white mb-4 pb-3 inline-block relative">
                {t('hallelMusicSchoolPage.ourPurpose.title')}
                <div className="absolute -bottom-2 left-0 w-24 h-1 rounded-full" style={{ backgroundColor: '#FDB813' }}></div>
              </h2>
            </div>
            
            <div className="space-y-6">
              <p className="text-lg text-white leading-relaxed text-justify">
                {t('hallelMusicSchoolPage.ourPurpose.intro')}
              </p>
              
              <p className="text-lg text-white leading-relaxed mb-8">
                {t('hallelMusicSchoolPage.ourPurpose.visionIntro')}
              </p>
              
              <div className="space-y-6 pl-4">
                {(t('hallelMusicSchoolPage.ourPurpose.points', { returnObjects: true }) as string[]).map((point, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-2 h-2 rounded-full flex-shrink-0 mt-2" style={{ backgroundColor: '#FDB813' }}></div>
                    <p className="text-lg text-white leading-relaxed">{point}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        <Separator className="my-16 bg-gray-700" />

        {/* Our Approach Section */}
        <section className="max-w-5xl mx-auto mb-20">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl text-white mb-4 pb-3 inline-block relative">
              {t('hallelMusicSchoolPage.ourApproach.title')}
              <div className="absolute -bottom-2 left-0 w-24 h-1 rounded-full" style={{ backgroundColor: '#FDB813' }}></div>
            </h2>
          </div>
          
          <div className="space-y-6">
            <p className="text-lg text-white leading-relaxed text-justify">
              {t('hallelMusicSchoolPage.ourApproach.intro')}
            </p>
            
            <div className="space-y-6 pl-4 mt-8">
              {(t('hallelMusicSchoolPage.ourApproach.points', { returnObjects: true }) as string[]).map((point, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full flex-shrink-0 mt-2" style={{ backgroundColor: '#FDB813' }}></div>
                  <p className="text-lg text-white leading-relaxed">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Vision for Impact Section */}
        <div style={{ backgroundColor: '#2E2E2E', margin: '0 -9999px', padding: '0 9999px' }}>
          <section className="max-w-5xl mx-auto mb-20 py-12">
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl text-white mb-4 pb-3 inline-block relative">
                {t('hallelMusicSchoolPage.ourVisionForImpact.title')}
                <div className="absolute -bottom-2 left-0 w-24 h-1 rounded-full" style={{ backgroundColor: '#FDB813' }}></div>
              </h2>
            </div>
            
            <div className="space-y-6">
              <p className="text-lg text-white leading-relaxed text-justify">
                {t('hallelMusicSchoolPage.ourVisionForImpact.content')}
              </p>
            </div>
          </section>
        </div>

        <Separator className="my-16 bg-gray-700" />

        {/* Join the Movement Section */}
        <section className="max-w-5xl mx-auto mb-20">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl text-white mb-4 pb-3 inline-block relative">
              {t('hallelMusicSchoolPage.joinTheMovement.title')}
              <div className="absolute -bottom-2 left-0 w-24 h-1 rounded-full" style={{ backgroundColor: '#FDB813' }}></div>
            </h2>
          </div>
          
          <div className="space-y-8">
            <p className="text-lg text-white leading-relaxed text-justify">
              {t('hallelMusicSchoolPage.joinTheMovement.intro')}
            </p>
            
            <div className="space-y-6 pl-4">
              {(t('hallelMusicSchoolPage.joinTheMovement.points', { returnObjects: true }) as string[]).map((point, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full flex-shrink-0 mt-2" style={{ backgroundColor: '#FDB813' }}></div>
                  <p className="text-lg text-white leading-relaxed">{point}</p>
                </div>
              ))}
            </div>
            
            <p className="text-lg text-white leading-relaxed text-justify mt-8">
              {t('hallelMusicSchoolPage.joinTheMovement.closing')}
            </p>
          </div>
        </section>

        {/* Registration Links Section */}
        <section className="max-w-5xl mx-auto">
          <div className="border-l-4 pl-8 py-6" style={{ borderLeftColor: '#FDB813' }}>
            <h3 className="text-2xl text-white mb-6">{t('hallelMusicSchoolPage.registration.title')}</h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2" style={{ backgroundColor: '#FDB813' }}></div>
                <Link
                  href="/contact?tab=student-form"
                  className="text-lg text-white hover:opacity-80 transition-opacity"
                >
                  {t('hallelMusicSchoolPage.registration.onlineStudent')}
                </Link>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2" style={{ backgroundColor: '#FDB813' }}></div>
                <Link
                  href="/contact?tab=student-form"
                  className="text-lg text-white hover:opacity-80 transition-opacity"
                >
                  {t('hallelMusicSchoolPage.registration.lmsStudent')}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
