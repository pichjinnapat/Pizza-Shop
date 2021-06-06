import { Router } from 'express'
import { db } from '../database'

const router = Router()
const getUsers = async (req, res): Promise<void> => {
  try {
    const client = await db().connect()

    const sql = 'SELECT * FROM users'
    const { rows } = await client.query(sql)
    const todos = rows

    client.release()

    res.send(todos)
  } catch (error) {
    res.status(400).send(error)
  }
}

router.get('/', getUsers)

export default router
