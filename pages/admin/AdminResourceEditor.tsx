
import React, { useState, useEffect } from 'react';
import { useSite, SiteContent, DownloadItem, FAQItem, Circular } from '../../contexts/SiteContext';
import { Save, FileText, Plus, Trash2, HelpCircle, Download, BookOpen } from 'lucide-react';
import Button from '../../components/Button';

const AdminResourceEditor: React.FC = () => {
  const { content, updateContent } = useSite();
  const [localContent, setLocalContent] = useState<SiteContent>(content);
  
  const [newDownload, setNewDownload] = useState({ title: '', category: 'Admission', fileUrl: '' });
  const [newFaq, setNewFaq] = useState({ question: '', answer: '' });
  const [newCircular, setNewCircular] = useState<Partial<Circular>>({ title: '', date: '', category: 'General' });

  useEffect(() => {
    setLocalContent(content);
  }, [content]);

  const handleSave = async () => {
    await updateContent({ 
      downloads: localContent.downloads, 
      faqs: localContent.faqs,
      circulars: localContent.circulars
    });
    alert("Resource Center Synchronized.");
  };

  return (
    <div className="p-16 max-w-7xl mx-auto space-y-16">
      <header className="flex justify-between items-center bg-[#0a0f1d] p-10 rounded-[3rem] border border-white/5">
        <div>
          <h2 className="text-5xl font-display font-bold text-white uppercase tracking-tighter">Resource <span className="text-brand-red">Center</span></h2>
          <p className="text-slate-500 text-xs font-black uppercase tracking-widest mt-2">Manage Circulars, Forms & FAQ Helpdesk</p>
        </div>
        <Button onClick={handleSave} variant="primary" className="py-4 px-10 rounded-2xl text-[10px] uppercase font-black">
          <Save size={18} className="mr-2"/> Sync Repositories
        </Button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
         {/* Downloads Section */}
         <div className="lg:col-span-6 space-y-8">
            <section className="bg-[#0a0f1d] p-12 rounded-[4rem] border border-white/5 shadow-2xl">
               <h3 className="text-xl font-display font-bold text-white uppercase tracking-widest mb-10 flex items-center gap-4"><Download className="text-brand-red" /> Downloadable Forms</h3>
               <div className="space-y-4 mb-10">
                  {(localContent.downloads || []).map(d => (
                     <div key={d.id} className="flex items-center justify-between p-5 bg-navy-950 rounded-2xl border border-white/5">
                        <div className="flex gap-4 items-center">
                           <FileText size={16} className="text-brand-red" />
                           <span className="text-xs font-bold text-white">{d.title}</span>
                        </div>
                        <button onClick={() => setLocalContent({...localContent, downloads: localContent.downloads.filter(x=>x.id!==d.id)})} className="text-red-500 hover:scale-110 transition-transform"><Trash2 size={14}/></button>
                     </div>
                  ))}
               </div>
               <div className="space-y-4 p-8 bg-navy-950/50 border border-white/5 border-dashed rounded-[2rem]">
                  <input placeholder="Form Title" className="w-full bg-[#0a0f1d] border border-white/10 rounded-xl p-4 text-xs text-white" value={newDownload.title} onChange={e => setNewDownload({...newDownload, title: e.target.value})} />
                  <input placeholder="Public URL (https://...)" className="w-full bg-[#0a0f1d] border border-white/10 rounded-xl p-4 text-xs text-white" value={newDownload.fileUrl} onChange={e => setNewDownload({...newDownload, fileUrl: e.target.value})} />
                  <Button onClick={() => {setLocalContent({...localContent, downloads: [...(localContent.downloads || []), {...newDownload, id: `d${Date.now()}`} as DownloadItem]}); setNewDownload({title:'', category:'Admission', fileUrl:''})}} variant="primary" fullWidth className="py-4 text-[10px] font-black uppercase">Publish Download</Button>
               </div>
            </section>

            <section className="bg-[#0a0f1d] p-12 rounded-[4rem] border border-white/5 shadow-2xl">
               <h3 className="text-xl font-display font-bold text-white uppercase tracking-widest mb-10 flex items-center gap-4"><BookOpen className="text-brand-red" /> Digital Circulars</h3>
               <div className="space-y-4 mb-10">
                  {(localContent.circulars || []).map(c => (
                     <div key={c.id} className="flex items-center justify-between p-5 bg-navy-950 rounded-2xl border border-white/5">
                        <div className="flex gap-4 items-center">
                           <div className="px-2 py-1 bg-brand-red/10 text-brand-red text-[7px] font-black uppercase rounded-md">{c.category}</div>
                           <span className="text-xs font-bold text-white">{c.title}</span>
                        </div>
                        <button onClick={() => setLocalContent({...localContent, circulars: localContent.circulars.filter(x=>x.id!==c.id)})} className="text-red-500"><Trash2 size={14}/></button>
                     </div>
                  ))}
               </div>
               <div className="space-y-4 p-8 bg-navy-950/50 border border-white/5 border-dashed rounded-[2rem]">
                  <input placeholder="Circular Title" className="w-full bg-[#0a0f1d] border border-white/10 rounded-xl p-4 text-xs text-white" value={newCircular.title} onChange={e => setNewCircular({...newCircular, title: e.target.value})} />
                  <div className="grid grid-cols-2 gap-4">
                     <input placeholder="Date (e.g. Dec 20)" className="bg-[#0a0f1d] border border-white/10 rounded-xl p-4 text-xs text-white" value={newCircular.date} onChange={e => setNewCircular({...newCircular, date: e.target.value})} />
                     <select className="bg-[#0a0f1d] border border-white/10 rounded-xl p-4 text-xs text-white outline-none" value={newCircular.category} onChange={e => setNewCircular({...newCircular, category: e.target.value as any})}>
                        <option>Exam</option>
                        <option>Holiday</option>
                        <option>General</option>
                     </select>
                  </div>
                  <Button onClick={() => {setLocalContent({...localContent, circulars: [...(localContent.circulars || []), {...newCircular, id: `c${Date.now()}`} as Circular]}); setNewCircular({title:'', date:'', category:'General'})}} variant="primary" fullWidth className="py-4 text-[10px] font-black uppercase">Publish Circular</Button>
               </div>
            </section>
         </div>

         {/* FAQ Section */}
         <div className="lg:col-span-6">
            <section className="bg-[#0a0f1d] p-12 rounded-[4rem] border border-white/5 shadow-2xl h-full">
               <h3 className="text-xl font-display font-bold text-white uppercase tracking-widest mb-10 flex items-center gap-4"><HelpCircle className="text-brand-red" /> Institutional FAQ</h3>
               <div className="space-y-6 mb-12 max-h-[500px] overflow-y-auto custom-scrollbar pr-4">
                  {(localContent.faqs || []).map(f => (
                     <div key={f.id} className="p-8 bg-navy-950 rounded-[2rem] border border-white/5 space-y-4 relative group">
                        <h4 className="text-brand-red font-bold text-sm leading-tight uppercase pr-10">{f.question}</h4>
                        <p className="text-slate-500 text-xs leading-relaxed">{f.answer}</p>
                        <button onClick={() => setLocalContent({...localContent, faqs: localContent.faqs.filter(x=>x.id!==f.id)})} className="absolute top-8 right-8 text-red-500 opacity-0 group-hover:opacity-100 transition-all"><Trash2 size={16}/></button>
                     </div>
                  ))}
               </div>
               <div className="space-y-4 p-8 bg-navy-950/50 border border-white/5 border-dashed rounded-[3rem]">
                  <input placeholder="Institutional Question..." className="w-full bg-[#0a0f1d] border border-white/10 rounded-xl p-4 text-xs text-white" value={newFaq.question} onChange={e => setNewFaq({...newFaq, question: e.target.value})} />
                  <textarea placeholder="Authoritative Answer..." className="w-full bg-[#0a0f1d] border border-white/10 rounded-xl p-4 text-xs text-white h-32" value={newFaq.answer} onChange={e => setNewFaq({...newFaq, answer: e.target.value})} />
                  <Button onClick={() => {setLocalContent({...localContent, faqs: [...(localContent.faqs || []), {...newFaq, id: `fq${Date.now()}`} as FAQItem]}); setNewFaq({question:'', answer:''})}} variant="primary" fullWidth className="py-5 text-[10px] font-black uppercase">Publish FAQ Node</Button>
               </div>
            </section>
         </div>
      </div>
    </div>
  );
};

export default AdminResourceEditor;
