import { Construct } from 'constructs';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { join } from 'path';
import { S3EventSource } from 'aws-cdk-lib/aws-lambda-event-sources';
import { PolicyStatement } from 'aws-cdk-lib/aws-iam';

interface ImageProcessorLambdaProps {
  uploadBucket: Bucket;
  destinationBucket: Bucket;
  cdnUrl: string;
  envName: string;
}

export class ImageProcessorLambda extends Construct {
  constructor(scope: Construct, id: string, props: ImageProcessorLambdaProps) {
    super(scope, id);

    const fn = new NodejsFunction(this, 'ProcessorFunction', {
      runtime: Runtime.NODEJS_18_X,
      entry: join(__dirname, '../../lambda/imageProcessor.ts'),
      handler: 'handler',
      environment: {
        DEST_BUCKET: props.destinationBucket.bucketName,
        CDN_URL: props.cdnUrl,
        MONGODB_URI: process.env.MONGODB_URI || '',
      },
    });

    fn.addEventSource(new S3EventSource(props.uploadBucket, {
      events: ['s3:ObjectCreated:*'],
    }));

    props.uploadBucket.grantReadWrite(fn);
    props.destinationBucket.grantReadWrite(fn);

    fn.addToRolePolicy(new PolicyStatement({
      actions: ['secretsmanager:GetSecretValue'],
      resources: ['*'],
    }));
  }
}
