"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  MapPin,
  Star,
  Check,
  Globe,
  Video,
  Mic,
  Play,
  Quote,
  Award,
  Users,
  Music2,
  Camera,
  BookOpen,
  X,
} from "lucide-react"
import SectionWrapper from "@/components/SectionWrapper"
import { cn } from "@/lib/utils"

type Profile = {
  id: number
  name: string
  role: string
  category: string
  bio: string
  fullStory: string
  quote: string
  achievements: string[]
}

const categories = [
  "ALL",
  "Tokoh Inspiratif",
  "Anak Muda Kreatif",
  "UMKM",
  "Musisi",
  "Atlet",
  "Entrepreneur",
  "Komunitas Sosial",
] as const

const profiles: Profile[] = [
  {
    id: 1,
    name: "Dr. Martha Sahetapy",
    role: "Budayawan & Akademisi",
    category: "Tokoh Inspiratif",
    bio: "Dedikasikan hidupnya pada pelestarian bahasa dan budaya adat Maluku.",
    fullStory:
      "Dr. Martha Sahetapy adalah seorang akademisi dan budayawan yang telah menghabiskan lebih dari 30 tahun mendokumentasikan bahasa-bahasa daerah di Maluku yang terancam punah. Ia memimpin proyek revitalisasi bahasa di 12 pulau dan telah menerbitkan 8 buku tentang linguistik dan sastra lisan Maluku. Melalui pendekatan partisipatif, ia melibatkan generasi muda dalam upaya pelestarian warisan leluhur mereka.",
    quote: "Bahasa adalah jiwa sebuah budaya. Jika bahasanya mati, maka matilah peradabannya.",
    achievements: [
      "Doktor Linguistik dari Universitas Indonesia",
      "Penghargaan Kebudayaan Kemendikbud 2022",
      "8 buku tentang bahasa daerah Maluku",
      "Revitalisasi 5 bahasa daerah yang hampir punah",
    ],
  },
  {
    id: 2,
    name: "Ricky Leimena",
    role: "Content Creator & Vlogger",
    category: "Anak Muda Kreatif",
    bio: "Mengangkat potensi wisata Maluku melalui konten digital kreatif.",
    fullStory:
      "Ricky Leimena memulai kanal YouTube-nya pada 2020 dengan fokus pada dokumentasi destinasi tersembunyi di Maluku. Dalam waktu 3 tahun, kanalnya telah diikuti lebih dari 200 ribu subscriber. Gayanya yang autentik dan narasi yang mendalam membuat setiap kontennya terasa seperti surat cinta untuk tanah kelahirannya. Ia kini menjadi rujukan utama bagi wisatawan yang ingin menjelajahi Maluku secara otentik.",
    quote: "Aku ingin menunjukkan bahwa Maluku bukan hanya sejarah, tapi masa depan yang cerah.",
    achievements: [
      "200k+ subscriber YouTube",
      "Winner Konten Kreator Pariwisata 2023",
      "Kolaborasi dengan Kemenparekraf",
      "Featured di CNN Travel",
    ],
  },
  {
    id: 3,
    name: "Sari Wulandari",
    role: "Pengrajin Tenun",
    category: "UMKM",
    bio: "Melestarikan tenun tradisional Maluku dengan sentuhan modern.",
    fullStory:
      "Sari Wulandari mewarisi keterampilan menenun dari neneknya yang merupakan penenun ulung di Pulau Seram. Pada 2018, ia mendirikan 'Tenun Nusantara' yang memberdayakan 50 perempuan lokal. Produknya telah menembus pasar ekspor ke Jepang, Belanda, dan Australia. Ia memadukan motif tradisional dengan desain kontemporer sehingga diminati berbagai kalangan.",
    quote: "Setiap helai benang adalah doa dan harapan untuk masa depan yang lebih baik.",
    achievements: [
      "Mendirikan Tenun Nusantara (2018)",
      "Memberdayakan 50 pengrajin perempuan",
      "Ekspor ke 3 negara",
      "Penghargaan UKM Inspiratif 2023",
    ],
  },
  {
    id: 4,
    name: "David Pattiradjawane",
    role: "Pemusik & Komposer",
    category: "Musisi",
    bio: "Memadukan musik tradisional Maluku dengan genre kontemporer.",
    fullStory:
      "David adalah musisi yang dikenal karena eksperimennya memadukan alat musik tradisional Maluku — tifa, ukulele, dan tahuri — dengan genre jazz, elektronik, dan ambient. Album debutnya 'Moluccan Dream' mendapat sambutan hangat di festival musik dunia. Ia percaya bahwa musik adalah jembatan antara tradisi dan modernitas.",
    quote: "Musik adalah bahasa universal. Lewat melodi, aku bercerita tentang Maluku.",
    achievements: [
      "Album 'Moluccan Dream' dirilis 2022",
      "Tampil di 5 festival internasional",
      "Kolaborasi dengan musisi Eropa & Asia",
      "Penghargaan Musik Indonesia 2023",
    ],
  },
  {
    id: 5,
    name: "Alex Tutuarima",
    role: "Atlet Renang",
    category: "Atlet",
    bio: "Perenang kebanggaan Maluku yang berlaga di tingkat nasional.",
    fullStory:
      "Alex Tutuarima adalah perenang asal Ambon yang telah mengharumkan nama Maluku di kancah nasional. Ia memulai latihan di kolam renang kota Ambon sejak usia 8 tahun. Dengan kerja keras dan dukungan komunitas, ia berhasil meraih medali emas di PON dan mewakili Indonesia di ajang SEA Games. Alex aktif menginspirasi anak-anak Maluku untuk berani bermimpi melalui olahraga.",
    quote: "Air adalah rumahku. Setiap tetes keringat adalah investasi untuk mimpi.",
    achievements: [
      "Medali Emas PON 2024",
      "Perwakilan Indonesia SEA Games",
      "Rekor Nasional 200m gaya kupu-kupu",
      "Founder 'Renang Untuk Semua' Ambon",
    ],
  },
  {
    id: 6,
    name: "Rina Takndare",
    role: "Founder Rempah Maluku",
    category: "Entrepreneur",
    bio: "Membangun bisnis rempah yang memberdayakan petani lokal.",
    fullStory:
      "Rina Takndare mendirikan 'Rempah Maluku' pada 2019 dengan visi mengembalikan kejayaan rempah Maluku. Ia membangun rantai pasok langsung dari petani di Kepulauan Banda, Seram, dan Ternate ke pasar global. Bisnisnya tidak hanya menguntungkan secara ekonomi tetapi juga memberdayakan lebih dari 200 petani rempah dengan praktik perdagangan yang adil.",
    quote: "Rempah adalah warisan leluhur. Aku ingin petani kita menikmati hasilnya.",
    achievements: [
      "Founder Rempah Maluku (2019)",
      "Memberdayakan 200+ petani",
      "Ekspor ke Eropa dan Asia",
      "Fair Trade Certified 2023",
    ],
  },
  {
    id: 7,
    name: "Komunitas Sail Maluku",
    role: "Komunitas Bahari",
    category: "Komunitas Sosial",
    bio: "Mengajak generasi muda mencintai laut dan budaya bahari.",
    fullStory:
      "Komunitas Sail Maluku didirikan pada 2020 oleh sekelompok pemuda Ambon yang peduli akan kelestarian laut. Mereka rutin mengadakan aksi bersih pantai, edukasi ekosistem laut, dan festival bahari tahunan. Komunitas ini telah melibatkan lebih dari 1.000 relawan dan berhasil mengumpulkan lebih dari 5 ton sampah plastik dari pesisir Maluku.",
    quote: "Laut adalah masa depan Maluku. Menjaganya adalah tanggung jawab kita bersama.",
    achievements: [
      "1.000+ relawan aktif",
      "5 ton sampah laut berhasil dikumpulkan",
      "Festival Bahari tahunan",
      "Program edukasi di 20 sekolah",
    ],
  },
  {
    id: 8,
    name: "Elsa Manuhutu",
    role: "Fotografer & Videografer",
    category: "Anak Muda Kreatif",
    bio: "Mengabadikan keindahan Maluku melalui lensa kamera.",
    fullStory:
      "Elsa Manuhutu adalah fotografer otodidak yang karyanya telah dipublikasikan di National Geographic dan berbagai media internasional. Ia memulai perjalanannya dengan kamera pinjaman pada 2019, mengelilingi pulau-pulau terpencil di Maluku. Fotografinya yang memukau berhasil menyoroti keindahan alam dan kehidupan masyarakat Maluku dari perspektif yang intim dan jujur.",
    quote: "Sebuah foto bisa berbicara lebih dari seribu kata tentang cinta pada tanah air.",
    achievements: [
      "Featured di National Geographic",
      "Pameran fotografi tunggal 2023",
      "Publikasi di 12 media internasional",
      "Duta Fotografi Pariwisata Maluku",
    ],
  },
]

type Community = {
  name: string
  focus: string
  location: string
  members: string
}

const communities: Community[] = [
  { name: "Komunitas Sail Maluku", focus: "Konservasi Laut & Bahari", location: "Ambon", members: "1.200+" },
  { name: "Rumah Baca Nusantara", focus: "Pendidikan & Literasi", location: "Seram", members: "500+" },
  { name: "Komunitas Tenun Maluku", focus: "Pelestarian Tenun Tradisional", location: "Ambon", members: "300+" },
  { name: "Maluku Muda Berkarya", focus: "Kewirausahaan Pemuda", location: "Kota Ambon", members: "800+" },
  { name: "Komunitas Musik Tifa", focus: "Musik & Seni Tradisional", location: "Banda Neira", members: "200+" },
  { name: "Gerakan Hijau Maluku", focus: "Lingkungan & Reboisasi", location: "Pulau Buru", members: "650+" },
]

export default function PeoplePage() {
  const [activeFilter, setActiveFilter] = useState("ALL")
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null)

  const filtered =
    activeFilter === "ALL"
      ? profiles
      : profiles.filter((p) => p.category === activeFilter)

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
            People & Community
          </motion.h1>
          <motion.p
            className="max-w-2xl mx-auto text-lg text-white/70"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Maluku adalah rumah bagi jiwa-jiwa inspiratif. Tokoh budaya, pengusaha muda,
            seniman, atlet, dan komunitas yang membawa perubahan dari Timur Indonesia.
          </motion.p>
        </div>
      </section>

      {/* FILTER BUTTONS */}
      <div className="sticky top-0 z-30 bg-navy/95 backdrop-blur-md border-b border-white/10">
        <div className="container py-4 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition whitespace-nowrap",
                  activeFilter === cat
                    ? "bg-gold text-navy"
                    : "bg-white/10 text-white/70 hover:bg-white/20"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* PROFILE CARDS */}
      <SectionWrapper className="py-16 lg:py-20">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((profile, i) => (
              <motion.div
                key={profile.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all"
              >
                <div className="p-6 text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-200 to-purple-300 mx-auto rounded-full mb-4" />
                  <h3 className="text-lg font-heading font-bold text-navy mb-1">{profile.name}</h3>
                  <span className="inline-block bg-crimson/10 text-crimson text-xs font-medium px-3 py-1 rounded-full mb-3">
                    {profile.role}
                  </span>
                  <p className="text-sm text-navy/70 leading-relaxed mb-4">{profile.bio}</p>
                  <button
                    onClick={() => setSelectedProfile(profile)}
                    className="text-crimson text-sm font-medium hover:underline"
                  >
                    Read Story
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* PROFILE DETAIL MODAL */}
      <AnimatePresence>
        {selectedProfile && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProfile(null)}
          >
            <motion.div
              className="bg-white rounded-2xl p-6 max-w-lg max-h-[90vh] overflow-y-auto w-full relative"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedProfile(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition z-10"
              >
                <X className="w-4 h-4 text-navy" />
              </button>

              <div className="text-center mb-6">
                <div className="w-28 h-28 bg-gradient-to-br from-blue-200 to-purple-300 mx-auto rounded-full mb-4" />
                <h2 className="text-2xl font-heading font-bold text-navy">{selectedProfile.name}</h2>
                <span className="inline-block bg-crimson/10 text-crimson text-xs font-medium px-3 py-1 rounded-full mt-1">
                  {selectedProfile.role}
                </span>
              </div>

              <p className="text-sm text-navy/70 leading-relaxed mb-6">{selectedProfile.fullStory}</p>

              <div className="border-l-4 border-gold bg-amber-50 rounded-r-lg p-4 mb-6">
                <Quote className="w-5 h-5 text-gold mb-2" />
                <p className="text-sm text-navy/80 italic">&ldquo;{selectedProfile.quote}&rdquo;</p>
              </div>

              <h3 className="font-heading font-semibold text-navy mb-3 flex items-center gap-2">
                <Award className="w-4 h-4 text-gold" /> Achievements
              </h3>
              <ul className="space-y-2 mb-6">
                {selectedProfile.achievements.map((a) => (
                  <li key={a} className="flex items-start gap-2 text-sm text-navy/70">
                    <Check className="w-4 h-4 text-crimson mt-0.5 shrink-0" />
                    <span>{a}</span>
                  </li>
                ))}
              </ul>

              <h3 className="font-heading font-semibold text-navy mb-3">Social Media</h3>
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-full bg-pink-50 flex items-center justify-center">
                  <Globe className="w-4 h-4 text-pink-500" />
                </span>
                <span className="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center">
                  <Video className="w-4 h-4 text-red-500" />
                </span>
                <span className="w-9 h-9 rounded-full bg-sky-50 flex items-center justify-center">
                  <X className="w-4 h-4 text-sky-500" />
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FEATURED DOCUMENTARY */}
      <SectionWrapper className="py-16 lg:py-20 bg-gray-50">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy mb-4">Featured Mini Documentary</h2>
            <div className="w-20 h-1 bg-gold mx-auto" />
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="aspect-video bg-gray-200 rounded-xl flex flex-col items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-navy/50 to-navy/70 flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-gold/90 flex items-center justify-center mb-4">
                  <Play className="w-7 h-7 text-navy ml-0.5" />
                </div>
                <p className="text-white text-lg font-heading font-semibold">Coming Soon</p>
                <p className="text-white/60 text-sm mt-1">Mini documentary series</p>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* COMMUNITY MAP */}
      <SectionWrapper className="py-16 lg:py-20">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy mb-4">Active Communities</h2>
            <div className="w-20 h-1 bg-gold mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {communities.map((c, i) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all"
              >
                <div className="p-5">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-9 h-9 rounded-lg bg-crimson/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Users className="w-4 h-4 text-crimson" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-navy">{c.name}</h3>
                      <p className="text-sm text-navy/50">{c.focus}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-navy/60 pt-3 border-t border-gray-100">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-crimson" /> {c.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3 text-gold" /> {c.members} members
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* PODCAST SECTION */}
      <section className="py-20 bg-navy">
        <div className="container text-center">
          <div className="max-w-xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-6">
              <Mic className="w-8 h-8 text-gold" />
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
              Energizing Maluku Podcast
            </h2>
            <span className="inline-block bg-gold text-navy text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-4">
              Coming Soon
            </span>
            <p className="text-white/60 leading-relaxed">
              Segera hadir! Podcast yang menghadirkan obrolan inspiratif bersama tokoh-tokoh
              Maluku dari berbagai bidang. Dengarkan cerita, gagasan, dan semangat mereka dalam
              membangun Maluku yang lebih baik.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
