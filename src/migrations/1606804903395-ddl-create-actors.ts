import { MigrationInterface, QueryRunner } from "typeorm";

export class ddlCreateActors1606804903395 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "actors" (
                "id" uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(), 
                "name" TEXT NOT NULL
            );
        `, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "actors"`, undefined);
    }

}
