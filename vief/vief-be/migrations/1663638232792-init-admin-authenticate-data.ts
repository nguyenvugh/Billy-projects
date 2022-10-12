import { MigrationInterface, QueryRunner } from 'typeorm';

export class initAdminAuthenticateData1663638232792
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO group_policies ("key","name",description)
          VALUES ('admin','Admin','Group admin');`,
    );
    await queryRunner.query(
      `INSERT INTO user_types ("key",description)
          VALUES ('admin','Group admin');`,
    );
    await queryRunner.query(
      `INSERT INTO users (user_type)
          VALUES ('admin');`,
    );
    await queryRunner.query(
      `INSERT INTO admin (user_id,password,email)
          VALUES (1,'$2a$10$6NBAMnr0B6H4Zry0CqSVhOQaQwKRMg./XjGZI10.yexUTgEiHk6Sy','admin@tesosoft.com');`,
    );
    await queryRunner.query(
      `INSERT INTO user_to_group_policies (user_id,group_policies_key)
          VALUES (1,'admin');`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM user_to_group_policies WHERE user_id=1;`,
    );
    await queryRunner.query(`DELETE FROM admin WHERE id=1;`);
    await queryRunner.query(`DELETE FROM users WHERE id=1;`);
    await queryRunner.query(`DELETE FROM user_types WHERE "key"='admin';`);
    await queryRunner.query(`DELETE FROM group_policies WHERE "key"='admin';`);
  }
}
