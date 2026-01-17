
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, Sparkles, MessageSquare, Search, ArrowRight } from 'lucide-react';
import { useSite } from '../contexts/SiteContext';
import SEO from '../components/SEO';
/* Fix: Standard import for react-router-dom Link */
import { Link } from 'react-router-dom';
import Button from '../components/Button';

const FAQ: React.FC = () => {
  const { content } = useSite();
  const { faqs = [] } = content;
  const [activeFaq, setActiveFaq] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = faqs.filter(f => 
    f.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
    f.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white pb-20 pt-20 blueprint-grid">
      <SEO title="Institutional FAQ" description="Authoritative answers regarding admissions, curriculum, and the iSTEM framework at QuantaNova." />
      
      {/* Header Section */}
      <section className="relative pt-24 pb-16 px-6 text-center overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-64 bg-brand-red/5 blur-[120px] -z-10 rounded-full"></div>
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-3 bg-white border border-slate-200 rounded-full px-6 py-2 shadow-sm">
             <HelpCircle size={18} className="text-brand-red" />
             <span className="text-brand-red font-display text-[10px] uppercase tracking-[0.4em] font-black">Knowledge Base Alpha</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-display font-bold text-brand-indigo uppercase tracking-tighter leading-none">
            CENTRAL <span className="text-brand-red">FAQ</span>
          </h1>
          <p className="text-xl text-slate-500 font-light leading-relaxed max-w-2xl mx-auto italic">
            Synchronize your understanding with our institutional directives. Find authoritative answers to common parent inquiries.
          </p>
          
          <div className="relative max-w-xl mx-auto mt-12 group">
             <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-red transition-colors" size={20} />
             <input 
               type="text" 
               placeholder="Search institutional queries..."
               className="w-full bg-white border border-slate-200 rounded-full py-5 pl-16 pr-8 text-brand-indigo outline-none focus:border-brand-red shadow-xl transition-all"
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
             />
          </div>
        </div>
      </section>

      {/* FAQ Grid */}
      <section className="max-w-4xl mx-auto px-6 mt-12">
        <div className="space-y-6">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => (
              <div key={faq.id} className="border border-slate-100 rounded-[2.5rem] bg-white shadow-sm overflow-hidden group hover:border-brand-red/20 transition-all">
                <button 
                  onClick={() => setActiveFaq(activeFaq === faq.id ? null : faq.id)}
                  className="w-full p-10 flex items-center justify-between text-left hover:bg-slate-50/50 transition-colors"
                >
                  <span className="text-lg md:text-xl font-display font-bold text-brand-indigo uppercase tracking-tight pr-8">
                    {faq.question}
                  </span>
                  <div className={`shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${activeFaq === faq.id ? 'bg-brand-red text-white' : 'bg-slate-50 text-slate-400'}`}>
                    {activeFaq === faq.id ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                  </div>
                </button>
                {activeFaq === faq.id && (
                  <div className="px-10 pb-10 animate-in slide-in-from-top-4 duration-300">
                    <div className="pt-6 border-t border-slate-100 text-slate-500 text-lg leading-relaxed font-light">
                      {faq.answer}
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-32 bg-slate-50 rounded-[4rem] border border-dashed border-slate-200">
               <MessageSquare className="mx-auto text-slate-200 mb-6" size={64} />
               <p className="text-brand-indigo font-display uppercase tracking-widest text-sm font-bold opacity-40">No matching directives found</p>
            </div>
          )}
        </div>
      </section>

      {/* Contact Callout */}
      <section className="py-24 max-w-5xl mx-auto px-6">
         <div className="bg-brand-indigo rounded-[4rem] p-16 md:p-24 relative overflow-hidden text-center shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[100px]"></div>
            <div className="relative z-10 space-y-8">
               <div className="inline-flex items-center gap-2 text-gold-400 font-display text-[10px] uppercase font-black tracking-widest mb-4">
                  <Sparkles size={16} /> Unresolved Query?
               </div>
               <h2 className="text-4xl md:text-6xl font-display font-bold text-white uppercase tracking-tighter leading-none">DIRECT <span className="text-gold-400">CONNECTIVITY</span></h2>
               <p className="text-slate-300 text-xl font-light leading-relaxed max-w-2xl mx-auto">
                 If your specific inquiry is not addressed in our central hub, please initiate a direct link with our admissions department.
               </p>
               <div className="flex justify-center pt-8">
                  <Link to="/contact">
                     <Button variant="primary" className="px-16 py-6 rounded-full uppercase font-black text-xs tracking-[0.3em] bg-brand-red text-white shadow-xl shadow-brand-red/30">
                        Initialize Contact <ArrowRight size={20} className="ml-3" />
                     </Button>
                  </Link>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
};

export default FAQ;
