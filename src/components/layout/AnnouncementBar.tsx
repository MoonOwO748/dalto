import Link from 'next/link'
import type { getDictionary } from '@/app/[lang]/dictionaries'
import { getLocalizedPath } from '@/lib/routes'

type Dict = Awaited<ReturnType<typeof getDictionary>>

interface Props {
  dict: Dict
  lang: string
}

export function AnnouncementBar({ dict, lang }: Props) {
  const text = dict.announcement
  const repeated = Array(6).fill(text)

  return (
    <div className="relative isolate overflow-hidden border-b" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
      {/* Gradient flow background */}
      <div aria-hidden="true" className="gradient-flow-bg absolute inset-0 -z-10" />
      <div aria-hidden="true" className="absolute inset-0 -z-10" style={{ background: 'rgba(0,0,0,0.25)' }} />

      <div className="mx-auto flex w-full max-w-[1440px] items-center gap-3 py-1.5 pl-3 pr-2 sm:pl-5 sm:pr-3">
        {/* Marquee */}
        <div
          className="relative min-w-0 flex-1 overflow-hidden"
          style={{ maskImage: 'linear-gradient(to right, transparent, #000 4%, #000 94%, transparent)' }}
        >
          <div className="marquee-x flex w-max items-center">
            {repeated.map((t, i) => (
              <span
                key={i}
                aria-hidden={i > 0}
                className="flex items-center gap-2 whitespace-nowrap pr-10 text-xs font-semibold text-white sm:text-sm"
              >
                <span aria-hidden="true" className="flex items-center text-white/70">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                </span>
                {t}
              </span>
            ))}
          </div>
        </div>

        <Link
          href={getLocalizedPath('/pricing', lang)}
          className="shrink-0 whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-bold transition-colors hover:text-white"
          style={{
            background: 'rgba(12,12,12,0.85)',
            color: 'var(--accent)',
            boxShadow: '0 0 0 1px rgba(255,255,255,0.25)',
            backdropFilter: 'blur(8px)',
          }}
        >
          {dict.announcement_cta} <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  )
}
