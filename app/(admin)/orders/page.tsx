"use client"

import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { Search, Eye, Filter, Download } from "lucide-react"

export default function OrdersAdminPage() {
  const dummyOrders = [
    {
      id: "VT-7718-21",
      date: "Oct 24, 2024",
      customer: "ananya.s@example.com",
      amount: "₹5,299",
      paymentStatus: "Paid",
      fulfillmentStatus: "Processing"
    },
    {
      id: "VT-7718-22",
      date: "Oct 24, 2024",
      customer: "rahul.m@example.com",
      amount: "₹1,299",
      paymentStatus: "Paid",
      fulfillmentStatus: "Shipped"
    },
    {
      id: "VT-7718-23",
      date: "Oct 23, 2024",
      customer: "priya.k@example.com",
      amount: "₹12,499",
      paymentStatus: "Pending",
      fulfillmentStatus: "Processing"
    }
  ]

  return (
    <div className="space-y-12">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-serif italic text-vastraa-ink">Orders</h1>
          <p className="text-sm text-vastraa-ink/40 uppercase tracking-widest font-bold">
            Monitor and fulfill customer requests
          </p>
        </div>
        <button className="bg-vastraa-ink text-vastraa-white px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-vastraa-clay transition-all duration-300 flex items-center gap-3 shrink-0">
          <Download size={16} /> Export CSV
        </button>
      </header>

      <div className="flex items-center gap-4 bg-white p-4 border border-vastraa-ink/5">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-vastraa-ink/20" size={18} />
          <input 
            placeholder="Search orders..."
            className="w-full pl-12 pr-4 py-2 text-sm bg-transparent outline-none"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-vastraa-ink/10 text-[10px] uppercase font-bold tracking-widest hover:border-vastraa-ink transition-colors">
          <Filter size={14} /> Filters
        </button>
      </div>

      <div className="bg-white border border-vastraa-ink/5 shadow-sm">
        <Table>
          <TableHeader className="bg-vastraa-beige/30">
            <TableRow className="border-b border-vastraa-ink/5">
              <TableHead className="text-[10px] uppercase font-bold tracking-widest py-6">Order ID</TableHead>
              <TableHead className="text-[10px] uppercase font-bold tracking-widest py-6">Date</TableHead>
              <TableHead className="text-[10px] uppercase font-bold tracking-widest py-6">Customer</TableHead>
              <TableHead className="text-[10px] uppercase font-bold tracking-widest py-6">Amount</TableHead>
              <TableHead className="text-[10px] uppercase font-bold tracking-widest py-6">Payment</TableHead>
              <TableHead className="text-[10px] uppercase font-bold tracking-widest py-6">Fulfillment</TableHead>
              <TableHead className="text-[10px] uppercase font-bold tracking-widest py-6 text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dummyOrders.map((o) => (
              <TableRow key={o.id} className="border-b border-vastraa-ink/5 hover:bg-vastraa-beige/10 transition-colors">
                <TableCell className="font-bold text-sm tracking-tight">{o.id}</TableCell>
                <TableCell className="text-xs text-vastraa-ink/60">{o.date}</TableCell>
                <TableCell className="text-sm font-medium">{o.customer}</TableCell>
                <TableCell className="font-bold text-sm">{o.amount}</TableCell>
                <TableCell>
                  <span className={`text-[10px] px-2 py-1 uppercase font-bold tracking-widest ${o.paymentStatus === 'Paid' ? 'bg-vastraa-green/10 text-vastraa-green' : 'bg-orange-50 text-orange-600'}`}>
                    {o.paymentStatus}
                  </span>
                </TableCell>
                <TableCell>
                   <span className="text-[10px] px-2 py-1 uppercase font-bold tracking-widest bg-vastraa-beige border border-vastraa-ink/5 text-vastraa-ink/60">
                    {o.fulfillmentStatus}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                   <button className="p-2 hover:bg-vastraa-ink hover:text-white transition-colors">
                      <Eye size={16} />
                    </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
