import { MigrationInterface, QueryRunner } from 'typeorm';

export class documentsInit1648122488774 implements MigrationInterface {
  name = 'documentsInit1648122488774';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "documents" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL DEFAULT '1', "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "created_by" uuid, "file_id" uuid, CONSTRAINT "REL_3d122f6d936acfe13f931d058b" UNIQUE ("file_id"), CONSTRAINT "PK_ac51aa5181ee2036f5ca482857c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "documents" ADD CONSTRAINT "FK_14371caaff44d0801b59b284166" FOREIGN KEY ("created_by") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "documents" ADD CONSTRAINT "FK_3d122f6d936acfe13f931d058bf" FOREIGN KEY ("file_id") REFERENCES "file-admin"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "documents" DROP CONSTRAINT "FK_3d122f6d936acfe13f931d058bf"`,
    );
    await queryRunner.query(
      `ALTER TABLE "documents" DROP CONSTRAINT "FK_14371caaff44d0801b59b284166"`,
    );
    await queryRunner.query(`DROP TABLE "documents"`);
  }
}
