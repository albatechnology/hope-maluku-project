"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { QrCode, LogOut, ShieldCheck, User as UserIcon } from "lucide-react"
import { getAdminUser, clearAdminSession, AdminUser, adminLogout } from "@/lib/adminAuth"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const isLoginPage = pathname === "/admin/login"
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null)
  const [loggingOut, setLoggingOut] = useState(false)

  useEffect(() => {
    if (!isLoginPage) {
      setCurrentUser(getAdminUser())
    }
  }, [pathname, isLoginPage])

  const handleLogout = async () => {
    if (confirm("Apakah Anda yakin ingin keluar dari sesi admin?")) {
      setLoggingOut(true)
      try {
        await adminLogout()
      } catch (err) {
        console.error("Logout error:", err)
        clearAdminSession()
      } finally {
        setLoggingOut(false)
        router.replace("/admin/login")
      }
    }
  }

  if (isLoginPage) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-navy to-slate-900 text-white">
        {children}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      {/* Admin Top Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-sm shadow-blue-500/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 tracking-tight">HOPE Indonesia</span>
                <span className="text-[11px] font-semibold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                  Admin Panel
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                Absensi Peserta & Check-In Event Hari-H
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              href="/admin/scanner"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                pathname === "/admin/scanner"
                  ? "bg-blue-50 text-blue-700 border border-blue-200/60"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <QrCode className="w-4 h-4" />
              <span className="hidden sm:inline">QR Scanner</span>
            </Link>

            {currentUser && (
              <div className="hidden md:flex items-center gap-2 pl-3 border-l border-slate-200 text-xs text-slate-600">
                <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 border border-slate-200">
                  <UserIcon className="w-3.5 h-3.5" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-slate-800 truncate max-w-[140px]">
                    {currentUser.name}
                  </p>
                  <p className="text-[11px] text-slate-500 truncate max-w-[140px]">
                    {currentUser.email}
                  </p>
                </div>
              </div>
            )}

            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors border border-transparent hover:border-red-200 disabled:opacity-50"
              title="Logout dari sesi admin"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {children}
      </main>
    </div>
  )
}
