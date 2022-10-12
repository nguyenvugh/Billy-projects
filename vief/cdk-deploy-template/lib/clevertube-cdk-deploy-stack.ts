import { EcsFargateStack } from "./containers/ecs-fargate-stack";
import { NestedStackProps, Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { S3Stack } from "./containers/s3-stack";
import * as cdk from "aws-cdk-lib";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import { RdsStack } from "./containers/rds-stack";
import * as rds from "aws-cdk-lib/aws-rds";
import { StorageType } from "aws-cdk-lib/aws-rds";
import { EcrStack } from "./containers/ecr-stack";
import { Port, SecurityGroup, SecurityGroupProps } from "aws-cdk-lib/aws-ec2";

// 👇 extend the StackProps interface
interface CleverTubeStackProps extends StackProps {
  deploymentEnvironment: "dev" | "prod" | "staging";
}

export class ClevertubeDeployStack extends Stack {
  constructor(scope: Construct, id: string, props: CleverTubeStackProps) {
    super(scope, id, props);

    const vpc = ec2.Vpc.fromLookup(this, "vpc", {
      isDefault: true,
    });

    const { s3Bucket } = new S3Stack(this, "s3-stack", props);
    new cdk.CfnOutput(this, "s3BucketEndpoint", {
      value: s3Bucket.bucketWebsiteUrl,
    });

    const { ecrRepo } = new EcrStack(this, "ecr-stack", props);
    new cdk.CfnOutput(this, "ecrRepoUri", {
      value: ecrRepo.repositoryUri,
    });

    const extendVpcProps = { ...props, vpc };
    const { dbInstance } = new RdsStack(this, "rds-stack", extendVpcProps);
    new cdk.CfnOutput(this, "dbEndpoint", {
      value: dbInstance.instanceEndpoint.hostname,
    });

    const { ecsFargate, cluster } = new EcsFargateStack(
      this,
      "ecs-fargate-stack",
      extendVpcProps
    );
    const fargateServiceSG = new SecurityGroup(
      this,
      "FargateServiceSecurityGroup",
      { vpc }
    );

    dbInstance.connections.allowFrom(
      fargateServiceSG,
      Port.tcp(5432),
      "Allow from fargate security group"
    );

    new cdk.CfnOutput(this, `${props.deploymentEnvironment}-ecsFargate-dns`, {
      exportName: `${props.deploymentEnvironment}-ecsFargate-dns`,
      value: ecsFargate.loadBalancer.loadBalancerDnsName,
    });
  }
}
