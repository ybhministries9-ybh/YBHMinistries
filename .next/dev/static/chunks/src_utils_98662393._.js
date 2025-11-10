(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/utils/sampleAdminData.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Sample data for admin portal demonstration
__turbopack_context__.s([
    "sampleAwards",
    ()=>sampleAwards,
    "sampleBibleStudies",
    ()=>sampleBibleStudies,
    "sampleDevotionals",
    ()=>sampleDevotionals,
    "sampleEvents",
    ()=>sampleEvents,
    "sampleGallery",
    ()=>sampleGallery,
    "sampleMinistries",
    ()=>sampleMinistries,
    "sampleProducts",
    ()=>sampleProducts,
    "sampleSermons",
    ()=>sampleSermons,
    "sampleTestimonies",
    ()=>sampleTestimonies,
    "sampleUsers",
    ()=>sampleUsers,
    "sampleVideos",
    ()=>sampleVideos,
    "sampleWorship",
    ()=>sampleWorship
]);
const sampleVideos = [
    {
        id: '1',
        title: 'Sunday Worship Service - January 7, 2024',
        youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        description: 'Join us for our powerful Sunday worship service with inspiring messages and uplifting praise.',
        date: '2024-01-07',
        category: 'Service'
    },
    {
        id: '2',
        title: 'Hallel Music School Annual Recital',
        youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        description: 'Students showcase their musical talents in this year\'s recital.',
        date: '2024-09-30',
        category: 'Music'
    },
    {
        id: '3',
        title: 'Youth Group Testimony Night',
        youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        description: 'Young people share their powerful testimonies of faith.',
        date: '2024-02-14',
        category: 'Youth'
    }
];
const sampleGallery = [
    {
        id: '1',
        title: 'Easter Sunday Celebration 2024',
        imageUrl: 'https://images.unsplash.com/photo-1438032005730-c779502df39b?w=800',
        category: 'Worship'
    },
    {
        id: '2',
        title: 'Youth Summer Camp',
        imageUrl: 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=800',
        category: 'Youth'
    },
    {
        id: '3',
        title: 'Christmas Concert 2023',
        imageUrl: 'https://images.unsplash.com/photo-1482575832494-771f74bf6857?w=800',
        category: 'Music'
    },
    {
        id: '4',
        title: 'Community Outreach Program',
        imageUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800',
        category: 'Outreach'
    }
];
const sampleAwards = [
    {
        id: '1',
        title: 'Best Community Music Program',
        organization: 'State Arts Council',
        description: 'Recognition for outstanding contribution to community music education.',
        year: '2023',
        category: 'Music',
        level: 'State',
        studentsImpacted: '500+ students',
        imageUrl: 'https://images.unsplash.com/photo-1754300681803-61eadeb79d10?w=800'
    },
    {
        id: '2',
        title: 'Excellence in Youth Ministry',
        organization: 'National Church Association',
        description: 'Awarded for innovative and impactful youth ministry programs.',
        year: '2022',
        category: 'Youth',
        level: 'National',
        studentsImpacted: '200+ youth',
        imageUrl: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=800'
    }
];
const sampleTestimonies = [
    {
        id: '1',
        name: 'Sarah Johnson',
        role: 'Music Student',
        testimony: 'Hallel Music School transformed my life! I started with no musical background and now I lead worship at my church. The teachers here are incredibly patient and talented.',
        date: 'January 2024',
        category: 'Music',
        imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400',
        rating: 5,
        featured: true,
        status: 'Approved'
    },
    {
        id: '2',
        name: 'David Martinez',
        role: 'Church Member',
        testimony: 'YBH Ministries changed my life completely. I came broken and lost, but through the love and support of this community, I found healing and purpose.',
        date: 'February 2024',
        category: 'Spiritual Growth',
        imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
        rating: 5,
        status: 'Approved'
    },
    {
        id: '3',
        name: 'Emily Chen',
        role: 'Youth Group Member',
        testimony: 'The youth ministry here is amazing! I\'ve made lifelong friends and grown so much in my faith through the programs and events.',
        date: 'March 2024',
        category: 'Youth',
        imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
        rating: 5,
        status: 'In-Review'
    },
    {
        id: '4',
        name: 'Michael Brown',
        role: 'New Member',
        testimony: 'I recently joined this church and the welcoming atmosphere has been overwhelming. Everyone treats you like family from day one.',
        date: 'December 2024',
        category: 'Fellowship',
        imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
        rating: 5,
        status: 'Submitted'
    }
];
const sampleMinistries = [
    {
        id: '1',
        title: 'Hallel Music School',
        description: 'Professional music training in vocals, instruments, and worship leading for all ages and skill levels. Our experienced instructors provide personalized lessons in piano, guitar, drums, vocals, and more.',
        image: 'https://images.unsplash.com/photo-1614442848457-36ddcbb0876d?w=800',
        detailedDescription: 'Hallel Music School offers comprehensive music education for students of all ages. With over 15 years of experience, our school has trained hundreds of students who have gone on to lead worship in churches worldwide. We offer individual lessons, group classes, and ensemble opportunities.',
        programs: [
            'Beginner Piano',
            'Advanced Guitar',
            'Vocal Training',
            'Worship Leadership',
            'Music Theory'
        ],
        contactEmail: 'music@ybhministries.org',
        schedule: 'Monday - Saturday, 9 AM - 7 PM'
    },
    {
        id: '2',
        title: 'Worship Ministry',
        description: 'Spirit-filled worship services and special events that bring the community together in praise.',
        image: 'https://images.unsplash.com/photo-1560251445-ba979d304eb9?w=800',
        detailedDescription: 'Our Worship Ministry is the heart of our church, creating an atmosphere where people can encounter God\'s presence through powerful music and authentic praise.',
        programs: [
            'Sunday Worship',
            'Wednesday Night Worship',
            'Special Events',
            'Worship Team Training'
        ],
        contactEmail: 'worship@ybhministries.org',
        schedule: 'Sundays 10 AM & 6 PM, Wednesdays 7 PM'
    },
    {
        id: '3',
        title: 'Bible Study & Teaching',
        description: 'In-depth biblical teachings, small groups, and discipleship programs for spiritual growth.',
        image: 'https://images.unsplash.com/photo-1543702404-38c2035462ad?w=800',
        detailedDescription: 'Dive deep into God\'s Word through our comprehensive Bible study programs. We offer verse-by-verse studies, topical series, and small group discussions.',
        programs: [
            'Sunday School',
            'Midweek Bible Study',
            'Small Groups',
            'New Believers Class'
        ],
        contactEmail: 'bible@ybhministries.org',
        schedule: 'Sundays 9 AM, Wednesdays 7 PM'
    },
    {
        id: '4',
        title: 'Prayer & Fellowship',
        description: 'Regular prayer meetings, community outreach, and fellowship events that build lasting connections.',
        image: 'https://images.unsplash.com/photo-1729089049653-24312fdca908?w=800',
        detailedDescription: 'Join us in powerful corporate prayer and meaningful fellowship. Our prayer ministry is committed to interceding for our community and supporting one another.',
        programs: [
            'Morning Prayer',
            'Prayer Chain',
            'Community Outreach',
            'Fellowship Dinners'
        ],
        contactEmail: 'prayer@ybhministries.org',
        schedule: 'Daily 6 AM, Fridays 7 PM'
    }
];
const sampleEvents = [
    {
        id: '1',
        title: 'Sunday Worship Service',
        description: 'Join us for powerful worship, inspiring messages, and fellowship.',
        date: 'January 14, 2025',
        time: '10:00 AM - 12:00 PM',
        location: 'Main Sanctuary',
        attendees: 'All are welcome',
        category: 'Worship',
        featured: true
    },
    {
        id: '2',
        title: 'Youth Night',
        description: 'An evening of worship, games, and fellowship for youth ages 13-18.',
        date: 'January 18, 2025',
        time: '6:00 PM - 8:30 PM',
        location: 'Youth Center',
        attendees: 'Youth (13-18)',
        category: 'Youth'
    }
];
const sampleSermons = [
    {
        id: '1',
        title: 'Walking in Faith',
        description: 'A powerful message about trusting God in uncertain times.',
        pastor: 'Pastor John Smith',
        date: '2024-01-07',
        duration: '45:30',
        audioUrl: 'https://example.com/sermon1.mp3',
        category: 'Faith'
    },
    {
        id: '2',
        title: 'The Power of Prayer',
        description: 'Discovering the transformative power of prayer in our daily lives.',
        pastor: 'Pastor Sarah Williams',
        date: '2024-01-14',
        duration: '38:15',
        audioUrl: 'https://example.com/sermon2.mp3',
        category: 'Prayer'
    }
];
const sampleBibleStudies = [
    {
        id: '1',
        title: 'Gospel of John Study',
        description: 'A deep dive into the Gospel of John, exploring the life and teachings of Jesus.',
        speaker: 'Dr. Michael Chen',
        duration: '8 weeks',
        videoUrl: 'https://example.com/study1.mp4',
        category: 'Gospels'
    }
];
const sampleWorship = [
    {
        id: '1',
        title: 'How Great Thou Art',
        description: 'Traditional hymn performed by YBH Worship Team',
        artist: 'YBH Worship Team',
        duration: '4:32',
        category: 'Traditional'
    },
    {
        id: '2',
        title: 'Amazing Grace (My Chains Are Gone)',
        description: 'Contemporary worship rendition',
        artist: 'YBH Worship Team',
        duration: '5:15',
        category: 'Contemporary'
    }
];
const sampleDevotionals = [
    {
        id: '1',
        title: 'Daily Bread Devotional',
        description: '365 days of scripture readings and reflections.',
        pages: 400,
        category: 'Daily'
    },
    {
        id: '2',
        title: 'Prayers for Strength',
        description: 'A 30-day journey through the Psalms with guided prayers.',
        pages: 32,
        category: 'Prayer'
    }
];
const sampleUsers = [
    {
        id: '1',
        name: 'Admin User',
        email: 'admin@ybhministries.org',
        role: 'Super Admin',
        status: 'Active',
        lastLogin: '2024-01-10 09:30 AM',
        createdAt: '2023-01-15'
    },
    {
        id: '2',
        name: 'John Smith',
        email: 'john.smith@ybhministries.org',
        role: 'Content Manager',
        status: 'Active',
        lastLogin: '2024-01-09 02:15 PM',
        createdAt: '2023-03-20'
    },
    {
        id: '3',
        name: 'Sarah Williams',
        email: 'sarah.w@ybhministries.org',
        role: 'Viewer',
        status: 'Active',
        lastLogin: '2024-01-08 11:45 AM',
        createdAt: '2023-06-10'
    },
    {
        id: '4',
        name: 'Michael Chen',
        email: 'michael.chen@ybhministries.org',
        role: 'Viewer',
        status: 'Inactive',
        lastLogin: '2023-12-15 04:30 PM',
        createdAt: '2023-08-05'
    }
];
const sampleProducts = [
    {
        id: '1',
        name: 'Worship Songs Collection Vol. 1',
        description: 'A comprehensive collection of 100+ worship songs with musical notations and chords.',
        price: 2499,
        category: 'music',
        mainImage: 'https://images.unsplash.com/photo-1545151082-a179dd91b83d?w=800',
        images: [
            'https://images.unsplash.com/photo-1545151082-a179dd91b83d?w=800',
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
            'https://images.unsplash.com/photo-1512850183702-e4c13668b541?w=800'
        ],
        inStock: true,
        stockCount: 50,
        details: 'This comprehensive worship collection includes traditional and contemporary songs with complete musical notations, chord progressions, and lyrics. Perfect for worship leaders, musicians, and congregations.'
    },
    {
        id: '2',
        name: 'Hallel Hymnal',
        description: 'Traditional and contemporary hymns for congregational worship. 200+ songs included.',
        price: 2099,
        category: 'song',
        mainImage: 'https://images.unsplash.com/photo-1526824663004-1c37719e5686?w=800',
        images: [
            'https://images.unsplash.com/photo-1526824663004-1c37719e5686?w=800',
            'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=800'
        ],
        inStock: true,
        stockCount: 75,
        details: 'A beautiful compilation of hymns combining timeless classics with modern worship songs. Includes lyrics, basic chords, and historical context for each hymn.'
    },
    {
        id: '3',
        name: 'Piano Worship Arrangements',
        description: 'Beautiful piano arrangements for worship leaders and pianists. Includes sheet music.',
        price: 2899,
        category: 'music',
        mainImage: 'https://images.unsplash.com/photo-1638534958793-b198c7635575?w=800',
        images: [
            'https://images.unsplash.com/photo-1638534958793-b198c7635575?w=800',
            'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=800'
        ],
        inStock: true,
        stockCount: 30,
        details: 'Professionally arranged piano pieces for worship services. Suitable for intermediate to advanced pianists with detailed fingering suggestions and expression marks.'
    },
    {
        id: '4',
        name: 'Youth Praise Collection',
        description: 'Energetic and modern worship songs perfect for youth gatherings and events.',
        price: 1699,
        category: 'song',
        mainImage: 'https://images.unsplash.com/photo-1545151082-a179dd91b83d?w=800',
        images: [
            'https://images.unsplash.com/photo-1545151082-a179dd91b83d?w=800'
        ],
        inStock: true,
        stockCount: 60,
        details: 'Dynamic collection of contemporary worship songs designed specifically for youth ministry. Includes chord charts and lyrics for guitar and keyboard.'
    },
    {
        id: '5',
        name: 'Biblical Worship Study Guide',
        description: 'Deep dive into biblical foundations of worship with practical applications.',
        price: 1399,
        category: 'literature',
        mainImage: 'https://images.unsplash.com/photo-1526824663004-1c37719e5686?w=800',
        images: [
            'https://images.unsplash.com/photo-1526824663004-1c37719e5686?w=800'
        ],
        inStock: true,
        stockCount: 40,
        details: 'An in-depth study guide exploring the biblical foundations of worship. Includes discussion questions, practical exercises, and historical insights.'
    },
    {
        id: '6',
        name: 'Guitar Chord Songbook',
        description: 'Easy guitar chords for 150+ worship songs. Perfect for beginners and advanced players.',
        price: 1899,
        category: 'music',
        mainImage: 'https://images.unsplash.com/photo-1638534958793-b198c7635575?w=800',
        images: [
            'https://images.unsplash.com/photo-1638534958793-b198c7635575?w=800'
        ],
        inStock: true,
        stockCount: 45,
        details: 'Comprehensive guitar chord songbook with easy-to-follow diagrams. Includes strumming patterns and capo positions for each song.'
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/utils/api-config.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// API Configuration for Vercel Postgres
// Set your Vercel Postgres connection string in environment variables
// POSTGRES_URL=your_connection_string_here
__turbopack_context__.s([
    "API_BASE_URL",
    ()=>API_BASE_URL,
    "API_ENDPOINTS",
    ()=>API_ENDPOINTS,
    "apiCall",
    ()=>apiCall
]);
const API_BASE_URL = '/api'; // Vercel serverless functions
const API_ENDPOINTS = {
    heroImages: {
        list: `${API_BASE_URL}/hero-images`,
        create: `${API_BASE_URL}/hero-images`,
        update: (id)=>`${API_BASE_URL}/hero-images/${id}`,
        delete: (id)=>`${API_BASE_URL}/hero-images/${id}`,
        toggle: (id)=>`${API_BASE_URL}/hero-images/${id}/toggle`,
        reorder: `${API_BASE_URL}/hero-images/reorder`
    }
};
async function apiCall(url, options) {
    try {
        const response = await fetch(url, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options?.headers
            }
        });
        if (!response.ok) {
            const errorData = await response.json().catch(()=>({}));
            return {
                error: errorData.error || `Request failed with status ${response.status}`
            };
        }
        const data = await response.json();
        return {
            data
        };
    } catch (error) {
        console.error('API call error:', error);
        return {
            error: error instanceof Error ? error.message : 'Network error'
        };
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_utils_98662393._.js.map