export interface AdminUser {
  id: number
  name: string
  email: string
  type: string
}

const TOKEN_KEY = "hope_admin_token"
const USER_KEY = "hope_admin_user"

export function getAdminToken(): string | null {
  if (typeof window === "undefined") return null
  return localStorage.getItem(TOKEN_KEY)
}

export function getAdminUser(): AdminUser | null {
  if (typeof window === "undefined") return null
  const raw = localStorage.getItem(USER_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as AdminUser
  } catch {
    return null
  }
}

export function setAdminSession(token: string, user: AdminUser): void {
  if (typeof window === "undefined") return
  localStorage.setItem(TOKEN_KEY, token)
  localStorage.setItem(USER_KEY, JSON.stringify(user))

  // Also set cookie for same-origin or SSR convenience
  document.cookie = `${TOKEN_KEY}=${encodeURIComponent(token)}; path=/; max-age=604800; SameSite=Lax`
}

export function clearAdminSession(): void {
  if (typeof window === "undefined") return
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
  document.cookie = `${TOKEN_KEY}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax`
}

export async function adminLogout(): Promise<void> {
  const token = getAdminToken()
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

  if (token) {
    try {
      await fetch(`${apiUrl}/api/auth/admin/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })
    } catch (error) {
      console.warn("Logout API call error:", error)
    }
  }

  clearAdminSession()
}
