export interface Category {
  title: string
  slug: string
  image: string
  description: string
  filterCategory?: string
  filterTag?: string
}

export const categories: Category[] = [
  {
    title: 'Under 50',
    slug: 'under-50',
    image: '/images/products/under-50/under-50-01.jpg',
    description: 'Beautiful handcrafted pieces that fit any budget.',
    filterCategory: 'Under $50'
  },
  {
    title: 'Lighting',
    slug: 'lighting',
    image: '/images/products/lighting/lighting-01.jpg',
    description: 'Unique lamps that bring an organic glow to your space.',
    filterCategory: 'Lamps'
  },
  {
    title: 'Decor/Other',
    slug: 'decor',
    image: '/images/products/decor/decor-01.jpg',
    description: 'One-of-a-kind sculptural elements and home accessories.',
    filterCategory: 'Table Decor'
  },
  {
    title: 'Backlight',
    slug: 'backlight',
    image: '/images/products/backlight/backlight-01.jpg',
    description: 'Discover the hidden cosmic dimension of UV-reactive art.',
    filterCategory: 'Backlight'
  }
]
