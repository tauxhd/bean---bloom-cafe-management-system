'use client'

import Image from 'next/image'
import Link from 'next/link'
import { CoffeeProduct, ROAST_COLORS } from '@/lib/coffee-products'

export function CoffeeProductCard({ product }: { product: CoffeeProduct }) {
  return (
    <div className="bg-mainWhite rounded-2xl border border-mainGreen/10 overflow-hidden group
      hover:-translate-y-1.5 hover:shadow-[0_12px_40px_rgba(7,55,32,0.13)] transition-all duration-300 ease-in-out flex flex-col">

      {/* Image */}
      <div className="relative w-full aspect-4/3 overflow-hidden bg-secondaryWhite">
        <Image
          src={product.img}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Badge */}
        {product.badge && (
          <span className="absolute top-3 left-3 bg-mainYellow text-textBlack text-[0.65rem] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wide">
            {product.badge}
          </span>
        )}
        {/* Roast tag */}
        <span className={`absolute top-3 right-3 text-[0.65rem] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wide ${ROAST_COLORS[product.roast]}`}>
          {product.roast} Roast
        </span>
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="text-base font-semibold text-textBlack leading-tight">{product.name}</h3>
        </div>

        <p className="text-xs text-secondaryGreen font-medium mb-3 flex items-center gap-1">
          <span>🌍</span> {product.origin} · {product.process}
        </p>

        {/* Tasting notes */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {product.notes.map((note) => (
            <span
              key={note}
              className="text-[0.68rem] px-2 py-0.5 rounded-full bg-secondaryWhite border border-mainGreen/10 text-textBlack/60"
            >
              {note}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-mainGreen/8">
          <div>
            <p className="text-[0.68rem] text-textBlack/40 mb-0.5">{product.weight}</p>
            <p className="text-base font-bold text-mainGreen">RM{product.price.toFixed(2)}</p>
          </div>
          <Link
            href="/order"
            className="bg-mainGreen hover:bg-secondaryGreen text-mainWhite text-xs font-medium px-4 py-2 rounded-full transition-colors duration-150 no-underline"
          >
            Order Now
          </Link>
        </div>
      </div>
    </div>
  )
}