import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { hasLocale, getDictionary } from '../dictionaries'
import AccessPageClient from './AccessPageClient'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ak-dalto.com'

const accessMeta: Record<string, { title: string; description: string }> = {
  ko: {
    title: '오시는 길 & 위치 안내 | 신논현역·강남역 삼정호텔',
    description: '서울 강남구 역삼동 604-11 삼정호텔 위치. 신논현역 4번 출구 도보 3분, 강남역 11번 출구 도보 8분. 무료 발렛 파킹 및 주차 지원.',
  },
  en: {
    title: 'Location & Access Map | Sinnonhyeon & Gangnam Station',
    description: 'Samjung Hotel, 604-11 Yeoksam-dong, Gangnam-gu, Seoul. 3-5 min walk from Sinnonhyeon Station Exit 4. Valet parking provided.',
  },
  zh: {
    title: '交通指南与位置地图 | 新论岘站·江南站三井酒店',
    description: '首尔特别市江南区驿三洞604-11三井酒店。新论岘站4号出口步行3-5分钟。提供代客泊车服务。',
  },
  ja: {
    title: 'アクセス・店舗情報 | 新論峴駅・江南駅 サムジョンホテル',
    description: 'ソウル江南区駅三洞604-11 サムジョンホテル。新論峴駅4番出口より徒歩3〜5分。バレーパーキング対応。',
  },
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  const m = accessMeta[lang] ?? accessMeta.ko

  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: `${BASE_URL}/${lang}/access`,
      languages: {
        ko: `${BASE_URL}/ko/access`,
        en: `${BASE_URL}/en/access`,
        'zh-CN': `${BASE_URL}/zh/access`,
        ja: `${BASE_URL}/ja/access`,
        'x-default': `${BASE_URL}/ko/access`,
      },
    },
    openGraph: {
      title: `${m.title} | 강남 AK달토`,
      description: m.description,
      url: `${BASE_URL}/${lang}/access`,
      images: [{ url: `${BASE_URL}/og/default.jpg`, width: 1200, height: 630, alt: 'AK Dalto Access Map' }],
    },
  }
}

interface Props {
  params: Promise<{ lang: string }>
}

export default async function AccessPage({ params }: Props) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()

  const dict = await getDictionary(lang)

  return <AccessPageClient dict={dict} lang={lang} />
}
