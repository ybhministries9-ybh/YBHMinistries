(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
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
"[project]/src/components/ui/utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-client] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/skeleton.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Skeleton",
    ()=>Skeleton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/utils.ts [app-client] (ecmascript)");
;
;
function Skeleton({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "skeleton",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("bg-accent animate-pulse rounded-md", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/skeleton.tsx",
        lineNumber: 5,
        columnNumber: 5
    }, this);
}
_c = Skeleton;
;
var _c;
__turbopack_context__.k.register(_c, "Skeleton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/DirectorsPage.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DirectorsPage",
    ()=>DirectorsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$music$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Music$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/music.js [app-client] (ecmascript) <export default as Music>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/globe.js [app-client] (ecmascript) <export default as Globe>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$award$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Award$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/award.js [app-client] (ecmascript) <export default as Award>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mic$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/mic.js [app-client] (ecmascript) <export default as Mic>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/book-open.js [app-client] (ecmascript) <export default as BookOpen>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/heart.js [app-client] (ecmascript) <export default as Heart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/users.js [app-client] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar.js [app-client] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-client] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$figma$2f$ImageWithFallback$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/figma/ImageWithFallback.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/skeleton.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/react-i18next/dist/es/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-i18next/dist/es/useTranslation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
;
;
;
;
;
const separatorImage = 'https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/separator.png';
// Hero image URL
const HERO_IMAGE_URL = "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Founder/Augustine/1.JPG";
// Image URLs for preloading
const IMAGE_URLS = {
    augustine: HERO_IMAGE_URL,
    vijaya: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=540&h=585&fit=crop&crop=faces",
    charles: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=540&h=585&fit=crop&crop=faces",
    nancy: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=540&h=585&fit=crop&crop=faces",
    hms: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
};
// Memoized Image Component with lazy loading
const OptimizedImage = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"])(({ src, alt, className, priority = false })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$figma$2f$ImageWithFallback$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ImageWithFallback"], {
        src: src,
        alt: alt,
        className: className,
        loading: priority ? "eager" : "lazy",
        decoding: "async"
    }, void 0, false, {
        fileName: "[project]/src/components/DirectorsPage.tsx",
        lineNumber: 25,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
});
_c = OptimizedImage;
OptimizedImage.displayName = 'OptimizedImage';
// Tab configuration - will be translated in render
const TAB_CONFIG = [
    {
        key: "augustine"
    },
    {
        key: "vijaya"
    },
    {
        key: "charles"
    },
    {
        key: "nancy"
    }
];
function DirectorsPage() {
    _s();
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"])('directors');
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("augustine");
    const [augustineTab, setAugustineTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("ministries");
    const contactFormRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [formStatus, setFormStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        submitted: false,
        message: ""
    });
    const [imagePreloaded, setImagePreloaded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const accentColor = "#FDB813";
    // Preload current tab image
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DirectorsPage.useEffect": ()=>{
            const currentImage = IMAGE_URLS[activeTab];
            if (currentImage) {
                const img = new Image();
                img.src = currentImage;
                img.onload = ({
                    "DirectorsPage.useEffect": ()=>setImagePreloaded(true)
                })["DirectorsPage.useEffect"];
                // Preload link for faster loading
                const link = document.createElement('link');
                link.rel = 'preload';
                link.as = 'image';
                link.href = currentImage;
                document.head.appendChild(link);
                return ({
                    "DirectorsPage.useEffect": ()=>{
                        if (document.head.contains(link)) {
                            document.head.removeChild(link);
                        }
                    }
                })["DirectorsPage.useEffect"];
            }
        }
    }["DirectorsPage.useEffect"], [
        activeTab
    ]);
    // Preload next tab image on tab hover
    const handleTabHover = (tabKey)=>{
        const nextImage = IMAGE_URLS[tabKey];
        if (nextImage) {
            const img = new Image();
            img.src = nextImage;
        }
    };
    const handleSubmit = (e)=>{
        e.preventDefault();
        setFormStatus({
            submitted: true,
            message: "Thanks for reaching out! We'll get back to you soon."
        });
        if (contactFormRef.current) {
            contactFormRef.current.reset();
        }
    };
    const handleTabChange = (tabKey)=>{
        setActiveTab(tabKey);
        setImagePreloaded(false);
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    // Memoize tab buttons to prevent unnecessary re-renders
    const tabButtons = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DirectorsPage.useMemo[tabButtons]": ()=>TAB_CONFIG.map({
                "DirectorsPage.useMemo[tabButtons]": (tab)=>{
                    const isActive = activeTab === tab.key;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: `px-6 md:px-6 py-2 rounded-full text-sm md:text-base font-semibold transition-colors focus:outline-none ${isActive ? "bg-[#FDB813] text-black shadow-md ring-2 ring-offset-2 ring-[#FDB813]" : "bg-[#2E2E2E] text-white hover:bg-[#FDB813] hover:text-black focus:ring-2 focus:ring-offset-2 focus:ring-[#FDB813]"}`,
                        onClick: {
                            "DirectorsPage.useMemo[tabButtons]": ()=>handleTabChange(tab.key)
                        }["DirectorsPage.useMemo[tabButtons]"],
                        onMouseEnter: {
                            "DirectorsPage.useMemo[tabButtons]": ()=>handleTabHover(tab.key)
                        }["DirectorsPage.useMemo[tabButtons]"],
                        style: {
                            cursor: 'pointer'
                        },
                        "aria-selected": isActive,
                        role: "tab",
                        children: t(`tabs.${tab.key}`)
                    }, tab.key, false, {
                        fileName: "[project]/src/components/DirectorsPage.tsx",
                        lineNumber: 109,
                        columnNumber: 9
                    }, this);
                }
            }["DirectorsPage.useMemo[tabButtons]"])
    }["DirectorsPage.useMemo[tabButtons]"], [
        activeTab,
        t
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-black text-white",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container mx-auto px-2 md:px-4 pt-12 md:pt-30 pb-16",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-6 my-8",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap justify-center gap-2 md:gap-4",
                        role: "tablist",
                        children: tabButtons
                    }, void 0, false, {
                        fileName: "[project]/src/components/DirectorsPage.tsx",
                        lineNumber: 134,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/DirectorsPage.tsx",
                    lineNumber: 133,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-4",
                    role: "tabpanel",
                    children: [
                        activeTab === "augustine" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AugustineTab, {
                            accentColor: accentColor,
                            augustineTab: augustineTab,
                            setAugustineTab: setAugustineTab,
                            imagePreloaded: imagePreloaded,
                            t: t
                        }, void 0, false, {
                            fileName: "[project]/src/components/DirectorsPage.tsx",
                            lineNumber: 143,
                            columnNumber: 13
                        }, this),
                        activeTab === "vijaya" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(VijayaTab, {
                            accentColor: accentColor,
                            imagePreloaded: imagePreloaded,
                            t: t
                        }, void 0, false, {
                            fileName: "[project]/src/components/DirectorsPage.tsx",
                            lineNumber: 154,
                            columnNumber: 13
                        }, this),
                        activeTab === "charles" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CharlesTab, {
                            accentColor: accentColor,
                            imagePreloaded: imagePreloaded,
                            t: t
                        }, void 0, false, {
                            fileName: "[project]/src/components/DirectorsPage.tsx",
                            lineNumber: 159,
                            columnNumber: 13
                        }, this),
                        activeTab === "nancy" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NancyTab, {
                            accentColor: accentColor,
                            imagePreloaded: imagePreloaded,
                            t: t
                        }, void 0, false, {
                            fileName: "[project]/src/components/DirectorsPage.tsx",
                            lineNumber: 164,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/DirectorsPage.tsx",
                    lineNumber: 140,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/DirectorsPage.tsx",
            lineNumber: 131,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/DirectorsPage.tsx",
        lineNumber: 129,
        columnNumber: 5
    }, this);
}
_s(DirectorsPage, "Prt/Ijyzi5ScWYwnOLO/11Dr4Mw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"]
    ];
});
_c1 = DirectorsPage;
// Memoized Augustine Tab Component
const AugustineTab = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"])(({ accentColor, augustineTab, setAugustineTab, imagePreloaded, t })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "mb-16",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col items-center md:flex-row md:gap-12 md:items-stretch",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "order-2 md:order-1 mb-8 text-center md:mb-0 md:text-left md:w-[45%] md:pl-8 flex flex-col",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                            className: "mb-3 text-2xl md:text-5xl text-white md:whitespace-nowrap font-bold md:font-normal",
                                            children: t('augustine.name')
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/DirectorsPage.tsx",
                                            lineNumber: 187,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-center md:text-left space-y-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-white text-xl",
                                                    children: t('augustine.role')
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                                    lineNumber: 193,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-white",
                                                    children: t('augustine.organization1')
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                                    lineNumber: 194,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-white",
                                                    children: t('augustine.organization2')
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                                    lineNumber: 195,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/DirectorsPage.tsx",
                                            lineNumber: 192,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-2 mt-8 md:mt-4 md:mb-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-wrap justify-center md:justify-start gap-2",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#2E2E2E] border border-gray-600/40",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$award$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Award$3e$__["Award"], {
                                                                className: "w-5 h-5 text-gray-400 flex-shrink-0"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                lineNumber: 203,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-gray-300 font-bold text-sm md:text-base",
                                                                children: t('augustine.titles.guinnessRecord')
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                lineNumber: 204,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                                        lineNumber: 202,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                                    lineNumber: 201,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-wrap justify-center md:justify-start gap-2",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#2E2E2E] border border-gray-600/40",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$music$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Music$3e$__["Music"], {
                                                                className: "w-4 h-4 text-gray-400 flex-shrink-0"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                lineNumber: 211,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-gray-300 font-bold text-xs md:text-sm",
                                                                children: t('augustine.titles.worshipLeader')
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                lineNumber: 212,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                                        lineNumber: 210,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                                    lineNumber: 209,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-wrap justify-center md:justify-start gap-2",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#2E2E2E] border border-gray-600/40",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mic$3e$__["Mic"], {
                                                                className: "w-4 h-4 text-gray-400 flex-shrink-0"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                lineNumber: 219,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-gray-300 font-bold text-xs md:text-sm",
                                                                children: t('augustine.titles.songWriter')
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                lineNumber: 220,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                                        lineNumber: 218,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                                    lineNumber: 217,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-wrap justify-center md:justify-start gap-2",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#2E2E2E] border border-gray-600/40",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"], {
                                                                className: "w-4 h-4 text-gray-400 flex-shrink-0"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                lineNumber: 227,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-gray-300 font-bold text-xs md:text-sm",
                                                                children: t('augustine.titles.bibleTeacher')
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                lineNumber: 228,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                                        lineNumber: 226,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                                    lineNumber: 225,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-wrap justify-center md:justify-start gap-2",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#2E2E2E] border border-gray-600/40",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                xmlns: "http://www.w3.org/2000/svg",
                                                                className: "w-4 h-4 text-gray-400 flex-shrink-0",
                                                                viewBox: "0 0 24 24",
                                                                fill: "none",
                                                                stroke: "currentColor",
                                                                strokeWidth: "2",
                                                                strokeLinecap: "round",
                                                                strokeLinejoin: "round",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                        d: "M15 9.7V5a3 3 0 0 0-5.3-1.9l-6 6a3 3 0 0 0 0 4.2l6 6a3 3 0 0 0 5.3-1.9V14"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                        lineNumber: 236,
                                                                        columnNumber: 23
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                        d: "M20 4v16"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                        lineNumber: 237,
                                                                        columnNumber: 23
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                lineNumber: 235,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-gray-300 font-bold text-xs md:text-sm",
                                                                children: t('augustine.titles.shofarInstructor')
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                lineNumber: 239,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                                        lineNumber: 234,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                                    lineNumber: 233,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/DirectorsPage.tsx",
                                            lineNumber: 199,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                    lineNumber: 186,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-wrap justify-center gap-4 md:justify-start mt-6 md:mt-auto",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>{
                                                const element = document.getElementById('contact');
                                                if (element) {
                                                    const headerOffset = 150;
                                                    const elementPosition = element.getBoundingClientRect().top;
                                                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                                                    window.scrollTo({
                                                        top: offsetPosition,
                                                        behavior: 'smooth'
                                                    });
                                                }
                                            },
                                            className: "px-6 py-3 rounded-md shadow-md hover:shadow-lg text-black font-bold transition-all duration-300 cursor-pointer",
                                            style: {
                                                backgroundColor: accentColor
                                            },
                                            onMouseEnter: (e)=>e.currentTarget.style.backgroundColor = '#DAA520',
                                            onMouseLeave: (e)=>e.currentTarget.style.backgroundColor = accentColor,
                                            children: t('augustine.buttons.getInTouch')
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/DirectorsPage.tsx",
                                            lineNumber: 246,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: "/resources#worship",
                                            className: "px-6 py-3 border rounded-md shadow-sm hover:shadow transition-all duration-300 font-bold",
                                            style: {
                                                borderColor: accentColor,
                                                color: accentColor
                                            },
                                            onClick: (e)=>{
                                                e.preventDefault();
                                                window.dispatchEvent(new CustomEvent('navigate', {
                                                    detail: {
                                                        path: '/resources#worship'
                                                    }
                                                }));
                                            },
                                            onMouseEnter: (e)=>{
                                                e.currentTarget.style.backgroundColor = accentColor;
                                                e.currentTarget.style.color = '#000';
                                            },
                                            onMouseLeave: (e)=>{
                                                e.currentTarget.style.backgroundColor = 'transparent';
                                                e.currentTarget.style.color = accentColor;
                                            },
                                            children: t('augustine.buttons.worshipSongs')
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/DirectorsPage.tsx",
                                            lineNumber: 267,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                    lineNumber: 245,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/DirectorsPage.tsx",
                            lineNumber: 185,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "order-1 md:order-2 mb-8 md:mb-0 md:w-[35%] md:ml-auto md:mr-16 px-4 md:px-0",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative rounded-xl shadow-lg max-h-[438px] overflow-hidden",
                                children: [
                                    !imagePreloaded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Skeleton"], {
                                        className: "w-full h-full absolute inset-0"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                        lineNumber: 290,
                                        columnNumber: 35
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(OptimizedImage, {
                                        src: HERO_IMAGE_URL,
                                        alt: "Pastor Augustine Dandingi",
                                        className: "object-cover w-full h-auto rounded-xl",
                                        priority: true
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                        lineNumber: 291,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                lineNumber: 289,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/components/DirectorsPage.tsx",
                            lineNumber: 288,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/DirectorsPage.tsx",
                    lineNumber: 184,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/DirectorsPage.tsx",
                lineNumber: 183,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "py-12 mb-16 border-t border-b border-gray-800",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-2 gap-6 md:grid-cols-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-6 text-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mb-2 text-3xl font-bold",
                                    style: {
                                        color: accentColor
                                    },
                                    children: "7,000+"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                    lineNumber: 306,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-white",
                                    children: t('augustine.stats.studentsTrained')
                                }, void 0, false, {
                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                    lineNumber: 307,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/DirectorsPage.tsx",
                            lineNumber: 305,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-6 text-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mb-2 text-3xl font-bold",
                                    style: {
                                        color: accentColor
                                    },
                                    children: "1,090"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                    lineNumber: 310,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-white",
                                    children: t('augustine.stats.worldRecordParticipants')
                                }, void 0, false, {
                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                    lineNumber: 311,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/DirectorsPage.tsx",
                            lineNumber: 309,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-6 text-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mb-2 text-3xl font-bold",
                                    style: {
                                        color: accentColor
                                    },
                                    children: "5+"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                    lineNumber: 314,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-white",
                                    children: t('augustine.stats.majorAwards')
                                }, void 0, false, {
                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                    lineNumber: 315,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/DirectorsPage.tsx",
                            lineNumber: 313,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-6 text-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mb-2 text-3xl font-bold",
                                    style: {
                                        color: accentColor
                                    },
                                    children: "100K+"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                    lineNumber: 318,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-white",
                                    children: t('augustine.stats.worshipAttendees')
                                }, void 0, false, {
                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                    lineNumber: 319,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/DirectorsPage.tsx",
                            lineNumber: 317,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/DirectorsPage.tsx",
                    lineNumber: 304,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/DirectorsPage.tsx",
                lineNumber: 303,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                id: "about",
                className: "pb-4 mb-8 md:mb-16",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-w-3xl mx-auto mb-12 text-center px-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "mb-4 text-3xl md:text-4xl text-white",
                                children: t('augustine.aboutSection.title')
                            }, void 0, false, {
                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                lineNumber: 327,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-20 h-1 mx-auto mb-6",
                                style: {
                                    backgroundColor: accentColor
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                lineNumber: 328,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-lg text-white",
                                children: t('augustine.aboutSection.subtitle')
                            }, void 0, false, {
                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                lineNumber: 329,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/DirectorsPage.tsx",
                        lineNumber: 326,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid gap-8 md:grid-cols-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "px-4 md:px-0",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "mb-4 text-xl font-semibold text-white",
                                        children: t('augustine.aboutSection.visionMissionTitle')
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                        lineNumber: 336,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mb-4 text-white",
                                        children: t('augustine.aboutSection.paragraph1')
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                        lineNumber: 337,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mb-4 text-white",
                                        children: t('augustine.aboutSection.paragraph2')
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                        lineNumber: 340,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-white",
                                        children: t('augustine.aboutSection.paragraph3')
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                        lineNumber: 343,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                lineNumber: 335,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mx-4 md:mx-0",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-8 rounded-lg bg-[#2E2E2E] border border-gray-800",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "mb-6 text-xl font-semibold text-center text-white",
                                            children: t('augustine.aboutSection.ministryHighlights')
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/DirectorsPage.tsx",
                                            lineNumber: 350,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-start",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center justify-center flex-shrink-0 w-10 h-10 mt-1 mr-4 rounded-full",
                                                            style: {
                                                                backgroundColor: accentColor
                                                            },
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"], {
                                                                className: "w-5 h-5 text-black"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                lineNumber: 354,
                                                                columnNumber: 19
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/DirectorsPage.tsx",
                                                            lineNumber: 353,
                                                            columnNumber: 17
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                    className: "font-medium text-white",
                                                                    children: t('augustine.aboutSection.bibleTeacherTitle')
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                    lineNumber: 357,
                                                                    columnNumber: 19
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-sm text-white",
                                                                    children: t('augustine.aboutSection.bibleTeacherDesc')
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                    lineNumber: 358,
                                                                    columnNumber: 19
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/DirectorsPage.tsx",
                                                            lineNumber: 356,
                                                            columnNumber: 17
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                                    lineNumber: 352,
                                                    columnNumber: 15
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-start",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center justify-center flex-shrink-0 w-10 h-10 mt-1 mr-4 rounded-full",
                                                            style: {
                                                                backgroundColor: accentColor
                                                            },
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$music$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Music$3e$__["Music"], {
                                                                className: "w-5 h-5 text-black"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                lineNumber: 364,
                                                                columnNumber: 19
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/DirectorsPage.tsx",
                                                            lineNumber: 363,
                                                            columnNumber: 17
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                    className: "font-medium text-white",
                                                                    children: t('augustine.aboutSection.worshipLeaderTitle')
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                    lineNumber: 367,
                                                                    columnNumber: 19
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-sm text-white",
                                                                    children: t('augustine.aboutSection.worshipLeaderDesc')
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                    lineNumber: 368,
                                                                    columnNumber: 19
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/DirectorsPage.tsx",
                                                            lineNumber: 366,
                                                            columnNumber: 17
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                                    lineNumber: 362,
                                                    columnNumber: 15
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-start",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center justify-center flex-shrink-0 w-10 h-10 mt-1 mr-4 rounded-full",
                                                            style: {
                                                                backgroundColor: accentColor
                                                            },
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                                                                className: "w-5 h-5 text-black"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                lineNumber: 374,
                                                                columnNumber: 19
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/DirectorsPage.tsx",
                                                            lineNumber: 373,
                                                            columnNumber: 17
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                    className: "font-medium text-white",
                                                                    children: t('augustine.aboutSection.ministryFounderTitle')
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                    lineNumber: 377,
                                                                    columnNumber: 19
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-sm text-white",
                                                                    children: t('augustine.aboutSection.ministryFounderDesc')
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                    lineNumber: 378,
                                                                    columnNumber: 19
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/DirectorsPage.tsx",
                                                            lineNumber: 376,
                                                            columnNumber: 17
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                                    lineNumber: 372,
                                                    columnNumber: 15
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-start",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center justify-center flex-shrink-0 w-10 h-10 mt-1 mr-4 rounded-full",
                                                            style: {
                                                                backgroundColor: accentColor
                                                            },
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                xmlns: "http://www.w3.org/2000/svg",
                                                                className: "w-5 h-5 text-black",
                                                                viewBox: "0 0 24 24",
                                                                fill: "none",
                                                                stroke: "currentColor",
                                                                strokeWidth: "2",
                                                                strokeLinecap: "round",
                                                                strokeLinejoin: "round",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                        d: "M15 9.7V5a3 3 0 0 0-5.3-1.9l-6 6a3 3 0 0 0 0 4.2l6 6a3 3 0 0 0 5.3-1.9V14"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                        lineNumber: 385,
                                                                        columnNumber: 21
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                        d: "M20 4v16"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                        lineNumber: 386,
                                                                        columnNumber: 21
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                lineNumber: 384,
                                                                columnNumber: 19
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/DirectorsPage.tsx",
                                                            lineNumber: 383,
                                                            columnNumber: 17
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                    className: "font-medium text-white",
                                                                    children: t('augustine.aboutSection.shofarInstructorTitle')
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                    lineNumber: 390,
                                                                    columnNumber: 19
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-sm text-white",
                                                                    children: t('augustine.aboutSection.shofarInstructorDesc')
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                    lineNumber: 391,
                                                                    columnNumber: 19
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/DirectorsPage.tsx",
                                                            lineNumber: 389,
                                                            columnNumber: 17
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                                    lineNumber: 382,
                                                    columnNumber: 15
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/DirectorsPage.tsx",
                                            lineNumber: 351,
                                            columnNumber: 13
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                    lineNumber: 349,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                lineNumber: 348,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/DirectorsPage.tsx",
                        lineNumber: 334,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/DirectorsPage.tsx",
                lineNumber: 325,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                id: "ministries",
                className: "pt-6 md:pt-16 pb-8 bg-black w-full",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-full",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "max-w-3xl mx-auto mb-12 text-center px-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "mb-4 text-3xl md:text-4xl text-white",
                                    children: t('augustine.ministriesVisionSection.title')
                                }, void 0, false, {
                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                    lineNumber: 404,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-20 h-1 mx-auto mb-6",
                                    style: {
                                        backgroundColor: accentColor
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                    lineNumber: 405,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/DirectorsPage.tsx",
                            lineNumber: 403,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-12 max-w-7xl mx-auto px-4 md:px-6 lg:px-8",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-wrap justify-center mb-5 space-x-2 md:space-x-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: `px-5 py-2 mb-2 text-sm font-medium transition-all duration-200 rounded-full cursor-pointer ${augustineTab === 'ministries' ? 'text-black shadow-md' : 'text-white bg-[#2E2E2E] hover:bg-[#3E3E3E]'}`,
                                            style: augustineTab === 'ministries' ? {
                                                backgroundColor: accentColor
                                            } : {},
                                            onClick: ()=>setAugustineTab('ministries'),
                                            children: t('augustine.subTabs.ministryOverview')
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/DirectorsPage.tsx",
                                            lineNumber: 411,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: `px-5 py-2 mb-2 text-sm font-medium transition-all duration-200 rounded-full cursor-pointer ${augustineTab === 'hallel' ? 'text-black shadow-md' : 'text-white bg-[#2E2E2E] hover:bg-[#3E3E3E]'}`,
                                            style: augustineTab === 'hallel' ? {
                                                backgroundColor: accentColor
                                            } : {},
                                            onClick: ()=>setAugustineTab('hallel'),
                                            children: t('augustine.subTabs.hallelMusicSchool')
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/DirectorsPage.tsx",
                                            lineNumber: 418,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: `px-5 py-2 mb-2 text-sm font-medium transition-all duration-200 rounded-full cursor-pointer ${augustineTab === 'teaching' ? 'text-black shadow-md' : 'text-white bg-[#2E2E2E] hover:bg-[#3E3E3E]'}`,
                                            style: augustineTab === 'teaching' ? {
                                                backgroundColor: accentColor
                                            } : {},
                                            onClick: ()=>setAugustineTab('teaching'),
                                            children: t('augustine.subTabs.teachingShofar')
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/DirectorsPage.tsx",
                                            lineNumber: 425,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                    lineNumber: 410,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                augustineTab === 'ministries' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mb-10 overflow-hidden rounded-xl bg-[#2E2E2E]",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid gap-0 overflow-hidden rounded-lg md:grid-cols-5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "hidden overflow-hidden md:block md:col-span-2",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$figma$2f$ImageWithFallback$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ImageWithFallback"], {
                                                            src: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
                                                            alt: "Worship service",
                                                            className: "object-cover w-full h-full"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/DirectorsPage.tsx",
                                                            lineNumber: 441,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                                        lineNumber: 440,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "p-6 md:col-span-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center justify-between mb-4",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                        className: "text-2xl font-bold text-white",
                                                                        children: t('augustine.ministriesVisionSection.ybhm.title')
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                        lineNumber: 449,
                                                                        columnNumber: 25
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "px-3 py-1 text-sm font-medium rounded-full",
                                                                        style: {
                                                                            backgroundColor: accentColor,
                                                                            color: 'black'
                                                                        },
                                                                        children: t('augustine.ministriesVisionSection.ybhm.badge')
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                        lineNumber: 450,
                                                                        columnNumber: 25
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                lineNumber: 448,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center mb-3 space-x-4",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-center text-white",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                                                                className: "w-4 h-4 mr-2"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                                lineNumber: 456,
                                                                                columnNumber: 27
                                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-sm",
                                                                                children: t('augustine.ministriesVisionSection.ybhm.location')
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                                lineNumber: 457,
                                                                                columnNumber: 27
                                                                            }, ("TURBOPACK compile-time value", void 0))
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                        lineNumber: 455,
                                                                        columnNumber: 25
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-center text-white",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                                                                className: "w-4 h-4 mr-2"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                                lineNumber: 460,
                                                                                columnNumber: 27
                                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-sm",
                                                                                children: t('augustine.ministriesVisionSection.ybhm.founded')
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                                lineNumber: 461,
                                                                                columnNumber: 27
                                                                            }, ("TURBOPACK compile-time value", void 0))
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                        lineNumber: 459,
                                                                        columnNumber: 25
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                lineNumber: 454,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "mb-4 text-white",
                                                                children: t('augustine.ministriesVisionSection.ybhm.description')
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                lineNumber: 464,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex flex-wrap gap-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "px-3 py-1 text-xs rounded-full bg-black text-white",
                                                                        children: t('augustine.ministriesVisionSection.ybhm.tags.worship')
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                        lineNumber: 468,
                                                                        columnNumber: 25
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "px-3 py-1 text-xs rounded-full bg-black text-white",
                                                                        children: t('augustine.ministriesVisionSection.ybhm.tags.biblicalTeaching')
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                        lineNumber: 469,
                                                                        columnNumber: 25
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "px-3 py-1 text-xs rounded-full bg-black text-white",
                                                                        children: t('augustine.ministriesVisionSection.ybhm.tags.community')
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                        lineNumber: 470,
                                                                        columnNumber: 25
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                lineNumber: 467,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                                        lineNumber: 447,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                                lineNumber: 439,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/DirectorsPage.tsx",
                                            lineNumber: 438,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mb-10 overflow-hidden rounded-xl bg-[#2E2E2E]",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid gap-0 overflow-hidden rounded-lg md:grid-cols-5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "p-6 md:col-span-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center justify-between mb-4",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                        className: "text-2xl font-bold text-white",
                                                                        children: t('augustine.ministriesVisionSection.hms.title')
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                        lineNumber: 481,
                                                                        columnNumber: 25
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "px-3 py-1 text-sm font-medium rounded-full",
                                                                        style: {
                                                                            backgroundColor: accentColor,
                                                                            color: 'black'
                                                                        },
                                                                        children: t('augustine.ministriesVisionSection.hms.badge')
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                        lineNumber: 482,
                                                                        columnNumber: 25
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                lineNumber: 480,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center mb-3 space-x-4",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-center text-white",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__["Globe"], {
                                                                                className: "w-4 h-4 mr-2"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                                lineNumber: 488,
                                                                                columnNumber: 27
                                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-sm",
                                                                                children: t('augustine.ministriesVisionSection.hms.onlineInPerson')
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                                lineNumber: 489,
                                                                                columnNumber: 27
                                                                            }, ("TURBOPACK compile-time value", void 0))
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                        lineNumber: 487,
                                                                        columnNumber: 25
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-center text-white",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                                                                                className: "w-4 h-4 mr-2"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                                lineNumber: 492,
                                                                                columnNumber: 27
                                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-sm",
                                                                                children: t('augustine.ministriesVisionSection.hms.studentsTrained')
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                                lineNumber: 493,
                                                                                columnNumber: 27
                                                                            }, ("TURBOPACK compile-time value", void 0))
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                        lineNumber: 491,
                                                                        columnNumber: 25
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                lineNumber: 486,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "mb-4 text-white",
                                                                children: t('augustine.ministriesVisionSection.hms.description')
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                lineNumber: 496,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex flex-wrap gap-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "px-3 py-1 text-xs rounded-full bg-black text-white",
                                                                        children: t('augustine.ministriesVisionSection.hms.tags.freeTraining')
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                        lineNumber: 500,
                                                                        columnNumber: 25
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "px-3 py-1 text-xs rounded-full bg-black text-white",
                                                                        children: t('augustine.ministriesVisionSection.hms.tags.keyboard')
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                        lineNumber: 501,
                                                                        columnNumber: 25
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "px-3 py-1 text-xs rounded-full bg-black text-white",
                                                                        children: t('augustine.ministriesVisionSection.hms.tags.worldRecord')
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                        lineNumber: 502,
                                                                        columnNumber: 25
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                lineNumber: 499,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                                        lineNumber: 479,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "hidden overflow-hidden md:block md:col-span-2",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$figma$2f$ImageWithFallback$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ImageWithFallback"], {
                                                            src: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
                                                            alt: "Music keyboard",
                                                            className: "object-cover w-full h-full"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/DirectorsPage.tsx",
                                                            lineNumber: 506,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                                        lineNumber: 505,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                                lineNumber: 478,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/DirectorsPage.tsx",
                                            lineNumber: 477,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "overflow-hidden rounded-xl bg-[#2E2E2E]",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-col gap-6 p-4 md:p-6 md:grid md:grid-cols-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "md:col-span-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                className: "mb-3 text-2xl font-bold text-white",
                                                                children: t('augustine.ministriesVisionSection.crusadeWorship.title')
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                lineNumber: 519,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center mb-3 text-white",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                                                        className: "w-4 h-4 mr-2"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                        lineNumber: 521,
                                                                        columnNumber: 25
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-sm",
                                                                        children: t('augustine.ministriesVisionSection.crusadeWorship.location')
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                        lineNumber: 522,
                                                                        columnNumber: 25
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                lineNumber: 520,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-white",
                                                                children: t('augustine.ministriesVisionSection.crusadeWorship.description')
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                lineNumber: 524,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                                        lineNumber: 518,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "grid grid-cols-2 gap-3 md:gap-4 md:grid-cols-1 md:col-span-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex flex-col items-center justify-center p-4 text-center rounded-lg bg-black",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-center justify-center w-14 h-14 mb-3 rounded-full",
                                                                        style: {
                                                                            backgroundColor: accentColor
                                                                        },
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mic$3e$__["Mic"], {
                                                                            className: "w-7 h-7 text-black"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                            lineNumber: 531,
                                                                            columnNumber: 27
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                        lineNumber: 530,
                                                                        columnNumber: 25
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "mb-1 font-bold text-white text-xl",
                                                                        children: "100K+"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                        lineNumber: 533,
                                                                        columnNumber: 25
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-xs text-white leading-tight",
                                                                        children: t('augustine.ministriesVisionSection.crusadeWorship.worshipAttendees')
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                        lineNumber: 534,
                                                                        columnNumber: 25
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                lineNumber: 529,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex flex-col items-center justify-center p-4 text-center rounded-lg bg-black",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-center justify-center w-14 h-14 mb-3 rounded-full",
                                                                        style: {
                                                                            backgroundColor: accentColor
                                                                        },
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$music$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Music$3e$__["Music"], {
                                                                            className: "w-7 h-7 text-black"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                            lineNumber: 538,
                                                                            columnNumber: 27
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                        lineNumber: 537,
                                                                        columnNumber: 25
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "mb-1 font-bold text-white text-xl",
                                                                        children: "50+"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                        lineNumber: 540,
                                                                        columnNumber: 25
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-xs text-white leading-tight",
                                                                        children: t('augustine.ministriesVisionSection.crusadeWorship.crusadeEvents')
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                        lineNumber: 541,
                                                                        columnNumber: 25
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                lineNumber: 536,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                                        lineNumber: 528,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                                lineNumber: 517,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/DirectorsPage.tsx",
                                            lineNumber: 516,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                    lineNumber: 436,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                augustineTab === 'hallel' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "max-w-4xl mx-auto px-4 md:px-6",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "p-8 rounded-lg bg-[#2E2E2E]",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "mb-4 text-2xl font-semibold text-white",
                                                        children: t('augustine.hallelTab.visionTitle')
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                                        lineNumber: 553,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "mb-6 text-lg text-white italic",
                                                        children: t('augustine.hallelTab.visionQuote')
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                                        lineNumber: 554,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "space-y-4 mb-6",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-start",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-center justify-center flex-shrink-0 w-8 h-8 mt-1 mr-4 rounded-full",
                                                                        style: {
                                                                            backgroundColor: accentColor
                                                                        },
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                            xmlns: "http://www.w3.org/2000/svg",
                                                                            className: "w-4 h-4 text-black",
                                                                            viewBox: "0 0 24 24",
                                                                            fill: "none",
                                                                            stroke: "currentColor",
                                                                            strokeWidth: "2",
                                                                            strokeLinecap: "round",
                                                                            strokeLinejoin: "round",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("polyline", {
                                                                                points: "20 6 9 17 4 12"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                                lineNumber: 561,
                                                                                columnNumber: 29
                                                                            }, ("TURBOPACK compile-time value", void 0))
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                            lineNumber: 560,
                                                                            columnNumber: 27
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                        lineNumber: 559,
                                                                        columnNumber: 25
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-white",
                                                                            children: t('augustine.hallelTab.point1')
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                            lineNumber: 565,
                                                                            columnNumber: 27
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                        lineNumber: 564,
                                                                        columnNumber: 25
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                lineNumber: 558,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-start",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-center justify-center flex-shrink-0 w-8 h-8 mt-1 mr-4 rounded-full",
                                                                        style: {
                                                                            backgroundColor: accentColor
                                                                        },
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                            xmlns: "http://www.w3.org/2000/svg",
                                                                            className: "w-4 h-4 text-black",
                                                                            viewBox: "0 0 24 24",
                                                                            fill: "none",
                                                                            stroke: "currentColor",
                                                                            strokeWidth: "2",
                                                                            strokeLinecap: "round",
                                                                            strokeLinejoin: "round",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("polyline", {
                                                                                points: "20 6 9 17 4 12"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                                lineNumber: 572,
                                                                                columnNumber: 29
                                                                            }, ("TURBOPACK compile-time value", void 0))
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                            lineNumber: 571,
                                                                            columnNumber: 27
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                        lineNumber: 570,
                                                                        columnNumber: 25
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-white",
                                                                            children: t('augustine.hallelTab.point2')
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                            lineNumber: 576,
                                                                            columnNumber: 27
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                        lineNumber: 575,
                                                                        columnNumber: 25
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                lineNumber: 569,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-start",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-center justify-center flex-shrink-0 w-8 h-8 mt-1 mr-4 rounded-full",
                                                                        style: {
                                                                            backgroundColor: accentColor
                                                                        },
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                            xmlns: "http://www.w3.org/2000/svg",
                                                                            className: "w-4 h-4 text-black",
                                                                            viewBox: "0 0 24 24",
                                                                            fill: "none",
                                                                            stroke: "currentColor",
                                                                            strokeWidth: "2",
                                                                            strokeLinecap: "round",
                                                                            strokeLinejoin: "round",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("polyline", {
                                                                                points: "20 6 9 17 4 12"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                                lineNumber: 583,
                                                                                columnNumber: 29
                                                                            }, ("TURBOPACK compile-time value", void 0))
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                            lineNumber: 582,
                                                                            columnNumber: 27
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                        lineNumber: 581,
                                                                        columnNumber: 25
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-white",
                                                                            children: t('augustine.hallelTab.point3')
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                            lineNumber: 587,
                                                                            columnNumber: 27
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                        lineNumber: 586,
                                                                        columnNumber: 25
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                lineNumber: 580,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-start",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-center justify-center flex-shrink-0 w-8 h-8 mt-1 mr-4 rounded-full",
                                                                        style: {
                                                                            backgroundColor: accentColor
                                                                        },
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                            xmlns: "http://www.w3.org/2000/svg",
                                                                            className: "w-4 h-4 text-black",
                                                                            viewBox: "0 0 24 24",
                                                                            fill: "none",
                                                                            stroke: "currentColor",
                                                                            strokeWidth: "2",
                                                                            strokeLinecap: "round",
                                                                            strokeLinejoin: "round",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("polyline", {
                                                                                points: "20 6 9 17 4 12"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                                lineNumber: 594,
                                                                                columnNumber: 29
                                                                            }, ("TURBOPACK compile-time value", void 0))
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                            lineNumber: 593,
                                                                            columnNumber: 27
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                        lineNumber: 592,
                                                                        columnNumber: 25
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-white",
                                                                            children: t('augustine.hallelTab.point4')
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                            lineNumber: 598,
                                                                            columnNumber: 27
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                        lineNumber: 597,
                                                                        columnNumber: 25
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                lineNumber: 591,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                                        lineNumber: 557,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex justify-center mt-8",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>{
                                                                window.dispatchEvent(new CustomEvent('navigate', {
                                                                    detail: {
                                                                        path: '/ministries/hms'
                                                                    }
                                                                }));
                                                            },
                                                            className: "px-8 py-3 rounded-md shadow-md hover:shadow-lg text-black font-bold transition-all duration-300 cursor-pointer inline-flex items-center gap-2",
                                                            style: {
                                                                backgroundColor: accentColor
                                                            },
                                                            onMouseEnter: (e)=>e.currentTarget.style.backgroundColor = '#DAA520',
                                                            onMouseLeave: (e)=>e.currentTarget.style.backgroundColor = accentColor,
                                                            children: [
                                                                t('augustine.hallelTab.knowMore'),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                                                    className: "w-5 h-5"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                    lineNumber: 614,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/DirectorsPage.tsx",
                                                            lineNumber: 604,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                                        lineNumber: 603,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                                lineNumber: 552,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/DirectorsPage.tsx",
                                            lineNumber: 551,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "p-6 mt-8 rounded-lg bg-[#2E2E2E]",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "mb-4 text-xl font-semibold text-center text-white",
                                                    children: t('augustine.hallelTab.worldRecordTitle')
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                                    lineNumber: 621,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mb-6 text-center text-white",
                                                    children: t('augustine.hallelTab.worldRecordDesc')
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                                    lineNumber: 622,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-wrap justify-center gap-6",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center justify-center w-full p-4 text-center rounded-lg shadow-sm bg-black md:w-auto md:min-w-[200px]",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-center justify-center w-16 h-16 mx-auto mb-3 rounded-full",
                                                                        style: {
                                                                            backgroundColor: accentColor
                                                                        },
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$award$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Award$3e$__["Award"], {
                                                                            className: "w-8 h-8 text-black"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                            lineNumber: 630,
                                                                            columnNumber: 27
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                        lineNumber: 629,
                                                                        columnNumber: 25
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "font-medium text-white",
                                                                        children: t('augustine.hallelTab.guinnessRecord')
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                        lineNumber: 632,
                                                                        columnNumber: 25
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-sm text-white",
                                                                        children: t('augustine.hallelTab.keyboardPlayers')
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                        lineNumber: 633,
                                                                        columnNumber: 25
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                lineNumber: 628,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/DirectorsPage.tsx",
                                                            lineNumber: 627,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center justify-center w-full p-4 text-center rounded-lg shadow-sm bg-black md:w-auto md:min-w-[200px]",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-center justify-center w-16 h-16 mx-auto mb-3 rounded-full",
                                                                        style: {
                                                                            backgroundColor: accentColor
                                                                        },
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__["Globe"], {
                                                                            className: "w-8 h-8 text-black"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                            lineNumber: 640,
                                                                            columnNumber: 27
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                        lineNumber: 639,
                                                                        columnNumber: 25
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "font-medium text-white",
                                                                        children: t('augustine.hallelTab.internationalRecognition')
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                        lineNumber: 642,
                                                                        columnNumber: 25
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-sm text-white",
                                                                        children: t('augustine.hallelTab.multipleRecords')
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                        lineNumber: 643,
                                                                        columnNumber: 25
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                lineNumber: 638,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/DirectorsPage.tsx",
                                                            lineNumber: 637,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center justify-center w-full p-4 text-center rounded-lg shadow-sm bg-black md:w-auto md:min-w-[200px]",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-center justify-center w-16 h-16 mx-auto mb-3 rounded-full",
                                                                        style: {
                                                                            backgroundColor: accentColor
                                                                        },
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                                                            className: "w-8 h-8 text-black"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                            lineNumber: 650,
                                                                            columnNumber: 27
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                        lineNumber: 649,
                                                                        columnNumber: 25
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "font-medium text-white",
                                                                        children: "December 1st, 2024"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                        lineNumber: 652,
                                                                        columnNumber: 25
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-sm text-white",
                                                                        children: "Historic Achievement"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                        lineNumber: 653,
                                                                        columnNumber: 25
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                lineNumber: 648,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/DirectorsPage.tsx",
                                                            lineNumber: 647,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                                    lineNumber: 626,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/DirectorsPage.tsx",
                                            lineNumber: 620,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                    lineNumber: 550,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                augustineTab === 'teaching' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid gap-6 md:grid-cols-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "p-6 rounded-lg bg-[#2E2E2E]",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "mb-4 text-xl font-semibold text-white",
                                                    children: "Shofar Instruction"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                                    lineNumber: 664,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "p-4 mb-6 rounded-lg bg-black",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-white",
                                                        children: 'Pastor Augustine is one of the few instructors in India teaching the biblical instrument "Shofar", and has become a leading voice in reviving its spiritual and prophetic significance within worship culture.'
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                                        lineNumber: 666,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                                    lineNumber: 665,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-4",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-start",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-center justify-center flex-shrink-0 w-10 h-10 mt-1 mr-4 rounded-full",
                                                                    style: {
                                                                        backgroundColor: accentColor
                                                                    },
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                        xmlns: "http://www.w3.org/2000/svg",
                                                                        className: "w-5 h-5 text-black",
                                                                        viewBox: "0 0 24 24",
                                                                        fill: "none",
                                                                        stroke: "currentColor",
                                                                        strokeWidth: "2",
                                                                        strokeLinecap: "round",
                                                                        strokeLinejoin: "round",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                                d: "M15 9.7V5a3 3 0 0 0-5.3-1.9l-6 6a3 3 0 0 0 0 4.2l6 6a3 3 0 0 0 5.3-1.9V14"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                                lineNumber: 674,
                                                                                columnNumber: 27
                                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                                d: "M20 4v16"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                                lineNumber: 675,
                                                                                columnNumber: 27
                                                                            }, ("TURBOPACK compile-time value", void 0))
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                        lineNumber: 673,
                                                                        columnNumber: 25
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                    lineNumber: 672,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                            className: "font-medium text-white",
                                                                            children: "Biblical Foundations"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                            lineNumber: 679,
                                                                            columnNumber: 25
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-sm text-white",
                                                                            children: "Teaching the historical and biblical significance of the Shofar"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                            lineNumber: 680,
                                                                            columnNumber: 25
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                    lineNumber: 678,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/DirectorsPage.tsx",
                                                            lineNumber: 671,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-start",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-center justify-center flex-shrink-0 w-10 h-10 mt-1 mr-4 rounded-full",
                                                                    style: {
                                                                        backgroundColor: accentColor
                                                                    },
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                        xmlns: "http://www.w3.org/2000/svg",
                                                                        className: "w-5 h-5 text-black",
                                                                        viewBox: "0 0 24 24",
                                                                        fill: "none",
                                                                        stroke: "currentColor",
                                                                        strokeWidth: "2",
                                                                        strokeLinecap: "round",
                                                                        strokeLinejoin: "round",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                                d: "M15 9.7V5a3 3 0 0 0-5.3-1.9l-6 6a3 3 0 0 0 0 4.2l6 6a3 3 0 0 0 5.3-1.9V14"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                                lineNumber: 687,
                                                                                columnNumber: 27
                                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                                d: "M20 4v16"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                                lineNumber: 688,
                                                                                columnNumber: 27
                                                                            }, ("TURBOPACK compile-time value", void 0))
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                        lineNumber: 686,
                                                                        columnNumber: 25
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                    lineNumber: 685,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                            className: "font-medium text-white",
                                                                            children: "Technique & Practice"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                            lineNumber: 692,
                                                                            columnNumber: 25
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-sm text-white",
                                                                            children: "Practical instruction on playing techniques and sound production"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                            lineNumber: 693,
                                                                            columnNumber: 25
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                    lineNumber: 691,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/DirectorsPage.tsx",
                                                            lineNumber: 684,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-start",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-center justify-center flex-shrink-0 w-10 h-10 mt-1 mr-4 rounded-full",
                                                                    style: {
                                                                        backgroundColor: accentColor
                                                                    },
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                        xmlns: "http://www.w3.org/2000/svg",
                                                                        className: "w-5 h-5 text-black",
                                                                        viewBox: "0 0 24 24",
                                                                        fill: "none",
                                                                        stroke: "currentColor",
                                                                        strokeWidth: "2",
                                                                        strokeLinecap: "round",
                                                                        strokeLinejoin: "round",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                                d: "M15 9.7V5a3 3 0 0 0-5.3-1.9l-6 6a3 3 0 0 0 0 4.2l6 6a3 3 0 0 0 5.3-1.9V14"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                                lineNumber: 700,
                                                                                columnNumber: 27
                                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                                d: "M20 4v16"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                                lineNumber: 701,
                                                                                columnNumber: 27
                                                                            }, ("TURBOPACK compile-time value", void 0))
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                        lineNumber: 699,
                                                                        columnNumber: 25
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                    lineNumber: 698,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                            className: "font-medium text-white",
                                                                            children: "Prophetic Application"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                            lineNumber: 705,
                                                                            columnNumber: 25
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-sm text-white",
                                                                            children: "Understanding the prophetic dimension of Shofar in worship"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                            lineNumber: 706,
                                                                            columnNumber: 25
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                    lineNumber: 704,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/DirectorsPage.tsx",
                                                            lineNumber: 697,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                                    lineNumber: 670,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/DirectorsPage.tsx",
                                            lineNumber: 663,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "p-6 rounded-lg bg-[#2E2E2E]",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "mb-4 text-xl font-semibold text-white",
                                                    children: "Bible Teaching"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                                    lineNumber: 713,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "p-4 mb-6 rounded-lg bg-black",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-white",
                                                        children: "Through his teaching, music, and leadership, Pastor Augustine is raising disciples, training songwriters, and equipping worship leaders to carry the flame of revival and worship into every corner of the nation."
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                                        lineNumber: 715,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                                    lineNumber: 714,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-4",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-start",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-center justify-center flex-shrink-0 w-10 h-10 mt-1 mr-4 rounded-full",
                                                                    style: {
                                                                        backgroundColor: accentColor
                                                                    },
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"], {
                                                                        className: "w-5 h-5 text-black"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                        lineNumber: 722,
                                                                        columnNumber: 25
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                    lineNumber: 721,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                            className: "font-medium text-white",
                                                                            children: "Worship Theology"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                            lineNumber: 725,
                                                                            columnNumber: 25
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-sm text-white",
                                                                            children: "Teaching biblical principles of worship and praise"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                            lineNumber: 726,
                                                                            columnNumber: 25
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                    lineNumber: 724,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/DirectorsPage.tsx",
                                                            lineNumber: 720,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-start",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-center justify-center flex-shrink-0 w-10 h-10 mt-1 mr-4 rounded-full",
                                                                    style: {
                                                                        backgroundColor: accentColor
                                                                    },
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"], {
                                                                        className: "w-5 h-5 text-black"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                        lineNumber: 732,
                                                                        columnNumber: 25
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                    lineNumber: 731,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                            className: "font-medium text-white",
                                                                            children: "Discipleship"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                            lineNumber: 735,
                                                                            columnNumber: 25
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-sm text-white",
                                                                            children: "Mentoring and discipling the next generation of ministry leaders"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                            lineNumber: 736,
                                                                            columnNumber: 25
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                    lineNumber: 734,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/DirectorsPage.tsx",
                                                            lineNumber: 730,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-start",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-center justify-center flex-shrink-0 w-10 h-10 mt-1 mr-4 rounded-full",
                                                                    style: {
                                                                        backgroundColor: accentColor
                                                                    },
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"], {
                                                                        className: "w-5 h-5 text-black"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                        lineNumber: 742,
                                                                        columnNumber: 25
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                    lineNumber: 741,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                            className: "font-medium text-white",
                                                                            children: "Songwriting"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                            lineNumber: 745,
                                                                            columnNumber: 25
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-sm text-white",
                                                                            children: "Training and equipping indigenous worship songwriters"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                            lineNumber: 746,
                                                                            columnNumber: 25
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                    lineNumber: 744,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/DirectorsPage.tsx",
                                                            lineNumber: 740,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                                    lineNumber: 719,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/DirectorsPage.tsx",
                                            lineNumber: 712,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                    lineNumber: 662,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/DirectorsPage.tsx",
                            lineNumber: 408,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/DirectorsPage.tsx",
                    lineNumber: 402,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/DirectorsPage.tsx",
                lineNumber: 401,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-center py-12 md:py-16",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                    src: separatorImage,
                    alt: "",
                    className: "w-full max-w-4xl h-auto opacity-60"
                }, void 0, false, {
                    fileName: "[project]/src/components/DirectorsPage.tsx",
                    lineNumber: 759,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/DirectorsPage.tsx",
                lineNumber: 758,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ContactSection, {
                accentColor: accentColor,
                contactId: "contact"
            }, void 0, false, {
                fileName: "[project]/src/components/DirectorsPage.tsx",
                lineNumber: 763,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/DirectorsPage.tsx",
        lineNumber: 181,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
});
_c2 = AugustineTab;
AugustineTab.displayName = 'AugustineTab';
// Memoized Vijaya Tab Component
const VijayaTab = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"])(({ accentColor, imagePreloaded, t })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "mb-5 md:mb-16",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col items-center md:items-start md:flex-row md:gap-12",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "order-2 md:order-1 mb-8 text-center md:mb-0 md:text-left md:w-[45%] md:pl-8 flex flex-col md:justify-between w-full md:w-[45%]",
                            style: {
                                minHeight: '405px'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                            className: "mb-3 text-2xl md:text-5xl text-white text-center md:text-left md:whitespace-nowrap font-bold md:font-normal",
                                            children: t('vijaya.name')
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/DirectorsPage.tsx",
                                            lineNumber: 779,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-center md:text-left space-y-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-white text-xl",
                                                    children: t('vijaya.role')
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                                    lineNumber: 785,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-white",
                                                    children: t('vijaya.organization')
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                                    lineNumber: 786,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/DirectorsPage.tsx",
                                            lineNumber: 784,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-2 mt-8 md:mt-4 md:mb-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-wrap justify-center md:justify-start gap-2",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#2E2E2E] border border-gray-600/40",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"], {
                                                                className: "w-5 h-5 text-gray-400 flex-shrink-0"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                lineNumber: 794,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-gray-300 font-bold text-sm md:text-base",
                                                                children: t('vijaya.titles.womensMinistry')
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                lineNumber: 795,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                                        lineNumber: 793,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                                    lineNumber: 792,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-wrap justify-center md:justify-start gap-2",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#2E2E2E] border border-gray-600/40",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                xmlns: "http://www.w3.org/2000/svg",
                                                                className: "w-4 h-4 text-gray-400 flex-shrink-0",
                                                                viewBox: "0 0 24 24",
                                                                fill: "none",
                                                                stroke: "currentColor",
                                                                strokeWidth: "2",
                                                                strokeLinecap: "round",
                                                                strokeLinejoin: "round",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                        d: "M12 2L2 7l10 5 10-5-10-5z"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                        lineNumber: 803,
                                                                        columnNumber: 23
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                        d: "M2 17l10 5 10-5"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                        lineNumber: 804,
                                                                        columnNumber: 23
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                        d: "M2 12l10 5 10-5"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                        lineNumber: 805,
                                                                        columnNumber: 23
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                lineNumber: 802,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-gray-300 font-bold text-xs md:text-sm",
                                                                children: t('vijaya.titles.intercessor')
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                lineNumber: 807,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                                        lineNumber: 801,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                                    lineNumber: 800,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-wrap justify-center md:justify-start gap-2",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#2E2E2E] border border-gray-600/40",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                                                                className: "w-4 h-4 text-gray-400 flex-shrink-0"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                lineNumber: 814,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-gray-300 font-bold text-xs md:text-sm",
                                                                children: t('vijaya.titles.counselor')
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                lineNumber: 815,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                                        lineNumber: 813,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                                    lineNumber: 812,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-wrap justify-center md:justify-start gap-2",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#2E2E2E] border border-gray-600/40",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"], {
                                                                className: "w-4 h-4 text-gray-400 flex-shrink-0"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                lineNumber: 822,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-gray-300 font-bold text-xs md:text-sm",
                                                                children: t('vijaya.titles.mentor')
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                lineNumber: 823,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                                        lineNumber: 821,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                                    lineNumber: 820,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-wrap justify-center md:justify-start gap-2",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#2E2E2E] border border-gray-600/40",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mic$3e$__["Mic"], {
                                                                className: "w-4 h-4 text-gray-400 flex-shrink-0"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                lineNumber: 830,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-gray-300 font-bold text-xs md:text-sm",
                                                                children: t('vijaya.titles.speaker')
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                lineNumber: 831,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                                        lineNumber: 829,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                                    lineNumber: 828,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/DirectorsPage.tsx",
                                            lineNumber: 790,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                    lineNumber: 778,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-wrap justify-center gap-4 md:justify-start mt-6 md:mt-auto",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            const element = document.getElementById('contact-vijaya');
                                            if (element) {
                                                const headerOffset = 150;
                                                const elementPosition = element.getBoundingClientRect().top;
                                                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                                                window.scrollTo({
                                                    top: offsetPosition,
                                                    behavior: 'smooth'
                                                });
                                            }
                                        },
                                        className: "px-6 py-3 rounded-md shadow-md hover:shadow-lg text-black font-bold transition-all duration-300 cursor-pointer",
                                        style: {
                                            backgroundColor: accentColor
                                        },
                                        onMouseEnter: (e)=>e.currentTarget.style.backgroundColor = '#DAA520',
                                        onMouseLeave: (e)=>e.currentTarget.style.backgroundColor = accentColor,
                                        children: t('vijaya.buttons.getInTouch')
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                        lineNumber: 838,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                    lineNumber: 837,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/DirectorsPage.tsx",
                            lineNumber: 777,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "order-1 md:order-2 mb-8 md:mb-0 md:w-[35%] md:ml-auto md:mr-16 px-4 md:px-0",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative rounded-xl shadow-lg max-h-[438px] overflow-hidden",
                                children: [
                                    !imagePreloaded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Skeleton"], {
                                        className: "w-full h-full absolute inset-0"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                        lineNumber: 864,
                                        columnNumber: 35
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(OptimizedImage, {
                                        src: IMAGE_URLS.vijaya,
                                        alt: "Ps. Vijaya Kumari Dandingi",
                                        className: "object-cover w-full h-auto rounded-xl"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                        lineNumber: 865,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                lineNumber: 863,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/components/DirectorsPage.tsx",
                            lineNumber: 862,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/DirectorsPage.tsx",
                    lineNumber: 776,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/DirectorsPage.tsx",
                lineNumber: 775,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "py-3 md:py-1 mb-5 md:mb-16 border-t border-gray-800"
            }, void 0, false, {
                fileName: "[project]/src/components/DirectorsPage.tsx",
                lineNumber: 876,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                id: "about-vijaya",
                className: "pt-2 pb-4 mb-16",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-w-3xl mx-auto mb-12 text-center px-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "mb-4 text-3xl md:text-4xl text-white",
                                children: t('vijaya.aboutSection.title')
                            }, void 0, false, {
                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                lineNumber: 881,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-20 h-1 mx-auto mb-6",
                                style: {
                                    backgroundColor: accentColor
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                lineNumber: 882,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-lg text-white",
                                children: t('vijaya.aboutSection.subtitle')
                            }, void 0, false, {
                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                lineNumber: 883,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/DirectorsPage.tsx",
                        lineNumber: 880,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid gap-8 md:grid-cols-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "px-4 md:px-0",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "mb-4 text-xl font-semibold text-white",
                                        children: t('vijaya.aboutSection.visionMissionTitle')
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                        lineNumber: 890,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mb-4 text-white",
                                        children: t('vijaya.aboutSection.paragraph1')
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                        lineNumber: 891,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mb-4 text-white",
                                        children: t('vijaya.aboutSection.paragraph2')
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                        lineNumber: 894,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-white",
                                        children: t('vijaya.aboutSection.paragraph3')
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                        lineNumber: 897,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                lineNumber: 889,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mx-4 md:mx-0",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-8 rounded-lg bg-[#2E2E2E] border border-gray-800",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "mb-6 text-xl font-semibold text-center text-white",
                                            children: t('vijaya.aboutSection.ministryHighlights')
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/DirectorsPage.tsx",
                                            lineNumber: 904,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-start",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center justify-center flex-shrink-0 w-10 h-10 mt-1 mr-4 rounded-full",
                                                            style: {
                                                                backgroundColor: accentColor
                                                            },
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"], {
                                                                className: "w-5 h-5 text-black"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                lineNumber: 908,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/DirectorsPage.tsx",
                                                            lineNumber: 907,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                    className: "font-medium text-white",
                                                                    children: t('vijaya.aboutSection.womensMinistryTitle')
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                    lineNumber: 911,
                                                                    columnNumber: 21
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-sm text-white",
                                                                    children: t('vijaya.aboutSection.womensMinistryDesc')
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                    lineNumber: 912,
                                                                    columnNumber: 21
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/DirectorsPage.tsx",
                                                            lineNumber: 910,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                                    lineNumber: 906,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-start",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center justify-center flex-shrink-0 w-10 h-10 mt-1 mr-4 rounded-full",
                                                            style: {
                                                                backgroundColor: accentColor
                                                            },
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                xmlns: "http://www.w3.org/2000/svg",
                                                                className: "w-5 h-5 text-black",
                                                                viewBox: "0 0 24 24",
                                                                fill: "none",
                                                                stroke: "currentColor",
                                                                strokeWidth: "2",
                                                                strokeLinecap: "round",
                                                                strokeLinejoin: "round",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                        d: "M12 2L2 7l10 5 10-5-10-5z"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                        lineNumber: 919,
                                                                        columnNumber: 21
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                        d: "M2 17l10 5 10-5"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                        lineNumber: 920,
                                                                        columnNumber: 21
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                        d: "M2 12l10 5 10-5"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                        lineNumber: 921,
                                                                        columnNumber: 21
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                lineNumber: 918,
                                                                columnNumber: 19
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/DirectorsPage.tsx",
                                                            lineNumber: 917,
                                                            columnNumber: 17
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                    className: "font-medium text-white",
                                                                    children: t('vijaya.aboutSection.prayerMinistryTitle')
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                    lineNumber: 925,
                                                                    columnNumber: 19
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-sm text-white",
                                                                    children: t('vijaya.aboutSection.prayerMinistryDesc')
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                    lineNumber: 926,
                                                                    columnNumber: 19
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/DirectorsPage.tsx",
                                                            lineNumber: 924,
                                                            columnNumber: 17
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                                    lineNumber: 916,
                                                    columnNumber: 15
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-start",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center justify-center flex-shrink-0 w-10 h-10 mt-1 mr-4 rounded-full",
                                                            style: {
                                                                backgroundColor: accentColor
                                                            },
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                                                                className: "w-5 h-5 text-black"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                lineNumber: 932,
                                                                columnNumber: 19
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/DirectorsPage.tsx",
                                                            lineNumber: 931,
                                                            columnNumber: 17
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                    className: "font-medium text-white",
                                                                    children: t('vijaya.aboutSection.counselingTitle')
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                    lineNumber: 935,
                                                                    columnNumber: 19
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-sm text-white",
                                                                    children: t('vijaya.aboutSection.counselingDesc')
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                    lineNumber: 936,
                                                                    columnNumber: 19
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/DirectorsPage.tsx",
                                                            lineNumber: 934,
                                                            columnNumber: 17
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                                    lineNumber: 930,
                                                    columnNumber: 15
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-start",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center justify-center flex-shrink-0 w-10 h-10 mt-1 mr-4 rounded-full",
                                                            style: {
                                                                backgroundColor: accentColor
                                                            },
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"], {
                                                                className: "w-5 h-5 text-black"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                lineNumber: 942,
                                                                columnNumber: 19
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/DirectorsPage.tsx",
                                                            lineNumber: 941,
                                                            columnNumber: 17
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                    className: "font-medium text-white",
                                                                    children: t('vijaya.aboutSection.teachingMinistryTitle')
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                    lineNumber: 945,
                                                                    columnNumber: 19
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-sm text-white",
                                                                    children: t('vijaya.aboutSection.teachingMinistryDesc')
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                    lineNumber: 946,
                                                                    columnNumber: 19
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/DirectorsPage.tsx",
                                                            lineNumber: 944,
                                                            columnNumber: 17
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                                    lineNumber: 940,
                                                    columnNumber: 15
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/DirectorsPage.tsx",
                                            lineNumber: 905,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                    lineNumber: 903,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                lineNumber: 902,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/DirectorsPage.tsx",
                        lineNumber: 888,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/DirectorsPage.tsx",
                lineNumber: 879,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-center py-12 md:py-16",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                    src: separatorImage,
                    alt: "",
                    className: "w-full max-w-4xl h-auto opacity-60"
                }, void 0, false, {
                    fileName: "[project]/src/components/DirectorsPage.tsx",
                    lineNumber: 957,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/DirectorsPage.tsx",
                lineNumber: 956,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ContactSection, {
                accentColor: accentColor,
                contactId: "contact-vijaya"
            }, void 0, false, {
                fileName: "[project]/src/components/DirectorsPage.tsx",
                lineNumber: 961,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/DirectorsPage.tsx",
        lineNumber: 773,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
});
_c3 = VijayaTab;
VijayaTab.displayName = 'VijayaTab';
// Memoized Charles Tab Component
const CharlesTab = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"])(({ accentColor, imagePreloaded, t })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "mb-5 md:mb-16",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col items-center md:items-start md:flex-row md:gap-12",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "order-2 md:order-1 mb-8 text-center md:mb-0 md:text-left md:w-[45%] md:pl-8 flex flex-col md:justify-between w-full md:w-[45%]",
                            style: {
                                minHeight: '405px'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                            className: "mb-3 text-2xl md:text-5xl text-white text-center md:text-left md:whitespace-nowrap font-bold md:font-normal",
                                            children: t('charles.name')
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/DirectorsPage.tsx",
                                            lineNumber: 977,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-center md:text-left space-y-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-white text-xl",
                                                    children: t('charles.role')
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                                    lineNumber: 983,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-white",
                                                    children: t('charles.organization')
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                                    lineNumber: 984,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/DirectorsPage.tsx",
                                            lineNumber: 982,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-2 mt-8 md:mt-4 md:mb-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-wrap justify-center md:justify-start gap-2",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#2E2E2E] border border-gray-600/40",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$music$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Music$3e$__["Music"], {
                                                                className: "w-5 h-5 text-gray-400 flex-shrink-0"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                lineNumber: 992,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-gray-300 font-bold text-sm md:text-base",
                                                                children: t('charles.titles.worshipLeader')
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                lineNumber: 993,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                                        lineNumber: 991,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                                    lineNumber: 990,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-wrap justify-center md:justify-start gap-2",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#2E2E2E] border border-gray-600/40",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                                                                className: "w-4 h-4 text-gray-400 flex-shrink-0"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                lineNumber: 1000,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-gray-300 font-bold text-xs md:text-sm",
                                                                children: t('charles.titles.youthMinistry')
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                lineNumber: 1001,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                                        lineNumber: 999,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                                    lineNumber: 998,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-wrap justify-center md:justify-start gap-2",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#2E2E2E] border border-gray-600/40",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mic$3e$__["Mic"], {
                                                                className: "w-4 h-4 text-gray-400 flex-shrink-0"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                lineNumber: 1008,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-gray-300 font-bold text-xs md:text-sm",
                                                                children: t('charles.titles.musicProduction')
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                lineNumber: 1009,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                                        lineNumber: 1007,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                                    lineNumber: 1006,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-wrap justify-center md:justify-start gap-2",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#2E2E2E] border border-gray-600/40",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"], {
                                                                className: "w-4 h-4 text-gray-400 flex-shrink-0"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                lineNumber: 1016,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-gray-300 font-bold text-xs md:text-sm",
                                                                children: t('charles.titles.songwriting')
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                lineNumber: 1017,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                                        lineNumber: 1015,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                                    lineNumber: 1014,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/DirectorsPage.tsx",
                                            lineNumber: 988,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                    lineNumber: 976,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-wrap justify-center gap-4 md:justify-start mt-6 md:mt-auto",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            const element = document.getElementById('contact-charles');
                                            if (element) {
                                                const headerOffset = 150;
                                                const elementPosition = element.getBoundingClientRect().top;
                                                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                                                window.scrollTo({
                                                    top: offsetPosition,
                                                    behavior: 'smooth'
                                                });
                                            }
                                        },
                                        className: "px-6 py-3 rounded-md shadow-md hover:shadow-lg text-black font-bold transition-all duration-300 cursor-pointer",
                                        style: {
                                            backgroundColor: accentColor
                                        },
                                        onMouseEnter: (e)=>e.currentTarget.style.backgroundColor = '#DAA520',
                                        onMouseLeave: (e)=>e.currentTarget.style.backgroundColor = accentColor,
                                        children: t('charles.buttons.getInTouch')
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                        lineNumber: 1024,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                    lineNumber: 1023,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/DirectorsPage.tsx",
                            lineNumber: 975,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "order-1 md:order-2 mb-8 md:mb-0 md:w-[35%] md:ml-auto md:mr-16 px-4 md:px-0",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative rounded-xl shadow-lg max-h-[438px] overflow-hidden",
                                children: [
                                    !imagePreloaded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Skeleton"], {
                                        className: "w-full h-full absolute inset-0"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                        lineNumber: 1050,
                                        columnNumber: 35
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(OptimizedImage, {
                                        src: IMAGE_URLS.charles,
                                        alt: "Charles Aaron Benedict",
                                        className: "object-cover w-full h-auto rounded-xl"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                        lineNumber: 1051,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                lineNumber: 1049,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/components/DirectorsPage.tsx",
                            lineNumber: 1048,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/DirectorsPage.tsx",
                    lineNumber: 974,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/DirectorsPage.tsx",
                lineNumber: 973,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "py-3 md:py-1 mb-5 md:mb-16 border-t border-gray-800"
            }, void 0, false, {
                fileName: "[project]/src/components/DirectorsPage.tsx",
                lineNumber: 1062,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                id: "about-charles",
                className: "pt-2 pb-4 mb-16",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-w-3xl mx-auto mb-12 text-center px-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "mb-4 text-3xl md:text-4xl text-white",
                                children: t('charles.aboutSection.title')
                            }, void 0, false, {
                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                lineNumber: 1067,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-20 h-1 mx-auto mb-6",
                                style: {
                                    backgroundColor: accentColor
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                lineNumber: 1068,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-lg text-white",
                                children: t('charles.aboutSection.subtitle')
                            }, void 0, false, {
                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                lineNumber: 1069,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/DirectorsPage.tsx",
                        lineNumber: 1066,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid gap-8 md:grid-cols-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "px-4 md:px-0",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "mb-4 text-xl font-semibold text-white",
                                        children: t('charles.aboutSection.visionMissionTitle')
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                        lineNumber: 1076,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mb-4 text-white",
                                        children: t('charles.aboutSection.paragraph1')
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                        lineNumber: 1077,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mb-4 text-white",
                                        children: t('charles.aboutSection.paragraph2')
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                        lineNumber: 1080,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-white",
                                        children: t('charles.aboutSection.paragraph3')
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                        lineNumber: 1083,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                lineNumber: 1075,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mx-4 md:mx-0",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-8 rounded-lg bg-[#2E2E2E] border border-gray-800",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "mb-6 text-xl font-semibold text-center text-white",
                                            children: t('charles.aboutSection.ministryHighlights')
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/DirectorsPage.tsx",
                                            lineNumber: 1090,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-start",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center justify-center flex-shrink-0 w-10 h-10 mt-1 mr-4 rounded-full",
                                                            style: {
                                                                backgroundColor: accentColor
                                                            },
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$music$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Music$3e$__["Music"], {
                                                                className: "w-5 h-5 text-black"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                lineNumber: 1094,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/DirectorsPage.tsx",
                                                            lineNumber: 1093,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                    className: "font-medium text-white",
                                                                    children: t('charles.aboutSection.worshipLeadershipTitle')
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                    lineNumber: 1097,
                                                                    columnNumber: 21
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-sm text-white",
                                                                    children: t('charles.aboutSection.worshipLeadershipDesc')
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                    lineNumber: 1098,
                                                                    columnNumber: 21
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/DirectorsPage.tsx",
                                                            lineNumber: 1096,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                                    lineNumber: 1092,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-start",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center justify-center flex-shrink-0 w-10 h-10 mt-1 mr-4 rounded-full",
                                                            style: {
                                                                backgroundColor: accentColor
                                                            },
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                                                                className: "w-5 h-5 text-black"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                lineNumber: 1104,
                                                                columnNumber: 19
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/DirectorsPage.tsx",
                                                            lineNumber: 1103,
                                                            columnNumber: 17
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                    className: "font-medium text-white",
                                                                    children: t('charles.aboutSection.youthMinistryTitle')
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                    lineNumber: 1107,
                                                                    columnNumber: 19
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-sm text-white",
                                                                    children: t('charles.aboutSection.youthMinistryDesc')
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                    lineNumber: 1108,
                                                                    columnNumber: 19
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/DirectorsPage.tsx",
                                                            lineNumber: 1106,
                                                            columnNumber: 17
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                                    lineNumber: 1102,
                                                    columnNumber: 15
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-start",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center justify-center flex-shrink-0 w-10 h-10 mt-1 mr-4 rounded-full",
                                                            style: {
                                                                backgroundColor: accentColor
                                                            },
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"], {
                                                                className: "w-5 h-5 text-black"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                lineNumber: 1114,
                                                                columnNumber: 19
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/DirectorsPage.tsx",
                                                            lineNumber: 1113,
                                                            columnNumber: 17
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                    className: "font-medium text-white",
                                                                    children: t('charles.aboutSection.songwritingTitle')
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                    lineNumber: 1117,
                                                                    columnNumber: 19
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-sm text-white",
                                                                    children: t('charles.aboutSection.songwritingDesc')
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                    lineNumber: 1118,
                                                                    columnNumber: 19
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/DirectorsPage.tsx",
                                                            lineNumber: 1116,
                                                            columnNumber: 17
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                                    lineNumber: 1112,
                                                    columnNumber: 15
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-start",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center justify-center flex-shrink-0 w-10 h-10 mt-1 mr-4 rounded-full",
                                                            style: {
                                                                backgroundColor: accentColor
                                                            },
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$award$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Award$3e$__["Award"], {
                                                                className: "w-5 h-5 text-black"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                lineNumber: 1124,
                                                                columnNumber: 19
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/DirectorsPage.tsx",
                                                            lineNumber: 1123,
                                                            columnNumber: 17
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                    className: "font-medium text-white",
                                                                    children: t('charles.aboutSection.educationTitle')
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                    lineNumber: 1127,
                                                                    columnNumber: 19
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-sm text-white",
                                                                    children: t('charles.aboutSection.educationDesc')
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                    lineNumber: 1128,
                                                                    columnNumber: 19
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/DirectorsPage.tsx",
                                                            lineNumber: 1126,
                                                            columnNumber: 17
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                                    lineNumber: 1122,
                                                    columnNumber: 15
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/DirectorsPage.tsx",
                                            lineNumber: 1091,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                    lineNumber: 1089,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                lineNumber: 1088,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/DirectorsPage.tsx",
                        lineNumber: 1074,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/DirectorsPage.tsx",
                lineNumber: 1065,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-center py-12 md:py-16",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                    src: separatorImage,
                    alt: "",
                    className: "w-full max-w-4xl h-auto opacity-60"
                }, void 0, false, {
                    fileName: "[project]/src/components/DirectorsPage.tsx",
                    lineNumber: 1139,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/DirectorsPage.tsx",
                lineNumber: 1138,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ContactSection, {
                accentColor: accentColor,
                contactId: "contact-charles"
            }, void 0, false, {
                fileName: "[project]/src/components/DirectorsPage.tsx",
                lineNumber: 1143,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/DirectorsPage.tsx",
        lineNumber: 971,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
});
_c4 = CharlesTab;
CharlesTab.displayName = 'CharlesTab';
// Memoized Nancy Tab Component
const NancyTab = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"])(({ accentColor, imagePreloaded, t })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "mb-5 md:mb-16",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col items-center md:items-start md:flex-row md:gap-12",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "order-2 md:order-1 mb-8 text-center md:mb-0 md:text-left md:w-[45%] md:pl-8 flex flex-col md:justify-between w-full md:w-[45%]",
                            style: {
                                minHeight: '405px'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                            className: "mb-3 text-2xl md:text-5xl text-white text-center md:text-left md:whitespace-nowrap font-bold md:font-normal",
                                            children: t('nancy.name')
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/DirectorsPage.tsx",
                                            lineNumber: 1159,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-center md:text-left space-y-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-white text-xl",
                                                    children: t('nancy.role')
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                                    lineNumber: 1165,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-white",
                                                    children: t('nancy.organization')
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                                    lineNumber: 1166,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/DirectorsPage.tsx",
                                            lineNumber: 1164,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-2 mt-8 md:mt-4 md:mb-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-wrap justify-center md:justify-start gap-2",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#2E2E2E] border border-gray-600/40",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"], {
                                                                className: "w-5 h-5 text-gray-400 flex-shrink-0"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                lineNumber: 1174,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-gray-300 font-bold text-sm md:text-base",
                                                                children: t('nancy.titles.childrensMinistry')
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                lineNumber: 1175,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                                        lineNumber: 1173,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                                    lineNumber: 1172,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-wrap justify-center md:justify-start gap-2",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#2E2E2E] border border-gray-600/40",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$music$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Music$3e$__["Music"], {
                                                                className: "w-4 h-4 text-gray-400 flex-shrink-0"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                lineNumber: 1182,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-gray-300 font-bold text-xs md:text-sm",
                                                                children: t('nancy.titles.musicEducation')
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                lineNumber: 1183,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                                        lineNumber: 1181,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                                    lineNumber: 1180,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-wrap justify-center md:justify-start gap-2",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#2E2E2E] border border-gray-600/40",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"], {
                                                                className: "w-4 h-4 text-gray-400 flex-shrink-0"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                lineNumber: 1190,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-gray-300 font-bold text-xs md:text-sm",
                                                                children: t('nancy.titles.curriculumDevelopment')
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                lineNumber: 1191,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                                        lineNumber: 1189,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                                    lineNumber: 1188,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-wrap justify-center md:justify-start gap-2",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#2E2E2E] border border-gray-600/40",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$award$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Award$3e$__["Award"], {
                                                                className: "w-4 h-4 text-gray-400 flex-shrink-0"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                lineNumber: 1198,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-gray-300 font-bold text-xs md:text-sm",
                                                                children: t('nancy.titles.creativeArts')
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                lineNumber: 1199,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                                        lineNumber: 1197,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                                    lineNumber: 1196,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/DirectorsPage.tsx",
                                            lineNumber: 1170,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                    lineNumber: 1158,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-wrap justify-center gap-4 md:justify-start mt-6 md:mt-auto",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            const element = document.getElementById('contact-nancy');
                                            if (element) {
                                                const headerOffset = 150;
                                                const elementPosition = element.getBoundingClientRect().top;
                                                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                                                window.scrollTo({
                                                    top: offsetPosition,
                                                    behavior: 'smooth'
                                                });
                                            }
                                        },
                                        className: "px-6 py-3 rounded-md shadow-md hover:shadow-lg text-black font-bold transition-all duration-300 cursor-pointer",
                                        style: {
                                            backgroundColor: accentColor
                                        },
                                        onMouseEnter: (e)=>e.currentTarget.style.backgroundColor = '#DAA520',
                                        onMouseLeave: (e)=>e.currentTarget.style.backgroundColor = accentColor,
                                        children: t('nancy.buttons.getInTouch')
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                        lineNumber: 1206,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                    lineNumber: 1205,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/DirectorsPage.tsx",
                            lineNumber: 1157,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "order-1 md:order-2 mb-8 md:mb-0 md:w-[35%] md:ml-auto md:mr-16 px-4 md:px-0",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative rounded-xl shadow-lg max-h-[438px] overflow-hidden",
                                children: [
                                    !imagePreloaded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Skeleton"], {
                                        className: "w-full h-full absolute inset-0"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                        lineNumber: 1232,
                                        columnNumber: 35
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(OptimizedImage, {
                                        src: IMAGE_URLS.nancy,
                                        alt: "Nancy Ophir Augustina",
                                        className: "object-cover w-full h-auto rounded-xl"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                        lineNumber: 1233,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                lineNumber: 1231,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/components/DirectorsPage.tsx",
                            lineNumber: 1230,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/DirectorsPage.tsx",
                    lineNumber: 1156,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/DirectorsPage.tsx",
                lineNumber: 1155,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "py-3 md:py-1 mb-5 md:mb-16 border-t border-gray-800"
            }, void 0, false, {
                fileName: "[project]/src/components/DirectorsPage.tsx",
                lineNumber: 1244,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                id: "about-nancy",
                className: "pt-2 pb-4 mb-16",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-w-3xl mx-auto mb-12 text-center px-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "mb-4 text-3xl md:text-4xl text-white",
                                children: t('nancy.aboutSection.title')
                            }, void 0, false, {
                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                lineNumber: 1249,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-20 h-1 mx-auto mb-6",
                                style: {
                                    backgroundColor: accentColor
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                lineNumber: 1250,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-lg text-white",
                                children: t('nancy.aboutSection.subtitle')
                            }, void 0, false, {
                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                lineNumber: 1251,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/DirectorsPage.tsx",
                        lineNumber: 1248,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid gap-8 md:grid-cols-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "px-4 md:px-0",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "mb-4 text-xl font-semibold text-white",
                                        children: t('nancy.aboutSection.visionMissionTitle')
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                        lineNumber: 1258,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mb-4 text-white",
                                        children: t('nancy.aboutSection.paragraph1')
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                        lineNumber: 1259,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mb-4 text-white",
                                        children: t('nancy.aboutSection.paragraph2')
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                        lineNumber: 1262,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-white",
                                        children: t('nancy.aboutSection.paragraph3')
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                        lineNumber: 1265,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                lineNumber: 1257,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mx-4 md:mx-0",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-8 rounded-lg bg-[#2E2E2E] border border-gray-800",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "mb-6 text-xl font-semibold text-center text-white",
                                            children: t('nancy.aboutSection.ministryHighlights')
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/DirectorsPage.tsx",
                                            lineNumber: 1272,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-start",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center justify-center flex-shrink-0 w-10 h-10 mt-1 mr-4 rounded-full",
                                                            style: {
                                                                backgroundColor: accentColor
                                                            },
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"], {
                                                                className: "w-5 h-5 text-black"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                lineNumber: 1276,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/DirectorsPage.tsx",
                                                            lineNumber: 1275,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                    className: "font-medium text-white",
                                                                    children: t('nancy.aboutSection.childrensMinistryTitle')
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                    lineNumber: 1279,
                                                                    columnNumber: 21
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-sm text-white",
                                                                    children: t('nancy.aboutSection.childrensMinistryDesc')
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                    lineNumber: 1280,
                                                                    columnNumber: 21
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/DirectorsPage.tsx",
                                                            lineNumber: 1278,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                                    lineNumber: 1274,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-start",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center justify-center flex-shrink-0 w-10 h-10 mt-1 mr-4 rounded-full",
                                                            style: {
                                                                backgroundColor: accentColor
                                                            },
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$music$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Music$3e$__["Music"], {
                                                                className: "w-5 h-5 text-black"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                lineNumber: 1286,
                                                                columnNumber: 19
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/DirectorsPage.tsx",
                                                            lineNumber: 1285,
                                                            columnNumber: 17
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                    className: "font-medium text-white",
                                                                    children: t('nancy.aboutSection.musicEducationTitle')
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                    lineNumber: 1289,
                                                                    columnNumber: 19
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-sm text-white",
                                                                    children: t('nancy.aboutSection.musicEducationDesc')
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                    lineNumber: 1290,
                                                                    columnNumber: 19
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/DirectorsPage.tsx",
                                                            lineNumber: 1288,
                                                            columnNumber: 17
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                                    lineNumber: 1284,
                                                    columnNumber: 15
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-start",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center justify-center flex-shrink-0 w-10 h-10 mt-1 mr-4 rounded-full",
                                                            style: {
                                                                backgroundColor: accentColor
                                                            },
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"], {
                                                                className: "w-5 h-5 text-black"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                lineNumber: 1296,
                                                                columnNumber: 19
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/DirectorsPage.tsx",
                                                            lineNumber: 1295,
                                                            columnNumber: 17
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                    className: "font-medium text-white",
                                                                    children: t('nancy.aboutSection.curriculumTitle')
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                    lineNumber: 1299,
                                                                    columnNumber: 19
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-sm text-white",
                                                                    children: t('nancy.aboutSection.curriculumDesc')
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                    lineNumber: 1300,
                                                                    columnNumber: 19
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/DirectorsPage.tsx",
                                                            lineNumber: 1298,
                                                            columnNumber: 17
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                                    lineNumber: 1294,
                                                    columnNumber: 15
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-start",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center justify-center flex-shrink-0 w-10 h-10 mt-1 mr-4 rounded-full",
                                                            style: {
                                                                backgroundColor: accentColor
                                                            },
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$award$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Award$3e$__["Award"], {
                                                                className: "w-5 h-5 text-black"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                lineNumber: 1306,
                                                                columnNumber: 19
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/DirectorsPage.tsx",
                                                            lineNumber: 1305,
                                                            columnNumber: 17
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                    className: "font-medium text-white",
                                                                    children: t('nancy.aboutSection.creativeArtsTitle')
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                    lineNumber: 1309,
                                                                    columnNumber: 19
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-sm text-white",
                                                                    children: t('nancy.aboutSection.creativeArtsDesc')
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                                                    lineNumber: 1310,
                                                                    columnNumber: 19
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/DirectorsPage.tsx",
                                                            lineNumber: 1308,
                                                            columnNumber: 17
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                                    lineNumber: 1304,
                                                    columnNumber: 15
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/DirectorsPage.tsx",
                                            lineNumber: 1273,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                    lineNumber: 1271,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                lineNumber: 1270,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/DirectorsPage.tsx",
                        lineNumber: 1256,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/DirectorsPage.tsx",
                lineNumber: 1247,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                id: "contact-nancy",
                className: "pt-2 pb-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-w-3xl mx-auto mb-12 text-center px-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "mb-4 text-3xl md:text-4xl text-white",
                                children: t('nancy.contactSection.title')
                            }, void 0, false, {
                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                lineNumber: 1322,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-20 h-1 mx-auto mb-6",
                                style: {
                                    backgroundColor: accentColor
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                lineNumber: 1323,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-lg text-white",
                                children: t('nancy.contactSection.subtitle')
                            }, void 0, false, {
                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                lineNumber: 1324,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/DirectorsPage.tsx",
                        lineNumber: 1321,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-w-2xl mx-auto px-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-8 rounded-lg bg-[#2E2E2E] border border-gray-800",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-start",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-center flex-shrink-0 w-10 h-10 mt-1 mr-4 rounded-full",
                                                style: {
                                                    backgroundColor: accentColor
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                    xmlns: "http://www.w3.org/2000/svg",
                                                    className: "w-5 h-5 text-black",
                                                    viewBox: "0 0 24 24",
                                                    fill: "none",
                                                    stroke: "currentColor",
                                                    strokeWidth: "2",
                                                    strokeLinecap: "round",
                                                    strokeLinejoin: "round",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                                            x: "2",
                                                            y: "4",
                                                            width: "20",
                                                            height: "16",
                                                            rx: "2"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/DirectorsPage.tsx",
                                                            lineNumber: 1335,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                            d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/DirectorsPage.tsx",
                                                            lineNumber: 1336,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                                    lineNumber: 1334,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                                lineNumber: 1333,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                        className: "font-medium text-white mb-1",
                                                        children: t('nancy.contactSection.email')
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                                        lineNumber: 1340,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                        href: "mailto:nancy@ybhministries.org",
                                                        className: "text-white hover:underline",
                                                        children: "nancy@ybhministries.org"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                                        lineNumber: 1341,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                                lineNumber: 1339,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                        lineNumber: 1332,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-start",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-center flex-shrink-0 w-10 h-10 mt-1 mr-4 rounded-full",
                                                style: {
                                                    backgroundColor: accentColor
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                    xmlns: "http://www.w3.org/2000/svg",
                                                    className: "w-5 h-5 text-black",
                                                    viewBox: "0 0 24 24",
                                                    fill: "none",
                                                    stroke: "currentColor",
                                                    strokeWidth: "2",
                                                    strokeLinecap: "round",
                                                    strokeLinejoin: "round",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                                        lineNumber: 1350,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                                    lineNumber: 1349,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                                lineNumber: 1348,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                        className: "font-medium text-white mb-1",
                                                        children: t('nancy.contactSection.phone')
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                                        lineNumber: 1354,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                        href: "tel:+919876543213",
                                                        className: "text-white hover:underline",
                                                        children: "+91 98765 43213"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                                        lineNumber: 1355,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                                lineNumber: 1353,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                        lineNumber: 1347,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                lineNumber: 1331,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/components/DirectorsPage.tsx",
                            lineNumber: 1330,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/components/DirectorsPage.tsx",
                        lineNumber: 1329,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/DirectorsPage.tsx",
                lineNumber: 1320,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/DirectorsPage.tsx",
        lineNumber: 1153,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
});
_c5 = NancyTab;
NancyTab.displayName = 'NancyTab';
// Memoized Contact Section Component
const ContactSection = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"])(_s1(({ accentColor, contactId })=>{
    _s1();
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"])('directors');
    const contactFormRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [formStatus, setFormStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        submitted: false,
        message: ""
    });
    const handleSubmit = (e)=>{
        e.preventDefault();
        setFormStatus({
            submitted: true,
            message: t('contactForm.success')
        });
        if (contactFormRef.current) {
            contactFormRef.current.reset();
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        id: contactId,
        className: "pt-6 pb-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-3xl mx-auto mb-12 text-center px-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "mb-4 text-3xl md:text-4xl text-white",
                        children: t('contactForm.title')
                    }, void 0, false, {
                        fileName: "[project]/src/components/DirectorsPage.tsx",
                        lineNumber: 1390,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-20 h-1 mx-auto mb-6",
                        style: {
                            backgroundColor: accentColor
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/DirectorsPage.tsx",
                        lineNumber: 1391,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-lg text-white",
                        children: t('contactForm.subtitle')
                    }, void 0, false, {
                        fileName: "[project]/src/components/DirectorsPage.tsx",
                        lineNumber: 1392,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/DirectorsPage.tsx",
                lineNumber: 1389,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-2xl mx-auto px-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    ref: contactFormRef,
                    onSubmit: handleSubmit,
                    className: "p-8 rounded-lg bg-[#2E2E2E] border border-gray-800",
                    children: formStatus.submitted ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "py-8 text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full",
                                style: {
                                    backgroundColor: accentColor
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    xmlns: "http://www.w3.org/2000/svg",
                                    className: "w-8 h-8 text-black",
                                    viewBox: "0 0 24 24",
                                    fill: "none",
                                    stroke: "currentColor",
                                    strokeWidth: "2",
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("polyline", {
                                        points: "20 6 9 17 4 12"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                        lineNumber: 1403,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/DirectorsPage.tsx",
                                    lineNumber: 1402,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                lineNumber: 1401,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mb-4 text-xl font-semibold text-white",
                                children: formStatus.message
                            }, void 0, false, {
                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                lineNumber: 1406,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>setFormStatus({
                                        submitted: false,
                                        message: ""
                                    }),
                                className: "px-6 py-2 rounded-md text-black font-bold transition-all duration-300",
                                style: {
                                    backgroundColor: accentColor
                                },
                                children: t('contactForm.sendAnother')
                            }, void 0, false, {
                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                lineNumber: 1407,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/DirectorsPage.tsx",
                        lineNumber: 1400,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "name",
                                        className: "block mb-2 font-medium text-white",
                                        children: t('contactForm.name')
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                        lineNumber: 1419,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        id: "name",
                                        name: "name",
                                        required: true,
                                        className: "w-full px-4 py-3 bg-black border border-gray-700 rounded-md text-white focus:outline-none focus:border-[#FDB813] transition-colors",
                                        placeholder: t('contactForm.namePlaceholder')
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                        lineNumber: 1422,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                lineNumber: 1418,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "email",
                                        className: "block mb-2 font-medium text-white",
                                        children: t('contactForm.email')
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                        lineNumber: 1433,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "email",
                                        id: "email",
                                        name: "email",
                                        required: true,
                                        className: "w-full px-4 py-3 bg-black border border-gray-700 rounded-md text-white focus:outline-none focus:border-[#FDB813] transition-colors",
                                        placeholder: t('contactForm.emailPlaceholder')
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                        lineNumber: 1436,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                lineNumber: 1432,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "message",
                                        className: "block mb-2 font-medium text-white",
                                        children: t('contactForm.message')
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                        lineNumber: 1447,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                        id: "message",
                                        name: "message",
                                        required: true,
                                        rows: 5,
                                        className: "w-full px-4 py-3 bg-black border border-gray-700 rounded-md text-white focus:outline-none focus:border-[#FDB813] transition-colors resize-none",
                                        placeholder: t('contactForm.messagePlaceholder')
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/DirectorsPage.tsx",
                                        lineNumber: 1450,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                lineNumber: 1446,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "submit",
                                className: "w-full px-6 py-3 rounded-md shadow-md hover:shadow-lg text-black font-bold transition-all duration-300 text-center",
                                style: {
                                    backgroundColor: accentColor
                                },
                                onMouseEnter: (e)=>e.currentTarget.style.backgroundColor = '#DAA520',
                                onMouseLeave: (e)=>e.currentTarget.style.backgroundColor = accentColor,
                                children: t('contactForm.send')
                            }, void 0, false, {
                                fileName: "[project]/src/components/DirectorsPage.tsx",
                                lineNumber: 1460,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/DirectorsPage.tsx",
                        lineNumber: 1417,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/components/DirectorsPage.tsx",
                    lineNumber: 1398,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/DirectorsPage.tsx",
                lineNumber: 1397,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/DirectorsPage.tsx",
        lineNumber: 1388,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
}, "QS1k1F/g4C5rUs45gJRY+3K/xP8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"]
    ];
}));
_c6 = ContactSection;
ContactSection.displayName = 'ContactSection';
var _c, _c1, _c2, _c3, _c4, _c5, _c6;
__turbopack_context__.k.register(_c, "OptimizedImage");
__turbopack_context__.k.register(_c1, "DirectorsPage");
__turbopack_context__.k.register(_c2, "AugustineTab");
__turbopack_context__.k.register(_c3, "VijayaTab");
__turbopack_context__.k.register(_c4, "CharlesTab");
__turbopack_context__.k.register(_c5, "NancyTab");
__turbopack_context__.k.register(_c6, "ContactSection");
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
        "about": {
            "title": "About YBH Ministries",
            "description": "A community of believers dedicated to worshiping God, growing in faith, and serving our community with love and compassion."
        },
        "quickLinks": {
            "title": "Quick Links",
            "about": "About",
            "ministries": "Ministries",
            "gallery": "Gallery",
            "news": "News",
            "resources": "Resources"
        },
        "contact": {
            "title": "Contact Us",
            "address": "123 Faith Street, Hopeville, ST 12345",
            "phone": "(123) 456-7890",
            "email": "info@ybhministries.org"
        },
        "student": {
            "title": "HMS Student Form",
            "description": "Apply for Hallel Music School",
            "button": "Apply Now"
        },
        "language": {
            "title": "Language"
        },
        "copyright": "All rights reserved.",
        "siteTitle": "Yeshua Beth Hallel Ministries",
        "newsletter": "Newsletter",
        "newsletterText": "Stay updated with our latest news and events",
        "emailPlaceholder": "Enter your email",
        "subscribe": "Subscribe",
        "legal": "Legal",
        "privacyPolicy": "Privacy Policy",
        "termsOfService": "Terms of Service",
        "accessibility": "Accessibility",
        "connect": "Connect With Us",
        "followUs": "Follow Us",
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
        about: {
            title: "YBH మినిస్ట్రీస్ గురించి",
            description: "దేవుణ్ణి ఆరాధించడానికి, విశ్వాసంలో ఎదగడానికి మరియు ప్రేమ మరియు కరుణతో మా సమాజానికి సేవ చేయడానికి అంకితమైన విశ్వాసుల సమాజం."
        },
        quickLinks: {
            title: "త్వరిత లింక్‌లు",
            about: "మా గురించి",
            ministries: "సేవలు",
            gallery: "గ్యాలరీ",
            news: "వార్తలు",
            resources: "వనరులు"
        },
        contact: {
            title: "సంప్రదించండి",
            address: "123 Faith Street, Hopeville, ST 12345",
            phone: "(123) 456-7890",
            email: "info@ybhministries.org"
        },
        student: {
            title: "HMS విద్యార్థి ఫారం",
            description: "హల్లేల్ మ్యూజిక్ స్కూల్ కోసం దరఖాస్తు చేయండి",
            button: "ఇప్పుడు దరఖాస్తు చేయండి"
        },
        language: {
            title: "భాష"
        },
        copyright: "అన్ని హక్కులు రక్షించబడ్డాయి.",
        siteTitle: "యేషూవా బెత్ హల్లేల్ మినిస్ట్రీస్",
        newsletter: "వార్తాలేఖ",
        newsletterText: "మా తాజా వార్తలు మరియు కార్యక్రమాలతో నవీకరించబడండి",
        emailPlaceholder: "మీ ఇమెయిల్ నమోదు చేయండి",
        subscribe: "చందా చేరండి",
        legal: "చట్టపరమైన",
        privacyPolicy: "గోప్యతా విధానం",
        termsOfService: "సేవా నిబంధనలు",
        accessibility: "ప్రాప్యత",
        connect: "మాతో కనెక్ట్ అవ్వండి",
        followUs: "మమ్మల్ని అనుసరించండి",
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
"[project]/src/components/FooterNext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FooterNext",
    ()=>FooterNext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/react-i18next/dist/es/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-i18next/dist/es/useTranslation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-client] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/phone.js [app-client] (ecmascript) <export default as Phone>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/mail.js [app-client] (ecmascript) <export default as Mail>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$facebook$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Facebook$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/facebook.js [app-client] (ecmascript) <export default as Facebook>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$instagram$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Instagram$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/instagram.js [app-client] (ecmascript) <export default as Instagram>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$youtube$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Youtube$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/youtube.js [app-client] (ecmascript) <export default as Youtube>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$twitter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Twitter$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/twitter.js [app-client] (ecmascript) <export default as Twitter>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$languages$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Languages$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/languages.js [app-client] (ecmascript) <export default as Languages>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
const ybhLogo = 'https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/logo/YBH.jpg';
const guinnessWorldRecords = 'https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/awards/guiness.png';
const asianBookOfRecords = 'https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/awards/Asian%20book%20of%20records.png';
const ingeniousWorldRecords = 'https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/awards/ingenious.png';
const internationalStarBookOfRecords = 'https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/awards/Star%20book%20of%20records%20-%20final.png';
function FooterNext() {
    _s();
    const { t, i18n } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"])('common');
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const handleLanguageChange = (lang)=>{
        i18n.changeLanguage(lang);
    };
    const handleAdminClick = ()=>{
        router.push('/admin');
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
        className: "bg-black text-gray-300",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full h-0.5",
                style: {
                    backgroundColor: '#333333'
                }
            }, void 0, false, {
                fileName: "[project]/src/components/FooterNext.tsx",
                lineNumber: 29,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "container mx-auto px-4 pt-8 pb-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-3 mb-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                src: ybhLogo,
                                                alt: "YBH Logo",
                                                className: "h-12 w-12 object-contain"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/FooterNext.tsx",
                                                lineNumber: 37,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-white",
                                                children: t('footer.siteTitle')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/FooterNext.tsx",
                                                lineNumber: 42,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/FooterNext.tsx",
                                        lineNumber: 36,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-gray-400 mb-4",
                                        children: t('footer.about.description')
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/FooterNext.tsx",
                                        lineNumber: 44,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-2 text-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-start gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                                        size: 16,
                                                        className: "mt-1 flex-shrink-0 text-gray-400"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/FooterNext.tsx",
                                                        lineNumber: 49,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: t('footer.contact.address')
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/FooterNext.tsx",
                                                        lineNumber: 50,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/FooterNext.tsx",
                                                lineNumber: 48,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__["Phone"], {
                                                        size: 16,
                                                        className: "flex-shrink-0 text-gray-400"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/FooterNext.tsx",
                                                        lineNumber: 53,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: t('footer.contact.phone')
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/FooterNext.tsx",
                                                        lineNumber: 54,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/FooterNext.tsx",
                                                lineNumber: 52,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__["Mail"], {
                                                        size: 16,
                                                        className: "flex-shrink-0 text-gray-400"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/FooterNext.tsx",
                                                        lineNumber: 57,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                        href: `mailto:${t('footer.contact.email')}`,
                                                        className: "hover:text-white transition-colors",
                                                        children: t('footer.contact.email')
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/FooterNext.tsx",
                                                        lineNumber: 58,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/FooterNext.tsx",
                                                lineNumber: 56,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/FooterNext.tsx",
                                        lineNumber: 47,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/FooterNext.tsx",
                                lineNumber: 35,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-white mb-4",
                                        children: t('footer.quickLinks.title')
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/FooterNext.tsx",
                                        lineNumber: 67,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        className: "space-y-2 text-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    href: "/about",
                                                    className: "hover:text-white transition-colors",
                                                    children: t('footer.quickLinks.about')
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/FooterNext.tsx",
                                                    lineNumber: 70,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/FooterNext.tsx",
                                                lineNumber: 69,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    href: "/ministries",
                                                    className: "hover:text-white transition-colors",
                                                    children: t('footer.quickLinks.ministries')
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/FooterNext.tsx",
                                                    lineNumber: 75,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/FooterNext.tsx",
                                                lineNumber: 74,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    href: "/news",
                                                    className: "hover:text-white transition-colors",
                                                    children: t('footer.quickLinks.news')
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/FooterNext.tsx",
                                                    lineNumber: 80,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/FooterNext.tsx",
                                                lineNumber: 79,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    href: "/contact",
                                                    className: "hover:text-white transition-colors",
                                                    children: "Contact"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/FooterNext.tsx",
                                                    lineNumber: 85,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/FooterNext.tsx",
                                                lineNumber: 84,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    href: "/donate",
                                                    className: "hover:text-white transition-colors",
                                                    children: "Donate"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/FooterNext.tsx",
                                                    lineNumber: 90,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/FooterNext.tsx",
                                                lineNumber: 89,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/FooterNext.tsx",
                                        lineNumber: 68,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/FooterNext.tsx",
                                lineNumber: 66,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-white mb-4",
                                        children: "Ministries"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/FooterNext.tsx",
                                        lineNumber: 99,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        className: "space-y-2 text-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    href: "/ministries",
                                                    className: "hover:text-white transition-colors",
                                                    children: "Children's Ministry"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/FooterNext.tsx",
                                                    lineNumber: 102,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/FooterNext.tsx",
                                                lineNumber: 101,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    href: "/ministries",
                                                    className: "hover:text-white transition-colors",
                                                    children: "Youth Ministry"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/FooterNext.tsx",
                                                    lineNumber: 107,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/FooterNext.tsx",
                                                lineNumber: 106,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    href: "/ministries",
                                                    className: "hover:text-white transition-colors",
                                                    children: "Women's Fellowship"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/FooterNext.tsx",
                                                    lineNumber: 112,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/FooterNext.tsx",
                                                lineNumber: 111,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    href: "/ministries",
                                                    className: "hover:text-white transition-colors",
                                                    children: "Men's Group"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/FooterNext.tsx",
                                                    lineNumber: 117,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/FooterNext.tsx",
                                                lineNumber: 116,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    href: "/ministries",
                                                    className: "hover:text-white transition-colors",
                                                    children: "Senior Ministry"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/FooterNext.tsx",
                                                    lineNumber: 122,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/FooterNext.tsx",
                                                lineNumber: 121,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    href: "/ministries",
                                                    className: "hover:text-white transition-colors",
                                                    children: "Music Ministry"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/FooterNext.tsx",
                                                    lineNumber: 127,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/FooterNext.tsx",
                                                lineNumber: 126,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/FooterNext.tsx",
                                        lineNumber: 100,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/FooterNext.tsx",
                                lineNumber: 98,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-white mb-4",
                                        children: "Connect With Us"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/FooterNext.tsx",
                                        lineNumber: 136,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-gray-400 mb-4",
                                        children: "Stay updated with our latest news and events"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/FooterNext.tsx",
                                        lineNumber: 137,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-2 mb-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "email",
                                                placeholder: "Enter your email",
                                                className: "flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gray-500"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/FooterNext.tsx",
                                                lineNumber: 141,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__["Mail"], {
                                                    size: 18
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/FooterNext.tsx",
                                                    lineNumber: 147,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/FooterNext.tsx",
                                                lineNumber: 146,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/FooterNext.tsx",
                                        lineNumber: 140,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                        className: "text-white mb-3",
                                        children: "Follow Us"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/FooterNext.tsx",
                                        lineNumber: 152,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: "https://www.facebook.com/profile.php?id=100089579084304",
                                                target: "_blank",
                                                rel: "noopener noreferrer",
                                                className: "w-9 h-9 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors",
                                                "aria-label": "Facebook",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$facebook$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Facebook$3e$__["Facebook"], {
                                                    size: 18
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/FooterNext.tsx",
                                                    lineNumber: 161,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/FooterNext.tsx",
                                                lineNumber: 154,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: "https://www.instagram.com/ybhministries/",
                                                target: "_blank",
                                                rel: "noopener noreferrer",
                                                className: "w-9 h-9 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors",
                                                "aria-label": "Instagram",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$instagram$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Instagram$3e$__["Instagram"], {
                                                    size: 18
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/FooterNext.tsx",
                                                    lineNumber: 170,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/FooterNext.tsx",
                                                lineNumber: 163,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: "https://www.youtube.com/@YBHMinistries",
                                                target: "_blank",
                                                rel: "noopener noreferrer",
                                                className: "w-9 h-9 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors",
                                                "aria-label": "YouTube",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$youtube$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Youtube$3e$__["Youtube"], {
                                                    size: 18
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/FooterNext.tsx",
                                                    lineNumber: 179,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/FooterNext.tsx",
                                                lineNumber: 172,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: "https://twitter.com/ybhministries",
                                                target: "_blank",
                                                rel: "noopener noreferrer",
                                                className: "w-9 h-9 bg-gray-800 hover:bg-purple-600 rounded-lg flex items-center justify-center transition-colors",
                                                "aria-label": "Twitter",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$twitter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Twitter$3e$__["Twitter"], {
                                                    size: 18
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/FooterNext.tsx",
                                                    lineNumber: 188,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/FooterNext.tsx",
                                                lineNumber: 181,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/FooterNext.tsx",
                                        lineNumber: 153,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/FooterNext.tsx",
                                lineNumber: 135,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/FooterNext.tsx",
                        lineNumber: 33,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap justify-center items-center gap-4 md:gap-6 pb-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: guinnessWorldRecords,
                                alt: "Guinness World Records 2024",
                                className: "h-12 md:h-14 object-contain opacity-70 hover:opacity-100 transition-opacity"
                            }, void 0, false, {
                                fileName: "[project]/src/components/FooterNext.tsx",
                                lineNumber: 196,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: asianBookOfRecords,
                                alt: "Asian Book of Records 2024",
                                className: "h-12 md:h-14 object-contain opacity-70 hover:opacity-100 transition-opacity"
                            }, void 0, false, {
                                fileName: "[project]/src/components/FooterNext.tsx",
                                lineNumber: 201,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: ingeniousWorldRecords,
                                alt: "Ingenious Charm World Records 2024",
                                className: "h-12 md:h-14 object-contain opacity-70 hover:opacity-100 transition-opacity"
                            }, void 0, false, {
                                fileName: "[project]/src/components/FooterNext.tsx",
                                lineNumber: 206,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: internationalStarBookOfRecords,
                                alt: "International Star Book of Records 2023",
                                className: "h-12 md:h-14 object-contain opacity-70 hover:opacity-100 transition-opacity"
                            }, void 0, false, {
                                fileName: "[project]/src/components/FooterNext.tsx",
                                lineNumber: 211,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/FooterNext.tsx",
                        lineNumber: 195,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/FooterNext.tsx",
                lineNumber: 32,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border-t border-gray-800",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "container mx-auto px-4 py-4",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col md:flex-row justify-between items-center gap-4 text-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-gray-400",
                                children: [
                                    "© ",
                                    new Date().getFullYear(),
                                    " ",
                                    t('footer.siteTitle'),
                                    ". ",
                                    t('footer.copyright')
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/FooterNext.tsx",
                                lineNumber: 223,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$languages$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Languages$3e$__["Languages"], {
                                        size: 16,
                                        className: "text-gray-400"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/FooterNext.tsx",
                                        lineNumber: 229,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-1 bg-gray-800 rounded-lg p-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>handleLanguageChange('en'),
                                                className: `px-3 py-1 rounded transition-all ${i18n.language === 'en' ? 'bg-[#FDB813] text-black' : 'text-gray-400 hover:text-white'}`,
                                                "aria-label": "Switch to English",
                                                children: "EN"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/FooterNext.tsx",
                                                lineNumber: 231,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>handleLanguageChange('te'),
                                                className: `px-3 py-1 rounded transition-all ${i18n.language === 'te' ? 'bg-[#FDB813] text-black' : 'text-gray-400 hover:text-white'}`,
                                                "aria-label": "Switch to Telugu",
                                                children: "TE"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/FooterNext.tsx",
                                                lineNumber: 242,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/FooterNext.tsx",
                                        lineNumber: 230,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/FooterNext.tsx",
                                lineNumber: 228,
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
                                        lineNumber: 257,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/terms-of-service",
                                        className: "hover:text-white transition-colors",
                                        children: "Terms of Service"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/FooterNext.tsx",
                                        lineNumber: 260,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/accessibility",
                                        className: "hover:text-white transition-colors",
                                        children: "Accessibility"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/FooterNext.tsx",
                                        lineNumber: 263,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleAdminClick,
                                        className: "hover:text-white transition-colors",
                                        children: "Admin"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/FooterNext.tsx",
                                        lineNumber: 266,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/FooterNext.tsx",
                                lineNumber: 256,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/FooterNext.tsx",
                        lineNumber: 222,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/FooterNext.tsx",
                    lineNumber: 221,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/FooterNext.tsx",
                lineNumber: 220,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/FooterNext.tsx",
        lineNumber: 27,
        columnNumber: 5
    }, this);
}
_s(FooterNext, "SNPOoThSCDRVLImc5ZsUAuEeGio=", false, function() {
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
'use client';
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
                lineNumber: 12,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                children: children
            }, void 0, false, {
                fileName: "[project]/app/ClientLayout.tsx",
                lineNumber: 13,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$FooterNext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FooterNext"], {}, void 0, false, {
                fileName: "[project]/app/ClientLayout.tsx",
                lineNumber: 14,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ScrollToTop$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollToTop"], {}, void 0, false, {
                fileName: "[project]/app/ClientLayout.tsx",
                lineNumber: 15,
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
"[project]/app/directors/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Directors
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$DirectorsPage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/DirectorsPage.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$ClientLayout$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/ClientLayout.tsx [app-client] (ecmascript)");
'use client';
;
;
;
function Directors() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$ClientLayout$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ClientLayout"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$DirectorsPage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DirectorsPage"], {}, void 0, false, {
            fileName: "[project]/app/directors/page.tsx",
            lineNumber: 9,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/directors/page.tsx",
        lineNumber: 8,
        columnNumber: 5
    }, this);
}
_c = Directors;
var _c;
__turbopack_context__.k.register(_c, "Directors");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_6324a97a._.js.map