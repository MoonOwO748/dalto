import type { getDictionary } from '@/app/[lang]/dictionaries'
import type { Locale } from '@/lib/routes'
import './HomeSections.css'

type Dict = Awaited<ReturnType<typeof getDictionary>>

export function HomeInformationSections({ dict, lang }: { dict: Dict; lang: Locale }) {
  const ko = lang === 'ko'
  const { system, why_us: why, guide, who_is_it_for: who } = dict
  return <>
    <section className="home-redesign section system" aria-labelledby="home-system-title">
      <header><div className="eyebrow"><i />{system.label}</div>
        <h2 id="home-system-title">{ko ? <>기준은 명확하게,<br />이용은 편안하게<span>.</span></> : system.title}</h2>
        <p>{system.subtitle}</p><div className="side-note">DALTO STANDARD <span>01 — 04</span></div>
      </header>
      <ol className="rules">{system.items.map((item, i) => <li key={item.title}><span className="num" aria-hidden="true">0{i + 1}</span><div><h3>{item.title}</h3><p>{item.desc}</p></div></li>)}</ol>
    </section>
    <section className="home-redesign section why" aria-labelledby="home-why-title">
      <div className="why-top"><header><div className="eyebrow"><i />{why.label}</div>
        <h2 id="home-why-title">{ko ? <>오래 찾게 되는 곳에는<br /><em>이유가 있습니다.</em></> : why.title}</h2><p>{why.subtitle}</p>
      </header><div className="why-reasons">{why.features.slice(0, 2).map((item, i) => <div key={item.num}><span className="tiny">0{i + 1} / {i === 0 ? 'EXPERIENCE' : 'HOSPITALITY'}</span><h3>{item.title}</h3><p>{item.desc}</p></div>)}</div></div>
      <div className="facts">{why.features.slice(2).map((item, i) => <div key={item.num}>
        <span className="tiny">{['TRANSPARENT PRICING', 'ALWAYS OPEN', 'CLOSE TO YOU'][i]}</span>
        <strong className={i === 0 && !ko ? 'currency-fact' : undefined}>{i === 0 ? (ko ? <>15<span>만원</span></> : <>₩ 150,000</>) : i === 1 ? <>365<span>{ko ? '일' : 'DAYS'}</span></> : <>3<b className="range-dash">–</b>5<span>{ko ? '분' : 'MIN'}</span></>}</strong>
        <h3>{item.title}</h3><p>{ko ? ['오후 9시 이전 방문 시 기본 주대 5만원 할인.', '매일 오후 6시부터 익일 오후 3시까지.', '신논현역 4번 출구 기준 도보 거리. 강남역 11번 출구에서는 도보 약 8분.'][i] : item.desc}</p>
      </div>)}</div>
    </section>
    <section className="home-redesign section journey" aria-labelledby="home-guide-title"><header>
      <div className="eyebrow"><i />{guide.label}</div><h2 id="home-guide-title">{ko ? <>처음이어도, 자연스럽게<span>.</span></> : guide.title}</h2><p>{guide.subtitle}</p>
      </header><ol className="timeline">{guide.steps.map((step, i) => <li key={step.step}><div className="step" aria-hidden="true"><span>0{i + 1}</span><i /></div><h3>{step.title}</h3><p>{step.desc}</p></li>)}</ol>
    </section>
    <section className="home-redesign section who" aria-labelledby="home-who-title"><header>
      <div className="eyebrow"><i />{who.label}</div><h2 id="home-who-title">{ko ? <>각자의 자리, 각자의 시간<span>.</span></> : who.title}</h2><p>{who.subtitle}</p>
      </header><div className="occasions">{who.targets.map((item, i) => <article key={item.title}><div><span className="tiny">{['BUSINESS', 'TOGETHER', 'CELEBRATION', 'YOUR OWN TIME'][i]}</span><h3>{item.title}</h3><p>{item.desc}</p></div></article>)}</div>
    </section>
  </>
}
