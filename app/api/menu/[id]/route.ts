import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json()
    const { name, description, category, price, stock, image, available } = body

    const item = await prisma.menuItem.update({
      where: { id: params.id },
      data: {
        name,
        description,
        category,
        price: parseFloat(price),
        stock: parseInt(stock),
        image,
        available,
        updatedAt: new Date(),
      },
    })

    return NextResponse.json(item)
  } catch (error) {
    console.error('PUT /api/menu/[id] error:', error)
    return NextResponse.json({ error: 'Failed to update item' }, { status: 500 })
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.menuItem.delete({ where: { id: params.id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('DELETE /api/menu/[id] error:', error)
    return NextResponse.json({ error: 'Failed to delete item' }, { status: 500 })
  }
}