import { createContext, useContext, type ReactNode } from 'react'
import { useProducts, type UseProductsResult } from '../hooks/useProducts'

const ProductsContext = createContext<UseProductsResult | null>(null)

export function ProductsProvider({ children }: { children: ReactNode }) {
  const value = useProducts()
  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
}

export function useProductsContext(): UseProductsResult {
  const ctx = useContext(ProductsContext)
  if (!ctx) throw new Error('useProductsContext must be used within ProductsProvider')
  return ctx
}
