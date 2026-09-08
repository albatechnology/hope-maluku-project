"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { getAdminToken } from "@/lib/adminAuth"
import { Loader2 } from "lucide-react"

export default function AdminIndexPage() {
  const router = useRouter()

  useEffect(() => {
    const token = getAdminToken()
    if (token) {
      router.replace("/admin/scanner")
    } else {
      router.replace("/admin/login")
    }
  }, [router])

  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center gap-3">
      <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
      <p className="text-sm text-slate-500">Mengalihkan ke panel admin...</p>
    </div>
  )
}
