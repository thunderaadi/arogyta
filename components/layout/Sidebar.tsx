// components/layout/Sidebar.tsx
'use client'
import Link from "next/link";
import { Home, Users, Calendar, BarChart2, CircleHelp, LogOut, User } from "lucide-react"; // Re-added User icon
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { LanguageSwitcher } from "./LanguageSwitcher";
import '@/lib/i18n';

export function Sidebar() {
  const pathname = usePathname();
  const { t } = useTranslation();
  const { logout } = useAuth();
  
  const navItems = [
    { name: t('dashboard'), href: "/dashboard", icon: Home },
    { name: t('beneficiaries'), href: "/beneficiaries", icon: Users },
    { name: t('schedule'), href: "/schedule", icon: Calendar },
    { name: t('reports'), href: "/reports", icon: BarChart2 },
    { name: t('profile'), href: "/profile", icon: User }, // Restored Profile link
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 bg-white border-r fixed h-full">
      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold text-indigo-600">{t('appName')}</h1>
      </div>
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => (
          <Link 
            key={item.name} 
            href={item.href} 
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
              pathname.startsWith(item.href) && (item.href !== '/dashboard' || pathname === '/dashboard')
                ? "bg-indigo-50 text-indigo-600 font-semibold" 
                : "text-slate-600 hover:bg-slate-100"
            )}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t space-y-4">
        <LanguageSwitcher />
        <Link href="/help" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
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