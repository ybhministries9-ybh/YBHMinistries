import { ArrowRight } from 'lucide-react';
import { navigate } from '../../utils/navigate';
import { useTranslation } from 'react-i18next';

export function OtherMinistries() {
  const { t } = useTranslation('ministries');
  
  const ministries = [
    {
      id: 'hallelbibleschool',
      categoryKey: 'otherMinistries.hallelBibleSchool.category',
      titleKey: 'otherMinistries.hallelBibleSchool.title',
      descriptionKey: 'otherMinistries.hallelBibleSchool.description',
      imageUrl: 'https://images.unsplash.com/photo-1672867138294-8aa5591041de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaWJsZSUyMHNjaG9vbCUyMHN0dWRlbnRzfGVufDF8fHx8MTc2MTI5MDg4MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      linkTo: '/ministries/hallelbibleschool',
      imagePosition: 'right',
    },
    {
      id: 'hallelconferences',
      categoryKey: 'otherMinistries.hallelConferences.category',
      titleKey: 'otherMinistries.hallelConferences.title',
      descriptionKey: 'otherMinistries.hallelConferences.description',
      imageUrl: 'https://images.unsplash.com/photo-1515616227676-603a1c547b3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHJpc3RpYW4lMjBjb25mZXJlbmNlJTIwd29yc2hpcHxlbnwxfHx8fDE3NjEyOTA4ODF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      linkTo: '/ministries/hallelconferences',
      imagePosition: 'left',
    },
    {
      id: 'hallelworshipday',
      categoryKey: 'otherMinistries.hallelWorshipDay.category',
      titleKey: 'otherMinistries.hallelWorshipDay.title',
      descriptionKey: 'otherMinistries.hallelWorshipDay.description',
      imageUrl: 'https://images.unsplash.com/photo-1712844470225-94cbb5bd7dc8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b3JzaGlwJTIwdGVhbSUyMHByYWlzZXxlbnwxfHx8fDE3NjEyOTA4ODF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      linkTo: '/ministries/hallelworshipday',
      imagePosition: 'right',
    },
    {
      id: 'hallelbiblecollege',
      categoryKey: 'otherMinistries.hallelBibleCollege.category',
      titleKey: 'otherMinistries.hallelBibleCollege.title',
      descriptionKey: 'otherMinistries.hallelBibleCollege.description',
      imageUrl: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaWJsZSUyMGNvbGxlZ2UlMjBncmFkdWF0aW9ufGVufDF8fHx8MTc2MTI5MDg4MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      linkTo: '/ministries/hallelbiblecollege',
      imagePosition: 'left',
    },
    {
      id: 'hmssummertraining',
      categoryKey: 'otherMinistries.hmsSummerTraining.category',
      titleKey: 'otherMinistries.hmsSummerTraining.title',
      descriptionKey: 'otherMinistries.hmsSummerTraining.description',
      imageUrl: 'https://images.unsplash.com/photo-1560651921-94fb7af0e901?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMHRyYWluaW5nJTIwc3VtbWVyfGVufDF8fHx8MTc2MTI5MDg4MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      linkTo: '/ministries/hmssummertraining',
      imagePosition: 'right',
    },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#000000' }}>
      {/* Page Container */}
      <div className="container mx-auto px-4 pt-24 pb-16">
        {/* Page Header */}
        <div className="text-center mb-12">
          <p className="text-xl text-white max-w-5xl mx-auto whitespace-nowrap">
            {t('otherMinistries.pageSubtitle')}
          </p>
        </div>

        {/* Ministry Sections */}
        <div className="space-y-24">
          {ministries.map((ministry, index) => (
            <section
              key={ministry.id}
              id={ministry.id}
              className="scroll-mt-48"
            >
              <div
                className={`flex flex-col ${
                  ministry.imagePosition === 'right'
                    ? 'lg:flex-row'
                    : 'lg:flex-row-reverse'
                } gap-8 lg:gap-16 items-center lg:items-start`}
              >
                {/* Content Side */}
                <div className="flex-1 space-y-6">
                  <div className="text-sm text-gray-400 tracking-wider">
                    {t(ministry.categoryKey)}
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl lg:text-5xl text-white">
                    {t(ministry.titleKey)}
                  </h2>
                  
                  <p className="text-lg text-white leading-relaxed text-justify">
                    {t(ministry.descriptionKey)}
                  </p>
                  
                  <button
                    onClick={() => navigate(ministry.linkTo)}
                    className="inline-flex items-center gap-2 text-lg transition-all cursor-pointer hover:gap-3"
                    style={{ color: '#FDB813' }}
                  >
                    {t('otherMinistries.explore')}
                    <ArrowRight size={20} />
                  </button>
                </div>

                {/* Image Side */}
                <div className="flex-[0.56] w-full">
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
                    <img
                      src={ministry.imageUrl}
                      alt={t(ministry.titleKey)}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
