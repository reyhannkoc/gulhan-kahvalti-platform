import type { User } from '../types'

const tokenKey = 'gulhan_token'
const userKey = 'gulhan_user'
const authStorageKeys = [tokenKey, userKey]

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
    const user = JSON.parse(rawUser) as User

    if (!isStoredUserValid(user)) {
      localStorage.removeItem(userKey)
      return null
    }

    return user
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

export function clearStoredAuth() {
  const keysToRemove = new Set(authStorageKeys)

  for (let index = 0; index < localStorage.length; index += 1) {
    const key = localStorage.key(index)

    if (key?.startsWith('gulhan_')) {
      keysToRemove.add(key)
    }
  }

  for (const key of keysToRemove) {
    localStorage.removeItem(key)
  }
}

function isStoredUserValid(user: User | null): user is User {
  return Boolean(
    user &&
      typeof user.id === 'number' &&
      typeof user.fullName === 'string' &&
      typeof user.email === 'string' &&
      typeof user.role === 'string',
  )
}
