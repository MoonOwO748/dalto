import type { MetadataRoute } from 'next'
import { locales } from '@/app/[lang]/dictionaries'
import { getLocalizedUrl, BASE_URL } from '@/lib/routes'
import { getBlogPosts } from '@/lib/blog'

const staticPages = ['', '/pricing', '/events', '/howto', '/access', '/faq', '/blog', '/reserve']

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getBlogPosts()
  const now = new Date()

  // 1. Static pages across all locales with valid localized canonical and alternate URLs
  const staticEntries: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    staticPages.map((page) => ({
      url: getLocalizedUrl(page, locale, BASE_URL),
      lastModified: now,
      changeFrequency: (page === '' ? 'weekly' : 'monthly') as 'weekly' | 'monthly',
      priority: page === '' ? 1.0 : 0.8,
      alternates: {
        languages: {
          ko: getLocalizedUrl(page, 'ko', BASE_URL),
          en: getLocalizedUrl(page, 'en', BASE_URL),
          'zh-CN': getLocalizedUrl(page, 'zh', BASE_URL),
          ja: getLocalizedUrl(page, 'ja', BASE_URL),
          'x-default': getLocalizedUrl(page, 'ko', BASE_URL),
        },
      },
    }))
  )

  // 2. 블로그 글은 한국어 원문만 있으므로 표준 URL인 한국어 경로만 등록한다.
  //    번역본이 생기기 전까지 다른 언어 경로와 hreflang은 넣지 않는다.
  const blogEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: getLocalizedUrl(`/blog/${post.slug}`, 'ko', BASE_URL),
    lastModified: new Date(post.date || now),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticEntries, ...blogEntries]
}
