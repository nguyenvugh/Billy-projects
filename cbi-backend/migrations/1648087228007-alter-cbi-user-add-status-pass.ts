import { MigrationInterface, QueryRunner } from 'typeorm';

export class alterCbiUserAddStatusPass1648087228007
  implements MigrationInterface
{
  name = 'alterCbiUserAddStatusPass1648087228007';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "cbi_users" ADD "status_pass" integer NOT NULL DEFAULT '-1'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "cbi_users" DROP COLUMN "status_pass"`,
    );
  }
}
