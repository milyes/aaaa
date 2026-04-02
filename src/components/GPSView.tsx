import React, { useState, useEffect } from 'react';
import { 
  Map as MapIcon, 
  Navigation, 
  Shield, 
  ShieldOff, 
  Radio, 
  Crosshair,
  Search,
  Filter,
  MoreVertical,
  Wifi,
  Battery
} from 'lucide-react';
import { useLanguage } from '@/LanguageContext';
import { cn } from '@/lib/utils';

interface TrackedDevice {
  id: string;
  iccid: string;
  lat: number;
  lng: number;
  accuracy: number;
  signal: number;
  battery: number;
  status: 'active' | 'ghost';
  lastUpdate: string;
  history: { lat: number, lng: number }[];
}

const MOCK_DEVICES: TrackedDevice[] = [
  { id: '1', iccid: '89014103211118510720', lat: 48.8566, lng: 2.3522, accuracy: 5, signal: 88, battery: 92, status: 'active', lastUpdate: '2s ago', history: [] },
  { id: '2', iccid: '89441000302011049921', lat: 52.5200, lng: 13.4050, accuracy: 12, signal: 72, battery: 45, status: 'ghost', lastUpdate: '15s ago', history: [] },
  { id: '3', iccid: '89852300441020031122', lat: 35.6762, lng: 139.6503, accuracy: 8, signal: 95, battery: 100, status: 'active', lastUpdate: 'Just now', history: [] },
  { id: '4', iccid: '89011200551030042233', lat: 51.5074, lng: -0.1278, accuracy: 25, signal: 45, battery: 12, status: 'active', lastUpdate: '1m ago', history: [] },
];

export default function GPSView() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [devices, setDevices] = useState<TrackedDevice[]>(MOCK_DEVICES);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string>(MOCK_DEVICES[0].id);
  const [isGhostMode, setIsGhostMode] = useState(false);

  const selectedDevice = devices.find(d => d.id === selectedDeviceId) || null;

  const filteredDevices = devices.filter(d => 
    d.iccid.includes(searchQuery)
  );

  // Simulate real-time movement
  useEffect(() => {
    const interval = setInterval(() => {
      setDevices(prevDevices => prevDevices.map(device => {
        const newLat = device.lat + (Math.random() - 0.5) * 0.0005;
        const newLng = device.lng + (Math.random() - 0.5) * 0.0005;
        const newHistory = [...device.history, { lat: device.lat, lng: device.lng }].slice(-15);
        
        return {
          ...device,
          lat: newLat,
          lng: newLng,
          history: newHistory,
          lastUpdate: t('systemLive'),
          signal: Math.min(100, Math.max(0, device.signal + Math.floor((Math.random() - 0.5) * 5)))
        };
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, [t]);

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col lg:flex-row gap-6 animate-in fade-in duration-700">
      {/* Sidebar: Device List */}
      <div className="w-full lg:w-80 flex flex-col bg-white border border-[#141414]/10 rounded-sm overflow-hidden">
        <div className="p-4 border-b border-[#141414]/10 bg-[#141414]/5">
          <h2 className="font-serif italic text-xl text-[#141414] flex items-center gap-2">
            <Navigation className="w-5 h-5" />
            {t('gpsTracking')}
          </h2>
          <p className="text-[10px] font-mono uppercase tracking-widest text-[#8E8E8E] mt-1">
            GPSVIEW.ghost@trakcell
          </p>
        </div>

        <div className="p-4 border-b border-[#141414]/10">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E8E8E]" />
            <input 
              type="text" 
              placeholder={t('searchPlaceholder')}
              className="w-full pl-10 pr-4 py-2 bg-[#141414]/5 border-none rounded-sm text-sm focus:ring-1 focus:ring-[#141414] outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-[#141414]/5">
          {filteredDevices.map((device) => (
            <button
              key={device.id}
              onClick={() => setSelectedDeviceId(device.id)}
              className={cn(
                "w-full p-4 text-left transition-colors hover:bg-[#141414]/[0.02] flex items-center gap-3",
                selectedDeviceId === device.id && "bg-[#141414]/5 border-l-2 border-[#141414]"
              )}
            >
              <div className={cn(
                "w-2 h-2 rounded-full shrink-0",
                device.status === 'ghost' ? "bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.5)]" : "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]"
              )} />
              <div className="flex-1 min-w-0">
                <p className="font-mono text-xs font-bold text-[#141414] truncate">{device.iccid}</p>
                <p className="text-[10px] text-[#8E8E8E] uppercase tracking-widest">{device.lastUpdate}</p>
              </div>
              <ChevronRight size={14} className="text-[#8E8E8E]" />
            </button>
          ))}
        </div>
      </div>

      {/* Main Content: Map & Details */}
      <div className="flex-1 flex flex-col gap-6">
        {/* Map Placeholder */}
        <div className="flex-1 bg-[#141414] rounded-sm relative overflow-hidden border border-[#141414]">
          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-10" style={{ 
            backgroundImage: 'radial-gradient(#E4E3E0 1px, transparent 1px)', 
            backgroundSize: '20px 20px' 
          }} />
          
          {/* Map UI Elements */}
          <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
            <button className="p-2 bg-white/90 backdrop-blur-sm border border-[#141414]/10 rounded-sm hover:bg-white transition-colors shadow-sm">
              <Crosshair size={18} className="text-[#141414]" />
            </button>
            <button 
              onClick={() => setIsGhostMode(!isGhostMode)}
              className={cn(
                "p-2 backdrop-blur-sm border border-[#141414]/10 rounded-sm transition-all shadow-sm",
                isGhostMode ? "bg-purple-500 text-white border-purple-400" : "bg-white/90 text-[#141414] hover:bg-white"
              )}
            >
              {isGhostMode ? <ShieldOff size={18} /> : <Shield size={18} />}
            </button>
          </div>

          <div className="absolute top-4 right-4 z-10">
            <div className="bg-[#141414]/80 backdrop-blur-md border border-white/10 p-3 rounded-sm text-white font-mono text-[10px] uppercase tracking-widest space-y-1">
              <div className="flex justify-between gap-4">
                <span className="opacity-50">Lat:</span>
                <span>{selectedDevice?.lat.toFixed(4)}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="opacity-50">Lng:</span>
                <span>{selectedDevice?.lng.toFixed(4)}</span>
              </div>
            </div>
          </div>

          {/* Stylized Map Content */}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Radar Effect Background */}
            <div className="relative w-64 h-64 pointer-events-none">
              <div className="absolute inset-0 border border-white/5 rounded-full animate-ping" />
              <div className="absolute inset-0 border border-white/10 rounded-full scale-75" />
              <div className="absolute inset-0 border border-white/20 rounded-full scale-50" />
            </div>
            
            {/* Device Markers & Trails */}
            <div className="absolute inset-0">
              {devices.map((device) => {
                // Simple coordinate mapping relative to selected device (centered)
                const xOffset = selectedDevice ? (device.lng - selectedDevice.lng) * 10000 : 0;
                const yOffset = selectedDevice ? (selectedDevice.lat - device.lat) * 10000 : 0;
                
                const left = 50 + xOffset;
                const top = 50 + yOffset;

                const isSelected = device.id === selectedDeviceId;

                return (
                  <React.Fragment key={device.id}>
                    {/* Movement Trail for selected device */}
                    {isSelected && device.history.map((pos, idx) => {
                      const hX = 50 + (pos.lng - selectedDevice.lng) * 10000;
                      const hY = 50 + (selectedDevice.lat - pos.lat) * 10000;
                      const opacity = (idx + 1) / device.history.length;
                      
                      return (
                        <div 
                          key={`trail-${idx}`}
                          className={cn(
                            "absolute w-1 h-1 rounded-full -translate-x-1/2 -translate-y-1/2",
                            (isGhostMode || device.status === 'ghost') ? "bg-purple-500" : "bg-green-500"
                          )}
                          style={{ 
                            left: `${hX}%`, 
                            top: `${hY}%`,
                            opacity: opacity * 0.3
                          }}
                        />
                      );
                    })}

                    <div 
                      className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 group"
                      style={{ left: `${left}%`, top: `${top}%` }}
                    >
                      {/* Tooltip */}
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                        <div className="bg-[#141414] text-white text-[10px] font-mono px-2 py-1 rounded-sm border border-white/10 whitespace-nowrap shadow-xl">
                          <span className="opacity-50 mr-1">ICCID:</span>
                          {device.iccid}
                        </div>
                        <div className="w-2 h-2 bg-[#141414] border-r border-b border-white/10 rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2" />
                      </div>

                      {/* Marker Dot */}
                      <div 
                        onClick={() => setSelectedDeviceId(device.id)}
                        className={cn(
                          "w-4 h-4 rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-125",
                          isSelected && "ring-2 ring-white ring-offset-2 ring-offset-[#141414]",
                          (isGhostMode || device.status === 'ghost') ? "bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.8)]" : "bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)]"
                        )}
                      >
                        <div className="w-1.5 h-1.5 bg-white rounded-full" />
                      </div>

                      {/* Label for selected device */}
                      {isSelected && (
                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap">
                          <span className={cn(
                            "bg-[#141414]/80 backdrop-blur-sm text-white text-[9px] font-mono px-1.5 py-0.5 rounded-sm border border-white/10 uppercase tracking-tighter",
                            isGhostMode && "text-purple-400 border-purple-500/30"
                          )}>
                            {isGhostMode ? t('ghostMode') : t('systemLive')}
                          </span>
                        </div>
                      )}
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Ghost Mode Overlay */}
          {isGhostMode && (
            <>
              <div className="absolute inset-0 pointer-events-none border-4 border-purple-500/20 animate-pulse z-30" />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
                <div className="bg-purple-500 text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1 rounded-full shadow-[0_0_20px_rgba(168,85,247,0.5)] animate-bounce">
                  {t('stealthTracking')}
                </div>
              </div>
              {/* Scanline Effect */}
              <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(168,85,247,0.05)_50%,transparent_50%)] bg-[length:100%_4px] z-20 opacity-50" />
            </>
          )}
        </div>

        {/* Device Details Bar */}
        <div className="bg-white border border-[#141414]/10 p-6 rounded-sm flex flex-wrap items-center gap-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#141414]/5 rounded-sm flex items-center justify-center">
              <Radio className={cn(
                "w-6 h-6",
                (isGhostMode || selectedDevice?.status === 'ghost') ? "text-purple-600" : "text-green-600"
              )} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-[#141414]/40 mb-1">{t('status')}</p>
              <p className={cn(
                "text-sm font-bold uppercase tracking-tighter",
                isGhostMode && "text-purple-600"
              )}>
                {isGhostMode ? t('stealthTracking') : t('systemLive')}
              </p>
            </div>
          </div>

          <div className="h-10 w-[1px] bg-[#141414]/10 hidden md:block" />

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-[#141414]/5 rounded-sm flex items-center justify-center">
              <Wifi className="w-5 h-5 text-[#141414]" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-[#141414]/40 mb-1">{t('signalStrength')}</p>
              <p className="text-sm font-bold font-mono">{selectedDevice?.signal}%</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-[#141414]/5 rounded-sm flex items-center justify-center">
              <Battery className={cn(
                "w-5 h-5",
                (selectedDevice?.battery || 0) < 20 ? "text-red-500" : "text-[#141414]"
              )} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-[#141414]/40 mb-1">Battery</p>
              <p className="text-sm font-bold font-mono">{selectedDevice?.battery}%</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-[#141414]/5 rounded-sm flex items-center justify-center">
              <MapIcon className="w-5 h-5 text-[#141414]" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-[#141414]/40 mb-1">{t('accuracy')}</p>
              <p className="text-sm font-bold font-mono">±{selectedDevice?.accuracy}m</p>
            </div>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <button className="px-4 py-2 bg-[#141414] text-white text-[10px] font-black uppercase tracking-widest rounded-sm hover:bg-[#141414]/90 transition-all">
              {t('testDebug')}
            </button>
            <button className="p-2 border border-[#141414]/10 rounded-sm hover:bg-[#141414]/5 transition-colors">
              <MoreVertical size={16} className="text-[#141414]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChevronRight({ size, className }: { size: number, className?: string }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="m9 18 6-6-6-6"/>
    </svg>
  );
}
