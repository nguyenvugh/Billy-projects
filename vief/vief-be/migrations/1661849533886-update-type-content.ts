import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateTypeContent1661849533886 implements MigrationInterface {
  name = 'updateTypeContent1661849533886';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "category_translation" DROP COLUMN "content"`,
    );
    await queryRunner.query(
      `ALTER TABLE "category_translation" ADD "content" text`,
    );
    await queryRunner.query(
      `ALTER TABLE "article_translation" DROP COLUMN "content"`,
    );
    await queryRunner.query(
      `ALTER TABLE "article_translation" ADD "content" text`,
    );
    await queryRunner.query(
      `ALTER TABLE "banners_translation" DROP COLUMN "shortDesc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "banners_translation" ADD "shortDesc" text `,
    );
    await queryRunner.query(
      `ALTER TABLE "events_translation" DROP COLUMN "content"`,
    );
    await queryRunner.query(
      `ALTER TABLE "events_translation" ADD "content" text NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "events_translation" DROP COLUMN "content"`,
    );
    await queryRunner.query(
      `ALTER TABLE "events_translation" ADD "content" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "banners_translation" DROP COLUMN "shortDesc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "banners_translation" ADD "shortDesc" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "article_translation" DROP COLUMN "content"`,
    );
    await queryRunner.query(
      `ALTER TABLE "article_translation" ADD "content" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "category_translation" DROP COLUMN "content"`,
    );
    await queryRunner.query(
      `ALTER TABLE "category_translation" ADD "content" character varying NOT NULL`,
    );
  }
}
