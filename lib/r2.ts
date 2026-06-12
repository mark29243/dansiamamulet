import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const required = (name: string): string => {
  const v = process.env[name];
  if (!v) throw new Error(`${name} is not set`);
  return v;
};

let _client: S3Client | null = null;
function client(): S3Client {
  if (!_client) {
    _client = new S3Client({
      region: 'auto',
      endpoint: required('R2_ENDPOINT'),
      credentials: {
        accessKeyId: required('R2_ACCESS_KEY_ID'),
        secretAccessKey: required('R2_SECRET_ACCESS_KEY'),
      },
    });
  }
  return _client;
}

/** Upload a buffer to R2 and return its public URL. */
export async function uploadToR2(key: string, body: Buffer | Uint8Array, contentType: string): Promise<string> {
  await client().send(new PutObjectCommand({
    Bucket: required('R2_BUCKET'),
    Key: key,
    Body: body,
    ContentType: contentType,
    CacheControl: 'public, max-age=31536000, immutable',
  }));
  return `${required('R2_PUBLIC_URL')}/${key}`;
}
