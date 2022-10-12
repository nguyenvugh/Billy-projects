import { MigrationInterface, QueryRunner } from 'typeorm';

export class seedPolicies1648536801508 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO policies (id, action, resource, action_ability, "name")
      VALUES 
         ('bb92e6a3-7ed6-4526-815b-9a75ee92ffad', 'manage', 'all', 'can', 'Quản trị viên cấp cao'),
         ('e2ffe6bc-dc60-434e-ad9e-c3709899353d', 'manage', 'article', 'can', 'Quản lý bài viết'),
         ('5a3bda29-6cc0-4477-8dee-a78b25efb510', 'manage', 'cbi', 'can', 'Quản lý đánh giá CBI'),
         ('5c999288-4b01-42da-8a3b-aeb40fd893a6', 'manage', 'user', 'can', 'Quản lý người dùng'),
         ('de41c8db-5d8b-4c8d-aa2a-3884ce4a6532', 'manage', 'admin', 'can', 'Quản lý quản trị viên'),
         ('a37c31ff-19ff-4580-9f24-e3c44e5e7f7b', 'manage', 'news', 'can', 'Quản lý tin tức'),	
         ('7a2321f1-1278-413a-bbc3-398ec1d397b3', 'manage', 'config', 'can', 'Quản lý cấu hình');
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM policies WHERE id = 'bb92e6a3-7ed6-4526-815b-9a75ee92ffad' 
         OR id = 'e2ffe6bc-dc60-434e-ad9e-c3709899353d' 
         OR id = '5a3bda29-6cc0-4477-8dee-a78b25efb510' 
         OR id = '5c999288-4b01-42da-8a3b-aeb40fd893a6' 
         OR id = 'de41c8db-5d8b-4c8d-aa2a-3884ce4a6532' 
         OR id = 'a37c31ff-19ff-4580-9f24-e3c44e5e7f7b' 
         OR id = '7a2321f1-1278-413a-bbc3-398ec1d397b3';
      `);
  }
}
