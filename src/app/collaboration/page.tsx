"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Globe,
  Handshake,
  Award,
  Check,
  Download,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import SectionWrapper from "@/components/SectionWrapper"
import { showToast } from "@/components/FormToast"
import { cn } from "@/lib/utils"

const stats = [
  { number: "1M+", label: "Reach", icon: Globe },
  { number: "50+", label: "Partners", icon: Handshake },
  { number: "100+", label: "Programs", icon: Award },
]

const tiers = [
  {
    name: "Gold Partner",
    bg: "bg-gold/5",
    border: "border-gold/30",
    price: "IDR 500M+ / year",
    benefits: [
      "Premium logo placement on website & materials",
      "Exclusive booth at main events",
      "15-min speaking slot at keynote",
      "10 VIP tickets to all events",
      "Social media campaign spotlight (6 posts)",
      "Co-branded content opportunities",
      "Quarterly impact report",
    ],
  },
  {
    name: "Silver Partner",
    bg: "bg-gray-50",
    border: "border-gray-200",
    price: "IDR 200M+ / year",
    benefits: [
      "Logo on website & select materials",
      "Standard booth at events",
      "5-min speaking slot",
      "5 VIP tickets",
      "Social media mentions (3 posts)",
      "Bi-annual impact report",
    ],
  },
  {
    name: "Supporting Partner",
    bg: "bg-white",
    border: "border-gray-200",
    price: "IDR 50M+ / year",
    benefits: [
      "Logo on partnership page",
      "Shared booth space",
      "2 VIP tickets",
      "Social media mention (1 post)",
      "Annual impact report",
    ],
  },
  {
    name: "Media Partner",
    bg: "bg-white",
    border: "border-gray-200",
    price: "In-kind / coverage",
    benefits: [
      "Logo on media partner page",
      "Media accreditation at events",
      "Interview opportunities",
      "Press release distribution",
      "Content syndication",
    ],
  },
]

const benefitsComparison = [
  { benefit: "Logo on Website", gold: true, silver: true, supporting: true, media: true },
  { benefit: "Logo on Event Banner", gold: true, silver: true, supporting: false, media: true },
  { benefit: "Booth at Event", gold: "Premium", silver: "Standard", supporting: "Shared", media: false },
  { benefit: "Speaking Slot", gold: "15 min", silver: "5 min", supporting: false, media: false },
  { benefit: "VIP Tickets", gold: 10, silver: 5, supporting: 2, media: false },
  { benefit: "Social Media Posts", gold: 6, silver: 3, supporting: 1, media: false },
  { benefit: "Co-branded Content", gold: true, silver: false, supporting: false, media: false },
  { benefit: "Media Accreditation", gold: true, silver: true, supporting: false, media: true },
  { benefit: "Impact Report", gold: "Quarterly", silver: "Bi-annual", supporting: "Annual", media: false },
]

const partnerLogos = [
  "PT. Danantara",
  "KADIN Indonesia",
  "IWAPI",
  "Bank Maluku",
  "Telkom Indonesia",
  "Garuda Indonesia",
]

export default function CollaborationPage() {
  const [form, setForm] = useState({
    organization: "",
    contact: "",
    email: "",
    type: "",
    message: "",
  })
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    showToast("Thank you! Our partnership team will reach out within 2-3 business days.")
    setForm({ organization: "", contact: "", email: "", type: "", message: "" })
  }

  return (
    <>
      {/* HERO */}
      <section className="relative bg-gradient-to-br from-gold/20 via-white to-navy/10 py-24 overflow-hidden">
        <motion.div
          className="container text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="font-heading text-navy text-5xl font-bold mb-4">Collaboration</h1>
          <p className="text-navy/60 text-sm tracking-wide">Together We Build</p>
        </motion.div>
      </section>

      {/* WHY PARTNER */}
      <SectionWrapper className="py-16" delay={0.1}>
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="bg-white shadow-lg rounded-xl p-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="w-14 h-14 rounded-full bg-gold flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-7 h-7 text-navy" />
                </div>
                <div className="text-3xl font-heading font-bold text-navy">{stat.number}</div>
                <div className="text-navy/60 text-sm mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* PARTNERSHIP TIERS */}
      <SectionWrapper className="py-16 bg-gray-50/50" delay={0.2}>
        <div className="container">
          <h2 className="text-3xl font-heading font-bold text-navy text-center mb-12">Partnership Tiers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tiers.map((tier, i) => (
              <motion.div
                key={tier.name}
                className={cn("rounded-xl border p-6 flex flex-col", tier.bg, tier.border)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <h3 className="text-xl font-heading font-bold text-navy mb-1">{tier.name}</h3>
                <p className="text-navy/60 text-sm mb-4">{tier.price}</p>
                <ul className="space-y-2 flex-1 mb-6">
                  {tier.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-navy/70">
                      <Check className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => showToast("Thank you for your interest! Our team will contact you.")}
                  className="w-full bg-navy text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-navy-light transition-colors"
                >
                  Become a Partner
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* BENEFITS TABLE */}
      <SectionWrapper className="py-16" delay={0.3}>
        <div className="container">
          <h2 className="text-3xl font-heading font-bold text-navy text-center mb-12">Benefits Comparison</h2>

          {/* Mobile accordion */}
          <div className="lg:hidden">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex items-center justify-between w-full bg-navy text-white px-5 py-3 rounded-xl mb-4"
            >
              <span className="font-semibold">View Comparison</span>
              {mobileOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
            {mobileOpen && (
              <div className="space-y-3">
                {benefitsComparison.map((row) => (
                  <div key={row.benefit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                    <div className="font-semibold text-navy text-sm mb-2">{row.benefit}</div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {[
                        { label: "Gold", val: row.gold },
                        { label: "Silver", val: row.silver },
                        { label: "Supporting", val: row.supporting },
                        { label: "Media", val: row.media },
                      ].map((t) => (
                        <div key={t.label} className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2">
                          <span className="text-navy/50">{t.label}</span>
                          <span className="font-medium text-navy">
                            {t.val === true ? <Check className="w-4 h-4 text-green-600" /> : t.val || "—"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Desktop table */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-gold">
                  <th className="py-4 px-4 text-navy font-heading font-bold">Benefit</th>
                  <th className="py-4 px-4 text-navy font-heading font-bold">Gold</th>
                  <th className="py-4 px-4 text-navy font-heading font-bold">Silver</th>
                  <th className="py-4 px-4 text-navy font-heading font-bold">Supporting</th>
                  <th className="py-4 px-4 text-navy font-heading font-bold">Media</th>
                </tr>
              </thead>
              <tbody>
                {benefitsComparison.map((row, i) => (
                  <tr key={row.benefit} className={cn("border-b border-gray-100", i % 2 === 0 && "bg-gray-50/50")}>
                    <td className="py-3 px-4 text-navy font-medium">{row.benefit}</td>
                    {[row.gold, row.silver, row.supporting, row.media].map((val, j) => (
                      <td key={j} className="py-3 px-4 text-navy/70">
                        {val === true ? <Check className="w-5 h-5 text-green-600" /> : val || "—"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </SectionWrapper>

      {/* CURRENT PARTNERS */}
      <SectionWrapper className="py-16 bg-gray-50/50" delay={0.4}>
        <div className="container">
          <h2 className="text-3xl font-heading font-bold text-navy text-center mb-12">Our Partners</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {partnerLogos.map((name, i) => (
              <motion.div
                key={name}
                className="h-20 bg-gray-100 rounded-xl flex items-center justify-center text-navy/30 font-semibold text-sm px-2 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                {name}
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* SPONSORSHIP DOWNLOAD */}
      <SectionWrapper className="py-16" delay={0.5}>
        <div className="container text-center">
          <h2 className="text-3xl font-heading font-bold text-navy mb-4">Get the Full Picture</h2>
          <p className="text-navy/60 mb-8 max-w-lg mx-auto">
            Download our comprehensive sponsorship package with detailed benefits, past impact data, and partnership opportunities.
          </p>
          <button
            onClick={() => showToast("Sponsorship package PDF will be downloaded")}
            className="bg-navy text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-navy-light transition-colors inline-flex items-center gap-2"
          >
            <Download className="w-5 h-5" />
            Download Sponsorship Package
          </button>
        </div>
      </SectionWrapper>

      {/* INQUIRY FORM */}
      <SectionWrapper className="py-16 bg-gray-50/50" delay={0.6}>
        <div className="container">
          <h2 className="text-3xl font-heading font-bold text-navy text-center mb-12">Collaboration Inquiry</h2>
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto space-y-5"
          >
            <div>
              <label className="block text-sm font-medium text-navy mb-1.5">Nama Organisasi</label>
              <input
                required
                value={form.organization}
                onChange={(e) => setForm({ ...form, organization: e.target.value })}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
                placeholder="Enter organization name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy mb-1.5">Nama Contact Person</label>
              <input
                required
                value={form.contact}
                onChange={(e) => setForm({ ...form, contact: e.target.value })}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
                placeholder="Enter contact person name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy mb-1.5">Email</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
                placeholder="Enter email address"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy mb-1.5">Tipe Kolaborasi</label>
              <select
                required
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold bg-white"
              >
                <option value="">Select collaboration type</option>
                <option value="Gold Partner">Gold Partner</option>
                <option value="Silver Partner">Silver Partner</option>
                <option value="Supporting Partner">Supporting Partner</option>
                <option value="Media Partner">Media Partner</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-navy mb-1.5">Pesan</label>
              <textarea
                required
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold resize-none"
                placeholder="Tell us about your collaboration interest"
              />
            </div>
            <button
              type="submit"
              className="bg-gold text-navy px-8 py-3 rounded-xl font-semibold hover:bg-gold-light transition-colors"
            >
              Submit Inquiry
            </button>
          </form>
        </div>
      </SectionWrapper>
    </>
  )
}
