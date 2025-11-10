(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/utils/theme.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Centralized Theme Colors for Yeshua Beth Hallel Ministries
 * 
 * This file contains all the color constants used across the application.
 * Update colors here to maintain consistency across all pages.
 */ __turbopack_context__.s([
    "THEME_COLORS",
    ()=>THEME_COLORS,
    "accentGold",
    ()=>accentGold,
    "borderGray",
    ()=>borderGray,
    "buttonDark",
    ()=>buttonDark,
    "cardDark",
    ()=>cardDark,
    "cardMedium",
    ()=>cardMedium,
    "grayDark",
    ()=>grayDark,
    "grayLight",
    ()=>grayLight,
    "grayMedium",
    ()=>grayMedium,
    "primaryBackground",
    ()=>primaryBackground,
    "secondaryBackground",
    ()=>secondaryBackground,
    "textGray",
    ()=>textGray,
    "textMuted",
    ()=>textMuted,
    "textWhite",
    ()=>textWhite
]);
const THEME_COLORS = {
    // Background Colors
    primaryBackground: '#000000',
    secondaryBackground: '#2E2E2E',
    // Accent Colors
    accentGold: '#FDB813',
    // Button Colors
    buttonDark: '#2E2E2E',
    // Gray Scale
    grayDark: '#333333',
    grayMedium: '#666666',
    grayLight: '#999999',
    // Card/Section Backgrounds
    cardDark: '#1a1a1a',
    cardMedium: '#2a2a2a',
    // Border Colors
    borderGray: '#3a3a3a',
    // Text Colors
    textWhite: '#ffffff',
    textGray: '#cccccc',
    textMuted: '#888888'
};
const { primaryBackground, secondaryBackground, accentGold, buttonDark, grayDark, grayMedium, grayLight, cardDark, cardMedium, borderGray, textWhite, textGray, textMuted } = THEME_COLORS;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ministries/HMSPage.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HMSPage",
    ()=>HMSPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$music$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Music$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/music.js [app-client] (ecmascript) <export default as Music>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/users.js [app-client] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/heart.js [app-client] (ecmascript) <export default as Heart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$youtube$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Youtube$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/youtube.js [app-client] (ecmascript) <export default as Youtube>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/react-i18next/dist/es/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-i18next/dist/es/useTranslation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
;
;
;
function ImageWithFallback(props) {
    _s();
    const [didError, setDidError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const { src, alt, style, className, ...rest } = props;
    return didError ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `inline-block bg-gray-100 text-center align-middle ${className ?? ''}`,
        style: style,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-center w-full h-full",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                src: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==",
                alt: "Error loading image",
                ...rest,
                "data-original-url": src
            }, void 0, false, {
                fileName: "[project]/src/components/ministries/HMSPage.tsx",
                lineNumber: 15,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/ministries/HMSPage.tsx",
            lineNumber: 14,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ministries/HMSPage.tsx",
        lineNumber: 10,
        columnNumber: 5
    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
        src: src,
        alt: alt,
        className: className,
        style: {
            ...style,
            width: '100%',
            height: '100%',
            borderRadius: 8
        },
        ...rest,
        onError: ()=>setDidError(true)
    }, void 0, false, {
        fileName: "[project]/src/components/ministries/HMSPage.tsx",
        lineNumber: 19,
        columnNumber: 5
    }, this);
}
_s(ImageWithFallback, "QMNzFKr35q4hEDRZ59yrU4N+ufk=");
_c = ImageWithFallback;
function HMSPage({ ctaButtonColor = "#FFD700", accentColor = "#8A2BE2" }) {
    _s1();
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"])('ministries');
    const [isMenuOpen, setIsMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [activeSection, setActiveSection] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("home");
    const sectionRefs = {
        home: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null),
        mission: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null),
        purpose: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null),
        approach: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null),
        vision: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null),
        join: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null)
    };
    const toggleMenu = ()=>{
        setIsMenuOpen(!isMenuOpen);
    };
    const scrollToSection = (section)=>{
        sectionRefs[section].current?.scrollIntoView({
            behavior: 'smooth'
        });
        setActiveSection(section);
        setIsMenuOpen(false);
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HMSPage.useEffect": ()=>{
            const handleScroll = {
                "HMSPage.useEffect.handleScroll": ()=>{
                    const scrollPosition = window.scrollY + 100;
                    Object.entries(sectionRefs).forEach({
                        "HMSPage.useEffect.handleScroll": ([section, ref])=>{
                            if (ref.current) {
                                const element = ref.current;
                                const offsetTop = element.offsetTop;
                                const height = element.offsetHeight;
                                if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
                                    setActiveSection(section);
                                }
                            }
                        }
                    }["HMSPage.useEffect.handleScroll"]);
                }
            }["HMSPage.useEffect.handleScroll"];
            window.addEventListener('scroll', handleScroll);
            return ({
                "HMSPage.useEffect": ()=>window.removeEventListener('scroll', handleScroll)
            })["HMSPage.useEffect"];
        }
    }["HMSPage.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-black text-white min-h-screen font-sans",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                ref: sectionRefs.home,
                className: "pt-4 md:pt-16 h-[80vh] flex items-start relative overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 z-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ImageWithFallback, {
                                src: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
                                alt: "Music instruments in a studio",
                                className: "w-full h-full object-cover opacity-40"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ministries/HMSPage.tsx",
                                lineNumber: 90,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0 bg-gradient-to-b from-black via-transparent to-black"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ministries/HMSPage.tsx",
                                lineNumber: 95,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ministries/HMSPage.tsx",
                        lineNumber: 89,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "container mx-auto px-4 z-10 py-2 md:py-8",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "max-w-3xl mx-auto text-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "text-4xl md:text-6xl font-bold mb-4 md:mb-6 text-white",
                                    children: t('hmsPage.hero.title')
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ministries/HMSPage.tsx",
                                    lineNumber: 100,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xl md:text-2xl lg:text-3xl mb-6 md:mb-8 text-white",
                                    children: t('hmsPage.hero.tagline')
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ministries/HMSPage.tsx",
                                    lineNumber: 101,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-lg md:text-xl mb-4 md:mb-8 text-gray-300 max-w-2xl mx-auto",
                                    children: t('hmsPage.hero.description')
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ministries/HMSPage.tsx",
                                    lineNumber: 104,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-wrap gap-3 md:gap-4 justify-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>scrollToSection('join'),
                                            className: "px-6 md:px-8 py-2.5 md:py-3 rounded-full font-medium text-black cursor-pointer transition-all duration-300 hover:opacity-90 hover:scale-105",
                                            style: {
                                                backgroundColor: ctaButtonColor
                                            },
                                            children: t('hmsPage.hero.joinButton')
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ministries/HMSPage.tsx",
                                            lineNumber: 108,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>scrollToSection('approach'),
                                            className: "px-6 md:px-8 py-2.5 md:py-3 rounded-full font-medium bg-transparent cursor-pointer transition-all duration-300 hover:text-black",
                                            style: {
                                                transition: 'all 0.3s ease',
                                                border: '1px solid #FDB813'
                                            },
                                            onMouseEnter: (e)=>e.currentTarget.style.backgroundColor = '#FDB813',
                                            onMouseLeave: (e)=>e.currentTarget.style.backgroundColor = 'transparent',
                                            children: t('hmsPage.hero.exploreButton')
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ministries/HMSPage.tsx",
                                            lineNumber: 115,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>window.open('https://www.youtube.com/@HallelMusicSchool', '_blank'),
                                            className: "px-6 md:px-8 py-2.5 md:py-3 rounded-full font-medium bg-transparent cursor-pointer transition-all duration-300 hover:text-black flex items-center gap-2",
                                            style: {
                                                transition: 'all 0.3s ease',
                                                border: '1px solid #FDB813'
                                            },
                                            onMouseEnter: (e)=>e.currentTarget.style.backgroundColor = '#FDB813',
                                            onMouseLeave: (e)=>e.currentTarget.style.backgroundColor = 'transparent',
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$youtube$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Youtube$3e$__["Youtube"], {
                                                    size: 20
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/ministries/HMSPage.tsx",
                                                    lineNumber: 131,
                                                    columnNumber: 17
                                                }, this),
                                                t('hmsPage.hero.subscribeButton')
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/ministries/HMSPage.tsx",
                                            lineNumber: 124,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/ministries/HMSPage.tsx",
                                    lineNumber: 107,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ministries/HMSPage.tsx",
                            lineNumber: 99,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/ministries/HMSPage.tsx",
                        lineNumber: 98,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ministries/HMSPage.tsx",
                lineNumber: 85,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                ref: sectionRefs.mission,
                className: "py-20 bg-[#2E2E2E]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "container mx-auto px-4",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col md:flex-row items-center gap-12",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "md:w-1/2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-3xl md:text-4xl font-normal mb-2",
                                        children: t('hmsPage.mission.title')
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ministries/HMSPage.tsx",
                                        lineNumber: 147,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-24 h-1 rounded-full mb-6",
                                        style: {
                                            backgroundColor: '#FDB813'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ministries/HMSPage.tsx",
                                        lineNumber: 150,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-lg mb-6",
                                        children: t('hmsPage.mission.subtitle')
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ministries/HMSPage.tsx",
                                        lineNumber: 151,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-gray-300",
                                        children: t('hmsPage.mission.description')
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ministries/HMSPage.tsx",
                                        lineNumber: 154,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ministries/HMSPage.tsx",
                                lineNumber: 146,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "md:w-1/2 relative",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "aspect-video rounded-lg overflow-hidden",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ImageWithFallback, {
                                        src: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
                                        alt: "Students learning music",
                                        className: "w-full h-full object-cover"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ministries/HMSPage.tsx",
                                        lineNumber: 160,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ministries/HMSPage.tsx",
                                    lineNumber: 159,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/ministries/HMSPage.tsx",
                                lineNumber: 158,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ministries/HMSPage.tsx",
                        lineNumber: 145,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/ministries/HMSPage.tsx",
                    lineNumber: 144,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ministries/HMSPage.tsx",
                lineNumber: 140,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                ref: sectionRefs.purpose,
                className: "py-20 bg-black",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "container mx-auto px-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center max-w-3xl mx-auto mb-16",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-3xl md:text-4xl mb-2",
                                    children: t('hmsPage.purpose.title')
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ministries/HMSPage.tsx",
                                    lineNumber: 178,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-24 h-1 rounded-full mx-auto mb-6",
                                    style: {
                                        backgroundColor: '#FDB813'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ministries/HMSPage.tsx",
                                    lineNumber: 179,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-lg text-gray-300",
                                    children: t('hmsPage.purpose.description')
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ministries/HMSPage.tsx",
                                    lineNumber: 180,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ministries/HMSPage.tsx",
                            lineNumber: 177,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 md:grid-cols-3 gap-8",
                            children: [
                                {
                                    title: t('hmsPage.purpose.cards.sanctuary.title'),
                                    description: t('hmsPage.purpose.cards.sanctuary.description'),
                                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"], {
                                        className: "h-8 w-8",
                                        style: {
                                            color: accentColor
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ministries/HMSPage.tsx",
                                        lineNumber: 190,
                                        columnNumber: 23
                                    }, this)
                                },
                                {
                                    title: t('hmsPage.purpose.cards.rhythm.title'),
                                    description: t('hmsPage.purpose.cards.rhythm.description'),
                                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$music$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Music$3e$__["Music"], {
                                        className: "h-8 w-8",
                                        style: {
                                            color: accentColor
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ministries/HMSPage.tsx",
                                        lineNumber: 195,
                                        columnNumber: 23
                                    }, this)
                                },
                                {
                                    title: t('hmsPage.purpose.cards.church.title'),
                                    description: t('hmsPage.purpose.cards.church.description'),
                                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                                        className: "h-8 w-8",
                                        style: {
                                            color: accentColor
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ministries/HMSPage.tsx",
                                        lineNumber: 200,
                                        columnNumber: 23
                                    }, this)
                                }
                            ].map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-[#2E2E2E] p-8 rounded-lg",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mb-4",
                                            children: item.icon
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ministries/HMSPage.tsx",
                                            lineNumber: 207,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-xl font-bold mb-3",
                                            children: item.title
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ministries/HMSPage.tsx",
                                            lineNumber: 208,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-gray-300",
                                            children: item.description
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ministries/HMSPage.tsx",
                                            lineNumber: 209,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, index, true, {
                                    fileName: "[project]/src/components/ministries/HMSPage.tsx",
                                    lineNumber: 203,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/components/ministries/HMSPage.tsx",
                            lineNumber: 185,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ministries/HMSPage.tsx",
                    lineNumber: 176,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ministries/HMSPage.tsx",
                lineNumber: 172,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                ref: sectionRefs.approach,
                className: "py-20 bg-[#2E2E2E]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "container mx-auto px-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center max-w-3xl mx-auto mb-16",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-3xl md:text-4xl mb-2",
                                    children: t('hmsPage.approach.title')
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ministries/HMSPage.tsx",
                                    lineNumber: 223,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-24 h-1 rounded-full mx-auto mb-6",
                                    style: {
                                        backgroundColor: '#FDB813'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ministries/HMSPage.tsx",
                                    lineNumber: 224,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-lg text-gray-300",
                                    children: t('hmsPage.approach.description')
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ministries/HMSPage.tsx",
                                    lineNumber: 225,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ministries/HMSPage.tsx",
                            lineNumber: 222,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 md:grid-cols-2 gap-8",
                            children: [
                                {
                                    title: t('hmsPage.approach.items.training.title'),
                                    description: t('hmsPage.approach.items.training.description'),
                                    image: "https://images.unsplash.com/photo-1513883049090-d0b7439799bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                                },
                                {
                                    title: t('hmsPage.approach.items.biblical.title'),
                                    description: t('hmsPage.approach.items.biblical.description'),
                                    image: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                                },
                                {
                                    title: t('hmsPage.approach.items.workshops.title'),
                                    description: t('hmsPage.approach.items.workshops.description'),
                                    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                                },
                                {
                                    title: t('hmsPage.approach.items.practical.title'),
                                    description: t('hmsPage.approach.items.practical.description'),
                                    image: "https://images.unsplash.com/photo-1501612780327-45045538702b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                                }
                            ].map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "group relative overflow-hidden rounded-lg",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "aspect-video",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ImageWithFallback, {
                                                src: item.image,
                                                alt: item.title,
                                                className: "w-full h-full object-cover"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ministries/HMSPage.tsx",
                                                lineNumber: 258,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ministries/HMSPage.tsx",
                                            lineNumber: 257,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ministries/HMSPage.tsx",
                                            lineNumber: 264,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute bottom-0 left-0 right-0 p-6",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-xl font-bold mb-2",
                                                    children: item.title
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/ministries/HMSPage.tsx",
                                                    lineNumber: 266,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-gray-300",
                                                    children: item.description
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/ministries/HMSPage.tsx",
                                                    lineNumber: 267,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/ministries/HMSPage.tsx",
                                            lineNumber: 265,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, index, true, {
                                    fileName: "[project]/src/components/ministries/HMSPage.tsx",
                                    lineNumber: 253,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/components/ministries/HMSPage.tsx",
                            lineNumber: 230,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ministries/HMSPage.tsx",
                    lineNumber: 221,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ministries/HMSPage.tsx",
                lineNumber: 217,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                ref: sectionRefs.vision,
                className: "py-20 bg-black relative overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 z-0 opacity-20",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ImageWithFallback, {
                                src: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
                                alt: "Musical notes background",
                                className: "w-full h-full object-cover"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ministries/HMSPage.tsx",
                                lineNumber: 281,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0 bg-black bg-opacity-70"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ministries/HMSPage.tsx",
                                lineNumber: 286,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ministries/HMSPage.tsx",
                        lineNumber: 280,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "container mx-auto px-4 relative z-10",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "max-w-3xl mx-auto text-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-3xl md:text-4xl mb-2",
                                    children: t('hmsPage.vision.title')
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ministries/HMSPage.tsx",
                                    lineNumber: 291,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-24 h-1 rounded-full mx-auto mb-6",
                                    style: {
                                        backgroundColor: '#FDB813'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ministries/HMSPage.tsx",
                                    lineNumber: 292,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-lg mb-10",
                                    children: t('hmsPage.vision.description')
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ministries/HMSPage.tsx",
                                    lineNumber: 293,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12",
                                    children: [
                                        {
                                            text: t('hmsPage.vision.statements.soul')
                                        },
                                        {
                                            text: t('hmsPage.vision.statements.home')
                                        },
                                        {
                                            text: t('hmsPage.vision.statements.church')
                                        }
                                    ].map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-xl font-light italic",
                                            children: item.text
                                        }, index, false, {
                                            fileName: "[project]/src/components/ministries/HMSPage.tsx",
                                            lineNumber: 303,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ministries/HMSPage.tsx",
                                    lineNumber: 297,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ministries/HMSPage.tsx",
                            lineNumber: 290,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/ministries/HMSPage.tsx",
                        lineNumber: 289,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ministries/HMSPage.tsx",
                lineNumber: 276,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                ref: sectionRefs.join,
                className: "py-20 bg-[#2E2E2E]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "container mx-auto px-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center max-w-3xl mx-auto mb-12",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-3xl md:text-4xl mb-2",
                                    children: t('hmsPage.join.title')
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ministries/HMSPage.tsx",
                                    lineNumber: 322,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-24 h-1 rounded-full mx-auto mb-6",
                                    style: {
                                        backgroundColor: '#FDB813'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ministries/HMSPage.tsx",
                                    lineNumber: 323,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-lg text-gray-300",
                                    children: t('hmsPage.join.description')
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ministries/HMSPage.tsx",
                                    lineNumber: 324,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ministries/HMSPage.tsx",
                            lineNumber: 321,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-black p-8 rounded-lg",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-xl font-bold mb-4",
                                            children: t('hmsPage.join.online.title')
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ministries/HMSPage.tsx",
                                            lineNumber: 331,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mb-6 text-gray-300",
                                            children: t('hmsPage.join.online.description')
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ministries/HMSPage.tsx",
                                            lineNumber: 332,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "flex items-center gap-2 px-6 py-3 rounded-full font-medium cursor-pointer transition-all duration-300 hover:opacity-90 hover:scale-105",
                                            style: {
                                                backgroundColor: ctaButtonColor,
                                                color: 'black'
                                            },
                                            children: [
                                                t('hmsPage.join.online.button'),
                                                " ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                                    size: 18
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/ministries/HMSPage.tsx",
                                                    lineNumber: 339,
                                                    columnNumber: 51
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/ministries/HMSPage.tsx",
                                            lineNumber: 335,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/ministries/HMSPage.tsx",
                                    lineNumber: 330,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-black p-8 rounded-lg",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-xl font-bold mb-4",
                                            children: t('hmsPage.join.lms.title')
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ministries/HMSPage.tsx",
                                            lineNumber: 344,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mb-6 text-gray-300",
                                            children: t('hmsPage.join.lms.description')
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ministries/HMSPage.tsx",
                                            lineNumber: 345,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "flex items-center gap-2 px-6 py-3 rounded-full font-medium cursor-pointer transition-all duration-300 hover:opacity-90 hover:scale-105",
                                            style: {
                                                backgroundColor: ctaButtonColor,
                                                color: 'black'
                                            },
                                            children: [
                                                t('hmsPage.join.lms.button'),
                                                " ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                                    size: 18
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/ministries/HMSPage.tsx",
                                                    lineNumber: 352,
                                                    columnNumber: 48
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/ministries/HMSPage.tsx",
                                            lineNumber: 348,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/ministries/HMSPage.tsx",
                                    lineNumber: 343,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ministries/HMSPage.tsx",
                            lineNumber: 329,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-12 p-8 bg-black rounded-lg max-w-4xl mx-auto text-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-xl font-bold mb-4",
                                    children: t('hmsPage.join.guinness.title')
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ministries/HMSPage.tsx",
                                    lineNumber: 358,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mb-6 text-gray-300",
                                    children: t('hmsPage.join.guinness.description')
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ministries/HMSPage.tsx",
                                    lineNumber: 359,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "px-6 py-3 rounded-full font-medium bg-transparent cursor-pointer transition-all duration-300 hover:text-black",
                                    style: {
                                        transition: 'all 0.3s ease',
                                        border: '1px solid #FDB813'
                                    },
                                    onMouseEnter: (e)=>e.currentTarget.style.backgroundColor = '#FDB813',
                                    onMouseLeave: (e)=>e.currentTarget.style.backgroundColor = 'transparent',
                                    children: t('hmsPage.join.guinness.button')
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ministries/HMSPage.tsx",
                                    lineNumber: 362,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ministries/HMSPage.tsx",
                            lineNumber: 357,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ministries/HMSPage.tsx",
                    lineNumber: 320,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ministries/HMSPage.tsx",
                lineNumber: 316,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ministries/HMSPage.tsx",
        lineNumber: 83,
        columnNumber: 5
    }, this);
}
_s1(HMSPage, "vaj5JG0uwmZ14OgF/TUnE6oCSbQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"]
    ];
});
_c1 = HMSPage;
var _c, _c1;
__turbopack_context__.k.register(_c, "ImageWithFallback");
__turbopack_context__.k.register(_c1, "HMSPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ministries/HallelBibleSchoolMinistry.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HallelBibleSchoolMinistry",
    ()=>HallelBibleSchoolMinistry
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/react-i18next/dist/es/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-i18next/dist/es/useTranslation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
function HallelBibleSchoolMinistry() {
    _s();
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"])('ministries');
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-black text-white font-sans",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "relative h-[80vh] flex items-start justify-center overflow-hidden mb-20 pt-4 md:pt-16",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60 z-10"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ministries/HallelBibleSchoolMinistry.tsx",
                        lineNumber: 12,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 bg-[url('https://images.unsplash.com/photo-1672867138294-8aa5591041de?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-40",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute inset-0 bg-gradient-to-b from-black via-transparent to-black"
                        }, void 0, false, {
                            fileName: "[project]/src/components/ministries/HallelBibleSchoolMinistry.tsx",
                            lineNumber: 14,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/ministries/HallelBibleSchoolMinistry.tsx",
                        lineNumber: 13,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "container mx-auto px-4 z-20 text-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "max-w-4xl mx-auto",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "text-4xl md:text-6xl font-bold mb-4 md:mb-6 text-white",
                                    children: t('hallelBibleSchoolPage.title')
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ministries/HallelBibleSchoolMinistry.tsx",
                                    lineNumber: 19,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xl md:text-2xl lg:text-3xl mb-6 md:mb-8 text-white",
                                    children: t('hallelBibleSchoolPage.tagline')
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ministries/HallelBibleSchoolMinistry.tsx",
                                    lineNumber: 20,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-lg md:text-xl leading-relaxed mx-6 md:mx-16 lg:mx-1 text-white",
                                    children: t('hallelBibleSchoolPage.heroDescription')
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ministries/HallelBibleSchoolMinistry.tsx",
                                    lineNumber: 23,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ministries/HallelBibleSchoolMinistry.tsx",
                            lineNumber: 18,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/ministries/HallelBibleSchoolMinistry.tsx",
                        lineNumber: 17,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ministries/HallelBibleSchoolMinistry.tsx",
                lineNumber: 11,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "bg-black py-16",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid md:grid-cols-2 gap-12",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-[#2E2E2E] p-8 rounded-lg",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-3xl font-normal mb-4",
                                        children: t('hallelBibleSchoolPage.vision.title')
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ministries/HallelBibleSchoolMinistry.tsx",
                                        lineNumber: 35,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "leading-relaxed",
                                        children: t('hallelBibleSchoolPage.vision.content')
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ministries/HallelBibleSchoolMinistry.tsx",
                                        lineNumber: 36,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ministries/HallelBibleSchoolMinistry.tsx",
                                lineNumber: 34,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-[#2E2E2E] p-8 rounded-lg",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-3xl font-normal mb-4",
                                        children: t('hallelBibleSchoolPage.mission.title')
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ministries/HallelBibleSchoolMinistry.tsx",
                                        lineNumber: 41,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mb-4",
                                        children: t('hallelBibleSchoolPage.mission.intro')
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ministries/HallelBibleSchoolMinistry.tsx",
                                        lineNumber: 42,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        className: "list-disc pl-5 space-y-2",
                                        children: t('hallelBibleSchoolPage.mission.points', {
                                            returnObjects: true
                                        }).map((point, index)=>{
                                            const titles = t('hallelBibleSchoolPage.mission.pointTitles', {
                                                returnObjects: true
                                            });
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-semibold underline decoration-[#FDB813] decoration-4 underline-offset-4",
                                                        children: titles[index]
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/ministries/HallelBibleSchoolMinistry.tsx",
                                                        lineNumber: 48,
                                                        columnNumber: 23
                                                    }, this),
                                                    ' ',
                                                    point.replace(titles[index], '').trim()
                                                ]
                                            }, index, true, {
                                                fileName: "[project]/src/components/ministries/HallelBibleSchoolMinistry.tsx",
                                                lineNumber: 47,
                                                columnNumber: 21
                                            }, this);
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ministries/HallelBibleSchoolMinistry.tsx",
                                        lineNumber: 43,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ministries/HallelBibleSchoolMinistry.tsx",
                                lineNumber: 40,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ministries/HallelBibleSchoolMinistry.tsx",
                        lineNumber: 33,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/ministries/HallelBibleSchoolMinistry.tsx",
                    lineNumber: 32,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ministries/HallelBibleSchoolMinistry.tsx",
                lineNumber: 31,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                style: {
                    backgroundColor: '#2E2E2E'
                },
                className: "py-16",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-3xl mb-2 text-center",
                            children: t('hallelBibleSchoolPage.unique.title')
                        }, void 0, false, {
                            fileName: "[project]/src/components/ministries/HallelBibleSchoolMinistry.tsx",
                            lineNumber: 64,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-24 h-1 rounded-full mx-auto mb-6",
                            style: {
                                backgroundColor: '#FDB813'
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/components/ministries/HallelBibleSchoolMinistry.tsx",
                            lineNumber: 65,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid md:grid-cols-2 lg:grid-cols-4 gap-6",
                            children: t('hallelBibleSchoolPage.unique.items', {
                                returnObjects: true
                            }).map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-black p-6 rounded-lg border border-gray-800",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-xl font-bold mb-3 text-yellow-500",
                                            children: item.title
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ministries/HallelBibleSchoolMinistry.tsx",
                                            lineNumber: 69,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            children: item.highlight ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                children: [
                                                    item.description.split(item.highlight)[0],
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-semibold underline decoration-[#FDB813] decoration-4 underline-offset-4",
                                                        children: item.highlight
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/ministries/HallelBibleSchoolMinistry.tsx",
                                                        lineNumber: 74,
                                                        columnNumber: 23
                                                    }, this),
                                                    item.description.split(item.highlight)[1]
                                                ]
                                            }, void 0, true) : item.description
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ministries/HallelBibleSchoolMinistry.tsx",
                                            lineNumber: 70,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, index, true, {
                                    fileName: "[project]/src/components/ministries/HallelBibleSchoolMinistry.tsx",
                                    lineNumber: 68,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/components/ministries/HallelBibleSchoolMinistry.tsx",
                            lineNumber: 66,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ministries/HallelBibleSchoolMinistry.tsx",
                    lineNumber: 63,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ministries/HallelBibleSchoolMinistry.tsx",
                lineNumber: 62,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "bg-black py-16",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-3xl mb-2 text-center",
                            children: t('hallelBibleSchoolPage.courses.title')
                        }, void 0, false, {
                            fileName: "[project]/src/components/ministries/HallelBibleSchoolMinistry.tsx",
                            lineNumber: 92,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-24 h-1 rounded-full mx-auto mb-6",
                            style: {
                                backgroundColor: '#FDB813'
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/components/ministries/HallelBibleSchoolMinistry.tsx",
                            lineNumber: 93,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-lg mb-8 text-center max-w-3xl mx-auto",
                            children: t('hallelBibleSchoolPage.courses.intro')
                        }, void 0, false, {
                            fileName: "[project]/src/components/ministries/HallelBibleSchoolMinistry.tsx",
                            lineNumber: 94,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid md:grid-cols-2 gap-8",
                            children: t('hallelBibleSchoolPage.courses.programs', {
                                returnObjects: true
                            }).map((program, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-[#2E2E2E] p-6 rounded-lg",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-xl font-bold mb-3 text-yellow-500",
                                            children: program.title
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ministries/HallelBibleSchoolMinistry.tsx",
                                            lineNumber: 100,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            children: program.description
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ministries/HallelBibleSchoolMinistry.tsx",
                                            lineNumber: 101,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, index, true, {
                                    fileName: "[project]/src/components/ministries/HallelBibleSchoolMinistry.tsx",
                                    lineNumber: 99,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/components/ministries/HallelBibleSchoolMinistry.tsx",
                            lineNumber: 97,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-6 text-center",
                            children: t('hallelBibleSchoolPage.courses.closing')
                        }, void 0, false, {
                            fileName: "[project]/src/components/ministries/HallelBibleSchoolMinistry.tsx",
                            lineNumber: 105,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ministries/HallelBibleSchoolMinistry.tsx",
                    lineNumber: 91,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ministries/HallelBibleSchoolMinistry.tsx",
                lineNumber: 90,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                style: {
                    backgroundColor: '#2E2E2E'
                },
                className: "py-16",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-3xl mb-2 text-center",
                            children: t('hallelBibleSchoolPage.impact.title')
                        }, void 0, false, {
                            fileName: "[project]/src/components/ministries/HallelBibleSchoolMinistry.tsx",
                            lineNumber: 114,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-24 h-1 rounded-full mx-auto mb-6",
                            style: {
                                backgroundColor: '#FDB813'
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/components/ministries/HallelBibleSchoolMinistry.tsx",
                            lineNumber: 115,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-black p-8 rounded-lg border border-gray-800",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-lg leading-relaxed mb-4",
                                    children: t('hallelBibleSchoolPage.impact.paragraph1')
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ministries/HallelBibleSchoolMinistry.tsx",
                                    lineNumber: 117,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-lg leading-relaxed",
                                    children: t('hallelBibleSchoolPage.impact.paragraph2')
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ministries/HallelBibleSchoolMinistry.tsx",
                                    lineNumber: 120,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ministries/HallelBibleSchoolMinistry.tsx",
                            lineNumber: 116,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ministries/HallelBibleSchoolMinistry.tsx",
                    lineNumber: 113,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ministries/HallelBibleSchoolMinistry.tsx",
                lineNumber: 112,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "bg-black py-16",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center mb-8",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-3xl mb-2",
                                    children: t('hallelBibleSchoolPage.callToAction.title')
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ministries/HallelBibleSchoolMinistry.tsx",
                                    lineNumber: 131,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-24 h-1 rounded-full mx-auto mb-6",
                                    style: {
                                        backgroundColor: '#FDB813'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ministries/HallelBibleSchoolMinistry.tsx",
                                    lineNumber: 132,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-lg mx-auto mb-8",
                                    children: t('hallelBibleSchoolPage.callToAction.description')
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ministries/HallelBibleSchoolMinistry.tsx",
                                    lineNumber: 133,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-lg font-semibold mb-8",
                                    children: [
                                        t('hallelBibleSchoolPage.callToAction.closing').split(t('hallelBibleSchoolPage.callToAction.closingHighlight'))[0],
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-semibold underline decoration-[#FDB813] decoration-4 underline-offset-4",
                                            children: t('hallelBibleSchoolPage.callToAction.closingHighlight')
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ministries/HallelBibleSchoolMinistry.tsx",
                                            lineNumber: 138,
                                            columnNumber: 15
                                        }, this),
                                        t('hallelBibleSchoolPage.callToAction.closing').split(t('hallelBibleSchoolPage.callToAction.closingHighlight'))[1]
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/ministries/HallelBibleSchoolMinistry.tsx",
                                    lineNumber: 136,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "bg-[#FDB813] hover:bg-yellow-600 text-black font-semibold py-3 px-8 rounded-lg transition-all duration-300 cursor-pointer hover:scale-105",
                                    children: t('hallelBibleSchoolPage.callToAction.button')
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ministries/HallelBibleSchoolMinistry.tsx",
                                    lineNumber: 143,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ministries/HallelBibleSchoolMinistry.tsx",
                            lineNumber: 130,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center italic",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-lg",
                                children: t('hallelBibleSchoolPage.callToAction.verse')
                            }, void 0, false, {
                                fileName: "[project]/src/components/ministries/HallelBibleSchoolMinistry.tsx",
                                lineNumber: 150,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/ministries/HallelBibleSchoolMinistry.tsx",
                            lineNumber: 149,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ministries/HallelBibleSchoolMinistry.tsx",
                    lineNumber: 129,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ministries/HallelBibleSchoolMinistry.tsx",
                lineNumber: 128,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ministries/HallelBibleSchoolMinistry.tsx",
        lineNumber: 9,
        columnNumber: 5
    }, this);
}
_s(HallelBibleSchoolMinistry, "zlIdU9EjM2llFt74AbE2KsUJXyM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"]
    ];
});
_c = HallelBibleSchoolMinistry;
var _c;
__turbopack_context__.k.register(_c, "HallelBibleSchoolMinistry");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/figma/ImageWithFallback.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ImageWithFallback",
    ()=>ImageWithFallback
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ImageOff$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/image-off.js [app-client] (ecmascript) <export default as ImageOff>");
;
var _s = __turbopack_context__.k.signature();
;
;
function ImageWithFallback({ src, alt, fallbackSrc = '/images/placeholder.jpg', className = '', loading = 'lazy', enableResponsive = true, ...props }) {
    _s();
    const [imgSrc, setImgSrc] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(src || fallbackSrc);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [hasError, setHasError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ImageWithFallback.useEffect": ()=>{
            setImgSrc(src || fallbackSrc);
            setIsLoading(true);
            setHasError(false);
        }
    }["ImageWithFallback.useEffect"], [
        src,
        fallbackSrc
    ]);
    const handleError = ()=>{
        if (imgSrc !== fallbackSrc) {
            setImgSrc(fallbackSrc);
            setHasError(false);
        } else {
            setHasError(true);
        }
        setIsLoading(false);
    };
    const handleLoad = ()=>{
        setIsLoading(false);
    };
    // Generate responsive image sizes for Supabase Storage URLs
    const getResponsiveSizes = (imageUrl)=>{
        // Check if it's a Supabase Storage URL
        if (!imageUrl.includes('supabase.co/storage')) {
            return null;
        }
        // Supabase Storage supports image transformations via URL parameters
        // Format: ?width=XXX&height=XXX&resize=contain&quality=XX
        const baseUrl = imageUrl.split('?')[0];
        return {
            small: `${baseUrl}?width=400&quality=85`,
            medium: `${baseUrl}?width=800&quality=90`,
            large: `${baseUrl}?width=1600&quality=90`,
            original: imageUrl
        };
    };
    const responsiveSizes = enableResponsive && imgSrc ? getResponsiveSizes(imgSrc) : null;
    // If error and no fallback worked, show error state
    if (hasError) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `flex items-center justify-center bg-gray-100 ${className}`,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center p-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ImageOff$3e$__["ImageOff"], {
                        className: "mx-auto text-gray-400 mb-2",
                        size: 32
                    }, void 0, false, {
                        fileName: "[project]/src/components/figma/ImageWithFallback.tsx",
                        lineNumber: 72,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-gray-500",
                        children: "Image not available"
                    }, void 0, false, {
                        fileName: "[project]/src/components/figma/ImageWithFallback.tsx",
                        lineNumber: 73,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/figma/ImageWithFallback.tsx",
                lineNumber: 71,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/figma/ImageWithFallback.tsx",
            lineNumber: 70,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative",
        children: [
            isLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `absolute inset-0 bg-gray-200 animate-pulse ${className}`
            }, void 0, false, {
                fileName: "[project]/src/components/figma/ImageWithFallback.tsx",
                lineNumber: 83,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                ...props,
                src: imgSrc,
                alt: alt,
                className: `${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`,
                onError: handleError,
                onLoad: handleLoad,
                loading: loading,
                ...responsiveSizes && {
                    srcSet: `
            ${responsiveSizes.small} 400w,
            ${responsiveSizes.medium} 800w,
            ${responsiveSizes.large} 1600w
          `,
                    sizes: '(max-width: 640px) 400px, (max-width: 1024px) 800px, 1600px'
                },
                // Enable browser-level image decoding optimization
                decoding: "async"
            }, void 0, false, {
                fileName: "[project]/src/components/figma/ImageWithFallback.tsx",
                lineNumber: 87,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/figma/ImageWithFallback.tsx",
        lineNumber: 80,
        columnNumber: 5
    }, this);
}
_s(ImageWithFallback, "8M+Nh0Y8/zl5ZxG2OnGWiKoi9NQ=");
_c = ImageWithFallback;
var _c;
__turbopack_context__.k.register(_c, "ImageWithFallback");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ministries/HallelConferences.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HallelConferences",
    ()=>HallelConferences
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$music$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Music$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/music.js [app-client] (ecmascript) <export default as Music>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/heart.js [app-client] (ecmascript) <export default as Heart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/users.js [app-client] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/star.js [app-client] (ecmascript) <export default as Star>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar.js [app-client] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2d$vocal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mic2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/mic-vocal.js [app-client] (ecmascript) <export default as Mic2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/book-open.js [app-client] (ecmascript) <export default as BookOpen>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCcw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/refresh-ccw.js [app-client] (ecmascript) <export default as RefreshCcw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$figma$2f$ImageWithFallback$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/figma/ImageWithFallback.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/react-i18next/dist/es/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-i18next/dist/es/useTranslation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
function HallelConferences() {
    _s();
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"])('ministries');
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "font-sans text-white bg-black",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "relative h-[80vh] flex items-start justify-center overflow-hidden mb-20 pt-4 md:pt-16",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60 z-10"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ministries/HallelConferences.tsx",
                        lineNumber: 13,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 bg-[url('https://images.unsplash.com/photo-1515616227676-603a1c547b3b?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-40",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute inset-0 bg-gradient-to-b from-black via-transparent to-black"
                        }, void 0, false, {
                            fileName: "[project]/src/components/ministries/HallelConferences.tsx",
                            lineNumber: 15,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/ministries/HallelConferences.tsx",
                        lineNumber: 14,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "container mx-auto px-4 z-20 text-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "max-w-4xl mx-auto",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "text-4xl md:text-6xl font-bold mb-4 md:mb-6 text-white",
                                    children: t('hallelConferencesPage.title')
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ministries/HallelConferences.tsx",
                                    lineNumber: 20,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xl md:text-2xl lg:text-3xl mb-6 md:mb-8 text-white",
                                    children: t('hallelConferencesPage.tagline')
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ministries/HallelConferences.tsx",
                                    lineNumber: 21,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-6 md:mt-8 max-w-3xl mx-auto space-y-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-base md:text-lg leading-relaxed text-center text-white",
                                            children: t('hallelConferencesPage.introduction.paragraph1')
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ministries/HallelConferences.tsx",
                                            lineNumber: 25,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-base md:text-lg leading-relaxed text-center text-white",
                                            children: t('hallelConferencesPage.introduction.paragraph2')
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ministries/HallelConferences.tsx",
                                            lineNumber: 28,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/ministries/HallelConferences.tsx",
                                    lineNumber: 24,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ministries/HallelConferences.tsx",
                            lineNumber: 19,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/ministries/HallelConferences.tsx",
                        lineNumber: 18,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent z-10"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ministries/HallelConferences.tsx",
                        lineNumber: 34,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ministries/HallelConferences.tsx",
                lineNumber: 12,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "bg-[#2E2E2E] py-20 px-4 md:px-8 lg:px-16 relative",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-5xl mx-auto",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-3xl md:text-4xl text-center mb-2",
                            children: t('hallelConferencesPage.heartOfHallel.title')
                        }, void 0, false, {
                            fileName: "[project]/src/components/ministries/HallelConferences.tsx",
                            lineNumber: 41,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-24 h-1 rounded-full mx-auto mb-6",
                            style: {
                                backgroundColor: '#FDB813'
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/components/ministries/HallelConferences.tsx",
                            lineNumber: 44,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col md:flex-row items-start gap-8",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "md:w-3/5 order-2 md:order-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "relative pl-6 mb-8 border-l-4 border-[#FDB813]",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xl italic font-light",
                                                children: [
                                                    '"',
                                                    t('hallelConferencesPage.heartOfHallel.quote'),
                                                    '"'
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/ministries/HallelConferences.tsx",
                                                lineNumber: 51,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ministries/HallelConferences.tsx",
                                            lineNumber: 50,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-lg leading-relaxed mb-6",
                                            children: t('hallelConferencesPage.heartOfHallel.paragraph1')
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ministries/HallelConferences.tsx",
                                            lineNumber: 55,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-lg leading-relaxed",
                                            children: t('hallelConferencesPage.heartOfHallel.paragraph2')
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ministries/HallelConferences.tsx",
                                            lineNumber: 58,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/ministries/HallelConferences.tsx",
                                    lineNumber: 49,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "md:w-2/5 w-full order-1 md:order-2",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-full aspect-square overflow-hidden rounded-lg shadow-lg",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$figma$2f$ImageWithFallback$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ImageWithFallback"], {
                                            src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80",
                                            alt: "People worshiping at Hallel Conference",
                                            className: "w-full h-full object-cover"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ministries/HallelConferences.tsx",
                                            lineNumber: 65,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ministries/HallelConferences.tsx",
                                        lineNumber: 64,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ministries/HallelConferences.tsx",
                                    lineNumber: 63,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ministries/HallelConferences.tsx",
                            lineNumber: 47,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ministries/HallelConferences.tsx",
                    lineNumber: 39,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ministries/HallelConferences.tsx",
                lineNumber: 38,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "bg-black py-20 px-4 md:px-8 lg:px-16",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-5xl mx-auto",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-3xl md:text-4xl text-center mb-4 flex items-center justify-center gap-3",
                            children: t('hallelConferencesPage.whatMakesSpecial.title')
                        }, void 0, false, {
                            fileName: "[project]/src/components/ministries/HallelConferences.tsx",
                            lineNumber: 79,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-20 h-1 bg-[#FDB813] mx-auto mb-12"
                        }, void 0, false, {
                            fileName: "[project]/src/components/ministries/HallelConferences.tsx",
                            lineNumber: 82,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid md:grid-cols-3 gap-8",
                            children: t('hallelConferencesPage.whatMakesSpecial.items', {
                                returnObjects: true
                            }).map((item, index)=>{
                                const icons = [
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2d$vocal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mic2$3e$__["Mic2"],
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"],
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"]
                                ];
                                const Icon = icons[index];
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-[#2E2E2E] p-8 rounded-lg",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mb-6 flex justify-center",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "p-4 rounded-full bg-black inline-flex",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                                    className: "w-8 h-8 text-[#FDB813]"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/ministries/HallelConferences.tsx",
                                                    lineNumber: 91,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ministries/HallelConferences.tsx",
                                                lineNumber: 90,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ministries/HallelConferences.tsx",
                                            lineNumber: 89,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-2xl font-semibold mb-4 text-center",
                                            children: item.title
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ministries/HallelConferences.tsx",
                                            lineNumber: 94,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-base leading-relaxed",
                                            children: item.description
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ministries/HallelConferences.tsx",
                                            lineNumber: 95,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, index, true, {
                                    fileName: "[project]/src/components/ministries/HallelConferences.tsx",
                                    lineNumber: 88,
                                    columnNumber: 17
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/src/components/ministries/HallelConferences.tsx",
                            lineNumber: 83,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ministries/HallelConferences.tsx",
                    lineNumber: 78,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ministries/HallelConferences.tsx",
                lineNumber: 77,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "bg-[#2E2E2E] py-20 px-4 md:px-8 lg:px-16 relative",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-5xl mx-auto",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-3xl md:text-4xl text-center mb-4",
                            children: t('hallelConferencesPage.whyMatters.title')
                        }, void 0, false, {
                            fileName: "[project]/src/components/ministries/HallelConferences.tsx",
                            lineNumber: 109,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-20 h-1 bg-[#FDB813] mx-auto mb-12"
                        }, void 0, false, {
                            fileName: "[project]/src/components/ministries/HallelConferences.tsx",
                            lineNumber: 112,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col md:flex-row items-start gap-8",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "md:w-3/5 w-full order-2 md:order-1",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col md:flex-row gap-8 mb-8",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex-1",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-start gap-4 mb-4",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "mt-1",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "p-2 rounded-full bg-[#FDB813] inline-flex",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCcw$3e$__["RefreshCcw"], {
                                                                    className: "w-5 h-5 text-black"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/ministries/HallelConferences.tsx",
                                                                    lineNumber: 123,
                                                                    columnNumber: 25
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/ministries/HallelConferences.tsx",
                                                                lineNumber: 122,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/ministries/HallelConferences.tsx",
                                                            lineNumber: 121,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-lg leading-relaxed",
                                                            children: t('hallelConferencesPage.whyMatters.point1')
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/ministries/HallelConferences.tsx",
                                                            lineNumber: 126,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/ministries/HallelConferences.tsx",
                                                    lineNumber: 120,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ministries/HallelConferences.tsx",
                                                lineNumber: 119,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex-1",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-start gap-4",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "mt-1",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "p-2 rounded-full bg-[#FDB813] inline-flex",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                                                                    className: "w-5 h-5 text-black"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/ministries/HallelConferences.tsx",
                                                                    lineNumber: 135,
                                                                    columnNumber: 25
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/ministries/HallelConferences.tsx",
                                                                lineNumber: 134,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/ministries/HallelConferences.tsx",
                                                            lineNumber: 133,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-lg leading-relaxed",
                                                            children: t('hallelConferencesPage.whyMatters.point2')
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/ministries/HallelConferences.tsx",
                                                            lineNumber: 138,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/ministries/HallelConferences.tsx",
                                                    lineNumber: 132,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ministries/HallelConferences.tsx",
                                                lineNumber: 131,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/ministries/HallelConferences.tsx",
                                        lineNumber: 118,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ministries/HallelConferences.tsx",
                                    lineNumber: 116,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "md:w-2/5 w-full order-1 md:order-2",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-full aspect-square overflow-hidden rounded-lg shadow-lg",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$figma$2f$ImageWithFallback$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ImageWithFallback"], {
                                            src: "https://images.unsplash.com/photo-1522199710521-72d69614c702?auto=format&fit=crop&w=800&q=80",
                                            alt: "Hands lifted in worship",
                                            className: "w-full h-full object-cover"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ministries/HallelConferences.tsx",
                                            lineNumber: 148,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ministries/HallelConferences.tsx",
                                        lineNumber: 147,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ministries/HallelConferences.tsx",
                                    lineNumber: 146,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ministries/HallelConferences.tsx",
                            lineNumber: 114,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-black p-6 rounded-lg mt-12 mb-8",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xl italic",
                                children: [
                                    '"',
                                    t('hallelConferencesPage.whyMatters.quote'),
                                    '"'
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ministries/HallelConferences.tsx",
                                lineNumber: 157,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/ministries/HallelConferences.tsx",
                            lineNumber: 156,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ministries/HallelConferences.tsx",
                    lineNumber: 107,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ministries/HallelConferences.tsx",
                lineNumber: 106,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "bg-black py-20 px-4 md:px-8 lg:px-16",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-5xl mx-auto",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center mb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-3xl md:text-4xl font-normal mb-4",
                                    children: t('hallelConferencesPage.movementOfPraise.title')
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ministries/HallelConferences.tsx",
                                    lineNumber: 169,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-24 h-1 bg-[#FDB813] mx-auto mb-8"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ministries/HallelConferences.tsx",
                                    lineNumber: 170,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ministries/HallelConferences.tsx",
                            lineNumber: 168,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col md:flex-row items-start gap-12",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "md:w-1/2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-lg leading-relaxed mb-6",
                                            children: t('hallelConferencesPage.movementOfPraise.intro')
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ministries/HallelConferences.tsx",
                                            lineNumber: 176,
                                            columnNumber: 15
                                        }, this),
                                        t('hallelConferencesPage.movementOfPraise.bullets', {
                                            returnObjects: true
                                        }).map((bullet, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-3 mb-6",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-2 h-2 rounded-full bg-[#FDB813]"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/ministries/HallelConferences.tsx",
                                                        lineNumber: 182,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-lg",
                                                        children: bullet
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/ministries/HallelConferences.tsx",
                                                        lineNumber: 183,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, index, true, {
                                                fileName: "[project]/src/components/ministries/HallelConferences.tsx",
                                                lineNumber: 181,
                                                columnNumber: 17
                                            }, this))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/ministries/HallelConferences.tsx",
                                    lineNumber: 173,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "md:w-1/2 bg-[#2E2E2E] p-8 rounded-lg",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-center mb-6",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$music$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Music$3e$__["Music"], {
                                                className: "w-12 h-12 text-[#FDB813] mx-auto"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ministries/HallelConferences.tsx",
                                                lineNumber: 190,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ministries/HallelConferences.tsx",
                                            lineNumber: 189,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-lg leading-relaxed italic text-center mb-6",
                                            children: [
                                                '"',
                                                t('hallelConferencesPage.movementOfPraise.quote1'),
                                                '"'
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/ministries/HallelConferences.tsx",
                                            lineNumber: 192,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-lg leading-relaxed text-center",
                                            children: t('hallelConferencesPage.movementOfPraise.quote2')
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ministries/HallelConferences.tsx",
                                            lineNumber: 195,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/ministries/HallelConferences.tsx",
                                    lineNumber: 188,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ministries/HallelConferences.tsx",
                            lineNumber: 172,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ministries/HallelConferences.tsx",
                    lineNumber: 166,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ministries/HallelConferences.tsx",
                lineNumber: 165,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "bg-[#2E2E2E] py-20 px-4 md:px-8 lg:px-16 text-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-4xl mx-auto",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-3xl md:text-4xl mb-4",
                            children: t('hallelConferencesPage.callToAction.title')
                        }, void 0, false, {
                            fileName: "[project]/src/components/ministries/HallelConferences.tsx",
                            lineNumber: 206,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-20 h-1 bg-[#FDB813] mx-auto mb-8"
                        }, void 0, false, {
                            fileName: "[project]/src/components/ministries/HallelConferences.tsx",
                            lineNumber: 207,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 md:grid-cols-3 gap-8 mb-12",
                            children: t('hallelConferencesPage.callToAction.actions', {
                                returnObjects: true
                            }).map((action, index)=>{
                                const icons = [
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"],
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2d$vocal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mic2$3e$__["Mic2"],
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"]
                                ];
                                const Icon = icons[index];
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "inline-flex p-4 rounded-full bg-black mb-4",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                                className: "w-8 h-8 text-[#FDB813]"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ministries/HallelConferences.tsx",
                                                lineNumber: 216,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ministries/HallelConferences.tsx",
                                            lineNumber: 215,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-lg",
                                            children: action
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ministries/HallelConferences.tsx",
                                            lineNumber: 218,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, index, true, {
                                    fileName: "[project]/src/components/ministries/HallelConferences.tsx",
                                    lineNumber: 214,
                                    columnNumber: 17
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/src/components/ministries/HallelConferences.tsx",
                            lineNumber: 209,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xl leading-relaxed mb-6 max-w-2xl mx-auto",
                            children: t('hallelConferencesPage.callToAction.paragraph1')
                        }, void 0, false, {
                            fileName: "[project]/src/components/ministries/HallelConferences.tsx",
                            lineNumber: 224,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xl leading-relaxed mb-10 max-w-2xl mx-auto",
                            children: t('hallelConferencesPage.callToAction.paragraph2')
                        }, void 0, false, {
                            fileName: "[project]/src/components/ministries/HallelConferences.tsx",
                            lineNumber: 228,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                            href: "#",
                            role: "button",
                            className: "bg-[#FDB813] text-black font-semibold py-4 px-10 rounded-md hover:bg-opacity-90 transition-colors text-lg inline-flex items-center gap-2 mx-auto cursor-pointer",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                    className: "w-5 h-5"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ministries/HallelConferences.tsx",
                                    lineNumber: 237,
                                    columnNumber: 13
                                }, this),
                                t('hallelConferencesPage.callToAction.button')
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ministries/HallelConferences.tsx",
                            lineNumber: 232,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ministries/HallelConferences.tsx",
                    lineNumber: 205,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ministries/HallelConferences.tsx",
                lineNumber: 204,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ministries/HallelConferences.tsx",
        lineNumber: 10,
        columnNumber: 5
    }, this);
}
_s(HallelConferences, "zlIdU9EjM2llFt74AbE2KsUJXyM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"]
    ];
});
_c = HallelConferences;
var _c;
__turbopack_context__.k.register(_c, "HallelConferences");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ministries/HallelWorshipDay.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HallelWorshipDay",
    ()=>HallelWorshipDay
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/react-i18next/dist/es/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-i18next/dist/es/useTranslation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
function HallelWorshipDay() {
    _s();
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"])('ministries');
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "font-sans text-white bg-black",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "relative h-[80vh] flex items-start justify-center overflow-hidden pt-4 md:pt-16",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60 z-10"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ministries/HallelWorshipDay.tsx",
                        lineNumber: 12,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 bg-[url('https://images.unsplash.com/photo-1712844470225-94cbb5bd7dc8?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-40",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute inset-0 bg-gradient-to-b from-black via-transparent to-black"
                        }, void 0, false, {
                            fileName: "[project]/src/components/ministries/HallelWorshipDay.tsx",
                            lineNumber: 14,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/ministries/HallelWorshipDay.tsx",
                        lineNumber: 13,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "container mx-auto px-4 z-20 text-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "max-w-4xl mx-auto",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "text-4xl md:text-6xl font-bold mb-3 md:mb-4 text-white",
                                    children: t('hallelWorshipDayPage.title')
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ministries/HallelWorshipDay.tsx",
                                    lineNumber: 19,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xl md:text-2xl lg:text-3xl mb-6 md:mb-8 text-white",
                                    children: t('hallelWorshipDayPage.tagline')
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ministries/HallelWorshipDay.tsx",
                                    lineNumber: 20,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-6 md:mt-8 max-w-3xl mx-auto space-y-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-base md:text-lg leading-relaxed text-center text-white",
                                            children: [
                                                t('hallelWorshipDayPage.about.paragraph1').split(t('hallelWorshipDayPage.about.highlight1'))[0],
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-semibold underline decoration-[#FDB813] decoration-4 underline-offset-4",
                                                    children: t('hallelWorshipDayPage.about.highlight1')
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/ministries/HallelWorshipDay.tsx",
                                                    lineNumber: 24,
                                                    columnNumber: 17
                                                }, this),
                                                t('hallelWorshipDayPage.about.paragraph1').split(t('hallelWorshipDayPage.about.highlight1'))[1].split(t('hallelWorshipDayPage.about.highlight2'))[0],
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-semibold underline decoration-[#FDB813] decoration-4 underline-offset-4",
                                                    children: t('hallelWorshipDayPage.about.highlight2')
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/ministries/HallelWorshipDay.tsx",
                                                    lineNumber: 28,
                                                    columnNumber: 17
                                                }, this),
                                                t('hallelWorshipDayPage.about.paragraph1').split(t('hallelWorshipDayPage.about.highlight2'))[1]
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/ministries/HallelWorshipDay.tsx",
                                            lineNumber: 22,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-base md:text-lg leading-relaxed text-center text-white",
                                            children: [
                                                t('hallelWorshipDayPage.about.paragraph2').split(t('hallelWorshipDayPage.about.highlight3'))[0],
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-semibold underline decoration-[#FDB813] decoration-4 underline-offset-4",
                                                    children: t('hallelWorshipDayPage.about.highlight3')
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/ministries/HallelWorshipDay.tsx",
                                                    lineNumber: 35,
                                                    columnNumber: 17
                                                }, this),
                                                t('hallelWorshipDayPage.about.paragraph2').split(t('hallelWorshipDayPage.about.highlight3'))[1]
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/ministries/HallelWorshipDay.tsx",
                                            lineNumber: 33,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/ministries/HallelWorshipDay.tsx",
                                    lineNumber: 21,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ministries/HallelWorshipDay.tsx",
                            lineNumber: 18,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/ministries/HallelWorshipDay.tsx",
                        lineNumber: 17,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ministries/HallelWorshipDay.tsx",
                lineNumber: 11,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "bg-[#2E2E2E] py-16 px-4 md:px-8",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-6xl mx-auto",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col md:flex-row-reverse items-center gap-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "md:w-1/3 flex justify-center",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-32 h-32 md:w-48 md:h-48 rounded-full bg-black flex items-center justify-center",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        xmlns: "http://www.w3.org/2000/svg",
                                        className: "w-16 h-16 md:w-24 md:h-24 text-[#FDB813]",
                                        fill: "none",
                                        viewBox: "0 0 24 24",
                                        stroke: "currentColor",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            strokeWidth: 2,
                                            d: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ministries/HallelWorshipDay.tsx",
                                            lineNumber: 52,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ministries/HallelWorshipDay.tsx",
                                        lineNumber: 51,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ministries/HallelWorshipDay.tsx",
                                    lineNumber: 50,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/ministries/HallelWorshipDay.tsx",
                                lineNumber: 49,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "md:w-2/3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-3xl mb-2",
                                        children: t('hallelWorshipDayPage.vision.title')
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ministries/HallelWorshipDay.tsx",
                                        lineNumber: 57,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-24 h-1 rounded-full mb-6",
                                        style: {
                                            backgroundColor: '#FDB813'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ministries/HallelWorshipDay.tsx",
                                        lineNumber: 60,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mb-4",
                                        children: [
                                            t('hallelWorshipDayPage.vision.paragraph1').split(t('hallelWorshipDayPage.vision.highlight1'))[0],
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-semibold underline decoration-[#FDB813] decoration-4 underline-offset-4",
                                                children: t('hallelWorshipDayPage.vision.highlight1')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ministries/HallelWorshipDay.tsx",
                                                lineNumber: 63,
                                                columnNumber: 17
                                            }, this),
                                            t('hallelWorshipDayPage.vision.paragraph1').split(t('hallelWorshipDayPage.vision.highlight1'))[1]
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/ministries/HallelWorshipDay.tsx",
                                        lineNumber: 61,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mb-4",
                                        children: t('hallelWorshipDayPage.vision.paragraph2')
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ministries/HallelWorshipDay.tsx",
                                        lineNumber: 68,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("blockquote", {
                                        className: "border-l-4 border-[#FDB813] pl-4 italic my-6",
                                        children: t('hallelWorshipDayPage.vision.verse')
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ministries/HallelWorshipDay.tsx",
                                        lineNumber: 71,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: t('hallelWorshipDayPage.vision.paragraph3')
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ministries/HallelWorshipDay.tsx",
                                        lineNumber: 74,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ministries/HallelWorshipDay.tsx",
                                lineNumber: 56,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ministries/HallelWorshipDay.tsx",
                        lineNumber: 48,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/ministries/HallelWorshipDay.tsx",
                    lineNumber: 47,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ministries/HallelWorshipDay.tsx",
                lineNumber: 46,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "bg-black py-16 px-4 md:px-8",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-6xl mx-auto",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col md:flex-row items-center gap-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "md:w-1/3 flex justify-center",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-32 h-32 md:w-48 md:h-48 rounded-full bg-[#2E2E2E] flex items-center justify-center",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        xmlns: "http://www.w3.org/2000/svg",
                                        className: "w-16 h-16 md:w-24 md:h-24 text-[#FDB813]",
                                        fill: "none",
                                        viewBox: "0 0 24 24",
                                        stroke: "currentColor",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            strokeWidth: 2,
                                            d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ministries/HallelWorshipDay.tsx",
                                            lineNumber: 89,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ministries/HallelWorshipDay.tsx",
                                        lineNumber: 88,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ministries/HallelWorshipDay.tsx",
                                    lineNumber: 87,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/ministries/HallelWorshipDay.tsx",
                                lineNumber: 86,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "md:w-2/3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-3xl mb-2",
                                        children: t('hallelWorshipDayPage.unceasingPraise.title')
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ministries/HallelWorshipDay.tsx",
                                        lineNumber: 94,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-24 h-1 rounded-full mb-6",
                                        style: {
                                            backgroundColor: '#FDB813'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ministries/HallelWorshipDay.tsx",
                                        lineNumber: 97,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mb-4",
                                        children: [
                                            t('hallelWorshipDayPage.unceasingPraise.paragraph1').split(t('hallelWorshipDayPage.unceasingPraise.highlight1'))[0],
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-semibold underline decoration-[#FDB813] decoration-4 underline-offset-4",
                                                children: t('hallelWorshipDayPage.unceasingPraise.highlight1')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ministries/HallelWorshipDay.tsx",
                                                lineNumber: 100,
                                                columnNumber: 17
                                            }, this),
                                            t('hallelWorshipDayPage.unceasingPraise.paragraph1').split(t('hallelWorshipDayPage.unceasingPraise.highlight1'))[1]
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/ministries/HallelWorshipDay.tsx",
                                        lineNumber: 98,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mb-4",
                                        children: t('hallelWorshipDayPage.unceasingPraise.paragraph2')
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ministries/HallelWorshipDay.tsx",
                                        lineNumber: 105,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: t('hallelWorshipDayPage.unceasingPraise.paragraph3')
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ministries/HallelWorshipDay.tsx",
                                        lineNumber: 108,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ministries/HallelWorshipDay.tsx",
                                lineNumber: 93,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ministries/HallelWorshipDay.tsx",
                        lineNumber: 85,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/ministries/HallelWorshipDay.tsx",
                    lineNumber: 84,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ministries/HallelWorshipDay.tsx",
                lineNumber: 83,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "bg-[#2E2E2E] py-16 px-4 md:px-8",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-6xl mx-auto",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col md:flex-row-reverse items-center gap-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "md:w-1/3 flex justify-center",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-32 h-32 md:w-48 md:h-48 rounded-full bg-black flex items-center justify-center",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        xmlns: "http://www.w3.org/2000/svg",
                                        className: "w-16 h-16 md:w-24 md:h-24 text-[#FDB813]",
                                        fill: "none",
                                        viewBox: "0 0 24 24",
                                        stroke: "currentColor",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            strokeWidth: 2,
                                            d: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ministries/HallelWorshipDay.tsx",
                                            lineNumber: 123,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ministries/HallelWorshipDay.tsx",
                                        lineNumber: 122,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ministries/HallelWorshipDay.tsx",
                                    lineNumber: 121,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/ministries/HallelWorshipDay.tsx",
                                lineNumber: 120,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "md:w-2/3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-3xl mb-2",
                                        children: t('hallelWorshipDayPage.movement.title')
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ministries/HallelWorshipDay.tsx",
                                        lineNumber: 128,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-24 h-1 rounded-full mb-6",
                                        style: {
                                            backgroundColor: '#FDB813'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ministries/HallelWorshipDay.tsx",
                                        lineNumber: 131,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mb-4",
                                        children: [
                                            t('hallelWorshipDayPage.movement.paragraph1').split(t('hallelWorshipDayPage.movement.highlight1'))[0],
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-semibold underline decoration-[#FDB813] decoration-4 underline-offset-4",
                                                children: t('hallelWorshipDayPage.movement.highlight1')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ministries/HallelWorshipDay.tsx",
                                                lineNumber: 134,
                                                columnNumber: 17
                                            }, this),
                                            t('hallelWorshipDayPage.movement.paragraph1').split(t('hallelWorshipDayPage.movement.highlight1'))[1]
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/ministries/HallelWorshipDay.tsx",
                                        lineNumber: 132,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: t('hallelWorshipDayPage.movement.paragraph2')
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ministries/HallelWorshipDay.tsx",
                                        lineNumber: 139,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ministries/HallelWorshipDay.tsx",
                                lineNumber: 127,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ministries/HallelWorshipDay.tsx",
                        lineNumber: 119,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/ministries/HallelWorshipDay.tsx",
                    lineNumber: 118,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ministries/HallelWorshipDay.tsx",
                lineNumber: 117,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "bg-black py-16 px-4 md:px-8",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-6xl mx-auto text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-3xl mb-2",
                            children: t('hallelWorshipDayPage.joinMovement.title')
                        }, void 0, false, {
                            fileName: "[project]/src/components/ministries/HallelWorshipDay.tsx",
                            lineNumber: 150,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-24 h-1 rounded-full mx-auto mb-6",
                            style: {
                                backgroundColor: '#FDB813'
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/components/ministries/HallelWorshipDay.tsx",
                            lineNumber: 153,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mb-8 max-w-3xl mx-auto",
                            children: t('hallelWorshipDayPage.joinMovement.intro')
                        }, void 0, false, {
                            fileName: "[project]/src/components/ministries/HallelWorshipDay.tsx",
                            lineNumber: 154,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                            href: "https://www.facebook.com/p/Augustine-Dandingi-Official-100063698651483/",
                            target: "_blank",
                            rel: "noopener noreferrer",
                            className: "inline-flex items-center bg-[#FDB813] hover:bg-opacity-80 text-black font-semibold py-3 px-8 rounded-md transition duration-300 transform hover:scale-105 cursor-pointer",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    xmlns: "http://www.w3.org/2000/svg",
                                    className: "h-5 w-5 mr-2",
                                    fill: "currentColor",
                                    viewBox: "0 0 24 24",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ministries/HallelWorshipDay.tsx",
                                        lineNumber: 164,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ministries/HallelWorshipDay.tsx",
                                    lineNumber: 163,
                                    columnNumber: 13
                                }, this),
                                t('hallelWorshipDayPage.joinMovement.facebookLink')
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ministries/HallelWorshipDay.tsx",
                            lineNumber: 157,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-8 max-w-3xl mx-auto",
                            children: t('hallelWorshipDayPage.joinMovement.paragraph1')
                        }, void 0, false, {
                            fileName: "[project]/src/components/ministries/HallelWorshipDay.tsx",
                            lineNumber: 168,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-4 max-w-3xl mx-auto",
                            children: [
                                t('hallelWorshipDayPage.joinMovement.paragraph2').split(t('hallelWorshipDayPage.joinMovement.highlight1'))[0],
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-semibold underline decoration-[#FDB813] decoration-4 underline-offset-4",
                                    children: t('hallelWorshipDayPage.joinMovement.highlight1')
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ministries/HallelWorshipDay.tsx",
                                    lineNumber: 173,
                                    columnNumber: 13
                                }, this),
                                t('hallelWorshipDayPage.joinMovement.paragraph2').split(t('hallelWorshipDayPage.joinMovement.highlight1'))[1]
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ministries/HallelWorshipDay.tsx",
                            lineNumber: 171,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ministries/HallelWorshipDay.tsx",
                    lineNumber: 149,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ministries/HallelWorshipDay.tsx",
                lineNumber: 148,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "bg-[#2E2E2E] py-16 px-4 md:px-8",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-6xl mx-auto",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col md:flex-row items-center gap-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "md:w-1/3 flex justify-center",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-32 h-32 md:w-48 md:h-48 rounded-full bg-black flex items-center justify-center",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        xmlns: "http://www.w3.org/2000/svg",
                                        className: "w-16 h-16 md:w-24 md:h-24 text-[#FDB813]",
                                        fill: "none",
                                        viewBox: "0 0 24 24",
                                        stroke: "currentColor",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            strokeWidth: 2,
                                            d: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ministries/HallelWorshipDay.tsx",
                                            lineNumber: 188,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ministries/HallelWorshipDay.tsx",
                                        lineNumber: 187,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ministries/HallelWorshipDay.tsx",
                                    lineNumber: 186,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/ministries/HallelWorshipDay.tsx",
                                lineNumber: 185,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "md:w-2/3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-3xl mb-2",
                                        children: t('hallelWorshipDayPage.callTo247.title')
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ministries/HallelWorshipDay.tsx",
                                        lineNumber: 193,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-24 h-1 rounded-full mb-6",
                                        style: {
                                            backgroundColor: '#FDB813'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ministries/HallelWorshipDay.tsx",
                                        lineNumber: 196,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mb-4",
                                        children: t('hallelWorshipDayPage.callTo247.paragraph1')
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ministries/HallelWorshipDay.tsx",
                                        lineNumber: 197,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mb-4",
                                        children: t('hallelWorshipDayPage.callTo247.paragraph2')
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ministries/HallelWorshipDay.tsx",
                                        lineNumber: 200,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ministries/HallelWorshipDay.tsx",
                                lineNumber: 192,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ministries/HallelWorshipDay.tsx",
                        lineNumber: 184,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/ministries/HallelWorshipDay.tsx",
                    lineNumber: 183,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ministries/HallelWorshipDay.tsx",
                lineNumber: 182,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "bg-black py-16 px-4 md:px-8",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-6xl mx-auto text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-3xl mb-2",
                            children: t('hallelWorshipDayPage.finalCall.title')
                        }, void 0, false, {
                            fileName: "[project]/src/components/ministries/HallelWorshipDay.tsx",
                            lineNumber: 211,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-24 h-1 rounded-full mx-auto mb-6",
                            style: {
                                backgroundColor: '#FDB813'
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/components/ministries/HallelWorshipDay.tsx",
                            lineNumber: 214,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mb-8 max-w-3xl mx-auto",
                            children: t('hallelWorshipDayPage.finalCall.paragraph1')
                        }, void 0, false, {
                            fileName: "[project]/src/components/ministries/HallelWorshipDay.tsx",
                            lineNumber: 215,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mb-8 max-w-3xl mx-auto",
                            children: [
                                t('hallelWorshipDayPage.finalCall.paragraph2').split(t('hallelWorshipDayPage.finalCall.highlight1'))[0],
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-semibold underline decoration-[#FDB813] decoration-4 underline-offset-4",
                                    children: t('hallelWorshipDayPage.finalCall.highlight1')
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ministries/HallelWorshipDay.tsx",
                                    lineNumber: 220,
                                    columnNumber: 13
                                }, this),
                                t('hallelWorshipDayPage.finalCall.paragraph2').split(t('hallelWorshipDayPage.finalCall.highlight1'))[1]
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ministries/HallelWorshipDay.tsx",
                            lineNumber: 218,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("blockquote", {
                            className: "border-l-4 border-[#FDB813] pl-1 italic mb-8 max-w-3xl mx-auto",
                            children: t('hallelWorshipDayPage.finalCall.quote1')
                        }, void 0, false, {
                            fileName: "[project]/src/components/ministries/HallelWorshipDay.tsx",
                            lineNumber: 225,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("blockquote", {
                            className: "text-xl italic max-w-3xl mx-auto",
                            children: t('hallelWorshipDayPage.finalCall.verse')
                        }, void 0, false, {
                            fileName: "[project]/src/components/ministries/HallelWorshipDay.tsx",
                            lineNumber: 228,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "mt-10 bg-[#FDB813] hover:bg-opacity-80 text-black font-semibold py-3 px-8 rounded-md transition duration-300 transform hover:scale-105 cursor-pointer",
                            children: t('hallelWorshipDayPage.finalCall.button')
                        }, void 0, false, {
                            fileName: "[project]/src/components/ministries/HallelWorshipDay.tsx",
                            lineNumber: 231,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ministries/HallelWorshipDay.tsx",
                    lineNumber: 210,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ministries/HallelWorshipDay.tsx",
                lineNumber: 209,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ministries/HallelWorshipDay.tsx",
        lineNumber: 9,
        columnNumber: 5
    }, this);
}
_s(HallelWorshipDay, "zlIdU9EjM2llFt74AbE2KsUJXyM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"]
    ];
});
_c = HallelWorshipDay;
var _c;
__turbopack_context__.k.register(_c, "HallelWorshipDay");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ministries/HallelBibleCollege.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HallelBibleCollege",
    ()=>HallelBibleCollege
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$figma$2f$ImageWithFallback$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/figma/ImageWithFallback.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/react-i18next/dist/es/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-i18next/dist/es/useTranslation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
function HallelBibleCollege() {
    _s();
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"])('ministries');
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "font-sans text-white bg-black",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "relative h-[80vh] flex items-start justify-center overflow-hidden pt-4 md:pt-16",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60 z-10"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ministries/HallelBibleCollege.tsx",
                        lineNumber: 12,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504052434569-70ad5836ab65?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80')] bg-cover bg-center opacity-40",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute inset-0 bg-gradient-to-b from-black via-transparent to-black"
                        }, void 0, false, {
                            fileName: "[project]/src/components/ministries/HallelBibleCollege.tsx",
                            lineNumber: 14,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/ministries/HallelBibleCollege.tsx",
                        lineNumber: 13,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "container mx-auto px-6 md:px-12 lg:px-16 z-20 text-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "max-w-4xl mx-auto",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "text-4xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4 text-white",
                                    children: t('hallelBibleCollegePage.title')
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ministries/HallelBibleCollege.tsx",
                                    lineNumber: 19,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xl md:text-2xl lg:text-3xl mb-6 md:mb-8 text-white",
                                    children: t('hallelBibleCollegePage.tagline')
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ministries/HallelBibleCollege.tsx",
                                    lineNumber: 20,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-center max-w-2xl mx-auto space-y-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-base md:text-lg text-white",
                                            children: t('hallelBibleCollegePage.about.paragraph1')
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ministries/HallelBibleCollege.tsx",
                                            lineNumber: 22,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-base md:text-lg text-white",
                                            children: t('hallelBibleCollegePage.about.paragraph2')
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ministries/HallelBibleCollege.tsx",
                                            lineNumber: 25,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/ministries/HallelBibleCollege.tsx",
                                    lineNumber: 21,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ministries/HallelBibleCollege.tsx",
                            lineNumber: 18,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/ministries/HallelBibleCollege.tsx",
                        lineNumber: 17,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ministries/HallelBibleCollege.tsx",
                lineNumber: 11,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "bg-[#2E2E2E] py-16 px-4 md:px-8 lg:px-16",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-6xl mx-auto",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid md:grid-cols-2 gap-12",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-black bg-opacity-50 p-8 rounded-lg",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center mb-6",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-3xl font-normal",
                                            children: t('hallelBibleCollegePage.vision.title')
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ministries/HallelBibleCollege.tsx",
                                            lineNumber: 39,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ministries/HallelBibleCollege.tsx",
                                        lineNumber: 38,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mb-4",
                                        children: t('hallelBibleCollegePage.vision.paragraph1')
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ministries/HallelBibleCollege.tsx",
                                        lineNumber: 41,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: t('hallelBibleCollegePage.vision.paragraph2')
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ministries/HallelBibleCollege.tsx",
                                        lineNumber: 44,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ministries/HallelBibleCollege.tsx",
                                lineNumber: 37,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-black bg-opacity-50 p-8 rounded-lg",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center mb-6",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-3xl font-normal",
                                            children: t('hallelBibleCollegePage.mission.title')
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ministries/HallelBibleCollege.tsx",
                                            lineNumber: 50,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ministries/HallelBibleCollege.tsx",
                                        lineNumber: 49,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        className: "space-y-3",
                                        children: t('hallelBibleCollegePage.mission.points', {
                                            returnObjects: true
                                        }).map((point, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                className: "flex items-start",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                        xmlns: "http://www.w3.org/2000/svg",
                                                        className: "h-6 w-6 text-[#FDB813] mr-2 mt-1 flex-shrink-0",
                                                        fill: "none",
                                                        viewBox: "0 0 24 24",
                                                        stroke: "currentColor",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                            strokeLinecap: "round",
                                                            strokeLinejoin: "round",
                                                            strokeWidth: 2,
                                                            d: "M5 13l4 4L19 7"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/ministries/HallelBibleCollege.tsx",
                                                            lineNumber: 56,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/ministries/HallelBibleCollege.tsx",
                                                        lineNumber: 55,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: point
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/ministries/HallelBibleCollege.tsx",
                                                        lineNumber: 58,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, index, true, {
                                                fileName: "[project]/src/components/ministries/HallelBibleCollege.tsx",
                                                lineNumber: 54,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ministries/HallelBibleCollege.tsx",
                                        lineNumber: 52,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ministries/HallelBibleCollege.tsx",
                                lineNumber: 48,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ministries/HallelBibleCollege.tsx",
                        lineNumber: 36,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/ministries/HallelBibleCollege.tsx",
                    lineNumber: 35,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ministries/HallelBibleCollege.tsx",
                lineNumber: 34,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "bg-black py-16 px-4 md:px-8 lg:px-16",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-6xl mx-auto",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-3xl md:text-4xl mb-2 text-center",
                            children: t('hallelBibleCollegePage.unique.title')
                        }, void 0, false, {
                            fileName: "[project]/src/components/ministries/HallelBibleCollege.tsx",
                            lineNumber: 70,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-24 h-1 rounded-full mx-auto mb-6",
                            style: {
                                backgroundColor: '#FDB813'
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/components/ministries/HallelBibleCollege.tsx",
                            lineNumber: 71,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid md:grid-cols-2 lg:grid-cols-3 gap-8",
                            children: t('hallelBibleCollegePage.unique.items', {
                                returnObjects: true
                            }).map((item, index)=>{
                                const icons = [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: 2,
                                        d: "M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                                    }, "1", false, {
                                        fileName: "[project]/src/components/ministries/HallelBibleCollege.tsx",
                                        lineNumber: 75,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: 2,
                                        d: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                    }, "2", false, {
                                        fileName: "[project]/src/components/ministries/HallelBibleCollege.tsx",
                                        lineNumber: 76,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: 2,
                                        d: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                                    }, "3", false, {
                                        fileName: "[project]/src/components/ministries/HallelBibleCollege.tsx",
                                        lineNumber: 77,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: 2,
                                        d: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                    }, "4", false, {
                                        fileName: "[project]/src/components/ministries/HallelBibleCollege.tsx",
                                        lineNumber: 78,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: 2,
                                        d: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h.5A2.5 2.5 0 0020 5.5v-.565M8 3.935l-6 1.5V17.5A2.5 2.5 0 004.5 20h11a2.5 2.5 0 002.5-2.5V5.435l-6-1.5z"
                                    }, "5", false, {
                                        fileName: "[project]/src/components/ministries/HallelBibleCollege.tsx",
                                        lineNumber: 79,
                                        columnNumber: 17
                                    }, this)
                                ];
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-[#2E2E2E] p-6 rounded-lg hover:transform hover:scale-105 transition-transform",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-center mb-4",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                xmlns: "http://www.w3.org/2000/svg",
                                                className: "h-16 w-16 text-[#FDB813]",
                                                fill: "none",
                                                viewBox: "0 0 24 24",
                                                stroke: "currentColor",
                                                children: icons[index]
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ministries/HallelBibleCollege.tsx",
                                                lineNumber: 84,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ministries/HallelBibleCollege.tsx",
                                            lineNumber: 83,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-xl font-bold mb-3 text-center",
                                            children: item.title
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ministries/HallelBibleCollege.tsx",
                                            lineNumber: 88,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-center",
                                            children: item.description
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ministries/HallelBibleCollege.tsx",
                                            lineNumber: 89,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, index, true, {
                                    fileName: "[project]/src/components/ministries/HallelBibleCollege.tsx",
                                    lineNumber: 82,
                                    columnNumber: 17
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/src/components/ministries/HallelBibleCollege.tsx",
                            lineNumber: 72,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ministries/HallelBibleCollege.tsx",
                    lineNumber: 69,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ministries/HallelBibleCollege.tsx",
                lineNumber: 68,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "bg-[#2E2E2E] py-16 px-4 md:px-8 lg:px-16",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-6xl mx-auto",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-3xl md:text-4xl mb-2 text-center",
                            children: t('hallelBibleCollegePage.programs.title')
                        }, void 0, false, {
                            fileName: "[project]/src/components/ministries/HallelBibleCollege.tsx",
                            lineNumber: 102,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-24 h-1 rounded-full mx-auto mb-6",
                            style: {
                                backgroundColor: '#FDB813'
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/components/ministries/HallelBibleCollege.tsx",
                            lineNumber: 103,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid md:grid-cols-2 gap-8",
                            children: t('hallelBibleCollegePage.programs.list', {
                                returnObjects: true
                            }).map((program, index)=>{
                                const icons = [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                d: "M12 14l9-5-9-5-9 5 9 5z"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ministries/HallelBibleCollege.tsx",
                                                lineNumber: 108,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                d: "M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ministries/HallelBibleCollege.tsx",
                                                lineNumber: 109,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                strokeWidth: 2,
                                                d: "M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ministries/HallelBibleCollege.tsx",
                                                lineNumber: 110,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: 2,
                                        d: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ministries/HallelBibleCollege.tsx",
                                        lineNumber: 112,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: 2,
                                        d: "M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ministries/HallelBibleCollege.tsx",
                                        lineNumber: 113,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: 2,
                                        d: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h.5A2.5 2.5 0 0020 5.5v-.565M8 3.935l-6 1.5V17.5A2.5 2.5 0 004.5 20h11a2.5 2.5 0 002.5-2.5V5.435l-6-1.5z"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ministries/HallelBibleCollege.tsx",
                                        lineNumber: 114,
                                        columnNumber: 17
                                    }, this)
                                ];
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-black p-6 rounded-lg cursor-pointer hover:bg-opacity-80 transition-all",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center mb-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                    xmlns: "http://www.w3.org/2000/svg",
                                                    className: "h-10 w-10 text-[#FDB813] mr-4",
                                                    fill: "none",
                                                    viewBox: "0 0 24 24",
                                                    stroke: "currentColor",
                                                    children: icons[index]
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/ministries/HallelBibleCollege.tsx",
                                                    lineNumber: 119,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-xl font-bold",
                                                    children: program.title
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/ministries/HallelBibleCollege.tsx",
                                                    lineNumber: 122,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/ministries/HallelBibleCollege.tsx",
                                            lineNumber: 118,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            children: program.description
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ministries/HallelBibleCollege.tsx",
                                            lineNumber: 124,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, index, true, {
                                    fileName: "[project]/src/components/ministries/HallelBibleCollege.tsx",
                                    lineNumber: 117,
                                    columnNumber: 17
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/src/components/ministries/HallelBibleCollege.tsx",
                            lineNumber: 104,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-8 text-center",
                            children: t('hallelBibleCollegePage.programs.closing')
                        }, void 0, false, {
                            fileName: "[project]/src/components/ministries/HallelBibleCollege.tsx",
                            lineNumber: 129,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ministries/HallelBibleCollege.tsx",
                    lineNumber: 101,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ministries/HallelBibleCollege.tsx",
                lineNumber: 100,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "bg-black py-16 px-4 md:px-8 lg:px-16",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-6xl mx-auto",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-3xl md:text-4xl mb-2 text-center",
                            children: t('hallelBibleCollegePage.lifeAtHallel.title')
                        }, void 0, false, {
                            fileName: "[project]/src/components/ministries/HallelBibleCollege.tsx",
                            lineNumber: 138,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-24 h-1 rounded-full mx-auto mb-6",
                            style: {
                                backgroundColor: '#FDB813'
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/components/ministries/HallelBibleCollege.tsx",
                            lineNumber: 139,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col md:flex-row gap-8 items-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "md:w-1/2",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$figma$2f$ImageWithFallback$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ImageWithFallback"], {
                                        src: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
                                        alt: "Life at Hallel Bible College",
                                        className: "w-full h-64 md:h-96 object-cover rounded-lg"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ministries/HallelBibleCollege.tsx",
                                        lineNumber: 142,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ministries/HallelBibleCollege.tsx",
                                    lineNumber: 141,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "md:w-1/2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mb-4",
                                            children: t('hallelBibleCollegePage.lifeAtHallel.paragraph1')
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ministries/HallelBibleCollege.tsx",
                                            lineNumber: 149,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mb-4",
                                            children: t('hallelBibleCollegePage.lifeAtHallel.paragraph2')
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ministries/HallelBibleCollege.tsx",
                                            lineNumber: 152,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-2xl font-bold mt-6 mb-4",
                                            children: t('hallelBibleCollegePage.lifeAtHallel.differenceTitle')
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ministries/HallelBibleCollege.tsx",
                                            lineNumber: 155,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mb-4",
                                            children: t('hallelBibleCollegePage.lifeAtHallel.difference')
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ministries/HallelBibleCollege.tsx",
                                            lineNumber: 156,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("blockquote", {
                                            className: "border-l-4 border-[#FDB813] pl-4 italic my-6",
                                            children: t('hallelBibleCollegePage.lifeAtHallel.verse')
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ministries/HallelBibleCollege.tsx",
                                            lineNumber: 159,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/ministries/HallelBibleCollege.tsx",
                                    lineNumber: 148,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ministries/HallelBibleCollege.tsx",
                            lineNumber: 140,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ministries/HallelBibleCollege.tsx",
                    lineNumber: 137,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ministries/HallelBibleCollege.tsx",
                lineNumber: 136,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "bg-[#2E2E2E] py-16 px-4 md:px-8 lg:px-16 text-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-4xl mx-auto",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-3xl md:text-4xl mb-2",
                            children: t('hallelBibleCollegePage.callToAction.title')
                        }, void 0, false, {
                            fileName: "[project]/src/components/ministries/HallelBibleCollege.tsx",
                            lineNumber: 170,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-24 h-1 rounded-full mx-auto mb-6",
                            style: {
                                backgroundColor: '#FDB813'
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/components/ministries/HallelBibleCollege.tsx",
                            lineNumber: 171,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mb-8 text-lg",
                            children: t('hallelBibleCollegePage.callToAction.paragraph1')
                        }, void 0, false, {
                            fileName: "[project]/src/components/ministries/HallelBibleCollege.tsx",
                            lineNumber: 172,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mb-8 text-lg",
                            children: t('hallelBibleCollegePage.callToAction.paragraph2')
                        }, void 0, false, {
                            fileName: "[project]/src/components/ministries/HallelBibleCollege.tsx",
                            lineNumber: 175,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mb-8 text-lg font-semibold",
                            children: t('hallelBibleCollegePage.callToAction.paragraph3')
                        }, void 0, false, {
                            fileName: "[project]/src/components/ministries/HallelBibleCollege.tsx",
                            lineNumber: 178,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mb-12 text-lg",
                            children: t('hallelBibleCollegePage.callToAction.paragraph4')
                        }, void 0, false, {
                            fileName: "[project]/src/components/ministries/HallelBibleCollege.tsx",
                            lineNumber: 181,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "bg-[#FDB813] text-black px-8 py-4 rounded-md font-semibold text-lg hover:bg-opacity-80 transition-all duration-300 cursor-pointer hover:scale-105",
                            children: t('hallelBibleCollegePage.callToAction.button')
                        }, void 0, false, {
                            fileName: "[project]/src/components/ministries/HallelBibleCollege.tsx",
                            lineNumber: 184,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ministries/HallelBibleCollege.tsx",
                    lineNumber: 169,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ministries/HallelBibleCollege.tsx",
                lineNumber: 168,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ministries/HallelBibleCollege.tsx",
        lineNumber: 9,
        columnNumber: 5
    }, this);
}
_s(HallelBibleCollege, "zlIdU9EjM2llFt74AbE2KsUJXyM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"]
    ];
});
_c = HallelBibleCollege;
var _c;
__turbopack_context__.k.register(_c, "HallelBibleCollege");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ministries/HMSSummerTraining.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HMSSummerTraining",
    ()=>HMSSummerTraining
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/react-i18next/dist/es/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-i18next/dist/es/useTranslation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
function HMSSummerTraining() {
    _s();
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"])('ministries');
    const scrollToSection = (sectionId)=>{
        const section = document.getElementById(sectionId);
        if (section) {
            const headerOffset = 100; // Adjust based on your header height
            const elementPosition = section.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-black text-white min-h-screen font-sans",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                id: "home",
                className: "relative h-[80vh] flex items-start justify-center overflow-hidden pt-4 md:pt-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60 z-10"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                        lineNumber: 25,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-top opacity-30",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute inset-0 bg-gradient-to-b from-black via-transparent to-black"
                        }, void 0, false, {
                            fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                            lineNumber: 27,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                        lineNumber: 26,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "container mx-auto px-4 z-20 text-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: {
                                opacity: 0,
                                y: 20
                            },
                            animate: {
                                opacity: 1,
                                y: 0
                            },
                            transition: {
                                duration: 0.8
                            },
                            className: "max-w-4xl mx-auto",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "text-4xl md:text-6xl font-bold mb-3 md:mb-4",
                                    children: t('hmsSummerTrainingPage.title')
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                                    lineNumber: 37,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xl md:text-2xl lg:text-3xl mb-6 md:mb-8 text-white",
                                    children: t('hmsSummerTrainingPage.tagline')
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                                    lineNumber: 38,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-4 md:space-y-6 mb-8 md:mb-12 text-left md:text-center max-w-3xl mx-auto",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-base md:text-lg",
                                            children: t('hmsSummerTrainingPage.intro1')
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                                            lineNumber: 42,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-base md:text-lg",
                                            children: [
                                                t('hmsSummerTrainingPage.intro2Before'),
                                                ' ',
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-semibold underline decoration-[#FDB813] decoration-4 underline-offset-4",
                                                    children: t('hmsSummerTrainingPage.intro2Highlight')
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                                                    lineNumber: 47,
                                                    columnNumber: 17
                                                }, this),
                                                ' ',
                                                t('hmsSummerTrainingPage.intro2After')
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                                            lineNumber: 45,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                                    lineNumber: 41,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>scrollToSection("join"),
                                    className: "bg-[#FDB813] text-black px-8 py-3 rounded-md font-medium hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 cursor-pointer",
                                    children: t('hmsSummerTrainingPage.heroButton')
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                                    lineNumber: 53,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                            lineNumber: 31,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                        lineNumber: 30,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                lineNumber: 24,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                id: "purpose",
                className: "py-20 bg-[#2E2E2E]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "container mx-auto px-4",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-w-4xl mx-auto",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-3xl md:text-4xl mb-2 text-center",
                                children: t('hmsSummerTrainingPage.purpose.title')
                            }, void 0, false, {
                                fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                                lineNumber: 67,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-24 h-1 rounded-full mx-auto mb-6",
                                style: {
                                    backgroundColor: '#FDB813'
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                                lineNumber: 68,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-lg mb-8",
                                children: t('hmsSummerTrainingPage.purpose.intro')
                            }, void 0, false, {
                                fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                                lineNumber: 70,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-12",
                                children: t('hmsSummerTrainingPage.purpose.points', {
                                    returnObjects: true
                                }).map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-start space-x-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "bg-[#FDB813] rounded-full p-1 mt-1",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                    className: "w-4 h-4 text-black",
                                                    fill: "currentColor",
                                                    viewBox: "0 0 20 20",
                                                    xmlns: "http://www.w3.org/2000/svg",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        fillRule: "evenodd",
                                                        d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z",
                                                        clipRule: "evenodd"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                                                        lineNumber: 79,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                                                    lineNumber: 78,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                                                lineNumber: 77,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: item
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                                                lineNumber: 82,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, index, true, {
                                        fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                                        lineNumber: 76,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                                lineNumber: 74,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-gray-300 italic",
                                children: t('hmsSummerTrainingPage.purpose.closing')
                            }, void 0, false, {
                                fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                                lineNumber: 87,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                        lineNumber: 66,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                    lineNumber: 65,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                lineNumber: 64,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                id: "program",
                className: "py-20 bg-black",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "container mx-auto px-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-3xl md:text-4xl mb-2 text-center",
                            children: t('hmsSummerTrainingPage.programOverview.title')
                        }, void 0, false, {
                            fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                            lineNumber: 97,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-24 h-1 rounded-full mx-auto mb-6",
                            style: {
                                backgroundColor: '#FDB813'
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                            lineNumber: 98,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-lg text-center max-w-3xl mx-auto mb-16",
                            children: [
                                t('hmsSummerTrainingPage.programOverview.introBefore'),
                                ' ',
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-semibold underline decoration-[#FDB813] decoration-4 underline-offset-4",
                                    children: t('hmsSummerTrainingPage.programOverview.introHighlight')
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                                    lineNumber: 102,
                                    columnNumber: 13
                                }, this),
                                t('hmsSummerTrainingPage.programOverview.introAfter')
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                            lineNumber: 100,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 md:grid-cols-3 gap-8",
                            children: t('hmsSummerTrainingPage.programOverview.areas', {
                                returnObjects: true
                            }).map((item, index)=>{
                                const icons = [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: "2",
                                        d: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                    }, "1", false, {
                                        fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                                        lineNumber: 111,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: "2",
                                        d: "M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                                    }, "2", false, {
                                        fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                                        lineNumber: 112,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: "2",
                                        d: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                    }, "3", false, {
                                        fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                                        lineNumber: 113,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: "2",
                                        d: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                    }, "4", false, {
                                        fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                                        lineNumber: 114,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: "2",
                                        d: "M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                                    }, "5", false, {
                                        fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                                        lineNumber: 115,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: "2",
                                        d: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                    }, "6", false, {
                                        fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                                        lineNumber: 116,
                                        columnNumber: 17
                                    }, this)
                                ];
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-[#2E2E2E] p-6 rounded-lg hover:transform hover:scale-105 transition-all",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-[#FDB813] mb-4",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                className: "w-12 h-12",
                                                fill: "none",
                                                stroke: "currentColor",
                                                viewBox: "0 0 24 24",
                                                xmlns: "http://www.w3.org/2000/svg",
                                                children: icons[index]
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                                                lineNumber: 121,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                                            lineNumber: 120,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-xl font-semibold mb-3",
                                            children: item.title
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                                            lineNumber: 125,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-gray-300",
                                            children: item.description
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                                            lineNumber: 126,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, index, true, {
                                    fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                                    lineNumber: 119,
                                    columnNumber: 17
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                            lineNumber: 108,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                    lineNumber: 96,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                lineNumber: 95,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                id: "experience",
                className: "py-20 bg-[url('https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center relative",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 bg-black opacity-80"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                        lineNumber: 136,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "container mx-auto px-4 relative z-10",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "max-w-4xl mx-auto",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-3xl md:text-4xl mb-2 text-center",
                                    children: t('hmsSummerTrainingPage.experience.title')
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                                    lineNumber: 139,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-24 h-1 rounded-full mx-auto mb-6",
                                    style: {
                                        backgroundColor: '#FDB813'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                                    lineNumber: 140,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-lg mb-8 text-center",
                                    children: [
                                        t('hmsSummerTrainingPage.experience.introBefore'),
                                        ' ',
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-semibold underline decoration-[#FDB813] decoration-4 underline-offset-4",
                                            children: t('hmsSummerTrainingPage.experience.introHighlight')
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                                            lineNumber: 144,
                                            columnNumber: 15
                                        }, this),
                                        t('hmsSummerTrainingPage.experience.introAfter')
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                                    lineNumber: 142,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-1 md:grid-cols-2 gap-8 mb-12",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-[#2E2E2E] bg-opacity-80 p-6 rounded-lg",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-xl font-semibold mb-4",
                                                    children: t('hmsSummerTrainingPage.experience.practical.title')
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                                                    lineNumber: 152,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    children: t('hmsSummerTrainingPage.experience.practical.description')
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                                                    lineNumber: 153,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                                            lineNumber: 151,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-[#2E2E2E] bg-opacity-80 p-6 rounded-lg",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-xl font-semibold mb-4",
                                                    children: t('hmsSummerTrainingPage.experience.mentorship.title')
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                                                    lineNumber: 158,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    children: t('hmsSummerTrainingPage.experience.mentorship.description')
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                                                    lineNumber: 159,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                                            lineNumber: 157,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                                    lineNumber: 150,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-center",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>scrollToSection("join"),
                                        className: "bg-[#FDB813] text-black px-8 py-3 rounded-md font-medium hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 cursor-pointer",
                                        children: t('hmsSummerTrainingPage.experience.button')
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                                        lineNumber: 166,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                                    lineNumber: 165,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                            lineNumber: 138,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                        lineNumber: 137,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                lineNumber: 135,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                id: "hallel",
                className: "py-20 bg-black",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "container mx-auto px-4",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-w-4xl mx-auto",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-3xl md:text-4xl mb-2 text-center",
                                children: t('hmsSummerTrainingPage.hallelConnection.title')
                            }, void 0, false, {
                                fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                                lineNumber: 181,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-24 h-1 rounded-full mx-auto mb-6",
                                style: {
                                    backgroundColor: '#FDB813'
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                                lineNumber: 182,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-[#2E2E2E] p-8 rounded-lg mb-12",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mb-6",
                                        children: t('hmsSummerTrainingPage.hallelConnection.paragraph1')
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                                        lineNumber: 185,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mb-6",
                                        children: t('hmsSummerTrainingPage.hallelConnection.paragraph2')
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                                        lineNumber: 188,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: t('hmsSummerTrainingPage.hallelConnection.paragraph3')
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                                        lineNumber: 191,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                                lineNumber: 184,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-full md:w-1/3 aspect-square bg-[url('https://images.unsplash.com/photo-1519710164239-da123dc03ef4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80')] bg-cover bg-center rounded-lg"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                                        lineNumber: 197,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-full md:w-1/3 aspect-square bg-[url('https://images.unsplash.com/photo-1508695666381-69deeaa78ccb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80')] bg-cover bg-center rounded-lg"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                                        lineNumber: 198,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-full md:w-1/3 aspect-square bg-[url('https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80')] bg-cover bg-center rounded-lg"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                                        lineNumber: 199,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                                lineNumber: 196,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                        lineNumber: 180,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                    lineNumber: 179,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                lineNumber: 178,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                id: "join",
                className: "py-20 bg-[#2E2E2E]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "container mx-auto px-4",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-w-4xl mx-auto",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-3xl md:text-4xl mb-2 text-center",
                                children: t('hmsSummerTrainingPage.whoCanJoin.title')
                            }, void 0, false, {
                                fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                                lineNumber: 209,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-24 h-1 rounded-full mx-auto mb-6",
                                style: {
                                    backgroundColor: '#FDB813'
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                                lineNumber: 210,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 md:grid-cols-2 gap-8 mb-12",
                                children: t('hmsSummerTrainingPage.whoCanJoin.categories', {
                                    returnObjects: true
                                }).map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-black p-6 rounded-lg",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-xl font-semibold mb-3 text-[#FDB813]",
                                                children: item.title
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                                                lineNumber: 215,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-gray-300",
                                                children: item.description
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                                                lineNumber: 216,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, index, true, {
                                        fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                                        lineNumber: 214,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                                lineNumber: 212,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-center text-lg italic mb-12",
                                children: t('hmsSummerTrainingPage.whoCanJoin.closing')
                            }, void 0, false, {
                                fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                                lineNumber: 221,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-black p-8 rounded-lg",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-2xl font-semibold mb-6 text-center",
                                        children: t('hmsSummerTrainingPage.whoCanJoin.transformationTitle')
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                                        lineNumber: 226,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mb-4",
                                        children: t('hmsSummerTrainingPage.whoCanJoin.transformation1')
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                                        lineNumber: 227,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mb-4",
                                        children: t('hmsSummerTrainingPage.whoCanJoin.transformation2')
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                                        lineNumber: 230,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: t('hmsSummerTrainingPage.whoCanJoin.transformation3')
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                                        lineNumber: 233,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                                lineNumber: 225,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                        lineNumber: 208,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                    lineNumber: 207,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                lineNumber: 206,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "py-20 bg-black",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "container mx-auto px-4",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-w-4xl mx-auto text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-3xl md:text-4xl mb-2",
                                children: t('hmsSummerTrainingPage.callToAction.title')
                            }, void 0, false, {
                                fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                                lineNumber: 245,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-24 h-1 rounded-full mx-auto mb-6",
                                style: {
                                    backgroundColor: '#FDB813'
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                                lineNumber: 246,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-lg mb-8",
                                children: t('hmsSummerTrainingPage.callToAction.paragraph1')
                            }, void 0, false, {
                                fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                                lineNumber: 248,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-lg mb-12",
                                children: t('hmsSummerTrainingPage.callToAction.paragraph2')
                            }, void 0, false, {
                                fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                                lineNumber: 251,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-[#2E2E2E] p-6 rounded-lg mb-12",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "italic text-lg",
                                    children: t('hmsSummerTrainingPage.callToAction.verse')
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                                    lineNumber: 255,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                                lineNumber: 254,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "bg-[#FDB813] text-black px-10 py-4 rounded-md font-semibold text-lg hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 cursor-pointer",
                                children: t('hmsSummerTrainingPage.callToAction.button')
                            }, void 0, false, {
                                fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                                lineNumber: 259,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                        lineNumber: 244,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                    lineNumber: 243,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                lineNumber: 242,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                id: "connect",
                className: "py-20 bg-[#2E2E2E]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "container mx-auto px-4",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-w-4xl mx-auto",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-3xl md:text-4xl mb-2 text-center",
                                children: t('hmsSummerTrainingPage.connect.title')
                            }, void 0, false, {
                                fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                                lineNumber: 270,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-24 h-1 rounded-full mx-auto mb-6",
                                style: {
                                    backgroundColor: '#FDB813'
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                                lineNumber: 271,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 md:grid-cols-3 gap-8 mb-12",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: "#",
                                        className: "bg-black p-6 rounded-lg flex flex-col items-center text-center hover:bg-[#1a1a1a] transition-colors duration-300 cursor-pointer",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                className: "w-12 h-12 text-[#FDB813] mb-4",
                                                fill: "currentColor",
                                                viewBox: "0 0 24 24",
                                                xmlns: "http://www.w3.org/2000/svg",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    d: "M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                                                    lineNumber: 276,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                                                lineNumber: 275,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-xl font-semibold mb-2",
                                                children: t('hmsSummerTrainingPage.connect.facebook.title')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                                                lineNumber: 278,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-gray-300",
                                                children: t('hmsSummerTrainingPage.connect.facebook.subtitle')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                                                lineNumber: 279,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                                        lineNumber: 274,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: "#",
                                        className: "bg-black p-6 rounded-lg flex flex-col items-center text-center hover:bg-[#1a1a1a] transition-colors duration-300 cursor-pointer",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                className: "w-12 h-12 text-[#FDB813] mb-4",
                                                fill: "currentColor",
                                                viewBox: "0 0 24 24",
                                                xmlns: "http://www.w3.org/2000/svg",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm-1-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm5 7h-2v-3c0-.55-.45-1-1-1s-1 .45-1 1v3h-2v-6h2v1.1c.17-.31.48-.6 1.3-.6 1.49 0 2.7 1.21 2.7 2.7V17z"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                                                    lineNumber: 284,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                                                lineNumber: 283,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-xl font-semibold mb-2",
                                                children: t('hmsSummerTrainingPage.connect.website.title')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                                                lineNumber: 286,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-gray-300",
                                                children: t('hmsSummerTrainingPage.connect.website.subtitle')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                                                lineNumber: 287,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                                        lineNumber: 282,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: "#",
                                        className: "bg-black p-6 rounded-lg flex flex-col items-center text-center hover:bg-[#1a1a1a] transition-colors duration-300 cursor-pointer",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                className: "w-12 h-12 text-[#FDB813] mb-4",
                                                fill: "currentColor",
                                                viewBox: "0 0 24 24",
                                                xmlns: "http://www.w3.org/2000/svg",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    d: "M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                                                    lineNumber: 292,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                                                lineNumber: 291,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-xl font-semibold mb-2",
                                                children: t('hmsSummerTrainingPage.connect.email.title')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                                                lineNumber: 294,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-gray-300",
                                                children: t('hmsSummerTrainingPage.connect.email.subtitle')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                                                lineNumber: 295,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                                        lineNumber: 290,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                                lineNumber: 273,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xl mb-6",
                                        children: t('hmsSummerTrainingPage.connect.closing1')
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                                        lineNumber: 300,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xl mb-8",
                                        children: t('hmsSummerTrainingPage.connect.closing2')
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                                        lineNumber: 303,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-2xl font-bold text-[#FDB813]",
                                        children: t('hmsSummerTrainingPage.connect.closing3')
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                                        lineNumber: 306,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                                lineNumber: 299,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                        lineNumber: 269,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                    lineNumber: 268,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
                lineNumber: 267,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ministries/HMSSummerTraining.tsx",
        lineNumber: 22,
        columnNumber: 5
    }, this);
}
_s(HMSSummerTraining, "zlIdU9EjM2llFt74AbE2KsUJXyM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"]
    ];
});
_c = HMSSummerTraining;
var _c;
__turbopack_context__.k.register(_c, "HMSSummerTraining");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ministries/HallelChurch.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HallelChurch",
    ()=>HallelChurch
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/react-i18next/dist/es/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-i18next/dist/es/useTranslation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
function HallelChurch() {
    _s();
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"])('ministries');
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "font-sans text-white bg-black",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "relative h-[80vh] flex items-center justify-center overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60 z-10"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ministries/HallelChurch.tsx",
                        lineNumber: 11,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 bg-[url('https://images.unsplash.com/photo-1438032005730-c779502df39b?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-40",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute inset-0 bg-gradient-to-b from-black via-transparent to-black"
                        }, void 0, false, {
                            fileName: "[project]/src/components/ministries/HallelChurch.tsx",
                            lineNumber: 13,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/ministries/HallelChurch.tsx",
                        lineNumber: 12,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "container mx-auto px-4 z-20 text-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "max-w-4xl mx-auto",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "text-4xl md:text-6xl font-bold mb-3 md:mb-4 text-white",
                                    children: t('hallelChurchPage.title')
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ministries/HallelChurch.tsx",
                                    lineNumber: 18,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xl md:text-2xl lg:text-3xl text-white",
                                    children: t('hallelChurchPage.tagline')
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ministries/HallelChurch.tsx",
                                    lineNumber: 21,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ministries/HallelChurch.tsx",
                            lineNumber: 17,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/ministries/HallelChurch.tsx",
                        lineNumber: 16,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ministries/HallelChurch.tsx",
                lineNumber: 10,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "bg-[#2E2E2E] py-16 px-4 md:px-8",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-6xl mx-auto text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-3xl mb-2",
                            children: t('hallelChurchPage.comingSoon.title')
                        }, void 0, false, {
                            fileName: "[project]/src/components/ministries/HallelChurch.tsx",
                            lineNumber: 31,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-24 h-1 rounded-full mx-auto mb-6",
                            style: {
                                backgroundColor: '#FDB813'
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/components/ministries/HallelChurch.tsx",
                            lineNumber: 34,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-lg",
                            children: t('hallelChurchPage.comingSoon.message')
                        }, void 0, false, {
                            fileName: "[project]/src/components/ministries/HallelChurch.tsx",
                            lineNumber: 35,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ministries/HallelChurch.tsx",
                    lineNumber: 30,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ministries/HallelChurch.tsx",
                lineNumber: 29,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ministries/HallelChurch.tsx",
        lineNumber: 8,
        columnNumber: 5
    }, this);
}
_s(HallelChurch, "zlIdU9EjM2llFt74AbE2KsUJXyM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"]
    ];
});
_c = HallelChurch;
var _c;
__turbopack_context__.k.register(_c, "HallelChurch");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ScrollToTop.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ScrollToTop",
    ()=>ScrollToTop
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-up.js [app-client] (ecmascript) <export default as ArrowUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/react-i18next/dist/es/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-i18next/dist/es/useTranslation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
function ScrollToTop() {
    _s();
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"])('common');
    const [isVisible, setIsVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Show button when page is scrolled down
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ScrollToTop.useEffect": ()=>{
            const toggleVisibility = {
                "ScrollToTop.useEffect.toggleVisibility": ()=>{
                    if (window.pageYOffset > 300) {
                        setIsVisible(true);
                    } else {
                        setIsVisible(false);
                    }
                }
            }["ScrollToTop.useEffect.toggleVisibility"];
            window.addEventListener('scroll', toggleVisibility);
            return ({
                "ScrollToTop.useEffect": ()=>{
                    window.removeEventListener('scroll', toggleVisibility);
                }
            })["ScrollToTop.useEffect"];
        }
    }["ScrollToTop.useEffect"], []);
    const scrollToTop = ()=>{
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
        children: isVisible && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
            initial: {
                opacity: 0,
                scale: 0.8
            },
            animate: {
                opacity: 1,
                scale: 1
            },
            exit: {
                opacity: 0,
                scale: 0.8
            },
            transition: {
                duration: 0.2
            },
            onClick: scrollToTop,
            className: "fixed bottom-8 right-8 z-50 group cursor-pointer",
            "aria-label": "Scroll to top",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col items-center justify-center w-14 h-14 bg-[#FDB813] rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUp$3e$__["ArrowUp"], {
                            className: "w-6 h-6 text-[#2E2E2E]",
                            strokeWidth: 3
                        }, void 0, false, {
                            fileName: "[project]/src/components/ScrollToTop.tsx",
                            lineNumber: 49,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/ScrollToTop.tsx",
                        lineNumber: 48,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-[#2E2E2E] text-white px-3 py-1 rounded text-sm whitespace-nowrap text-center",
                                children: t('common.backToTop')
                            }, void 0, false, {
                                fileName: "[project]/src/components/ScrollToTop.tsx",
                                lineNumber: 54,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute top-full left-1/2 -translate-x-1/2 -mt-1",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "border-4 border-transparent border-t-[#2E2E2E]"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ScrollToTop.tsx",
                                    lineNumber: 59,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/ScrollToTop.tsx",
                                lineNumber: 58,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ScrollToTop.tsx",
                        lineNumber: 53,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ScrollToTop.tsx",
                lineNumber: 46,
                columnNumber: 11
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/ScrollToTop.tsx",
            lineNumber: 37,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ScrollToTop.tsx",
        lineNumber: 35,
        columnNumber: 5
    }, this);
}
_s(ScrollToTop, "GPK54a6uLZ4VMTOqw8u7pemsDnA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"]
    ];
});
_c = ScrollToTop;
var _c;
__turbopack_context__.k.register(_c, "ScrollToTop");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ministries/MinistriesPage.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MinistriesPage",
    ()=>MinistriesPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/theme.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/react-i18next/dist/es/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-i18next/dist/es/useTranslation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ministries$2f$HMSPage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ministries/HMSPage.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ministries$2f$HallelBibleSchoolMinistry$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ministries/HallelBibleSchoolMinistry.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ministries$2f$HallelConferences$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ministries/HallelConferences.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ministries$2f$HallelWorshipDay$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ministries/HallelWorshipDay.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ministries$2f$HallelBibleCollege$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ministries/HallelBibleCollege.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ministries$2f$HMSSummerTraining$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ministries/HMSSummerTraining.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ministries$2f$HallelChurch$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ministries/HallelChurch.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ScrollToTop$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ScrollToTop.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
;
;
;
;
;
;
;
// Tab configuration
const TAB_CONFIG = [
    {
        key: "hms",
        labelKey: "tabs.hms"
    },
    {
        key: "bible-school",
        labelKey: "tabs.bibleSchool"
    },
    {
        key: "conferences",
        labelKey: "tabs.conferences"
    },
    {
        key: "worship-day",
        labelKey: "tabs.worshipDay"
    },
    {
        key: "bible-college",
        labelKey: "tabs.bibleCollege"
    },
    {
        key: "summer-training",
        labelKey: "tabs.summerTraining"
    },
    {
        key: "church",
        labelKey: "tabs.church"
    }
];
function MinistriesPage() {
    _s();
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"])('ministries');
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("hms");
    const handleTabChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MinistriesPage.useCallback[handleTabChange]": (tabKey)=>{
            setActiveTab(tabKey);
            // Scroll to top when tab changes
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    }["MinistriesPage.useCallback[handleTabChange]"], []);
    // Memoize tab buttons
    const tabButtons = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "MinistriesPage.useMemo[tabButtons]": ()=>TAB_CONFIG.map({
                "MinistriesPage.useMemo[tabButtons]": (tab)=>{
                    const isActive = activeTab === tab.key;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: `px-3 md:px-4 py-2 rounded-full text-xs md:text-sm font-semibold transition-colors focus:outline-none ${isActive ? "bg-[#FDB813] text-black shadow-md ring-2 ring-offset-2 ring-[#FDB813]" : "bg-[#2E2E2E] text-white hover:bg-[#FDB813] hover:text-black focus:ring-2 focus:ring-offset-2 focus:ring-[#FDB813]"}`,
                        onClick: {
                            "MinistriesPage.useMemo[tabButtons]": ()=>handleTabChange(tab.key)
                        }["MinistriesPage.useMemo[tabButtons]"],
                        style: {
                            cursor: "pointer"
                        },
                        "aria-selected": isActive,
                        role: "tab",
                        children: t(tab.labelKey)
                    }, tab.key, false, {
                        fileName: "[project]/src/components/ministries/MinistriesPage.tsx",
                        lineNumber: 41,
                        columnNumber: 11
                    }, this);
                }
            }["MinistriesPage.useMemo[tabButtons]"])
    }["MinistriesPage.useMemo[tabButtons]"], [
        activeTab,
        handleTabChange,
        t
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen text-white",
        style: {
            backgroundColor: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["primaryBackground"]
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pt-20 pb-4 md:pt-38 md:pb-12",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "container mx-auto px-2 md:px-4",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap justify-center gap-2 md:gap-3",
                        role: "tablist",
                        children: tabButtons
                    }, void 0, false, {
                        fileName: "[project]/src/components/ministries/MinistriesPage.tsx",
                        lineNumber: 68,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/ministries/MinistriesPage.tsx",
                    lineNumber: 67,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ministries/MinistriesPage.tsx",
                lineNumber: 66,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                role: "tabpanel",
                className: "pb-0",
                children: [
                    activeTab === "hms" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: {
                            opacity: 0,
                            y: 20
                        },
                        animate: {
                            opacity: 1,
                            y: 0
                        },
                        transition: {
                            duration: 0.5
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ministries$2f$HMSPage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HMSPage"], {}, void 0, false, {
                            fileName: "[project]/src/components/ministries/MinistriesPage.tsx",
                            lineNumber: 83,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/ministries/MinistriesPage.tsx",
                        lineNumber: 78,
                        columnNumber: 11
                    }, this),
                    activeTab === "bible-school" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: {
                            opacity: 0,
                            y: 20
                        },
                        animate: {
                            opacity: 1,
                            y: 0
                        },
                        transition: {
                            duration: 0.5
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ministries$2f$HallelBibleSchoolMinistry$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HallelBibleSchoolMinistry"], {}, void 0, false, {
                            fileName: "[project]/src/components/ministries/MinistriesPage.tsx",
                            lineNumber: 94,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/ministries/MinistriesPage.tsx",
                        lineNumber: 89,
                        columnNumber: 11
                    }, this),
                    activeTab === "conferences" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: {
                            opacity: 0,
                            y: 20
                        },
                        animate: {
                            opacity: 1,
                            y: 0
                        },
                        transition: {
                            duration: 0.5
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ministries$2f$HallelConferences$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HallelConferences"], {}, void 0, false, {
                            fileName: "[project]/src/components/ministries/MinistriesPage.tsx",
                            lineNumber: 105,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/ministries/MinistriesPage.tsx",
                        lineNumber: 100,
                        columnNumber: 11
                    }, this),
                    activeTab === "worship-day" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: {
                            opacity: 0,
                            y: 20
                        },
                        animate: {
                            opacity: 1,
                            y: 0
                        },
                        transition: {
                            duration: 0.5
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ministries$2f$HallelWorshipDay$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HallelWorshipDay"], {}, void 0, false, {
                            fileName: "[project]/src/components/ministries/MinistriesPage.tsx",
                            lineNumber: 116,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/ministries/MinistriesPage.tsx",
                        lineNumber: 111,
                        columnNumber: 11
                    }, this),
                    activeTab === "bible-college" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: {
                            opacity: 0,
                            y: 20
                        },
                        animate: {
                            opacity: 1,
                            y: 0
                        },
                        transition: {
                            duration: 0.5
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ministries$2f$HallelBibleCollege$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HallelBibleCollege"], {}, void 0, false, {
                            fileName: "[project]/src/components/ministries/MinistriesPage.tsx",
                            lineNumber: 127,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/ministries/MinistriesPage.tsx",
                        lineNumber: 122,
                        columnNumber: 11
                    }, this),
                    activeTab === "summer-training" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: {
                            opacity: 0,
                            y: 20
                        },
                        animate: {
                            opacity: 1,
                            y: 0
                        },
                        transition: {
                            duration: 0.5
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ministries$2f$HMSSummerTraining$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HMSSummerTraining"], {}, void 0, false, {
                            fileName: "[project]/src/components/ministries/MinistriesPage.tsx",
                            lineNumber: 138,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/ministries/MinistriesPage.tsx",
                        lineNumber: 133,
                        columnNumber: 11
                    }, this),
                    activeTab === "church" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: {
                            opacity: 0,
                            y: 20
                        },
                        animate: {
                            opacity: 1,
                            y: 0
                        },
                        transition: {
                            duration: 0.5
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ministries$2f$HallelChurch$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HallelChurch"], {}, void 0, false, {
                            fileName: "[project]/src/components/ministries/MinistriesPage.tsx",
                            lineNumber: 149,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/ministries/MinistriesPage.tsx",
                        lineNumber: 144,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ministries/MinistriesPage.tsx",
                lineNumber: 75,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ScrollToTop$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollToTop"], {}, void 0, false, {
                fileName: "[project]/src/components/ministries/MinistriesPage.tsx",
                lineNumber: 155,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ministries/MinistriesPage.tsx",
        lineNumber: 61,
        columnNumber: 5
    }, this);
}
_s(MinistriesPage, "tFwjyTxP0UBrwI3lA7fg02m5x3E=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"]
    ];
});
_c = MinistriesPage;
var _c;
__turbopack_context__.k.register(_c, "MinistriesPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/i18n/locales/en/common.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const __TURBOPACK__default__export__ = {
    "header": {
        "menu": {
            "home": "HOME",
            "about": "ABOUT",
            "ministries": "MINISTRIES",
            "gallery": "GALLERY",
            "news": "NEWS",
            "awards": "AWARDS",
            "resources": "RESOURCES",
            "directors": "DIRECTORS",
            "stories": "STORIES",
            "careers": "CAREERS",
            "contact": "CONTACT",
            "donate": "DONATE"
        },
        "submenu": {
            "about": {
                "aboutPage": "About Page",
                "vision": "Vision & Mission",
                "coreValues": "Core Values"
            },
            "ministries": {
                "ministries": "Ministries",
                "hallelMusicSchool": "Hallel Music School",
                "hallelBibleSchool": "Hallel Bible School",
                "hallelConferences": "Hallel Conferences",
                "hallelWorshipDay": "Hallel Worship Day",
                "hallelBibleCollege": "Hallel Bible College",
                "hmsSummerTraining": "HMS Summer Training"
            }
        }
    },
    "footer": {
        "siteTitle": "Yeshua Beth Hallel Ministries",
        "description": "A community of believers dedicated to worshiping God, growing in faith, and serving our community with love and compassion.",
        "quickLinks": "Quick Links",
        "connect": "Connect With Us",
        "followUs": "Follow Us",
        "newsletter": "Newsletter",
        "newsletterText": "Stay updated with our latest news and events",
        "emailPlaceholder": "Enter your email",
        "subscribe": "Subscribe",
        "legal": "Legal",
        "privacyPolicy": "Privacy Policy",
        "termsOfService": "Terms of Service",
        "accessibility": "Accessibility",
        "contact": {
            "phone": "(123) 456-7890",
            "email": "info@ybhministries.org",
            "address": "123 Faith Street, Hopeville, ST 12345"
        },
        "copyright": "All rights reserved.",
        "madeWith": "Made with",
        "and": "and",
        "devotion": "devotion"
    },
    "buttons": {
        "learnMore": "Learn More",
        "readMore": "Read More",
        "viewAll": "View All",
        "submit": "Submit",
        "cancel": "Cancel",
        "save": "Save",
        "delete": "Delete",
        "edit": "Edit",
        "close": "Close",
        "back": "Back",
        "next": "Next",
        "previous": "Previous",
        "download": "Download",
        "share": "Share",
        "play": "Play",
        "pause": "Pause",
        "search": "Search",
        "filter": "Filter",
        "sort": "Sort",
        "apply": "Apply",
        "reset": "Reset",
        "confirm": "Confirm",
        "donateNow": "Donate Now"
    },
    "common": {
        "loading": "Loading...",
        "error": "Error",
        "success": "Success",
        "warning": "Warning",
        "info": "Information",
        "yes": "Yes",
        "no": "No",
        "ok": "OK",
        "comingSoon": "Coming Soon",
        "noResults": "No results found",
        "searchPlaceholder": "Search...",
        "selectLanguage": "Select Language",
        "backToTop": "Back to Top",
        "language": {
            "en": "English",
            "te": "తెలుగు (Telugu)"
        }
    },
    "navigation": {
        "home": "Home",
        "aboutUs": "About Us",
        "ministries": "Ministries",
        "gallery": "Gallery",
        "news": "News",
        "resources": "Resources",
        "directors": "Directors",
        "ourStories": "Our Stories",
        "careers": "Careers",
        "contactUs": "Contact Us",
        "donate": "Donate"
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/i18n/locales/te/common.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const __TURBOPACK__default__export__ = {
    header: {
        menu: {
            home: "హోమ్",
            about: "మా గురించి",
            ministries: "సేవలు",
            gallery: "గ్యాలరీ",
            news: "వార్తలు",
            awards: "అవార్డులు",
            resources: "వనరులు",
            directors: "డైరెక్టర్లు",
            stories: "కథలు",
            careers: "ఉద్యోగాలు",
            contact: "సంప్రదించండి",
            donate: "విరాళం"
        },
        submenu: {
            about: {
                aboutPage: "గురించి పేజీ",
                vision: "దృష్టి & లక్ష్యం",
                coreValues: "ప్రధాన విలువలు"
            },
            ministries: {
                ministries: "సేవలు",
                hallelMusicSchool: "హల్లేల్ మ్యూజిక్ స్కూల్",
                hallelBibleSchool: "హల్లేల్ బైబిల్ స్కూల్",
                hallelConferences: "హల్లేల్ కాన్ఫరెన్స్‌లు",
                hallelWorshipDay: "హల్లేల్ ఆరాధన దినం",
                hallelBibleCollege: "హల్లేల్ బైబిల్ కళాశాల",
                hmsSummerTraining: "HMS వేసవి శిక్షణ"
            }
        }
    },
    footer: {
        siteTitle: "యేషూవా బెత్ హల్లేల్ మినిస్ట్రీస్",
        description: "దేవుణ్ణి ఆరాధించడానికి, విశ్వాసంలో ఎదగడానికి మరియు ప్రేమ మరియు కరుణతో మా సమాజానికి సేవ చేయడానికి అంకితమైన విశ్వాసుల సమాజం.",
        quickLinks: "త్వరిత లింక్‌లు",
        connect: "మాతో కనెక్ట్ అవ్వండి",
        followUs: "మమ్మల్ని అనుసరించండి",
        newsletter: "వార్తాలేఖ",
        newsletterText: "మా తాజా వార్తలు మరియు కార్యక్రమాలతో నవీకరించబడండి",
        emailPlaceholder: "మీ ఇమెయిల్ నమోదు చేయండి",
        subscribe: "చందా చేరండి",
        legal: "చట్టపరమైన",
        privacyPolicy: "గోప్యతా విధానం",
        termsOfService: "సేవా నిబంధనలు",
        accessibility: "ప్రాప్యత",
        contact: {
            phone: "(123) 456-7890",
            email: "info@ybhministries.org",
            address: "123 Faith Street, Hopeville, ST 12345"
        },
        copyright: "అన్ని హక్కులు రక్షించబడ్డాయి.",
        madeWith: "తో తయారు చేయబడింది",
        and: "మరియు",
        devotion: "భక్తి"
    },
    buttons: {
        learnMore: "మరింత తెలుసుకోండి",
        readMore: "మరింత చదవండి",
        viewAll: "అన్నీ చూడండి",
        submit: "సమర్పించండి",
        cancel: "రద్దు చేయండి",
        save: "సేవ్ చేయండి",
        delete: "తొలగించండి",
        edit: "సవరించండి",
        close: "మూసివేయండి",
        back: "వెనుకకు",
        next: "తర్వాత",
        previous: "మునుపటి",
        download: "డౌన్‌లోడ్ చేయండి",
        share: "షేర్ చేయండి",
        play: "ప్లే చేయండి",
        pause: "పాజ్ చేయండి",
        search: "వెతకండి",
        filter: "ఫిల్టర్ చేయండి",
        sort: "క్రమబద్ధీకరించండి",
        apply: "వర్తింపజేయండి",
        reset: "రీసెట్ చేయండి",
        confirm: "నిర్ధారించండి",
        donateNow: "ఇప్పుడు విరాళం"
    },
    common: {
        loading: "లోడ్ అవుతోంది...",
        error: "లోపం",
        success: "విజయం",
        warning: "హెచ్చరిక",
        info: "సమాచారం",
        yes: "అవును",
        no: "కాదు",
        ok: "సరే",
        comingSoon: "త్వరలో వస్తోంది",
        noResults: "ఫలితాలు కనుగొనబడలేదు",
        searchPlaceholder: "వెతకండి...",
        selectLanguage: "భాషను ఎంచుకోండి",
        backToTop: "పైకి వెళ్ళండి",
        language: {
            en: "English",
            te: "తెలుగు (Telugu)"
        }
    },
    navigation: {
        home: "హోమ్",
        aboutUs: "మా గురించి",
        ministries: "సేవలు",
        gallery: "గ్యాలరీ",
        news: "వార్తలు",
        resources: "వనరులు",
        directors: "డైరెక్టర్లు",
        ourStories: "మా కథలు",
        careers: "ఉద్యోగాలు",
        contactUs: "సంప్రదించండి",
        donate: "విరాళం"
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/i18n/locales/en/home.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const __TURBOPACK__default__export__ = {
    hero: {
        slideAlt: "Slide {{number}}"
    },
    about: {
        title: "About Yeshua Beth Hallel Ministries",
        learnMore: "Learn More",
        paragraph1: "At Yeshua Beth Hallel Ministries, we are passionately committed to Empowering Worship and Transforming Lives. Established in 2020, our ministry was birthed out of a divine calling to redefine how worship is understood, experienced, and lived out in the modern world.",
        paragraph2: "We believe that true worship is not confined to buildings or services, but flows from the heart of every believer into every aspect of life. A church, in our eyes, is not merely a structure made of stone and mortar—it is a living, breathing community of worshipers united by faith, love, and purpose.",
        paragraph3: "Our journey began with a simple yet profound desire: to see people encounter the living God through authentic worship and to cultivate communities where every home, every family, and every individual becomes a vessel of praise and devotion."
    },
    video: {
        title: "Our Ministry in Action",
        loadingText: "Loading video...",
        noSupport: "Your browser does not support the video tag."
    },
    achievements: {
        title: "Our Achievements",
        description: "Recognized by prestigious organizations worldwide for our commitment to excellence in worship and ministry.",
        learnMore: "Learn More",
        awards: {
            guinness: "Guinness World Records Award",
            asian: "Asian Book of Records Award",
            ingenious: "Ingenious Award",
            star: "Star Book of Records Award"
        }
    },
    eventBanner: {
        ariaLabel: "Click to view all upcoming events",
        clickToView: "Click to view all upcoming events",
        clickForDetails: "Click for more details",
        upcomingEvent: "Upcoming Event",
        upcomingEvents: "Events",
        showEvents: "Show upcoming events",
        minimize: "Minimize",
        conference: "Conference",
        class: "Class",
        viewAllEvents: "View All Events",
        previousEvent: "Previous event",
        nextEvent: "Next event",
        goToEvent: "Go to event"
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/i18n/locales/te/home.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const __TURBOPACK__default__export__ = {
    hero: {
        slideAlt: "స్లైడ్ {{number}}"
    },
    about: {
        title: "యేషూవా బెత్ హల్లేల్ మినిస్ట్రీస్ గురించి",
        learnMore: "మరింత తెలుసుకోండి",
        paragraph1: "యేషూవా బెత్ హల్లేల్ మినిస్ట్రీస్‌లో, మేము ఆరాధనను శక్తివంతం చేయడం మరియు జీవితాలను మార్చడం కోసం ఉద్రేకంగా కట్టుబడి ఉన్నాము. 2020లో స్థాపించబడింది, ఆధునిక ప్రపంచంలో ఆరాధన ఎలా అర్థం చేసుకోబడుతుంది, అనుభవించబడుతుంది మరియు జీవించబడుతుందో పునర్నిర్వచించడానికి దైవిక పిలుపు నుండి మా సేవ జన్మించింది.",
        paragraph2: "నిజమైన ఆరాధన భవనాలు లేదా సేవలకు పరిమితం కాదు, కానీ ప్రతి విశ్వాసి హృదయం నుండి జీవితంలోని ప్రతి అంశంలోకి ప్రవహిస్తుందని మేము నమ్ముతున్నాము.",
        paragraph3: "మా ప్రయాణం ఒక సాధారణ కానీ లోతైన కోరికతో ప్రారంభమైంది: ప్రజలు ప్రామాణికమైన ఆరాధన ద్వారా సజీవ దేవుణ్ణి ఎదుర్కొనడాన్ని చూడడం."
    },
    video: {
        title: "చర్యలో మా సేవ",
        loadingText: "వీడియో లోడ్ అవుతోంది...",
        noSupport: "మీ బ్రౌజర్ వీడియో ట్యాగ్‌కు మద్దతు ఇవ్వదు."
    },
    achievements: {
        title: "మా విజయాలు",
        description: "ఆరాధన మరియు సేవలో శ్రేష్ఠతకు మా నిబద్ధత కోసం ప్రపంచవ్యాప్తంగా ప్రతిష్టాత్మక సంస్థలచే గుర్తించబడింది.",
        learnMore: "మరింత తెలుసుకోండి"
    },
    eventBanner: {
        ariaLabel: "అన్ని రాబోయే కార్యక్రమాలను వీక్షించడానికి క్లిక్ చేయండి",
        clickToView: "అన్ని రాబోయే కార్యక్రమాలను వీక్షించడానికి క్లిక్ చేయండి",
        clickForDetails: "మరిన్ని వివరాల కోసం క్లిక్ చేయండి",
        upcomingEvent: "రాబోయే కార్యక్రమం",
        upcomingEvents: "కార్యక్రమాలు",
        showEvents: "రాబోయే కార్యక్రమాలను చూపించు",
        minimize: "కుదించు",
        conference: "సమావేశం",
        class: "తరగతి",
        viewAllEvents: "అన్ని కార్యక్రమాలను వీక్షించండి",
        previousEvent: "మునుపటి కార్యక్రమం",
        nextEvent: "తదుపరి కార్యక్రమం",
        goToEvent: "కార్యక్రమానికి వెళ్లండి"
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/i18n/locales/en/about.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const __TURBOPACK__default__export__ = {
    hero: {
        title: "About Us - Yeshua Beth Hallel Ministries"
    },
    tabs: {
        vision: "Vision & Mission",
        coreValues: "Core Values"
    },
    vision: {
        title: "Our Vision",
        intro1: "Yeshua Beth Hallel Ministries envisions a world where worship knows no boundaries.",
        intro2: "We long to see worship become more than a weekly gathering—it should be a way of life, a continuous offering of love and reverence to God that permeates every heart and home.",
        intro3: "Our vision is to raise a generation of worshipers who:",
        points: [
            "Live in intimate fellowship with God.",
            "Transform their communities through the power of worship.",
            "Carry the presence of God wherever they go."
        ],
        outro: "We believe that when individuals and families embrace worship as a lifestyle, they become living testimonies of God's love, grace, and power."
    },
    mission: {
        title: "Our Mission",
        intro: "Our mission can be captured in three dynamic pillars—the Three E's:",
        evangelize: {
            title: "1. Evangelize",
            description: "We strive to share the message of salvation, hope, and love found in Jesus Christ with people from all walks of life. Through outreach programs, missions, and worship gatherings, we bring the light of the Gospel to the nations."
        },
        educate: {
            title: "2. Educate",
            description: "We are dedicated to teaching and nurturing believers in the art and heart of worship. This involves equipping individuals with Biblical understanding, spiritual depth, and practical tools to grow as true worshipers who worship \"in spirit and in truth.\""
        },
        execute: {
            title: "3. Execute",
            description: "We believe faith must move into action. Therefore, we execute our vision through community engagement, leadership training, mentorship programs, and worship initiatives. Our goal is to empower every believer to live out their calling and influence the world around them for God's glory."
        }
    },
    commitment: {
        title: "Our Commitment",
        description: "At Yeshua Beth Hallel Ministries, we are not just building a ministry—we are cultivating a movement of worshipers who live with passion, purpose, and praise. Our commitment is to guide people toward deeper intimacy with God and to transform ordinary lives into extraordinary testimonies of His power and grace.",
        quote: "Through worship, we believe hearts are healed, lives are restored, and nations are changed."
    },
    coreValues: {
        title: "Our Core Values",
        subtitle: "At Yeshua Beth Hallel Ministries, our values are the heartbeat of everything we do. They shape our worship, guide our relationships, and define the culture of our community.",
        love: {
            title: "Love",
            description: "Love is the foundation of our faith and the essence of our worship. We are called to love God wholeheartedly and to extend that same love to others—unconditionally, compassionately, and selflessly. Love compels us to serve, to forgive, and to build bridges of unity across all boundaries."
        },
        patience: {
            title: "Patience",
            description: "Patience reflects the heart of Christ in us. We recognize that growth, healing, and transformation take time. Through patience, we learn to trust God's perfect timing, walk in humility, and support one another with grace. It allows us to journey together in faith, knowing that every step draws us closer to His purpose."
        },
        commitment: {
            title: "Commitment",
            description: "We are committed to living lives that glorify God. Our dedication to the ministry, to one another, and to the mission of worship is unwavering. Commitment means showing up faithfully, persevering through challenges, and remaining steadfast in prayer, service, and worship, regardless of circumstances."
        }
    },
    beliefSystem: {
        title: "Our Belief System",
        intro: "Our beliefs form the spiritual backbone of Yeshua Beth Hallel Ministries. They are rooted in the unchanging truth of Scripture and the timeless message of the Gospel.",
        trinity: "We believe in the Holy Trinity — God the Father, God the Son (Jesus Christ), and God the Holy Spirit—three in One, co-equal and co-eternal. This divine mystery is at the center of our worship and our understanding of God's nature.",
        denominations: "We honor and respect every Christian denomination that upholds the belief in the Holy Trinity and the resurrection of Jesus Christ. We are not confined by denominational boundaries; instead, we embrace unity in diversity, recognizing that all who call upon the name of Jesus are part of His body.",
        unity: "Our faith calls us not to division, but to communion—where believers from all walks of life can gather to exalt the name of Yeshua together in spirit and in truth."
    },
    movementBeyondWalls: {
        title: "A Movement Beyond Walls",
        intro: "Yeshua Beth Hallel Ministries is far more than a gathering place—it is a movement, a lifestyle, and a commitment to the transforming power of worship.",
        worship: "We believe that worship is not limited to Sunday services or sacred spaces; it is a daily expression of gratitude, reverence, and obedience to God.",
        community: "Through our ministry, we are raising a community of believers who live their faith boldly, carry worship into their homes, workplaces, and neighborhoods, and inspire others to encounter God personally.",
        transformation: "Together, we are journeying beyond tradition into transformation—where every heart beats in rhythm with heaven's song.",
        callToAction: "Join us as we continue this incredible journey of faith, worship, and community—transcending boundaries and embracing a world where worship knows no limits."
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/i18n/locales/te/about.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const __TURBOPACK__default__export__ = {
    hero: {
        title: "మా గురించి - యేషూవా బేత్ హలేల్ మినిస్ట్రీస్"
    },
    tabs: {
        vision: "దార్శనికత & లక్ష్యం",
        coreValues: "ప్రధాన విలువలు"
    },
    vision: {
        title: "మా దార్శనికత",
        intro1: "యేషూవా బేత్ హలేల్ మినిస్ట్రీస్ ఆరాధనకు హద్దులు లేని ప్రపంచాన్ని ఊహిస్తుంది.",
        intro2: "ఆరాధన వారపు సమావేశం కంటే ఎక్కువగా ఉండాలని మేము కోరుకుంటున్నాము—ఇది జీవితశైలిగా, ప్రతి హృదయం మరియు ఇంటిలో వ్యాపించే దేవునికి ప్రేమ మరియు గౌరవం యొక్క నిరంతర అర్పణగా ఉండాలి.",
        intro3: "ఈ క్రింది లక్షణాలు కలిగిన ఆరాధకుల తరాన్ని పెంచడం మా దార్శనికత:",
        points: [
            "దేవునితో సన్నిహిత సహవాసంలో జీవించడం.",
            "ఆరాధన శక్తి ద్వారా తమ సమాజాలను మా���్చడం.",
            "తాము వెళ్ళే చోటికి దేవుని సన్నిధిని తీసుకెళ్లడం."
        ],
        outro: "వ్యక్తులు మరియు కుటుంబాలు ఆరాధనను జీవితశైలిగా స్వీకరించినప్పుడు, వారు దేవుని ప్రేమ, దయ మరియు శక్తికి సజీవ సాక్ష్యాలుగా మారతారని మేము నమ్ముతున్నాము."
    },
    mission: {
        title: "మా లక్ష్యం",
        intro: "మా లక్ష్యాన్ని మూడు డైనమిక్ స్తంభాలలో సంగ్రహించవచ్చు—మూడు E లు:",
        evangelize: {
            title: "1. సువార్త ప్రచారం",
            description: "మేము అన్ని జీవిత రంగాల ప్రజలతో యేసుక్రీస్తులో కనిపించే రక్షణ, ఆశ మరియు ప్రేమ సందేశాన్ని పంచుకోవడానికి ప్రయత్నిస్తాము. వ్యాప్తి కార్యక్రమాలు, మిషన్లు మరియు ఆరాధన సమావేశాల ద్వారా, మేము దేశాలకు సువార్త వెలుగును తీసుకువస్తాము."
        },
        educate: {
            title: "2. విద్యాబోధన",
            description: "ఆరాధన యొక్క కళ మరియు హృదయంలో విశ్వాసులకు బోధించడం మరియు పోషించడం మేము అంకితం చేసుకున్నాము. ఇది బైబిల్ అవగాహన, ఆధ్యాత్మిక లోతు మరియు \"ఆత్మలో మరియు సత్యంలో\" ఆరాధించే నిజమైన ఆరాధకులుగా ఎదగడానికి ప్రాక్టికల్ సాధనాలతో వ్యక్తులను సన్నద్ధం చేయడం."
        },
        execute: {
            title: "3. అమలు",
            description: "విశ్వాసం చర్యలోకి మారాలని మేము నమ్ముతున్నాము. కాబట్టి, సమాజ నిశ్చితార్థం, నాయకత్వ శిక్షణ, మార్గదర్శకత్వ కార్యక్రమాలు మరియు ఆరాధన కార్యక్రమాల ద్వారా మా దార్శనికతను అమలు చేస్తాము. ప్రతి విశ్వాసి తమ పిలుపును జీవించడానికి మరియు దేవుని మహిమ కోసం తమ చుట్టూ ఉన్న ప్రపంచాన్ని ప్రభావితం చేయడానికి శక్తివంతం చేయడం మా లక్ష్యం."
        }
    },
    commitment: {
        title: "మా నిబద్ధత",
        description: "యేషూవా బేత్ హలేల్ మినిస్ట్రీస్ వద్ద, మేము కేవలం పరిచర్యను నిర్మించడం లేదు—మేము అభిరుచి, ఉద్దేశ్యం మరియు స్తుతితో జీవించే ఆరాధకుల ఉద్యమాన్ని పెంపొందిస్తున్నాము. దేవునితో లోతైన సాన్నిహిత్యం వైపు ప్రజలను మార్గనిర్దేశం చేయడం మరియు సాధారణ జీవితాలను ఆయన శక్తి మరియు దయ యొక్క అసాధారణ సాక్ష్యాలుగా మార్చడం మా నిబద్ధత.",
        quote: "ఆరాధన ద్వారా, హృదయాలు స్వస్థపరచబడతాయి, జీవితాలు పునరుద్ధరించబడతాయి మరియు దేశాలు మార్చబడతాయని మేము నమ్ముతున్నాము."
    },
    coreValues: {
        title: "మా ప్రధాన విలువలు",
        subtitle: "యేషూవా బేత్ హలేల్ మినిస్ట్రీస్ వద్ద, మా విలువలు మేము చేసే ప్రతిదానికి హృదయ స్పందన. అవి మా ఆరాధనను ఆకారం చేస్తాయి, మా సంబంధాలను మార్గనిర్దేశం చేస్తాయి మరియు మా సమాజ సంస్కృతిని నిర్వచిస్తాయి.",
        love: {
            title: "ప్రేమ",
            description: "ప్రేమ మా విశ్వాసానికి పునాది మరియు మా ఆరాధన యొక్క సారాంశం. మేము దేవుని పూర్ణహృదయంతో ప్రేమించడానికి మరియు అదే ప్రేమను ఇతరులకు—షరతులు లేకుండా, కరుణతో మరియు నిస్వార్థంగా విస్తరించడానికి పిలువబడ్డాము. ప్రేమ మాకు సేవ చేయడానికి, క్షమించడానికి మరియు అన్ని సరిహద్దుల్లో ఐక్యత యొక్క వారధులను నిర్మించడానికి బలవంతం చేస్తుంది."
        },
        patience: {
            title: "ఓర్పు",
            description: "ఓర్పు మనలో క్రీస్తు హృదయాన్ని ప్రతిబింబిస్తుంది. వృద్ధి, స్వస్థత మరియు పరివర్తనకు సమయం పడుతుందని మేము గుర్తిస్తాము. ఓర్పు ద్వారా, దేవుని పరిపూర్ణ సమయాన్ని విశ్వసించడం, వినయంతో నడవడం మరియు దయతో ఒకరికొకరు మద్దతు ఇవ్వడం మేము నేర్చుకుంటాము. ప్రతి అడుగు ఆయన ఉద్దేశానికి మనలను దగ్గరగా తీసుకువస్తుందని తెలుసుకుంటూ, విశ్వాసంతో కలిసి ప్రయాణించడానికి ఇది మనకు అనుమతిస్తుంది."
        },
        commitment: {
            title: "నిబద్ధత",
            description: "దేవుని మహిమపరిచే జీవితాలను జీవించడానికి మేము నిబద్ధత కలిగి ఉన్నాము. పరిచర్యకు, ఒకరికొకరికి మరియు ఆరాధన మిషన్కు మా అంకితభావం అచంచలమైనది. నిబద్ధత అంటే పరిస్థితులతో సంబంధం లేకుండా, విశ్వాసపూర్వకంగా హాజరవడం, సవాళ్ల ద్వారా పట్టుదలతో ఉండటం మరియు ప్రార్థన, సేవ మరియు ఆరాధనలో స్థిరంగా ఉండడం."
        }
    },
    beliefSystem: {
        title: "మా విశ్వాస వ్యవస్థ",
        intro: "మా నమ్మకాలు యేషూవా బేత్ హలేల్ మినిస్ట్రీస్ యొక్క ఆధ్యాత్మిక వెన్నెముకను ఏర్పరుస్తాయి. అవి మార్పులేని లేఖన సత్యం మరియు సువార్త యొక్క కాలాతీత సందేశంలో పాతుకుపోయి ఉన్నాయి.",
        trinity: "మేము పవిత్ర త్రిత్వంలో నమ్ముతున్నాము — తండ్రి దేవుడు, కుమారుడు దేవుడు (యేసుక్రీస్తు), మరియు పవిత్రాత్మ దేవుడు—ఒకే సమానం మరియు సహ-శాశ్వతంగా ముగ్గురు. ఈ దైవిక రహస్యం మా ఆరాధన మరియు దేవుని స్వభావం యొక్క మా అవగాహన కేంద్రంలో ఉంది.",
        denominations: "పవిత్ర త్రిత్వం మరియు యేసుక్రీస్తు పునరుత్థానంలో విశ్వాసాన్ని నిలబెట్టే ప్రతి క్రైస్తవ తెగను మేము గౌరవిస్తాము మరియు గౌరవిస్తాము. మేము తెగ సరిహద్దులచే పరిమితం చేయబడము; బదులుగా, యేసు నామాన్ని పిలిచే అందరూ ఆయన శరీరంలో భాగమని గుర్తించి, వైవిధ్యంలో ఐక్యతను స్వీకరిస్తాము.",
        unity: "మా విశ్వాసం మనల్ని విభజనకు కాదు, కానీ సహవాసానికి పిలుస్తుంది—అన్ని జీవిత రంగాల విశ్వాసులు ఆత్మలో మరియు సత్యంలో కలిసి యేషూవా నామాన్ని స్తుతించడానికి సమావేశమవ్వచ్చు."
    },
    movementBeyondWalls: {
        title: "గోడలకు అతీతమైన ఉద్యమం",
        intro: "యేషూవా బేత్ హలేల్ మినిస్ట్రీస్ సమావేశ స్థలం కంటే చాలా ఎక్కువ—ఇది ఒక ఉద్యమం, జీవితశైలి మరియు ఆరాధన యొక్క పరివర్తన శక్తికి నిబద్ధత.",
        worship: "ఆరాధన ఆదివారం సేవలు లేదా పవిత్ర స్థలాలకు పరిమితం కాదని మేము నమ్ముతున్నాము; ఇది దేవునికి కృతజ్ఞత, గౌరవం మరియు విధేయత యొక్క రోజువారీ వ్యక్తీకరణ.",
        community: "మా పరిచర్య ద్వారా, మేము తమ విశ్వాసాన్ని ధైర్యంగా జీవించే, తమ ఇళ్లు, పని ప్రదేశాలు మరియు పొరుగు ప్రాంతాలలోకి ఆరాధనను తీసుకెళ్లే మరియు ఇతరులను దేవుని వ్యక్తిగతంగా కలుసుకోవడానికి ప్రేరేపించే విశ్వాసుల సమాజాన్ని పెంచుతున్నాము.",
        transformation: "కలిసి, మేము సంప్రదాయానికి అతీతంగా పరివర్తనలోకి ప్రయాణిస్తున్నాము—ప్రతి హృదయం స్వర్గం యొక్క పాటకు లయబద్ధంగా కొట్టుకుంటుంది.",
        callToAction: "విశ్వాసం, ఆరాధన మరియు సమాజం యొక్క ఈ అద్భుతమైన ప్రయాణాన్ని కొనసాగించేటప్పుడు మాతో చేరండి—సరిహద్దులను అధిగమించడం మరియు ఆరాధనకు పరిమితులు లేని ప్రపంచాన్ని స్వీకరించడం."
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/i18n/locales/en/ministries.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const __TURBOPACK__default__export__ = {
    title: "Our Ministries",
    subtitle: "Discover the various ways we serve and impact communities through worship",
    tabs: {
        hms: "Hallel Music School",
        bibleSchool: "Hallel Bible School",
        conferences: "Hallel Conferences",
        worshipDay: "Hallel Worship Day",
        bibleCollege: "Hallel Bible College",
        summerTraining: "HMS Summer Training",
        church: "Hallel Church"
    },
    hallelMusicSchool: {
        title: "Hallel Music School",
        tagline: "Where Passion Meets Purpose",
        description: "Training the next generation of worship leaders with excellence in music and deep spiritual foundation.",
        learnMore: "Learn More",
        features: [
            "Professional music training",
            "Biblical foundation in worship",
            "Practical ministry experience",
            "Certificate programs available"
        ]
    },
    hallelBibleSchool: {
        title: "Hallel Bible School",
        tagline: "Grounded in Truth, Rooted in Worship",
        description: "Comprehensive biblical training that equips believers for ministry and deeper understanding of God's Word.",
        features: [
            "In-depth Bible study courses",
            "Theological training",
            "Ministry preparation",
            "Online and offline classes"
        ]
    },
    hallelConferences: {
        title: "Hallel Conferences",
        tagline: "Gathering for Worship and Transformation",
        description: "Large-scale worship gatherings that bring together believers for powerful times of worship, teaching, and spiritual renewal.",
        features: [
            "Multi-day worship events",
            "Renowned speakers and worship leaders",
            "Life-changing experiences",
            "Regional and national conferences"
        ]
    },
    hallelWorshipDay: {
        title: "Hallel Worship Day",
        tagline: "A Day Set Apart for God",
        description: "Special monthly gatherings dedicated entirely to worship, prayer, and seeking God's presence.",
        features: [
            "Extended worship sessions",
            "Prayer and intercession",
            "Prophetic ministry",
            "Community fellowship"
        ]
    },
    hallelBibleCollege: {
        title: "Hallel Bible College",
        tagline: "Higher Education in Ministry",
        description: "Comprehensive theological education preparing students for full-time ministry and leadership roles.",
        features: [
            "Accredited programs",
            "Experienced faculty",
            "Practical ministry training",
            "Degree and diploma courses"
        ]
    },
    hmsSummerTraining: {
        title: "HMS Summer Training",
        tagline: "Intensive Summer Music Program",
        description: "Special summer program offering intensive music training and worship education for students of all ages.",
        features: [
            "Intensive music workshops",
            "Performance opportunities",
            "Spiritual enrichment",
            "Certificate of completion"
        ]
    },
    otherMinistries: {
        pageSubtitle: "Discover the various ministries and programs through which we serve God and impact lives",
        explore: "Explore",
        categories: {
            biblicalEducation: "BIBLICAL EDUCATION",
            gatheringsEvents: "GATHERINGS & EVENTS",
            worshipExperience: "WORSHIP EXPERIENCE",
            higherEducation: "HIGHER EDUCATION",
            seasonalPrograms: "SEASONAL PROGRAMS"
        },
        hallelBibleSchool: {
            category: "BIBLICAL EDUCATION",
            title: "Hallel Bible School",
            description: "Hallel Bible School is a vibrant center for spiritual growth and leadership development, founded on a simple yet powerful mission — to raise a generation of believers who know the Word, walk in faith, and serve with love. Rooted in the spirit of worship that defines the Hallel movement, the school exists to help students deepen their relationship with God and discover their divine calling."
        },
        hallelConferences: {
            category: "GATHERINGS & EVENTS",
            title: "Hallel Conferences",
            description: "The Hallel Conference is a unique gathering designed to bring together believers, worshippers, musicians, and seekers in one heart and one spirit. It is more than an event—it is a sacred experience of worship, renewal, and connection. The word \"Hallel\" means \"to praise,\" and that simple yet powerful word captures the very essence of this movement: a call for people to unite in joyful and wholehearted praise to God."
        },
        hallelWorshipDay: {
            category: "WORSHIP EXPERIENCE",
            title: "Hallel Worship Day",
            description: "Hallel Worship Day is a divine movement born out of a passion for unceasing worship — a vision inspired by the Tabernacle of David, where praise and adoration rose before God day and night, without interruption. This is more than an event; it is a sacred gathering that calls believers everywhere to restore the sound of continuous worship on earth as it is in heaven."
        },
        hallelBibleCollege: {
            category: "HIGHER EDUCATION",
            title: "Hallel Bible College",
            description: "Hallel Bible College is a Christ-centered institution dedicated to training and equipping believers in the Word of God, worship, and ministry. Rooted in the spirit of Hallel — which means \"to praise\" — the college exists to develop men and women who live lives of continual worship, grounded in truth and empowered by the Holy Spirit to impact the world."
        },
        hmsSummerTraining: {
            category: "SEASONAL PROGRAMS",
            title: "HMS Summer Training",
            description: "The HMS Summer Training is a powerful, intensive program designed to equip believers with practical ministry skills, spiritual depth, and a renewed passion for God's presence. Hosted by Hallel Ministry School (HMS), this training serves as a transformational journey for those who desire to grow in faith, leadership, and worship during their summer break."
        }
    },
    hmsSummerTrainingPage: {
        title: "HMS Summer Training",
        tagline: "Equipping, Empowering, and Igniting a Generation for Kingdom Impact",
        intro1: "The HMS Summer Training is a powerful, intensive program designed to equip believers with practical ministry skills, spiritual depth, and a renewed passion for God's presence. Hosted by Hallel Ministry School (HMS), this training serves as a transformational journey for those who desire to grow in faith, leadership, and worship during their summer break.",
        intro2: "It's not just a course — it's a spiritual encounter that shapes hearts, strengthens character, and prepares participants to serve effectively in their churches, communities, and beyond.",
        intro2Before: "It's not just a course — it's a",
        intro2Highlight: "spiritual encounter",
        intro2After: "that shapes hearts, strengthens character, and prepares participants to serve effectively in their churches, communities, and beyond.",
        heroButton: "Join Now",
        purpose: {
            title: "The Purpose",
            intro: "The HMS Summer Training exists to help believers:",
            points: [
                "Discover and develop their God-given gifts.",
                "Grow deeper in the knowledge of the Word.",
                "Cultivate a heart of worship and service.",
                "Experience personal transformation through the power of the Holy Spirit.",
                "Build confidence to lead and minister with excellence and humility."
            ],
            closing: "Whether you are a student, worship leader, youth worker, or simply someone hungry for more of God, this training offers a space to learn, connect, and grow."
        },
        programOverview: {
            title: "Program Overview",
            intro: "The HMS Summer Training runs over several weeks and blends intensive teaching, practical workshops, and immersive worship experiences. Each session is designed to nurture the whole person — spirit, soul, and body.",
            introBefore: "The HMS Summer Training runs over several weeks and blends",
            introHighlight: "intensive teaching, practical workshops, and immersive worship experiences",
            introAfter: ". Each session is designed to nurture the whole person — spirit, soul, and body.",
            areas: [
                {
                    title: "Biblical Foundations",
                    description: "Understanding Scripture and building a strong doctrinal base."
                },
                {
                    title: "Worship and Music Ministry",
                    description: "Developing excellence in worship leading, musicianship, and the spiritual discipline behind true worship."
                },
                {
                    title: "Leadership and Communication",
                    description: "Learning how to lead with vision, humility, and integrity."
                },
                {
                    title: "Discipleship and Character Formation",
                    description: "Growing in personal holiness, teamwork, and servant leadership."
                },
                {
                    title: "Evangelism and Outreach",
                    description: "Equipping participants to share the Gospel with confidence and compassion."
                },
                {
                    title: "Daily Prayer and Worship",
                    description: "Creating a rhythm of devotion and intimacy with God."
                }
            ]
        },
        experience: {
            title: "Learning through Experience",
            intro: "What makes HMS Summer Training truly special is its hands-on approach.",
            introBefore: "What makes HMS Summer Training truly special is its",
            introHighlight: "hands-on approach",
            introAfter: ".",
            practical: {
                title: "Practical Application",
                description: "Participants don't just listen — they do. From leading worship to organizing outreach, every individual gets the opportunity to apply what they learn in real-life ministry contexts."
            },
            mentorship: {
                title: "Mentorship",
                description: "Small group mentorship ensures that each participant receives personal attention, guidance, and encouragement from experienced mentors and leaders."
            },
            button: "Apply Now"
        },
        hallelConnection: {
            title: "The Hallel Connection",
            paragraph1: "HMS Summer Training is an extension of the Hallel Movement, which carries the heartbeat of Hallel — \"to praise.\"",
            paragraph2: "In the spirit of the Tabernacle of David, HMS emphasizes a lifestyle of worship and prayer that continues day and night. Through this summer training, participants are not only taught how to minister — they are trained to live as worshipers who carry God's presence wherever they go.",
            paragraph3: "This aligns with the broader vision of the Hallel Conferences and Hallel Bible College — to raise up a generation that blends worship, Word, and mission."
        },
        whoCanJoin: {
            title: "Who Can Join",
            categories: [
                {
                    title: "Youth and Young Adults",
                    description: "Passionate about serving God and growing in their faith."
                },
                {
                    title: "Worship Leaders & Musicians",
                    description: "Looking to deepen their understanding of worship ministry."
                },
                {
                    title: "Aspiring Ministers",
                    description: "Preparing for a life of service in church and missions."
                },
                {
                    title: "Anyone Seeking Growth",
                    description: "Desiring spiritual growth and practical training for ministry."
                }
            ],
            closing: "No matter your background or experience level, this program offers a place for you to grow and be equipped.",
            transformationTitle: "A Season of Transformation",
            transformation1: "Many who attend HMS Summer Training describe it as a life-changing experience.",
            transformation2: "It's a time of refreshing, renewal, and rediscovery — where hearts are healed, callings are confirmed, and destinies are shaped.",
            transformation3: "Participants leave not only with new knowledge but with a deeper relationship with God, lifelong friendships, and a renewed passion to serve."
        },
        callToAction: {
            title: "Be Part of the Movement",
            paragraph1: "Join the next HMS Summer Training and be part of a community that is passionate about worship, leadership, and transformation.",
            paragraph2: "Step into a season of growth where you will be equipped by the Word, empowered by the Spirit, and ignited by worship.",
            verse: "\"Do your best to present yourself to God as one approved, a worker who does not need to be ashamed and who correctly handles the word of truth.\" — 2 Timothy 2:15 ESV",
            button: "Register Now"
        },
        connect: {
            title: "Connect and Learn More",
            facebook: {
                title: "Facebook",
                subtitle: "Augustine Dandingi Official"
            },
            website: {
                title: "HMS Website",
                subtitle: "Official page and announcements"
            },
            email: {
                title: "Email",
                subtitle: "info@hallel-ministry.org"
            },
            closing1: "Prepare to encounter God in a new way this summer.",
            closing2: "This is your time to grow, to serve, and to rise as a true worshiper and leader.",
            closing3: "HMS Summer Training — Learn. Worship. Lead. Transform."
        }
    },
    hallelBibleCollegePage: {
        title: "Hallel Bible College",
        tagline: "Raising a Generation of Worshipers, Leaders, and Kingdom Builders",
        heroButton: "Learn More",
        about: {
            title: "About Hallel Bible College",
            paragraph1: "Hallel Bible College is a Christ-centered institution dedicated to training and equipping believers in the Word of God, worship, and ministry. Rooted in the spirit of Hallel — which means \"to praise\" — the college exists to develop men and women who live lives of continual worship, grounded in truth and empowered by the Holy Spirit to impact the world.",
            paragraph2: "The college is more than a place of study — it's a spiritual training ground where hearts are transformed, minds are renewed, and lives are aligned with God's purpose. Every student who walks through its doors is invited into a deeper relationship with God and a greater understanding of His Word and calling."
        },
        vision: {
            title: "Our Vision",
            paragraph1: "To raise a generation of Spirit-filled believers who are grounded in Scripture, passionate in worship, and committed to advancing God's kingdom in every sphere of life.",
            paragraph2: "Hallel Bible College envisions a global community of worshipers, leaders, and ministers who carry the light of Christ into their homes, churches, cities, and nations — influencing the world through the power of truth, love, and excellence."
        },
        mission: {
            title: "Our Mission",
            points: [
                "To teach the uncompromised Word of God with depth, clarity, and revelation.",
                "To cultivate a lifestyle of worship that reflects the heart of the Hallel movement.",
                "To develop strong, servant-hearted leaders equipped for ministry and mission.",
                "To empower believers to walk in their calling and fulfill God's purpose for their lives.",
                "To create a global network of trained disciples who live and lead with integrity, compassion, and the power of the Holy Spirit."
            ]
        },
        unique: {
            title: "What Makes Hallel Bible College Unique",
            items: [
                {
                    title: "Worship-Centered Education",
                    description: "Every aspect of life at Hallel Bible College flows from worship. Students are encouraged not only to study about God but to encounter Him through prayer, music, and devotion."
                },
                {
                    title: "Biblically Grounded Learning",
                    description: "The curriculum is designed to help students understand Scripture deeply and apply it practically. Courses explore theology, ministry, leadership, missions, and worship, ensuring a balanced foundation for life and service."
                },
                {
                    title: "Spiritual Formation and Mentorship",
                    description: "Hallel Bible College emphasizes spiritual growth and personal transformation. Experienced mentors and faculty walk alongside students to nurture their character, faith, and leadership potential."
                },
                {
                    title: "Practical Ministry Training",
                    description: "Students engage in real-world ministry opportunities — from worship leading and outreach to missions and pastoral work — preparing them to serve effectively wherever God calls them."
                },
                {
                    title: "Global Vision",
                    description: "Hallel Bible College is part of the larger Hallel movement, which connects believers worldwide through worship, conferences, and education. This global community allows students to network with leaders, ministers, and worshipers across nations."
                }
            ]
        },
        programs: {
            title: "Programs Offered",
            list: [
                {
                    title: "Diploma in Biblical Studies",
                    description: "Foundational understanding of Scripture and doctrine."
                },
                {
                    title: "Advanced Diploma in Theology and Ministry",
                    description: "In-depth study of theology, leadership, and spiritual formation."
                },
                {
                    title: "Certificate in Worship and Music Ministry",
                    description: "Training worship leaders and musicians to minister with excellence and anointing."
                },
                {
                    title: "Leadership and Missions Track",
                    description: "Preparing students for global ministry and outreach."
                }
            ],
            closing: "Each program combines academic excellence, spiritual depth, and practical training, creating a complete formation experience that transforms both heart and mind."
        },
        lifeAtHallel: {
            title: "Life at Hallel Bible College",
            paragraph1: "Hallel Bible College is a place of community, worship, and discovery. Students learn not only in classrooms but also in prayer rooms, worship gatherings, and ministry teams. Every day begins and ends in an atmosphere of praise and thanksgiving.",
            paragraph2: "The college encourages a rhythm of spiritual discipline — combining study, service, and personal devotion. It's a place where faith becomes real and where learning flows naturally into living.",
            differenceTitle: "The Hallel Difference",
            difference: "Hallel Bible College stands out because it doesn't just train ministers — it forms worshipers who know how to carry God's presence. It believes that true ministry flows out of intimacy with God. That's why every lesson, every song, and every moment of fellowship points students back to the heart of worship — the Hallel life.",
            verse: "\"The true worshipers will worship the Father in spirit and truth, for the Father is seeking such to worship Him.\" — John 4:23 ESV"
        },
        callToAction: {
            title: "Join the Hallel Movement",
            paragraph1: "Hallel Bible College invites you to be part of this growing movement of worship and Word. Whether you are called to full-time ministry, worship leadership, or simply desire to deepen your faith, there's a place for you here.",
            paragraph2: "Experience a season of transformation — where knowledge meets anointing, worship meets wisdom, and faith meets purpose.",
            paragraph3: "At Hallel Bible College, we don't just study the Word — we live it.",
            paragraph4: "Together, we are raising a generation that will worship God in spirit and in truth, fulfilling the call of the Hallel movement to see continuous praise rise across the nations.",
            button: "Apply Now"
        }
    },
    hallelWorshipDayPage: {
        title: "Hallel Worship Day",
        tagline: "A Call to 24×7 Worship — The Sound of the Tabernacle of David",
        heroButton: "Join The Movement",
        about: {
            title: "Hallel Worship Day",
            paragraph1: "Hallel Worship Day is a divine movement born out of a passion for unceasing worship — a vision inspired by the Tabernacle of David, where praise and adoration rose before God day and night, without interruption. This is more than an event; it is a sacred gathering that calls believers everywhere to restore the sound of continuous worship on earth as it is in heaven.",
            paragraph2: "At the heart of Hallel Worship Day is a simple yet powerful truth: God is worthy of worship at all times. Just as David appointed musicians and singers to minister before the Lord 24×7, we too are called to raise a constant song of praise that never fades. Every voice lifted, every instrument played, and every heart surrendered becomes part of that eternal melody of heaven.",
            highlight1: "unceasing worship",
            highlight2: "Tabernacle of David",
            highlight3: "God is worthy of worship at all times"
        },
        vision: {
            title: "The Vision: A Revival of the Tabernacle of David",
            paragraph1: "In Scripture, the Tabernacle of David represents a place of open, unbroken communion with God. There were no veils, no barriers—just pure worship flowing freely in the presence of the Almighty.",
            paragraph2: "Hallel Worship Day seeks to rekindle that same spirit in this generation — to build spiritual altars of worship in homes, cities, and nations. It is a prophetic call to return to the heart of worship: one that is intimate, continuous, and centered entirely on the presence of God.",
            verse: "\"In that day I will restore the fallen tabernacle of David…\" — Amos 9:11",
            paragraph3: "The restoration of David's tabernacle is not just about music; it is about revival. It's about restoring a lifestyle where worship is not limited to a church service or a Sunday gathering but becomes the rhythm of everyday life.",
            highlight1: "Tabernacle of David"
        },
        unceasingPraise: {
            title: "A Day of Unceasing Praise",
            paragraph1: "Hallel Worship Day invites believers, worshipers, and intercessors to join hearts in 24 hours of continuous worship and prayer. Every moment of the day and night is filled with music, devotion, and the power of God's presence.",
            paragraph2: "From sunrise to sunset, and from midnight to dawn, the sound of Hallel rises — a sound of thanksgiving, healing, and breakthrough. Worship teams, choirs, and individuals come together to take their place in this ongoing stream of praise, creating a sacred atmosphere where heaven touches earth.",
            paragraph3: "It's not just a day to attend; it's a day to participate — to be part of something eternal.",
            highlight1: "24 hours of continuous worship and prayer"
        },
        movement: {
            title: "The Role of Hallel Worship Day in the Hallel Movement",
            paragraph1: "Hallel Worship Day is an extension of the Hallel Movement, which carries the heartbeat of Hallel — meaning \"to praise.\" It aligns perfectly with the mission of the Hallel Conferences and Hallel Bible School: to raise a generation of worshipers who live and breathe praise.",
            paragraph2: "Through this initiative, we are reminded that worship is not confined by walls or time — it's a continuous offering of love to the King of Kings.",
            highlight1: "Hallel Movement"
        },
        joinMovement: {
            title: "Join the Movement — Connect and Worship",
            intro: "To stay updated, participate, and experience the ongoing stream of worship, connect with us through:",
            facebookLink: "Augustine Dandingi Official",
            paragraph1: "There, you'll find live worship sessions, updates on upcoming Hallel Worship Days, and opportunities to join the 24×7 worship movement — locally and globally. Whether you're joining from your home, your church, or your community, you can be part of this divine symphony of praise.",
            paragraph2: "Let's unite our voices across nations and generations. Together, we will raise a sound that never stops — the sound of Hallel, echoing the heart of the Tabernacle of David.",
            highlight1: "Tabernacle of David"
        },
        callTo247: {
            title: "The Call to 24×7 Worship",
            paragraph1: "The dream of Hallel Worship Day goes beyond a single day — it points toward a lifestyle and a movement of perpetual worship. Just as in heaven, where worship never ceases, we are called to carry that same rhythm on earth.",
            paragraph2: "When worship rises 24×7, the atmosphere shifts. Chains break. Lives are restored. The presence of God fills the earth. Every song, every prayer, every moment of surrender contributes to that divine restoration — until every city resounds with the sound of praise."
        },
        finalCall: {
            title: "Be Part of the Sound",
            paragraph1: "Hallel Worship Day is a prophetic declaration that worship is our weapon, our language, and our life. As we gather, we declare that Jesus reigns over every nation and that His glory will fill the earth.",
            paragraph2: "Let's take our place among the worshipers of this generation — rebuilding the Tabernacle of David, raising the banner of Hallel, and preparing the way for the King.",
            quote1: "It's time for the sound of heaven to be heard again — 24×7.",
            verse: "\"From the rising of the sun to its setting, the name of the Lord is to be praised.\" — Psalm 113:3 ESV",
            button: "Join The Movement Today",
            highlight1: "Tabernacle of David"
        }
    },
    hallelConferencesPage: {
        title: "The Hallel Conferences",
        tagline: "Celebration of Worship, Faith, and Transformation",
        registerButton: "Register Now",
        introduction: {
            paragraph1: "The Hallel Conference is a unique gathering designed to bring together believers, worshippers, musicians, and seekers in one heart and one spirit. It is more than an event—it is a sacred experience of worship, renewal, and connection. The word \"Hallel\" means \"to praise,\" and that simple yet powerful word captures the very essence of this movement: a call for people to unite in joyful and wholehearted praise to God.",
            paragraph2: "Every Hallel Conference serves as a beautiful reminder of the power of worship to heal, restore, and transform lives. Through music, prayer, and reflection, participants encounter an atmosphere where hearts are lifted, burdens are released, and faith is rekindled. It is a time to draw near to God and to rediscover the joy of living in His presence."
        },
        heartOfHallel: {
            title: "The Heart of the Hallel Conference",
            quote: "An encounter with God, with others, and with one's own spiritual purpose.",
            paragraph1: "At its core, the Hallel Conference is about encounter—an encounter with God, with others, and with one's own spiritual purpose. Each session is carefully designed to inspire participants to deepen their relationship with God through vibrant worship, meaningful conversations, and powerful messages of hope and encouragement.",
            paragraph2: "Through uplifting music, passionate praise, and insightful teaching, the conference creates a space where people can pause from the noise of everyday life and focus on what truly matters. It is a time to listen, to learn, and to let the Holy Spirit move freely in every heart."
        },
        whatMakesSpecial: {
            title: "What Makes Hallel Special",
            items: [
                {
                    title: "Worship that Transforms",
                    description: "The Hallel Conference is known for its dynamic worship sessions, where music becomes more than melody—it becomes a language of the soul. The songs, harmonies, and heartfelt expressions of faith lead participants into deeper intimacy with God. Every voice raised in praise adds to a powerful collective sound that fills the atmosphere with joy and reverence."
                },
                {
                    title: "Messages that Inspire",
                    description: "Thought-provoking teachings and testimonies remind us of God's unchanging love, mercy, and purpose. The messages shared at Hallel challenge and uplift, helping participants strengthen their faith and live it out boldly in their everyday lives."
                },
                {
                    title: "Community that Connects",
                    description: "The conference brings together individuals from different backgrounds and traditions, uniting them through the common purpose of worship. It is a space to connect with others who share a passion for music, ministry, and spiritual growth. Many attendees find lifelong friendships and new ministry partnerships born out of these gatherings."
                }
            ]
        },
        whyMatters: {
            title: "Why the Hallel Conference Matters",
            point1: "In a world filled with distractions, pressures, and uncertainty, the Hallel Conference serves as a refreshing oasis for the soul. It reminds us of the importance of setting aside time to refocus our hearts on God and renew our spirits in His presence.",
            point2: "The experience of worshiping together with others—hundreds or even thousands of voices united in praise—creates a powerful sense of belonging and purpose. It reminds us that we are part of something greater than ourselves: the global community of believers lifting their hearts to the Creator.",
            quote: "For many, the Hallel Conference becomes a turning point—a moment when faith is reignited, when clarity is found, and when the call to live for God grows stronger. It inspires worshipers to carry the message of praise beyond the conference, into their homes, communities, and everyday lives."
        },
        movementOfPraise: {
            title: "A Movement of Praise and Renewal",
            intro: "The Hallel Conference is not confined to one place or time—it is a movement of the Spirit that continues to spread wherever people come together to worship. Each gathering carries the same heartbeat: to glorify God, to strengthen faith, and to inspire transformation.",
            bullets: [
                "Worship as a way of life",
                "Hearts full of gratitude, praise, and purpose",
                "Power to break chains and bring healing"
            ],
            quote1: "The power of Hallel lies in its simplicity—the act of giving praise to God. Yet within that simplicity lies deep spiritual strength.",
            quote2: "Praise has the power to break chains, bring healing, and fill lives with peace and hope. When people unite in worship, miracles happen—not just outwardly, but within the heart."
        },
        callToAction: {
            title: "The Call of Hallel",
            actions: [
                "Open your heart",
                "Lift your voice",
                "Experience transformation"
            ],
            paragraph1: "The Hallel Conference invites everyone—believers, musicians, dreamers, and seekers—to come and experience the beauty of collective worship.",
            paragraph2: "It is a reminder that worship is not a performance but a relationship; not just a song, but a conversation between the Creator and His people. In every moment of praise, we draw closer to the divine, and in that closeness, we find healing, joy, and renewal.",
            button: "Join the Next Conference"
        }
    },
    hallelBibleSchoolPage: {
        title: "Hallel Bible School",
        tagline: "Equipping Hearts. Transforming Lives. Impacting the World.",
        heroDescription: "Hallel Bible School is a vibrant center for spiritual growth and leadership development, founded on a simple yet powerful mission — to raise a generation of believers who know the Word, walk in faith, and serve with love. Rooted in the spirit of worship that defines the Hallel movement, the school exists to help students deepen their relationship with God and discover their divine calling.",
        vision: {
            title: "Our Vision",
            content: "The vision of Hallel Bible School is to see believers strengthened in the Word of God and equipped to live out their faith with confidence and purpose. It seeks to train worshipers, leaders, and servants of Christ who will influence their communities and the world through truth, compassion, and integrity."
        },
        mission: {
            title: "Our Mission",
            intro: "At Hallel Bible School, we are committed to:",
            points: [
                "Teaching God's Word with clarity and depth, helping students build a strong biblical foundation.",
                "Developing character and leadership through discipleship, mentorship, and practical ministry experience.",
                "Fostering a heart of worship, encouraging students to live a life of continual praise and gratitude.",
                "Empowering believers for service, preparing them to share the Gospel and meet the needs of others in love."
            ],
            pointTitles: [
                "Teaching God's Word",
                "Developing character and leadership",
                "Fostering a heart of worship",
                "Empowering believers for service"
            ]
        },
        unique: {
            title: "What Makes Hallel Bible School Unique",
            items: [
                {
                    title: "Word-Based Learning",
                    description: "Every course and session is centered on Scripture. Students explore the Bible not just as a text to study, but as a living message that transforms lives."
                },
                {
                    title: "Spirit-Led Formation",
                    description: "Along with academic excellence, the school emphasizes spiritual growth. Worship, prayer, and personal reflection are woven into daily life, creating an atmosphere where students encounter God deeply and personally."
                },
                {
                    title: "Practical Ministry Training",
                    description: "Hallel Bible School believes learning should lead to action. Students gain hands-on experience through outreach, worship ministry, community service, and leadership opportunities that prepare them for real-world impact."
                },
                {
                    title: "A Community of Worshipers",
                    description: "Hallel means praise-and that is the heartbeat of the school. Every student is encouraged to cultivate a lifestyle of worship that extends beyond the classroom into every aspect of life.",
                    highlight: "praise"
                }
            ]
        },
        courses: {
            title: "Courses and Programs",
            intro: "Hallel Bible School offers a range of programs designed for believers at different stages of their journey.",
            programs: [
                {
                    title: "Foundations in Biblical Studies",
                    description: "Understanding Scripture and essential Christian doctrines."
                },
                {
                    title: "Discipleship and Spiritual Growth",
                    description: "Developing personal devotion and character."
                },
                {
                    title: "Worship and Ministry Leadership",
                    description: "Training for those called to serve in worship or church leadership."
                },
                {
                    title: "Missions and Evangelism",
                    description: "Equipping believers to reach out and share the message of hope."
                }
            ],
            closing: "Each program blends teaching, mentoring, and practical application, ensuring a holistic approach to spiritual formation."
        },
        impact: {
            title: "Our Impact",
            paragraph1: "Graduates of Hallel Bible School go on to serve in churches, ministries, and communities around the world. They become worship leaders, pastors, teachers, missionaries, and dedicated laypeople who carry the light of Christ wherever they go.",
            paragraph2: "Through the power of God's Word and the presence of the Holy Spirit, Hallel Bible School continues to shape lives that reflect Christ's love and truth."
        },
        callToAction: {
            title: "Join the Hallel Journey",
            description: "Hallel Bible School is not just a place to study—it's a place to encounter God, to grow in faith, and to be equipped for your life's calling. Whether you are seeking deeper knowledge of the Bible, training for ministry, or simply a renewed passion for God, Hallel Bible School welcomes you.",
            closing: "Together, we learn. Together, we worship. Together, we live out Hallel -praise that transforms the world.",
            closingHighlight: "Hallel",
            button: "Apply Now",
            verse: "\"Let the word of Christ dwell in you richly… singing psalms and hymns and spiritual songs, with gratitude in your hearts to God.\" – Colossians 3:16 ESV"
        }
    },
    hallelMusicSchoolPage: {
        title: "Hallel Music School",
        tagline: "Empowering every home with the gift of music",
        youtubeAriaLabel: "Visit Hallel Music School YouTube Channel",
        introduction: "At Yeshua Beth Hallel Ministries, we believe that worship and music are inseparable expressions of our love for God. In alignment with our vision to empower worship and transform lives, we proudly introduce one of our most inspiring initiatives — the Hallel Music School.",
        ourMission: {
            title: "Our Mission",
            paragraph1: "The mission of Hallel Music School is simple yet profound: to empower every home with the gift of music.",
            paragraph2: "We believe that music is not just an art—it is a divine language that transcends words and touches the heart of God. Through this initiative, we seek to cultivate a generation of worshippers who use music as a vessel of praise, healing, and connection with the divine."
        },
        ourPurpose: {
            title: "Our Purpose",
            intro: "The Hallel Music School was established to nurture musical talent within families and communities. Our goal is to help every household develop its own musicians—individuals who can lead, inspire, and elevate the spiritual atmosphere through the gift of melody and harmony.",
            visionIntro: "We envision a world where:",
            points: [
                "Every home becomes a sanctuary of worship, filled with songs of praise and thanksgiving.",
                "Every heart beats in rhythm with heaven, expressing devotion through music.",
                "Every church is enriched by trained worshippers who lead others into the presence of God with skill and sincerity."
            ]
        },
        ourApproach: {
            title: "Our Approach",
            intro: "At Hallel Music School, we provide faith-based musical education that goes beyond technique and theory. We focus on cultivating the heart of a worshipper—training students to play and sing not just with skill, but with spirit. Our programs include:",
            points: [
                "Instrumental and vocal training tailored to all ages and skill levels.",
                "Biblically grounded instruction on the purpose and power of worship through music.",
                "Workshops and mentorship programs led by experienced worship leaders and musicians.",
                "Opportunities to serve in worship gatherings and ministry events, allowing students to put their learning into practice."
            ]
        },
        ourVisionForImpact: {
            title: "Our Vision for Impact",
            content: "We believe that when music fills a home, worship fills the atmosphere. Families who learn and play together grow stronger in faith and unity. Through Hallel Music School, we are not just teaching notes and scales—we are building worshippers, nurturing hearts that seek to glorify God in every song and every sound."
        },
        joinTheMovement: {
            title: "Join the Movement",
            intro: "Come be part of this remarkable journey of worship, faith, and transformation. Together, we can create a world where:",
            points: [
                "Every soul is a worshipper,",
                "Every home is a sanctuary, and",
                "Every church is a beacon of true devotion."
            ],
            closing: "At Yeshua Beth Hallel Ministries, our heart beats for one purpose—to empower worship and transform lives through the divine gift of music."
        },
        registration: {
            title: "Link to get registered",
            onlineStudent: "Online student?",
            lmsStudent: "LMS student?",
            guinnessAttempt: "Guinness World Records Attempt - 2"
        }
    },
    hmsPage: {
        hero: {
            title: "Hallel Music School",
            tagline: "Empowering Worship, Transforming Lives",
            description: "At Yeshua Beth Hallel Ministries, we believe that worship and music are inseparable expressions of our love for God. In alignment with our vision to empower worship and transform lives, we proudly introduce one of our most inspiring initiatives. Join us on this remarkable journey of worship, faith, and transformation.",
            joinButton: "Join Our School",
            exploreButton: "Explore Programs",
            subscribeButton: "Subscribe"
        },
        mission: {
            title: "Our Mission",
            subtitle: "The mission of Hallel Music School is simple yet profound: to empower every home with the gift of music.",
            description: "We believe that music is not just an art—it is a divine language that transcends words and touches the heart of God. Through this initiative, we seek to cultivate a generation of worshipers who use music as a vessel of praise, healing, and connection with the divine."
        },
        purpose: {
            title: "Our Purpose",
            description: "The Hallel Music School was established to nurture musical talent within families and communities. Our goal is to help every household develop its own musicians—individuals who can lead, inspire, and elevate the spiritual atmosphere through the gift of melody and harmony.",
            cards: {
                sanctuary: {
                    title: "Every Home a Sanctuary",
                    description: "Every home becomes a sanctuary of worship, filled with songs of praise and thanksgiving."
                },
                rhythm: {
                    title: "Every Heart in Rhythm",
                    description: "Every heart beats in rhythm with heaven, expressing devotion through music."
                },
                church: {
                    title: "Every Church Enriched",
                    description: "Every church is enriched by trained worshipers who lead others into the presence of God with skill and sincerity."
                }
            }
        },
        approach: {
            title: "Our Approach",
            description: "At Hallel Music School, we provide faith-based musical education that goes beyond technique and theory. We focus on cultivating the heart of a worshiper—training students to play and sing not just with skill, but with spirit.",
            items: {
                training: {
                    title: "Instrumental & Vocal Training",
                    description: "Comprehensive training tailored to all ages and skill levels, from beginners to advanced musicians."
                },
                biblical: {
                    title: "Biblical Instruction",
                    description: "Biblically grounded instruction on the purpose and power of worship through music."
                },
                workshops: {
                    title: "Workshops & Mentorship",
                    description: "Workshops and mentorship programs led by experienced worship leaders and musicians."
                },
                practical: {
                    title: "Practical Experience",
                    description: "Opportunities to serve in worship gatherings and ministry events, allowing students to put their learning into practice."
                }
            }
        },
        vision: {
            title: "Our Vision for Impact",
            description: "We believe that when music fills a home, worship fills the atmosphere. Families who learn and play together grow stronger in faith and unity. Through Hallel Music School, we are not just teaching notes and scales—we are building worshipers, nurturing hearts that seek to glorify God in every song and every sound.",
            statements: {
                soul: "Every soul is a worshiper",
                home: "Every home is a sanctuary",
                church: "Every church is a beacon of true devotion"
            }
        },
        join: {
            title: "Join the Movement",
            description: "Come be part of this remarkable journey of worship, faith, and transformation. At Yeshua Beth Hallel Ministries, our heart beats for one purpose—to empower worship and transform lives through the divine gift of music.",
            online: {
                title: "Online Student",
                description: "Learn from anywhere in the world with our comprehensive online music education program. Perfect for those with busy schedules or who live far from our physical location.",
                button: "Register Now"
            },
            lms: {
                title: "LMS Student",
                description: "Join our London Music School (LMS) for comprehensive music notation training with a structured curriculum, progress tracking, interactive lessons, and personalized feedback from our experienced instructors.",
                button: "Register Now"
            },
            guinness: {
                title: "Guinness World Records Attempt - 2",
                description: "Be part of history! Join our second attempt at breaking a Guinness World Record in music. More details coming soon.",
                button: "Learn More"
            }
        }
    },
    hallelChurchPage: {
        title: "Hallel Church",
        tagline: "A Community of Worship and Fellowship",
        comingSoon: {
            title: "Coming Soon",
            message: "We're working on bringing you an amazing experience. Stay tuned for updates!"
        }
    },
    common: {
        enrollNow: "Enroll Now",
        register: "Register",
        getInvolved: "Get Involved",
        contactUs: "Contact Us",
        upcomingEvents: "Upcoming Events",
        gallery: "Gallery",
        testimonials: "Testimonials",
        schedule: "Schedule",
        curriculum: "Curriculum",
        faculty: "Faculty",
        admissions: "Admissions"
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/i18n/locales/te/ministries.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const __TURBOPACK__default__export__ = {
    title: "మా సేవలు",
    subtitle: "ఆరాధన ద్వారా మేము సమాజాలకు సేవ చేసే మరియు ప్రభావితం చేసే వివిధ మార్గాలను కనుగొనండి",
    tabs: {
        hms: "హల్లేల్ మ్యూజిక్ స్కూల్",
        bibleSchool: "హల్లేల్ బైబిల్ స్కూల్",
        conferences: "హల్లేల్ కాన్ఫరెన్స్‌లు",
        worshipDay: "హల్లేల్ ఆరాధన దినం",
        bibleCollege: "హల్లేల్ బైబిల్ కాలేజీ",
        summerTraining: "HMS వేసవి శిక్షణ",
        church: "హల్లేల్ చర్చి"
    },
    hallelMusicSchool: {
        title: "హల్లేల్ మ్యూజిక్ స్కూల్",
        tagline: "అభిరుచి ఉద్దేశ్యాన్ని కలుస్తుంది",
        description: "సంగీతంలో శ్రేష్ఠతతో మరియు లోతైన ఆధ్యాత్మిక పునాదితో ఆరాధన నాయకుల తరువాతి తరానికి శిక్షణ ఇవ్వడం.",
        learnMore: "మరింత తెలుసుకోండి",
        features: [
            "వృత్తిపరమైన సంగీత శిక్షణ",
            "ఆరాధనలో బైబిల్ పునాది",
            "ఆచరణాత్మక సేవా అనుభవం",
            "సర్టిఫికేట్ ప్రోగ్రామ్‌లు అందుబాటులో ఉన్నాయి"
        ]
    },
    hallelBibleSchool: {
        title: "హల్లేల్ బైబిల్ స్కూల్",
        tagline: "సత్యంలో పాతుకుపోయినది, ఆరాధనలో పాతుకుపోయింది",
        description: "విశ్వాసులను సేవ కోసం మరియు దేవుని వాక్యం యొక్క లోతైన అవగాహన కోసం సన్నద్ధం చేసే సమగ్ర బైబిల్ శిక్షణ.",
        features: [
            "లోతైన బైబిల్ అధ్యయన కోర్సులు",
            "వేదాంత శిక్షణ",
            "సేవా తయారీ",
            "ఆన్‌లైన్ మరియు ఆఫ్‌లైన్ తరగతులు"
        ]
    },
    hallelConferences: {
        title: "హల్లేల్ కాన్ఫరెన్స్‌లు",
        tagline: "ఆరాధన మరియు పరివర్తన కోసం సమావేశం",
        description: "ఆరాధన, బోధన మరియు ఆధ్యాత్మిక పునరుద్ధరణ యొక్క శక్తివంతమైన సమయాల కోసం విశ్వాసులను ఒకచోట చేర్చే పెద్ద-స్థాయి ఆరాధన సమావేశాలు.",
        features: [
            "బహుళ-రోజుల ఆరాధన కార్యక్రమాలు",
            "ప్రసిద్ధ వక్తలు మరియు ఆరాధన నాయకులు",
            "జీవితాన్ని మార్చే అనుభవాలు",
            "ప్రాంతీయ మరియు జాతీయ సమావేశాలు"
        ]
    },
    hallelWorshipDay: {
        title: "హల్లేల్ ఆరాధన దినం",
        tagline: "దేవుని కోసం వేరుచేయబడిన దినం",
        description: "పూర్తిగా ఆరాధన, ప్రార్థన మరియు దేవుని ఉనికిని వెతకడానికి అంకితమైన ప్రత్యేక నెలవారీ సమావేశాలు.",
        features: [
            "పొడిగించిన ఆరాధన సెషన్లు",
            "ప్రార్థన మరియు మధ్యవర్తిత్వం",
            "ప్రవచనాత్మక సేవ",
            "సమాజ సహవాసం"
        ]
    },
    hallelBibleCollege: {
        title: "హల్లేల్ బైబిల్ కళాశాల",
        tagline: "సేవలో ఉన్నత విద్య",
        description: "పూర్తి-సమయ సేవ మరియు నాయకత్వ పాత్రల కోసం విద్యార్థులను తయారు చేసే సమగ్ర వేదాంత విద్య.",
        features: [
            "గుర్తింపు పొందిన ప్రోగ్రామ్‌లు",
            "అనుభవజ్ఞులైన అధ్యాపకులు",
            "ఆచరణాత్మక సేవా శిక్షణ",
            "డిగ్రీ మరియు డిప్లొమా కోర్సులు"
        ]
    },
    hmsSummerTraining: {
        title: "HMS వేసవి శిక్షణ",
        tagline: "ఇంటెన్సివ్ వేసవి సంగీత కార్యక్రమం",
        description: "అన్ని వయసుల విద్యార్థుల కోసం ఇంటెన్సివ్ సంగీత శిక్షణ మరియు ఆరాధన విద్యను అందించే ప్రత్యేక వేసవి కార్యక్రమం.",
        features: [
            "ఇంటెన్సివ్ సంగీత వర్క్‌షాప్‌లు",
            "ప్రదర్శన అవకాశాలు",
            "ఆధ్యాత్మిక సుసంపన్నత",
            "పూర్తి చేసిన సర్టిఫికేట్"
        ]
    },
    otherMinistries: {
        pageSubtitle: "మేము దేవునికి సేవ చేసే మరియు జీవితాలను ప్రభావితం చేసే వివిధ సేవలు మరియు కార్యక్రమాలను కనుగొనండి",
        explore: "అన్వేషించండి",
        categories: {
            biblicalEducation: "బైబిల్ విద్య",
            gatheringsEvents: "సమావేశాలు & కార్యక్రమాలు",
            worshipExperience: "ఆరాధన అనుభవం",
            higherEducation: "ఉన్నత విద్య",
            seasonalPrograms: "కాలానుగుణ కార్యక్రమాలు"
        },
        hallelBibleSchool: {
            category: "బైబిల్ విద్య",
            title: "హల్లేల్ బైబిల్ స్కూల్",
            description: "హల్లేల్ బైబిల్ స్కూల్ ఆధ్యాత్మిక ఎదుగుదల మరియు నాయకత్వ అభివృద్ధికి ఒక చైతన్యవంతమైన కేంద్రం, ఒక సాధారణ కానీ శక్తివంతమైన మిషన్‌పై స్థాపించబడింది — వాక్యాన్ని తెలిసిన, విశ్వాసంలో నడిచే మరియు ప్రేమతో సేవించే విశ్వాసుల తరాన్ని పెంచడం. హల్లేల్ ఉద్యమాన్ని నిర్వచించే ఆరాధన ఆత్మలో పాతుకుపోయి, విద్యార్థులు దేవునితో వారి సంబంధాన్ని లోతుగా చేసుకోవడానికి మరియు వారి దైవిక పిలుపును కనుగొనడంలో సహాయపడటానికి ఈ పాఠశాల ఉనికిలో ఉంది."
        },
        hallelConferences: {
            category: "సమావేశాలు & కార్యక్రమాలు",
            title: "హల్లేల్ కాన్ఫరెన్స్‌లు",
            description: "హల్లేల్ కాన్ఫరెన్స్ అనేది విశ్వాసులు, ఆరాధకులు, సంగీతకారులు మరియు అన్వేషకులను ఒకే హృదయం మరియు ఒకే ఆత్మలో ఒకచోట చేర్చడానికి రూపొందించబడిన ఒక ప్రత్యేకమైన సమావేశం. ఇది ఒక కార్యక్రమం కంటే ఎక్కువ—ఇది ఆరాధన, పునరుద్ధరణ మరియు సంబంధం యొక్క పవిత్ర అనుభవం. \"హల్లేల్\" అనే పదానికి \"స్తుతించడం\" అని అర్థం, మరియు ఆ సాధారణ కానీ శక్తివంతమైన పదం ఈ ఉద్యమం యొక్క సారాంశాన్ని సంగ్రహిస్తుంది: దేవునికి ఆనందకరమైన మరియు పూర్ణహృదయంతో స్తుతిలో ఐక్యం కావడానికి ప్రజలకు పిలుపు."
        },
        hallelWorshipDay: {
            category: "ఆరాధన అనుభవం",
            title: "హల్లేల్ ఆరాధన దినం",
            description: "హల్లేల్ ఆరాధన దినం అనేది నిరంతర ఆరాధన కోసం అభిరుచి నుండి పుట్టిన ఒక దైవిక ఉద్యమం — దావీదు గుడారం ద్వారా ప్రేరణ పొందిన దార్శనికత, ఇక్కడ స్తుతి మరియు ఆరాధన దేవుని ముందు రాత్రి పగలు, అంతరాయం లేకుండా లేచాయి. ఇది ఒక కార్యక్రమం కంటే ఎక్కువ; స్వర్గంలో ఉన్నట్లుగా భూమిపై నిరంతర ఆరాధన ధ్వనిని పునరుద్ధరించడానికి ప్రతిచోటా విశ్వాసులను పిలిచే ఒక పవిత్ర సమావేశం."
        },
        hallelBibleCollege: {
            category: "ఉన్నత విద్య",
            title: "హల్లేల్ బైబిల్ కళాశాల",
            description: "హల్లేల్ బైబిల్ కళాశాల అనేది దేవుని వాక్యం, ఆరాధన మరియు సేవలో విశ్వాసులకు శిక్షణ మరియు సన్నద్ధత కోసం అంకితమైన క్రీస్తు-కేంద్రిత సంస్థ. హల్లేల్ ఆత్మలో పాతుకుపోయి — దీని అర్థం \"స్తుతించడం\" — నిరంతర ఆరాధన జీవితాలను జీవించే, సత్యంలో పాతుకుపోయిన మరియు ప్రపంచాన్ని ప్రభావితం చేయడానికి పవిత్రాత్మ ద్వారా శక్తివంతం చేయబడిన పురుషులు మరియు మహిళలను అభివృద్ధి చేయడానికి కళాశాల ఉనికిలో ఉంది."
        },
        hmsSummerTraining: {
            category: "కాలానుగుణ కార్యక్రమాలు",
            title: "HMS వేసవి శిక్షణ",
            description: "HMS వేసవి శిక్షణ అనేది విశ్వాసులను ఆచరణాత్మక సేవా నైపుణ్యాలు, ఆధ్యాత్మిక లోతు మరియు దేవుని సన్నిధి కోసం నూతన అభిరుచితో సన్నద్ధం చేయడానికి రూపొందించబడిన శక్తివంతమైన, ఇంటెన్సివ్ కార్యక్రమం. హల్లేల్ మినిస్ట్రీ స్కూల్ (HMS) ద్వారా నిర్వహించబడుతుంది, ఈ శిక్షణ వారి వేసవి విరామ సమయంలో విశ్వాసం, నాయకత్వం మరియు ఆరాధనలో ఎదగాలనుకునే వారికి పరివర్తన ప్రయాణంగా పనిచేస్తుంది."
        }
    },
    hmsSummerTrainingPage: {
        title: "HMS వేసవి శిక్షణ",
        tagline: "రాజ్య ప్రభావం కోసం తరాన్ని సన్నద్ధం చేయడం, శక్తివంతం చేయడం మరియు రగిలించడం",
        intro1: "HMS వేసవి శిక్షణ అనేది విశ్వాసులకు ఆచరణాత్మక సేవా నైపుణ్యాలు, ఆధ్యాత్మిక లోతు మరియు దేవుని సన్నిధి ప్రతి నూతన అభిరుచితో సన్నద్ధం చేయడానికి రూపొందించబడిన శక్తివంతమైన, ఇంటెన్సివ్ కార్యక్రమం. హల్లేల్ మినిస్ట్రీ స్కూల్ (HMS) ద్వారా నిర్వహించబడుతుంది, ఈ శిక్షణ వారి వేసవి విరామ సమయంలో విశ్వాసం, నాయకత్వం మరియు ఆరాధనలో ఎదగాలని కోరుకునే వారికి పరివర్తనాత్మక ప్రయాణంగా పనిచేస్తుంది.",
        intro2: "ఇది కేవలం కోర్సు కాదు — ఇది హృదయాలను రూపొందించే, పాత్రను బలపరిచే మరియు పాల్గొనేవారిని వారి చర్చిలలో, సంఘాలలో మరియు అంతకు మించి సమర్థవంతంగా సేవ చేయడానికి సిద్ధం చేసే ఆధ్యాత్మిక ఎన్‌కౌంటర్.",
        intro2Before: "ఇది కేవలం కోర్సు కాదు — ఇది",
        intro2Highlight: "ఆధ్యాత్మిక ఎన్‌కౌంటర్",
        intro2After: "హృదయాలను రూపొందించే, పాత్రను బలపరిచే మరియు పాల్గొనేవారిని వారి చర్చిలలో, సంఘాలలో మరియు అంతకు మించి సమర్థవంతంగా సేవ చేయడానికి సిద్ధం చేసే.",
        heroButton: "ఇప్పుడే చేరండి",
        purpose: {
            title: "ఉద్దేశ్యం",
            intro: "HMS వేసవి శిక్షణ విశ్వాసులకు సహాయపడటానికి ఉనికిలో ఉంది:",
            points: [
                "దేవుడు ఇచ్చిన వారి బహుమతులను కనుగొనడం మరియు అభివృద్ధి చేయడం.",
                "వాక్యం యొక్క జ్ఞానంలో లోతుగా ఎదగడం.",
                "ఆరాధన మరియు సేవ యొక్క హృదయాన్ని పెంపొందించడం.",
                "పరిశుద్ధాత్మ యొక్క శక్తి ద్వారా వ్యక్తిగత పరివర్తనను అనుభవించడం.",
                "శ్రేష్ఠత మరియు వినయంతో నడిపించడానికి మరియు సేవ చేయడానికి విశ్వాసం పెంచడం."
            ],
            closing: "మీరు విద్యార్థి, ఆరాధన నాయకుడు, యువ కార్యకర్త లేదా దేవుని కోసం మరింత ఆకలి ఉన్న వ్యక్తి అయినా, ఈ శిక్షణ నేర్చుకోవడానికి, కనెక్ట్ అవ్వడానికి మరియు ఎదగడానికి స్థలాన్ని అందిస్తుంది."
        },
        programOverview: {
            title: "కార్యక్రమ అవలోకనం",
            intro: "HMS వేసవి శిక్షణ అనేక వారాల పాటు నడుస్తుంది మరియు ఇంటెన్సివ్ బోధన, ఆచరణాత్మక వర్క్‌షాప్‌లు మరియు ఇమ్మర్సివ్ ఆరాధన అనుభవాలను మిళితం చేస్తుంది. ప్రతి సెషన్ మొత్తం వ్యక్తిని పెంపొందించడానికి రూపొందించబడింది — ఆత్మ, మనస్సు మరియు శరీరం.",
            introBefore: "HMS వేసవి శిక్షణ అనేక వారాల పాటు నడుస్తుంది మరియు",
            introHighlight: "ఇంటెన్సివ్ బోధన, ఆచరణాత్మక వర్క్‌షాప్‌లు మరియు ఇమ్మర్సివ్ ఆరాధన అనుభవాలను",
            introAfter: "మిళితం చేస్తుంది. ప్రతి సెషన్ మొత్తం వ్యక్తిని పెంపొందించడానికి రూపొందించబడింది — ఆత్మ, మనస్సు మరియు శరీరం.",
            areas: [
                {
                    title: "బైబిల్ పునాదులు",
                    description: "లేఖనాలను అర్థం చేసుకోవడం మరియు బలమైన సిద్ధాంత పునాదిని నిర్మించడం."
                },
                {
                    title: "ఆరాధన మరియు సంగీత సేవ",
                    description: "ఆరాధన నాయకత్వం, సంగీత నైపుణ్యం మరియు నిజమైన ఆరాధన వెనుక ఉన్న ఆధ్యాత్మిక క్రమశిక్షణలో శ్రేష్ఠతను అభివృద్ధి చేయడం."
                },
                {
                    title: "నాయకత్వం మరియు సంభాషణ",
                    description: "దృష్టి, వినయం మరియు సమగ్రతతో ఎలా నడిపించాలో నేర్చుకోవడం."
                },
                {
                    title: "శిష్యత్వం మరియు పాత్ర ఏర్పాటు",
                    description: "వ్యక్తిగత పవిత్రత, టీమ్‌వర్క్ మరియు సేవా నాయకత్వంలో ఎదగడం."
                },
                {
                    title: "సువార్త ప్రచారం మరియు బయటకు చేరుకోవడం",
                    description: "పాల్గొనేవారికి విశ్వాసం మరియు కరుణతో సువార్తను పంచుకోవడానికి సన్నద్ధం చేయడం."
                },
                {
                    title: "రోజువారీ ప్రార్థన మరియు ఆరాధన",
                    description: "దేవునితో భక్తి మరియు సాన్నిధ్యం యొక్క లయను సృష్టించడం."
                }
            ]
        },
        experience: {
            title: "అనుభవం ద్వారా నేర్చుకోవడం",
            intro: "HMS వేసవి శిక్షణను నిజంగా ప్రత్యేకంగా చేసేది దాని ఆచరణాత్మక విధానం.",
            introBefore: "HMS వేసవి శిక్షణను నిజంగా ప్రత్యేకంగా చేసేది దాని",
            introHighlight: "ఆచరణాత్మక విధానం",
            introAfter: ".",
            practical: {
                title: "ఆచరణాత్మక అన్వయం",
                description: "పాల్గొనేవారు కేవలం వింటారు — వారు చేస్తారు. ఆరాధనకు నాయకత్వం వహించడం నుండి బయటకు చేరుకోవడాన్ని నిర్వహించడం వరకు, ప్రతి వ్యక్తి వాస్తవ-జీవిత సేవా సందర్భాలలో వారు నేర్చుకున్నదాన్ని వర్తింపజేసే అవకాశాన్ని పొందుతారు."
            },
            mentorship: {
                title: "మార్గదర్శకత్వం",
                description: "చిన్న సమూహ మార్గదర్శకత్వం ప్రతి పాల్గొనేవారికి అనుభవజ్ఞులైన మార్గదర్శకులు మరియు నాయకుల నుండి వ్యక్తిగత శ్రద్ధ, మార్గదర్శకత్వం మరియు ప్రోత్సాహాన్ని పొందుతుందని నిర్ధారిస్తుంది."
            },
            button: "ఇప్పుడే దరఖాస్తు చేయండి"
        },
        hallelConnection: {
            title: "హల్లేల్ కనెక్షన్",
            paragraph1: "HMS వేసవి శిక్షణ హల్లేల్ ఉద్యమం యొక్క పొడిగింపు, ఇది హల్లేల్ యొక్క హృదయ స్పందనను మోస్తుంది — \"స్తుతించడం\".",
            paragraph2: "దావీదు గుడారం యొక్క ఆత్మలో, HMS రాత్రింబవళ్లు కొనసాగే ఆరాధన మరియు ప్రార్థన యొక్క జీవనశైలిను నొక్కి చెబుతుంది. ఈ వేసవి శిక్షణ ద్వారా, పాల్గొనేవారికి ఎలా సేవ చేయాలో మాత్రమే బోధించబడదు — వారు వెళ్లిన చోట దేవుని సన్నిధిని మోసే ఆరాధకులుగా జీవించడానికి శిక్షణ పొందుతారు.",
            paragraph3: "ఇది హల్లేల్ సమావేశాలు మరియు హల్లేల్ బైబిల్ కళాశాల యొక్క విస్తృత దృష్టితో సమన్వయం చేస్తుంది — ఆరాధన, వాక్యం మరియు మిషన్‌ను మిళితం చేసే తరాన్ని పెంపొందించడం."
        },
        whoCanJoin: {
            title: "ఎవరు చేరవచ్చు",
            categories: [
                {
                    title: "యువకులు మరియు యువ పెద్దలు",
                    description: "దేవుణ్ణి సేవించడం మరియు వారి విశ్వాసంలో ఎదగడం పట్ల అభిరుచి."
                },
                {
                    title: "ఆరాధన నాయకులు & సంగీతకారులు",
                    description: "ఆరాధన సేవ యొక్క అవగాహనను లోతుగా చేసుకోవాలని చూస్తున్నారు."
                },
                {
                    title: "ఆకాంక్షగల సేవకులు",
                    description: "చర్చి మరియు మిషన్లలో సేవా జీవితం కోసం సిద్ధం అవుతున్నారు."
                },
                {
                    title: "వృద్ధిని కోరుకునే ఎవరైనా",
                    description: "ఆధ్యాత్మిక వృద్ధి మరియు సేవ కోసం ఆచరణాత్మక శిక్షణను కోరుకుంటున్నారు."
                }
            ],
            closing: "మీ నేపథ్యం లేదా అనుభవ స్థాయి ఏమైనప్పటికీ, ఈ కార్యక్రమం మీరు ఎదగడానికి మరియు సన్నద్ధం కావడానికి స్థలాన్ని అందిస్తుంది.",
            transformationTitle: "పరివర్తన యొక్క కాలం",
            transformation1: "HMS వేసవి శిక్షణకు హాజరయ్యే చాలామంది దీనిని జీవితాన్ని మార్చే అనుభవంగా వర్ణిస్తారు.",
            transformation2: "ఇది రిఫ్రెష్, పునరుద్ధరణ మరియు పునఃసృష్టి యొక్క సమయం — ఇక్కడ హృదయాలు స్వస్థత పొందుతాయి, పిలుపులు నిర్ధారించబడతాయి మరియు విధి రూపొందించబడతాయి.",
            transformation3: "పాల్గొనేవారు కొత్త జ్ఞానంతో మాత్రమే కాకుండా దేవునితో లోతైన సంబంధం, జీవితాంత మైత్రి మరియు సేవ చేయడానికి పునరుద్ధరించబడిన అభిరుచితో వెళ్లిపోతారు."
        },
        callToAction: {
            title: "ఉద్యమంలో భాగం కండి",
            paragraph1: "తదుపరి HMS వేసవి శిక్షణలో చేరండి మరియు ఆరాధన, నాయకత్వం మరియు పరివర్తన పట్ల అభిరుచి ఉన్న సంఘంలో భాగం కండి.",
            paragraph2: "వృద్ధి యొక్క కాలంలోకి అడుగు పెట్టండి, ఇక్కడ మీరు వాక్యం ద్వారా సన్నద్ధం చేయబడతారు, ఆత్మ ద్వారా శక్తివంతం చేయబడతారు మరియు ఆరాధన ద్వారా రగిలించబడతారు.",
            verse: "\"మీరు ఆమోదించబడిన వ్యక్తిగా, సిగ్గుపడవలసిన అవసరం లేని పనివాడుగా మరియు సత్య వాక్యాన్ని సరిగ్గా నిర్వహించే వాడుగా దేవునికి మిమ్మల్ని అర్పించడానికి మీ ఉత్తమాన్ని చేయండి.\" — 2 తిమోతి 2:15 ESV",
            button: "ఇప్పుడే నమోదు చేయండి"
        },
        connect: {
            title: "కనెక్ట్ అవ్వండి మరియు మరింత తెలుసుకోండి",
            facebook: {
                title: "ఫేస్‌బుక్",
                subtitle: "అగస్టిన్ దండింగి అధికారిక"
            },
            website: {
                title: "HMS వెబ్‌సైట్",
                subtitle: "అధికారిక పేజీ మరియు ప్రకటనలు"
            },
            email: {
                title: "ఇమెయిల్",
                subtitle: "info@hallel-ministry.org"
            },
            closing1: "ఈ వేసవిలో కొత్త విధంగా దేవుణ్ణి ఎదుర్కోవడానికి సిద్ధం అవ్వండి.",
            closing2: "ఇది ఎదగడానికి, సేవ చేయడానికి మరియు నిజమైన ఆరాధకుడు మరియు నాయకుడిగా లేవడానికి మీ సమయం.",
            closing3: "HMS వేసవి శిక్షణ — నేర్చుకోండి. ఆరాధించండి. నడిపించండి. మార్చండి."
        }
    },
    hallelBibleCollegePage: {
        title: "హల్లేల్ బైబిల్ కళాశాల",
        tagline: "ఆరాధకులు, నాయకులు మరియు రాజ్య నిర్మాతల తరాన్ని పెంపొందించడం",
        heroButton: "మరింత తెలుసుకోండి",
        about: {
            title: "హల్లేల్ బైబిల్ కళాశాల గురించి",
            paragraph1: "హల్లేల్ బైబిల్ కళాశాల అనేది దేవుని వాక్యం, ఆరాధన మరియు సేవలో విశ్వాసులకు శిక్షణ ఇవ్వడానికి మరియు సన్నద్ధం చేయడానికి అంకితమైన క్రీస్తు-కేంద్రీకృత సంస్థ. హల్లేల్ యొక్క ఆత్మలో పాతుకుపోయింది — దీని అర్థం \"స్తుతించడం\" — కళాశాల నిరంతర ఆరాధన యొక్క జీవితాలను జీవించే, సత్యంలో పునాదిగా మరియు ప్రపంచాన్ని ప్రభావితం చేయడానికి పరిశుద్ధాత్మచే శక్తివంతం చేయబడిన పురుషులు మరియు మహిళలను అభివృద్ధి చేయడానికి ఉనికిలో ఉంది.",
            paragraph2: "కళాశాల కేవలం అధ్యయన స్థలం కంటే ఎక్కువ — ఇది హృదయాలు మార్చబడే, మనస్సులు పునరుద్ధరించబడే మరియు దేవుని ఉద్దేశ్యంతో జీవితాలు సమలేఖనం చేయబడే ఆధ్యాత్మిక శిక్షణా మైదానం. దాని తలుపుల గుండా నడిచే ప్రతి విద్యార్థి దేవునితో లోతైన సంబంధంలోకి మరియు ఆయన వాక్యం మరియు పిలుపు గురించి గొప్ప అవగాహనలోకి ఆహ్వానించబడతారు."
        },
        vision: {
            title: "మా దృష్టి",
            paragraph1: "లేఖనాలలో పునాదిగా, ఆరాధనలో ఉద్వేగంతో మరియు జీవితంలోని ప్రతి రంగంలో దేవుని రాజ్యాన్ని ముందుకు తీసుకెళ్లడానికి కట్టుబడి ఉన్న ఆత్మతో నిండిన విశ్వాసుల తరాన్ని పెంపొందించడం.",
            paragraph2: "హల్లేల్ బైబిల్ కళాశాల క్రీస్తు యొక్క వెలుగును తమ ఇళ్లు, చర్చిలు, నగరాలు మరియు దేశాలలోకి మోసే ఆరాధకులు, నాయకులు మరియు సేవకుల ప్రపంచ సంఘాన్ని ఊహించుకుంటుంది — సత్యం, ప్రేమ మరియు శ్రేష్ఠత యొక్క శక్తి ద్వారా ప్రపంచాన్ని ప్రభావితం చేస్తుంది."
        },
        mission: {
            title: "మా మిషన్",
            points: [
                "లోతు, స్పష్టత మరియు ప్రకటనతో దేవుని రాజీలేని వాక్యాన్ని బోధించడం.",
                "హల్లేల్ ఉద్యమం యొక్క హృదయాన్ని ప్రతిబింబించే ఆరాధన యొక్క జీవనశైలిని పెంపొందించడం.",
                "సేవ మరియు మిషన్ కోసం సన్నద్ధం చేయబడిన బలమైన, సేవా-హృదయ నాయకులను అభివృద్ధి చేయడం.",
                "విశ్వాసులు తమ పిలుపులో నడవడానికి మరియు వారి జీవితాల కోసం దేవుని ఉద్దేశ్యాన్ని నెరవేర్చడానికి శక్తివంతం చేయడం.",
                "సమగ్రత, కరుణ మరియు పరిశుద్ధాత్మ యొక్క శక్తితో జీవించే మరియు నడిపించే శిక్షణ పొందిన శిష్యుల ప్రపంచ నెట్‌వర్క్‌ను సృష్టించడం."
            ]
        },
        unique: {
            title: "హల్లేల్ బైబిల్ కళాశాలను ప్రత్యేకంగా చేసేది",
            items: [
                {
                    title: "ఆరాధన-కేంద్రీకృత విద్య",
                    description: "హల్లేల్ బైబిల్ కళాశాలలో జీవితంలోని ప్రతి అంశం ఆరాధన నుండి ప్రవహిస్తుంది. విద్యార్థులు దేవుని గురించి అధ్యయనం చేయడమే కాకుండా ప్రార్థన, సంగీతం మరియు భక్తి ద్వారా ఆయనను ఎదుర్కొనడానికి ప్రోత్సహించబడతారు."
                },
                {
                    title: "బైబిల్-ఆధారిత అభ్యాసం",
                    description: "విద్యార్థులకు లేఖనాలను లోతుగా అర్థం చేసుకోవడంలో మరియు ఆచరణాత్మకంగా వర్తింపజేయడంలో సహాయపడటానికి పాఠ్యాంశాలు రూపొందించబడ్డాయి. కోర్సులు వేదాంతశాస్త్రం, సేవ, నాయకత్వం, మిషన్లు మరియు ఆరాధనను అన్వేషిస్తాయి, జీవితం మరియు సేవ కోసం సమతుల్య పునాదిని నిర్ధారిస్తాయి."
                },
                {
                    title: "ఆధ్యాత్మిక ఏర్పాటు మరియు మార్గదర్శకత్వం",
                    description: "హల్లేల్ బైబిల్ కళాశాల ఆధ్యాత్మిక వృద్ధి మరియు వ్యక్తిగత పరివర్తనను నొక్కి చెబుతుంది. అనుభవజ్ఞులైన మార్గదర్శకులు మరియు అధ్యాపకులు విద్యార్థుల పాత్ర, విశ్వాసం మరియు నాయకత్వ సామర్థ్యాన్ని పెంపొందించడానికి వారితో పాటు నడుస్తారు."
                },
                {
                    title: "ఆచరణాత్మక సేవా శిక్షణ",
                    description: "విద్యార్థులు వాస్తవ-ప్రపంచ సేవా అవకాశాలలో పాల్గొంటారు — ఆరాధన నాయకత్వం మరియు బయటకు చేరుకోవడం నుండి మిషన్లు మరియు మతసంబంధ పని వరకు — దేవుడు వారిని పిలిచిన చోట సమర్థవంతంగా సేవ చేయడానికి వారిని సిద్ధం చేస్తుంది."
                },
                {
                    title: "ప్రపంచ దృష్టి",
                    description: "హల్లేల్ బైబిల్ కళాశాల పెద్ద హల్లేల్ ఉద్యమంలో భాగం, ఇది ఆరాధన, సమావేశాలు మరియు విద్య ద్వారా ప్రపంచవ్యాప్తంగా విశ్వాసులను కనెక్ట్ చేస్తుంది. ఈ ప్రపంచ సంఘం విద్యార్థులు దేశాలకు అడ్డంగా నాయకులు, సేవకులు మరియు ఆరాధకులతో నెట్‌వర్క్ చేయడానికి అనుమతిస్తుంది."
                }
            ]
        },
        programs: {
            title: "అందించే కార్యక్రమాలు",
            list: [
                {
                    title: "బైబిల్ అధ్యయనాలలో డిప్లొమా",
                    description: "లేఖనాలు మరియు సిద్ధాంతం యొక్క పునాది అవగాహన."
                },
                {
                    title: "వేదాంతశాస్త్రం మరియు సేవలో అధునాతన డిప్లొమా",
                    description: "వేదాంతశాస్త్రం, నాయకత్వం మరియు ఆధ్యాత్మిక ఏర్పాటు యొక్క లోతైన అధ్యయనం."
                },
                {
                    title: "ఆరాధన మరియు సంగీత సేవలో సర్టిఫికేట్",
                    description: "శ్రేష్ఠత మరియు అభిషేకంతో సేవ చేయడానికి ఆరాధన నాయకులు మరియు సంగీతకారులకు శిక్షణ."
                },
                {
                    title: "నాయకత్వం మరియు మిషన్ల ట్రాక్",
                    description: "ప్రపంచ సేవ మరియు బయటకు చేరుకోవడం కోసం విద్యార్థులను సిద్ధం చేయడం."
                }
            ],
            closing: "ప్రతి కార్యక్రమం విద్యాసంబంధ శ్రేష్ఠత, ఆధ్యాత్మిక లోతు మరియు ఆచరణాత్మక శిక్షణను మిళితం చేస్తుంది, హృదయం మరియు మనస్సు రెండింటినీ మార్చే పూర్తి ఏర్పాటు అనుభవాన్ని సృష్టిస్తుంది."
        },
        lifeAtHallel: {
            title: "హల్లేల్ బైబిల్ కళాశాలలో జీవితం",
            paragraph1: "హల్లేల్ బైబిల్ కళాశాల సంఘం, ఆరాధన మరియు అన్వేషణ యొక్క స్థలం. విద్యార్థులు తరగతి గదుల్లో మాత్రమే కాకుండా ప్రార్థన గదుల్లో, ఆరాధన సమావేశాలలో మరియు సేవా బృందాలలో కూడా నేర్చుకుంటారు. ప్రతిరోజూ స్తుతి మరియు కృతజ్ఞత యొక్క వాతావరణంలో ప్రారంభమవుతుంది మరియు ముగుస్తుంది.",
            paragraph2: "కళాశాల ఆధ్యాత్మిక క్రమశిక్షణ యొక్క లయను ప్రోత్సహిస్తుంది — అధ్యయనం, సేవ మరియు వ్యక్తిగత భక్తిని కలుపుతుంది. ఇది విశ్వాసం నిజం అయ్యే మరియు నేర్చుకోవడం సహజంగా జీవించడంలోకి ప్రవహించే స్థలం.",
            differenceTitle: "హల్లేల్ తేడా",
            difference: "హల్లేల్ బైబిల్ కళాశాల ప్రత్యేకంగా ఉంటుంది ఎందుకంటే ఇది కేవలం సేవకులకు శిక్షణ ఇవ్వదు — ఇది దేవుని సన్నిధిని ఎలా మోయాలో తెలిసిన ఆరాధకులను రూపొందిస్తుంది. నిజమైన సేవ దేవునితో సాన్నిధ్యం నుండి ప్రవహిస్తుందని ఇది నమ్ముతుంది. అందుకే ప్రతి పాఠం, ప్రతి పాట మరియు సహవాసం యొక్క ప్రతి క్షణం విద్యార్థులను ఆరాధన యొక్క హృదయానికి తిరిగి చూపుతుంది — హల్లేల్ జీవితం.",
            verse: "\"నిజమైన ఆరాధకులు ఆత్మలో మరియు సత్యంలో తండ్రిని ఆరాధిస్తారు, ఎందుకంటే తండ్రి తనను ఆరాధించడానికి అటువంటి వారిని వెతుకుతున్నాడు.\" — యోహాను 4:23 ESV"
        },
        callToAction: {
            title: "హల్లేల్ ఉద్యమంలో చేరండి",
            paragraph1: "హల్లేల్ బైబిల్ కళాశాల ఆరాధన మరియు వాక్యం యొక్క ఈ పెరుగుతున్న ఉద్యమంలో భాగం కావడానికి మిమ్మల్ని ఆహ్వానిస్తుంది. మీరు పూర్తి-సమయ సేవకు, ఆరాధన నాయకత్వానికి పిలవబడ్డారా లేదా కేవలం మీ విశ్వాసాన్ని లోతుగా చేసుకోవాలని కోరుకుంటున్నారా, ఇక్కడ మీకు ఒక స్థలం ఉంది.",
            paragraph2: "పరివర్తన యొక్క సీజన్‌ను అనుభవించండి — ఇక్కడ జ్ఞానం అభిషేకాన్ని కలుస్తుంది, ఆరాధన జ్ఞానాన్ని కలుస్తుంది మరియు విశ్వాసం ఉద్దేశ్యాన్ని కలుస్తుంది.",
            paragraph3: "హల్లేల్ బైబిల్ కళాశాలలో, మేము వాక్యాన్ని అధ్యయనం చేయడమే కాదు — మేము దానిని జీవిస్తాము.",
            paragraph4: "కలిసి, మనం ఆత్మలో మరియు సత్యంలో దేవుణ్ణి ఆరాధించే తరాన్ని పెంపొందిస్తున్నాము, దేశాలకు అడ్డంగా నిరంతర స్తుతి లేవడం చూసేందుకు హల్లేల్ ఉద్యమం యొక్క పిలుపును నెరవేర్చడం.",
            button: "ఇప్పుడే దరఖాస్తు చేయండి"
        }
    },
    hallelWorshipDayPage: {
        title: "హల్లేల్ ఆరాధన దినం",
        tagline: "24×7 ఆరాధనకు పిలుపు — దావీదు గుడారం యొక్క ధ్వని",
        heroButton: "ఉద్యమంలో చేరండి",
        about: {
            title: "హల్లేల్ ఆరాధన దినం",
            paragraph1: "హల్లేల్ ఆరాధన దినం అనేది నిరంతర ఆరాధన పట్ల అభిరుచి నుండి పుట్టిన దైవిక ఉద్యమం — దావీదు గుడారం ద్వారా ప్రేరేపించబడిన దృష్టి, ఇక్కడ స్తుతి మరియు ఆరాధన రాత్రింబవళ్లు దేవుని ముందు లేచాయి, అంతరాయం లేకుండా. ఇది కేవలం ఒక కార్యక్రమం కంటే ఎక్కువ; ఇది విశ్వాసులందరినీ భూమిపై నిరంతర ఆరాధన యొక్క ధ్వనిని స్వర్గంలో ఉన్నట్లుగా పునరుద్ధరించడానికి పిలిచే పవిత్ర సమావేశం.",
            paragraph2: "హల్లేల్ ఆరాధన దినం యొక్క హృదయంలో ఒక సరళమైన కానీ శక్తివంతమైన సత్యం ఉంది: దేవుడు అన్ని సమయాల్లో ఆరాధనకు అర్హుడు. దావీదు 24×7 ప్రభువు ముందు సేవ చేయడానికి సంగీతకారులు మరియు గాయకులను నియమించినట్లే, మనం కూడా ఎప్పటికీ మసకబారని నిరంతర స్తుతి పాటను లేపమని పిలవబడ్డాము. పైకెత్తబడిన ప్రతి స్వరం, వాయించబడిన ప్రతి వాయిద్యం మరియు లొంగిపోయిన ప్రతి హృదయం స్వర్గం యొక్క శాశ్వత సంగీతంలో భాగం అవుతుంది.",
            highlight1: "నిరంతర ఆరాధన",
            highlight2: "దావీదు గుడారం",
            highlight3: "దేవుడు అన్ని సమయాల్లో ఆరాధనకు అర్హుడు"
        },
        vision: {
            title: "దృష్టి: దావీదు గుడారం యొక్క పునరుద్ధరణ",
            paragraph1: "లేఖనంలో, దావీదు గుడారం దేవునితో బహిరంగ, అవిచ్ఛిన్న సహవాసం యొక్క స్థలాన్ని సూచిస్తుంది. తెరలు లేవు, అడ్డంకులు లేవు—కేవలం సర్వశక్తిమంతుని సన్నిధిలో స్వేచ్ఛగా ప్రవహించే స్వచ్ఛమైన ఆరాధన.",
            paragraph2: "హల్లేల్ ఆరాధన దినం ఈ తరంలో అదే ఆత్మను తిరిగి రగిలించడానికి ప్రయత్నిస్తుంది — ఇళ్లు, నగరాలు మరియు దేశాల్లో ఆరాధన యొక్క ఆధ్యాత్మిక బలిపీఠాలను నిర్మించడానికి. ఇది ఆరాధన యొక్క హృదయానికి తిరిగి రావడానికి ప్రవచన పిలుపు: సన్నిహితమైనది, నిరంతరమైనది మరియు పూర్తిగా దేవుని సన్నిధిపై కేంద్రీకృతమై ఉంది.",
            verse: "\"ఆ దినమున నేను కూలినదియు దావీదు గుడారమును మరల లేపెదను…\" — ఆమోసు 9:11",
            paragraph3: "దావీదు గుడారం యొక్క పునరుద్ధరణ కేవలం సంగీతం గురించి మాత్రమే కాదు; ఇది పునరుజ్జీవనం గురించి. ఆరాధన చర్చి సేవకు లేదా ఆదివారం సమావేశానికి పరిమితం కాకుండా రోజువారీ జీవితం యొక్క లయగా మారే జీవనశైలిని పునరుద్ధరించడం గురించి.",
            highlight1: "దావీదు గుడారం"
        },
        unceasingPraise: {
            title: "నిరంతర స్తుతి యొక్క దినం",
            paragraph1: "హల్లేల్ ఆరాధన దినం విశ్వాసులు, ఆరాధకులు మరియు మధ్యవర్తులను 24 గంటల నిరంతర ఆరాధన మరియు ప్రార్థనలో హృదయాలు కలపడానికి ఆహ్వానిస్తుంది. పగలు మరియు రాత్రి యొక్క ప్రతి క్షణం సంగీతం, భక్తి మరియు దేవుని సన్నిధి యొక్క శక్తితో నిండి ఉంటుంది.",
            paragraph2: "సూర్యోదయం నుండి సూర్యాస్తమయం వరకు, మరియు అర్ధరాత్రి నుండి తెల్లవారుజాము వరకు, హల్లేల్ యొక్క ధ్వని లేస్తుంది — కృతజ్ఞత, స్వస్థత మరియు పురోభివృద్ధి యొక్క ధ్వని. ఆరాధన బృందాలు, గాయక బృందాలు మరియు వ్యక్తులు ఈ కొనసాగుతున్న స్తుతి ప్రవాహంలో తమ స్థానాన్ని తీసుకోవడానికి కలిసి వస్తారు, స్వర్గం భూమిని తాకే పవిత్ర వాతావరణాన్ని సృష్టిస్తారు.",
            paragraph3: "ఇది కేవలం హాజరయ్యే దినం కాదు; పాల్గొనే దినం — శాశ్వతమైన దానిలో భాగం కావడం.",
            highlight1: "24 గంటల నిరంతర ఆరాధన మరియు ప్రార్థన"
        },
        movement: {
            title: "హల్లేల్ ఉద్యమంలో హల్లేల్ ఆరాధన దినం యొక్క పాత్ర",
            paragraph1: "హల్లేల్ ఆరాధన దినం హల్లేల్ ఉద్యమం యొక్క పొడిగింపు, ఇది హల్లేల్ యొక్క హృదయ స్పందనను మోస్తుంది — దీని అర్థం \"స్తుతించడం.\" ఇది హల్లేల్ సమావేశాలు మరియు హల్లేల్ బైబిల్ స్కూల్ యొక్క మిషన్‌తో పూర్తిగా సమన్వయం చేస్తుంది: స్తుతిని జీవించే మరియు శ్వసించే ఆరాధకుల తరాన్ని పెంపొందించడం.",
            paragraph2: "ఈ చొరవ ద్వారా, ఆరాధన గోడలు లేదా సమయంతో పరిమితం కాదని మనకు గుర్తు చేయబడింది — ఇది రాజాధిరాజుకు ప్రేమ యొక్క నిరంతర అర్పణ.",
            highlight1: "హల్లేల్ ఉద్యమం"
        },
        joinMovement: {
            title: "ఉద్యమంలో చేరండి — కనెక్ట్ అవ్వండి మరియు ఆరాధించండి",
            intro: "నవీకరించబడి ఉండటానికి, పాల్గొనడానికి మరియు కొనసాగుతున్న ఆరాధన ప్రవాహాన్ని అనుభవించడానికి, దీని ద్వారా మాతో కనెక్ట్ అవ్వండి:",
            facebookLink: "అగస్టిన్ దండింగి అధికారిక",
            paragraph1: "అక్కడ, మీరు ప్రత్యక్ష ఆరాధన సెషన్‌లు, రాబోయే హల్లేల్ ఆరాధన దినాల నవీకరణలు మరియు 24×7 ఆరాధన ఉద్యమంలో చేరడానికి అవకాశాలను కనుగొంటారు — స్థానికంగా మరియు ప్రపంచవ్యాప్తంగా. మీరు మీ ఇంటి నుండి, మీ చర్చి నుండి లేదా మీ సంఘం నుండి చేరినా, మీరు ఈ దైవిక స్తుతి సింఫనీలో భాగం కావచ్చు.",
            paragraph2: "దేశాలు మరియు తరాల అంతటా మన స్వరాలను ఏకం చేద్దాం. కలిసి, మనం ఎప్పటికీ ఆగని ధ్వనిని లేపుతాము — హల్లేల్ యొక్క ధ్వని, దావీదు గుడారం యొక్క హృదయాన్ని ప్రతిధ్వనిస్తూ.",
            highlight1: "దావీదు గుడారం"
        },
        callTo247: {
            title: "24×7 ఆరాధనకు పిలుపు",
            paragraph1: "హల్లేల్ ఆరాధన దినం యొక్క కల ఒకే రోజుకు మించినది — ఇది శాశ్వత ఆరాధన యొక్క జీవనశైలి మరియు ఉద్యమం వైపు సూచిస్తుంది. స్వర్గంలో ఆరాధన ఎప్పటికీ ఆగనట్లే, భూమిపై అదే లయను మోయడానికి మనం పిలవబడ్డాము.",
            paragraph2: "ఆరాధన 24×7 లేచినప్పుడు, వాతావరణం మారుతుంది. గొలుసులు విరుగుతాయి. జీవితాలు పునరుద్ధరించబడతాయి. దేవుని సన్నిధి భూమిని నింపుతుంది. ప్రతి పాట, ప్రతి ప్రార్థన, లొంగిపోయే ప్రతి క్షణం ఆ దైవిక పునరుద్ధరణకు దోహదం చేస్తుంది — ప్రతి నగరం స్తుతి ధ్వనితో ప్రతిధ్వనిస్తుంది వరకు."
        },
        finalCall: {
            title: "ధ్వనిలో భాగం కండి",
            paragraph1: "హల్లేల్ ఆరాధన దినం అనేది ఆరాధన మన ఆయుధం, మన భాష మరియు మన జీవితం అని ప్రవచన ప్రకటన. మనం గుమిగూడినప్పుడు, యేసు ప్రతి దేశంపై పరిపాలిస్తున్నాడని మరియు ఆయన మహిమ భూమిని నింపుతుందని ప్రకటిస్తాము.",
            paragraph2: "ఈ తరం యొక్క ఆరాధకుల మధ్య మన స్థానాన్ని తీసుకుందాం — దావీదు గుడారాన్ని పునర్నిర్మించడం, హల్లేల్ యొక్క జెండాను ఎత్తడం మరియు రాజు కోసం మార్గాన్ని సిద్ధం చేయడం.",
            quote1: "స్వర్గం యొక్క ధ్వని మళ్లీ వినబడే సమయం వచ్చింది — 24×7.",
            verse: "\"సూర్యోదయం నుండి అస్తమయం వరకు, ప్రభువు నామం స్తుతించబడాలి.\" — కీర్తన 113:3 ESV",
            button: "ఈరోజే ఉద్యమంలో చేరండి",
            highlight1: "దావీదు గుడారం"
        }
    },
    hallelConferencesPage: {
        title: "హల్లేల్ సమావేశాలు",
        tagline: "ఆరాధన, విశ్వాసం మరియు పరివర్తన యొక్క వేడుక",
        registerButton: "ఇప్పుడే నమోదు చేయండి",
        introduction: {
            paragraph1: "హల్లేల్ సమావేశం అనేది విశ్వాసులు, ఆరాధకులు, సంగీతకారులు మరియు అన్వేషకులను ఒకే హృదయంతో మరియు ఒకే ఆత్మతో కలిసి తీసుకురావడానికి రూపొందించబడిన ఒక ప్రత్యేకమైన సమావేశం. ఇది కేవలం ఒక కార్యక్రమం కంటే ఎక్కువ—ఇది ఆరాధన, పునరుద్ధరణ మరియు సంబంధం యొక్క పవిత్ర అనుభవం. \"హల్లేల్\" అనే పదానికి అర్థం \"స్తుతించడం,\" మరియు ఆ సరళమైన కానీ శక్తివంతమైన పదం ఈ ఉద్యమం యొక్క సారాంశాన్ని సంగ్రహిస్తుంది: దేవునికి ఆనందకరమైన మరియు హృదయపూర్వక స్తుతిలో ఏకం కావడానికి ప్రజలకు పిలుపు.",
            paragraph2: "ప్రతి హల్లేల్ సమావేశం జీవితాలను స్వస్థపరచడానికి, పునరుద్ధరించడానికి మరియు మార్చడానికి ఆరాధన యొక్క శక్తిని గురించిన అందమైన గుర్తుగా పనిచేస్తుంది. సంగీతం, ప్రార్థన మరియు ఆలోచన ద్వారా, పాల్గొనేవారు హృదయాలు పైకెత్తబడే, భారాలు విడుదల చేయబడే మరియు విశ్వాసం తిరిగి రగిలించబడే వాతావరణాన్ని ఎదుర్కొంటారు. ఇది దేవునికి సమీపంగా రావడానికి మరియు ఆయన సన్నిధిలో జీవించడం యొక్క ఆనందాన్ని తిరిగి కనుగొనడానికి ఒక సమయం."
        },
        heartOfHallel: {
            title: "హల్లేల్ సమావేశం యొక్క హృదయం",
            quote: "దేవునితో, ఇతరులతో మరియు ఒకరి స్వంత ఆధ్యాత్మిక ఉద్దేశ్యంతో ఎన్‌కౌంటర్.",
            paragraph1: "దాని ప్రధానంగా, హల్లేల్ సమావేశం ఎన్‌కౌంటర్ గురించి—దేవునితో, ఇతరులతో మరియు ఒకరి స్వంత ఆధ్యాత్మిక ఉద్దేశ్యంతో ఎన్‌కౌంటర్. ప్రతి సెషన్ పాల్గొనేవారిని చైతన్యవంతమైన ఆరాధన, అర్థవంతమైన సంభాషణలు మరియు ఆశ మరియు ప్రోత్సాహం యొక్క శక్తివంతమైన సందేశాల ద్వారా దేవునితో వారి సంబంధాన్ని లోతుగా చేసుకోవడానికి ప్రేరేపించడానికి జాగ్రత్తగా రూపొందించబడింది.",
            paragraph2: "ఉత్తేజకరమైన సంగీతం, ఉద్వేగభరితమైన స్తుతి మరియు అంతర్దృష్టిగల బోధన ద్వారా, సమావేశం ప్రజలు రోజువారీ జీవితం యొక్క శబ్దం నుండి విరామం తీసుకొని, నిజంగా ముఖ్యమైన వాటిపై దృష్టి పెట్టగల స్థలాన్ని సృష్టిస్తుంది. ఇది వినడానికి, నేర్చుకోవడానికి మరియు పరిశుద్ధాత్మ ప్రతి హృదయంలో స్వేచ్ఛగా కదలడానికి అనుమతించే సమయం."
        },
        whatMakesSpecial: {
            title: "హల్లేల్‌ను ప్రత్యేకంగా చేసేది",
            items: [
                {
                    title: "మార్చే ఆరాధన",
                    description: "హల్లేల్ సమావేశం దాని డైనమిక్ ఆరాధన సెషన్‌లకు ప్రసిద్ధి చెందింది, ఇక్కడ సంగీతం శ్రావ్యత కంటే ఎక్కువగా మారుతుంది—ఇది ఆత్మ యొక్క భాషగా మారుతుంది. పాటలు, సామరస్యాలు మరియు విశ్వాసం యొక్క హృదయపూర్వక వ్యక్తీకరణలు పాల్గొనేవారిని దేవునితో లోతైన సాన్నిధ్యంలోకి నడిపిస్తాయి. స్తుతిలో లేచిన ప్రతి స్వరం ఆనందం మరియు గౌరవంతో వాతావరణాన్ని నింపే శక్తివంతమైన సామూహిక ధ్వనికి జోడిస్తుంది."
                },
                {
                    title: "ప్రేరేపించే సందేశాలు",
                    description: "ఆలోచనాత్మక బోధనలు మరియు సాక్ష్యాలు దేవుని మార్పులేని ప్రేమ, కరుణ మరియు ఉద్దేశ్యాన్ని గుర్తు చేస్తాయి. హల్లేల్‌లో పంచుకున్న సందేశాలు పాల్గొనేవారికి వారి విశ్వాసాన్ని బలోపేతం చేయడానికి మరియు దానిని వారి రోజువారీ జీవితాల్లో ధైర్యంగా జీవించడానికి సవాలు చేస్తాయి మరియు ఉత్తేజపరుస్తాయి."
                },
                {
                    title: "కనెక్ట్ చేసే సంఘం",
                    description: "సమావేశం వివిధ నేపథ్యాలు మరియు సంప్రదాయాల నుండి వ్యక్తులను కలిసి తీసుకువస్తుంది, ఆరాధన యొక్క సాధారణ ఉద్దేశ్యం ద్వారా వారిని ఏకం చేస్తుంది. సంగీతం, సేవ మరియు ఆధ్యాత్మిక వృద్ధి పట్ల అభిరుచిని పంచుకునే ఇతరులతో కనెక్ట్ అవ్వడానికి ఇది ఒక స్థలం. చాలా మంది హాజరైనవారు ఈ సమావేశాల నుండి పుట్టిన జీవితకాల స్నేహాలు మరియు కొత్త సేవా భాగస్వామ్యాలను కనుగొంటారు."
                }
            ]
        },
        whyMatters: {
            title: "హల్లేల్ సమావేశం ఎందుకు ముఖ్యమైనది",
            point1: "పరధ్యానాలు, ఒత్తిళ్లు మరియు అనిశ్చితితో నిండిన ప్రపంచంలో, హల్లేల్ సమావేశం ఆత్మకు ఉజ్జాయింపు ఒయాసిస్‌గా పనిచేస్తుంది. మన హృదయాలను దేవునిపై మళ్లీ దృష్టి పెట్టడానికి మరియు ఆయన సన్నిధిలో మన ఆత్మలను పునరుద్ధరించడానికి సమయాన్ని కేటాయించడం యొక్క ప్రాముఖ్యతను ఇది మనకు గుర్తు చేస్తుంది.",
            point2: "ఇతరులతో కలిసి ఆరాధించే అనుభవం—వందలు లేదా వేలాది స్వరాలు స్తుతిలో ఏకం అయ్యాయి—చెందుతున్న మరియు ఉద్దేశ్యం యొక్క శక్తివంతమైన భావాన్ని సృష్టిస్తుంది. మనం మనకంటే గొప్పదైన దానిలో భాగమని ఇది మనకు గుర్తు చేస్తుంది: సృష్టికర్తకు తమ హృదయాలను పైకెత్తే విశ్వాసుల ప్రపంచ సంఘం.",
            quote: "చాలా మందికి, హల్లేల్ సమావేశం ఒక మలుపు పాయింట్‌గా మారుతుంది—విశ్వాసం తిరిగి రగిలించబడిన క్షణం, స్పష్టత దొరికినప్పుడు మరియు దేవుని కోసం జీవించే పిలుపు బలపడినప్పుడు. ఇది ఆరాధకులను స్తుతి యొక్క సందేశాన్ని సమావేశం దాటి, వారి ఇళ్లు, సమాజాలు మరియు రోజువారీ జీవితాల్లోకి తీసుకెళ్ళడానికి ప్రేరేపిస్తుంది."
        },
        movementOfPraise: {
            title: "స్తుతి మరియు పునరుద్ధరణ యొక్క ఉద్యమం",
            intro: "హల్లేల్ సమావేశం ఒక ప్రదేశానికి లేదా సమయానికి పరిమితం కాదు—ప్రజలు ఆరాధించడానికి కలిసి వచ్చిన చోట వ్యాప్తి చెందుతున్న ఆత్మ యొక్క ఉద్యమం. ప్రతి సమావేశం ఒకే హృదయ స్పందనను కలిగి ఉంటుంది: దేవుణ్ణి మహిమపరచడం, విశ్వాసాన్ని బలోపేతం చేయడం మరియు పరివర్తనను ప్రేరేపించడం.",
            bullets: [
                "జీవన విధానంగా ఆరాధన",
                "కృతజ్ఞత, స్తుతి మరియు ఉద్దేశ్యంతో నిండిన హృదయాలు",
                "గొలుసులను విరగగొట్టడానికి మరియు స్వస్థత తీసుకురావడానికి శక్తి"
            ],
            quote1: "హల్లేల్ యొక్క శక్తి దాని సరళతలో ఉంది—దేవునికి స్తుతి ఇచ్చే చర్య. అయినప్పటికీ ఆ సరళతలో లోతైన ఆధ్యాత్మిక బలం ఉంది.",
            quote2: "స్తుతికి గొలుసులను విరగగొట్టడానికి, స్వస్థత తీసుకురావడానికి మరియు జీవితాలను శాంతి మరియు ఆశతో నింపడానికి శక్తి ఉంది. ప్రజలు ఆరాధనలో ఏకం అయినప్పుడు, అద్భుతాలు జరుగుతాయి—కేవలం బాహ్యంగా మాత్రమే కాదు, హృదయంలో కూడా."
        },
        callToAction: {
            title: "హల్లేల్ యొక్క పిలుపు",
            actions: [
                "మీ హృదయాన్ని తెరవండి",
                "మీ స్వరాన్ని పైకెత్తండి",
                "పరివర్తనను అనుభవించండి"
            ],
            paragraph1: "హల్లేల్ సమావేశం ప్రతి ఒక్కరినీ—విశ్వాసులు, సంగీతకారులు, కలలు కనేవారు మరియు అన్వేషకులు—వచ్చి సామూహిక ఆరాధన యొక్క అందాన్ని అనుభవించమని ఆహ్వానిస్తుంది.",
            paragraph2: "ఆరాధన ఒక ప్రదర్శన కాదు కానీ ఒక సంబంధం అని ఇది గుర్తుచేస్తుంది; కేవలం ఒక పాట కాదు, కానీ సృష్టికర్త మరియు ఆయన ప్రజల మధ్య సంభాషణ. స్తుతి యొక్క ప్రతి క్షణంలో, మనం దైవానికి దగ్గరగా చేరుకుంటాము, మరియు ఆ దగ్గరలో, మనం స్వస్థత, ఆనందం మరియు పునరుద్ధరణను కనుగొంటాము.",
            button: "తదుపరి సమావేశంలో చేరండి"
        }
    },
    hallelBibleSchoolPage: {
        title: "హల్లేల్ బైబిల్ స్కూల్",
        tagline: "హృదయాలను సన్నద్ధం చేయడం. జీవితాలను మార్చడం. ప్రపంచాన్ని ప్రభావితం చేయడం.",
        heroDescription: "హల్లేల్ బైబిల్ స్కూల్ ఆధ్యాత్మిక వృద్ధి మరియు నాయకత్వ అభివృద్ధికి ఒక చైతన్యవంతమైన కేంద్రం, ఒక సరళమైన కానీ శక్తివంతమైన మిషన్‌పై స్థాపించబడింది — వాక్యాన్ని తెలిసిన, విశ్వాసంలో నడిచే మరియు ప్రేమతో సేవ చేసే విశ్వాసుల తరాన్ని పెంపొందించడం. హల్లేల్ ఉద్యమాన్ని నిర్వచించే ఆరాధన యొక్క ఆత్మలో పాతుకుపోయింది, ఈ పాఠశాల విద్యార్థులు దేవునితో వారి సంబంధాన్ని లోతుగా చేసుకోవడానికి మరియు వారి దైవిక పిలుపును కనుగొనడంలో సహాయపడటానికి ఉనికిలో ఉంది.",
        vision: {
            title: "మా దృష్టి",
            content: "హల్లేల్ బైబిల్ స్కూల్ యొక్క దృష్టి విశ్వాసులు దేవుని వాక్యంలో బలపడటం మరియు విశ్వాసంతో మరియు ఉద్దేశ్యంతో తమ విశ్వాసాన్ని జీవించడానికి సన్నద్ధం చేయబడడం. ఇది ఆరాధకులు, నాయకులు మరియు క్రీస్తు యొక్క సేవకులను శిక్షణ ఇవ్వడానికి ప్రయత్నిస్తుంది, వారు సత్యం, కరుణ మరియు సమగ్రత ద్వారా వారి సమాజాలను మరియు ప్రపంచాన్ని ప్రభావితం చేస్తారు."
        },
        mission: {
            title: "మా మిషన్",
            intro: "హల్లేల్ బైబిల్ స్కూల్‌లో, మేము ఈ విధంగా కట్టుబడి ఉన్నాము:",
            points: [
                "విద్యార్థులకు బలమైన బైబిల్ పునాదిని నిర్మించడంలో సహాయపడుతూ, స్పష్టత మరియు లోతుతో దేవుని వాక్యాన్ని బోధించడం.",
                "శిష్యత్వం, మార్గదర్శకత్వం మరియు ఆచరణాత్మక సేవా అనుభవం ద్వారా పాత్ర మరియు నాయకత్వాన్ని అభివృద్ధి చేయడం.",
                "నిరంతర స్తుతి మరియు కృతజ్ఞత యొక్క జీవితాన్ని జీవించడానికి విద్యార్థులను ప్రోత్సహిస్తూ, ఆరాధన యొక్క హృదయాన్ని పెంపొందించడం.",
                "సువార్తను పంచుకోవడానికి మరియు ప్రేమలో ఇతరుల అవసరాలను తీర్చడానికి వారిని సిద్ధం చేస్తూ, విశ్వాసులను సేవ కోసం శక్తివంతం చేయడం."
            ],
            pointTitles: [
                "దేవుని వాక్యాన్ని బోధించడం",
                "పాత్ర మరియు నాయకత్వాన్ని అభివృద్ధి చేయడం",
                "ఆరాధన యొక్క హృదయాన్ని పెంపొందించడం",
                "విశ్వాసులను సేవ కోసం శక్తివంతం చేయడం"
            ]
        },
        unique: {
            title: "హల్లేల్ బైబిల్ స్కూల్‌ను ప్రత్యేకంగా చేసేది",
            items: [
                {
                    title: "వాక్య-ఆధారిత అభ్యాసం",
                    description: "ప్రతి కోర్సు మరియు సెషన్ లేఖనాలపై కేంద్రీకృతమై ఉంటుంది. విద్యార్థులు బైబిల్‌ను కేవలం అధ్యయనం చేయవలసిన గ్రంథంగా మాత్రమే కాకుండా, జీవితాలను మార్చే జీవంత సందేశంగా అన్వేషిస్తారు."
                },
                {
                    title: "ఆత్మ-నడిపించబడిన ఏర్పాటు",
                    description: "విద్యాసంబంధమైన శ్రేష్ఠతతో పాటు, పాఠశాల ఆధ్యాత్మిక వృద్ధిని నొక్కి చెబుతుంది. ఆరాధన, ప్రార్థన మరియు వ్యక్తిగత ఆలోచన రోజువారీ జీవితంలో అల్లబడి ఉంటాయి, విద్యార్థులు దేవుణ్ణి లోతుగా మరియు వ్యక్తిగతంగా ఎదుర్కొనే వాతావరణాన్ని సృష్టిస్తుంది."
                },
                {
                    title: "ఆచరణాత్మక సేవా శిక్షణ",
                    description: "హల్లేల్ బైబిల్ స్కూల్ నేర్చుకోవడం చర్యకు దారితీయాలని నమ్ముతుంది. విద్యార్థులు బయటకు చేరుకోవడం, ఆరాధన సేవ, సంఘ సేవ మరియు నాయకత్వ అవకాశాల ద్వారా ప్రత్యక్ష అనుభవాన్ని పొందుతారు, ఇది వారిని వాస్తవ-ప్రపంచ ప్రభావానికి సిద్ధం చేస్తుంది."
                },
                {
                    title: "ఆరాధకుల సంఘం",
                    description: "హల్లేల్ అంటే స్తుతి-మరియు అది పాఠశాల యొక్క హృదయ స్పందన. ప్రతి విద్యార్థి తరగతి గది దాటి జీవితంలోని ప్రతి అంశంలోకి విస్తరించే ఆరాధన యొక్క జీవనశైలిని పెంపొందించుకోవడానికి ప్రోత్సహించబడతారు.",
                    highlight: "స్తుతి"
                }
            ]
        },
        courses: {
            title: "కోర్సులు మరియు కార్యక్రమాలు",
            intro: "హల్లేల్ బైబిల్ స్కూల్ వారి ప్రయాణంలోని వివిధ దశల్లో ఉన్న విశ్వాసుల కోసం రూపొందించబడిన కార్యక్రమాల శ్రేణిని అందిస్తుంది.",
            programs: [
                {
                    title: "బైబిల్ అధ్యయనాలలో పునాదులు",
                    description: "లేఖనాలు మరియు ముఖ్యమైన క్రైస్తవ సిద్ధాంతాలను అర్థం చేసుకోవడం."
                },
                {
                    title: "శిష్యత్వం మరియు ఆధ్యాత్మిక వృద్ధి",
                    description: "వ్యక్తిగత భక్తి మరియు పాత్రను అభివృద్ధి చేయడం."
                },
                {
                    title: "ఆరాధన మరియు సేవా నాయకత్వం",
                    description: "ఆరాధన లేదా చర్చి నాయకత్వంలో సేవ చేయడానికి పిలవబడిన వారికి శిక్షణ."
                },
                {
                    title: "మిషన్లు మరియు సువార్త ప్రచారం",
                    description: "విశ్వాసులను చేరుకోవడానికి మరియు ఆశ యొక్క సందేశాన్ని పంచుకోవడానికి సన్నద్ధం చేయడం."
                }
            ],
            closing: "ప్రతి కార్యక్రమం బోధన, మార్గదర్శకత్వం మరియు ఆచరణాత్మక అనువర్తనాన్ని మిళితం చేస్తుంది, ఆధ్యాత్మిక ఏర్పాటుకు సమగ్ర విధానాన్ని నిర్ధారిస్తుంది."
        },
        impact: {
            title: "మా ప్రభావం",
            paragraph1: "హల్లేల్ బైబిల్ స్కూల్ పట్టభద్రులు ప్రపంచవ్యాప్తంగా చర్చిలు, సేవలు మరియు సమాజాలలో సేవ చేయడానికి వెళ్తారు. వారు ఆరాధన నాయకులు, పాస్టర్లు, ఉపాధ్యాయులు, మిషనరీలు మరియు వారు వెళ్ళిన చోట క్రీస్తు యొక్క వెలుగును మోసే అంకితభావం ఉన్న సామాన్యులు అవుతారు.",
            paragraph2: "దేవుని వాక్యం యొక్క శక్తి మరియు పరిశుద్ధాత్మ యొక్క సన్నిధి ద్వారా, హల్లేల్ బైబిల్ స్కూల్ క్రీస్తు ప్రేమ మరియు సత్యాన్ని ప్రతిబింబించే జీవితాలను రూపొందించడం కొనసాగిస్తోంది."
        },
        callToAction: {
            title: "హల్లేల్ ప్రయాణంలో చేరండి",
            description: "హల్లేల్ బైబిల్ స్కూల్ కేవలం అధ్యయనం చేసే ప్రదేశం మాత్రమే కాదు—ఇది దేవుణ్ణి ఎదుర్కొనే, విశ్వాసంలో పెరిగే మరియు మీ జీవిత పిలుపు కోసం సన్నద్ధం చేయబడే ప్రదేశం. మీరు బైబిల్ యొక్క లోతైన జ్ఞానాన్ని కోరుకుంటున్నా, సేవ కోసం శిక్షణ పొందుతున్నా లేదా కేవలం దేవుని పట్ల నూతన అభిరుచిని కోరుకుంటున్నా, హల్లేల్ బైబిల్ స్కూల్ మిమ్మల్ని స్వాగతిస్తుంది.",
            closing: "కలిసి, మనం నేర్చుకుంటాము. కలిసి, మనం ఆరాధిస్తాము. కలిసి, మనం హల్లేల్‌ను జీవిస్తాము -ప్రపంచాన్ని మార్చే స్తుతి.",
            closingHighlight: "హల్లేల్",
            button: "ఇప్పుడే దరఖాస్తు చేయండి",
            verse: "\"క్రీస్తు వాక్యము మీలో సమృద్ధిగా నివసించనిమ్ము… కీర్తనలు, స్తోత్రములు, ఆత్మీయ గీతములు పాడుచు, దేవుని యెడల కృతజ్ఞతాపూర్వక హృదయముతో…\" – కొలొస్సీయులకు 3:16 ESV"
        }
    },
    hallelMusicSchoolPage: {
        title: "హల్లేల్ మ్యూజిక్ స్కూల్",
        tagline: "ప్రతి ఇంటిని సంగీత బహుమతితో శక్తివంతం చేయడం",
        youtubeAriaLabel: "హల్లేల్ మ్యూజిక్ స్కూల్ యూట్యూబ్ ఛానెల్‌ను సందర్శించండి",
        introduction: "యేషువా బెత్ హల్లేల్ మినిస్ట్రీస్‌లో, ఆరాధన మరియు సంగీతం దేవుని పట్ల మన ప్రేమ యొక్క విడదీయలేని వ్యక్తీకరణలు అని మేము నమ్ముతున్నాము. ఆరాధనను శక్తివంతం చేయడం మరియు జీవితాలను మార్చడం అనే మా దృష్టికి అనుగుణంగా, మా అత్యంత ప్రేరణాత్మక కార్యక్రమాలలో ఒకటి — హల్లేల్ మ్యూజిక్ స్కూల్‌ను గర్వంగా పరిచయం చేస్తున్నాము.",
        ourMission: {
            title: "మా మిషన్",
            paragraph1: "హల్లేల్ మ్యూజిక్ స్కూల్ యొక్క మిషన్ సరళమైనది కానీ లోతైనది: ప్రతి ఇంటిని సంగీత బహుమతితో శక్తివంతం చేయడం.",
            paragraph2: "సంగీతం కేవలం ఒక కళ మాత్రమే కాదు—ఇది పదాలను అధిగమించి దేవుని హృదయాన్ని తాకే దైవిక భాష అని మేము నమ్ముతున్నాము. ఈ కార్యక్రమం ద్వారా, సంగీతాన్ని స్తుతి, స్వస్థత మరియు దైవంతో సంబంధం యొక్క పాత్రగా ఉపయోగించే ఆరాధకుల తరాన్ని పెంపొందించడానికి మేము ప్రయత్నిస్తున్నాము."
        },
        ourPurpose: {
            title: "మా ఉద్దేశ్యం",
            intro: "కుటుంబాలు మరియు సమాజాలలో సంగీత ప్రతిభను పెంపొందించడానికి హల్లేల్ మ్యూజిక్ స్కూల్ స్థాపించబడింది. మా లక్ష్యం ప్రతి ఇంటిలో తన స్వంత సంగీతకారులను అభివృద్ధి చేయడంలో సహాయపడటం—శ్రావ్యత మరియు సామరస్యం యొక్క బహుమతి ద్వారా నడిపించగల, ప్రేరేపించగల మరియు ఆధ్యాత్మిక వాతావరణాన్ని పెంచగల వ్యక్తులు.",
            visionIntro: "మేము ఊహించే ప్రపంచం:",
            points: [
                "ప్రతి ఇల్లు ఆరాధన యొక్క పుణ్యక్షేత్రంగా మారుతుంది, స్తుతి మరియు కృతజ్ఞతా గీతాలతో నిండి ఉంటుంది.",
                "ప్రతి హృదయం స్వర్గంతో లయబద్ధంగా కొట్టుకుంటుంది, సంగీతం ద్వారా భక్తిని వ్యక్తం చేస్తుంది.",
                "నైపుణ్యం మరియు చిత్తశుద్ధితో ఇతరులను దేవుని సన్నిధిలోకి నడిపించే శిక్షణ పొందిన ఆరాధకులతో ప్రతి చర్చి సుసంపన్నం అవుతుంది."
            ]
        },
        ourApproach: {
            title: "మా విధానం",
            intro: "హల్లేల్ మ్యూజిక్ స్కూల్‌లో, మేము సాంకేతికత మరియు సిద్ధాంతాన్ని దాటి విశ్వాస-ఆధారిత సంగీత విద్యను అందిస్తాము. మేము ఆరాధకుడి హృదయాన్ని పెంపొందించడంపై దృష్టి పెడుతాము—విద్యార్థులకు కేవలం నైపుణ్యంతో మాత్రమే కాకుండా, ఆత్మతో వాయించడానికి మరియు పాడటానికి శిక్షణ ఇవ్వడం. మా కార్యక్రమాలలో ఇవి ఉన్నాయి:",
            points: [
                "అన్ని వయస్సులు మరియు నైపుణ్య స్థాయిలకు అనుగుణంగా వాద్య మరియు స్వర శిక్షణ.",
                "సంగీతం ద్వారా ఆరాధన యొక్క ఉద్దేశ్యం మరియు శక్తిపై బైబిల్ ఆధారిత బోధన.",
                "అనుభవజ్ఞులైన ఆరాధన నాయకులు మరియు సంగీతకారుల నేతృత్వంలో వర్క్‌షాప్‌లు మరియు మార్గదర్శకత్వ కార్యక్రమాలు.",
                "ఆరాధన సమావేశాలు మరియు సేవా కార్యక్రమాలలో సేవ చేసే అవకాశాలు, విద్యార్థులు తమ నేర్చుకున్నదాన్ని ఆచరణలో పెట్టడానికి అనుమతిస్తాయి."
            ]
        },
        ourVisionForImpact: {
            title: "ప్రభావం కోసం మా దృష్టి",
            content: "సంగీతం ఒక ఇంటిని నింపినప్పుడు, ఆరాధన వాతావరణాన్ని నింపుతుందని మేము నమ్ముతున్నాము. కలిసి నేర్చుకునే మరియు వాయించే కుటుంబాలు విశ్వాసం మరియు ఐక్యతలో బలపడతాయి. హల్లేల్ మ్యూజిక్ స్కూల్ ద్వారా, మేము కేవలం స్వరాలు మరియు స్కేల్స్ బోధించడం మాత్రమే కాదు—మేము ఆరాధకులను నిర్మిస్తున్నాము, ప్రతి పాటలో మరియు ప్రతి ధ్వనిలో దేవుణ్ణి మహిమపరచాలని కోరే హృదయాలను పెంపొందిస్తున్నాము."
        },
        joinTheMovement: {
            title: "ఉద్యమంలో చేరండి",
            intro: "ఆరాధన, విశ్వాసం మరియు పరివర్తన యొక్క ఈ అద్భుతమైన ప్రయాణంలో భాగం అవ్వండి. కలిసి, మనం ఒక ప్రపంచాన్ని సృష్టించగలము:",
            points: [
                "ప్రతి ఆత్మ ఆరాధకుడు,",
                "ప్రతి ఇల్లు పుణ్యక్షేత్రం, మరియు",
                "ప్రతి చర్చి నిజమైన భక్తి యొక్క దీపస్తంభం."
            ],
            closing: "యేషువా బెత్ హల్లేల్ మినిస్ట్రీస్‌లో, మా హృదయం ఒక ఉద్దేశ్యం కోసం కొట్టుకుంటుంది—సంగీతం యొక్క దైవిక బహుమతి ద్వారా ఆరాధనను శక్తివంతం చేయడం మరియు జీవితాలను మార్చడం."
        },
        registration: {
            title: "నమోదు చేసుకోవడానికి లింక్",
            onlineStudent: "ఆన్‌లైన్ విద్యార్థి?",
            lmsStudent: "LMS విద్యార్థి?",
            guinnessAttempt: "గిన్నిస్ వరల్డ్ రికార్డ్స్ ప్రయత్నం - 2"
        }
    },
    hmsPage: {
        hero: {
            title: "హల్లేల్ మ్యూజిక్ స్కూల్",
            tagline: "ఆరాధనను శక్తివంతం చేయడం, జీవితాలను మార్చడం",
            description: "యేషువా బెత్ హల్లేల్ మినిస్ట్రీస్‌లో, ఆరాధన మరియు సంగీతం దేవుని పట్ల మన ప్రేమ యొక్క విడదీయలేని వ్యక్తీకరణలు అని మేము నమ్ముతున్నాము. ఆరాధనను శక్తివంతం చేయడం మరియు జీవితాలను మార్చడం అనే మా దృష్టికి అనుగుణంగా, మా అత్యంత ప్రేరణాత్మక కార్యక్రమాలలో ఒకదాన్ని గర్వంగా పరిచయం చేస్తున్నాము. ఆరాధన, విశ్వాసం మరియు పరివర్తన యొక్క ఈ అద్భుతమైన ప్రయాణంలో మాతో చేరండి.",
            joinButton: "మా స్కూల్‌లో చేరండి",
            exploreButton: "కార్యక్రమాలను అన్వేషించండి",
            subscribeButton: "సబ్‌స్క్రైబ్ చేయండి"
        },
        mission: {
            title: "మా మిషన్",
            subtitle: "హల్లేల్ మ్యూజిక్ స్కూల్ యొక్క మిషన్ సరళమైనది కానీ లోతైనది: ప్రతి ఇంటిని సంగీత బహుమతితో శక్తివంతం చేయడం.",
            description: "సంగీతం కేవలం ఒక కళ మాత్రమే కాదు—ఇది పదాలను అధిగమించి దేవుని హృదయాన్ని తాకే దైవిక భాష అని మేము నమ్ముతున్నాము. ఈ కార్యక్రమం ద్వారా, సంగీతాన్ని స్తుతి, స్వస్థత మరియు దైవంతో సంబంధం యొక్క పాత్రగా ఉపయోగించే ఆరాధకుల తరాన్ని పెంపొందించడానికి మేము ప్రయత్నిస్తున్నాము."
        },
        purpose: {
            title: "మా ఉద్దేశ్యం",
            description: "కుటుంబాలు మరియు సమాజాలలో సంగీత ప్రతిభను పెంపొందించడానికి హల్లేల్ మ్యూజిక్ స్కూల్ స్థాపించబడింది. మా లక్ష్యం ప్రతి ఇంటిలో తన స్వంత సంగీతకారులను అభివృద్ధి చేయడంలో సహాయపడటం—శ్రావ్యత మరియు సామరస్యం యొక్క బహుమతి ద్వారా నడిపించగల, ప్రేరేపించగల మరియు ఆధ్యాత్మిక వాతావరణాన్ని పెంచగల వ్యక్తులు.",
            cards: {
                sanctuary: {
                    title: "ప్రతి ఇల్లు పుణ్యక్షేత్రం",
                    description: "ప్రతి ఇల్లు ఆరాధన యొక్క పుణ్యక్షేత్రంగా మారుతుంది, స్తుతి మరియు కృతజ్ఞతా గీతాలతో నిండి ఉంటుంది."
                },
                rhythm: {
                    title: "ప్రతి హృదయం లయబద్ధంగా",
                    description: "ప్రతి హృదయం స్వర్గంతో లయబద్ధంగా కొట్టుకుంటుంది, సంగీతం ద్వారా భక్తిని వ్యక్తం చేస్తుంది."
                },
                church: {
                    title: "ప్రతి చర్చి సుసంపన్నం",
                    description: "నైపుణ్యం మరియు చిత్తశుద్ధితో ఇతరులను దేవుని సన్నిధిలోకి నడిపించే శిక్షణ పొందిన ఆరాధకులతో ప్రతి చర్చి సుసంపన్నం అవుతుంది."
                }
            }
        },
        approach: {
            title: "మా విధానం",
            description: "హల్లేల్ మ్యూజిక్ స్కూల్‌లో, మేము సాంకేతికత మరియు సిద్ధాంతాన్ని దాటి విశ్వాస-ఆధారిత సంగీత విద్యను అందిస్తాము. మేము ఆరాధకుడి హృదయాన్ని పెంపొందించడంపై దృష్టి పెడుతాము—విద్యార్థులకు కేవలం నైపుణ్యంతో మాత్రమే కాకుండా, ఆత్మతో వాయించడానికి మరియు పాడటానికి శిక్షణ ఇవ్వడం.",
            items: {
                training: {
                    title: "వాద్య & స్వర శిక్షణ",
                    description: "ప్రారంభకుల నుండి ఆధునిక సంగీతకారుల వరకు అన్ని వయస్సులు మరియు నైపుణ్య స్థాయిలకు అనుగుణంగా సమగ్ర శిక్షణ."
                },
                biblical: {
                    title: "బైబిల్ బోధన",
                    description: "సంగీతం ద్వారా ఆరాధన యొక్క ఉద్దేశ్యం మరియు శక్తిపై బైబిల్ ఆధారిత బోధన."
                },
                workshops: {
                    title: "వర్క్‌షాప్‌లు & మార్గదర్శకత్వం",
                    description: "అనుభవజ్ఞులైన ఆరాధన నాయకులు మరియు సంగీతకారుల నేతృత్వంలో వర్క్‌షాప్‌లు మరియు మార్గదర్శకత్వ కార్యక్రమాలు."
                },
                practical: {
                    title: "ఆచరణాత్మక అనుభవం",
                    description: "ఆరాధన సమావేశాలు మరియు సేవా కార్యక్రమాలలో సేవ చేసే అవకాశాలు, విద్యార్థులు తమ నేర్చుకున్నదాన్ని ఆచరణలో పెట్టడానికి అనుమతిస్తాయి."
                }
            }
        },
        vision: {
            title: "ప్రభావం కోసం మా దృష్టి",
            description: "సంగీతం ఒక ఇంటిని నింపినప్పుడు, ఆరాధన వాతావరణాన్ని నింపుతుందని మేము నమ్ముతున్నాము. కలిసి నేర్చుకునే మరియు వాయించే కుటుంబాలు విశ్వాసం మరియు ఐక్యతలో బలపడతాయి. హల్లేల్ మ్యూజిక్ స్కూల్ ద్వారా, మేము కేవలం స్వరాలు మరియు స్కేల్స్ బోధించడం మాత్రమే కాదు—మేము ఆరాధకులను నిర్మిస్తున్నాము, ప్రతి పాటలో మరియు ప్రతి ధ్వనిలో దేవుణ్ణి మహిమపరచాలని కోరే హృదయాలను పెంపొందిస్తున్నాము.",
            statements: {
                soul: "ప్రతి ఆత్మ ఆరాధకుడు",
                home: "ప్రతి ఇల్లు పుణ్యక్షేత్రం",
                church: "ప్రతి చర్చి నిజమైన భక్తి యొక్క దీపస్తంభం"
            }
        },
        join: {
            title: "ఉద్యమంలో చేరండి",
            description: "ఆరాధన, విశ్వాసం మరియు పరివర్తన యొక్క ఈ అద్భుతమైన ప్రయాణంలో భాగం అవ్వండి. యేషువా బెత్ హల్లేల్ మినిస్ట్రీస్‌లో, మా హృదయం ఒక ఉద్దేశ్యం కోసం కొట్టుకుంటుంది—సంగీతం యొక్క దైవిక బహుమతి ద్వారా ఆరాధనను శక్తివంతం చేయడం మరియు జీవితాలను మార్చడం.",
            online: {
                title: "ఆన్‌లైన్ విద్యార్థి",
                description: "మా సమగ్ర ఆన్‌లైన్ సంగీత విద్యా కార్యక్రమంతో ప్రపంచంలో ఎక్కడి నుండైనా నేర్చుకోండి. రద్దీగా ఉండే షెడ్యూల్స్ ఉన్న వారికి లేదా మా భౌతిక స్థానం నుండి దూరంగా నివసించే వారికి సరైనది.",
                button: "ఇప్పుడు నమోదు చేయండి"
            },
            lms: {
                title: "LMS విద్యార్థి",
                description: "నిర్మాణాత్మక పాఠ్యప్రణాళిక, పురోగతి ట్రాకింగ్, ఇంటరాక్టివ్ పాఠాలు మరియు మా అనుభవజ్ఞులైన బోధకుల నుండి వ్యక్తిగత అభిప్రాయంతో సమగ్ర సంగీత సంజ్ఞామానం శిక్షణ కోసం మా లండన్ మ్యూజిక్ స్కూల్ (LMS)లో చేరండి.",
                button: "ఇప్పుడు నమోదు చేయండి"
            },
            guinness: {
                title: "గిన్నిస్ వరల్డ్ రికార్డ్స్ ప్రయత్నం - 2",
                description: "చరిత్రలో భాగం అవ్వండి! సంగీతంలో గిన్నిస్ వరల్డ్ రికార్డ్ను బద్దలు కొట్టడానికి మా రెండవ ప్రయత్నంలో చేరండి. మరిన్ని వివరాలు త్వరలో వస్తాయి.",
                button: "మరింత తెలుసుకోండి"
            }
        }
    },
    common: {
        enrollNow: "ఇప్పుడు నమోదు చేయండి",
        register: "నమోదు చేయండి",
        getInvolved: "పాల్గొనండి",
        contactUs: "మమ్మల్ని సంప్రదించండి",
        upcomingEvents: "రాబోయే ఈవెంట్స్",
        gallery: "గ్యాలరీ",
        testimonials: "సాక్ష్యాలు",
        schedule: "షెడ్యూల్",
        curriculum: "పాఠ్యప్రణాళిక",
        faculty: "అధ్యాపకులు",
        admissions: "ప్రవేశాలు"
    },
    hallelChurchPage: {
        title: "హల్లేల్ చర్చి",
        tagline: "ఆరాధన మరియు సహవాసం యొక్క సమాజం",
        comingSoon: {
            title: "త్వరలో వస్తోంది",
            message: "మేము మీకు అద్భుతమైన అనుభవాన్ని అందించడానికి కృషి చేస్తున్నాము. నవీకరణల కోసం వేచి ఉండండి!"
        }
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/i18n/locales/en/gallery.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const __TURBOPACK__default__export__ = {
    title: "Gallery",
    subtitle: "Moments of worship, training, and community captured through images and videos",
    tabs: {
        "guinness-events": {
            label: "Guinness - 1",
            title: "Guinness World Records Event - 1"
        },
        "asian-records": {
            label: "Asian Book",
            title: "Asian Book of Records"
        },
        "ingenious-record": {
            label: "Ingenious Charm",
            title: "Ingenious Charm World Record"
        },
        "international-star-records": {
            label: "International Star Book",
            title: "International Star Book of Records"
        },
        "hallel-conferences": {
            label: "Hallel Conferences",
            title: "Hallel Conferences"
        },
        "lcm-events": {
            label: "LCM",
            title: "LCM Events"
        },
        "anniversary": {
            label: "Anniversary (HMS)",
            title: "Anniversary (HMS)"
        },
        "kids-training": {
            label: "Kids Training",
            title: "Kids Summer Training"
        }
    },
    loadMore: "Load More",
    videoGallery: "Video Gallery",
    loadMoreVideos: "Load More Videos",
    videos: {
        title: "Videos",
        noVideos: "No videos available",
        playVideo: "Play video"
    },
    filters: {
        all: "All",
        events: "Events",
        training: "Training",
        worship: "Worship",
        community: "Community"
    },
    noImages: "No images found",
    loading: "Loading..."
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/i18n/locales/te/gallery.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const __TURBOPACK__default__export__ = {
    title: "గ్యాలరీ",
    subtitle: "చిత్రాలు మరియు వీడియోల ద్వారా బంధించిన ఆరాధన, శిక్షణ మరియు సమాజ క్షణాలు",
    tabs: {
        "guinness-events": {
            label: "గిన్నిస్ - 1",
            title: "గిన్నిస్ వరల్డ్ రికార్డ్స్ ఈవెంట్ - 1"
        },
        "asian-records": {
            label: "ఆసియన్ బుక్",
            title: "ఆసియన్ బుక్ ఆఫ్ రికార్డ్స్"
        },
        "ingenious-record": {
            label: "ఇంజినియస్ చార్మ్",
            title: "ఇంజినియస్ చార్మ్ వరల్డ్ రికార్డ్"
        },
        "international-star-records": {
            label: "ఇంటర్నేషనల్ స్టార్ బుక్",
            title: "ఇంటర్నేషనల్ స్టార్ బుక్ ఆఫ్ రికార్డ్స్"
        },
        "hallel-conferences": {
            label: "హల్లేల్ కాన్ఫరెన్స్‌లు",
            title: "హల్లేల్ కాన్ఫరెన్స్‌లు"
        },
        "lcm-events": {
            label: "LCM",
            title: "LCM ఈవెంట్స్"
        },
        "anniversary": {
            label: "వార్షికోత్సవం (HMS)",
            title: "వార్షికోత్సవం (HMS)"
        },
        "kids-training": {
            label: "పిల్లల శిక్షణ",
            title: "పిల్లల వేసవి శిక్షణ"
        }
    },
    loadMore: "మరిన్ని లోడ్ చేయండి",
    videoGallery: "వీడియో గ్యాలరీ",
    loadMoreVideos: "మరిన్ని వీడియోలు లోడ్ చేయండి",
    videos: {
        title: "వీడియోలు",
        noVideos: "వీడియోలు అందుబాటులో లేవు",
        playVideo: "వీడియో ప్లే చేయండి"
    },
    filters: {
        all: "అన్ని",
        events: "ఈవెంట్స్",
        training: "శిక్షణ",
        worship: "ఆరాధన",
        community: "సమాజం"
    },
    noImages: "చిత్రాలు కనుగొనబడలేదు",
    loading: "లోడ్ అవుతోంది..."
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/i18n/locales/en/resources.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const __TURBOPACK__default__export__ = {
    title: "Resources",
    subtitle: "Explore our library of worship music, teachings, and study materials",
    tabs: {
        books: "Books",
        worship: "Worship",
        sermons: "Sermons",
        bibleStudies: "Bible Studies"
    },
    buttons: {
        details: "Details",
        addToCart: "Add to Cart",
        backToBooks: "Back to Books",
        watchOnYoutube: "Watch on YouTube",
        viewMore: "View More",
        showLess: "Show Less",
        checkout: "Proceed to Checkout",
        continueShopping: "Continue Shopping",
        loadMore: "Load More..."
    },
    books: {
        title: "Music Books",
        description: "Download or purchase our collection of worship music books",
        author: "Author",
        pages: "Pages",
        price: "Price",
        language: "Language",
        publishDate: "Publish Date",
        preview: "Preview",
        outOfStock: "Out of Stock",
        fullDescription: "Full Description",
        additionalInfo: "Additional Information",
        by: "by",
        descriptionLabel: "Description",
        detailsLabel: "Details",
        languageLabel: "Language",
        pagesLabel: "Pages",
        publishedLabel: "Published"
    },
    worship: {
        title: "Worship Songs",
        description: "Listen to our collection of worship songs",
        artist: "Artist",
        duration: "Duration",
        uploaded: "Uploaded",
        play: "Play",
        download: "Download",
        lyrics: "Lyrics",
        chords: "Chords",
        latestFirst: "Latest First"
    },
    sermons: {
        title: "Sermons",
        description: "Watch and learn from our sermon library",
        speaker: "Speaker",
        duration: "Duration",
        date: "Date",
        watch: "Watch",
        listen: "Listen",
        notes: "Sermon Notes"
    },
    bibleStudies: {
        title: "Bible Studies",
        description: "Deepen your faith with our Bible study resources",
        author: "Author",
        pages: "Pages",
        date: "Date",
        fileType: "File Type",
        read: "Read",
        download: "Download",
        studyGuide: "Study Guide",
        lessons: "Lessons"
    },
    cart: {
        title: "Your Cart",
        items: "Items",
        item: "Item",
        quantity: "Quantity",
        subtotal: "Subtotal",
        total: "Total",
        checkout: "Checkout",
        empty: "Your cart is empty.",
        emptyDescription: "Add some books to your cart to get started!",
        remove: "Remove",
        continueShopping: "Continue Shopping"
    },
    filters: {
        all: "All",
        recent: "Recently Added",
        popular: "Most Popular",
        free: "Free",
        paid: "Paid"
    },
    search: {
        placeholder: "Search resources...",
        noResults: "No resources found matching your search"
    },
    currency: "₹",
    min: "min"
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/i18n/locales/te/resources.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const __TURBOPACK__default__export__ = {
    title: "వనరులు",
    subtitle: "ఆరాధన సంగీతం, బోధనలు మరియు అధ్యయన సామగ్రి యొక్క మా లైబ్రరీని అన్వేషించండి",
    tabs: {
        books: "పుస్తకాలు",
        worship: "ఆరాధన",
        sermons: "ప్రసంగాలు",
        bibleStudies: "బైబిల్ అధ్యయనాలు"
    },
    buttons: {
        details: "వివరాలు",
        addToCart: "కార్ట్‌కు జోడించండి",
        backToBooks: "పుస్తకాలకు తిరిగి వెళ్ళండి",
        watchOnYoutube: "యూట్యూబ్‌లో చూడండి",
        viewMore: "మరిన్ని చూడండి",
        showLess: "తక్కువ చూపించండి",
        checkout: "చెక్అవుట్‌కు వెళ్ళండి",
        continueShopping: "షాపింగ్ కొనసాగించండి",
        loadMore: "మరిన్ని లోడ్ చేయండి..."
    },
    books: {
        title: "సంగీత పుస్తకాలు",
        description: "మా ఆరాధన సంగీత పుస్తకాల సేకరణను డౌన్‌లోడ్ చేయండి లేదా కొనుగోలు చేయండి",
        author: "రచయిత",
        pages: "పేజీలు",
        price: "ధర",
        language: "భాష",
        publishDate: "ప్రచురణ తేదీ",
        preview: "ముందస్తు వీక్షణ",
        outOfStock: "స్టాక్ అయిపోయింది",
        fullDescription: "పూర్తి వివరణ",
        additionalInfo: "అదనపు సమాచారం",
        by: "రచయిత",
        descriptionLabel: "వివరణ",
        detailsLabel: "వివరాలు",
        languageLabel: "భాష",
        pagesLabel: "పేజీలు",
        publishedLabel: "ప్రచురించబడింది"
    },
    worship: {
        title: "ఆరాధన పాటలు",
        description: "మా ఆరాధన పాటల సేకరణను వినండి",
        artist: "కళాకారుడు",
        duration: "వ్యవధి",
        uploaded: "అప్‌లోడ్ చేయబడింది",
        play: "ప్లే చేయండి",
        download: "డౌన్‌లోడ్ చేయండి",
        lyrics: "సాహిత్యం",
        chords: "తంతులు",
        latestFirst: "తాజావి మొదట"
    },
    sermons: {
        title: "ప్రసంగాలు",
        description: "మా ప్రసంగ లైబ్రరీ నుండి చూడండి మరియు నేర్చుకోండి",
        speaker: "వక్త",
        duration: "వ్యవధి",
        date: "తేదీ",
        watch: "చూడండి",
        listen: "వినండి",
        notes: "ప్రసంగ గమనికలు"
    },
    bibleStudies: {
        title: "బైబిల్ అధ్యయనాలు",
        description: "మా బైబిల్ అధ్యయన వనరులతో మీ విశ్వాసాన్ని లోతుగా చేయండి",
        author: "రచయిత",
        pages: "పేజీలు",
        date: "తేదీ",
        fileType: "ఫైల్ రకం",
        read: "చదవండి",
        download: "డౌన్‌లోడ్ చేయండి",
        studyGuide: "అధ్యయన మార్గదర్శి",
        lessons: "పాఠాలు"
    },
    cart: {
        title: "మీ కార్ట్",
        items: "వస్తువులు",
        item: "వస్తువు",
        quantity: "పరిమాణం",
        subtotal: "ఉప మొత్తం",
        total: "మొత్తం",
        checkout: "చెక్అవుట్",
        empty: "మీ కార్ట్ ఖాళీగా ఉంది.",
        emptyDescription: "ప్రారంభించడానికి మీ కార్ట్‌కు కొన్ని పుస్తకాలను జోడించండి!",
        remove: "తొలగించండి",
        continueShopping: "షాపింగ్ కొనసాగించండి"
    },
    filters: {
        all: "అన్ని",
        recent: "ఇటీవల జోడించినవి",
        popular: "అత్యంత జనాదరణ పొందినవి",
        free: "ఉచితం",
        paid: "చెల్లించవలసినది"
    },
    search: {
        placeholder: "వనరులను శోధించండి...",
        noResults: "మీ శోధనకు సరిపోలే వనరులు కనుగొనబడలేదు"
    },
    currency: "₹",
    min: "నిమి"
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/i18n/locales/en/news.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const __TURBOPACK__default__export__ = {
    title: "News & Updates",
    subtitle: "Stay informed about our latest events, announcements, and ministry updates",
    latestNews: "Latest News",
    allNews: "All News",
    categories: {
        all: "All",
        events: "Events",
        announcements: "Announcements",
        testimonies: "Testimonies",
        achievements: "Achievements",
        ministry: "Ministry Updates"
    },
    readMore: "Read More",
    readFull: "Read Full Article",
    shareArticle: "Share Article",
    relatedNews: "Related News",
    noNews: "No news articles available at this time.",
    loading: "Loading news...",
    publishedOn: "Published on",
    by: "by",
    tags: "Tags",
    backToNews: "Back to News",
    search: {
        placeholder: "Search news...",
        noResults: "No news articles found matching your search"
    },
    filters: {
        sortBy: "Sort by",
        newest: "Newest First",
        oldest: "Oldest First",
        mostViewed: "Most Viewed"
    },
    // NewsPage specific translations
    tabs: {
        upcomingEvents: "Upcoming Events",
        yearlyReports: "Yearly Reports",
        internationalAwards: "Awards"
    },
    events: {
        title: "Upcoming Events",
        viewDetails: "View Details",
        learnMore: "Learn More",
        timezone: "IST",
        registration: "Registration",
        registerEarly: "Register early to secure your spot for this event.",
        registrationFee: "Registration Fee:",
        enrollNow: "Enroll Now",
        registerNow: "Register Now",
        eventDescription: "Event Description",
        maxCapacity: "Max Capacity:",
        attendees: "attendees",
        speakers: "Speakers / Instructors",
        whatToBring: "What to Bring",
        notepadAndPen: "Notepad and pen",
        waterBottle: "Water bottle",
        yourInstrument: "Your own instrument (if applicable)",
        businessCards: "Business cards for networking",
        needHelp: "Need help? Contact us",
        haveQuestions: "Have questions? Contact us"
    },
    awards: {
        title: "Awards & Recognition",
        registration: "Registration",
        secureSpot: "Secure your spot at this prestigious event.",
        aboutEvent: "About This Event",
        venue: "Venue:",
        keynoteSpeakers: "Keynote Speakers",
        eventHighlights: "Event Highlights"
    },
    reports: {
        title: "Yearly Enrollment Reports",
        selectYear: "Select Year",
        selectClassType: "Select Class Type",
        classTypes: {
            keyboard: "Keyboard",
            guitar: "Guitar",
            lcm: "LCM (London College of Music)"
        },
        monthlyDistribution: "Monthly Enrollment",
        legend: {
            nationalStudents: "National Students",
            internationalStudents: "International Students"
        },
        students: "students",
        studentsCount: "Students Count",
        annualOverview: "Annual Overview",
        totalStats: "Total Enrollment Statistics",
        totalStudents: "Total Students:",
        nationalStudents: "National Students:",
        internationalStudents: "International Students:",
        peakPerformance: "Peak Performance",
        highestMonth: "Highest Month:",
        lowestMonth: "Lowest Month:",
        enrollment: "Enrollment:"
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/i18n/locales/te/news.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const __TURBOPACK__default__export__ = {
    title: "వార్తలు & నవీకరణలు",
    subtitle: "మా తాజా ఈవెంట్‌లు, ప్రకటనలు మరియు సేవా నవీకరణల గురించి తెలుసుకోండి",
    latestNews: "తాజా వార్తలు",
    allNews: "అన్ని వార్తలు",
    categories: {
        all: "అన్ని",
        events: "ఈవెంట్స్",
        announcements: "ప్రకటనలు",
        testimonies: "సాక్ష్యాలు",
        achievements: "విజయాలు",
        ministry: "సేవా నవీకరణలు"
    },
    readMore: "మరింత చదవండి",
    readFull: "పూర్తి కథనాన్ని చదవండి",
    shareArticle: "కథనాన్ని భాగస్వామ్యం చేయండి",
    relatedNews: "సంబంధిత వార్తలు",
    noNews: "ఈ సమయంలో వార్తా కథనాలు అందుబాటులో లేవు.",
    loading: "వార్తలు లోడ్ అవుతున్నాయి...",
    publishedOn: "ప్రచురించబడింది",
    by: "ద్వారా",
    tags: "ట్యాగ్‌లు",
    backToNews: "వార్తలకు తిరిగి వెళ్ళండి",
    search: {
        placeholder: "వార్తలను శోధించండి...",
        noResults: "మీ శోధనకు సరిపోలే వార్తా కథనాలు కనుగొనబడలేదు"
    },
    filters: {
        sortBy: "క్రమబద్ధీకరించు",
        newest: "కొత్తవి మొదట",
        oldest: "పాత వి మొదట",
        mostViewed: "అత్యధికంగా వీక్షించబడినవి"
    },
    // NewsPage specific translations
    tabs: {
        upcomingEvents: "రాబోయే కార్యక్రమాలు",
        yearlyReports: "వార్షిక నివేదికలు",
        internationalAwards: "అవార్డులు"
    },
    events: {
        title: "రాబోయే కార్యక్రమాలు",
        viewDetails: "వివరాలు చూడండి",
        learnMore: "మరింత తెలుసుకోండి",
        timezone: "IST",
        registration: "నమోదు",
        registerEarly: "ఈ ఈవెంట్ కోసం మీ స్థానాన్ని భద్రపరచుకోవడానికి ముందుగా నమోదు చేసుకోండి.",
        registrationFee: "నమోదు రుసుము:",
        enrollNow: "ఇప్పుడు నమోదు చేసుకోండి",
        registerNow: "ఇప్పుడు నమోదు చేసుకోండి",
        eventDescription: "కార్యక్రమ వివరణ",
        maxCapacity: "గరిష్ట సామర్థ్యం:",
        attendees: "హాజరైనవారు",
        speakers: "వక్తలు / బోధకులు",
        whatToBring: "ఏమి తీసుకురావాలి",
        notepadAndPen: "నోట్‌ప్యాడ్ మరియు పెన్",
        waterBottle: "నీటి బాటిల్",
        yourInstrument: "మీ స్వంత వాయిద్యం (వర్తించినట్లయితే)",
        businessCards: "నెట్‌వర్కింగ్ కోసం వ్యాపార కార్డులు",
        needHelp: "సహాయం కావాలా? మమ్మల్ని సంప్రదించండి",
        haveQuestions: "ప్రశ్నలు ఉన్నాయా? మమ్మల్ని సంప్రదించండి"
    },
    awards: {
        title: "అవార్డులు & గుర్తింపు",
        registration: "నమోదు",
        secureSpot: "ఈ ప్రతిష్టాత్మక కార్యక్రమంలో మీ స్థానాన్ని భద్రపరచుకోండి.",
        aboutEvent: "ఈ కార్యక్రమం గురించి",
        venue: "స్థలం:",
        keynoteSpeakers: "ముఖ్య వక్తలు",
        eventHighlights: "కార్యక్రమ ముఖ్యాంశాలు"
    },
    reports: {
        title: "వార్షిక నమోదు నివేదికలు",
        selectYear: "సంవత్సరం ఎంచుకోండి",
        selectClassType: "తరగతి రకాన్ని ఎంచుకోండి",
        classTypes: {
            keyboard: "కీబోర్డ్",
            guitar: "గిటార్",
            lcm: "LCM (లండన్ కాలేజ్ ఆఫ్ మ్యూజిక్)"
        },
        monthlyDistribution: "నెలవారీ నమోదు",
        legend: {
            nationalStudents: "జాతీయ విద్యార్థులు",
            internationalStudents: "అంతర్జాతీయ విద్యార్థులు"
        },
        students: "విద్యార్థులు",
        studentsCount: "విద్యార్థుల సంఖ్య",
        annualOverview: "వార్షిక అవలోకనం",
        totalStats: "మొత్తం నమోదు గణాంకాలు",
        totalStudents: "మొత్తం విద్యార్థులు:",
        nationalStudents: "జాతీయ విద్యార్థులు:",
        internationalStudents: "అంతర్జాతీయ విద్యార్థులు:",
        peakPerformance: "గరిష్ట పనితీరు",
        highestMonth: "అత్యధిక నెల:",
        lowestMonth: "అత్యల్ప నెల:",
        enrollment: "నమోదు:"
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/i18n/locales/en/donate.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const __TURBOPACK__default__export__ = {
    title: "Support Our Ministry",
    subtitle: "Partner with us in transforming lives through worship",
    hero: {
        title: "Support Our Ministry",
        subtitle: "Partner with us in transforming lives through worship",
        description: "Your generous donations help us spread the message of worship, train leaders, and impact communities worldwide."
    },
    amountSelection: {
        title: "Select Donation Amount",
        description: "Choose a suggested amount or enter your own custom amount",
        customLabel: "Custom Amount",
        placeholder: "Enter amount in ₹"
    },
    paymentMethods: {
        card: {
            tab: "Card",
            title: "Card Payment",
            description: "Pay securely using your credit or debit card",
            cardholderName: "Cardholder Name",
            cardNumber: "Card Number",
            expiryDate: "Expiry Date",
            cvv: "CVV"
        },
        bank: {
            tab: "Bank Transfer",
            title: "Bank Transfer",
            description: "Transfer directly to our bank account",
            accountName: "Account Name",
            accountNumber: "Account Number",
            ifscCode: "IFSC Code",
            bankName: "Bank Name",
            branch: "Branch"
        },
        qr: {
            tab: "UPI/QR",
            title: "Scan QR Code",
            description: "Scan this QR code with any UPI app to donate"
        }
    },
    taxInfo: {
        title: "Tax Deductible Donation",
        description: "All donations are tax-deductible under Section 80G of the Income Tax Act. You will receive a receipt for your donation.",
        taxId: "Tax ID"
    },
    impact: {
        musicEducation: {
            title: "Music Education",
            description: "Supporting free keyboard and worship training for aspiring musicians"
        },
        communityOutreach: {
            title: "Community Outreach",
            description: "Reaching communities through conferences, events, and worship gatherings"
        },
        ministryGrowth: {
            title: "Ministry Growth",
            description: "Helping establish new worship centers and expanding ministry reach"
        }
    },
    whyDonate: {
        title: "Why Your Gift Matters",
        reasons: [
            "Support worship training and education programs",
            "Help establish new worship centers and house churches",
            "Provide resources for conferences and events",
            "Reach more people with the message of worship",
            "Empower the next generation of worship leaders"
        ]
    },
    donationOptions: {
        title: "Ways to Give",
        oneTime: "One-Time Gift",
        monthly: "Monthly Giving",
        custom: "Custom Amount"
    },
    amounts: {
        currency: "₹",
        placeholder: "Enter amount"
    },
    form: {
        fullName: "Full Name",
        email: "Email Address",
        phone: "Phone Number",
        amount: "Donation Amount",
        message: "Message (Optional)",
        anonymous: "Make this donation anonymous",
        newsletter: "Subscribe to our newsletter",
        donate: "Donate Now",
        processing: "Processing...",
        success: "Thank you for your generous donation!",
        error: "There was an error processing your donation. Please try again."
    },
    securePayment: "Secure and encrypted payment",
    questions: "Have questions about donating? Contact us at",
    bankDetails: {
        title: "Bank Transfer Details",
        accountName: "Account Name",
        accountNumber: "Account Number",
        ifsc: "IFSC Code",
        bank: "Bank Name",
        branch: "Branch"
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/i18n/locales/te/donate.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const __TURBOPACK__default__export__ = {
    title: "మా సేవకు మద్దతు ఇవ్వండి",
    subtitle: "ఆరాధన ద్వారా జీవితాలను మార్చడంలో మాతో భాగస్వామి అవ్వండి",
    hero: {
        title: "మా సేవకు మద్దతు ఇవ్వండి",
        subtitle: "ఆరాధన ద్వారా జీవితాలను మార్చడంలో మాతో భాగస్వామి అవ్వండి",
        description: "మీ ఉదార విరాళాలు ఆరాధన సందేశాన్ని వ్యాప్తి చేయడానికి, నాయకులకు శిక్షణ ఇవ్వడానికి మరియు ప్రపంచవ్యాప్తంగా సమాజాలను ప్రభావితం చేయడానికి మాకు సహాయపడతాయి."
    },
    amountSelection: {
        title: "విరాళ మొత్తాన్ని ఎంచుకోండి",
        description: "సూచించిన మొత్తాన్ని ఎంచుకోండి లేదా మీ స్వంత అనుకూల మొత్తాన్ని నమోదు చేయండి",
        customLabel: "అనుకూల మొత్తం",
        placeholder: "₹లో మొత్తాన్ని నమోదు చేయండి"
    },
    paymentMethods: {
        card: {
            tab: "కార్డ్",
            title: "కార్డ్ చెల్లింపు",
            description: "మీ క్రెడిట్ లేదా డెబిట్ కార్డ్ ఉపయోగించి సురక్షితంగా చెల్లించండి",
            cardholderName: "కార్డ్‌హోల్డర్ పేరు",
            cardNumber: "కార్డ్ నంబర్",
            expiryDate: "గడువు తేదీ",
            cvv: "CVV"
        },
        bank: {
            tab: "బ్యాంక్ బదిలీ",
            title: "బ్యాంక్ బదిలీ",
            description: "మా బ్యాంక్ ఖాతాకు నేరుగా బదిలీ చేయండి",
            accountName: "ఖాతా పేరు",
            accountNumber: "ఖాతా సంఖ్య",
            ifscCode: "IFSC కోడ్",
            bankName: "బ్యాంక్ పేరు",
            branch: "శాఖ"
        },
        qr: {
            tab: "UPI/QR",
            title: "QR కోడ్ స్కాన్ చేయండి",
            description: "విరాళం ఇవ్వడానికి ఏదైనా UPI యాప్‌తో ఈ QR కోడ్‌ను స్కాన్ చేయండి"
        }
    },
    taxInfo: {
        title: "పన్ను తగ్గింపు విరాళం",
        description: "అన్ని విరాళాలు ఆదాయపు పన్ను చట్టంలోని సెక్షన్ 80G కింద పన్ను తగ్గింపుకు అర్హులు. మీరు మీ విరాళానికి రసీదును అందుకుంటారు.",
        taxId: "పన్ను ID"
    },
    impact: {
        musicEducation: {
            title: "సంగీత విద్య",
            description: "ఆకాంక్షాభిలాషీ సంగీతకారులకు ఉచిత కీబోర్డ్ మరియు ఆరాధన శిక్షణకు మద్దతు"
        },
        communityOutreach: {
            title: "సమాజ విస్తరణ",
            description: "సమావేశాలు, కార్యక్రమాలు మరియు ఆరాధన సమావేశాల ద్వారా సమాజాలను చేరుకోవడం"
        },
        ministryGrowth: {
            title: "సేవ వృద్ధి",
            description: "కొత్త ఆరాధన కేంద్రాలను స్థాపించడం మరియు సేవ విస్తరణకు సహాయం"
        }
    },
    whyDonate: {
        title: "మీ బహుమతి ఎందుకు ముఖ్యమైనది",
        reasons: [
            "ఆరాధన శిక్షణ మరియు విద్యా కార్యక్రమాలకు మద్దతు",
            "కొత్త ఆరాధన కేంద్రాలు మరియు గృహ చర్చిలను స్థాపించడంలో సహాయం",
            "సమావేశాలు మరియు కార్యక్రమాల కోసం వనరులను అందించండి",
            "ఆరాధన సందేశంతో ఎక్కువ మందిని చేరుకోండి",
            "తరువాతి తరం ఆరాధన నాయకులకు శక్తినివ్వండి"
        ]
    },
    donationOptions: {
        title: "ఇవ్వడానికి మార్గాలు",
        oneTime: "ఒకసారి బహుమతి",
        monthly: "నెలవారీ ఇవ్వడం",
        custom: "అనుకూల మొత్తం"
    },
    amounts: {
        currency: "₹",
        placeholder: "మొత్తాన్ని నమోదు చేయండి"
    },
    form: {
        fullName: "పూర్తి పేరు",
        email: "ఇమెయిల్ చిరునామా",
        phone: "ఫోన్ నంబర్",
        amount: "విరాళ మొత్తం",
        message: "సందేశం (ఐచ్ఛికం)",
        anonymous: "ఈ విరాళాన్ని అనామకంగా చేయండి",
        newsletter: "మా వార్తాలేఖకు సభ్యత్వం పొందండి",
        donate: "ఇప్పుడు విరాళం ఇవ్వండి",
        processing: "ప్రాసెస్ చేస్తోంది...",
        success: "మీ ఉదార విరాళానికి ధన్యవాదాలు!",
        error: "మీ విరాళాన్ని ప్రాసెస్ చేయడంలో లోపం ఉంది. దయచేసి మళ్లీ ప్రయత్నించండి."
    },
    securePayment: "సురక్షిత మరియు గుప్తీకరించిన చెల్లింపు",
    questions: "విరాళం గురించి ప్రశ్నలు ఉన్నాయా? మాకు సంప్రదించండి",
    bankDetails: {
        title: "బ్యాంక్ బదిలీ వివరాలు",
        accountName: "ఖాతా పేరు",
        accountNumber: "ఖాతా సంఖ్య",
        ifsc: "IFSC కోడ్",
        bank: "బ్యాంక్ పేరు",
        branch: "శాఖ"
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/i18n/locales/en/careers.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const __TURBOPACK__default__export__ = {
    title: "Join Our Team",
    subtitle: "Be part of a movement transforming lives through worship",
    // Tab labels
    tabs: {
        staff: "Our Staff",
        volunteers: "Our Volunteers",
        conferenceStaff: "Conference Supporting Staff",
        worshippers: "Hallel Worshippers"
    },
    // Team taglines
    taglines: {
        staff: "Dedicated professionals driving our mission forward.",
        volunteers: "Passionate individuals donating their time and talent.",
        conferenceStaff: "Behind-the-scenes experts ensuring flawless events.",
        worshippers: "Musicians and vocalists leading us in uplifting worship."
    },
    // Contact labels
    contact: {
        email: "Email",
        call: "Call",
        whatsapp: "WhatsApp"
    },
    // Placeholder text
    photoNotAvailable: "Photo Not Available",
    noTeamMembers: "No team members to display at this time.",
    // Volunteer form
    volunteerForm: {
        title: "Wanna a Volunteer?",
        subtitle: "Join us and make a meaningful impact!",
        intro: "We're always looking for passionate individuals to join our volunteer team. Fill out the form below to get started on your volunteering journey with us!",
        firstName: "First Name",
        lastName: "Last Name",
        email: "Email Address",
        phone: "Phone Number",
        interests: "Areas of Interest",
        message: "Why Would You Like to Volunteer?",
        placeholders: {
            firstName: "Your first name",
            lastName: "Your last name",
            email: "Your email address",
            phone: "Your phone number",
            message: "Tell us why you'd like to volunteer with us"
        },
        interestOptions: {
            select: "Select an area",
            events: "Event Planning",
            community: "Community Outreach",
            worship: "Worship Team",
            tech: "Technical Support",
            admin: "Administrative Support"
        },
        required: "*",
        submit: "Submit Application",
        submitting: "Submitting...",
        errors: {
            firstNameRequired: "First name is required",
            lastNameRequired: "Last name is required",
            emailRequired: "Email is required",
            emailInvalid: "Please enter a valid email address",
            phoneRequired: "Phone number is required",
            interestsRequired: "Please select an area of interest",
            messageRequired: "Please tell us why you want to volunteer"
        },
        success: "Thank you for your interest in volunteering with us! We will contact you soon."
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/i18n/locales/te/careers.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const __TURBOPACK__default__export__ = {
    title: "మా టీమ్‌లో చేరండి",
    subtitle: "ఆరాధన ద్వారా జీవితాలను మార్చే ఉద్యమంలో భాగం కండి",
    // Tab labels
    tabs: {
        staff: "మా సిబ్బంది",
        volunteers: "మా స్వచ్ఛంద సేవకులు",
        conferenceStaff: "సమావేశ సహాయక సిబ్బంది",
        worshippers: "హలేల్ ఆరాధకులు"
    },
    // Team taglines
    taglines: {
        staff: "మా మిషన్‌ను ముందుకు నడిపించే అంకిత వృత్తిపరులు.",
        volunteers: "తమ సమయం మరియు ప్రతిభను దానం చేసే ఉత్సాహభరితమైన వ్యక్తులు.",
        conferenceStaff: "దోషరహిత కార్యక్రమాలను నిర్ధారించే తెరవెనుక నిపుణులు.",
        worshippers: "ఉత్తేజకరమైన ఆరాధనకు నాయకత్వం వహించే సంగీతకారులు మరియు గాయకులు."
    },
    // Contact labels
    contact: {
        email: "ఇమెయిల్",
        call: "కాల్ చేయండి",
        whatsapp: "వాట్సాప్"
    },
    // Placeholder text
    photoNotAvailable: "ఫోటో అందుబాటులో లేదు",
    noTeamMembers: "ఈ సమయంలో ప్రదర్శించడానికి టీమ్ సభ్యులు లేరు.",
    // Volunteer form
    volunteerForm: {
        title: "స్వచ్ఛంద సేవకుడిగా చేరాలా?",
        subtitle: "మాతో చేరండి మరియు అర్థవంతమైన ప్రభావం చూపండి!",
        intro: "మేము మా స్వచ్ఛంద సేవకుల బృందంలో చేరడానికి ఉత్సాహభరితమైన వ్యక్తుల కోసం ఎల్లప్పుడూ వెతుకుతున్నాము. మాతో మీ స్వచ్ఛంద సేవ యాత్రను ప్రారంభించడానికి దిగువ ఫారమ్‌ను పూరించండి!",
        firstName: "మొదటి పేరు",
        lastName: "చివరి పేరు",
        email: "ఇమెయిల్ చిరునామా",
        phone: "ఫోన్ నంబర్",
        interests: "ఆసక్తి ఉన్న రంగాలు",
        message: "మీరు ఎందుకు స్వచ్ఛంద సేవ చేయాలనుకుంటున్నారు?",
        placeholders: {
            firstName: "మీ మొదటి పేరు",
            lastName: "మీ చివరి పేరు",
            email: "మీ ఇమెయిల్ చిరునామా",
            phone: "మీ ఫోన్ నంబర్",
            message: "మీరు మాతో ఎందుకు స్వచ్ఛంద సేవ చేయాలనుకుంటున్నారో మాకు చెప్పండి"
        },
        interestOptions: {
            select: "ఒక ప్రాంతాన్ని ఎంచుకోండి",
            events: "కార్యక్రమ ప్రణాళిక",
            community: "సమాజ వ్యాప్తి",
            worship: "ఆరాధన బృందం",
            tech: "సాంకేతిక మద్దతు",
            admin: "పరిపాలనా మద్దతు"
        },
        required: "*",
        submit: "దరఖాస్తు సమర్పించండి",
        submitting: "సమర్పిస్తోంది...",
        errors: {
            firstNameRequired: "మొదటి పేరు అవసరం",
            lastNameRequired: "చివరి పేరు అవసరం",
            emailRequired: "ఇమెయిల్ అవసరం",
            emailInvalid: "దయచేసి చెల్లుబాటు అయ్యే ఇమెయిల్ చిరునామాను నమోదు చేయండి",
            phoneRequired: "ఫోన్ నంబర్ అవసరం",
            interestsRequired: "దయచేసి ఆసక్తి ఉన్న ప్రాంతాన్ని ఎంచుకోండి",
            messageRequired: "దయచేసి మీరు ఎందుకు స్వచ్ఛంద సేవ చేయాలనుకుంటున్నారో మాకు చెప్పండి"
        },
        success: "మాతో స్వచ్ఛంద సేవ చేయడానికి ఆసక్తి చూపినందుకు ధన్యవాదాలు! మేము త్వరలో మిమ్మల్ని సంప్రదిస్తాము."
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/i18n/locales/en/directors.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const __TURBOPACK__default__export__ = {
    title: "Our Directors",
    subtitle: "Meet the visionary leaders guiding Yeshua Beth Hallel Ministries",
    // Tab labels
    tabs: {
        augustine: "Ps. Augustine Dandingi",
        vijaya: "Ps. Vijaya Kumari Dandingi",
        charles: "Charles Aaron Benedict",
        nancy: "Nancy Ophir Augustina"
    },
    // Common sections
    contact: "Contact",
    getInTouch: "Get in Touch",
    readMore: "Read More",
    sendMessage: "Send Message",
    // Augustine
    augustine: {
        name: "Pastor Augustine Dandingi",
        role: "Founder & President",
        organization1: "Hallel Music School (HMS)",
        organization2: "Yeshua Beth Hallel Ministries (YBHM)",
        titles: {
            guinnessRecord: "Guinness World Record Holder",
            worshipLeader: "Worship Leader",
            songWriter: "Song Writer",
            bibleTeacher: "Bible Teacher",
            shofarInstructor: "Shofar Instructor"
        },
        buttons: {
            getInTouch: "Get in Touch",
            worshipSongs: "Worship Songs"
        },
        stats: {
            studentsTrained: "Students Trained",
            worldRecordParticipants: "World Record Participants",
            majorAwards: "Major Awards",
            worshipAttendees: "Worship Attendees"
        },
        subTabs: {
            ministryOverview: "Ministry Overview",
            hallelMusicSchool: "Hallel Music School",
            teachingShofar: "Teaching & Shofar"
        },
        aboutSection: {
            title: "About",
            subtitle: "A dynamic spiritual leader fulfilling a divine vision to raise a generation of true worshippers.",
            visionMissionTitle: "Vision & Mission",
            paragraph1: "Pastor Augustine Dandingi is a dynamic spiritual leader, anointed worshipper, and visionary founder of Yeshua Beth Hallel Ministries (YBHM) and Hallel Music School (HMS), headquartered in Vijayawada, India. Through these ministries, he is passionately fulfilling a divine vision to raise a generation of true worshippers across the nation.",
            paragraph2: "Driven by the God-given calling that \"every church in India should worship with musical instruments and every home should become a house of worship,\" Pastor Augustine launched Hallel Music School, offering free online keyboard training with the mission to make every believer a worshipper.",
            paragraph3: "As a crusade worship leader, he has led worship before hundreds of thousands across massive gospel gatherings in the Telugu-speaking states. Through his teaching, music, and leadership, Pastor Augustine is raising disciples, training songwriters, and equipping worship leaders to carry the flame of revival and worship into every corner of the nation.",
            ministryHighlights: "Ministry Highlights",
            bibleTeacherTitle: "Bible Teacher",
            bibleTeacherDesc: "Passionate teacher of the Word, focusing on worship theology and biblical principles",
            worshipLeaderTitle: "Worship Leader",
            worshipLeaderDesc: "Leads worship at massive gospel gatherings across Telugu-speaking states",
            ministryFounderTitle: "Ministry Founder",
            ministryFounderDesc: "Founded Yeshua Beth Hallel Ministries and Hallel Music School to equip worshippers",
            shofarInstructorTitle: "Shofar Instructor",
            shofarInstructorDesc: "One of the few instructors in India teaching the biblical instrument \"Shofar\""
        },
        ministriesVisionSection: {
            title: "Ministries & Vision",
            ybhm: {
                title: "Yeshua Beth Hallel Ministries",
                badge: "YBHM",
                location: "Vijayawada, India",
                founded: "Founded & Leading",
                description: "Pastor Augustine's flagship ministry focused on raising a generation of worshippers across India. YBHM is dedicated to bringing authentic worship and biblical teaching to churches and communities throughout the Telugu-speaking regions and beyond.",
                tags: {
                    worship: "Worship",
                    biblicalTeaching: "Biblical Teaching",
                    community: "Community"
                }
            },
            hms: {
                title: "Hallel Music School",
                badge: "HMS",
                onlineInPerson: "Online & In-Person",
                studentsTrained: "7,000+ Students Trained",
                description: "Offering free online keyboard training with the mission to make every believer a worshipper. In just four years, over 7,000 students have been trained through this initiative, culminating in the Guinness World Record achievement.",
                tags: {
                    freeTraining: "Free Training",
                    keyboard: "Keyboard",
                    worldRecord: "World Record"
                }
            },
            crusadeWorship: {
                title: "Crusade Worship Leadership",
                location: "Telugu-speaking States, India",
                description: "Leading worship before hundreds of thousands across massive gospel gatherings. Pastor Augustine's anointed worship leadership has touched countless lives, bringing people into authentic encounters with God through praise and worship.",
                worshipAttendees: "Worship Attendees",
                crusadeEvents: "Crusade Events"
            }
        },
        hallelTab: {
            visionTitle: "Hallel Music School Vision",
            visionQuote: "\"Every church in India should worship with musical instruments and every home should become a house of worship.\"",
            point1: "Free online keyboard training accessible to all",
            point2: "7,000+ students trained in just four years",
            point3: "Comprehensive worship training beyond just keyboard skills",
            point4: "Equipping the next generation of worship leaders for ministry",
            knowMore: "Know More",
            worldRecordTitle: "World Record Achievement",
            worldRecordDesc: "On 1st December 2024, Pastor Augustine set a Guinness World Record by leading 1,090 students to play the keyboard simultaneously online—making a significant mark in the realm of global worship and music education.",
            guinnessRecord: "Guinness World Record",
            keyboardPlayers: "1,090 Keyboard Players",
            internationalRecognition: "International Recognition",
            multipleRecords: "Multiple World Records",
            globalImpact: "Global Impact"
        },
        achievements: {
            title: "Achievements & Recognition",
            guinnessTitle: "Guinness World Record",
            guinnessDesc: "Set the Guinness World Record for the longest continuous worship service.",
            songsTitle: "1000+ Original Songs",
            songsDesc: "Composed over 1000 original worship songs in Telugu and other languages.",
            studentsTitle: "10,000+ Students Trained",
            studentsDesc: "Trained over 10,000 students in music and worship leadership.",
            albumsTitle: "50+ Albums Released",
            albumsDesc: "Released over 50 worship albums that have blessed millions."
        },
        music: {
            title: "Musical Journey",
            description: "Pastor Augustine's musical journey spans over three decades of worship leadership and songwriting.",
            highlights: "Key Highlights",
            albums: "Albums",
            songs: "Original Songs",
            concerts: "Concerts Conducted"
        },
        about: {
            title: "About Pastor Augustine",
            earlyLife: "Early Life & Calling",
            earlyLifeDesc: "Born with a passion for music and worship, Pastor Augustine dedicated his life to serving God through music ministry.",
            vision: "Vision & Mission",
            visionDesc: "His vision is to raise up a generation of worshippers who will usher in God's presence through authentic worship.",
            legacy: "Legacy",
            legacyDesc: "Through HMS and YBHM, his legacy continues to impact lives and transform worship across the globe."
        }
    },
    // Vijaya
    vijaya: {
        name: "Pastor Vijaya Kumari Dandingi",
        role: "Co-Founder & Vice President",
        organization: "Yeshua Beth Hallel Ministries (YBHM)",
        titles: {
            womensMinistry: "Women's Ministry Leader",
            intercessor: "Intercessor",
            counselor: "Counselor",
            mentor: "Mentor",
            speaker: "Speaker"
        },
        buttons: {
            getInTouch: "Get in Touch"
        },
        aboutSection: {
            title: "About",
            subtitle: "A dedicated servant leader empowering women in ministry and intercession.",
            visionMissionTitle: "Vision & Mission",
            paragraph1: "Pastor Vijaya Kumari Dandingi is a powerful woman of prayer and co-founder of Yeshua Beth Hallel Ministries. Her dedication to intercession, women's ministry, and mentoring has been instrumental in establishing a strong spiritual foundation for the ministry.",
            paragraph2: "With a heart for women's empowerment, she leads women's ministry programs, conducts prayer meetings, and provides spiritual counseling to believers across India.",
            paragraph3: "Through her teaching and mentoring, Pastor Vijaya is raising up a generation of women intercessors and ministry leaders who are making a significant impact in their communities.",
            ministryHighlights: "Ministry Highlights",
            womensMinistryTitle: "Women's Ministry",
            womensMinistryDesc: "Leading and empowering women in worship, prayer, and ministry leadership",
            prayerMinistryTitle: "Intercessory Prayer",
            prayerMinistryDesc: "Establishing strong prayer foundations and leading intercession for the nation",
            counselingTitle: "Spiritual Counseling",
            counselingDesc: "Providing guidance, support, and biblical counseling to women in ministry",
            teachingMinistryTitle: "Teaching & Mentoring",
            teachingMinistryDesc: "Training and equipping women leaders through biblical teaching and mentorship"
        },
        achievements: {
            title: "Ministry Contributions",
            point1: "Co-founded Yeshua Beth Hallel Ministries",
            point2: "Mentored hundreds of women worship leaders",
            point3: "Established prayer ministries across India",
            point4: "Led women's conferences and training programs"
        }
    },
    // Charles
    charles: {
        name: "Charles Aaron Benedict",
        role: "Worship Leader & Youth Ministry Director",
        organization: "Yeshua Beth Hallel Ministries (YBHM)",
        titles: {
            worshipLeader: "Worship Leader",
            youthMinistry: "Youth Ministry",
            musicProduction: "Music Production",
            songwriting: "Songwriting"
        },
        buttons: {
            getInTouch: "Get in Touch"
        },
        aboutSection: {
            title: "About",
            subtitle: "A passionate worship leader inspiring the next generation through music and ministry.",
            visionMissionTitle: "Vision & Mission",
            paragraph1: "Charles Aaron Benedict is a gifted worship leader and youth ministry director at Yeshua Beth Hallel Ministries. His passion for worship and heart for young people has been instrumental in reaching and discipling the next generation.",
            paragraph2: "With expertise in music production and songwriting, Charles leads contemporary worship and trains young musicians in both technical skills and spiritual formation.",
            paragraph3: "Through his leadership, Charles is raising up a generation of worship leaders and songwriters who are passionate about bringing authentic worship to their communities and beyond.",
            ministryHighlights: "Ministry Highlights",
            worshipLeadershipTitle: "Worship Leadership",
            worshipLeadershipDesc: "Leading dynamic worship services and training worship teams",
            youthMinistryTitle: "Youth Ministry",
            youthMinistryDesc: "Empowering and mentoring young people in worship and ministry",
            songwritingTitle: "Songwriting & Composition",
            songwritingDesc: "Creating original worship music and training songwriters",
            educationTitle: "Music Education",
            educationDesc: "Teaching music theory, production, and worship leading to students"
        },
        achievements: {
            title: "Ministry Contributions",
            point1: "Led worship at major conferences and events",
            point2: "Trained hundreds of young musicians and worship leaders",
            point3: "Composed original worship songs and arrangements",
            point4: "Pioneered youth worship initiatives across the region"
        }
    },
    // Nancy
    nancy: {
        name: "Nancy Ophir Augustina",
        role: "Children's Ministry Director",
        organization: "Yeshua Beth Hallel Ministries (YBHM)",
        titles: {
            childrensMinistry: "Children's Ministry",
            musicEducation: "Music Education",
            curriculumDevelopment: "Curriculum Development",
            creativeArts: "Creative Arts"
        },
        buttons: {
            getInTouch: "Get in Touch"
        },
        aboutSection: {
            title: "About",
            subtitle: "Training young hearts to worship, equipping the next generation for kingdom purpose.",
            visionMissionTitle: "Vision & Mission",
            paragraph1: "Master Nancy Ophir Augustina D serves as the Children's Ministry Director and is passionate about teaching children to worship God with excellence. Her creative approach to children's ministry combines music, storytelling, and interactive learning to make worship accessible and exciting for young ones.",
            paragraph2: "Nancy has a special gift for connecting with children and helping them understand Biblical truths through music and creative arts. She oversees the children's worship program, Sunday school curriculum, and special children's events at YBH Ministries.",
            paragraph3: "Her innovative teaching methods and genuine love for children have made the children's ministry one of the most vibrant aspects of YBH. She believes that children are not just the future of the church but important members of God's kingdom today.",
            ministryHighlights: "Ministry Highlights",
            childrensMinistryTitle: "Children's Ministry Leadership",
            childrensMinistryDesc: "Director of thriving children's ministry with innovative programs",
            musicEducationTitle: "Music Education",
            musicEducationDesc: "Built children's music program with 200+ students",
            curriculumTitle: "Curriculum Development",
            curriculumDesc: "Developed comprehensive children's worship curriculum",
            creativeArtsTitle: "Creative Arts & Education",
            creativeArtsDesc: "Bachelor of Music Education and Children's Ministry certified"
        },
        contactSection: {
            title: "Get in Touch",
            subtitle: "Reach out for children's ministry inquiries and collaborations",
            email: "Email",
            phone: "Phone"
        }
    },
    // Contact Form
    contactForm: {
        title: "Get in Touch",
        subtitle: "Have a question or want to connect? We'd love to hear from you.",
        name: "Name",
        email: "Email",
        message: "Message",
        send: "Send Message",
        sending: "Sending...",
        success: "Thanks for reaching out! We'll get back to you soon.",
        sendAnother: "Send Another Message",
        namePlaceholder: "Your name",
        emailPlaceholder: "your.email@example.com",
        messagePlaceholder: "Your message..."
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/i18n/locales/te/directors.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const __TURBOPACK__default__export__ = {
    title: "మా డైరెక్టర్లు",
    subtitle: "యేషూవా బేత్ హలేల్ మినిస్ట్రీస్‌ను మార్గదర్శకత్వం చేస్తున్న దార్శనిక నాయకులను కలవండి",
    // Tab labels
    tabs: {
        augustine: "పాస్టర్ అగస్టిన్ దండింగి",
        vijaya: "పాస్టర్ విజయ కుమారి దండింగి",
        charles: "చార్లెస్ ఆరోన్ బెనెడిక్ట్",
        nancy: "నాన్సీ ఓఫిర్ అగస్టీనా"
    },
    // Common sections
    contact: "సంప్రదించండి",
    getInTouch: "సంప్రదించండి",
    readMore: "మరింత చదవండి",
    sendMessage: "సందేశం పంపండి",
    // Augustine
    augustine: {
        name: "పాస్టర్ అగస్టిన్ దండింగి",
        role: "వ్యవస్థాపకుడు మరియు ప్రెసిడెంట్",
        organization1: "హలేల్ మ్యూజిక్ స్కూల్ (HMS)",
        organization2: "యేషూవా బేత్ హలేల్ మినిస్ట్రీస్ (YBHM)",
        titles: {
            guinnessRecord: "గిన్నిస్ వరల్డ్ రికార్డ్ హోల్డర్",
            worshipLeader: "ఆరాధన నాయకుడు",
            songWriter: "పాటల రచయిత",
            bibleTeacher: "బైబిల్ ఉపాధ్యాయుడు",
            shofarInstructor: "షోఫార్ బోధకుడు"
        },
        buttons: {
            getInTouch: "సంప్రదించండి",
            worshipSongs: "ఆరాధన పాటలు"
        },
        stats: {
            studentsTrained: "విద్యార్థులకు శిక్షణ",
            worldRecordParticipants: "వరల్డ్ రికార్డ్ పాల్గొనేవారు",
            majorAwards: "ప్రధాన పురస్కారాలు",
            worshipAttendees: "ఆరాధన హాజరైనవారు"
        },
        subTabs: {
            ministryOverview: "పరిచర్య అవలోకనం",
            hallelMusicSchool: "హలేల్ మ్యూజిక్ స్కూల్",
            teachingShofar: "బోధన & షోఫార్"
        },
        aboutSection: {
            title: "గురించి",
            subtitle: "నిజమైన ఆరాధకుల తరాన్ని పెంచడానికి దైవిక దృష్టిని నెరవేర్చే డైనమిక్ ఆధ్యాత్మిక నాయకుడు.",
            visionMissionTitle: "దార్శనికత & లక్ష్యం",
            paragraph1: "పాస్టర్ అగస్టిన్ దండింగి ఒక డైనమిక్ ఆధ్యాత్మిక నాయకుడు, అభిషిక్త ఆరాధకుడు మరియు భారతదేశంలోని విజయవాడలో ప్రధాన కార్యాలయం ఉన్న యేషూవా బేత్ హలేల్ మినిస్ట్రీస్ (YBHM) మరియు హలేల్ మ్యూజిక్ స్కూల్ (HMS) యొక్క దార్శనిక వ్యవస్థాపకుడు. ఈ పరిచర్యల ద్వారా, అతను దేశం అంతటా నిజమైన ఆరాధకుల తరాన్ని పెంచడానికి దైవిక దృష్టిని అభిరుచితో నెరవేర్చుతున్నాడు.",
            paragraph2: "\"భారతదేశంలోని ప్రతి చర్చి సంగీత వాద్యాలతో ఆరాధించాలి మరియు ప్రతి ఇల్లు ఆరాధన మందిరంగా మారాలి\" అనే దేవుడు ఇచ్చిన పిలుపుతో ప్రేరేపించబడి, పాస్టర్ అగస్టిన్ ప్రతి విశ్వాసిని ఆరాధకునిగా చేయాలనే లక్ష్యంతో ఉచిత ఆన్‌లైన్ కీబోర్డ్ శిక్షణను అందిస్తూ హలేల్ మ్యూజిక్ స్కూల్‌ను ప్రారంభించారు.",
            paragraph3: "క్రూసేడ్ ఆరాధన నాయకుడిగా, అతను తెలుగు మాట్లాడే రాష్ట్రాలలో భారీ సువార్త సమావేశాలలో వందల వేల మంది ముందు ఆరాధనకు నాయకత్వం వహించాడు. తన బోధన, సంగీతం మరియు నాయకత్వం ద్వారా, పాస్టర్ అగస్టిన్ శిష్యులను పెంచడం, పాటల రచయితలకు శిక్షణ ఇవ్వడం మరియు పునరుద్ధరణ మరియు ఆరాధన యొక్క జ్వాలను దేశంలోని ప్రతి మూలకు తీసుకెళ్లడానికి ఆరాధన నాయకులను సన్నద్ధం చేస్తున్నాడు.",
            ministryHighlights: "పరిచర్య హైలైట్స్",
            bibleTeacherTitle: "బైబిల్ ఉపాధ్యాయుడు",
            bibleTeacherDesc: "ఆరాధన వేదాంతశాస్త్రం మరియు బైబిల్ సూత్రాలపై దృష్టి సారించే వాక్యం యొక్క అభిరుచిగల బోధకుడు",
            worshipLeaderTitle: "ఆరాధన నాయకుడు",
            worshipLeaderDesc: "తెలుగు మాట్లాడే రాష్ట్రాలలో భారీ సువార్త సమావేశాలలో ఆరాధనకు నాయకత్వం వహిస్తారు",
            ministryFounderTitle: "పరిచర్య వ్యవస్థాపకుడు",
            ministryFounderDesc: "ఆరాధకులను సన్నద్ధం చేయడానికి యేషూవా బేత్ హలేల్ మినిస్ట్రీస్ మరియు హలేల్ మ్యూజిక్ స్కూల్‌ను స్థాపించారు",
            shofarInstructorTitle: "షోఫార్ బోధకుడు",
            shofarInstructorDesc: "బైబిల్ వాద్యం \"షోఫార్\" బోధించే భారతదేశంలోని కొద్దిమంది బోధకులలో ఒకరు"
        },
        ministriesVisionSection: {
            title: "పరిచర్యలు & దృష్టి",
            ybhm: {
                title: "యేషూవా బేత్ హలేల్ మినిస్ట్రీస్",
                badge: "YBHM",
                location: "విజయవాడ, భారతదేశం",
                founded: "స్థాపించారు & నడుపుతున్నారు",
                description: "భారతదేశం అంతటా ఆరాధకుల తరాన్ని పెంచడంపై దృష్టి సారించిన పాస్టర్ అగస్టిన్ యొక్క ప్రధాన పరిచర్య. YBHM తెలుగు మాట్లాడే ప్రాంతాలు మరియు అంతకు మించి చర్చిలు మరియు సంఘాలకు ప్రామాణిక ఆరాధన మరియు బైబిల్ బోధనను తీసుకురావడానికి అంకితం చేయబడింది.",
                tags: {
                    worship: "ఆరాధన",
                    biblicalTeaching: "బైబిల్ బోధన",
                    community: "సంఘం"
                }
            },
            hms: {
                title: "హలేల్ మ్యూజిక్ స్కూల్",
                badge: "HMS",
                onlineInPerson: "ఆన్‌లైన్ & వ్యక్తిగతంగా",
                studentsTrained: "7,000+ విద్యార్థులకు శిక్షణ",
                description: "ప్రతి విశ్వాసిని ఆరాధకునిగా చేయాలనే లక్ష్యంతో ఉచిత ఆన్‌లైన్ కీబోర్డ్ శిక్షణను అందిస్తోంది. కేవలం నాలుగు సంవత్సరాలలో, ఈ చొరవ ద్వారా 7,000 కంటే ఎక్కువ విద్యార్థులకు శిక్షణ ఇవ్వబడింది, ఇది గిన్నిస్ వరల్డ్ రికార్డ్ సాధనలో ముగిసింది.",
                tags: {
                    freeTraining: "ఉచిత శిక్షణ",
                    keyboard: "కీబోర్డ్",
                    worldRecord: "వరల్డ్ రికార్డ్"
                }
            },
            crusadeWorship: {
                title: "క్రూసేడ్ ఆరాధన నాయకత్వం",
                location: "తెలుగు మాట్లాడే రాష్ట్రాలు, భారతదేశం",
                description: "భారీ సువార్త సమావేశాలలో వందల వేల మంది ముందు ఆరాధనకు నాయకత్వం వహిస్తున్నారు. పాస్టర్ అగస్టిన్ యొక్క అభిషిక్త ఆరాధన నాయకత్వం లెక్కలేనన్ని జీవితాలను తాకింది, ప్రజలను స్తుతి మరియు ఆరాధన ద్వారా దేవునితో ప్రామాణిక ఎన్‌కౌంటర్‌లలోకి తీసుకువస్తోంది.",
                worshipAttendees: "ఆరాధన హాజరైనవారు",
                crusadeEvents: "క్రూసేడ్ కార్యక్రమాలు"
            }
        },
        hallelTab: {
            visionTitle: "హలేల్ మ్యూజిక్ స్కూల్ దృష్టి",
            visionQuote: "\"భారతదేశంలోని ప్రతి చర్చి సంగీత వాద్యాలతో ఆరాధించాలి మరియు ప్రతి ఇల్లు ఆరాధన మందిరంగా మారాలి.\"",
            point1: "అందరికీ అందుబాటులో ఉచిత ఆన్‌లైన్ కీబోర్డ్ శిక్షణ",
            point2: "కేవలం నాలుగు సంవత్సరాలలో 7,000+ విద్యార్థులకు శిక్షణ",
            point3: "కేవలం కీబోర్డ్ నైపుణ్యాలకు మించి సమగ్ర ఆరాధన శిక్షణ",
            point4: "పరిచర్య కోసం తరువాతి తరం ఆరాధన నాయకులను సన్నద్ధం చేయడం",
            knowMore: "మరింత తెలుసుకోండి",
            worldRecordTitle: "వరల్డ్ రికార్డ్ విజయం",
            worldRecordDesc: "డిసెంబర్ 1, 2024న, పాస్టర్ అగస్టిన్ 1,090 మంది విద్యార్థులను ఆన్‌లైన్‌లో ఏకకాలంలో కీబోర్డ్ వాయించడానికి నాయకత్వం వహించడం ద్వారా గిన్నిస్ వరల్డ్ రికార్డ్ సృష్టించారు—ప్రపంచ ఆరాధన మరియు సంగీత విద్యా రంగంలో ఒక ముఖ్యమైన గుర్తును సృష్టించారు.",
            guinnessRecord: "గిన్నిస్ వరల్డ్ రికార్డ్",
            keyboardPlayers: "1,090 కీబోర్డ్ ప్లేయర్లు",
            internationalRecognition: "అంతర్జాతీయ గుర్తింపు",
            multipleRecords: "బహుళ వరల్డ్ రికార్డ్స్",
            globalImpact: "ప్రపంచ ప్రభావం"
        },
        achievements: {
            title: "విజయాలు & గుర్తింపు",
            guinnessTitle: "గిన్నిస్ వరల్డ్ రికార్డ్",
            guinnessDesc: "దీర్ఘకాలిక నిరంతర ఆరాధన సేవ కోసం గిన్నిస్ వరల్డ్ రికార్డ్ సృష్టించారు.",
            songsTitle: "1000+ ఒరిజినల్ పాటలు",
            songsDesc: "తెలుగు మరియు ఇతర భాషలలో 1000 కంటే ఎక్కువ ఒరిజినల్ ఆరాధన పాటలను కంపోజ్ చేశారు.",
            studentsTitle: "10,000+ విద్యార్థులకు శిక్షణ",
            studentsDesc: "సంగీతం మరియు ఆరాధన నాయకత్వంలో 10,000 కంటే ఎక్కువ విద్యార్థులకు శిక్షణ ఇచ్చారు.",
            albumsTitle: "50+ ఆల్బమ్‌లు విడుదల",
            albumsDesc: "లక్షలాది మందిని ఆశీర్వదించిన 50 కంటే ఎక్కువ ఆరాధన ఆల్బమ్‌లను విడుదల చేశారు."
        },
        music: {
            title: "సంగీత యాత్ర",
            description: "పాస్టర్ అగస్టిన్ సంగీత యాత్ర మూడు దశాబ్దాల ఆరాధన నాయకత్వం మరియు పాటల రచనను కలిగి ఉంది.",
            highlights: "ముఖ్య హైలైట్స్",
            albums: "ఆల్బమ్‌లు",
            songs: "ఒరిజినల్ పాటలు",
            concerts: "నిర్వహించిన కచేరీలు"
        },
        about: {
            title: "పాస్టర్ అగస్టిన్ గురించి",
            earlyLife: "ప్రారంభ జీవితం & పిలుపు",
            earlyLifeDesc: "సంగీతం మరియు ఆరాధన పట్ల అభిరుచితో జన్మించిన పాస్టర్ అగస్టిన్ సంగీత పరిచర్య ద్వారా దేవునికి సేవ చేయడానికి తన జీవితాన్ని అంకితం చేశారు.",
            vision: "దార్శనికత & లక్ష్యం",
            visionDesc: "ప్రామాణిక ఆరాధన ద్వారా దేవుని సన్నిధిని తీసుకువచ్చే ఆరాధకుల తరాన్ని పెంచడం అతని దార్శనికత.",
            legacy: "వారసత్వం",
            legacyDesc: "HMS మరియు YBHM ద్వారా, అతని వారసత్వం ప్రపంచవ్యాప్తంగా జీవితాలను ప్రభావితం చేయడం మరియు ఆరాధనను మార్చడం కొనసాగిస్తోంది."
        }
    },
    // Vijaya
    vijaya: {
        name: "పాస్టర్ విజయ కుమారి దండింగి",
        role: "సహ-వ్యవస్థాపకురాలు మరియు వైస్ ప్రెసిడెంట్",
        organization: "యేషూవా బేత్ హలేల్ మినిస్ట్రీస్ (YBHM)",
        titles: {
            womensMinistry: "మహిళా పరిచర్య నాయకురాలు",
            intercessor: "మధ్యవర్తిత్వ ప్రార్థనా యోధురాలు",
            counselor: "కౌన్సెలర్",
            mentor: "మార్గదర్శకురాలు",
            speaker: "స్పీకర్"
        },
        buttons: {
            getInTouch: "సంప్రదించండి"
        },
        aboutSection: {
            title: "గురించి",
            subtitle: "పరిచర్య మరియు మధ్యవర్తిత్వంలో మహిళలను శక్తివంతం చేసే అంకితమైన సేవా నాయకురాలు.",
            visionMissionTitle: "దార్శనికత & లక్ష్యం",
            paragraph1: "పాస్టర్ విజయ కుమారి దండింగి శక్తివంతమైన ప్రార్థనా మహిళ మరియు యేషూవా బేత్ హలేల్ మినిస్ట్రీస్ సహ-వ్యవస్థాపకురాలు. మధ్యవర్తిత్వ ప్రార్థన, మహిళా పరిచర్య మరియు మార్గదర్శకత్వం పట్ల ఆమె అంకితభావం పరిచర్య కోసం బలమైన ఆధ్యాత్మిక పునాదిని స్థాపించడంలో కీలకమైంది.",
            paragraph2: "మహిళల సాధికారత పట్ల హృదయంతో, ఆమె మహిళా పరిచర్య కార్యక్రమాలను నడుపుతుంది, ప్రార్థనా సమావేశాలను నిర్వహిస్తుంది మరియు భారతదేశం అంతటా విశ్వాసులకు ఆధ్యాత్మిక కౌన్సెలింగ్ అందిస్తుంది.",
            paragraph3: "ఆమె బోధన మరియు మార్గదర్శకత్వం ద్వారా, పాస్టర్ విజయ తమ సమాజాలలో గణనీయమైన ప్రభావం చూపుతున్న మహిళా మధ్యవర్తిత్వ యోధులు మరియు పరిచర్య నాయకుల తరాన్ని పెంచుతోంది.",
            ministryHighlights: "పరిచర్య హైలైట్స్",
            womensMinistryTitle: "మహిళా పరిచర్య",
            womensMinistryDesc: "ఆరాధన, ప్రార్థన మరియు పరిచర్య నాయకత్వంలో మహిళలకు నాయకత్వం మరియు శక్తి ఇవ్వడం",
            prayerMinistryTitle: "మధ్యవర్తిత్వ ప్రార్థన",
            prayerMinistryDesc: "బలమైన ప్రార్థనా పునాదులను స్థాపించడం మరియు దేశం కోసం మధ్యవర్తిత్వానికి నాయకత్వం వహించడం",
            counselingTitle: "ఆధ్యాత్మిక కౌన్సెలింగ్",
            counselingDesc: "పరిచర్యలో మహిళలకు మార్గదర్శకత్వం, మద్దతు మరియు బైబిల్ కౌన్సెలింగ్ అందించడం",
            teachingMinistryTitle: "బోధన & మార్గదర్శకత్వం",
            teachingMinistryDesc: "బైబిల్ బోధన మరియు మార్గదర్శకత్వం ద్వారా మహిళా నాయకులకు శిక్షణ మరియు సన్నద్ధత"
        },
        achievements: {
            title: "పరిచర్య సహకారాలు",
            point1: "యేషూవా బేత్ హలేల్ మినిస్ట్రీస్‌ను సహ-వ్యవస్థాపించారు",
            point2: "వందలాది మంది మహిళా ఆరాధన నాయకులకు మార్గదర్శకత్వం అందించారు",
            point3: "భారతదేశం అంతటా ప్రార్థనా పరిచర్యలను స్థాపించారు",
            point4: "మహిళా సమావేశాలు మరియు శిక్షణా కార్యక్రమాలకు నాయకత్వం వహించారు"
        }
    },
    // Charles
    charles: {
        name: "చార్లెస్ ఆరోన్ బెనెడిక్ట్",
        role: "ఆరాధన నాయకుడు & యువ పరిచర్య డైరెక్టర్",
        organization: "యేషూవా బేత్ హలేల్ మినిస్ట్రీస్ (YBHM)",
        titles: {
            worshipLeader: "ఆరాధన నాయకుడు",
            youthMinistry: "యువ పరిచర్య",
            musicProduction: "మ్యూజిక్ ప్రొడక్షన్",
            songwriting: "పాట రచన"
        },
        buttons: {
            getInTouch: "సంప్రదించండి"
        },
        aboutSection: {
            title: "గురించి",
            subtitle: "సంగీతం మరియు పరిచర్య ద్వారా తరువాతి తరాన్ని ప్రేరేపించే ఉద్రేకపూర్వక ఆరాధన నాయకుడు.",
            visionMissionTitle: "దార్శనికత & లక్ష్యం",
            paragraph1: "చార్లెస్ ఆరోన్ బెనెడిక్ట్ యేషూవా బేత్ హలేల్ మినిస్ట్రీస్ వద్ద ప్రతిభావంతమైన ఆరాధన నాయకుడు మరియు యువ పరిచర్య డైరెక్టర్. ఆరాధన పట్ల అతని ఉద్రేకం మరియు యువకుల పట్ల హృదయం తరువాతి తరాన్ని చేరుకోవడంలో మరియు శిష్యత్వం చేయడంలో కీలకమైంది.",
            paragraph2: "మ్యూజిక్ ప్రొడక్షన్ మరియు పాట రచనలో నైపుణ్యంతో, చార్లెస్ సమకాలీన ఆరాధనకు నాయకత్వం వహిస్తాడు మరియు యువ సంగీతకారులకు సాంకేతిక నైపుణ్యాలు మరియు ఆధ్యాత్మిక నిర్మాణం రెండింటిలోనూ శిక్షణ ఇస్తాడు.",
            paragraph3: "అతని నాయకత్వం ద్వారా, చార్లెస్ తమ సమాజాలకు మరియు అంతకు మించి ప్రామాణిక ఆరాధనను తీసుకురావడంలో ఉద్రేకం గల ఆరాధన నాయకులు మరియు పాటల రచయితల తరాన్ని పెంచుతున్నాడు.",
            ministryHighlights: "పరిచర్య హైలైట్స్",
            worshipLeadershipTitle: "ఆరాధన నాయకత్వం",
            worshipLeadershipDesc: "డైనమిక్ ఆరాధన సేవలకు నాయకత్వం వహించడం మరియు ఆరాధన బృందాలకు శిక్షణ ఇవ్వడం",
            youthMinistryTitle: "యువ పరిచర్య",
            youthMinistryDesc: "ఆరాధన మరియు పరిచర్యలో యువకులకు శక్తి మరియు మార్గదర్శకత్వం అందించడం",
            songwritingTitle: "పాట రచన & కంపోజిషన్",
            songwritingDesc: "ఒరిజినల్ ఆరాధన సంగీతాన్ని సృష్టించడం మరియు పాటల రచయితలకు శిక్షణ ఇవ్వడం",
            educationTitle: "సంగీత విద్య",
            educationDesc: "విద్యార్థులకు సంగీత సిద్ధాంతం, ప్రొడక్షన్ మరియు ఆరాధన నాయకత్వం బోధించడం"
        },
        achievements: {
            title: "పరిచర్య సహకారాలు",
            point1: "ప్రధాన సమావేశాలు మరియు కార్యక్రమాలలో ఆరాధనకు నాయకత్వం వహించారు",
            point2: "వందలాది మంది యువ సంగీతకారులు మరియు ఆరాధన నాయకులకు శిక్షణ ఇచ్చారు",
            point3: "ఒరిజినల్ ఆరాధన పాటలు మరియు అమరికలను కంపోజ్ చేశారు",
            point4: "ప్రాంతం అంతటా యువ ఆరాధన కార్యక్రమాలకు ముందుండి నాయకత్వం వహించారు"
        }
    },
    // Nancy
    nancy: {
        name: "నాన్సీ ఓఫిర్ అగస్టీనా",
        role: "పిల్లల పరిచర్య డైరెక్టర్",
        organization: "యేషువా బెత్ హలేల్ మినిస్ట్రీస్ (YBHM)",
        titles: {
            childrensMinistry: "పిల్లల పరిచర్య",
            musicEducation: "సంగీత విద్య",
            curriculumDevelopment: "పాఠ్యాంశ అభివృద్ధి",
            creativeArts: "సృజనాత్మక కళలు"
        },
        buttons: {
            getInTouch: "సంప్రదించండి"
        },
        aboutSection: {
            title: "గురించి",
            subtitle: "యువ హృదయాలకు ఆరాధన శిక్షణ ఇవ్వడం, రాజ్య ఉద్దేశ్యం కోసం తరువాతి తరానికి సన్నద్ధం చేయడం.",
            visionMissionTitle: "దార్శనికత & లక్ష్యం",
            paragraph1: "మాస్టర్ నాన్సీ ఓఫిర్ అగస్టీనా డి పిల్లల పరిచర్య డైరెక్టర్‌గా సేవలందిస్తున్నారు మరియు పిల్లలకు శ్రేష్ఠతతో దేవుణ్ణి ఆరాధించడం నేర్పడంలో ఉద్రేకంగా ఉన్నారు. పిల్లల పరిచర్యకు ఆమె సృజనాత్మక విధానం సంగీతం, కథా చెప్పడం మరియు ఇంటరాక్టివ్ అభ్యసనాన్ని కలిపి ఆరాధనను చిన్నపిల్లలకు అందుబాటులో మరియు ఉత్తేజకరమైనదిగా చేస్తుంది.",
            paragraph2: "నాన్సీకి పిల్లలతో అనుసంధానమవడం మరియు సంగీతం మరియు సృజనాత్మక కళల ద్వారా బైబిల్ సత్యాలను అర్థం చేసుకోవడంలో సహాయపడే ప్రత్యేక వరం ఉంది. ఆమె పిల్లల ఆరాధన కార్యక్రమం, సండే స్కూల్ పాఠ్యాంశం మరియు YBH మినిస్ట్రీస్ వద్ద ప్రత్యేక పిల్లల కార్యక్రమాలను పర్యవేక్షిస్తుంది.",
            paragraph3: "ఆమె వినూత్న బోధనా పద్ధతులు మరియు పిల్లల పట్ల నిజమైన ప్రేమ పిల్లల పరిచర్యను YBH లోని అత్యంత చురుకైన అంశాలలో ఒకటిగా చేసింది. పిల్లలు చర్చి యొక్క భవిష్యత్తు మాత్రమే కాదు, ఈ రోజు దేవుని రాజ్యంలోని ముఖ్యమైన సభ్యులు అని ఆమె నమ్ముతుంది.",
            ministryHighlights: "పరిచర్య హైలైట్స్",
            childrensMinistryTitle: "పిల్లల పరిచర్య నాయకత్వం",
            childrensMinistryDesc: "వినూత్న కార్యక్రమాలతో అభివృద్ధి చెందుతున్న పిల్లల పరిచర్య డైరెక్టర్",
            musicEducationTitle: "సంగీత విద్య",
            musicEducationDesc: "200+ విద్యార్థులతో పిల్లల సంగీత కార్యక్రమాన్ని నిర్మించారు",
            curriculumTitle: "పాఠ్యాంశ అభివృద్ధి",
            curriculumDesc: "సమగ్ర పిల్లల ఆరాధన పాఠ్యాంశాన్ని అభివృద్ధి చేశారు",
            creativeArtsTitle: "సృజనాత్మక కళలు & విద్య",
            creativeArtsDesc: "బ్యాచలర్ ఆఫ్ మ్యూజిక్ ఎడ్యుకేషన్ మరియు చిల్డ్రన్స్ మినిస్ట్రీ సర్టిఫైడ్"
        },
        contactSection: {
            title: "సంప్రదించండి",
            subtitle: "పిల్లల పరిచర్య విచారణలు మరియు సహకారాల కోసం చేరుకోండి",
            email: "ఇమెయిల్",
            phone: "ఫోన్"
        }
    },
    // Contact Form
    contactForm: {
        title: "సంప్రదించండి",
        subtitle: "మీకు ఏదైనా ప్రశ్న ఉందా లేదా కనెక్ట్ అవ్వాలనుకుంటున్నారా? మేము మీ నుండి వినడానికి ఇష్టపడతాము.",
        name: "పేరు",
        email: "ఇమెయిల్",
        message: "సందేశం",
        send: "సందేశం పంపండి",
        sending: "పంపుతోంది...",
        success: "సంప్రదించినందుకు ధన్యవాదాలు! మేము త్వరలో మీకు తిరిగి సంప్రదిస్తాము.",
        sendAnother: "మరో సందేశం పంపండి",
        namePlaceholder: "మీ పేరు",
        emailPlaceholder: "మీ.ఇమెయిల్@example.com",
        messagePlaceholder: "మీ సందేశం..."
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/i18n/locales/en/stories.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const __TURBOPACK__default__export__ = {
    title: "Stories of Transformation",
    subtitle: "Hear how God is transforming lives through worship",
    intro: "These are real stories from real people whose lives have been touched and transformed by the power of worship and the grace of God.",
    readMore: "Read Full Story",
    shareStory: "Share Your Story",
    testimoniesHeading: "Testimonials",
    videosHeading: "Videos",
    relatedVideos: "Related Videos",
    submitTestimonyHeading: "Share Your Testimony",
    tabs: {
        guinness: {
            label: "Guinness",
            title: "Guinness World Records",
            description: "Celebrating extraordinary achievements recognized by the global authority on record-breaking."
        },
        asian: {
            label: "Asian Book",
            title: "Asian Book of Records",
            description: "Honoring remarkable accomplishments across Asia and preserving them for future generations."
        },
        ingenious: {
            label: "Ingenious Charm",
            title: "Ingenious Charm World Record",
            description: "Celebrating creativity and innovation through record-breaking achievements."
        },
        international: {
            label: "International Star",
            title: "International Star Book of Records",
            description: "Recognizing outstanding achievements and contributions to society across the globe."
        },
        songwriting: {
            label: "Song Writing Classes",
            title: "Song Writing Classes",
            description: "Training and equipping worship leaders and songwriters to compose anointed worship music."
        },
        bibleschool: {
            label: "Bible School Training",
            title: "Bible School Training",
            description: "Equipping believers with biblical knowledge and spiritual formation for ministry."
        },
        hallel: {
            label: "Kids Summer Training",
            title: "Kids Summer Training",
            description: "Nurturing the next generation of worshippers through music and biblical training."
        }
    },
    categories: {
        all: "All Stories",
        healing: "Healing",
        salvation: "Salvation",
        deliverance: "Deliverance",
        restoration: "Restoration",
        breakthrough: "Breakthrough"
    },
    noStories: "No stories available at this time.",
    loading: "Loading stories...",
    form: {
        title: "Share Your Testimony",
        subtitle: "We'd love to hear how God has worked in your life through these events and ministries.",
        nameLabel: "Your Name",
        namePlaceholder: "Enter your name",
        nameRequired: "Name is required",
        nameMinLength: "Name must be at least 2 characters",
        emailLabel: "Email Address",
        emailPlaceholder: "Enter your email",
        emailRequired: "Email is required",
        emailInvalid: "Please enter a valid email address",
        roleLabel: "Your Role",
        rolePlaceholder: "e.g., Participant, Volunteer, Student",
        roleRequired: "Role is required",
        eventLabel: "Event/Ministry",
        eventPlaceholder: "Select an event...",
        eventRequired: "Please select an event or ministry",
        locationLabel: "Location (City, Country)",
        locationPlaceholder: "e.g., Vijayawada, India",
        locationRequired: "Location is required",
        testimonyLabel: "Your Testimony",
        testimonyPlaceholder: "Share your story of how God has worked in your life...",
        testimonyRequired: "Please share your testimony",
        testimonyMinLength: "Testimony must be at least 50 characters",
        submitButton: "Submit Testimony",
        submitting: "Submitting...",
        successMessage: "Thank you for sharing your testimony! It will be reviewed before being published.",
        error: "There was an error submitting your testimony. Please try again."
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/i18n/locales/te/stories.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const __TURBOPACK__default__export__ = {
    title: "రూపాంతర కథలు",
    subtitle: "ఆరాధన ద్వారా దేవుడు జీవితాలను ఎలా మారుస్తున్నాడో వినండి",
    intro: "ఆరాధన శక్తి మరియు దేవుని కృప ద్వారా తాకబడిన మరియు రూపాంతరం చెందిన నిజమైన వ్యక్తుల నుండి ఇవి నిజమైన కథలు.",
    readMore: "పూర్తి కథ చదవండి",
    shareStory: "మీ కథ పంచుకోండి",
    testimoniesHeading: "సాక్ష్యాలు",
    videosHeading: "వీడియోలు",
    relatedVideos: "సంబంధిత వీడియోలు",
    submitTestimonyHeading: "మీ సాక్ష్యం పంచుకోండి",
    tabs: {
        guinness: {
            label: "గిన్నిస్",
            title: "గిన్నిస్ వరల్డ్ రికార్డ్స్",
            description: "రికార్డ్-బ్రేకింగ్‌పై ప్రపంచ అధికారం గుర్తించిన అసాధారణ విజయాలను జరుపుకోవడం."
        },
        asian: {
            label: "ఆసియన్ బుక్",
            title: "ఆసియన్ బుక్ ఆఫ్ రికార్డ్స్",
            description: "ఆసియా అంతటా విశేష విజయాలను గౌరవించడం మరియు భవిష్యత్ తరాల కోసం వాటిని సంరక్షించడం."
        },
        ingenious: {
            label: "ఇంజినియస్ చార్మ్",
            title: "ఇంజినియస్ చార్మ్ వరల్డ్ రికార్డ్",
            description: "రికార్డ్-బ్రేకింగ్ విజయాల ద్వారా సృజనాత్మకత మరియు ఆవిష్కరణను జరుపుకోవడం."
        },
        international: {
            label: "ఇంటర్నేషనల్ స్టార్",
            title: "ఇంటర్నేషనల్ స్టార్ బుక్ ఆఫ్ రికార్డ్స్",
            description: "ప్రపంచవ్యాప్తంగా సమాజానికి అసాధారణ విజయాలు మరియు సహకారాన్ని గుర్తించడం."
        },
        songwriting: {
            label: "పాట రచన తరగతులు",
            title: "పాట రచన తరగతులు",
            description: "అభిషిక్త ఆరాధన సంగీతాన్ని కంపోజ్ చేయడానికి ఆరాధన నాయకులు మరియు పాటల రచయితలకు శిక్షణ మరియు సన్నద్ధత."
        },
        bibleschool: {
            label: "బైబిల్ స్కూల్ శిక్షణ",
            title: "బైబిల్ స్కూల్ శిక్షణ",
            description: "సేవ కోసం బైబిల్ జ్ఞానం మరియు ఆధ్యాత్మిక నిర్మాణంతో విశ్వాసులను సన్నద్ధం చేయడం."
        },
        hallel: {
            label: "పిల్లల వేసవి శిక్షణ",
            title: "పిల్లల వేసవి శిక్షణ",
            description: "సంగీతం మరియు బైబిల్ శిక్షణ ద్వారా తరువాతి తరం ఆరాధకులను పెంపొందించడం."
        }
    },
    categories: {
        all: "అన్ని కథలు",
        healing: "స్వస్థత",
        salvation: "రక్షణ",
        deliverance: "విడుదల",
        restoration: "పునరుద్ధరణ",
        breakthrough: "పురోభివృద్ధి"
    },
    noStories: "ప్రస్తుతం కథలు అందుబాటులో లేవు.",
    loading: "కథలు లోడ్ అవుతున్నాయి...",
    form: {
        title: "మీ సాక్ష్యం పంచుకోండి",
        subtitle: "ఈ కార్యక్రమాలు మరియు సేవల ద్వారా దేవుడు మీ జీవితంలో ఎలా పనిచేశాడో వినాలని మేము కోరుకుంటున్నాము.",
        nameLabel: "మీ పేరు",
        namePlaceholder: "మీ పేరును నమోదు చేయండి",
        nameRequired: "పేరు అవసరం",
        nameMinLength: "పేరు కనీసం 2 అక్షరాలు ఉండాలి",
        emailLabel: "ఇమెయిల్ చిరునామా",
        emailPlaceholder: "మీ ఇమెయిల్‌ను నమోదు చేయండి",
        emailRequired: "ఇమెయిల్ అవసరం",
        emailInvalid: "దయచేసి చెల్లుబాటు అయ్యే ఇమెయిల్ చిరునామాను నమోదు చేయండి",
        roleLabel: "మీ పాత్ర",
        rolePlaceholder: "ఉదా., భాగస్వామి, స్వచ్ఛంద సేవకుడు, విద్యార్థి",
        roleRequired: "పాత్ర అవసరం",
        eventLabel: "కార్యక్రమం/సేవ",
        eventPlaceholder: "కార్యక్రమాన్ని ఎంచుకోండి...",
        eventRequired: "దయచేసి కార్యక్రమం లేదా సేవను ఎంచుకోండి",
        locationLabel: "స్థానం (నగరం, దేశం)",
        locationPlaceholder: "ఉదా., విజయవాడ, భారతదేశం",
        locationRequired: "స్థానం అవసరం",
        testimonyLabel: "మీ సాక్ష్యం",
        testimonyPlaceholder: "దేవుడు మీ జీవితంలో ఎలా పనిచేశాడో మీ కథను పంచుకోండి...",
        testimonyRequired: "దయచేసి మీ సాక్ష్యాన్ని పంచుకోండి",
        testimonyMinLength: "సాక్ష్యం కనీసం 50 అక్షరాలు ఉండాలి",
        submitButton: "సాక్ష్యం సమర్పించండి",
        submitting: "సమర్పిస్తోంది...",
        successMessage: "మీ సాక్ష్యాన్ని పంచుకున్నందుకు ధన్యవాదాలు! ప్రచురించడానికి ముందు దీనిని సమీక్షించబడుతుంది.",
        error: "మీ సాక్ష్యాన్ని సమర్పించడంలో లోపం ఉంది. దయచేసి మళ్లీ ప్రయత్నించండి."
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/i18n/locales/en/legal.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const __TURBOPACK__default__export__ = {
    privacyPolicy: {
        title: "Privacy Policy",
        lastUpdated: "Last Updated",
        introduction: "Introduction",
        introText: "Yeshua Beth Hallel Ministries is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information.",
        informationCollection: {
            title: "Information We Collect",
            description: "We may collect the following types of information:",
            types: [
                "Personal identification information (Name, email address, phone number, etc.)",
                "Donation and payment information",
                "Website usage data and analytics",
                "Communication preferences"
            ]
        },
        howWeUse: {
            title: "How We Use Your Information",
            purposes: [
                "To process donations and transactions",
                "To communicate ministry updates and newsletters",
                "To improve our website and services",
                "To respond to inquiries and support requests"
            ]
        },
        dataProtection: {
            title: "Data Protection",
            description: "We implement appropriate security measures to protect your personal information from unauthorized access, alteration, or disclosure."
        },
        yourRights: {
            title: "Your Rights",
            rights: [
                "Access your personal data",
                "Request correction of your data",
                "Request deletion of your data",
                "Opt-out of marketing communications"
            ]
        },
        contact: "If you have any questions about this Privacy Policy, please contact us at"
    },
    termsOfService: {
        title: "Terms of Service",
        lastUpdated: "Last Updated",
        acceptance: {
            title: "Acceptance of Terms",
            description: "By accessing and using this website, you accept and agree to be bound by the terms and provisions of this agreement."
        },
        useOfWebsite: {
            title: "Use of Website",
            description: "You agree to use this website for lawful purposes only and in a way that does not infringe the rights of, restrict, or inhibit anyone else's use and enjoyment of the website."
        },
        intellectualProperty: {
            title: "Intellectual Property",
            description: "All content on this website, including text, graphics, logos, images, and software, is the property of Yeshua Beth Hallel Ministries and is protected by copyright laws."
        },
        disclaimer: {
            title: "Disclaimer",
            description: "The information provided on this website is for general informational purposes only. We make no warranties about the completeness, reliability, or accuracy of this information."
        },
        limitation: {
            title: "Limitation of Liability",
            description: "Yeshua Beth Hallel Ministries shall not be liable for any damages arising from the use or inability to use this website."
        },
        changes: {
            title: "Changes to Terms",
            description: "We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to the website."
        }
    },
    accessibility: {
        title: "Accessibility Statement",
        commitment: {
            title: "Our Commitment",
            description: "Yeshua Beth Hallel Ministries is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards."
        },
        measures: {
            title: "Measures to Support Accessibility",
            list: [
                "Include accessibility as part of our mission statement",
                "Provide continual accessibility training for our staff",
                "Assign clear accessibility goals and responsibilities",
                "Employ formal accessibility quality assurance methods"
            ]
        },
        conformance: {
            title: "Conformance Status",
            description: "The Web Content Accessibility Guidelines (WCAG) defines requirements for designers and developers to improve accessibility for people with disabilities. We aim to conform to WCAG 2.1 Level AA standards."
        },
        feedback: {
            title: "Feedback",
            description: "We welcome your feedback on the accessibility of our website. Please let us know if you encounter accessibility barriers."
        },
        contact: "Contact us regarding accessibility"
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/i18n/locales/te/legal.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const __TURBOPACK__default__export__ = {
    privacyPolicy: {
        title: "గోప్యతా విధానం",
        lastUpdated: "చివరిగా నవీకరించబడింది",
        introduction: "పరిచయం",
        introText: "యేషూవా బెత్ హల్లేల్ మినిస్ట్రీస్ మీ గోప్యతను రక్షించడానికి కట్టుబడి ఉంది. ఈ గోప్యతా విధానం మేము మీ సమాచారాన్ని ఎలా సేకరిస్తాము, ఉపయోగిస్తాము మరియు రక్షిస్తాము అని వివరిస్తుంది.",
        informationCollection: {
            title: "మేము సేకరించే సమాచారం",
            description: "మేము ఈ క్రింది రకాల సమాచారాన్ని సేకరించవచ్చు:",
            types: [
                "వ్యక్తిగత గుర్తింపు సమాచారం (పేరు, ఇమెయిల్ చిరునామా, ఫోన్ నంబర్, మొదలైనవి)",
                "విరాళం మరియు చెల్లింపు సమాచారం",
                "వెబ్‌సైట్ వినియోగ డేటా మరియు విశ్లేషణలు",
                "కమ్యూనికేషన్ ప్రాధాన్యతలు"
            ]
        },
        howWeUse: {
            title: "మేము మీ సమాచారాన్ని ఎలా ఉపయోగిస్తాము",
            purposes: [
                "విరాళాలు మరియు లావాదేవీలను ప్రాసెస్ చేయడానికి",
                "సేవా నవీకరణలు మరియు వార్తాలేఖలను కమ్యూనికేట్ చేయడానికి",
                "మా వెబ్‌సైట్ మరియు సేవలను మెరుగుపరచడానికి",
                "విచారణలు మరియు మద్దతు అభ్యర్థనలకు ప్రతిస్పందించడానికి"
            ]
        },
        dataProtection: {
            title: "డేటా రక్షణ",
            description: "అనధికార యాక్సెస్, మార్పు లేదా బహిర్గతం నుండి మీ వ్యక్తిగత సమాచారాన్ని రక్షించడానికి మేము తగిన భద్రతా చర్యలను అమలు చేస్తాము."
        },
        yourRights: {
            title: "మీ హక్కులు",
            rights: [
                "మీ వ్యక్తిగత డేటాను యాక్సెస్ చేయండి",
                "మీ డేటా దిద్దుబాటును అభ్యర్థించండి",
                "మీ డేటా తొలగింపును అభ్యర్థించండి",
                "మార్కెటింగ్ కమ్యూనికేషన్ల నుండి ఆప్ట్-అవుట్ చేయండి"
            ]
        },
        contact: "ఈ గోప్యతా విధానం గురించి మీకు ఏవైనా ప్రశ్నలు ఉంటే, దయచేసి మమ్మల్ని సంప్రదించండి"
    },
    termsOfService: {
        title: "సేవా నిబంధనలు",
        lastUpdated: "చివరిగా నవీకరించబడింది",
        acceptance: {
            title: "నిబంధనల అంగీకారం",
            description: "ఈ వెబ్‌సైట్‌ను యాక్సెస్ చేయడం మరియు ఉపయోగించడం ద్వారా, మీరు ఈ ఒప్పందం యొక్క నిబంధనలు మరియు నిబంధనలకు కట్టుబడి ఉండటానికి అంగీకరిస్తారు మరియు అంగీకరిస్తారు."
        },
        useOfWebsite: {
            title: "వెబ్‌సైట్ వినియోగం",
            description: "మీరు ఈ వెబ్‌సైట్‌ను చట్టబద్ధమైన ఉద్దేశాల కోసం మాత్రమే ఉపయోగించడానికి మరియు ఇతరుల హక్కులను ఉల్లంఘించని, వెబ్‌సైట్ యొక్క ఉపయోగం మరియు ఆనందాన్ని పరిమితం చేయని లేదా నిరోధించని విధంగా ఉపయోగించడానికి అంగీకరిస్తారు."
        },
        intellectualProperty: {
            title: "మేధో సంపత్తి",
            description: "టెక్స్ట్, గ్రాఫిక్స్, లోగోలు, చిత్రాలు మరియు సాఫ్ట్‌వేర్‌తో సహా ఈ వెబ్‌సైట్‌లోని అన్ని కంటెంట్ యేషూవా బెత్ హల్లేల్ మినిస్ట్రీస్ యొక్క ఆస్తి మరియు కాపీరైట్ చట్టాల ద్వారా రక్షించబడింది."
        },
        disclaimer: {
            title: "నిరాకరణ",
            description: "ఈ వెబ్‌సైట్‌లో అందించిన సమాచారం సాధారణ సమాచార ప్రయోజనాల కోసం మాత్రమే. ఈ సమాచారం యొక్క పూర్తి, విశ్వసనీయత లేదా ఖచ్చితత్వం గురించి మేము ఎటువంటి హామీలు ఇవ్వము."
        },
        limitation: {
            title: "బాధ్యత పరిమితి",
            description: "ఈ వెబ్‌సైట్ ఉపయోగం లేదా ఉపయోగించలేకపోవడం నుండి ఉత్పన్నమయ్యే ఏదైనా నష్టాలకు యేషూవా బెత్ హల్లేల్ మినిస్ట్రీస్ బాధ్యత వహించదు."
        },
        changes: {
            title: "నిబంధనలకు మార్పులు",
            description: "ఈ నిబంధనలను ఎప్పుడైనా సవరించే హక్కు మాకు ఉంది. వెబ్‌సైట్‌కు పోస్ట్ చేసిన వెంటనే మార్పులు వెంటనే ప్రభావంలోకి వస్తాయి."
        }
    },
    accessibility: {
        title: "ప్రాప్యత ప్రకటన",
        commitment: {
            title: "మా నిబద్ధత",
            description: "వైకల్యాలున్న వ్యక్తుల కోసం డిజిటల్ ప్రాప్యతను నిర్ధారించడానికి యేషూవా బెత్ హల్లేల్ మినిస్ట్రీస్ కట్టుబడి ఉంది. మేము అందరికీ వినియోగదారు అనుభవాన్ని నిరంతరం మెరుగుపరుస్తున్నాము మరియు సంబంధిత ప్రాప్యత ప్రమాణాలను వర్తింపజేస్తున్నాము."
        },
        measures: {
            title: "ప్రాప్యతకు మద్దతు ఇచ్చే చర్యలు",
            list: [
                "మా మిషన్ స్టేట్‌మెంట్‌లో భాగంగా ప్రాప్యతను చేర్చండి",
                "మా సిబ్బందికి నిరంతర ప్రాప్యత శిక్షణను అందించండి",
                "స్పష్టమైన ప్రాప్యత లక్ష్యాలు మరియు బాధ్యతలను కేటాయించండి",
                "అధికారిక ప్రాప్యత నాణ్యత హామీ పద్ధతులను ఉపయోగించండి"
            ]
        },
        conformance: {
            title: "అనుగుణత స్థితి",
            description: "వెబ్ కంటెంట్ యాక్సెసిబిలిటీ గైడ్‌లైన్స్ (WCAG) వైకల్యాలున్న వ్యక్తుల కోసం ప్రాప్యతను మెరుగుపరచడానికి డిజైనర్లు మరియు డెవలపర్ల కోసం అవసరాలను నిర్వచిస్తుంది. మేము WCAG 2.1 లెవల్ AA ప్రమాణాలకు అనుగుణంగా ఉండాలని లక్ష్యంగా పెట్టుకున్నాము."
        },
        feedback: {
            title: "అభిప్రాయం",
            description: "మా వెబ్‌సైట్ ప్రాప్యతపై మీ అభిప్రాయాన్ని మేము స్వాగతిస్తున్నాము. మీరు ప్రాప్యత అడ్డంకులను ఎదుర్కొంటే దయచేసి మాకు తెలియజేయండి."
        },
        contact: "ప్రాప్యత గురించి మమ్మల్ని సంప్రదించండి"
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/i18n/locales/en/contact.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const __TURBOPACK__default__export__ = {
    title: "Contact Us",
    subtitle: "Get in touch with us",
    getInTouch: "We'd love to hear from you",
    hero: {
        title: "Contact",
        subtitle: "Get in touch with Yeshua Beth Hallel Ministries"
    },
    tabs: {
        guinnessAttempt: "Guinness World Records Attempt-2",
        studentForm: "HMS Student Form",
        conferenceRequest: "Offline Conference in Your City?",
        lsmStudent: "London School of Music Student?",
        sponsor: "Become a Sponsor for Event?",
        trustee: "Become a Trustee?"
    },
    guinnessAttempt: {
        title: "Guinness World Records Attempt-2",
        comingSoon: "Content coming soon..."
    },
    studentForm: {
        title: "Hallel Music School Student Application Form",
        sections: {
            personalInfo: "1. Personal Information",
            courseInfo: "2. Course Information",
            courseType: "3. Course Type / Certification Options",
            musicBackground: "4. Music Background (if any)",
            goalsInterests: "5. Goals & Interests",
            volunteer: "6. Volunteer Opportunity",
            emergencyContact: "7. Emergency Contact"
        },
        fields: {
            fullName: "Full Name",
            dateOfBirth: "Date of Birth",
            gender: "Gender",
            address: "Address",
            cityStateZip: "City / State / ZIP",
            phoneNumber: "Phone Number",
            emailId: "Email ID",
            parentGuardianName: "Parent / Guardian Name (if under 18)",
            parentGuardianContact: "Parent / Guardian Contact",
            programApplyingFor: "Program Applying For",
            instrumentSpecialization: "Instrument / Specialization",
            preferredClassType: "Preferred Class Type",
            preferredSchedule: "Preferred Schedule",
            courseTypePrompt: "Please select the type of course you want to enroll in:",
            yearsOfExperience: "Years of Experience",
            previousTraining: "Previous Training / School",
            musicExamCertifications: "Music Exam Certifications (if any)",
            performanceExperience: "Performance Experience",
            goalsPrompt: "What do you hope to achieve by joining our music program?",
            goalsPlaceholder: "Share your musical goals and aspirations...",
            volunteerPrompt: "Would you like to be a volunteer for school events, concerts, or workshops?",
            volunteerDetailsPrompt: "If yes, please specify your area of interest (e.g., stage setup, helping younger students, event coordination):",
            emergencyName: "Name",
            emergencyRelationship: "Relationship",
            emergencyContact: "Contact Number"
        },
        options: {
            beginner: "Beginner",
            intermediate: "Intermediate",
            advanced: "Advanced",
            piano: "Piano",
            guitar: "Guitar",
            violin: "Violin",
            drums: "Drums",
            vocal: "Vocal",
            other: "Other",
            individual: "Individual",
            group: "Group",
            online: "Online",
            inPerson: "In-Person",
            weekdays: "Weekdays",
            weekends: "Weekends",
            morning: "Morning",
            evening: "Evening",
            freeBasicMusic: "I want to learn Free Basic Music",
            hmsWithCertificate: "I want to learn Professional Music with HMS Certificate (Paid)",
            lcmWithCertificate: "I want to learn Professional Music with LCM Certificate (Paid)",
            schoolEvents: "School events",
            competitions: "Competitions",
            choir: "Choir",
            volunteerOnlineTeacher: "Volunteer as online music teacher",
            volunteerOfflineConferences: "Volunteer as offline hallel Conferences",
            volunteerSummerKids: "Volunteer for Summer Kids training sessions",
            volunteerEvents: "Volunteer for HMS / YBH Events",
            yes: "Yes",
            no: "No",
            male: "Male",
            female: "Female",
            preferNotToSay: "Prefer not to say"
        },
        buttons: {
            submit: "Submit Application",
            submitting: "Submitting...",
            reset: "Reset Form"
        },
        messages: {
            success: "Application submitted successfully! We will contact you soon.",
            error: "There was an error submitting your application. Please try again."
        },
        validation: {
            // Personal Information
            fullNameRequired: "Full name is required",
            fullNameMin: "Full name must be at least 2 characters",
            fullNameMax: "Full name cannot exceed 100 characters",
            fullNamePattern: "Full name can only contain letters, spaces, dots, hyphens, and apostrophes",
            dateOfBirthRequired: "Date of birth is required",
            ageMinimum: "Student must be at least 5 years old",
            genderRequired: "Gender is required",
            addressRequired: "Address is required",
            addressMin: "Address must be at least 5 characters",
            addressMax: "Address cannot exceed 200 characters",
            cityStateZipRequired: "City / State / ZIP is required",
            cityStateZipMax: "City / State / ZIP cannot exceed 100 characters",
            phoneRequired: "Phone number is required",
            phonePattern: "Please enter a valid phone number (10-15 digits)",
            emailRequired: "Email is required",
            emailMax: "Email cannot exceed 100 characters",
            emailPattern: "Please enter a valid email address",
            nameMax: "Name cannot exceed 100 characters",
            // Course Information
            programRequired: "Please select at least one program level",
            instrumentRequired: "Please select at least one instrument",
            instrumentOtherMax: "Instrument specification cannot exceed 50 characters",
            classTypeRequired: "Please select at least one class type",
            scheduleRequired: "Please select at least one schedule preference",
            // Course Type
            courseTypeRequired: "Please select at least one course type",
            // Music Background
            yearsMin: "Years of experience cannot be negative",
            yearsMax: "Years of experience cannot exceed 100",
            textMax200: "This field cannot exceed 200 characters",
            performanceOtherMax: "Performance details cannot exceed 100 characters",
            // Goals
            goalsMax: "Goals cannot exceed 1000 characters",
            // Emergency Contact
            emergencyNameRequired: "Emergency contact name is required",
            emergencyNameMin: "Emergency contact name must be at least 2 characters",
            emergencyRelationshipRequired: "Relationship is required",
            relationshipMax: "Relationship cannot exceed 50 characters",
            emergencyContactRequired: "Emergency contact number is required"
        }
    },
    conferenceRequest: {
        title: "Offline Conference in Your City?",
        comingSoon: "Request form coming soon..."
    },
    lsmStudent: {
        title: "London School of Music Student?",
        comingSoon: "Form coming soon..."
    },
    sponsor: {
        title: "Become a Sponsor for Event?",
        comingSoon: "Sponsorship information coming soon..."
    },
    trustee: {
        title: "Become a Trustee?",
        comingSoon: "Information coming soon..."
    },
    formFields: {
        fullName: "Full Name",
        email: "Email Address",
        phone: "Phone Number",
        message: "Message",
        city: "City",
        state: "State",
        country: "Country",
        organization: "Organization",
        subject: "Subject",
        submit: "Submit",
        sending: "Sending...",
        success: "Thank you! We'll get back to you soon.",
        error: "There was an error sending your message. Please try again."
    },
    contactInfo: {
        title: "Contact Information",
        address: "Address",
        phone: "Phone",
        email: "Email",
        followUs: "Follow Us",
        hours: "Office Hours",
        weekdays: "Monday - Friday: 9:00 AM - 6:00 PM",
        saturday: "Saturday: 10:00 AM - 4:00 PM",
        sunday: "Sunday: Closed"
    },
    map: {
        title: "Find Us",
        directions: "Get Directions"
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/i18n/locales/te/contact.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const __TURBOPACK__default__export__ = {
    title: "మమ్మల్ని సంప్రదించండి",
    subtitle: "మాతో సంప్రదింపులో ఉండండి",
    getInTouch: "మేము మీ నుండి వినడానికి ఇష్టపడతాము",
    hero: {
        title: "సంప్రదించండి",
        subtitle: "యేషూవా బేత్ హలేల్ మినిస్ట్రీస్‌తో సంప్రదించండి"
    },
    studentForm: {
        title: "హల్లేల్ మ్యూజిక్ స్కూల్ విద్యార్థి దరఖాస్తు ఫారం",
        sections: {
            personalInfo: "1. వ్యక్తిగత సమాచారం",
            courseInfo: "2. కోర్సు సమాచారం",
            courseType: "3. కోర్సు రకం / సర్టిఫికేషన్ ఎంపికలు",
            musicBackground: "4. సంగీత నేపథ్యం (ఏదైనా ఉంటే)",
            goalsInterests: "5. లక్ష్యాలు & ఆసక్తులు",
            volunteer: "6. వాలంటీర్ అవకాశం",
            emergencyContact: "7. అత్యవసర సంప్రదింపు"
        },
        fields: {
            fullName: "పూర్తి పేరు",
            dateOfBirth: "పుట్టిన తేదీ",
            gender: "లింగం",
            address: "చిరునామా",
            cityStateZip: "నగరం / రాష్ట్రం / ZIP",
            phoneNumber: "ఫోన్ నంబర్",
            emailId: "ఇమెయిల్ ID",
            parentGuardianName: "తల్లిదండ్రులు / సంరక్షకుడి పేరు (18 ఏళ్ల లోపు ఉంటే)",
            parentGuardianContact: "తల్లిదండ్రులు / సంరక్షకుడి సంప్రదింపు",
            programApplyingFor: "దరఖాస్తు చేస్తున్న ప్రోగ్రామ్",
            instrumentSpecialization: "వాయిద్యం / స్పెషలైజేషన్",
            preferredClassType: "ఇష్టపడే క్లాస్ రకం",
            preferredSchedule: "ఇష్టపడే షెడ్యూల్",
            courseTypePrompt: "మీరు నమోదు చేయాలనుకుంటున్న కోర్సు రకాన్ని దయచేసి ఎంచుకోండి:",
            yearsOfExperience: "అనుభవం సంవత్సరాలు",
            previousTraining: "గత శిక్షణ / పాఠశాల",
            musicExamCertifications: "సంగీత పరీక్ష సర్టిఫికేషన్లు (ఏదైనా ఉంటే)",
            performanceExperience: "ప్రదర్శన అనుభవం",
            goalsPrompt: "మా సంగీత కార్యక్రమంలో చేరడం ద్వారా మీరు ఏమి సాధించాలని ఆశిస్తున్నారు?",
            goalsPlaceholder: "మీ సంగీత లక్ష్యాలు మరియు ఆకాంక్షలను పంచుకోండి...",
            volunteerPrompt: "పాఠశాల కార్యక్రమాలు, కచేరీలు లేదా వర్క్‌షాప్‌ల కోసం మీరు వాలంటీర్ కావాలనుకుంటున్నారా?",
            volunteerDetailsPrompt: "అవును అయితే, దయచేసి మీ ఆసక్తి ప్రాంతాన్ని పేర్కొనండి (ఉదా., వేదిక సెటప్, చిన్న విద్యార్థులకు సహాయం, ఈవెంట్ సమన్వయం):",
            emergencyName: "పేరు",
            emergencyRelationship: "సంబంధం",
            emergencyContact: "సంప్రదింపు నంబర్"
        },
        options: {
            beginner: "ప్రారంభకుడు",
            intermediate: "మధ్యస్థ",
            advanced: "అధునాతన",
            piano: "పియానో",
            guitar: "గిటార్",
            violin: "వయోలిన్",
            drums: "డ్రమ్స్",
            vocal: "గాత్ర",
            other: "ఇతర",
            individual: "వ్యక్తిగత",
            group: "సమూహం",
            online: "ఆన్‌లైన్",
            inPerson: "వ్యక్తిగతంగా",
            weekdays: "వారం రోజులు",
            weekends: "వారాంతాలు",
            morning: "ఉదయం",
            evening: "సాయంత్రం",
            freeBasicMusic: "నేను ఉచిత ప్రాథమిక సంగీతం నేర్చుకోవాలనుకుంటున్నాను",
            hmsWithCertificate: "నేను HMS సర్టిఫికేట్‌తో వృత్తిపరమైన సంగీతం నేర్చుకోవాలనుకుంటున్నాను (చెల్లించాల్సింది)",
            lcmWithCertificate: "నేను LCM సర్టిఫికేట్‌తో వృత్తిపరమైన సంగీతం నేర్చుకోవాలనుకుంటున్నాను (చెల్లించాల్సింది)",
            schoolEvents: "పాఠశాల కార్యక్రమాలు",
            competitions: "పోటీలు",
            choir: "గాయక బృందం",
            volunteerOnlineTeacher: "ఆన్‌లైన్ సంగీత ఉపాధ్యాయునిగా వాలంటీర్",
            volunteerOfflineConferences: "ఆఫ్‌లైన్ హల్లేల్ కాన్ఫరెన్స్‌లలో వాలంటీర్",
            volunteerSummerKids: "వేసవి పిల్లల శిక్షణ సెషన్‌ల కోసం వాలంటీర్",
            volunteerEvents: "HMS / YBH ఈవెంట్‌ల కోసం వాలంటీర్",
            yes: "అవును",
            no: "కాదు",
            male: "పురుషుడు",
            female: "మహిళ",
            preferNotToSay: "చెప్పకూడదనుకుంటున్నాను"
        },
        buttons: {
            submit: "దరఖాస్తు సమర్పించండి",
            submitting: "సమర్పిస్తోంది...",
            reset: "ఫారమ్‌ను రీసెట్ చేయండి"
        },
        messages: {
            success: "దరఖాస్తు విజయవంతంగా సమర్పించబడింది! మేము త్వరలో మిమ్మల్ని సంప్రదిస్తాము.",
            error: "మీ దరఖాస్తును సమర్పించడంలో లోపం ఉంది. దయచేసి మళ్లీ ప్రయత్నించండి."
        },
        validation: {
            // వ్యక్తిగత సమాచారం
            fullNameRequired: "పూర్తి పేరు అవసరం",
            fullNameMin: "పూర్తి పేరు కనీసం 2 అక్షరాలు ఉండాలి",
            fullNameMax: "పూర్తి పేరు 100 అక్షరాలకు మించకూడదు",
            fullNamePattern: "పూర్తి పేరులో అక్షరాలు, ఖాళీలు, చుక్కలు, హైఫన్లు మరియు అపోస్ట్రఫీలు మాత్రమే ఉండాలి",
            dateOfBirthRequired: "పుట్టిన తేదీ అవసరం",
            ageMinimum: "విద్యార్థి కనీసం 5 సంవత్సరాల వయస్సు ఉండాలి",
            genderRequired: "లింగం అవసరం",
            addressRequired: "చిరునామా అవసరం",
            addressMin: "చిరునామా కనీసం 5 అక్షరాలు ఉండాలి",
            addressMax: "చిరునామా 200 అక్షరాలకు మించకూడదు",
            cityStateZipRequired: "నగరం / రాష్ట్రం / ZIP అవసరం",
            cityStateZipMax: "నగరం / రాష్ట్రం / ZIP 100 అక్షరాలకు మించకూడదు",
            phoneRequired: "ఫోన్ నంబర్ అవసరం",
            phonePattern: "దయచేసి చెల్లుబాటు అయ్యే ఫోన్ నంబర్‌ను నమోదు చేయండి (10-15 అంకెలు)",
            emailRequired: "ఇమెయిల్ అవసరం",
            emailMax: "ఇమెయిల్ 100 అక్షరాలకు మించకూడదు",
            emailPattern: "దయచేసి చెల్లుబాటు అయ్యే ఇమెయిల్ చిరునామాను నమోదు చేయండి",
            nameMax: "పేరు 100 అక్షరాలకు మించకూడదు",
            // కోర్సు సమాచారం
            programRequired: "దయచేసి కనీసం ఒక ప్రోగ్రామ్ స్థాయిని ఎంచుకోండి",
            instrumentRequired: "దయచేసి కనీసం ఒక వాయిద్యాన్ని ఎంచుకోండి",
            instrumentOtherMax: "వాయిద్య వివరణ 50 అక్షరాలకు మించకూడదు",
            classTypeRequired: "దయచేసి కనీసం ఒక క్లాస్ రకాన్ని ఎంచుకోండి",
            scheduleRequired: "దయచేసి కనీసం ఒక షెడ్యూల్ ప్రాధాన్యతను ఎంచుకోండి",
            // కోర్సు రకం
            courseTypeRequired: "దయచేసి కనీసం ఒక కోర్సు రకాన్ని ఎంచుకోండి",
            // సంగీత నేపథ్యం
            yearsMin: "అనుభవం సంవత్సరాలు ప్రతికూలంగా ఉండకూడదు",
            yearsMax: "అనుభవం సంవత్సరాలు 100కు మించకూడదు",
            textMax200: "ఈ ఫీల్డ్ 200 అక్షరాలకు మించకూడదు",
            performanceOtherMax: "ప్రదర్శన వివరాలు 100 అక్షరాలకు మించకూడదు",
            // లక్ష్యాలు
            goalsMax: "లక్ష్యాలు 1000 అక్షరాలకు మించకూడదు",
            // అత్యవసర సంప్రదింపు
            emergencyNameRequired: "అత్యవసర సంప్రదింపు పేరు అవసరం",
            emergencyNameMin: "అత్యవసర సంప్రదింపు పేరు కనీసం 2 అక్షరాలు ఉండాలి",
            emergencyRelationshipRequired: "సంబంధం అవసరం",
            relationshipMax: "సంబంధం 50 అక్షరాలకు మించకూడదు",
            emergencyContactRequired: "అత్యవసర సంప్రదింపు నంబర్ అవసరం"
        }
    },
    tabs: {
        guinnessAttempt: "గిన్నిస్ వరల్డ్ రికార్డ్స్ ప్రయత్నం-2",
        studentForm: "HMS విద్యార్థి ఫారం",
        conferenceRequest: "మీ నగరంలో ఆఫ్‌లైన్ కాన్ఫరెన్స్?",
        lsmStudent: "లండన్ స్కూల్ ఆఫ్ మ్యూజిక్ విద్యార్థి?",
        sponsor: "ఈవెంట్‌కు స్పాన్సర్ అవ్వాలా?",
        trustee: "ట్రస్టీ అవ్వాలా?"
    },
    guinnessAttempt: {
        title: "గిన్నిస్ వరల్డ్ రికార్డ్స్ ప్రయత్నం-2",
        comingSoon: "కంటెంట్ త్వరలో వస్తుంది..."
    },
    conferenceRequest: {
        title: "మీ నగరంలో ఆఫ్‌లైన్ కాన్ఫరెన్స్?",
        comingSoon: "అభ్యర్థన ఫారం త్వరలో వస్తుంది..."
    },
    lsmStudent: {
        title: "లండన్ స్కూల్ ఆఫ్ మ్యూజిక్ విద్యార్థి?",
        comingSoon: "ఫారం త్వరలో వస్తుంది..."
    },
    sponsor: {
        title: "ఈవెంట్‌కు స్పాన్సర్ అవ్వాలా?",
        comingSoon: "స్పాన్సర్‌షిప్ సమాచారం త్వరలో వస్తుంది..."
    },
    trustee: {
        title: "ట్రస్టీ అవ్వాలా?",
        comingSoon: "సమాచారం త్వరలో వస్తుంది..."
    },
    formFields: {
        fullName: "పూర్తి పేరు",
        email: "ఇమెయిల్ చిరునామా",
        phone: "ఫోన్ నంబర్",
        message: "సందేశం",
        city: "నగరం",
        state: "రాష్ట్రం",
        country: "దేశం",
        organization: "సంస్థ",
        subject: "విషయం",
        submit: "సమర్పించండి",
        sending: "పంపుతోంది...",
        success: "ధన్యవాదాలు! మేము త్వరలో మీకు తిరిగి వస్తాము.",
        error: "మీ సందేశాన్ని పంపడంలో లోపం ఉంది. దయచేసి మళ్లీ ప్రయత్నించండి."
    },
    contactInfo: {
        title: "సంప్రదింపు సమాచారం",
        address: "చిరునామా",
        phone: "ఫోన్",
        email: "ఇమెయిల్",
        followUs: "మమ్మల్ని అనుసరించండి",
        hours: "కార్యాలయ సమయాలు",
        weekdays: "సోమవారం - శుక్రవారం: ఉదయం 9:00 - సాయంత్రం 6:00",
        saturday: "శనివారం: ఉదయం 10:00 - సాయంత్రం 4:00",
        sunday: "ఆదివారం: మూసివేయబడింది"
    },
    map: {
        title: "మమ్మల్ని కనుగొనండి",
        directions: "దిశలను పొందండి"
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/i18n/locales/en/awards.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const __TURBOPACK__default__export__ = {
    "title": "Awards",
    "subtitle": "Celebrating excellence and recognizing outstanding achievements in ministry",
    "comingSoon": "Content coming soon...",
    buttons: {
        viewPictures: "View Pictures",
        viewVideos: "View Videos",
        viewStories: "View Stories"
    },
    labels: {
        year: "Year",
        participants: "Participants",
        location: "Location"
    },
    records: {
        guinness: {
            name: "Guinness World Record",
            award: "Largest Human Formation of a Musical Instrument",
            year: "2022",
            participants: "3,842 people",
            location: "New York City, USA",
            description: "The record for the largest human formation of a musical instrument was achieved by forming a massive guitar shape. Participants dressed in coordinated colors created an aerial view of a perfectly formed guitar, breaking the previous record set in 2018."
        },
        ingenious: {
            name: "Ingenious Charm World Record",
            award: "Longest Chain of Handmade Paper Cranes",
            year: "2021",
            participants: "1,275 people",
            location: "Tokyo, Japan",
            description: "The record for the longest chain of handmade paper cranes was achieved with over 100,000 individually folded paper cranes, connected in a continuous chain that stretched over 5 kilometers when laid out. This feat represented peace and unity across different communities."
        },
        asian: {
            name: "Asian Book of Records",
            award: "Largest Human Chain for Environmental Awareness",
            year: "2023",
            participants: "5,128 people",
            location: "Singapore",
            description: "This record-breaking human chain was formed to raise awareness about environmental conservation in Asia. The participants formed a continuous chain spanning multiple districts, all wearing green and blue to represent land and water conservation efforts."
        },
        international: {
            name: "International Star Book of Records",
            award: "Most People Simultaneously Planting Trees",
            year: "2023",
            participants: "8,453 people",
            location: "Mumbai, India",
            description: "This record was set when over eight thousand participants planted tree saplings simultaneously across multiple locations, connected via live video. The initiative resulted in over 10,000 new trees being planted in a single day, contributing to urban reforestation efforts."
        }
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/i18n/locales/te/awards.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const __TURBOPACK__default__export__ = {
    "title": "అవార్డులు",
    "subtitle": "శ్రేష్ఠతను జరుపుకోవడం మరియు మంత్రిత్వంలో అత్యుత్తమ విజయాలను గుర్తించడం",
    "comingSoon": "కంటెంట్ త్వరలో వస్తుంది...",
    buttons: {
        viewPictures: "చిత్రాలను చూడండి",
        viewVideos: "వీడియోలను చూడండి",
        viewStories: "కథలను చూడండి"
    },
    labels: {
        year: "సంవత్సరం",
        participants: "పాల్గొనేవారు",
        location: "స్థలం"
    },
    records: {
        guinness: {
            name: "గిన్నిస్ వరల్డ్ రికార్డ్",
            award: "సంగీత వాయిద్యం యొక్క అతిపెద్ద మానవ నిర్మాణం",
            year: "2022",
            participants: "3,842 మంది",
            location: "న్యూయార్క్ సిటీ, USA",
            description: "సంగీత వాయిద్యం యొక్క అతిపెద్ద మానవ నిర్మాణం రికార్డు భారీ గిటార్ ఆకారాన్ని రూపొందించడం ద్వారా సాధించబడింది. పాల్గొనేవారు సమన్వయ రంగులలో దుస్తులు ధరించి, ఖచ్చితంగా రూపొందించబడిన గిటార్ యొక్క వైమానిక వీక్షణను సృష్టించారు, 2018లో నెలకొల్పబడిన మునుపటి రికార్డును బద్దలు కొట్టారు."
        },
        ingenious: {
            name: "ఇంజీనియస్ చార్మ్ వరల్డ్ రికార్డ్",
            award: "చేతితో తయారు చేసిన కాగితపు క్రేన్ల యొక్క అతి పొడవైన గొలుసు",
            year: "2021",
            participants: "1,275 మంది",
            location: "టోక్యో, జపాన్",
            description: "చేతితో తయారు చేసిన కాగితపు క్రేన్ల యొక్క అతి పొడవైన గొలుసు రికార్డు 100,000 కంటే ఎక్కువ వ్యక్తిగతంగా మడిచిన కాగితపు క్రేన్లతో సాధించబడింది, ఇవి నిరంతర గొలుసులో అనుసంధానించబడ్డాయి మరియు విస్తరించినప్పుడు 5 కిలోమీటర్లకు పైగా విస్తరించింది. ఈ విజయం వివిధ సమాజాల మధ్య శాంతి మరియు ఐక్యతను సూచిస్తుంది."
        },
        asian: {
            name: "ఆసియన్ బుక్ ఆఫ్ రికార్డ్స్",
            award: "పర్యావరణ అవగాహన కోసం అతిపెద్ద మానవ గొలుసు",
            year: "2023",
            participants: "5,128 మంది",
            location: "సింగపూర్",
            description: "ఆసియాలో పర్యావరణ పరిరక్షణ గురించి అవగాహన కల్పించడానికి ఈ రికార్డు-బద్దలు కొట్టే మానవ గొలుసు ఏర్పడింది. పాల్గొనేవారు భూమి మరియు నీటి పరిరక్షణ ప్రయత్నాలను సూచించడానికి ఆకుపచ్చ మరియు నీలం రంగులను ధరించి, అనేక జిల్లాలలో విస్తరించిన నిరంతర గొలుసును ఏర్పరచారు."
        },
        international: {
            name: "ఇంటర్నేషనల్ స్టార్ బుక్ ఆఫ్ రికార్డ్స్",
            award: "ఏకకాలంలో చెట్లను నాటిన అత్యధిక మంది వ్యక్తులు",
            year: "2023",
            participants: "8,453 మంది",
            location: "ముంబై, భారతదేశం",
            description: "ఎనిమిది వేలకు పైగా పాల్గొనేవారు లైవ్ వీడియో ద్వారా అనుసంధానించబడిన అనేక ప్రదేశాలలో ఏకకాలంలో చెట్ల మొక్కలను నాటినప్పుడు ఈ రికార్డు నెలకొల్పబడింది. ఈ చొరవ ఒకే రోజులో 10,000 కంటే ఎక్కువ కొత్త చెట్లు నాటడానికి దారితీసింది, పట్టణ అటవీకరణ ప్రయత్నాలకు దోహదపడింది."
        }
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/i18n/config.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$i18next$2f$dist$2f$esm$2f$i18next$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/i18next/dist/esm/i18next.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/react-i18next/dist/es/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$initReactI18next$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-i18next/dist/es/initReactI18next.js [app-client] (ecmascript)");
// Import translation files (TypeScript modules)
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$locales$2f$en$2f$common$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/i18n/locales/en/common.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$locales$2f$te$2f$common$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/i18n/locales/te/common.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$locales$2f$en$2f$home$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/i18n/locales/en/home.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$locales$2f$te$2f$home$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/i18n/locales/te/home.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$locales$2f$en$2f$about$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/i18n/locales/en/about.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$locales$2f$te$2f$about$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/i18n/locales/te/about.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$locales$2f$en$2f$ministries$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/i18n/locales/en/ministries.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$locales$2f$te$2f$ministries$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/i18n/locales/te/ministries.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$locales$2f$en$2f$gallery$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/i18n/locales/en/gallery.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$locales$2f$te$2f$gallery$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/i18n/locales/te/gallery.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$locales$2f$en$2f$resources$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/i18n/locales/en/resources.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$locales$2f$te$2f$resources$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/i18n/locales/te/resources.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$locales$2f$en$2f$news$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/i18n/locales/en/news.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$locales$2f$te$2f$news$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/i18n/locales/te/news.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$locales$2f$en$2f$donate$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/i18n/locales/en/donate.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$locales$2f$te$2f$donate$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/i18n/locales/te/donate.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$locales$2f$en$2f$careers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/i18n/locales/en/careers.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$locales$2f$te$2f$careers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/i18n/locales/te/careers.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$locales$2f$en$2f$directors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/i18n/locales/en/directors.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$locales$2f$te$2f$directors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/i18n/locales/te/directors.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$locales$2f$en$2f$stories$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/i18n/locales/en/stories.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$locales$2f$te$2f$stories$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/i18n/locales/te/stories.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$locales$2f$en$2f$legal$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/i18n/locales/en/legal.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$locales$2f$te$2f$legal$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/i18n/locales/te/legal.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$locales$2f$en$2f$contact$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/i18n/locales/en/contact.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$locales$2f$te$2f$contact$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/i18n/locales/te/contact.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$locales$2f$en$2f$awards$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/i18n/locales/en/awards.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$locales$2f$te$2f$awards$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/i18n/locales/te/awards.ts [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
const resources = {
    en: {
        common: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$locales$2f$en$2f$common$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
        home: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$locales$2f$en$2f$home$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
        about: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$locales$2f$en$2f$about$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
        ministries: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$locales$2f$en$2f$ministries$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
        gallery: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$locales$2f$en$2f$gallery$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
        resources: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$locales$2f$en$2f$resources$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
        news: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$locales$2f$en$2f$news$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
        donate: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$locales$2f$en$2f$donate$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
        careers: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$locales$2f$en$2f$careers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
        directors: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$locales$2f$en$2f$directors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
        stories: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$locales$2f$en$2f$stories$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
        legal: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$locales$2f$en$2f$legal$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
        contact: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$locales$2f$en$2f$contact$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
        awards: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$locales$2f$en$2f$awards$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
    },
    te: {
        common: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$locales$2f$te$2f$common$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
        home: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$locales$2f$te$2f$home$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
        about: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$locales$2f$te$2f$about$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
        ministries: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$locales$2f$te$2f$ministries$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
        gallery: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$locales$2f$te$2f$gallery$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
        resources: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$locales$2f$te$2f$resources$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
        news: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$locales$2f$te$2f$news$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
        donate: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$locales$2f$te$2f$donate$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
        careers: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$locales$2f$te$2f$careers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
        directors: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$locales$2f$te$2f$directors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
        stories: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$locales$2f$te$2f$stories$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
        legal: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$locales$2f$te$2f$legal$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
        contact: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$locales$2f$te$2f$contact$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
        awards: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$locales$2f$te$2f$awards$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
    }
};
__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$i18next$2f$dist$2f$esm$2f$i18next$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].use(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$initReactI18next$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initReactI18next"]).init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    defaultNS: 'common',
    interpolation: {
        escapeValue: false
    },
    react: {
        useSuspense: false
    }
});
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$i18next$2f$dist$2f$esm$2f$i18next$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/TopBanner.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TopBanner",
    ()=>TopBanner
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/menu.js [app-client] (ecmascript) <export default as Menu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
;
;
const ybhLogo = 'https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/logo/YBH.jpg';
const guinnessWorldRecords = 'https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/awards/guiness.png';
const asianBookOfRecords = 'https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/awards/Asian%20book%20of%20records.png';
const ingeniousWorldRecords = 'https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/awards/ingenious.png';
const internationalStarBookOfRecords = 'https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/awards/Star%20book%20of%20records%20-%20final.png';
function TopBanner({ isMenuOpen = false, onMenuToggle }) {
    const handleLogoClick = ()=>{
        window.history.pushState({}, '', '/');
        window.dispatchEvent(new PopStateEvent('popstate'));
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-black py-3 px-4",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container mx-auto",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between gap-2 lg:hidden",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: handleLogoClick,
                            className: "outline-none transition-opacity hover:opacity-80 cursor-pointer flex-shrink-0",
                            "aria-label": "Go to home page",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: ybhLogo,
                                alt: "Yeshua Beth Hallel Ministries",
                                className: "h-12 w-auto object-contain"
                            }, void 0, false, {
                                fileName: "[project]/src/components/TopBanner.tsx",
                                lineNumber: 30,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/TopBanner.tsx",
                            lineNumber: 25,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-white text-sm sm:text-base flex-1 tracking-wide leading-tight text-center",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                children: "YESHUA BETH HALLEL MINISTRIES"
                            }, void 0, false, {
                                fileName: "[project]/src/components/TopBanner.tsx",
                                lineNumber: 37,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/TopBanner.tsx",
                            lineNumber: 36,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onMenuToggle,
                            className: "text-white hover:text-yellow-400 cursor-pointer p-2 flex-shrink-0",
                            "aria-label": "Toggle menu",
                            children: isMenuOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                size: 24
                            }, void 0, false, {
                                fileName: "[project]/src/components/TopBanner.tsx",
                                lineNumber: 45,
                                columnNumber: 27
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
                                size: 24
                            }, void 0, false, {
                                fileName: "[project]/src/components/TopBanner.tsx",
                                lineNumber: 45,
                                columnNumber: 45
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/TopBanner.tsx",
                            lineNumber: 40,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/TopBanner.tsx",
                    lineNumber: 24,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "hidden lg:flex items-center justify-between relative",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleLogoClick,
                                className: "outline-none transition-opacity hover:opacity-80 cursor-pointer",
                                "aria-label": "Go to home page",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: ybhLogo,
                                    alt: "Yeshua Beth Hallel Ministries",
                                    className: "h-16 w-auto object-contain"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/TopBanner.tsx",
                                    lineNumber: 58,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/TopBanner.tsx",
                                lineNumber: 53,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/TopBanner.tsx",
                            lineNumber: 52,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute left-1/2 transform -translate-x-1/2",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-white text-3xl tracking-wide whitespace-nowrap",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                    children: "YESHUA BETH HALLEL MINISTRIES"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/TopBanner.tsx",
                                    lineNumber: 69,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/TopBanner.tsx",
                                lineNumber: 68,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/TopBanner.tsx",
                            lineNumber: 67,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: guinnessWorldRecords,
                                    alt: "Guinness World Records",
                                    className: "h-12 w-auto object-contain"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/TopBanner.tsx",
                                    lineNumber: 75,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: asianBookOfRecords,
                                    alt: "Asian Book of Records",
                                    className: "h-12 w-auto object-contain"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/TopBanner.tsx",
                                    lineNumber: 80,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: ingeniousWorldRecords,
                                    alt: "Ingenious Charm World Records",
                                    className: "h-12 w-auto object-contain"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/TopBanner.tsx",
                                    lineNumber: 85,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: internationalStarBookOfRecords,
                                    alt: "International Star Book of Records",
                                    className: "h-12 w-auto object-contain"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/TopBanner.tsx",
                                    lineNumber: 90,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/TopBanner.tsx",
                            lineNumber: 74,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/TopBanner.tsx",
                    lineNumber: 50,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/TopBanner.tsx",
            lineNumber: 22,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/TopBanner.tsx",
        lineNumber: 21,
        columnNumber: 5
    }, this);
}
_c = TopBanner;
var _c;
__turbopack_context__.k.register(_c, "TopBanner");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/HeaderNext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HeaderNext",
    ()=>HeaderNext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$TopBanner$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/TopBanner.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/react-i18next/dist/es/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-i18next/dist/es/useTranslation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function HeaderNext() {
    _s();
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"])('common');
    const [isMenuOpen, setIsMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const [headerHeight, setHeaderHeight] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const headerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // New menu structure based on client requirements with translations
    const menuItems = [
        {
            label: t('header.menu.home'),
            url: '/'
        },
        {
            label: t('header.menu.about'),
            url: '/about'
        },
        {
            label: t('header.menu.ministries'),
            url: '/ministries'
        },
        {
            label: t('header.menu.gallery'),
            url: '/gallery'
        },
        {
            label: t('header.menu.news'),
            url: '/news'
        },
        {
            label: t('header.menu.awards'),
            url: '/awards'
        },
        {
            label: t('header.menu.resources'),
            url: '/resources'
        },
        {
            label: t('header.menu.directors'),
            url: '/directors'
        },
        {
            label: t('header.menu.stories'),
            url: '/stories'
        },
        {
            label: t('header.menu.contact'),
            url: '/contact'
        },
        {
            label: t('header.menu.donate'),
            url: '/donate'
        }
    ];
    // Calculate header height on mount and resize
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HeaderNext.useEffect": ()=>{
            const updateHeaderHeight = {
                "HeaderNext.useEffect.updateHeaderHeight": ()=>{
                    if (headerRef.current) {
                        setHeaderHeight(headerRef.current.offsetHeight);
                    }
                }
            }["HeaderNext.useEffect.updateHeaderHeight"];
            updateHeaderHeight();
            window.addEventListener('resize', updateHeaderHeight);
            return ({
                "HeaderNext.useEffect": ()=>{
                    window.removeEventListener('resize', updateHeaderHeight);
                }
            })["HeaderNext.useEffect"];
        }
    }["HeaderNext.useEffect"], []);
    // Prevent body scroll when mobile menu is open
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HeaderNext.useEffect": ()=>{
            if (isMenuOpen) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'unset';
            }
            return ({
                "HeaderNext.useEffect": ()=>{
                    document.body.style.overflow = 'unset';
                }
            })["HeaderNext.useEffect"];
        }
    }["HeaderNext.useEffect"], [
        isMenuOpen
    ]);
    // Function to check if menu item is active
    const isMenuItemActive = (item)=>{
        const normalizedPathname = pathname || '/';
        const normalizedItemUrl = item.url || '';
        return normalizedItemUrl === normalizedPathname;
    };
    const handleMenuItemClick = ()=>{
        setIsMenuOpen(false);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        ref: headerRef,
        className: "fixed top-0 left-0 right-0 z-50",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$TopBanner$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TopBanner"], {
                isMenuOpen: isMenuOpen,
                onMenuToggle: ()=>setIsMenuOpen(!isMenuOpen)
            }, void 0, false, {
                fileName: "[project]/src/components/HeaderNext.tsx",
                lineNumber: 111,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                className: `shadow-md ${isMenuOpen ? 'block' : 'hidden lg:block'}`,
                style: {
                    backgroundColor: '#2E2E2E'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "container mx-auto px-4 py-4 lg:py-2",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-center lg:justify-between",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "hidden lg:flex items-center justify-evenly w-full",
                            children: menuItems.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: item.url || '/',
                                    className: `px-2 py-1 text-sm ${item.label === 'DONATE' ? 'text-black bg-[#FDB813] hover:bg-[#DAA520] animate-gentle-pulse' : isMenuItemActive(item) ? 'text-yellow-400 bg-gray-800' : 'text-white hover:text-yellow-400 hover:bg-gray-800'} rounded transition-colors cursor-pointer font-bold`,
                                    children: item.label
                                }, item.label, false, {
                                    fileName: "[project]/src/components/HeaderNext.tsx",
                                    lineNumber: 119,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/components/HeaderNext.tsx",
                            lineNumber: 117,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/HeaderNext.tsx",
                        lineNumber: 115,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/HeaderNext.tsx",
                    lineNumber: 114,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/HeaderNext.tsx",
                lineNumber: 113,
                columnNumber: 7
            }, this),
            isMenuOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "lg:hidden fixed left-0 right-0 bg-[#2E2E2E] shadow-lg overflow-y-auto z-40",
                style: {
                    top: `${headerHeight}px`,
                    maxHeight: `calc(100vh - ${headerHeight}px)`
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "container mx-auto px-4 py-3",
                    children: menuItems.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: item.url || '/',
                            onClick: handleMenuItemClick,
                            className: `block w-full text-left px-3 py-1.5 mb-1.5 ${item.label === 'DONATE' ? 'text-black bg-[#FDB813] hover:bg-[#DAA520] animate-gentle-pulse' : isMenuItemActive(item) ? 'text-yellow-400 bg-gray-800' : 'text-white hover:bg-gray-800 hover:text-yellow-400'} rounded transition-colors cursor-pointer font-bold`,
                            children: item.label
                        }, item.label, false, {
                            fileName: "[project]/src/components/HeaderNext.tsx",
                            lineNumber: 144,
                            columnNumber: 15
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/components/HeaderNext.tsx",
                    lineNumber: 142,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/HeaderNext.tsx",
                lineNumber: 140,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/HeaderNext.tsx",
        lineNumber: 110,
        columnNumber: 5
    }, this);
}
_s(HeaderNext, "LKbT0doozlVJO+KlPjhwJsg88XU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = HeaderNext;
var _c;
__turbopack_context__.k.register(_c, "HeaderNext");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/HMSStudentForm.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HMSStudentForm",
    ()=>HMSStudentForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-hook-form/dist/index.esm.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/react-i18next/dist/es/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-i18next/dist/es/useTranslation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
function HMSStudentForm({ onClose }) {
    _s();
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"])('contact');
    const { register, handleSubmit, watch, setValue, reset, formState: { errors, isSubmitting } } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForm"])({
        mode: 'onBlur',
        defaultValues: {
            programApplyingFor: [],
            instrumentSpecialization: [],
            preferredClassType: [],
            preferredSchedule: [],
            courseType: [],
            performanceExperience: [],
            volunteerAreas: [],
            volunteerInterested: 'no'
        }
    });
    const [submitSuccess, setSubmitSuccess] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [programLevels, setProgramLevels] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [instruments, setInstruments] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [classTypes, setClassTypes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [schedules, setSchedules] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [courseTypes, setCourseTypes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [performances, setPerformances] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [volunteerAreas, setVolunteerAreas] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const volunteerInterested = watch('volunteerInterested');
    const handleCheckboxChange = (value, checked, stateArray, setStateArray)=>{
        if (checked) {
            setStateArray([
                ...stateArray,
                value
            ]);
        } else {
            setStateArray(stateArray.filter((item)=>item !== value));
        }
    };
    const handleReset = ()=>{
        reset();
        setProgramLevels([]);
        setInstruments([]);
        setClassTypes([]);
        setSchedules([]);
        setCourseTypes([]);
        setPerformances([]);
        setVolunteerAreas([]);
        setSubmitSuccess(false);
    };
    const onSubmit = async (data)=>{
        try {
            // Validate checkbox arrays
            if (programLevels.length === 0) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(t('studentForm.validation.programRequired'));
                return;
            }
            if (instruments.length === 0) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(t('studentForm.validation.instrumentRequired'));
                return;
            }
            if (classTypes.length === 0) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(t('studentForm.validation.classTypeRequired'));
                return;
            }
            if (schedules.length === 0) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(t('studentForm.validation.scheduleRequired'));
                return;
            }
            if (courseTypes.length === 0) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(t('studentForm.validation.courseTypeRequired'));
                return;
            }
            // Add the state arrays to form data
            data.programApplyingFor = programLevels;
            data.instrumentSpecialization = instruments;
            data.preferredClassType = classTypes;
            data.preferredSchedule = schedules;
            data.courseType = courseTypes;
            data.performanceExperience = performances;
            data.volunteerAreas = volunteerAreas;
            console.log('Form submitted:', data);
            // TODO: Replace with actual API call to Supabase
            await new Promise((resolve)=>setTimeout(resolve, 1000));
            setSubmitSuccess(true);
            handleReset();
            // Reset success message after 3 seconds
            setTimeout(()=>setSubmitSuccess(false), 3000);
        } catch (error) {
            console.error('Form submission error:', error);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(t('studentForm.messages.error'));
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-5xl mx-auto",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
        input[type="checkbox"]:checked {
          border: 2px solid white !important;
        }
      `
            }, void 0, false, {
                fileName: "[project]/src/components/HMSStudentForm.tsx",
                lineNumber: 152,
                columnNumber: 7
            }, this),
            submitSuccess && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                initial: {
                    opacity: 0,
                    y: -10
                },
                animate: {
                    opacity: 1,
                    y: 0
                },
                className: "bg-green-900/50 text-green-100 p-4 rounded mb-6",
                children: t('studentForm.messages.success')
            }, void 0, false, {
                fileName: "[project]/src/components/HMSStudentForm.tsx",
                lineNumber: 159,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                onSubmit: handleSubmit(onSubmit),
                className: "space-y-10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "bg-[#2E2E2E] rounded-lg p-6 md:p-8 shadow-lg",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-2xl text-white font-normal mb-2",
                                children: t('studentForm.sections.personalInfo')
                            }, void 0, false, {
                                fileName: "[project]/src/components/HMSStudentForm.tsx",
                                lineNumber: 172,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-24 h-1 bg-[#FDB813] mb-6"
                            }, void 0, false, {
                                fileName: "[project]/src/components/HMSStudentForm.tsx",
                                lineNumber: 175,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 md:grid-cols-2 gap-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "md:col-span-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                htmlFor: "fullName",
                                                className: "block text-white text-sm font-medium mb-1",
                                                children: [
                                                    t('studentForm.fields.fullName'),
                                                    " *"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/HMSStudentForm.tsx",
                                                lineNumber: 178,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                id: "fullName",
                                                type: "text",
                                                ...register('fullName', {
                                                    required: t('studentForm.validation.fullNameRequired'),
                                                    minLength: {
                                                        value: 2,
                                                        message: t('studentForm.validation.fullNameMin')
                                                    },
                                                    maxLength: {
                                                        value: 100,
                                                        message: t('studentForm.validation.fullNameMax')
                                                    },
                                                    pattern: {
                                                        value: /^[a-zA-Z\s.'-]+$/,
                                                        message: t('studentForm.validation.fullNamePattern')
                                                    }
                                                }),
                                                className: `w-full px-4 py-2 bg-black rounded border ${errors.fullName ? 'border-red-500' : 'border-gray-600'} text-white focus:outline-none focus:border-[#FDB813] cursor-text`,
                                                placeholder: "Enter your full name",
                                                maxLength: 100
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/HMSStudentForm.tsx",
                                                lineNumber: 181,
                                                columnNumber: 15
                                            }, this),
                                            errors.fullName && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-red-400 text-xs mt-1",
                                                children: errors.fullName.message
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/HMSStudentForm.tsx",
                                                lineNumber: 198,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/HMSStudentForm.tsx",
                                        lineNumber: 177,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                htmlFor: "dateOfBirth",
                                                className: "block text-white text-sm font-medium mb-1",
                                                children: [
                                                    t('studentForm.fields.dateOfBirth'),
                                                    " *"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/HMSStudentForm.tsx",
                                                lineNumber: 203,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                id: "dateOfBirth",
                                                type: "text",
                                                ...register('dateOfBirth', {
                                                    required: t('studentForm.validation.dateOfBirthRequired'),
                                                    pattern: {
                                                        value: /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[012])-\d{4}$/,
                                                        message: 'Please enter date in DD-MM-YYYY format'
                                                    },
                                                    validate: (value)=>{
                                                        // Parse DD-MM-YYYY format
                                                        const parts = value.split('-');
                                                        if (parts.length !== 3) return t('studentForm.validation.ageMinimum');
                                                        const day = parseInt(parts[0], 10);
                                                        const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed
                                                        const year = parseInt(parts[2], 10);
                                                        const date = new Date(year, month, day);
                                                        const today = new Date();
                                                        // Validate it's a valid date
                                                        if (date.getDate() !== day || date.getMonth() !== month || date.getFullYear() !== year) {
                                                            return 'Please enter a valid date';
                                                        }
                                                        // Check age is at least 5 years
                                                        const age = today.getFullYear() - date.getFullYear();
                                                        const monthDiff = today.getMonth() - date.getMonth();
                                                        const dayDiff = today.getDate() - date.getDate();
                                                        if (age < 5 || age === 5 && (monthDiff < 0 || monthDiff === 0 && dayDiff < 0)) {
                                                            return t('studentForm.validation.ageMinimum');
                                                        }
                                                        // Check date is not in the future
                                                        if (date > today) {
                                                            return 'Date of birth cannot be in the future';
                                                        }
                                                        return true;
                                                    }
                                                }),
                                                className: `w-full px-4 py-2 bg-black rounded border ${errors.dateOfBirth ? 'border-red-500' : 'border-gray-600'} text-white focus:outline-none focus:border-[#FDB813] cursor-text`,
                                                placeholder: "DD-MM-YYYY",
                                                maxLength: 10
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/HMSStudentForm.tsx",
                                                lineNumber: 206,
                                                columnNumber: 15
                                            }, this),
                                            errors.dateOfBirth && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-red-400 text-xs mt-1",
                                                children: errors.dateOfBirth.message
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/HMSStudentForm.tsx",
                                                lineNumber: 254,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/HMSStudentForm.tsx",
                                        lineNumber: 202,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                htmlFor: "gender",
                                                className: "block text-white text-sm font-medium mb-1",
                                                children: [
                                                    t('studentForm.fields.gender'),
                                                    " *"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/HMSStudentForm.tsx",
                                                lineNumber: 259,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                id: "gender",
                                                ...register('gender', {
                                                    required: t('studentForm.validation.genderRequired')
                                                }),
                                                className: `w-full px-4 py-2 bg-black rounded border ${errors.gender ? 'border-red-500' : 'border-gray-600'} text-white focus:outline-none focus:border-[#FDB813] cursor-pointer`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "",
                                                        children: "Select your gender"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/HMSStudentForm.tsx",
                                                        lineNumber: 267,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "male",
                                                        children: t('studentForm.options.male')
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/HMSStudentForm.tsx",
                                                        lineNumber: 268,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "female",
                                                        children: t('studentForm.options.female')
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/HMSStudentForm.tsx",
                                                        lineNumber: 269,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "preferNotToSay",
                                                        children: t('studentForm.options.preferNotToSay')
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/HMSStudentForm.tsx",
                                                        lineNumber: 270,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/HMSStudentForm.tsx",
                                                lineNumber: 262,
                                                columnNumber: 15
                                            }, this),
                                            errors.gender && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-red-400 text-xs mt-1",
                                                children: errors.gender.message
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/HMSStudentForm.tsx",
                                                lineNumber: 273,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/HMSStudentForm.tsx",
                                        lineNumber: 258,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "md:col-span-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                htmlFor: "address",
                                                className: "block text-white text-sm font-medium mb-1",
                                                children: [
                                                    t('studentForm.fields.address'),
                                                    " *"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/HMSStudentForm.tsx",
                                                lineNumber: 278,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                id: "address",
                                                type: "text",
                                                ...register('address', {
                                                    required: t('studentForm.validation.addressRequired'),
                                                    minLength: {
                                                        value: 5,
                                                        message: t('studentForm.validation.addressMin')
                                                    },
                                                    maxLength: {
                                                        value: 200,
                                                        message: t('studentForm.validation.addressMax')
                                                    }
                                                }),
                                                className: `w-full px-4 py-2 bg-black rounded border ${errors.address ? 'border-red-500' : 'border-gray-600'} text-white focus:outline-none focus:border-[#FDB813] cursor-text`,
                                                placeholder: "Enter your street address",
                                                maxLength: 200
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/HMSStudentForm.tsx",
                                                lineNumber: 281,
                                                columnNumber: 15
                                            }, this),
                                            errors.address && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-red-400 text-xs mt-1",
                                                children: errors.address.message
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/HMSStudentForm.tsx",
                                                lineNumber: 294,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/HMSStudentForm.tsx",
                                        lineNumber: 277,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "md:col-span-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                htmlFor: "cityStateZip",
                                                className: "block text-white text-sm font-medium mb-1",
                                                children: [
                                                    t('studentForm.fields.cityStateZip'),
                                                    " *"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/HMSStudentForm.tsx",
                                                lineNumber: 299,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                id: "cityStateZip",
                                                type: "text",
                                                ...register('cityStateZip', {
                                                    required: t('studentForm.validation.cityStateZipRequired'),
                                                    maxLength: {
                                                        value: 100,
                                                        message: t('studentForm.validation.cityStateZipMax')
                                                    }
                                                }),
                                                className: `w-full px-4 py-2 bg-black rounded border ${errors.cityStateZip ? 'border-red-500' : 'border-gray-600'} text-white focus:outline-none focus:border-[#FDB813] cursor-text`,
                                                placeholder: "Enter city, state, and ZIP code",
                                                maxLength: 100
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/HMSStudentForm.tsx",
                                                lineNumber: 302,
                                                columnNumber: 15
                                            }, this),
                                            errors.cityStateZip && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-red-400 text-xs mt-1",
                                                children: errors.cityStateZip.message
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/HMSStudentForm.tsx",
                                                lineNumber: 314,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/HMSStudentForm.tsx",
                                        lineNumber: 298,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                htmlFor: "phoneNumber",
                                                className: "block text-white text-sm font-medium mb-1",
                                                children: [
                                                    t('studentForm.fields.phoneNumber'),
                                                    " *"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/HMSStudentForm.tsx",
                                                lineNumber: 319,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                id: "phoneNumber",
                                                type: "tel",
                                                ...register('phoneNumber', {
                                                    required: t('studentForm.validation.phoneRequired'),
                                                    pattern: {
                                                        value: /^[0-9+\-\s()]{10,15}$/,
                                                        message: t('studentForm.validation.phonePattern')
                                                    }
                                                }),
                                                className: `w-full px-4 py-2 bg-black rounded border ${errors.phoneNumber ? 'border-red-500' : 'border-gray-600'} text-white focus:outline-none focus:border-[#FDB813] cursor-text`,
                                                maxLength: 15,
                                                placeholder: "(123) 456-7890"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/HMSStudentForm.tsx",
                                                lineNumber: 322,
                                                columnNumber: 15
                                            }, this),
                                            errors.phoneNumber && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-red-400 text-xs mt-1",
                                                children: errors.phoneNumber.message
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/HMSStudentForm.tsx",
                                                lineNumber: 337,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/HMSStudentForm.tsx",
                                        lineNumber: 318,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                htmlFor: "emailId",
                                                className: "block text-white text-sm font-medium mb-1",
                                                children: [
                                                    t('studentForm.fields.emailId'),
                                                    " *"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/HMSStudentForm.tsx",
                                                lineNumber: 342,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                id: "emailId",
                                                type: "email",
                                                ...register('emailId', {
                                                    required: t('studentForm.validation.emailRequired'),
                                                    maxLength: {
                                                        value: 100,
                                                        message: t('studentForm.validation.emailMax')
                                                    },
                                                    pattern: {
                                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                                        message: t('studentForm.validation.emailPattern')
                                                    }
                                                }),
                                                className: `w-full px-4 py-2 bg-black rounded border ${errors.emailId ? 'border-red-500' : 'border-gray-600'} text-white focus:outline-none focus:border-[#FDB813] cursor-text`,
                                                maxLength: 100,
                                                placeholder: "example@email.com"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/HMSStudentForm.tsx",
                                                lineNumber: 345,
                                                columnNumber: 15
                                            }, this),
                                            errors.emailId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-red-400 text-xs mt-1",
                                                children: errors.emailId.message
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/HMSStudentForm.tsx",
                                                lineNumber: 361,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/HMSStudentForm.tsx",
                                        lineNumber: 341,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                htmlFor: "parentGuardianName",
                                                className: "block text-white text-sm font-medium mb-1",
                                                children: t('studentForm.fields.parentGuardianName')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/HMSStudentForm.tsx",
                                                lineNumber: 366,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                id: "parentGuardianName",
                                                type: "text",
                                                ...register('parentGuardianName', {
                                                    maxLength: {
                                                        value: 100,
                                                        message: t('studentForm.validation.nameMax')
                                                    }
                                                }),
                                                className: `w-full px-4 py-2 bg-black rounded border ${errors.parentGuardianName ? 'border-red-500' : 'border-gray-600'} text-white focus:outline-none focus:border-[#FDB813] cursor-text`,
                                                placeholder: "Enter parent/guardian name",
                                                maxLength: 100
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/HMSStudentForm.tsx",
                                                lineNumber: 369,
                                                columnNumber: 15
                                            }, this),
                                            errors.parentGuardianName && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-red-400 text-xs mt-1",
                                                children: errors.parentGuardianName.message
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/HMSStudentForm.tsx",
                                                lineNumber: 380,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/HMSStudentForm.tsx",
                                        lineNumber: 365,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                htmlFor: "parentGuardianContact",
                                                className: "block text-white text-sm font-medium mb-1",
                                                children: t('studentForm.fields.parentGuardianContact')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/HMSStudentForm.tsx",
                                                lineNumber: 385,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                id: "parentGuardianContact",
                                                type: "tel",
                                                ...register('parentGuardianContact', {
                                                    pattern: {
                                                        value: /^[0-9+\-\s()]{10,15}$/,
                                                        message: t('studentForm.validation.phonePattern')
                                                    }
                                                }),
                                                className: `w-full px-4 py-2 bg-black rounded border ${errors.parentGuardianContact ? 'border-red-500' : 'border-gray-600'} text-white focus:outline-none focus:border-[#FDB813] cursor-text`,
                                                maxLength: 15,
                                                placeholder: "(123) 456-7890"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/HMSStudentForm.tsx",
                                                lineNumber: 388,
                                                columnNumber: 15
                                            }, this),
                                            errors.parentGuardianContact && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-red-400 text-xs mt-1",
                                                children: errors.parentGuardianContact.message
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/HMSStudentForm.tsx",
                                                lineNumber: 402,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/HMSStudentForm.tsx",
                                        lineNumber: 384,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/HMSStudentForm.tsx",
                                lineNumber: 176,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/HMSStudentForm.tsx",
                        lineNumber: 171,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "bg-[#2E2E2E] rounded-lg p-6 md:p-8 shadow-lg",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-2xl text-white font-normal mb-2",
                                children: t('studentForm.sections.courseInfo')
                            }, void 0, false, {
                                fileName: "[project]/src/components/HMSStudentForm.tsx",
                                lineNumber: 410,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-24 h-1 bg-[#FDB813] mb-6"
                            }, void 0, false, {
                                fileName: "[project]/src/components/HMSStudentForm.tsx",
                                lineNumber: 413,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-white text-sm font-medium mb-3",
                                                children: [
                                                    t('studentForm.fields.programApplyingFor'),
                                                    " *"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/HMSStudentForm.tsx",
                                                lineNumber: 418,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-wrap gap-4",
                                                children: [
                                                    'beginner',
                                                    'intermediate',
                                                    'advanced'
                                                ].map((level)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center space-x-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "checkbox",
                                                                id: `program-${level}`,
                                                                checked: programLevels.includes(level),
                                                                onChange: (e)=>handleCheckboxChange(level, e.target.checked, programLevels, setProgramLevels),
                                                                className: "w-4 h-4 bg-white border-gray-600 rounded cursor-pointer accent-black",
                                                                style: {
                                                                    accentColor: '#000000'
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/HMSStudentForm.tsx",
                                                                lineNumber: 424,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                htmlFor: `program-${level}`,
                                                                className: "text-white text-sm cursor-pointer",
                                                                children: t(`studentForm.options.${level}`)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/HMSStudentForm.tsx",
                                                                lineNumber: 432,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, level, true, {
                                                        fileName: "[project]/src/components/HMSStudentForm.tsx",
                                                        lineNumber: 423,
                                                        columnNumber: 19
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/HMSStudentForm.tsx",
                                                lineNumber: 421,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/HMSStudentForm.tsx",
                                        lineNumber: 417,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-white text-sm font-medium mb-3",
                                                children: [
                                                    t('studentForm.fields.instrumentSpecialization'),
                                                    " *"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/HMSStudentForm.tsx",
                                                lineNumber: 442,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-wrap gap-4",
                                                children: [
                                                    [
                                                        'piano',
                                                        'guitar',
                                                        'violin',
                                                        'drums',
                                                        'vocal'
                                                    ].map((instrument)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center space-x-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    type: "checkbox",
                                                                    id: `instrument-${instrument}`,
                                                                    checked: instruments.includes(instrument),
                                                                    onChange: (e)=>handleCheckboxChange(instrument, e.target.checked, instruments, setInstruments),
                                                                    className: "w-4 h-4 bg-white border-gray-600 rounded cursor-pointer accent-black",
                                                                    style: {
                                                                        accentColor: '#000000'
                                                                    }
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/HMSStudentForm.tsx",
                                                                    lineNumber: 448,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                    htmlFor: `instrument-${instrument}`,
                                                                    className: "text-white text-sm cursor-pointer",
                                                                    children: t(`studentForm.options.${instrument}`)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/HMSStudentForm.tsx",
                                                                    lineNumber: 456,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, instrument, true, {
                                                            fileName: "[project]/src/components/HMSStudentForm.tsx",
                                                            lineNumber: 447,
                                                            columnNumber: 19
                                                        }, this)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center space-x-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "checkbox",
                                                                id: "instrument-other",
                                                                checked: instruments.includes('other'),
                                                                onChange: (e)=>handleCheckboxChange('other', e.target.checked, instruments, setInstruments),
                                                                className: "w-4 h-4 bg-white border-gray-600 rounded cursor-pointer accent-black",
                                                                style: {
                                                                    accentColor: '#000000'
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/HMSStudentForm.tsx",
                                                                lineNumber: 462,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                htmlFor: "instrument-other",
                                                                className: "text-white text-sm cursor-pointer",
                                                                children: [
                                                                    t('studentForm.options.other'),
                                                                    ":"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/HMSStudentForm.tsx",
                                                                lineNumber: 470,
                                                                columnNumber: 19
                                                            }, this),
                                                            instruments.includes('other') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "text",
                                                                ...register('instrumentOther', {
                                                                    maxLength: {
                                                                        value: 50,
                                                                        message: t('studentForm.validation.instrumentOtherMax')
                                                                    }
                                                                }),
                                                                placeholder: "Specify",
                                                                className: "px-3 py-1 bg-black rounded border border-gray-600 text-white text-sm focus:outline-none focus:border-[#FDB813] w-32 cursor-text",
                                                                maxLength: 50
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/HMSStudentForm.tsx",
                                                                lineNumber: 474,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/HMSStudentForm.tsx",
                                                        lineNumber: 461,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/HMSStudentForm.tsx",
                                                lineNumber: 445,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/HMSStudentForm.tsx",
                                        lineNumber: 441,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-white text-sm font-medium mb-3",
                                                children: [
                                                    t('studentForm.fields.preferredClassType'),
                                                    " *"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/HMSStudentForm.tsx",
                                                lineNumber: 490,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-wrap gap-4",
                                                children: [
                                                    'individual',
                                                    'group',
                                                    'online',
                                                    'inPerson'
                                                ].map((type)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center space-x-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "checkbox",
                                                                id: `class-${type}`,
                                                                checked: classTypes.includes(type),
                                                                onChange: (e)=>handleCheckboxChange(type, e.target.checked, classTypes, setClassTypes),
                                                                className: "w-4 h-4 bg-white border-gray-600 rounded cursor-pointer accent-black",
                                                                style: {
                                                                    accentColor: '#000000'
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/HMSStudentForm.tsx",
                                                                lineNumber: 496,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                htmlFor: `class-${type}`,
                                                                className: "text-white text-sm cursor-pointer",
                                                                children: t(`studentForm.options.${type}`)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/HMSStudentForm.tsx",
                                                                lineNumber: 504,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, type, true, {
                                                        fileName: "[project]/src/components/HMSStudentForm.tsx",
                                                        lineNumber: 495,
                                                        columnNumber: 19
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/HMSStudentForm.tsx",
                                                lineNumber: 493,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/HMSStudentForm.tsx",
                                        lineNumber: 489,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-white text-sm font-medium mb-3",
                                                children: [
                                                    t('studentForm.fields.preferredSchedule'),
                                                    " *"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/HMSStudentForm.tsx",
                                                lineNumber: 514,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-wrap gap-4",
                                                children: [
                                                    'weekdays',
                                                    'weekends',
                                                    'morning',
                                                    'evening'
                                                ].map((schedule)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center space-x-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "checkbox",
                                                                id: `schedule-${schedule}`,
                                                                checked: schedules.includes(schedule),
                                                                onChange: (e)=>handleCheckboxChange(schedule, e.target.checked, schedules, setSchedules),
                                                                className: "w-4 h-4 bg-white border-gray-600 rounded cursor-pointer accent-black",
                                                                style: {
                                                                    accentColor: '#000000'
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/HMSStudentForm.tsx",
                                                                lineNumber: 520,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                htmlFor: `schedule-${schedule}`,
                                                                className: "text-white text-sm cursor-pointer",
                                                                children: t(`studentForm.options.${schedule}`)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/HMSStudentForm.tsx",
                                                                lineNumber: 528,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, schedule, true, {
                                                        fileName: "[project]/src/components/HMSStudentForm.tsx",
                                                        lineNumber: 519,
                                                        columnNumber: 19
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/HMSStudentForm.tsx",
                                                lineNumber: 517,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/HMSStudentForm.tsx",
                                        lineNumber: 513,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/HMSStudentForm.tsx",
                                lineNumber: 415,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/HMSStudentForm.tsx",
                        lineNumber: 409,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "bg-[#2E2E2E] rounded-lg p-6 md:p-8 shadow-lg",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-2xl text-white font-normal mb-2",
                                children: t('studentForm.sections.courseType')
                            }, void 0, false, {
                                fileName: "[project]/src/components/HMSStudentForm.tsx",
                                lineNumber: 540,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-24 h-1 bg-[#FDB813] mb-6"
                            }, void 0, false, {
                                fileName: "[project]/src/components/HMSStudentForm.tsx",
                                lineNumber: 543,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mb-4 text-gray-300",
                                children: t('studentForm.fields.courseTypePrompt')
                            }, void 0, false, {
                                fileName: "[project]/src/components/HMSStudentForm.tsx",
                                lineNumber: 545,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-3",
                                children: [
                                    'freeBasicMusic',
                                    'hmsWithCertificate',
                                    'lcmWithCertificate'
                                ].map((type)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center space-x-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "checkbox",
                                                id: `course-${type}`,
                                                checked: courseTypes.includes(type),
                                                onChange: (e)=>handleCheckboxChange(type, e.target.checked, courseTypes, setCourseTypes),
                                                className: "w-4 h-4 bg-white border-gray-600 rounded cursor-pointer accent-black",
                                                style: {
                                                    accentColor: '#000000'
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/HMSStudentForm.tsx",
                                                lineNumber: 550,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                htmlFor: `course-${type}`,
                                                className: "text-white text-sm cursor-pointer",
                                                children: t(`studentForm.options.${type}`)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/HMSStudentForm.tsx",
                                                lineNumber: 558,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, type, true, {
                                        fileName: "[project]/src/components/HMSStudentForm.tsx",
                                        lineNumber: 549,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/HMSStudentForm.tsx",
                                lineNumber: 547,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/HMSStudentForm.tsx",
                        lineNumber: 539,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "bg-[#2E2E2E] rounded-lg p-6 md:p-8 shadow-lg",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-2xl text-white font-normal mb-2",
                                children: t('studentForm.sections.musicBackground')
                            }, void 0, false, {
                                fileName: "[project]/src/components/HMSStudentForm.tsx",
                                lineNumber: 568,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-24 h-1 bg-[#FDB813] mb-6"
                            }, void 0, false, {
                                fileName: "[project]/src/components/HMSStudentForm.tsx",
                                lineNumber: 571,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                htmlFor: "yearsOfExperience",
                                                className: "block text-white text-sm font-medium mb-1",
                                                children: t('studentForm.fields.yearsOfExperience')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/HMSStudentForm.tsx",
                                                lineNumber: 575,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                id: "yearsOfExperience",
                                                type: "number",
                                                ...register('yearsOfExperience', {
                                                    min: {
                                                        value: 0,
                                                        message: t('studentForm.validation.yearsMin')
                                                    },
                                                    max: {
                                                        value: 100,
                                                        message: t('studentForm.validation.yearsMax')
                                                    }
                                                }),
                                                className: `w-full px-4 py-2 bg-black rounded border ${errors.yearsOfExperience ? 'border-red-500' : 'border-gray-600'} text-white focus:outline-none focus:border-[#FDB813] cursor-text`,
                                                min: 0,
                                                max: 100,
                                                placeholder: "Enter years of experience (0-100)"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/HMSStudentForm.tsx",
                                                lineNumber: 578,
                                                columnNumber: 15
                                            }, this),
                                            errors.yearsOfExperience && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-red-400 text-xs mt-1",
                                                children: errors.yearsOfExperience.message
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/HMSStudentForm.tsx",
                                                lineNumber: 591,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/HMSStudentForm.tsx",
                                        lineNumber: 574,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                htmlFor: "previousTraining",
                                                className: "block text-white text-sm font-medium mb-1",
                                                children: t('studentForm.fields.previousTraining')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/HMSStudentForm.tsx",
                                                lineNumber: 596,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                id: "previousTraining",
                                                type: "text",
                                                ...register('previousTraining', {
                                                    maxLength: {
                                                        value: 200,
                                                        message: t('studentForm.validation.textMax200')
                                                    }
                                                }),
                                                className: `w-full px-4 py-2 bg-black rounded border ${errors.previousTraining ? 'border-red-500' : 'border-gray-600'} text-white focus:outline-none focus:border-[#FDB813] cursor-text`,
                                                placeholder: "Describe your previous music training",
                                                maxLength: 200
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/HMSStudentForm.tsx",
                                                lineNumber: 599,
                                                columnNumber: 15
                                            }, this),
                                            errors.previousTraining && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-red-400 text-xs mt-1",
                                                children: errors.previousTraining.message
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/HMSStudentForm.tsx",
                                                lineNumber: 610,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/HMSStudentForm.tsx",
                                        lineNumber: 595,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                htmlFor: "musicExamCertifications",
                                                className: "block text-white text-sm font-medium mb-1",
                                                children: t('studentForm.fields.musicExamCertifications')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/HMSStudentForm.tsx",
                                                lineNumber: 615,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                id: "musicExamCertifications",
                                                type: "text",
                                                ...register('musicExamCertifications', {
                                                    maxLength: {
                                                        value: 200,
                                                        message: t('studentForm.validation.textMax200')
                                                    }
                                                }),
                                                className: `w-full px-4 py-2 bg-black rounded border ${errors.musicExamCertifications ? 'border-red-500' : 'border-gray-600'} text-white focus:outline-none focus:border-[#FDB813] cursor-text`,
                                                placeholder: "List any certifications or exams completed",
                                                maxLength: 200
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/HMSStudentForm.tsx",
                                                lineNumber: 618,
                                                columnNumber: 15
                                            }, this),
                                            errors.musicExamCertifications && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-red-400 text-xs mt-1",
                                                children: errors.musicExamCertifications.message
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/HMSStudentForm.tsx",
                                                lineNumber: 629,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/HMSStudentForm.tsx",
                                        lineNumber: 614,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-white text-sm font-medium mb-3",
                                                children: t('studentForm.fields.performanceExperience')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/HMSStudentForm.tsx",
                                                lineNumber: 634,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-wrap gap-4",
                                                children: [
                                                    [
                                                        'schoolEvents',
                                                        'competitions',
                                                        'choir'
                                                    ].map((perf)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center space-x-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    type: "checkbox",
                                                                    id: `performance-${perf}`,
                                                                    checked: performances.includes(perf),
                                                                    onChange: (e)=>handleCheckboxChange(perf, e.target.checked, performances, setPerformances),
                                                                    className: "w-4 h-4 bg-white border-gray-600 rounded cursor-pointer accent-black",
                                                                    style: {
                                                                        accentColor: '#000000'
                                                                    }
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/HMSStudentForm.tsx",
                                                                    lineNumber: 640,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                    htmlFor: `performance-${perf}`,
                                                                    className: "text-white text-sm cursor-pointer",
                                                                    children: t(`studentForm.options.${perf}`)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/HMSStudentForm.tsx",
                                                                    lineNumber: 648,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, perf, true, {
                                                            fileName: "[project]/src/components/HMSStudentForm.tsx",
                                                            lineNumber: 639,
                                                            columnNumber: 19
                                                        }, this)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center space-x-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "checkbox",
                                                                id: "performance-other",
                                                                checked: performances.includes('other'),
                                                                onChange: (e)=>handleCheckboxChange('other', e.target.checked, performances, setPerformances),
                                                                className: "w-4 h-4 bg-white border-gray-600 rounded cursor-pointer accent-black",
                                                                style: {
                                                                    accentColor: '#000000'
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/HMSStudentForm.tsx",
                                                                lineNumber: 654,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                htmlFor: "performance-other",
                                                                className: "text-white text-sm cursor-pointer",
                                                                children: [
                                                                    t('studentForm.options.other'),
                                                                    ":"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/HMSStudentForm.tsx",
                                                                lineNumber: 662,
                                                                columnNumber: 19
                                                            }, this),
                                                            performances.includes('other') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "text",
                                                                ...register('performanceOther', {
                                                                    maxLength: {
                                                                        value: 100,
                                                                        message: t('studentForm.validation.performanceOtherMax')
                                                                    }
                                                                }),
                                                                placeholder: "Specify",
                                                                className: "px-3 py-1 bg-black rounded border border-gray-600 text-white text-sm focus:outline-none focus:border-[#FDB813] w-32 cursor-text",
                                                                maxLength: 100
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/HMSStudentForm.tsx",
                                                                lineNumber: 666,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/HMSStudentForm.tsx",
                                                        lineNumber: 653,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/HMSStudentForm.tsx",
                                                lineNumber: 637,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/HMSStudentForm.tsx",
                                        lineNumber: 633,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/HMSStudentForm.tsx",
                                lineNumber: 573,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/HMSStudentForm.tsx",
                        lineNumber: 567,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "bg-[#2E2E2E] rounded-lg p-6 md:p-8 shadow-lg",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-2xl text-white font-normal mb-2",
                                children: t('studentForm.sections.goalsInterests')
                            }, void 0, false, {
                                fileName: "[project]/src/components/HMSStudentForm.tsx",
                                lineNumber: 684,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-24 h-1 bg-[#FDB813] mb-6"
                            }, void 0, false, {
                                fileName: "[project]/src/components/HMSStudentForm.tsx",
                                lineNumber: 687,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "goals",
                                        className: "block text-white text-sm font-medium mb-1",
                                        children: t('studentForm.fields.goalsPrompt')
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/HMSStudentForm.tsx",
                                        lineNumber: 690,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                        id: "goals",
                                        ...register('goals', {
                                            maxLength: {
                                                value: 1000,
                                                message: t('studentForm.validation.goalsMax')
                                            }
                                        }),
                                        rows: 4,
                                        className: `w-full px-4 py-2 bg-black rounded border ${errors.goals ? 'border-red-500' : 'border-gray-600'} text-white focus:outline-none focus:border-[#FDB813] cursor-text resize-none`,
                                        maxLength: 1000,
                                        placeholder: "Describe your music learning goals and interests"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/HMSStudentForm.tsx",
                                        lineNumber: 693,
                                        columnNumber: 13
                                    }, this),
                                    errors.goals && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-red-400 text-xs mt-1",
                                        children: errors.goals.message
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/HMSStudentForm.tsx",
                                        lineNumber: 704,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/HMSStudentForm.tsx",
                                lineNumber: 689,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/HMSStudentForm.tsx",
                        lineNumber: 683,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "bg-[#2E2E2E] rounded-lg p-6 md:p-8 shadow-lg",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-2xl text-white font-normal mb-2",
                                children: t('studentForm.sections.volunteer')
                            }, void 0, false, {
                                fileName: "[project]/src/components/HMSStudentForm.tsx",
                                lineNumber: 711,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-24 h-1 bg-[#FDB813] mb-6"
                            }, void 0, false, {
                                fileName: "[project]/src/components/HMSStudentForm.tsx",
                                lineNumber: 714,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-white text-sm font-medium mb-3",
                                                children: t('studentForm.fields.volunteerPrompt')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/HMSStudentForm.tsx",
                                                lineNumber: 718,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex gap-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center space-x-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "radio",
                                                                id: "volunteer-yes",
                                                                value: "yes",
                                                                ...register('volunteerInterested'),
                                                                className: "w-4 h-4 bg-white border-gray-600 cursor-pointer accent-black",
                                                                style: {
                                                                    accentColor: '#000000'
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/HMSStudentForm.tsx",
                                                                lineNumber: 723,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                htmlFor: "volunteer-yes",
                                                                className: "text-white text-sm cursor-pointer",
                                                                children: t('studentForm.options.yes')
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/HMSStudentForm.tsx",
                                                                lineNumber: 731,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/HMSStudentForm.tsx",
                                                        lineNumber: 722,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center space-x-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "radio",
                                                                id: "volunteer-no",
                                                                value: "no",
                                                                ...register('volunteerInterested'),
                                                                className: "w-4 h-4 bg-white border-gray-600 cursor-pointer accent-black",
                                                                style: {
                                                                    accentColor: '#000000'
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/HMSStudentForm.tsx",
                                                                lineNumber: 736,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                htmlFor: "volunteer-no",
                                                                className: "text-white text-sm cursor-pointer",
                                                                children: t('studentForm.options.no')
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/HMSStudentForm.tsx",
                                                                lineNumber: 744,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/HMSStudentForm.tsx",
                                                        lineNumber: 735,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/HMSStudentForm.tsx",
                                                lineNumber: 721,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/HMSStudentForm.tsx",
                                        lineNumber: 717,
                                        columnNumber: 13
                                    }, this),
                                    volunteerInterested === 'yes' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-3 pt-4 border-t border-gray-700 bg-[#252525] p-4 rounded-md",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-white text-sm font-medium mb-3",
                                                children: t('studentForm.fields.volunteerDetailsPrompt')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/HMSStudentForm.tsx",
                                                lineNumber: 753,
                                                columnNumber: 17
                                            }, this),
                                            [
                                                'volunteerOnlineTeacher',
                                                'volunteerOfflineConferences',
                                                'volunteerSummerKids',
                                                'volunteerEvents'
                                            ].map((area)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center space-x-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "checkbox",
                                                            id: area,
                                                            checked: volunteerAreas.includes(area),
                                                            onChange: (e)=>handleCheckboxChange(area, e.target.checked, volunteerAreas, setVolunteerAreas),
                                                            className: "w-4 h-4 bg-white border-gray-600 rounded cursor-pointer accent-black",
                                                            style: {
                                                                accentColor: '#000000'
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/HMSStudentForm.tsx",
                                                            lineNumber: 758,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            htmlFor: area,
                                                            className: "text-white text-sm cursor-pointer",
                                                            children: t(`studentForm.options.${area}`)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/HMSStudentForm.tsx",
                                                            lineNumber: 766,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, area, true, {
                                                    fileName: "[project]/src/components/HMSStudentForm.tsx",
                                                    lineNumber: 757,
                                                    columnNumber: 19
                                                }, this))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/HMSStudentForm.tsx",
                                        lineNumber: 752,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/HMSStudentForm.tsx",
                                lineNumber: 716,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/HMSStudentForm.tsx",
                        lineNumber: 710,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "bg-[#2E2E2E] rounded-lg p-6 md:p-8 shadow-lg",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-2xl text-white font-normal mb-2",
                                children: t('studentForm.sections.emergencyContact')
                            }, void 0, false, {
                                fileName: "[project]/src/components/HMSStudentForm.tsx",
                                lineNumber: 778,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-24 h-1 bg-[#FDB813] mb-6"
                            }, void 0, false, {
                                fileName: "[project]/src/components/HMSStudentForm.tsx",
                                lineNumber: 781,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 md:grid-cols-2 gap-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "md:col-span-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                htmlFor: "emergencyName",
                                                className: "block text-white text-sm font-medium mb-1",
                                                children: [
                                                    t('studentForm.fields.emergencyName'),
                                                    " *"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/HMSStudentForm.tsx",
                                                lineNumber: 785,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                id: "emergencyName",
                                                type: "text",
                                                ...register('emergencyName', {
                                                    required: t('studentForm.validation.emergencyNameRequired'),
                                                    minLength: {
                                                        value: 2,
                                                        message: t('studentForm.validation.emergencyNameMin')
                                                    },
                                                    maxLength: {
                                                        value: 100,
                                                        message: t('studentForm.validation.nameMax')
                                                    }
                                                }),
                                                className: `w-full px-4 py-2 bg-black rounded border ${errors.emergencyName ? 'border-red-500' : 'border-gray-600'} text-white focus:outline-none focus:border-[#FDB813] cursor-text`,
                                                placeholder: "Enter emergency contact name",
                                                maxLength: 100
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/HMSStudentForm.tsx",
                                                lineNumber: 788,
                                                columnNumber: 15
                                            }, this),
                                            errors.emergencyName && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-red-400 text-xs mt-1",
                                                children: errors.emergencyName.message
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/HMSStudentForm.tsx",
                                                lineNumber: 801,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/HMSStudentForm.tsx",
                                        lineNumber: 784,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                htmlFor: "emergencyRelationship",
                                                className: "block text-white text-sm font-medium mb-1",
                                                children: [
                                                    t('studentForm.fields.emergencyRelationship'),
                                                    " *"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/HMSStudentForm.tsx",
                                                lineNumber: 806,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                id: "emergencyRelationship",
                                                type: "text",
                                                ...register('emergencyRelationship', {
                                                    required: t('studentForm.validation.emergencyRelationshipRequired'),
                                                    maxLength: {
                                                        value: 50,
                                                        message: t('studentForm.validation.relationshipMax')
                                                    }
                                                }),
                                                className: `w-full px-4 py-2 bg-black rounded border ${errors.emergencyRelationship ? 'border-red-500' : 'border-gray-600'} text-white focus:outline-none focus:border-[#FDB813] cursor-text`,
                                                placeholder: "Enter relationship (e.g., Parent, Spouse)",
                                                maxLength: 50
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/HMSStudentForm.tsx",
                                                lineNumber: 809,
                                                columnNumber: 15
                                            }, this),
                                            errors.emergencyRelationship && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-red-400 text-xs mt-1",
                                                children: errors.emergencyRelationship.message
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/HMSStudentForm.tsx",
                                                lineNumber: 821,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/HMSStudentForm.tsx",
                                        lineNumber: 805,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                htmlFor: "emergencyContact",
                                                className: "block text-white text-sm font-medium mb-1",
                                                children: [
                                                    t('studentForm.fields.emergencyContact'),
                                                    " *"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/HMSStudentForm.tsx",
                                                lineNumber: 826,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                id: "emergencyContact",
                                                type: "tel",
                                                ...register('emergencyContact', {
                                                    required: t('studentForm.validation.emergencyContactRequired'),
                                                    pattern: {
                                                        value: /^[0-9+\-\s()]{10,15}$/,
                                                        message: t('studentForm.validation.phonePattern')
                                                    }
                                                }),
                                                className: `w-full px-4 py-2 bg-black rounded border ${errors.emergencyContact ? 'border-red-500' : 'border-gray-600'} text-white focus:outline-none focus:border-[#FDB813] cursor-text`,
                                                maxLength: 15,
                                                placeholder: "(123) 456-7890"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/HMSStudentForm.tsx",
                                                lineNumber: 829,
                                                columnNumber: 15
                                            }, this),
                                            errors.emergencyContact && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-red-400 text-xs mt-1",
                                                children: errors.emergencyContact.message
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/HMSStudentForm.tsx",
                                                lineNumber: 844,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/HMSStudentForm.tsx",
                                        lineNumber: 825,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/HMSStudentForm.tsx",
                                lineNumber: 783,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/HMSStudentForm.tsx",
                        lineNumber: 777,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col sm:flex-row justify-center gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "submit",
                                disabled: isSubmitting,
                                className: `w-full sm:w-auto px-8 py-3 bg-[#FDB813] hover:bg-[#DAA520] text-black rounded text-center transition-colors ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`,
                                children: isSubmitting ? t('studentForm.buttons.submitting') : t('studentForm.buttons.submit')
                            }, void 0, false, {
                                fileName: "[project]/src/components/HMSStudentForm.tsx",
                                lineNumber: 852,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: handleReset,
                                disabled: isSubmitting,
                                className: `w-full sm:w-auto px-8 py-3 bg-black hover:bg-gray-900 text-white rounded border-2 border-[#FDB813] text-center transition-colors ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`,
                                children: t('studentForm.buttons.reset')
                            }, void 0, false, {
                                fileName: "[project]/src/components/HMSStudentForm.tsx",
                                lineNumber: 861,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/HMSStudentForm.tsx",
                        lineNumber: 851,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/HMSStudentForm.tsx",
                lineNumber: 168,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/HMSStudentForm.tsx",
        lineNumber: 151,
        columnNumber: 5
    }, this);
}
_s(HMSStudentForm, "q86BZe5SUZ3jWEvLOnHeHa0834s=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForm"]
    ];
});
_c = HMSStudentForm;
var _c;
__turbopack_context__.k.register(_c, "HMSStudentForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/FooterNext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FooterNext",
    ()=>FooterNext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/react-i18next/dist/es/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-i18next/dist/es/useTranslation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/mail.js [app-client] (ecmascript) <export default as Mail>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/phone.js [app-client] (ecmascript) <export default as Phone>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-client] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$youtube$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Youtube$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/youtube.js [app-client] (ecmascript) <export default as Youtube>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$facebook$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Facebook$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/facebook.js [app-client] (ecmascript) <export default as Facebook>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$instagram$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Instagram$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/instagram.js [app-client] (ecmascript) <export default as Instagram>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HMSStudentForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/HMSStudentForm.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
function FooterNext() {
    _s();
    const { t, i18n } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"])('common');
    const [showStudentForm, setShowStudentForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const changeLanguage = (lng)=>{
        i18n.changeLanguage(lng);
    };
    const handleAdminClick = ()=>{
        router.push('/admin');
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
        className: "bg-gray-800 text-white py-12",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "container mx-auto px-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-xl font-bold mb-4",
                                        children: t('footer.about.title')
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/FooterNext.tsx",
                                        lineNumber: 29,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-gray-300 mb-4",
                                        children: t('footer.about.description')
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/FooterNext.tsx",
                                        lineNumber: 30,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex space-x-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: "https://www.youtube.com/@YBHMinistries",
                                                target: "_blank",
                                                rel: "noopener noreferrer",
                                                className: "hover:text-red-500 transition-colors",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$youtube$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Youtube$3e$__["Youtube"], {
                                                    size: 24
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/FooterNext.tsx",
                                                    lineNumber: 40,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/FooterNext.tsx",
                                                lineNumber: 34,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: "https://www.facebook.com/profile.php?id=100089579084304",
                                                target: "_blank",
                                                rel: "noopener noreferrer",
                                                className: "hover:text-blue-500 transition-colors",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$facebook$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Facebook$3e$__["Facebook"], {
                                                    size: 24
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/FooterNext.tsx",
                                                    lineNumber: 48,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/FooterNext.tsx",
                                                lineNumber: 42,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: "https://www.instagram.com/ybhministries/",
                                                target: "_blank",
                                                rel: "noopener noreferrer",
                                                className: "hover:text-pink-500 transition-colors",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$instagram$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Instagram$3e$__["Instagram"], {
                                                    size: 24
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/FooterNext.tsx",
                                                    lineNumber: 56,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/FooterNext.tsx",
                                                lineNumber: 50,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/FooterNext.tsx",
                                        lineNumber: 33,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/FooterNext.tsx",
                                lineNumber: 28,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-xl font-bold mb-4",
                                        children: t('footer.quickLinks.title')
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/FooterNext.tsx",
                                        lineNumber: 63,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        className: "space-y-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    href: "/about",
                                                    className: "text-gray-300 hover:text-white transition-colors",
                                                    children: t('footer.quickLinks.about')
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/FooterNext.tsx",
                                                    lineNumber: 66,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/FooterNext.tsx",
                                                lineNumber: 65,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    href: "/ministries",
                                                    className: "text-gray-300 hover:text-white transition-colors",
                                                    children: t('footer.quickLinks.ministries')
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/FooterNext.tsx",
                                                    lineNumber: 71,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/FooterNext.tsx",
                                                lineNumber: 70,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    href: "/gallery",
                                                    className: "text-gray-300 hover:text-white transition-colors",
                                                    children: t('footer.quickLinks.gallery')
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/FooterNext.tsx",
                                                    lineNumber: 76,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/FooterNext.tsx",
                                                lineNumber: 75,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    href: "/news",
                                                    className: "text-gray-300 hover:text-white transition-colors",
                                                    children: t('footer.quickLinks.news')
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/FooterNext.tsx",
                                                    lineNumber: 81,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/FooterNext.tsx",
                                                lineNumber: 80,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    href: "/resources",
                                                    className: "text-gray-300 hover:text-white transition-colors",
                                                    children: t('footer.quickLinks.resources')
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/FooterNext.tsx",
                                                    lineNumber: 86,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/FooterNext.tsx",
                                                lineNumber: 85,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/FooterNext.tsx",
                                        lineNumber: 64,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/FooterNext.tsx",
                                lineNumber: 62,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-xl font-bold mb-4",
                                        children: t('footer.contact.title')
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/FooterNext.tsx",
                                        lineNumber: 95,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-start space-x-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                                        className: "flex-shrink-0 mt-1",
                                                        size: 20
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/FooterNext.tsx",
                                                        lineNumber: 98,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-gray-300",
                                                        children: t('footer.contact.address')
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/FooterNext.tsx",
                                                        lineNumber: 99,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/FooterNext.tsx",
                                                lineNumber: 97,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center space-x-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__["Phone"], {
                                                        className: "flex-shrink-0",
                                                        size: 20
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/FooterNext.tsx",
                                                        lineNumber: 104,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-gray-300",
                                                        children: t('footer.contact.phone')
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/FooterNext.tsx",
                                                        lineNumber: 105,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/FooterNext.tsx",
                                                lineNumber: 103,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center space-x-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__["Mail"], {
                                                        className: "flex-shrink-0",
                                                        size: 20
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/FooterNext.tsx",
                                                        lineNumber: 110,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                        href: `mailto:${t('footer.contact.email')}`,
                                                        className: "text-gray-300 hover:text-white transition-colors",
                                                        children: t('footer.contact.email')
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/FooterNext.tsx",
                                                        lineNumber: 111,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/FooterNext.tsx",
                                                lineNumber: 109,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/FooterNext.tsx",
                                        lineNumber: 96,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/FooterNext.tsx",
                                lineNumber: 94,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-xl font-bold mb-4",
                                        children: t('footer.student.title')
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/FooterNext.tsx",
                                        lineNumber: 123,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-gray-300 mb-4",
                                        children: t('footer.student.description')
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/FooterNext.tsx",
                                        lineNumber: 124,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setShowStudentForm(true),
                                        className: "bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-2 rounded-lg font-semibold transition-colors w-full mb-4",
                                        children: t('footer.student.button')
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/FooterNext.tsx",
                                        lineNumber: 127,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                className: "text-lg font-semibold mb-2",
                                                children: t('footer.language.title')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/FooterNext.tsx",
                                                lineNumber: 135,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex space-x-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>changeLanguage('en'),
                                                        className: `px-3 py-1 rounded ${i18n.language === 'en' ? 'bg-yellow-500 text-black' : 'bg-gray-700 text-white hover:bg-gray-600'} transition-colors`,
                                                        children: "English"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/FooterNext.tsx",
                                                        lineNumber: 137,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>changeLanguage('te'),
                                                        className: `px-3 py-1 rounded ${i18n.language === 'te' ? 'bg-yellow-500 text-black' : 'bg-gray-700 text-white hover:bg-gray-600'} transition-colors`,
                                                        children: "తెలుగు"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/FooterNext.tsx",
                                                        lineNumber: 147,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/FooterNext.tsx",
                                                lineNumber: 136,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/FooterNext.tsx",
                                        lineNumber: 134,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/FooterNext.tsx",
                                lineNumber: 122,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/FooterNext.tsx",
                        lineNumber: 26,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-12 pt-8 border-t border-gray-700",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-400 text-center md:text-left",
                                    children: t('footer.copyright')
                                }, void 0, false, {
                                    fileName: "[project]/src/components/FooterNext.tsx",
                                    lineNumber: 165,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-wrap gap-4 text-gray-400",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/privacy-policy",
                                            className: "hover:text-white transition-colors",
                                            children: "Privacy Policy"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/FooterNext.tsx",
                                            lineNumber: 170,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/terms-of-service",
                                            className: "hover:text-white transition-colors",
                                            children: "Terms of Service"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/FooterNext.tsx",
                                            lineNumber: 173,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/accessibility",
                                            className: "hover:text-white transition-colors",
                                            children: "Accessibility"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/FooterNext.tsx",
                                            lineNumber: 176,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: handleAdminClick,
                                            className: "hover:text-white transition-colors",
                                            children: "Admin"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/FooterNext.tsx",
                                            lineNumber: 179,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/FooterNext.tsx",
                                    lineNumber: 169,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/FooterNext.tsx",
                            lineNumber: 164,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/FooterNext.tsx",
                        lineNumber: 163,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/FooterNext.tsx",
                lineNumber: 25,
                columnNumber: 7
            }, this),
            showStudentForm && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HMSStudentForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HMSStudentForm"], {
                onClose: ()=>setShowStudentForm(false)
            }, void 0, false, {
                fileName: "[project]/src/components/FooterNext.tsx",
                lineNumber: 192,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/FooterNext.tsx",
        lineNumber: 24,
        columnNumber: 5
    }, this);
}
_s(FooterNext, "R9SzIRlU6B3xq9QdNACGIVv0MXI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = FooterNext;
var _c;
__turbopack_context__.k.register(_c, "FooterNext");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/utils/navigate.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/utils/eventsData.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/EventScrollBanner.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EventScrollBanner",
    ()=>EventScrollBanner
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/react-i18next/dist/es/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-i18next/dist/es/useTranslation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$navigate$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/navigate.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$eventsData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/eventsData.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
function EventScrollBanner() {
    _s();
    const { t, i18n } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"])('home');
    const upcomingEvents = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$eventsData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUpcomingEvents"])(5);
    // If no upcoming events, don't render the banner
    if (upcomingEvents.length === 0) {
        return null;
    }
    const handleBannerClick = ()=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$navigate$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["navigate"])('/news?section=upcoming-events');
    };
    // Calculate animation duration based on number of events
    // Base duration per event to maintain consistent speed
    const baseSpeedPerEvent = 10; // seconds per event (slower speed)
    const animationDuration = upcomingEvents.length * baseSpeedPerEvent;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        onClick: handleBannerClick,
        role: "button",
        tabIndex: 0,
        "aria-label": t('eventBanner.ariaLabel'),
        onKeyDown: (e)=>{
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleBannerClick();
            }
        },
        className: "jsx-3226fdd02d6aa3ca" + " " + "absolute bottom-0 left-0 right-0 z-30 cursor-pointer group",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-3226fdd02d6aa3ca" + " " + "bg-black/70 backdrop-blur-sm border-t-2 border-[#FDB813] overflow-hidden",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "jsx-3226fdd02d6aa3ca" + " " + "py-4",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-3226fdd02d6aa3ca" + " " + "scroll-container",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                animationDuration: `${animationDuration}s`
                            },
                            className: "jsx-3226fdd02d6aa3ca" + " " + "scroll-content",
                            children: [
                                upcomingEvents.map((event, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-3226fdd02d6aa3ca" + " " + "event-item",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-3226fdd02d6aa3ca" + " " + "text-white font-semibold text-base",
                                                children: event.title
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/EventScrollBanner.tsx",
                                                lineNumber: 50,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-3226fdd02d6aa3ca" + " " + "text-[#FDB813] text-sm",
                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$eventsData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatEventDate"])(event.date, i18n.language)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/EventScrollBanner.tsx",
                                                lineNumber: 55,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-3226fdd02d6aa3ca" + " " + "text-gray-300 text-sm",
                                                children: event.location
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/EventScrollBanner.tsx",
                                                lineNumber: 60,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-3226fdd02d6aa3ca" + " " + "text-gray-400 text-xs italic group-hover:text-[#FDB813] transition-colors",
                                                children: t('eventBanner.clickForDetails')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/EventScrollBanner.tsx",
                                                lineNumber: 65,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, `event-1-${index}`, true, {
                                        fileName: "[project]/src/components/EventScrollBanner.tsx",
                                        lineNumber: 45,
                                        columnNumber: 17
                                    }, this)),
                                upcomingEvents.map((event, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-3226fdd02d6aa3ca" + " " + "event-item",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-3226fdd02d6aa3ca" + " " + "text-white font-semibold text-base",
                                                children: event.title
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/EventScrollBanner.tsx",
                                                lineNumber: 78,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-3226fdd02d6aa3ca" + " " + "text-[#FDB813] text-sm",
                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$eventsData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatEventDate"])(event.date, i18n.language)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/EventScrollBanner.tsx",
                                                lineNumber: 83,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-3226fdd02d6aa3ca" + " " + "text-gray-300 text-sm",
                                                children: event.location
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/EventScrollBanner.tsx",
                                                lineNumber: 88,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-3226fdd02d6aa3ca" + " " + "text-gray-400 text-xs italic group-hover:text-[#FDB813] transition-colors",
                                                children: t('eventBanner.clickForDetails')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/EventScrollBanner.tsx",
                                                lineNumber: 93,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, `event-2-${index}`, true, {
                                        fileName: "[project]/src/components/EventScrollBanner.tsx",
                                        lineNumber: 73,
                                        columnNumber: 17
                                    }, this))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/EventScrollBanner.tsx",
                            lineNumber: 42,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/EventScrollBanner.tsx",
                        lineNumber: 41,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/EventScrollBanner.tsx",
                    lineNumber: 40,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/EventScrollBanner.tsx",
                lineNumber: 38,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                id: "3226fdd02d6aa3ca",
                children: ".scroll-container.jsx-3226fdd02d6aa3ca{width:100%;display:flex;overflow:hidden}.scroll-content.jsx-3226fdd02d6aa3ca{white-space:nowrap;will-change:transform;gap:3rem;animation:linear infinite scroll-left;display:flex}.event-item.jsx-3226fdd02d6aa3ca{flex-direction:column;flex-shrink:0;gap:.25rem;padding:0 1rem;display:inline-flex}@keyframes scroll-left{0%{transform:translate(100%)}to{transform:translate(-50%)}}.group.jsx-3226fdd02d6aa3ca:hover .scroll-content.jsx-3226fdd02d6aa3ca{animation-play-state:paused}@media (prefers-reduced-motion:reduce){.scroll-content.jsx-3226fdd02d6aa3ca{animation:none;transform:translate(0)}}"
            }, void 0, false, void 0, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/EventScrollBanner.tsx",
        lineNumber: 24,
        columnNumber: 5
    }, this);
}
_s(EventScrollBanner, "OZwazanA59tbNDUkc8lMSmTHj9Q=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"]
    ];
});
_c = EventScrollBanner;
var _c;
__turbopack_context__.k.register(_c, "EventScrollBanner");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/ClientLayout.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ClientLayout",
    ()=>ClientLayout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/i18n/config.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HeaderNext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/HeaderNext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$FooterNext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/FooterNext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ScrollToTop$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ScrollToTop.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$EventScrollBanner$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/EventScrollBanner.tsx [app-client] (ecmascript)");
'use client';
;
;
;
;
;
;
function ClientLayout({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HeaderNext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HeaderNext"], {}, void 0, false, {
                fileName: "[project]/app/ClientLayout.tsx",
                lineNumber: 13,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$EventScrollBanner$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EventScrollBanner"], {}, void 0, false, {
                fileName: "[project]/app/ClientLayout.tsx",
                lineNumber: 14,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                children: children
            }, void 0, false, {
                fileName: "[project]/app/ClientLayout.tsx",
                lineNumber: 15,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$FooterNext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FooterNext"], {}, void 0, false, {
                fileName: "[project]/app/ClientLayout.tsx",
                lineNumber: 16,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ScrollToTop$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollToTop"], {}, void 0, false, {
                fileName: "[project]/app/ClientLayout.tsx",
                lineNumber: 17,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_c = ClientLayout;
var _c;
__turbopack_context__.k.register(_c, "ClientLayout");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/ministries/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MinistriesIndex
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ministries$2f$MinistriesPage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ministries/MinistriesPage.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$ClientLayout$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/ClientLayout.tsx [app-client] (ecmascript)");
'use client';
;
;
;
function MinistriesIndex() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$ClientLayout$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ClientLayout"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ministries$2f$MinistriesPage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MinistriesPage"], {}, void 0, false, {
            fileName: "[project]/app/ministries/page.tsx",
            lineNumber: 9,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/ministries/page.tsx",
        lineNumber: 8,
        columnNumber: 5
    }, this);
}
_c = MinistriesIndex;
var _c;
__turbopack_context__.k.register(_c, "MinistriesIndex");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_0af75aac._.js.map