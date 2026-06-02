import { useEffect, useState } from 'react'
import { cartService } from '../services/cartService'

// Read-only hook — fetches cart item count for the navbar badge.
// Never mutates cart state. Silently ignores failures (badge just stays at 0).
export function useCartCount(enabled: boolean): number {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!enabled) {
      setCount(0)
      return
    }
    cartService
      .getCart()
      .then((items) => setCount(items.reduce((sum, item) => sum + item.quantity, 0)))
      .catch(() => {})
  }, [enabled])

  return count
}
