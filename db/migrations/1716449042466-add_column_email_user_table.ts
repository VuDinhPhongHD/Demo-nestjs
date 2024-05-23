import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnEmailUserTable1716449042466 implements MigrationInterface {
    name = 'AddColumnEmailUserTable1716449042466'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "email" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email"`);
    }

}
