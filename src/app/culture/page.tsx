"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import * as Tabs from "@radix-ui/react-tabs"
import {
  Music2,
  Play,
  Pause,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Languages,
  Shirt,
  Home,
  Volume2,
  SkipForward,
  SkipBack,
} from "lucide-react"
import SectionWrapper from "@/components/SectionWrapper"
import { cn } from "@/lib/utils"

type Song = {
  title: string
  artist: string
}

const songs: Song[] = [
  { title: "Rasa Sayange", artist: "Traditional Maluku" },
  { title: "Ayo Mama", artist: "Traditional Maluku" },
  { title: "Burung Kaka Tua", artist: "Traditional Maluku" },
  { title: "Sio Mama", artist: "Traditional Maluku" },
]

const phrases = [
  { indonesian: "Apa kabar?", ambon: "Apa kabar?", english: "How are you?" },
  { indonesian: "Terima kasih", ambon: "Tarima kasi", english: "Thank you" },
  { indonesian: "Saya cinta kamu", ambon: "Beta cinta ale", english: "I love you" },
  { indonesian: "Selamat pagi", ambon: "Pagi", english: "Good morning" },
  { indonesian: "Di mana?", ambon: "Di mana?", english: "Where?" },
  { indonesian: "Berapa?", ambon: "Barapa?", english: "How much?" },
  { indonesian: "Tolong", ambon: "Tolong", english: "Help / Please" },
  { indonesian: "Makan", ambon: "Makan", english: "Eat" },
]

type Story = {
  id: number
  title: string
  excerpt: string
  full: string
}

const stories: Story[] = [
  {
    id: 1,
    title: "Legenda Gunung Banda Api",
    excerpt:
      "Konon, gunung api di Kepulauan Banda ini tercipta dari pertarungan dahsyat antara dua kekuatan alam...",
    full: "Legenda menceritakan bahwa dahulu kala, Kepulauan Banda dijaga oleh dua naga raksasa, Naga Merah dan Naga Putih. Pertarungan mereka menciptakan gunung berapi yang hingga kini masih aktif. Masyarakat setempat percaya bahwa letusan gunung adalah pertanda para leluhur menjaga keseimbangan alam. Hingga saat ini, Gunung Banda Api menjadi simbol kekuatan alam dan spiritualitas masyarakat Banda.",
  },
  {
    id: 2,
    title: "Asal Usul Pulau Seram",
    excerpt:
      "Cerita rakyat dari masyarakat adat Nuaulu tentang terbentuknya Pulau Seram yang sakral...",
    full: "Pulau Seram dipercaya sebagai 'Pulau Sakral' oleh masyarakat adat. Konon, dewa-dewi turun dari kayangan dan menciptakan pulau ini sebagai tempat tinggal manusia pertama di Maluku. Gunung-gunung di Seram dianggap sebagai jelmaan para dewa, dan hutan-hutannya dijaga oleh roh leluhur. Masyarakat adat Nuaulu dan Manusela masih menjaga tradisi ini dengan melakukan ritual tahunan di situs-situs keramat.",
  },
  {
    id: 3,
    title: "Putri Tanjung",
    excerpt:
      "Kisah cinta tragis seorang putri dari Kerajaan Tanjung yang dikenang hingga kini...",
    full: "Di pesisir selatan Seram, hiduplah seorang putri cantik bernama Tanjung. Ia jatuh cinta pada seorang pemuda nelayan biasa. Namun, ayahnya yang seorang raja menolak hubungan tersebut. Sang putri dan pemuda itu melarikan diri, dan dikutuk menjadi dua batu karang yang saling berhadapan di laut. Masyarakat setempat percaya bahwa ombak yang memecah di antara kedua karang itu adalah bisikan cinta abadi mereka.",
  },
]

export default function CulturePage() {
  const [currentSong, setCurrentSong] = useState<Song | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [expandedStories, setExpandedStories] = useState<number[]>([])

  const toggleStory = (id: number) => {
    setExpandedStories((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    )
  }

  const playSong = (song: Song) => {
    if (currentSong?.title === song.title) {
      setIsPlaying((prev) => !prev)
    } else {
      setCurrentSong(song)
      setIsPlaying(true)
    }
  }

  return (
    <>
      {/* HERO */}
      <section className="relative bg-gradient-to-br from-crimson to-red-800 py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-10 right-1/4 w-72 h-72 bg-gold/30 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-1/4 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />
        </div>
        <div className="container relative z-10 text-center">
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-tight mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Culture & Heritage
          </motion.h1>
          <motion.p
            className="max-w-2xl mx-auto text-lg text-white/70"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Maluku memiliki kekayaan budaya yang luar biasa — tarian tradisional, musik khas,
            bahasa daerah, kain tenun, rumah adat, dan cerita rakyat yang sarat makna.
          </motion.p>
        </div>
      </section>

      {/* TABS */}
      <section className="py-12 lg:py-16">
        <div className="container">
          <Tabs.Root defaultValue="tari" className="w-full">
            <Tabs.List className="flex flex-wrap gap-2 border-b border-gray-200 pb-3 mb-8">
              {[
                { value: "tari", label: "Tari Tradisional" },
                { value: "musik", label: "Musik" },
                { value: "bahasa", label: "Bahasa Daerah" },
                { value: "kain", label: "Kain & Kerajinan" },
                { value: "rumah", label: "Rumah Adat" },
                { value: "cerita", label: "Cerita Rakyat" },
              ].map((tab) => (
                <Tabs.Trigger
                  key={tab.value}
                  value={tab.value}
                  className={cn(
                    "px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                    "data-[state=active]:bg-gold data-[state=active]:text-navy",
                    "data-[state=inactive]:text-navy/60 data-[state=inactive]:hover:text-navy data-[state=inactive]:hover:bg-navy/5"
                  )}
                >
                  {tab.label}
                </Tabs.Trigger>
              ))}
            </Tabs.List>

            {/* TAB: TARI TRADISIONAL */}
            <Tabs.Content value="tari" className="focus:outline-none">
              <h2 className="text-2xl font-heading font-bold text-navy mb-8">Tari Tradisional Maluku</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { name: "Tari Cakalele", desc: "Tarian perang tradisional yang menggambarkan keberanian para pahlawan Maluku dalam mempertahankan tanah air.", region: "Seluruh Maluku" },
                  { name: "Tari Lenso", desc: "Tarian pergaulan muda-mudi yang menggunakan sapu tangan sebagai properti utama, diiringi musik yang riang.", region: "Ambon & Lease" },
                  { name: "Tari Saureka-reka", desc: "Tarian akrobatik khas Kepulauan Kei yang dimainkan dengan gerakan lincah menggunakan gaba-gaba.", region: "Kepulauan Kei" },
                  { name: "Tari Poco-poco", desc: "Tarian kreasi baru yang telah mendunia, berasal dari Minahasa namun populer di Maluku sebagai senam kebugaran.", region: "Populer di Maluku" },
                ].map((tari, i) => (
                  <motion.div
                    key={tari.name}
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                  >
                    <div className="h-40 bg-gradient-to-br from-crimson/20 to-gold/20 flex items-center justify-center">
                      <Music2 className="w-12 h-12 text-crimson/40" />
                    </div>
                    <div className="p-4">
                      <span className="text-xs text-gold font-semibold uppercase tracking-wider">{tari.region}</span>
                      <h3 className="text-lg font-heading font-semibold text-navy mt-1">{tari.name}</h3>
                      <p className="text-sm text-navy/70 mt-1 leading-relaxed">{tari.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Tabs.Content>

            {/* TAB: MUSIK */}
            <Tabs.Content value="musik" className="focus:outline-none">
              <h2 className="text-2xl font-heading font-bold text-navy mb-4">Musik Maluku</h2>
              <p className="text-navy/70 mb-8 leading-relaxed">
                Maluku dikenal sebagai daerah yang melahirkan musisi-musisi berbakat. Alat musik tradisional
                seperti tifa, ukulele, dan tahuri menjadi ciri khas irama musik Maluku yang ceria dan penuh semangat.
              </p>

              {/* AUDIO PLAYER */}
              {currentSong && (
                <div className="bg-navy rounded-2xl p-6 mb-8 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
                        <Music2 className="w-6 h-6 text-gold" />
                      </div>
                      <div>
                        <p className="font-heading font-semibold">{currentSong.title}</p>
                        <p className="text-white/60 text-sm">{currentSong.artist}</p>
                      </div>
                    </div>
                    <Volume2 className="w-5 h-5 text-gold" />
                  </div>

                  {/* Waveform */}
                  <div className="flex items-end gap-1 h-12 mb-4">
                    {Array.from({ length: 40 }).map((_, i) => {
                      const height = 20 + Math.random() * 60
                      return (
                        <div
                          key={i}
                          className="flex-1 bg-gold/60 rounded-full"
                          style={{ height: `${height}%` }}
                        />
                      )
                    })}
                  </div>

                  {/* Controls */}
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <SkipBack className="w-5 h-5 text-white/60 hover:text-gold cursor-pointer transition" />
                    <button
                      onClick={() => setIsPlaying((prev) => !prev)}
                      className="w-12 h-12 rounded-full bg-gold flex items-center justify-center hover:bg-gold-light transition"
                    >
                      {isPlaying ? <Pause className="w-6 h-6 text-navy" /> : <Play className="w-6 h-6 text-navy" />}
                    </button>
                    <SkipForward className="w-5 h-5 text-white/60 hover:text-gold cursor-pointer transition" />
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gold rounded-full transition-all"
                      style={{ width: isPlaying ? "45%" : "0%" }}
                    />
                  </div>
                </div>
              )}

              {/* Song List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {songs.map((song) => (
                  <motion.button
                    key={song.title}
                    onClick={() => playSong(song)}
                    className={cn(
                      "flex items-center gap-4 p-4 rounded-xl text-left transition-all",
                      currentSong?.title === song.title
                        ? "bg-gold/10 border border-gold/30"
                        : "bg-gray-50 hover:bg-gray-100 border border-transparent"
                    )}
                    whileHover={{ x: 4 }}
                  >
                    <div className="w-10 h-10 rounded-full bg-navy flex items-center justify-center shrink-0">
                      {currentSong?.title === song.title && isPlaying ? (
                        <Pause className="w-4 h-4 text-gold" />
                      ) : (
                        <Play className="w-4 h-4 text-gold" />
                      )}
                    </div>
                    <div>
                      <p className="font-heading font-semibold text-navy">{song.title}</p>
                      <p className="text-xs text-navy/50">{song.artist}</p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </Tabs.Content>

            {/* TAB: BAHASA DAERAH */}
            <Tabs.Content value="bahasa" className="focus:outline-none">
              <div className="flex items-center gap-3 mb-4">
                <Languages className="w-6 h-6 text-gold" />
                <h2 className="text-2xl font-heading font-bold text-navy">Bahasa Daerah Maluku</h2>
              </div>
              <p className="text-navy/70 mb-8 leading-relaxed">
                Maluku memiliki lebih dari 117 bahasa daerah yang tersebar di seluruh kepulauan.
                Bahasa Melayu Ambon menjadi lingua franca yang menghubungkan berbagai komunitas.
              </p>
              <div className="overflow-x-auto rounded-xl border border-gray-200">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-navy text-white">
                      <th className="text-left px-4 py-3 font-heading font-semibold">Bahasa Indonesia</th>
                      <th className="text-left px-4 py-3 font-heading font-semibold">Melayu Ambon</th>
                      <th className="text-left px-4 py-3 font-heading font-semibold">English</th>
                    </tr>
                  </thead>
                  <tbody>
                    {phrases.map((p, i) => (
                      <tr key={i} className={cn("border-t border-gray-100", i % 2 === 0 && "bg-gray-50")}>
                        <td className="px-4 py-3 text-navy font-medium">{p.indonesian}</td>
                        <td className="px-4 py-3 text-navy/80">{p.ambon}</td>
                        <td className="px-4 py-3 text-navy/60">{p.english}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Tabs.Content>

            {/* TAB: KAIN & KERAJINAN */}
            <Tabs.Content value="kain" className="focus:outline-none">
              <h2 className="text-2xl font-heading font-bold text-navy mb-8">Kain & Kerajinan Tradisional</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    title: "Kain Tenun",
                    desc: "Kain tenun khas Maluku dibuat dengan teknik tradisional oleh para pengrajin di berbagai daerah. Setiap motif memiliki makna filosofis yang mendalam, menggambarkan hubungan manusia dengan alam dan leluhur.",
                    significance: "Simbol identitas budaya dan status sosial",
                  },
                  {
                    title: "Anyaman Nipah",
                    desc: "Daun nipah dianyam menjadi tikar, tas, topi, dan berbagai kerajinan tangan. Keterampilan ini diwariskan secara turun-temurun dan menjadi sumber ekonomi kreatif masyarakat pesisir.",
                    significance: "Kearifan lokal dalam pemanfaatan sumber daya alam",
                  },
                  {
                    title: "Kerajinan Kerang",
                    desc: "Laut Maluku yang kaya akan biota laut menghasilkan kerang-kerang indah yang diolah menjadi perhiasan, hiasan dinding, dan cinderamata khas. Setiap karya mencerminkan keindahan bawah laut Maluku.",
                    significance: "Pelestarian tradisi dan pemberdayaan masyarakat pesisir",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={item.title}
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                  >
                    <div className="h-40 bg-gradient-to-br from-gold/20 to-crimson/20 flex items-center justify-center">
                      <Shirt className="w-12 h-12 text-gold/40" />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-heading font-semibold text-navy mb-2">{item.title}</h3>
                      <p className="text-sm text-navy/70 leading-relaxed mb-3">{item.desc}</p>
                      <span className="inline-block bg-gold/10 text-gold text-xs font-semibold px-3 py-1 rounded-full">
                        {item.significance}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Tabs.Content>

            {/* TAB: RUMAH ADAT */}
            <Tabs.Content value="rumah" className="focus:outline-none">
              <h2 className="text-2xl font-heading font-bold text-navy mb-8">Rumah Adat Maluku</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    name: "Baileo",
                    origin: "Seram",
                    desc: "Rumah adat berbentuk panggung persegi panjang dengan atap tinggi menjulang. Baileo berfungsi sebagai balai pertemuan untuk musyawarah adat dan upacara sakral. Tiang-tiangnya melambangkan hubungan vertikal antara manusia, alam, dan Sang Pencipta.",
                  },
                  {
                    name: "Sasadu",
                    origin: "Halmahera",
                    desc: "Rumah adat khas Halmahera yang terbuat dari bambu dan daun rumbia. Bentuknya unik dengan atap melengkung seperti perahu terbalik. Sasadu digunakan sebagai tempat pertemuan dan pusat kegiatan adat masyarakat Tobelo.",
                  },
                  {
                    name: "Rumah Panggung",
                    origin: "Kepulauan Maluku",
                    desc: "Arsitektur khas pesisir dengan struktur panggung untuk menghindari banjir pasang. Bagian kolong digunakan untuk menyimpan perahu dan alat tangkap. Rumah panggung mencerminkan adaptasi masyarakat Maluku terhadap lingkungan maritim.",
                  },
                ].map((rumah, i) => (
                  <motion.div
                    key={rumah.name}
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                  >
                    <div className="h-40 bg-gradient-to-br from-navy/20 to-navy/10 flex items-center justify-center">
                      <Home className="w-12 h-12 text-navy/30" />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-heading font-semibold text-navy">{rumah.name}</h3>
                        <span className="text-xs text-gold font-semibold">{rumah.origin}</span>
                      </div>
                      <p className="text-sm text-navy/70 leading-relaxed">{rumah.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Tabs.Content>

            {/* TAB: CERITA RAKYAT */}
            <Tabs.Content value="cerita" className="focus:outline-none">
              <h2 className="text-2xl font-heading font-bold text-navy mb-4">Cerita Rakyat Maluku</h2>
              <p className="text-navy/70 mb-8 leading-relaxed">
                Warisan lisan yang kaya akan pesan moral dan kearifan lokal, diceritakan turun-temurun
                dari generasi ke generasi.
              </p>
              <div className="space-y-4">
                {stories.map((story) => {
                  const isExpanded = expandedStories.includes(story.id)
                  return (
                    <motion.div
                      key={story.id}
                      className="bg-white rounded-xl shadow-md overflow-hidden"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4 }}
                    >
                      <div className="p-5">
                        <div className="flex items-start gap-3">
                          <BookOpen className="w-5 h-5 text-gold mt-1 shrink-0" />
                          <div className="flex-1">
                            <h3 className="text-lg font-heading font-semibold text-navy mb-2">{story.title}</h3>
                            <p className="text-sm text-navy/70 leading-relaxed">
                              {isExpanded ? story.full : story.excerpt}
                            </p>
                            <button
                              onClick={() => toggleStory(story.id)}
                              className="mt-3 text-crimson text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all"
                            >
                              {isExpanded ? (
                                <>
                                  Tutup <ChevronUp className="w-4 h-4" />
                                </>
                              ) : (
                                <>
                                  Baca Cerita <ChevronDown className="w-4 h-4" />
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </Tabs.Content>
          </Tabs.Root>
        </div>
      </section>

      {/* VIDEO SECTION */}
      <SectionWrapper className="py-20 bg-gray-50">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy mb-4">Cultural Documentary</h2>
            <div className="w-20 h-1 bg-gold mx-auto" />
          </div>
          <div className="max-w-3xl mx-auto aspect-video bg-gray-200 rounded-xl flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-navy/40 to-navy/60 flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-gold/90 flex items-center justify-center mb-4">
                <Play className="w-7 h-7 text-navy" />
              </div>
              <p className="text-white text-xl font-heading font-semibold">Coming Soon</p>
              <p className="text-white/60 text-sm mt-1">Video dokumenter budaya Maluku</p>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </>
  )
}
