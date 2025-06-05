import { Bucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';
import { RemovalPolicy } from 'aws-cdk-lib';

interface UploadBucketProps {
  envName: string;
}

export class FurnioImageUploadBucket extends Construct {
  public readonly bucket: Bucket;

  constructor(scope: Construct, id: string, props: UploadBucketProps) {
    super(scope, id);

    this.bucket = new Bucket(this, 'ImageUploadBucket', {
      bucketName: `furnio-image-upload-${props.envName.toLowerCase()}`,
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });
  }
}
