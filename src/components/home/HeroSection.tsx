import Link from 'next/link'
import type { getDictionary } from '@/app/[lang]/dictionaries'
import { getLocalizedPath } from '@/lib/routes'

type Dict = Awaited<ReturnType<typeof getDictionary>>

interface Props { dict: Dict; lang: string }

export function HeroSection({ dict, lang }: Props) {
  const h = dict.hero

  return (
    <section className="px-4 pt-3 sm:px-8 md:px-12 lg:px-16 sm:pt-5">
      <div
        className="relative flex min-h-[88svh] flex-col overflow-hidden rounded-3xl md:min-h-[90svh]"
        style={{ background: 'var(--surface)' }}
      >
        {/* Hero background image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hero.jpg"
          alt={lang === 'ko' ? '강남 달토 프라이빗 룸 가라오케 라운지' : h.title}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover object-top"
        />

        {/* Dual gradient overlay — warm cinematic tint */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background: `
              linear-gradient(to top, rgba(10,10,14,0.95) 0%, rgba(10,10,14,0.5) 45%, rgba(10,10,14,0.15) 100%),
              linear-gradient(135deg, rgba(155,58,106,0.12) 0%, transparent 60%)
            `,
          }}
        />

        {/* Content — split layout on desktop */}
        <div className="relative z-10 flex flex-1 flex-col justify-end p-6 md:p-14 lg:p-20">
          <div className="max-w-3xl">
            {/* Accent line + Badge */}
            <div className="flex items-center gap-3">
              <span className="accent-line" />
              <span
                className="text-xs font-medium uppercase tracking-widest md:text-sm"
                style={{ color: 'var(--accent)' }}
              >
                {h.badge}
              </span>
            </div>

            {/* Title — larger, with gradient text */}
            <h1
              className="mt-6 text-[2.5rem] font-bold leading-[1.05] tracking-tight md:mt-8 md:text-[3.25rem] lg:text-[4rem]"
              style={{ color: 'var(--bone)' }}
            >
              {h.title}
            </h1>

            {/* Subtitle */}
            <p className="mt-5 max-w-[32em] text-base leading-relaxed md:mt-6 md:text-lg" style={{ color: 'var(--bone-dim)' }}>
              {h.subtitle}
            </p>

            {/* Feature badges — outlined with accent border */}
            <ul className="mt-7 flex flex-wrap gap-2.5">
              {[h.badge_price, h.badge_discount, h.badge_fixed, h.badge_hours].map((b) => (
                <li
                  key={b}
                  className="inline-flex items-center rounded-lg border px-3.5 py-1.5 text-xs font-medium"
                  style={{
                    borderColor: 'rgba(212,149,106,0.25)',
                    background: 'rgba(212,149,106,0.06)',
                    color: 'var(--accent-bright)',
                  }}
                >
                  {b}
                </li>
              ))}
            </ul>

            {/* CTA buttons — distinct shapes */}
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap md:mt-11">
              <a
                href="tel:+821057043097"
                id="hero-call-btn"
                className="inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-xl px-7 py-4 text-sm font-semibold transition-all duration-300 hover:scale-[1.02] hover:brightness-110 sm:min-w-[170px]"
                style={{
                  background: 'linear-gradient(135deg, var(--accent), var(--accent-bright))',
                  color: 'var(--ink)',
                  boxShadow: '0 8px 32px -8px rgba(212,149,106,0.35)',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.13 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.07 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                {h.call}
              </a>
              <Link
                href={getLocalizedPath('/reserve', lang)}
                id="hero-reserve-btn"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl border px-7 py-4 text-sm font-medium transition-all duration-300 hover:scale-[1.02] hover:border-white/20 hover:bg-white/5 sm:min-w-[170px]"
                style={{ borderColor: 'rgba(255,255,255,0.12)', color: 'var(--bone)' }}
              >
                {h.online_reserve} <span aria-hidden="true">→</span>
              </Link>
            </div>

            <p className="mt-5 text-sm" style={{ color: 'var(--bone-mute)' }}>
              {h.urgent} · 010-5704-3097
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
