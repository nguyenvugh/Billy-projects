import { MigrationInterface, QueryRunner } from 'typeorm';

export class initConfigOxfarm1648645461093 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "config_oxfam" ("key" character varying NOT NULL, "value" jsonb, CONSTRAINT "PK_7fbee22dffb97df449f76808a6d" PRIMARY KEY ("key"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "config_oxfam"`);
  }
}
