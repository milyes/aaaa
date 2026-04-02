import React, { useState } from 'react';
import { 
  ClipboardList, 
  Search, 
  Filter, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  ChevronRight,
  User,
  Calendar,
  FileText
} from 'lucide-react';
import { useLanguage } from '@/LanguageContext';
import { cn } from '@/lib/utils';

interface FormRequest {
  id: string;
  type: 'onboarding' | 'kyc' | 'provisioning' | 'support';
  submittedBy: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected' | 'inReview';
  priority: 'low' | 'medium' | 'high';
}

const MOCK_REQUESTS: FormRequest[] = [
  { id: 'FR-9021', type: 'onboarding', submittedBy: 'Jean Dupont', date: '2026-04-01T10:30:00Z', status: 'inReview', priority: 'high' },
  { id: 'FR-9022', type: 'kyc', submittedBy: 'Sarah Miller', date: '2026-04-01T09:15:00Z', status: 'approved', priority: 'medium' },
  { id: 'FR-9023', type: 'provisioning', submittedBy: 'Marc-André Tremblay', date: '2026-03-31T16:45:00Z', status: 'pending', priority: 'high' },
  { id: 'FR-9024', type: 'support', submittedBy: 'Elena Rodriguez', date: '2026-03-31T14:20:00Z', status: 'rejected', priority: 'low' },
  { id: 'FR-9025', type: 'onboarding', submittedBy: 'David Chen', date: '2026-03-30T11:10:00Z', status: 'approved', priority: 'medium' },
  { id: 'FR-9026', type: 'provisioning', submittedBy: 'Alice Wong', date: '2026-03-30T08:55:00Z', status: 'pending', priority: 'medium' },
];

export default function FormTracker() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRequests = MOCK_REQUESTS.filter(req => 
    req.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    req.submittedBy.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t(req.type).toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusIcon = (status: FormRequest['status']) => {
    switch (status) {
      case 'approved': return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case 'rejected': return <XCircle className="w-4 h-4 text-red-500" />;
      case 'pending': return <Clock className="w-4 h-4 text-amber-500" />;
      case 'inReview': return <AlertCircle className="w-4 h-4 text-blue-500" />;
    }
  };

  const getPriorityColor = (priority: FormRequest['priority']) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-100';
      case 'medium': return 'text-amber-600 bg-amber-50 border-amber-100';
      case 'low': return 'text-green-600 bg-green-50 border-green-100';
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-12">
      <header>
        <h1 className="font-serif italic text-4xl text-[#141414] tracking-tight flex items-center gap-3">
          <ClipboardList className="w-10 h-10" />
          {t('formTracker')}
        </h1>
        <p className="text-[#8E8E8E] font-mono text-xs uppercase tracking-widest mt-1">
          {t('trackRequests')}
        </p>
      </header>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white border border-[#141414]/10 p-4 rounded-sm">
          <p className="text-[10px] font-black uppercase tracking-widest text-[#141414]/40 mb-1">Total Requests</p>
          <p className="text-2xl font-black text-[#141414]">{MOCK_REQUESTS.length}</p>
        </div>
        <div className="bg-white border border-[#141414]/10 p-4 rounded-sm">
          <p className="text-[10px] font-black uppercase tracking-widest text-[#141414]/40 mb-1">Pending</p>
          <p className="text-2xl font-black text-amber-600">{MOCK_REQUESTS.filter(r => r.status === 'pending').length}</p>
        </div>
        <div className="bg-white border border-[#141414]/10 p-4 rounded-sm">
          <p className="text-[10px] font-black uppercase tracking-widest text-[#141414]/40 mb-1">In Review</p>
          <p className="text-2xl font-black text-blue-600">{MOCK_REQUESTS.filter(r => r.status === 'inReview').length}</p>
        </div>
        <div className="bg-white border border-[#141414]/10 p-4 rounded-sm">
          <p className="text-[10px] font-black uppercase tracking-widest text-[#141414]/40 mb-1">Completed</p>
          <p className="text-2xl font-black text-green-600">{MOCK_REQUESTS.filter(r => r.status === 'approved' || r.status === 'rejected').length}</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 bg-white p-4 border border-[#141414]/10 rounded-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8E8E8E]" size={18} />
          <input 
            type="text" 
            placeholder={t('searchClients')}
            className="w-full pl-10 pr-4 py-2 bg-[#141414]/5 border-none rounded-sm text-sm focus:ring-1 focus:ring-[#141414] outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#141414]/5 rounded-sm text-sm font-medium hover:bg-[#141414]/10 transition-colors">
          <Filter size={16} /> {t('filters')}
        </button>
      </div>

      {/* Requests List */}
      <div className="bg-white border border-[#141414]/10 rounded-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#141414]/10 bg-[#141414]/5">
                <th className="p-4 text-[10px] font-black uppercase tracking-widest text-[#141414]/40">{t('formId')}</th>
                <th className="p-4 text-[10px] font-black uppercase tracking-widest text-[#141414]/40">{t('formType')}</th>
                <th className="p-4 text-[10px] font-black uppercase tracking-widest text-[#141414]/40">{t('submittedBy')}</th>
                <th className="p-4 text-[10px] font-black uppercase tracking-widest text-[#141414]/40">{t('status')}</th>
                <th className="p-4 text-[10px] font-black uppercase tracking-widest text-[#141414]/40">Priority</th>
                <th className="p-4 text-[10px] font-black uppercase tracking-widest text-[#141414]/40">{t('submissionDate')}</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#141414]/5">
              {filteredRequests.map((req) => (
                <tr key={req.id} className="hover:bg-[#141414]/[0.02] transition-colors group">
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-[#141414]/20" />
                      <span className="font-mono text-xs font-bold text-[#141414]">{req.id}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-sm font-medium">{t(req.type)}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <User className="w-3 h-3 text-[#141414]/30" />
                      <span className="text-sm">{req.submittedBy}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(req.status)}
                      <span className={cn(
                        "text-[10px] font-black uppercase tracking-tighter",
                        req.status === 'approved' && "text-green-600",
                        req.status === 'rejected' && "text-red-600",
                        req.status === 'pending' && "text-amber-600",
                        req.status === 'inReview' && "text-blue-600"
                      )}>
                        {t(req.status)}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={cn(
                      "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide border",
                      getPriorityColor(req.priority)
                    )}>
                      {req.priority}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-[#8E8E8E]">
                      <Calendar className="w-3 h-3" />
                      <span className="font-mono text-[10px]">
                        {new Date(req.date).toLocaleDateString()}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <button className="p-1 hover:bg-[#141414]/5 rounded-md transition-colors">
                      <ChevronRight size={16} className="text-[#8E8E8E]" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
