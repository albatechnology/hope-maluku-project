"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  TreePine,
  Fish,
  Music,
  UtensilsCrossed,
  Landmark,
  Users,
  TrendingUp,
  MapPin,
  Mountain,
  Anchor,
  Palmtree,
  Calendar,
  ArrowRight,
} from "lucide-react"
import SectionWrapper from "@/components/SectionWrapper"
import AnimatedCounter from "@/components/AnimatedCounter"
import ScrollIndicator from "@/components/ScrollIndicator"

const exploreCards = [
  {
    icon: TreePine,
    title: "Nature",
    desc: "Jelajahi keindahan alam Maluku dari pantai eksotis hingga pegunungan hijau.",
    href: "/nature",
  },
  {
    icon: Fish,
    title: "Marine",
    desc: "Surga bawah laut dengan keanekaragaman hayati laut yang luar biasa.",
    href: "/nature",
  },
  {
    icon: Palmtree,
    title: "Culture",
    desc: "Kekayaan tradisi dan kearifan lokal yang diwariskan turun-temurun.",
    href: "/culture",
  },
  {
    icon: Music,
    title: "Music",
    desc: "Alunan musik tradisional yang memikat hati dari seluruh penjuru Maluku.",
    href: "/culture",
  },
  {
    icon: UtensilsCrossed,
    title: "Culinary",
    desc: "Cita rasa khas Maluku yang kaya rempah dan menggugah selera.",
    href: "/culinary",
  },
  {
    icon: Landmark,
    title: "History",
    desc: "Jejak sejarah Maluku sebagai pusat rempah dunia yang legendaris.",
    href: "/about",
  },
  {
    icon: Users,
    title: "Community",
    desc: "Komunitas lokal yang hangat dan penuh semangat gotong royong.",
    href: "/people",
  },
  {
    icon: TrendingUp,
    title: "Investment",
    desc: "Peluang investasi di sektor unggulan Maluku yang menjanjikan.",
    href: "/economy",
  },
]

const whyMalukuItems = [
  {
    icon: MapPin,
    title: "Posisi Strategis Indonesia Timur",
    desc: "Maluku berada di jantung Indonesia Timur, menjadikannya pintu gerbang perdagangan dan konektivitas antar pulau.",
  },
  {
    icon: Anchor,
    title: "Kekayaan Laut Terbesar",
    desc: "Memiliki luas lautan mencapai 90% wilayah dengan potensi perikanan dan biota laut yang melimpah.",
  },
  {
    icon: Mountain,
    title: "Surga Wisata Alami",
    desc: "Dari Raja Ampat-nya Maluku hingga pantai pasir putih yang masih perawan dan alami.",
  },
  {
    icon: Users,
    title: "Potensi SDM Muda",
    desc: "Lebih dari 60% penduduk Maluku adalah generasi muda yang kreatif dan inovatif.",
  },
  {
    icon: Music,
    title: "Kekuatan Budaya & Musik",
    desc: "Tradisi dan seni musik yang mendunia, dari lagu-lagu daerah hingga tarian tradisional.",
  },
]

const stories = [
  {
    category: "Ekonomi",
    title: "Investasi Hilirisasi Kelapa di Maluku Tengah",
    excerpt:
      "Potensi kelapa di Maluku mencapai jutaan ton per tahun. Kini hilirisasi membuka lapangan kerja baru bagi masyarakat lokal.",
  },
  {
    category: "Budaya",
    title: "Festival Musik Bambu: Warisan Leluhur yang Hidup Kembali",
    excerpt:
      "Ribuan anak muda kembali memainkan alat musik bambu dalam festival tahunan yang meriah di Ambon.",
  },
  {
    category: "Wisata",
    title: "Surga Tersembunyi di Kepulauan Banda yang Mendunia",
    excerpt:
      "Keindahan bawah laut dan sejarah rempah di Kepulauan Banda mulai menarik perhatian wisatawan mancanegara.",
  },
]

export default function HomePage() {
  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-navy to-navy-light overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-10 left-10 w-72 h-72 bg-gold/30 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-crimson/20 rounded-full blur-3xl" />
        </div>

        <div className="container relative z-10 text-center px-4">
          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-white leading-tight mb-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Discover the Hope, Energy{" "}
            <span className="text-gold">& Future of Maluku</span>
          </motion.h1>

          <motion.p
            className="max-w-2xl mx-auto text-lg md:text-xl text-white/80 mb-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            Platform kolaboratif untuk memperkenalkan potensi alam, manusia,
            budaya, dan masa depan Maluku kepada Indonesia dan dunia.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <Link
              href="/nature"
              className="bg-gold text-navy font-semibold px-8 py-3.5 rounded-xl hover:bg-gold-light transition-colors text-lg"
            >
              Explore Maluku
            </Link>
            <Link
              href="/economy"
              className="bg-crimson text-white font-semibold px-8 py-3.5 rounded-xl hover:opacity-90 transition-opacity text-lg"
            >
              Invest & Collaborate
            </Link>
            <Link
              href="/media"
              className="border-2 border-white text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-white/10 transition-colors text-lg"
            >
              Watch The Story
            </Link>
          </motion.div>
        </div>

        <ScrollIndicator />
      </section>

      <SectionWrapper className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-navy mb-4">
              Why Maluku?
            </h2>
            <div className="w-20 h-1 bg-gold mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {whyMalukuItems.map((item, i) => (
              <motion.div
                key={i}
                className="text-center p-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-8 h-8 text-gold" />
                </div>
                <h3 className="text-xl font-heading font-semibold text-navy mb-2">
                  {item.title}
                </h3>
                <p className="text-navy/70 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-navy rounded-xl p-6 text-center">
              <div className="text-3xl md:text-4xl font-bold text-gold">
                <AnimatedCounter end={1000} suffix="+" />
              </div>
              <div className="text-white/80 text-sm mt-1">Pulau</div>
            </div>
            <div className="bg-navy rounded-xl p-6 text-center">
              <div className="text-3xl md:text-4xl font-bold text-gold">
                <AnimatedCounter end={10000} suffix="+" />
              </div>
              <div className="text-white/80 text-sm mt-1">KM Garis Pantai</div>
            </div>
            <div className="bg-navy rounded-xl p-6 text-center">
              <div className="text-3xl md:text-4xl font-bold text-gold">
                <AnimatedCounter end={1} prefix="# " suffix=" Top Diving" />
              </div>
              <div className="text-white/80 text-sm mt-1">Destinasi Selam Dunia</div>
            </div>
            <div className="bg-navy rounded-xl p-6 text-center">
              <div className="text-3xl md:text-4xl font-bold text-gold">
                <AnimatedCounter end={70} suffix="%" />
              </div>
              <div className="text-white/80 text-sm mt-1">Potensi Perikanan</div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper className="py-20 bg-gray-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-navy mb-4">
              Explore Maluku
            </h2>
            <div className="w-20 h-1 bg-gold mx-auto" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {exploreCards.map((card, i) => (
              <Link
                key={i}
                href={card.href}
                className="group bg-white rounded-xl shadow-md p-6 hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-full bg-navy flex items-center justify-center mb-4 group-hover:bg-crimson transition-colors">
                  <card.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-heading font-semibold text-navy mb-2">
                  {card.title}
                </h3>
                <p className="text-navy/70 text-sm leading-relaxed mb-4">
                  {card.desc}
                </p>
                <span className="inline-flex items-center gap-1 text-gold font-semibold text-sm group-hover:gap-2 transition-all">
                  Read More <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper className="bg-navy text-white py-20">
        <div className="container text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 text-gold px-4 py-2 rounded-full text-sm mb-6">
            <Calendar className="w-4 h-4" />
            Save the Date
          </div>

          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
            25 Juli 2026 — Taman Budaya Ambon
          </h2>
          <p className="text-xl text-white/80 mb-8">
            1000 Anak Muda & Pelaku Usaha
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-white/60 mb-10">
            <span className="bg-white/10 px-3 py-1 rounded-full">Mahasiswa</span>
            <span className="bg-white/10 px-3 py-1 rounded-full">Startup Enthusiast</span>
            <span className="bg-white/10 px-3 py-1 rounded-full">Investor</span>
            <span className="bg-white/10 px-3 py-1 rounded-full">Seniman</span>
            <span className="bg-white/10 px-3 py-1 rounded-full">Nelayan</span>
            <span className="bg-white/10 px-3 py-1 rounded-full">Pemda</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/events"
              className="bg-gold text-navy font-semibold px-8 py-3.5 rounded-xl hover:bg-gold-light transition-colors text-lg"
            >
              Register Now
            </Link>
            <Link
              href="/events"
              className="bg-crimson text-white font-semibold px-8 py-3.5 rounded-xl hover:opacity-90 transition-opacity text-lg"
            >
              Learn More
            </Link>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-navy mb-4">
              Featured Stories
            </h2>
            <div className="w-20 h-1 bg-gold mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stories.map((story, i) => (
              <motion.div
                key={i}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
              >
                <div className="h-48 bg-gradient-to-br from-navy-light to-navy flex items-center justify-center">
                  <span className="text-gold text-6xl font-heading font-bold opacity-30">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="p-6">
                  <span className="inline-block bg-crimson/10 text-crimson text-xs font-semibold px-3 py-1 rounded-full mb-3">
                    {story.category}
                  </span>
                  <h3 className="text-lg font-heading font-semibold text-navy mb-2">
                    {story.title}
                  </h3>
                  <p className="text-navy/70 text-sm leading-relaxed mb-4">
                    {story.excerpt}
                  </p>
                  <Link
                    href="/media"
                    className="inline-flex items-center gap-1 text-gold font-semibold text-sm hover:gap-2 transition-all"
                  >
                    Read More <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper className="bg-navy py-24 text-center">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-8 max-w-3xl mx-auto leading-tight">
            Let's Build Hope Together for Maluku's Future
          </h2>
          <Link
            href="/youth"
            className="inline-block bg-gold text-navy font-semibold px-8 py-4 rounded-xl text-lg hover:bg-gold-light transition-colors"
          >
            Be Part of the Movement
          </Link>
        </div>
      </SectionWrapper>
    </>
  )
}
