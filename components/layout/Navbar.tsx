"use client"

import Link from 'next/link'
import { ShoppingCart, User, Menu, X } from 'lucide-react'
import { useState } from 'react'
import CartDrawer from '@/components/cart/CartDrawer'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 w-full bg-vastraa-white/80 backdrop-blur-md border-b border-vastraa-ink/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2">
            <Link href="/" className="flex flex-col items-start translate-y-1">
              <span className="text-3xl font-serif font-bold tracking-tighter leading-none">VASTRAA</span>
              <span className="text-lg font-hindi text-vastraa-clay leading-none -mt-1 ml-1">वस्त्र</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-12">
            <Link href="/shop" className="text-sm font-medium hover:text-vastraa-clay transition-colors uppercase tracking-widest">Collections</Link>
            <Link href="/shop" className="text-sm font-medium hover:text-vastraa-clay transition-colors uppercase tracking-widest">Shop</Link>
            <Link href="/about" className="text-sm font-medium hover:text-vastraa-clay transition-colors uppercase tracking-widest">About</Link>
          </div>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/login" className="text-sm font-medium hover:text-vastraa-clay transition-colors uppercase tracking-widest flex items-center gap-2">
              <User size={18} />
              Sign In
            </Link>
            <Link href="/shop" className="bg-vastraa-clay text-white px-8 py-3 text-sm font-bold uppercase tracking-widest hover:bg-vastraa-ink transition-colors duration-300">
              Shop Now
            </Link>
            <CartDrawer />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-4">
            <CartDrawer />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-vastraa-ink"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-vastraa-white border-t border-vastraa-ink/10 p-4 space-y-4">
          <Link href="/shop" className="block text-lg font-medium py-2">Collections</Link>
          <Link href="/shop" className="block text-lg font-medium py-2">Shop</Link>
          <Link href="/about" className="block text-lg font-medium py-2">About</Link>
          <div className="pt-4 flex flex-col gap-4">
            <Link href="/login" className="flex items-center gap-2 font-medium">
              <User size={20} />
              Sign In
            </Link>
            <Link href="/shop" className="bg-vastraa-clay text-white text-center py-4 font-bold uppercase tracking-widest">
              Shop Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
