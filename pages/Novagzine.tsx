
import React from 'react';
import { Book, PenTool, Globe, Lightbulb, Zap, Search, ShieldAlert, Award } from 'lucide-react';
import Button from '../components/Button';
import SEO from '../components/SEO';

const Novagzine: React.FC = () => {
  return (
    <div className="min-h-screen pb-20">
      <SEO />
      <section className="bg-white py-24 text-center px-4">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-brand-red/5 border border-brand-red/20 rounded-full px-4 py-1.5 mb-6 shadow-sm">
            <span className="w-2 h-2 bg-brand-red rounded-full animate-pulse"></span>
            <span className="text-brand-red font-display text-[10px] uppercase tracking-widest font-black">The Student Voice</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-bold text-brand-indigo mb-6 uppercase tracking-tight leading-none">
            NOVA<span className="text-brand-red">GZINE</span>
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto font-light">
            A student-led monthly magazine showcasing creativity, research, and original thinking. 
            Where the next generation of authors and analysts find their voice.
          </p>
        </div>
      </section>

      <section className="py-20 bg-navy-950 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center border border-brand-red/20 shadow-sm">
                <ShieldAlert className="text-brand-red w-8 h-8" />
              </div>
              <h2 className="text-3xl font-display font-bold text-brand-indigo uppercase tracking-tight">Intellectual <span className="text-brand-red">Honesty</span></h2>
              <p className="text-slate-600 text-lg leading-relaxed font-light">
                At QuantaNova, internet copying is strictly discouraged. We believe that true learning happens when students engage in deep research and express their own original thoughts.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center text-slate-500 gap-3 font-bold uppercase text-[10px] tracking-widest">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-red"></div> Zero Rote Memorization
                </li>
                <li className="flex items-center text-slate-500 gap-3 font-bold uppercase text-[10px] tracking-widest">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-red"></div> Primary Research Focus
                </li>
                <li className="flex items-center text-slate-500 gap-3 font-bold uppercase text-[10px] tracking-widest">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-red"></div> Authentic Creative Expression
                </li>
              </ul>
            </div>
            <div className="bg-white p-10 rounded-3xl border border-slate-100 shadow-xl relative overflow-hidden group">
              <div className="absolute top-4 right-4 text-brand-red/5">
                <PenTool size={120} />
              </div>
              <div className="relative z-10 space-y-6">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                  <p className="text-slate-600 italic">"Don't search for the answer. Think of the answer."</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center border border-slate-200">
                    <Award className="text-brand-red" />
                  </div>
                  <div>
                    <h4 className="text-brand-indigo font-bold">The Quanta Seal</h4>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Verified Original Student Research</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-display font-bold text-brand-indigo uppercase tracking-tight">Inside the Issue</h2>
          <p className="text-slate-500 mt-2">Monthly columns driven by curiosity and scientific thinking.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Scientific Inquiry",
              icon: Search,
              color: "text-brand-red",
              desc: "Students publish findings from their Saturday iSTEM hackathons and experiments."
            },
            {
              title: "Creative Canvas",
              icon: Lightbulb,
              color: "text-brand-indigo",
              desc: "Short stories, poetry, and digital art that explore the intersection of technology and humanity."
            },
            {
              title: "Global Leadership",
              icon: Globe,
              color: "text-brand-red",
              desc: "Analytical essays on sustainability, ethics, and future global challenges."
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl border border-slate-100 hover:border-brand-red/30 transition-all group shadow-sm">
              <item.icon className={`w-10 h-10 ${item.color} mb-6 group-hover:scale-110 transition-transform`} />
              <h3 className="text-xl font-bold text-brand-indigo mb-3 uppercase tracking-tight">{item.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4">
        <div className="bg-white p-12 rounded-[2.5rem] border border-slate-200 text-center relative overflow-hidden shadow-2xl">
          <div className="relative z-10">
            <h2 className="text-3xl font-display font-bold text-brand-indigo mb-6 uppercase tracking-tight">Current Issue: The Quantum Horizon</h2>
            <p className="text-slate-600 mb-8 max-w-xl mx-auto">
              Read our latest student-published research on "AI Ethics in Modern Classrooms" and "The Future of Space Colonization."
            </p>
            <div className="flex justify-center">
              <Button variant="primary" className="px-12 rounded-full">
                Read Latest Edition
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Novagzine;
