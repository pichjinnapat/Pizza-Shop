import * as dotenv from 'dotenv'

dotenv.config({ path: '.env' })

export default {
  appName: 'Rikai',
  api: {
    uri: process.env.REACT_APP_API_URI || 'http://192.168.1.54:4000',
  },
}
