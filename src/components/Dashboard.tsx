import React from 'react';
import { 
  TrendingUp, 
  Globe, 
  Cpu, 
  ShieldCheck,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { useLanguage } from '@/LanguageContext';

const data = [
  { time: '00:00', usage: 120, latency: 45 },
  { time: '04:00', usage: 80, latency: 42 },
  { time: '08:00', usage: 250, latency: 58 },
  { time: '12:00', usage: 450, latency: 65 },
  { time: '16:00', usage: 380, latency: 52 },
  { time: '20:00', usage: 290, latency: 48 },
  { time: '23:59', usage: 150, latency: 44 },
];

export default function Dashboard() {
  const { t } = useLanguage();

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <header>
        <h1 className="font-serif italic text-4xl text-[#141414] tracking-tight">
          {t('networkOverview')}
        </h1>
        <p className="text-[#8E8E8E] font-mono text-xs uppercase tracking-widest mt-1">
          {t('realTimeMetrics')}
        </p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: t('activeEsims'), value: '12,482', change: '+12%', icon: Globe, trend: 'up' },
          { label: t('dataThroughput'), value: '4.2 TB', change: '+5.4%', icon: TrendingUp, trend: 'up' },
          { label: t('apiLatency'), value: '48ms', change: '-2ms', icon: Cpu, trend: 'down' },
          { label: t('systemHealth'), value: '99.98%', change: 'Stable', icon: ShieldCheck, trend: 'neutral' },
        ].map((stat, i) => (
          <div key={i} className="bg-white border border-[#141414]/10 p-6 rounded-sm shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-[#141414]/5 rounded">
                <stat.icon size={20} className="text-[#141414]" />
              </div>
              <span className={`text-[10px] font-mono font-bold px-2 py-1 rounded flex items-center gap-1 ${
                stat.trend === 'up' ? 'bg-green-100 text-green-700' : 
                stat.trend === 'down' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
              }`}>
                {stat.trend === 'up' && <ArrowUpRight size={12} />}
                {stat.trend === 'down' && <ArrowDownRight size={12} />}
                {stat.change}
              </span>
            </div>
            <p className="text-[11px] font-serif italic text-[#8E8E8E] uppercase tracking-wider">{stat.label}</p>
            <p className="text-3xl font-mono font-bold text-[#141414] tracking-tighter">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-[#141414]/10 p-6 rounded-sm shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-serif italic text-xl">{t('globalData')}</h3>
            <div className="flex gap-2">
              <button className="text-[10px] font-mono font-bold px-3 py-1 bg-[#141414] text-white rounded">24H</button>
              <button className="text-[10px] font-mono font-bold px-3 py-1 text-[#8E8E8E] hover:bg-[#141414]/5 rounded">7D</button>
              <button className="text-[10px] font-mono font-bold px-3 py-1 text-[#8E8E8E] hover:bg-[#141414]/5 rounded">30D</button>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#141414" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#141414" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="time" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontFamily: 'monospace' }} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontFamily: 'monospace' }} 
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
                  fill="url(#colorUsage)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[#141414] text-[#E4E3E0] p-6 rounded-sm shadow-sm overflow-hidden relative">
          <div className="relative z-10">
            <h3 className="font-serif italic text-xl mb-6">{t('recentLogs')}</h3>
            <div className="space-y-4">
              {[
                { method: 'POST', endpoint: '/provision', status: 201, time: '2m ago' },
                { method: 'GET', endpoint: '/status/8823...', status: 200, time: '5m ago' },
                { method: 'PATCH', endpoint: '/suspend/1102...', status: 200, time: '12m ago' },
                { method: 'POST', endpoint: '/activate', status: 201, time: '15m ago' },
                { method: 'GET', endpoint: '/usage/global', status: 200, time: '18m ago' },
              ].map((log, i) => (
                <div key={i} className="flex items-center justify-between border-b border-[#E4E3E0]/10 pb-3 last:border-0">
                  <div className="flex items-center gap-3">
                    <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded ${
                      log.method === 'POST' ? 'bg-orange-500' : 
                      log.method === 'GET' ? 'bg-blue-500' : 'bg-green-500'
                    }`}>
                      {log.method}
                    </span>
                    <span className="text-[11px] font-mono opacity-80 truncate max-w-[120px]">{log.endpoint}</span>
                  </div>
                  <span className="text-[10px] font-mono opacity-40">{log.time}</span>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-2 border border-[#E4E3E0]/20 text-[10px] font-mono uppercase tracking-widest hover:bg-[#E4E3E0] hover:text-[#141414] transition-colors">
              View All Logs
            </button>
          </div>
          {/* Decorative background element */}
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#E4E3E0]/5 rounded-full blur-3xl" />
        </div>
      </div>
    </div>
  );
}

