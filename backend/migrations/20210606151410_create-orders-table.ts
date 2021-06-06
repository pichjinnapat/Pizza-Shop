import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  const createQuery = `CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    productId SERIAL NOT NULL,
    number INTEGER NOT NULL,
    size INTEGER NOT NULL,
    status INTEGER NOT NULL,
    userId SERIAL NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
  )`
  return knex.raw(createQuery)
}

export async function down(knex: Knex): Promise<void> {
  const dropQuery = `DROP TABLE orders`
  return knex.raw(dropQuery)
}
