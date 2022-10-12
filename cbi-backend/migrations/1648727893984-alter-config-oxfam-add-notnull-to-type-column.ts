import { MigrationInterface, QueryRunner } from 'typeorm';

export class alterConfigOxfamAddNotnullToTypeColumn1648727893984
  implements MigrationInterface
{
  name = 'alterConfigOxfamAddNotnullToTypeColumn1648727893984';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "config_oxfam" ALTER COLUMN "type" SET NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "config_oxfam" ALTER COLUMN "type" DROP NOT NULL`,
    );
  }
}
