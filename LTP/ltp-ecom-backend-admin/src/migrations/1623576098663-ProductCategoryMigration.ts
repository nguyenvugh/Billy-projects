/* eslint-disable @typescript-eslint/no-empty-function */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class ProductCategoryMigration1623576098663
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.query(
    //   `ALTER TABLE "product_categories" ADD COLUMN "image" integer`,
    // );
    await queryRunner.query(
      `ALTER TABLE "product_categories" RENAME COLUMN "deleted_at" TO "deleted_at1"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.query(`ALTER TABLE "product_categories" DROP "image"`);
    await queryRunner.query(
      `ALTER TABLE "product_categories" RENAME COLUMN "deleted_at1" TO "deleted_at"`,
    );
  }
}
