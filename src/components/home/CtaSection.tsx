'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { getDictionary } from '@/app/[lang]/dictionaries'
import { getLocalizedPath } from '@/lib/routes'

type Dict = Awaited<ReturnType<typeof getDictionary>>

interface Props { dict: Dict; lang: string }

export function CtaSection({ dict, lang }: Props) {
  const c = dict.cta
  const a = dict.access
  const [copied, setCopied] = useState(false)

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(a.address)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="scroll-reveal px-4 pt-16 pb-20 sm:px-8 md:px-12 lg:px-16 md:pt-28 lg:pt-32">
      {/* Big Address & Map Container */}
      <div className="glass-card overflow-hidden rounded-3xl">
        {/* Top gradient accent line */}
        <div
          className="h-[3px] w-full"
          style={{ background: 'linear-gradient(90deg, var(--accent), var(--mauve), var(--accent))' }}
        />

        <div className="p-6 md:p-12 lg:p-14">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            {/* Left: Huge Address display & Copy/Nav Buttons */}
            <div className="lg:col-span-6">
              <div className="flex items-center gap-3">
                <span className="accent-line" />
                <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: 'var(--accent)' }}>
                  {a.label}
                </p>
              </div>

              {/* Huge Address Header */}
              <h2 className="mt-4 text-[2.25rem] font-black leading-[1.1] tracking-tight sm:text-4xl md:text-5xl" style={{ color: 'var(--bone)' }}>
                {a.address}
              </h2>

              <p className="mt-3 text-sm font-medium" style={{ color: 'var(--accent-bright)' }}>
                {a.hours}
              </p>

              {/* Copy Address Button & Nav Apps */}
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleCopyAddress}
                  className="inline-flex items-center gap-2 rounded-xl border px-5 py-3 text-xs font-bold transition-all hover:scale-[1.02] hover:bg-white/10"
                  style={{ borderColor: 'rgba(212,149,106,0.3)', background: 'rgba(212,149,106,0.1)', color: 'var(--bone)' }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ color: 'var(--accent)' }}>
                    <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
                  </svg>
                  <span>{copied ? a.copied : a.copy_address}</span>
                </button>

                <a
                  href="https://map.kakao.com/?q=서울 강남구 역삼동 604-11"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border px-4 py-3 text-xs font-semibold transition-all hover:scale-[1.02] hover:bg-white/5"
                  style={{ borderColor: 'var(--border)', color: 'var(--bone-dim)' }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polygon points="12 2 2 7 12 12 22 7 12 2"/>
                    <polyline points="2 17 12 22 22 17"/>
                    <polyline points="2 12 12 17 22 12"/>
                  </svg>
                  {a.nav_kakao}
                </a>

                <a
                  href="https://map.naver.com/v5/search/서울 강남구 역삼동 604-11"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border px-4 py-3 text-xs font-semibold transition-all hover:scale-[1.02] hover:bg-white/5"
                  style={{ borderColor: 'var(--border)', color: 'var(--bone-dim)' }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  {a.nav_naver}
                </a>
              </div>

              {/* Subway list */}
              <div className="mt-8 border-t pt-6" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--accent)' }}>지하철 이용 안내</p>
                <ul className="flex flex-col gap-2">
                  {a.subway.map((s, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs md:text-sm" style={{ color: 'var(--bone-dim)' }}>
                      <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <rect x="4" y="3" width="16" height="13" rx="2"/>
                          <path d="M4 11h16"/>
                          <path d="M12 3v8"/>
                          <path d="M8 19l-3 3"/>
                          <path d="M16 19l3 3"/>
                          <circle cx="8" cy="15" r="1"/>
                          <circle cx="16" cy="15" r="1"/>
                        </svg>
                      </span>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right: Interactive Custom Map View Box */}
            <div className="lg:col-span-6">
              <div className="relative h-[320px] w-full overflow-hidden rounded-2xl border md:h-[400px]" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                {/* Embed Map View */}
                <iframe
                  title="AK 달토 오시는길 지도"
                  src="https://maps.google.com/maps?q=%EC%84%9C%EC%9A%B8%20%EA%B0%95%EB%82%A8%EA%B5%AC%20%EC%97%AD%EC%82%BC%EB%8F%99%20604-11&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                />

                {/* Map Overlay Badge */}
                <div className="absolute left-4 top-4 flex items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-bold shadow-lg backdrop-blur-md" style={{ borderColor: 'rgba(212,149,106,0.3)', background: 'rgba(10,10,14,0.85)', color: 'var(--bone)' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ color: 'var(--accent)' }}>
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  강남 AK 달토 (역삼동 604-11)
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Big CTA Box */}
          <div className="mt-12 rounded-2xl border p-6 text-center md:p-10" style={{ borderColor: 'rgba(212,149,106,0.2)', background: 'linear-gradient(135deg, rgba(212,149,106,0.08), rgba(155,122,173,0.08))' }}>
            <h3 className="text-2xl font-extrabold tracking-tight md:text-3xl" style={{ color: 'var(--bone)' }}>
              {c.title}
            </h3>
            <p className="mt-2 text-sm" style={{ color: 'var(--bone-dim)' }}>
              {c.subtitle}
            </p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href="tel:+821057043097"
                id="cta-call-btn"
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
                {c.call}
              </a>
              <Link
                href={getLocalizedPath('/reserve', lang)}
                id="cta-reserve-btn"
                className="inline-flex items-center justify-center rounded-xl border px-8 py-4 text-sm font-medium transition-all hover:scale-[1.02] hover:border-white/20 hover:bg-white/5 sm:min-w-[180px]"
                style={{ borderColor: 'var(--border)', color: 'var(--bone)' }}
              >
                {c.online} <span aria-hidden="true" className="ml-1.5">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
