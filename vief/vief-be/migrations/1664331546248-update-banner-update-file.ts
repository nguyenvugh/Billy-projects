import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateBannerUpdateFile1664331546248 implements MigrationInterface {
  name = 'updateBannerUpdateFile1664331546248';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "banners_translation" DROP CONSTRAINT "FK_b5a348f8e8cf7b64fc78621d294"`,
    );
    await queryRunner.query(
      `ALTER TABLE "banners" DROP CONSTRAINT "FK_992a25a81b7c212d749a31832f8"`,
    );
    await queryRunner.query(
      `CREATE TABLE "image_translations" ("id" SERIAL NOT NULL, "lang" character varying NOT NULL, "alt" character varying(255) NOT NULL, "title" character varying(255) NOT NULL, "file_id" integer NOT NULL, CONSTRAINT "PK_288d7f27bf6ea77bca181fb8611" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "banners_translation" DROP COLUMN "version"`,
    );
    await queryRunner.query(
      `ALTER TABLE "banners_translation" DROP COLUMN "created_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "banners_translation" DROP COLUMN "updated_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "banners_translation" DROP COLUMN "deleted_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "banners_translation" DROP COLUMN "bannerId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "banners_translation" DROP COLUMN "title"`,
    );
    await queryRunner.query(
      `ALTER TABLE "banners_translation" DROP COLUMN "subTitle"`,
    );
    await queryRunner.query(
      `ALTER TABLE "banners_translation" DROP COLUMN "shortDesc"`,
    );
    await queryRunner.query(`ALTER TABLE "banners" DROP COLUMN "field"`);
    await queryRunner.query(`ALTER TABLE "banners" DROP COLUMN "link"`);
    await queryRunner.query(
      `ALTER TABLE "banners_translation" ADD "url" character varying(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "banners_translation" ADD "head_title" character varying(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "banners_translation" ADD "sub_title" character varying(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "banners_translation" ADD "description" text NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "banners_translation" ADD "banner_id" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "banners" ADD "group" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "banners" ADD "sorting" integer NOT NULL DEFAULT '1'`,
    );
    await queryRunner.query(
      `ALTER TABLE "banners" ALTER COLUMN "image_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_15ae682675ad93834cf4bf23eb" ON "banners" ("group") `,
    );
    await queryRunner.query(
      `ALTER TABLE "image_translations" ADD CONSTRAINT "FK_5cc35ade18b7681f516c893458d" FOREIGN KEY ("file_id") REFERENCES "files"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "banners_translation" ADD CONSTRAINT "FK_74fa0f061e70280eee5d1f15ff6" FOREIGN KEY ("banner_id") REFERENCES "banners"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "banners" ADD CONSTRAINT "FK_992a25a81b7c212d749a31832f8" FOREIGN KEY ("image_id") REFERENCES "files"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "banners" DROP CONSTRAINT "FK_992a25a81b7c212d749a31832f8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "banners_translation" DROP CONSTRAINT "FK_74fa0f061e70280eee5d1f15ff6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "image_translations" DROP CONSTRAINT "FK_5cc35ade18b7681f516c893458d"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_15ae682675ad93834cf4bf23eb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "banners" ALTER COLUMN "image_id" DROP NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "banners" DROP COLUMN "sorting"`);
    await queryRunner.query(`ALTER TABLE "banners" DROP COLUMN "group"`);
    await queryRunner.query(
      `ALTER TABLE "banners_translation" DROP COLUMN "banner_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "banners_translation" DROP COLUMN "description"`,
    );
    await queryRunner.query(
      `ALTER TABLE "banners_translation" DROP COLUMN "sub_title"`,
    );
    await queryRunner.query(
      `ALTER TABLE "banners_translation" DROP COLUMN "head_title"`,
    );
    await queryRunner.query(
      `ALTER TABLE "banners_translation" DROP COLUMN "url"`,
    );
    await queryRunner.query(
      `ALTER TABLE "banners" ADD "link" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "banners" ADD "field" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "banners_translation" ADD "shortDesc" text`,
    );
    await queryRunner.query(
      `ALTER TABLE "banners_translation" ADD "subTitle" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "banners_translation" ADD "title" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "banners_translation" ADD "bannerId" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "banners_translation" ADD "deleted_at" TIMESTAMP WITH TIME ZONE`,
    );
    await queryRunner.query(
      `ALTER TABLE "banners_translation" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "banners_translation" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "banners_translation" ADD "version" integer NOT NULL DEFAULT '1'`,
    );
    await queryRunner.query(`DROP TABLE "image_translations"`);
    await queryRunner.query(
      `ALTER TABLE "banners" ADD CONSTRAINT "FK_992a25a81b7c212d749a31832f8" FOREIGN KEY ("image_id") REFERENCES "files"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "banners_translation" ADD CONSTRAINT "FK_b5a348f8e8cf7b64fc78621d294" FOREIGN KEY ("bannerId") REFERENCES "banners"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
