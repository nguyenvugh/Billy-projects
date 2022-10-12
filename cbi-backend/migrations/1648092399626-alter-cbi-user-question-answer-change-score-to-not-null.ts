import { MigrationInterface, QueryRunner } from 'typeorm';

export class alterCbiUserQuestionAnswerChangeScoreToNotNull1648092399626
  implements MigrationInterface
{
  name = 'alterCbiUserQuestionAnswerChangeScoreToNotNull1648092399626';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "cbi_user_question_answers" ALTER COLUMN "score" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "cbi_user_question_answers" ALTER COLUMN "score" SET DEFAULT '0'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "cbi_user_question_answers" ALTER COLUMN "score" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "cbi_user_question_answers" ALTER COLUMN "score" DROP NOT NULL`,
    );
  }
}
