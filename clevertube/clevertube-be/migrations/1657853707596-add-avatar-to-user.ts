import { MigrationInterface, QueryRunner } from 'typeorm';

export class addAvatarToUser1657853707596 implements MigrationInterface {
  name = 'addAvatarToUser1657853707596';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ADD "avatar_id" integer`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "UQ_c3401836efedec3bec459c8f818" UNIQUE ("avatar_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_c3401836efedec3bec459c8f818" FOREIGN KEY ("avatar_id") REFERENCES "files"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_c3401836efedec3bec459c8f818"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "UQ_c3401836efedec3bec459c8f818"`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "avatar_id"`);
  }
}
