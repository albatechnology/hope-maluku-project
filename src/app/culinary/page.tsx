"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Star, MapPin, Check, X, Clock } from "lucide-react"
import SectionWrapper from "@/components/SectionWrapper"
import { cn } from "@/lib/utils"

type Dish = {
  name: string
  description: string
  ingredients: string[]
  steps: string[]
}

const dishes: Dish[] = [
  {
    name: "Papeda",
    description: "Bubur sagu khas Maluku, disajikan dengan ikan kuning",
    ingredients: [
      "200g tepung sagu",
      "500ml air",
      "Garam secukupnya",
      "Ikan kuning / ikan tongkol",
      "Kunyit, serai, daun salam",
      "Santan kental",
    ],
    steps: [
      "Campur tepung sagu dengan air, aduk rata hingga larut.",
      "Masak di atas api sedang sambil terus diaduk hingga mengental dan berubah warna menjadi bening.",
      "Bentuk adonan papeda menggunakan dua sendok hingga membentuk gumpalan.",
      "Untuk ikan kuning: tumis bumbu halus (kunyit, bawang, cabai) hingga harum.",
      "Tambahkan santan, serai, dan daun salam. Masak hingga kuah mengental.",
      "Sajikan papeda dengan ikan kuning dan sambal pendamping.",
    ],
  },
  {
    name: "Ikan Kuah Kuning",
    description: "Ikan segar dalam kuah kuning berbumbu rempah",
    ingredients: [
      "500g ikan segar (kakap/kerapu)",
      "2 sdm kunyit bubuk",
      "3 siung bawang putih",
      "5 butir bawang merah",
      "2 batang serai",
      "Daun jeruk, garam, gula",
    ],
    steps: [
      "Bersihkan ikan dan lumuri dengan air jeruk nipis.",
      "Haluskan bawang merah, bawang putih, dan kunyit.",
      "Tumis bumbu halus bersama serai dan daun jeruk hingga wangi.",
      "Tambahkan air secukupnya, didihkan.",
      "Masukkan ikan, masak dengan api kecil hingga matang.",
      "Koreksi rasa, tambahkan garam dan gula. Sajikan hangat.",
    ],
  },
  {
    name: "Sagu",
    description: "Makanan pokok tradisional dari sagu",
    ingredients: [
      "500g tepung sagu",
      "Air panas secukupnya",
      "Garam",
      "Kelapa parut (opsional)",
    ],
    steps: [
      "Siapkan tepung sagu dalam wadah besar.",
      "Tuang air panas sedikit demi sedikit sambil diaduk.",
      "Aduk hingga adonan kalis dan bisa dipulung.",
      "Bentuk bulat atau pipih sesuai selera.",
      "Kukus selama 15-20 menit hingga matang.",
      "Sajikan dengan kelapa parut dan gula merah.",
    ],
  },
  {
    name: "Sambal Colo-Colo",
    description: "Sambal segar khas Maluku dengan tomat dan cabai",
    ingredients: [
      "5 buah cabai rawit",
      "3 buah tomat merah",
      "2 siung bawang merah",
      "1 sdt air jeruk nipis",
      "Garam dan gula secukupnya",
    ],
    steps: [
      "Iris tipis cabai rawit dan bawang merah.",
      "Potong dadu kecil tomat merah.",
      "Campurkan semua bahan dalam mangkuk.",
      "Tambahkan air jeruk nipis, garam, dan gula.",
      "Aduk rata dan diamkan 5 menit agar bumbu meresap.",
      "Sajikan sebagai pelengkap ikan bakar atau goreng.",
    ],
  },
  {
    name: "Kohu-Kohu",
    description: "Urap khas Maluku dengan kelapa dan sayuran",
    ingredients: [
      "200g kelapa parut setengah tua",
      "100g kacang panjang",
      "100g taoge",
      "Daun kemangi secukupnya",
      "Cabai, bawang putih, garam",
    ],
    steps: [
      "Kukus kacang panjang dan taoge hingga layu.",
      "Sangrai kelapa parut sebentar tanpa minyak.",
      "Haluskan cabai, bawang putih, dan garam.",
      "Campurkan sayuran kukus dengan kelapa dan bumbu halus.",
      "Tambahkan daun kemangi, aduk rata.",
      "Sajikan suhu ruang sebagai pendamping nasi hangat.",
    ],
  },
  {
    name: "Kasbi",
    description: "Singkong rebus dengan berbagai variasi olahan",
    ingredients: [
      "500g singkong segar",
      "Air secukupnya",
      "Garam",
      "Kelapa parut (opsional)",
      "Gula merah cair (opsional)",
    ],
    steps: [
      "Kupas singkong dan potong-potong sesuai selera.",
      "Cuci bersih hingga air bilasan tidak keruh.",
      "Rebus dalam air mendidih bersama garam.",
      "Masak hingga empuk dan merekah (sekitar 20-25 menit).",
      "Tiriskan, sajikan hangat dengan parutan kelapa.",
      "Bisa juga digoreng atau diolah menjadi kue kasbi.",
    ],
  },
]

type Restaurant = {
  name: string
  area: string
  specialty: string
  hours: string
  rating: number
}

const restaurants: Restaurant[] = [
  { name: "Rumah Makan Natsepa", area: "Ambon", specialty: "Papeda & Ikan Bakar", hours: "08:00 - 21:00", rating: 5 },
  { name: "Kedai Sagu", area: "Ambon", specialty: "Olahan Sagu", hours: "09:00 - 20:00", rating: 4 },
  { name: "Resto Amboina", area: "Kota Ambon", specialty: "Seafood", hours: "10:00 - 22:00", rating: 5 },
  { name: "Cafe Lawang", area: "Ambon", specialty: "Fusion Maluku", hours: "11:00 - 23:00", rating: 4 },
]

export default function CulinaryPage() {
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null)

  return (
    <>
      {/* HERO */}
      <section className="relative bg-gradient-to-br from-orange-900 to-navy py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-10 right-1/4 w-72 h-72 bg-amber-300/30 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-1/4 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />
        </div>
        <div className="container relative z-10 text-center">
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-tight mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Culinary of Maluku
          </motion.h1>
          <motion.p
            className="max-w-2xl mx-auto text-lg text-white/70"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Nikmati kekayaan rasa dari Timur Indonesia. Warisan kuliner Maluku
            adalah perpaduan rempah-rempah dan tradisi yang telah berabad-abad.
          </motion.p>
        </div>
      </section>

      {/* FEATURED DISHES */}
      <SectionWrapper className="py-16 lg:py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy mb-4">Featured Dishes</h2>
            <div className="w-20 h-1 bg-gold mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dishes.map((dish, i) => (
              <motion.div
                key={dish.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all"
              >
                <div className="h-48 bg-gradient-to-br from-amber-200 to-orange-400" />
                <div className="p-5">
                  <h3 className="text-xl font-heading font-bold text-navy mb-2">{dish.name}</h3>
                  <p className="text-sm text-navy/70 mb-4">{dish.description}</p>
                  <button
                    onClick={() => setSelectedDish(dish)}
                    className="text-crimson text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all"
                  >
                    See Recipe <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* RECIPE MODAL */}
      <AnimatePresence>
        {selectedDish && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedDish(null)}
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
                onClick={() => setSelectedDish(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition z-10"
              >
                <X className="w-4 h-4 text-navy" />
              </button>

              <div className="h-40 rounded-xl bg-gradient-to-br from-amber-200 to-orange-400 mb-6" />

              <h2 className="text-2xl font-heading font-bold text-navy mb-4">{selectedDish.name}</h2>

              <h3 className="font-heading font-semibold text-navy mb-3 flex items-center gap-2">
                <Check className="w-4 h-4 text-gold" /> Ingredients
              </h3>
              <ul className="space-y-2 mb-6">
                {selectedDish.ingredients.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-navy/70">
                    <Check className="w-4 h-4 text-crimson mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <h3 className="font-heading font-semibold text-navy mb-3">Cooking Steps</h3>
              <ol className="space-y-2 mb-4">
                {selectedDish.steps.map((step, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-navy/70">
                    <span className="w-6 h-6 rounded-full bg-crimson/10 text-crimson flex items-center justify-center text-xs font-semibold shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* RECOMMENDED RESTAURANTS */}
      <SectionWrapper className="py-16 lg:py-20 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy mb-4">Recommended Restaurants</h2>
            <div className="w-20 h-1 bg-gold mx-auto" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {restaurants.map((r, i) => (
              <motion.div
                key={r.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all"
              >
                <div className="p-5">
                  <div className="flex items-center gap-1 mb-2">
                    {Array.from({ length: r.rating }).map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-gold text-gold" />
                    ))}
                  </div>
                  <h3 className="text-lg font-heading font-semibold text-navy mb-1">{r.name}</h3>
                  <div className="flex items-center gap-1 text-xs text-crimson font-medium mb-2">
                    <MapPin className="w-3 h-3" />
                    {r.area}
                  </div>
                  <p className="text-sm text-navy/70 mb-2">{r.specialty}</p>
                  <div className="flex items-center gap-1 text-xs text-navy/50">
                    <Clock className="w-3 h-3" />
                    {r.hours}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* FOOD HISTORY */}
      <SectionWrapper className="py-16 lg:py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy mb-4">The History of Maluku Cuisine</h2>
              <div className="w-20 h-1 bg-gold mx-auto" />
            </div>
            <div className="prose prose-lg max-w-none text-navy/80 leading-relaxed">
              <p className="text-lg first-letter:text-6xl first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-gold first-letter:font-heading first-letter:font-bold">
                <span className="text-6xl float-left mr-3 mt-1 text-gold font-heading font-bold leading-none">J</span>auh
                sebelum menjadi destinasi kuliner yang dikenal hari ini, Maluku telah dikenal
                sebagai Kepulauan Rempah yang menjadi pusat perdagangan pala (Myristica fragrans)
                dan cengkeh (Syzygium aromaticum) sejak abad ke-16. Rempah-rempah inilah yang
                menjadi fondasi utama dari kekayaan rasa kuliner Maluku.
              </p>
              <p className="mt-4">
                Bangsa Eropa — Portugis, Spanyol, Belanda, dan Inggris — datang silih berganti
                memperebutkan kendali atas perdagangan rempah. Pengaruh kolonial Belanda yang
                paling lama meninggalkan jejak dalam teknik pengolahan, seperti penggunaan
                santan, kunyit, dan metode memasak lambat dalam kuah kuning yang kaya bumbu.
              </p>
              <p className="mt-4">
                Tradisi memasak masyarakat Maluku sangat bergantung pada sumber daya laut yang
                melimpah. Ikan cakalang, tuna, kerapu, dan berbagai jenis kerang menjadi bahan
                utama. Sagu sebagai makanan pokok dihasilkan dari pohon sagu yang tumbuh subur
                di rawa-rawa dan lahan basah. Teknik pengolahan sagu menjadi papeda telah
                diwariskan secara turun-temurun selama ratusan tahun.
              </p>
              <p className="mt-4">
                Pengaruh budaya Tionghoa dan Arab juga memperkaya kuliner Maluku. Perpaduan
                rempah asli Maluku dengan teknik memasak asing melahirkan hidangan unik yang
                tidak ditemukan di daerah lain. Makanan seperti kohu-kohu dan kasbi
                mencerminkan kreativitas masyarakat dalam mengolah bahan lokal menjadi hidangan
                yang lezat dan bergizi.
              </p>
              <p className="mt-4">
                Hingga hari ini, warisan kuliner Maluku terus hidup dan berkembang. Generasi
                muda mulai mengangkat kembali hidangan tradisional dengan presentasi modern,
                membuka jalan bagi kuliner Maluku untuk dikenal di panggung nasional dan
                internasional.
              </p>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </>
  )
}
