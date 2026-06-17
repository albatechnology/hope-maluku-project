"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Fish, Zap, TreePine, Palette, Store, Building, Download, Send } from "lucide-react"
import SectionWrapper from "@/components/SectionWrapper"
import AnimatedCounter from "@/components/AnimatedCounter"
import { showToast } from "@/components/FormToast"

const audienceBadges = ["Investor", "Pemerintah", "Sponsor", "NGO", "Mitra"]

const sectors = [
  {
    icon: Fish,
    title: "Perikanan",
    gradient: "from-blue-500 to-cyan-400",
    stat: "70%",
    statLabel: "Potensi 70% perikanan Indonesia Timur",
    description:
      "Maluku menyumbang lebih dari 70% potensi perikanan Indonesia Timur. Peluang besar di sektor perikanan tangkap, budidaya, serta pengolahan hasil laut.",
  },
  {
    icon: Zap,
    title: "Energi",
    gradient: "from-yellow-500 to-orange-400",
    stat: "5000+ MW",
    statLabel: "Potensi energi terbarukan melimpah",
    description:
      "Potensi energi terbarukan Maluku mencapai lebih dari 5.000 MW dari tenaga surya, angin, panas bumi, dan arus laut yang siap dikembangkan.",
  },
  {
    icon: TreePine,
    title: "Pariwisata",
    gradient: "from-green-500 to-emerald-400",
    stat: "16 Juta",
    statLabel: "Destinasi wisata kelas dunia",
    description:
      "Dari Kepulauan Banda hingga Raja Ampat-nya Maluku, destinasi wisata bahari dan budaya menanti untuk dieksplorasi dan dikembangkan.",
  },
  {
    icon: Palette,
    title: "Creative Economy",
    gradient: "from-purple-500 to-pink-400",
    stat: "500+",
    statLabel: "Ekonomi kreatif berbasis budaya",
    description:
      "Ekonomi kreatif berbasis budaya lokal yang unik, mulai dari musik, kerajinan tangan, fashion, hingga kuliner tradisional.",
  },
  {
    icon: Store,
    title: "UMKM",
    gradient: "from-red-500 to-rose-400",
    stat: "1000+",
    statLabel: "Pengembangan usaha mikro & kelautan",
    description:
      "Lebih dari 1.000 UMKM siap didorong naik kelas melalui pendampingan, akses pasar, dan pembiayaan yang inklusif.",
  },
  {
    icon: Building,
    title: "Infrastruktur",
    gradient: "from-navy to-navy-light",
    stat: "15 Proyek",
    statLabel: "Pembangunan infrastruktur strategis",
    description:
      "Pembangunan infrastruktur strategis di bidang transportasi, pelabuhan, bandara, dan konektivitas digital yang membuka akses ke seluruh Maluku.",
  },
]

const formFields = [
  { label: "Nama Lengkap", name: "name", type: "text", required: true },
  { label: "Email", name: "email", type: "email", required: true },
  { label: "Perusahaan", name: "company", type: "text", required: false },
]

export default function EconomyPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    sector: "",
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
    showToast("Thank you for your inquiry. Our team will contact you soon.")
    setFormData({ name: "", email: "", company: "", sector: "", message: "" })
  }

  return (
    <>
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-navy to-navy-light overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-20 right-20 w-80 h-80 bg-gold/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-crimson/20 rounded-full blur-3xl" />
        </div>

        <div className="container relative z-10 py-24">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              className="font-heading text-white text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              Invest in the Future of{" "}
              <span className="text-gold">Eastern Indonesia</span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              Maluku memiliki potensi ekonomi yang luar biasa — dari kekayaan laut,
              energi terbarukan, pariwisata kelas dunia, hingga ekonomi kreatif
              berbasis budaya. Bersama, kita bangun masa depan Indonesia Timur.
            </motion.p>

            <motion.div
              className="flex flex-wrap items-center justify-center gap-3"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            >
              {audienceBadges.map((badge) => (
                <span
                  key={badge}
                  className="px-5 py-2 rounded-full border border-gold text-white text-sm font-medium"
                >
                  {badge}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <SectionWrapper className="py-16">
        <div className="container">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-navy mb-4">
              Opportunity Sectors
            </h2>
            <div className="w-20 h-1 bg-gold mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sectors.map((sector, i) => (
              <motion.div
                key={sector.title}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div
                  className={`h-24 bg-gradient-to-br ${sector.gradient} flex items-center justify-center`}
                >
                  <sector.icon className="w-10 h-10 text-white" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-heading font-semibold text-navy mb-1">
                    {sector.title}
                  </h3>
                  <div className="text-3xl font-bold text-gold mb-2">
                    {sector.stat}
                  </div>
                  <p className="text-sm font-medium text-navy/60 mb-3">
                    {sector.statLabel}
                  </p>
                  <p className="text-navy/70 text-sm leading-relaxed">
                    {sector.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      <section className="bg-navy text-white py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Maluku by the Numbers
            </h2>
            <div className="w-20 h-1 bg-gold mx-auto" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-6">
              <div className="text-3xl md:text-5xl font-bold text-gold">
                <AnimatedCounter end={70} suffix="%" />
              </div>
              <div className="text-white/70 mt-2">Sektor Perikanan</div>
            </div>
            <div className="text-center p-6">
              <div className="text-3xl md:text-5xl font-bold text-gold">
                <AnimatedCounter end={15} prefix="$ " suffix="B" />
              </div>
              <div className="text-white/70 mt-2">Potensi Investasi</div>
            </div>
            <div className="text-center p-6">
              <div className="text-3xl md:text-5xl font-bold text-gold">
                <AnimatedCounter end={1000} suffix="+ UMKM" />
              </div>
              <div className="text-white/70 mt-2">UMKM Terdaftar</div>
            </div>
            <div className="text-center p-6">
              <div className="text-3xl md:text-5xl font-bold text-gold">
                <AnimatedCounter end={50000} suffix="+ Lapangan Kerja" />
              </div>
              <div className="text-white/70 mt-2">Lapangan Kerja</div>
            </div>
          </div>
        </div>
      </section>

      <SectionWrapper className="py-16 bg-gray-50">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy mb-4">
            Download Our Proposals
          </h2>
          <p className="text-navy/70 mb-10 max-w-xl mx-auto">
            Get detailed insights into investment opportunities and partnership
            models in Maluku.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => showToast("Download started - PDF placeholder")}
              className="inline-flex items-center gap-2 bg-gold text-navy px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gold-light transition-colors"
            >
              <Download className="w-5 h-5" />
              Download Investment Proposal
            </button>
            <button
              onClick={() => showToast("Download started - PDF placeholder")}
              className="inline-flex items-center gap-2 border-2 border-gold text-gold px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gold/10 transition-colors"
            >
              <Download className="w-5 h-5" />
              Download Partnership Deck
            </button>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy mb-4">
              Investor Contact Form
            </h2>
            <p className="text-navy/70 max-w-xl mx-auto">
              Interested in investing or collaborating? Fill out the form below
              and our team will reach out to you.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              {formFields.map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-medium text-navy mb-1.5">
                    {field.label}
                    {field.required && <span className="text-crimson ml-1">*</span>}
                  </label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name as keyof typeof formData]}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border ${
                      errors[field.name] ? "border-crimson" : "border-gray-200"
                    } focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition`}
                  />
                  {errors[field.name] && (
                    <p className="text-crimson text-xs mt-1">{errors[field.name]}</p>
                  )}
                </div>
              ))}

              <div>
                <label className="block text-sm font-medium text-navy mb-1.5">
                  Sektor Minat
                </label>
                <select
                  name="sector"
                  value={formData.sector}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition"
                >
                  <option value="">Pilih sektor</option>
                  <option value="Perikanan">Perikanan</option>
                  <option value="Energi">Energi</option>
                  <option value="Pariwisata">Pariwisata</option>
                  <option value="Creative Economy">Creative Economy</option>
                  <option value="UMKM">UMKM</option>
                  <option value="Infrastruktur">Infrastruktur</option>
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
                className="inline-flex items-center gap-2 bg-crimson text-white px-8 py-3 rounded-xl font-medium hover:opacity-90 transition-opacity"
              >
                <Send className="w-4 h-4" />
                Submit Inquiry
              </button>
            </form>
          </div>
        </div>
      </SectionWrapper>
    </>
  )
}
