import Image from 'next/image'
import Link from 'next/link'
import { getBlogPosts } from '@/lib/blog'
import { getLocalizedPath, type Locale } from '@/lib/routes'
import { BlogArrow, BlogCarousel } from './BlogCarousel'
import styles from './BlogSection.module.css'

const copy = {
  ko: { title: ['좋은 시간을 위한,', '작은 가이드'], intro: ['처음 방문하는 순간부터 돌아가는 길까지.', '달토의 이야기를 먼저 만나보세요.'], all: '블로그 전체 보기', read: '이야기 읽기', list: '블로그 글 목록. 좌우로 넘겨보세요', previous: '이전 블로그 글', next: '다음 블로그 글', hint: '방문 전, 궁금했던 이야기들을 넘겨보세요', fallback: '방문을 위한 작은 가이드' },
  en: { title: ['A little guide', 'to a great time'], intro: ['From your first visit to the journey home.', 'Get to know Dalto before you arrive.'], all: 'View all stories', read: 'Read story', list: 'Blog stories. Scroll left or right', previous: 'Previous stories', next: 'Next stories', hint: 'A little reading before your visit', fallback: 'A guide to your visit' },
  zh: { title: ['美好时光，', '从这份指南开始'], intro: ['从初次到访，到尽兴而归。', '提前了解 Dalto 的故事。'], all: '查看全部文章', read: '阅读文章', list: '博客文章列表，可左右滑动', previous: '上一篇文章', next: '下一篇文章', hint: '到访前，看看您关心的话题', fallback: '到访实用指南' },
  ja: { title: ['素敵な時間のための、', '小さなガイド'], intro: ['初めてのご来店から、お帰りの時間まで。', 'Dalto のストーリーをお届けします。'], all: 'すべての記事を見る', read: '記事を読む', list: 'ブログ記事一覧。左右にスクロールできます', previous: '前の記事', next: '次の記事', hint: 'ご来店前に、気になる情報をチェック', fallback: 'ご来店のための小さなガイド' },
}

export async function BlogSection({ lang }: { lang: Locale }) {
  const posts = (await getBlogPosts()).slice(0, 6)
  if (!posts.length) return null
  const text = copy[lang]

  return (
    <section className={styles.section} aria-labelledby="home-blog-title">
      <header className={styles.header}>
        <div>
          <div className={styles.eyebrow}><span /> DALTO JOURNAL</div>
          <h2 id="home-blog-title">{text.title[0]}{' '}<br className={styles.mobileBreak} />{text.title[1]}<span>.</span></h2>
          <p className={styles.intro}>{text.intro[0]}{' '}<br className={styles.mobileBreak} />{text.intro[1]}</p>
        </div>
        <Link className={styles.all} href={getLocalizedPath('/blog', lang)}>{text.all}<BlogArrow /></Link>
      </header>
      <BlogCarousel count={posts.length} labels={{ list: text.list, previous: text.previous, next: text.next, hint: text.hint }}>
        {posts.map((post, index) => (
          <article className={styles.card} key={post.id}>
            <Link href={getLocalizedPath(`/blog/${post.slug}`, lang)}>
              <div className={styles.visual}>
                {post.featuredImage ? <Image src={post.featuredImage} alt={post.images?.find(image => image.src === post.featuredImage)?.alt ?? post.title} fill sizes="(max-width: 600px) 85vw, (max-width: 1000px) 44vw, (max-width: 1440px) 31vw, 420px" /> :
                  <div className={styles.placeholder} aria-hidden="true"><span>AK DALTO JOURNAL</span><strong>{post.category === '비즈니스' ? 'Business.' : post.category === '모임안내' ? 'Together.' : 'Guide.'}</strong><span>{text.fallback} · {String(index + 1).padStart(2, '0')}</span></div>}
                {index === 0 && <span className={styles.latest}>LATEST STORY</span>}
                <span className={styles.imageArrow}><BlogArrow /></span>
              </div>
              <div className={styles.copy}>
                <div className={styles.meta}><span lang="ko">{post.category || '가이드'}</span><time dateTime={post.date}>{post.date.replaceAll('-', '.')}</time></div>
                <h3 lang="ko">{post.title}</h3>
                <p lang="ko">{post.excerpt}</p>
                <div className={styles.read}>{text.read}<BlogArrow /></div>
              </div>
            </Link>
          </article>
        ))}
      </BlogCarousel>
    </section>
  )
}
