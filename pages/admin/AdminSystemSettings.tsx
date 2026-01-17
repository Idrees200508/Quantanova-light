
import React, { useState, useEffect } from 'react';
import { useSite, SiteContent, SchoolNotice } from '../../contexts/SiteContext';
import { 
  ShieldCheck, Globe, Phone, Mail, ToggleLeft, ToggleRight, 
  Save, Sparkles, Navigation, Megaphone, Plus, Trash2,
  Users, MapPin, Activity, ImageIcon, Star, FileText, HelpCircle, LayoutGrid
} from 'lucide-react';
import Button from '../../components/Button';

const AdminSystemSettings: React.FC = () => {
  const { content, updateContent } = useSite();
  const [localContent, setLocalContent] = useState<SiteContent>(content);
  const [newNotice, setNewNotice] = useState({ title: '', date: '', isUrgent: false });

  useEffect(() => {
    setLocalContent(content);
  }, [content]);

  const handleSave = async () => {
    await updateContent(localContent);
    alert("System Parameters Synchronized.");
  };

  const addNotice = () => {
    if (newNotice.title) {
      const updated = { ...localContent, notices: [{ ...newNotice, id: `n${Date.now()}` } as SchoolNotice, ...(localContent.notices || [])] };
      setLocalContent(updated);
      setNewNotice({ title: '', date: '', isUrgent: false });
    }
  };

  const removeNotice = (id: string) => {
    setLocalContent({ ...localContent, notices: (localContent.notices || []).filter(n => n.id !== id) });
  };

  const toggles = [
    { key: 'admissionsOpen', label: 'Admissions protocol', icon: Users },
    { key: 'showAnthem', label: 'Anthem module', icon: Activity },
    { key: 'showVirtualPrincipal', label: 'Dr. Nova Voice AI', icon: Sparkles },
    { key: 'showScanAnimation', label: 'Biometric scan intro', icon: ShieldCheck },
    { key: 'showLeaderboard', label: 'Rankings board', icon: ShieldCheck },
    { key: 'showGallery', label: 'Gallery module', icon: ImageIcon },
    { key: 'showHomeSlider', label: 'Cinematic Home Slider', icon: LayoutGrid },
    { key: 'showCampusVisit', label: 'Campus Tour CTA', icon: MapPin },
    { key: 'showSpotlights', label: 'Excellence Spotlights', icon: Star },
    { key: 'showCirculars', label: 'Circulars Wing', icon: FileText },
    { key: 'showDownloads', label: 'Download Center', icon: MapPin },
    { key: 'showFaculty', label: 'Faculty Matrix', icon: Users },
    { key: 'showFAQs', label: 'Institutional FAQ', icon: HelpCircle }
  ];

  return (
    <div className="p-16 max-w-7xl mx-auto space-y-16 pb-40">
      <header className="flex justify-between items-center bg-[#0a0f1d] p-10 rounded-[3rem] border border-white/5">
        <div>
          <h2 className="text-5xl font-display font-bold text-white uppercase tracking-tighter">System <span className="text-brand-red">Nexus</span></h2>
          <p className="text-slate-500 text-xs font-black uppercase tracking-widest mt-2">Manage Module Matrix & Global Directives</p>
        </div>
        <Button onClick={handleSave} variant="primary" className="py-4 px-10 rounded-2xl text-[10px] uppercase font-black">
          <Save size={18} className="mr-2"/> Synchronize Nexus
        </Button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
         <div className="lg:col-span-7">
            <section className="bg-[#0a0f1d] p-12 rounded-[4rem] border border-white/5 shadow-2xl h-full">
               <div className="flex items-center gap-4 mb-12">
                  <Megaphone className="text-brand-red" size={24} />
                  <h3 className="text-2xl font-display font-bold text-white uppercase tracking-widest">Notice Board Command</h3>
               </div>
               <div className="space-y-6 mb-12 max-h-[400px] overflow-y-auto custom-scrollbar pr-4">
                  {(localContent.notices || []).map(notice => (
                     <div key={notice.id} className={`flex items-center justify-between p-6 bg-navy-950 rounded-[2rem] border transition-all group ${notice.isUrgent ? 'border-brand-red/30 bg-brand-red/5' : 'border-white/5'}`}>
                        <div className="flex gap-4 items-center">
                           <div className={`w-3 h-3 rounded-full ${notice.isUrgent ? 'bg-brand-red animate-pulse' : 'bg-slate-700'}`}></div>
                           <div>
                              <h4 className={`text-sm font-bold uppercase ${notice.isUrgent ? 'text-white' : 'text-slate-300'}`}>{notice.title}</h4>
                              <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest">{notice.date}</p>
                           </div>
                        </div>
                        <button onClick={() => removeNotice(notice.id)} className="p-3 bg-white/5 rounded-xl text-red-500 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white"><Trash2 size={16}/></button>
                     </div>
                  ))}
               </div>
               <div className="p-10 bg-navy-950 rounded-[3rem] border border-white/5 border-dashed space-y-6">
                  <div className="flex gap-4">
                     <input placeholder="Notice Heading..." className="flex-1 bg-[#0a0f1d] border border-white/10 rounded-xl p-4 text-xs text-white" value={newNotice.title} onChange={e => setNewNotice({...newNotice, title: e.target.value})} />
                     <input placeholder="Date" className="w-32 bg-[#0a0f1d] border border-white/10 rounded-xl p-4 text-xs text-white" value={newNotice.date} onChange={e => setNewNotice({...newNotice, date: e.target.value})} />
                  </div>
                  <button onClick={() => setNewNotice({...newNotice, isUrgent: !newNotice.isUrgent})} className={`flex items-center gap-3 px-6 py-3 rounded-xl border text-[10px] uppercase font-black tracking-widest transition-all ${newNotice.isUrgent ? 'bg-brand-red border-brand-red text-white' : 'bg-white/5 border-white/10 text-slate-500'}`}>
                     {newNotice.isUrgent ? 'Priority Level: Urgent' : 'Priority Level: Standard'}
                  </button>
                  <Button onClick={addNotice} variant="primary" fullWidth className="py-4 rounded-2xl uppercase font-black text-[10px]"><Plus size={16}/> Launch Alert</Button>
               </div>
            </section>
         </div>

         <div className="lg:col-span-5">
            <section className="bg-[#0a0f1d] p-10 rounded-[3.5rem] border border-white/5 shadow-2xl h-full">
               <h3 className="text-xl font-display font-bold text-white uppercase tracking-widest mb-10 flex items-center gap-4"><ShieldCheck className="text-brand-red" /> Activation Matrix</h3>
               <div className="grid grid-cols-1 gap-4 max-h-[700px] overflow-y-auto custom-scrollbar pr-2">
                  {toggles.map(toggle => {
                    const isEnabled = localContent[toggle.key as keyof SiteContent] === true;
                    return (
                      <button 
                        key={toggle.key} 
                        onClick={() => setLocalContent({...localContent, [toggle.key]: !isEnabled})}
                        className={`w-full flex items-center justify-between p-6 rounded-2xl border transition-all duration-500 ${isEnabled ? 'bg-brand-red/10 border-brand-red/30 text-white' : 'bg-navy-950 border-white/5 text-slate-600'}`}
                      >
                         <div className="flex items-center gap-4">
                            <toggle.icon size={18} className={isEnabled ? 'text-brand-red' : 'text-slate-700'} />
                            <span className="text-[9px] font-black uppercase tracking-[0.2em]">{toggle.label}</span>
                         </div>
                         <div className={`w-10 h-5 rounded-full relative transition-colors ${isEnabled ? 'bg-brand-red' : 'bg-slate-800'}`}>
                            <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${isEnabled ? 'left-6' : 'left-1'}`}></div>
                         </div>
                      </button>
                    );
                  })}
               </div>
            </section>
         </div>
      </div>
    </div>
  );
};

export default AdminSystemSettings;
