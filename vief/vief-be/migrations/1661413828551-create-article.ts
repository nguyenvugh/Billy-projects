import {MigrationInterface, QueryRunner} from "typeorm";

export class createArticle1661413828551 implements MigrationInterface {
    name = 'createArticle1661413828551'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "articles" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL DEFAULT '1', "id" SERIAL NOT NULL, "author" character varying NOT NULL, "public_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "isFeature" integer NOT NULL, "field" character varying NOT NULL, "thumbnail_id" integer, "category_id" integer, CONSTRAINT "REL_1c6a62f5496d6f9e5646230ef3" UNIQUE ("thumbnail_id"), CONSTRAINT "PK_0a6e2c450d83e0b6052c2793334" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "article_translation" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL DEFAULT '1', "id" SERIAL NOT NULL, "lang" character varying NOT NULL, "title" character varying NOT NULL, "slug" character varying NOT NULL, "shortDesc" character varying NOT NULL, "content" character varying NOT NULL, "article_id" integer, CONSTRAINT "UQ_25a6dceb1ec8ed3b980092e2496" UNIQUE ("slug"), CONSTRAINT "PK_9c0f188230f3af88557df23a886" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "files" ADD "article_id" integer`);
        await queryRunner.query(`ALTER TABLE "files" ADD CONSTRAINT "FK_c4f8d517ff08b8acccebb39b59d" FOREIGN KEY ("article_id") REFERENCES "articles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "articles" ADD CONSTRAINT "FK_1c6a62f5496d6f9e5646230ef3c" FOREIGN KEY ("thumbnail_id") REFERENCES "files"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "articles" ADD CONSTRAINT "FK_e025eeefcdb2a269c42484ee43f" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "article_translation" ADD CONSTRAINT "FK_cda6a53008fc816fdbe004a5c3f" FOREIGN KEY ("article_id") REFERENCES "articles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "article_translation" DROP CONSTRAINT "FK_cda6a53008fc816fdbe004a5c3f"`);
        await queryRunner.query(`ALTER TABLE "articles" DROP CONSTRAINT "FK_e025eeefcdb2a269c42484ee43f"`);
        await queryRunner.query(`ALTER TABLE "articles" DROP CONSTRAINT "FK_1c6a62f5496d6f9e5646230ef3c"`);
        await queryRunner.query(`ALTER TABLE "files" DROP CONSTRAINT "FK_c4f8d517ff08b8acccebb39b59d"`);
        await queryRunner.query(`ALTER TABLE "files" DROP COLUMN "article_id"`);
        await queryRunner.query(`DROP TABLE "article_translation"`);
        await queryRunner.query(`DROP TABLE "articles"`);
    }

}
