'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { getDictionary } from '../dictionaries'
import { getLocalizedPath } from '@/lib/routes'

type Dict = Awaited<ReturnType<typeof getDictionary>>

interface Props {
  dict: Dict
  lang: string
}

export default function AccessPageClient({ dict, lang }: Props) {
  const ac = dict.access
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(ac.address)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback
    }
  }

  const kakaoMapSrcDoc = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <style>
    html, body { margin: 0; padding: 0; width: 100%; height: 100%; background: #131318; overflow: hidden; }
    .root_daum_roughmap { width: 100% !important; height: 100% !important; border: 0 !important; }
    .root_daum_roughmap .wrap_map { height: 100% !important; }
    .root_daum_roughmap .hide { display: none !important; }
  </style>
</head>
<body>
  <div id="daumRoughmapContainer1785818453038" class="root_daum_roughmap root_daum_roughmap_landing"></div>
  <script charset="UTF-8" class="daum_roughmap_loader_script" src="https://ssl.daumcdn.net/dmaps/map_js_init/roughmapLoader.js"></script>
  <script charset="UTF-8">
    new daum.roughmap.Lander({
      "timestamp": "1785818453038",
      "key": "scdd7hao9j6",
      "mapWidth": "100%",
      "mapHeight": "400"
    }).render();
  </script>
</body>
</html>`

  return (
    <main className="mx-auto w-full max-w-[1440px] px-4 py-10 sm:px-8 md:px-12 lg:px-16 md:py-16">
      {/* Page Header Hero */}
      <section className="px-3 pt-6 sm:px-5 md:pt-10">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3">
            <span className="accent-line" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: 'var(--accent)' }}>
              {ac.label}
            </span>
          </div>

          <h1 className="mt-4 font-display text-[2.25rem] font-black leading-[1.05] tracking-tight text-bone md:text-5xl lg:text-6xl">
            {lang === 'ko' ? '강남 역삼, 삼정호텔 위치' :
             lang === 'en' ? 'Gangnam Yeoksam, Samjung Hotel Location' :
             lang === 'zh' ? '江南驿三 三井酒店位置' :
             '江南駅三 三井ホテル位置'}
          </h1>

          <p className="mt-4 text-sm leading-relaxed text-bone-dim md:text-base">
            {lang === 'ko' ? '9호선·신분당선 신논현역 4번 출구 도보 3~5분, 2호선 강남역 11번 출구 도보 8분 거리입니다. 건물 전용 주차장 및 발렛 파킹을 완비하였으며, VIP 고객을 위한 맞춤 차량 픽업 서비스도 준비되어 있습니다.' :
             lang === 'en' ? '3-5 min walk from Sinnonhyeon Station Exit 4, 8 min walk from Gangnam Station Exit 11. Dedicated building parking and valet service available, with VIP vehicle pickup service.' :
             lang === 'zh' ? '新论岘站4号出口步行3-5分钟，江南站11号出口步行8分钟。配备专用停车场及代客泊车，并为VIP客户提供专属接送服务。' :
             '新論峴駅4番出口から徒歩3〜5分、江南駅11번 출구 도보 8분. 전용 駐車場 및 バレーパーキング完備、VIPお客様向けピックアップサービスもご用意。'}
          </p>
        </div>
      </section>

      {/* Access Details Table Grid */}
      <section className="mt-10 px-3 sm:px-5 md:mt-14">
        <div className="glass-card rounded-2xl bg-surface p-6 md:p-10">
          <dl className="grid gap-6 text-sm md:grid-cols-2 md:gap-x-12 md:gap-y-6">
            {/* Address */}
            <div className="grid grid-cols-[auto_1fr] gap-4 border-t border-border pt-5 first:border-t-0 first:pt-0 md:[&:nth-child(2)]:border-t-0 md:[&:nth-child(2)]:pt-0">
              <dt className="flex items-center gap-2 text-xs font-medium text-bone-mute min-w-[5rem]">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                {lang === 'ko' ? '주소' : lang === 'en' ? 'Address' : lang === 'zh' ? '地址' : '住所'}
              </dt>
              <dd className="flex flex-wrap items-center justify-between gap-2 text-bone-dim">
                <span>{ac.address} (삼정호텔)</span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="rounded-lg border px-2.5 py-1 text-[11px] font-medium transition-colors hover:border-accent hover:text-accent"
                  style={{ borderColor: 'var(--border)', color: copied ? 'var(--accent-bright)' : 'var(--bone-mute)' }}
                >
                  {copied ? ac.copied : ac.copy_address}
                </button>
              </dd>
            </div>

            {/* Subway */}
            <div className="grid grid-cols-[auto_1fr] gap-4 border-t border-border pt-5 first:border-t-0 first:pt-0 md:[&:nth-child(2)]:border-t-0 md:[&:nth-child(2)]:pt-0">
              <dt className="flex items-center gap-2 text-xs font-medium text-bone-mute min-w-[5rem]">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="3" width="16" height="13" rx="2"/>
                  <path d="M4 11h16"/>
                  <path d="M12 3v8"/>
                  <path d="M8 19l-3 3"/>
                  <path d="M16 19l3 3"/>
                  <circle cx="8" cy="15" r="1"/>
                  <circle cx="16" cy="15" r="1"/>
                </svg>
                {lang === 'ko' ? '지하철' : lang === 'en' ? 'Subway' : lang === 'zh' ? '地铁' : '地下鉄'}
              </dt>
              <dd className="text-bone-dim">
                신논현역 4번 출구 도보 3~5분 · 강남역 11번 출구 도보 8분 · 언주역 4번 출구 도보 5분
              </dd>
            </div>

            {/* Parking */}
            <div className="grid grid-cols-[auto_1fr] gap-4 border-t border-border pt-5">
              <dt className="flex items-center gap-2 text-xs font-medium text-bone-mute min-w-[5rem]">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="16" rx="3"/>
                  <path d="M9 16V8h4a3 3 0 0 1 0 6H9"/>
                </svg>
                {lang === 'ko' ? '주차' : lang === 'en' ? 'Parking' : lang === 'zh' ? '停车' : '駐車場'}
              </dt>
              <dd className="text-bone-dim">
                삼정호텔 전용 주차장 및 발렛 파킹 서비스 완비
              </dd>
            </div>

            {/* VIP Pickup */}
            <div className="grid grid-cols-[auto_1fr] gap-4 border-t border-border pt-5">
              <dt className="flex items-center gap-2 text-xs font-medium text-bone-mute min-w-[5rem]">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 3C2 11.2 2 11.6 2 12v4c0 .6.4 1 1 1h2"/>
                  <circle cx="7" cy="17" r="2"/>
                  <circle cx="17" cy="17" r="2"/>
                </svg>
                {lang === 'ko' ? 'VIP 픽업' : lang === 'en' ? 'VIP Pickup' : lang === 'zh' ? 'VIP接送' : 'VIPピックアップ'}
              </dt>
              <dd className="text-bone-dim">
                강남권 내 고급 차량 픽업 지원 · 사전 전화 예약 시 신청 가능
              </dd>
            </div>
          </dl>

          {/* Map Link Pill Buttons */}
          <div className="mt-8 flex flex-wrap gap-2.5 border-t border-border pt-6">
            <a
              href="https://map.kakao.com/?q=서울+강남구+역삼동+604-11"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs text-bone-dim transition-colors hover:border-accent hover:text-accent-bright"
            >
              <span>Kakao Map</span>
              <span aria-hidden="true">→</span>
            </a>
            <a
              href="https://map.naver.com/v5/search/서울+강남구+역삼동+604-11"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs text-bone-dim transition-colors hover:border-accent hover:text-accent-bright"
            >
              <span>Naver Map</span>
              <span aria-hidden="true">→</span>
            </a>
            <a
              href="https://tmap.life"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs text-bone-dim transition-colors hover:border-accent hover:text-accent-bright"
            >
              <span>TMAP</span>
              <span aria-hidden="true">→</span>
            </a>
            <a
              href="https://maps.google.com/?q=서울+강남구+역삼동+604-11"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs text-bone-dim transition-colors hover:border-accent hover:text-accent-bright"
            >
              <span>Google Maps</span>
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* Side-by-Side Dual Map Section (Kakao Map & Google Maps) */}
      <section className="mt-6 px-3 sm:px-5">
        <div className="grid gap-4 md:grid-cols-2">
          {/* Kakao Map Card */}
          <div className="overflow-hidden rounded-2xl border border-border bg-surface p-1">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <span className="text-xs font-semibold text-bone flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 2 7 12 12 22 7 12 2"/>
                  <polyline points="2 17 12 22 22 17"/>
                  <polyline points="2 12 12 17 22 12"/>
                </svg>
                카카오맵 (Kakao Map)
              </span>
            </div>
            <div className="w-full overflow-hidden rounded-xl bg-ink h-[380px] md:h-[420px]">
              <iframe
                title="Kakao Map Lander"
                srcDoc={kakaoMapSrcDoc}
                className="h-full w-full border-0"
                loading="lazy"
              />
            </div>
          </div>

          {/* Google Maps Card */}
          <div className="overflow-hidden rounded-2xl border border-border bg-surface p-1">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <span className="text-xs font-semibold text-bone flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="2" y1="12" x2="22" y2="12"/>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
                구글 지도 (Google Maps)
              </span>
            </div>
            <iframe
              title="Google Map - AK Dalto"
              src="https://maps.google.com/maps?q=%EC%84%9C%EC%9A%B8%20%EA%B0%95%EB%82%A8%EA%B5%AC%20%EC%97%AD%EC%82%BC%EB%8F%99%20604-11&t=&z=16&ie=UTF8&iwloc=&output=embed"
              className="h-[380px] w-full rounded-xl border-0 md:h-[420px]"
              loading="lazy"
              allowFullScreen
            />
          </div>
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
