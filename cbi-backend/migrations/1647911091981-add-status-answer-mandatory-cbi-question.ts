import { MigrationInterface, QueryRunner } from 'typeorm';

export class addStatusAnswerMandatoryCbiQuestion1647911091981
  implements MigrationInterface
{
  name = 'addStatusAnswerMandatoryCbiQuestion1647911091981';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "cbi-questions" ADD "status_answer_mandatory" integer NOT NULL DEFAULT '1'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "cbi-questions" DROP COLUMN "status_answer_mandatory"`,
    );
  }
}
