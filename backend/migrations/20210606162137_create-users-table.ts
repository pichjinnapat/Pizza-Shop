import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  const createQuery = `CREATE TABLE users(
        id SERIAL PRIMARY KEY,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        email TEXT NOT NULL,
        address TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
      );

      CREATE OR REPLACE FUNCTION upd_timestamp() RETURNS TRIGGER 
      LANGUAGE plpgsql
      AS
      $$
      BEGIN
          NEW.updated_at = CURRENT_TIMESTAMP;
          RETURN NEW;
      END;
      $$;

      CREATE TRIGGER users
        BEFORE UPDATE
        ON users
        FOR EACH ROW
        EXECUTE PROCEDURE upd_timestamp();
      `
  return knex.raw(createQuery)
}

export async function down(knex: Knex): Promise<void> {
  const dropQuery = `DROP TABLE users`
  return knex.raw(dropQuery)
}
