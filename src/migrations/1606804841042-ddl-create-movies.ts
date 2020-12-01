import { MigrationInterface, QueryRunner } from "typeorm";

export class ddlCreateMovies1606804841042 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "movies" (
                "id" uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(), 
                "name" TEXT NOT NULL,
                "director" TEXT NOT NULL,
                "gender" TEXT NOT NULL
            );
        `, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "movies"`, undefined);
    }

}
