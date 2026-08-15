import type { MetadataRoute } from 'next'
import { locales } from '@/app/[lang]/dictionaries'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ak-dalto.com'

const staticPages = ['', '/pricing', '/events', '/howto', '/access', '/faq', '/blog', '/reserve']

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) =>
    staticPages.map((page) => ({
      url: `${BASE_URL}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: (page === '' ? 'weekly' : 'monthly') as 'weekly' | 'monthly',
      priority: page === '' ? 1.0 : 0.8,
    }))
  )
}
