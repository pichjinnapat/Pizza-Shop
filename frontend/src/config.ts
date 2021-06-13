import * as dotenv from 'dotenv'

dotenv.config({ path: '.env' })

export default {
  appName: 'Rikai',
  api: {
    uri: process.env.REACT_APP_API_URI || 'http://localhost:4000',
  },
}
