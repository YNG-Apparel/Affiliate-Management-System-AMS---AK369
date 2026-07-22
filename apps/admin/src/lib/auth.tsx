import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import { getStoredToken, setStoredToken } from './api'

export interface AuthUser {
  id: string
  email: string
  fullName: string
  roleId: number
  status: string
}

const USER_KEY = 'ams_admin_user'

function getStoredUser(): AuthUser | null {
  const raw = localStorage.getItem(USER_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as AuthUser
  } catch {
    return null
  }
}

export interface AuthState {
  isAuthenticated: boolean
  user: AuthUser | null
  login: (token: string, user: AuthUser) => void
  logout: () => void
}

const AuthContext = createContext<AuthState | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => getStoredToken())
  const [user, setUser] = useState<AuthUser | null>(() => getStoredUser())

  const value = useMemo<AuthState>(
    () => ({
      isAuthenticated: Boolean(token),
      user,
      login: (newToken, newUser) => {
        setStoredToken(newToken)
        localStorage.setItem(USER_KEY, JSON.stringify(newUser))
        setToken(newToken)
        setUser(newUser)
      },
      logout: () => {
        setStoredToken(null)
        localStorage.removeItem(USER_KEY)
        setToken(null)
        setUser(null)
      },
    }),
    [token, user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return ctx
}
