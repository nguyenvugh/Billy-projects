import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateAdminSetupAuthenticate1663582393612
  implements MigrationInterface
{
  name = 'updateAdminSetupAuthenticate1663582393612';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "admin" ADD "password" character varying(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "admin" DROP CONSTRAINT "UQ_de87485f6489f5d0995f5841952"`,
    );
    await queryRunner.query(`ALTER TABLE "admin" DROP COLUMN "email"`);
    await queryRunner.query(
      `ALTER TABLE "admin" ADD "email" character varying(255) NOT NULL`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_12b514182639b02db3d3202c6a" ON "admin" ("email", "deleted_at") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_12b514182639b02db3d3202c6a"`,
    );
    await queryRunner.query(`ALTER TABLE "admin" DROP COLUMN "email"`);
    await queryRunner.query(
      `ALTER TABLE "admin" ADD "email" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "admin" ADD CONSTRAINT "UQ_de87485f6489f5d0995f5841952" UNIQUE ("email")`,
    );
    await queryRunner.query(`ALTER TABLE "admin" DROP COLUMN "password"`);
  }
}
