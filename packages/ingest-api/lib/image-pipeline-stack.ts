import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { UploadBucket } from './construct/upload-bucket';
import { ImageProcessorLambda } from './construct/image-processor-lambda';
import { CdnDistribution } from './construct/cdn-distribution';

interface ImagePipelineStackProps extends StackProps {
  envName: string;
}

export class ImagePipelineStack extends Stack {
  constructor(scope: Construct, id: string, props: ImagePipelineStackProps) {
    super(scope, id, props);

    const uploadBucket = new UploadBucket(this, 'UploadBucket', {
      envName: props.envName,
    });

    const cdn = new CdnDistribution(this, 'CDN', {
      envName: props.envName,
    });

    new ImageProcessorLambda(this, 'ImageProcessorLambda', {
      uploadBucket: uploadBucket.bucket,
      destinationBucket: cdn.bucket,
      cdnUrl: cdn.distribution.distributionDomainName,
      envName: props.envName,
    });
  }
}
