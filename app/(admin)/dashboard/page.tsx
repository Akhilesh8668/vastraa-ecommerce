"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  TrendingUp, 
  ShoppingBag, 
  Package, 
  ArrowUpRight, 
  ArrowDownRight 
} from "lucide-react"

export default function DashboardPage() {
  const kpis = [
    {
      title: "Total Revenue",
      value: "₹4,28,900",
      description: "+12.5% from last month",
      icon: TrendingUp,
      trend: "up"
    },
    {
      title: "Active Orders",
      value: "42",
      description: "8 pending fulfillment",
      icon: ShoppingBag,
      trend: "up"
    },
    {
      title: "Total Products",
      value: "156",
      description: "12 out of stock",
      icon: Package,
      trend: "neutral"
    }
  ]

  return (
    <div className="space-y-12">
      <header className="space-y-2">
        <h1 className="text-4xl font-serif italic text-vastraa-ink">Dashboard</h1>
        <p className="text-sm text-vastraa-ink/40 uppercase tracking-widest font-bold">
          Overview of Vastraa business performance
        </p>
      </header>

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {kpis.map((kpi) => (
          <Card key={kpi.title} className="bg-white border-vastraa-ink/5 rounded-none shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-[10px] font-bold uppercase tracking-[0.2em] text-vastraa-ink/40">
                {kpi.title}
              </CardTitle>
              <kpi.icon size={16} className="text-vastraa-clay" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold tracking-tighter">{kpi.value}</div>
              <p className="text-[10px] mt-1 flex items-center gap-1">
                {kpi.trend === 'up' && <ArrowUpRight size={10} className="text-vastraa-green" />}
                {kpi.trend === 'down' && <ArrowDownRight size={10} className="text-red-500" />}
                <span className={kpi.trend === 'up' ? "text-vastraa-green" : "text-vastraa-ink/40"}>
                  {kpi.description}
                </span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity Mockup */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-8">
        <div className="bg-white p-8 border border-vastraa-ink/5 space-y-6">
          <h3 className="text-lg font-serif italic border-b border-vastraa-ink/5 pb-4">Recent Sales</h3>
          <div className="space-y-6">
             {[1, 2, 3].map(i => (
               <div key={i} className="flex justify-between items-center text-sm">
                 <div>
                   <p className="font-bold">Ananya Sharma</p>
                   <p className="text-xs text-vastraa-ink/40 uppercase tracking-widest font-medium">Order #VT-7718-2{i}</p>
                 </div>
                 <div className="text-right">
                   <p className="font-bold">₹5,299</p>
                   <p className="text-[10px] text-vastraa-green font-bold uppercase">Paid</p>
                 </div>
               </div>
             ))}
          </div>
        </div>
        
        <div className="bg-white p-8 border border-vastraa-ink/5 space-y-6">
          <h3 className="text-lg font-serif italic border-b border-vastraa-ink/5 pb-4">Low Stock Warning</h3>
          <div className="space-y-6">
             {[1, 2].map(i => (
               <div key={i} className="flex justify-between items-center text-sm">
                 <div>
                   <p className="font-bold">Khadi Cotton Wrap {i === 1 ? 'Top' : 'Skirt'}</p>
                   <p className="text-xs text-vastraa-ink/40 uppercase tracking-widest font-medium">SKU: VST-KC-00{i}</p>
                 </div>
                 <div className="text-right">
                   <p className="font-bold text-red-500">2 Left</p>
                   <p className="text-[10px] text-vastraa-ink/40 uppercase font-bold">Restock Needed</p>
                 </div>
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  )
}
