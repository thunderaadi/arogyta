// components/layout/MobileNav.tsx
'use client'
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { Home, Users, Calendar, PlusCircle, BarChart2 } from "lucide-react";
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import i18n from "@/lib/i18n";

export function MobileNav() {
  const { t } = useTranslation();
  const pathname = usePathname();
  
  const navItems = [
    { name: t('home'), href: "/dashboard", icon: Home },
    { name: t('beneficiaries'), href: "/beneficiaries", icon: Users },
    { name: t('addNew'), href: "/add", icon: PlusCircle, isCentral: true },
    { name: t('schedule'), href: "/schedule", icon: Calendar },
    { name: t('reports'), href: "/reports", icon: BarChart2 },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t h-16 flex justify-around items-center w-full z-40">
      {navItems.map((item) => {
        // Match specific dashboard route
        const isActive = (item.href === "/dashboard" && pathname === "/dashboard") || (item.href !== "/dashboard" && pathname.startsWith(item.href));

        if (item.isCentral) {
          return (
            <div key={item.name} className="relative w-1/5 flex justify-center">
              <Link
                href={item.href}
                className={cn(
                  'absolute bottom-4 flex items-center justify-center h-16 w-16 rounded-full bg-indigo-600 text-white shadow-lg hover:bg-indigo-700 transition-all'
                )}
              >
                <item.icon className="w-8 h-8" />
                <span className="sr-only">{item.name}</span>
              </Link>
            </div>
          );
        }

        return (
          <Link 
            key={item.name} 
            href={item.href} 
            className={cn(
              'flex flex-col items-center justify-center flex-1 h-full text-slate-500 transition-colors',
              isActive ? 'text-indigo-600 font-semibold' : 'hover:text-indigo-500'
            )}
          >
            <item.icon className="w-6 h-6" />
            <span className="text-xs mt-1 line-clamp-1">{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}