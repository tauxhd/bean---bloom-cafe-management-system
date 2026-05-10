export interface CoffeeProduct {
  id: number
  name: string
  origin: string
  roast: 'Light' | 'Medium' | 'Dark' | 'Medium-Dark'
  process: string
  notes: string[]
  weight: string
  price: number
  img: string
  badge?: string
}

export const COFFEE_PRODUCTS: CoffeeProduct[] = [
  {
    id: 1,
    name: 'Ethiopian Yirgacheffe',
    origin: 'Ethiopia',
    roast: 'Light',
    process: 'Washed',
    notes: ['Jasmine', 'Bergamot', 'Stone Fruit'],
    weight: '250g',
    price: 52,
    badge: 'Best Seller',
    img: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=500&q=80',
  },
  {
    id: 2,
    name: 'Colombia Supremo',
    origin: 'Colombia',
    roast: 'Medium',
    process: 'Washed',
    notes: ['Caramel', 'Red Apple', 'Hazelnut'],
    weight: '250g',
    price: 48,
    img: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=500&q=80',
  },
  {
    id: 3,
    name: 'Sumatra Mandheling',
    origin: 'Indonesia',
    roast: 'Dark',
    process: 'Wet-Hulled',
    notes: ['Dark Chocolate', 'Cedar', 'Earthy'],
    weight: '250g',
    price: 45,
    img: 'https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?w=500&q=80',
  },
  {
    id: 4,
    name: 'House Blend',
    origin: 'Multi-Origin',
    roast: 'Medium-Dark',
    process: 'Blended',
    notes: ['Brown Sugar', 'Walnut', 'Dark Berry'],
    weight: '250g',
    price: 38,
    badge: 'Our Signature',
    img: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500&q=80',
  },
  {
    id: 5,
    name: 'Kenya AA',
    origin: 'Kenya',
    roast: 'Medium',
    process: 'Washed',
    notes: ['Blackcurrant', 'Tomato', 'Citrus Zest'],
    weight: '250g',
    price: 55,
    badge: 'New Arrival',
    img: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&q=80',
  },
  {
    id: 6,
    name: 'Guatemala Antigua',
    origin: 'Guatemala',
    roast: 'Medium-Dark',
    process: 'Natural',
    notes: ['Cocoa', 'Spice', 'Brown Sugar'],
    weight: '250g',
    price: 46,
    img: 'https://images.unsplash.com/photo-1610889556528-9a770e32642f?w=500&q=80',
  },
]

export const ROAST_COLORS: Record<string, string> = {
  Light: 'bg-amber-100 text-amber-800',
  Medium: 'bg-orange-100 text-orange-800',
  'Medium-Dark': 'bg-orange-200 text-orange-900',
  Dark: 'bg-stone-200 text-stone-800',
}