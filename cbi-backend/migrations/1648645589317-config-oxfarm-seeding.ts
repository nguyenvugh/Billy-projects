import { MigrationInterface, QueryRunner } from 'typeorm';

export class configOxfarmSeeding1648645589317 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`INSERT INTO config_oxfam(key, value, updated_at, name) VALUES      
        ( 'FOOTER_CONFIG', 
          '{
             "companyName": "Oxfam",
             "email": "info@oxfam.com",
             "hotline": "1800646405",
             "address": "15A Hồ Ngọc Lâm, Phường An Lạc, Quận Tân Bình, TP. HCM"
          }', 
          '2022-03-28 20:34:07.229035+07',
          'Thông tin cơ bản của Oxfam') `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM config_oxfam WHERE key = 'FOOTER_CONFIG'`,
    );
  }
}
