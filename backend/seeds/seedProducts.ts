/* eslint-disable import/prefer-default-export */
import { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  //   await knex('table_name').del()

  // Inserts seed entries
  await knex('products').insert([
    {
      type: 'margarita',
      price_s: 3.0,
      price_m: 5.0,
      price_l: 8.0,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      type: 'marinara',
      price_s: 3.0,
      price_m: 5.0,
      price_l: 8.0,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      type: 'salami',
      price_s: 3.0,
      price_m: 5.0,
      price_l: 8.0,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ])
}
