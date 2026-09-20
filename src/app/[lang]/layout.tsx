import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Noto_Sans_KR, Noto_Sans_SC, Noto_Sans_JP } from 'next/font/google'

interface LayoutProps {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}
import { hasLocale, locales, getDictionary } from './dictionaries'
import { getHrefLangAlternates, getLocalizedUrl, BASE_URL } from '@/lib/routes'
import { AnnouncementBar } from '@/components/layout/AnnouncementBar'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

const notoKR = Noto_Sans_KR({ subsets: ['latin'], weight: ['300','400','500','600','700'], variable: '--font-noto-kr', display: 'swap' })
const notoSC = Noto_Sans_SC({ subsets: ['latin'], weight: ['300','400','500','600','700'], variable: '--font-noto-sc', display: 'swap' })
const notoJP = Noto_Sans_JP({ subsets: ['latin'], weight: ['300','400','500','600','700'], variable: '--font-noto-jp', display: 'swap' })

const metaByLocale: Record<string, { title: string; description: string; ogLocale: string }> = {
  ko: {
    title: '강남 달토 | 역삼동 가라오케 주대·위치·예약 안내',
    description: '강남 달토(AK 달토)의 주대, 위치, 예약 안내. 서울 강남구 역삼동 삼정호텔 위치. 기본 주대 15만원, 오후 9시 이전 5만원 할인. 신논현역 4번 출구 도보 3분. 365일 연중무휴. 문의 010-5704-3097.',
    ogLocale: 'ko_KR',
  },
  en: {
    title: 'AK Dalto Gangnam Karaoke | Premium Private Lounge & Transparent Pricing',
    description: 'Premium private karaoke in Yeoksam-dong, Gangnam (formerly UNME). Fixed price ₩150,000, ₩50,000 off before 9PM. 3-5 min walk from Sinnonhyeon Station. Open 365 days. Call 010-5704-3097.',
    ogLocale: 'en_US',
  },
  zh: {
    title: 'AK Dalto 江南KTV官方 | 首尔江南私人包厢 · 透明平价消费',
    description: '首尔江南区驿三洞三井酒店AK Dalto。基本酒水费15万韩元，21点前到访享5万韩元优惠。新论岘站4号出口步行3-5分钟。全年365天营业。',
    ogLocale: 'zh_CN',
  },
  ja: {
    title: 'AK Dalto 江南カラオケ公式 | 駅三洞プライベートルーム · 透明定額制',
    description: 'ソウル江南区駅三洞サムジョンホテルAK Dalto。基本飲み代15万ウォン、21時前ご来店で5万ウォン割引。新論峴駅4番出口徒歩3〜5分。年中無休。',
    ogLocale: 'ja_JP',
  },
}

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: Omit<LayoutProps, 'children'>): Promise<Metadata> {
  const { lang } = await params
  const m = metaByLocale[lang] ?? metaByLocale.ko

  return {
    title: { default: m.title, template: `%s | 강남 달토` },
    description: m.description,
    alternates: getHrefLangAlternates('/', lang, BASE_URL),
    openGraph: {
      title: m.title,
      description: m.description,
      url: getLocalizedUrl('/', lang, BASE_URL),
      siteName: '강남 달토',
      locale: m.ogLocale,
      type: 'website',
      images: [{ url: `${BASE_URL}/og/default.jpg`, width: 1200, height: 630, alt: '강남 달토 가라오케 | AK Dalto Gangnam' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: m.title,
      description: m.description,
      images: [`${BASE_URL}/og/default.jpg`],
    },
  }
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()

  const dict = await getDictionary(lang)

  const businessJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${BASE_URL}/#website`,
        url: BASE_URL,
        name: '강남 달토',
        alternateName: ['AK 달토', 'AK Dalto', '강남 유앤미', 'AK 유앤미'],
        inLanguage: ['ko', 'en', 'zh-CN', 'ja'],
      },
      {
        '@type': 'NightClub',
        '@id': `${BASE_URL}/#business`,
        name: '강남 달토',
        alternateName: [
          'AK Dalto',
          'AK달토',
          'AK 달토',
          '강남 달토 가라오케',
          '강남 유앤미',
          'AK 유앤미',
          'AK UNME',
          'Gangnam Karaoke',
          '江南KTV',
          '江南カラオケ',
        ],
        url: BASE_URL,
        telephone: '+82-10-5704-3097',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '역삼동 604-11 삼정호텔',
          addressLocality: '강남구',
          addressRegion: '서울',
          postalCode: '06234',
          addressCountry: 'KR',
        },
        geo: { '@type': 'GeoCoordinates', latitude: 37.4979, longitude: 127.0276 },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
            opens: '18:00', closes: '15:00',
          },
        ],
        priceRange: '₩100,000~',
        inLanguage: ['ko', 'en', 'zh-CN', 'ja'],
      },
    ],
  }

  return (
    <html lang={lang} className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd).replace(/</g, '\\u003c') }}
        />
      </head>
      <body className={`flex min-h-screen flex-col bg-ink text-bone ${notoKR.variable} ${notoSC.variable} ${notoJP.variable}`}>
        <ScrollReveal />
        <div className="sticky top-0 z-50">
          <AnnouncementBar dict={dict} lang={lang} />
          <Header dict={dict} lang={lang} />
        </div>
        <div className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col">
          <main className="flex-1">{children}</main>
        </div>
        <Footer dict={dict} lang={lang} />
      </body>
    </html>
  )
}
