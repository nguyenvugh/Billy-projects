import * as iam from "aws-cdk-lib/aws-iam";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { NestedStack, NestedStackProps, StackProps } from "aws-cdk-lib";

interface S3StackProps extends NestedStackProps, StackProps {
  deploymentEnvironment: "dev" | "prod" | "staging";
}

// https://bobbyhadz.com/blog/aws-cdk-s3-bucket-example
export class S3Stack extends NestedStack {
  public readonly s3Bucket: s3.Bucket;

  constructor(scope: Construct, id: string, props?: S3StackProps) {
    super(scope, id, props);

    const isProd = props?.deploymentEnvironment === "prod";
    this.s3Bucket = new s3.Bucket(this, "s3-bucket", {
      bucketName: `${props?.stackName}-s3-bucket-${props?.env?.account}-${props?.env?.region}`,
      removalPolicy: isProd
        ? cdk.RemovalPolicy.RETAIN
        : cdk.RemovalPolicy.DESTROY,
      // autoDeleteObjects: true,
      // versioned: false,
      // publicReadAccess: false,
      // encryption: s3.BucketEncryption.S3_MANAGED,
      cors: [
        {
          allowedMethods: [
            s3.HttpMethods.GET,
            s3.HttpMethods.POST,
            s3.HttpMethods.PUT,
          ],
          allowedOrigins: ["http://localhost:3000"],
          allowedHeaders: ["*"],
        },
      ],
      lifecycleRules: [
        {
          abortIncompleteMultipartUploadAfter: cdk.Duration.days(90),
          transitions: [
            {
              storageClass: s3.StorageClass.INFREQUENT_ACCESS,
              transitionAfter: cdk.Duration.days(60),
            },
          ],
        },
      ],
    });

    this.s3Bucket.grantRead(new iam.AccountRootPrincipal());
  }
}
