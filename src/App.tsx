/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Inventory from './components/Inventory';
import ApiExplorer from './components/ApiExplorer';
import ClientManagement from './components/ClientManagement';
import Analytics from './components/Analytics';
import FormTracker from './components/FormTracker';
import GPSView from './components/GPSView';
import { Settings as SettingsIcon, Bell, Search, User, Globe } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { cn } from './lib/utils';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { language, setLanguage, t } = useLanguage();

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'inventory':
        return <Inventory />;
      case 'clients':
        return <ClientManagement />;
      case 'forms':
        return <FormTracker />;
      case 'gps':
        return <GPSView />;
      case 'explorer':
        return <ApiExplorer />;
      case 'analytics':
        return <Analytics />;
      case 'settings':
        return (
          <div className="max-w-2xl space-y-8">
            <header>
              <h1 className="font-serif italic text-4xl text-[#141414] tracking-tight">{t('settings')}</h1>
              <p className="text-[#8E8E8E] font-mono text-xs uppercase tracking-widest mt-1">Configure your API environment</p>
            </header>
            <div className="space-y-6">
              {[
                { label: 'API Key', value: 'sk_live_••••••••••••••••4421', type: 'password' },
                { label: 'Webhook URL', value: 'https://hooks.z-esim.cell/v1/events', type: 'text' },
                { label: 'Environment', value: 'Production (us-east-1)', type: 'text' },
              ].map((field, i) => (
                <div key={i} className="space-y-2">
                  <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#8E8E8E]">{field.label}</label>
                  <div className="flex gap-2">
                    <input 
                      type={field.type} 
                      value={field.value} 
                      readOnly
                      className="flex-1 bg-[#141414]/5 border-none rounded-sm px-4 py-2 text-sm font-mono focus:ring-0"
                    />
                    <button className="px-4 py-2 border border-[#141414]/10 rounded-sm text-xs font-bold hover:bg-[#141414]/5 transition-colors">
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-[#E4E3E0] text-[#141414] font-sans selection:bg-[#141414] selection:text-[#E4E3E0]">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="lg:ml-64 min-h-screen transition-all duration-300 ease-in-out">
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-[#E4E3E0]/80 backdrop-blur-md border-b border-[#141414]/5 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 text-green-600 rounded-full border border-green-500/20">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider">{t('systemLive')}</span>
            </div>
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-[#141414]/5 rounded-full border border-[#141414]/10">
              <Search size={14} className="text-[#8E8E8E]" />
              <input 
                type="text" 
                placeholder={t('quickSearch')}
                className="bg-transparent border-none text-xs focus:ring-0 w-40 outline-none"
              />
              <span className="text-[10px] font-mono opacity-30">⌘K</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <div className="flex items-center gap-1 bg-[#141414]/5 p-1 rounded-sm border border-[#141414]/10">
              <button 
                onClick={() => setLanguage('en')}
                className={cn(
                  "px-2 py-0.5 text-[10px] font-mono font-bold rounded-sm transition-colors",
                  language === 'en' ? "bg-[#141414] text-white" : "text-[#8E8E8E] hover:text-[#141414]"
                )}
              >
                EN
              </button>
              <button 
                onClick={() => setLanguage('fr')}
                className={cn(
                  "px-2 py-0.5 text-[10px] font-mono font-bold rounded-sm transition-colors",
                  language === 'fr' ? "bg-[#141414] text-white" : "text-[#8E8E8E] hover:text-[#141414]"
                )}
              >
                FR
              </button>
            </div>

            <button className="relative p-2 hover:bg-[#141414]/5 rounded-full transition-colors">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-orange-500 rounded-full border-2 border-[#E4E3E0]" />
            </button>
            <div className="h-8 w-px bg-[#141414]/10 mx-2" />
            <div className="flex items-center gap-3 pl-2">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold leading-none">gfbleu@gmail.com</p>
                <p className="text-[10px] text-[#8E8E8E] font-mono mt-1">{t('superAdmin')}</p>
              </div>
              <div className="w-9 h-9 rounded-full bg-[#141414] text-[#E4E3E0] flex items-center justify-center border-2 border-white shadow-sm">
                <User size={18} />
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-6 lg:p-10 max-w-7xl mx-auto">
          {renderContent()}
        </div>

        {/* Footer */}
        <footer className="mt-20 border-t border-[#141414]/5 p-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#141414] text-[#E4E3E0] flex items-center justify-center rounded text-[10px] font-bold">Z</div>
            <span className="font-mono font-bold text-sm tracking-tighter italic">Z-ESIM.CELL</span>
          </div>
          <div className="flex gap-8 text-[10px] font-mono uppercase tracking-widest text-[#8E8E8E]">
            <a href="#" className="hover:text-[#141414] transition-colors">{t('apiDoc')}</a>
            <a href="#" className="hover:text-[#141414] transition-colors">{t('securityPolicy')}</a>
            <a href="#" className="hover:text-[#141414] transition-colors">{t('systemStatus')}</a>
          </div>
          <p className="text-[10px] font-mono text-[#8E8E8E]">© 2026 Z-ESIM GLOBAL NETWORKS</p>
        </footer>
      </main>
    </div>
  );
}


