import { MigrationInterface, QueryRunner } from 'typeorm';

export class seedTypeToCurrentConfigOxfam1648727400718
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `UPDATE config_oxfam SET type = 'FORM' WHERE key = 'FOOTER_CONFIG'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `UPDATE config_oxfam SET type = null WHERE key = 'FOOTER_CONFIG'`,
    );
  }
}
