import type { getDictionary } from '@/app/[lang]/dictionaries'

type Dict = Awaited<ReturnType<typeof getDictionary>>

interface Props { dict: Dict }

export function FaqSection({ dict }: Props) {
  const f = dict.faq

  return (
    <section className="scroll-reveal px-4 pt-16 sm:px-8 md:px-12 lg:px-16 md:pt-28 lg:pt-32">
      <header className="max-w-3xl">
        <div className="flex items-center gap-3">
          <span className="accent-line" />
          <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: 'var(--accent)' }}>
            {f.label}
          </p>
        </div>
        <h2 className="mt-4 text-[2.25rem] font-bold leading-[1.05] tracking-tight md:text-5xl" style={{ color: 'var(--bone)' }}>
          {f.title}
        </h2>
      </header>

      {/* FAQ items — card-based instead of divider-based */}
      <div className="mt-10 flex flex-col gap-3">
        {f.items.map((item, i) => (
          <details
            key={i}
            className="group rounded-xl border border-[var(--border)] bg-[var(--surface)] transition-all duration-300 open:border-[rgba(212,149,106,0.2)] open:bg-[rgba(212,149,106,0.03)]"
          >
            <summary
              id={`faq-btn-${i}`}
              className="flex w-full cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left text-sm font-medium text-bone-dim transition-colors group-open:text-bone md:px-6 md:py-5 md:text-base [&::-webkit-details-marker]:hidden"
            >
              <span className="flex items-center gap-3">
                <span
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-[10px] font-bold"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    color: 'var(--accent)',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                {item.q}
              </span>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="shrink-0 transition-transform duration-300 group-open:rotate-180"
                style={{ color: 'var(--accent)' }}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </summary>
            <div
              id={`faq-answer-${i}`}
              role="region"
              aria-labelledby={`faq-btn-${i}`}
              className="px-5 pb-5 pl-14 text-sm leading-relaxed md:px-6 md:pb-6 md:pl-[60px] md:text-[15px]"
              style={{ color: 'var(--bone-dim)' }}
            >
              {item.a}
            </div>
          </details>
        ))}
      </div>
    </section>
  )
}
