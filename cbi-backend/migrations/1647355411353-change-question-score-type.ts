import {MigrationInterface, QueryRunner} from "typeorm";

export class changeQuestionScoreType1647355411353 implements MigrationInterface {
    name = 'changeQuestionScoreType1647355411353'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cbi-question-option-values" DROP COLUMN "score"`);
        await queryRunner.query(`ALTER TABLE "cbi-question-option-values" ADD "score" numeric`);
        await queryRunner.query(`ALTER TABLE "cbi-questions" DROP COLUMN "total_scores"`);
        await queryRunner.query(`ALTER TABLE "cbi-questions" ADD "total_scores" numeric`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cbi-questions" DROP COLUMN "total_scores"`);
        await queryRunner.query(`ALTER TABLE "cbi-questions" ADD "total_scores" smallint`);
        await queryRunner.query(`ALTER TABLE "cbi-question-option-values" DROP COLUMN "score"`);
        await queryRunner.query(`ALTER TABLE "cbi-question-option-values" ADD "score" smallint`);
    }

}
