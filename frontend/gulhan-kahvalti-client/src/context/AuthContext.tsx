import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { authService } from '../services/authService'
import type { LoginRequest, RegisterRequest, User } from '../types'
import {
  clearStoredToken,
  clearStoredUser,
  getStoredToken,
  getStoredUser,
  setStoredToken,
  setStoredUser,
} from '../utils/authStorage'

interface AuthContextValue {
  user: User | null
  token: string | null
  loading: boolean
  isAuthenticated: boolean
  login: (request: LoginRequest) => Promise<void>
  register: (request: RegisterRequest) => Promise<void>
  logout: () => void
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(() => getStoredUser())
  const [token, setToken] = useState<string | null>(() => getStoredToken())
  const [loading, setLoading] = useState(false)

  const logout = useCallback(() => {
    clearStoredToken()
    clearStoredUser()
    setToken(null)
    setUser(null)
  }, [])

  useEffect(() => {
    window.addEventListener('gulhan:auth-expired', logout)
    return () => window.removeEventListener('gulhan:auth-expired', logout)
  }, [logout])

  const persistSession = useCallback((nextToken: string, nextUser: User) => {
    setStoredToken(nextToken)
    setStoredUser(nextUser)
    setToken(nextToken)
    setUser(nextUser)
  }, [])

  const login = useCallback(
    async (request: LoginRequest) => {
      setLoading(true)

      try {
        const { auth, user: nextUser } = await authService.login(request)
        persistSession(auth.token, nextUser)
      } finally {
        setLoading(false)
      }
    },
    [persistSession],
  )

  const register = useCallback(
    async (request: RegisterRequest) => {
      setLoading(true)

      try {
        const { auth, user: nextUser } = await authService.register(request)
        persistSession(auth.token, nextUser)
      } finally {
        setLoading(false)
      }
    },
    [persistSession],
  )

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      loading,
      isAuthenticated: Boolean(token && user),
      login,
      register,
      logout,
    }),
    [loading, login, logout, register, token, user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
