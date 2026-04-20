"use client"

import { Filter, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import { getDriveImageUrl } from '@/lib/utils'

export default function ShopPage() {
  const categories = ['All', 'Tops', 'Bottoms', 'Dresses', 'Sets', 'Accessories']
  
  // Placeholder products with different grid spans for asymmetrical layout
  const products = [
    { id: 1, name: 'Hand-Woven Silk Tunic', price: '₹4,999', category: 'Tops', span: 'col-span-12 md:col-span-8 lg:col-span-7', height: 'aspect-[16/9]' },
    { id: 2, name: 'Linen Wide-Leg Trousers', price: '₹3,499', category: 'Bottoms', span: 'col-span-12 md:col-span-4 lg:col-span-5', height: 'aspect-[4/5]' },
    { id: 3, name: 'Indigo Dye Wrap Dress', price: '₹5,299', category: 'Dresses', span: 'col-span-12 md:col-span-6 lg:col-span-4', height: 'aspect-[3/4]' },
    { id: 4, name: 'Kalamkari Print Scarf', price: '₹1,299', category: 'Accessories', span: 'col-span-12 md:col-span-6 lg:col-span-4', height: 'aspect-[1/1]' },
    { id: 5, name: 'Hand-Spun Khadi Shirt', price: '₹2,899', category: 'Tops', span: 'col-span-12 md:col-span-12 lg:col-span-4', height: 'aspect-[4/3]' },
    { id: 6, name: 'Embroidered Kaftan Set', price: '₹7,499', category: 'Sets', span: 'col-span-12 md:col-span-12 lg:col-span-12', height: 'aspect-[21/9]' },
  ]

  return (
    <div className="bg-vastraa-white min-h-screen">
      {/* Editorial Header */}
      <header className="container-wide py-20 md:py-32 space-y-6">
        <motion.div 
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          viewport={{ once: true }}
          className="max-w-3xl"
        >
          <span className="text-vastraa-clay uppercase tracking-[0.3em] font-bold text-xs underline underline-offset-8">Curated Collections</span>
          <h1 className="text-6xl md:text-8xl font-serif text-vastraa-ink mt-8 leading-tight">
            The Art of <br /><span className="italic">Everyday</span> Dressing
          </h1>
          <p className="text-lg text-vastraa-ink/60 mt-8 leading-relaxed max-w-xl">
            A celebration of Indian craftsmanship through a contemporary lens. Explore our latest silhouettes designed for comfort and elegance.
          </p>
        </motion.div>
      </header>

      {/* Sticky Filter Bar */}
      <div className="sticky top-20 z-40 bg-vastraa-white/95 backdrop-blur-sm border-y border-vastraa-ink/10">
        <div className="container-wide py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat, idx) => (
              <button 
                key={idx} 
                className={`px-4 py-1.5 text-[10px] uppercase tracking-widest font-bold transition-all duration-200 border ${idx === 0 ? 'bg-vastraa-ink text-white border-vastraa-ink' : 'border-transparent text-vastraa-ink/60 hover:text-vastraa-ink'}`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-8">
            <button className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest hover:text-vastraa-clay group">
              <Filter size={14} className="group-hover:rotate-180 transition-transform duration-500" /> Filters
            </button>
            <button className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest hover:text-vastraa-clay">
              Sort By <ChevronDown size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Asymmetrical Product Grid */}
      <section className="container-wide py-16">
        <motion.div 
          initial="initial"
          whileInView="animate"
          variants={staggerContainer}
          viewport={{ once: true }}
          className="grid grid-cols-12 gap-8 md:gap-12"
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              variants={fadeInUp}
              className={`${product.span}`}
            >
              <Link 
                href={`/shop/${product.id}`}
                className="group flex flex-col space-y-6"
              >
                <div className={`relative ${product.height} bg-vastraa-beige overflow-hidden rounded-none`}>
                  <div className="absolute top-6 left-6 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                     <span className="bg-white/90 px-4 py-2 text-[10px] font-bold uppercase tracking-widest border border-vastraa-ink/10">Quick View</span>
                  </div>
                  {/* Image with subtle zoom */}
                  <div className="absolute inset-0 transition-transform duration-[1.5s] ease-in-out group-hover:scale-[1.05]">
                    <div className="absolute inset-0 flex items-center justify-center text-vastraa-ink/5 font-serif text-2xl italic uppercase tracking-widest">
                      [ {product.name} ]
                    </div>
                  </div>
                </div>
                <div className="space-y-2 flex justify-between items-end border-b border-vastraa-ink/10 pb-6 transition-colors group-hover:border-vastraa-clay">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-vastraa-ink/40">{product.category}</span>
                    <h3 className="text-2xl font-serif italic text-vastraa-ink group-hover:text-vastraa-clay transition-colors">{product.name}</h3>
                  </div>
                  <span className="text-xl font-bold tracking-tighter">{product.price}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Pagination / Load More */}
      <div className="container-wide py-20 flex justify-center">
        <button className="border-2 border-vastraa-ink text-vastraa-ink px-16 py-5 text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-vastraa-ink hover:text-white transition-all duration-700">
          Load More Styles
        </button>
      </div>
    </div>
  )
}
