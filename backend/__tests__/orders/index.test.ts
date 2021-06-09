import express from 'express'
import request from 'supertest'
import orderRoute, { OrderStatus } from '../../src/orders'
import { ProductSize } from '../../src/products'

const app = express()
app.use(express.json())
app.use('/orders', orderRoute)

it('POST /states - success', async () => {
  const stateObj = {
    product_id: 1,
    number: 2,
    size: ProductSize.MEDIUM,
    status: OrderStatus.NEW,
    user_id: 1,
  }
  const res = await request(app).post('/orders/').send(stateObj)
  expect(res).toEqual({
    product_id: 1,
    number: 2,
    size: ProductSize.MEDIUM,
    status: OrderStatus.NEW,
    user_id: 1,
  })
})
