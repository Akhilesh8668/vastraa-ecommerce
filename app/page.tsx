"use client"

import { ArrowRight, ArrowUpRight, TrendingUp, Globe, ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export default function HomePage() {
  const categories = ['All Collections', 'Essential Tops', 'Luxury Bottoms', 'Handcrafted Sets', 'Seasonal Accessories']
  
  const stats = [
    { label: 'Happy Customers', value: '51K+', icon: <TrendingUp className="text-primary" size={16} /> },
    { label: 'Global Shipments', value: '12+', icon: <Globe className="text-primary" size={16} /> },
    { label: 'Artisanal Styles', value: '250+', icon: <ShoppingBag className="text-primary" size={16} /> },
  ]

  return (
    <div className="flex flex-col w-full bg-background selection:bg-primary selection:text-white">
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-32 pb-20 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 blur-[120px] rounded-full animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-vastraa-clay/20 blur-[120px] rounded-full" />
        </div>

        <div className="container-wide relative z-10 text-center space-y-12">
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-block px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-[10px] sm:text-xs font-bold uppercase tracking-[0.4em] text-white/40">
              New Collection <span className="text-primary ml-2">•</span> Vol. 04
            </span>
          </motion.div>

          {/* Headline */}
          <div className="space-y-4">
            <motion.h1 
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="text-6xl md:text-8xl lg:text-[10rem] font-serif leading-[0.85] tracking-tighter pr-4"
            >
              CRAFTED <br />
              <span className="italic text-gradient sm:pr-8">TIMELESS</span>
            </motion.h1>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="text-sm md:text-lg text-white/40 max-w-xl mx-auto uppercase tracking-widest font-medium pt-4"
            >
              Essential garments bridging heritage <br className="hidden md:block" /> 
              craft and architectural silhouettes.
            </motion.p>
          </div>

          {/* CTA Buttons */}
          <motion.div 
             initial={{ y: 20, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ duration: 1, delay: 0.8 }}
             className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6"
          >
            <Link 
              href="/shop" 
              className="group bg-white text-black px-12 py-5 rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:bg-primary hover:text-white transition-all duration-500 shadow-2xl flex items-center gap-3"
            >
              Explore Collection <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="/about" 
              className="text-xs font-bold uppercase tracking-[0.2em] text-white border-b border-white/20 pb-2 hover:border-primary transition-all flex items-center gap-2"
            >
              Our Philosophy <ArrowUpRight size={14} />
            </Link>
          </motion.div>

          {/* Hero Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="pt-24 grid grid-cols-2 md:grid-cols-3 gap-12 border-t border-white/5"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="space-y-2 group">
                 <div className="flex items-center justify-center gap-2 text-white/30 group-hover:text-primary transition-colors">
                   {stat.icon}
                   <span className="text-[10px] uppercase tracking-[0.3em] font-bold">{stat.label}</span>
                 </div>
                 <div className="text-3xl font-serif italic text-white/90">{stat.value}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Scrolling Marquee / Ticker */}
      <div className="py-8 bg-white/5 border-y border-white/10 overflow-hidden relative group">
        <div className="flex whitespace-nowrap animate-marquee">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex shrink-0 items-center gap-16 px-8">
              {['FREE GLOBAL SHIPPING', 'ETHICALLY HANDCRAFTED', 'PREMIUM ORGANIC FIBERS', 'DESIGNED IN INDORE'].map((text) => (
                <span key={text} className="text-[10px] md:text-xs uppercase tracking-[0.5em] font-black text-white/20 group-hover:text-white/40 transition-colors flex items-center gap-4">
                  {text} <span className="text-primary">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Featured Collection Section */}
      <section className="section-padding bg-[#0e0e0e]">
        <div className="container-wide">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-24">
            <div className="space-y-6">
               <span className="text-primary uppercase tracking-[0.4em] font-bold text-xs inline-block">Curated Selections</span>
               <h2 className="text-5xl md:text-7xl font-serif leading-none italic tracking-tighter">Season Essentials</h2>
            </div>
            <div className="flex flex-wrap gap-3">
               {categories.map((cat, idx) => (
                 <button 
                   key={idx} 
                   className={cn(
                     "px-8 py-3 text-[10px] uppercase tracking-widest font-bold transition-all duration-300 rounded-full",
                     idx === 0 ? "bg-white text-black" : "border border-white/10 text-white/40 hover:border-white/40 hover:text-white"
                   )}
                 >
                   {cat}
                 </button>
               ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20">
            {[1, 2, 3].map((id) => (
              <motion.div 
                key={id} 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: id * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[4/5] bg-white/5 p-4 rounded-[2rem] mb-8 overflow-hidden transition-all duration-700 bg-gradient-to-br from-white/5 to-transparent border border-white/5 group-hover:border-white/20 group-hover:shadow-[0_0_50px_-12px_rgba(198,93,59,0.2)]">
                  <div className="absolute top-6 left-6 z-10">
                    <span className="bg-white text-black text-[9px] font-black uppercase tracking-[0.3em] px-3 py-1.5 rounded-full">New In</span>
                  </div>
                  {/* Image Placeholder with Parallax-ready feel */}
                  <div className="absolute inset-0 flex items-center justify-center text-white/5 font-serif text-3xl italic scale-150 group-hover:scale-100 transition-transform duration-1000">
                    VASTRAA
                  </div>
                   <div className="absolute bottom-6 right-6 p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white translate-y-20 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                     <ShoppingBag size={20} />
                   </div>
                </div>
                <div className="space-y-4 px-2">
                   <div className="flex justify-between items-baseline">
                     <h3 className="text-2xl font-serif italic text-white group-hover:text-primary transition-colors">Vol 04. Arched Tunic</h3>
                     <span className="text-sm font-bold text-white/30 tracking-widest">₹3,499</span>
                   </div>
                   <div className="flex gap-2">
                     {['S', 'M', 'L', 'XL'].map(size => (
                       <span key={size} className="text-[10px] w-6 h-6 flex items-center justify-center rounded-full border border-white/5 text-white/20">{size}</span>
                     ))}
                   </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Philoshophy / CTA Banner */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
           <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background z-10" />
           <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1549497538-303791108f95?q=80&w=2000')] bg-cover bg-center opacity-30 grayscale saturate-0" />
        </div>
        
        <div className="container-wide relative z-20 text-center space-y-12">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-primary uppercase tracking-[0.5em] font-black text-xs block"
            >
              The Locus of Craft
            </motion.span>
            <motion.h2 
               initial={{ y: 60, opacity: 0 }}
               whileInView={{ y: 0, opacity: 1 }}
               viewport={{ once: true }}
               className="text-4xl md:text-7xl font-serif max-w-5xl mx-auto leading-[0.9] italic tracking-tighter"
            >
              "Tradition is not about preserving ashes, but about passing on <span className="text-gradient">the flame</span>."
            </motion.h2>
            <motion.div 
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               transition={{ delay: 0.5 }}
               className="pt-8"
            >
               <Link href="/about" className="luxury-button">
                 Explore Our Story
               </Link>
            </motion.div>
        </div>
      </section>

    </div>
  )
}
