import { Router } from 'express'
import { object, ObjectSchema, string } from 'joi'
import { db } from '../database'
import ValidationError from '../errors/ValidationError'
import { BaseEntity } from '../types'

const router = Router()

export type User = {
  first_name: string
  last_name: string
  email: string
  address: string
} & BaseEntity

const userSchema: ObjectSchema<User> = object({
  first_name: string().required().error(new Error('Fristname is required and must be string')),
  last_name: string().required().error(new Error('Lastname is required and must be string')),
  email: string().required().error(new Error('Email is required and must be string')),
  address: string().required().error(new Error('Address is required and must be string')),
})

const getUser = async (req, res): Promise<void> => {
  try {
    const userId: number = req.params.id
    const client = await db().connect()

    const sql = `SELECT * FROM users WHERE id = ${userId}`
    const { rows } = await client.query(sql)
    const user: User = rows[0]

    client.release()

    res.send(user)
  } catch (error) {
    res.status(400).send(error)
  }
}

const createUser = async (req, res): Promise<void> => {
  try {
    const user: User = req.body
    const { error } = userSchema.validate(user)

    if (error) {
      throw new ValidationError(error.message)
    }

    const client = await db().connect()

    const sql = `INSERT INTO users (first_name, last_name, email, address)
    VALUES ('${user.first_name}', '${user.last_name}', '${user.email}', '${user.address}') RETURNING *;`
    const { rows } = await client.query(sql)
    const newUser: User = rows[0]

    client.release()

    res.send(newUser)
  } catch (error) {
    res.status(error.statusCode).send(error.message)
  }
}

const deleteUser = async (req, res): Promise<void> => {
  try {
    const userId: number = req.params.id

    const client = await db().connect()

    const deleteSql = `DELETE FROM users WHERE id = ${userId} RETURNING *;`
    await client.query(deleteSql)

    const sql = `SELECT * FROM orders`
    const { rows } = await client.query(sql)
    const users: User[] = rows

    client.release()

    res.send(users)
  } catch (error) {
    res.status(error.statusCode).send(error.message)
  }
}

router.get('/:id', getUser)
router.post('/', createUser)
router.post('/:id/delete', deleteUser)

export default router
