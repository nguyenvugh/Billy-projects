import { MigrationInterface, QueryRunner } from 'typeorm';

export class configOxfarmAddUpdateAt1648645541110
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "config_oxfam" ADD "name" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "config_oxfam" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "config_oxfam" DROP COLUMN "updated_at"`,
    );
    await queryRunner.query(`ALTER TABLE "config_oxfam" DROP COLUMN "name"`);
  }
}
