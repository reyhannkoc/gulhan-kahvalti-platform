import axios, { AxiosError } from 'axios'
import { clearStoredToken, clearStoredUser, getStoredToken } from '../utils/authStorage'

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

if (!apiBaseUrl) {
  throw new Error('VITE_API_BASE_URL is not configured.')
}

export const api = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
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

export function getApiErrorMessage(error: unknown, fallback = 'Bir hata olustu.') {
  if (axios.isAxiosError(error)) {
    const responseData = error.response?.data as { message?: string } | undefined
    return responseData?.message ?? error.message ?? fallback
  }

  if (error instanceof Error) {
    return error.message
  }

  return fallback
}
