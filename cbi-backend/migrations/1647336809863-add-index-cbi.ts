import {MigrationInterface, QueryRunner} from "typeorm";

export class addIndexCbi1647336809863 implements MigrationInterface {
    name = 'addIndexCbi1647336809863'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_298c78123492cabe577959b85b" ON "cbi-questions" ("cbi_level_group_id", "title") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_8849da20552316f5b6e915dbe9" ON "cbi-level-groups" ("cbi_level_id", "name") `);
        await queryRunner.query(`CREATE INDEX "IDX_31737c9fc83689a4519f09d524" ON "cbis" ("name") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_31737c9fc83689a4519f09d524"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8849da20552316f5b6e915dbe9"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_298c78123492cabe577959b85b"`);
    }

}
