import {MigrationInterface, QueryRunner} from "typeorm";

export class articleAddDesCol1647403152079 implements MigrationInterface {
    name = 'articleAddDesCol1647403152079'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "article-translations" ADD "description" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "articles" ADD "description" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "article-translations" DROP COLUMN "description"`);
    }

}
