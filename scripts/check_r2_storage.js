const { S3Client, ListObjectsV2Command } = require('@aws-sdk/client-s3');

const s3 = new S3Client({
  region: 'auto',
  endpoint: 'https://6689a20e2293c64184622111b965b70c.r2.cloudflarestorage.com',
  credentials: {
    accessKeyId: 'bc99e07e93b25faa4b402328bc807367',
    secretAccessKey: 'a3c0d40cdbbcd749688761dc2b8856defdfe3eef704c4c8761a4ee1ead5427d2',
  },
});

async function checkR2() {
  console.log('--- CHECKING CLOUDFLARE R2 (dansiam-products) ---');
  let totalObjects = 0;
  let totalBytes = 0;
  let continuationToken = undefined;

  do {
    const command = new ListObjectsV2Command({
      Bucket: 'dansiam-products',
      ContinuationToken: continuationToken,
    });
    const response = await s3.send(command);
    if (response.Contents) {
      totalObjects += response.Contents.length;
      totalBytes += response.Contents.reduce((acc, item) => acc + (item.Size || 0), 0);
    }
    continuationToken = response.NextContinuationToken;
  } while (continuationToken);

  console.log(`Total R2 Objects: ${totalObjects} files`);
  console.log(`Total R2 Storage: ${(totalBytes / 1024 / 1024).toFixed(2)} MB (${(totalBytes / 1024 / 1024 / 1024).toFixed(3)} GB)`);
}

checkR2().catch(e => console.error('R2 check error:', e.message));
