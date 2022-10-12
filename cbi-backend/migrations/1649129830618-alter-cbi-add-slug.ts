import { MigrationInterface, QueryRunner } from 'typeorm';

export class alterCbiAddSlug1649129830618 implements MigrationInterface {
  name = 'alterCbiAddSlug1649129830618';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "cbi-levels" ADD "slug" character varying(255)`,
    );
    await queryRunner.query(
      `ALTER TABLE "cbis" ADD "slug" character varying(255)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_23791f0eda152285a3d98ed42d" ON "cbi-levels" ("slug") `,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_20e4dd1eddeaf19bfb840db36e" ON "cbis" ("slug") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_20e4dd1eddeaf19bfb840db36e"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_23791f0eda152285a3d98ed42d"`,
    );
    await queryRunner.query(`ALTER TABLE "cbis" DROP COLUMN "slug"`);
    await queryRunner.query(`ALTER TABLE "cbi-levels" DROP COLUMN "slug"`);
  }
}
