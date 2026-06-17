"use client"

import Link from "next/link"
import { motion } from "framer-motion"

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-navy px-4">
      <div className="text-center">
        <motion.h1
          className="font-heading text-gold text-8xl font-bold"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          404
        </motion.h1>
        <motion.h2
          className="text-white text-3xl font-heading font-bold mt-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          Page Not Found
        </motion.h2>
        <motion.p
          className="text-white/60 mt-3 max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </motion.p>
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
        >
          <Link
            href="/"
            className="inline-block bg-gold text-navy px-6 py-3 rounded-xl font-semibold hover:bg-gold-light transition-colors"
          >
            Back to Home
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
