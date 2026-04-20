"use client"

import { useCartStore } from '@/store/cartStore'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { ShoppingCart, Plus, Minus, X, Trash2 } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { heightCollapse } from '@/lib/animations'
import { getDriveImageUrl, cn } from '@/lib/utils'

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
          <button className="relative p-2 text-white/60 hover:text-white transition-colors group">
            <ShoppingCart size={20} />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white text-[8px] w-4 h-4 flex items-center justify-center font-bold rounded-full">
                {itemCount}
              </span>
            )}
          </button>
        )}
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-xl bg-background border-l border-white/10 p-0 flex flex-col h-full rounded-none selection:bg-primary selection:text-white">
        <SheetHeader className="p-10 border-b border-white/5">
          <SheetTitle className="text-xs font-bold uppercase tracking-[0.4em] text-white flex items-center justify-between">
            Shopping Bag
            <button 
              onClick={() => setIsOpen(false)}
              className="p-2 text-white/20 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto no-scrollbar p-10 space-y-12">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-8">
              <div className="relative">
                <ShoppingCart size={80} className="text-white/5" strokeWidth={1} />
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="absolute inset-0 bg-primary/5 blur-3xl rounded-full"
                />
              </div>
              <div className="space-y-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/20 leading-relaxed">
                  Your bag is empty. <br /> Find your next signature piece.
                </p>
                <Link 
                  href="/shop" 
                  onClick={() => setIsOpen(false)}
                  className="inline-block text-[10px] uppercase font-black tracking-[0.3em] text-primary hover:text-white transition-all border-b border-primary/30 pb-1"
                >
                  Browse Collections
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-12">
              <AnimatePresence initial={false}>
                {items.map((item) => (
                  <motion.div 
                    key={`${item.id}-${item.size}`} 
                    variants={heightCollapse}
                    initial="initial"
                    exit="exit"
                    className="grid grid-cols-12 gap-6 pb-10 border-b border-white/5 last:border-0 overflow-hidden group"
                  >
                    {/* Item Image */}
                    <div className="col-span-4">
                      <div className="aspect-[3/4] bg-white/5 relative rounded-2xl overflow-hidden border border-white/5">
                        {item.image ? (
                           <Image 
                             src={getDriveImageUrl(item.image)} 
                             alt={item.name} 
                             fill 
                             sizes="150px"
                             className="object-cover transition-transform duration-700 group-hover:scale-110" 
                           />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center text-[10px] font-serif italic text-white/10 uppercase p-2">
                             Vastraa
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Metadata */}
                    <div className="col-span-8 flex flex-col justify-between py-1">
                      <div className="space-y-3">
                        <div className="flex justify-between items-start">
                          <h3 className="text-sm font-serif italic text-white/90">{item.name}</h3>
                          <button 
                            onClick={() => removeItem(item.id, item.size)}
                            className="text-white/10 hover:text-primary transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          {item.size && (
                            <span className="text-[9px] uppercase tracking-widest font-black text-white/20 border border-white/5 px-2 py-1 rounded">
                              Size: {item.size}
                            </span>
                          )}
                          <span className="text-xs font-bold text-white/60 tracking-tighter">₹{item.price.toLocaleString()}</span>
                        </div>

                        <div className="pt-4 flex items-center gap-4">
                          <div className="flex items-center bg-white/5 rounded-full border border-white/5 overflow-hidden">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1, item.size)}
                              className="p-2 px-3 hover:bg-white/10 transition-colors"
                            >
                              <Minus size={12} className="text-white/40" />
                            </button>
                            <span className="w-8 text-center text-xs font-bold text-white">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1, item.size)}
                              className="p-2 px-3 hover:bg-white/10 transition-colors"
                            >
                              <Plus size={12} className="text-white/40" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-10 bg-surface/50 backdrop-blur-3xl border-t border-white/5 space-y-8">
            <div className="space-y-4">
              <div className="flex justify-between items-center text-[10px] uppercase tracking-[0.4em]">
                <span className="text-white/20 font-bold">Total Pieces</span>
                <span className="text-white/80">{itemCount}</span>
              </div>
              <div className="flex justify-between items-center pt-6 border-t border-white/5">
                <span className="text-xs font-black uppercase tracking-[0.4em] text-white/40">Estimated Total</span>
                <span className="text-3xl font-serif italic text-white tracking-tighter">₹{total.toLocaleString()}</span>
              </div>
            </div>
            
            <div className="pt-2">
              <Link 
                href="/checkout"
                onClick={() => setIsOpen(false)}
                className="luxury-button w-full block text-center text-xs"
              >
                Proceed to Checkout
              </Link>
              <p className="text-center text-[8px] uppercase tracking-[0.3em] text-white/20 mt-6 font-bold flex items-center justify-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-vastraa-green" />
                Payments secured by Razorpay
              </p>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
