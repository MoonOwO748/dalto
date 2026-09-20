import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { hasLocale, getDictionary } from '../dictionaries'
import { getHrefLangAlternates, getLocalizedUrl, getLocalizedPath, BASE_URL } from '@/lib/routes'
import { GuideSection } from '@/components/home/GuideSection'

const howtoMeta: Record<string, { title: string; description: string }> = {
  ko: {
    title: '이용 방법 & 첫 방문 가이드 | 4단계 안심 이용',
    description: '강남 달토 첫 방문을 위한 이용 방법. 예약부터 룸 안내, 요금 정산까지 4단계 절차와 복장, 결제, 주차 정보를 확인하세요.',
  },
  en: {
    title: 'How to Use & First-Time Visitor Guide | Easy 4 Steps',
    description: '4-step guide for first-time visitors to AK Dalto Gangnam. Dress code, payment options, parking support, and personalized manager care.',
  },
  zh: {
    title: '使用指南与首次到访须知 | 简单4步流程',
    description: 'AK Dalto首次到访4步指南：着装建议、结账方式、代客泊车及10年经验经理1对1专属服务。',
  },
  ja: {
    title: 'ご利用案内・初回ガイド | 4ステップ簡単案内',
    description: '初めてAK Daltoをご利用されるお客様へ：4ステップご利用手順、ドレスコード、決済方法、駐車場案内。',
  },
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  const m = howtoMeta[lang] ?? howtoMeta.ko

  return {
    title: m.title,
    description: m.description,
    alternates: getHrefLangAlternates('/howto', lang, BASE_URL),
    twitter: {
      card: 'summary_large_image',
      title: `${m.title} | 강남 달토`,
      description: m.description,
      images: [`${BASE_URL}/og/default.jpg`],
    },
    openGraph: {
      title: `${m.title} | 강남 달토`,
      description: m.description,
      url: getLocalizedUrl('/howto', lang, BASE_URL),
      images: [{ url: `${BASE_URL}/og/default.jpg`, width: 1200, height: 630, alt: 'AK Dalto How to Use Guide' }],
    },
  }
}

interface Props {
  params: Promise<{ lang: string }>
}

export default async function HowtoPage({ params }: Props) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()

  const dict = await getDictionary(lang)
  const hw = dict.howto

  const infoCards = [
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
      ),
      title: hw.dress_title,
      desc: hw.dress_desc,
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="16" rx="3"/>
          <path d="M9 16V8h4a3 3 0 0 1 0 6H9"/>
        </svg>
      ),
      title: hw.parking_title,
      desc: hw.parking_desc,
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="5" width="20" height="14" rx="2"/>
          <line x1="2" y1="10" x2="22" y2="10"/>
        </svg>
      ),
      title: hw.payment_title,
      desc: hw.payment_desc,
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 8v8"/>
          <path d="M8 12h8"/>
        </svg>
      ),
      title: hw.age_title,
      desc: hw.age_desc,
    },
  ]

  return (
    <main className="mx-auto w-full max-w-[1440px] px-4 py-10 sm:px-8 md:px-12 lg:px-16 md:py-16">
      {/* Page Header Hero */}
      <section className="glass-card relative overflow-hidden rounded-3xl p-8 md:p-14">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-20 -top-20 h-[300px] w-[300px] rounded-full opacity-20 blur-[80px]"
          style={{ background: 'var(--accent)' }}
        />

        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-3">
            <span className="accent-line" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: 'var(--accent)' }}>
              {hw.label}
            </span>
          </div>

          <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl md:text-5xl lg:text-6xl" style={{ color: 'var(--bone)' }}>
            {hw.title}
          </h1>

          <p className="mt-4 text-sm leading-relaxed md:text-base" style={{ color: 'var(--bone-dim)' }}>
            {hw.subtitle}
          </p>
        </div>
      </section>

      {/* Reuse the Guide Section (4 Steps) from Home */}
      <GuideSection dict={dict} />

      {/* Detailed Info Cards */}
      <section className="mt-16 md:mt-20">
        <header className="max-w-3xl">
          <div className="flex items-center gap-3">
            <span className="accent-line" />
            <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: 'var(--accent)' }}>
              ADDITIONAL INFO
            </p>
          </div>
          <h2 className="mt-4 text-2xl font-bold tracking-tight md:text-4xl" style={{ color: 'var(--bone)' }}>
            {hw.tips_title}
          </h2>
        </header>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {infoCards.map((card, idx) => (
            <div key={idx} className="glass-card rounded-2xl p-6 md:p-8">
              <span
                className="flex h-12 w-12 items-center justify-center rounded-xl text-xl"
                style={{ background: 'rgba(212,149,106,0.1)', color: 'var(--accent)' }}
              >
                {card.icon}
              </span>
              <h3 className="mt-4 text-base font-bold" style={{ color: 'var(--bone)' }}>
                {card.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--bone-dim)' }}>
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Tips List */}
      <section className="mt-16 md:mt-20">
        <div className="glass-card rounded-2xl p-6 md:p-10">
          <h3 className="flex items-center gap-3 text-lg font-bold md:text-xl" style={{ color: 'var(--bone)' }}>
            <span
              className="flex h-9 w-9 items-center justify-center rounded-xl"
              style={{ background: 'rgba(212,149,106,0.12)', color: 'var(--accent)' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="16" x2="12" y2="12"/>
                <line x1="12" y1="8" x2="12.01" y2="8"/>
              </svg>
            </span>
            {hw.tips_title}
          </h3>

          <ul className="mt-6 flex flex-col gap-4">
            {hw.tips.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span
                  className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-[10px] font-bold"
                  style={{
                    background: 'rgba(212,149,106,0.12)',
                    color: 'var(--accent-bright)',
                    border: '1px solid rgba(212,149,106,0.15)',
                  }}
                >
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <span className="text-sm leading-relaxed md:text-[15px]" style={{ color: 'var(--bone-dim)' }}>
                  {tip}
                </span>
              </li>
            ))}
          </ul>
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
