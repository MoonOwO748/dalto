'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { getDictionary } from '@/app/[lang]/dictionaries'
import { getLocalizedPath } from '@/lib/routes'

type Dict = Awaited<ReturnType<typeof getDictionary>>

const LOCALES = [
  { code: 'ko', label: '한국어' },
  { code: 'en', label: 'EN' },
  { code: 'zh', label: '中文' },
  { code: 'ja', label: '日本語' },
]

interface Props {
  dict: Dict
  lang: string
}

export function Header({ dict, lang }: Props) {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname() || '/'

  // Extract clean subpath without current language prefix
  const cleanSubPath = pathname.replace(/^\/(?:en|zh|ja|ko)(?=\/|$)/, '') || '/'

  const navLinks = [
    { href: getLocalizedPath('/pricing', lang), label: dict.nav.pricing },
    { href: getLocalizedPath('/events', lang),  label: dict.nav.events },
    { href: getLocalizedPath('/howto', lang),   label: dict.nav.howto },
    { href: getLocalizedPath('/access', lang),  label: dict.nav.access },
    { href: getLocalizedPath('/faq', lang),     label: dict.nav.faq },
    { href: getLocalizedPath('/blog', lang),    label: dict.nav.blog },
  ]

  const homeHref = getLocalizedPath('/', lang)
  const reserveHref = getLocalizedPath('/reserve', lang)

  return (
    <header className="mx-auto w-full max-w-[1440px] px-4 pt-3 sm:px-8 md:px-12 lg:px-16 sm:pt-5">
      <div
        className="relative flex items-center justify-between rounded-full border py-2 pl-4 pr-3 md:py-2.5 md:pl-5 md:pr-3"
        style={{
          borderColor: 'var(--border)',
          background: 'rgba(12,12,12,0.75)',
          backdropFilter: 'blur(12px)',
        }}
      >
        {/* Logo */}
        <Link
          href={homeHref}
          aria-label="AK 달토"
          className="group flex shrink-0 items-center gap-2 leading-none"
        >
          <span
            className="font-display text-lg font-bold tracking-tight transition-colors group-hover:text-gold"
            style={{ color: 'var(--bone)' }}
          >
            AK DALTO
          </span>
          <span className="text-xs tracking-wide transition-colors group-hover:text-bone" style={{ color: 'var(--bone-dim)' }}>
            가라오케
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav aria-label="Primary" className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="whitespace-nowrap text-sm transition-colors hover:text-bone"
              style={{ color: 'var(--bone-dim)' }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex shrink-0 items-center gap-2 md:gap-3">
          {/* Desktop language switcher */}
          <nav aria-label="Language" className="hidden items-center gap-1 text-xs lg:flex">
            {LOCALES.map((l) => (
              <Link
                key={l.code}
                href={getLocalizedPath(cleanSubPath, l.code)}
                hrefLang={l.code}
                aria-current={l.code === lang ? 'page' : undefined}
                className="px-1.5 py-2 tracking-widest uppercase transition-colors"
                style={{ color: l.code === lang ? 'var(--accent)' : 'var(--bone-dim)' }}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Reserve button */}
          <Link
            href={reserveHref}
            className="hidden whitespace-nowrap rounded-full px-4 py-2 text-xs font-medium transition-colors hover:brightness-110 sm:inline-block"
            style={{ background: 'var(--accent)', color: 'var(--ink)' }}
          >
            {dict.nav.reserve}
          </Link>

          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label={menuOpen ? dict.nav.close_menu : dict.nav.open_menu}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-[5px]"
          >
            <span
              className="block h-[1.5px] w-6 transition-transform duration-200"
              style={{
                background: 'var(--bone)',
                transform: menuOpen ? 'translateY(6.5px) rotate(45deg)' : 'none',
              }}
            />
            <span
              className="block h-[1.5px] w-6 transition-opacity duration-200"
              style={{ background: 'var(--bone)', opacity: menuOpen ? 0 : 1 }}
            />
            <span
              className="block h-[1.5px] w-6 transition-transform duration-200"
              style={{
                background: 'var(--bone)',
                transform: menuOpen ? 'translateY(-6.5px) rotate(-45deg)' : 'none',
              }}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {menuOpen && (
        <div
          className="mt-2 rounded-2xl border p-4"
          style={{
            borderColor: 'var(--border)',
            background: 'rgba(12,12,12,0.95)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-4 py-3 text-sm transition-colors hover:text-bone"
                style={{ color: 'var(--bone-dim)' }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 border-t pt-4" style={{ borderColor: 'var(--border)' }}>
            {/* Language row */}
            <div className="flex items-center gap-3 px-2">
              {LOCALES.map((l) => (
                <Link
                  key={l.code}
                  href={getLocalizedPath(cleanSubPath, l.code)}
                  hrefLang={l.code}
                  onClick={() => setMenuOpen(false)}
                  className="text-xs tracking-widest uppercase transition-colors"
                  style={{ color: l.code === lang ? 'var(--accent)' : 'var(--bone-dim)' }}
                >
                  {l.label}
                </Link>
              ))}
            </div>
            <Link
              href={reserveHref}
              onClick={() => setMenuOpen(false)}
              className="mt-3 flex w-full items-center justify-center rounded-full py-3 text-sm font-medium transition-colors hover:brightness-110"
              style={{ background: 'var(--accent)', color: 'var(--ink)' }}
            >
              {dict.nav.reserve}
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
