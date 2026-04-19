"use client"

import { useState, useEffect } from 'react'
import { useCartStore } from '@/store/cartStore'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Script from 'next/script'
import { ChevronRight, Lock, MapPin, Truck } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function CheckoutPage() {
  const { items, getCartTotal, clearCart } = useCartStore()
  const [isMounted, setIsMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    phone: ''
  })

  useEffect(() => {
    setIsMounted(true)
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        // In real app, redirect to login
        // router.push('/login?redirect=/checkout')
      } else {
        setFormData(prev => ({ ...prev, email: session.user.email || '' }))
      }
    }
    checkAuth()
  }, [supabase, router])

  if (!isMounted) return null
  if (items.length === 0 && !isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-serif italic text-vastraa-ink/40">Your bag is empty.</h1>
          <button onClick={() => router.push('/shop')} className="text-xs font-bold uppercase tracking-widest border-b-2 border-vastraa-clay pb-1">Return to Shop</button>
        </div>
      </div>
    )
  }

  const total = getCartTotal()

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // 1. Create Order on Server
      const res = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      })
      const order = await res.json()

      if (order.error) throw new Error(order.error)

      // 2. Open Razorpay Widget
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'Vastraa',
        description: 'Quality Contemporary Tradition',
        order_id: order.orderId,
        handler: async function (response: any) {
          // 3. Verify Payment on Server
          const verifyRes = await fetch('/api/razorpay/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderDetails: {
                userId: (await supabase.auth.getSession()).data.session?.user.id,
                total: total,
                items: items,
                shippingAddress: formData
              }
            }),
          })

          const verifyData = await verifyRes.json()
          if (verifyData.success) {
            clearCart()
            router.push('/account/orders?success=true')
          } else {
            alert('Payment verification failed. Please contact support.')
          }
        },
        prefill: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: '#C65D3B',
        },
      }

      const rzp = new (window as any).Razorpay(options)
      rzp.open()
    } catch (err: any) {
      console.error(err)
      alert('Error initializing payment: ' + err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-vastraa-white min-h-screen">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      
      <div className="container-wide py-12 md:py-20">
        <h1 className="text-4xl md:text-5xl font-serif text-vastraa-ink mb-12 italic">Checkout</h1>

        <form onSubmit={handlePayment} className="grid grid-cols-12 gap-12 lg:gap-24">
          {/* Left Column: Form */}
          <div className="col-span-12 lg:col-span-7 space-y-12">
            <section className="space-y-6">
              <div className="flex items-center gap-4 text-vastraa-clay">
                <MapPin size={20} />
                <h2 className="text-xs font-bold uppercase tracking-[0.3em]">Shipping Address</h2>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 md:col-span-1">
                  <input
                    required
                    placeholder="First Name"
                    className="w-full px-4 py-3 border border-vastraa-ink/10 focus:border-vastraa-ink outline-none text-sm rounded-none"
                    value={formData.firstName}
                    onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <input
                    required
                    placeholder="Last Name"
                    className="w-full px-4 py-3 border border-vastraa-ink/10 focus:border-vastraa-ink outline-none text-sm rounded-none"
                    value={formData.lastName}
                    onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                  />
                </div>
                <div className="col-span-2">
                  <input
                    required
                    placeholder="Address / House No / Street"
                    className="w-full px-4 py-3 border border-vastraa-ink/10 focus:border-vastraa-ink outline-none text-sm rounded-none"
                    value={formData.address}
                    onChange={e => setFormData({ ...formData, address: e.target.value })}
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <input
                    required
                    placeholder="City"
                    className="w-full px-4 py-3 border border-vastraa-ink/10 focus:border-vastraa-ink outline-none text-sm rounded-none"
                    value={formData.city}
                    onChange={e => setFormData({ ...formData, city: e.target.value })}
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <input
                    required
                    placeholder="State"
                    className="w-full px-4 py-3 border border-vastraa-ink/10 focus:border-vastraa-ink outline-none text-sm rounded-none"
                    value={formData.state}
                    onChange={e => setFormData({ ...formData, state: e.target.value })}
                  />
                </div>
                <div className="col-span-1">
                  <input
                    required
                    placeholder="Pincode"
                    className="w-full px-4 py-3 border border-vastraa-ink/10 focus:border-vastraa-ink outline-none text-sm rounded-none"
                    value={formData.pincode}
                    onChange={e => setFormData({ ...formData, pincode: e.target.value })}
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <input
                    required
                    placeholder="Phone"
                    className="w-full px-4 py-3 border border-vastraa-ink/10 focus:border-vastraa-ink outline-none text-sm rounded-none"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>
            </section>

            <section className="space-y-6 pt-8 border-t border-vastraa-ink/10">
              <div className="flex items-center gap-4 text-vastraa-clay">
                <Truck size={20} />
                <h2 className="text-xs font-bold uppercase tracking-[0.3em]">Delivery Method</h2>
              </div>
              <div className="p-6 border-2 border-vastraa-ink flex justify-between items-center">
                <div className="space-y-1">
                  <p className="font-bold text-sm">Standard Delivery</p>
                  <p className="text-xs text-vastraa-ink/60">3-5 business days</p>
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-vastraa-green">Free</span>
              </div>
            </section>
          </div>

          {/* Right Column: Summary */}
          <div className="col-span-12 lg:col-span-5">
            <div className="sticky top-32 space-y-8 bg-white p-8 border border-vastraa-ink/5">
              <h2 className="text-xl font-serif italic border-b border-vastraa-ink/5 pb-4">Order Summary</h2>
              <div className="space-y-6">
                {items.map(item => (
                  <div key={`${item.id}-${item.size}`} className="flex gap-4">
                    <div className="w-16 aspect-[3/4] bg-vastraa-beige shrink-0"></div>
                    <div className="flex-1 flex justify-between items-start">
                      <div>
                        <p className="text-sm font-bold">{item.name}</p>
                        <p className="text-[10px] text-vastraa-ink/40 uppercase font-bold tracking-widest">Size: {item.size} | Qty: {item.quantity}</p>
                      </div>
                      <span className="text-sm font-bold">₹{(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-8 border-t border-vastraa-ink/10">
                <div className="flex justify-between text-xs uppercase tracking-widest text-vastraa-ink/40">
                  <span>Subtotal</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs uppercase tracking-widest text-vastraa-ink/40">
                  <span>Shipping</span>
                  <span>FREE</span>
                </div>
                <div className="flex justify-between text-lg font-bold uppercase tracking-widest pt-4 border-t border-vastraa-ink/5">
                  <span>Total</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-vastraa-clay text-white py-5 text-sm font-bold uppercase tracking-[0.3em] hover:bg-vastraa-ink transition-all duration-500 flex items-center justify-center gap-3"
              >
                {isLoading ? 'Processing...' : (
                  <>
                    <Lock size={16} /> Proceed to Payment
                  </>
                )}
              </button>
              <p className="text-[10px] text-center text-vastraa-ink/40 uppercase tracking-widest">
                Securely processed by Razorpay
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
