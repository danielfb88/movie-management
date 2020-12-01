import {MigrationInterface, QueryRunner} from "typeorm";

export class ddlInit1606870233523 implements MigrationInterface {
    name = 'ddlInit1606870233523'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "actor" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_05b325494fcc996a44ae6928e5e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "movie" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "director" character varying NOT NULL, "gender" character varying NOT NULL, CONSTRAINT "PK_cb3bb4d61cf764dc035cbedd422" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "is_admin" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "movie_actors_actor" ("movie_id" uuid NOT NULL, "actor_id" uuid NOT NULL, CONSTRAINT "PK_ae31a28f7b1f4446585be447159" PRIMARY KEY ("movie_id", "actor_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f5593b014dd88e327a5af12c15" ON "movie_actors_actor" ("movie_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_3533932c1b84ddb6cbf9c63abe" ON "movie_actors_actor" ("actor_id") `);
        await queryRunner.query(`ALTER TABLE "movie_actors_actor" ADD CONSTRAINT "FK_f5593b014dd88e327a5af12c15d" FOREIGN KEY ("movie_id") REFERENCES "movie"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "movie_actors_actor" ADD CONSTRAINT "FK_3533932c1b84ddb6cbf9c63abec" FOREIGN KEY ("actor_id") REFERENCES "actor"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie_actors_actor" DROP CONSTRAINT "FK_3533932c1b84ddb6cbf9c63abec"`);
        await queryRunner.query(`ALTER TABLE "movie_actors_actor" DROP CONSTRAINT "FK_f5593b014dd88e327a5af12c15d"`);
        await queryRunner.query(`DROP INDEX "IDX_3533932c1b84ddb6cbf9c63abe"`);
        await queryRunner.query(`DROP INDEX "IDX_f5593b014dd88e327a5af12c15"`);
        await queryRunner.query(`DROP TABLE "movie_actors_actor"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "movie"`);
        await queryRunner.query(`DROP TABLE "actor"`);
    }

}
