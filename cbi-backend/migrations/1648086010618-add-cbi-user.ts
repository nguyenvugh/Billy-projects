import { MigrationInterface, QueryRunner } from 'typeorm';

export class addCbiUser1648086010618 implements MigrationInterface {
  name = 'addCbiUser1648086010618';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "cbi_users" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "total_scores" numeric NOT NULL DEFAULT '0', "title_earned" text, "time_to_test_again" TIMESTAMP WITH TIME ZONE, "user_id" uuid NOT NULL, "cbi_id" uuid NOT NULL, CONSTRAINT "PK_bd56966efb0ce231389a73c389d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "cbi_user_question_answers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "score" numeric, "content_answer" text, "cbi_user_level_id" uuid NOT NULL, "cbi_question_id" uuid NOT NULL, "cbi_question_option_id" uuid NOT NULL, "cbi_question_option_value_id" uuid NOT NULL, CONSTRAINT "PK_9ff8050bbcd8b1b9800f459b2d3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "cbi_user_levels" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "total_scores" numeric NOT NULL DEFAULT '0', "status_finish" integer NOT NULL DEFAULT '1', "status_admin_calculate_score" integer, "cbi_user_id" uuid NOT NULL, "cbi_level_id" uuid NOT NULL, "updated_by" uuid, CONSTRAINT "PK_800159cff7c9291eb817492b78a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "cbi_users" ADD CONSTRAINT "FK_9b729debb19c6527cef96aa32f1" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "cbi_users" ADD CONSTRAINT "FK_bc22b506e83ca2d46dc67362410" FOREIGN KEY ("cbi_id") REFERENCES "cbis"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "cbi_user_question_answers" ADD CONSTRAINT "FK_558ea719a55eb729d43ee769f02" FOREIGN KEY ("cbi_user_level_id") REFERENCES "cbi_user_levels"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "cbi_user_question_answers" ADD CONSTRAINT "FK_6bc741328ad54b6bdcc26b23dbe" FOREIGN KEY ("cbi_question_id") REFERENCES "cbi-questions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "cbi_user_question_answers" ADD CONSTRAINT "FK_97a54d508ec1ec032bb36d25bab" FOREIGN KEY ("cbi_question_option_id") REFERENCES "cbi-question-options"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "cbi_user_question_answers" ADD CONSTRAINT "FK_7d09d5d3f582d93594f999c1d2c" FOREIGN KEY ("cbi_question_option_value_id") REFERENCES "cbi-question-option-values"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "cbi_user_levels" ADD CONSTRAINT "FK_edef8b5b0168b56b8aa51e66d5d" FOREIGN KEY ("cbi_user_id") REFERENCES "cbi_users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "cbi_user_levels" ADD CONSTRAINT "FK_e7c3c1b1a3d388db14ba8dd346c" FOREIGN KEY ("cbi_level_id") REFERENCES "cbi-levels"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "cbi_user_levels" ADD CONSTRAINT "FK_d5dc69e998bba52822d7b896664" FOREIGN KEY ("updated_by") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "cbi_user_levels" DROP CONSTRAINT "FK_d5dc69e998bba52822d7b896664"`,
    );
    await queryRunner.query(
      `ALTER TABLE "cbi_user_levels" DROP CONSTRAINT "FK_e7c3c1b1a3d388db14ba8dd346c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "cbi_user_levels" DROP CONSTRAINT "FK_edef8b5b0168b56b8aa51e66d5d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "cbi_user_question_answers" DROP CONSTRAINT "FK_7d09d5d3f582d93594f999c1d2c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "cbi_user_question_answers" DROP CONSTRAINT "FK_97a54d508ec1ec032bb36d25bab"`,
    );
    await queryRunner.query(
      `ALTER TABLE "cbi_user_question_answers" DROP CONSTRAINT "FK_6bc741328ad54b6bdcc26b23dbe"`,
    );
    await queryRunner.query(
      `ALTER TABLE "cbi_user_question_answers" DROP CONSTRAINT "FK_558ea719a55eb729d43ee769f02"`,
    );
    await queryRunner.query(
      `ALTER TABLE "cbi_users" DROP CONSTRAINT "FK_bc22b506e83ca2d46dc67362410"`,
    );
    await queryRunner.query(
      `ALTER TABLE "cbi_users" DROP CONSTRAINT "FK_9b729debb19c6527cef96aa32f1"`,
    );
    await queryRunner.query(`DROP TABLE "cbi_user_levels"`);
    await queryRunner.query(`DROP TABLE "cbi_user_question_answers"`);
    await queryRunner.query(`DROP TABLE "cbi_users"`);
  }
}
