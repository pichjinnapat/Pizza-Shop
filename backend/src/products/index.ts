import { Router } from 'express'
import { db } from '../database'

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
