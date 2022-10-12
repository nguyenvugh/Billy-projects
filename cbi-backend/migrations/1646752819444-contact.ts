import {MigrationInterface, QueryRunner} from "typeorm";

export class contact1646752819444 implements MigrationInterface {
    name = 'contact1646752819444'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "contact" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL DEFAULT '1', "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "phone" character varying NOT NULL, "email" character varying NOT NULL, "content" character varying NOT NULL, CONSTRAINT "PK_2cbbe00f59ab6b3bb5b8d19f989" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "contact"`);
    }

}
