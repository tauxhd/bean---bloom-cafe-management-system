'use client'

import Image from 'next/image'
import { Product } from '@/lib/products'
import { useCart } from '@/lib/cart-context'

interface ProductCardProps {
  product: Product
  index: number
}

export function ProductCard({ product, index }: ProductCardProps) {
  const { add, increment, decrement, getQty } = useCart()
  const qty = getQty(product.id)

  const categoryLabel: Record<string, string> = {
    cake: 'Cake',
    coffee: 'Coffee',
    milkshake: 'Milkshake',
    pastries: 'Pastries',
  }

  return (
    <div
      className="bg-mainWhite rounded-2xl border border-mainGreen/10 overflow-hidden cursor-pointer group
        hover:-translate-y-1 hover:shadow-[0_8px_48px_rgba(7,55,32,0.15)] transition-all duration-250 ease-in-out"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="w-full aspect-square overflow-hidden bg-secondaryWhite relative">
        <Image
          src={product.img}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-400 ease-in-out"
          sizes="(max-width: 768px) 50vw, 220px"
        />
      </div>

      <div className="p-3.5 pt-3">
        <p className="text-[0.68rem] font-medium text-secondaryGreen uppercase tracking-wider mb-0.5">
          {categoryLabel[product.category]}
        </p>
        <h3 className="text-[1.05rem] font-semibold text-textBlack leading-tight mb-0.5">
          {product.name}
        </h3>
        <p className="text-[0.72rem] text-textBlack/50 leading-relaxed mb-3 line-clamp-1">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-[0.88rem] font-semibold text-mainGreen">
            RM{product.price.toFixed(2)}
          </span>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => decrement(product.id)}
              className="w-6 h-6 rounded-full border border-mainGreen/20 bg-secondaryWhite text-textBlack text-sm leading-none flex items-center justify-center
                hover:bg-mainGreen hover:border-mainGreen hover:text-mainWhite transition-all duration-150 cursor-pointer select-none"
            >−</button>
            <span className="text-[0.85rem] font-medium text-textBlack min-w-3.5 text-center tabular-nums">
              {qty}
            </span>
            <button
              onClick={() => {
                if (qty === 0) add(product)
                else increment(product.id)
              }}
              className="w-6 h-6 rounded-full border border-mainGreen/20 bg-secondaryWhite text-textBlack text-sm leading-none flex items-center justify-center
                hover:bg-mainGreen hover:border-mainGreen hover:text-mainWhite transition-all duration-150 cursor-pointer select-none"
            >+</button>
          </div>
        </div>
      </div>
    </div>
  )
}
