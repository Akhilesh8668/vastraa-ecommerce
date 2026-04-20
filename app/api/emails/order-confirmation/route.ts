import { Resend } from 'resend'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const getResend = () => {
  if (!process.env.RESEND_API_KEY) return null
  return new Resend(process.env.RESEND_API_KEY)
}

export async function POST(req: Request) {
  try {
    const { orderId, customerEmail, customerName, total } = await req.json()

    const resend = getResend()
    if (!resend) throw new Error('Resend API key missing')

    const { data, error } = await resend.emails.send({
      from: 'Vastraa <orders@vastraa.com>', // User needs to verify domain in Resend
      to: [customerEmail],
      subject: `Order Confirmation: ${orderId}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background-color: #FAF9F6; padding: 40px; color: #1C1C1C;">
          <div style="border-bottom: 2px solid #1C1C1C; padding-bottom: 20px; margin-bottom: 30px; display: flex; align-items: baseline;">
            <span style="font-family: serif; font-size: 32px; font-weight: bold; letter-spacing: -0.05em; margin-right: 10px;">VASTRAA</span>
            <span style="font-size: 16px; color: #C65D3B;">वस्त्र</span>
          </div>
          
          <p style="text-transform: uppercase; letter-spacing: 0.2em; font-size: 10px; font-weight: bold; color: #C65D3B; margin-bottom: 8px;">Order Confirmed</p>
          <h2 style="font-family: serif; font-size: 24px; margin-top: 0;">Thank you for your purchase, ${customerName}.</h2>
          
          <p style="font-size: 14px; line-height: 1.6; color: #1C1C1C; opacity: 0.8;">
            We are pleased to confirm that your order <strong>${orderId}</strong> has been received and is currently being processed.
          </p>
          
          <div style="background-color: #FFFFFF; border: 1px solid #E5E5E5; padding: 24px; margin: 32px 0;">
            <p style="text-transform: uppercase; letter-spacing: 0.1em; font-size: 10px; font-weight: bold; color: #1C1C1C; opacity: 0.4; margin-bottom: 4px;">Total Amount Paid</p>
            <p style="font-size: 20px; font-weight: bold; margin: 0;">₹${total.toLocaleString()}</p>
          </div>
          
          <p style="font-size: 14px; line-height: 1.6; color: #1C1C1C; opacity: 0.8;">
            You will receive another update as soon as your hand-crafted pieces are dispatched.
          </p>
          
          <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #E5E5E5; font-size: 10px; text-transform: uppercase; letter-spacing: 0.1em; opacity: 0.4;">
            <p>&copy; 2024 Vastraa. All Rights Reserved.</p>
          </div>
        </div>
      `,
    })

    if (error) {
      return NextResponse.json({ error }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error: any) {
    console.error('RESEND_ERROR:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
