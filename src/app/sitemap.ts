import type { MetadataRoute } from 'next'
import { locales } from '@/app/[lang]/dictionaries'
import { getBlogPosts } from '@/lib/wordpress'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ak-dalto.com'

const staticPages = ['', '/pricing', '/events', '/howto', '/access', '/faq', '/blog', '/reserve']

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getBlogPosts()
  const now = new Date()

  // 1. Root page entry
  const rootEntry: MetadataRoute.Sitemap[number] = {
    url: `${BASE_URL}/`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 1.0,
    alternates: {
      languages: {
        ko: `${BASE_URL}/ko`,
        en: `${BASE_URL}/en`,
        'zh-CN': `${BASE_URL}/zh`,
        ja: `${BASE_URL}/ja`,
        'x-default': `${BASE_URL}/ko`,
      },
    },
  }

  // 2. Static pages in all locales with full hreflang alternates
  const staticEntries: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    staticPages.map((page) => ({
      url: `${BASE_URL}/${locale}${page}`,
      lastModified: now,
      changeFrequency: (page === '' ? 'weekly' : 'monthly') as 'weekly' | 'monthly',
      priority: page === '' ? 1.0 : 0.8,
      alternates: {
        languages: {
          ko: `${BASE_URL}/ko${page}`,
          en: `${BASE_URL}/en${page}`,
          'zh-CN': `${BASE_URL}/zh${page}`,
          ja: `${BASE_URL}/ja${page}`,
          'x-default': `${BASE_URL}/ko${page}`,
        },
      },
    }))
  )

  // 3. Blog post detail pages in all locales
  const blogEntries: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    posts.map((post) => ({
      url: `${BASE_URL}/${locale}/blog/${post.slug}`,
      lastModified: new Date(post.date || now),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
      alternates: {
        languages: {
          ko: `${BASE_URL}/ko/blog/${post.slug}`,
          en: `${BASE_URL}/en/blog/${post.slug}`,
          'zh-CN': `${BASE_URL}/zh/blog/${post.slug}`,
          ja: `${BASE_URL}/ja/blog/${post.slug}`,
          'x-default': `${BASE_URL}/ko/blog/${post.slug}`,
        },
      },
    }))
  )

  return [rootEntry, ...staticEntries, ...blogEntries]
}
