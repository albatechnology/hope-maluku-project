"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Calendar,
  Clock,
  MapPin,
  Camera,
  Coffee,
  UserCheck,
  Building,
  Briefcase,
  Crown,
  Handshake,
  BookOpen,
  Users,
  ChevronRight,
  ArrowRight,
  X,
} from "lucide-react"
import SectionWrapper from "@/components/SectionWrapper"
import { cn } from "@/lib/utils"
import { showToast } from "@/components/FormToast"
import Link from "next/link"

const targetDate = new Date("2026-07-25T00:00:00")

function useCountdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    function tick() {
      const diff = targetDate.getTime() - Date.now()
      if (diff <= 0) return setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return timeLeft
}

const schedule = [
  { time: "07:00 - 08:00", activity: "Registrasi & Morning Coffee", location: "Lobby Taman Budaya" },
  { time: "08:00 - 08:30", activity: "Pembukaan & Tarian Tradisional", location: "Panggung Utama" },
  { time: "08:30 - 09:15", activity: "Sambutan Gubernur Maluku", location: "Panggung Utama" },
  { time: "09:15 - 10:15", activity: "Keynote: Investasi Masa Depan Maluku", location: "Hall A" },
  { time: "10:15 - 10:30", activity: "Coffee Break", location: "Area Pameran" },
  { time: "10:30 - 12:00", activity: "Panel Diskusi: Ekonomi Kreatif & Anak Muda", location: "Hall A" },
  { time: "12:00 - 13:00", activity: "Ishoma & Networking Lunch", location: "Ruang Makan" },
  { time: "13:00 - 14:30", activity: "Workshop: UMKM Naik Kelas", location: "Hall B" },
  { time: "14:30 - 15:30", activity: "Pitching Session: Startup Maluku", location: "Hall A" },
  { time: "15:30 - 17:00", activity: "Pameran Produk & Kultur Maluku", location: "Area Pameran" },
  { time: "17:00 - 17:30", activity: "Penutupan & Foto Bersama", location: "Panggung Utama" },
]

const guests = [
  { name: "Gubernur Maluku", title: "Pemerintah Provinsi Maluku" },
  { name: "Walikota Ambon", title: "Pemerintah Kota Ambon" },
  { name: "CEO Danantara", title: "Danantara Indonesia" },
  { name: "Ketua KADIN", title: "KADIN Maluku" },
  { name: "Ketua IWAPI", title: "IWAPI Maluku" },
  { name: "Raja Maluku", title: "Majelis Adat Maluku" },
]

interface Event {
  id: number
  slug: string
  name: string
  deck: string
  start_date: string
  end_date: string
  venue_address: string
  image?: {
    original_url: string
  } | null
}

export default function EventsPage() {
  const { days, hours, minutes, seconds } = useCountdown()
  const [form, setForm] = useState({ nama: "", email: "", telepon: "", instansi: "", jumlah: "1" })
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchEvents() {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
        const response = await fetch(`${apiUrl}/api/events`)
        const json = await response.json()
        
        if (json && json.data) {
          // Filter id !== 1 sesuai permintaan
          const filteredEvents = json.data.filter((e: Event) => e.id !== 1)
          setEvents(filteredEvents)
        }
      } catch (error) {
        console.error("Gagal mengambil data event:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    showToast("Pendaftaran berhasil! Kami akan menghubungi Anda.")
    setForm({ nama: "", email: "", telepon: "", instansi: "", jumlah: "1" })
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
            Events
          </motion.h1>
          <motion.p
            className="max-w-2xl mx-auto text-lg text-white/70"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Energizing Maluku Event Series — gerakan kolaboratif untuk membangkitkan potensi
            Maluku melalui inovasi, investasi, dan pemberdayaan generasi muda.
          </motion.p>
        </div>
      </section>

      {/* UPCOMING EVENTS (DYNAMIC FROM API) */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy mb-4">
              Upcoming Events
            </h2>
            <div className="w-20 h-1 bg-gold mx-auto" />
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-10">
              <div className="w-10 h-10 border-4 border-gold/30 border-t-gold rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event) => (
                <div key={event.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden flex flex-col group transition-transform hover:-translate-y-2 duration-300">
                  {/* Image Container */}
                  <div className="relative h-56 bg-gray-200 overflow-hidden">
                    {event.image?.original_url ? (
                      <img 
                        src={event.image.original_url} 
                        alt={event.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                           (e.target as HTMLImageElement).src = 'https://placehold.co/600x400/1C2B4F/FFFFFF?text=Maluku+Event'
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-navy/10 flex items-center justify-center">
                        <Camera className="w-12 h-12 text-navy/30" />
                      </div>
                    )}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-navy text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                      {new Date(event.start_date).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-heading font-bold text-navy mb-2 line-clamp-2">
                      {event.name}
                    </h3>
                    <p className="text-navy/60 text-sm mb-4 line-clamp-2">
                      {event.deck || "Ikuti event eksklusif kami dan perluas wawasan Anda di Energizing Maluku."}
                    </p>
                    
                    <div className="mt-auto space-y-2 mb-6">
                      <div className="flex items-start gap-2 text-sm text-navy/70">
                        <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                        <span className="line-clamp-2">{event.venue_address || "TBA"}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-navy/70">
                        <Clock className="w-4 h-4 text-gold shrink-0" />
                        <span>{new Date(event.start_date).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })} WIT</span>
                      </div>
                    </div>

                    <Link
                      href={`/events/${event.slug}/register`}
                      className="w-full flex items-center justify-center gap-2 bg-crimson text-white font-semibold py-3 rounded-xl hover:bg-crimson/90 transition-colors"
                    >
                      Register Now
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
              {events.length === 0 && !loading && (
                <div className="col-span-full text-center py-10 text-navy/50">
                  Belum ada event terbaru saat ini.
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* EVENT TIMELINE */}
      <SectionWrapper className="py-20 bg-gray-50">
        <div className="container">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy mb-4">
              Timeline Acara
            </h2>
            <div className="w-20 h-1 bg-gold mx-auto" />
          </div>

          {/* PHASE 1 */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center">
                <span className="text-navy font-bold text-sm">1</span>
              </div>
              <h3 className="text-2xl font-heading font-bold text-navy">Pre-Event</h3>
              <span className="text-gold text-sm font-semibold">Juni 2026</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border-l-4 border-gold bg-white rounded-xl shadow-md p-6">
                <div className="w-10 h-10 rounded-full bg-navy flex items-center justify-center mb-3">
                  <Camera className="w-5 h-5 text-gold" />
                </div>
                <h4 className="text-lg font-heading font-semibold text-navy mb-1">Media Brief — Jakarta</h4>
                <p className="text-xs text-gold font-semibold uppercase tracking-wider mb-2">Juni 2026</p>
                <p className="text-navy/70 text-sm leading-relaxed">
                  Konferensi pers dan pengenalan Energizing Maluku kepada media nasional di Jakarta.
                  Menghadirkan narasumber dari pemerintah, swasta, dan komunitas kreatif Maluku.
                </p>
              </div>
              <div className="border-l-4 border-gold bg-white rounded-xl shadow-md p-6">
                <div className="w-10 h-10 rounded-full bg-navy flex items-center justify-center mb-3">
                  <Coffee className="w-5 h-5 text-gold" />
                </div>
                <h4 className="text-lg font-heading font-semibold text-navy mb-1">Governor's Breakfast — Ambon</h4>
                <p className="text-xs text-gold font-semibold uppercase tracking-wider mb-2">Juni 2026</p>
                <p className="text-navy/70 text-sm leading-relaxed">
                  Breakfast meeting bersama Gubernur Maluku dan para pemangku kepentingan untuk
                  membahas kolaborasi strategis dalam pengembangan potensi daerah.
                </p>
              </div>
            </div>
          </motion.div>

          {/* PHASE 2 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-crimson flex items-center justify-center">
                <span className="text-white font-bold text-sm">2</span>
              </div>
              <h3 className="text-2xl font-heading font-bold text-navy">Main Event</h3>
              <span className="text-gold text-sm font-semibold">25 Juli 2026</span>
            </div>

            <div className="bg-gold/5 border border-gold/30 rounded-2xl p-8">
              <div className="flex items-center gap-2 text-xs text-gold font-semibold uppercase tracking-wider mb-2">
                <MapPin className="w-4 h-4" />
                Taman Budaya Ambon
              </div>
              <h4 className="text-2xl md:text-3xl font-heading font-bold text-navy mb-2">
                Taman Budaya Ambon
              </h4>
              <p className="text-lg text-navy/80 font-semibold mb-6">
                1000 Anak Muda & Pelaku Usaha
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
                {[
                  { icon: UserCheck, label: "Gubernur & Walikota" },
                  { icon: Building, label: "Danantara" },
                  { icon: Briefcase, label: "KADIN & IWAPI" },
                  { icon: Crown, label: "Para Raja Maluku" },
                  { icon: Handshake, label: "Mitra Kegiatan" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="bg-white rounded-xl p-4 text-center shadow-sm"
                  >
                    <item.icon className="w-6 h-6 text-gold mx-auto mb-2" />
                    <span className="text-xs text-navy/70 font-medium">{item.label}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/events/1/register"
                  className="bg-crimson text-white font-semibold px-8 py-3 rounded-xl hover:opacity-90 transition-opacity"
                >
                  Register Now
                </Link>
                <Link
                  href="#schedule"
                  className="border-2 border-navy text-navy font-semibold px-8 py-3 rounded-xl hover:bg-navy hover:text-white transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </motion.div>

          {/* PHASE 3 */}
          <motion.div
            className="mt-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-navy flex items-center justify-center">
                <span className="text-gold font-bold text-sm">3</span>
              </div>
              <h3 className="text-2xl font-heading font-bold text-navy">Post-Event</h3>
              <span className="text-gold text-sm font-semibold">4 Minggu Pasca Event</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border-l-4 border-gold bg-white rounded-xl shadow-md p-6">
                <div className="w-10 h-10 rounded-full bg-navy flex items-center justify-center mb-3">
                  <BookOpen className="w-5 h-5 text-gold" />
                </div>
                <h4 className="text-lg font-heading font-semibold text-navy mb-1">10 Kelas Intensif</h4>
                <p className="text-navy/70 text-sm leading-relaxed">
                  Pelatihan intensif untuk 500 peserta mencakup kewirausahaan, pengembangan
                  bisnis digital, dan produk kreatif. Setiap kelas difasilitasi oleh mentor
                  profesional dari berbagai sektor industri.
                </p>
              </div>
              <div className="border-l-4 border-gold bg-white rounded-xl shadow-md p-6">
                <div className="w-10 h-10 rounded-full bg-navy flex items-center justify-center mb-3">
                  <Users className="w-5 h-5 text-gold" />
                </div>
                <h4 className="text-lg font-heading font-semibold text-navy mb-1">Mentorship & Networking</h4>
                <p className="text-navy/70 text-sm leading-relaxed">
                  Program pendampingan dan jaringan bisnis yang menghubungkan peserta dengan
                  investor, mentor, dan mitra strategis untuk pengembangan usaha berkelanjutan.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </SectionWrapper>

      {/* EVENT DETAIL SCHEDULE */}
      <SectionWrapper className="py-20">
        <div className="container" id="schedule">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy mb-4">
              Jadwal Acara
            </h2>
            <div className="w-20 h-1 bg-gold mx-auto" />
          </div>
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-navy text-white">
                  <th className="text-left px-5 py-3.5 font-heading font-semibold">Time</th>
                  <th className="text-left px-5 py-3.5 font-heading font-semibold">Activity</th>
                  <th className="text-left px-5 py-3.5 font-heading font-semibold">Location</th>
                </tr>
              </thead>
              <tbody>
                {schedule.map((item, i) => (
                  <tr
                    key={i}
                    className={cn(
                      "border-t border-gray-100",
                      i % 2 === 0 && "bg-gray-50"
                    )}
                  >
                    <td className="px-5 py-3.5 text-navy font-medium whitespace-nowrap">
                      <span className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gold" />
                        {item.time}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-navy/80">{item.activity}</td>
                    <td className="px-5 py-3.5 text-navy/60">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-crimson" />
                        {item.location}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </SectionWrapper>

      {/* SPEAKERS / GUESTS */}
      <SectionWrapper className="py-20 bg-gray-50">
        <div className="container">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy mb-4">
              Tamu & Pembicara
            </h2>
            <div className="w-20 h-1 bg-gold mx-auto" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {guests.map((guest, i) => (
              <motion.div
                key={guest.name}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <div className="w-24 h-24 bg-gradient-to-br from-navy to-navy-light rounded-full mx-auto mb-4" />
                <h3 className="text-lg font-heading font-semibold text-navy mb-1">{guest.name}</h3>
                <p className="text-sm text-navy/60">{guest.title}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* VENUE MAP */}
      <SectionWrapper className="py-20">
        <div className="container">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy mb-4">
              Lokasi
            </h2>
            <div className="w-20 h-1 bg-gold mx-auto" />
          </div>
          <div className="h-[400px] bg-gray-50 rounded-xl flex flex-col items-center justify-center border border-gray-200">
            <MapPin className="w-16 h-16 text-navy/30 mb-4" />
            <p className="text-navy/60 text-lg font-heading font-semibold">Taman Budaya Ambon</p>
            <p className="text-navy/40 text-sm mt-2 max-w-md text-center px-4">
              Jl. Raya Pattimura No. 1, Ambon, Maluku
            </p>
          </div>
        </div>
      </SectionWrapper>

      {/* PAST EVENTS */}
      <SectionWrapper className="py-20 bg-gray-50">
        <div className="container text-center">
          <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6">
            <Clock className="w-8 h-8 text-gold" />
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy mb-4">
            Arsip Kegiatan
          </h2>
          <p className="text-navy/60">
            Dokumentasi event dan kegiatan sebelumnya akan sehadiatersedia.
          </p>
          <span className="inline-block bg-gold text-navy text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mt-4">
            Coming Soon
          </span>
        </div>
      </SectionWrapper>


    </>
  )
}
