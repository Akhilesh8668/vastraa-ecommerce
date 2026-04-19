import { NextResponse } from 'next/server'
import Razorpay from 'razorpay'
import { createClient } from '@/lib/supabase/server'

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

export async function POST(req: Request) {
  try {
    const { items, userId } = await req.json()
    const supabase = createClient()

    // 1. Calculate total strictly from server-side data (Database)
    // In a real app, you'd fetch the products from Supabase to verify prices
    const productIds = items.map((item: any) => item.id)
    const { data: dbProducts, error: dbError } = await supabase
      .from('products')
      .select('id, price')
      .in('id', productIds)

    if (dbError) throw new Error('Database error')

    let totalAmount = 0
    items.forEach((item: any) => {
      const dbProduct = dbProducts?.find(p => p.id === item.id)
      const price = dbProduct ? Number(dbProduct.price) : 0
      totalAmount += price * item.quantity
    })

    // Fallback for phase 1/2 where products might not be in DB yet
    // In production, this fallback should be removed
    if (totalAmount === 0) {
      totalAmount = items.reduce((acc: number, item: any) => acc + (item.price * item.quantity), 0)
    }

    // 2. Create Razorpay order (amount in paise)
    const options = {
      amount: Math.round(totalAmount * 100),
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    }

    const order = await razorpay.orders.create(options)

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    })
  } catch (error: any) {
    console.error('RAZORPAY_ORDER_ERROR:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
