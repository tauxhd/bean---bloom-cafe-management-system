'use client'

import { useState } from 'react'
import Image from 'next/image'
import ImageUpload from '@/components/ImageUpload'

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

const CATEGORIES = ['Coffee', 'Cake', 'Milkshake', 'Pastries', 'Other']

const EMPTY_FORM = {
  name: '',
  description: '',
  category: 'Coffee',
  price: '',
  stock: '',
  image: '',
  available: true,
}

interface Props {
  initialItems: MenuItem[]
}

export default function MenuManager({ initialItems }: Props) {
  const [items, setItems] = useState<MenuItem[]>(initialItems)
  const [showForm, setShowForm] = useState(false)
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  const openAdd = () => {
    setEditingItem(null)
    setForm(EMPTY_FORM)
    setError('')
    setShowForm(true)
  }

  const openEdit = (item: MenuItem) => {
    setEditingItem(item)
    setForm({
      name: item.name,
      description: item.description || '',
      category: item.category,
      price: String(item.price),
      stock: String(item.stock),
      image: item.image || '',
      available: item.available,
    })
    setError('')
    setShowForm(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.price || !form.category) {
      setError('Name, category and price are required.')
      return
    }
    setLoading(true)
    setError('')

    try {
      if (editingItem) {
        const res = await fetch(`/api/menu/${editingItem.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        })
        const updated = await res.json()
        setItems(prev => prev.map(i => i.id === editingItem.id ? updated : i))
      } else {
        const res = await fetch('/api/menu', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        })
        const created = await res.json()
        setItems(prev => [created, ...prev])
      }
      setShowForm(false)
      setEditingItem(null)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/menu/${id}`, { method: 'DELETE' })
      setItems(prev => prev.filter(i => i.id !== id))
      setDeleteConfirm(null)
    } catch {
      console.error('Delete failed')
    }
  }

  const toggleAvailable = async (item: MenuItem) => {
    const res = await fetch(`/api/menu/${item.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...item, available: !item.available }),
    })
    const updated = await res.json()
    setItems(prev => prev.map(i => i.id === item.id ? updated : i))
  }

  const stockColor = (stock: number) => {
    if (stock > 10) return 'bg-green-50 text-green-700'
    if (stock > 0) return 'bg-yellow-50 text-yellow-700'
    return 'bg-red-50 text-red-600'
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-textBlack">Menu Items</h2>
          <p className="text-xs text-textBlack/40 mt-0.5">{items.length} items · {items.filter(i => i.available).length} available</p>
        </div>
        <button
          onClick={openAdd}
          className="bg-mainGreen hover:bg-secondaryGreen text-mainWhite text-sm font-medium px-5 py-2.5 rounded-full transition-colors cursor-pointer border-none flex items-center gap-2"
        >
          <span className="text-lg leading-none">+</span> Add Item
        </button>
      </div>

      {/* Grid */}
      {items.length === 0 ? (
        <div className="text-center py-20 bg-mainWhite rounded-2xl border border-mainGreen/10">
          <p className="text-4xl mb-3 opacity-30">☕</p>
          <p className="text-textBlack/40 text-sm">No menu items yet</p>
          <button onClick={openAdd} className="mt-4 text-mainGreen text-sm hover:underline cursor-pointer bg-transparent border-none">
            Add your first item
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map(item => {
            const stock = Number(item.stock)
            const price = Number(item.price)
            return (
              <div key={item.id} className={`bg-mainWhite rounded-2xl border overflow-hidden transition-all ${item.available ? 'border-mainGreen/10' : 'border-red-200 opacity-70'}`}>
                {/* Image */}
                <div className="relative w-full h-44 bg-secondaryWhite">
                  {item.image ? (
                    <Image src={item.image} alt={item.name} fill className="object-cover" sizes="400px"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl opacity-20">☕</div>
                  )}
                  <span className="absolute top-3 left-3 bg-mainGreen text-mainWhite text-[0.65rem] font-semibold px-2.5 py-1 rounded-full">
                    {item.category}
                  </span>
                  <button
                    onClick={() => toggleAvailable(item)}
                    className={`absolute top-3 right-3 text-[0.65rem] font-semibold px-2.5 py-1 rounded-full cursor-pointer border-none transition-colors ${item.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}
                  >
                    {item.available ? 'Available' : 'Hidden'}
                  </button>
                </div>

                {/* Body */}
                <div className="p-4">
                  <h3 className="font-semibold text-textBlack text-base mb-0.5">{item.name}</h3>
                  <p className="text-xs text-textBlack/50 line-clamp-2 mb-3">{item.description || 'No description'}</p>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-bold text-mainGreen">RM{price.toFixed(2)}</span>
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${stockColor(stock)}`}>
                      {stock > 0 ? `${stock} in stock` : 'Out of stock'}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => openEdit(item)}
                      className="flex-1 text-sm text-mainGreen border border-mainGreen/20 hover:bg-mainGreen hover:text-mainWhite py-2 rounded-xl transition-all cursor-pointer bg-transparent"
                    >
                      Edit
                    </button>
                    {deleteConfirm === item.id ? (
                      <div className="flex gap-1.5 flex-1">
                        <button onClick={() => handleDelete(item.id)}
                          className="flex-1 text-sm bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl cursor-pointer border-none transition-colors">
                          Confirm
                        </button>
                        <button onClick={() => setDeleteConfirm(null)}
                          className="flex-1 text-sm border border-mainGreen/20 text-textBlack/50 py-2 rounded-xl cursor-pointer bg-transparent hover:bg-mainGreen/5 transition-colors">
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button onClick={() => setDeleteConfirm(item.id)}
                        className="flex-1 text-sm text-red-400 border border-red-200 hover:bg-red-50 py-2 rounded-xl transition-all cursor-pointer bg-transparent">
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Add/Edit Modal */}
      {showForm && (
        <div
          className="fixed inset-0 z-200 flex items-center justify-center bg-textBlack/50 backdrop-blur-sm px-4"
          onClick={e => { if (e.target === e.currentTarget) setShowForm(false) }}
        >
          <div className="bg-mainWhite rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-[scaleIn_0.2s_ease-out]">
            <div className="px-7 pt-7 pb-4 border-b border-mainGreen/10 flex items-center justify-between">
              <h3 className="text-lg font-bold text-textBlack">
                {editingItem ? 'Edit Item' : 'Add New Item'}
              </h3>
              <button onClick={() => setShowForm(false)}
                className="text-textBlack/30 hover:text-textBlack cursor-pointer bg-transparent border-none text-xl leading-none">
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="px-7 py-6 flex flex-col gap-4">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">{error}</div>
              )}

              <Field label="Name *">
                <input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="e.g. Ethiopian Yirgacheffe" required
                  className="w-full px-4 py-2.5 rounded-xl border border-mainGreen/15 bg-bgWhite text-textBlack text-sm outline-none focus:border-mainGreen focus:ring-2 focus:ring-mainGreen/10 placeholder:text-textBlack/25" />
              </Field>

              <Field label="Category *">
                <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-mainGreen/15 bg-bgWhite text-textBlack text-sm outline-none focus:border-mainGreen cursor-pointer">
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </Field>

              <Field label="Description">
                <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  placeholder="Brief description of the item..." rows={3}
                  className="w-full px-4 py-2.5 rounded-xl border border-mainGreen/15 bg-bgWhite text-textBlack text-sm outline-none focus:border-mainGreen focus:ring-2 focus:ring-mainGreen/10 placeholder:text-textBlack/25 resize-none" />
              </Field>

              <div className="grid grid-cols-2 gap-3">
                <Field label="Price (RM) *">
                  <input type="number" step="0.01" min="0" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
                    placeholder="0.00" required
                    className="w-full px-4 py-2.5 rounded-xl border border-mainGreen/15 bg-bgWhite text-textBlack text-sm outline-none focus:border-mainGreen focus:ring-2 focus:ring-mainGreen/10 placeholder:text-textBlack/25" />
                </Field>
                <Field label="Stock">
                  <input type="number" min="0" value={form.stock} onChange={e => setForm(f => ({ ...f, stock: e.target.value }))}
                    placeholder="0"
                    className="w-full px-4 py-2.5 rounded-xl border border-mainGreen/15 bg-bgWhite text-textBlack text-sm outline-none focus:border-mainGreen focus:ring-2 focus:ring-mainGreen/10 placeholder:text-textBlack/25" />
                </Field>
              </div>

              <Field label="Image">
                <ImageUpload
                  value={form.image}
                  onChange={url => setForm(f => ({ ...f, image: url }))}
                />
              </Field>

              <div className="flex items-center justify-between py-2">
                <span className="text-sm font-medium text-textBlack">Available to customers</span>
                <button type="button" onClick={() => setForm(f => ({ ...f, available: !f.available }))}
                  className={`w-10 h-5 rounded-full transition-colors duration-200 relative cursor-pointer border-none ${form.available ? 'bg-mainGreen' : 'bg-textBlack/20'}`}>
                  <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${form.available ? 'translate-x-5' : 'translate-x-0.5'}`} />
                </button>
              </div>

              <button type="submit" disabled={loading}
                className="w-full bg-mainGreen hover:bg-secondaryGreen disabled:opacity-60 text-mainWhite font-semibold py-3 rounded-xl transition-all cursor-pointer border-none text-sm flex items-center justify-center gap-2 mt-1">
                {loading ? <><div className="w-4 h-4 border-2 border-mainWhite/30 border-t-mainWhite rounded-full animate-spin" />{editingItem ? 'Saving…' : 'Adding…'}</> : editingItem ? 'Save Changes' : 'Add Item'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-textBlack/50 uppercase tracking-wider mb-1.5">{label}</label>
      {children}
    </div>
  )
}