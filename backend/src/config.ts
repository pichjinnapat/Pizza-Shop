import * as dotenv from 'dotenv'

dotenv.config({ path: '.env' })

export default {
  port: process.env.PORT || 4000,
  dbUser: process.env.DB_USER || 'user',
  dbPassword: process.env.DB_PASSWORD || 'pass',
  dbName: process.env.DB_NAME || 'pizza_shop_db',
}
