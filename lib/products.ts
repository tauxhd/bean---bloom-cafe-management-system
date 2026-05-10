export type Category = 'all' | 'coffee' | 'cake' | 'milkshake' | 'pastries'

export interface Product {
  id: number
  name: string
  category: Exclude<Category, 'all'>
  price: number
  description: string
  img: string
}

export const CATEGORIES: { label: string; value: Category }[] = [
  { label: 'All', value: 'all' },
  { label: 'Coffee', value: 'coffee' },
  { label: 'Cakes', value: 'cake' },
  { label: 'Milkshakes', value: 'milkshake' },
  { label: 'Pastries', value: 'pastries' },
]

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Chocolate Cake',
    category: 'cake',
    price: 15,
    description: 'Rich dark chocolate layers with ganache',
    img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80',
  },
  {
    id: 2,
    name: 'Cheese Cake',
    category: 'cake',
    price: 15,
    description: 'Creamy NY-style with blueberry compote',
    img: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400&q=80',
  },
  {
    id: 3,
    name: 'Red Velvet Cake',
    category: 'cake',
    price: 15,
    description: 'Classic red velvet with cream cheese frosting',
    img: 'https://images.unsplash.com/photo-1586788224331-947f68671cf1?w=400&q=80',
  },
  {
    id: 4,
    name: 'Tiramisu Cake',
    category: 'cake',
    price: 15,
    description: 'Italian espresso-soaked layers, dusted with cocoa',
    img: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&q=80',
  },
  {
    id: 5,
    name: 'Latte',
    category: 'coffee',
    price: 12,
    description: 'Silky steamed milk with a double espresso shot',
    img: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&q=80',
  },
  {
    id: 6,
    name: 'Cappuccino',
    category: 'coffee',
    price: 11,
    description: 'Equal parts espresso, steamed milk & foam',
    img: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&q=80',
  },
  {
    id: 7,
    name: 'Cold Brew',
    category: 'coffee',
    price: 13,
    description: '18-hour slow-steeped, served over ice',
    img: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&q=80',
  },
  {
    id: 8,
    name: 'Sausage Roll',
    category: 'pastries',
    price: 9,
    description: 'Flaky puff pastry with seasoned pork filling',
    img: 'https://images.unsplash.com/photo-1559742811-822873691df8?w=400&q=80',
  },
  {
    id: 9,
    name: 'Croissant',
    category: 'pastries',
    price: 7,
    description: 'Hand-laminated, buttery and perfectly flaky',
    img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&q=80',
  },
  {
    id: 10,
    name: 'Chocolate Milkshake',
    category: 'milkshake',
    price: 12,
    description: 'House-made chocolate sauce, thick & indulgent',
    img: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&q=80',
  },
  {
    id: 11,
    name: 'Oreo Milkshake',
    category: 'milkshake',
    price: 13,
    description: 'Crushed Oreos blended with vanilla ice cream',
    img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80',
  },
  {
    id: 12,
    name: 'Strawberry Milkshake',
    category: 'milkshake',
    price: 12,
    description: 'Fresh strawberries, cream & a hint of vanilla',
    img: 'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=400&q=80',
  },
]
