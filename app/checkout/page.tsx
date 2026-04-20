"use client"

import { useState, useEffect } from 'react'
import { useCartStore } from '@/store/cartStore'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Script from 'next/script'
import { Lock, MapPin, Truck, ChevronLeft, CreditCard } from 'lucide-react'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import Link from 'next/link'

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
      if (session) {
        setFormData(prev => ({ ...prev, email: session.user.email || '' }))
      }
    }
    checkAuth()
  }, [supabase, router])

  if (!isMounted) return null
  if (items.length === 0 && !isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-8">
          <h1 className="text-4xl font-serif italic text-white/20">Your bag is empty.</h1>
          <Link href="/shop" className="luxury-button inline-block">Return to Archive</Link>
        </div>
      </div>
    )
  }

  const total = getCartTotal()

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const res = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      })
      const order = await res.json()

      if (order.error) throw new Error(order.error)

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'VASTRAA',
        description: 'Premium Indian Handcraft',
        order_id: order.orderId,
        handler: async function (response: any) {
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
            alert('Payment verification failed.')
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
    <div className="bg-background min-h-screen pt-32 selection:bg-primary selection:text-white pb-20">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      
      <div className="container-wide">
        <header className="mb-20 space-y-6">
          <Link href="/shop" className="group inline-flex items-center gap-2 text-[10px] uppercase font-black tracking-widest text-white/30 hover:text-white transition-colors">
            <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Shop
          </Link>
          <h1 className="text-6xl md:text-8xl font-serif text-white italic tracking-tighter">Finalize <br /> Order</h1>
        </header>

        <form onSubmit={handlePayment} className="grid grid-cols-12 gap-12 lg:gap-24">
          {/* Left Column: Form */}
          <div className="col-span-12 lg:col-span-7 space-y-16">
            <section className="space-y-10">
              <div className="flex items-center gap-4 text-primary">
                <MapPin size={24} strokeWidth={1} />
                <h2 className="text-xs font-black uppercase tracking-[0.4em]">Destinational Logistics</h2>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-2 md:col-span-1">
                  <input
                    required
                    placeholder="First Name"
                    className="w-full bg-white/5 px-6 py-4 border border-white/10 focus:border-primary outline-none text-sm rounded-xl transition-all placeholder:text-white/20"
                    value={formData.firstName}
                    onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <input
                    required
                    placeholder="Last Name"
                    className="w-full bg-white/5 px-6 py-4 border border-white/10 focus:border-primary outline-none text-sm rounded-xl transition-all placeholder:text-white/20"
                    value={formData.lastName}
                    onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                  />
                </div>
                <div className="col-span-2">
                  <input
                    required
                    placeholder="Address (House, Street, Area)"
                    className="w-full bg-white/5 px-6 py-4 border border-white/10 focus:border-primary outline-none text-sm rounded-xl transition-all placeholder:text-white/20"
                    value={formData.address}
                    onChange={e => setFormData({ ...formData, address: e.target.value })}
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <input
                    required
                    placeholder="City"
                    className="w-full bg-white/5 px-6 py-4 border border-white/10 focus:border-primary outline-none text-sm rounded-xl transition-all placeholder:text-white/20"
                    value={formData.city}
                    onChange={e => setFormData({ ...formData, city: e.target.value })}
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <input
                    required
                    placeholder="State"
                    className="w-full bg-white/5 px-6 py-4 border border-white/10 focus:border-primary outline-none text-sm rounded-xl transition-all placeholder:text-white/20"
                    value={formData.state}
                    onChange={e => setFormData({ ...formData, state: e.target.value })}
                  />
                </div>
                <div className="col-span-1">
                  <input
                    required
                    placeholder="PIN"
                    className="w-full bg-white/5 px-6 py-4 border border-white/10 focus:border-primary outline-none text-sm rounded-xl transition-all placeholder:text-white/20"
                    value={formData.pincode}
                    onChange={e => setFormData({ ...formData, pincode: e.target.value })}
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <input
                    required
                    placeholder="Phone"
                    className="w-full bg-white/5 px-6 py-4 border border-white/10 focus:border-primary outline-none text-sm rounded-xl transition-all placeholder:text-white/20"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>
            </section>

            <section className="space-y-8 pt-12 border-t border-white/5">
              <div className="flex items-center gap-4 text-primary">
                <Truck size={24} strokeWidth={1} />
                <h2 className="text-xs font-black uppercase tracking-[0.4em]">Methodology</h2>
              </div>
              <div className="p-8 bg-primary/5 border-2 border-primary rounded-2xl flex justify-between items-center group">
                <div className="space-y-2">
                  <p className="font-serif italic text-xl text-white">Ethical Standard Delivery</p>
                  <p className="text-[10px] uppercase tracking-widest text-white/40">3-5 business days across India</p>
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-vastraa-green animate-pulse">Complimentary</span>
              </div>
            </section>
          </div>

          {/* Right Column: Summary */}
          <div className="col-span-12 lg:col-span-5">
            <div className="sticky top-40 bg-surface/40 backdrop-blur-3xl p-10 rounded-[2.5rem] border border-white/10 space-y-12 shadow-3xl">
              <h2 className="text-3xl font-serif italic text-white/90 pb-6 border-b border-white/5">Summary</h2>
              
              <div className="space-y-8 max-h-[40vh] overflow-y-auto no-scrollbar pr-2">
                {items.map(item => (
                  <div key={item.id} className="flex gap-6">
                    <div className="w-20 aspect-[3/4] bg-white/5 rounded-xl overflow-hidden shrink-0 border border-white/5 relative">
                        {/* Image Placeholder */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center opacity-10">
                          <span className="text-[8px] font-serif font-bold tracking-tighter text-white">VASTRAA</span>
                          <span className="text-[6px] font-hindi text-primary">वस्त्र</span>
                        </div>
                    </div>
                    <div className="flex-1 space-y-2 py-1">
                      <div className="flex justify-between items-start">
                        <p className="text-sm font-serif italic text-white/80">{item.name}</p>
                        <span className="text-xs font-bold text-white/60 tracking-tighter">₹{(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                      <p className="text-[9px] text-white/20 uppercase font-black tracking-widest">
                        SIZE: {item.size} • QTY: {item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-10 border-t border-white/5 space-y-4">
                <div className="flex justify-between text-[10px] uppercase font-black tracking-widest text-white/20">
                  <span>Subtotal</span>
                  <span className="text-white/60">₹{total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[10px] uppercase font-black tracking-widest text-white/20">
                  <span>Logistics</span>
                  <span className="text-vastraa-green">0.00</span>
                </div>
                <div className="flex justify-between items-baseline pt-8">
                  <span className="text-xs uppercase font-black tracking-[0.4em] text-white/30">Total</span>
                  <span className="text-4xl font-serif italic text-white tracking-tighter">₹{total.toLocaleString()}</span>
                </div>
              </div>

              <div className="pt-6">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="luxury-button w-full flex items-center justify-center gap-4 py-6"
                >
                  {isLoading ? 'Processing...' : (
                    <>
                      <CreditCard size={18} /> Initiate Transaction
                    </>
                  )}
                </button>
                <div className="flex items-center justify-center gap-3 mt-8 opacity-20">
                   <Lock size={12} />
                   <span className="text-[9px] uppercase font-black tracking-widest">Encrypted by Razorpay</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
