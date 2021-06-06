import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  const createQuery = `CREATE TABLE products(
        id SERIAL PRIMARY KEY,
        type TEXT NOT NULL,
        price_s NUMERIC(4, 2) NOT NULL,
        price_m NUMERIC(4, 2) NOT NULL,
        price_l NUMERIC(4, 2) NOT NULL,
        created_at TIMESTAMP,
        updated_at TIMESTAMP
      )`
  return knex.raw(createQuery)
}

export async function down(knex: Knex): Promise<void> {
  const dropQuery = `DROP TABLE products`
  return knex.raw(dropQuery)
}
