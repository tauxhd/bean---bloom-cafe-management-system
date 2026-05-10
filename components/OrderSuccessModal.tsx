'use client'

import { CartItem } from '@/lib/cart-context'
import { useEffect } from 'react'

interface OrderSuccessModalProps {
  open: boolean
  cartList: CartItem[]
  totalPrice: number
  onClose: () => void
}

export function OrderSuccessModal({ open, cartList, totalPrice, onClose }: OrderSuccessModalProps) {
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-textBlack/50 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="bg-mainWhite rounded-3xl p-10 text-center max-w-sm w-[90%] shadow-2xl animate-[scaleIn_0.25s_ease-out]">
        <div className="w-16 h-16 bg-mainGreen/10 rounded-full flex items-center justify-center mx-auto mb-5 text-3xl">
          ✅
        </div>
        <h2 className="text-2xl font-semibold text-textBlack mb-2">Order Placed!</h2>
        <p className="text-sm text-textBlack/50 mb-5 leading-relaxed">
          Your order is being prepared with love.<br />
          Estimated time: <span className="font-medium text-textBlack">15–20 mins</span>
        </p>

        <div className="bg-secondaryWhite rounded-xl p-4 text-left mb-5 max-h-40 overflow-y-auto">
          {cartList.map((item) => (
            <div key={item.id} className="flex justify-between text-xs py-1 text-textBlack">
              <span>{item.name} × {item.qty}</span>
              <span className="tabular-nums">RM{(item.price * item.qty).toFixed(2)}</span>
            </div>
          ))}
          <div className="flex justify-between text-sm font-semibold text-mainGreen pt-2 mt-1 border-t border-mainGreen/15">
            <span>Total</span>
            <span className="tabular-nums">RM{totalPrice.toFixed(2)}</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 bg-mainGreen hover:bg-secondaryGreen text-mainWhite text-sm font-medium rounded-full transition-colors duration-150 border-none cursor-pointer"
        >
          Back to Menu
        </button>
      </div>
    </div>
  )
}
