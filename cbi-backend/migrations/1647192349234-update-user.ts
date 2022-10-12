import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateUser1647192349234 implements MigrationInterface {
  name = 'updateUser1647192349234';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user_documents" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL DEFAULT '1', "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "description" character varying, "user_id" uuid, "file_id" uuid, CONSTRAINT "REL_aa4b82a9943c65b5f622a6925b" UNIQUE ("user_id"), CONSTRAINT "REL_8521b0a3241604a5fd4e8c08ae" UNIQUE ("file_id"), CONSTRAINT "PK_cea43819156528b63504c4afd4b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_companies" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL DEFAULT '1', "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying, "position" character varying NOT NULL, "number_employees" integer NOT NULL, "revenue" integer NOT NULL, "address" character varying, "phone_number" character varying, "website" character varying, "work_field" character varying NOT NULL, "user_id" uuid, CONSTRAINT "REL_50c7d6aeb4ab214ad9fff29ab6" UNIQUE ("user_id"), CONSTRAINT "PK_f41bd3ea569c8c877b9a9063abb" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_types" ("key" character varying NOT NULL, "name" character varying, "description" character varying NOT NULL, CONSTRAINT "PK_09728cf186abd096d7d0445a0de" PRIMARY KEY ("key"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "birthday" TIMESTAMP WITH TIME ZONE`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "user_type_key" character varying NOT NULL DEFAULT 'CLIENT'`,
    );
    await queryRunner.query(`ALTER TABLE "user" ADD "avatar_id" uuid`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "UQ_b777e56620c3f1ac0308514fc4c" UNIQUE ("avatar_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "email" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_documents" ADD CONSTRAINT "FK_aa4b82a9943c65b5f622a6925b2" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_documents" ADD CONSTRAINT "FK_8521b0a3241604a5fd4e8c08ae0" FOREIGN KEY ("file_id") REFERENCES "file-admin"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_companies" ADD CONSTRAINT "FK_50c7d6aeb4ab214ad9fff29ab68" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_b777e56620c3f1ac0308514fc4c" FOREIGN KEY ("avatar_id") REFERENCES "file-admin"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('user_types')
      .values({
        key: 'ADMIN',
        name: 'Admin',
        description: 'This type allows user to access as admin',
      })
      .execute();
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('user_types')
      .values({
        key: 'CLIENT',
        name: 'Client',
        description: 'This type allows user to access as client',
      })
      .execute();

    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_d3fd822ae3e1c79f486f903bc95" FOREIGN KEY ("user_type_key") REFERENCES "user_types"("key") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_d3fd822ae3e1c79f486f903bc95"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_b777e56620c3f1ac0308514fc4c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_companies" DROP CONSTRAINT "FK_50c7d6aeb4ab214ad9fff29ab68"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_documents" DROP CONSTRAINT "FK_8521b0a3241604a5fd4e8c08ae0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_documents" DROP CONSTRAINT "FK_aa4b82a9943c65b5f622a6925b2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "email" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "UQ_b777e56620c3f1ac0308514fc4c"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "avatar_id"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "user_type_key"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "birthday"`);
    await queryRunner.query(`DROP TABLE "user_types"`);
    await queryRunner.query(`DROP TABLE "user_companies"`);
    await queryRunner.query(`DROP TABLE "user_documents"`);
  }
}
