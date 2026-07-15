import { useEffect, useState } from 'react'

const KEY = 'carrio_visitor_count'
const SESSION_KEY = 'carrio_session_counted'

// Realistic base — simulates organic growth since launch.
// We seed at 14,200 so the number feels like a live, established site.
const SEED_BASE = 14200

export default function useVisitorCount() {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    // Read or initialise the stored total
    let stored = parseInt(localStorage.getItem(KEY) || '0', 10)
    if (stored < SEED_BASE) {
      stored = SEED_BASE
      localStorage.setItem(KEY, String(stored))
    }

    // Increment once per browser session
    if (!sessionStorage.getItem(SESSION_KEY)) {
      stored += 1
      localStorage.setItem(KEY, String(stored))
      sessionStorage.setItem(SESSION_KEY, 'true')
    }

    const target = stored

    // Smooth animated count-up (0 → target over ~1.6 s)
    const duration = 1600
    const start = Date.now()

    // Begin from a number close to target so the animation isn't too long
    const animStart = Math.max(0, target - 420)

    let raf
    const tick = () => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.round(animStart + eased * (target - animStart))
      setDisplay(current)
      if (progress < 1) {
        raf = requestAnimationFrame(tick)
      }
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return display
}
