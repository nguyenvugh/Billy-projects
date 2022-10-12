import {MigrationInterface, QueryRunner} from "typeorm";

export class updateArticle1645505098321 implements MigrationInterface {
    name = 'updateArticle1645505098321'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "article-to-category" DROP CONSTRAINT "FK_42a46aa864cfd311d6abd9aa31b"`);
        await queryRunner.query(`ALTER TABLE "article-to-category" DROP CONSTRAINT "FK_fc0f6e77d82d2bfd51bf67fde1a"`);
        await queryRunner.query(`ALTER TABLE "articles" ADD "author_name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "articles" ADD "article_category_id" uuid`);
        await queryRunner.query(`ALTER TABLE "article-categories" ADD "articlesId" uuid`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ARTICLE_TO_CATEGORY_1"`);
        await queryRunner.query(`ALTER TABLE "article-to-category" DROP CONSTRAINT "PK_95a4c6ece1996626620e2e952d7"`);
        await queryRunner.query(`ALTER TABLE "article-to-category" ADD CONSTRAINT "PK_42a46aa864cfd311d6abd9aa31b" PRIMARY KEY ("article_category_id")`);
        await queryRunner.query(`ALTER TABLE "article-to-category" DROP COLUMN "article_id"`);
        await queryRunner.query(`ALTER TABLE "article-to-category" ADD "article_id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "article-to-category" DROP CONSTRAINT "PK_42a46aa864cfd311d6abd9aa31b"`);
        await queryRunner.query(`ALTER TABLE "article-to-category" ADD CONSTRAINT "PK_95a4c6ece1996626620e2e952d7" PRIMARY KEY ("article_category_id", "article_id")`);
        await queryRunner.query(`ALTER TABLE "article-to-category" DROP CONSTRAINT "PK_95a4c6ece1996626620e2e952d7"`);
        await queryRunner.query(`ALTER TABLE "article-to-category" ADD CONSTRAINT "PK_fc0f6e77d82d2bfd51bf67fde1a" PRIMARY KEY ("article_id")`);
        await queryRunner.query(`ALTER TABLE "article-to-category" DROP COLUMN "article_category_id"`);
        await queryRunner.query(`ALTER TABLE "article-to-category" ADD "article_category_id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "article-to-category" DROP CONSTRAINT "PK_fc0f6e77d82d2bfd51bf67fde1a"`);
        await queryRunner.query(`ALTER TABLE "article-to-category" ADD CONSTRAINT "PK_95a4c6ece1996626620e2e952d7" PRIMARY KEY ("article_id", "article_category_id")`);
        await queryRunner.query(`ALTER TABLE "articles" ALTER COLUMN "status" SET DEFAULT 'DRAFT'`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_ARTICLE_TO_CATEGORY_1" ON "article-to-category" ("article_id", "article_category_id") WHERE deleted_at IS NULL`);
        await queryRunner.query(`ALTER TABLE "articles" ADD CONSTRAINT "FK_feb448434916c8db6496848c342" FOREIGN KEY ("article_category_id") REFERENCES "article-categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "article-categories" ADD CONSTRAINT "FK_578503fb1ad1a8300ea984acfbb" FOREIGN KEY ("articlesId") REFERENCES "articles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "article-categories" DROP CONSTRAINT "FK_578503fb1ad1a8300ea984acfbb"`);
        await queryRunner.query(`ALTER TABLE "articles" DROP CONSTRAINT "FK_feb448434916c8db6496848c342"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ARTICLE_TO_CATEGORY_1"`);
        await queryRunner.query(`ALTER TABLE "articles" ALTER COLUMN "status" SET DEFAULT 'DRAF'`);
        await queryRunner.query(`ALTER TABLE "article-to-category" DROP CONSTRAINT "PK_95a4c6ece1996626620e2e952d7"`);
        await queryRunner.query(`ALTER TABLE "article-to-category" ADD CONSTRAINT "PK_fc0f6e77d82d2bfd51bf67fde1a" PRIMARY KEY ("article_id")`);
        await queryRunner.query(`ALTER TABLE "article-to-category" DROP COLUMN "article_category_id"`);
        await queryRunner.query(`ALTER TABLE "article-to-category" ADD "article_category_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "article-to-category" DROP CONSTRAINT "PK_fc0f6e77d82d2bfd51bf67fde1a"`);
        await queryRunner.query(`ALTER TABLE "article-to-category" ADD CONSTRAINT "PK_95a4c6ece1996626620e2e952d7" PRIMARY KEY ("article_category_id", "article_id")`);
        await queryRunner.query(`ALTER TABLE "article-to-category" DROP CONSTRAINT "PK_95a4c6ece1996626620e2e952d7"`);
        await queryRunner.query(`ALTER TABLE "article-to-category" ADD CONSTRAINT "PK_42a46aa864cfd311d6abd9aa31b" PRIMARY KEY ("article_category_id")`);
        await queryRunner.query(`ALTER TABLE "article-to-category" DROP COLUMN "article_id"`);
        await queryRunner.query(`ALTER TABLE "article-to-category" ADD "article_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "article-to-category" DROP CONSTRAINT "PK_42a46aa864cfd311d6abd9aa31b"`);
        await queryRunner.query(`ALTER TABLE "article-to-category" ADD CONSTRAINT "PK_95a4c6ece1996626620e2e952d7" PRIMARY KEY ("article_id", "article_category_id")`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_ARTICLE_TO_CATEGORY_1" ON "article-to-category" ("article_id", "article_category_id") WHERE (deleted_at IS NULL)`);
        await queryRunner.query(`ALTER TABLE "article-categories" DROP COLUMN "articlesId"`);
        await queryRunner.query(`ALTER TABLE "articles" DROP COLUMN "article_category_id"`);
        await queryRunner.query(`ALTER TABLE "articles" DROP COLUMN "author_name"`);
        await queryRunner.query(`ALTER TABLE "article-to-category" ADD CONSTRAINT "FK_fc0f6e77d82d2bfd51bf67fde1a" FOREIGN KEY ("article_id") REFERENCES "articles"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "article-to-category" ADD CONSTRAINT "FK_42a46aa864cfd311d6abd9aa31b" FOREIGN KEY ("article_category_id") REFERENCES "article-categories"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
