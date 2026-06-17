"use client"

import { motion } from "framer-motion"
import * as Tabs from "@radix-ui/react-tabs"
import {
  Map,
  Music,
  Users,
  Globe,
  Heart,
  Bookmark,
  BookOpen,
  Shield,
  Handshake,
  Landmark,
  Network,
  Quote,
} from "lucide-react"
import SectionWrapper from "@/components/SectionWrapper"
import { cn } from "@/lib/utils"

const timelineEvents = [
  { year: "1512", title: "Portuguese Arrival", desc: "Bangsa Portugis tiba di Maluku dan memulai perdagangan rempah-rempah, meninggalkan jejak arsitektur dan budaya yang masih terlihat hingga kini." },
  { year: "1605", title: "Dutch Colonization", desc: "VOC Belanda mengambil alih kekuasaan dan menguasai perdagangan pala dan cengkeh, menjadikan Maluku sebagai pusat rempah dunia." },
  { year: "1945", title: "Independence Era", desc: "Maluku turut serta dalam proklamasi kemerdekaan Indonesia dan menjadi bagian dari perjuangan mempertahankan kedaulatan." },
  { year: "1999", title: "Maluku Conflict", desc: "Konflik sosial melanda Maluku, menguji persatuan masyarakat lintas agama dan etnis yang kemudian menjadi momentum rekonsiliasi." },
  { year: "2002", title: "Malino Peace", desc: "Perjanjian damai Malino menjadi tonggak penting pemulihan kerukunan dan dimulainya kembali pembangunan di Maluku." },
  { year: "2026", title: "Energizing Maluku", desc: "Gerakan kolaboratif membangkitkan potensi Maluku melalui inovasi, investasi, dan pemberdayaan generasi muda." },
]

const traditions = [
  { icon: Shield, title: "Pukul Sapu", desc: "Seni bela diri tradisional khas Mamala dan Morela yang menggunakan sapu lidi sebagai senjata, sarat dengan nilai spiritual." },
  { icon: Handshake, title: "Pela Gandong", desc: "Ikatan persaudaraan antar desa yang melampaui perbedaan agama dan etnis, diwariskan secara turun-temurun." },
  { icon: Landmark, title: "Siwalima", desc: "Sistem kekerabatan dan kearifan lokal yang mengatur tatanan sosial masyarakat Maluku secara adil dan harmonis." },
  { icon: Network, title: "Baileo", desc: "Rumah adat pertemuan yang menjadi pusat musyawarah dan pengambilan keputusan bersama dalam komunitas negeri." },
  { icon: Users, title: "Soa", desc: "Sistem klan atau marga yang menjadi dasar struktur sosial dan identitas masyarakat adat di Maluku." },
  { icon: Bookmark, title: "Adat Sasi", desc: "Hukum adat yang mengatur larangan pengambilan sumber daya alam pada waktu tertentu demi menjaga kelestarian." },
]

const demographics = [
  { label: "Maluku Province", value: "1.8M", pct: 100 },
  { label: "Ambon City", value: "350K", pct: 55 },
  { label: "Urban", value: "40%", pct: 40 },
  { label: "Rural", value: "60%", pct: 60 },
]

export default function AboutPage() {
  return (
    <>
      <section className="relative bg-gradient-to-b from-navy to-navy-light py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-5 right-20 w-64 h-64 bg-gold/30 rounded-full blur-3xl" />
          <div className="absolute bottom-5 left-20 w-80 h-80 bg-crimson/20 rounded-full blur-3xl" />
        </div>
        <div className="container relative z-10 text-center">
          <motion.h1
            className="text-5xl font-heading font-bold text-white mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            About Maluku
          </motion.h1>
          <motion.p
            className="text-white/60 text-sm tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Home / About Maluku
          </motion.p>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="container">
          <div className="lg:flex lg:gap-10">
            <div className="flex-1 min-w-0">
              <Tabs.Root defaultValue="history" className="w-full">
                <Tabs.List className="flex flex-wrap gap-2 border-b border-gray-200 pb-3 mb-8">
                  {["History", "Geography", "Demographics", "Traditions", "Religion & Harmony"].map((tab) => (
                    <Tabs.Trigger
                      key={tab}
                      value={tab.toLowerCase().replace(/ & /g, "-").replace(/\s+/g, "-")}
                      className={cn(
                        "px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                        "data-[state=active]:bg-gold data-[state=active]:text-navy",
                        "data-[state=inactive]:text-navy/60 data-[state=inactive]:hover:text-navy data-[state=inactive]:hover:bg-navy/5"
                      )}
                    >
                      {tab}
                    </Tabs.Trigger>
                  ))}
                </Tabs.List>

                {/* HISTORY */}
                <Tabs.Content value="history" className="focus:outline-none">
                  <h2 className="text-2xl font-heading font-bold text-navy mb-8">Sejarah Maluku</h2>
                  <div className="relative pl-8 border-l-4 border-gold space-y-10">
                    {timelineEvents.map((event, i) => (
                      <motion.div
                        key={event.year}
                        className="relative"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                      >
                        <div className="absolute -left-[2.6rem] top-1 w-5 h-5 rounded-full bg-gold border-4 border-white" />
                        <span className="text-gold font-bold text-sm tracking-widest">{event.year}</span>
                        <h3 className="text-lg font-heading font-semibold text-navy mt-1">{event.title}</h3>
                        <p className="text-navy/70 mt-1 leading-relaxed">{event.desc}</p>
                      </motion.div>
                    ))}
                  </div>
                </Tabs.Content>

                {/* GEOGRAPHY */}
                <Tabs.Content value="geography" className="focus:outline-none">
                  <h2 className="text-2xl font-heading font-bold text-navy mb-6">Geografi Maluku</h2>
                  <p className="text-navy/70 mb-6 leading-relaxed">
                    Maluku merupakan provinsi kepulauan terbesar di Indonesia dengan lebih dari 1.000 pulau yang membentang
                    di antara Sulawesi dan Papua. Wilayahnya 90% merupakan lautan dengan keanekaragaman hayati laut yang luar biasa.
                  </p>
                  <div className="h-[400px] bg-gray-100 rounded-xl flex flex-col items-center justify-center border border-gray-200">
                    <Globe className="w-16 h-16 text-navy/30 mb-4" />
                    <p className="text-navy/60 text-lg font-heading font-semibold">Interactive Map of Maluku Archipelago</p>
                    <p className="text-navy/40 text-sm mt-2 max-w-md text-center px-4">
                      Map showing key islands: Ambon, Banda, Seram, Ternate, Tidore, Aru, Kai
                    </p>
                  </div>
                </Tabs.Content>

                {/* DEMOGRAPHICS */}
                <Tabs.Content value="demographics" className="focus:outline-none">
                  <h2 className="text-2xl font-heading font-bold text-navy mb-6">Demografi Maluku</h2>
                  <p className="text-navy/70 mb-8 leading-relaxed">
                    Maluku memiliki populasi yang tersebar di ribuan pulau dengan komposisi usia muda yang dominan.
                    Sebagian besar penduduk bermukim di wilayah pesisir dan menggantungkan hidup pada sektor kelautan.
                  </p>
                  <div className="space-y-5">
                    {demographics.map((item) => (
                      <div key={item.label}>
                        <div className="flex justify-between text-sm font-medium text-navy mb-1.5">
                          <span>{item.label}</span>
                          <span className="text-gold font-bold">{item.value}</span>
                        </div>
                        <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gold rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${item.pct}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </Tabs.Content>

                {/* TRADITIONS */}
                <Tabs.Content value="traditions" className="focus:outline-none">
                  <h2 className="text-2xl font-heading font-bold text-navy mb-6">Tradisi & Budaya Maluku</h2>
                  <p className="text-navy/70 mb-8 leading-relaxed">
                    Kekayaan tradisi Maluku mencerminkan harmoni antara adat, alam, dan spiritualitas masyarakatnya.
                    Warisan leluhur ini terus dijaga dan dihidupkan kembali oleh generasi muda.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {traditions.map((item, i) => (
                      <motion.div
                        key={item.title}
                        className="bg-white rounded-xl shadow-md p-6 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: i * 0.08 }}
                      >
                        <div className="w-12 h-12 rounded-full bg-navy flex items-center justify-center mb-4">
                          <item.icon className="w-6 h-6 text-gold" />
                        </div>
                        <h3 className="text-lg font-heading font-semibold text-navy mb-2">{item.title}</h3>
                        <p className="text-navy/70 text-sm leading-relaxed">{item.desc}</p>
                      </motion.div>
                    ))}
                  </div>
                </Tabs.Content>

                {/* RELIGION & HARMONY */}
                <Tabs.Content value="religion-harmony" className="focus:outline-none">
                  <h2 className="text-2xl font-heading font-bold text-navy mb-6">Religion & Harmony in Maluku</h2>
                  <div className="prose prose-navy max-w-none">
                    <p className="text-navy/70 leading-relaxed mb-6">
                      Maluku dikenal sebagai miniatur Indonesia dalam hal keragaman agama. Masyarakat Muslim,
                      Kristen Protestan, Kristen Katolik, Hindu, dan Buddha hidup berdampingan dengan damai sejak
                      berabad-abad lalu. Semangat <em>Pela Gandong</em> — ikatan persaudaraan lintas agama dan desa —
                      menjadi perekat sosial yang kuat.
                    </p>
                    <blockquote className="border-l-4 border-gold bg-gold/5 pl-6 py-4 pr-4 rounded-r-xl my-8">
                      <div className="flex items-start gap-3">
                        <Quote className="w-8 h-8 text-gold shrink-0 mt-1" />
                        <div>
                          <p className="text-navy italic font-medium leading-relaxed">
                            &ldquo;Beta dan dia, lain agama, lain kampung, tapi satu darah, satu rasa, satu Pela. Itu
                            yang dijaga turun-temurun.&rdquo;
                          </p>
                          <footer className="text-navy/60 text-sm mt-2">— Pepatah adat masyarakat Maluku</footer>
                        </div>
                      </div>
                    </blockquote>
                    <h3 className="text-xl font-heading font-bold text-navy mt-8 mb-4">Rekonsiliasi dan Kerukunan</h3>
                    <p className="text-navy/70 leading-relaxed mb-6">
                      Pasca konflik 1999-2002, masyarakat Maluku menunjukkan ketangguhan luar biasa dalam membangun
                      kembali kerukunan. Perjanjian Damai Malino 2002 menjadi fondasi rekonsiliasi. Kini, dialog
                      antarumat beragama rutin dilakukan, dan banyak desa yang kembali menjalankan tradisi Pela Gandong
                      sebagai simbol persatuan.
                    </p>
                    <div className="flex flex-wrap gap-3 mt-6">
                      {["Islam", "Kristen Protestan", "Katolik", "Hindu", "Buddha"].map((religion) => (
                        <span key={religion} className="bg-navy text-white text-sm px-4 py-2 rounded-full">
                          {religion}
                        </span>
                      ))}
                    </div>
                  </div>
                </Tabs.Content>
              </Tabs.Root>
            </div>

            {/* SIDEBAR */}
            <aside className="lg:w-80 shrink-0 mt-10 lg:mt-0">
              <div className="lg:sticky lg:top-24">
                <div className="bg-navy rounded-2xl p-6 text-white">
                  <div className="flex items-center gap-2 mb-5">
                    <Globe className="w-5 h-5 text-gold" />
                    <h3 className="font-heading font-bold text-lg">Quick Facts</h3>
                  </div>
                  <div className="space-y-4">
                    {[
                      { label: "Area", value: "712,480 km²" },
                      { label: "Population", value: "1.8M" },
                      { label: "Capital", value: "Ambon" },
                      { label: "Languages", value: "Bahasa Indonesia, Bahasa Melayu Ambon" },
                      { label: "Religions", value: "Islam, Kristen, Hindu, Buddha" },
                    ].map((fact) => (
                      <div key={fact.label}>
                        <div className="text-white/50 text-xs uppercase tracking-widest mb-0.5">{fact.label}</div>
                        <div className="text-white font-medium text-sm">{fact.value}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 pt-5 border-t border-white/10">
                    <div className="flex items-center gap-2 text-gold">
                      <Heart className="w-4 h-4" />
                      <span className="text-sm">Energizing Maluku</span>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}
