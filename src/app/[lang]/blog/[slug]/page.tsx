import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { locales, hasLocale, getDictionary } from '../../dictionaries'
import { getHrefLangAlternates, getLocalizedUrl, getLocalizedPath, BASE_URL } from '@/lib/routes'
import { getBlogPosts, getBlogPostBySlug } from '@/lib/wordpress'

interface Props {
  params: Promise<{ lang: string; slug: string }>
}

export async function generateStaticParams() {
  const posts = await getBlogPosts()
  return locales.flatMap((lang) =>
    posts.map((post) => ({
      lang,
      slug: post.slug,
    }))
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params
  if (!hasLocale(lang)) return {}

  const post = await getBlogPostBySlug(slug)
  if (!post) return {}

  const canonicalUrl = getLocalizedUrl(`/blog/${slug}`, lang, BASE_URL)

  return {
    title: `${post.title} | AK 달토 블로그`,
    description: post.excerpt,
    alternates: getHrefLangAlternates(`/blog/${slug}`, lang, BASE_URL),
    openGraph: {
      title: `${post.title} | 강남 AK달토`,
      description: post.excerpt,
      url: canonicalUrl,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author || 'AK 달토'],
      images: [
        {
          url: post.featuredImage || `${BASE_URL}/og/default.jpg`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.featuredImage || `${BASE_URL}/og/default.jpg`],
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { lang, slug } = await params
  if (!hasLocale(lang)) notFound()

  const dict = await getDictionary(lang)
  const post = await getBlogPostBySlug(slug)
  if (!post) notFound()

  const postUrl = getLocalizedUrl(`/blog/${slug}`, lang, BASE_URL)

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: getLocalizedUrl('/', lang, BASE_URL),
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Blog',
            item: getLocalizedUrl('/blog', lang, BASE_URL),
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: post.title,
            item: postUrl,
          },
        ],
      },
      {
        '@type': 'Article',
        '@id': `${postUrl}#article`,
        headline: post.title,
        description: post.excerpt,
        datePublished: post.date,
        dateModified: post.date,
        author: {
          '@type': 'Organization',
          name: post.author || 'AK 달토',
          url: BASE_URL,
        },
        publisher: {
          '@type': 'Organization',
          name: 'AK 달토',
          logo: {
            '@type': 'ImageObject',
            url: `${BASE_URL}/icon.png`,
          },
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': postUrl,
        },
      },
    ],
  }

  return (
    <main className="mx-auto w-full max-w-[1000px] px-4 py-10 sm:px-8 md:px-12 md:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd).replace(/</g, '\\u003c') }}
      />

      {/* Breadcrumb navigation */}
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-bone-mute">
        <Link href={getLocalizedPath('/', lang)} className="hover:text-accent transition-colors">
          홈
        </Link>
        <span>/</span>
        <Link href={getLocalizedPath('/blog', lang)} className="hover:text-accent transition-colors">
          블로그
        </Link>
        <span>/</span>
        <span className="text-bone-dim truncate max-w-[200px] sm:max-w-none">{post.title}</span>
      </nav>

      {/* Article Header */}
      <header className="glass-card relative overflow-hidden rounded-3xl p-8 md:p-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-16 h-[250px] w-[250px] rounded-full opacity-20 blur-[80px]"
          style={{ background: 'var(--accent)' }}
        />

        <div className="relative z-10">
          <div className="flex flex-wrap items-center gap-3">
            <span
              className="rounded-lg px-3 py-1 text-xs font-bold uppercase tracking-wider"
              style={{
                background: 'rgba(212,149,106,0.12)',
                color: 'var(--accent-bright)',
                border: '1px solid rgba(212,149,106,0.2)',
              }}
            >
              {post.category || '가이드'}
            </span>
            <span className="text-xs text-bone-mute">{post.date}</span>
            {post.author && (
              <>
                <span className="text-xs text-bone-mute">·</span>
                <span className="text-xs text-bone-dim">{post.author}</span>
              </>
            )}
          </div>

          <h1 className="mt-5 text-2xl font-black tracking-tight sm:text-3xl md:text-4xl lg:text-5xl text-bone leading-[1.2]">
            {post.title}
          </h1>

          <p className="mt-4 text-sm leading-relaxed text-bone-dim md:text-base border-l-2 border-accent/40 pl-4 italic">
            {post.excerpt}
          </p>
        </div>
      </header>

      {/* Article Body */}
      <article className="glass-card mt-8 rounded-3xl p-8 md:p-12 leading-relaxed text-bone-dim">
        <div
          className="prose prose-invert max-w-none space-y-6 text-sm md:text-base [&>h3]:text-xl [&>h3]:font-bold [&>h3]:text-bone [&>h3]:mt-8 [&>h3]:mb-3 [&>p]:leading-relaxed [&>p]:text-bone-dim [&>strong]:text-bone"
          dangerouslySetInnerHTML={{ __html: post.content || `<p>${post.excerpt}</p>` }}
        />
      </article>

      {/* Navigation Back */}
      <div className="mt-8 flex justify-between items-center">
        <Link
          href={getLocalizedPath('/blog', lang)}
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-5 py-2.5 text-xs font-medium text-bone hover:border-accent hover:text-accent transition-colors"
        >
          ← 목록으로 돌아가기
        </Link>
      </div>

      {/* Call To Action */}
      <section
        className="glass-card mt-12 overflow-hidden rounded-3xl p-8 text-center md:p-12"
        style={{
          borderColor: 'rgba(212,149,106,0.3)',
          background: 'linear-gradient(135deg, rgba(212,149,106,0.08), rgba(155,122,173,0.08))',
        }}
      >
        <h2 className="text-2xl font-extrabold md:text-3xl text-bone">
          AK 달토 실시간 예약 및 견적 문의
        </h2>
        <p className="mt-3 text-sm text-bone-dim">
          기본 주대 15만원 · 오후 9시 이전 방문 시 5만원 즉시 할인 · 365일 연중무휴
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href="tel:+821057043097"
            className="inline-flex items-center justify-center gap-2 rounded-xl px-8 py-4 text-sm font-semibold transition-all hover:scale-[1.02] hover:brightness-110 sm:min-w-[180px]"
            style={{
              background: 'linear-gradient(135deg, var(--accent), var(--accent-bright))',
              color: 'var(--ink)',
              boxShadow: '0 8px 24px -8px rgba(212,149,106,0.35)',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.13 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.07 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            010-5704-3097 전화 문의
          </a>
          <Link
            href={getLocalizedPath('/reserve', lang)}
            className="inline-flex items-center justify-center rounded-xl border px-8 py-4 text-sm font-medium transition-all hover:scale-[1.02] hover:border-white/20 hover:bg-white/5 sm:min-w-[180px]"
            style={{ borderColor: 'var(--border)', color: 'var(--bone)' }}
          >
            {dict.cta.online} ➔
          </Link>
        </div>
      </section>
    </main>
  )
}
