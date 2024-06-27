import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://twitch.cat"
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    }
  ]
}