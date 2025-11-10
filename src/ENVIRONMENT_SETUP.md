# Environment Variables Setup Guide

This guide explains all environment variables needed for the YBH Ministries website.

## 📋 Required Environment Variables

### 1. Vercel Postgres (Neon)

These are **automatically set** when you create a Postgres database in Vercel:

```bash
POSTGRES_URL="postgres://..."
POSTGRES_PRISMA_URL="postgres://..."
POSTGRES_URL_NON_POOLING="postgres://..."
POSTGRES_USER="..."
POSTGRES_HOST="..."
POSTGRES_PASSWORD="..."
POSTGRES_DATABASE="..."
```

**How to Set Up:**
1. Go to Vercel dashboard → Your project
2. Click **Storage** tab
3. Click **Create Database**
4. Select **Postgres** → **Neon**
5. Click **Create**
6. Variables are automatically added ✅

**Verify:**
```bash
vercel env ls
```
You should see all `POSTGRES_*` variables listed.

---

### 2. Vercel Blob Storage

This is **automatically set** when you create a Blob storage in Vercel:

```bash
BLOB_READ_WRITE_TOKEN="vercel_blob_rw_..."
```

**How to Set Up:**
1. Go to Vercel dashboard → Your project
2. Click **Storage** tab
3. Click **Create Database**
4. Select **Blob**
5. Click **Create**
6. Variable is automatically added ✅

**Verify:**
```bash
vercel env ls
```
You should see `BLOB_READ_WRITE_TOKEN` listed.

---

## 🔧 Manual Setup (If Needed)

### Add Environment Variable via Vercel Dashboard

1. Go to Vercel dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Click **Add New**
5. Enter:
   - **Key:** Variable name (e.g., `POSTGRES_URL`)
   - **Value:** Variable value
   - **Environment:** Production, Preview, Development (select all)
6. Click **Save**

### Add Environment Variable via CLI

```bash
# Add a new environment variable
vercel env add VARIABLE_NAME

# You'll be prompted to enter the value and select environments

# Pull environment variables to local
vercel env pull .env.local
```

---

## 🖥️ Local Development Setup

### Step 1: Create `.env.local` File

```bash
# Pull environment variables from Vercel
vercel env pull .env.local
```

This creates a `.env.local` file with all your environment variables.

### Step 2: Verify `.env.local`

Open `.env.local` and verify it contains:

```bash
POSTGRES_URL=postgres://...
POSTGRES_PRISMA_URL=postgres://...
POSTGRES_URL_NON_POOLING=postgres://...
POSTGRES_USER=...
POSTGRES_HOST=...
POSTGRES_PASSWORD=...
POSTGRES_DATABASE=...
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_...
```

### Step 3: Run Locally

```bash
npm run dev
# or
vercel dev
```

---

## 🔐 Security Best Practices

### ✅ DO:
- Keep `.env.local` in `.gitignore` (already done)
- Use Vercel's built-in environment variables
- Rotate tokens regularly
- Use different values for Production/Preview/Development

### ❌ DON'T:
- Commit `.env.local` to Git
- Share environment variables publicly
- Hardcode credentials in code
- Use production credentials in development

---

## 🧪 Testing Environment Variables

### Test Postgres Connection

Create a test API route:

```typescript
// /api/test-postgres.ts
import { sql } from '@vercel/postgres';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  try {
    const result = await sql`SELECT NOW()`;
    res.status(200).json({ 
      success: true, 
      time: result.rows[0].now,
      message: 'Postgres connected successfully' 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
}
```

Visit `/api/test-postgres` to test.

### Test Blob Storage

```typescript
// /api/test-blob.ts
import { list } from '@vercel/blob';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  try {
    const { blobs } = await list();
    res.status(200).json({ 
      success: true, 
      count: blobs.length,
      message: 'Blob storage connected successfully' 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
}
```

Visit `/api/test-blob` to test.

---

## 🔄 Updating Environment Variables

### Update via Dashboard

1. Go to Settings → Environment Variables
2. Find the variable
3. Click **Edit**
4. Update value
5. Click **Save**
6. **Redeploy** your project for changes to take effect

### Update via CLI

```bash
# Remove old value
vercel env rm VARIABLE_NAME

# Add new value
vercel env add VARIABLE_NAME

# Redeploy
vercel --prod
```

---

## 🌍 Environment-Specific Variables

You can set different values for different environments:

| Environment | When Used |
|-------------|-----------|
| **Production** | Live site (yourdomain.com) |
| **Preview** | Pull request deployments |
| **Development** | Local development |

**Example:**
- Production: Use production database
- Preview: Use staging database
- Development: Use local database

---

## 📝 Environment Variables Checklist

Before deploying, verify:

- [ ] `POSTGRES_URL` is set
- [ ] `POSTGRES_PRISMA_URL` is set
- [ ] `POSTGRES_URL_NON_POOLING` is set
- [ ] `POSTGRES_USER` is set
- [ ] `POSTGRES_HOST` is set
- [ ] `POSTGRES_PASSWORD` is set
- [ ] `POSTGRES_DATABASE` is set
- [ ] `BLOB_READ_WRITE_TOKEN` is set
- [ ] All variables are set for Production environment
- [ ] `.env.local` exists for local development
- [ ] `.env.local` is in `.gitignore`

---

## 🐛 Troubleshooting

### "Cannot connect to database"

**Solution:**
```bash
# Verify environment variables
vercel env ls

# Pull latest variables
vercel env pull .env.local

# Redeploy
vercel --prod
```

### "BLOB_READ_WRITE_TOKEN is not defined"

**Solution:**
1. Create Blob storage in Vercel dashboard
2. Variable should be auto-added
3. If not, add manually in Settings → Environment Variables
4. Redeploy

### Variables not updating

**Solution:**
1. Update variable in dashboard
2. **Redeploy project** (important!)
3. Clear browser cache
4. Try again

### Local development not working

**Solution:**
```bash
# Pull latest environment variables
vercel env pull .env.local

# Restart development server
# Kill current process (Ctrl+C)
npm run dev
```

---

## 📚 Additional Resources

- [Vercel Environment Variables Docs](https://vercel.com/docs/environment-variables)
- [Vercel Postgres Docs](https://vercel.com/docs/storage/vercel-postgres)
- [Vercel Blob Docs](https://vercel.com/docs/storage/vercel-blob)

---

## 🆘 Support

If environment variables are not working:

1. Check Vercel deployment logs: `vercel logs`
2. Verify variables in dashboard: Settings → Environment Variables
3. Pull latest variables: `vercel env pull`
4. Redeploy: `vercel --prod`
5. Check API test endpoints

**Remember:** Changes to environment variables require redeployment!
