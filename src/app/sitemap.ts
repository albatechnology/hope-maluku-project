import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://energizingmaluku.com"

  const routes = [
    "",
    "/about",
    "/ambon",
    "/nature",
    "/culture",
    "/culinary",
    "/people",
    "/economy",
    "/youth",
    "/events",
    "/media",
    "/collaboration",
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }))
}
