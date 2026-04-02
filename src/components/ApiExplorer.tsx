import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Copy, 
  Trash2, 
  RefreshCw,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  Loader2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/LanguageContext';

export default function ApiExplorer() {
  const [method, setMethod] = useState('POST');
  const [endpoint, setEndpoint] = useState('/v1/esim/provision');
  const [isLoading, setIsLoading] = useState(false);
  const [isPolling, setIsPolling] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const { t } = useLanguage();
  const pollingTimerRef = useRef<NodeJS.Timeout | null>(null);

  const endpoints = [
    { method: 'POST', path: '/v1/esim/provision', desc: 'Provision a new eSIM profile' },
    { method: 'GET', path: '/v1/esim/{iccid}', desc: 'Retrieve eSIM details and status' },
    { method: 'PATCH', path: '/v1/esim/{iccid}/suspend', desc: 'Suspend an active eSIM' },
    { method: 'GET', path: '/v1/usage/summary', desc: 'Get global data usage summary' },
  ];

  const handleRun = () => {
    setIsLoading(true);
    setResponse(null);
    if (pollingTimerRef.current) clearTimeout(pollingTimerRef.current);
    
    // Simulate API call
    setTimeout(() => {
      const initialResponse = {
        status: 201,
        statusText: 'Created',
        headers: {
          'Content-Type': 'application/json',
          'X-Request-ID': `req_${Math.random().toString(36).substr(2, 9)}`
        },
        data: {
          id: 'esim_99210',
          iccid: '89014103211118510720',
          activationCode: 'LPA:1$z-esim.cell$PROMO-2024',
          status: endpoint === '/v1/esim/provision' ? 'provisioning' : 'active',
          createdAt: new Date().toISOString()
        }
      };
      
      setResponse(initialResponse);
      setIsLoading(false);

      // If it's the provisioning endpoint, simulate real-time status update
      if (endpoint === '/v1/esim/provision') {
        startPolling();
      }
    }, 1000);
  };

  const startPolling = () => {
    setIsPolling(true);
    pollingTimerRef.current = setTimeout(() => {
      setResponse((prev: any) => {
        if (!prev) return null;
        return {
          ...prev,
          data: {
            ...prev.data,
            status: 'active',
            activatedAt: new Date().toISOString()
          }
        };
      });
      setIsPolling(false);
    }, 5000); // Update status after 5 seconds
  };

  useEffect(() => {
    return () => {
      if (pollingTimerRef.current) clearTimeout(pollingTimerRef.current);
    };
  }, []);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <header>
        <h1 className="font-serif italic text-4xl text-[#141414] tracking-tight">
          {t('apiExplorer')}
        </h1>
        <p className="text-[#8E8E8E] font-mono text-xs uppercase tracking-widest mt-1">
          {t('testDebug')}
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Endpoint Selection */}
        <div className="lg:col-span-4 space-y-4">
          <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-[#8E8E8E]">{t('availableEndpoints')}</h3>
          <div className="space-y-2">
            {endpoints.map((ep, i) => (
              <button
                key={i}
                onClick={() => {
                  setMethod(ep.method);
                  setEndpoint(ep.path);
                  setResponse(null);
                  if (pollingTimerRef.current) clearTimeout(pollingTimerRef.current);
                  setIsPolling(false);
                }}
                className={cn(
                  "w-full text-left p-3 rounded-sm border transition-all group",
                  endpoint === ep.path 
                    ? "bg-[#141414] border-[#141414] text-[#E4E3E0]" 
                    : "bg-white border-[#141414]/10 hover:border-[#141414]/30"
                )}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className={cn(
                    "text-[9px] font-mono font-bold px-1.5 py-0.5 rounded",
                    ep.method === 'POST' ? 'bg-orange-500 text-white' : 
                    ep.method === 'GET' ? 'bg-blue-500 text-white' : 'bg-green-500 text-white'
                  )}>
                    {ep.method}
                  </span>
                  <span className="text-xs font-mono truncate">{ep.path}</span>
                </div>
                <p className={cn(
                  "text-[10px] line-clamp-1",
                  endpoint === ep.path ? "text-[#E4E3E0]/60" : "text-[#8E8E8E]"
                )}>
                  {ep.desc}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Right: Request/Response */}
        <div className="lg:col-span-8 space-y-6">
          {/* Request Config */}
          <div className="bg-white border border-[#141414]/10 rounded-sm overflow-hidden">
            <div className="p-4 border-b border-[#141414]/10 flex items-center justify-between bg-[#141414]/5">
              <div className="flex items-center gap-2">
                <div className="flex rounded overflow-hidden border border-[#141414]/20">
                  {['GET', 'POST', 'PATCH', 'DELETE'].map(m => (
                    <button
                      key={m}
                      onClick={() => setMethod(m)}
                      className={cn(
                        "px-3 py-1 text-[10px] font-mono font-bold transition-colors",
                        method === m ? "bg-[#141414] text-white" : "bg-white text-[#8E8E8E] hover:bg-gray-50"
                      )}
                    >
                      {m}
                    </button>
                  ))}
                </div>
                <input 
                  type="text" 
                  value={endpoint}
                  onChange={(e) => setEndpoint(e.target.value)}
                  className="bg-white border border-[#141414]/20 rounded px-3 py-1 text-xs font-mono w-64 focus:ring-1 focus:ring-[#141414] outline-none"
                />
              </div>
              <button 
                onClick={handleRun}
                disabled={isLoading || isPolling}
                className="flex items-center gap-2 px-4 py-1.5 bg-[#141414] text-[#E4E3E0] rounded text-xs font-bold hover:bg-[#141414]/90 transition-all disabled:opacity-50"
              >
                {isLoading ? <RefreshCw size={14} className="animate-spin" /> : <Play size={14} />}
                {t('runRequest')}
              </button>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-mono font-bold text-[#8E8E8E] uppercase tracking-widest">{t('requestBody')}</span>
                <button className="text-[10px] font-mono text-[#8E8E8E] hover:text-[#141414] flex items-center gap-1">
                  <Copy size={12} /> Copy JSON
                </button>
              </div>
              <pre className="bg-[#141414] text-[#E4E3E0] p-4 rounded text-xs font-mono overflow-x-auto">
                {JSON.stringify({
                  planId: "global_pro_50",
                  region: "US",
                  autoActivate: true,
                  metadata: {
                    customer_id: "cust_9921",
                    order_ref: "ORD-10293"
                  }
                }, null, 2)}
              </pre>
            </div>
          </div>

          {/* Response */}
          {response && (
            <div className="bg-white border border-[#141414]/10 rounded-sm overflow-hidden animate-in slide-in-from-top-4 duration-300">
              <div className="p-4 border-b border-[#141414]/10 flex items-center justify-between bg-[#141414]/5">
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-mono font-bold text-[#8E8E8E] uppercase tracking-widest">{t('response')}</span>
                  <div className="flex items-center gap-2">
                    <span className={cn(
                      "text-[10px] font-mono font-bold px-2 py-0.5 rounded",
                      response.status < 300 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    )}>
                      {response.status} {response.statusText}
                    </span>
                    <span className="text-[10px] font-mono text-[#8E8E8E]">124ms</span>
                    {isPolling && (
                      <div className="flex items-center gap-1 ml-2">
                        <Loader2 size={10} className="animate-spin text-blue-500" />
                        <span className="text-[9px] font-mono text-blue-500 uppercase tracking-tighter animate-pulse">Waiting for status update...</span>
                      </div>
                    )}
                  </div>
                </div>
                <button 
                  onClick={() => {
                    setResponse(null);
                    if (pollingTimerRef.current) clearTimeout(pollingTimerRef.current);
                    setIsPolling(false);
                  }}
                  className="text-[#8E8E8E] hover:text-red-500 transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              </div>
              <div className="p-4">
                <pre className="bg-gray-50 text-[#141414] p-4 rounded text-xs font-mono overflow-x-auto border border-[#141414]/5">
                  {JSON.stringify(response.data, null, 2)}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
