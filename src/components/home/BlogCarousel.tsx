'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import styles from './BlogSection.module.css'

export function BlogArrow() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" /></svg>
}

interface Props {
  children: ReactNode
  count: number
  labels: { list: string; previous: string; next: string; hint: string }
}

export function BlogCarousel({ children, count, labels }: Props) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ index: 0, end: false, overflow: false })

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const update = () => {
      const cards = Array.from(track.children) as HTMLElement[]
      const first = cards[0]
      const step = cards[1] && first ? cards[1].offsetLeft - first.offsetLeft : 0
      const maximum = track.scrollWidth - track.clientWidth
      setPosition({
        index: step ? Math.min(count - 1, Math.max(0, Math.round(track.scrollLeft / step))) : 0,
        end: track.scrollLeft >= maximum - 2,
        overflow: maximum > 2,
      })
    }
    update()
    track.addEventListener('scroll', update, { passive: true })
    const observer = new ResizeObserver(update)
    observer.observe(track)
    return () => {
      track.removeEventListener('scroll', update)
      observer.disconnect()
    }
  }, [count])

  function move(direction: number) {
    const track = trackRef.current
    if (!track || track.children.length < 2) return
    const first = track.children[0] as HTMLElement
    const second = track.children[1] as HTMLElement
    const step = second.offsetLeft - first.offsetLeft
    track.scrollBy({ left: step * direction, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })
  }

  return (
    <>
      <div ref={trackRef} id="home-blog-track" className={styles.track} tabIndex={0} role="group" aria-label={labels.list}
        onKeyDown={event => {
          if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
            event.preventDefault()
            move(event.key === 'ArrowRight' ? 1 : -1)
          }
        }}>
        {children}
      </div>
      <div className={styles.footer}>
        <div className={styles.position}>
          <span aria-live="polite" aria-atomic="true">{String(position.index + 1).padStart(2, '0')}</span>
          <span className={styles.progress} aria-hidden="true"><span style={{ width: `${position.end || !position.overflow ? 100 : (position.index + 1) / count * 100}%` }} /></span>
          <span className={styles.total}>{String(count).padStart(2, '0')}</span>
        </div>
        <span className={styles.hint}>{labels.hint}</span>
        {position.overflow && <div className={styles.controls}>
          <button type="button" aria-label={labels.previous} aria-controls="home-blog-track" disabled={position.index === 0} onClick={() => move(-1)}><BlogArrow /></button>
          <button type="button" aria-label={labels.next} aria-controls="home-blog-track" disabled={position.end} onClick={() => move(1)}><BlogArrow /></button>
        </div>}
      </div>
    </>
  )
}
