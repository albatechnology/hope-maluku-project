import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
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

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
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
    <html lang="id" className={`${inter.variable} ${playfair.variable}`}>
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
