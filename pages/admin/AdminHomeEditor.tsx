
import React, { useState, useEffect } from 'react';
import { useSite, SiteContent, SchoolEvent } from '../../contexts/SiteContext';
import { Save, Home, Layout, Type, Calendar, Plus, Trash2, Clock, MapPin, Activity } from 'lucide-react';
import Button from '../../components/Button';

const AdminHomeEditor: React.FC = () => {
  const { content, updateContent } = useSite();
  const [localContent, setLocalContent] = useState<SiteContent>(content);
  const [newEvent, setNewEvent] = useState<Partial<SchoolEvent>>({ title: '', date: '', month: '', category: 'Academics', description: '' });

  useEffect(() => {
    setLocalContent(content);
  }, [content]);

  const handleSave = async () => {
    await updateContent(localContent);
    alert("Home UI Parameters Synced.");
  };

  const addEvent = () => {
    if (newEvent.title && newEvent.date) {
      const updated = { ...localContent, upcomingEvents: [...(localContent.upcomingEvents || []), { ...newEvent, id: `e${Date.now()}` } as SchoolEvent] };
      setLocalContent(updated);
      setNewEvent({ title: '', date: '', month: '', category: 'Academics', description: '' });
    }
  };

  const removeEvent = (id: string) => {
    setLocalContent({ ...localContent, upcomingEvents: (localContent.upcomingEvents || []).filter(e => e.id !== id) });
  };

  return (
    <div className="p-12 max-w-7xl mx-auto space-y-12 pb-40">
      <header className="flex justify-between items-center bg-[#0a0f1d] p-8 rounded-[2rem] border border-white/5 shadow-2xl">
        <div>
          <h2 className="text-4xl font-display font-bold text-white uppercase tracking-tighter">Portal <span className="text-brand-red">UI Editor</span></h2>
          <p className="text-slate-500 text-xs font-black uppercase tracking-widest mt-2">Manage Hero, Stats & Institutional Calendar</p>
        </div>
        <Button onClick={handleSave} variant="primary" className="py-3 px-10 rounded-2xl text-[10px] uppercase font-black shadow-xl">
          <Save size={16} className="mr-2"/> Sync UI Node
        </Button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Hero & Stats */}
        <div className="lg:col-span-5 space-y-10">
           <section className="bg-[#0a0f1d] p-10 rounded-[3rem] border border-white/5 space-y-8 shadow-xl">
              <div className="flex items-center gap-4 mb-4">
                 <Type className="text-brand-red" size={24} />
                 <h3 className="text-xl font-display font-bold text-white uppercase tracking-widest">Hero Typography</h3>
              </div>
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="space-y-2">
                   <label className="text-[9px] font-black uppercase text-slate-600 tracking-widest ml-4">Headline Level 0{n}</label>
                   <input 
                     className="w-full bg-navy-950 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-brand-red transition-colors outline-none"
                     value={(localContent.heroText as any)?.[`line${n}`] || ''}
                     onChange={e => {
                       const newHero = { ...localContent.heroText, [`line${n}`]: e.target.value };
                       setLocalContent({ ...localContent, heroText: newHero as any });
                     }}
                   />
                </div>
              ))}
           </section>

           <section className="bg-[#0a0f1d] p-10 rounded-[3rem] border border-white/5 space-y-8 shadow-xl">
              <div className="flex items-center gap-4 mb-4">
                 <Activity className="text-brand-red" size={24} />
                 <h3 className="text-xl font-display font-bold text-white uppercase tracking-widest">Vital Stats</h3>
              </div>
              {(localContent.homeStats || []).map((stat, idx) => (
                <div key={stat.id} className="grid grid-cols-2 gap-4 p-6 bg-navy-950 rounded-2xl border border-white/5">
                   <input className="bg-transparent border border-white/5 rounded-xl p-3 text-brand-red font-bold" value={stat.value} onChange={e => {const n=[...localContent.homeStats]; n[idx].value=e.target.value; setLocalContent({...localContent, homeStats: n})}} />
                   <input className="bg-transparent border border-white/5 rounded-xl p-3 text-white" value={stat.label} onChange={e => {const n=[...localContent.homeStats]; n[idx].label=e.target.value; setLocalContent({...localContent, homeStats: n})}} />
                </div>
              ))}
           </section>
        </div>

        {/* Right Column: Institutional Calendar */}
        <div className="lg:col-span-7 space-y-10">
           <section className="bg-[#0a0f1d] p-12 rounded-[4rem] border border-white/5 shadow-2xl h-full">
              <div className="flex items-center justify-between mb-12">
                 <div className="flex items-center gap-4">
                    <Calendar className="text-brand-red" size={24} />
                    <h3 className="text-2xl font-display font-bold text-white uppercase tracking-widest">Institutional Calendar</h3>
                 </div>
              </div>

              <div className="space-y-6 mb-12">
                 {(localContent.upcomingEvents || []).map(event => (
                    <div key={event.id} className="flex items-center justify-between p-6 bg-navy-950 rounded-[2rem] border border-white/5 group hover:border-brand-red/20 transition-all">
                       <div className="flex gap-6 items-center">
                          <div className="w-14 h-14 bg-[#0a0f1d] border border-white/5 rounded-2xl flex flex-col items-center justify-center font-display">
                             <span className="text-brand-red text-lg font-bold">{event.date}</span>
                             <span className="text-[7px] text-slate-500 font-black">{event.month}</span>
                          </div>
                          <div>
                             <h4 className="text-white font-bold uppercase text-sm">{event.title}</h4>
                             <p className="text-[10px] text-slate-500 uppercase tracking-widest">{event.category}</p>
                          </div>
                       </div>
                       <button onClick={() => removeEvent(event.id)} className="p-3 bg-white/5 rounded-xl text-red-500 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white"><Trash2 size={16}/></button>
                    </div>
                 ))}
              </div>

              <div className="p-10 bg-navy-950 rounded-[3rem] border border-white/5 border-dashed space-y-6">
                 <h4 className="text-slate-500 text-[10px] font-black uppercase tracking-widest ml-2">Append New Event</h4>
                 <div className="grid grid-cols-3 gap-4">
                    <input placeholder="Day (15)" className="bg-[#0a0f1d] border border-white/10 rounded-xl p-4 text-xs text-white" value={newEvent.date} onChange={e => setNewEvent({...newEvent, date: e.target.value})} />
                    <input placeholder="Month (NOV)" className="bg-[#0a0f1d] border border-white/10 rounded-xl p-4 text-xs text-white" value={newEvent.month} onChange={e => setNewEvent({...newEvent, month: e.target.value})} />
                    <select className="bg-[#0a0f1d] border border-white/10 rounded-xl p-4 text-xs text-white outline-none" value={newEvent.category} onChange={e => setNewEvent({...newEvent, category: e.target.value})}>
                       <option>Academics</option>
                       <option>Innovation</option>
                       <option>Sports</option>
                       <option>Social</option>
                    </select>
                 </div>
                 <input placeholder="Event Title (e.g. Science Fair)" className="w-full bg-[#0a0f1d] border border-white/10 rounded-xl p-4 text-xs text-white" value={newEvent.title} onChange={e => setNewEvent({...newEvent, title: e.target.value})} />
                 <textarea placeholder="Brief Description..." className="w-full bg-[#0a0f1d] border border-white/10 rounded-xl p-4 text-xs text-white h-24" value={newEvent.description} onChange={e => setNewEvent({...newEvent, description: e.target.value})} />
                 <Button onClick={addEvent} variant="primary" fullWidth className="py-4 rounded-2xl uppercase font-black text-[10px]"><Plus size={16}/> Append to Calendar</Button>
              </div>
           </section>
        </div>
      </div>
    </div>
  );
};

export default AdminHomeEditor;
