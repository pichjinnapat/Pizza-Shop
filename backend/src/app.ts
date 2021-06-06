import express from 'express'
import cors from 'cors'
import pino from 'pino-http'
import logger from './logger'
import { initDatabase } from './database'
import config from './config'
import testget from './routers/testget'
import createOrder from './orders/createOrder'
import retrieveOrder from './orders/retrieveOrder'
import updateOrder from './orders/updateOrder'
import deleteOrder from './orders/deleteOrder'

const { dbUser, dbPassword, dbName } = config

const app = express()
initDatabase({ dbUser, dbPassword, dbName })

app.use(cors())
app.use(express.json())
app.use(pino({ logger }))

app.use('/users', testget)
app.use('/pizza/create', createOrder)
app.use('/pizza/retrive', retrieveOrder)
app.use('/pizza/update', updateOrder)
app.use('/pizza/delete', deleteOrder)

export default app
