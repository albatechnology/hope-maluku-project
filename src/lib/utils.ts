import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date)
}

export const siteConfig = {
  name: "Energizing Maluku",
  tagline: "Membangun Harapan dari Timur Indonesia",
  description:
    "Platform kolaboratif untuk memperkenalkan potensi alam, manusia, budaya, dan masa depan Maluku kepada Indonesia dan dunia.",
  url: "https://energizingmaluku.com",
  ogImage: "/images/og.jpg",
  links: {
    instagram: "https://instagram.com/energizingmaluku",
    youtube: "https://youtube.com/@energizingmaluku",
    facebook: "https://facebook.com/energizingmaluku",
    twitter: "https://twitter.com/energymaluku",
    tiktok: "https://tiktok.com/@energizingmaluku",
  },
}
