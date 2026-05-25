import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { useNavigate } from 'react-router-dom'
import { authService } from '../services/authService'
import type { LoginRequest, RegisterRequest, User } from '../types'
import {
  clearStoredAuth,
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
  isAdmin: boolean
  isUser: boolean
  login: (request: LoginRequest) => Promise<User>
  register: (request: RegisterRequest) => Promise<User>
  logout: () => void
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(() => getStoredUser())
  const [token, setToken] = useState<string | null>(() => getStoredToken())
  const [loading, setLoading] = useState(() => Boolean(getStoredToken()))
  const navigate = useNavigate()

  const logout = useCallback(() => {
    clearStoredAuth()
    setToken(null)
    setUser(null)
    navigate('/login', { replace: true })
  }, [navigate])

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

  useEffect(() => {
    let isMounted = true

    async function validateStoredSession() {
      const storedToken = getStoredToken()

      if (!storedToken) {
        clearStoredAuth()
        if (isMounted) {
          setToken(null)
          setUser(null)
          setLoading(false)
        }
        return
      }

      try {
        const currentUser = await authService.me()

        if (!isMounted) {
          return
        }

        setStoredUser(currentUser)
        setToken(storedToken)
        setUser(currentUser)
      } catch {
        clearStoredAuth()

        if (isMounted) {
          setToken(null)
          setUser(null)
          navigate('/login', { replace: true })
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    validateStoredSession()

    return () => {
      isMounted = false
    }
  }, [navigate])

  const login = useCallback(
    async (request: LoginRequest) => {
      setLoading(true)

      try {
        const { auth, user: nextUser } = await authService.login(request)
        persistSession(auth.token, nextUser)
        return nextUser
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
        return nextUser
      } finally {
        setLoading(false)
      }
    },
    [persistSession],
  )

  const normalizedRole = user?.role.toLowerCase()
  const isAuthenticated = Boolean(token && user)
  const isAdmin = isAuthenticated && normalizedRole === 'admin'
  const isUser = isAuthenticated && normalizedRole === 'user'

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      loading,
      isAuthenticated,
      isAdmin,
      isUser,
      login,
      register,
      logout,
    }),
    [isAdmin, isAuthenticated, isUser, loading, login, logout, register, token, user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
