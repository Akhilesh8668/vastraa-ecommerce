"use client"

import { useState } from 'react'
import { format } from 'date-fns'
import { Check, X, Loader2, ExternalLink } from 'lucide-react'

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
        // Remove from list or update status
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
    <div className="w-full overflow-x-auto border-2 border-vastraa-ink bg-white">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b-2 border-vastraa-ink bg-vastraa-ink text-white">
            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest">Partner Details</th>
            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest">Application Reason</th>
            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req.id} className="border-b border-vastraa-ink hover:bg-vastraa-white/50 transition-colors group">
              <td className="px-6 py-8">
                <div className="flex flex-col">
                  <span className="text-xl font-serif text-vastraa-ink mb-1 group-hover:text-vastraa-clay transition-colors italic">
                    {req.profiles?.full_name || 'Anonymous User'}
                  </span>
                  <span className="text-xs font-medium text-vastraa-ink/40 tracking-widest mb-1">
                    {req.profiles?.email}
                  </span>
                  <span className="text-[10px] font-bold text-vastraa-clay/60 uppercase">
                    Requested on {format(new Date(req.created_at), 'MMM dd, yyyy')}
                  </span>
                </div>
              </td>
              <td className="px-6 py-8 max-w-md">
                <p className="text-sm text-vastraa-ink/70 leading-relaxed italic border-l-2 border-vastraa-clay/20 pl-4 py-1">
                  "{req.reason}"
                </p>
              </td>
              <td className="px-6 py-8 text-right">
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => handleAction(req.id, req.user_id, 'revoke')}
                    disabled={!!processingId}
                    className="p-3 border-2 border-vastraa-ink bg-white text-vastraa-ink hover:bg-red-50 hover:text-red-600 transition-all active:translate-y-0.5 disabled:opacity-50"
                    title="Reject Request"
                  >
                    {processingId === req.id ? <Loader2 className="animate-spin" size={20} /> : <X size={20} />}
                  </button>
                  <button
                    onClick={() => handleAction(req.id, req.user_id, 'approve')}
                    disabled={!!processingId}
                    className="flex items-center gap-3 px-8 py-3 border-2 border-vastraa-ink bg-vastraa-ink text-white font-bold uppercase tracking-widest text-[10px] hover:bg-vastraa-clay hover:border-vastraa-clay transition-all active:translate-y-0.5 disabled:opacity-50"
                  >
                    {processingId === req.id ? (
                      <Loader2 className="animate-spin" size={16} />
                    ) : (
                      <>
                        <Check size={16} />
                        Approve Partner
                      </>
                    )}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
