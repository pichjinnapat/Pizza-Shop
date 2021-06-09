import { Router } from 'express'
import { db } from '../database'
import { BaseEntity } from '../types'

export enum ProductSize {
  SMALL = 's',
  MEDIUM = 'm',
  LARGE = 'l',
}

export type ProductType = {
  type: string
  price_s: number
  price_m: number
  price_l: number
} & BaseEntity

const router = Router()

const getProducts = async (req, res): Promise<void> => {
  try {
    const client = await db().connect()

    const sql = 'SELECT * FROM products'
    const { rows } = await client.query(sql)
    const todos = rows

    client.release()

    res.send(todos)
  } catch (error) {
    res.status(400).send(error)
  }
}

router.get('/', getProducts)

export default router
