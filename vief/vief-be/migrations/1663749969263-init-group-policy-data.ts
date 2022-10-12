import { MigrationInterface, QueryRunner } from 'typeorm';

export class initGroupPolicyData1663749969263 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO group_policies ("key","name",description)
            VALUES ('teso_tech','Teso Tech','Team kỹ thuật TESO');`,
    );
    await queryRunner.query(
      `INSERT INTO group_policies ("key","name",description)
            VALUES ('researching_partner','Đối tác nghiên cứu','Đối tác nghiên cứu');`,
    );
    await queryRunner.query(
      `INSERT INTO group_policies ("key","name",description)
            VALUES ('vief','Vief','Team VIEF');`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM group_policies WHERE "key"='teso_tech';`,
    );
    await queryRunner.query(
      `DELETE FROM group_policies WHERE "key"='researching_partner';`,
    );
    await queryRunner.query(`DELETE FROM group_policies WHERE "key"='vief';`);
  }
}
