#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { ImagePipelineStack } from '../lib/image-pipeline-stack';

const app = new cdk.App();
const envName = app.node.tryGetContext('env') || 'dev';

new ImagePipelineStack(app, `ImagePipelineStack-${envName}`, {
  envName,
});
