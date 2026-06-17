"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Maluku" },
  { href: "/ambon", label: "Ambon City" },
  { href: "/nature", label: "Nature & Tourism" },
  { href: "/culture", label: "Culture & Heritage" },
  { href: "/culinary", label: "Culinary" },
  { href: "/people", label: "People & Community" },
  { href: "/economy", label: "Economy & Opportunity" },
  { href: "/youth", label: "Youth & Future" },
  { href: "/events", label: "Events" },
  { href: "/media", label: "Media & Stories" },
  { href: "/collaboration", label: "Collaboration" },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      )}
    >
      <nav className="container flex items-center justify-between h-16 md:h-20">
        <Link href="/" className="flex items-center gap-2">
          <span className={cn("text-xl md:text-2xl font-heading font-bold transition-colors", scrolled ? "text-navy" : "text-white")}>
            Energizing <span className="text-crimson">Maluku</span>
          </span>
        </Link>

        <div className="hidden xl:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                pathname === link.href
                  ? scrolled
                    ? "text-crimson bg-crimson/5"
                    : "text-crimson bg-white/10"
                  : scrolled
                    ? "text-navy/80 hover:text-crimson hover:bg-crimson/5"
                    : "text-white/80 hover:text-white hover:bg-white/10"
              )}
            >
              {link.label}
            </Link>
          ))}
          <div className={cn("ml-3 pl-3 flex items-center gap-2 transition-colors", scrolled ? "border-l border-gray-200" : "border-l border-white/20")}>
            <span className={cn("text-xs font-medium transition-colors", scrolled ? "text-navy/60" : "text-white/60")}>ID</span>
            <span className={cn("text-xs transition-colors", scrolled ? "text-gray-300" : "text-white/30")}>|</span>
            <span className="text-xs font-medium text-crimson">EN</span>
          </div>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn("xl:hidden p-2 rounded-lg transition-colors", scrolled ? "hover:bg-gray-100" : "hover:bg-white/10")}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X className={cn("w-6 h-6 transition-colors", scrolled ? "text-navy" : "text-white")} /> : <Menu className={cn("w-6 h-6 transition-colors", scrolled ? "text-navy" : "text-white")} />}
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden bg-white border-t border-gray-100 overflow-hidden shadow-lg"
          >
            <div className="container py-4 max-h-[80vh] overflow-y-auto">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "block px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                    pathname === link.href
                      ? "text-crimson bg-crimson/5"
                      : "text-navy/80 hover:text-crimson hover:bg-crimson/5"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex items-center gap-2 px-4 py-3 mt-2 border-t border-gray-100">
                <span className="text-sm font-medium text-navy/60">ID</span>
                <span className="text-sm text-gray-300">|</span>
                <span className="text-sm font-medium text-crimson">EN</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
