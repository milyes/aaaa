import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Plus, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  Mail, 
  Phone, 
  Building2,
  ChevronRight,
  Filter,
  X
} from 'lucide-react';
import { useLanguage } from '@/LanguageContext';
import { cn } from '@/lib/utils';
import ClientForm from './ClientForm';

interface Client {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  status: 'active' | 'inactive';
  lastActivity: string;
}

const MOCK_CLIENTS: Client[] = [
  {
    id: '1',
    firstName: 'Jean',
    lastName: 'Dupont',
    email: 'jean.dupont@example.com',
    phone: '+1 514-555-0101',
    company: 'Tech Solutions QC',
    status: 'active',
    lastActivity: '2026-03-31T14:20:00Z'
  },
  {
    id: '2',
    firstName: 'Sarah',
    lastName: 'Miller',
    email: 's.miller@globalconnect.com',
    phone: '+1 416-555-0202',
    company: 'Global Connect Inc.',
    status: 'active',
    lastActivity: '2026-04-01T09:15:00Z'
  },
  {
    id: '3',
    firstName: 'Marc-André',
    lastName: 'Tremblay',
    email: 'ma.tremblay@logistique.ca',
    phone: '+1 418-555-0303',
    company: 'Tremblay Logistique',
    status: 'inactive',
    lastActivity: '2026-03-15T11:45:00Z'
  },
  {
    id: '4',
    firstName: 'Elena',
    lastName: 'Rodriguez',
    email: 'elena.r@smartmobility.net',
    phone: '+1 604-555-0404',
    company: 'Smart Mobility Systems',
    status: 'active',
    lastActivity: '2026-04-01T16:30:00Z'
  }
];

export default function ClientManagement() {
  const { t } = useLanguage();
  const [view, setView] = useState<'list' | 'add' | 'edit'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [clients, setClients] = useState<Client[]>(MOCK_CLIENTS);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const stats = {
    total: clients.length,
    active: clients.filter(c => c.status === 'active').length,
    inactive: clients.filter(c => c.status === 'inactive').length,
  };

  const filteredClients = clients.filter(client => {
    const fullName = `${client.firstName} ${client.lastName}`.toLowerCase();
    const email = client.email.toLowerCase();
    const company = client.company.toLowerCase();
    const query = searchQuery.toLowerCase();
    return fullName.includes(query) || email.includes(query) || company.includes(query);
  });

  const toggleSelectAll = () => {
    if (selectedIds.size === filteredClients.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredClients.map(c => c.id)));
    }
  };

  const toggleSelectClient = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  const handleBulkDeactivate = () => {
    setClients(clients.map(c => 
      selectedIds.has(c.id) ? { ...c, status: 'inactive' as const } : c
    ));
    setSelectedIds(new Set());
  };

  const handleBulkDelete = () => {
    if (window.confirm(t('confirmBulkDelete'))) {
      setClients(clients.filter(c => !selectedIds.has(c.id)));
      setSelectedIds(new Set());
    }
  };

  const handleAddClient = () => {
    setView('add');
    setSelectedClient(null);
  };

  const handleEditClient = (client: Client) => {
    setSelectedClient(client);
    setView('edit');
  };

  const handleDeleteClient = (id: string) => {
    if (window.confirm(t('confirmDelete'))) {
      setClients(clients.filter(c => c.id !== id));
    }
  };

  const handleFormSuccess = () => {
    setView('list');
    // In a real app, we'd refetch or update state
  };

  if (view === 'add' || view === 'edit') {
    return (
      <div className="p-8 max-w-4xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black uppercase tracking-tighter text-[#141414]">
              {view === 'add' ? t('addClient') : t('editClient')}
            </h1>
            <p className="text-[#141414]/60 font-mono text-xs mt-1">
              {view === 'add' ? 'REGISTER_NEW_CELLULAR_CLIENT' : `EDIT_CLIENT_ID_${selectedClient?.id}`}
            </p>
          </div>
          <button 
            onClick={() => setView('list')}
            className="text-sm font-bold hover:underline"
          >
            {t('cancel')}
          </button>
        </div>
        <ClientForm 
          initialData={selectedClient || undefined} 
          onSuccess={handleFormSuccess}
          onCancel={() => setView('list')}
        />
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tighter text-[#141414] flex items-center gap-3">
            <Users className="w-10 h-10" />
            {t('clients')}
          </h1>
          <p className="text-[#141414]/60 font-mono text-xs mt-1">
            MANAGE_CELLULAR_NETWORK_PARTNERS_AND_CLIENTS
          </p>
        </div>
        <button 
          onClick={handleAddClient}
          className="bg-[#141414] text-white px-6 py-3 rounded-sm flex items-center gap-2 font-bold hover:bg-[#141414]/90 transition-all uppercase text-sm tracking-widest"
        >
          <Plus className="w-4 h-4" />
          {t('addClient')}
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white border border-[#141414]/10 p-6 rounded-sm">
          <p className="text-[10px] font-black uppercase tracking-widest text-[#141414]/40 mb-1">Total Clients</p>
          <p className="text-3xl font-black text-[#141414]">{stats.total}</p>
        </div>
        <div className="bg-white border border-[#141414]/10 p-6 rounded-sm">
          <p className="text-[10px] font-black uppercase tracking-widest text-[#141414]/40 mb-1">Active Partners</p>
          <p className="text-3xl font-black text-green-600">{stats.active}</p>
        </div>
        <div className="bg-white border border-[#141414]/10 p-6 rounded-sm">
          <p className="text-[10px] font-black uppercase tracking-widest text-[#141414]/40 mb-1">Inactive / Pending</p>
          <p className="text-3xl font-black text-[#141414]/40">{stats.inactive}</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white border border-[#141414]/10 p-4 mb-6 flex flex-col md:flex-row gap-4 relative overflow-hidden">
        {selectedIds.size > 0 && (
          <div className="absolute inset-0 bg-[#141414] text-white flex items-center px-6 z-10 animate-in slide-in-from-top duration-200">
            <div className="flex items-center gap-4 flex-1">
              <span className="text-sm font-bold tracking-widest uppercase">
                {selectedIds.size} {t('selected')}
              </span>
              <div className="h-4 w-[1px] bg-white/20" />
              <div className="flex items-center gap-2">
                <button 
                  onClick={handleBulkDeactivate}
                  className="text-[10px] font-black uppercase tracking-widest hover:bg-white/10 px-3 py-1.5 rounded-sm transition-colors"
                >
                  {t('deactivateSelected')}
                </button>
                <button 
                  onClick={handleBulkDelete}
                  className="text-[10px] font-black uppercase tracking-widest hover:bg-red-500 px-3 py-1.5 rounded-sm transition-colors"
                >
                  {t('deleteSelected')}
                </button>
              </div>
            </div>
            <button 
              onClick={() => setSelectedIds(new Set())}
              className="p-2 hover:bg-white/10 rounded-sm"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#141414]/40" />
          <input
            type="text"
            placeholder={t('searchClients')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#141414]/5 border-none rounded-sm text-sm focus:ring-1 focus:ring-[#141414] outline-none"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-[#141414]/10 rounded-sm text-sm font-bold hover:bg-[#141414]/5 transition-all">
          <Filter className="w-4 h-4" />
          {t('filters')}
        </button>
      </div>

      {/* Client List */}
      <div className="bg-white border border-[#141414]/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-bottom border-[#141414]/10 bg-[#141414]/5">
                <th className="p-4 w-10">
                  <input 
                    type="checkbox" 
                    className="accent-[#141414]"
                    checked={filteredClients.length > 0 && selectedIds.size === filteredClients.length}
                    onChange={toggleSelectAll}
                  />
                </th>
                <th className="p-4 text-[10px] font-black uppercase tracking-widest text-[#141414]/40">{t('firstName')} / {t('lastName')}</th>
                <th className="p-4 text-[10px] font-black uppercase tracking-widest text-[#141414]/40">{t('company')}</th>
                <th className="p-4 text-[10px] font-black uppercase tracking-widest text-[#141414]/40">{t('status')}</th>
                <th className="p-4 text-[10px] font-black uppercase tracking-widest text-[#141414]/40">{t('lastActive')}</th>
                <th className="p-4 text-[10px] font-black uppercase tracking-widest text-[#141414]/40 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#141414]/5">
              {filteredClients.length > 0 ? (
                filteredClients.map((client) => (
                  <tr key={client.id} className={cn(
                    "hover:bg-[#141414]/[0.02] transition-colors group",
                    selectedIds.has(client.id) && "bg-[#141414]/[0.02]"
                  )}>
                    <td className="p-4">
                      <input 
                        type="checkbox" 
                        className="accent-[#141414]"
                        checked={selectedIds.has(client.id)}
                        onChange={() => toggleSelectClient(client.id)}
                      />
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-[#141414]">{client.firstName} {client.lastName}</span>
                        <div className="flex items-center gap-2 text-xs text-[#141414]/50 mt-1">
                          <Mail className="w-3 h-3" />
                          {client.email}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-[#141414]/50 mt-0.5">
                          <Phone className="w-3 h-3" />
                          <span className="font-mono">{client.phone}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-[#141414]/30" />
                        <span className="text-sm font-medium">{client.company}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={cn(
                        "px-2 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter",
                        client.status === 'active' 
                          ? "bg-green-100 text-green-700" 
                          : "bg-gray-100 text-gray-500"
                      )}>
                        {client.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="text-xs font-mono text-[#141414]/60">
                        {new Date(client.lastActivity).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => handleEditClient(client)}
                          className="p-2 hover:bg-[#141414]/5 rounded-sm text-[#141414]/60 hover:text-[#141414]"
                          title={t('editClient')}
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteClient(client.id)}
                          className="p-2 hover:bg-red-50 rounded-sm text-[#141414]/60 hover:text-red-600"
                          title={t('deleteClient')}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <button className="p-2 hover:bg-[#141414]/5 rounded-sm text-[#141414]/60">
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-12 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <Users className="w-12 h-12 text-[#141414]/10" />
                      <p className="text-[#141414]/40 font-mono text-sm">{t('noClientsFound')}</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
