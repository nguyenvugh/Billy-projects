import * as cdk from "aws-cdk-lib";
import { NestedStack, NestedStackProps, StackProps } from "aws-cdk-lib";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as rds from "aws-cdk-lib/aws-rds";
import { StorageType } from "aws-cdk-lib/aws-rds";
import { Construct } from "constructs";

interface RdsStackProps extends NestedStackProps, StackProps {
  deploymentEnvironment: "dev" | "prod" | "staging";
  vpc: ec2.Vpc | ec2.IVpc;
}

/**
 * Name database is not allowed snake case or start with number
 */

export class RdsStack extends NestedStack {
  public dbInstance: rds.DatabaseInstance;

  constructor(scope: Construct, id: string, props: RdsStackProps) {
    super(scope, id, props);

    const instanceIdentifier = `${props.stackName}-db`;
    const vpc = props.vpc;
    this.dbInstance = new rds.DatabaseInstance(this, "db-instance", {
      vpc,
      vpcSubnets: {
        subnets: [...vpc.privateSubnets, ...vpc.publicSubnets],
      },
      engine: rds.DatabaseInstanceEngine.postgres({
        version: rds.PostgresEngineVersion.VER_13_5,
      }),
      instanceType: ec2.InstanceType.of(
        ec2.InstanceClass.BURSTABLE3,
        ec2.InstanceSize.MICRO
      ),
      storageType: StorageType.STANDARD,
      credentials: rds.Credentials.fromGeneratedSecret("postgres"),
      multiAz: false,
      allocatedStorage: 100,
      // maxAllocatedStorage: 105,
      allowMajorVersionUpgrade: false,
      autoMinorVersionUpgrade: true,
      backupRetention: cdk.Duration.days(7),
      // deleteAutomatedBackups: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      deletionProtection: false,
      instanceIdentifier,
      publiclyAccessible: true,
      port: 5432,
    });
  }
}
