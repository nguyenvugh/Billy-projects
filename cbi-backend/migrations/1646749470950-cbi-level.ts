import { MigrationInterface, QueryRunner } from 'typeorm';

export class cbiLevel1646749470950 implements MigrationInterface {
  name = 'cbiLevel1646749470950';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "cbi-levels" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "level" smallint NOT NULL DEFAULT '1', "auto_calculate_score" integer NOT NULL DEFAULT '1', "cbi_id" uuid NOT NULL, CONSTRAINT "PK_1a604fde3852884b6e336d01f22" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "cbi-levels" ADD CONSTRAINT "FK_392bec7cf8ec8a202da4085a634" FOREIGN KEY ("cbi_id") REFERENCES "cbis"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "cbi-levels" DROP CONSTRAINT "FK_392bec7cf8ec8a202da4085a634"`,
    );
    await queryRunner.query(`DROP TABLE "cbi-levels"`);
  }
}
