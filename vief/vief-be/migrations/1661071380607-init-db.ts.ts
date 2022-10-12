import { MigrationInterface, QueryRunner } from 'typeorm';

export class initDb1661071380607 implements MigrationInterface {
  name = 'initDb1661071380607';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."policies_action_enum" AS ENUM('manage', 'read', 'write')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."policies_resource_enum" AS ENUM('all', 'user', 'admin')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."policies_action_ability_enum" AS ENUM('can', 'cannot')`,
    );
    await queryRunner.query(
      `CREATE TABLE "policies" ("id" SERIAL NOT NULL, "action" "public"."policies_action_enum" NOT NULL, "resource" "public"."policies_resource_enum" NOT NULL, "action_ability" "public"."policies_action_ability_enum" NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_3d6f8d44a991b53e2899a65ebaf" UNIQUE ("name"), CONSTRAINT "UQ_POLICIES" UNIQUE ("action", "resource", "action_ability"), CONSTRAINT "PK_603e09f183df0108d8695c57e28" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "group_to_policies" ("policies_id" integer NOT NULL, "group_policies_key" character varying NOT NULL, CONSTRAINT "PK_5171e689edfae630e185aeb3571" PRIMARY KEY ("policies_id", "group_policies_key"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "files" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL DEFAULT '1', "id" SERIAL NOT NULL, "key" character varying NOT NULL, "bucket" character varying NOT NULL, "file_name" character varying NOT NULL, "type" character varying NOT NULL DEFAULT 'mp3', "size" integer NOT NULL DEFAULT '0', "verified" integer NOT NULL DEFAULT '-1', CONSTRAINT "UQ_a5c218dfdf6ad6092fed2230a88" UNIQUE ("key"), CONSTRAINT "PK_6c16b9093a142e0e7613b04a3d9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a5c218dfdf6ad6092fed2230a8" ON "files" ("key") `,
    );
    await queryRunner.query(
      `CREATE TABLE "admin" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL DEFAULT '1', "id" SERIAL NOT NULL, "email" character varying NOT NULL, "user_id" integer, CONSTRAINT "UQ_de87485f6489f5d0995f5841952" UNIQUE ("email"), CONSTRAINT "REL_a28028ba709cd7e5053a86857b" UNIQUE ("user_id"), CONSTRAINT "PK_e032310bcef831fb83101899b10" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "client" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL DEFAULT '1', "id" SERIAL NOT NULL, "email" character varying, "phone" character varying NOT NULL, "fullname" character varying NOT NULL, "user_id" integer, CONSTRAINT "UQ_368ca99acdbd5502fc08b3f7796" UNIQUE ("phone"), CONSTRAINT "REL_f18a6fabea7b2a90ab6bf10a65" UNIQUE ("user_id"), CONSTRAINT "PK_96da49381769303a6515a8785c7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_types" ("key" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_09728cf186abd096d7d0445a0de" PRIMARY KEY ("key"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "firId" character varying NOT NULL, "user_type" character varying, "avatar_id" integer, CONSTRAINT "UQ_e4977acc4c96d7efb590f5d02a2" UNIQUE ("firId"), CONSTRAINT "REL_c3401836efedec3bec459c8f81" UNIQUE ("avatar_id"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_to_group_policies" ("user_id" integer NOT NULL, "group_policies_key" character varying NOT NULL, CONSTRAINT "PK_e6eef956357944afc5bd5e63eaa" PRIMARY KEY ("user_id", "group_policies_key"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "group_policies" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "key" character varying NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "UQ_7c566c55e3d0a3dd867acaac6a3" UNIQUE ("name"), CONSTRAINT "PK_0bc8188a2d04103baad6cf80109" PRIMARY KEY ("key"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "group_to_policies" ADD CONSTRAINT "FK_928fe46bb5d393ed73366bdfb47" FOREIGN KEY ("policies_id") REFERENCES "policies"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "group_to_policies" ADD CONSTRAINT "FK_055224aaf063fd5de749988b53e" FOREIGN KEY ("group_policies_key") REFERENCES "group_policies"("key") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "admin" ADD CONSTRAINT "FK_a28028ba709cd7e5053a86857b4" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "client" ADD CONSTRAINT "FK_f18a6fabea7b2a90ab6bf10a650" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_c6778957fcf0cd97c7e27f080e9" FOREIGN KEY ("user_type") REFERENCES "user_types"("key") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_c3401836efedec3bec459c8f818" FOREIGN KEY ("avatar_id") REFERENCES "files"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_to_group_policies" ADD CONSTRAINT "FK_43701fc0bf5550c0a65fbc5c1e6" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_to_group_policies" ADD CONSTRAINT "FK_d7a6d1fa49a698e4ec23fc6c099" FOREIGN KEY ("group_policies_key") REFERENCES "group_policies"("key") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_to_group_policies" DROP CONSTRAINT "FK_d7a6d1fa49a698e4ec23fc6c099"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_to_group_policies" DROP CONSTRAINT "FK_43701fc0bf5550c0a65fbc5c1e6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_c3401836efedec3bec459c8f818"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_c6778957fcf0cd97c7e27f080e9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "client" DROP CONSTRAINT "FK_f18a6fabea7b2a90ab6bf10a650"`,
    );
    await queryRunner.query(
      `ALTER TABLE "admin" DROP CONSTRAINT "FK_a28028ba709cd7e5053a86857b4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "group_to_policies" DROP CONSTRAINT "FK_055224aaf063fd5de749988b53e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "group_to_policies" DROP CONSTRAINT "FK_928fe46bb5d393ed73366bdfb47"`,
    );
    await queryRunner.query(`DROP TABLE "group_policies"`);
    await queryRunner.query(`DROP TABLE "user_to_group_policies"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "user_types"`);
    await queryRunner.query(`DROP TABLE "client"`);
    await queryRunner.query(`DROP TABLE "admin"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_a5c218dfdf6ad6092fed2230a8"`,
    );
    await queryRunner.query(`DROP TABLE "files"`);
    await queryRunner.query(`DROP TABLE "group_to_policies"`);
    await queryRunner.query(`DROP TABLE "policies"`);
    await queryRunner.query(
      `DROP TYPE "public"."policies_action_ability_enum"`,
    );
    await queryRunner.query(`DROP TYPE "public"."policies_resource_enum"`);
    await queryRunner.query(`DROP TYPE "public"."policies_action_enum"`);
  }
}
