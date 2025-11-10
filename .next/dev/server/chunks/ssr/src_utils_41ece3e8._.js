module.exports = [
"[project]/src/utils/navigate.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "navigate",
    ()=>navigate
]);
function navigate(path) {
    const event = new CustomEvent('navigate', {
        detail: {
            path
        }
    });
    window.dispatchEvent(event);
}
}),
"[project]/src/utils/eventsData.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Shared events data for use across the application
__turbopack_context__.s([
    "EVENTS",
    ()=>EVENTS,
    "formatEventDate",
    ()=>formatEventDate,
    "getUpcomingEvents",
    ()=>getUpcomingEvents
]);
const EVENTS = [
    {
        id: 1,
        title: "Guinness World Record Attempt-2",
        date: "2025-12-1",
        type: "record",
        description: "Join us for the 2nd attempt of the Guinness World Record",
        location: "Online",
        time: "9:00 AM - 5:00 PM",
        speakers: [
            "Ps. Augustine Dandingi",
            "Master Charlie Aaron Benedict Dandingi",
            "Master Nancy Augustina Dandingi"
        ],
        capacity: "Unlimited",
        extendedDescription: "This is our second attempt at the Guinness World Record, aiming to break the first Guinness World Record that we previously achieved.",
        whatToBring: [
            "Key Board",
            "Key Board Stand",
            "Smart Phone with Internet",
            "HMS - Song Book"
        ],
        imageUrl: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/News/GWR2/GWR-2%20-%20Poster.jpg",
        registration: {
            enabled: true,
            description: "Register early to secure your spot for this event.",
            nationalFee: 5500,
            internationalFee: 7000,
            registrationFee: 600
        }
    }
];
function getUpcomingEvents(limit = 5) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return EVENTS.filter((event)=>new Date(event.date) >= today).sort((a, b)=>new Date(a.date).getTime() - new Date(b.date).getTime()).slice(0, limit);
}
function formatEventDate(dateString, locale = 'en') {
    const date = new Date(dateString);
    const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    };
    return date.toLocaleDateString(locale === 'te' ? 'te-IN' : 'en-US', options);
}
}),
];

//# sourceMappingURL=src_utils_41ece3e8._.js.map