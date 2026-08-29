export const locales = ['ko', 'en', 'zh', 'ja'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'ko'

export const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ak-dalto.com'

/**
 * Returns the localized URL path for a given route and language.
 * Korean ('ko') has NO prefix:
 *   getLocalizedPath('/', 'ko') -> '/'
 *   getLocalizedPath('/pricing', 'ko') -> '/pricing'
 *   getLocalizedPath('/blog/slug', 'ko') -> '/blog/slug'
 * Other languages ('en', 'zh', 'ja') have their prefix:
 *   getLocalizedPath('/', 'en') -> '/en'
 *   getLocalizedPath('/pricing', 'en') -> '/en/pricing'
 *   getLocalizedPath('/blog/slug', 'en') -> '/en/blog/slug'
 */
export function getLocalizedPath(path: string, lang: string = defaultLocale): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  const normalizedPath = cleanPath === '/' ? '' : cleanPath.replace(/\/$/, '')

  if (lang === defaultLocale) {
    return normalizedPath === '' ? '/' : normalizedPath
  }

  return `/${lang}${normalizedPath}`
}

/**
 * Returns full absolute URL for a localized route.
 */
export function getLocalizedUrl(path: string, lang: string = defaultLocale, baseUrl: string = BASE_URL): string {
  const localizedPath = getLocalizedPath(path, lang)
  const base = baseUrl.replace(/\/$/, '')
  return `${base}${localizedPath}`
}

/**
 * Generates SEO metadata alternates (canonical & hreflang languages) for a given path.
 */
export function getHrefLangAlternates(path: string, currentLang: string = defaultLocale, baseUrl: string = BASE_URL) {
  const base = baseUrl.replace(/\/$/, '')
  return {
    canonical: getLocalizedUrl(path, currentLang, base),
    languages: {
      ko: getLocalizedUrl(path, 'ko', base),
      en: getLocalizedUrl(path, 'en', base),
      'zh-CN': getLocalizedUrl(path, 'zh', base),
      ja: getLocalizedUrl(path, 'ja', base),
      'x-default': getLocalizedUrl(path, 'ko', base),
    },
  }
}
