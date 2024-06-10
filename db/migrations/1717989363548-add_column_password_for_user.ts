import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnPasswordForUser1717989363548 implements MigrationInterface {
    name = 'AddColumnPasswordForUser1717989363548'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pet" DROP COLUMN "isDeleted"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isDeleted"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "password" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "isDeleted" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "pet" ADD "isDeleted" boolean NOT NULL DEFAULT false`);
    }

}
