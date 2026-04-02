import React, { useState } from 'react';
import { UserPlus, CheckCircle, AlertCircle, Phone, Mail, Building, User } from 'lucide-react';
import { useLanguage } from '@/LanguageContext';
import { cn } from '@/lib/utils';

interface ClientFormProps {
  initialData?: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    company: string;
  };
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function ClientForm({ initialData, onSuccess, onCancel }: ClientFormProps) {
  const { t } = useLanguage();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState(initialData || {
    firstName: '',
    lastName: '',
    email: '',
    phone: '+1 ',
    company: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      if (onSuccess) onSuccess();
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header>
        <h1 className="font-serif italic text-4xl text-[#141414] tracking-tight">
          {t('clientForm')}
        </h1>
        <p className="text-[#8E8E8E] font-mono text-xs uppercase tracking-widest mt-1">
          Register a new cellular client profile
        </p>
      </header>

      {isSubmitted ? (
        <div className="bg-green-50 border border-green-200 p-6 rounded-sm flex items-center gap-4 animate-in zoom-in-95 duration-300">
          <CheckCircle className="text-green-600" size={32} />
          <div>
            <h3 className="font-bold text-green-800">{t('success')}</h3>
            <p className="text-sm text-green-700">{t('clientAdded')}</p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white border border-[#141414]/10 p-8 rounded-sm shadow-sm space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#8E8E8E] flex items-center gap-2">
                <User size={12} /> {t('firstName')}
              </label>
              <input
                required
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="John"
                className="w-full bg-[#141414]/5 border-none rounded-sm px-4 py-2 text-sm focus:ring-1 focus:ring-[#141414] outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#8E8E8E] flex items-center gap-2">
                <User size={12} /> {t('lastName')}
              </label>
              <input
                required
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Doe"
                className="w-full bg-[#141414]/5 border-none rounded-sm px-4 py-2 text-sm focus:ring-1 focus:ring-[#141414] outline-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#8E8E8E] flex items-center gap-2">
              <Mail size={12} /> {t('emailAddress')}
            </label>
            <input
              required
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john.doe@example.com"
              className="w-full bg-[#141414]/5 border-none rounded-sm px-4 py-2 text-sm focus:ring-1 focus:ring-[#141414] outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#8E8E8E] flex items-center gap-2">
              <Phone size={12} /> {t('phoneNumber')}
            </label>
            <input
              required
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1 (555) 000-0000"
              className="w-full bg-[#141414]/5 border-none rounded-sm px-4 py-2 text-sm font-mono focus:ring-1 focus:ring-[#141414] outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#8E8E8E] flex items-center gap-2">
              <Building size={12} /> {t('company')}
            </label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Z-Global Corp"
              className="w-full bg-[#141414]/5 border-none rounded-sm px-4 py-2 text-sm focus:ring-1 focus:ring-[#141414] outline-none"
            />
          </div>

          <div className="pt-4 flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-[#141414] text-[#E4E3E0] py-3 rounded-sm text-sm font-bold hover:bg-[#141414]/90 transition-all flex items-center justify-center gap-2"
            >
              <UserPlus size={18} />
              {t('submit')}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 border border-[#141414]/10 rounded-sm text-sm font-bold hover:bg-[#141414]/5 transition-all"
            >
              {t('cancel')}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
