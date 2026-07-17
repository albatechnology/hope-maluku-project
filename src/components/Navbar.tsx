"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const exploreLinks = [
  { href: "/ambon", label: "Ambon City" },
  { href: "/nature", label: "Nature & Tourism" },
  { href: "/culture", label: "Culture & Heritage" },
  { href: "/culinary", label: "Culinary" },
  { href: "/people", label: "People & Community" },
  { href: "/economy", label: "Economy & Opportunity" },
  { href: "/youth", label: "Youth & Future" },
  { href: "/events-explore", label: "Events" },
  { href: "/media-explore", label: "Media & Stories" },
  { href: "/collaboration-explore", label: "Collaboration" },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [exploreOpen, setExploreOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
    setExploreOpen(false)
  }, [pathname])

  const linkClass = cn(
    "px-3 py-2 text-sm font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1",
    scrolled
      ? "text-navy hover:text-blue-600"
      : "text-navy hover:text-blue-600"
  )

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      )}
    >
      <nav className="container flex items-center justify-between h-20 md:h-24">
        <Link href="/" className="flex flex-shrink-0 items-center gap-2 mr-8">
          <div className="relative w-36 h-12">
            <Image
              src="/images/maluku-project-logo.png"
              alt="Energizing Maju Logo"
              fill
              className="object-contain object-left"
              priority
            />
          </div>
        </Link>

        <div className="hidden xl:flex flex-1 items-center justify-start gap-4">
          <Link href="/" className={linkClass}>HOME</Link>
          <Link href="/about" className={linkClass}>ABOUT MALUKU</Link>

          {/* Explore Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setExploreOpen(true)}
            onMouseLeave={() => setExploreOpen(false)}
          >
            <div className={linkClass}>
              EXPLORE MALUKU
              <ChevronDown className="w-4 h-4" />
            </div>

            <AnimatePresence>
              {exploreOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 w-64 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden py-2"
                >
                  <div className="text-xs font-medium text-gray-400 px-4 py-2 uppercase tracking-wider"></div>
                  {exploreLinks.map((link, idx) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block px-4 py-3 text-sm font-semibold text-gray-800 hover:bg-gray-50 border-b border-gray-50 last:border-0"
                    >
                      {link.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link href="/events" className={linkClass}>EVENTS</Link>
          <Link href="/media" className={linkClass}>MEDIA & STORIES</Link>
          <Link href="/collaboration" className={linkClass}>COLLABORATION</Link>
        </div>

        <div className="hidden xl:flex items-center gap-2">
          <div className="flex items-center gap-2 cursor-pointer text-sm font-semibold text-navy">
            <div className="w-5 h-5 rounded-full overflow-hidden border border-gray-200 flex items-center justify-center bg-gray-100">
              {/* Simplified Indonesian Flag */}
              <div className="w-full h-full flex flex-col">
                <div className="w-full h-1/2 bg-red-600"></div>
                <div className="w-full h-1/2 bg-white"></div>
              </div>
            </div>
            INDONESIA
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn("xl:hidden p-2 rounded-lg transition-colors text-navy hover:bg-gray-100")}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
            <div className="container py-4 max-h-[80vh] overflow-y-auto flex flex-col gap-2">
              <Link href="/" className="px-4 py-2 text-sm font-semibold text-navy">HOME</Link>
              <Link href="/about" className="px-4 py-2 text-sm font-semibold text-navy">ABOUT MALUKU</Link>
              <div className="px-4 py-2 font-semibold text-navy text-sm border-t border-gray-100 pt-3 mt-1">EXPLORE MALUKU</div>
              <div className="pl-8 flex flex-col gap-2">
                {exploreLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm font-medium text-gray-600"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <div className="border-t border-gray-100 pt-3 mt-1"></div>
              <Link href="/events" className="px-4 py-2 text-sm font-semibold text-navy">EVENTS</Link>
              <Link href="/media" className="px-4 py-2 text-sm font-semibold text-navy">MEDIA & STORIES</Link>
              <Link href="/collaboration" className="px-4 py-2 text-sm font-semibold text-navy">COLLABORATION</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
