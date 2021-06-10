import axios from 'axios'
import config from './config'

const axiosInstance = axios.create({
  baseURL: config.api.uri,
})

axiosInstance.interceptors.request.use((requestConfig) => {
  const newConfig = { ...requestConfig }

  return newConfig
})

export default axiosInstance
