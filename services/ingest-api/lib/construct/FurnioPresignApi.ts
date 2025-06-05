import { Construct } from 'constructs';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { join } from 'path';
import { RestApi, LambdaIntegration, ApiKey, UsagePlan } from 'aws-cdk-lib/aws-apigateway';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { Secret } from 'aws-cdk-lib/aws-secretsmanager';
import { CfnOutput } from 'aws-cdk-lib';

interface PresignApiProps {
  bucket: Bucket;
  envName: string;
}

export class FurnioPresignApi extends Construct {
  public readonly api: RestApi;

  constructor(scope: Construct, id: string, props: PresignApiProps) {
    super(scope, id);

    const apiKeySecret = new Secret(this, 'PresignApiKeySecret', {
      secretName: `presign-api-key-${props.envName}`,
      description: 'API key for accessing the presigned URL API',
      generateSecretString: {
        secretStringTemplate: JSON.stringify({}),
        generateStringKey: 'apiKey',
      },
    });

    const lambdaFn = new NodejsFunction(this, 'PresignUrlLambda', {
      runtime: Runtime.NODEJS_22_X,
      entry: join(__dirname, '../../lambda/getPresignedUrl.ts'),
      handler: 'handler',
      environment: {
        API_KEY: apiKeySecret.secretValueFromJson('apiKey').unsafeUnwrap().toString(),
        S3_BUCKET_NAME: props.bucket.bucketName,
      },
    });

    props.bucket.grantReadWrite(lambdaFn);

    const api = new RestApi(this, 'PresignApi', {
      restApiName: `PresignApi-${props.envName}`,
      description: 'API for generating S3 presigned URLs.',
    });

    const integration = new LambdaIntegration(lambdaFn);
    const presignResource = api.root.addResource('presign-url');
    presignResource.addMethod('GET', integration, {
      apiKeyRequired: true,
    });

    const apiKey = new ApiKey(this, 'PresignApiKey', {
      description: 'API Key for presigned URL access',
      value: apiKeySecret.secretValueFromJson('apiKey').unsafeUnwrap().toString(),
    });

    const plan = api.addUsagePlan('PresignUsagePlan', {
      name: `PresignUsage-${props.envName}`,
      apiStages: [{ api, stage: api.deploymentStage }],
    });

    plan.addApiKey(apiKey);

    new CfnOutput(this, 'PresignApiKeyOutput', {
      value: apiKeySecret.secretValueFromJson('apiKey').unsafeUnwrap().toString(),
      description: 'API Key for local development',
    });

    this.api = api;
  }
}
