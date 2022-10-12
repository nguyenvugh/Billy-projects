import { MigrationInterface, QueryRunner } from 'typeorm';

export class alterCbiQuestionOptionAddOrderDisplay1648794890219
  implements MigrationInterface
{
  name = 'alterCbiQuestionOptionAddOrderDisplay1648794890219';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "cbi-question-option-values" ADD "order_display" smallint NOT NULL DEFAULT '1'`,
    );
    await queryRunner.query(
      `ALTER TABLE "cbi-question-options" ADD "order_display" smallint NOT NULL DEFAULT '1'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "cbi-question-options" DROP COLUMN "order_display"`,
    );
    await queryRunner.query(
      `ALTER TABLE "cbi-question-option-values" DROP COLUMN "order_display"`,
    );
  }
}
