import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateUserCompany1649581062576 implements MigrationInterface {
  name = 'updateUserCompany1649581062576';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_companies" ADD "date_create_company" TIMESTAMP WITH TIME ZONE`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_companies" ADD "num_unofficial_employees" integer NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_companies" ADD "model_manufactoring" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_companies" ADD "size_manufactoring" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_companies" ADD "material_area" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_companies" ADD "is_apply_working_diary" integer NOT NULL DEFAULT '-1'`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_companies" ADD "is_apply_digital" integer NOT NULL DEFAULT '-1'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_companies" DROP COLUMN "is_apply_digital"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_companies" DROP COLUMN "is_apply_working_diary"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_companies" DROP COLUMN "material_area"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_companies" DROP COLUMN "size_manufactoring"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_companies" DROP COLUMN "model_manufactoring"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_companies" DROP COLUMN "num_unofficial_employees"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_companies" DROP COLUMN "date_create_company"`,
    );
  }
}
