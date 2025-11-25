/**
 * Small helper script to set a CORS policy on an R2 bucket using S3-compatible API.
 * Usage: R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET must be set in env or .env
 * node scripts/r2-set-cors.js
 */
const { S3Client, PutBucketCorsCommand } = require('@aws-sdk/client-s3');

const ACCOUNT_ID = process.env.R2_ACCOUNT_ID || process.env.CF_ACCOUNT_ID || process.env.CLOUDFLARE_ACCOUNT_ID;
const ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID || process.env.R2_KEY_ID || process.env.CF_R2_KEY_ID;
const SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY || process.env.R2_SECRET || process.env.CF_R2_SECRET;
const BUCKET = process.env.R2_BUCKET || process.env.R2_BUCKET_NAME || process.env.CF_R2_BUCKET;

if (!ACCOUNT_ID || !ACCESS_KEY_ID || !SECRET_ACCESS_KEY || !BUCKET) {
  console.error('Missing required env vars. Please set R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET');
  process.exit(1);
}

const endpoint = `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`;

const client = new S3Client({ region: 'auto', endpoint, credentials: { accessKeyId: ACCESS_KEY_ID, secretAccessKey: SECRET_ACCESS_KEY } });

async function setCors() {
  const cors = {
    CORSRules: [
      {
        AllowedOrigins: ['*'], // Change to your production origin(s)
        AllowedMethods: ['GET', 'PUT', 'POST', 'DELETE', 'HEAD'],
        AllowedHeaders: ['*'],
        MaxAgeSeconds: 3000
      }
    ]
  };

  try {
    const cmd = new PutBucketCorsCommand({ Bucket: BUCKET, CORSConfiguration: cors });
    await client.send(cmd);
    if (process.env.NODE_ENV !== 'production') console.debug('CORS configuration applied to bucket:', BUCKET);
  } catch (err) {
    console.error('Failed to apply CORS:', err);
    process.exit(2);
  }
}

setCors();
