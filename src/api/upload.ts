// Vercel Serverless Function for File Uploads to Vercel Blob
// This handles image and video uploads to Vercel Blob Storage

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { put } from '@vercel/blob';
import { IncomingForm, Fields, Files, File } from 'formidable';

// Disable body parsing, as formidable will handle it
export const config = {
  api: {
    bodyParser: false,
  },
};

// Helper function to parse form data
function parseForm(req: VercelRequest): Promise<{ fields: Fields; files: Files }> {
  return new Promise((resolve, reject) => {
    const form = new IncomingForm({
      maxFileSize: 100 * 1024 * 1024, // 100MB max file size
      keepExtensions: true,
    });

    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(err);
      } else {
        resolve({ fields, files });
      }
    });
  });
}

async function handleUpload(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Check for Vercel Blob token
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      console.error('BLOB_READ_WRITE_TOKEN is not set');
      return res.status(500).json({ 
        error: 'Server configuration error. Please set BLOB_READ_WRITE_TOKEN environment variable.' 
      });
    }

    // Parse the form data
    const { fields, files } = await parseForm(req);
    
    // Get the folder from query params (default to 'uploads')
    const folder = (req.query.folder as string) || 'uploads';
    
    // Get the file from the parsed files
    const file = Array.isArray(files.file) ? files.file[0] : files.file;
    
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Type assertion for formidable File
    const uploadedFile = file as File;
    
    // Read file as buffer
    const fs = await import('fs');
    const fileBuffer = fs.readFileSync(uploadedFile.filepath);
    
    // Generate a unique filename with timestamp
    const timestamp = Date.now();
    const originalName = uploadedFile.originalFilename || 'file';
    const sanitizedName = originalName.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filename = `${timestamp}-${sanitizedName}`;
    const pathname = `${folder}/${filename}`;

    // Upload to Vercel Blob
    const blob = await put(pathname, fileBuffer, {
      access: 'public',
      contentType: uploadedFile.mimetype || 'application/octet-stream',
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    // Clean up temp file
    fs.unlinkSync(uploadedFile.filepath);

    return res.status(200).json({
      success: true,
      url: blob.url,
      pathname: blob.pathname,
      contentType: blob.contentType,
      size: uploadedFile.size,
    });

  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({ 
      error: 'Failed to upload file',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

export default handleUpload;
