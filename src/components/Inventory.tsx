import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  Download, 
  Plus,
  CheckCircle2,
  XCircle,
  Clock,
  AlertCircle,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { ESim } from '@/types';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/LanguageContext';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip,
  Legend
} from 'recharts';

const mockESims: ESim[] = [
  { id: '1', iccid: '89014103211118510720', status: 'active', plan: 'Global Pro 50GB', usage: 12.4, limit: 50, lastActive: '2024-03-20 14:22', country: 'United States' },
  { id: '2', iccid: '89441000302011049921', status: 'active', plan: 'Europe Unlimited', usage: 45.2, limit: 100, lastActive: '2024-03-20 16:05', country: 'Germany' },
  { id: '3', iccid: '89852300441020031122', status: 'inactive', plan: 'Asia Lite 5GB', usage: 0, limit: 5, lastActive: '2024-03-18 09:12', country: 'Japan' },
  { id: '4', iccid: '89011200551030042233', status: 'provisioning', plan: 'Global Pro 50GB', usage: 0, limit: 50, lastActive: '-', country: 'United Kingdom' },
  { id: '5', iccid: '89331500661040053344', status: 'error', plan: 'South America 10GB', usage: 2.1, limit: 10, lastActive: '2024-03-15 22:45', country: 'Brazil' },
  { id: '6', iccid: '89014103211118510721', status: 'active', plan: 'Global Pro 50GB', usage: 38.9, limit: 50, lastActive: '2024-03-20 15:30', country: 'Canada' },
  { id: '7', iccid: '89441000302011049922', status: 'active', plan: 'Europe Unlimited', usage: 8.2, limit: 100, lastActive: '2024-03-20 16:12', country: 'France' },
];

export default function Inventory() {
  const [search, setSearch] = useState('');
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const { t } = useLanguage();

  const filtered = mockESims.filter(sim => 
    sim.iccid.includes(search) || sim.plan.toLowerCase().includes(search.toLowerCase())
  );

  const toggleRow = (id: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRows(newExpanded);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif italic text-4xl text-[#141414] tracking-tight">
            {t('inventory')}
          </h1>
          <p className="text-[#8E8E8E] font-mono text-xs uppercase tracking-widest mt-1">
            {t('manageAssets')}
          </p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border border-[#141414]/10 rounded-sm text-sm font-medium hover:bg-[#141414]/5 transition-colors">
            <Download size={16} /> {t('exportCsv')}
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#141414] text-[#E4E3E0] rounded-sm text-sm font-medium hover:bg-[#141414]/90 transition-colors">
            <Plus size={16} /> {t('provisionNew')}
          </button>
        </div>
      </header>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 bg-white p-4 border border-[#141414]/10 rounded-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8E8E8E]" size={18} />
          <input 
            type="text" 
            placeholder={t('searchPlaceholder')}
            className="w-full pl-10 pr-4 py-2 bg-[#141414]/5 border-none rounded-sm text-sm focus:ring-1 focus:ring-[#141414] outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#141414]/5 rounded-sm text-sm font-medium hover:bg-[#141414]/10 transition-colors">
          <Filter size={16} /> {t('filters')}
        </button>
      </div>

      {/* Table */}
      <div className="bg-white border border-[#141414]/10 rounded-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#141414]/10 bg-[#141414]/5">
                <th className="p-4 w-10"></th>
                <th className="p-4 font-serif italic text-xs uppercase tracking-wider text-[#8E8E8E]">{t('status')}</th>
                <th className="p-4 font-serif italic text-xs uppercase tracking-wider text-[#8E8E8E]">{t('iccid')}</th>
                <th className="p-4 font-serif italic text-xs uppercase tracking-wider text-[#8E8E8E]">{t('plan')}</th>
                <th className="p-4 font-serif italic text-xs uppercase tracking-wider text-[#8E8E8E]">{t('usage')}</th>
                <th className="p-4 font-serif italic text-xs uppercase tracking-wider text-[#8E8E8E]">{t('country')}</th>
                <th className="p-4 font-serif italic text-xs uppercase tracking-wider text-[#8E8E8E]">{t('lastActive')}</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#141414]/5">
              {filtered.map((sim) => (
                <React.Fragment key={sim.id}>
                  <tr 
                    className={cn(
                      "hover:bg-[#141414]/[0.02] transition-colors group cursor-pointer",
                      expandedRows.has(sim.id) && "bg-[#141414]/[0.02]"
                    )}
                    onClick={() => toggleRow(sim.id)}
                  >
                    <td className="p-4">
                      {expandedRows.has(sim.id) ? (
                        <ChevronUp size={16} className="text-[#8E8E8E]" />
                      ) : (
                        <ChevronDown size={16} className="text-[#8E8E8E]" />
                      )}
                    </td>
                    <td className="p-4">
                      <StatusBadge status={sim.status} />
                    </td>
                    <td className="p-4 font-mono text-xs font-bold text-[#141414]">{sim.iccid}</td>
                    <td className="p-4 text-sm font-medium">{sim.plan}</td>
                    <td className="p-4">
                      <div className="w-32">
                        <div className="flex justify-between text-[10px] font-mono mb-1">
                          <span>{sim.usage} GB</span>
                          <span className="opacity-40">{sim.limit} GB</span>
                        </div>
                        <div className="h-1.5 w-full bg-[#141414]/5 rounded-full overflow-hidden">
                          <div 
                            className={cn(
                              "h-full rounded-full transition-all duration-500",
                              (sim.usage / sim.limit) > 0.8 ? "bg-orange-500" : "bg-[#141414]"
                            )}
                            style={{ width: `${Math.min((sim.usage / sim.limit) * 100, 100)}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-sm">{sim.country}</td>
                    <td className="p-4 font-mono text-[10px] text-[#8E8E8E]">{sim.lastActive}</td>
                    <td className="p-4 text-right">
                      <button className="p-1 hover:bg-[#141414]/5 rounded-md transition-colors">
                        <MoreHorizontal size={16} className="text-[#8E8E8E]" />
                      </button>
                    </td>
                  </tr>
                  {expandedRows.has(sim.id) && (
                    <tr className="bg-[#141414]/[0.01] animate-in slide-in-from-top-2 duration-300">
                      <td colSpan={8} className="p-8 border-b border-[#141414]/10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                          <div className="space-y-4">
                            <h3 className="font-serif italic text-xl text-[#141414]">Usage Visualization</h3>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="p-4 bg-white border border-[#141414]/5 rounded-sm">
                                <p className="text-[10px] font-mono uppercase tracking-widest text-[#8E8E8E] mb-1">Used Data</p>
                                <p className="text-2xl font-black text-[#141414]">{sim.usage} GB</p>
                              </div>
                              <div className="p-4 bg-white border border-[#141414]/5 rounded-sm">
                                <p className="text-[10px] font-mono uppercase tracking-widest text-[#8E8E8E] mb-1">Remaining</p>
                                <p className="text-2xl font-black text-[#141414]">{(sim.limit - sim.usage).toFixed(1)} GB</p>
                              </div>
                            </div>
                            <div className="p-4 bg-white border border-[#141414]/5 rounded-sm">
                              <p className="text-[10px] font-mono uppercase tracking-widest text-[#8E8E8E] mb-1">Plan Limit</p>
                              <p className="text-xl font-bold text-[#141414]">{sim.limit} GB</p>
                              <div className="mt-2 h-2 w-full bg-[#141414]/5 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-[#141414] rounded-full"
                                  style={{ width: `${(sim.usage / sim.limit) * 100}%` }}
                                />
                              </div>
                            </div>
                          </div>
                          
                          <div className="h-[200px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                              <PieChart>
                                <Pie
                                  data={[
                                    { name: 'Used', value: sim.usage },
                                    { name: 'Remaining', value: Math.max(0, sim.limit - sim.usage) }
                                  ]}
                                  cx="50%"
                                  cy="50%"
                                  innerRadius={60}
                                  outerRadius={80}
                                  paddingAngle={5}
                                  dataKey="value"
                                >
                                  <Cell fill="#141414" />
                                  <Cell fill="#14141410" />
                                </Pie>
                                <Tooltip 
                                  contentStyle={{ 
                                    backgroundColor: '#141414', 
                                    border: 'none', 
                                    borderRadius: '4px',
                                    color: '#E4E3E0',
                                    fontSize: '12px',
                                    fontFamily: 'monospace'
                                  }}
                                  itemStyle={{ color: '#E4E3E0' }}
                                />
                                <Legend 
                                  verticalAlign="bottom" 
                                  height={36}
                                  wrapperStyle={{ 
                                    fontSize: '10px', 
                                    fontFamily: 'monospace',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px'
                                  }}
                                />
                              </PieChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


function StatusBadge({ status }: { status: ESim['status'] }) {
  const configs = {
    active: { icon: CheckCircle2, color: 'text-green-600 bg-green-50', label: 'Active' },
    inactive: { icon: XCircle, color: 'text-gray-500 bg-gray-50', label: 'Inactive' },
    provisioning: { icon: Clock, color: 'text-blue-600 bg-blue-50', label: 'Provisioning' },
    error: { icon: AlertCircle, color: 'text-red-600 bg-red-50', label: 'Error' },
  };

  const config = configs[status];
  const Icon = config.icon;

  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide",
      config.color
    )}>
      <Icon size={12} />
      {config.label}
    </span>
  );
}
