import {MigrationInterface, QueryRunner} from "typeorm";

export class removeUniqueSlug1661929305432 implements MigrationInterface {
    name = 'removeUniqueSlug1661929305432'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category_translation" DROP CONSTRAINT "UQ_8062f30e74777ed00de5e6c4117"`);
        await queryRunner.query(`ALTER TABLE "article_translation" DROP CONSTRAINT "UQ_25a6dceb1ec8ed3b980092e2496"`);
        await queryRunner.query(`ALTER TABLE "events_translation" DROP CONSTRAINT "UQ_3a59755659c12b6d4ccf47d48b0"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "events_translation" ADD CONSTRAINT "UQ_3a59755659c12b6d4ccf47d48b0" UNIQUE ("slug")`);
        await queryRunner.query(`ALTER TABLE "article_translation" ADD CONSTRAINT "UQ_25a6dceb1ec8ed3b980092e2496" UNIQUE ("slug")`);
        await queryRunner.query(`ALTER TABLE "category_translation" ADD CONSTRAINT "UQ_8062f30e74777ed00de5e6c4117" UNIQUE ("slug")`);
    }

}
