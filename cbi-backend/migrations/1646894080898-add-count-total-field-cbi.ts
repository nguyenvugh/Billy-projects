import {MigrationInterface, QueryRunner} from "typeorm";

export class addCountTotalFieldCbi1646894080898 implements MigrationInterface {
    name = 'addCountTotalFieldCbi1646894080898'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cbi-questions" ADD "total_scores" smallint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "cbi-levels" ADD "total_questions" smallint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "cbis" ADD "total_levels" smallint NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cbis" DROP COLUMN "total_levels"`);
        await queryRunner.query(`ALTER TABLE "cbi-levels" DROP COLUMN "total_questions"`);
        await queryRunner.query(`ALTER TABLE "cbi-questions" DROP COLUMN "total_scores"`);
    }

}
