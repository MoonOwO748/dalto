import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { hasLocale, getDictionary } from '../dictionaries'
import { getHrefLangAlternates, getLocalizedUrl, getLocalizedPath, BASE_URL } from '@/lib/routes'
import Link from 'next/link'

const reserveMeta: Record<string, { title: string; description: string }> = {
  ko: {
    title: '온라인 예약 & 전화 문의 | 24시간 실시간 룸 예약',
    description: '강남 AK 달토 실시간 예약 및 사전 상담. 전화 010-5704-3097 또는 간편 온라인 예약. 365일 연중무휴.',
  },
  en: {
    title: 'Online Reservation & Phone Inquiry | 24/7 Room Booking',
    description: 'AK Dalto Gangnam 24/7 room booking. Call +82-10-5704-3097 or book online. Open 365 days.',
  },
  zh: {
    title: '在线预订与电话咨询 | 24小时实时包厢预订',
    description: '首尔江南AK Dalto在线预订与咨询。致电+82-10-5704-3097或在线提交预订。全年365天营业。',
  },
  ja: {
    title: 'オンライン予約・電話問い合わせ | 24時間ルーム予約',
    description: '江南AK Daltoリアルタイム予約・事前相談。お電話 +82-10-5704-3097 または簡単Web予約。年中無休。',
  },
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  const m = reserveMeta[lang] ?? reserveMeta.ko

  return {
    title: m.title,
    description: m.description,
    alternates: getHrefLangAlternates('/reserve', lang, BASE_URL),
    openGraph: {
      title: `${m.title} | 강남 AK달토`,
      description: m.description,
      url: getLocalizedUrl('/reserve', lang, BASE_URL),
      images: [{ url: `${BASE_URL}/og/default.jpg`, width: 1200, height: 630, alt: 'AK Dalto Reservation' }],
    },
  }
}

interface Props {
  params: Promise<{ lang: string }>
}

export default async function ReservePage({ params }: Props) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = await getDictionary(lang)

  return (
    <div className="px-4 py-16 sm:px-8 md:px-12 lg:px-16 md:py-24">
      <div className="mx-auto max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: 'var(--gold)' }}>
          RESERVATION
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl" style={{ color: 'var(--bone)' }}>
          {dict.cta.title}
        </h1>
        <p className="mt-5 text-sm md:text-base" style={{ color: 'var(--bone-dim)' }}>
          {dict.cta.subtitle}
        </p>

        <div className="mt-10 flex flex-col gap-4">
          <a
            href="tel:+821057043097"
            className="flex items-center justify-center gap-3 rounded-2xl py-5 text-base font-semibold transition-all hover:brightness-105"
            style={{ background: 'var(--gold)', color: 'var(--ink)' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.13 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.07 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            {dict.cta.call} — 010-5704-3097
          </a>

          <div
            className="rounded-2xl border p-6 text-center text-sm"
            style={{ borderColor: 'var(--border)', color: 'var(--bone-dim)' }}
          >
            {lang === 'ko' ? '온라인 예약 폼은 준비 중입니다. 전화로 문의해주세요.' :
             lang === 'en' ? 'Online form coming soon. Please call us.' :
             lang === 'zh' ? '在线预订表格即将上线，请电话联系。' :
             '온라인 予約フォームは準備中です。お電話でお問い合わせください。'}
          </div>

          <Link
            href={getLocalizedPath('/', lang)}
            className="text-center text-sm transition-colors hover:text-bone"
            style={{ color: 'var(--bone-dim)' }}
          >
            ← {lang === 'ko' ? '홈으로' : lang === 'en' ? 'Back to Home' : lang === 'zh' ? '返回首页' : 'ホームへ戻る'}
          </Link>
        </div>
      </div>
    </div>
  )
}
