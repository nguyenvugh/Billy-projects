import {MigrationInterface, QueryRunner} from "typeorm";

export class alterTotalScoresFieldCbiQuestion1646899458709 implements MigrationInterface {
    name = 'alterTotalScoresFieldCbiQuestion1646899458709'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cbi-questions" ALTER COLUMN "total_scores" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cbi-questions" ALTER COLUMN "total_scores" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cbi-questions" ALTER COLUMN "total_scores" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "cbi-questions" ALTER COLUMN "total_scores" SET NOT NULL`);
    }

}
