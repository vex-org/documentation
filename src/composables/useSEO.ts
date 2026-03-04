const SITE_NAME = 'Vex'
const SITE_URL = 'https://vex-lang.org'
const DEFAULT_DESCRIPTION = 'Vex – A modern parallelism-first systems programming language. Rust safety, Go simplicity, automatic hardware saturation.'
const DEFAULT_IMAGE = `${SITE_URL}/vex-og.png`

interface SEOOptions {
  title: string
  description?: string
  url?: string
  image?: string
  type?: 'website' | 'article'
  article?: { author?: string; publishedTime?: string; tags?: string[] }
}

function setMeta(property: string, content: string) {
  const attr = property.startsWith('og:') || property.startsWith('article:') ? 'property' : 'name'
  let el = document.querySelector(`meta[${attr}="${property}"]`) as HTMLMetaElement | null
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, property)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setCanonical(url: string) {
  let el = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', url)
}

function setJsonLd(data: Record<string, unknown>) {
  let el = document.querySelector('script[data-seo="ld+json"]') as HTMLScriptElement | null
  if (!el) {
    el = document.createElement('script')
    el.setAttribute('type', 'application/ld+json')
    el.setAttribute('data-seo', 'ld+json')
    document.head.appendChild(el)
  }
  el.textContent = JSON.stringify(data)
}

export function useSEO(options: SEOOptions) {
  const fullTitle = options.title === SITE_NAME ? options.title : `${options.title} – ${SITE_NAME}`
  const description = options.description || DEFAULT_DESCRIPTION
  const url = options.url || `${SITE_URL}${window.location.pathname}`
  const image = options.image || DEFAULT_IMAGE
  const type = options.type || 'website'

  document.title = fullTitle

  // Standard meta
  setMeta('description', description)

  // Open Graph
  setMeta('og:title', fullTitle)
  setMeta('og:description', description)
  setMeta('og:url', url)
  setMeta('og:image', image)
  setMeta('og:type', type)
  setMeta('og:site_name', SITE_NAME)

  // Twitter Card
  setMeta('twitter:card', image !== DEFAULT_IMAGE ? 'summary_large_image' : 'summary')
  setMeta('twitter:title', fullTitle)
  setMeta('twitter:description', description)
  setMeta('twitter:image', image)

  // Canonical
  setCanonical(url)

  // Article-specific
  if (type === 'article' && options.article) {
    if (options.article.author) setMeta('article:author', options.article.author)
    if (options.article.publishedTime) setMeta('article:published_time', options.article.publishedTime)
    options.article.tags?.forEach(tag => setMeta('article:tag', tag))
  }
}

export function useSEOJsonLd(data: Record<string, unknown>) {
  setJsonLd({ '@context': 'https://schema.org', ...data })
}
