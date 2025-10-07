import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIndex1759823314468 implements MigrationInterface {
  name = 'AddIndex1759823314468';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_3e7f81ef54032afb0f75a65003\` ON \`user-token\``,
    );
    await queryRunner.query(`DROP INDEX \`idx_user_id\` ON \`user-token\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_5591f8dff8a9e9bb2aac32820a\` ON \`user_current_locations\``,
    );
    await queryRunner.query(
      `CREATE INDEX \`idx_user_id\` ON \`user-token\` (\`user_id\`)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX \`idx_user_id\` ON \`user-token\``);
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_5591f8dff8a9e9bb2aac32820a\` ON \`user_current_locations\` (\`userId\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`idx_user_id\` ON \`user-token\` (\`user_id\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_3e7f81ef54032afb0f75a65003\` ON \`user-token\` (\`user_id\`)`,
    );
  }
}
