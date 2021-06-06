import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  const createQuery = `CREATE TABLE users(
        id SERIAL PRIMARY KEY,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        email TEXT NOT NULL,
        address TEXT NOT NULL,
        created_at TIMESTAMP,
        updated_at TIMESTAMP
      )`
  return knex.raw(createQuery)
}

export async function down(knex: Knex): Promise<void> {
  const dropQuery = `DROP TABLE users`
  return knex.raw(dropQuery)
}
