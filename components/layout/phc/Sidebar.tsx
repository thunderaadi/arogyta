// components/layout/phc/Sidebar.tsx
'use client'
import Link from "next/link";
import Image from "next/image"; // Import the Image component
import { Home, Users, AlertTriangle, CircleHelp, LogOut, User } from "lucide-react";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { LanguageSwitcher } from "../LanguageSwitcher";
import '@/lib/i18n';

export function PhcSidebar() {
  const pathname = usePathname();
  const { t } = useTranslation();
  const { logout } = useAuth();
  
  const navItems = [
    { name: t('dashboard'), href: "/phc/dashboard", icon: Home },
    { name: t('highRisk'), href: "/phc/high-risk", icon: AlertTriangle },
    { name: t('ashaWorkers', { defaultValue: 'ASHA Workers' }), href: "/phc/asha-workers", icon: Users },
    { name: t('profile'), href: "/phc/profile", icon: User },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 bg-white border-r fixed h-full">
      <div className="p-4 border-b flex items-center gap-3">
        <Image 
          src="/logo.png" 
          alt={t('logoAlt')} 
          width={80} 
          height={80} 
          className="rounded-md"
        />
        <h1 className="text-xl font-bold text-indigo-600">{t('appName')} - PHC</h1>
      </div>
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => (
          <Link 
            key={item.name} 
            href={item.href} 
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
              pathname.startsWith(item.href) ? "bg-indigo-50 text-indigo-600 font-semibold" : "text-slate-600 hover:bg-slate-100"
            )}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t space-y-4">
        <LanguageSwitcher />
        <Link href="/phc/help" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
          <CircleHelp className="w-5 h-5" />
          <span>{t('help')}</span>
        </Link>
        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors w-full text-left"
        >
          <LogOut className="w-5 h-5" />
          <span>{t('logout')}</span>
        </button>
      </div>
    </aside>
  );
}