import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-vastraa-ink text-vastraa-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Col */}
          <div className="space-y-6">
            <Link href="/" className="flex flex-col items-start">
              <span className="text-3xl font-serif font-bold tracking-tighter leading-none">VASTRAA</span>
              <span className="text-lg font-hindi text-vastraa-clay leading-none mt-1 ml-1">वस्त्र</span>
            </Link>
            <p className="text-sm text-vastraa-white/60 leading-relaxed max-w-xs lowercase italic">
              &quot;Woven for Everyday&quot; — Contemporary essentials rooted in Indian tradition, crafted for the modern individual.
            </p>
          </div>

          {/* Shop Col */}
          <div className="space-y-6">
            <h4 className="text-vastraa-clay uppercase tracking-[0.2em] font-bold text-xs">Shop</h4>
            <ul className="space-y-4">
              <li><Link href="/shop" className="text-sm hover:text-vastraa-clay transition-colors">Tops</Link></li>
              <li><Link href="/shop" className="text-sm hover:text-vastraa-clay transition-colors">Bottoms</Link></li>
              <li><Link href="/shop" className="text-sm hover:text-vastraa-clay transition-colors">Dresses</Link></li>
              <li><Link href="/shop" className="text-sm hover:text-vastraa-clay transition-colors">Accessories</Link></li>
            </ul>
          </div>

          {/* Account Col */}
          <div className="space-y-6">
            <h4 className="text-vastraa-clay uppercase tracking-[0.2em] font-bold text-xs">Account</h4>
            <ul className="space-y-4">
              <li><Link href="/login" className="text-sm hover:text-vastraa-clay transition-colors">Sign In</Link></li>
              <li><Link href="/register" className="text-sm hover:text-vastraa-clay transition-colors">Create Account</Link></li>
              <li><Link href="/account/orders" className="text-sm hover:text-vastraa-clay transition-colors">Order History</Link></li>
              <li><Link href="/cart" className="text-sm hover:text-vastraa-clay transition-colors">Your Cart</Link></li>
            </ul>
          </div>

          {/* Help Col */}
          <div className="space-y-6">
            <h4 className="text-vastraa-clay uppercase tracking-[0.2em] font-bold text-xs">Help</h4>
            <ul className="space-y-4">
              <li><Link href="/contact" className="text-sm hover:text-vastraa-clay transition-colors">Contact Us</Link></li>
              <li><Link href="/shipping" className="text-sm hover:text-vastraa-clay transition-colors">Shipping Info</Link></li>
              <li><Link href="/returns" className="text-sm hover:text-vastraa-clay transition-colors">Returns & Exchanges</Link></li>
              <li><Link href="/faq" className="text-sm hover:text-vastraa-clay transition-colors">FAQ</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 pt-8 border-t border-vastraa-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] uppercase tracking-widest text-vastraa-white/40">
            © {new Date().getFullYear()} Vastraa. All rights reserved.
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-[10px] uppercase tracking-widest text-vastraa-white/40 hover:text-vastraa-clay">Instagram</a>
            <a href="#" className="text-[10px] uppercase tracking-widest text-vastraa-white/40 hover:text-vastraa-clay">Pinterest</a>
            <a href="#" className="text-[10px] uppercase tracking-widest text-vastraa-white/40 hover:text-vastraa-clay">Twitter</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
