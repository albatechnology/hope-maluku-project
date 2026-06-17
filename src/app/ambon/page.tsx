"use client"

import { motion } from "framer-motion"
import {
  Map,
  Music,
  Coffee,
  Users,
  Calendar,
  UtensilsCrossed,
  BookOpen,
  Ship,
  GraduationCap,
  Landmark,
  Heart,
  Globe,
} from "lucide-react"
import SectionWrapper from "@/components/SectionWrapper"

const cityProfileCards = [
  {
    icon: Landmark,
    title: "History",
    desc: "Kota Ambon berdiri sejak 1575 dan menjadi pusat perdagangan rempah dunia. Jejak kolonial Portugal, Spanyol, dan Belanda masih terlihat di berbagai sudut kota.",
  },
  {
    icon: Ship,
    title: "Infrastructure",
    desc: "Pelabuhan Yos Sudarso dan Bandara Pattimura menjadikan Ambon sebagai gerbang utama transportasi dan logistik Maluku.",
  },
  {
    icon: GraduationCap,
    title: "Education",
    desc: "Pusat pendidikan Maluku dengan Universitas Pattimura, Politeknik Ambon, dan berbagai sekolah unggulan yang melahirkan sumber daya muda berkualitas.",
  },
  {
    icon: Globe,
    title: "Port Access",
    desc: "Ambon memiliki akses pelabuhan strategis yang menghubungkan pulau-pulau di Maluku serta jalur perdagangan nasional dan internasional.",
  },
]

const creativeCards = [
  {
    icon: Map,
    title: "Tourist Spots",
    desc: "Jelajahi Pantai Natsepa, Benteng Victoria, dan Kota Tua Ambon yang sarat sejarah dan keindahan alam.",
    links: "#",
  },
  {
    icon: Coffee,
    title: "Cafes & Creative Spots",
    desc: "Temukan kafe kekinian dan ruang kreatif di sepanjang pesisir Ambon yang menjadi pusat nongkrong anak muda.",
    links: "#",
  },
  {
    icon: Music,
    title: "Local Music",
    desc: "Dari lagu-lagu keroncong hingga musik bambu, Ambon adalah laboratorium musik tradisional yang mendunia.",
    links: "#",
  },
  {
    icon: Users,
    title: "Creative Communities",
    desc: "Komunitas seni, musik, dan startup bermunculan di Ambon, menciptakan ekosistem kreatif yang dinamis.",
    links: "#",
  },
  {
    icon: Calendar,
    title: "Festivals",
    desc: "Festival Musik Bambu, Sail Maluku, dan Ambon City of Music Festival menjadi agenda tahunan yang dinanti.",
    links: "#",
  },
  {
    icon: UtensilsCrossed,
    title: "Culinary",
    desc: "Nikmati papeda, kuah kuning, ikan asap, dan rujak natsepa yang menjadi ikon kuliner Ambon.",
    links: "#",
  },
]

const musicColumns = [
  "Ambon telah lama dikenal sebagai 'Kota Musik' karena melahirkan musisi-musisi berbakat yang mengharumkan nama Indonesia di kancah internasional. Alunan musik tradisional seperti tahuri, tifa, dan ukulele menjadi bagian tak terpisahkan dari kehidupan sehari-hari masyarakat Ambon.",
  "Pada tahun 2019, Ambon resmi diakui sebagai anggota Jaringan Kota Kreatif UNESCO dalam kategori Musik. Pengakuan ini memperkuat posisi Ambon sebagai pusat kreativitas musik di kawasan Asia Tenggara dan mendorong lahirnya berbagai inisiatif seni dan budaya.",
  "Generasi muda Ambon terus mengembangkan musik tradisional dengan sentuhan modern. Kolaborasi lintas genre antara musik bambu, pop, jazz, dan elektronik menciptakan suara baru yang unik, menjadikan Ambon sebagai laboratorium musik yang terus berevolusi.",
]

const pinnedLocations = [
  "Kota Tua Ambon",
  "Pantai Natsepa",
  "Pattimura Park",
  "Museum Siwalima",
]

export default function AmbonPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative bg-gradient-to-br from-navy to-navy-light py-28 overflow-hidden">
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
            Ambon: The Heart of{" "}
            <span className="text-gold">Energizing Maluku</span>
          </motion.h1>
          <motion.p
            className="max-w-2xl mx-auto text-lg text-white/70"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Sebagai ibu kota provinsi dan pusat peradaban, Ambon memadukan sejarah gemilang,
            kekayaan budaya, dan semangat inovasi untuk membangun masa depan Maluku yang lebih cerah.
          </motion.p>
        </div>
      </section>

      {/* CITY PROFILE */}
      <SectionWrapper className="py-20">
        <div className="container">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-heading font-bold text-navy mb-4">City Profile</h2>
            <div className="w-20 h-1 bg-gold mx-auto" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cityProfileCards.map((card, i) => (
              <motion.div
                key={card.title}
                className="bg-white rounded-xl shadow-md p-6 hover:-translate-y-2 hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <div className="w-14 h-14 rounded-full bg-navy flex items-center justify-center mb-4">
                  <card.icon className="w-7 h-7 text-gold" />
                </div>
                <h3 className="text-lg font-heading font-semibold text-navy mb-2">{card.title}</h3>
                <p className="text-navy/70 text-sm leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* AMBON CITY OF MUSIC */}
      <SectionWrapper className="py-20 bg-gray-50">
        <div className="container">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-gold/10 text-gold px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
              <Music className="w-4 h-4" />
              UNESCO Recognition
            </div>
            <h2 className="text-4xl font-heading font-bold text-navy mb-4">
              Ambon <span className="text-gold">City of Music</span>
            </h2>
            <div className="w-20 h-1 bg-gold mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            {musicColumns.map((col, i) => (
              <motion.p
                key={i}
                className="text-navy/70 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                {col}
              </motion.p>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-navy/50">
            {["Tahuri", "Tifa", "Ukulele", "Bamboo Music", "Keroncong", "Jazz Ambon", "Pop Lokal"].map((tag) => (
              <span key={tag} className="bg-white border border-gold/30 text-gold px-3 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* CREATIVE ECONOMY & LIFESTYLE */}
      <SectionWrapper className="py-20">
        <div className="container">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-heading font-bold text-navy mb-4">Creative Economy & Lifestyle</h2>
            <div className="w-20 h-1 bg-gold mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {creativeCards.map((card, i) => (
              <motion.div
                key={card.title}
                className="bg-white rounded-xl shadow-md p-6 hover:-translate-y-2 hover:shadow-lg transition-all duration-300 group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <div className="w-12 h-12 rounded-full bg-navy flex items-center justify-center mb-4 group-hover:bg-crimson transition-colors">
                  <card.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-heading font-semibold text-navy mb-2">{card.title}</h3>
                <p className="text-navy/70 text-sm leading-relaxed mb-4">{card.desc}</p>
                <a
                  href={card.links}
                  className="inline-flex items-center gap-1 text-gold font-semibold text-sm hover:gap-2 transition-all"
                >
                  Explore More →
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* INTERACTIVE MAP */}
      <SectionWrapper className="py-20 bg-gray-50">
        <div className="container">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-heading font-bold text-navy mb-4">Explore Ambon</h2>
            <div className="w-20 h-1 bg-gold mx-auto" />
          </div>
          <div className="h-[400px] bg-gray-100 rounded-xl flex flex-col items-center justify-center border border-gray-200">
            <Map className="w-16 h-16 text-navy/30 mb-4" />
            <p className="text-navy/60 text-lg font-heading font-semibold">Interactive Map of Ambon City</p>
            <p className="text-navy/40 text-sm mt-2 mb-4">Pinned locations:</p>
            <div className="flex flex-wrap gap-2 justify-center max-w-xl px-4">
              {pinnedLocations.map((loc) => (
                <span key={loc} className="bg-navy text-white text-sm px-4 py-1.5 rounded-full flex items-center gap-1.5">
                  <Map className="w-3.5 h-3.5" />
                  {loc}
                </span>
              ))}
            </div>
          </div>
        </div>
      </SectionWrapper>
    </>
  )
}
