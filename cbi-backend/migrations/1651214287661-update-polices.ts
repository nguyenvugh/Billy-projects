import { MigrationInterface, QueryRunner } from 'typeorm';

export class updatePolices1651214287661 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TYPE "public"."policies_resource_enum" ADD VALUE 'documents'`,
    );
    await queryRunner.query(
      `INSERT INTO "public"."policies" (id, action, resource, action_ability, "name")
        VALUES 
           ('7a2321f1-1278-413a-bbc3-398ec1d397b9', 'manage', 'documents', 'can', 'Quản lý tài liệu')`,
    );
    await queryRunner.query(
      `delete from "public"."group_to_policies"
        where policies_id = 'e2ffe6bc-dc60-434e-ad9e-c3709899353d'`,
    );
    await queryRunner.query(
      `delete from "public"."policies" where id = 'e2ffe6bc-dc60-434e-ad9e-c3709899353d'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `delete from "public"."group_to_policies"
        where policies_id = '7a2321f1-1278-413a-bbc3-398ec1d397b9'`,
    );
    await queryRunner.query(
      `delete from "public"."policies" where id = '7a2321f1-1278-413a-bbc3-398ec1d397b9'`,
    );
  }
}
