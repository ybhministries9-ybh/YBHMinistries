import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { logger } from 'npm:hono/logger';
import { createClient } from 'npm:@supabase/supabase-js@2';
import * as kv from './kv_store.tsx';

const app = new Hono();

app.use('*', cors());
app.use('*', logger(console.log));

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

// Helper function to verify auth
async function verifyAuth(request: Request) {
  const accessToken = request.headers.get('Authorization')?.split(' ')[1];
  if (!accessToken) {
    return { authorized: false, userId: null };
  }
  
  const { data: { user }, error } = await supabase.auth.getUser(accessToken);
  if (error || !user?.id) {
    return { authorized: false, userId: null };
  }
  
  return { authorized: true, userId: user.id };
}

// Helper to convert snake_case to camelCase
function toCamelCase(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(toCamelCase);
  }
  if (obj !== null && typeof obj === 'object') {
    return Object.keys(obj).reduce((acc, key) => {
      const camelKey = key.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
      acc[camelKey] = toCamelCase(obj[key]);
      return acc;
    }, {} as any);
  }
  return obj;
}

// Helper to convert camelCase to snake_case
function toSnakeCase(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(toSnakeCase);
  }
  if (obj !== null && typeof obj === 'object') {
    return Object.keys(obj).reduce((acc, key) => {
      const snakeKey = key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
      acc[snakeKey] = toSnakeCase(obj[key]);
      return acc;
    }, {} as any);
  }
  return obj;
}

// =====================================================
// INITIALIZE STORAGE BUCKETS
// =====================================================
async function initializeBuckets() {
  const bucketsToCreate = [
    'make-d8da5020-hero-images',
    'make-d8da5020-gallery',
    'make-d8da5020-awards',
    'make-d8da5020-ministries',
    'make-d8da5020-testimonies',
    'make-d8da5020-founder',
    'make-d8da5020-products',
    'make-d8da5020-events',
    'make-d8da5020-resources',
    'make-d8da5020-videos',
    'make-d8da5020-hallel-school'
  ];

  try {
    const { data: existingBuckets } = await supabase.storage.listBuckets();
    const existingBucketNames = existingBuckets?.map(b => b.name) || [];

    for (const bucketName of bucketsToCreate) {
      if (!existingBucketNames.includes(bucketName)) {
        const { error } = await supabase.storage.createBucket(bucketName, {
          public: true,
          fileSizeLimit: 10485760 // 10MB
        });
        
        // 409 means bucket already exists, which is fine
        if (error && error.statusCode !== '409') {
          console.error(`Error creating bucket ${bucketName}:`, error.message);
        } else if (!error) {
          console.log(`✓ Created bucket: ${bucketName}`);
        }
      } else {
        console.log(`✓ Bucket exists: ${bucketName}`);
      }
    }
    console.log('✓ Storage buckets initialized successfully');
  } catch (error) {
    console.error('Error initializing buckets:', error);
  }
}

// Initialize buckets on server startup
initializeBuckets();

// =====================================================
// MINISTRIES ROUTES
// =====================================================
app.get('/make-server-d8da5020/ministries', async (c) => {
  try {
    const { data, error } = await supabase
      .from('ministries')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    return c.json({ success: true, ministries: toCamelCase(data || []) });
  } catch (error) {
    console.log(`Get ministries error: ${error}`);
    return c.json({ success: true, ministries: [] });
  }
});

app.post('/make-server-d8da5020/ministries', async (c) => {
  const { authorized } = await verifyAuth(c.req.raw);
  if (!authorized) {
    return c.json({ error: 'Unauthorized' }, 401);
  }
  
  try {
    const ministry = await c.req.json();
    const { data, error } = await supabase
      .from('ministries')
      .insert([toSnakeCase(ministry)])
      .select()
      .single();
    
    if (error) throw error;
    
    return c.json({ success: true, ministry: toCamelCase(data) });
  } catch (error) {
    console.log(`Create ministry error: ${error}`);
    return c.json({ error: 'Failed to create ministry' }, 500);
  }
});

app.put('/make-server-d8da5020/ministries/:id', async (c) => {
  const { authorized } = await verifyAuth(c.req.raw);
  if (!authorized) {
    return c.json({ error: 'Unauthorized' }, 401);
  }
  
  try {
    const id = c.req.param('id');
    const updates = await c.req.json();
    const { data, error } = await supabase
      .from('ministries')
      .update(toSnakeCase(updates))
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return c.json({ success: true, ministry: toCamelCase(data) });
  } catch (error) {
    console.log(`Update ministry error: ${error}`);
    return c.json({ error: 'Failed to update ministry' }, 500);
  }
});

app.delete('/make-server-d8da5020/ministries/:id', async (c) => {
  const { authorized } = await verifyAuth(c.req.raw);
  if (!authorized) {
    return c.json({ error: 'Unauthorized' }, 401);
  }
  
  try {
    const id = c.req.param('id');
    const { error } = await supabase
      .from('ministries')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    return c.json({ success: true });
  } catch (error) {
    console.log(`Delete ministry error: ${error}`);
    return c.json({ error: 'Failed to delete ministry' }, 500);
  }
});

// =====================================================
// MENU ROUTES (Categories and Items)
// =====================================================

// Default fallback data
const DEFAULT_MENU_CATEGORIES = [
  { id: 'cat-1', title: 'MUSIC MINISTRIES', order: 0, menuType: 'ministries' },
  { id: 'cat-2', title: 'OUTREACH PROGRAMS', order: 1, menuType: 'ministries' },
  { id: 'cat-3', title: 'WORLD RECORDS 2024', order: 0, menuType: 'awards' },
  { id: 'cat-4', title: 'PREVIOUS ACHIEVEMENTS', order: 1, menuType: 'awards' },
];

const DEFAULT_MENU_ITEMS = [
  { id: 'item-1', label: 'Hallel Music School', url: '/hallel-music-school', categoryId: 'cat-1', order: 0 },
  { id: 'item-2', label: 'Ministry 2', url: '/ministry/ministry-2', categoryId: 'cat-1', order: 1 },
  { id: 'item-3', label: 'Ministry 3', url: '/ministry/ministry-3', categoryId: 'cat-2', order: 0 },
  { id: 'item-4', label: 'Ministry 4', url: '/ministry/ministry-4', categoryId: 'cat-2', order: 1 },
  { id: 'item-5', label: 'Guinness World Record - 2024', url: '/awards/guinness-world-record', categoryId: 'cat-3', order: 0 },
  { id: 'item-6', label: 'Ingenious Charm World Record - 2024', url: '/awards/ingenious-charm-world-record', categoryId: 'cat-3', order: 1 },
  { id: 'item-7', label: 'Asia Book of Records - 2024', url: '/awards/asia-book-of-records', categoryId: 'cat-3', order: 2 },
  { id: 'item-8', label: 'International Star Book - 2023', url: '/awards/international-star-book', categoryId: 'cat-4', order: 0 },
];

// Menu Categories
app.get('/make-server-d8da5020/menu-categories', async (c) => {
  try {
    const categories = await kv.get('menu_categories');
    return c.json({ 
      success: true, 
      categories: categories ? JSON.parse(categories) : DEFAULT_MENU_CATEGORIES 
    });
  } catch (error) {
    console.log(`Get menu categories error: ${error}`);
    return c.json({ success: true, categories: DEFAULT_MENU_CATEGORIES });
  }
});

app.post('/make-server-d8da5020/menu-categories', async (c) => {
  const { authorized } = await verifyAuth(c.req.raw);
  if (!authorized) {
    return c.json({ error: 'Unauthorized' }, 401);
  }
  
  try {
    const newCategory = await c.req.json();
    const id = `cat-${Date.now()}`;
    const category = { ...newCategory, id };
    
    // Get existing categories
    const existing = await kv.get('menu_categories');
    const categories = existing ? JSON.parse(existing) : DEFAULT_MENU_CATEGORIES;
    
    // Add new category
    categories.push(category);
    await kv.set('menu_categories', JSON.stringify(categories));
    
    return c.json({ success: true, category });
  } catch (error) {
    console.log(`Create menu category error: ${error}`);
    return c.json({ error: 'Failed to create menu category' }, 500);
  }
});

app.put('/make-server-d8da5020/menu-categories/:id', async (c) => {
  const { authorized } = await verifyAuth(c.req.raw);
  if (!authorized) {
    return c.json({ error: 'Unauthorized' }, 401);
  }
  
  try {
    const id = c.req.param('id');
    const updates = await c.req.json();
    
    // Get existing categories
    const existing = await kv.get('menu_categories');
    const categories = existing ? JSON.parse(existing) : DEFAULT_MENU_CATEGORIES;
    
    // Update category
    const index = categories.findIndex((cat: any) => cat.id === id);
    if (index === -1) {
      return c.json({ error: 'Category not found' }, 404);
    }
    
    categories[index] = { ...categories[index], ...updates };
    await kv.set('menu_categories', JSON.stringify(categories));
    
    return c.json({ success: true, category: categories[index] });
  } catch (error) {
    console.log(`Update menu category error: ${error}`);
    return c.json({ error: 'Failed to update menu category' }, 500);
  }
});

app.delete('/make-server-d8da5020/menu-categories/:id', async (c) => {
  const { authorized } = await verifyAuth(c.req.raw);
  if (!authorized) {
    return c.json({ error: 'Unauthorized' }, 401);
  }
  
  try {
    const id = c.req.param('id');
    
    // Get existing categories
    const existing = await kv.get('menu_categories');
    const categories = existing ? JSON.parse(existing) : DEFAULT_MENU_CATEGORIES;
    
    // Remove category
    const filtered = categories.filter((cat: any) => cat.id !== id);
    await kv.set('menu_categories', JSON.stringify(filtered));
    
    // Also remove all menu items in this category
    const itemsData = await kv.get('menu_items');
    const items = itemsData ? JSON.parse(itemsData) : DEFAULT_MENU_ITEMS;
    const filteredItems = items.filter((item: any) => item.categoryId !== id);
    await kv.set('menu_items', JSON.stringify(filteredItems));
    
    return c.json({ success: true });
  } catch (error) {
    console.log(`Delete menu category error: ${error}`);
    return c.json({ error: 'Failed to delete menu category' }, 500);
  }
});

// Menu Items
app.get('/make-server-d8da5020/menu-items', async (c) => {
  try {
    const items = await kv.get('menu_items');
    return c.json({ 
      success: true, 
      items: items ? JSON.parse(items) : DEFAULT_MENU_ITEMS 
    });
  } catch (error) {
    console.log(`Get menu items error: ${error}`);
    return c.json({ success: true, items: DEFAULT_MENU_ITEMS });
  }
});

app.post('/make-server-d8da5020/menu-items', async (c) => {
  const { authorized } = await verifyAuth(c.req.raw);
  if (!authorized) {
    return c.json({ error: 'Unauthorized' }, 401);
  }
  
  try {
    const newItem = await c.req.json();
    const id = `item-${Date.now()}`;
    const item = { ...newItem, id };
    
    // Get existing items
    const existing = await kv.get('menu_items');
    const items = existing ? JSON.parse(existing) : DEFAULT_MENU_ITEMS;
    
    // Add new item
    items.push(item);
    await kv.set('menu_items', JSON.stringify(items));
    
    return c.json({ success: true, item });
  } catch (error) {
    console.log(`Create menu item error: ${error}`);
    return c.json({ error: 'Failed to create menu item' }, 500);
  }
});

app.put('/make-server-d8da5020/menu-items/:id', async (c) => {
  const { authorized } = await verifyAuth(c.req.raw);
  if (!authorized) {
    return c.json({ error: 'Unauthorized' }, 401);
  }
  
  try {
    const id = c.req.param('id');
    const updates = await c.req.json();
    
    // Get existing items
    const existing = await kv.get('menu_items');
    const items = existing ? JSON.parse(existing) : DEFAULT_MENU_ITEMS;
    
    // Update item
    const index = items.findIndex((item: any) => item.id === id);
    if (index === -1) {
      return c.json({ error: 'Menu item not found' }, 404);
    }
    
    items[index] = { ...items[index], ...updates };
    await kv.set('menu_items', JSON.stringify(items));
    
    return c.json({ success: true, item: items[index] });
  } catch (error) {
    console.log(`Update menu item error: ${error}`);
    return c.json({ error: 'Failed to update menu item' }, 500);
  }
});

app.delete('/make-server-d8da5020/menu-items/:id', async (c) => {
  const { authorized } = await verifyAuth(c.req.raw);
  if (!authorized) {
    return c.json({ error: 'Unauthorized' }, 401);
  }
  
  try {
    const id = c.req.param('id');
    
    // Get existing items
    const existing = await kv.get('menu_items');
    const items = existing ? JSON.parse(existing) : DEFAULT_MENU_ITEMS;
    
    // Remove item
    const filtered = items.filter((item: any) => item.id !== id);
    await kv.set('menu_items', JSON.stringify(filtered));
    
    return c.json({ success: true });
  } catch (error) {
    console.log(`Delete menu item error: ${error}`);
    return c.json({ error: 'Failed to delete menu item' }, 500);
  }
});

// =====================================================
// EVENTS ROUTES
// =====================================================
app.get('/make-server-d8da5020/events', async (c) => {
  try {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('date', { ascending: true });
    
    if (error) throw error;
    
    return c.json({ success: true, events: toCamelCase(data || []) });
  } catch (error) {
    console.log(`Get events error: ${error}`);
    return c.json({ success: true, events: [] });
  }
});

app.post('/make-server-d8da5020/events', async (c) => {
  const { authorized } = await verifyAuth(c.req.raw);
  if (!authorized) {
    return c.json({ error: 'Unauthorized' }, 401);
  }
  
  try {
    const event = await c.req.json();
    const { data, error } = await supabase
      .from('events')
      .insert([toSnakeCase(event)])
      .select()
      .single();
    
    if (error) throw error;
    
    return c.json({ success: true, event: toCamelCase(data) });
  } catch (error) {
    console.log(`Create event error: ${error}`);
    return c.json({ error: 'Failed to create event' }, 500);
  }
});

app.put('/make-server-d8da5020/events/:id', async (c) => {
  const { authorized } = await verifyAuth(c.req.raw);
  if (!authorized) {
    return c.json({ error: 'Unauthorized' }, 401);
  }
  
  try {
    const id = c.req.param('id');
    const updates = await c.req.json();
    const { data, error } = await supabase
      .from('events')
      .update(toSnakeCase(updates))
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return c.json({ success: true, event: toCamelCase(data) });
  } catch (error) {
    console.log(`Update event error: ${error}`);
    return c.json({ error: 'Failed to update event' }, 500);
  }
});

app.delete('/make-server-d8da5020/events/:id', async (c) => {
  const { authorized } = await verifyAuth(c.req.raw);
  if (!authorized) {
    return c.json({ error: 'Unauthorized' }, 401);
  }
  
  try {
    const id = c.req.param('id');
    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    return c.json({ success: true });
  } catch (error) {
    console.log(`Delete event error: ${error}`);
    return c.json({ error: 'Failed to delete event' }, 500);
  }
});

// =====================================================
// VIDEOS ROUTES
// =====================================================
app.get('/make-server-d8da5020/videos', async (c) => {
  try {
    const { data, error } = await supabase
      .from('videos')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    return c.json({ success: true, videos: toCamelCase(data || []) });
  } catch (error) {
    console.log(`Get videos error: ${error}`);
    return c.json({ success: true, videos: [] });
  }
});

app.post('/make-server-d8da5020/videos', async (c) => {
  const { authorized } = await verifyAuth(c.req.raw);
  if (!authorized) {
    return c.json({ error: 'Unauthorized' }, 401);
  }
  
  try {
    const video = await c.req.json();
    const { data, error } = await supabase
      .from('videos')
      .insert([toSnakeCase(video)])
      .select()
      .single();
    
    if (error) throw error;
    
    return c.json({ success: true, video: toCamelCase(data) });
  } catch (error) {
    console.log(`Create video error: ${error}`);
    return c.json({ error: 'Failed to create video' }, 500);
  }
});

app.put('/make-server-d8da5020/videos/:id', async (c) => {
  const { authorized } = await verifyAuth(c.req.raw);
  if (!authorized) {
    return c.json({ error: 'Unauthorized' }, 401);
  }
  
  try {
    const id = c.req.param('id');
    const updates = await c.req.json();
    const { data, error } = await supabase
      .from('videos')
      .update(toSnakeCase(updates))
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return c.json({ success: true, video: toCamelCase(data) });
  } catch (error) {
    console.log(`Update video error: ${error}`);
    return c.json({ error: 'Failed to update video' }, 500);
  }
});

app.delete('/make-server-d8da5020/videos/:id', async (c) => {
  const { authorized } = await verifyAuth(c.req.raw);
  if (!authorized) {
    return c.json({ error: 'Unauthorized' }, 401);
  }
  
  try {
    const id = c.req.param('id');
    const { error } = await supabase
      .from('videos')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    return c.json({ success: true });
  } catch (error) {
    console.log(`Delete video error: ${error}`);
    return c.json({ error: 'Failed to delete video' }, 500);
  }
});

// =====================================================
// GALLERY ROUTES
// =====================================================
app.get('/make-server-d8da5020/gallery', async (c) => {
  try {
    const { data, error } = await supabase
      .from('gallery_images')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    return c.json({ success: true, gallery: toCamelCase(data || []) });
  } catch (error) {
    console.log(`Get gallery error: ${error}`);
    return c.json({ success: true, gallery: [] });
  }
});

app.post('/make-server-d8da5020/gallery', async (c) => {
  const { authorized } = await verifyAuth(c.req.raw);
  if (!authorized) {
    return c.json({ error: 'Unauthorized' }, 401);
  }
  
  try {
    const item = await c.req.json();
    const { data, error } = await supabase
      .from('gallery_images')
      .insert([toSnakeCase(item)])
      .select()
      .single();
    
    if (error) throw error;
    
    return c.json({ success: true, item: toCamelCase(data) });
  } catch (error) {
    console.log(`Create gallery item error: ${error}`);
    return c.json({ error: 'Failed to create gallery item' }, 500);
  }
});

app.put('/make-server-d8da5020/gallery/:id', async (c) => {
  const { authorized } = await verifyAuth(c.req.raw);
  if (!authorized) {
    return c.json({ error: 'Unauthorized' }, 401);
  }
  
  try {
    const id = c.req.param('id');
    const updates = await c.req.json();
    const { data, error } = await supabase
      .from('gallery_images')
      .update(toSnakeCase(updates))
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return c.json({ success: true, item: toCamelCase(data) });
  } catch (error) {
    console.log(`Update gallery item error: ${error}`);
    return c.json({ error: 'Failed to update gallery item' }, 500);
  }
});

app.delete('/make-server-d8da5020/gallery/:id', async (c) => {
  const { authorized } = await verifyAuth(c.req.raw);
  if (!authorized) {
    return c.json({ error: 'Unauthorized' }, 401);
  }
  
  try {
    const id = c.req.param('id');
    const { error } = await supabase
      .from('gallery_images')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    return c.json({ success: true });
  } catch (error) {
    console.log(`Delete gallery item error: ${error}`);
    return c.json({ error: 'Failed to delete gallery item' }, 500);
  }
});

// =====================================================
// AWARDS ROUTES
// =====================================================
app.get('/make-server-d8da5020/awards', async (c) => {
  try {
    const { data, error } = await supabase
      .from('awards')
      .select('*')
      .order('date', { ascending: false });
    
    if (error) throw error;
    
    return c.json({ success: true, awards: toCamelCase(data || []) });
  } catch (error) {
    console.log(`Get awards error: ${error}`);
    return c.json({ success: true, awards: [] });
  }
});

app.post('/make-server-d8da5020/awards', async (c) => {
  const { authorized } = await verifyAuth(c.req.raw);
  if (!authorized) {
    return c.json({ error: 'Unauthorized' }, 401);
  }
  
  try {
    const award = await c.req.json();
    const { data, error } = await supabase
      .from('awards')
      .insert([toSnakeCase(award)])
      .select()
      .single();
    
    if (error) throw error;
    
    return c.json({ success: true, award: toCamelCase(data) });
  } catch (error) {
    console.log(`Create award error: ${error}`);
    return c.json({ error: 'Failed to create award' }, 500);
  }
});

app.put('/make-server-d8da5020/awards/:id', async (c) => {
  const { authorized } = await verifyAuth(c.req.raw);
  if (!authorized) {
    return c.json({ error: 'Unauthorized' }, 401);
  }
  
  try {
    const id = c.req.param('id');
    const updates = await c.req.json();
    const { data, error } = await supabase
      .from('awards')
      .update(toSnakeCase(updates))
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return c.json({ success: true, award: toCamelCase(data) });
  } catch (error) {
    console.log(`Update award error: ${error}`);
    return c.json({ error: 'Failed to update award' }, 500);
  }
});

app.delete('/make-server-d8da5020/awards/:id', async (c) => {
  const { authorized } = await verifyAuth(c.req.raw);
  if (!authorized) {
    return c.json({ error: 'Unauthorized' }, 401);
  }
  
  try {
    const id = c.req.param('id');
    const { error } = await supabase
      .from('awards')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    return c.json({ success: true });
  } catch (error) {
    console.log(`Delete award error: ${error}`);
    return c.json({ error: 'Failed to delete award' }, 500);
  }
});

// =====================================================
// TESTIMONIES ROUTES
// =====================================================
app.get('/make-server-d8da5020/testimonies', async (c) => {
  try {
    const { data, error } = await supabase
      .from('testimonies')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    return c.json({ success: true, testimonies: toCamelCase(data || []) });
  } catch (error) {
    console.log(`Get testimonies error: ${error}`);
    return c.json({ success: true, testimonies: [] });
  }
});

app.post('/make-server-d8da5020/testimonies', async (c) => {
  const { authorized } = await verifyAuth(c.req.raw);
  if (!authorized) {
    return c.json({ error: 'Unauthorized' }, 401);
  }
  
  try {
    const testimony = await c.req.json();
    const { data, error } = await supabase
      .from('testimonies')
      .insert([toSnakeCase(testimony)])
      .select()
      .single();
    
    if (error) throw error;
    
    return c.json({ success: true, testimony: toCamelCase(data) });
  } catch (error) {
    console.log(`Create testimony error: ${error}`);
    return c.json({ error: 'Failed to create testimony' }, 500);
  }
});

app.put('/make-server-d8da5020/testimonies/:id', async (c) => {
  const { authorized } = await verifyAuth(c.req.raw);
  if (!authorized) {
    return c.json({ error: 'Unauthorized' }, 401);
  }
  
  try {
    const id = c.req.param('id');
    const updates = await c.req.json();
    const { data, error } = await supabase
      .from('testimonies')
      .update(toSnakeCase(updates))
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return c.json({ success: true, testimony: toCamelCase(data) });
  } catch (error) {
    console.log(`Update testimony error: ${error}`);
    return c.json({ error: 'Failed to update testimony' }, 500);
  }
});

app.delete('/make-server-d8da5020/testimonies/:id', async (c) => {
  const { authorized } = await verifyAuth(c.req.raw);
  if (!authorized) {
    return c.json({ error: 'Unauthorized' }, 401);
  }
  
  try {
    const id = c.req.param('id');
    const { error } = await supabase
      .from('testimonies')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    return c.json({ success: true });
  } catch (error) {
    console.log(`Delete testimony error: ${error}`);
    return c.json({ error: 'Failed to delete testimony' }, 500);
  }
});

// Public Testimony Submission Route
app.post('/make-server-d8da5020/public-testimonies', async (c) => {
  try {
    const testimony = await c.req.json();
    const { data, error } = await supabase
      .from('testimonies')
      .insert([{
        ...toSnakeCase(testimony),
        status: 'pending'
      }])
      .select()
      .single();
    
    if (error) throw error;
    
    return c.json({ success: true, testimony: toCamelCase(data) });
  } catch (error) {
    console.log(`Create public testimony error: ${error}`);
    return c.json({ error: 'Failed to submit testimony' }, 500);
  }
});

// =====================================================
// RESOURCES ROUTES
// =====================================================
app.get('/make-server-d8da5020/resources/:type', async (c) => {
  try {
    const type = c.req.param('type');
    const { data, error } = await supabase
      .from('resources')
      .select('*')
      .eq('category', type)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    return c.json({ success: true, resources: toCamelCase(data || []) });
  } catch (error) {
    console.log(`Get resources error: ${error}`);
    return c.json({ success: true, resources: [] });
  }
});

app.post('/make-server-d8da5020/resources/:type', async (c) => {
  const { authorized } = await verifyAuth(c.req.raw);
  if (!authorized) {
    return c.json({ error: 'Unauthorized' }, 401);
  }
  
  try {
    const type = c.req.param('type');
    const resource = await c.req.json();
    const { data, error } = await supabase
      .from('resources')
      .insert([{
        ...toSnakeCase(resource),
        category: type
      }])
      .select()
      .single();
    
    if (error) throw error;
    
    return c.json({ success: true, resource: toCamelCase(data) });
  } catch (error) {
    console.log(`Create resource error: ${error}`);
    return c.json({ error: 'Failed to create resource' }, 500);
  }
});

app.put('/make-server-d8da5020/resources/:type/:id', async (c) => {
  const { authorized } = await verifyAuth(c.req.raw);
  if (!authorized) {
    return c.json({ error: 'Unauthorized' }, 401);
  }
  
  try {
    const id = c.req.param('id');
    const updates = await c.req.json();
    const { data, error } = await supabase
      .from('resources')
      .update(toSnakeCase(updates))
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return c.json({ success: true, resource: toCamelCase(data) });
  } catch (error) {
    console.log(`Update resource error: ${error}`);
    return c.json({ error: 'Failed to update resource' }, 500);
  }
});

app.delete('/make-server-d8da5020/resources/:type/:id', async (c) => {
  const { authorized } = await verifyAuth(c.req.raw);
  if (!authorized) {
    return c.json({ error: 'Unauthorized' }, 401);
  }
  
  try {
    const id = c.req.param('id');
    const { error } = await supabase
      .from('resources')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    return c.json({ success: true });
  } catch (error) {
    console.log(`Delete resource error: ${error}`);
    return c.json({ error: 'Failed to delete resource' }, 500);
  }
});

// =====================================================
// MESSAGES (CONTACT FORM) ROUTES
// =====================================================
app.get('/make-server-d8da5020/messages', async (c) => {
  const { authorized } = await verifyAuth(c.req.raw);
  if (!authorized) {
    return c.json({ error: 'Unauthorized' }, 401);
  }
  
  try {
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('submitted_at', { ascending: false });
    
    if (error) throw error;
    
    return c.json({ success: true, messages: toCamelCase(data || []) });
  } catch (error) {
    console.log(`Get messages error: ${error}`);
    return c.json({ error: 'Failed to fetch messages' }, 500);
  }
});

app.post('/make-server-d8da5020/messages', async (c) => {
  try {
    const message = await c.req.json();
    const { data, error } = await supabase
      .from('contact_messages')
      .insert([{
        ...toSnakeCase(message),
        status: 'new'
      }])
      .select()
      .single();
    
    if (error) throw error;
    
    return c.json({ success: true, message: toCamelCase(data) });
  } catch (error) {
    console.log(`Create message error: ${error}`);
    return c.json({ error: 'Failed to create message' }, 500);
  }
});

app.put('/make-server-d8da5020/messages/:id', async (c) => {
  const { authorized } = await verifyAuth(c.req.raw);
  if (!authorized) {
    return c.json({ error: 'Unauthorized' }, 401);
  }
  
  try {
    const id = c.req.param('id');
    const updates = await c.req.json();
    const { data, error } = await supabase
      .from('contact_messages')
      .update(toSnakeCase(updates))
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return c.json({ success: true, message: toCamelCase(data) });
  } catch (error) {
    console.log(`Update message error: ${error}`);
    return c.json({ error: 'Failed to update message' }, 500);
  }
});

app.delete('/make-server-d8da5020/messages/:id', async (c) => {
  const { authorized } = await verifyAuth(c.req.raw);
  if (!authorized) {
    return c.json({ error: 'Unauthorized' }, 401);
  }
  
  try {
    const id = c.req.param('id');
    const { error } = await supabase
      .from('contact_messages')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    return c.json({ success: true });
  } catch (error) {
    console.log(`Delete message error: ${error}`);
    return c.json({ error: 'Failed to delete message' }, 500);
  }
});

// =====================================================
// SECTION VISIBILITY ROUTES
// =====================================================
app.get('/make-server-d8da5020/visibility', async (c) => {
  try {
    const { data, error } = await supabase
      .from('section_visibility')
      .select('*');
    
    if (error) throw error;
    
    // Convert array to object format
    const visibility = (data || []).reduce((acc: any, item: any) => {
      acc[item.section_name] = item.is_visible;
      return acc;
    }, {
      ministries: true,
      videos: true,
      gallery: true,
      awards: true,
      testimonies: true,
      events: true,
      resources: true
    });
    
    return c.json({ success: true, visibility });
  } catch (error) {
    console.log(`Get visibility error: ${error}`);
    // Return default visibility on error
    return c.json({ 
      success: true, 
      visibility: {
        ministries: true,
        videos: true,
        gallery: true,
        awards: true,
        testimonies: true,
        events: true,
        resources: true
      }
    });
  }
});

app.put('/make-server-d8da5020/visibility', async (c) => {
  const { authorized } = await verifyAuth(c.req.raw);
  if (!authorized) {
    return c.json({ error: 'Unauthorized' }, 401);
  }
  
  try {
    const visibility = await c.req.json();
    
    // Update or insert each section's visibility
    for (const [sectionName, isVisible] of Object.entries(visibility)) {
      await supabase
        .from('section_visibility')
        .upsert({
          section_name: sectionName,
          is_visible: isVisible
        }, {
          onConflict: 'section_name'
        });
    }
    
    return c.json({ success: true, visibility });
  } catch (error) {
    console.log(`Update visibility error: ${error}`);
    return c.json({ error: 'Failed to update visibility' }, 500);
  }
});

// =====================================================
// FOUNDER ROUTES
// =====================================================
app.get('/make-server-d8da5020/founder', async (c) => {
  try {
    const { data, error } = await supabase
      .from('founder')
      .select('*')
      .limit(1)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error; // PGRST116 is "no rows returned"
    
    return c.json({ success: true, founder: data ? toCamelCase(data) : null });
  } catch (error) {
    console.log(`Get founder error: ${error}`);
    return c.json({ success: true, founder: null });
  }
});

app.post('/make-server-d8da5020/founder', async (c) => {
  const { authorized } = await verifyAuth(c.req.raw);
  if (!authorized) {
    return c.json({ error: 'Unauthorized' }, 401);
  }
  
  try {
    const founderData = await c.req.json();
    
    // Check if founder exists
    const { data: existing } = await supabase
      .from('founder')
      .select('id')
      .limit(1)
      .single();
    
    let data;
    let error;
    
    if (existing) {
      // Update existing founder
      const result = await supabase
        .from('founder')
        .update(toSnakeCase(founderData))
        .eq('id', existing.id)
        .select()
        .single();
      data = result.data;
      error = result.error;
    } else {
      // Insert new founder
      const result = await supabase
        .from('founder')
        .insert([toSnakeCase(founderData)])
        .select()
        .single();
      data = result.data;
      error = result.error;
    }
    
    if (error) throw error;
    
    return c.json({ success: true, founder: toCamelCase(data) });
  } catch (error) {
    console.log(`Update founder error: ${error}`);
    return c.json({ error: 'Failed to update founder' }, 500);
  }
});

// =====================================================
// PRODUCTS AND ORDERS ROUTES
// =====================================================

// Get products
app.get('/make-server-d8da5020/products', async (c) => {
  try {
    const products = await kv.get('products');
    return c.json({ products: products || [] });
  } catch (error) {
    console.error('Error fetching products:', error);
    return c.json({ error: 'Failed to fetch products' }, 500);
  }
});

// Create/Update products (admin only)
app.post('/make-server-d8da5020/products', async (c) => {
  try {
    const { authorized } = await verifyAuth(c.req.raw);
    if (!authorized) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const body = await c.req.json();
    await kv.set('products', body.products);
    return c.json({ success: true });
  } catch (error) {
    console.error('Error saving products:', error);
    return c.json({ error: 'Failed to save products' }, 500);
  }
});

// Create order
app.post('/make-server-d8da5020/orders', async (c) => {
  try {
    const body = await c.req.json();
    const { items, customer, totalAmount } = body;
    
    if (!items || !customer || !customer.email) {
      console.error('Invalid order data:', body);
      return c.json({ error: 'Invalid order data' }, 400);
    }
    
    const orderId = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const order = {
      id: orderId,
      items,
      customer,
      totalAmount,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    // Save order
    await kv.set(`order_${orderId}`, order);
    
    // Add to orders list
    const orders = await kv.get('orders_list') || [];
    orders.push(orderId);
    await kv.set('orders_list', orders);

    // Log order creation (email integration would go here)
    console.log(`Order created: ${orderId} for ${customer.email}`);
    
    return c.json({ 
      success: true, 
      orderId,
      message: 'Order placed successfully. You will receive a confirmation email shortly.'
    });
  } catch (error) {
    console.error('Error processing order:', error);
    return c.json({ error: 'Failed to process order' }, 500);
  }
});

// Get all orders (admin only)
app.get('/make-server-d8da5020/orders', async (c) => {
  try {
    const { authorized } = await verifyAuth(c.req.raw);
    if (!authorized) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const orderIds = await kv.get('orders_list') || [];
    const orders = [];
    
    for (const orderId of orderIds) {
      const order = await kv.get(`order_${orderId}`);
      if (order) {
        orders.push(order);
      }
    }
    
    return c.json({ orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return c.json({ error: 'Failed to fetch orders' }, 500);
  }
});

// Update order status (admin only)
app.patch('/make-server-d8da5020/orders/:orderId', async (c) => {
  try {
    const { authorized } = await verifyAuth(c.req.raw);
    if (!authorized) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const orderId = c.req.param('orderId');
    const body = await c.req.json();
    
    const order = await kv.get(`order_${orderId}`);
    if (!order) {
      return c.json({ error: 'Order not found' }, 404);
    }
    
    const updatedOrder = {
      ...order,
      ...body,
      updatedAt: new Date().toISOString()
    };
    
    await kv.set(`order_${orderId}`, updatedOrder);
    
    return c.json({ success: true, order: updatedOrder });
  } catch (error) {
    console.error('Error updating order:', error);
    return c.json({ error: 'Failed to update order' }, 500);
  }
});

// =====================================================
// HERO IMAGES ROUTES
// =====================================================
app.get('/make-server-d8da5020/hero-images', async (c) => {
  try {
    const images = await kv.getByPrefix('hero_image_');
    return c.json({ success: true, images: images || [] });
  } catch (error) {
    console.error('Error fetching hero images:', error);
    return c.json({ error: 'Failed to fetch hero images' }, 500);
  }
});

app.post('/make-server-d8da5020/hero-images', async (c) => {
  try {
    const image = await c.req.json();
    await kv.set(`hero_image_${image.id}`, image);
    return c.json({ success: true, image });
  } catch (error) {
    console.error('Error creating hero image:', error);
    return c.json({ error: 'Failed to create hero image' }, 500);
  }
});

app.patch('/make-server-d8da5020/hero-images/:imageId/toggle', async (c) => {
  try {
    const imageId = c.req.param('imageId');
    const { isActive } = await c.req.json();
    
    const image = await kv.get(`hero_image_${imageId}`);
    if (!image) {
      return c.json({ error: 'Image not found' }, 404);
    }
    
    const updatedImage = { ...image, isActive };
    await kv.set(`hero_image_${imageId}`, updatedImage);
    
    return c.json({ success: true, image: updatedImage });
  } catch (error) {
    console.error('Error toggling hero image:', error);
    return c.json({ error: 'Failed to toggle hero image' }, 500);
  }
});

app.delete('/make-server-d8da5020/hero-images/:imageId', async (c) => {
  try {
    const imageId = c.req.param('imageId');
    await kv.del(`hero_image_${imageId}`);
    return c.json({ success: true });
  } catch (error) {
    console.error('Error deleting hero image:', error);
    return c.json({ error: 'Failed to delete hero image' }, 500);
  }
});

Deno.serve(app.fetch);
