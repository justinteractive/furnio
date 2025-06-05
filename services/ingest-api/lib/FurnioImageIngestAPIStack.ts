import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { FurnioImageUploadBucket } from './construct/FurnioImageUploadBucket';
import { FurnioImageProcessorLambda } from './construct/FurnioImageProcessorLambda';
import { FurnioPresignApi } from './construct/FurnioPresignApi';

interface ImagePipelineStackProps extends StackProps {
  envName: string;
}

export class FurnioImageIngestAPIStack extends Stack {
  constructor(scope: Construct, id: string, props: ImagePipelineStackProps) {
    super(scope, id, props);

    const uploadBucket = new FurnioImageUploadBucket(this, 'FurnioImageUploadBucket', {
      envName: props.envName,
    });

    new FurnioImageProcessorLambda(this, 'FurnioImageProcessorLambda', {
      uploadBucket: uploadBucket.bucket,
      envName: props.envName,
    });

    new FurnioPresignApi(this, 'PresignApi', {
      bucket: uploadBucket.bucket,
      envName: props.envName,
    });
  }
}
