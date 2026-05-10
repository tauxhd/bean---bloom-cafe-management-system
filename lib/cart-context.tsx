'use client'

import { createContext, useContext, useReducer, ReactNode } from 'react'
import { Product } from '@/lib/products'

export interface CartItem extends Product {
  qty: number
}

interface CartState {
  items: Record<number, CartItem>
}

type CartAction =
  | { type: 'ADD'; product: Product }
  | { type: 'REMOVE'; id: number }
  | { type: 'INCREMENT'; id: number }
  | { type: 'DECREMENT'; id: number }
  | { type: 'CLEAR' }

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD': {
      const existing = state.items[action.product.id]
      return {
        items: {
          ...state.items,
          [action.product.id]: {
            ...action.product,
            qty: existing ? existing.qty + 1 : 1,
          },
        },
      }
    }
    case 'INCREMENT': {
      const item = state.items[action.id]
      if (!item) return state
      return {
        items: { ...state.items, [action.id]: { ...item, qty: item.qty + 1 } },
      }
    }
    case 'DECREMENT': {
      const item = state.items[action.id]
      if (!item) return state
      if (item.qty <= 1) {
        const next = { ...state.items }
        delete next[action.id]
        return { items: next }
      }
      return {
        items: { ...state.items, [action.id]: { ...item, qty: item.qty - 1 } },
      }
    }
    case 'REMOVE': {
      const next = { ...state.items }
      delete next[action.id]
      return { items: next }
    }
    case 'CLEAR':
      return { items: {} }
    default:
      return state
  }
}

interface CartContextValue {
  items: Record<number, CartItem>
  cartList: CartItem[]
  totalItems: number
  totalPrice: number
  add: (product: Product) => void
  remove: (id: number) => void
  increment: (id: number) => void
  decrement: (id: number) => void
  clear: () => void
  getQty: (id: number) => number
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: {} })

  const cartList = Object.values(state.items)
  const totalItems = cartList.reduce((s, i) => s + i.qty, 0)
  const totalPrice = cartList.reduce((s, i) => s + i.price * i.qty, 0)

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        cartList,
        totalItems,
        totalPrice,
        add: (product) => dispatch({ type: 'ADD', product }),
        remove: (id) => dispatch({ type: 'REMOVE', id }),
        increment: (id) => dispatch({ type: 'INCREMENT', id }),
        decrement: (id) => dispatch({ type: 'DECREMENT', id }),
        clear: () => dispatch({ type: 'CLEAR' }),
        getQty: (id) => state.items[id]?.qty ?? 0,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
