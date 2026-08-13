"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, CheckCircle2, AlertCircle } from "lucide-react"
import Link from "next/link"
import SectionWrapper from "@/components/SectionWrapper"

const goalOptions = [
  "Mencari pekerjaan",
  "Membangun jaringan profesional",
  "Belajar membangun startup",
  "Mencari co-founder",
  "Mencari investor",
  "Mengembangkan bisnis",
  "Mendapatkan mentor",
  "Memperluas pasar",
  "Belajar digital marketing",
  "Belajar pendanaan usaha",
  "Lainnya",
]

export default function RegisterEventPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string
  const eventId = slug // using slug as eventId for now

  const [form, setForm] = useState({
    full_name: "",
    gender: "",
    dob_or_age: "",
    whatsapp: "",
    email: "",
    city: "",
    education: "",
    participant_category: "",
    goals: [] as string[],
    cv_link: "",
    linkedin_link: "",
    source_info: "",
    institution_name: "",
    attendance_type: "offline",
  })

  const [eventDetail, setEventDetail] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchEventDetail() {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
        const res = await fetch(`${apiUrl}/api/events/${slug}`)
        if (!res.ok) throw new Error("Event not found")
        const json = await res.json()
        const eventData = json.data
        setEventDetail(eventData)
        
        // Sesuaikan default attendance_type dengan event_type
        if (eventData.event_type === "online") {
          setForm(prev => ({ ...prev, attendance_type: "online" }))
        } else {
          setForm(prev => ({ ...prev, attendance_type: "offline" }))
        }
      } catch (err) {
        console.error("Gagal memuat event detail", err)
      }
    }
    fetchEventDetail()
  }, [slug])

  const handleGoalChange = (goal: string) => {
    if (form.goals.includes(goal)) {
      setForm({ ...form, goals: form.goals.filter((g) => g !== goal) })
    } else {
      if (form.goals.length < 3) {
        setForm({ ...form, goals: [...form.goals, goal] })
      } else {
        alert("Anda hanya dapat memilih maksimal 3 tujuan.")
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const payload = {
        ...form
      }

      // If institution is empty, undefined it so backend might not validate it or just leave it empty string
      if (!payload.institution_name) {
        delete (payload as any).institution_name
      }
      if (!payload.linkedin_link) {
        delete (payload as any).linkedin_link
      }
      if (!payload.cv_link) {
        delete (payload as any).cv_link
      }

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const response = await fetch(`${apiUrl}/api/events/${eventId}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      if (!response.ok) {
        if (data.errors) {
          const errorMessages = Object.values(data.errors).flat().join(", ");
          throw new Error(errorMessages);
        }
        throw new Error(data.message || "Terjadi kesalahan saat mendaftar. Silakan coba lagi.")
      }

      setSuccess(true)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-20 px-4">
        <motion.div
          className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-navy mb-4">Pendaftaran Berhasil!</h2>
          <p className="text-navy/70 mb-8 leading-relaxed">
            Terima kasih telah mendaftar. QR Code tiket Anda telah dikirimkan ke email atau dapat diakses melalui dashboard peserta.
          </p>
          <Link href={`/events`} className="inline-flex items-center justify-center w-full bg-navy text-white font-semibold py-3.5 rounded-xl hover:bg-navy/90 transition-colors">
            Kembali ke Events
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-20">
      <div className="container max-w-3xl">
        <Link href="/events" className="inline-flex items-center text-navy/60 hover:text-navy font-medium mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali ke Events
        </Link>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-navy px-8 py-10 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <h1 className="text-3xl md:text-4xl font-bold text-white relative z-10 mb-2">Registrasi Event</h1>
            <p className="text-white/80 relative z-10">Lengkapi data diri Anda untuk mengikuti event ini</p>
          </div>

          <div className="p-8 md:p-10">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl flex items-start mb-8">
                <AlertCircle className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
                <p className="text-sm font-medium">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Data Diri */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-navy border-b border-gray-100 pb-2">Informasi Pribadi</h3>

                <div>
                  <label className="block text-sm font-medium text-navy mb-1.5">Nama Lengkap *</label>
                  <input
                    type="text"
                    required
                    value={form.full_name}
                    onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition text-navy"
                    placeholder="Sesuai KTP/Identitas"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-navy mb-1.5">Jenis Kelamin *</label>
                    <select
                      required
                      value={form.gender}
                      onChange={(e) => setForm({ ...form, gender: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition text-navy bg-white"
                    >
                      <option value="" disabled>Pilih Jenis Kelamin</option>
                      <option value="Laki-laki">Laki-laki</option>
                      <option value="Perempuan">Perempuan</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy mb-1.5">Tanggal Lahir *</label>
                    <input
                      type="date"
                      required
                      value={form.dob_or_age}
                      onChange={(e) => setForm({ ...form, dob_or_age: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition text-navy"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-navy mb-1.5">No. WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      value={form.whatsapp}
                      onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition text-navy"
                      placeholder="Contoh: 081234567890"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy mb-1.5">Email *</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition text-navy"
                      placeholder="email@anda.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-navy mb-1.5">Asal Kota *</label>
                  <input
                    type="text"
                    required
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition text-navy"
                    placeholder="Kota Domisili"
                  />
                </div>
              </div>

              {/* Latar Belakang */}
              <div className="space-y-6 pt-6">
                <h3 className="text-xl font-semibold text-navy border-b border-gray-100 pb-2">Latar Belakang & Profil</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-navy mb-1.5">Pendidikan Terakhir *</label>
                    <select
                      required
                      value={form.education}
                      onChange={(e) => setForm({ ...form, education: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition text-navy bg-white"
                    >
                      <option value="" disabled>Pilih Pendidikan</option>
                      <option value="SMA/SMK">SMA/SMK/Sederajat</option>
                      <option value="D1-D3">Diploma (D1-D3)</option>
                      <option value="S1">Sarjana (S1)</option>
                      <option value="S2">Magister (S2)</option>
                      <option value="S3">Doktor (S3)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy mb-1.5">Kategori Peserta *</label>
                    <select
                      required
                      value={form.participant_category}
                      onChange={(e) => setForm({ ...form, participant_category: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition text-navy bg-white"
                    >
                      <option value="" disabled>Pilih Kategori</option>
                      <option value="Pencari Kerja">Dosen</option>
                      <option value="Pencari Kerja">Masyarakat Umum</option>
                      <option value="Pencari Kerja">Pencari Kerja</option>
                      <option value="Mahasiswa/Fresh Graduate">Mahasiswa/Fresh Graduate</option>
                      <option value="Calon Founder Startup">Calon Founder Startup</option>
                      <option value="Founder Startup">Founder Startup</option>
                      <option value="Pemilik UMKM">Pemilik UMKM</option>
                      <option value="Pelaku Bisnis yang sedang Scale-up">Pelaku Bisnis yang sedang Scale-up</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-navy mb-1.5">Nama Instansi/Perusahaan (Opsional)</label>
                  <input
                    type="text"
                    value={form.institution_name}
                    onChange={(e) => setForm({ ...form, institution_name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition text-navy"
                    placeholder="Isi jika mendaftar lewat jalur instansi"
                  />
                  <p className="text-xs text-gray-500 mt-1.5">
                    Kosongkan jika Anda mendaftar secara individu.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-navy mb-1.5">Tujuan Mengikuti Event * (Maksimal 3)</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                    {goalOptions.map((goal) => (
                      <label key={goal} className="flex items-start gap-3 p-3 rounded-xl border border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors">
                        <input
                          type="checkbox"
                          className="mt-1 w-4 h-4 text-gold border-gray-300 rounded focus:ring-gold"
                          checked={form.goals.includes(goal)}
                          onChange={() => handleGoalChange(goal)}
                          disabled={!form.goals.includes(goal) && form.goals.length >= 3}
                        />
                        <span className="text-sm text-navy/80 leading-tight">{goal}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-navy mb-1.5">Link CV (Google Drive / Portfolio) *</label>
                  <input
                    type="url"
                    required
                    value={form.cv_link}
                    onChange={(e) => setForm({ ...form, cv_link: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition text-navy"
                    placeholder="https://"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-navy mb-1.5">Link LinkedIn (Opsional)</label>
                  <input
                    type="url"
                    value={form.linkedin_link}
                    onChange={(e) => setForm({ ...form, linkedin_link: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition text-navy"
                    placeholder="https://linkedin.com/in/..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-navy mb-1.5">Tipe Kehadiran *</label>
                  <div className="flex gap-6 mt-2 mb-4">
                    {/* Tampilkan Offline jika type = all atau offline */}
                    {eventDetail && (eventDetail.event_type === "all" || eventDetail.event_type === "offline") && (
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="attendance_type"
                          value="offline"
                          checked={form.attendance_type === "offline"}
                          onChange={(e) => setForm({ ...form, attendance_type: e.target.value })}
                          className="w-4 h-4 text-gold border-gray-300 focus:ring-gold"
                        />
                        <span className="text-sm text-navy">Hadir Langsung (Offline)</span>
                      </label>
                    )}
                    
                    {/* Tampilkan Online jika type = all atau online */}
                    {eventDetail && (eventDetail.event_type === "all" || eventDetail.event_type === "online") && (
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="attendance_type"
                          value="online"
                          checked={form.attendance_type === "online"}
                          onChange={(e) => setForm({ ...form, attendance_type: e.target.value })}
                          className="w-4 h-4 text-gold border-gray-300 focus:ring-gold"
                        />
                        <span className="text-sm text-navy">Hadir Daring (Online)</span>
                      </label>
                    )}
                    
                    {/* Fallback loading state if eventDetail is not yet fetched */}
                    {!eventDetail && (
                      <span className="text-sm text-navy/50 italic">Memuat pilihan kehadiran...</span>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-navy mb-1.5">Darimana Anda mengetahui event ini? *</label>
                  <select
                    required
                    value={form.source_info}
                    onChange={(e) => setForm({ ...form, source_info: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition text-navy bg-white"
                  >
                    <option value="" disabled>Pilih Sumber Info</option>
                    <option value="Instagram">Instagram</option>
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="WhatsApp">WhatsApp</option>
                    <option value="Website">Website</option>
                    <option value="Teman/Rekan">Teman/Rekan</option>
                    <option value="Kampus">Kampus</option>
                    <option value="Komunitas">Komunitas</option>
                    <option value="Media Partner">Media Partner</option>
                  </select>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-gray-100">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-crimson text-white font-semibold py-4 rounded-xl hover:bg-crimson/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center text-lg"
                >
                  {loading ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    "Daftar Event"
                  )}
                </button>
                <p className="text-center text-xs text-navy/50 mt-4">
                  Dengan mendaftar, Anda menyetujui syarat & ketentuan penyelenggaraan event.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
