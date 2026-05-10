'use client'

import { useEffect, useRef, useState } from 'react'
import { useCart } from '@/lib/cart-context'
import { OrderSuccessModal } from './OrderSuccessModal'

export function CartSidebar() {
  const { cartList, totalItems, totalPrice, remove, increment, decrement, clear } = useCart()
  const [navVisible, setNavVisible] = useState(true)
  const [orderOpen, setOrderOpen] = useState(false)
  const [bumpKey, setBumpKey] = useState(0)
  const lastCount = useRef(totalItems)
  const lastScroll = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const cur = window.scrollY
      const diff = cur - lastScroll.current
      if (cur > 80) {
        if (diff > 5) setNavVisible(false)
        else if (diff < -5) setNavVisible(true)
      } else {
        setNavVisible(true)
      }
      lastScroll.current = cur
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (totalItems > lastCount.current) setBumpKey((k) => k + 1)
    lastCount.current = totalItems
  }, [totalItems])

  const topOffset = navVisible ? 'top-[calc(70px+56px+1.5rem)]' : 'top-6'

  return (
    <>
      <div className={['sticky transition-[top] duration-300 ease-in-out self-start', topOffset].join(' ')}>
        <div className="bg-mainWhite rounded-2xl border border-mainGreen/10 shadow-[0_4px_24px_rgba(7,55,32,0.08)] overflow-hidden">

          {/* Header */}
          <div className="bg-mainGreen px-5 py-4 flex items-center gap-3">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            <span className="text-base font-semibold text-mainWhite tracking-wide">
              Your Order
            </span>
            <span
              key={bumpKey}
              className="ml-auto bg-mainYellow text-textBlack text-[0.68rem] font-semibold px-2.5 py-0.5 rounded-full animate-[bump_0.3s_ease-in-out]"
            >
              {totalItems} {totalItems === 1 ? 'item' : 'items'}
            </span>
          </div>

          {/* Body */}
          <div className="px-5 py-3 max-h-[340px] overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-mainGreen/20">
            {cartList.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-2 opacity-40">🛒</div>
                <p className="text-sm text-textBlack/50">Your cart is empty</p>
                <p className="text-xs text-textBlack/30 mt-1">Add something delicious!</p>
              </div>
            ) : (
              <div className="divide-y divide-mainGreen/8">
                {cartList.map((item) => (
                  <div key={item.id} className="flex items-center gap-2.5 py-2.5 animate-[slideIn_0.25s_ease-out]">
                    <button
                      onClick={() => remove(item.id)}
                      className="text-textBlack/30 hover:text-red-500 transition-colors text-xs leading-none cursor-pointer bg-transparent border-none p-0.5 flex-shrink-0"
                      aria-label="Remove item"
                    >✕</button>
                    <span className="text-[0.82rem] text-textBlack flex-1 truncate">{item.name}</span>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <button
                        onClick={() => decrement(item.id)}
                        className="w-5 h-5 rounded-full border border-mainGreen/20 bg-secondaryWhite text-xs flex items-center justify-center
                          hover:bg-mainGreen hover:border-mainGreen hover:text-white transition-all cursor-pointer"
                      >−</button>
                      <span className="text-[0.82rem] font-medium min-w-[14px] text-center tabular-nums">{item.qty}</span>
                      <button
                        onClick={() => increment(item.id)}
                        className="w-5 h-5 rounded-full border border-mainGreen/20 bg-secondaryWhite text-xs flex items-center justify-center
                          hover:bg-mainGreen hover:border-mainGreen hover:text-white transition-all cursor-pointer"
                      >+</button>
                    </div>
                    <span className="text-[0.82rem] font-medium text-mainGreen flex-shrink-0 min-w-[56px] text-right tabular-nums">
                      RM{(item.price * item.qty).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-mainGreen/10 bg-secondaryWhite px-5 py-4">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-textBlack/50">Subtotal</span>
              <span className="text-xs text-textBlack/50 tabular-nums">RM{totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-base font-semibold text-textBlack">Total</span>
              <span className="text-lg font-bold text-mainGreen tabular-nums transition-all duration-200">
                RM{totalPrice.toFixed(2)}
              </span>
            </div>

            <button
              onClick={() => { if (cartList.length > 0) setOrderOpen(true) }}
              disabled={cartList.length === 0}
              className="w-full mt-4 py-3 bg-mainGreen hover:bg-secondaryGreen disabled:opacity-40 disabled:cursor-not-allowed
                text-mainWhite text-sm font-medium rounded-full transition-all duration-150 cursor-pointer
                hover:-translate-y-0.5 active:scale-[0.98] border-none"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>

      <OrderSuccessModal
        open={orderOpen}
        cartList={cartList}
        totalPrice={totalPrice}
        onClose={() => { setOrderOpen(false); clear() }}
      />
    </>
  )
}
