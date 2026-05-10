'use client'

import { useState, useMemo, useEffect } from 'react'
import Image from 'next/image'
import { CategoryBar } from '@/components/CategoryBar'
import { CartSidebar } from '@/components/CartSidebar'
import { useCart } from '@/lib/cart-context'

type Category = 'all' | 'Coffee' | 'Cake' | 'Milkshake' | 'Pastries' | 'Other'

interface MenuItem {
  id: string
  name: string
  description: string
  category: string
  price: number
  stock: number
  image: string
  available: boolean
}

const CATEGORIES = [
  { label: 'All', value: 'all' },
  { label: 'Coffee', value: 'Coffee' },
  { label: 'Cakes', value: 'Cake' },
  { label: 'Milkshakes', value: 'Milkshake' },
  { label: 'Pastries', value: 'Pastries' },
]

export default function OrderPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('all')
  const [search, setSearch] = useState('')
  const [items, setItems] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/menu')
      .then(r => r.json())
      .then(data => {
        setItems(data.filter((i: MenuItem) => i.available))
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const filtered = useMemo(() => {
    return items.filter(p => {
      const matchCat = activeCategory === 'all' || p.category === activeCategory
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase())
      return matchCat && matchSearch
    })
  }, [items, activeCategory, search])

  return (
    <div className="min-h-screen bg-bgWhite">
      <CategoryBar
        active={activeCategory as any}
        onChange={setActiveCategory as any}
        search={search}
        onSearch={setSearch}
        categories={CATEGORIES}
      />

      <div className="max-w-7xl mx-auto px-8 py-8 grid grid-cols-[1fr_300px] gap-0 items-start">
        <div className="pr-8">
          {loading ? (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(190px,1fr))] gap-5">
              {Array(6).fill(null).map((_, i) => (
                <div key={i} className="bg-mainWhite rounded-2xl border border-mainGreen/10 overflow-hidden animate-pulse">
                  <div className="w-full aspect-square bg-secondaryWhite" />
                  <div className="p-4 space-y-2">
                    <div className="h-3 bg-secondaryWhite rounded w-1/2" />
                    <div className="h-4 bg-secondaryWhite rounded w-3/4" />
                    <div className="h-3 bg-secondaryWhite rounded w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 text-textBlack/40 text-sm">
              <div className="text-4xl mb-3 opacity-30">🔍</div>
              {items.length === 0 ? 'No menu items yet — check back soon!' : 'No items found. Try a different search.'}
            </div>
          ) : (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(190px,1fr))] gap-5">
              {filtered.map((product, i) => (
                <MenuItemCard key={product.id} product={product} index={i} />
              ))}
            </div>
          )}
        </div>

        <CartSidebar />
      </div>
    </div>
  )
}

function MenuItemCard({ product, index }: { product: MenuItem; index: number }) {
  const { add, increment, decrement, getQty } = useCart()
  const qty = getQty(product.id as any)
  const outOfStock = product.stock <= 0

  return (
    <div
      className="bg-mainWhite rounded-2xl border border-mainGreen/10 overflow-hidden group hover:-translate-y-1 hover:shadow-[0_8px_48px_rgba(7,55,32,0.13)] transition-all duration-300 ease-in-out flex flex-col"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="w-full aspect-square overflow-hidden bg-secondaryWhite relative">
        {product.image ? (
          <Image src={product.image} alt={product.name} fill
            className={`object-cover transition-transform duration-500 ${outOfStock ? 'grayscale opacity-60' : 'group-hover:scale-105'}`}
            sizes="220px" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl opacity-20">☕</div>
        )}
        {outOfStock && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="bg-textBlack/70 text-mainWhite text-xs font-semibold px-3 py-1.5 rounded-full">Out of Stock</span>
          </div>
        )}
        {product.stock > 0 && product.stock <= 5 && (
          <span className="absolute top-2 right-2 bg-mainYellow text-textBlack text-[0.6rem] font-bold px-2 py-0.5 rounded-full">
            Only {product.stock} left!
          </span>
        )}
      </div>

      <div className="p-3.5 pt-3 flex flex-col flex-1">
        <p className="text-[0.68rem] font-medium text-secondaryGreen uppercase tracking-wider mb-0.5">
          {product.category}
        </p>
        <h3 className="text-[1rem] font-semibold text-textBlack leading-tight mb-0.5">{product.name}</h3>
        <p className="text-[0.72rem] text-textBlack/50 leading-relaxed mb-3 line-clamp-2">{product.description}</p>

        <div className="flex items-center justify-between mt-auto">
          <span className="text-[0.88rem] font-semibold text-mainGreen">RM{product.price.toFixed(2)}</span>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => decrement(product.id as any)}
              disabled={outOfStock}
              className="w-6 h-6 rounded-full border border-mainGreen/20 bg-secondaryWhite text-textBlack text-sm flex items-center justify-center hover:bg-mainGreen hover:border-mainGreen hover:text-mainWhite transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
            >−</button>
            <span className="text-[0.85rem] font-medium text-textBlack min-w-3.5 text-center tabular-nums">{qty}</span>
            <button
              onClick={() => {
                if (outOfStock) return
                if (qty === 0) add({ id: product.id as any, name: product.name, price: product.price, category: product.category, description: product.description, img: product.image } as any)
                else increment(product.id as any)
              }}
              disabled={outOfStock}
              className="w-6 h-6 rounded-full border border-mainGreen/20 bg-secondaryWhite text-textBlack text-sm flex items-center justify-center hover:bg-mainGreen hover:border-mainGreen hover:text-mainWhite transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
            >+</button>
          </div>
        </div>
      </div>
    </div>
  )
}