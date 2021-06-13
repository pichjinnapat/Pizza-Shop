import { Router } from 'express'
import { number, object, ObjectSchema, string } from 'joi'
// import knex from 'knex'
import { db } from '../database'
import { ProductSize } from '../products'
import { BaseEntity } from '../types'
import ValidationError from '../errors/ValidationError'

const router = Router()

export enum OrderStatus {
  NEW,
  PREPARING,
  DELIVERING,
  DELIVERED,
}

export type Order = {
  product_id: number
  number: number
  size: ProductSize
  status: OrderStatus
  destination_address: string
  user_id: number
} & BaseEntity

const orderSchema: ObjectSchema<Order> = object({
  product_id: number().required().error(new Error('Product Id is required and must be a Number')),
  number: number()
    .required()
    .error(new Error('Number of products is required and must be a Number')),
  size: string().required().error(new Error('Product Size is required and must be s, m, l')),
  status: number().required().error(new Error('Order Status is required must be a number')),
  destination_address: string().required().error(new Error('Address is required must be a number')),
  user_id: number().required().error(new Error('User Id is required and must be a number')),
})

const createOrder = async (req, res): Promise<void> => {
  try {
    const order: Order = { ...req.body, status: OrderStatus.NEW }
    const { error } = orderSchema.validate(order)

    if (error) {
      throw new ValidationError(error.message)
    }

    const client = await db().connect()

    const sql = `INSERT INTO orders (product_id, number, size, status, destination_address, user_id)
    VALUES ('${order.product_id}', '${order.number}', '${order.size}', '${order.status}', '${order.destination_address}', '${order.user_id}') RETURNING *;`
    const { rows } = await client.query(sql)
    const newOrder: Order = rows[0]

    client.release()

    res.send(newOrder)
  } catch (error) {
    res.status(error.statusCode).send(error.message)
  }
}

const getOrders = async (req, res): Promise<void> => {
  try {
    const client = await db().connect()

    const sql = 'SELECT * FROM orders'
    const { rows } = await client.query(sql)
    const orders: Order[] = rows

    client.release()

    res.send(orders)
  } catch (error) {
    res.status(400).send(error)
  }
}

const updateOrder = async (req, res): Promise<void> => {
  try {
    const orderId: number = req.params.id
    let order: Order = req.body
    const { error } = orderSchema.validate(order)

    if (error) {
      throw new ValidationError(error.message)
    }

    const client = await db().connect()

    const currOrder = await client.query(`SELECT * FROM orders WHERE id = ${orderId}`)

    if (currOrder.rows[0].status === OrderStatus.DELIVERED) {
      order = { ...order, status: OrderStatus.DELIVERED }
    }

    const sql = `UPDATE orders SET
    product_id = '${order.product_id}',
    number = '${order.number}',
    size = '${order.size}',
    status = '${order.status}',
    destination_address: '${order.destination_address}'
    user_id = '${order.user_id}'
    WHERE id = ${orderId} RETURNING *;`
    const { rows } = await client.query(sql)
    const updatedOrder: Order = rows[0]

    client.release()

    res.send(updatedOrder)
  } catch (error) {
    res.status(error.statusCode).send(error.message)
  }
}

const deleteOrder = async (req, res): Promise<void> => {
  try {
    const orderId: number = req.params.id

    const client = await db().connect()

    const deleteSql = `DELETE FROM orders WHERE id = ${orderId} RETURNING *;`
    await client.query(deleteSql)

    const sql = `SELECT * FROM orders`
    const { rows } = await client.query(sql)
    const orders: Order[] = rows

    client.release()

    res.send(orders)
  } catch (error) {
    res.status(error.statusCode).send(error.message)
  }
}

const getOrdersByStatus = async (req, res): Promise<void> => {
  try {
    const { status } = req.params

    const client = await db().connect()

    const sql = `SELECT * FROM orders WHERE status = ${status}`
    const { rows } = await client.query(sql)
    const orders: Order[] = rows

    client.release()

    res.send(orders)
  } catch (error) {
    res.status(400).send(error)
  }
}

const getOrdersByCustomer = async (req, res): Promise<void> => {
  try {
    const customerEmail = req.body.email

    const client = await db().connect()

    const { rows: user } = await client.query(
      `SELECT * FROM users WHERE email = '${customerEmail}'`
    )

    const sql = `SELECT * FROM orders WHERE user_id = ${user[0].id}`
    const { rows } = await client.query(sql)

    const orders: Order[] = rows

    client.release()

    res.send(orders)
  } catch (error) {
    res.status(400).send(error)
  }
}

router.post('/', createOrder)
router.get('/', getOrders)
router.put('/:id', updateOrder)
router.post('/:id/delete', deleteOrder)
router.get('/status/:status', getOrdersByStatus)
router.get('/customer', getOrdersByCustomer)

export default router
