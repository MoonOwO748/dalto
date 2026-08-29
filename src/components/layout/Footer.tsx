'use client'

import Link from 'next/link'
import type { getDictionary } from '@/app/[lang]/dictionaries'
import { getLocalizedPath } from '@/lib/routes'

type Dict = Awaited<ReturnType<typeof getDictionary>>

interface Props {
  dict: Dict
  lang: string
}

export function Footer({ dict, lang }: Props) {
  const navLinks = [
    { href: getLocalizedPath('/pricing', lang), label: dict.nav.pricing },
    { href: getLocalizedPath('/events', lang),  label: dict.nav.events },
    { href: getLocalizedPath('/howto', lang),   label: dict.nav.howto },
    { href: getLocalizedPath('/access', lang),  label: dict.nav.access },
    { href: getLocalizedPath('/faq', lang),     label: dict.nav.faq },
    { href: getLocalizedPath('/blog', lang),    label: dict.nav.blog },
  ]

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative mt-24 overflow-hidden border-t" style={{ borderColor: 'var(--border)', background: 'var(--ink)' }}>
      {/* Background ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 -z-10 h-[300px] w-[800px] -translate-x-1/2 opacity-20 blur-[120px]"
        style={{ background: 'radial-gradient(ellipse at center, var(--accent), var(--mauve), transparent 70%)' }}
      />

      {/* Top accent line */}
      <div
        className="h-[1px] w-full"
        style={{ background: 'linear-gradient(90deg, transparent 0%, var(--accent) 50%, transparent 100%)' }}
      />

      <div className="mx-auto max-w-[1440px] px-5 pt-16 pb-12">
        {/* Top watermark / Big brand identity */}
        <div className="flex flex-col items-start justify-between gap-6 border-b pb-12 md:flex-row md:items-end" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <div>
            <div className="flex items-center gap-3">
              <span className="accent-line" />
              <span className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: 'var(--accent)' }}>
                Gangnam Premium Lounge
              </span>
            </div>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl" style={{ color: 'var(--bone)' }}>
              AK DALTO
            </h2>
          </div>

          {/* Quick Call Pill */}
          <div className="flex items-center gap-3">
            <a
              href="tel:+821057043097"
              className="group flex items-center gap-3 rounded-2xl border px-5 py-3.5 transition-all duration-300 hover:border-accent/40 hover:bg-white/5"
              style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}
            >
              <div
                className="flex h-9 w-9 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                style={{ background: 'rgba(212,149,106,0.12)', color: 'var(--accent)' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.13 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.07 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div>
                <p className="text-[11px] font-medium uppercase tracking-wider" style={{ color: 'var(--bone-dim)' }}>직통 전화 문의</p>
                <p className="text-base font-bold tracking-tight" style={{ color: 'var(--bone)' }}>010-5704-3097</p>
              </div>
            </a>

            {/* Back to top button */}
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="맨 위로 이동"
              className="flex h-14 w-14 items-center justify-center rounded-2xl border transition-all duration-300 hover:border-accent/40 hover:bg-white/5 hover:scale-105"
              style={{ borderColor: 'var(--border)', background: 'var(--surface)', color: 'var(--bone-dim)' }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="18 15 12 9 6 15" />
              </svg>
            </button>
          </div>
        </div>

        {/* Middle Content Grid */}
        <div className="grid gap-10 py-12 lg:grid-cols-12">
          {/* Info Column */}
          <div className="lg:col-span-5">
            <h3 className="text-sm font-semibold uppercase tracking-widest" style={{ color: 'var(--accent)' }}>
              Location & Hours
            </h3>
            <ul className="mt-4 flex flex-col gap-3 text-sm">
              <li className="flex items-start gap-3" style={{ color: 'var(--bone-dim)' }}>
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md" style={{ background: 'rgba(212,149,106,0.1)', color: 'var(--accent)' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </span>
                <span>{dict.footer.address}</span>
              </li>
              <li className="flex items-start gap-3" style={{ color: 'var(--bone-dim)' }}>
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md" style={{ background: 'rgba(212,149,106,0.1)', color: 'var(--accent)' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                </span>
                <span>{dict.footer.hours}</span>
              </li>
            </ul>
          </div>

          {/* Nav Links Column */}
          <div className="lg:col-span-4">
            <h3 className="text-sm font-semibold uppercase tracking-widest" style={{ color: 'var(--accent)' }}>
              Quick Navigation
            </h3>
            <nav className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="transition-colors hover:text-accent hover:translate-x-0.5"
                  style={{ color: 'var(--bone-dim)' }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Action Column */}
          <div className="flex flex-col justify-between lg:col-span-3">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-widest" style={{ color: 'var(--accent)' }}>
                Reservation
              </h3>
              <p className="mt-2 text-xs leading-relaxed" style={{ color: 'var(--bone-dim)' }}>
                온라인 예약 또는 전화 문의로 빠르고 편리하게 안내해 드립니다.
              </p>
            </div>
            <Link
              href={getLocalizedPath('/reserve', lang)}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold transition-all duration-300 hover:scale-[1.02] hover:brightness-110"
              style={{
                background: 'linear-gradient(135deg, var(--accent), var(--accent-bright))',
                color: 'var(--ink)',
                boxShadow: '0 4px 20px -4px rgba(212,149,106,0.3)',
              }}
            >
              {dict.nav.reserve} →
            </Link>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="flex flex-col items-center justify-between gap-4 border-t pt-8 text-xs md:flex-row" style={{ borderColor: 'rgba(255,255,255,0.06)', color: 'var(--bone-mute)' }}>
          <p>{dict.footer.copyright}</p>
          <p className="text-[11px]">강남 역삼동 프라이빗 프리미엄 가라오케 · 정찰제 운영</p>
        </div>
      </div>
    </footer>
  )
}
