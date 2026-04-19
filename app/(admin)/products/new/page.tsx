"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Save, Upload, Search, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { getDriveImageUrl } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function NewProductPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isFetchingMedia, setIsFetchingMedia] = useState(false)
  const [media, setMedia] = useState<any[]>([])
  const [imageUrl, setImageUrl] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const fetchMedia = async () => {
    setIsFetchingMedia(true)
    try {
      const res = await fetch('/api/media')
      const data = await res.json()
      if (Array.isArray(data)) {
        setMedia(data)
      }
    } catch (err) {
      console.error('Failed to fetch media:', err)
    } finally {
      setIsFetchingMedia(false)
    }
  }

  const handleSelectImage = (url: string) => {
    setImageUrl(url)
    setIsDialogOpen(false)
  }

  return (
    <div className="space-y-12 pb-20">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <Link href="/admin/products" className="text-[10px] uppercase font-bold tracking-widest text-vastraa-ink/40 hover:text-vastraa-clay transition-colors flex items-center gap-1 mb-4">
            <ArrowLeft size={12} /> Back to Products
          </Link>
          <h1 className="text-4xl font-serif italic text-vastraa-ink">New Product</h1>
          <p className="text-sm text-vastraa-ink/40 uppercase tracking-widest font-bold">
            Define a character for a new artisanal piece
          </p>
        </div>
        <button 
          className="bg-vastraa-clay text-white px-12 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-vastraa-ink transition-all duration-300 flex items-center gap-3 shrink-0"
        >
          <Save size={16} /> Save Product
        </button>
      </header>

      <div className="grid grid-cols-12 gap-8 lg:gap-12">
        {/* Left: General Info */}
        <div className="col-span-12 lg:col-span-8 space-y-8">
          <Card className="rounded-none border-vastraa-ink/5 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xs uppercase tracking-widest font-bold bg-vastraa-beige/30 p-4 -m-6 mb-6">General Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-widest text-vastraa-ink/40">Product Name</label>
                <input 
                  placeholder="e.g. Hand-Woven Silk Tunic"
                  className="w-full px-4 py-3 border border-vastraa-ink/10 focus:border-vastraa-ink outline-none text-sm rounded-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-widest text-vastraa-ink/40">Description</label>
                <Textarea 
                  placeholder="Tell the story of this piece..."
                  className="w-full min-h-[200px] font-sans text-sm border-vastraa-ink/10 focus:border-vastraa-ink rounded-none"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-none border-vastraa-ink/5 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xs uppercase tracking-widest font-bold bg-vastraa-beige/30 p-4 -m-6 mb-6">Inventory & Pricing</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-widest text-vastraa-ink/40">Base Price (INR)</label>
                <input 
                  type="number"
                  placeholder="0.00"
                  className="w-full px-4 py-3 border border-vastraa-ink/10 focus:border-vastraa-ink outline-none text-sm rounded-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-widest text-vastraa-ink/40">Compare at Price</label>
                <input 
                  type="number"
                  placeholder="0.00"
                  className="w-full px-4 py-3 border border-vastraa-ink/10 focus:border-vastraa-ink outline-none text-sm rounded-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-widest text-vastraa-ink/40">SKU (Stock Keeping Unit)</label>
                <input 
                  placeholder="VST-SW-001"
                  className="w-full px-4 py-3 border border-vastraa-ink/10 focus:border-vastraa-ink outline-none text-sm rounded-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-widest text-vastraa-ink/40">Initial Stock</label>
                <input 
                  type="number"
                  placeholder="0"
                  className="w-full px-4 py-3 border border-vastraa-ink/10 focus:border-vastraa-ink outline-none text-sm rounded-none"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right: Media & Categorization */}
        <div className="col-span-12 lg:col-span-4 space-y-8">
          <Card className="rounded-none border-vastraa-ink/5 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xs uppercase tracking-widest font-bold bg-vastraa-beige/30 p-4 -m-6 mb-6">Status & Category</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-widest text-vastraa-ink/40">Visibility</label>
                <Select defaultValue="draft">
                  <SelectTrigger className="w-full rounded-none border-vastraa-ink/10 py-6 text-sm">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent className="rounded-none">
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="hidden">Hidden</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-widest text-vastraa-ink/40">Category</label>
                <Select>
                  <SelectTrigger className="w-full rounded-none border-vastraa-ink/10 py-6 text-sm">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent className="rounded-none">
                    <SelectItem value="tops">Tops</SelectItem>
                    <SelectItem value="bottoms">Bottoms</SelectItem>
                    <SelectItem value="dresses">Dresses</SelectItem>
                    <SelectItem value="sets">Sets</SelectItem>
                    <SelectItem value="accessories">Accessories</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-none border-vastraa-ink/5 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xs uppercase tracking-widest font-bold bg-vastraa-beige/30 p-4 -m-6 mb-6">Media Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="aspect-[3/4] bg-vastraa-beige flex flex-col items-center justify-center border-2 border-dashed border-vastraa-ink/10 p-8 text-center space-y-4 relative overflow-hidden group">
                  {imageUrl ? (
                    <img 
                      src={getDriveImageUrl(imageUrl)} 
                      alt="Preview" 
                      className="absolute inset-0 w-full h-full object-cover" 
                    />
                  ) : (
                    <>
                      <Upload className="text-vastraa-ink/20" size={32} />
                      <p className="text-[10px] uppercase font-bold tracking-widest text-vastraa-ink/40">No Image Selected</p>
                    </>
                  )}
                  <div className="absolute inset-0 bg-vastraa-ink/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white text-[10px] uppercase font-bold tracking-widest">Change Image</span>
                  </div>
               </div>
               
               <div className="space-y-4 mt-6">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-vastraa-ink/40">Image Source URL</label>
                  
                  <Dialog open={isDialogOpen} onOpenChange={(open) => {
                    setIsDialogOpen(open);
                    if (open) fetchMedia();
                  }}>
                    <DialogTrigger asChild>
                      <button className="text-[10px] uppercase font-bold tracking-widest text-vastraa-clay hover:underline flex items-center gap-1">
                         <Search size={12} /> Browse Drive
                      </button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[80vh] flex flex-col p-0 rounded-none bg-vastraa-white border-vastraa-ink/10">
                      <DialogHeader className="p-8 border-b border-vastraa-ink/5">
                        <DialogTitle className="text-2xl font-serif italic">Google Drive Media Stream</DialogTitle>
                      </DialogHeader>
                      
                      <div className="flex-1 overflow-y-auto p-8">
                        {isFetchingMedia ? (
                          <div className="h-64 flex flex-col items-center justify-center space-y-4">
                            <Loader2 className="animate-spin text-vastraa-clay" size={32} />
                            <p className="text-[10px] uppercase font-bold tracking-widest text-vastraa-ink/40">Connecting to Drive...</p>
                          </div>
                        ) : (
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {media.map((file) => (
                              <button 
                                key={file.id} 
                                onClick={() => handleSelectImage(file.url)}
                                className="aspect-[3/4] bg-vastraa-beige relative overflow-hidden group hover:ring-2 hover:ring-vastraa-clay transition-all"
                              >
                                <img 
                                  src={getDriveImageUrl(file.thumbnail)} 
                                  alt={file.name} 
                                  className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" 
                                />
                                <div className="absolute inset-0 bg-vastraa-ink/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                                  <p className="text-[8px] text-white font-bold uppercase tracking-widest truncate">{file.name}</p>
                                </div>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                
                <input 
                  placeholder="https://drive.google.com/..."
                  className="w-full px-4 py-3 border border-vastraa-ink/10 focus:border-vastraa-ink outline-none text-[10px] rounded-none font-mono"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
