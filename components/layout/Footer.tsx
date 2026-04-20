import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-white/5 pt-24 pb-12">
      <div className="container-wide">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-8 mb-24">
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-2 space-y-8">
            <Link href="/" className="inline-flex items-baseline gap-2">
              <span className="text-4xl font-serif font-bold tracking-tighter text-white">VASTRAA</span>
              <span className="text-sm font-hindi text-primary">वस्त्र</span>
            </Link>
            <p className="text-white/40 max-w-sm leading-relaxed text-sm">
              Contemporary Indian menswear designed for the modern connoisseur. 
              Bridging the gap between heritage weaving and architectural silhouettes.
            </p>
            <div className="flex gap-6 items-center pt-4">
              {['Instagram', 'Twitter', 'Pinterest'].map((social) => (
                <Link 
                  key={social} 
                  href="#" 
                  className="text-[10px] uppercase tracking-widest font-bold text-white/30 hover:text-primary transition-colors"
                >
                  {social}
                </Link>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="space-y-6">
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/20">Navigation</h4>
            <ul className="space-y-4">
              <li><Link href="/shop" className="text-sm text-white/60 hover:text-white transition-colors">Latest Collections</Link></li>
              <li><Link href="/shop" className="text-sm text-white/60 hover:text-white transition-colors">Essentials</Link></li>
              <li><Link href="/about" className="text-sm text-white/60 hover:text-white transition-colors">Our Studio</Link></li>
              <li><Link href="/register" className="text-sm text-white/60 hover:text-white transition-colors">Partner Program</Link></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/20">Support</h4>
            <ul className="space-y-4">
              <li><Link href="#" className="text-sm text-white/60 hover:text-white transition-colors">Shipping & Returns</Link></li>
              <li><Link href="#" className="text-sm text-white/60 hover:text-white transition-colors">Size Guide</Link></li>
              <li><Link href="#" className="text-sm text-white/60 hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="#" className="text-sm text-white/60 hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] uppercase tracking-[0.2em] text-white/20">
            &copy; {currentYear} Vastraa Studio. Distributed by Manish Garments.
          </p>
          <div className="flex gap-8 text-[10px] uppercase tracking-[0.2em] text-white/20">
            <span>Privacy Policy</span>
            <span>Cookie Settings</span>
            <span className="text-primary/50">Designed in Indore</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
