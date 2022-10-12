import { MigrationInterface, QueryRunner } from 'typeorm';

export class replaceAddressByFullname1657701510646
  implements MigrationInterface
{
  name = 'replaceAddressByFullname1657701510646';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "client" RENAME COLUMN "address" TO "fullname"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "client" RENAME COLUMN "fullname" TO "address"`,
    );
  }
}
