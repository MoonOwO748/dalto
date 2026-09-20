import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { hasLocale, getDictionary } from '../dictionaries'
import { getHrefLangAlternates, getLocalizedUrl, BASE_URL } from '@/lib/routes'
import AccessPageClient from './AccessPageClient'

const accessMeta: Record<string, { title: string; description: string }> = {
  ko: {
    title: '오시는 길 & 위치 안내 | 신논현역·강남역 삼정호텔',
    description: '강남 달토 위치 및 오시는 길. 서울 강남구 역삼동 604-11 삼정호텔, 신논현역 4번 출구 도보 3~5분. 주차와 방문 경로를 확인하세요.',
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
    alternates: getHrefLangAlternates('/access', lang, BASE_URL),
    twitter: {
      card: 'summary_large_image',
      title: `${m.title} | 강남 달토`,
      description: m.description,
      images: [`${BASE_URL}/og/default.jpg`],
    },
    openGraph: {
      title: `${m.title} | 강남 달토`,
      description: m.description,
      url: getLocalizedUrl('/access', lang, BASE_URL),
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
