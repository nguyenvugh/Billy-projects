import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateUserSetupAuthenticate1663584528647
  implements MigrationInterface
{
  name = 'updateUserSetupAuthenticate1663584528647';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "firId" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "UQ_e4977acc4c96d7efb590f5d02a2"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "UQ_e4977acc4c96d7efb590f5d02a2" UNIQUE ("firId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "firId" SET NOT NULL`,
    );
  }
}
