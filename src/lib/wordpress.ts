/** WordPress integration for customer reviews only. Blog posts live in src/content/blog/posts.json. */

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
