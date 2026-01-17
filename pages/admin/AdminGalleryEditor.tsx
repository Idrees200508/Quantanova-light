
import React, { useState, useEffect } from 'react';
import { useSite, SiteContent, GalleryImage } from '../../contexts/SiteContext';
import { 
  Plus, ImageIcon, FolderPlus, Layers, X, Trash2, 
  Save, Globe, Database, Activity
} from 'lucide-react';
import Button from '../../components/Button';

const AdminGalleryEditor: React.FC = () => {
  const { content, updateContent } = useSite();
  const [localContent, setLocalContent] = useState<SiteContent>(content);
  const [bulkUrls, setBulkUrls] = useState('');
  const [targetFolder, setTargetFolder] = useState((content.galleryFolders || [])[0] || '');
  const [newFolderName, setNewFolderName] = useState('');

  useEffect(() => {
    setLocalContent(content);
  }, [content]);

  const addFolder = () => {
    if (newFolderName.trim()) {
      const updated = { ...localContent, galleryFolders: [...(localContent.galleryFolders || []), newFolderName.trim()] };
      setLocalContent(updated);
      setNewFolderName('');
    }
  };

  const bulkAddGallery = () => {
    const urls = bulkUrls.split('\n').map(u => u.trim()).filter(u => u !== '');
    const newItems: GalleryImage[] = urls.map(url => ({
      id: `g${Date.now()}-${Math.random()}`,
      url,
      title: 'Institutional Asset',
      folder: targetFolder
    }));
    const updated = { ...localContent, gallery: [...(localContent.gallery || []), ...newItems] };
    setLocalContent(updated);
    setBulkUrls('');
    alert(`Injected ${newItems.length} assets.`);
  };

  const handleSave = async () => {
    await updateContent(localContent);
    alert("Media Matrix Synchronized.");
  };

  return (
    <div className="p-12 max-w-6xl mx-auto space-y-12 pb-32">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-4xl font-display font-bold text-white uppercase tracking-tighter">Media <span className="text-brand-red">Lab</span></h2>
          <p className="text-slate-500 text-xs font-black uppercase tracking-widest mt-2">Manage Visual Archives & Folders</p>
        </div>
        <Button onClick={handleSave} variant="primary" className="py-2.5 px-8 rounded-xl text-[10px] uppercase font-black">
          <Save size={16} className="mr-2"/> Sync Archives
        </Button>
      </header>

      {/* Folders Management */}
      <section className="bg-[#0a0f1d] p-10 rounded-[3rem] border border-white/5 shadow-xl">
        <h3 className="text-xl font-display font-bold text-white uppercase tracking-widest mb-10 flex items-center gap-4"><FolderPlus className="text-brand-red" /> Organizational Nodes</h3>
        <div className="flex flex-wrap gap-4 mb-10">
          {(localContent.galleryFolders || []).map(folder => (
            <div key={folder} className="bg-navy-950 px-6 py-3 rounded-2xl border border-white/5 flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-300">
               {folder}
               <button onClick={() => setLocalContent({...localContent, galleryFolders: (localContent.galleryFolders || []).filter(f=>f!==folder)})} className="text-red-500 hover:scale-125 transition-transform"><X size={14}/></button>
            </div>
          ))}
        </div>
        <div className="flex gap-4">
           <input className="bg-[#020617] border border-white/5 rounded-2xl px-6 py-4 flex-1 text-sm text-white focus:border-brand-red outline-none" placeholder="New Folder Name (e.g. Campus Labs)..." value={newFolderName} onChange={e => setNewFolderName(e.target.value)} />
           <Button onClick={addFolder} variant="primary" className="px-10 rounded-2xl text-[10px] uppercase font-black">Create Node</Button>
        </div>
      </section>

      {/* Bulk Matrix */}
      <section className="bg-[#0a0f1d] p-10 rounded-[3rem] border border-white/5 shadow-xl">
        <h3 className="text-xl font-display font-bold text-white uppercase tracking-widest mb-10 flex items-center gap-4"><Layers className="text-brand-red" /> Neural Ingestion Matrix</h3>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="space-y-2">
                <label className="text-[9px] font-black uppercase text-slate-600 tracking-widest ml-4">Target Node Folder</label>
                <select className="w-full bg-[#020617] border border-white/5 rounded-2xl px-6 py-4 text-white focus:border-brand-red outline-none" value={targetFolder} onChange={e => setTargetFolder(e.target.value)}>
                   {(localContent.galleryFolders || []).map(f => <option key={f} value={f}>{f}</option>)}
                </select>
             </div>
             <div className="bg-navy-950 p-6 rounded-[2rem] border border-white/5 flex items-center gap-4">
                <Activity className="text-brand-red" size={24} />
                <div className="text-[10px] text-slate-500 font-medium">Use standardized URLs: <span className="text-white italic">quantanovaschool.org/resources/images/photoX.png</span></div>
             </div>
          </div>
          <div className="space-y-2">
             <label className="text-[9px] font-black uppercase text-slate-600 tracking-widest ml-4">Stream Data (One URL per Line)</label>
             <textarea className="w-full bg-[#020617] border border-white/5 rounded-2xl px-6 py-4 text-white h-48 text-xs font-mono focus:border-brand-red outline-none" placeholder="https://quantanovaschool.org/resources/images/photo1.png&#10;https://quantanovaschool.org/resources/images/photo2.png" value={bulkUrls} onChange={e => setBulkUrls(e.target.value)} />
          </div>
          <Button onClick={bulkAddGallery} variant="primary" fullWidth className="py-6 rounded-3xl font-black uppercase tracking-[0.4em] text-[11px]">Inject Stream</Button>
        </div>
      </section>

      {/* Grid Overview */}
      <section className="bg-[#0a0f1d] p-10 rounded-[3rem] border border-white/5 shadow-xl">
        <h3 className="text-xl font-display font-bold text-white uppercase tracking-widest mb-10">Archive Overview ({(localContent.gallery || []).length} Assets)</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
           {(localContent.gallery || []).map(img => (
              <div key={img.id} className="aspect-square bg-navy-950 rounded-2xl border border-white/5 relative group overflow-hidden shadow-lg">
                 <img src={img.url} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                 <button onClick={() => setLocalContent({...localContent, gallery: (localContent.gallery || []).filter(i=>i.id!==img.id)})} className="absolute top-2 right-2 p-2 bg-red-500/80 hover:bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100"><Trash2 size={12}/></button>
                 <div className="absolute bottom-0 left-0 w-full p-2 bg-black/60 backdrop-blur-sm text-[6px] text-white rounded uppercase font-black truncate">{img.folder}</div>
              </div>
           ))}
        </div>
      </section>
    </div>
  );
};

export default AdminGalleryEditor;
