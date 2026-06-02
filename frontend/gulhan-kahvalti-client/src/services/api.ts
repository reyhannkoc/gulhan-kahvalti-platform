import axios, { AxiosError } from 'axios'
import { clearStoredToken, clearStoredUser, getStoredToken } from '../utils/authStorage'

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
const requestTimeoutMs = 15000

if (!apiBaseUrl) {
  throw new Error('VITE_API_BASE_URL is not configured.')
}

function isLocalApiUrl(url: string) {
  return /https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?/i.test(url)
}

function isLocalBrowserHost() {
  if (typeof window === 'undefined') {
    return true
  }

  return ['localhost', '127.0.0.1'].includes(window.location.hostname)
}

const productionLocalhostMessage =
  import.meta.env.PROD && isLocalApiUrl(apiBaseUrl) && !isLocalBrowserHost()
    ? 'API adresi production ortamında localhost olarak ayarlanmış. Render frontend ortam değişkeninde VITE_API_BASE_URL değerini deployed backend URL’i olarak güncelleyin.'
    : null

export const api = axios.create({
  baseURL: apiBaseUrl,
  timeout: requestTimeoutMs,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  if (productionLocalhostMessage) {
    return Promise.reject(new Error(productionLocalhostMessage))
  }

  const token = getStoredToken()

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      clearStoredToken()
      clearStoredUser()
      window.dispatchEvent(new Event('gulhan:auth-expired'))
    }

    return Promise.reject(error)
  },
)

export function getApiErrorMessage(error: unknown, fallback = 'Bir hata oluştu.') {
  if (axios.isAxiosError(error)) {
    const responseData = error.response?.data as { message?: string } | undefined

    if (responseData?.message) {
      return responseData.message
    }

    if (error.code === 'ECONNABORTED') {
      return 'İstek zaman aşımına uğradı. Backend uyanıyor olabilir, lütfen tekrar deneyin.'
    }

    if (error.code === 'ERR_NETWORK') {
      return 'API sunucusuna ulaşılamadı. İnternet bağlantısını ve production API adresini kontrol edin.'
    }

    return error.message ?? fallback
  }

  if (error instanceof Error) {
    return error.message
  }

  return fallback
}
