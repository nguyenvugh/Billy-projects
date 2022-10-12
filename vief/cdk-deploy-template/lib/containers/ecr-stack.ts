import { NestedStack, NestedStackProps, StackProps } from "aws-cdk-lib";
import * as ecr from "aws-cdk-lib/aws-ecr";
import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";

interface EcrStackProps extends NestedStackProps, StackProps {
  deploymentEnvironment: "dev" | "prod" | "staging";
}

// https://bobbyhadz.com/blog/aws-cdk-s3-bucket-example
export class EcrStack extends NestedStack {
  public readonly ecrRepo: ecr.Repository;

  constructor(scope: Construct, id: string, props: EcrStackProps) {
    super(scope, id, props);

    this.ecrRepo = new ecr.Repository(this, "Repository", {
      repositoryName: `${props.stackName}-backend-repo`,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });
    this.ecrRepo.addLifecycleRule({
      maxImageCount: 3,
    });
  }
}
