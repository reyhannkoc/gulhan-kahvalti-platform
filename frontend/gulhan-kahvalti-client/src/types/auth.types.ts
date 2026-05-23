export type UserRole = 'Admin' | 'User'

export interface User {
  id: number
  fullName: string
  email: string
  role: UserRole
}

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  fullName: string
  email: string
  password: string
}

export interface AuthResponse {
  userId: number
  fullName: string
  email: string
  role: UserRole
  token: string
}
