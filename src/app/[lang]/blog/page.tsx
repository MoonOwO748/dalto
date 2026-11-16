import { PageSchema } from '@/components/common/PageSchema'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { hasLocale, getDictionary } from '../dictionaries'
import { getHrefLangAlternates, getLocalizedUrl, getLocalizedPath, BASE_URL } from '@/lib/routes'
import { getBlogPosts } from '@/lib/blog'

const blogMeta: Record<string, { title: string; description: string }> = {
  ko: {
    title: '공식 블로그 & 가라오케 소식 | 이용 팁 및 주대 정보',
    description: '강남 달토 블로그와 소식. 가라오케 주대와 이용 방법, 얼리버드 할인, 단체 회식 및 예약에 필요한 정보를 확인하세요.',
  },
  en: {
    title: 'Official Blog & News | Gangnam Karaoke Tips & Guides',
    description: 'AK Dalto Gangnam official guides: pricing tips, business VIP hosting advice, group party booking guides, and latest updates.',
  },
  zh: {
    title: '官方博客与资讯 | 江南KTV攻略与酒水费信息',
    description: '首尔江南AK Dalto官方攻略：消费指南、商务VIP接待技巧、团体聚会推荐及最新优惠。',
  },
  ja: {
    title: '公式ブログ・お知らせ | 江南カラオケ利用ガイド',
    description: '江南AK Dalto公式ガイド：料金節約のコツ、VIP接待マナー、団体予約のご案内、最新情報。',
  },
}

// 목록 상단 제목과 소개문도 언어별로 둔다. 글 본문은 한국어 원문만 있으므로 그 사실을 함께 알린다.
const blogCopy: Record<string, { h1: string; intro: string }> = {
  ko: {
    h1: '강남 달토 소식 & 블로그',
    intro: '강남 가라오케 이용 정보부터 주대 할인 혜택, 비즈니스 접대 노하우까지 달토의 공식 소식을 확인해 보세요.',
  },
  en: {
    h1: 'AK Dalto Gangnam Blog & News',
    intro: 'Guides to Gangnam karaoke, table charge discounts and business hosting tips from AK Dalto. Articles are currently published in Korean only.',
  },
  zh: {
    h1: 'AK Dalto 江南KTV 博客与资讯',
    intro: 'AK Dalto官方发布的江南KTV消费攻略、酒水费优惠和商务接待技巧。文章目前仅提供韩文版本。',
  },
  ja: {
    h1: 'AK Dalto 江南カラオケ ブログ・お知らせ',
    intro: 'AK Dalto公式の江南カラオケ利用ガイド、飲み代割引、接待のコツをお届けします。記事は現在韓国語のみで掲載しています。',
  },
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  const m = blogMeta[lang] ?? blogMeta.ko

  return {
    title: m.title,
    description: m.description,
    alternates: getHrefLangAlternates('/blog', lang, BASE_URL),
    twitter: {
      card: 'summary_large_image',
      title: `${m.title} | 강남 달토`,
      description: m.description,
      images: [`${BASE_URL}/og/default.jpg`],
    },
    openGraph: {
      title: `${m.title} | 강남 달토`,
      description: m.description,
      url: getLocalizedUrl('/blog', lang, BASE_URL),
      images: [{ url: `${BASE_URL}/og/default.jpg`, width: 1024, height: 478, alt: 'AK Dalto Blog' }],
    },
  }
}

interface Props {
  params: Promise<{ lang: string }>
}

export default async function BlogPage({ params }: Props) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()

  const dict = await getDictionary(lang)
  const posts = await getBlogPosts()
  const c = blogCopy[lang] ?? blogCopy.ko

  return (
    <main className="mx-auto w-full max-w-[1440px] px-4 py-10 sm:px-8 md:px-12 lg:px-16 md:py-16">
      <PageSchema page="blog" lang={lang} dict={dict} posts={posts} />
      {/* Page Header Hero */}
      <section className="glass-card relative overflow-hidden rounded-3xl p-8 md:p-14">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-20 h-[300px] w-[300px] rounded-full opacity-20 blur-[80px]"
          style={{ background: 'var(--accent)' }}
        />

        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-3">
            <span className="accent-line" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: 'var(--accent)' }}>
              BLOG & NEWS
            </span>
          </div>

          <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl md:text-5xl lg:text-6xl" style={{ color: 'var(--bone)' }}>
            {c.h1}
          </h1>

          <p className="mt-4 text-sm leading-relaxed md:text-base" style={{ color: 'var(--bone-dim)' }}>
            {c.intro}
          </p>
        </div>
      </section>

      {/* Blog Cards Grid */}
      <section className="mt-12 md:mt-16">
        <div className="grid gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={getLocalizedPath(`/blog/${post.slug}`, lang)}
              className="glass-card group flex flex-col justify-between overflow-hidden rounded-2xl p-6 transition-all hover:scale-[1.01] hover:border-accent/30 md:p-8"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span
                    className="rounded-lg px-3 py-1 text-[11px] font-bold uppercase tracking-wider"
                    style={{
                      background: 'rgba(212,149,106,0.12)',
                      color: 'var(--accent-bright)',
                      border: '1px solid rgba(212,149,106,0.2)',
                    }}
                  >
                    {post.category || '가이드'}
                  </span>
                  <span className="text-xs text-bone-mute">{post.date}</span>
                </div>

                <h2 className="mt-4 text-xl font-bold tracking-tight text-bone group-hover:text-accent transition-colors">
                  {post.title}
                </h2>

                <p className="mt-3 text-sm leading-relaxed text-bone-dim line-clamp-3">
                  {post.excerpt}
                </p>
              </div>

              <div className="mt-6 border-t pt-4 border-white/5 flex items-center justify-between">
                <span className="text-xs font-semibold text-accent flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  자세히 읽기 →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>


      {/* CTA Box */}
      <section
        className="glass-card mt-16 overflow-hidden rounded-3xl p-8 text-center md:mt-20 md:p-12"
        style={{ borderColor: 'rgba(212,149,106,0.3)', background: 'linear-gradient(135deg, rgba(212,149,106,0.08), rgba(155,122,173,0.08))' }}
      >
        <h2 className="text-2xl font-extrabold md:text-4xl" style={{ color: 'var(--bone)' }}>
          {dict.cta.title}
        </h2>
        <p className="mt-3 text-sm" style={{ color: 'var(--bone-dim)' }}>
          {dict.cta.subtitle}
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
            010-5704-3097
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
