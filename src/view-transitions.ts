import { nextTick } from 'vue'
import type { Router } from 'vue-router'

/**
 * Site-wide View Transitions for the SPA.
 *
 * vue-router 5 exposes a `viewTransition` prop on `<RouterLink>`, but the
 * site has hundreds of links; intercepting document-level clicks keeps the
 * behaviour consistent everywhere (and only for routes this app owns).
 *
 * The keyframes live in `style.css`.
 */

interface ViewTransitionLike {
  finished: Promise<void>
}

type DocumentWithViewTransitions = Document & {
  startViewTransition?: (callback: () => Promise<void> | void) => ViewTransitionLike
}

const FALLBACK_ROUTE_NAME = 'NotFound'

function normalizePath(path: string): string {
  const clean = path.replace(/\/+$/, '')
  return clean || '/'
}

function nextFrames(): Promise<void> {
  return new Promise((resolve) => {
    let done = false
    const finish = () => {
      if (!done) {
        done = true
        resolve()
      }
    }
    requestAnimationFrame(() => requestAnimationFrame(finish))
    // Never let throttled rAF (hidden/occluded tabs) stall the transition.
    window.setTimeout(finish, 150)
  })
}

function resolveHref(event: MouseEvent, anchor: HTMLAnchorElement): string | null {
  if (event.defaultPrevented || event.button !== 0) return null
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return null
  if (anchor.hasAttribute('download')) return null

  const target = anchor.getAttribute('target')
  if (target && target !== '_self') return null

  if (anchor.closest('[data-no-view-transition]')) return null

  const href = anchor.getAttribute('href')
  if (!href || !href.startsWith('/') || href.startsWith('//')) return null

  return href
}

export function installViewTransitions(router: Router): void {
  const vtDocument = document as DocumentWithViewTransitions
  if (!vtDocument.startViewTransition) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const startViewTransition = vtDocument.startViewTransition.bind(vtDocument)

  // Warm the target route's lazy chunks while the pointer/focus is on a link,
  // so the transition rarely has to hold the page while a chunk loads.
  const prefetched = new Set<string>()
  function prefetchRoute(href: string): void {
    try {
      const resolved = router.resolve(href)
      if (!resolved.matched.length) return
      if (resolved.matched.some((record) => record.name === FALLBACK_ROUTE_NAME)) return
      if (prefetched.has(resolved.path)) return
      prefetched.add(resolved.path)
      for (const record of resolved.matched) {
        const components = (record as { components?: Record<string, unknown> }).components
        if (!components) continue
        for (const component of Object.values(components)) {
          if (typeof component === 'function') {
            Promise.resolve((component as () => unknown)()).catch(() => {})
          }
        }
      }
    } catch {
      /* ignore prefetch failures */
    }
  }

  const onIntent = (event: Event) => {
    const anchor = (event.target as Element | null)?.closest?.('a')
    if (!anchor) return
    const href = anchor.getAttribute('href')
    if (!href || !href.startsWith('/') || href.startsWith('//')) return
    prefetchRoute(href)
  }

  document.addEventListener('mouseover', onIntent, { capture: true })
  document.addEventListener('focusin', onIntent, { capture: true })

  document.addEventListener(
    'click',
    (event) => {
      if (!(event instanceof MouseEvent)) return

      const anchor = (event.target as Element | null)?.closest?.('a')
      if (!anchor) return

      const href = resolveHref(event, anchor as HTMLAnchorElement)
      if (!href) return

      const target = router.resolve(href)

      // Unknown paths (e.g. the separate docs app under /docs) keep their
      // default behaviour so they still load outside the SPA.
      if (!target.matched.length) return
      if (target.matched.some((record) => record.name === FALLBACK_ROUTE_NAME)) return

      // Hash/query-only changes should not crossfade the whole page.
      if (normalizePath(target.path) === normalizePath(router.currentRoute.value.path)) return

      event.preventDefault()
      event.stopPropagation()

      void startViewTransition(async () => {
        await router.push(href)
        await nextTick()
        await nextFrames()
      })
    },
    { capture: true },
  )

  // Browser back/forward is intentionally not wrapped: vue-router commits the
  // route (and Vue re-renders the DOM) before any interceptor can run, so
  // there is no window left to snapshot the outgoing page. Those navigations
  // stay instant, as in a standard vue-router app.
}
