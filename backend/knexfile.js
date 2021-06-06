import * as dotenv from 'dotenv'
import config from './src/config'

dotenv.config({ path: '.env' })

const { dbUser, dbPassword, dbName } = config

module.exports = {
  development: {
    client: 'pg',
    connection: `postgres://${dbUser}:${dbPassword}@postgresdb:5432/${dbName}`,
    migrations: {
      directory: './migrations',
    },
    seeds: {
      directory: './seeds',
    },
    useNullAsDefault: true,
  },
}
