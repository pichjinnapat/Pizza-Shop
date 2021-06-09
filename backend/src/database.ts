import { Pool } from 'pg'
import DBError from './errors/DBError'
import logger from './logger'

let dbClient: Pool

export const initDatabase = async (
  connectionString: string,
  callBack?: () => void
): Promise<void> => {
  try {
    const client = new Pool({
      connectionString,
      // connectionString: `postgres://${dbUser}:${dbPassword}@postgresdb:5432/${dbName}`,
    })
    await client.connect()
    dbClient = client
    logger.info('👌 Connected to database successfully')
    if (callBack) callBack()
  } catch (err) {
    throw new DBError(err.code, err.message)
  }
}

export const db = (): Pool => {
  return dbClient
}
