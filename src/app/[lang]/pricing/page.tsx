import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { hasLocale, getDictionary } from '../dictionaries'
import { PricingSection } from '@/components/home/PricingSection'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ak-dalto.com'

const pricingMeta: Record<string, { title: string; description: string }> = {
  ko: {
    title: '요금 안내 & 실시간 견적 계산기 | 투명 정찰제',
    description: '강남 AK 달토의 투명한 주대 및 타임비(TC), 룸비(RT) 정찰제 요금표. 9시 이전 5만원 할인 혜택 및 실시간 견적 계산기.',
  },
  en: {
    title: 'Pricing & Cost Calculator | Transparent Rates',
    description: 'AK Dalto Gangnam transparent pricing guide. Fixed whiskey table ₩150,000, ₩50,000 off before 9PM. TC and RT details included.',
  },
  zh: {
    title: '价格指南与费用估算 | 透明定额消费',
    description: '首尔江南AK Dalto透明定额价格表。基本酒水费15万韩元，21点前到访享5万韩元优惠。',
  },
  ja: {
    title: '料金案内・見積りシミュレーター | 透明定額制',
    description: '江南AK Daltoの透明定額料金表。基本飲み代15万ウォン、21時前のご来店で5万ウォン割引。',
  },
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  const m = pricingMeta[lang] ?? pricingMeta.ko

  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: `${BASE_URL}/${lang}/pricing`,
      languages: {
        ko: `${BASE_URL}/ko/pricing`,
        en: `${BASE_URL}/en/pricing`,
        'zh-CN': `${BASE_URL}/zh/pricing`,
        ja: `${BASE_URL}/ja/pricing`,
        'x-default': `${BASE_URL}/ko/pricing`,
      },
    },
    openGraph: {
      title: `${m.title} | 강남 AK달토`,
      description: m.description,
      url: `${BASE_URL}/${lang}/pricing`,
      images: [{ url: `${BASE_URL}/og/default.jpg`, width: 1200, height: 630, alt: 'AK Dalto Pricing' }],
    },
  }
}

interface Props {
  params: Promise<{ lang: string }>
}

export default async function PricingPage({ params }: Props) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()

  const dict = await getDictionary(lang)

  return (
    <main className="mx-auto w-full max-w-[1440px] px-4 py-10 sm:px-8 md:px-12 lg:px-16 md:py-16">
      {/* Page Header Hero */}
      <section className="glass-card relative overflow-hidden rounded-3xl p-8 md:p-14">
        {/* Glow effect */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-20 -top-20 h-[300px] w-[300px] rounded-full opacity-20 blur-[80px]"
          style={{ background: 'var(--accent)' }}
        />

        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-3">
            <span className="accent-line" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: 'var(--accent)' }}>
              TRANSPARENT PRICING
            </span>
          </div>

          <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl md:text-5xl lg:text-6xl" style={{ color: 'var(--bone)' }}>
            AK 달토 요금 안내
          </h1>

          <p className="mt-4 text-sm leading-relaxed md:text-base" style={{ color: 'var(--bone-dim)' }}>
            강남 AK 달토는 바가지 요금 없는 100% 투명 정찰제로 운영됩니다. 
            기본 주대부터 타임비(TC)와 룸비(RT)까지 명확히 공개하며, 9시 이전 방문 시 5만원 즉시 할인 혜택을 제공합니다.
          </p>

          {/* Key perks pill list */}
          {/* Key perks pill list */}
          <div className="mt-6 flex flex-wrap gap-2.5">
            <span className="inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-1.5 text-xs font-bold" style={{ borderColor: 'rgba(212,149,106,0.3)', background: 'rgba(212,149,106,0.1)', color: 'var(--accent-bright)' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              기본 주대 ₩150,000
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-1.5 text-xs font-bold" style={{ borderColor: 'rgba(212,149,106,0.3)', background: 'rgba(212,149,106,0.1)', color: 'var(--accent-bright)' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              9시 이전 ₩50,000 할인
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-1.5 text-xs font-bold" style={{ borderColor: 'rgba(212,149,106,0.3)', background: 'rgba(212,149,106,0.1)', color: 'var(--accent-bright)' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              아가씨 TC ₩120,000 / 연장 ₩150,000
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-1.5 text-xs font-bold" style={{ borderColor: 'rgba(212,149,106,0.3)', background: 'rgba(212,149,106,0.1)', color: 'var(--accent-bright)' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              선수 TC ₩70,000
            </span>
          </div>
        </div>
      </section>

      {/* Pricing Cards & Live Cost Calculator */}
      <PricingSection dict={dict} />

      {/* Transparent Pricing Guarantees */}
      <section className="mt-20">
        <header className="max-w-3xl">
          <div className="flex items-center gap-3">
            <span className="accent-line" />
            <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: 'var(--accent)' }}>
              OUR PROMISE
            </p>
          </div>
          <h2 className="mt-4 text-2xl font-bold tracking-tight md:text-4xl" style={{ color: 'var(--bone)' }}>
            달토의 4대 안심 정찰제 약속
          </h2>
          <p className="mt-2 text-sm" style={{ color: 'var(--bone-dim)' }}>
            처음 오시는 분도 바가지 걱정 없이 편안하게 이용하실 수 있도록 약속드립니다.
          </p>
        </header>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="glass-card rounded-2xl p-6 md:p-8">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: 'rgba(212,149,106,0.1)', color: 'var(--accent)' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </span>
            <h3 className="mt-4 text-base font-bold" style={{ color: 'var(--bone)' }}>추가금 0원 원칙</h3>
            <p className="mt-2 text-xs leading-relaxed" style={{ color: 'var(--bone-dim)' }}>
              사전에 안내해 드린 견적 외에 기습적인 추가 요금을 요구하지 않습니다.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 md:p-8">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: 'rgba(212,149,106,0.1)', color: 'var(--accent)' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
            </span>
            <h3 className="mt-4 text-base font-bold" style={{ color: 'var(--bone)' }}>얼리버드 할인 혜택</h3>
            <p className="mt-2 text-xs leading-relaxed" style={{ color: 'var(--bone-dim)' }}>
              오후 9시 이전 입장 고객님께 기본 주대 5만원 할인 혜택을 정확히 적용합니다.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 md:p-8">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: 'rgba(212,149,106,0.1)', color: 'var(--accent)' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.13 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.07 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
            </span>
            <h3 className="mt-4 text-base font-bold" style={{ color: 'var(--bone)' }}>사전 견적 확인 서비스</h3>
            <p className="mt-2 text-xs leading-relaxed" style={{ color: 'var(--bone-dim)' }}>
              전화/문자 문의 시 방문 인원과 시간에 맞춘 정확한 총비용을 사전에 알려드립니다.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 md:p-8">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: 'rgba(212,149,106,0.1)', color: 'var(--accent)' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="5" width="20" height="14" rx="2"/>
                <line x1="2" y1="10" x2="22" y2="10"/>
              </svg>
            </span>
            <h3 className="mt-4 text-base font-bold" style={{ color: 'var(--bone)' }}>정직한 정산 시스템</h3>
            <p className="mt-2 text-xs leading-relaxed" style={{ color: 'var(--bone-dim)' }}>
              퇴실 시 영수증 세부 내역을 확인해 드리며 명확하게 정산을 진행합니다.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="glass-card mt-20 overflow-hidden rounded-3xl p-8 text-center md:p-12" style={{ borderColor: 'rgba(212,149,106,0.3)', background: 'linear-gradient(135deg, rgba(212,149,106,0.08), rgba(155,122,173,0.08))' }}>
        <h2 className="text-2xl font-extrabold md:text-4xl" style={{ color: 'var(--bone)' }}>
          지금 바로 실시간 요금 문의하세요
        </h2>
        <p className="mt-3 text-sm" style={{ color: 'var(--bone-dim)' }}>
          담당 실장이 친절하고 세심하게 인원 맞춤 견적과 예약 가능 룸을 안내해 드립니다.
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
            href={`/${lang}/reserve`}
            className="inline-flex items-center justify-center rounded-xl border px-8 py-4 text-sm font-medium transition-all hover:scale-[1.02] hover:border-white/20 hover:bg-white/5 sm:min-w-[180px]"
            style={{ borderColor: 'var(--border)', color: 'var(--bone)' }}
          >
            온라인 예약하기 ➔
          </Link>
        </div>
      </section>
    </main>
  )
}
