#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import * as dotenv from "dotenv";
import { ClevertubeDeployStack } from "../lib/clevertube-cdk-deploy-stack";

dotenv.config();
const app = new cdk.App();

const stackName = "clevertube";
const deploymentEnvironment = process.env.DEPLOYMENT_ENVIRONMENT as
  | "dev"
  | "prod"
  | "staging";
// Using env to control the deployment environment
new ClevertubeDeployStack(app, "clevertube-dev-stack", {
  env: {
    region: process.env.AWS_REGION,
    account: process.env.AWS_ACCOUNT_ID,
  },
  stackName: `${stackName}-${deploymentEnvironment}`,
  deploymentEnvironment,
});

// qa
// new ClevertubeCdkDeployStack(app, "ClevertubeCdkDeployStack");

// prod
// new ClevertubeCdkDeployStack(app, "ClevertubeCdkDeployStack");
