import { MigrationInterface, QueryRunner } from 'typeorm';

export class alterCbiQuestionChangeScoreToMandatory1647911761574
  implements MigrationInterface
{
  name = 'alterCbiQuestionChangeScoreToMandatory1647911761574';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "cbi-question-option-values" ALTER COLUMN "score" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "cbi-question-option-values" ALTER COLUMN "score" SET DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "cbi-questions" ALTER COLUMN "total_scores" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "cbi-questions" ALTER COLUMN "total_scores" SET DEFAULT '0'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "cbi-questions" ALTER COLUMN "total_scores" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "cbi-questions" ALTER COLUMN "total_scores" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "cbi-question-option-values" ALTER COLUMN "score" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "cbi-question-option-values" ALTER COLUMN "score" DROP NOT NULL`,
    );
  }
}
