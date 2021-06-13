/* eslint-disable import/prefer-default-export */
import { Knex } from 'knex'
import { ProductType } from '../src/products'

export async function seed(knex: Knex): Promise<void> {
  const products: ProductType[] = [
    {
      type: 'Margarita',
      price_s: 3.0,
      price_m: 5.0,
      price_l: 8.0,
    },
    {
      type: 'Marinara',
      price_s: 3.0,
      price_m: 5.0,
      price_l: 8.0,
    },
    {
      type: 'Salami',
      price_s: 3.0,
      price_m: 5.0,
      price_l: 8.0,
    },
  ]

  await knex('products').insert(products).onConflict('type').merge()
}
