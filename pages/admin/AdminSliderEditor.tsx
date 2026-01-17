
import React, { useState, useEffect } from 'react';
import { useSite, SiteContent, HomeSliderItem } from '../../contexts/SiteContext';
import { Save, ImageIcon, Plus, Trash2, LayoutGrid, Type, Camera } from 'lucide-react';
import Button from '../../components/Button';

const AdminSliderEditor: React.FC = () => {
  const { content, updateContent } = useSite();
  const [localContent, setLocalContent] = useState<SiteContent>(content);
  const [newSlide, setNewSlide] = useState({ url: '', caption: '', subCaption: '' });

  useEffect(() => {
    setLocalContent(content);
  }, [content]);

  const handleSave = async () => {
    await updateContent({ homeSliderImages: localContent.homeSliderImages });
    alert("Slider Matrix Synchronized.");
  };

  const addSlide = () => {
    if (newSlide.url && newSlide.caption) {
      const updated = [...(localContent.homeSliderImages || []), { ...newSlide, id: `hs${Date.now()}` } as HomeSliderItem];
      setLocalContent({ ...localContent, homeSliderImages: updated });
      setNewSlide({ url: '', caption: '', subCaption: '' });
    }
  };

  const removeSlide = (id: string) => {
    const updated = (localContent.homeSliderImages || []).filter(s => s.id !== id);
    setLocalContent({ ...localContent, homeSliderImages: updated });
  };

  return (
    <div className="p-16 max-w-7xl mx-auto space-y-16 pb-40">
      <header className="flex justify-between items-center bg-[#0a0f1d] p-10 rounded-[3rem] border border-white/5 shadow-2xl">
        <div>
          <h2 className="text-5xl font-display font-bold text-white uppercase tracking-tighter">Slider <span className="text-brand-red">Matrix</span></h2>
          <p className="text-slate-500 text-xs font-black uppercase tracking-widest mt-2">Manage Cinematic Homepage Assets</p>
        </div>
        <Button onClick={handleSave} variant="primary" className="py-4 px-10 rounded-2xl text-[10px] uppercase font-black">
          <Save size={18} className="mr-2"/> Sync Matrix
        </Button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
         {/* Current Slider List */}
         <section className="space-y-6">
            <h3 className="text-xl font-display font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-4"><LayoutGrid className="text-brand-red" /> Current Sequence</h3>
            {(localContent.homeSliderImages || []).map((slide, idx) => (
               <div key={slide.id} className="bg-[#0a0f1d] p-8 rounded-[2.5rem] border border-white/5 flex flex-col gap-6 group hover:border-brand-red/30 transition-all shadow-xl">
                  <div className="h-48 rounded-3xl overflow-hidden shrink-0 border border-white/10 relative">
                     <img src={slide.url} className="w-full h-full object-cover opacity-80" />
                     <div className="absolute top-4 left-4 bg-brand-red text-white text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest">Slide 0{idx + 1}</div>
                     <button onClick={() => removeSlide(slide.id)} className="absolute top-4 right-4 p-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all shadow-lg opacity-0 group-hover:opacity-100">
                        <Trash2 size={16} />
                     </button>
                  </div>
                  <div className="space-y-2">
                     <h4 className="text-lg font-bold text-white uppercase tracking-tight">{slide.caption}</h4>
                     <p className="text-slate-500 text-xs font-light italic">"{slide.subCaption}"</p>
                  </div>
               </div>
            ))}
         </section>

         {/* Add New Slide Form */}
         <section className="bg-[#0a0f1d] p-12 rounded-[3.5rem] border border-white/5 shadow-2xl h-fit sticky top-16">
            <h3 className="text-xl font-display font-bold text-white uppercase tracking-widest mb-10 flex items-center gap-4"><Plus className="text-brand-red" /> Ingest New Slide</h3>
            <div className="space-y-6">
               <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase text-slate-600 tracking-widest ml-4">Image Source URL</label>
                  <input placeholder="https://..." className="w-full bg-navy-950 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-brand-red transition-all" value={newSlide.url} onChange={e => setNewSlide({...newSlide, url: e.target.value})} />
               </div>
               <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase text-slate-600 tracking-widest ml-4">Primary Caption</label>
                  <input placeholder="e.g. World-Class Labs" className="w-full bg-navy-950 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-brand-red transition-all" value={newSlide.caption} onChange={e => setNewSlide({...newSlide, caption: e.target.value})} />
               </div>
               <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase text-slate-600 tracking-widest ml-4">Sub-Caption (Instructional/Motto)</label>
                  <textarea placeholder="e.g. Architected for the future innovators of the Quantum Age." className="w-full bg-navy-950 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-brand-red transition-all h-24" value={newSlide.subCaption} onChange={e => setNewSlide({...newSlide, subCaption: e.target.value})} />
               </div>
               <Button onClick={addSlide} variant="primary" fullWidth className="py-5 rounded-2xl uppercase font-black text-[11px] tracking-[0.3em]">Deploy to Slider</Button>
            </div>
         </section>
      </div>
    </div>
  );
};

export default AdminSliderEditor;
