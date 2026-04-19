import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: Request) {
  try {
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature,
      orderDetails 
    } = await req.json()

    // 1. Signature Verification
    const body = razorpay_order_id + "|" + razorpay_payment_id
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body.toString())
      .digest("hex")

    const isAuthentic = expectedSignature === razorpay_signature

    if (isAuthentic) {
      const supabase = createClient()
      
      // 2. Insert/Update Order in Supabase
      const { error } = await supabase
        .from('orders')
        .insert([{
          user_id: orderDetails.userId,
          razorpay_order_id,
          razorpay_payment_id,
          status: 'paid',
          total: orderDetails.total,
          items: orderDetails.items,
          shipping_address: orderDetails.shippingAddress
        }])

      if (error) throw error

      // 3. Trigger Order Confirmation Email
      try {
        await fetch(`${req.url.split('/api')[0]}/api/emails/order-confirmation`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            orderId: razorpay_order_id,
            customerEmail: orderDetails.shippingAddress.email,
            customerName: `${orderDetails.shippingAddress.firstName} ${orderDetails.shippingAddress.lastName}`,
            total: orderDetails.total
          }),
        })
      } catch (emailErr) {
        console.error('FAILED_TO_SEND_EMAIL:', emailErr)
        // We don't fail the verification if email fails
      }

      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ success: false, message: 'Invalid Signature' }, { status: 400 })
    }
  } catch (error: any) {
    console.error('VERIFY_PAYMENT_ERROR:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
