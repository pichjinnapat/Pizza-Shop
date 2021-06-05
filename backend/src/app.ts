import express from 'express'
import cors from 'cors'
import pino from 'pino-http'
import logger from './logger'
import { initDatabase } from './database'
import config from './config'
import testget from './router/testget'

const { dbUser, dbPassword, dbName } = config

const app = express()
initDatabase({ dbUser, dbPassword, dbName })

app.use(cors())
app.use(express.json())
app.use(pino({ logger }))

app.use('/users', testget)

export default app
