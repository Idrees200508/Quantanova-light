
import React, { useState, useEffect } from 'react';
import { useSite, SiteContent, FacultyMember } from '../../contexts/SiteContext';
import { Save, Users, Plus, Trash2, Award, Briefcase } from 'lucide-react';
import Button from '../../components/Button';

const AdminFacultyEditor: React.FC = () => {
  const { content, updateContent } = useSite();
  const [localContent, setLocalContent] = useState<SiteContent>(content);
  const [newFaculty, setNewFaculty] = useState({ name: '', designation: '', qualification: '', image: '' });

  useEffect(() => {
    setLocalContent(content);
  }, [content]);

  const handleSave = async () => {
    await updateContent({ faculty: localContent.faculty });
    alert("Faculty Directory Synchronized.");
  };

  const addFaculty = () => {
    if (newFaculty.name && newFaculty.designation) {
      const updated = [...(localContent.faculty || []), { ...newFaculty, id: `f${Date.now()}` } as FacultyMember];
      setLocalContent({ ...localContent, faculty: updated });
      setNewFaculty({ name: '', designation: '', qualification: '', image: '' });
    }
  };

  const removeFaculty = (id: string) => {
    const updated = (localContent.faculty || []).filter(f => f.id !== id);
    setLocalContent({ ...localContent, faculty: updated });
  };

  return (
    <div className="p-16 max-w-7xl mx-auto space-y-16">
      <header className="flex justify-between items-center bg-[#0a0f1d] p-10 rounded-[3rem] border border-white/5 shadow-2xl">
        <div>
          <h2 className="text-5xl font-display font-bold text-white uppercase tracking-tighter">Faculty <span className="text-brand-red">Matrix</span></h2>
          <p className="text-slate-500 text-xs font-black uppercase tracking-widest mt-2">Manage Subject Experts & Mentors</p>
        </div>
        <Button onClick={handleSave} variant="primary" className="py-4 px-10 rounded-2xl text-[10px] uppercase font-black">
          <Save size={18} className="mr-2"/> Sync Faculty Hub
        </Button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
         <section className="space-y-6">
            {(localContent.faculty || []).map(f => (
               <div key={f.id} className="bg-[#0a0f1d] p-8 rounded-[2.5rem] border border-white/5 flex items-center gap-8 group hover:border-brand-red/30 transition-all shadow-xl">
                  <div className="w-24 h-24 rounded-full overflow-hidden shrink-0 border-2 border-white/10 grayscale group-hover:grayscale-0 transition-all">
                     <img src={f.image} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                     <h4 className="text-xl font-bold text-white uppercase tracking-tight">{f.name}</h4>
                     <p className="text-brand-red text-[10px] font-black uppercase tracking-widest mb-1">{f.designation}</p>
                     <p className="text-slate-500 text-[9px] uppercase tracking-widest">{f.qualification}</p>
                  </div>
                  <button onClick={() => removeFaculty(f.id)} className="p-3 bg-white/5 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all">
                     <Trash2 size={18} />
                  </button>
               </div>
            ))}
         </section>

         <section className="bg-[#0a0f1d] p-12 rounded-[3.5rem] border border-white/5 shadow-2xl h-fit sticky top-16">
            <h3 className="text-xl font-display font-bold text-white uppercase tracking-widest mb-10 flex items-center gap-4"><Briefcase className="text-brand-red" /> New Mentor</h3>
            <div className="space-y-6">
               <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase text-slate-600 tracking-widest ml-4">Faculty Name</label>
                  <input placeholder="Dr. Jane Doe" className="w-full bg-navy-950 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-brand-red transition-all" value={newFaculty.name} onChange={e => setNewFaculty({...newFaculty, name: e.target.value})} />
               </div>
               <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase text-slate-600 tracking-widest ml-4">Designation</label>
                  <input placeholder="Head of Robotics" className="w-full bg-navy-950 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-brand-red transition-all" value={newFaculty.designation} onChange={e => setNewFaculty({...newFaculty, designation: e.target.value})} />
               </div>
               <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase text-slate-600 tracking-widest ml-4">Qualification</label>
                  <input placeholder="M.Sc, B.Ed" className="w-full bg-navy-950 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-brand-red transition-all" value={newFaculty.qualification} onChange={e => setNewFaculty({...newFaculty, qualification: e.target.value})} />
               </div>
               <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase text-slate-600 tracking-widest ml-4">Profile Image URL</label>
                  <input placeholder="https://..." className="w-full bg-navy-950 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-brand-red transition-all" value={newFaculty.image} onChange={e => setNewFaculty({...newFaculty, image: e.target.value})} />
               </div>
               <Button onClick={addFaculty} variant="primary" fullWidth className="py-5 rounded-2xl uppercase font-black text-[11px] tracking-[0.3em]">Enroll Mentor</Button>
            </div>
         </section>
      </div>
    </div>
  );
};

export default AdminFacultyEditor;
