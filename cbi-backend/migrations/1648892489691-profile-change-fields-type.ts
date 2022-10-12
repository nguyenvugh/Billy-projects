import { MigrationInterface, QueryRunner } from 'typeorm';

export class profileChangeFieldsType1648892489691
  implements MigrationInterface
{
  name = 'profileChangeFieldsType1648892489691';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_companies" DROP COLUMN "number_employees"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_companies" ADD "number_employees" bigint NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_companies" DROP COLUMN "revenue"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_companies" ADD "revenue" bigint NOT NULL DEFAULT '0'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_companies" DROP COLUMN "revenue"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_companies" ADD "revenue" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_companies" DROP COLUMN "number_employees"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_companies" ADD "number_employees" integer NOT NULL`,
    );
  }
}
