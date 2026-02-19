import { useEffect } from 'react'

interface PageSEOProps {
  title: string
  description?: string
}

export function usePageSEO({ title, description }: PageSEOProps) {
  useEffect(() => {
    document.title = title

    if (description) {
      const meta = document.querySelector('meta[name="description"]')
      if (meta) {
        meta.setAttribute('content', description)
      }
    }

    return () => {
      document.title = 'Handcrafted Driftwood & Air Plant Art | Austin, TX — Central Texas with Love'
    }
  }, [title, description])
}
