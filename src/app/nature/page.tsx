"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowRight,
  MapPin,
  Sun,
  Ship,
  X,
  Mountain,
  Waves,
  Umbrella,
  Fish,
  Camera,
  Compass,
} from "lucide-react"
import SectionWrapper from "@/components/SectionWrapper"
import { cn } from "@/lib/utils"

const categories = [
  { value: "all", label: "ALL" },
  { value: "Pantai", label: "Pantai" },
  { value: "Pulau", label: "Pulau" },
  { value: "Diving", label: "Diving" },
  { value: "Snorkeling", label: "Snorkeling" },
  { value: "Gunung", label: "Gunung" },
  { value: "Air Terjun", label: "Air Terjun" },
  { value: "Eco Tourism", label: "Eco Tourism" },
] as const

type Destination = {
  id: number
  name: string
  category: string
  description: string
  bestSeason: string
  howToGetThere: string
  itinerary: { day: string; activity: string }[]
}

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Pantai: Umbrella,
  Pulau: Compass,
  Diving: Waves,
  Snorkeling: Fish,
  Gunung: Mountain,
  "Air Terjun": Camera,
  "Eco Tourism": MapPin,
}

const destinations: Destination[] = [
  {
    id: 1,
    name: "Pantai Natsepa",
    category: "Pantai",
    description: "Pasir putih dan panorama sunset yang memukau",
    bestSeason: "April - Oktober (Musim Kemarau)",
    howToGetThere: "30 menit berkendara dari pusat Kota Ambon",
    itinerary: [
      { day: "Day 1", activity: "Tiba di Ambon, check-in hotel, sore hari menikmati sunset di Pantai Natsepa" },
      { day: "Day 2", activity: "Berenang, bermain jetski, dan menikmati rujak Natsepa yang terkenal" },
      { day: "Day 3", activity: "Wisata kuliner pagi di sekitar pantai, kemudian kembali ke kota" },
    ],
  },
  {
    id: 2,
    name: "Kepulauan Banda",
    category: "Pulau",
    description: "Surga tersembunyi dengan sejarah rempah",
    bestSeason: "Mei - November",
    howToGetThere: "Penerbangan dari Ambon ke Bandara Banda, dilanjutkan perahu",
    itinerary: [
      { day: "Day 1", activity: "Tiba di Banda Neira, City tour benteng dan museum" },
      { day: "Day 2", activity: "Snorkeling di perairan Banda dan mengunjungi perkebunan pala" },
      { day: "Day 3", activity: "Trekking Gunung Banda Api, persiapan kembali" },
    ],
  },
  {
    id: 3,
    name: "Ora Beach",
    category: "Pantai",
    description: "Pantai eksotis dengan air laut jernih",
    bestSeason: "April - Oktober",
    howToGetThere: "Perjalanan darat dari Ambon ke Seram dilanjutkan perahu",
    itinerary: [
      { day: "Day 1", activity: "Perjalanan dari Ambon menuju Ora Beach Resort" },
      { day: "Day 2", activity: "Snorkeling, kayaking, dan island hopping" },
      { day: "Day 3", activity: "Relaksasi di pantai dan persiapan pulang" },
    ],
  },
  {
    id: 4,
    name: "Pulau Pombo",
    category: "Pulau",
    description: "Pulau kecil dengan keindahan bawah laut",
    bestSeason: "April - November",
    howToGetThere: "30 menit perahu dari Pelabuhan Tulehu, Ambon",
    itinerary: [
      { day: "Day 1", activity: "Berangkat dari Tulehu menuju Pulau Pombo, snorkeling" },
      { day: "Day 2", activity: "Diving dan eksplorasi pantai pasir putih" },
      { day: "Day 3", activity: "Fotografi bawah laut, kembali ke Ambon" },
    ],
  },
  {
    id: 5,
    name: "Sawai",
    category: "Pantai",
    description: "Desa wisata dengan suasana tenang",
    bestSeason: "April - Oktober",
    howToGetThere: "Perjalanan darat 3 jam dari Ambon ke Seram bagian utara",
    itinerary: [
      { day: "Day 1", activity: "Tiba di Sawai, check-in homestay, keliling desa" },
      { day: "Day 2", activity: "Wisata mangrove dan spotting burung" },
      { day: "Day 3", activity: "Memancing bersama nelayan lokal" },
    ],
  },
  {
    id: 6,
    name: "Manusela National Park",
    category: "Gunung",
    description: "Taman nasional dengan biodiversitas tinggi",
    bestSeason: "Juni - September",
    howToGetThere: "Perjalanan dari Ambon ke Masohi, dilanjutkan trekking",
    itinerary: [
      { day: "Day 1", activity: "Perjalanan menuju pintu masuk taman nasional" },
      { day: "Day 2", activity: "Trekking hutan, bird watching, camping" },
      { day: "Day 3", activity: "Eksplorasi goa dan air terjun, kembali" },
    ],
  },
  {
    id: 7,
    name: "Pulau Run",
    category: "Pulau",
    description: "Pulau bersejarah penghasil pala",
    bestSeason: "Mei - November",
    howToGetThere: "Perahu dari Banda Neira, sekitar 2 jam perjalanan",
    itinerary: [
      { day: "Day 1", activity: "Perjalanan dari Banda Neira ke Pulau Run" },
      { day: "Day 2", activity: "Tour perkebunan pala dan situs sejarah" },
      { day: "Day 3", activity: "Snorkeling dan menikmati pantai, kembali" },
    ],
  },
  {
    id: 8,
    name: "Raja Ampat Connector",
    category: "Diving",
    description: "Gerbang menuju surga diving dunia",
    bestSeason: "Oktober - April",
    howToGetThere: "Penerbangan dari Ambon ke Sorong, dilanjutkan speedboat",
    itinerary: [
      { day: "Day 1", activity: "Penerbangan Ambon - Sorong, transfer ke penginapan" },
      { day: "Day 2", activity: "Diving di spot terkenal seperti Cape Kri" },
      { day: "Day 3", activity: "Snorkeling di piaynemo, sunset cruise" },
    ],
  },
]

export default function NaturePage() {
  const [activeFilter, setActiveFilter] = useState("all")
  const [selected, setSelected] = useState<Destination | null>(null)

  const filtered =
    activeFilter === "all"
      ? destinations
      : destinations.filter((d) => d.category === activeFilter)

  return (
    <>
      {/* HERO */}
      <section className="relative bg-navy py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-10 right-1/4 w-72 h-72 bg-gold/30 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-1/4 w-96 h-96 bg-crimson/20 rounded-full blur-3xl" />
        </div>
        <div className="container relative z-10 text-center">
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-tight mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Nature & Tourism
          </motion.h1>
          <motion.p
            className="max-w-2xl mx-auto text-lg text-white/70"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Maluku dianugerahi keindahan alam yang luar biasa — dari pantai pasir putih,
            pulau-pulau eksotis, hingga taman nasional yang memukau. Jelajahi surga timur Indonesia.
          </motion.p>
        </div>
      </section>

      {/* FILTER BAR */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="container py-4 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveFilter(cat.value)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition whitespace-nowrap",
                  activeFilter === cat.value
                    ? "bg-gold text-navy"
                    : "bg-gray-100 text-navy/70 hover:bg-gray-200"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* DESTINATION GRID */}
      <SectionWrapper className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((dest) => (
              <motion.div
                key={dest.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer"
                onClick={() => setSelected(dest)}
              >
                <div className="relative h-48 bg-gradient-to-br from-blue-200 to-blue-400 flex items-center justify-center">
                  {(() => {
                    const Icon = categoryIcons[dest.category]
                    return Icon ? <Icon className="w-16 h-16 text-white/50" /> : null
                  })()}
                  <span className="absolute top-3 left-3 bg-white/90 text-xs font-semibold px-3 py-1 rounded-full">
                    {dest.category}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-heading font-semibold text-navy mb-1">{dest.name}</h3>
                  <p className="text-sm text-navy/70 mb-3">{dest.description}</p>
                  <button className="text-crimson text-sm font-medium flex items-center gap-1">
                    View Details <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* DESTINATION MODAL */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="max-w-2xl bg-white rounded-2xl p-6 max-h-[90vh] overflow-y-auto w-full relative"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition z-10"
              >
                <X className="w-4 h-4 text-navy" />
              </button>

              {/* Gallery */}
              <div className="grid grid-cols-3 gap-2 mb-6">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="h-28 rounded-lg bg-gradient-to-br from-blue-200 to-blue-400"
                  />
                ))}
              </div>

              {/* Name & Category */}
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-2xl font-heading font-bold text-navy">{selected.name}</h2>
                <span className="bg-gold text-navy text-xs font-semibold px-3 py-1 rounded-full">
                  {selected.category}
                </span>
              </div>

              {/* Best Season */}
              <div className="flex items-center gap-2 text-sm text-navy/70 mb-3">
                <Sun className="w-4 h-4 text-gold" />
                <span className="font-medium">Best Season:</span> {selected.bestSeason}
              </div>

              {/* How to Get There */}
              <div className="flex items-start gap-2 text-sm text-navy/70 mb-6">
                <Ship className="w-4 h-4 text-gold mt-0.5" />
                <div>
                  <span className="font-medium">How to Get There:</span> {selected.howToGetThere}
                </div>
              </div>

              {/* Mini Itinerary */}
              <h3 className="text-lg font-heading font-semibold text-navy mb-3">Suggested Itinerary</h3>
              <div className="space-y-3 mb-6">
                {selected.itinerary.map((item) => (
                  <div key={item.day} className="flex gap-3 bg-gray-50 rounded-lg p-3">
                    <span className="text-gold font-bold text-sm shrink-0 w-14">{item.day}</span>
                    <span className="text-sm text-navy/70">{item.activity}</span>
                  </div>
                ))}
              </div>

              {/* Location Map Pin */}
              <div className="flex items-center justify-center gap-2 bg-gray-50 rounded-xl py-6 border border-gray-200">
                <MapPin className="w-5 h-5 text-crimson" />
                <span className="text-sm text-navy/60">Map location — {selected.name}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
