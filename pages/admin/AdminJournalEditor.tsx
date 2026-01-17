
import React, { useState, useEffect, useRef } from 'react';
import { useSite, SiteContent } from '../../contexts/SiteContext';
import { BlogPost } from '../../types';
import { GoogleGenAI } from "@google/genai";
import { 
  Plus, PenTool, Trash2, X, Save, Tag, Loader2, Wand2,
  Bold, Italic, Heading3, List, Link as LinkIcon, 
  Quote, Table as TableIcon, Video, Music, FileText
} from 'lucide-react';
import Button from '../../components/Button';

// --- RICH TEXT EDITOR ---
interface RichTextEditorProps {
  initialValue: string;
  onChange: (html: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ initialValue, onChange }) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [activeStyles, setActiveStyles] = useState<string[]>([]);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== initialValue) {
      editorRef.current.innerHTML = initialValue || '<p><br></p>';
    }
  }, [initialValue]);

  const execCommand = (command: string, value: string = '') => {
    document.execCommand(command, false, value);
    if (editorRef.current) onChange(editorRef.current.innerHTML);
    updateActiveStyles();
  };

  const insertTable = () => {
    const html = `
      <table class="w-full border-collapse border border-white/10 my-6 bg-navy-950/50 text-white">
        <thead><tr><th class="border border-white/10 p-3 font-display text-[10px] uppercase">Category</th><th class="border border-white/10 p-3 font-display text-[10px] uppercase">Specification</th></tr></thead>
        <tbody><tr><td class="border border-white/10 p-3 text-sm">Data Point 1</td><td class="border border-white/10 p-3 text-sm">Description 1</td></tr></tbody>
      </table>
    `;
    execCommand('insertHTML', html);
  };

  const updateActiveStyles = () => {
    const styles = [];
    if (document.queryCommandState('bold')) styles.push('bold');
    if (document.queryCommandState('italic')) styles.push('italic');
    setActiveStyles(styles);
  };

  return (
    <div className="flex flex-col h-full border border-white/10 rounded-[2rem] overflow-hidden bg-[#020617]">
      <div className="flex flex-wrap items-center gap-1 p-2 bg-[#0a0f1d] border-b border-white/5 sticky top-0 z-10">
        <ToolbarButton active={activeStyles.includes('bold')} onClick={() => execCommand('bold')} icon={Bold} />
        <ToolbarButton active={activeStyles.includes('italic')} onClick={() => execCommand('italic')} icon={Italic} />
        <div className="w-px h-6 bg-white/5 mx-1" />
        <ToolbarButton onClick={() => execCommand('formatBlock', 'h3')} icon={Heading3} />
        <ToolbarButton onClick={() => execCommand('insertUnorderedList')} icon={List} />
        <ToolbarButton onClick={insertTable} icon={TableIcon} />
      </div>
      <div 
        ref={editorRef} 
        contentEditable 
        onInput={() => editorRef.current && onChange(editorRef.current.innerHTML)}
        className="flex-1 p-10 min-h-[500px] text-lg text-slate-300 outline-none journal-editor-area leading-relaxed" 
      />
      <style>{`
        .journal-editor-area h3 { font-family: 'Orbitron'; font-size: 2rem; color: #c61920; margin: 2rem 0 1rem; }
        .journal-editor-area p { margin-bottom: 1.5rem; }
      `}</style>
    </div>
  );
};

const ToolbarButton = ({ active, onClick, icon: Icon }: any) => (
  <button type="button" onClick={onClick} className={`p-2.5 rounded-xl transition-all ${active ? 'bg-brand-red text-white' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}><Icon size={18} /></button>
);

const AdminJournalEditor: React.FC = () => {
  const { content, updateContent, deleteBlogPost } = useSite();
  const [localContent, setLocalContent] = useState<SiteContent>(content);
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [blogForm, setBlogForm] = useState<Partial<BlogPost>>({});
  const [tagInput, setTagInput] = useState('');
  const [newCategoryName, setNewCategoryName] = useState('');

  const handleOpenBlog = (blog?: BlogPost) => {
    if (blog) {
      setEditingBlog(blog);
      setBlogForm(blog);
      setTagInput((blog.tags || []).join(', '));
    } else {
      setEditingBlog(null);
      setBlogForm({
        title: '', excerpt: '', content: '', author: 'Editorial Team',
        category: (localContent.blogCategories || [])[0], readTime: '5 min', tags: [],
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
      });
      setTagInput('');
    }
    setIsBlogModalOpen(true);
  };

  const handleAiDraft = async () => {
    if (!aiPrompt.trim()) return;
    setIsAiLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Draft a professional futuristic school blog for QuantaNova about: "${aiPrompt}". Return JSON: title, excerpt, content (HTML with <h3> and <p>), tags (array).`,
        config: { responseMimeType: "application/json" }
      });
      const data = JSON.parse(response.text || '{}');
      setBlogForm(prev => ({ ...prev, ...data }));
      setTagInput((data.tags || []).join(', '));
    } catch (e) { alert("AI Neural Link Failed."); }
    finally { setIsAiLoading(false); setAiPrompt(''); }
  };

  const saveBlog = async () => {
    const updated = [...(content.blogs || [])];
    const final = { ...blogForm, tags: tagInput.split(',').map(t=>t.trim()).filter(t=>t!=='') };
    if (editingBlog) {
      const i = updated.findIndex(b => b.id === editingBlog.id);
      updated[i] = { ...editingBlog, ...final } as BlogPost;
    } else {
      updated.unshift({ ...final, id: `b${Date.now()}` } as BlogPost);
    }
    await updateContent({ blogs: updated });
    setIsBlogModalOpen(false);
  };

  return (
    <div className="p-12 max-w-6xl mx-auto space-y-12">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-4xl font-display font-bold text-white uppercase tracking-tighter">Journal <span className="text-brand-red">Studio</span></h2>
          <p className="text-slate-500 text-xs font-black uppercase tracking-widest mt-2">Documenting Academic Breakthroughs</p>
        </div>
        <Button onClick={() => handleOpenBlog()} variant="primary" className="py-2.5 px-8 rounded-xl text-[10px] uppercase font-black">
          <Plus size={16} className="mr-2"/> New Production
        </Button>
      </header>

      <div className="space-y-6">
        {(content.blogs || []).map(post => (
          <div key={post.id} className="bg-[#0a0f1d] border border-white/5 p-8 rounded-[2.5rem] flex items-center gap-8 group hover:border-brand-red/30 transition-all shadow-xl">
             <div className="w-48 aspect-video bg-[#020617] rounded-3xl overflow-hidden shrink-0 border border-white/5">
                {post.image && <img src={post.image} className="w-full h-full object-cover"/>}
             </div>
             <div className="flex-1">
                <span className="px-3 py-1 bg-brand-red/10 text-brand-red text-[8px] font-black uppercase rounded-full tracking-widest mb-3 inline-block">{post.category}</span>
                <h4 className="text-2xl font-bold text-white mb-2">{post.title}</h4>
                <p className="text-slate-500 text-xs line-clamp-1 italic">"{post.excerpt}"</p>
             </div>
             <div className="flex gap-2">
                <button onClick={() => handleOpenBlog(post)} className="p-3 bg-white/5 hover:bg-brand-red hover:text-white rounded-xl transition-all"><PenTool size={18}/></button>
                <button onClick={() => deleteBlogPost(post.id)} className="p-3 bg-white/5 hover:bg-red-500 hover:text-white rounded-xl transition-all"><Trash2 size={18}/></button>
             </div>
          </div>
        ))}
      </div>

      <section className="bg-[#0a0f1d] p-12 rounded-[3.5rem] border border-white/5 shadow-2xl">
        <h3 className="text-xl font-display font-bold text-white uppercase tracking-widest mb-10 flex items-center gap-4"><Tag className="text-brand-red" /> Category Taxonomy</h3>
        <div className="flex flex-wrap gap-4 mb-10">
          {(content.blogCategories || []).map(cat => (
            <div key={cat} className="flex items-center gap-3 bg-navy-950 px-6 py-3 rounded-2xl border border-white/5 text-xs font-black uppercase tracking-widest text-brand-red group">
              {cat}
              <button onClick={() => updateContent({ blogCategories: content.blogCategories.filter(c=>c!==cat) })} className="text-red-500 opacity-30 hover:opacity-100 transition-opacity"><X size={14}/></button>
            </div>
          ))}
        </div>
        <div className="flex gap-4">
          <input className="bg-[#020617] border border-white/5 rounded-2xl px-6 py-4 flex-1 text-sm focus:border-brand-red outline-none" placeholder="New Category Name..." value={newCategoryName} onChange={e => setNewCategoryName(e.target.value)} />
          <Button onClick={() => {if(newCategoryName){updateContent({blogCategories:[...content.blogCategories, newCategoryName]}); setNewCategoryName('')}}} variant="primary" className="px-8 rounded-2xl text-[10px] uppercase font-black"><Plus size={16}/> Add Category</Button>
        </div>
      </section>

      {/* MODAL */}
      {isBlogModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#020617]/98 backdrop-blur-2xl">
           <div className="bg-[#0a0f1d] border border-white/10 w-full max-w-7xl rounded-[4rem] shadow-2xl overflow-hidden flex flex-col max-h-[96vh]">
              <header className="p-10 border-b border-white/5 flex justify-between items-center bg-[#020617]">
                 <div className="flex items-center gap-4"><PenTool size={22} className="text-brand-red" /><h3 className="text-2xl font-display font-bold text-white uppercase tracking-widest">Article Fabrication</h3></div>
                 <button onClick={() => setIsBlogModalOpen(false)} className="p-2.5 bg-white/5 hover:bg-red-500/10 hover:text-red-500 rounded-full transition-all"><X size={24}/></button>
              </header>
              <div className="flex-1 overflow-y-auto p-12 grid grid-cols-12 gap-12 custom-scrollbar">
                 <div className="col-span-8 space-y-10">
                    <div className="p-10 bg-brand-red/5 border border-brand-red/20 rounded-[2.5rem] space-y-6">
                       <div className="flex gap-4"><input className="flex-1 bg-navy-950 border border-white/10 rounded-2xl px-6 py-4 text-sm text-white focus:border-brand-red outline-none" placeholder="AI Intelligence Prompt..." value={aiPrompt} onChange={e => setAiPrompt(e.target.value)} /><button onClick={handleAiDraft} disabled={isAiLoading} className="px-10 bg-brand-red text-white font-black text-[10px] uppercase rounded-2xl">{isAiLoading ? <Loader2 className="animate-spin" size={20}/> : 'Sync Intelligence'}</button></div>
                    </div>
                    <div className="space-y-3">
                       <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-4">Article Headline</label>
                       <input className="w-full bg-transparent text-5xl font-display font-bold text-white border-b border-white/10 pb-6 outline-none focus:border-brand-red transition-all" value={blogForm.title} onChange={e => setBlogForm({...blogForm, title: e.target.value})} placeholder="Article Title"/>
                    </div>
                    <div className="space-y-3"><RichTextEditor initialValue={blogForm.content || ''} onChange={(html) => setBlogForm(prev => ({ ...prev, content: html }))} /></div>
                 </div>
                 <div className="col-span-4 space-y-10">
                    <div className="bg-navy-950 p-10 rounded-[3rem] border border-white/5 space-y-8 sticky top-0 shadow-2xl">
                       <div className="space-y-3"><label className="text-[10px] uppercase font-black text-slate-600 block tracking-widest">Taxonomy Category</label><select className="w-full bg-[#0a0f1d] border border-white/10 rounded-2xl p-5 text-white outline-none" value={blogForm.category} onChange={e => setBlogForm({...blogForm, category: e.target.value})}>{(content.blogCategories || []).map(c => <option key={c} value={c}>{c}</option>)}</select></div>
                       <div className="space-y-3"><label className="text-[10px] uppercase font-black text-slate-600 block tracking-widest">Keywords (CSV)</label><input className="w-full bg-[#0a0f1d] border border-white/10 rounded-2xl p-5 text-xs text-slate-300 outline-none" value={tagInput} onChange={e => setTagInput(e.target.value)} placeholder="stem, robotics..." /></div>
                       <div className="space-y-3"><label className="text-[10px] uppercase font-black text-slate-600 block tracking-widest">Featured Visual URL</label><input className="w-full bg-[#0a0f1d] border border-white/10 rounded-2xl p-5 text-xs text-slate-300 outline-none" value={blogForm.image} onChange={e => setBlogForm({...blogForm, image: e.target.value})} placeholder="https://quantanovaschool.org/resources/images/photo10.png"/></div>
                       <div className="space-y-3"><label className="text-[10px] uppercase font-black text-slate-600 block tracking-widest">Meta Excerpt</label><textarea className="w-full bg-[#0a0f1d] border border-white/10 rounded-2xl p-5 text-xs text-slate-400 outline-none h-32 leading-relaxed" value={blogForm.excerpt} onChange={e => setBlogForm({...blogForm, excerpt: e.target.value})} placeholder="Executive summary..."/></div>
                       <div className="pt-8 border-t border-white/5"><Button onClick={saveBlog} variant="primary" fullWidth className="py-6 rounded-2xl font-black uppercase text-[11px]">Sync Production</Button></div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default AdminJournalEditor;
