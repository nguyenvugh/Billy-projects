import {MigrationInterface, QueryRunner} from "typeorm";

export class createEvent1661845743744 implements MigrationInterface {
    name = 'createEvent1661845743744'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "register_info" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL DEFAULT '1', "id" SERIAL NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "fullName" character varying NOT NULL, CONSTRAINT "PK_c5bf0eab482ba04a277dbc382de" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "events_to_register_info" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL DEFAULT '1', "id" SERIAL NOT NULL, "event_id" integer, "register_info_id" integer, CONSTRAINT "PK_4f7993444c95e02de42696536e5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "events" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL DEFAULT '1', "id" SERIAL NOT NULL, "field" character varying NOT NULL, "location" character varying NOT NULL, "timeStart" TIMESTAMP WITH TIME ZONE NOT NULL, "isFeature" integer NOT NULL, "thumbnail_id" integer, CONSTRAINT "REL_54f162a8f53ac3a3c7e7b815fe" UNIQUE ("thumbnail_id"), CONSTRAINT "PK_40731c7151fe4be3116e45ddf73" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "events_translation" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL DEFAULT '1', "id" SERIAL NOT NULL, "lang" character varying NOT NULL, "title" character varying NOT NULL, "slug" character varying NOT NULL, "shortDesc" character varying NOT NULL, "content" character varying NOT NULL, "event_id" integer, CONSTRAINT "UQ_3a59755659c12b6d4ccf47d48b0" UNIQUE ("slug"), CONSTRAINT "PK_a31b481a7aca315552291039198" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "events_to_register_info" ADD CONSTRAINT "FK_d4e441b282683b79c30cc067929" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "events_to_register_info" ADD CONSTRAINT "FK_437e33237cea7c17176508ba58c" FOREIGN KEY ("register_info_id") REFERENCES "register_info"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "events" ADD CONSTRAINT "FK_54f162a8f53ac3a3c7e7b815fea" FOREIGN KEY ("thumbnail_id") REFERENCES "files"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "events_translation" ADD CONSTRAINT "FK_0bfeb51b629c60ba48da50f23b1" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "events_translation" DROP CONSTRAINT "FK_0bfeb51b629c60ba48da50f23b1"`);
        await queryRunner.query(`ALTER TABLE "events" DROP CONSTRAINT "FK_54f162a8f53ac3a3c7e7b815fea"`);
        await queryRunner.query(`ALTER TABLE "events_to_register_info" DROP CONSTRAINT "FK_437e33237cea7c17176508ba58c"`);
        await queryRunner.query(`ALTER TABLE "events_to_register_info" DROP CONSTRAINT "FK_d4e441b282683b79c30cc067929"`);
        await queryRunner.query(`DROP TABLE "events_translation"`);
        await queryRunner.query(`DROP TABLE "events"`);
        await queryRunner.query(`DROP TABLE "events_to_register_info"`);
        await queryRunner.query(`DROP TABLE "register_info"`);
    }

}
