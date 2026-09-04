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

export function isEventPassed(
  eventOrDate: { start_date?: string | null; end_date?: string | null } | string | null | undefined
): boolean {
  if (!eventOrDate) return false

  let dateStr: string | null | undefined = null
  let isStartDate = false

  if (typeof eventOrDate === "string") {
    dateStr = eventOrDate
  } else {
    if (eventOrDate.end_date) {
      dateStr = eventOrDate.end_date
    } else if (eventOrDate.start_date) {
      dateStr = eventOrDate.start_date
      isStartDate = true
    }
  }

  if (!dateStr) return false

  try {
    const formattedStr =
      dateStr.includes(" ") && !dateStr.includes("T")
        ? dateStr.replace(" ", "T")
        : dateStr

    const date = new Date(formattedStr)
    if (isNaN(date.getTime())) return false

    // If time is 00:00:00 or date string has no time (e.g. "YYYY-MM-DD"),
    // or if we fell back to start_date, consider the event active through the end of that day.
    const isMidnight = date.getHours() === 0 && date.getMinutes() === 0 && date.getSeconds() === 0
    const isDateOnly = dateStr.length === 10 && !dateStr.includes("T") && !dateStr.includes(" ")

    if (isMidnight || isDateOnly || isStartDate) {
      const endOfDay = new Date(date)
      endOfDay.setHours(23, 59, 59, 999)
      return endOfDay.getTime() < Date.now()
    }

    return date.getTime() < Date.now()
  } catch {
    return false
  }
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
