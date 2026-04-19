"use client"

import { useCartStore } from '@/store/cartStore'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { ShoppingCart, Plus, Minus, X } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { heightCollapse } from '@/lib/animations'
import { getDriveImageUrl } from '@/lib/utils'

export default function CartDrawer({ children }: { children?: React.ReactNode }) {
  const { items, updateQuantity, removeItem, getCartTotal, getItemCount } = useCartStore()
  const [isMounted, setIsMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  const total = getCartTotal()
  const itemCount = getItemCount()

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        {children || (
          <button className="relative p-2 hover:text-vastraa-clay transition-colors group">
            <ShoppingCart size={22} />
            {itemCount > 0 && (
              <span className="absolute top-0 right-0 bg-vastraa-clay text-white text-[8px] w-4 h-4 flex items-center justify-center font-bold">
                {itemCount}
              </span>
            )}
          </button>
        )}
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-xl bg-vastraa-white border-l border-vastraa-ink/10 p-0 flex flex-col h-full rounded-none">
        <SheetHeader className="p-10 border-b border-vastraa-ink/5">
          <SheetTitle className="text-sm font-bold uppercase tracking-[0.4em] text-vastraa-ink flex items-center justify-between">
            Your Shopping Bag
            <span className="text-[10px] font-sans text-vastraa-ink/40 tracking-widest">
              {itemCount} ITEMS
            </span>
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-10 space-y-12">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-8">
              <ShoppingCart size={64} className="text-vastraa-ink/5" strokeWidth={1} />
              <div className="space-y-4">
                <p className="text-sm font-bold uppercase tracking-[0.4em] text-vastraa-ink/40 leading-relaxed">
                  Your shopping bag <br /> is currently empty.
                </p>
                <Link 
                  href="/shop" 
                  onClick={() => setIsOpen(false)}
                  className="inline-block text-[10px] uppercase font-bold tracking-[0.3em] text-vastraa-clay hover:text-vastraa-ink transition-colors border-b border-vastraa-clay"
                >
                  Explore Collections
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-12">
              {/* Header Label Row (SSENSE Style) */}
              <div className="hidden sm:grid grid-cols-12 gap-6 text-[8px] uppercase font-bold tracking-[0.3em] text-vastraa-ink/30 border-b border-vastraa-ink/5 pb-4">
                <div className="col-span-3">Item</div>
                <div className="col-span-6">Description</div>
                <div className="col-span-3 text-right">Price</div>
              </div>

              <AnimatePresence initial={false}>
                {items.map((item) => (
                  <motion.div 
                    key={`${item.id}-${item.size}`} 
                    variants={heightCollapse}
                    initial="initial"
                    exit="exit"
                    className="grid grid-cols-12 gap-6 pb-10 border-b border-vastraa-ink/5 last:border-0 overflow-hidden"
                  >
                    {/* Column 1: Image (SSENSE Pattern) */}
                    <div className="col-span-4 sm:col-span-3">
                      <div className="aspect-[3/4] bg-vastraa-beige relative shrink-0">
                        {item.image ? (
                           <Image 
                             src={getDriveImageUrl(item.image)} 
                             alt={item.name} 
                             fill 
                             sizes="100px"
                             className="object-cover" 
                           />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center text-[8px] font-serif italic text-vastraa-ink/20 uppercase text-center p-2">
                            [ Product Image ]
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Column 2: Metadata (Center) */}
                    <div className="col-span-8 sm:col-span-6 flex flex-col justify-between py-1">
                      <div className="space-y-2">
                        <div className="flex justify-between items-start">
                          <h3 className="text-xs font-bold uppercase tracking-[0.1em] text-vastraa-ink">{item.name}</h3>
                        </div>
                        {item.size && (
                          <p className="text-[10px] uppercase tracking-widest font-medium text-vastraa-ink/40 italic">Size: {item.size}</p>
                        )}
                        <div className="pt-2 flex items-center gap-4">
                          <div className="flex items-center border border-vastraa-ink/10">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1, item.size)}
                              className="p-1 px-2 hover:bg-vastraa-ink hover:text-white transition-colors"
                            >
                              <Minus size={10} />
                            </button>
                            <span className="w-10 text-center text-[10px] font-bold">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1, item.size)}
                              className="p-1 px-2 hover:bg-vastraa-ink hover:text-white transition-colors"
                            >
                              <Plus size={10} />
                            </button>
                          </div>
                          <button 
                            onClick={() => removeItem(item.id, item.size)}
                            className="text-[10px] uppercase font-bold tracking-widest text-vastraa-ink/20 hover:text-red-500 transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Column 3: Price (Right, Isolated) */}
                    <div className="hidden sm:flex col-span-3 flex-col items-end py-1">
                       <span className="text-sm font-bold tracking-tighter">₹{item.price.toLocaleString()}</span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-10 bg-white border-t border-vastraa-ink/10 space-y-8">
            <div className="space-y-3">
              <div className="flex justify-between items-center text-[10px] uppercase tracking-[0.3em]">
                <span className="text-vastraa-ink/40 font-bold">Subtotal</span>
                <span className="font-bold">₹{total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-[10px] uppercase tracking-[0.3em] font-bold">
                <span className="text-vastraa-ink/40">Shipping</span>
                <span className="text-vastraa-green underline underline-offset-4 decoration-dashed">Complimentary</span>
              </div>
              <div className="flex justify-between items-center pt-6 border-t border-vastraa-ink/10 mt-6">
                <span className="text-sm font-bold uppercase tracking-[0.4em]">Total</span>
                <span className="text-2xl font-bold tracking-tighter">₹{total.toLocaleString()}</span>
              </div>
            </div>
            
            <div className="pt-2">
              <Link 
                href="/checkout"
                onClick={() => setIsOpen(false)}
                className="group relative block w-full bg-vastraa-ink text-vastraa-white text-center py-6 text-[10px] font-bold uppercase tracking-[0.4em] overflow-hidden transition-all duration-500"
              >
                <span className="relative z-10">Proceed to Checkout</span>
                <div className="absolute inset-0 bg-vastraa-clay translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
              </Link>
              <p className="text-center text-[8px] uppercase tracking-widest text-vastraa-ink/40 mt-4 font-bold flex items-center justify-center gap-2">
                Secure Checkout Powered by Razorpay
              </p>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
