import { MigrationInterface, QueryRunner } from "typeorm";

export class users1606708045361 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "users" (
                "id" uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(), 
                "name" TEXT NOT NULL,
                "email" TEXT NOT NULL,
                "password" TEXT NOT NULL,
                "is_admin" BOOLEAN NOT NULL,
                "created_at" timestamp NOT NULL DEFAULT NOW(),
                "updated_at" timestamp NOT NULL DEFAULT NOW(),
                "deleted_at" timestamp,
                CONSTRAINT email_unique UNIQUE (email)
            );
        `, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`, undefined);
    }

}
