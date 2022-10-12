import { MigrationInterface, QueryRunner } from 'typeorm';

export class addCreateTimestampQuestionOption1647499897441
  implements MigrationInterface
{
  name = 'addCreateTimestampQuestionOption1647499897441';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "cbi-question-option-values" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "cbi-question-options" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "cbi-question-options" DROP COLUMN "created_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "cbi-question-option-values" DROP COLUMN "created_at"`,
    );
  }
}
