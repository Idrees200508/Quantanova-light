
import React, { useState, useEffect } from 'react';
import { useSite, SiteContent, ExcellenceSpotlight } from '../../contexts/SiteContext';
import { Save, Star, Plus, Trash2, User, Award } from 'lucide-react';
import Button from '../../components/Button';

const AdminSpotlightEditor: React.FC = () => {
  const { content, updateContent } = useSite();
  const [localContent, setLocalContent] = useState<SiteContent>(content);
  const [newSpotlight, setNewSpotlight] = useState({ name: '', award: '', category: '', image: '' });

  useEffect(() => {
    setLocalContent(content);
  }, [content]);

  const handleSave = async () => {
    await updateContent({ spotlights: localContent.spotlights });
    alert("Excellence Matrix Synchronized.");
  };

  const addSpotlight = () => {
    if (newSpotlight.name && newSpotlight.award) {
      const updated = [...(localContent.spotlights || []), { ...newSpotlight, id: `s${Date.now()}` } as ExcellenceSpotlight];
      setLocalContent({ ...localContent, spotlights: updated });
      setNewSpotlight({ name: '', award: '', category: '', image: '' });
    }
  };

  const removeSpotlight = (id: string) => {
    const updated = (localContent.spotlights || []).filter(s => s.id !== id);
    setLocalContent({ ...localContent, spotlights: updated });
  };

  return (
    <div className="p-16 max-w-7xl mx-auto space-y-16">
      <header className="flex justify-between items-center bg-[#0a0f1d] p-10 rounded-[3rem] border border-white/5 shadow-2xl">
        <div>
          <h2 className="text-5xl font-display font-bold text-white uppercase tracking-tighter">Excellence <span className="text-brand-red">Spotlight</span></h2>
          <p className="text-slate-500 text-xs font-black uppercase tracking-widest mt-2">Foundational Scholars & Rising Star Management</p>
        </div>
        <Button onClick={handleSave} variant="primary" className="py-4 px-10 rounded-2xl text-[10px] uppercase font-black">
          <Save size={18} className="mr-2"/> Synchronize Hub
        </Button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
         {/* List */}
         <section className="space-y-6">
            {(localContent.spotlights || []).map(item => (
               <div key={item.id} className="bg-[#0a0f1d] p-8 rounded-[2.5rem] border border-white/5 flex items-center gap-8 group hover:border-brand-red/30 transition-all shadow-xl">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 border-2 border-brand-red/20">
                     <img src={item.image} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                     <h4 className="text-xl font-bold text-white uppercase tracking-tight">{item.name}</h4>
                     <p className="text-brand-red text-[10px] font-black uppercase tracking-widest mb-1">{item.award}</p>
                     <p className="text-slate-500 text-[9px] uppercase tracking-widest">{item.category}</p>
                  </div>
                  <button onClick={() => removeSpotlight(item.id)} className="p-3 bg-white/5 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all">
                     <Trash2 size={18} />
                  </button>
               </div>
            ))}
         </section>

         {/* Form */}
         <section className="bg-[#0a0f1d] p-12 rounded-[3.5rem] border border-white/5 shadow-2xl h-fit sticky top-16">
            <h3 className="text-xl font-display font-bold text-white uppercase tracking-widest mb-10 flex items-center gap-4"><Award className="text-brand-red" /> Feature Foundational Scholar</h3>
            <div className="space-y-6">
               <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase text-slate-600 tracking-widest ml-4">Student Name</label>
                  <input className="w-full bg-navy-950 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-brand-red transition-all" value={newSpotlight.name} onChange={e => setNewSpotlight({...newSpotlight, name: e.target.value})} />
               </div>
               <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase text-slate-600 tracking-widest ml-4">Award Title</label>
                  <input placeholder="e.g. 100% Foundational Scholarship" className="w-full bg-navy-950 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-brand-red transition-all" value={newSpotlight.award} onChange={e => setNewSpotlight({...newSpotlight, award: e.target.value})} />
               </div>
               <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                     <label className="text-[9px] font-black uppercase text-slate-600 tracking-widest ml-4">Category</label>
                     <input placeholder="e.g. Academic Merit" className="w-full bg-navy-950 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-brand-red transition-all" value={newSpotlight.category} onChange={e => setNewSpotlight({...newSpotlight, category: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[9px] font-black uppercase text-slate-600 tracking-widest ml-4">Visual URL</label>
                     <input placeholder="https://..." className="w-full bg-navy-950 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-brand-red transition-all" value={newSpotlight.image} onChange={e => setNewSpotlight({...newSpotlight, image: e.target.value})} />
                  </div>
               </div>
               <Button onClick={addSpotlight} variant="primary" fullWidth className="py-5 rounded-2xl uppercase font-black text-[11px] tracking-[0.3em]">Project into Hub</Button>
            </div>
         </section>
      </div>
    </div>
  );
};

export default AdminSpotlightEditor;
