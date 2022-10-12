import { MigrationInterface, QueryRunner } from 'typeorm';

export class userAddLockReason1648612979568 implements MigrationInterface {
  name = 'userAddLockReason1648612979568';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "lock_reason" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "lock_reason"`);
  }
}
