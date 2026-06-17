"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search,
  Calendar,
  Clock,
  MapPin,
  Play,
  X,
  ArrowLeft,
  ArrowRight,
  Image as ImageIcon,
  Video,
  FileText,
  ChevronRight,
  Tag,
  Heart,
  Eye,
  Camera,
  Coffee,
} from "lucide-react"
import SectionWrapper from "@/components/SectionWrapper"
import { cn } from "@/lib/utils"

const categories = ["ALL", "Artikel", "Video", "Dokumentasi", "Photo Essay"] as const

const articles = [
  {
    id: 1,
    title: "Potensi Wisata Bahari Maluku yang Mendunia",
    excerpt:
      "Dari Raja Ampat-nya Maluku hingga surga tersembunyi di Kepulauan Banda, potensi wisata bahari Maluku siap bersaing di kancah internasional.",
    category: "Artikel",
    date: "12 Mei 2026",
    featured: true,
    image: "bg-gradient-to-br from-blue-400 to-cyan-500",
  },
  {
    id: 2,
    title: "Wawancara: Anak Muda Maluku di Kancah Internasional",
    excerpt:
      "Generasi muda Maluku semakin bersinar di panggung global. Wawancara eksklusif dengan tiga talenta muda asal Maluku yang berprestasi di luar negeri.",
    category: "Artikel",
    date: "28 April 2026",
    featured: false,
    image: "bg-gradient-to-br from-purple-400 to-pink-500",
  },
  {
    id: 3,
    title: "Video: Keindahan Bawah Laut Kepulauan Banda",
    excerpt:
      "Saksikan keajaiban bawah laut Kepulauan Banda yang memukau dengan terumbu karang warna-warni dan biota laut yang menakjubkan.",
    category: "Video",
    date: "15 April 2026",
    featured: false,
    image: "bg-gradient-to-br from-teal-400 to-emerald-500",
  },
  {
    id: 4,
    title: "Festival Budaya Maluku 2026: Merayakan Keragaman",
    excerpt:
      "Ribuan masyarakat memadati Ambon dalam Festival Budaya Maluku 2026 yang menampilkan tarian, musik, dan kuliner dari seluruh penjuru Maluku.",
    category: "Dokumentasi",
    date: "5 Maret 2026",
    featured: false,
    image: "bg-gradient-to-br from-amber-400 to-orange-500",
  },
  {
    id: 5,
    title: "Dokumentasi: Ekspedisi Alam Pulau Seram",
    excerpt:
      "Jelajahi keindahan alam Pulau Seram yang masih perawan, dari hutan tropis yang lebat hingga air terjun tersembunyi di tengah hutan.",
    category: "Photo Essay",
    date: "18 Februari 2026",
    featured: false,
    image: "bg-gradient-to-br from-green-400 to-lime-500",
  },
  {
    id: 6,
    title: "UMKM Maluku: Cerita Sukses dari Timur Indonesia",
    excerpt:
      "Pelaku UMKM di Maluku membuktikan bahwa produk lokal bisa tembus pasar nasional dan internasional dengan inovasi dan kerja keras.",
    category: "Artikel",
    date: "2 Februari 2026",
    featured: false,
    image: "bg-gradient-to-br from-rose-400 to-red-500",
  },
]

const videos = [
  { title: "Keindahan Bawah Laut Kepulauan Banda", duration: "12:34" },
  { title: "Profil Energizing Maluku 2026", duration: "08:20" },
  { title: "Wawancara: Masa Depan Maluku", duration: "15:45" },
]

const photos = [
  { caption: "Pantai Natsepa, Ambon", height: "h-64" },
  { caption: "Tarian Cakalele", height: "h-80" },
  { caption: "Pelabuhan Yos Sudarso", height: "h-56" },
  { caption: "Rumah Adat Baileo", height: "h-72" },
  { caption: "Pasar Tradisional Ambon", height: "h-60" },
  { caption: "Sunset di Kepulauan Banda", height: "h-96" },
]

export default function MediaPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("ALL")
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null)

  const filtered = articles.filter((a) => {
    const matchesCategory = activeCategory === "ALL" || a.category === activeCategory
    const matchesSearch =
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const featured = filtered.find((a) => a.featured)
  const rest = filtered.filter((a) => a.id !== featured?.id)

  const handlePrev = () => {
    if (selectedPhoto === null) return
    setSelectedPhoto(selectedPhoto === 0 ? photos.length - 1 : selectedPhoto - 1)
  }

  const handleNext = () => {
    if (selectedPhoto === null) return
    setSelectedPhoto(selectedPhoto === photos.length - 1 ? 0 : selectedPhoto + 1)
  }

  return (
    <>
      {/* HERO */}
      <section className="relative bg-navy py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-10 left-1/4 w-72 h-72 bg-gold/30 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-crimson/20 rounded-full blur-3xl" />
        </div>
        <div className="container relative z-10 text-center">
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-tight mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Media & Stories
          </motion.h1>
          <motion.p
            className="max-w-2xl mx-auto text-lg text-white/70"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Jelajahi cerita, artikel, video, dan foto tentang keindahan dan potensi Maluku
            dari berbagai sudut pandang.
          </motion.p>
        </div>
      </section>

      {/* SEARCH & FILTER */}
      <section className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-200">
        <div className="container py-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-navy/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari artikel, video, atau foto..."
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition text-navy"
              />
            </div>
          </div>
          <div className="flex gap-2 mt-4 overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition whitespace-nowrap",
                  activeCategory === cat
                    ? "bg-gold text-navy"
                    : "bg-gray-100 text-navy/70 hover:bg-gray-200"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED ARTICLE */}
      {featured && (
        <SectionWrapper className="py-10">
          <div className="container">
            <div
              className={cn(
                "relative h-72 rounded-2xl overflow-hidden group cursor-pointer",
                featured.image
              )}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <span className="inline-block bg-crimson/90 text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">
                  {featured.category}
                </span>
                <p className="text-white/60 text-xs mb-2">
                  <Calendar className="w-3 h-3 inline mr-1 mb-0.5" />
                  {featured.date}
                </p>
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-2">
                  {featured.title}
                </h2>
                <p className="text-white/70 text-sm max-w-2xl">{featured.excerpt}</p>
              </div>
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="inline-flex items-center gap-1 bg-gold text-navy text-sm font-semibold px-4 py-2 rounded-full">
                  Read More <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>
        </SectionWrapper>
      )}

      {/* ARTICLES GRID */}
      <SectionWrapper className="py-10">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rest.map((article, i) => (
              <motion.div
                key={article.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:-translate-y-2 hover:shadow-xl transition-all duration-300 group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <div
                  className={cn("h-44 flex items-center justify-center", article.image)}
                >
                  {article.category === "Video" ? (
                    <Video className="w-12 h-12 text-white/60" />
                  ) : article.category === "Photo Essay" ? (
                    <ImageIcon className="w-12 h-12 text-white/60" />
                  ) : (
                    <FileText className="w-12 h-12 text-white/60" />
                  )}
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-crimson/10 text-crimson text-xs font-semibold px-3 py-1 rounded-full">
                      {article.category}
                    </span>
                    <span className="text-navy/40 text-xs flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {article.date}
                    </span>
                  </div>
                  <h3 className="text-lg font-heading font-semibold text-navy mb-2">
                    {article.title}
                  </h3>
                  <p className="text-navy/70 text-sm leading-relaxed mb-4">
                    {article.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-1 text-gold font-semibold text-sm group-hover:gap-2 transition-all">
                    Read More <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* VIDEO GALLERY */}
      <SectionWrapper className="py-20 bg-gray-50">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy mb-4">
              Video Gallery
            </h2>
            <div className="w-20 h-1 bg-gold mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {videos.map((video, i) => (
              <motion.div
                key={video.title}
                className="group relative aspect-video bg-gray-200 rounded-xl overflow-hidden cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-navy/40 to-navy/60 flex flex-col items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-gold/90 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 text-navy ml-0.5" />
                  </div>
                  <p className="text-white font-heading font-semibold text-center px-4">
                    {video.title}
                  </p>
                  <span className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* PHOTO GALLERY */}
      <SectionWrapper className="py-20">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy mb-4">
              Photo Gallery
            </h2>
            <div className="w-20 h-1 bg-gold mx-auto" />
          </div>
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {photos.map((photo, i) => (
              <motion.div
                key={i}
                className="break-inside-avoid bg-gray-100 rounded-xl overflow-hidden cursor-pointer group relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                onClick={() => setSelectedPhoto(i)}
              >
                <div className={cn("w-full", photo.height, "bg-gradient-to-br from-navy/20 to-navy/10")} />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <div className="p-3">
                  <p className="text-xs text-navy/60">{photo.caption}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {selectedPhoto !== null && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition z-10"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition"
            >
              <ArrowLeft className="w-6 h-6 text-white" />
            </button>

            <motion.div
              className="text-center max-w-4xl mx-auto px-4"
              key={selectedPhoto}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <div
                className={cn(
                  "w-full max-w-2xl mx-auto rounded-xl mb-4",
                  photos[selectedPhoto].height,
                  "bg-gradient-to-br from-navy/30 to-navy/20"
                )}
              />
              <p className="text-white/80 text-lg">{photos[selectedPhoto].caption}</p>
              <p className="text-white/40 text-sm mt-1">
                {selectedPhoto + 1} / {photos.length}
              </p>
            </motion.div>

            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition"
            >
              <ArrowRight className="w-6 h-6 text-white" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
