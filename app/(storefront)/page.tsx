import { ArrowRight, Star } from 'lucide-react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default function HomePage() {
  const categories = ['All', 'Tops', 'Bottoms', 'Dresses', 'Sets', 'Accessories']
  
  return (
    <div className="flex flex-col w-full">
      {/* Scrolling Marquee */}
      <div className="bg-vastraa-ink text-vastraa-white py-3 overflow-hidden border-y border-vastraa-ink/20">
        <div className="flex whitespace-nowrap animate-marquee">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex shrink-0 items-center gap-12 px-6">
              <span className="text-xs uppercase tracking-[0.3em] font-medium flex items-center gap-4">
                Free shipping over ₹999 <span className="text-vastraa-clay">✦</span>
              </span>
              <span className="text-xs uppercase tracking-[0.3em] font-medium flex items-center gap-4">
                Easy 30-day returns <span className="text-vastraa-clay">✦</span>
              </span>
              <span className="text-xs uppercase tracking-[0.3em] font-medium flex items-center gap-4">
                Handcrafted in India <span className="text-vastraa-clay">✦</span>
              </span>
              <span className="text-xs uppercase tracking-[0.3em] font-medium flex items-center gap-4">
                Woven for Everyday <span className="text-vastraa-clay">✦</span>
              </span>
              <span className="text-xs uppercase tracking-[0.3em] font-medium flex items-center gap-4">
                Tradition, Tailored for Today <span className="text-vastraa-clay">✦</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <section className="container-wide section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <span className="text-vastraa-clay uppercase tracking-[0.3em] font-bold text-xs inline-block">Vastraa Studio 2024</span>
            <h1 className="text-5xl md:text-7xl leading-[1.1] font-serif text-vastraa-ink">
              Contemporary Essentials, <br />
              <span className="italic text-vastraa-clay underline decoration-vastraa-clay/30 underline-offset-8">Rooted</span> in Tradition
            </h1>
            <p className="text-lg text-vastraa-ink/60 max-w-lg leading-relaxed">
              Discover a curated collection of garments that bridge the gap between artisanal heritage and modern silhouettes. Designed in Indore, woven for the world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/shop" className="bg-vastraa-clay text-white px-10 py-5 text-sm font-bold uppercase tracking-widest hover:bg-vastraa-ink transition-all duration-300 flex items-center justify-center gap-2">
                Shop Now <ArrowRight size={18} />
              </Link>
              <Link href="/shop" className="border-2 border-vastraa-ink text-vastraa-ink px-10 py-5 text-sm font-bold uppercase tracking-widest hover:bg-vastraa-ink hover:text-white transition-all duration-300 flex items-center justify-center">
                See Collections
              </Link>
            </div>
          </div>
          <div className="relative aspect-[4/5] bg-vastraa-beige overflow-hidden">
             {/* Placeholder for Hero Image */}
             <div className="absolute inset-0 flex items-center justify-center text-vastraa-ink/20 font-serif text-2xl italic">
                [ New Arrivals Image ]
             </div>
             <div className="absolute top-8 right-8 bg-vastraa-clay text-white px-6 py-3 text-xs font-bold uppercase tracking-widest -rotate-6 shadow-xl">
               New Arrivals
             </div>
          </div>
        </div>
      </section>

      {/* Product Grid / Filter Section */}
      <section className="bg-white section-padding border-t border-vastraa-ink/5">
        <div className="container-wide">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div className="space-y-4">
               <h2 className="text-4xl font-serif">Curated for You</h2>
               <div className="flex flex-wrap gap-2">
                  {categories.map((cat, idx) => (
                    <button 
                      key={idx} 
                      className={`px-6 py-2 text-xs uppercase tracking-widest font-bold transition-all duration-200 ${idx === 0 ? 'bg-vastraa-ink text-white' : 'border border-vastraa-ink/20 text-vastraa-ink/60 hover:border-vastraa-ink hover:text-vastraa-ink'}`}
                    >
                      {cat}
                    </button>
                  ))}
               </div>
            </div>
            <Link href="/shop" className="text-xs uppercase tracking-widest font-bold border-b-2 border-vastraa-clay pb-1 hover:text-vastraa-clay transition-colors inline-block">
              Browse All
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {/* Sample Products */}
            {[1, 2, 3].map((id) => (
              <div key={id} className="group cursor-pointer">
                <div className="relative aspect-[3/4] bg-vastraa-beige mb-6 overflow-hidden">
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] uppercase font-bold tracking-widest border border-vastraa-ink/5">
                    Essentials
                  </div>
                  <div className="absolute top-4 right-4 bg-vastraa-clay text-white px-3 py-1 text-[10px] uppercase font-bold tracking-widest">
                    Popular
                  </div>
                  {/* Image Placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center text-vastraa-ink/10 font-serif text-lg">
                    [ Product Image {id} ]
                  </div>
                </div>
                <div className="space-y-2">
                   <div className="flex justify-between items-start">
                     <h3 className="text-xl font-serif text-vastraa-ink group-hover:text-vastraa-clay transition-colors italic">Organic Cotton Tunic 0{id}</h3>
                     <span className="flex items-center gap-1 text-vastraa-green text-[10px] font-bold uppercase">
                       <div className="w-1.5 h-1.5 rounded-full bg-vastraa-green"></div> In Stock
                     </span>
                   </div>
                   <div className="flex items-center gap-3">
                     <span className="text-lg font-bold">₹1,499</span>
                     <span className="text-sm text-vastraa-ink/30 line-through">₹2,999</span>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-vastraa-ink text-white py-24">
        <div className="container-wide text-center space-y-8">
           <span className="text-vastraa-clay uppercase tracking-[0.4em] font-bold text-xs">Our Philosophy</span>
           <h2 className="text-4xl md:text-6xl font-serif max-w-4xl mx-auto leading-tight italic">
             Tradition is not about preserving ashes, but about passing on the flame.
           </h2>
           <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <Link href="/shop" className="bg-vastraa-clay text-white px-10 py-5 text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-vastraa-ink transition-all duration-300">
                Join the Loom
              </Link>
              <Link href="/about" className="border border-white/20 text-white px-10 py-5 text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-vastraa-ink transition-all duration-300">
                Our Story
              </Link>
           </div>
        </div>
      </section>

      {/* Stats Row */}
      <section className="bg-vastraa-white border-y border-vastraa-ink/10">
        <div className="container-wide">
           <div className="grid grid-cols-1 md:grid-cols-3">
              <div className="py-20 flex flex-col items-center justify-center text-center space-y-4 md:border-r border-vastraa-ink/10">
                 <span className="text-5xl font-serif italic">51K+</span>
                 <span className="text-xs uppercase tracking-widest font-bold text-vastraa-ink/60">Happy Customers</span>
              </div>
              <div className="py-20 flex flex-col items-center justify-center text-center space-y-4 md:border-r border-vastraa-ink/10">
                 <span className="text-5xl font-serif italic">200+</span>
                 <span className="text-xs uppercase tracking-widest font-bold text-vastraa-ink/60">Modern Styles</span>
              </div>
              <div className="py-20 flex flex-col items-center justify-center text-center space-y-4">
                 <span className="text-5xl font-serif italic">100%</span>
                 <span className="text-xs uppercase tracking-widest font-bold text-vastraa-ink/60">Natural Fabrics</span>
              </div>
           </div>
        </div>
      </section>

    </div>
  )
}
