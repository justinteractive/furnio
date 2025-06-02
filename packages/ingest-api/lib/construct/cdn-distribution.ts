import { Bucket } from 'aws-cdk-lib/aws-s3';
import { CloudFrontWebDistribution, OriginAccessIdentity } from 'aws-cdk-lib/aws-cloudfront';
import { Construct } from 'constructs';
import { RemovalPolicy } from 'aws-cdk-lib';

interface CdnDistributionProps {
  envName: string;
}

export class CdnDistribution extends Construct {
  public readonly bucket: Bucket;
  public readonly distribution: CloudFrontWebDistribution;

  constructor(scope: Construct, id: string, props: CdnDistributionProps) {
    super(scope, id);

    this.bucket = new Bucket(this, 'CDNBucket', {
      bucketName: `image-cdn-${props.envName.toLowerCase()}`,
      publicReadAccess: false,
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    const originAccessIdentity = new OriginAccessIdentity(this, 'OAI');

    this.bucket.grantRead(originAccessIdentity);

    this.distribution = new CloudFrontWebDistribution(this, 'ImageCDN', {
      originConfigs: [
        {
          s3OriginSource: {
            s3BucketSource: this.bucket,
            originAccessIdentity,
          },
          behaviors: [{ isDefaultBehavior: true }],
        },
      ],
    });
  }
}
