import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateStartTimeCol1657695711581 implements MigrationInterface {
  name = 'updateStartTimeCol1657695711581';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "audio_transcripts" DROP COLUMN "start_time"`,
    );
    await queryRunner.query(
      `ALTER TABLE "audio_transcripts" ADD "start_time" double precision NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "audio_transcripts" DROP COLUMN "start_time"`,
    );
    await queryRunner.query(
      `ALTER TABLE "audio_transcripts" ADD "start_time" character varying NOT NULL`,
    );
  }
}
