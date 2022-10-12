import {MigrationInterface, QueryRunner} from "typeorm";

export class cbi1646732394242 implements MigrationInterface {
    name = 'cbi1646732394242'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cbis" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "description" text NOT NULL, "thumbnail_id" uuid NOT NULL, CONSTRAINT "PK_dc3e2d03d6f0a970f5b713c9182" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "cbis" ADD CONSTRAINT "FK_cdaa8723ced98be3b0851283f2f" FOREIGN KEY ("thumbnail_id") REFERENCES "file-admin"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cbis" DROP CONSTRAINT "FK_cdaa8723ced98be3b0851283f2f"`);
        await queryRunner.query(`DROP TABLE "cbis"`);
    }

}
