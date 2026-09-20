import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, mkdirSync, copyFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { validatePosts, publicationWeek, visibleText } from './validate-blog.mjs'

test('weekly publishing rejects incomplete articles and duplicate weeks', () => {
  const root = mkdtempSync(path.join(tmpdir(), 'dalto-blog-test-'))
  try {
    const slug = 'gangnam-dalto-first-visit'
    const imageDir = path.join(root, 'public', 'blog', slug)
    mkdirSync(imageDir, { recursive: true })
    copyFileSync('public/hero.jpg', path.join(imageDir, 'one.jpg'))
    copyFileSync('public/og/default.jpg', path.join(imageDir, 'two.jpg'))
    const images = [
      { src: `/blog/${slug}/one.jpg`, alt: '예약 준비 안내 이미지' },
      { src: `/blog/${slug}/two.jpg`, alt: '방문 순서 안내 이미지' },
    ]
    const post = {
      id: 'weekly-2026-09-28', slug, title: '강남 달토 첫 방문 준비 안내',
      excerpt: '첫 방문 전 확인할 사항을 안내합니다.', date: '2026-09-28',
      publicationWeek: '2026-09-28', author: '강남 달토', category: '이용 안내',
      primaryKeyword: '강남 달토 첫 방문', secondaryKeywords: ['강남 가라오케 예약', '강남 달토 이용 방법'],
      images, featuredImage: images[0].src,
      content: '<h2>강남 달토 첫 방문</h2><p>강남 가라오케 ' + '방문 전에 예약 내용을 확인하세요. '.repeat(150) + '</p><h2>예약</h2><h2>위치</h2><a href="/reserve">예약</a><a href="/access">위치</a>' + images.map(i => `<img src="${i.src}" alt="${i.alt}">`).join(''),
    }
    assert(visibleText(post.content).length >= 2700)
    assert.equal(validatePosts([post], root), 1)
    assert.throws(() => validatePosts([{ ...post, content: '<p>짧은 글</p>' }], root), /2700/)
    assert.throws(() => validatePosts([{ ...post, images: [images[0]] }], root), /two images/)
    assert.throws(() => validatePosts([{ ...post, images: [images[0], images[0]] }], root), /distinct/)
    assert.throws(() => validatePosts([{ ...post, content: post.content.replace('<img', '<span') }], root), /matching alt/)
    assert.throws(() => validatePosts([{ ...post, content: post.content + '<script>alert(1)</script>' }], root), /Unsafe/)
    assert.throws(() => validatePosts([post, { ...post, id: 'other', slug: 'other', primaryKeyword: '강남 달토 다른 안내', title: '강남 달토 다른 안내' }], root), /one new post per week/)
    assert.throws(() => validatePosts([{ ...post, publicationWeek: '2026-09-29' }], root), /Monday/)
    assert.equal(publicationWeek('2027-01-03'), '2026-12-28')
  } finally {
    assert.equal(path.dirname(path.resolve(root)), path.resolve(tmpdir()))
    assert(path.basename(root).startsWith('dalto-blog-test-'))
    rmSync(root, { recursive: true })
  }
})
