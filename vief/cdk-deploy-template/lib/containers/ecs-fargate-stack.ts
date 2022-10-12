import { NestedStack, NestedStackProps, StackProps } from "aws-cdk-lib";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as ecs from "aws-cdk-lib/aws-ecs";
import * as ecr from "aws-cdk-lib/aws-ecr";
import * as ecsPatterns from "aws-cdk-lib/aws-ecs-patterns";
import { Construct } from "constructs";
import * as sm from "aws-cdk-lib/aws-secretsmanager";
import { Secret } from "aws-cdk-lib/aws-ecs";
import * as iam from "aws-cdk-lib/aws-iam";

interface EcsFargateStackProps extends NestedStackProps, StackProps {
  deploymentEnvironment: "dev" | "prod" | "staging";
  vpc: ec2.Vpc | ec2.IVpc;
}

// https://bobbyhadz.com/blog/aws-cdk-s3-bucket-example
export class EcsFargateStack extends NestedStack {
  public ecsFargate: ecsPatterns.ApplicationLoadBalancedFargateService;
  public cluster: ecs.Cluster;

  constructor(scope: Construct, id: string, props: EcsFargateStackProps) {
    super(scope, id, props);

    this.cluster = new ecs.Cluster(this, `${props.stackName}-backend-cluster`, {
      clusterName: `${props.stackName}-backend-cluster`,
      // containerInsights: true,
      vpc: props.vpc,
    });

    const repository = ecr.Repository.fromRepositoryName(
      this,
      "EcrRepository",
      `${props.stackName}-backend-repo`
    );
    const image = ecs.ContainerImage.fromEcrRepository(repository, "1");

    this.ecsFargate = new ecsPatterns.ApplicationLoadBalancedFargateService(
      this,
      `${props.stackName}-backend-service`,
      {
        serviceName: `${props.stackName}-backend-service`,
        loadBalancerName: `${props.stackName}-backend-alb`,
        cluster: this.cluster,
        cpu: 256,
        desiredCount: 1,
        taskImageOptions: {
          image,
          family: `${props.stackName}-backend-task-def`,
          containerName: `${props.stackName}-backend-container`,
          containerPort: 5000,
        },
        platformVersion: ecs.FargatePlatformVersion.VERSION1_4,
        memoryLimitMiB: 512,
        publicLoadBalancer: true,
        assignPublicIp: true,
      }
    );
  }
}
