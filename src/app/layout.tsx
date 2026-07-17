import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import FloatingElements from "@/components/FloatingElements"
import FormToast from "@/components/FormToast"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "Energizing Maluku | Discover the Hope, Energy & Future of Maluku",
    template: "%s | Energizing Maluku",
  },
  description:
    "Platform kolaboratif untuk memperkenalkan potensi alam, manusia, budaya, dan masa depan Maluku kepada Indonesia dan dunia.",
  openGraph: {
    title: "Energizing Maluku",
    description:
      "Platform kolaboratif untuk memperkenalkan potensi alam, manusia, budaya, dan masa depan Maluku kepada Indonesia dan dunia.",
    url: "https://energizingmaluku.com",
    siteName: "Energizing Maluku",
    locale: "id_ID",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" className={`${inter.variable} ${poppins.variable}`}>
      <body className="min-h-screen flex flex-col font-body antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingElements />
        <FormToast />
      </body>
    </html>
  )
}
