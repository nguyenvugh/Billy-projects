import {MigrationInterface, QueryRunner} from "typeorm";

export class createBanners1661747735808 implements MigrationInterface {
    name = 'createBanners1661747735808'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "banners" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL DEFAULT '1', "id" SERIAL NOT NULL, "field" character varying NOT NULL, "link" character varying NOT NULL, "image_id" integer, CONSTRAINT "REL_992a25a81b7c212d749a31832f" UNIQUE ("image_id"), CONSTRAINT "PK_e9b186b959296fcb940790d31c3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "banners_translation" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL DEFAULT '1', "id" SERIAL NOT NULL, "lang" character varying NOT NULL, "title" character varying NOT NULL, "subTitle" character varying NOT NULL, "shortDesc" character varying NOT NULL, "bannerId" integer, CONSTRAINT "PK_9a676ce41fc0fa24edc1d863bb4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "banners" ADD CONSTRAINT "FK_992a25a81b7c212d749a31832f8" FOREIGN KEY ("image_id") REFERENCES "files"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "banners_translation" ADD CONSTRAINT "FK_b5a348f8e8cf7b64fc78621d294" FOREIGN KEY ("bannerId") REFERENCES "banners"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "banners_translation" DROP CONSTRAINT "FK_b5a348f8e8cf7b64fc78621d294"`);
        await queryRunner.query(`ALTER TABLE "banners" DROP CONSTRAINT "FK_992a25a81b7c212d749a31832f8"`);
        await queryRunner.query(`DROP TABLE "banners_translation"`);
        await queryRunner.query(`DROP TABLE "banners"`);
    }

}
