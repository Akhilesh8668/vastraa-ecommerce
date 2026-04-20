"use client"

import Link from 'next/link'
import { Mail, Fingerprint, Sparkles, MoveLeft, ShieldCheck } from 'lucide-react'
import { motion } from 'framer-motion'

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden selection:bg-primary selection:text-white">
      
      {/* 1. THE RICH GRADIENT: Full screen depth */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/80 to-black opacity-100" />
        
        {/* Large Hindi Text Backdrop for Texture */}
        <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none opacity-[0.07]">
          <span className="text-[35rem] md:text-[50rem] font-hindi leading-none scale-125 rotate-12">वस्त्र</span>
        </div>

        {/* Abstract Architectural Lines */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-0 w-full h-px bg-white" />
          <div className="absolute top-0 right-1/4 w-px h-full bg-white" />
        </div>
      </div>

      {/* 2. THE ARCHITECTURAL CARD: Sharp, Integrated, Glassmorphic */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-4xl w-full mx-4 bg-black/40 backdrop-blur-3xl rounded-[2rem] relative z-10 border border-white/10 overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]"
      >
        <div className="flex flex-col lg:grid lg:grid-cols-2">
          
          {/* Left Column: Descriptive Content */}
          <div className="p-10 md:p-16 space-y-10 border-b lg:border-b-0 lg:border-r border-white/5">
            <header>
              <Link href="/" className="inline-flex items-baseline gap-2 group">
                <span className="text-3xl font-serif font-bold tracking-tighter text-white">VASTRAA</span>
                <span className="text-xs font-hindi text-white/40">वस्त्र</span>
              </Link>
            </header>

            <div className="space-y-6">
               <div className="inline-flex items-center gap-3 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/60">Digital Signature Required</span>
               </div>
               <h2 className="text-5xl md:text-7xl font-serif text-white italic tracking-tighter leading-[0.9]">
                 Identity <br /> 
                 <span className="text-white/40">Activation.</span>
               </h2>
               <p className="text-xs md:text-sm text-white/40 leading-relaxed font-medium uppercase tracking-[0.2em] max-w-sm">
                 We have dispatched a curatorial invitation to your email. Confirm your signature to activate your archive access.
               </p>
            </div>

            <div className="pt-8 flex items-center gap-6">
                <div className="flex -space-x-3">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-black bg-white/10 backdrop-blur-md flex items-center justify-center text-[8px] font-black">V</div>
                  ))}
                </div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/20 italic">Join 12,000+ Collectors</p>
            </div>
          </div>

          {/* Right Column: Interaction Area */}
          <div className="p-10 md:p-16 flex flex-col justify-center bg-white/[0.02] space-y-10">
             <div className="space-y-4">
                <Link
                  href="/login"
                  className="w-full bg-white text-black py-6 rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] hover:bg-primary hover:text-white transition-all duration-500 shadow-2xl flex items-center justify-center gap-4 group"
                >
                  Confirm Identity <Fingerprint size={18} className="group-hover:scale-110 transition-transform" />
                </Link>
                <div className="flex gap-4">
                   <button className="flex-1 py-4 border border-white/5 rounded-2xl text-[9px] font-black uppercase tracking-widest text-white/20 hover:bg-white hover:text-black transition-all">
                      Resend Email
                   </button>
                   <Link href="/" className="flex-1 py-4 border border-white/5 rounded-2xl text-[9px] font-black uppercase tracking-widest text-white/20 hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2">
                      <MoveLeft size={12} /> The Archive
                   </Link>
                </div>
             </div>

             <div className="space-y-6 pt-10 border-t border-white/5">
                <div className="flex items-center gap-4 text-white/20">
                  <ShieldCheck size={20} strokeWidth={1} />
                  <p className="text-[9px] font-black uppercase tracking-[0.2em]">Verified Curatorial Network</p>
                </div>
                <p className="text-[9px] text-white/20 leading-loose font-medium uppercase tracking-widest">
                  Authentication ensures the integrity of our artisanal supply chain. Need help? <span className="text-white underline cursor-pointer">Support Studio</span>
                </p>
             </div>
          </div>

        </div>
      </motion.div>

      {/* Decorative Branding Flairs */}
      <div className="absolute bottom-10 left-10 hidden md:block">
         <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/10 -rotate-90 origin-left">Indore / Heritage / Modern</p>
      </div>
    </div>
  )
}
