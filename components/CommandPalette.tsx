
import React, { useState, useEffect, useRef } from 'react';
/* Fix: Standard import for react-router-dom useNavigate */
import { useNavigate } from 'react-router-dom';
import { 
  Search, Command, ArrowRight, Zap, Bot, Microscope, 
  GraduationCap, MapPin, Newspaper, Phone, Mail, 
  Sparkles, Layers, ShieldCheck, UserCheck, Activity, Image as ImageIcon, HelpCircle
} from 'lucide-react';
import { useSite } from '../contexts/SiteContext';

interface CommandPaletteItem {
  id: string;
  name: string;
  path?: string;
  action?: () => void;
  icon: React.ComponentType<any>;
  category: string;
  hidden?: boolean;
}

const CommandPalette: React.FC = () => {
  const { content } = useSite();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const staticItems: CommandPaletteItem[] = [
    { id: 'h', name: 'Home Portal', path: '/', icon: Zap, category: 'Navigation' },
    { id: 'a', name: 'About QuantaNova', path: '/about', icon: GraduationCap, category: 'Navigation' },
    { id: 'ac', name: 'Academics & Syllabus', path: '/academics', icon: Layers, category: 'Navigation' },
    { id: 'is', name: 'I-STEM Innovation Hub', path: '/i-stem', icon: Bot, category: 'Navigation' },
    { id: 'cp', name: 'Campus Infrastructure', path: '/campus', icon: MapPin, category: 'Navigation' },
    { id: 'ga', name: 'Archives Gallery', path: '/gallery', icon: ImageIcon, category: 'Navigation', hidden: !content.showGallery },
    { id: 'ng', name: 'Novagzine Monthly', path: '/novagzine', icon: Newspaper, category: 'Community' },
    { id: 'bj', name: 'Quantum Journal (Blog)', path: '/blog', icon: Newspaper, category: 'Community' },
    { id: 'fq', name: 'Institutional FAQ', path: '/faq', icon: HelpCircle, category: 'Information' },
    { id: 'ct', name: 'Contact Admissions', path: '/contact', icon: UserCheck, category: 'Contact' },
    { id: 'ca', name: 'Call Admissions Desk', action: () => { window.open(`tel:${content.contactPhone}`); }, icon: Phone, category: 'Actions' },
    { id: 'em', name: 'Email Admissions', action: () => { window.open(`mailto:${content.contactEmail}`); }, icon: Mail, category: 'Actions' },
    { id: 'vt', name: 'Book Campus Tour', action: () => { window.open(content.googleFormUrl, '_blank'); }, icon: Sparkles, category: 'Actions' },
    { id: 'pp', name: 'Privacy Policy', path: '/privacy', icon: ShieldCheck, category: 'Legal' },
    { id: 'ts', name: 'Terms of Service', path: '/terms', icon: ShieldCheck, category: 'Legal' },
  ];

  const labItems: CommandPaletteItem[] = (content.labs || []).map(lab => ({
    id: `lab-${lab.id}`,
    name: `${lab.title} Facility`,
    path: `/labs/${lab.id}`,
    icon: Microscope,
    category: 'Research Centers'
  }));

  const infrastructureItems: CommandPaletteItem[] = (content.infrastructure || []).map(zone => ({
    id: `infra-${zone.id}`,
    name: zone.title,
    path: `/labs/${zone.id}`,
    icon: Activity,
    category: 'Campus Zones'
  }));

  const items = [...staticItems, ...labItems, ...infrastructureItems].filter(i => !i.hidden);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      } else if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setActiveIndex(0);
    }
  }, [isOpen]);

  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(query.toLowerCase()) || 
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (item: CommandPaletteItem) => {
    if (item.action) {
      item.action();
    } else if (item.path) {
      navigate(item.path);
    }
    setIsOpen(false);
    setQuery('');
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(prev => (prev + 1) % (filteredItems.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(prev => (prev - 1 + (filteredItems.length || 1)) % (filteredItems.length || 1));
    } else if (e.key === 'Enter' && filteredItems[activeIndex]) {
      handleSelect(filteredItems[activeIndex]);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] bg-navy-950/80 backdrop-blur-2xl flex items-start justify-center pt-[10vh] px-4 animate-in fade-in duration-300">
      <div 
        className="w-full max-w-2xl bg-[#0a0f1d] border border-white/10 rounded-[3rem] shadow-[0_0_80px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center gap-5 px-8 py-7 border-b border-white/5 bg-navy-900/50">
          <Search className="text-brand-red w-7 h-7" />
          <input 
            ref={inputRef}
            type="text" 
            placeholder="Search QuantaNova Interface..." 
            className="flex-1 bg-transparent border-none outline-none text-2xl text-white placeholder:text-slate-700 font-display tracking-tight"
            value={query}
            onChange={e => {setQuery(e.target.value); setActiveIndex(0);}}
            onKeyDown={onKeyDown}
          />
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-xl border border-white/5">
            <Command size={14} className="text-slate-500" />
            <span className="text-[10px] font-black text-slate-500">ESC</span>
          </div>
        </div>

        <div className="max-h-[65vh] overflow-y-auto p-6 custom-scrollbar space-y-8">
          {filteredItems.length > 0 ? (
            <div className="space-y-2">
              {filteredItems.map((item, index) => {
                const isSelected = index === activeIndex;
                const isFirstInCategory = index === 0 || filteredItems[index - 1].category !== item.category;

                return (
                  <React.Fragment key={item.id}>
                    {isFirstInCategory && (
                      <div className="px-4 pt-4 pb-2 text-[9px] font-black uppercase tracking-[0.3em] text-slate-600">
                        {item.category}
                      </div>
                    )}
                    <button
                      onClick={() => handleSelect(item)}
                      onMouseEnter={() => setActiveIndex(index)}
                      className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all group ${
                        isSelected ? 'bg-brand-red/10 border border-brand-red/20' : 'border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-5">
                        <div className={`p-3 rounded-xl bg-navy-900 border border-white/5 group-hover:border-brand-red/30 transition-all ${isSelected ? 'text-brand-red shadow-[0_0_20px_rgba(198,25,32,0.2)]' : 'text-slate-500'}`}>
                          <item.icon size={22} />
                        </div>
                        <div className="text-left">
                          <div className={`font-bold text-base transition-colors ${isSelected ? 'text-white' : 'text-slate-400'}`}>{item.name}</div>
                          {item.path && <div className="text-[9px] font-mono text-slate-600 uppercase tracking-widest">{item.path}</div>}
                        </div>
                      </div>
                      <div className={`flex items-center gap-3 transition-all ${isSelected ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
                        <span className="text-[9px] font-black text-brand-red uppercase tracking-widest">Execute</span>
                        <ArrowRight size={18} className="text-brand-red" />
                      </div>
                    </button>
                  </React.Fragment>
                );
              })}
            </div>
          ) : (
            <div className="py-20 text-center space-y-4">
              <Search className="w-16 h-16 text-slate-800 mx-auto" />
              <p className="text-slate-600 font-display uppercase text-sm tracking-[0.3em]">No matching neural link found</p>
            </div>
          )}
        </div>

        <div className="px-10 py-5 bg-navy-950/80 border-t border-white/5 flex items-center justify-between">
           <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-[9px] font-black text-slate-500 uppercase">
                 <span className="bg-navy-900 px-2 py-1 rounded-lg border border-white/5 text-white">↑↓</span> Navigate
              </div>
              <div className="flex items-center gap-2 text-[9px] font-black text-slate-500 uppercase">
                 <span className="bg-navy-900 px-2 py-1 rounded-lg border border-white/5 text-white">ENTER</span> Select
              </div>
           </div>
        </div>
      </div>
      <div className="absolute inset-0 -z-10" onClick={() => setIsOpen(false)} />
    </div>
  );
};

export default CommandPalette;
