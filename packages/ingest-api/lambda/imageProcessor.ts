import { S3Handler } from 'aws-lambda';
import AWS from 'aws-sdk';
import axios from 'axios';
import { MongoClient } from 'mongodb';

const s3 = new AWS.S3();

export const handler: S3Handler = async (event) => {
  const srcBucket = event.Records[0].s3.bucket.name;
  const srcKey = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));

  try {
    const s3Object = await s3.getObject({ Bucket: srcBucket, Key: srcKey }).promise();
    const imageData = s3Object.Body;

    const aiResponse = await axios.post('https://example-ai-api.com/infer', imageData, {
      headers: { 'Content-Type': 'application/octet-stream' },
    });

    const client = new MongoClient(process.env.MONGODB_URI!);
    await client.connect();
    const db = client.db('imageai');
    await db.collection('results').insertOne({
      key: srcKey,
      result: aiResponse.data,
      timestamp: new Date(),
    });
    await client.close();

    await s3.putObject({
      Bucket: process.env.DEST_BUCKET!,
      Key: srcKey,
      Body: imageData,
      ContentType: s3Object.ContentType,
    }).promise();

    await s3.deleteObject({ Bucket: srcBucket, Key: srcKey }).promise();

    console.log(`Image processed and uploaded to CDN bucket. CDN URL: https://${process.env.CDN_URL}/${srcKey}`);
  } catch (err) {
    console.error(err);
    throw err;
  }
};
