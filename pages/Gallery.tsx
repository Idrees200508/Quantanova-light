
import React, { useState } from 'react';
import { useSite } from '../contexts/SiteContext';
import { Filter, Calendar, FolderOpen, Image as ImageIcon, ChevronRight, FileText, LayoutGrid } from 'lucide-react';
import SEO from '../components/SEO';

const Gallery: React.FC = () => {
  const { content } = useSite();
  const [activeFolder, setActiveFolder] = useState('All Assets');
  
  const folders = ['All Assets', ...(content.galleryFolders || [])];
  const allImages = content.gallery || [];
  const filteredImages = activeFolder === 'All Assets' 
    ? allImages 
    : allImages.filter(img => img.folder === activeFolder);

  return (
    <div className="py-20 bg-white min-h-screen">
      <SEO title="Archive Explorer" description="Digital records of QuantaNova innovation, infrastructure, and milestones." />
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 pt-16">
        <div className="text-center mb-16">
           <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-slate-50 border border-slate-200 rounded-full mb-8 shadow-sm">
            <span className="w-2 h-2 bg-brand-red rounded-full animate-pulse"></span>
            <span className="text-brand-red font-display text-[10px] uppercase tracking-widest font-black">Institutional Archives</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-display font-bold text-brand-indigo mb-6 uppercase tracking-tighter">THE <span className="quantum-gradient-text">VAULT</span></h1>
          <p className="text-xl text-brand-indigo opacity-70 max-w-2xl mx-auto font-light leading-relaxed italic">Systematic documentation of campus evolution and innovation milestones.</p>
        </div>

        <div className="sticky top-20 z-40 bg-white/90 backdrop-blur-xl border-y border-slate-100 mb-12 overflow-x-auto scrollbar-hide">
          <div className="flex items-center justify-center gap-4 py-6 min-w-max">
            {folders.map((folder) => (
              <button
                key={folder}
                onClick={() => setActiveFolder(folder)}
                className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center gap-3 border shadow-sm ${
                  activeFolder === folder 
                    ? 'bg-brand-indigo text-white border-brand-indigo shadow-brand-indigo/20' 
                    : 'bg-white text-brand-indigo hover:text-brand-red border-slate-200'
                }`}
              >
                <FolderOpen size={14} />
                {folder}
              </button>
            ))}
          </div>
        </div>

        {filteredImages.length === 0 ? (
          <div className="text-center py-40 bg-slate-50 rounded-[4rem] border border-dashed border-slate-200">
             <LayoutGrid className="mx-auto text-slate-300 mb-6" size={80} />
             <p className="text-brand-indigo font-display uppercase tracking-widest text-sm font-bold opacity-40">Archive Segment Empty</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 animate-in fade-in duration-700">
            {filteredImages.map((img) => (
              <div key={img.id} className="group relative rounded-[2.5rem] overflow-hidden bg-slate-50 border border-slate-100 shadow-lg hover:border-brand-red/30 transition-all aspect-[4/5]">
                 <img src={img.url} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={img.title} />
                 <div className="absolute inset-0 bg-gradient-to-t from-brand-indigo/95 via-brand-indigo/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-10">
                    <div className="text-[10px] font-black uppercase text-brand-red tracking-widest mb-2 border-b border-brand-red/30 pb-2 w-fit">Folder / {img.folder}</div>
                    <div className="text-white font-display font-bold text-xl leading-tight uppercase tracking-tight">{img.title}</div>
                 </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
