import { MigrationInterface, QueryRunner } from 'typeorm';

export class addUserCompanyCode1649603885019 implements MigrationInterface {
  name = 'addUserCompanyCode1649603885019';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "company_code" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "company_code"`);
  }
}
