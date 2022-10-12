import {MigrationInterface, QueryRunner} from "typeorm";

export class removeEnabledTopicLevel1657875639877 implements MigrationInterface {
    name = 'removeEnabledTopicLevel1657875639877'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "topic" DROP COLUMN "enabled"`);
        await queryRunner.query(`ALTER TABLE "level" DROP COLUMN "enabled"`);
        await queryRunner.query(`ALTER TABLE "topic" ADD "image_id" integer`);
        await queryRunner.query(`ALTER TABLE "topic" ADD CONSTRAINT "UQ_2ad99f94049052bed4c6454575f" UNIQUE ("image_id")`);
        await queryRunner.query(`ALTER TABLE "topic" ADD CONSTRAINT "FK_2ad99f94049052bed4c6454575f" FOREIGN KEY ("image_id") REFERENCES "files"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "topic" DROP CONSTRAINT "FK_2ad99f94049052bed4c6454575f"`);
        await queryRunner.query(`ALTER TABLE "topic" DROP CONSTRAINT "UQ_2ad99f94049052bed4c6454575f"`);
        await queryRunner.query(`ALTER TABLE "topic" DROP COLUMN "image_id"`);
        await queryRunner.query(`ALTER TABLE "level" ADD "enabled" integer NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE "topic" ADD "enabled" integer NOT NULL DEFAULT '1'`);
    }

}
