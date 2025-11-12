"use client";

import React, { useState } from "react";
import { navigate } from "../utils/navigate";
import { useTranslation } from 'react-i18next';

function ImageWithFallback(props) {
  const [didError, setDidError] = useState(false)
  const { src, alt, style, className, ...rest } = props

  return didError ? (
    <div
      className={`inline-block bg-gray-100 text-center align-middle ${className ?? ''}`}
      style={style}
    >
      <div className="flex items-center justify-center w-full h-full">
        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==" alt="Error loading image" {...rest} data-original-url={src} />
      </div>
    </div>
  ) : (
    <img src={src} alt={alt} className={className} style={style} {...rest} onError={() => setDidError(true)} />
  )
}

export function AwardsPage() {
  const { t } = useTranslation('awards');
  
  // Map record IDs to Gallery and Stories tab keys
  const recordTabMapping = {
    guinness: {
      galleryTab: 'guinness-events',
      storiesTab: 'guinness'
    },
    ingenious: {
      galleryTab: 'ingenious-record',
      storiesTab: 'ingenious'
    },
    asian: {
      galleryTab: 'asian-records',
      storiesTab: 'asian'
    },
    international: {
      galleryTab: 'international-star-records',
      storiesTab: 'international'
    }
  };

  const handleViewPictures = (recordId: string) => {
    const mapping = recordTabMapping[recordId];
    if (mapping) {
      navigate(`/gallery#tab=${mapping.galleryTab}`);
    }
  };

  const handleViewVideos = (recordId: string) => {
    const mapping = recordTabMapping[recordId];
    if (mapping) {
      navigate(`/gallery#tab=${mapping.galleryTab}&view=videos`);
    }
  };

  const handleViewStories = (recordId: string) => {
    const mapping = recordTabMapping[recordId];
    if (mapping) {
      navigate(`/stories#tab=${mapping.storiesTab}`);
    }
  };

  const recordBooks = [
    {
      id: "guinness",
      name: t('records.guinness.name'),
      image: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Guinness/1.jpg?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      award: t('records.guinness.award'),
      year: t('records.guinness.year'),
      participants: t('records.guinness.participants'),
      location: t('records.guinness.location'),
      imagePosition: "left",
      description: t('records.guinness.description')
    },
    {
      id: "ingenious",
      name: t('records.ingenious.name'),
      image: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Ingenious%20Charm/17.jpg?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      award: t('records.ingenious.award'),
      year: t('records.ingenious.year'),
      participants: t('records.ingenious.participants'),
      location: t('records.ingenious.location'),
      imagePosition: "right",
      description: t('records.ingenious.description')
    },
    {
      id: "asian",
      name: t('records.asian.name'),
      image: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Asian%20Book/17.jpg?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      award: t('records.asian.award'),
      year: t('records.asian.year'),
      participants: t('records.asian.participants'),
      location: t('records.asian.location'),
      imagePosition: "left",
      description: t('records.asian.description')
    },
    {
      id: "international",
      name: t('records.international.name'),
      image: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Asian%20Book/17.jpg?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      award: t('records.international.award'),
      year: t('records.international.year'),
      participants: t('records.international.participants'),
      location: t('records.international.location'),
      imagePosition: "right",
      description: t('records.international.description')
    }
  ];

  const ActionButtons = ({ id }) => (
    <div className="flex flex-wrap gap-3 mt-6">
      <button
        className="px-4 py-2 bg-[#FDB813] text-black font-bold rounded-md hover:bg-opacity-80 transition-all duration-300"
        style={{ cursor: 'pointer' }}
        onClick={() => console.log('View pictures:', id)}
      >
        View Pictures
      </button>
      <button
        className="px-4 py-2 bg-[#FDB813] text-black font-bold rounded-md hover:bg-opacity-80 transition-all duration-300"
        style={{ cursor: 'pointer' }}
        onClick={() => console.log('View videos:', id)}
      >
        View Videos
      </button>
      <button
        className="px-4 py-2 bg-[#FDB813] text-black font-bold rounded-md hover:bg-opacity-80 transition-all duration-300"
        style={{ cursor: 'pointer' }}
        onClick={() => console.log('View stories:', id)}
      >
        View Stories
      </button>
    </div>
  );

  const RecordDetail = ({ label, value }) => (
    <div className="mb-3">
      <span className="text-[#FDB813]">{label}: </span>
      <span className="text-white font-medium">{value}</span>
    </div>
  );

  return (
    <div className="w-full min-h-screen bg-black text-white pt-20 md:pt-33">
      {recordBooks.map((record, index) => (
        <section 
          key={record.id}
          className={`w-full py-8 md:py-24 ${index % 2 === 0 ? 'bg-black' : 'bg-[#2E2E2E]'}`}
          id={record.id}
        >
          <div className="max-w-7xl mx-auto px-2 md:px-8">
            <div className={`flex flex-col md:flex-row gap-8 md:gap-12 items-start ${record.imagePosition === 'right' ? 'md:flex-row-reverse' : ''}`}>
              {/* Image and Buttons Container */}
              <div className="w-full md:w-[34%] lg:w-[36%] px-4 md:px-0">
                <div className="relative rounded-lg overflow-hidden shadow-2xl mb-6">
                  <ImageWithFallback
                    src={record.image}
                    alt={record.name}
                    className="w-full h-auto object-cover aspect-[4/3]"
                  />
                </div>
                
                {/* Action Buttons below image - Desktop only */}
                <div className="hidden md:flex flex-wrap gap-3">
                  <button
                    className="px-4 py-2 bg-[#FDB813] text-black font-bold rounded-md hover:bg-opacity-80 transition-all duration-300"
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleViewPictures(record.id)}
                  >
                    {t('buttons.viewPictures')}
                  </button>
                  <button
                    className="px-4 py-2 bg-[#FDB813] text-black font-bold rounded-md hover:bg-opacity-80 transition-all duration-300"
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleViewVideos(record.id)}
                  >
                    {t('buttons.viewVideos')}
                  </button>
                  <button
                    className="px-4 py-2 bg-[#FDB813] text-black font-bold rounded-md hover:bg-opacity-80 transition-all duration-300"
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleViewStories(record.id)}
                  >
                    {t('buttons.viewStories')}
                  </button>
                </div>
              </div>
              
              {/* Content Container */}
              <div className="w-full md:w-[66%] lg:w-[64%] px-4 md:px-0">
                <h2 className="text-3xl md:text-4xl mb-4">{record.name}</h2>
                <div className="h-1 w-20 bg-[#FDB813] mb-8"></div>
                
                <h3 className="text-xl font-semibold text-[#FDB813] mb-6">{record.award}</h3>
                
                <p className="text-gray-300 mb-6">
                  {record.description}
                </p>
                
                <div className="bg-[#1E1E1E] p-3 md:p-6 rounded-lg mb-6">
                  <RecordDetail label={t('labels.year')} value={record.year} />
                  <RecordDetail label={t('labels.participants')} value={record.participants} />
                  <RecordDetail label={t('labels.location')} value={record.location} />
                </div>
                
                {/* Action Buttons below text area - Mobile only */}
                <div className="flex md:hidden flex-wrap gap-3">
                  <button
                    className="px-4 py-2 bg-[#FDB813] text-black font-bold rounded-md hover:bg-opacity-80 transition-all duration-300"
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleViewPictures(record.id)}
                  >
                    {t('buttons.viewPictures')}
                  </button>
                  <button
                    className="px-4 py-2 bg-[#FDB813] text-black font-bold rounded-md hover:bg-opacity-80 transition-all duration-300"
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleViewVideos(record.id)}
                  >
                    {t('buttons.viewVideos')}
                  </button>
                  <button
                    className="px-4 py-2 bg-[#FDB813] text-black font-bold rounded-md hover:bg-opacity-80 transition-all duration-300"
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleViewStories(record.id)}
                  >
                    {t('buttons.viewStories')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
