import { MigrationInterface, QueryRunner } from 'typeorm';

export class addUniqueGroupPoliciesName1648694641026
  implements MigrationInterface
{
  name = 'addUniqueGroupPoliciesName1648694641026';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "group_policies" ADD CONSTRAINT "UQ_7c566c55e3d0a3dd867acaac6a3" UNIQUE ("name")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "group_policies" DROP CONSTRAINT "UQ_7c566c55e3d0a3dd867acaac6a3"`,
    );
  }
}
