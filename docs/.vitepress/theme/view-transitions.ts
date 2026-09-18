import { nextTick } from 'vue'

/**
 * View Transitions for the VitePress docs.
 *
 * VitePress has no built-in support in this version, so the router's
 * `onAfterPageLoad` hook is used: it fires once the next page module has
 * already been fetched but *before* the route swaps. The old page therefore
 * stays live and interactive while the next page loads; the transition only
 * covers the actual DOM swap. (Cancelling and replaying navigation would
 * freeze the page behind the old snapshot for the whole page load.)
 *
 * This path covers sidebar/markdown links, the search modal and browser
 * back/forward alike, since all of them end in `loadPage`.
 *
 * The keyframes live in `custom.css`; nav and sidebar keep stable
 * `view-transition-name`s so only the page content animates.
 */

interface VitePressRouterLike {
  onAfterPageLoad?: (href: string) => unknown
}

interface RouteLike {
  path?: string
  component?: unknown
  value?: { path: string; component?: unknown }
}

/**
 * Waits two frames so the swapped-in page is painted, with a timeout
 * fallback for contexts where rAF is throttled (hidden/occluded tabs).
 */
function nextPaint(): Promise<void> {
  return new Promise((resolve) => {
    let done = false
    const finish = () => {
      if (!done) {
        done = true
        resolve()
      }
    }
    requestAnimationFrame(() => requestAnimationFrame(finish))
    window.setTimeout(finish, 150)
  })
}

let installed = false

export function installViewTransitions(router: VitePressRouterLike, route: RouteLike): void {
  if (installed) return
  if (typeof document === 'undefined' || !('startViewTransition' in document)) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  installed = true

  const currentComponent = () => route.value?.component ?? route.component

  router.onAfterPageLoad = async () => {
    // Initial page load: there is nothing to transition from.
    if (!currentComponent()) return

    await new Promise<void>((resolve) => {
      let resumed = false
      const resume = () => {
        if (!resumed) {
          resumed = true
          resolve()
        }
      }

      try {
        document.startViewTransition(async () => {
          // Resume the navigation: the route swap and its render happen now,
          // while the old page has already been captured.
          resume()
          await nextTick()
          await nextPaint()
        })
      } catch {
        resume()
      }

      // Safety net: never leave the navigation waiting on a broken transition.
      window.setTimeout(resume, 1000)
    })
  }
}
