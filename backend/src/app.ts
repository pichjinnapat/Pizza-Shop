import express from 'express'
import cors from 'cors'
import pino from 'pino-http'
import logger from './logger'
import { initDatabase } from './database'
import config from './config'
import orderRouter from './orders'
import productRouter from './products'
import userRouter from './users'

const { connectionString } = config

const app = express()
initDatabase(connectionString)

app.use(cors())
app.use(express.json())
app.use(pino({ logger }))

app.get('/', (req, res) => {
  try {
    res
      .send({
        message: 'OK',
      })
      .status(200)
  } catch (error) {
    res.status(error.statusCode).send(error)
  }
})

app.use('/orders', orderRouter)
app.use('/products', productRouter)
app.use('/users', userRouter)

export default app
