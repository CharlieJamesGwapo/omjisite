import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('omji-token'))

  const login = (newToken) => {
    localStorage.setItem('omji-token', newToken)
    setToken(newToken)
  }

  const logout = () => {
    localStorage.removeItem('omji-token')
    setToken(null)
  }

  return (
    <AuthContext.Provider value={{ token, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
