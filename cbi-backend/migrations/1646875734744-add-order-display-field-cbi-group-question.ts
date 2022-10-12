import {MigrationInterface, QueryRunner} from "typeorm";

export class addOrderDisplayFieldCbiGroupQuestion1646875734744 implements MigrationInterface {
    name = 'addOrderDisplayFieldCbiGroupQuestion1646875734744'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cbi-questions" ADD "order_display" smallint NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE "cbi-level-groups" ADD "order_display" smallint NOT NULL DEFAULT '1'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cbi-level-groups" DROP COLUMN "order_display"`);
        await queryRunner.query(`ALTER TABLE "cbi-questions" DROP COLUMN "order_display"`);
    }

}
