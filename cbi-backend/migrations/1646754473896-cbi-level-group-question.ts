import {MigrationInterface, QueryRunner} from "typeorm";

export class cbiLevelGroupQuestion1646754473896 implements MigrationInterface {
    name = 'cbiLevelGroupQuestion1646754473896'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cbi-question-option-values" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" text NOT NULL, "score" smallint, "status_right_option_value" integer, "cbi_question_option_id" uuid NOT NULL, CONSTRAINT "PK_8e3feadbddf9509308d672cbc4d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cbi-question-options" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" integer NOT NULL, "cbi_question_id" uuid NOT NULL, CONSTRAINT "PK_afac90ca4953a75040610bc557d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_322c8a498cc397c90d0da0eb41" ON "cbi-question-options" ("type") `);
        await queryRunner.query(`CREATE TABLE "cbi-questions" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" text NOT NULL, "cbi_level_group_id" uuid NOT NULL, CONSTRAINT "PK_22203eb7a6e53bce5114b44e329" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cbi-level-groups" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "description" text, "cbi_level_id" uuid NOT NULL, CONSTRAINT "PK_ccfc2e807d7ab9cb1be2719a393" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_71cd164e1a3d1108c013f2791a" ON "cbi-levels" ("cbi_id", "name") `);
        await queryRunner.query(`ALTER TABLE "cbi-question-option-values" ADD CONSTRAINT "FK_bb1bf440ae88007ef5a1f4b95ca" FOREIGN KEY ("cbi_question_option_id") REFERENCES "cbi-question-options"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cbi-question-options" ADD CONSTRAINT "FK_76d98a4d322a81b96b13e49bf27" FOREIGN KEY ("cbi_question_id") REFERENCES "cbi-questions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cbi-questions" ADD CONSTRAINT "FK_e39ae2a38ce37fa09b10932272d" FOREIGN KEY ("cbi_level_group_id") REFERENCES "cbi-level-groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cbi-level-groups" ADD CONSTRAINT "FK_06f560104965d0c112885319dad" FOREIGN KEY ("cbi_level_id") REFERENCES "cbi-levels"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cbi-level-groups" DROP CONSTRAINT "FK_06f560104965d0c112885319dad"`);
        await queryRunner.query(`ALTER TABLE "cbi-questions" DROP CONSTRAINT "FK_e39ae2a38ce37fa09b10932272d"`);
        await queryRunner.query(`ALTER TABLE "cbi-question-options" DROP CONSTRAINT "FK_76d98a4d322a81b96b13e49bf27"`);
        await queryRunner.query(`ALTER TABLE "cbi-question-option-values" DROP CONSTRAINT "FK_bb1bf440ae88007ef5a1f4b95ca"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_71cd164e1a3d1108c013f2791a"`);
        await queryRunner.query(`DROP TABLE "cbi-level-groups"`);
        await queryRunner.query(`DROP TABLE "cbi-questions"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_322c8a498cc397c90d0da0eb41"`);
        await queryRunner.query(`DROP TABLE "cbi-question-options"`);
        await queryRunner.query(`DROP TABLE "cbi-question-option-values"`);
    }

}
