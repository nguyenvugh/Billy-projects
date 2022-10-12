import {MigrationInterface, QueryRunner} from "typeorm";

export class addBaseExampleToDictionary1659342635774 implements MigrationInterface {
    name = 'addBaseExampleToDictionary1659342635774'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "evdict" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "evdict" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "evdict" ADD "deleted_at" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "evdict" ADD "version" integer NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE "evdict" ADD "example" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "evdict" DROP COLUMN "example"`);
        await queryRunner.query(`ALTER TABLE "evdict" DROP COLUMN "version"`);
        await queryRunner.query(`ALTER TABLE "evdict" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "evdict" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "evdict" DROP COLUMN "created_at"`);
    }

}
