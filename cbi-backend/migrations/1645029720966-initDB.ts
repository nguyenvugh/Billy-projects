import {MigrationInterface, QueryRunner} from "typeorm";

export class initDB1645029720966 implements MigrationInterface {
    name = 'initDB1645029720966'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "file-admin" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL DEFAULT '1', "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "key" character varying NOT NULL, "bucket" character varying NOT NULL, "type" character varying NOT NULL DEFAULT 'images', "size" integer NOT NULL DEFAULT '0', "verified" integer NOT NULL DEFAULT '0', "uploader_id" uuid NOT NULL, CONSTRAINT "UQ_eab066c026c37f69030c4abaa26" UNIQUE ("key"), CONSTRAINT "PK_41079d24ffec9e704bbadc11942" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_eab066c026c37f69030c4abaa2" ON "file-admin" ("key") `);
        await queryRunner.query(`CREATE TYPE "public"."user_status_enum" AS ENUM('ACTIVE', 'INACTIVE', 'PENDING')`);
        await queryRunner.query(`CREATE TABLE "user" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL DEFAULT '1', "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" text, "email" character varying NOT NULL, "full_name" character varying, "encrypted_password" character varying, "phone_number" character varying, "status" "public"."user_status_enum" NOT NULL DEFAULT 'PENDING', CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "article-translations" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL DEFAULT '1', "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "lang" character varying NOT NULL DEFAULT 'en', "title" character varying NOT NULL, "content" character varying NOT NULL, "article_id" uuid NOT NULL, "slug" character varying(255) NOT NULL, CONSTRAINT "UQ_eeb1256af7587afd82306b9aef2" UNIQUE ("slug"), CONSTRAINT "PK_a78b9184c26b8389599a5026df9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_11e8d59fa16045db20a5f3919c" ON "article-translations" ("title") `);
        await queryRunner.query(`CREATE INDEX "IDX_9de97dc6fc1042142ea427b038" ON "article-translations" ("content") `);
        await queryRunner.query(`CREATE INDEX "IDX_eeb1256af7587afd82306b9aef" ON "article-translations" ("slug") `);
        await queryRunner.query(`CREATE TABLE "articles" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL DEFAULT '1', "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "publish_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "is_feature" integer NOT NULL DEFAULT '0', "status" character varying NOT NULL DEFAULT 'DRAF', "thumbnail_id" uuid NOT NULL, "creator_id" uuid NOT NULL, CONSTRAINT "PK_0a6e2c450d83e0b6052c2793334" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "article-to-category" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL DEFAULT '1', "article_id" uuid NOT NULL, "article_category_id" uuid NOT NULL, CONSTRAINT "PK_95a4c6ece1996626620e2e952d7" PRIMARY KEY ("article_id", "article_category_id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_ARTICLE_TO_CATEGORY_1" ON "article-to-category" ("article_id", "article_category_id") WHERE deleted_at IS NULL`);
        await queryRunner.query(`CREATE TABLE "article-category-translations" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL DEFAULT '1', "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "lang" character varying NOT NULL DEFAULT 'en', "name" character varying NOT NULL, "article_category_id" uuid NOT NULL, "slug" character varying(255) NOT NULL, CONSTRAINT "UQ_c91b8602f11e17d4ff52bb05bbe" UNIQUE ("slug"), CONSTRAINT "UQ_ARTICLE_CATE_TRANSLATE_1" UNIQUE ("article_category_id", "lang"), CONSTRAINT "CHK_ARTICLE_CATE_TRANSLATE_1" CHECK ("lang" IN ('vi', 'en')), CONSTRAINT "PK_a26f18ab07e0e57b6c03eb39144" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_7e7d63c8316a3df55b710827bf" ON "article-category-translations" ("name") `);
        await queryRunner.query(`CREATE INDEX "IDX_c91b8602f11e17d4ff52bb05bb" ON "article-category-translations" ("slug") `);
        await queryRunner.query(`CREATE TABLE "article-categories" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL DEFAULT '1', "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "creator_id" uuid NOT NULL, CONSTRAINT "PK_fabc694f899441f7af46dafd443" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "file-admin" ADD CONSTRAINT "FK_9856e0d0c56fc288a538b7c494e" FOREIGN KEY ("uploader_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "article-translations" ADD CONSTRAINT "FK_c96d8f92bd8393f820e44167770" FOREIGN KEY ("article_id") REFERENCES "articles"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "articles" ADD CONSTRAINT "FK_1c6a62f5496d6f9e5646230ef3c" FOREIGN KEY ("thumbnail_id") REFERENCES "file-admin"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "articles" ADD CONSTRAINT "FK_74e9df7efa1ee0059fa8b03f9ef" FOREIGN KEY ("creator_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "article-to-category" ADD CONSTRAINT "FK_fc0f6e77d82d2bfd51bf67fde1a" FOREIGN KEY ("article_id") REFERENCES "articles"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "article-to-category" ADD CONSTRAINT "FK_42a46aa864cfd311d6abd9aa31b" FOREIGN KEY ("article_category_id") REFERENCES "article-categories"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "article-category-translations" ADD CONSTRAINT "FK_1a6a68032888fe9426327decbc5" FOREIGN KEY ("article_category_id") REFERENCES "article-categories"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "article-categories" ADD CONSTRAINT "FK_b4637e8d60e6d2961fd7cd70bcc" FOREIGN KEY ("creator_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "article-categories" DROP CONSTRAINT "FK_b4637e8d60e6d2961fd7cd70bcc"`);
        await queryRunner.query(`ALTER TABLE "article-category-translations" DROP CONSTRAINT "FK_1a6a68032888fe9426327decbc5"`);
        await queryRunner.query(`ALTER TABLE "article-to-category" DROP CONSTRAINT "FK_42a46aa864cfd311d6abd9aa31b"`);
        await queryRunner.query(`ALTER TABLE "article-to-category" DROP CONSTRAINT "FK_fc0f6e77d82d2bfd51bf67fde1a"`);
        await queryRunner.query(`ALTER TABLE "articles" DROP CONSTRAINT "FK_74e9df7efa1ee0059fa8b03f9ef"`);
        await queryRunner.query(`ALTER TABLE "articles" DROP CONSTRAINT "FK_1c6a62f5496d6f9e5646230ef3c"`);
        await queryRunner.query(`ALTER TABLE "article-translations" DROP CONSTRAINT "FK_c96d8f92bd8393f820e44167770"`);
        await queryRunner.query(`ALTER TABLE "file-admin" DROP CONSTRAINT "FK_9856e0d0c56fc288a538b7c494e"`);
        await queryRunner.query(`DROP TABLE "article-categories"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c91b8602f11e17d4ff52bb05bb"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7e7d63c8316a3df55b710827bf"`);
        await queryRunner.query(`DROP TABLE "article-category-translations"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ARTICLE_TO_CATEGORY_1"`);
        await queryRunner.query(`DROP TABLE "article-to-category"`);
        await queryRunner.query(`DROP TABLE "articles"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_eeb1256af7587afd82306b9aef"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9de97dc6fc1042142ea427b038"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_11e8d59fa16045db20a5f3919c"`);
        await queryRunner.query(`DROP TABLE "article-translations"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_status_enum"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_eab066c026c37f69030c4abaa2"`);
        await queryRunner.query(`DROP TABLE "file-admin"`);
    }

}
