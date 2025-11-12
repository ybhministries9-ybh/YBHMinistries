# Deployment Guide for Vercel

## Required Environment Variables

You need to set the following environment variables in your Vercel project settings:

### 1. Vercel Postgres Database Variables

Go to **Vercel Dashboard** → **Storage** → **Postgres** → Click on your database → **Settings** → **.env.local** tab

Copy and paste these variables into your Vercel project settings:

```bash
POSTGRES_URL=postgresql://neondb_owner:npg_sOj9CmcueGK0@ep-dark-truth-advebx9d-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require
POSTGRES_URL_NON_POOLING=postgresql://neondb_owner:npg_sOj9CmcueGK0@ep-dark-truth-advebx9d.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require
POSTGRES_USER=neondb_owner
POSTGRES_HOST=ep-dark-truth-advebx9d-pooler.c-2.us-east-1.aws.neon.tech
POSTGRES_PASSWORD=npg_sOj9CmcueGK0
POSTGRES_DATABASE=neondb
POSTGRES_URL_NO_SSL=postgresql://neondb_owner:npg_sOj9CmcueGK0@ep-dark-truth-advebx9d-pooler.c-2.us-east-1.aws.neon.tech/neondb
POSTGRES_PRISMA_URL=postgresql://neondb_owner:npg_sOj9CmcueGK0@ep-dark-truth-advebx9d-pooler.c-2.us-east-1.aws.neon.tech/neondb?connect_timeout=15&sslmode=require
```

### 2. Vercel Blob Storage Variable

Go to **Vercel Dashboard** → **Storage** → **Blob** → Click on your blob storage → **.env.local** tab

```bash
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_n3eLvywvxXnBjwip_2Kxv7lf1LK2RXa9RKhwEM86TPsaOnG
```

### 3. App URL Variable

```bash
NEXT_PUBLIC_APP_URL=https://your-production-domain.vercel.app
```

## How to Add Environment Variables in Vercel

1. Go to your Vercel project dashboard
2. Click on **Settings** tab
3. Click on **Environment Variables** in the left sidebar
4. Add each variable:
   - **Name**: Variable name (e.g., `POSTGRES_URL`)
   - **Value**: Variable value (copy from above)
   - **Environment**: Select **Production**, **Preview**, and **Development**
5. Click **Save**
6. After adding all variables, **redeploy** your project:
   - Go to **Deployments** tab
   - Click the **...** menu on the latest deployment
   - Click **Redeploy**

## Verify Connection

After redeploying with environment variables:

1. Check the deployment logs for any errors
2. Visit your admin panel: `https://your-domain.vercel.app/admin`
3. You should see hero images and video loading without 500 errors

## Database Tables

The following tables should already exist in your database:
- ✅ `home_hero_images` (23 default images)
- ✅ `home_video` (1 default video)
- ✅ `about_hero_image` (1 default image)

If you see errors about missing tables, run the SQL scripts in:
- `database/schema/home_content.sql`
- `database/schema/about_content.sql`

## Troubleshooting

### Still getting 500 errors after adding env variables?

1. **Check environment variables are set correctly**:
   - Go to Settings → Environment Variables
   - Verify all variables are present
   - Make sure they're enabled for Production

2. **Redeploy the project**:
   - Deployments tab → Click latest deployment → Redeploy

3. **Check deployment logs**:
   - Click on the deployment
   - Click **View Function Logs**
   - Look for database connection errors

4. **Test database connection**:
   - Go to Vercel Dashboard → Storage → Postgres
   - Click on your database
   - Go to Query tab
   - Run: `SELECT COUNT(*) FROM home_hero_images;`
   - Should return 23

### Database connection timing out?

Use the pooled connection URL (`POSTGRES_URL`) instead of the direct connection URL for better performance in serverless environments.
