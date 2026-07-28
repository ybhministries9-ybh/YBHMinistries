// MOVED: Next.js only loads middleware from the project ROOT (middleware.ts
// next to app/), never from app/middleware.ts — this file was silently ignored,
// meaning none of its protections were active.
//
// The real middleware now lives at ./middleware.ts in the project root.
// This stub is kept only to avoid confusion in old references; it exports nothing.
export {};
