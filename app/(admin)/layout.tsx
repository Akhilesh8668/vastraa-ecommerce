import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "@/app/globals.css";
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Users, 
  Settings, 
  LogOut,
  ExternalLink
} from 'lucide-react';

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "Vastraa | Admin Dashboard",
  description: "Management portal for Vastraa e-commerce.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, href: '/admin/dashboard' },
    { label: 'Products', icon: Package, href: '/admin/products' },
    { label: 'Orders', icon: ShoppingBag, href: '/admin/orders' },
    { label: 'Users', icon: Users, href: '/admin/users' },
    { label: 'Settings', icon: Settings, href: '/admin/settings' },
  ];

  return (
    <div className={`flex min-h-screen bg-vastraa-white ${inter.variable} ${playfair.variable} font-sans`}>
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-vastraa-ink text-vastraa-white z-50 flex flex-col">
        <div className="p-8 border-b border-vastraa-white/10">
          <Link href="/admin/dashboard" className="flex flex-col items-start translate-y-1">
            <span className="text-2xl font-serif font-bold tracking-tighter leading-none">VASTRAA</span>
            <span className="text-[10px] uppercase font-bold tracking-[0.4em] text-vastraa-clay mt-1">Admin Panel</span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-2 pt-8">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center gap-4 px-4 py-3 text-sm font-medium text-vastraa-white/60 hover:text-vastraa-clay hover:bg-vastraa-white/5 transition-all duration-200 group"
            >
              <item.icon size={18} className="group-hover:scale-110 transition-transform" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-vastraa-white/10 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-4 px-4 py-3 text-xs font-medium text-vastraa-white/40 hover:text-vastraa-white transition-colors"
          >
            <ExternalLink size={14} /> Open Store
          </Link>
          <button className="w-full flex items-center gap-4 px-4 py-3 text-xs font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors">
            <LogOut size={14} /> Log Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-12 lg:p-16">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
