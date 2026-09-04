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
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import SectionWrapper from "@/components/SectionWrapper"
import { cn, isEventPassed } from "@/lib/utils"
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

const timelineData = [
  {
    title: "1. MEDIA BRIEF",
    date: "2 September 2026",
    location: "JAKARTA & AMBON",
    description: "Media Nasional & Lokal",
    color: "bg-[#0070C0]",
    icon: Camera,
    rundown: [
      { time: "13.30-14.00", activity: "Media Arrival" },
      { time: "14.00-14.20", activity: "Registration & Networking" },
      { time: "14.20-14.25", activity: "Opening" },
      { time: "14.25-14.35", activity: "Welcome & Introduction" },
      { time: "14.35-14.50", activity: "CEO Danantara" },
      { time: "14.50-15.00", activity: "Gubernur Maluku" },
      { time: "15.05-15.30", activity: "Exclusive Talkshow" },
      { time: "15.30-16.00", activity: "Media Q&A" },
      { time: "16.00-16.10", activity: "Closing" },
    ]
  },
  {
    title: "2. GOVERNOR'S BREAKFAST",
    date: "10 September 2026",
    location: "AMBON",
    description: "Networking + Stakeholder Engagement",
    color: "bg-[#00B0F0]",
    icon: Coffee,
    rundown: [
      { time: "07.30-08.00", activity: "Registrasi & Welcome Coffee" },
      { time: "08.00-08.15", activity: "Welcome & Opening (MC mention sponsor)" },
      { time: "08.15-08.30", activity: "Sambutan Gubernur Maluku" },
      { time: "08.30-08.45", activity: "Energizing Maluku: Vision & Program" },
      { time: "08.45-09.00", activity: "Sponsor's Message (Sponsor Tunggal)" },
      { time: "09.00-09.30", activity: "Breakfast & Networking" },
      { time: "09.30-10.00", activity: "Stakeholder Dialogue (Goverment + Business + Education + Community)" },
      { time: "10.00-10.15", activity: "Closing & Group Photo" },
    ]
  },
  {
    title: "3. MAIN EVENT",
    date: "12 September 2026",
    location: "Gedung Gubernur Maluku",
    description: "",
    color: "bg-[#0096B4]",
    icon: Building,
    rundown: [
      { time: "08.00-08.30", activity: "Registrasi & Networking" },
      { time: "08.30-08.40", activity: "Opening (MC menyebut sponsor)" },
      { time: "08.40-08.50", activity: "Opening Video" },
      { time: "08.50-09.10", activity: "Sambutan Ketua Panitia" },
      { time: "09.10-09.30", activity: "Sambutan Gubernur Maluku" },
      { time: "09.30-09.45", activity: "Sponsor Message / Keynote (Sponsor Tunggal)" },
      { time: "09.45-10.15", activity: "Keynote: Maluku & Talenta Masa Depan" },
      { time: "10.15-10.30", activity: "Coffee Break" },
      { time: "10.30-12.15", activity: "Talkshow: Maluku, Generasi Muda dan Kepemimpinan" },
      { time: "12.15-12.30", activity: "Commitment / Declaration Energizing Maluku" },
      { time: "12.30-12.45", activity: "Closing (Sponsor Recognition)" },
      { time: "13.30-16.30", activity: "Kelas Tematik Character Building: Waktunya Maluku, Ini Waktumu" },
    ]
  },
  {
    title: "4. KELAS TEMATIK (4 Minggu)",
    date: "12 Sep – 10 Okt 2026",
    location: "Universitas Pattimura, Ambon",
    description: "",
    color: "bg-[#ED7D31]",
    icon: BookOpen,
    rundown: [
      { time: "08.30-09.00", activity: "Registrasi / Transition" },
      { time: "09.00-10.30", activity: "Lesson 1" },
      { time: "10.30-12.00", activity: "Lesson 2" },
    ]
  },
  {
    title: "5. CLOSING CEREMONY",
    date: "17 Oktober 2026",
    location: "Gedung Gubernur Maluku",
    description: "",
    color: "bg-[#00B050]",
    icon: Users,
    rundown: [
      { time: "08.00-12.00", activity: "Graduation, Showcase, Future Collaboration session" },
    ]
  }
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
  const [expandedTimeline, setExpandedTimeline] = useState<number | null>(null)

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
              {events.map((event) => {
                const isPassed = isEventPassed(event)

                return (
                  <div
                    key={event.id}
                    className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden flex flex-col group transition-transform hover:-translate-y-2 duration-300"
                  >
                    {/* Image Container */}
                    <div className="relative h-56 bg-gray-200 overflow-hidden">
                      {event.image?.original_url ? (
                        <img 
                          src={event.image.original_url} 
                          alt={event.name} 
                          className={cn(
                            "w-full h-full object-cover transition-transform duration-500",
                            isPassed ? "grayscale contrast-75" : "group-hover:scale-105"
                          )}
                          onError={(e) => {
                             (e.target as HTMLImageElement).src = 'https://placehold.co/600x400/1C2B4F/FFFFFF?text=Maluku+Event'
                          }}
                        />
                      ) : (
                        <div className="w-full h-full bg-navy/10 flex items-center justify-center">
                          <Camera className="w-12 h-12 text-navy/30" />
                        </div>
                      )}
                      {isPassed && (
                        <div className="absolute top-4 left-4 bg-gray-900/80 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                          Event Selesai
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

                      {isPassed ? (
                        <button
                          disabled
                          className="w-full flex items-center justify-center gap-2 bg-gray-200 text-gray-400 font-semibold py-3 rounded-xl cursor-not-allowed select-none"
                        >
                          Pendaftaran Ditutup
                        </button>
                      ) : (
                        <Link
                          href={`/events/${event.slug}/register`}
                          className="w-full flex items-center justify-center gap-2 bg-crimson text-white font-semibold py-3 rounded-xl hover:bg-crimson/90 transition-colors"
                        >
                          Register Now
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      )}
                    </div>
                  </div>
                )
              })}
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
              Timeline & Kegiatan Acara
            </h2>
            <div className="w-20 h-1 bg-gold mx-auto" />
          </div>

          <div className="max-w-6xl mx-auto space-y-12 md:space-y-24 relative before:absolute before:inset-0 before:ml-8 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-1 before:bg-gradient-to-b before:from-gold before:via-gold/30 before:to-transparent">
            {timelineData.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={cn(
                  "relative flex items-center justify-between md:justify-normal group",
                  isEven ? "md:flex-row-reverse" : "md:flex-row"
                )}
              >
                {/* Center Node on Desktop, Left Node on Mobile */}
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full border-4 border-white bg-white shadow-xl z-10 transition-transform duration-500 group-hover:scale-110">
                  <div className={cn("w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center", item.color)}>
                     <item.icon className="w-4 h-4 md:w-5 md:h-5 text-white" />
                  </div>
                </div>

                {/* Content Card container - positioned to left or right */}
                <div className={cn(
                  "w-full ml-16 md:ml-0 md:w-[calc(50%-3rem)] flex flex-col",
                  isEven ? "md:items-start" : "md:items-end"
                )}>
                   {/* Card */}
                   <div className={cn(
                     "w-full bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-1"
                   )}>
                      
                      {/* Event Header */}
                      <div className={cn("p-6 md:p-8 border-t-4", item.color.replace('bg-', 'border-'))}>
                         <h3 className={cn("text-2xl font-heading font-bold text-navy mb-4", !isEven && "md:text-right")}>{item.title}</h3>
                         
                         <div className={cn("flex flex-col gap-3 text-sm text-navy/70 font-medium", !isEven && "md:items-end")}>
                            <span className={cn("flex items-center gap-3", !isEven && "md:flex-row-reverse")}>
                              <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                                <Calendar className="w-4 h-4 text-gold" />
                              </div>
                              {item.date}
                            </span>
                            <span className={cn("flex items-center gap-3", !isEven && "md:flex-row-reverse")}>
                              <div className="w-8 h-8 rounded-full bg-crimson/10 flex items-center justify-center shrink-0">
                                <MapPin className="w-4 h-4 text-crimson" />
                              </div>
                              {item.location}
                            </span>
                            {item.description && (
                              <span className={cn("flex items-center gap-3", !isEven && "md:flex-row-reverse")}>
                                <div className="w-8 h-8 rounded-full bg-navy/5 flex items-center justify-center shrink-0">
                                  <span className="w-2 h-2 rounded-full bg-navy/30" />
                                </div>
                                {item.description}
                              </span>
                            )}
                         </div>
                      </div>

                      {/* Rundown */}
                      <div className="p-6 md:p-8 bg-gray-50/50 border-t border-gray-100">
                         <h4 className={cn("font-heading font-semibold text-navy mb-6 flex items-center gap-2 text-lg", !isEven && "md:justify-end md:flex-row-reverse")}>
                           <Clock className="w-5 h-5 text-gold" />
                           Rundown Acara
                         </h4>
                         
                         <div className={cn(
                           "space-y-5 relative before:absolute before:inset-0 before:h-full before:w-px before:bg-gradient-to-b before:from-gray-200 before:via-gray-300 before:to-transparent",
                           "before:ml-2.5 before:-translate-x-px md:before:translate-x-0",
                           isEven ? "md:before:ml-2.5" : "md:before:ml-auto md:before:mr-2.5"
                         )}>
                            {item.rundown.map((rd, i) => (
                              <div key={i} className={cn(
                                "relative flex flex-col group/rd",
                                "pl-8",
                                isEven ? "md:pl-8" : "md:pl-0 md:pr-8 md:text-right"
                              )}>
                                 {/* Dot */}
                                 <div className={cn(
                                   "absolute top-1.5 w-5 h-5 bg-white border-2 border-gray-300 rounded-full z-10 transition-colors group-hover/rd:border-gold group-hover/rd:bg-gold/10",
                                   "left-0 md:-translate-x-px",
                                   isEven ? "md:left-0" : "md:left-auto md:right-0 md:translate-x-px"
                                 )} />
                                 
                                 <span className="text-gold font-bold text-sm font-heading tracking-wide mb-1">
                                   {rd.time}
                                 </span>
                                 <span className="text-navy/80 text-sm font-medium leading-relaxed">
                                   {rd.activity}
                                 </span>
                              </div>
                            ))}
                         </div>
                      </div>
                   </div>
                </div>
              </motion.div>
              );
            })}
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
