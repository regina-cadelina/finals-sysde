"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  phone?: string
  createdAt: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string, rememberMe?: boolean) => Promise<boolean>
  register: (userData: RegisterData) => Promise<boolean>
  logout: () => void
  updateProfile: (userData: Partial<User>) => Promise<boolean>
}

interface RegisterData {
  firstName: string
  lastName: string
  email: string
  phone?: string
  password: string
  newsletter?: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user")
    const token = localStorage.getItem("authToken")

    if (savedUser && token) {
      setUser(JSON.parse(savedUser))
      setIsAuthenticated(true)
    }
  }, [])

  const login = async (email: string, password: string, rememberMe = false): Promise<boolean> => {
    try {
      // In a real app, this would be an API call
      // For demo purposes, we'll simulate authentication
      if (email === "demo@example.com" && password === "password123") {
        const mockUser: User = {
          id: 1,
          firstName: "John",
          lastName: "Doe",
          email: "demo@example.com",
          phone: "(555) 123-4567",
          createdAt: new Date().toISOString(),
        }

        setUser(mockUser)
        setIsAuthenticated(true)

        // Save to localStorage
        localStorage.setItem("user", JSON.stringify(mockUser))
        localStorage.setItem("authToken", "mock-jwt-token")

        if (rememberMe) {
          localStorage.setItem("rememberMe", "true")
        }

        return true
      }

      // Check if user exists in localStorage (for registered users)
      const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]")
      const foundUser = registeredUsers.find((u: any) => u.email === email && u.password === password)

      if (foundUser) {
        const { password: _, ...userWithoutPassword } = foundUser
        setUser(userWithoutPassword)
        setIsAuthenticated(true)

        localStorage.setItem("user", JSON.stringify(userWithoutPassword))
        localStorage.setItem("authToken", "mock-jwt-token")

        return true
      }

      return false
    } catch (error) {
      console.error("Login error:", error)
      return false
    }
  }

  const register = async (userData: RegisterData): Promise<boolean> => {
    try {
      // In a real app, this would be an API call
      const newUser: User = {
        id: Date.now(),
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        phone: userData.phone,
        createdAt: new Date().toISOString(),
      }

      // Save to mock database (localStorage)
      const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]")

      // Check if email already exists
      if (registeredUsers.some((u: any) => u.email === userData.email)) {
        return false
      }

      registeredUsers.push({ ...newUser, password: userData.password })
      localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers))

      // Auto-login after registration
      setUser(newUser)
      setIsAuthenticated(true)
      localStorage.setItem("user", JSON.stringify(newUser))
      localStorage.setItem("authToken", "mock-jwt-token")

      return true
    } catch (error) {
      console.error("Registration error:", error)
      return false
    }
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem("user")
    localStorage.removeItem("authToken")
    localStorage.removeItem("rememberMe")
  }

  const updateProfile = async (userData: Partial<User>): Promise<boolean> => {
    try {
      if (!user) return false

      const updatedUser = { ...user, ...userData }
      setUser(updatedUser)
      localStorage.setItem("user", JSON.stringify(updatedUser))

      // Update in registered users as well
      const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]")
      const updatedUsers = registeredUsers.map((u: any) => (u.id === user.id ? { ...u, ...userData } : u))
      localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers))

      return true
    } catch (error) {
      console.error("Update profile error:", error)
      return false
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
