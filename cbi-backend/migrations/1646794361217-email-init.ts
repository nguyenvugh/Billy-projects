import {MigrationInterface, QueryRunner} from "typeorm";

export class emailInit1646794361217 implements MigrationInterface {
    name = 'emailInit1646794361217'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "emails" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL DEFAULT '1', "id" SERIAL NOT NULL, "email" character varying NOT NULL, CONSTRAINT "PK_a54dcebef8d05dca7e839749571" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "emails"`);
    }

}
