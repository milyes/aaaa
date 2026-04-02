import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Database, 
  Activity, 
  Terminal, 
  Settings, 
  Menu, 
  X,
  Zap,
  Users,
  ClipboardList,
  Navigation
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/LanguageContext';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(true);
  const { t } = useLanguage();

  const menuItems = [
    { id: 'dashboard', label: t('dashboard'), icon: LayoutDashboard },
    { id: 'inventory', label: t('inventory'), icon: Database },
    { id: 'clients', label: t('clients'), icon: Users },
    { id: 'forms', label: t('formTracker'), icon: ClipboardList },
    { id: 'gps', label: t('gpsTracking'), icon: Navigation },
    { id: 'analytics', label: t('analytics'), icon: Activity },
    { id: 'explorer', label: t('explorer'), icon: Terminal },
    { id: 'settings', label: t('settings'), icon: Settings },
  ];

  return (
    <>
      {/* Mobile Toggle */}
      <button 
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-[#141414] text-[#E4E3E0] rounded-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <aside className={cn(
        "fixed inset-y-0 left-0 z-40 w-64 bg-[#141414] text-[#E4E3E0] transform transition-transform duration-300 ease-in-out border-r border-[#2A2A2A]",
        !isOpen && "-translate-x-full lg:translate-x-0 lg:w-20"
      )}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 flex items-center gap-3 border-bottom border-[#2A2A2A]">
            <div className="w-8 h-8 bg-[#E4E3E0] text-[#141414] flex items-center justify-center rounded font-mono font-bold">
              <Zap size={18} />
            </div>
            {isOpen && (
              <span className="font-mono font-bold tracking-tighter text-lg italic">
                Z-ESIM.CELL
              </span>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 group",
                  activeTab === item.id 
                    ? "bg-[#E4E3E0] text-[#141414]" 
                    : "text-[#8E8E8E] hover:text-[#E4E3E0] hover:bg-[#2A2A2A]"
                )}
              >
                <item.icon size={20} className={cn(
                  "shrink-0",
                  activeTab === item.id ? "text-[#141414]" : "group-hover:text-[#E4E3E0]"
                )} />
                {isOpen && (
                  <span className="font-sans text-sm font-medium tracking-tight">
                    {item.label}
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-[#2A2A2A]">
            <div className={cn(
              "flex items-center gap-3 p-2 rounded-md bg-[#2A2A2A]/50",
              !isOpen && "justify-center"
            )}>
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-orange-500 to-amber-300 shrink-0" />
              {isOpen && (
                <div className="overflow-hidden">
                  <p className="text-xs font-bold truncate">API_ADMIN_01</p>
                  <p className="text-[10px] text-[#8E8E8E] font-mono">v2.4.0-stable</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
