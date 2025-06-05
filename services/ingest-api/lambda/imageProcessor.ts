import { S3Event, S3Handler } from 'aws-lambda';
import AWS from 'aws-sdk';
import axios from 'axios';

import { getClient, getDb } from '@furnio/db';

const uploadBucket = new AWS.S3();
// AWS S3-protocol compatible bucket via Cloudflare
const cdnBucket = new AWS.S3({
  endpoint: process.env.R2_ENDPOINT,
  accessKeyId: process.env.R2_ACCESS_KEY_ID,
  secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  signatureVersion: 'v4',
  region: 'auto',
});

export async function handler(event: S3Event): Promise<void> {
  const srcBucket = event.Records[0].s3.bucket.name;
  const srcKey = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));

  try {
    // fetch image
    const s3Object = await uploadBucket.getObject({ Bucket: srcBucket, Key: srcKey }).promise();
    const imageData = s3Object.Body;

    // send image for AI processing
    const { data: result } = await axios.post(
      process.env.AI_API_URI!,
      imageData,
      {
        headers: { 'Content-Type': 'application/octet-stream' },
      },
    );

    // connect to MongoDB and upload AI results
    const db = await getDb();
    const timestamp = new Date();
    await db.collection('items').insertOne({ key: srcKey, result, timestamp });
    (await getClient()).close();

    // store image with Cloudflare
    await cdnBucket.putObject({
      Bucket: process.env.R2_BUCKET!,
      Key: srcKey,
      Body: imageData,
      ContentType: s3Object.ContentType,
    }).promise();

    // remove uploaded picture
    await uploadBucket.deleteObject({ Bucket: srcBucket, Key: srcKey }).promise();

    console.log('Image processed and uploaded to CDN bucket');
  } catch (err) {
    console.error(err);
    throw err;
  }
};
