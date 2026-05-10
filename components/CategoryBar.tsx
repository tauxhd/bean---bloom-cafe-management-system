'use client'

import { useEffect, useRef, useState } from 'react'
import { Category, CATEGORIES } from '@/lib/products'

interface CategoryBarProps {
  active: Category
  onChange: (cat: Category) => void
  search: string
  onSearch: (q: string) => void
  categories?: { label: string; value: string }[]  // ← add this
}

export function CategoryBar({ active, onChange, search, onSearch, categories = CATEGORIES }: CategoryBarProps) {
  const [hidden, setHidden] = useState(false)
  const lastScroll = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const cur = window.scrollY
      const diff = cur - lastScroll.current
      if (cur > 80) {
        if (diff > 5) setHidden(true)
        else if (diff < -5) setHidden(false)
      } else {
        setHidden(false)
      }
      lastScroll.current = cur
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className={[
        'sticky top-17.5 z-40 bg-bgWhite border-b border-mainGreen/10',
        'px-8 py-3 flex items-center gap-4 flex-wrap',
        'transition-transform duration-300 ease-in-out will-change-transform',
        hidden ? '-translate-y-[calc(100%+70px)]' : 'translate-y-0',
      ].join(' ')}
    >
      <span className="text-[0.7rem] font-medium text-mainGreen/60 uppercase tracking-widest shrink-0">
        Categories
      </span>

      <div className="flex gap-2 flex-wrap flex-1">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => onChange(cat.value as Category)}
            className={[
              'text-[0.82rem] px-3.5 py-1 rounded-full border transition-all duration-150 cursor-pointer',
              active === cat.value
                ? 'bg-mainGreen border-mainGreen text-mainWhite font-medium'
                : 'bg-transparent border-mainGreen/20 text-textBlack/60 hover:bg-mainGreen/8 hover:border-secondaryGreen hover:text-mainGreen',
            ].join(' ')}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="relative shrink-0">
        <svg
          className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-mainGreen/40 pointer-events-none"
          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <input
          type="text"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search menu…"
          className="text-[0.82rem] pl-8 pr-3 py-1.5 border border-mainGreen/15 rounded-full bg-mainWhite text-textBlack w-44 outline-none transition-all duration-150 focus:border-mainGreen focus:ring-2 focus:ring-mainGreen/10 placeholder:text-textBlack/30"
        />
      </div>
    </div>
  )
}
