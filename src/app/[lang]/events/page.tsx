import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { hasLocale, getDictionary } from '../dictionaries'
import { getHrefLangAlternates, getLocalizedUrl, getLocalizedPath, BASE_URL } from '@/lib/routes'

const eventsMeta: Record<string, { title: string; description: string }> = {
  ko: {
    title: '이벤트 & 프로모션 혜택 | 얼리버드 5만 할인',
    description: '강남 달토 이벤트 안내. 오후 9시 이전 기본 주대 5만원 할인, 단체 회식 맞춤 패키지와 비즈니스 VIP 접대 프로그램을 확인하세요.',
  },
  en: {
    title: 'Events & Special Promotions | Early Bird Deals',
    description: 'AK Dalto Gangnam special offers: ₩50,000 Early Bird discount before 9PM, group party packages, and VIP business hosting programs.',
  },
  zh: {
    title: '活动与特别优惠 | 21点前到访立减5万',
    description: '首尔江南AK Dalto特别优惠：21点前入场立减5万韩元，团体聚餐定制套餐，商务VIP接待专属服务。',
  },
  ja: {
    title: 'イベント・特典案内 | 21時前5万ウォン割引',
    description: '江南AK Dalto特別割引：21時前のご来店で5万ウォン即時割引、団体様向けパッケージ、VIP接待プログラム。',
  },
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  const m = eventsMeta[lang] ?? eventsMeta.ko

  return {
    title: m.title,
    description: m.description,
    alternates: getHrefLangAlternates('/events', lang, BASE_URL),
    twitter: {
      card: 'summary_large_image',
      title: `${m.title} | 강남 달토`,
      description: m.description,
      images: [`${BASE_URL}/og/default.jpg`],
    },
    openGraph: {
      title: `${m.title} | 강남 달토`,
      description: m.description,
      url: getLocalizedUrl('/events', lang, BASE_URL),
      images: [{ url: `${BASE_URL}/og/default.jpg`, width: 1200, height: 630, alt: 'AK Dalto Events' }],
    },
  }
}

interface Props {
  params: Promise<{ lang: string }>
}

export default async function EventsPage({ params }: Props) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()

  const dict = await getDictionary(lang)
  const ev = dict.events

  return (
    <main className="mx-auto w-full max-w-[1440px] px-4 py-10 sm:px-8 md:px-12 lg:px-16 md:py-16">
      {/* Page Header Hero */}
      <section className="glass-card relative overflow-hidden rounded-3xl p-8 md:p-14">
        {/* Glow effect */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-20 h-[300px] w-[300px] rounded-full opacity-20 blur-[80px]"
          style={{ background: 'var(--mauve)' }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-10 -left-10 h-[200px] w-[200px] rounded-full opacity-15 blur-[60px]"
          style={{ background: 'var(--accent)' }}
        />

        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-3">
            <span className="accent-line" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: 'var(--accent)' }}>
              {ev.label}
            </span>
          </div>

          <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl md:text-5xl lg:text-6xl" style={{ color: 'var(--bone)' }}>
            {ev.title}
          </h1>

          <p className="mt-4 text-sm leading-relaxed md:text-base" style={{ color: 'var(--bone-dim)' }}>
            {ev.subtitle}
          </p>
        </div>
      </section>

      {/* Event Cards */}
      <section className="mt-12 md:mt-16">
        <div className="grid gap-5 sm:grid-cols-2">
          {ev.items.map((item, idx) => (
            <div
              key={idx}
              className="glass-card group relative overflow-hidden rounded-2xl p-6 md:p-8"
            >
              {/* Decorative corner glow */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-8 -top-8 h-[120px] w-[120px] rounded-full opacity-0 blur-[40px] transition-opacity duration-500 group-hover:opacity-20"
                style={{ background: idx % 2 === 0 ? 'var(--accent)' : 'var(--mauve)' }}
              />

              <div className="relative z-10">
                {/* Badge */}
                <span
                  className="inline-block rounded-lg px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider"
                  style={{
                    background: 'rgba(212,149,106,0.12)',
                    color: 'var(--accent-bright)',
                    border: '1px solid rgba(212,149,106,0.2)',
                  }}
                >
                  {item.badge}
                </span>

                <h3 className="mt-4 text-xl font-bold tracking-tight md:text-2xl" style={{ color: 'var(--bone)' }}>
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed md:text-[15px]" style={{ color: 'var(--bone-dim)' }}>
                  {item.desc}
                </p>

                {/* Highlight pill */}
                <div className="mt-5 flex items-center gap-2">
                  <span
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-sm"
                    style={{ background: 'rgba(212,149,106,0.1)', color: 'var(--accent)' }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                  </span>
                  <span className="text-sm font-bold" style={{ color: 'var(--accent-bright)' }}>
                    {item.highlight}
                  </span>
                </div>
              </div>

              {/* Bottom accent bar */}
              <div
                className="absolute bottom-0 left-0 h-[2px] w-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: 'linear-gradient(90deg, var(--accent), var(--mauve))' }}
              />
            </div>
          ))}
        </div>

        {/* Note */}
        <p className="mt-6 text-center text-xs" style={{ color: 'var(--bone-mute)' }}>
          {ev.cta_note}
        </p>
      </section>

      {/* CTA Box */}
      <section
        className="glass-card mt-16 overflow-hidden rounded-3xl p-8 text-center md:mt-20 md:p-12"
        style={{ borderColor: 'rgba(212,149,106,0.3)', background: 'linear-gradient(135deg, rgba(212,149,106,0.08), rgba(155,122,173,0.08))' }}
      >
        <h2 className="text-2xl font-extrabold md:text-4xl" style={{ color: 'var(--bone)' }}>
          {ev.cta_text}
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
