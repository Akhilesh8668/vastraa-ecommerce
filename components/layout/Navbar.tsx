"use client"

import Link from 'next/link'
import { ShoppingCart, User, Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CartDrawer from '@/components/cart/CartDrawer'
import { cn } from '@/lib/utils'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4 md:p-6 transition-all duration-500">
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "w-full max-w-5xl glass-pill px-6 md:px-10 py-3 md:py-4 flex justify-between items-center transition-all duration-500",
          scrolled ? "py-2 md:py-3 bg-white/10" : "bg-white/5"
        )}
      >
        <div className="flex-shrink-0 flex items-center gap-3">
          <Link href="/" className="group flex items-baseline gap-2">
            <span className="text-xl md:text-2xl font-serif font-bold tracking-tight text-white group-hover:text-primary transition-colors">VASTRAA</span>
            <span className="text-[10px] md:text-sm font-hindi text-primary/80">वस्त्र</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-10">
          <Link href="/shop" className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/60 hover:text-white transition-all hover:tracking-[0.4em]">Collections</Link>
          <Link href="/shop" className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/60 hover:text-white transition-all hover:tracking-[0.4em]">Shop</Link>
          <Link href="/about" className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/60 hover:text-white transition-all hover:tracking-[0.4em]">Studio</Link>
        </div>

        {/* Desktop Right Actions */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/login" className="text-white/60 hover:text-white transition-colors">
            <User size={18} />
          </Link>
          <div className="relative group">
             <CartDrawer />
          </div>
          <Link 
            href="/shop" 
            className="text-[10px] bg-white text-black px-6 py-2.5 rounded-full font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-all duration-300"
          >
            Explore
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-4">
          <CartDrawer />
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-white/80 hover:text-white"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Navigation Interface */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-24 left-4 right-4 bg-surface/95 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 space-y-6 md:hidden z-40 shadow-3xl"
          >
            <div className="space-y-4">
              <Link onClick={() => setIsMenuOpen(false)} href="/shop" className="block text-3xl font-serif italic text-white hover:text-primary transition-colors">Collections</Link>
              <Link onClick={() => setIsMenuOpen(false)} href="/shop" className="block text-3xl font-serif italic text-white hover:text-primary transition-colors">Shop</Link>
              <Link onClick={() => setIsMenuOpen(false)} href="/about" className="block text-3xl font-serif italic text-white hover:text-primary transition-colors">About Studio</Link>
            </div>
            <div className="pt-6 border-t border-white/5 flex flex-col gap-4">
              <Link onClick={() => setIsMenuOpen(false)} href="/login" className="flex items-center gap-3 text-lg text-white/60">
                <User size={20} />
                Manage Account
              </Link>
              <Link 
                onClick={() => setIsMenuOpen(false)} 
                href="/shop" 
                className="bg-primary text-white text-center py-5 rounded-2xl font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all"
              >
                Shop Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
