import { MigrationInterface, QueryRunner } from 'typeorm';

export class addColumnTypeIntoConfigOxfam1648726653059
  implements MigrationInterface
{
  name = 'addColumnTypeIntoConfigOxfam1648726653059';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "config_oxfam" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "config_oxfam" ADD "deleted_at" TIMESTAMP WITH TIME ZONE`,
    );
    await queryRunner.query(
      `ALTER TABLE "config_oxfam" ADD "version" integer NOT NULL DEFAULT '1'`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."config_oxfam_type_enum" AS ENUM('FORM', 'PAGE')`,
    );
    await queryRunner.query(
      `ALTER TABLE "config_oxfam" ADD "type" "public"."config_oxfam_type_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "config_oxfam" ALTER COLUMN "value" SET NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "config_oxfam" ALTER COLUMN "value" DROP NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "config_oxfam" DROP COLUMN "type"`);
    await queryRunner.query(`DROP TYPE "public"."config_oxfam_type_enum"`);
    await queryRunner.query(`ALTER TABLE "config_oxfam" DROP COLUMN "version"`);
    await queryRunner.query(
      `ALTER TABLE "config_oxfam" DROP COLUMN "deleted_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "config_oxfam" DROP COLUMN "created_at"`,
    );
  }
}
