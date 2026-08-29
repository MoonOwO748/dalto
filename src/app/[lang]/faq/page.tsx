import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { hasLocale, getDictionary } from '../dictionaries'
import { getHrefLangAlternates, getLocalizedUrl, getLocalizedPath, BASE_URL } from '@/lib/routes'
import { FaqSection } from '@/components/home/FaqSection'

const faqMeta: Record<string, { title: string; description: string }> = {
  ko: {
    title: '자주 묻는 질문 (FAQ) | 예약·주대·위치 궁금증 안내',
    description: 'AK 달토 자주 묻는 질문: 예약 방법, 기본 주대 15만원 및 얼리버드 할인, 영업시간, 신논현역 삼정호텔 위치, 외국인 응대 안내.',
  },
  en: {
    title: 'Frequently Asked Questions (FAQ) | Booking & Rates Guide',
    description: 'AK Dalto Gangnam FAQ: Reservation methods, pricing rules, early bird discounts, opening hours, and foreign guest support.',
  },
  zh: {
    title: '常见问题解答 (FAQ) | 预订·酒水费·位置指南',
    description: 'AK Dalto常见问题解答：如何预订、基本酒水费15万优惠规则、营业时间、新论岘站位置及外语服务。',
  },
  ja: {
    title: 'よくあるご質問 (FAQ) | ご予約・料金・アクセス案内',
    description: 'AK Daltoよくある質問：予約手順、基本飲み代15万ウォン割引制度、営業時間、新論峴駅アクセス、外国人対応。',
  },
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  const m = faqMeta[lang] ?? faqMeta.ko

  return {
    title: m.title,
    description: m.description,
    alternates: getHrefLangAlternates('/faq', lang, BASE_URL),
    openGraph: {
      title: `${m.title} | 강남 AK달토`,
      description: m.description,
      url: getLocalizedUrl('/faq', lang, BASE_URL),
      images: [{ url: `${BASE_URL}/og/default.jpg`, width: 1200, height: 630, alt: 'AK Dalto FAQ' }],
    },
  }
}

interface Props {
  params: Promise<{ lang: string }>
}

export default async function FaqPage({ params }: Props) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()

  const dict = await getDictionary(lang)

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: dict.faq.items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  }

  return (
    <main className="mx-auto w-full max-w-[1440px] px-4 py-10 sm:px-8 md:px-12 lg:px-16 md:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, '\\u003c') }}
      />
      {/* Page Header Hero */}
      <section className="glass-card relative overflow-hidden rounded-3xl p-8 md:p-14">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-16 -top-16 h-[250px] w-[250px] rounded-full opacity-20 blur-[80px]"
          style={{ background: 'var(--mauve)' }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-8 -right-8 h-[180px] w-[180px] rounded-full opacity-15 blur-[60px]"
          style={{ background: 'var(--accent)' }}
        />

        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-3">
            <span className="accent-line" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: 'var(--accent)' }}>
              {dict.faq.label}
            </span>
          </div>

          <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl md:text-5xl lg:text-6xl" style={{ color: 'var(--bone)' }}>
            {dict.faq.title}
          </h1>

          <p className="mt-4 text-sm leading-relaxed md:text-base" style={{ color: 'var(--bone-dim)' }}>
            {lang === 'ko' ? '궁금한 점이 있으시면 먼저 확인해 보세요. 여기에 없는 질문은 전화로 편하게 문의해 주세요.' :
             lang === 'en' ? 'Check here first for answers. For anything else, feel free to call us.' :
             lang === 'zh' ? '如有疑问请先查看。如未找到答案，欢迎致电咨询。' :
             'まずはこちらをご確認ください。ここにない質問はお気軽にお電話ください。'}
          </p>
        </div>
      </section>

      {/* FAQ Accordion — reuse FaqSection from home */}
      <FaqSection dict={dict} />

      {/* Additional Contact CTA */}
      <section
        className="glass-card mt-16 overflow-hidden rounded-3xl p-8 text-center md:mt-20 md:p-12"
        style={{ borderColor: 'rgba(212,149,106,0.3)', background: 'linear-gradient(135deg, rgba(212,149,106,0.08), rgba(155,122,173,0.08))' }}
      >
        <h2 className="text-2xl font-extrabold md:text-4xl" style={{ color: 'var(--bone)' }}>
          {lang === 'ko' ? '원하시는 답변을 찾지 못하셨나요?' :
           lang === 'en' ? "Didn't find what you're looking for?" :
           lang === 'zh' ? '没有找到您想要的答案？' :
           'お探しの回答が見つかりませんか？'}
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
