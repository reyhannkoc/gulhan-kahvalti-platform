import type { User } from '../types'

const tokenKey = 'gulhan_token'
const userKey = 'gulhan_user'

export function getStoredToken() {
  return localStorage.getItem(tokenKey)
}

export function setStoredToken(token: string) {
  localStorage.setItem(tokenKey, token)
}

export function clearStoredToken() {
  localStorage.removeItem(tokenKey)
}

export function getStoredUser(): User | null {
  const rawUser = localStorage.getItem(userKey)

  if (!rawUser) {
    return null
  }

  try {
    return JSON.parse(rawUser) as User
  } catch {
    localStorage.removeItem(userKey)
    return null
  }
}

export function setStoredUser(user: User) {
  localStorage.setItem(userKey, JSON.stringify(user))
}

export function clearStoredUser() {
  localStorage.removeItem(userKey)
}
