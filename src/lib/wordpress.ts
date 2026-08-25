/**
 * WordPress Headless API Integration Module
 *
 * Supports both REST API (WP v2) and WPGraphQL endpoints.
 * Add NEXT_PUBLIC_WORDPRESS_URL in .env.local to activate live WP integration.
 */

export interface WPPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content?: string
  date: string
  author?: string
  category?: string
  featuredImage?: string
}

export interface WPReview {
  id: string
  authorName: string
  rating: number // 1 ~ 5
  date: string
  content: string
  visitType?: string
}

const WP_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL

/**
 * Fetch Blog Posts from WordPress REST API (Fast 3s timeout with fallback)
 */
export async function getBlogPosts(): Promise<WPPost[]> {
  if (WP_URL) {
    try {
      const res = await fetch(`${WP_URL}/wp-json/wp/v2/posts?_embed&per_page=10`, {
        next: { revalidate: 60 },
        signal: AbortSignal.timeout(3000), // 3s timeout to prevent page delay
      })
      if (res.ok) {
        const posts = await res.json()
        if (Array.isArray(posts) && posts.length > 0) {
          return posts.map((p: any) => ({
            id: String(p.id),
            slug: p.slug,
            title: p.title?.rendered || '',
            excerpt: p.excerpt?.rendered?.replace(/<[^>]+>/g, '') || '',
            content: p.content?.rendered || '',
            date: p.date?.split('T')[0] || '',
            category: p._embedded?.['wp:term']?.[0]?.[0]?.name || '가이드',
            featuredImage: p._embedded?.['wp:featuredmedia']?.[0]?.source_url || undefined,
          }))
        }
      }
    } catch {
      // Fallback to demo content on error or timeout
    }
  }

  // Fallback demo data before WordPress connection with rich SEO content
  return [
    {
      id: '1',
      slug: 'gangnam-karaoke-pricing-guide',
      title: '강남 가라오케 주대 & 예약 이용 가이드 (2025 최신판)',
      excerpt: '바가지 요금 없이 합리적으로 이용하는 강남 달토의 투명 정찰제 주대 및 얼리버드 5만원 할인 혜택 총정리.',
      date: '2025-08-01',
      category: '이용가이드',
      author: 'AK 달토 공식 매니저',
      content: `
        <p>강남에서 가라오케나 프라이빗 룸을 찾으실 때 가장 걱정하시는 부분이 바로 <strong>기습적인 추가 요금과 불투명한 주대</strong>입니다. 강남 AK 달토(구 유앤미 리뉴얼)는 이러한 걱정을 덜어드리기 위해 100% 투명 정찰제를 운영하고 있습니다.</p>
        
        <h3>1. 기본 주대 및 안심 정찰제</h3>
        <p>AK 달토의 기본 주대는 <strong>150,000원</strong>으로 위스키, 계절 과일 안주, 음료 세트가 기본 포함되어 있습니다. 사전에 안내해 드린 견적 외에 추가금을 절대 요구하지 않는 0원 원칙을 지킵니다.</p>

        <h3>2. 얼리버드 5만원 할인 혜택</h3>
        <p>오후 9시 이전에 방문하시는 고객님께는 기본 주대에서 <strong>50,000원을 즉시 할인</strong>해 드려 100,000원에 기본 주류 세트를 이용하실 수 있습니다. 조금 일찍 방문하셔서 여유롭고 합리적으로 즐겨보세요.</p>

        <h3>3. 타임비(TC) 및 룸비(RT) 명확한 기준</h3>
        <p>아가씨 TC는 첫 타임 120,000원(연장 150,000원), 남성 스태프(선수) TC는 70,000원, 기본 룸비는 50,000원으로 투명하게 공개되어 퇴실 시 계산서 세부 내역을 꼼꼼히 확인해 드립니다.</p>

        <h3>4. 예약 및 방문 팁</h3>
        <p>365일 연중무휴 오후 6시부터 익일 오후 3시까지 운영되며, 사전 전화(010-5704-3097)를 주시면 원하시는 스타일과 규모에 맞춘 룸을 미리 세팅해 드립니다.</p>
      `,
    },
    {
      id: '2',
      slug: 'vip-business-entertainment-tips',
      title: '실패 없는 비즈니스 VIP 접대 룸 가라오케 선택법',
      excerpt: '거래처 귀빈을 모실 때 체크해야 할 룸 세팅, 수속 매끄러움, 고급 픽업 및 전담 매니저 배정 팁.',
      date: '2025-07-28',
      category: '비즈니스',
      author: 'AK 달토 VIP 의전팀',
      content: `
        <p>중요한 거래처 파트너나 VIP 귀빈을 모시는 비즈니스 접대 자리는 사소한 디테일 하나가 전체 결과를 좌우합니다. 10년 이상의 운영 노하우를 보유한 AK 달토의 VIP 의전 노하우를 소개합니다.</p>

        <h3>1. 품격 있는 공간과 최신 시설</h3>
        <p>서울 강남구 역삼동 삼정호텔에 위치하여 접근성과 보안성이 뛰어납니다. 최고급 음향 시설과 독립 방음 프라이빗 룸으로 중요한 대화가 새어나가지 않도록 철저히 관리됩니다.</p>

        <h3>2. 전담 실장 배정과 맞춤 케어</h3>
        <p>베테랑 실장이 사전에 바이어의 성향, 선호 주류, 모임 분위기를 파악하여 1:1 맞춤형 세팅을 진행합니다. 어색함 없는 매끄러운 분위기 연출을 보장합니다.</p>

        <h3>3. 외국인 바이어 응대 지원</h3>
        <p>영어, 중국어, 일본어 등 다국어 소통이 가능한 스태프와 시스템이 구축되어 있어 해외 VIP 손님 접대에도 안심하고 이용하실 수 있습니다.</p>
      `,
    },
    {
      id: '3',
      slug: 'group-party-karaoke-recommendation',
      title: '강남 회식 & 2차 모임 장소 추천: AK 달토 60개 룸 인프라',
      excerpt: '대규모 단체 인원도 여유롭게 수용 가능한 역삼동 프라이빗 룸과 회식 전용 주류 세트 구성 안내.',
      date: '2025-07-20',
      category: '모임안내',
      author: 'AK 달토 공식 매니저',
      content: `
        <p>강남 일대에서 10명 이상의 단체 인원이 2차 장소를 찾다 보면 룸 크기나 주류 비용 때문에 난감한 경우가 많습니다. AK 달토는 총 60개의 대형 프라이빗 룸을 완비하여 단체 모임에 최적화되어 있습니다.</p>

        <h3>1. 최대 20인 이상 수용 가능한 대형 룸</h3>
        <p>소규모 파티룸부터 대형 단체 연회 룸까지 다양한 구조의 룸을 보유하여 팀 회식, 동호회, 생일 파티 등 모임 성격에 맞는 완벽한 공간을 제공합니다.</p>

        <h3>2. 편리한 위치와 무료 발렛 주차</h3>
        <p>신논현역 4번 출구 도보 3분, 강남역 11번 출구 도보 8분 거리로 대중교통 이용이 매우 편리하며, 삼정호텔 주차장 무료 발렛 서비스를 지원합니다.</p>
      `,
    },
  ]
}

/**
 * Fetch a single blog post by slug
 */
export async function getBlogPostBySlug(slug: string): Promise<WPPost | null> {
  const posts = await getBlogPosts()
  const post = posts.find((p) => p.slug === slug)
  if (post) return post

  if (WP_URL) {
    try {
      const res = await fetch(`${WP_URL}/wp-json/wp/v2/posts?slug=${encodeURIComponent(slug)}&_embed`, {
        next: { revalidate: 60 },
        signal: AbortSignal.timeout(3000),
      })
      if (res.ok) {
        const results = await res.json()
        if (Array.isArray(results) && results.length > 0) {
          const p = results[0]
          return {
            id: String(p.id),
            slug: p.slug,
            title: p.title?.rendered || '',
            excerpt: p.excerpt?.rendered?.replace(/<[^>]+>/g, '') || '',
            content: p.content?.rendered || '',
            date: p.date?.split('T')[0] || '',
            category: p._embedded?.['wp:term']?.[0]?.[0]?.name || '가이드',
            featuredImage: p._embedded?.['wp:featuredmedia']?.[0]?.source_url || undefined,
          }
        }
      }
    } catch {
      // Fallback
    }
  }

  return null
}

/**
 * Fetch Customer Reviews from WordPress or Fallback
 */
export async function getCustomerReviews(): Promise<WPReview[]> {
  if (WP_URL) {
    try {
      const res = await fetch(`${WP_URL}/wp-json/wp/v2/reviews?per_page=10`, {
        next: { revalidate: 60 },
        signal: AbortSignal.timeout(3000), // 3s timeout
      })
      if (res.ok) {
        const reviews = await res.json()
        if (Array.isArray(reviews) && reviews.length > 0) {
          return reviews.map((r: any) => ({
            id: String(r.id),
            authorName: r.title?.rendered || '고객님',
            rating: Number(r.acf?.rating || 5),
            date: r.date?.split('T')[0] || '',
            content: r.content?.rendered?.replace(/<[^>]+>/g, '') || '',
            visitType: r.acf?.visit_type || '방문 고객',
          }))
        }
      }
    } catch {
      // Fallback to demo content on error or timeout
    }
  }

  // Fallback demo customer reviews
  return [
    {
      id: 'r1',
      authorName: '김OO 대표님',
      rating: 5,
      date: '2025-08-02',
      visitType: '비즈니스 VIP 접대',
      content: '중요한 일본 거래처 바이오 관계자분들을 모시고 방문했는데, 실장님의 노련한 안내와 깔끔한 룸 분위기 덕분에 접대를 성공적으로 마쳤습니다. 정찰제라 더 안심되었습니다.',
    },
    {
      id: 'r2',
      authorName: '박OO 이사님',
      rating: 5,
      date: '2025-07-29',
      visitType: '팀 회식 2차',
      content: '팀원들 12명 단체로 2차 방문했습니다. 룸이 정말 넓고 음향 시설이 최고입니다. 9시 이전 입장이어서 5만원 할인 혜택까지 제대로 챙겼네요.',
    },
    {
      id: 'r3',
      authorName: '이OO 고객님',
      rating: 5,
      date: '2025-07-25',
      visitType: '친구들과 생일파티',
      content: '친구 생일이라 방문했는데 아가씨분들도 너무 다정하고 세심하게 챙겨주셔서 분위기가 너무 좋았습니다. 강남에서 가라오케 갈 땐 앞으로 달토만 올 것 같아요.',
    },
    {
      id: 'r4',
      authorName: '최OO 대표님',
      rating: 5,
      date: '2025-07-18',
      visitType: '귀빈 단독 방문',
      content: '혼자 가볍게 주류와 여유를 즐기러 들렀는데 눈치 보이지 않고 편안하게 대해주셔서 감동이었습니다. 주대 투명한 점이 가장 마음에 듭니다.',
    },
  ]
}
