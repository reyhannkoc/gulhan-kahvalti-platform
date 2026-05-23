import { api } from './api'
import type { AuthResponse, LoginRequest, RegisterRequest, User } from '../types'

function mapAuthResponseToUser(response: AuthResponse): User {
  return {
    id: response.userId,
    fullName: response.fullName,
    email: response.email,
    role: response.role,
  }
}

export const authService = {
  async login(request: LoginRequest) {
    const { data } = await api.post<AuthResponse>('/auth/login', request)
    return { auth: data, user: mapAuthResponseToUser(data) }
  },

  async register(request: RegisterRequest) {
    const { data } = await api.post<AuthResponse>('/auth/register', request)
    return { auth: data, user: mapAuthResponseToUser(data) }
  },

  async me() {
    const { data } = await api.get<User>('/auth/me')
    return data
  },
}
