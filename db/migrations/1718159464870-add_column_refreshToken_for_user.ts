import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnRefreshTokenForUser1718159464870 implements MigrationInterface {
    name = 'AddColumnRefreshTokenForUser1718159464870'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "refreshToken" TO "refresh_token"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "refresh_token" TO "refreshToken"`);
    }

}
