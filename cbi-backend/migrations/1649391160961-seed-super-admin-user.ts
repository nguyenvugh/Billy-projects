import { MigrationInterface, QueryRunner } from 'typeorm';

export class seedSuperAdminUser1649391160961 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO public.user_types ("key","name",description)
      VALUES ('SUPER_ADMIN','SuperADmin','This type allows user to access as super admin');`,
    );
    // password as Superadmin123
    await queryRunner.query(
      `INSERT INTO public."user" (id, username,full_name,encrypted_password,phone_number,status,user_type_key)
        VALUES ('16f643a2-4973-460c-be9a-abd0a85f38f9','superadmin','super admin','$2a$10$zJKrzJX22m0dnnw4eKbk1uQRKq8a7oql6ufwBhRlSZ0mtwH3a.i22','1234232323','ACTIVE','SUPER_ADMIN');`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM public."user" WHERE id='16f643a2-4973-460c-be9a-abd0a85f38f9';`,
    );
    await queryRunner.query(
      `DELETE FROM public.user_types WHERE "key"='SUPER_ADMIN';`,
    );
  }
}
