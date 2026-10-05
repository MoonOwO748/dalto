import { notFound } from 'next/navigation'
import { hasLocale, getDictionary } from './dictionaries'
import { HeroSection } from '@/components/home/HeroSection'
import { AboutSection } from '@/components/home/AboutSection'
import { HomeInformationSections } from '@/components/home/HomeInformationSections'
import { HomePricingSection } from '@/components/home/HomePricingSection'
import { ReviewsSection } from '@/components/home/ReviewsSection'
import { BlogSection } from '@/components/home/BlogSection'
import { FaqSection } from '@/components/home/FaqSection'
import { CtaSection } from '@/components/home/CtaSection'

interface Props {
  params: Promise<{ lang: string }>
}

export default async function HomePage({ params }: Props) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()

  const dict = await getDictionary(lang)

  return (
    <>
      <HeroSection dict={dict} lang={lang} />
      <AboutSection dict={dict} />
      <HomeInformationSections dict={dict} lang={lang} />
      <HomePricingSection dict={dict} lang={lang} />
      <ReviewsSection dict={dict} />
      <BlogSection lang={lang} />
      <FaqSection dict={dict} />
      <CtaSection dict={dict} lang={lang} />
    </>
  )
}
