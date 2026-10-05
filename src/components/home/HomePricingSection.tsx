'use client'

import { useState } from 'react'
import type { getDictionary } from '@/app/[lang]/dictionaries'
import type { Locale } from '@/lib/routes'
import './HomeSections.css'

type Dict = Awaited<ReturnType<typeof getDictionary>>
const money = (amount: number) => `₩ ${amount.toLocaleString('ko-KR')}`
const spaceCurrency = (label: string) => label.replace(/₩\s*/g, '₩ ')
const labels = {
  ko: { first: '첫 타임 기준', extra: '추가 타임당', per: '타임당', item: '이용 항목', rate: '요금 기준', set: '위스키 + 안주 + 음료 세트', discount: '기본 주대 5만원 할인', call: '이 견적으로 전화 예약 문의', people: '명' },
  en: { first: 'First session', extra: 'Additional session', per: 'Per session', item: 'Item', rate: 'Rate', set: 'Whiskey + snacks + drinks', discount: '₩ 50,000 off the basic set', call: 'Call about this estimate', people: 'guests' },
  zh: { first: '首次时段', extra: '每个追加时段', per: '每时段', item: '消费项目', rate: '费用标准', set: '威士忌 + 小吃 + 饮料', discount: '基本酒水费优惠 ₩ 50,000', call: '致电咨询此估价', people: '人' },
  ja: { first: '最初のタイム', extra: '追加タイムごと', per: '1タイムごと', item: '利用項目', rate: '料金', set: 'ウイスキー + おつまみ + ドリンク', discount: '基本料金から ₩ 50,000 割引', call: 'この見積りで電話相談', people: '名' },
}

export function HomePricingSection({ dict, lang }: { dict: Dict; lang: Locale }) {
  const p = dict.pricing
  const text = labels[lang]
  const [people, setPeople] = useState(2)
  const [hours, setHours] = useState(2)
  const [early, setEarly] = useState(true)
  const [partner, setPartner] = useState<'girl' | 'boy' | 'none'>('girl')
  const tc = partner === 'girl' ? (120000 + (hours - 1) * 150000) * people : partner === 'boy' ? 70000 * hours * people : 0
  const total = (early ? 100000 : 150000) + tc + 50000

  return <section className="home-redesign section pricing" aria-labelledby="home-pricing-title">
    <header><div className="eyebrow"><i />{p.label}</div><h2 id="home-pricing-title">{lang === 'ko' ? <>한눈에 보는 요금,<br className="mobile" /> 미리 맞춰보는 예산<span>.</span></> : p.title}</h2><p>{p.subtitle}</p></header>
    <div className="price-menu"><div className="base-price"><span className="tiny">BASIC SET / {p.base}</span><div className="big-price"><small>₩</small>{' '}150,000</div><p>{text.set}</p><div className="early"><span>{p.discount_desc}</span><strong>{money(100000)}</strong><small>{text.discount}</small></div></div>
      <div className="rate-table" role="table" aria-label={p.title}>
        <div className="table-head" role="row"><span role="columnheader">{text.item}</span><span role="columnheader">{text.rate}</span></div>
        <div role="row"><span role="cell">{p.tc_girl}<small>{text.first}</small></span><strong role="cell">{money(120000)}</strong></div>
        <div role="row"><span role="cell">{p.tc_girl}</span><strong role="cell"><small className="rate-prefix">{text.extra}</small>{money(150000)}</strong></div>
        <div role="row"><span role="cell">{p.tc_boy}</span><strong role="cell"><small className="rate-prefix">{text.per}</small>{money(70000)}</strong></div>
        <div role="row"><span role="cell">{p.rt_room}</span><strong role="cell">{money(50000)}</strong></div>
      </div>
    </div>
    <div className="calculator"><div className="calc-heading"><h3>{p.calculator_title}</h3><span>ESTIMATE YOUR VISIT</span></div>
      <div className="calc-grid"><div>
        <fieldset><legend>01 <span>{p.calc_time_slot}</span></legend><div className="radio-line"><label><input type="radio" name="home-time" checked={early} onChange={() => setEarly(true)} />{p.calc_early}</label><label><input type="radio" name="home-time" checked={!early} onChange={() => setEarly(false)} />{p.calc_normal}</label></div></fieldset>
        <div className="ranges"><label htmlFor="home-people">02 <span>{p.calc_people}</span><output>{people}{text.people}</output><input id="home-people" type="range" min="1" max="10" value={people} onChange={e => setPeople(Number(e.target.value))} /></label><label htmlFor="home-hours">03 <span>{p.calc_hours}</span><output>{hours}T</output><input id="home-hours" type="range" min="1" max="6" value={hours} onChange={e => setHours(Number(e.target.value))} /></label></div>
        <fieldset><legend>04 <span>{p.calc_partner_type}</span></legend><div className="radio-line partners">{(['girl', 'boy', 'none'] as const).map(value => <label key={value}><input type="radio" name="home-partner" checked={partner === value} onChange={() => setPartner(value)} />{spaceCurrency(value === 'girl' ? p.calc_partner_girl : value === 'boy' ? p.calc_partner_boy : p.calc_partner_none)}</label>)}</div></fieldset>
      </div><div className="estimate-result"><span className="tiny">ESTIMATED TOTAL</span><h4>{p.calc_estimated_total}</h4><dl>
        <div><dt>{p.base}</dt><dd>{money(150000)}</dd></div><div><dt>{p.discount}</dt><dd>{early ? `−${money(50000)}` : money(0)}</dd></div><div><dt>{partner === 'girl' ? p.tc_girl : partner === 'boy' ? p.tc_boy : p.calc_partner_none}</dt><dd>{money(tc)}</dd></div><div><dt>{p.rt_room}</dt><dd>{money(50000)}</dd></div>
      </dl><output aria-live="polite" aria-label={p.calc_estimated_total}>{money(total)}</output><a href="tel:+821057043097">{text.call}<span aria-hidden="true">↗</span></a></div></div><p className="calc-note">{p.calc_note}</p>
    </div>
  </section>
}
