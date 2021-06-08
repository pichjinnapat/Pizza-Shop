import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  const createQuery = `CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    product_id SERIAL NOT NULL,
    number INTEGER NOT NULL,
    size CHAR NOT NULL,
    status INTEGER NOT NULL,
    user_id SERIAL NOT NULL,
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

  CREATE TRIGGER orders
    BEFORE UPDATE
    ON orders
    FOR EACH ROW
    EXECUTE PROCEDURE upd_timestamp();`
  return knex.raw(createQuery)
}

export async function down(knex: Knex): Promise<void> {
  const dropQuery = `DROP TABLE orders`
  return knex.raw(dropQuery)
}
