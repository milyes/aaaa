import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  Legend,
  Cell
} from 'recharts';
import { 
  Activity, 
  TrendingUp, 
  Users, 
  Zap, 
  ArrowUpRight, 
  ArrowDownRight,
  Globe,
  Database
} from 'lucide-react';
import { useLanguage } from '@/LanguageContext';
import { cn } from '@/lib/utils';

const usageData = [
  { name: '00:00', usage: 4.2, active: 120, calls: 450 },
  { name: '04:00', usage: 3.8, active: 115, calls: 380 },
  { name: '08:00', usage: 8.5, active: 145, calls: 890 },
  { name: '12:00', usage: 12.1, active: 180, calls: 1200 },
  { name: '16:00', usage: 15.4, active: 210, calls: 1540 },
  { name: '20:00', usage: 10.2, active: 165, calls: 980 },
  { name: '23:59', usage: 6.5, active: 135, calls: 620 },
];

const regionalData = [
  { name: 'North America', value: 45 },
  { name: 'Europe', value: 30 },
  { name: 'Asia', value: 15 },
  { name: 'Others', value: 10 },
];

export default function Analytics() {
  const { t } = useLanguage();

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-12">
      <header>
        <h1 className="font-serif italic text-4xl text-[#141414] tracking-tight">
          {t('analytics')}
        </h1>
        <p className="text-[#8E8E8E] font-mono text-xs uppercase tracking-widest mt-1">
          Real-time network performance & usage metrics
        </p>
      </header>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Data Transferred" 
          value="1.24 TB" 
          change="+12.5%" 
          trend="up" 
          icon={Database} 
        />
        <StatCard 
          title="Active Connections" 
          value="2,841" 
          change="+5.2%" 
          trend="up" 
          icon={Users} 
        />
        <StatCard 
          title="Avg. API Latency" 
          value="142ms" 
          change="-8.1%" 
          trend="down" 
          icon={Zap} 
        />
        <StatCard 
          title="Network Uptime" 
          value="99.99%" 
          change="Stable" 
          trend="neutral" 
          icon={Activity} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Data Usage Trend */}
        <div className="bg-white border border-[#141414]/10 p-6 rounded-sm shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-serif italic text-xl text-[#141414]">Data Usage Trend (GB)</h3>
            <div className="flex items-center gap-2 text-[10px] font-mono text-[#8E8E8E] uppercase tracking-widest">
              <div className="w-2 h-2 bg-[#141414] rounded-full" />
              Real-time
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={usageData}>
                <defs>
                  <linearGradient id="usageGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#141414" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#141414" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#14141410" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: '#8E8E8E', fontFamily: 'monospace' }} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: '#8E8E8E', fontFamily: 'monospace' }} 
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#141414', 
                    border: 'none', 
                    borderRadius: '4px',
                    color: '#E4E3E0',
                    fontSize: '12px',
                    fontFamily: 'monospace'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="usage" 
                  stroke="#141414" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#usageGradient)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* API Call Volume */}
        <div className="bg-white border border-[#141414]/10 p-6 rounded-sm shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-serif italic text-xl text-[#141414]">API Call Volume</h3>
            <TrendingUp className="text-[#141414]/20" size={20} />
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={usageData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#14141410" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: '#8E8E8E', fontFamily: 'monospace' }} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: '#8E8E8E', fontFamily: 'monospace' }} 
                />
                <Tooltip 
                  cursor={{ fill: '#14141405' }}
                  contentStyle={{ 
                    backgroundColor: '#141414', 
                    border: 'none', 
                    borderRadius: '4px',
                    color: '#E4E3E0',
                    fontSize: '12px',
                    fontFamily: 'monospace'
                  }}
                />
                <Bar dataKey="calls" fill="#141414" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Active eSIMs Over Time */}
        <div className="bg-white border border-[#141414]/10 p-6 rounded-sm shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-serif italic text-xl text-[#141414]">Active eSIMs Over Time</h3>
            <Users className="text-[#141414]/20" size={20} />
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={usageData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#14141410" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: '#8E8E8E', fontFamily: 'monospace' }} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: '#8E8E8E', fontFamily: 'monospace' }} 
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#141414', 
                    border: 'none', 
                    borderRadius: '4px',
                    color: '#E4E3E0',
                    fontSize: '12px',
                    fontFamily: 'monospace'
                  }}
                />
                <Line 
                  type="stepAfter" 
                  dataKey="active" 
                  stroke="#141414" 
                  strokeWidth={2} 
                  dot={{ r: 4, fill: '#141414', strokeWidth: 0 }}
                  activeDot={{ r: 6, fill: '#141414' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Regional Distribution */}
        <div className="bg-white border border-[#141414]/10 p-6 rounded-sm shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-serif italic text-xl text-[#141414]">Regional Distribution</h3>
            <Globe className="text-[#141414]/20" size={20} />
          </div>
          <div className="space-y-6">
            {regionalData.map((region) => (
              <div key={region.name} className="space-y-2">
                <div className="flex justify-between text-[10px] font-mono uppercase tracking-widest">
                  <span className="text-[#141414] font-bold">{region.name}</span>
                  <span className="text-[#8E8E8E]">{region.value}%</span>
                </div>
                <div className="h-2 w-full bg-[#141414]/5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#141414] rounded-full transition-all duration-1000"
                    style={{ width: `${region.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, change, trend, icon: Icon }: any) {
  return (
    <div className="bg-white border border-[#141414]/10 p-6 rounded-sm shadow-sm group hover:border-[#141414]/30 transition-all">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-[#141414]/5 rounded-sm group-hover:bg-[#141414] group-hover:text-white transition-all">
          <Icon size={18} />
        </div>
        <div className={cn(
          "flex items-center gap-1 text-[10px] font-mono font-bold",
          trend === 'up' ? "text-green-600" : trend === 'down' ? "text-red-500" : "text-[#8E8E8E]"
        )}>
          {trend === 'up' && <ArrowUpRight size={12} />}
          {trend === 'down' && <ArrowDownRight size={12} />}
          {change}
        </div>
      </div>
      <p className="text-[10px] font-mono uppercase tracking-widest text-[#8E8E8E] mb-1">{title}</p>
      <p className="text-2xl font-black text-[#141414] tracking-tight">{value}</p>
    </div>
  );
}
