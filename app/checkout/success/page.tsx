import Link from 'next/link'
import { CheckCircle2, ArrowRight } from 'lucide-react'

export default function OrderSuccessPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const orderId = searchParams.order_id || 'VT-7718-29' // Mock if not present

  return (
    <div className="min-h-screen flex items-center justify-center bg-vastraa-white px-4">
      <div className="max-w-2xl w-full text-center space-y-12">
        <div className="flex justify-center">
          <div className="bg-vastraa-green/10 p-6 rounded-full">
            <CheckCircle2 className="h-16 w-16 text-vastraa-green" />
          </div>
        </div>

        <div className="space-y-6">
          <span className="text-vastraa-clay uppercase tracking-[0.4em] font-bold text-xs inline-block">Order Confirmed</span>
          <h1 className="text-5xl md:text-7xl font-serif text-vastraa-ink leading-tight italic">
            Thank you for your order.
          </h1>
          <p className="text-lg text-vastraa-ink/60 max-w-lg mx-auto leading-relaxed">
            Your purchase is being processed with the care it deserves. We will notify you once your hand-crafted pieces are on their way.
          </p>
        </div>

        <div className="bg-white border border-vastraa-ink/5 p-8 max-w-sm mx-auto space-y-4 shadow-sm">
          <p className="text-[10px] uppercase tracking-widest font-bold text-vastraa-ink/40">Order Number</p>
          <p className="text-xl font-bold tracking-tighter">{orderId}</p>
        </div>

        <div className="pt-8">
          <Link 
            href="/shop" 
            className="inline-flex items-center gap-3 border-2 border-vastraa-ink text-vastraa-ink px-12 py-5 text-sm font-bold uppercase tracking-[0.3em] hover:bg-vastraa-ink hover:text-white transition-all duration-500"
          >
            Continue Shopping <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  )
}
