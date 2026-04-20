"use client"

import { Filter, ChevronDown, ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { getDriveImageUrl, cn } from '@/lib/utils'

export default function ShopPage() {
  const categories = ['All Collections', 'Tops', 'Bottoms', 'Sets', 'Accessories']
  
  const products = [
    { id: 1, name: 'Hand-Woven Silk Tunic', price: '₹4,999', category: 'Tops', span: 'col-span-12 md:col-span-8 lg:col-span-7', height: 'aspect-[16/9]' },
    { id: 2, name: 'Linen Wide-Leg Trousers', price: '₹3,499', category: 'Bottoms', span: 'col-span-12 md:col-span-4 lg:col-span-5', height: 'aspect-[4/5]' },
    { id: 3, name: 'Indigo Dye Wrap Dress', price: '₹5,299', category: 'Dresses', span: 'col-span-12 md:col-span-6 lg:col-span-4', height: 'aspect-[3/4]' },
    { id: 4, name: 'Kalamkari Print Scarf', price: '₹1,299', category: 'Accessories', span: 'col-span-12 md:col-span-6 lg:col-span-4', height: 'aspect-[1/1]' },
    { id: 5, name: 'Hand-Spun Khadi Shirt', price: '₹2,899', category: 'Tops', span: 'col-span-12 md:col-span-12 lg:col-span-4', height: 'aspect-[4/3]' },
    { id: 6, name: 'Embroidered Kaftan Set', price: '₹7,499', category: 'Sets', span: 'col-span-12 md:col-span-12 lg:col-span-12', height: 'aspect-[21/9]' },
  ]

  return (
    <div className="bg-background min-h-screen pt-32 selection:bg-primary selection:text-white">
      {/* Editorial Header */}
      <header className="container-wide py-20 space-y-12 border-b border-white/5">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-4xl"
        >
          <span className="text-primary uppercase tracking-[0.5em] font-black text-[10px] sm:text-xs">Curated Archive</span>
          <h1 className="text-6xl md:text-[9rem] font-serif text-white mt-10 leading-[0.85] tracking-tighter italic">
            Art of <br /> Dressing
          </h1>
          <p className="text-sm md:text-lg text-white/40 mt-10 leading-relaxed max-w-2xl uppercase tracking-widest font-medium">
            A celebration of Indian craftsmanship through a contemporary lens. Designed in Indore, woven for the world.
          </p>
        </motion.div>
      </header>

      {/* Glass Filter Bar */}
      <div className="sticky top-24 z-40 my-10">
        <div className="container-wide">
           <div className="bg-surface/60 backdrop-blur-3xl border border-white/10 rounded-2xl md:rounded-full py-2 md:py-3 px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6 shadow-2xl overflow-hidden">
              <div className="flex items-center gap-4 w-full md:w-auto overflow-x-auto no-scrollbar pb-2 md:pb-0 scroll-smooth">
                {categories.map((cat, idx) => (
                  <button 
                    key={idx} 
                    className={cn(
                      "px-5 py-2 text-[10px] uppercase tracking-widest font-black transition-all duration-300 rounded-full whitespace-nowrap",
                      idx === 0 ? "bg-white text-black" : "text-white/40 hover:text-white"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-6 md:gap-10 border-t md:border-t-0 border-white/5 pt-3 md:pt-0 w-full md:w-auto justify-center md:justify-end">
                <button className="flex items-center gap-3 text-[10px] uppercase font-black tracking-widest text-white/60 hover:text-primary transition-colors">
                  <Filter size={14} /> Refine
                </button>
                <div className="w-px h-6 bg-white/10 hidden md:block" />
                <button className="flex items-center gap-3 text-[10px] uppercase font-black tracking-widest text-white/60 hover:text-primary transition-colors">
                  Sort <ChevronDown size={14} />
                </button>
              </div>
           </div>
        </div>
      </div>

      {/* Asymmetrical Product Grid */}
      <section className="container-wide py-16">
        <div className="grid grid-cols-12 gap-10 md:gap-16">
          {products.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.8 }}
              className={cn(product.span, "group")}
            >
              <Link 
                href={`/shop/${product.id}`}
                className="flex flex-col space-y-8"
              >
                <div className={cn(
                  "relative bg-surface p-4 rounded-[2.5rem] overflow-hidden border border-white/5 transition-all duration-700",
                  "group-hover:border-white/20 group-hover:shadow-[0_0_80px_-20px_rgba(198,93,59,0.15)]",
                  product.height
                )}>
                  {/* Floating Bag Icon */}
                  <div className="absolute top-8 right-8 p-5 rounded-full bg-white/10 backdrop-blur-xl border border-white/10 text-white translate-y-20 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 z-10">
                     <ShoppingBag size={24} />
                  </div>
                  
                  {/* Image Context Placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center text-white/5 font-serif text-5xl italic scale-150 group-hover:scale-100 transition-transform duration-1000">
                    {product.category}
                  </div>
                </div>
                
                <div className="space-y-4 px-4">
                  <div className="flex justify-between items-baseline border-b border-white/5 pb-8 group-hover:border-primary transition-colors">
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.4em] font-black text-white/20 mb-2 block">{product.category}</span>
                      <h3 className="text-3xl font-serif italic text-white group-hover:text-primary transition-colors">{product.name}</h3>
                    </div>
                    <span className="text-xl font-black text-white tracking-tighter">{product.price}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pagination */}
      <div className="container-wide py-32 flex justify-center">
        <button className="luxury-button rounded-full">
          Browse More Perspectives
        </button>
      </div>
    </div>
  )
}
