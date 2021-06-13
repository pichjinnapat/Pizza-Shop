import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  const createQuery = `CREATE TABLE products(
        id SERIAL PRIMARY KEY,
        type TEXT UNIQUE NOT NULL,
        price_s NUMERIC(4, 2) NOT NULL,
        price_m NUMERIC(4, 2) NOT NULL,
        price_l NUMERIC(4, 2) NOT NULL,
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

      CREATE TRIGGER products
        BEFORE UPDATE
        ON products
        FOR EACH ROW
        EXECUTE PROCEDURE upd_timestamp();`
  return knex.raw(createQuery)
}

export async function down(knex: Knex): Promise<void> {
  const dropQuery = `DROP TABLE products`
  return knex.raw(dropQuery)
}
