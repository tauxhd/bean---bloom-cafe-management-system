import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import AdminDashboard from './AdminDashboard'

export default async function AdminPage() {
  const session = await getServerSession()
  if (!session) redirect('/login/signin')

  const [menuItems, reservations, orders, users] = await Promise.all([
    prisma.menuItem.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.reservation.findMany({ orderBy: { createdAt: 'desc' }, include: { user: true } }),
    prisma.order.findMany({ orderBy: { createdAt: 'desc' }, include: { user: true, items: true } }),
    (prisma.user as any).findMany({ orderBy: { createdAt: 'desc' } }),
  ])

  return (
    <AdminDashboard
      menuItems={menuItems as any}
      reservations={reservations as any}
      orders={orders as any}
      users={users}
      adminName={session.user?.name || 'Admin'}
    />
  )
}