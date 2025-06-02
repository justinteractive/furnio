import { S3Handler } from 'aws-lambda';
import AWS from 'aws-sdk';
import axios from 'axios';
import { MongoClient } from 'mongodb';

// required env vars to be set
// MONGODB_URI
// R2_ENDPOINT
// R2_BUCKET
// R2_ACCESS_KEY_ID
// R2_SECRET_ACCESS_KEY

const s3 = new AWS.S3();
// AWS S3-protocol compatible bucket via Cloudflare
const r2 = new AWS.S3({
  endpoint: process.env.R2_ENDPOINT,
  accessKeyId: process.env.R2_ACCESS_KEY_ID,
  secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  signatureVersion: 'v4',
  region: 'auto',
});

export const handler: S3Handler = async (event) => {
  const srcBucket = event.Records[0].s3.bucket.name;
  const srcKey = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));

  try {
    // fetch image
    const s3Object = await s3.getObject({ Bucket: srcBucket, Key: srcKey }).promise();
    const imageData = s3Object.Body;

    // send image for AI processing
    const { data: result } = await axios.post(
      'https://example-ai-api.com/infer', // AI endpoint
      imageData,
      {
        headers: { 'Content-Type': 'application/octet-stream' },
      },
    );

    // connect to MongoDB and upload AI results
    const client = new MongoClient(process.env.MONGODB_URI!);
    await client.connect();
    const db = client.db('imageai');
    const timestamp = new Date();
    await db.collection('results').insertOne({ key: srcKey, result, timestamp });
    await client.close();

    // store image with Cloudflare
    await r2.putObject({
      Bucket: process.env.R2_BUCKET!,
      Key: srcKey,
      Body: imageData,
      ContentType: s3Object.ContentType,
    }).promise();

    // remove uploaded picture
    await s3.deleteObject({ Bucket: srcBucket, Key: srcKey }).promise();

    console.log(`Image processed and uploaded to CDN bucket. CDN URL: https://${process.env.CDN_URL}/${srcKey}`);
  } catch (err) {
    console.error(err);
    throw err;
  }
};
