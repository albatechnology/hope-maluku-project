"use client"

import React, { useEffect, useState, createContext, useContext } from "react"
import { useRouter, usePathname } from "next/navigation"
import { getAdminToken, getAdminUser, clearAdminSession, AdminUser } from "@/lib/adminAuth"
import { Loader2 } from "lucide-react"

interface AdminAuthContextType {
  user: AdminUser | null
  token: string | null
  logout: () => Promise<void>
}

const AdminAuthContext = createContext<AdminAuthContextType>({
  user: null,
  token: null,
  logout: async () => {},
})

export const useAdminAuth = () => useContext(AdminAuthContext)

export default function AdminAuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [user, setUser] = useState<AdminUser | null>(null)
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = getAdminToken()
      const storedUser = getAdminUser()

      if (!storedToken || !storedUser) {
        setIsAuthenticated(false)
        setLoading(false)
        const redirectUrl = encodeURIComponent(pathname)
        router.replace(`/admin/login?redirect=${redirectUrl}`)
        return
      }

      // Fast-path: local session valid, set state
      setUser(storedUser)
      setToken(storedToken)
      setIsAuthenticated(true)
      setLoading(false)

      // Background verification against backend
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
        const res = await fetch(`${apiUrl}/api/auth/admin/me`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            Accept: "application/json",
          },
        })

        if (!res.ok) {
          clearAdminSession()
          setIsAuthenticated(false)
          const redirectUrl = encodeURIComponent(pathname)
          router.replace(`/admin/login?redirect=${redirectUrl}`)
        } else {
          const data = await res.json()
          if (data?.data) {
            setUser(data.data)
          }
        }
      } catch (err) {
        // In case of offline/network glitch, preserve authenticated state if local token exists
        console.warn("Backend auth verification warning:", err)
      }
    }

    checkAuth()
  }, [pathname, router])

  const handleLogout = async () => {
    const { adminLogout } = await import("@/lib/adminAuth")
    await adminLogout()
    router.replace("/admin/login")
  }

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        <p className="text-sm text-gray-500 font-medium">Memverifikasi sesi admin...</p>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <AdminAuthContext.Provider value={{ user, token, logout: handleLogout }}>
      {children}
    </AdminAuthContext.Provider>
  )
}
