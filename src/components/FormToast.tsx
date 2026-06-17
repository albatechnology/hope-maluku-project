"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, X } from "lucide-react"

type FormToastProps = {
  message?: string
}

export default function FormToast({ message = "Thank you! Your submission has been received." }: FormToastProps) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const handler = (e: CustomEvent) => {
      setShow(true)
      setTimeout(() => setShow(false), 5000)
    }
    window.addEventListener("form-toast" as any, handler as any)
    return () => window.removeEventListener("form-toast" as any, handler as any)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: 50, x: "-50%" }}
          className="fixed bottom-24 left-1/2 z-50 flex items-center gap-3 bg-navy text-white px-6 py-4 rounded-xl shadow-xl min-w-[300px]"
        >
          <CheckCircle className="w-5 h-5 text-green-400 shrink-0" />
          <span className="text-sm">{message}</span>
          <button onClick={() => setShow(false)} className="ml-auto p-1 hover:bg-white/10 rounded">
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function showToast(message?: string) {
  const event = new CustomEvent("form-toast", { detail: { message } })
  window.dispatchEvent(event)
}
