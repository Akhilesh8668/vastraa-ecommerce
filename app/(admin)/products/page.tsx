"use client"

import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { Plus, Search, Edit2, Trash2, ExternalLink } from "lucide-react"
import Link from "next/link"

export default function ProductsAdminPage() {
  const dummyProducts = [
    {
      id: "1",
      name: "Hand-Woven Silk Tunic",
      category: "Tops",
      price: "₹4,999",
      stock: 12,
      status: "Published"
    },
    {
      id: "2",
      name: "Indigo Dye Wrap Dress",
      category: "Dresses",
      price: "₹5,299",
      stock: 5,
      status: "Published"
    },
    {
      id: "3",
      name: "Khadi Cotton Shirt",
      category: "Tops",
      price: "₹2,899",
      stock: 0,
      status: "Out of Stock"
    }
  ]

  return (
    <div className="space-y-12">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-serif italic text-vastraa-ink">Products</h1>
          <p className="text-sm text-vastraa-ink/40 uppercase tracking-widest font-bold">
            Manage your artisanal catalog
          </p>
        </div>
        <Link 
          href="/admin/products/new"
          className="bg-vastraa-clay text-white px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-vastraa-ink transition-all duration-300 flex items-center gap-3 shrink-0"
        >
          <Plus size={16} /> Add Product
        </Link>
      </header>

      <div className="flex items-center gap-4 bg-white p-4 border border-vastraa-ink/5">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-vastraa-ink/20" size={18} />
          <input 
            placeholder="Search products..."
            className="w-full pl-12 pr-4 py-2 text-sm bg-transparent outline-none focus:ring-1 focus:ring-vastraa-clay/20 transition-all"
          />
        </div>
        <div className="flex gap-2">
          <select className="px-4 py-2 border-vastraa-ink/10 text-xs font-bold uppercase tracking-widest outline-none">
            <option>All Categories</option>
            <option>Tops</option>
            <option>Bottoms</option>
          </select>
        </div>
      </div>

      <div className="bg-white border border-vastraa-ink/5 shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-vastraa-beige/30">
            <TableRow className="border-b border-vastraa-ink/5">
              <TableHead className="w-20"></TableHead>
              <TableHead className="text-[10px] uppercase font-bold tracking-widest py-6">Product</TableHead>
              <TableHead className="text-[10px] uppercase font-bold tracking-widest py-6">Category</TableHead>
              <TableHead className="text-[10px] uppercase font-bold tracking-widest py-6">Stock</TableHead>
              <TableHead className="text-[10px] uppercase font-bold tracking-widest py-6">Price</TableHead>
              <TableHead className="text-[10px] uppercase font-bold tracking-widest py-6 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dummyProducts.map((p) => (
              <TableRow key={p.id} className="border-b border-vastraa-ink/5 hover:bg-vastraa-beige/10 transition-colors">
                <TableCell>
                  <div className="w-12 h-16 bg-vastraa-beige"></div>
                </TableCell>
                <TableCell className="font-medium">
                  <p className="text-base text-vastraa-ink">{p.name}</p>
                  <p className="text-[10px] uppercase tracking-widest text-vastraa-ink/40 font-bold">Ref: VST-{p.id}</p>
                </TableCell>
                <TableCell className="text-xs text-vastraa-ink/60">{p.category}</TableCell>
                <TableCell>
                  <span className={`text-[10px] px-2 py-1 uppercase font-bold tracking-widest ${p.stock === 0 ? 'bg-red-50 text-red-500' : 'bg-vastraa-green/10 text-vastraa-green'}`}>
                    {p.stock === 0 ? 'Out of Stock' : `${p.stock} In Stock`}
                  </span>
                </TableCell>
                <TableCell className="font-bold text-sm">{p.price}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-2 hover:bg-vastraa-ink hover:text-white transition-colors">
                      <Edit2 size={16} />
                    </button>
                    <button className="p-2 hover:bg-vastraa-ink hover:text-white transition-colors">
                      <ExternalLink size={16} />
                    </button>
                    <button className="p-2 hover:bg-red-500 hover:text-white transition-colors text-red-500">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
