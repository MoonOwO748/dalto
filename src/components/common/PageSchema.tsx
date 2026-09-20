import type { getDictionary } from '@/app/[lang]/dictionaries'
import { BASE_URL, getLocalizedUrl } from '@/lib/routes'
import type { BlogPost } from '@/lib/blog'

type Dict = Awaited<ReturnType<typeof getDictionary>>
type Page = 'pricing' | 'events' | 'howto' | 'access' | 'faq' | 'blog'
type SchemaNode = Record<string, unknown>

interface Props {
  page: Page
  lang: string
  dict: Dict
  posts?: BlogPost[]
}

export function PageSchema({ page, lang, dict, posts = [] }: Props) {
  const url = getLocalizedUrl(`/${page}`, lang)
  const business = { '@id': `${BASE_URL}/#business` }
  const language = lang === 'zh' ? 'zh-CN' : lang
  const name = `${lang === 'ko' ? '강남 달토' : 'AK Dalto'} ${dict.nav[page]}`
  const breadcrumb = {
    '@type': 'BreadcrumbList',
    '@id': `${url}#breadcrumb`,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: lang === 'ko' ? '홈' : 'Home', item: getLocalizedUrl('/', lang) },
      { '@type': 'ListItem', position: 2, name: dict.nav[page], item: url },
    ],
  }
  const webPage: SchemaNode = {
    '@type': page === 'faq' ? 'FAQPage' : page === 'blog' || page === 'events' ? 'CollectionPage' : 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name,
    inLanguage: language,
    isPartOf: { '@id': `${BASE_URL}/#website` },
    about: business,
    breadcrumb: { '@id': `${url}#breadcrumb` },
  }
  const graph: SchemaNode[] = [webPage, breadcrumb]
  const addEntity = (entity: SchemaNode) => {
    webPage.mainEntity = { '@id': entity['@id'] }
    graph.push(entity)
  }

  if (page === 'pricing') {
    const p = dict.pricing
    // These are individual charges, not an all-inclusive visit price.
    const charges = [
      { name: p.base, amount: p.base_price, description: p.base_unit },
      { name: `${p.base} · ${p.discount}`, amount: p.discount_price, description: p.discount_desc },
      { name: p.rt_room, amount: p.rt_room_price, description: p.calc_note },
    ]
    addEntity({
      '@type': 'OfferCatalog', '@id': `${url}#offers`, name: p.title,
      itemListElement: charges.map((charge) => ({
        '@type': 'Offer', name: charge.name, description: charge.description,
        url, seller: business,
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: Number(charge.amount.replace(/[^0-9]/g, '')), priceCurrency: 'KRW',
          description: `${charge.description} ${p.calc_note}`,
        },
        itemOffered: { '@type': 'Service', name: charge.name, provider: business },
      })),
    })
  } else if (page === 'events') {
    // Ongoing promotions have no scheduled event dates or ticket inventory.
    addEntity({
      '@type': 'OfferCatalog', '@id': `${url}#offers`, name: dict.events.title,
      itemListElement: dict.events.items.map((item) => ({
        '@type': 'Offer', name: item.title, description: `${item.desc} ${dict.events.cta_note}`,
        url, seller: business,
        itemOffered: { '@type': 'Service', name: item.title, provider: business },
      })),
    })
  } else if (page === 'howto') {
    addEntity({
      '@type': 'HowTo', '@id': `${url}#howto`, name: dict.howto.title,
      description: dict.howto.subtitle, inLanguage: language,
      step: dict.guide.steps.map((step, index) => ({
        '@type': 'HowToStep', position: index + 1, name: step.title, text: step.desc,
      })),
    })
  } else if (page === 'access') {
    webPage.description = [dict.access.address, dict.access.hours, ...dict.access.subway].join('. ')
    webPage.mainEntity = business
    graph.push({
      ...business, '@type': 'NightClub', name: '강남 달토',
      hasMap: 'https://map.kakao.com/?q=서울+강남구+역삼동+604-11',
    })
  } else if (page === 'faq') {
    webPage.mainEntity = dict.faq.items.map((item) => ({
      '@type': 'Question', name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    }))
  } else if (page === 'blog') {
    addEntity({
      '@type': 'Blog', '@id': `${url}#blog`, url, name, inLanguage: language,
      publisher: business,
      blogPost: posts.map((post) => ({
        '@type': 'BlogPosting',
        '@id': `${getLocalizedUrl(`/blog/${post.slug}`, lang)}#article`,
        url: getLocalizedUrl(`/blog/${post.slug}`, lang),
        headline: post.title, description: post.excerpt,
        ...(post.date ? { datePublished: post.date } : {}),
      })),
    })
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c') }}
    />
  )
}
