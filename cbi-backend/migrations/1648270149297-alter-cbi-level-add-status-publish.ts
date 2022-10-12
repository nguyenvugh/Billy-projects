import { MigrationInterface, QueryRunner } from 'typeorm';

export class alterCbiLevelAddStatusPublish1648270149297
  implements MigrationInterface
{
  name = 'alterCbiLevelAddStatusPublish1648270149297';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "cbi-levels" ADD "status_publish" integer NOT NULL DEFAULT '-1'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "cbi-levels" DROP COLUMN "status_publish"`,
    );
  }
}
