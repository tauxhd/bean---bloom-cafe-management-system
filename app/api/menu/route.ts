import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'

export async function GET() {
  try {
    const items = await prisma.menuItem.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(items)
  } catch (error) {
    console.error('GET /api/menu error:', error)
    return NextResponse.json({ error: 'Failed to fetch menu items' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, description, category, price, stock, image, available } = body

    if (!name || !category || !price) {
      return NextResponse.json({ error: 'Name, category and price are required' }, { status: 400 })
    }

    const item = await prisma.menuItem.create({
      data: {
        id: crypto.randomUUID(),
        name,
        description: description || '',
        category,
        price: parseFloat(price),
        stock: parseInt(stock) || 0,
        image: image || '',
        available: available ?? true,
      },
    })

    return NextResponse.json(item)
  } catch (error) {
    console.error('POST /api/menu error:', error)
    return NextResponse.json({ error: 'Failed to create menu item' }, { status: 500 })
  }
}