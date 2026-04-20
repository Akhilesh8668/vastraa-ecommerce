"use client"

import { useState } from 'react'
import { format } from 'date-fns'
import { Check, X, Loader2, User, Mail, Calendar, MessageSquareQuote } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ApprovalRequest {
  id: string
  user_id: string
  reason: string
  status: string
  created_at: string
  profiles?: any
}

export default function ApprovalsList({ initialRequests }: { initialRequests: any[] }) {
  const [requests, setRequests] = useState<ApprovalRequest[]>(initialRequests)
  const [processingId, setProcessingId] = useState<string | null>(null)

  const handleAction = async (requestId: string, userId: string, action: 'approve' | 'revoke') => {
    setProcessingId(requestId)
    try {
      const res = await fetch(`/api/admin/${action}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ requestId, userId })
      })

      if (res.ok) {
        setRequests(prev => prev.filter(r => r.id !== requestId))
      } else {
        const data = await res.json()
        alert(`Error: ${data.error || 'Failed to process request'}`)
      }
    } catch (err) {
      alert('Failed to process request')
    } finally {
      setProcessingId(null)
    }
  }

  return (
    <div className="space-y-8 pb-20">
      <AnimatePresence initial={false}>
        {requests.map((req, idx) => (
          <motion.div 
            key={req.id} 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="group relative bg-surface/40 backdrop-blur-3xl border border-white/5 rounded-[2.5rem] p-10 md:p-12 transition-all duration-700 hover:border-white/20 hover:bg-surface/60 overflow-hidden"
          >
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
            
            <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Profile Context */}
              <div className="lg:col-span-4 space-y-6">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/20 group-hover:text-primary transition-colors duration-500">
                     <User size={28} />
                  </div>
                  <div>
                    <h3 className="text-3xl font-serif italic text-white group-hover:text-primary transition-colors duration-500">
                      {req.profiles?.full_name || 'Anonymous Artisan'}
                    </h3>
                    <div className="flex items-center gap-2 text-white/20 mt-1">
                      <Mail size={12} />
                      <span className="text-[10px] font-bold uppercase tracking-widest">{req.profiles?.email}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-white/10">
                   <Calendar size={14} />
                   <span className="text-[9px] font-black uppercase tracking-[0.2em]">Application Date: {format(new Date(req.created_at), 'MMM dd, yyyy')}</span>
                </div>
              </div>

              {/* Application Reason */}
              <div className="lg:col-span-5 relative">
                <div className="absolute -top-6 -left-6 opacity-10 group-hover:opacity-20 transition-opacity">
                  <MessageSquareQuote size={48} className="text-primary" />
                </div>
                <p className="text-sm md:text-base text-white/40 leading-relaxed italic border-l-2 border-primary/20 pl-8 py-2 group-hover:border-primary transition-colors duration-700">
                  "{req.reason}"
                </p>
              </div>

              {/* Action Suite */}
              <div className="lg:col-span-3 flex flex-col sm:flex-row lg:flex-col gap-4">
                <button
                  onClick={() => handleAction(req.id, req.user_id, 'approve')}
                  disabled={!!processingId}
                  className="flex-1 luxury-button py-5 text-[10px] flex items-center justify-center gap-3"
                >
                  {processingId === req.id ? (
                    <Loader2 className="animate-spin" size={16} />
                  ) : (
                    <>
                      <Check size={16} />
                      Approve Authority
                    </>
                  )}
                </button>
                <button
                  onClick={() => handleAction(req.id, req.user_id, 'revoke')}
                  disabled={!!processingId}
                  className="flex-1 py-5 border border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] text-white/20 hover:text-red-500 hover:border-red-500/30 transition-all duration-500 flex items-center justify-center gap-3"
                >
                  {processingId === req.id ? (
                    <Loader2 className="animate-spin" size={16} />
                  ) : (
                    <>
                      <X size={16} />
                      Dismiss Request
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
