
import React, { useState } from 'react';
import { useSite } from '../contexts/SiteContext';
/* Fix: Standard import for react-router-dom Link */
import { Link } from 'react-router-dom';
import { Calendar, User, Clock, ChevronRight, Search, Video, Music, Tag } from 'lucide-react';
import SEO from '../components/SEO';

const Blog: React.FC = () => {
  const { content } = useSite();
  const [activeCategory, setActiveCategory] = useState('All');
  
  const categories = ['All', ...(content.blogCategories || [])];
  
  const allBlogs = content.blogs || [];
  const filteredBlogs = activeCategory === 'All' 
    ? allBlogs 
    : allBlogs.filter(b => b.category === activeCategory);

  return (
    <div className="min-h-screen bg-white pb-20 pt-16">
      <SEO />
      <section className="py-24 bg-slate-50 relative overflow-hidden border-b border-slate-100">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-red/5 blur-[120px] pointer-events-none"></div>
        <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 text-center pt-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border border-slate-200 rounded-full mb-8 shadow-sm">
            <span className="w-2 h-2 bg-brand-red rounded-full animate-pulse"></span>
            <span className="text-brand-red font-display text-[10px] uppercase tracking-widest font-black">Innovation Insights</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-bold text-brand-indigo mb-6 uppercase tracking-tight">
            The <span className="text-brand-red">Quantum</span> Journal
          </h1>
          <p className="text-xl text-slate-500 max-w-3xl mx-auto font-light leading-relaxed">
            Exploring the frontiers of education, technology, and leadership through original perspectives from the QuantaNova faculty.
          </p>
        </div>
      </section>

      <section className="sticky top-20 z-40 bg-white/90 backdrop-blur-xl border-y border-slate-100 mb-12 shadow-sm">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 overflow-x-auto">
          <div className="flex items-center justify-center gap-4 py-4 min-w-max">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-8 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border shadow-sm ${
                  activeCategory === cat 
                    ? 'bg-brand-indigo text-white border-brand-indigo' 
                    : 'bg-white text-slate-500 hover:text-brand-red border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">
        {filteredBlogs.length === 0 ? (
          <div className="text-center py-32 border-2 border-dashed border-slate-100 rounded-[3rem] bg-slate-50">
            <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-400 font-display uppercase tracking-[0.2em] font-black text-xs">Knowledge Node Empty</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredBlogs.map((post) => (
              <Link 
                key={post.id} 
                to={`/blog/${post.id}`}
                className="group flex flex-col bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden hover:border-brand-red/30 transition-all duration-500 shadow-xl hover:shadow-brand-indigo/10"
              >
                <div className="aspect-[16/10] bg-slate-100 relative overflow-hidden border-b border-slate-100">
                   {post.image ? (
                     <img 
                       src={post.image} 
                       alt={post.title} 
                       className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                     />
                   ) : (
                     <div className="absolute inset-0 flex items-center justify-center opacity-5">
                        <img src="https://quantanovaschool.org/logo/logo.png" className="w-32" alt="" />
                     </div>
                   )}
                   <div className="absolute top-6 right-6 flex flex-col gap-2">
                      {post.videoUrl && <div className="p-2 bg-white/80 backdrop-blur rounded-lg text-brand-red border border-slate-200 shadow-lg"><Video size={16}/></div>}
                      {post.audioUrl && <div className="p-2 bg-white/80 backdrop-blur rounded-lg text-brand-indigo border border-slate-200 shadow-lg"><Music size={16}/></div>}
                   </div>
                   <div className="absolute bottom-6 left-6 flex flex-wrap gap-2">
                      <span className="px-5 py-2 bg-brand-red text-white text-[9px] font-black uppercase tracking-widest rounded-full shadow-lg shadow-brand-red/20">
                        {post.category}
                      </span>
                   </div>
                </div>

                <div className="p-10 flex-grow flex flex-col">
                  <div className="flex items-center gap-4 text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-6">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={14} className="text-brand-red" />
                      {post.date}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock size={14} className="text-brand-red" />
                      {post.readTime}
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-display font-bold text-brand-indigo mb-4 group-hover:text-brand-red transition-colors leading-tight uppercase tracking-tight">
                    {post.title}
                  </h3>
                  
                  <p className="text-slate-500 text-base leading-relaxed mb-8 line-clamp-3 font-light">
                    {post.excerpt}
                  </p>

                  <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                       <div className="w-9 h-9 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center">
                          <User size={16} className="text-brand-indigo" />
                       </div>
                       <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{post.author}</span>
                    </div>
                    <div className="flex items-center gap-2 text-brand-red opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-4 transition-all">
                       <span className="text-[9px] font-black uppercase">Read Full</span>
                       <ChevronRight size={18} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Blog;
