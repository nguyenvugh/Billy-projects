import { MigrationInterface, QueryRunner } from 'typeorm';

export class addS3pathToAudioEntity1659669181858 implements MigrationInterface {
  name = 'addS3pathToAudioEntity1659669181858';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "audios" ADD "s3_path" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "audios" DROP COLUMN "s3_path"`);
  }
}
