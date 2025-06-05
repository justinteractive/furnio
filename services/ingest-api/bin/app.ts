#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { FurnioImageIngestAPIStack } from '../lib/FurnioImageIngestAPIStack';

const app = new cdk.App();
const envName = app.node.tryGetContext('env') || 'dev';

new FurnioImageIngestAPIStack(app, `FurnioImageIngestAPIStack-${envName}`, {
  envName,
});
