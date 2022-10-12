import {MigrationInterface, QueryRunner} from "typeorm";

export class createCategory1661238623463 implements MigrationInterface {
    name = 'createCategory1661238623463'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "categories" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL DEFAULT '1', "id" SERIAL NOT NULL, "type" character varying NOT NULL, "isFeature" integer NOT NULL, "field" character varying NOT NULL, "path" character varying NOT NULL, "image_id" integer, CONSTRAINT "REL_5336de31c6bef5b1e543d66d2b" UNIQUE ("image_id"), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "category_translation" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL DEFAULT '1', "id" SERIAL NOT NULL, "lang" character varying NOT NULL, "name" character varying NOT NULL, "slug" character varying NOT NULL, "shortDesc" character varying NOT NULL, "content" character varying NOT NULL, "categoryId" integer, CONSTRAINT "UQ_8062f30e74777ed00de5e6c4117" UNIQUE ("slug"), CONSTRAINT "PK_eeafea0891382f348c30a2a6bc2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "categories" ADD CONSTRAINT "FK_5336de31c6bef5b1e543d66d2bc" FOREIGN KEY ("image_id") REFERENCES "files"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "category_translation" ADD CONSTRAINT "FK_63e1ac2bf59c85a5d5a5322c637" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category_translation" DROP CONSTRAINT "FK_63e1ac2bf59c85a5d5a5322c637"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP CONSTRAINT "FK_5336de31c6bef5b1e543d66d2bc"`);
        await queryRunner.query(`DROP TABLE "category_translation"`);
        await queryRunner.query(`DROP TABLE "categories"`);
    }

}
