import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

// Existing articles are preserved; all newly published articles use the new policy.
const legacy = new Set(['gangnam-karaoke-pricing-guide', 'vip-business-entertainment-tips', 'group-party-karaoke-recommendation'])
export function visibleText(html) {
  return html.replace(/<[^>]*>/g, ' ').replace(/&(?:[a-z]+|#\d+|#x[\da-f]+);/gi, ' ').replace(/\s+/g, ' ').trim()
}
export function publicationWeek(date) {
  const day = new Date(`${date}T00:00:00Z`)
  day.setUTCDate(day.getUTCDate() - ((day.getUTCDay() + 6) % 7))
  return day.toISOString().slice(0, 10)
}

export function validatePosts(posts, root = process.cwd()) {
  assert(Array.isArray(posts), 'Posts must be an array')
  const slugs = new Set(), ids = new Set(), weeks = new Set(), keywords = new Set()
  for (const p of posts) {
    const check = (ok, message) => assert(ok, `${p.slug ?? 'Unknown post'}: ${message}`)
    for (const key of ['id', 'slug', 'title', 'excerpt', 'content', 'date']) check(typeof p[key] === 'string' && p[key].trim(), `Missing ${key}`)
    check(/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(p.slug), 'Invalid slug')
    check(!slugs.has(p.slug) && !ids.has(p.id), 'Duplicate slug or id')
    slugs.add(p.slug); ids.add(p.id)
    check(/^\d{4}-\d{2}-\d{2}$/.test(p.date) && !Number.isNaN(Date.parse(p.date)) && new Date(p.date).toISOString().slice(0, 10) === p.date, 'Invalid publication date')
    // Content is trusted repository HTML, but executable markup is never allowed.
    check(!/<\s*(script|iframe|object|embed|style|svg|form)\b|\bon\w+\s*=|javascript\s*:/i.test(p.content), 'Unsafe article HTML')
    if (legacy.has(p.slug)) continue
    const text = visibleText(p.content)
    check(text.length >= 2700 && text.length <= 3300, `Body must contain 2700–3300 characters including spaces; got ${text.length}`)
    check(text.includes('강남 달토') && text.includes('강남 가라오케'), 'Both seed keywords must appear naturally in the body')
    check(typeof p.primaryKeyword === 'string' && /강남 (달토|가라오케).+/.test(p.primaryKeyword), 'Missing long-tail primary keyword')
    check(!keywords.has(p.primaryKeyword), 'Duplicate primary keyword')
    keywords.add(p.primaryKeyword)
    check(p.title.includes(p.primaryKeyword), 'Title must contain the primary keyword')
    check(Array.isArray(p.secondaryKeywords) && p.secondaryKeywords.length >= 2, 'At least two supporting keywords required')
    check(p.publicationWeek === publicationWeek(p.date), 'publicationWeek must be the Monday of the publication week')
    check(!weeks.has(p.publicationWeek), 'Only one new post per week')
    weeks.add(p.publicationWeek)
    check(Boolean(p.author && p.category), 'Author and category required')
    check(Array.isArray(p.images) && p.images.length >= 2, 'At least two images required')
    const sources = new Set()
    for (const img of p.images) {
      check(typeof img.src === 'string' && img.src.startsWith(`/blog/${p.slug}/`) && !img.src.includes('..') && !img.src.includes('\\') && /\.(webp|png|jpe?g)$/i.test(img.src), 'Images must be local raster files in the article directory')
      check(typeof img.alt === 'string' && img.alt.trim().length >= 5, 'Descriptive image alt text required')
      check(!sources.has(img.src), 'Images must be distinct')
      sources.add(img.src)
      const file = path.join(root, 'public', img.src.slice(1))
      check(existsSync(file) && readFileSync(file).length > 0, `Missing image: ${img.src}`)
      const tags = p.content.match(/<img\b[^>]*>/gi) ?? []
      check(tags.some(tag => tag.includes(`src="${img.src}"`) && tag.includes(`alt="${img.alt}"`)), 'Every image must appear in the body with matching alt text')
    }
    check(sources.has(p.featuredImage), 'Featured image must be one of the body images')
    check((p.content.match(/<h[23]\b/gi) ?? []).length >= 3, 'At least three section headings required')
    const links = [...p.content.matchAll(/href="(\/(?:pricing|access|reserve|howto|faq|events)(?:#[^"]*)?)"/g)]
    check(new Set(links.map(m => m[1])).size >= 2, 'At least two relevant internal links required')
  }
  return posts.length
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const posts = JSON.parse(readFileSync('src/content/blog/posts.json', 'utf8'))
  console.log(`Blog validation passed: ${validatePosts(posts)} articles`)
}
