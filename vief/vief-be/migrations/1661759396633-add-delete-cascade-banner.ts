import {MigrationInterface, QueryRunner} from "typeorm";

export class addDeleteCascadeBanner1661759396633 implements MigrationInterface {
    name = 'addDeleteCascadeBanner1661759396633'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "banners_translation" DROP CONSTRAINT "FK_b5a348f8e8cf7b64fc78621d294"`);
        await queryRunner.query(`ALTER TABLE "banners_translation" ADD CONSTRAINT "FK_b5a348f8e8cf7b64fc78621d294" FOREIGN KEY ("bannerId") REFERENCES "banners"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "banners_translation" DROP CONSTRAINT "FK_b5a348f8e8cf7b64fc78621d294"`);
        await queryRunner.query(`ALTER TABLE "banners_translation" ADD CONSTRAINT "FK_b5a348f8e8cf7b64fc78621d294" FOREIGN KEY ("bannerId") REFERENCES "banners"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
