import {MigrationInterface, QueryRunner} from "typeorm";

export class createUniqueSlugWithDeletedAt1662346623976 implements MigrationInterface {
    name = 'createUniqueSlugWithDeletedAt1662346623976'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category_translation" DROP CONSTRAINT "FK_63e1ac2bf59c85a5d5a5322c637"`);
        await queryRunner.query(`ALTER TABLE "article_translation" DROP CONSTRAINT "FK_cda6a53008fc816fdbe004a5c3f"`);
        await queryRunner.query(`ALTER TABLE "events_translation" DROP CONSTRAINT "FK_0bfeb51b629c60ba48da50f23b1"`);
        await queryRunner.query(`ALTER TABLE "category_translation" ADD CONSTRAINT "UQ_SLUG_CATEGORY" UNIQUE ("slug", "deleted_at")`);
        await queryRunner.query(`ALTER TABLE "article_translation" ADD CONSTRAINT "UQ_SLUG_ARTICLE" UNIQUE ("slug", "deleted_at")`);
        await queryRunner.query(`ALTER TABLE "events_translation" ADD CONSTRAINT "UQ_SLUG_EVENT" UNIQUE ("slug", "deleted_at")`);
        await queryRunner.query(`ALTER TABLE "category_translation" ADD CONSTRAINT "FK_63e1ac2bf59c85a5d5a5322c637" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "article_translation" ADD CONSTRAINT "FK_cda6a53008fc816fdbe004a5c3f" FOREIGN KEY ("article_id") REFERENCES "articles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "events_translation" ADD CONSTRAINT "FK_0bfeb51b629c60ba48da50f23b1" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "events_translation" DROP CONSTRAINT "FK_0bfeb51b629c60ba48da50f23b1"`);
        await queryRunner.query(`ALTER TABLE "article_translation" DROP CONSTRAINT "FK_cda6a53008fc816fdbe004a5c3f"`);
        await queryRunner.query(`ALTER TABLE "category_translation" DROP CONSTRAINT "FK_63e1ac2bf59c85a5d5a5322c637"`);
        await queryRunner.query(`ALTER TABLE "events_translation" DROP CONSTRAINT "UQ_SLUG_EVENT"`);
        await queryRunner.query(`ALTER TABLE "article_translation" DROP CONSTRAINT "UQ_SLUG_ARTICLE"`);
        await queryRunner.query(`ALTER TABLE "category_translation" DROP CONSTRAINT "UQ_SLUG_CATEGORY"`);
        await queryRunner.query(`ALTER TABLE "events_translation" ADD CONSTRAINT "FK_0bfeb51b629c60ba48da50f23b1" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "article_translation" ADD CONSTRAINT "FK_cda6a53008fc816fdbe004a5c3f" FOREIGN KEY ("article_id") REFERENCES "articles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "category_translation" ADD CONSTRAINT "FK_63e1ac2bf59c85a5d5a5322c637" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
