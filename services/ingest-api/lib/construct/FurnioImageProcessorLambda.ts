import { join } from 'node:path';
import { Construct } from 'constructs';
import { Bucket, EventType } from 'aws-cdk-lib/aws-s3';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { S3EventSource } from 'aws-cdk-lib/aws-lambda-event-sources';

interface ImageProcessorLambdaProps {
  uploadBucket: Bucket;
  envName: string;
}

export class FurnioImageProcessorLambda extends Construct {
  constructor(scope: Construct, id: string, props: ImageProcessorLambdaProps) {
    super(scope, id);

    const fn = new NodejsFunction(this, 'ProcessorFunction', {
      runtime: Runtime.NODEJS_22_X,
      entry: join(__dirname, '../../lambda/imageProcessor.ts'),
      handler: 'handler',
      environment: {
        MONGODB_URI: process.env.MONGODB_URI || '',
      },
    });

    fn.addEventSource(new S3EventSource(props.uploadBucket, {
      events: [EventType.OBJECT_CREATED],
    }));

    props.uploadBucket.grantReadWrite(fn);
  }
}
