import { useState, useEffect } from 'react'
import { products as fallbackProducts, type Product } from '../data/products'

// Default featured IDs — used when the API is unavailable (local dev / fallback)
const DEFAULT_FEATURED_IDS = new Set(['u8', 'l5', 'd13', 'd10', 'd6', 'd12'])

export interface UseProductsResult {
  products: Product[]
  featuredProducts: Product[]
  loading: boolean
  error: string | null
  getProductById: (id: string) => Product | undefined
}

export function useProducts(): UseProductsResult {
  const [products, setProducts] = useState<Product[]>(fallbackProducts)
  const [featuredIds, setFeaturedIds] = useState<Set<string>>(DEFAULT_FEATURED_IDS)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    fetch('/api/products', { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`Products fetch failed: ${res.status}`)
        return res.json()
      })
      .then((data: Array<Product & { featured?: boolean }>) => {
        if (!Array.isArray(data) || data.length === 0) return

        setProducts(data)
        const ids = new Set(data.filter((p) => p.featured).map((p) => p.id))
        if (ids.size > 0) setFeaturedIds(ids)
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          console.warn('Products API unavailable, using built-in products:', err.message)
          setError('offline')
        }
      })
      .finally(() => setLoading(false))

    return () => controller.abort()
  }, [])

  const featuredProducts = products.filter((p) => featuredIds.has(p.id))

  return {
    products,
    featuredProducts,
    loading,
    error,
    getProductById: (id) => products.find((p) => p.id === id),
  }
}
