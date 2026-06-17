"use client"

import Link from "next/link"
import { Mail, MapPin, Phone, Globe, Play, MessageCircle, X, Music2 } from "lucide-react"

const quickLinks = [
  { href: "/about", label: "About Maluku" },
  { href: "/nature", label: "Nature & Tourism" },
  { href: "/culture", label: "Culture & Heritage" },
  { href: "/economy", label: "Economy & Opportunity" },
  { href: "/events", label: "Events" },
  { href: "/media", label: "Media & Stories" },
]

const programs = [
  { href: "/youth", label: "Youth Program" },
  { href: "/collaboration", label: "Collaboration" },
  { href: "/events", label: "Upcoming Events" },
  { href: "/people", label: "Community" },
]

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div>
            <h3 className="text-xl font-heading font-bold mb-4">
              Energizing <span className="text-gold">Maluku</span>
            </h3>
            <p className="text-white/70 text-sm leading-relaxed mb-4">
              Membangun Harapan dari Timur Indonesia
            </p>
            <div className="space-y-2 text-sm text-white/60">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-gold shrink-0" />
                <span>Ambon, Maluku, Indonesia</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gold shrink-0" />
                <span>hello@energizingmaluku.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gold shrink-0" />
                <span>+62 123 4567 890</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-gold">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-gold">
              Programs
            </h4>
            <ul className="space-y-2">
              {programs.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-gold">
              Subscribe
            </h4>
            <p className="text-sm text-white/60 mb-3">
              Dapatkan update terbaru dari Energizing Maluku
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-sm text-white placeholder-white/40 focus:outline-none focus:border-gold transition-colors"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-crimson hover:bg-crimson/90 text-white text-sm font-medium rounded-lg transition-colors"
              >
                Subscribe
              </button>
            </form>
            <div className="flex items-center gap-3 mt-6">
              <a href="#" className="p-2 bg-white/10 hover:bg-gold/20 rounded-full transition-colors" aria-label="Instagram">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-white/10 hover:bg-gold/20 rounded-full transition-colors" aria-label="YouTube">
                <Play className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-white/10 hover:bg-gold/20 rounded-full transition-colors" aria-label="Facebook">
                <MessageCircle className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-white/10 hover:bg-gold/20 rounded-full transition-colors" aria-label="Twitter/X">
                <X className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-white/10 hover:bg-gold/20 rounded-full transition-colors" aria-label="TikTok">
                <Music2 className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-white/10 text-center">
          <p className="text-sm text-white/50">
            &copy; 2026 Energizing Maluku. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
