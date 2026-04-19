"use client"

import { useState } from 'react'
import { ArrowLeft, ChevronRight, Heart, Share2 } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const [selectedSize, setSelectedSize] = useState('M')
  const sizes = ['XS', 'S', 'M', 'L', 'XL']

  return (
    <div className="bg-vastraa-white min-h-screen">
      <div className="container-wide py-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 mb-12">
          <Link href="/shop" className="text-[10px] uppercase font-bold tracking-widest text-vastraa-ink/40 hover:text-vastraa-clay transition-colors flex items-center gap-1">
            <ArrowLeft size={12} /> Back to Shop
          </Link>
          <ChevronRight size={10} className="text-vastraa-ink/20" />
          <span className="text-[10px] uppercase font-bold tracking-widest text-vastraa-ink/60">Essentials</span>
          <ChevronRight size={10} className="text-vastraa-ink/20" />
          <span className="text-[10px] uppercase font-bold tracking-widest text-vastraa-ink">Hand-Woven Silk Tunic</span>
        </nav>

        <div className="grid grid-cols-12 gap-12 lg:gap-24 relative">
          {/* Left Column: Sticky Product Info */}
          <motion.div 
            initial="initial"
            animate="animate"
            variants={fadeInUp}
            className="col-span-12 lg:col-span-4 space-y-12 lg:sticky lg:top-32 h-fit order-2 lg:order-1"
          >
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-vastraa-clay uppercase tracking-[0.4em] font-bold text-[10px]">Loom Collection 2024</span>
                <h1 className="text-4xl md:text-5xl font-serif text-vastraa-ink leading-tight italic">
                  Hand-Woven Silk Tunic
                </h1>
                <p className="text-2xl font-bold mt-4 tracking-tighter">₹4,999</p>
              </div>
              <p className="text-base text-vastraa-ink/60 leading-relaxed font-sans max-w-sm">
                A masterpiece of comfort and craftsmanship. This tunic is woven using traditional hand-looms in Maheshwar, featuring a subtle silk sheen and character that only true handwork can provide.
              </p>
            </div>

            {/* Size Selector */}
            <div className="space-y-6">
              <div className="flex justify-between items-center bg-vastraa-ink/5 p-4 rounded-none">
                <span className="text-[10px] uppercase font-bold tracking-widest">Select Size</span>
                <button className="text-[10px] uppercase font-bold tracking-widest underline underline-offset-4 hover:text-vastraa-clay transition-colors">Size Guide</button>
              </div>
              <div className="flex flex-wrap gap-3">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-14 h-14 flex items-center justify-center text-xs font-bold transition-all duration-500 border ${
                      selectedSize === size
                        ? 'bg-vastraa-ink text-vastraa-white border-vastraa-ink'
                        : 'bg-white text-vastraa-ink border-vastraa-ink/10 hover:border-vastraa-ink'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-4">
              <button className="relative overflow-hidden bg-vastraa-clay text-white py-6 px-8 text-sm font-bold uppercase tracking-[0.3em] group transition-all duration-500">
                <span className="relative z-10">Add to Cart</span>
                <div className="absolute inset-0 bg-vastraa-ink translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
              </button>
              <div className="flex gap-4">
                 <button className="flex-1 border-2 border-vastraa-ink/10 py-4 flex items-center justify-center gap-2 hover:border-vastraa-ink hover:text-vastraa-clay transition-all duration-300">
                    <Heart size={18} /> <span className="text-[10px] uppercase font-bold tracking-widest">Wishlist</span>
                 </button>
                 <button className="flex-1 border-2 border-vastraa-ink/10 py-4 flex items-center justify-center gap-2 hover:border-vastraa-ink hover:text-vastraa-clay transition-all duration-300">
                    <Share2 size={18} /> <span className="text-[10px] uppercase font-bold tracking-widest">Share</span>
                 </button>
              </div>
            </div>

            {/* Accordions */}
            <Accordion type="single" collapsible className="w-full border-t border-vastraa-ink/10">
              <AccordionItem value="fabric" className="border-b border-vastraa-ink/10">
                <AccordionTrigger className="text-[10px] uppercase font-bold tracking-[0.2em] py-8 hover:text-vastraa-clay no-underline transition-colors uppercase">
                  Fabric & Care
                </AccordionTrigger>
                <AccordionContent className="text-sm text-vastraa-ink/60 leading-relaxed font-sans pb-8">
                  100% Raw Hand-loomed Silk. Dry clean only to preserve the artisanal weave. 
                  Slight irregularities in the yarn are a characteristic of the hand-woven process 
                  and testify to its authenticity.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="shipping" className="border-b border-vastraa-ink/10">
                <AccordionTrigger className="text-[10px] uppercase font-bold tracking-[0.2em] py-8 hover:text-vastraa-clay no-underline transition-colors">
                  COMPLETE THE LOOK
                </AccordionTrigger>
                <AccordionContent className="text-sm text-vastraa-ink/60 leading-relaxed font-sans pb-8">
                  Free shipping within India on orders over ₹999. International shipping 
                  calculated at checkout. 30-day returns for unworn items with original 
                  tags intact.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.div>

          {/* Right Column: Staggered Gallery */}
          <motion.div 
            initial="initial"
            whileInView="animate"
            variants={staggerContainer}
            viewport={{ once: true }}
            className="col-span-12 lg:col-span-8 space-y-12 order-1 lg:order-2"
          >
            {[
              { aspect: 'aspect-[3/4]', label: 'Editorial Shot 01' },
              { aspect: 'aspect-[1/1]', label: 'Detail Shot 02' },
              { aspect: 'aspect-[4/5]', label: 'Full Look 03' },
              { aspect: 'aspect-[3/2]', label: 'Vibe Shot 04' },
            ].map((img, i) => (
              <motion.div 
                key={i} 
                variants={fadeInUp}
                className={`${img.aspect} bg-vastraa-beige overflow-hidden relative group rounded-none`}
              >
                <div className="absolute inset-0 flex items-center justify-center text-vastraa-ink/5 font-serif text-3xl italic uppercase tracking-widest select-none">
                  [ {img.label} ]
                </div>
                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                   <span className="text-[8px] uppercase tracking-[0.4em] font-bold text-vastraa-ink/40">IMAGE {i+1} / 04</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Recommended Section */}
      <section className="container-wide border-t border-vastraa-ink/10 mt-32 py-32">
        <h2 className="text-5xl font-serif italic mb-16 tracking-tight">Complete the Look</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
           {[1, 2, 3, 4].map((id) => (
             <div key={id} className="space-y-6 group cursor-pointer">
               <div className="aspect-[3/4] bg-vastraa-beige relative overflow-hidden">
                  <div className="absolute inset-0 bg-vastraa-ink/5 group-hover:bg-vastraa-ink/0 transition-colors duration-700"></div>
               </div>
               <div className="space-y-1 border-l-2 border-transparent group-hover:border-vastraa-clay pl-4 transition-all duration-300">
                  <h3 className="text-[10px] uppercase tracking-widest font-bold">Recommended Style 0{id}</h3>
                  <p className="text-lg text-vastraa-ink/60 italic font-serif">₹2,499</p>
               </div>
             </div>
           ))}
        </div>
      </section>
    </div>
  )
}
