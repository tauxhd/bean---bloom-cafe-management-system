'use client'

import { useState } from 'react'
import Link from 'next/link'
import { signOut } from 'next-auth/react'
import MenuManager from '@/components/MenuManager'

type Tab = 'reservations' | 'orders' | 'menu' | 'users'

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  confirmed: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-600',
  completed: 'bg-blue-100 text-blue-700',
}

export default function AdminDashboard({ menuItems, reservations, orders, users, adminName }: {
  menuItems: any[]
  reservations: any[]
  orders: any[]
  users: any[]
  adminName: string
}) {
  const [activeTab, setActiveTab] = useState<Tab>('menu')

  const TABS = [
    { key: 'menu' as Tab, label: 'Menu', icon: '☕', count: menuItems.length },
    { key: 'reservations' as Tab, label: 'Reservations', icon: '📅', count: reservations.length },
    { key: 'orders' as Tab, label: 'Orders', icon: '📦', count: orders.length },
    { key: 'users' as Tab, label: 'Users', icon: '👥', count: users.length },
  ]

  return (
    <div className="min-h-screen bg-bgWhite">

      {/* Header */}
      <div className="bg-mainGreen px-8 sm:px-14 py-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <p className="text-mainYellow text-xs font-semibold uppercase tracking-widest mb-1">Admin Panel</p>
            <h1 className="text-3xl font-extrabold text-mainWhite">Manage Store</h1>
            <p className="text-mainWhite/50 text-sm mt-1">Welcome back, {adminName}</p>
          </div>
          <Link href="/" className="text-mainWhite/60 hover:text-mainWhite text-sm transition-colors no-underline flex items-center gap-1.5">
            ← Back to site
          </Link>
        </div>

        {/* Stats */}
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
          {[
            { label: 'Menu Items', value: menuItems.length, icon: '☕' },
            { label: 'Reservations', value: reservations.length, icon: '📅' },
            { label: 'Orders', value: orders.length, icon: '📦' },
            { label: 'Users', value: users.length, icon: '👥' },
          ].map(s => (
            <div key={s.label} className="bg-mainWhite/10 rounded-2xl px-5 py-4 border border-mainWhite/10">
              <p className="text-2xl mb-1">{s.icon}</p>
              <p className="text-2xl font-bold text-mainWhite">{s.value}</p>
              <p className="text-mainWhite/50 text-xs">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs + Content */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 py-8">

        <div className="flex gap-2 mb-8 border-b border-mainGreen/10 overflow-x-auto">
          {TABS.map(tab => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)}
              className={['flex items-center gap-2 px-5 py-3 text-sm font-medium rounded-t-xl border-b-2 transition-all duration-150 cursor-pointer bg-transparent whitespace-nowrap',
                activeTab === tab.key ? 'border-mainGreen text-mainGreen bg-mainGreen/5' : 'border-transparent text-textBlack/50 hover:text-textBlack',
              ].join(' ')}>
              <span>{tab.icon}</span>
              {tab.label}
              <span className={`text-xs px-2 py-0.5 rounded-full ${activeTab === tab.key ? 'bg-mainGreen text-mainWhite' : 'bg-textBlack/10 text-textBlack/50'}`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* ── MENU TAB ── */}
        {activeTab === 'menu' && <MenuManager initialItems={menuItems} />}

        {/* ── RESERVATIONS TAB ── */}
        {activeTab === 'reservations' && (
          <div>
            <h2 className="text-lg font-semibold text-textBlack mb-4">All Reservations</h2>
            {reservations.length === 0 ? <EmptyState icon="📅" message="No reservations yet" /> : (
              <div className="overflow-x-auto rounded-2xl border border-mainGreen/10">
                <table className="w-full text-sm">
                  <thead className="bg-mainGreen/5 border-b border-mainGreen/10">
                    <tr>{['Name', 'Email', 'Date', 'Time', 'Table', 'Location', 'Status'].map(h => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-textBlack/50 uppercase tracking-wider">{h}</th>
                    ))}</tr>
                  </thead>
                  <tbody className="divide-y divide-mainGreen/5">
                    {reservations.map((r: any) => (
                      <tr key={r.id} className="bg-mainWhite hover:bg-bgWhite transition-colors">
                        <td className="px-4 py-3 font-medium text-textBlack">{r.name}</td>
                        <td className="px-4 py-3 text-textBlack/60">{r.email}</td>
                        <td className="px-4 py-3 text-textBlack/60">{new Date(r.date).toLocaleDateString()}</td>
                        <td className="px-4 py-3 text-textBlack/60">{r.timeSlot}</td>
                        <td className="px-4 py-3 text-textBlack/60">{r.tableFor}</td>
                        <td className="px-4 py-3 text-textBlack/60">{r.location}</td>
                        <td className="px-4 py-3">
                          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_COLORS[r.status] || 'bg-gray-100 text-gray-600'}`}>{r.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ── ORDERS TAB ── */}
        {activeTab === 'orders' && (
          <div>
            <h2 className="text-lg font-semibold text-textBlack mb-4">All Orders</h2>
            {orders.length === 0 ? <EmptyState icon="📦" message="No orders yet" /> : (
              <div className="overflow-x-auto rounded-2xl border border-mainGreen/10">
                <table className="w-full text-sm">
                  <thead className="bg-mainGreen/5 border-b border-mainGreen/10">
                    <tr>{['Customer', 'Items', 'Total', 'Date', 'Status'].map(h => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-textBlack/50 uppercase tracking-wider">{h}</th>
                    ))}</tr>
                  </thead>
                  <tbody className="divide-y divide-mainGreen/5">
                    {orders.map((o: any) => (
                      <tr key={o.id} className="bg-mainWhite hover:bg-bgWhite transition-colors">
                        <td className="px-4 py-3">
                          <p className="font-medium text-textBlack">{o.user?.name}</p>
                          <p className="text-xs text-textBlack/40">{o.user?.email}</p>
                        </td>
                        <td className="px-4 py-3 text-textBlack/60 text-xs max-w-xs truncate">
                          {o.items?.map((i: any) => `${i.name} ×${i.quantity}`).join(', ')}
                        </td>
                        <td className="px-4 py-3 font-semibold text-mainGreen">RM{o.total?.toFixed(2)}</td>
                        <td className="px-4 py-3 text-textBlack/60">{new Date(o.createdAt).toLocaleDateString()}</td>
                        <td className="px-4 py-3">
                          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_COLORS[o.status] || 'bg-gray-100 text-gray-600'}`}>{o.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ── USERS TAB ── */}
        {activeTab === 'users' && (
          <div>
            <h2 className="text-lg font-semibold text-textBlack mb-4">Registered Users</h2>
            {users.length === 0 ? <EmptyState icon="👥" message="No users yet" /> : (
              <div className="overflow-x-auto rounded-2xl border border-mainGreen/10">
                <table className="w-full text-sm">
                  <thead className="bg-mainGreen/5 border-b border-mainGreen/10">
                    <tr>{['User', 'Email', 'Role', 'Joined'].map(h => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-textBlack/50 uppercase tracking-wider">{h}</th>
                    ))}</tr>
                  </thead>
                  <tbody className="divide-y divide-mainGreen/5">
                    {users.map((u: any) => (
                      <tr key={u.id} className="bg-mainWhite hover:bg-bgWhite transition-colors">
                        <td className="px-4 py-3 flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-mainGreen/10 flex items-center justify-center text-mainGreen font-bold text-sm shrink-0">
                            {u.name?.[0]?.toUpperCase() || '?'}
                          </div>
                          <span className="font-medium text-textBlack">{u.name}</span>
                        </td>
                        <td className="px-4 py-3 text-textBlack/60">{u.email}</td>
                        <td className="px-4 py-3">
                          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${u.role === 'admin' ? 'bg-mainYellow/20 text-secondaryYellow' : 'bg-mainGreen/10 text-mainGreen'}`}>
                            {u.role || 'user'}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-textBlack/60">{new Date(u.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function EmptyState({ icon, message }: { icon: string; message: string }) {
  return (
    <div className="text-center py-20 bg-mainWhite rounded-2xl border border-mainGreen/10">
      <p className="text-4xl mb-3 opacity-30">{icon}</p>
      <p className="text-textBlack/40 text-sm">{message}</p>
    </div>
  )
}