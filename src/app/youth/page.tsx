"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  GraduationCap,
  BookOpen,
  Lightbulb,
  Rocket,
  HeartHandshake,
  Palette,
  Users,
  Star,
  Clock,
  Send,
  ArrowRight,
} from "lucide-react"
import SectionWrapper from "@/components/SectionWrapper"
import { showToast } from "@/components/FormToast"

const programs = [
  {
    icon: GraduationCap,
    title: "Leadership Program",
    description: "Program kepemimpinan untuk generasi muda",
  },
  {
    icon: BookOpen,
    title: "Scholarship",
    description: "Beasiswa pendidikan dalam dan luar negeri",
  },
  {
    icon: Lightbulb,
    title: "Innovation Hub",
    description: "Ruang inovasi dan kreativitas anak muda",
  },
  {
    icon: Rocket,
    title: "Startup Launchpad",
    description: "Program akselerasi startup anak muda",
  },
  {
    icon: HeartHandshake,
    title: "Volunteer",
    description: "Program relawan pembangunan Maluku",
  },
  {
    icon: Palette,
    title: "Creative Movement",
    description: "Gerakan seni dan kreativitas pemuda",
  },
]

const stories = [
  {
    name: "Sarah Leiwakabessy",
    role: "Founder, Maluku Creative Hub",
    excerpt:
      "Berawal dari komunitas seni di Ambon, Sarah kini memberdayakan lebih dari 200 anak muda melalui pelatihan musik dan desain.",
  },
  {
    name: "Ricky Sapulete",
    role: "CEO, Moluccas Tech Startup",
    excerpt:
      "Ricky membangun startup agritech yang membantu nelayan dan petani di Maluku Tengah mendapatkan akses pasar yang lebih luas.",
  },
  {
    name: "Maria Pattiselanno",
    role: "Aktivis Lingkungan & Pariwisata",
    excerpt:
      "Maria menginisiasi gerakan bersih pantai yang melibatkan ribuan pemuda di Kepulauan Banda untuk menjaga keindahan alam.",
  },
]

function getTimeRemaining(target: Date) {
  const now = new Date()
  const diff = target.getTime() - now.getTime()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    expired: false,
  }
}

export default function YouthPage() {
  const eventDate = new Date("2026-07-25T00:00:00")
  const [timeLeft, setTimeLeft] = useState(() => getTimeRemaining(eventDate))

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeRemaining(eventDate))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    city: "",
    program: "",
    message: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[name]
        return next
      })
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const newErrors: Record<string, string> = {}
    if (!formData.name.trim()) newErrors.name = "Nama lengkap wajib diisi"
    if (!formData.email.trim()) newErrors.email = "Email wajib diisi"
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Format email tidak valid"
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return
    showToast("Terima kasih! Anda telah terdaftar dalam program Energizing Maluku.")
    setFormData({ name: "", email: "", city: "", program: "", message: "" })
  }

  return (
    <>
      <section className="relative min-h-screen flex items-center bg-navy overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(201, 168, 76, 0.15) 0%, transparent 70%), radial-gradient(ellipse 60% 50% at 80% 80%, rgba(178, 34, 34, 0.1) 0%, transparent 60%)",
          }}
        />
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gold/30 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-crimson/20 rounded-full blur-3xl" />
        </div>

        <div className="container relative z-10 text-center px-4 py-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 text-gold px-4 py-2 rounded-full text-sm mb-6">
              <Users className="w-4 h-4" />
              #GenerasiEmasMaluku
            </div>
          </motion.div>

          <motion.h1
            className="font-heading text-white text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          >
            Be Part of the Future of{" "}
            <span className="text-gold">Maluku</span>
          </motion.h1>

          <motion.p
            className="text-gold/80 italic text-lg md:text-xl mb-2"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            "Ini bisa jadi JIWA website"
          </motion.p>

          <motion.p
            className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            Generasi muda adalah kunci masa depan Maluku. Bergabunglah dalam
            gerakan untuk membangun harapan dari Timur Indonesia.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <a
              href="#register"
              className="bg-gold text-navy font-semibold px-8 py-3.5 rounded-xl hover:bg-gold-light transition-colors text-lg"
            >
              Register Now
            </a>
            <a
              href="#stories"
              className="border-2 border-gold text-gold font-semibold px-8 py-3.5 rounded-xl hover:bg-gold/10 transition-colors text-lg"
            >
              See Stories
            </a>
          </motion.div>
        </div>
      </section>

      <SectionWrapper className="py-20">
        <div className="container">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-navy mb-4">
              Our Programs
            </h2>
            <div className="w-20 h-1 bg-gold mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((program, i) => (
              <motion.div
                key={program.title}
                className="bg-white rounded-xl shadow-md p-6 hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mb-4">
                  <program.icon className="w-7 h-7 text-gold" />
                </div>
                <h3 className="text-xl font-heading font-semibold text-navy mb-2">
                  {program.title}
                </h3>
                <p className="text-navy/70 leading-relaxed">{program.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper className="py-16 bg-gray-50">
        <div className="container" id="register">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy mb-4">
              Registration Form
            </h2>
            <p className="text-navy/70 max-w-xl mx-auto">
              Daftar sekarang untuk bergabung dalam program Energizing Maluku.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 max-w-2xl mx-auto shadow-md">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-navy mb-1.5">
                  Nama Lengkap <span className="text-crimson">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.name ? "border-crimson" : "border-gray-200"
                  } focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition`}
                />
                {errors.name && (
                  <p className="text-crimson text-xs mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-navy mb-1.5">
                  Email <span className="text-crimson">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.email ? "border-crimson" : "border-gray-200"
                  } focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition`}
                />
                {errors.email && (
                  <p className="text-crimson text-xs mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-navy mb-1.5">
                  Kota Asal
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-navy mb-1.5">
                  Program of Interest
                </label>
                <select
                  name="program"
                  value={formData.program}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition"
                >
                  <option value="">Pilih program</option>
                  <option value="Leadership Program">Leadership Program</option>
                  <option value="Scholarship">Scholarship</option>
                  <option value="Innovation Hub">Innovation Hub</option>
                  <option value="Startup Launchpad">Startup Launchpad</option>
                  <option value="Volunteer">Volunteer</option>
                  <option value="Creative Movement">Creative Movement</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-navy mb-1.5">
                  Pesan
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition resize-none"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-gold text-navy px-8 py-3 rounded-xl font-semibold hover:bg-gold-light transition-colors"
              >
                <Send className="w-4 h-4" />
                Daftar Sekarang
              </button>
            </form>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper className="py-20">
        <div className="container" id="stories">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-navy mb-4">
              Youth Stories
            </h2>
            <div className="w-20 h-1 bg-gold mx-auto" />
            <p className="text-navy/70 mt-4 max-w-xl mx-auto">
              Anak muda Maluku yang menginspirasi dan membuat perubahan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stories.map((story, i) => (
              <motion.div
                key={story.name}
                className="bg-white rounded-xl shadow-md p-6 text-center hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gold to-gold-light flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-navy" />
                </div>
                <div className="inline-flex items-center gap-1 bg-gold/10 text-gold text-xs font-semibold px-3 py-1 rounded-full mb-3">
                  <Star className="w-3 h-3" />
                  Young Changemaker
                </div>
                <h3 className="text-lg font-heading font-semibold text-navy mb-1">
                  {story.name}
                </h3>
                <p className="text-sm font-medium text-gold mb-3">{story.role}</p>
                <p className="text-navy/70 text-sm leading-relaxed">{story.excerpt}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      <section className="bg-navy text-white py-16">
        <div className="container text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 text-gold px-4 py-2 rounded-full text-sm mb-6">
            <Clock className="w-4 h-4" />
            Countdown to Event
          </div>

          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-2">
            25 Juli 2026
          </h2>
          <p className="text-white/70 mb-10">
            Bergabunglah dengan 1000 anak muda di Taman Budaya Ambon
          </p>

          {timeLeft.expired ? (
            <div className="text-2xl font-bold text-gold bg-white/10 inline-block px-8 py-4 rounded-xl">
              Event is happening now!
            </div>
          ) : (
            <div className="flex items-center justify-center gap-4 md:gap-6">
              {[
                { label: "Days", value: timeLeft.days },
                { label: "Hours", value: timeLeft.hours },
                { label: "Minutes", value: timeLeft.minutes },
                { label: "Seconds", value: timeLeft.seconds },
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <div className="w-20 h-20 md:w-24 md:h-24 bg-navy border border-gold/30 rounded-xl flex items-center justify-center">
                    <span className="text-3xl md:text-4xl font-bold text-gold tabular-nums">
                      {String(item.value).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="text-white/60 text-sm mt-2">{item.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <SectionWrapper className="py-20">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy mb-6">
            Together, We Build the Future
          </h2>
          <p className="text-navy/70 max-w-xl mx-auto mb-10">
            Setiap langkah kecil dari generasi muda adalah lompatan besar bagi
            masa depan Maluku. Bergabunglah dan jadilah bagian dari perubahan.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#register"
              className="inline-flex items-center gap-2 bg-gold text-navy px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gold-light transition-colors"
            >
              Join the Movement <ArrowRight className="w-5 h-5" />
            </a>
            <button
              onClick={() => showToast("Terima kasih! Cerita Anda akan kami review.")}
              className="inline-flex items-center gap-2 border-2 border-navy text-navy px-8 py-4 rounded-xl text-lg font-semibold hover:bg-navy/5 transition-colors"
            >
              Submit Your Story
            </button>
          </div>
        </div>
      </SectionWrapper>
    </>
  )
}
