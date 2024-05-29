import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnSoftDeleteForPetModel1716948400375 implements MigrationInterface {
    name = 'AddColumnSoftDeleteForPetModel1716948400375'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pet" ADD "isDeleted" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pet" DROP COLUMN "isDeleted"`);
    }

}
