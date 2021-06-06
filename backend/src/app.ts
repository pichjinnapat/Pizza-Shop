import express from 'express'
import cors from 'cors'
import pino from 'pino-http'
import logger from './logger'
import { initDatabase } from './database'
import config from './config'
import orderRouter from './orders'
import productRouter from './products'
import userRouter from './users'

const { dbUser, dbPassword, dbName } = config

const app = express()
initDatabase({ dbUser, dbPassword, dbName })

app.use(cors())
app.use(express.json())
app.use(pino({ logger }))

app.use('/orders', orderRouter)
app.use('/products', productRouter)
app.use('/users', userRouter)

export default app
