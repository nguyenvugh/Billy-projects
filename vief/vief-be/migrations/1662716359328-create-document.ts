import { MigrationInterface, QueryRunner } from 'typeorm';

export class createDocument1662716359328 implements MigrationInterface {
  name = 'createDocument1662716359328';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "documents" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL DEFAULT '1', "id" SERIAL NOT NULL, "field" character varying NOT NULL, "file_id" integer, CONSTRAINT "REL_3d122f6d936acfe13f931d058b" UNIQUE ("file_id"), CONSTRAINT "PK_ac51aa5181ee2036f5ca482857c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "documents_translation" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL DEFAULT '1', "id" SERIAL NOT NULL, "lang" character varying NOT NULL, "shortDesc" text, "documentsId" integer, CONSTRAINT "PK_506103bebb1f5c3689f3d630d95" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "documents" ADD CONSTRAINT "FK_3d122f6d936acfe13f931d058bf" FOREIGN KEY ("file_id") REFERENCES "files"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "documents_translation" ADD CONSTRAINT "FK_e9646c4a669ebc395a8fef349da" FOREIGN KEY ("documentsId") REFERENCES "documents"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "documents_translation" DROP CONSTRAINT "FK_e9646c4a669ebc395a8fef349da"`,
    );
    await queryRunner.query(
      `ALTER TABLE "documents" DROP CONSTRAINT "FK_3d122f6d936acfe13f931d058bf"`,
    );
    await queryRunner.query(`DROP TABLE "documents_translation"`);
    await queryRunner.query(`DROP TABLE "documents"`);
  }
}
