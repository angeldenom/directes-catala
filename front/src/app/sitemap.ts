import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://twitch.cat"
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/missi%C3%B3`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/codi-obert`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/contacte`,
      lastModified: new Date(),
    }
  ]
}