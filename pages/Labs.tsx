
import React from 'react';
import { Bot, Cpu, Beaker, Hammer, Sigma, Lightbulb, ArrowRight } from 'lucide-react';
import { useSite } from '../contexts/SiteContext';
/* Fix: Standard import for react-router-dom Link */
import { Link } from 'react-router-dom';

const Labs: React.FC = () => {
  const { content } = useSite();
  const { labs } = content;

  const iconMap: Record<string, React.ElementType> = {
    Bot: Bot,
    Cpu: Cpu,
    Beaker: Beaker,
    Hammer: Hammer,
    Sigma: Sigma,
    Lightbulb: Lightbulb
  };

  const getColors = (colorClass: string) => {
    switch(colorClass) {
      case 'neon-pink': 
        return { bg: 'bg-brand-red', text: 'text-brand-red', border: 'hover:border-brand-red/30' };
      case 'neon-blue': 
        return { bg: 'bg-brand-indigo', text: 'text-brand-indigo', border: 'hover:border-brand-indigo/30' };
      default: 
        return { bg: 'bg-brand-red', text: 'text-brand-red', border: 'hover:border-brand-red/30' };
    }
  };

  return (
    <div className="pb-20">
      <section className="relative py-24 bg-white overflow-hidden text-center">
        <div className="max-w-7xl mx-auto px-4 relative z-10 pt-12">
          <h1 className="text-4xl md:text-6xl font-display font-bold text-brand-indigo mb-6 uppercase tracking-tighter">
            Our <span className="text-brand-red">Laboratories</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto font-light leading-relaxed">
            World-class facilities architected to turn theoretical knowledge into tangible <span className="text-brand-indigo font-bold">Quantum Reality</span>.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="space-y-12">
          {(labs || []).map((lab) => {
            const Icon = iconMap[lab.icon] || Lightbulb;
            const colors = getColors(lab.colorClass);

            return (
              <Link 
                key={lab.id} 
                to={`/labs/${lab.id}`}
                className={`bg-slate-50 p-10 rounded-[3rem] border border-slate-100 transition-all duration-500 block group shadow-lg ${colors.border}`}
              >
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-6">
                    <div className={`p-4 rounded-2xl bg-white border border-slate-100 ${colors.text} group-hover:scale-110 shadow-sm transition-all`}>
                      <Icon size={32} />
                    </div>
                    <h2 className="text-3xl font-display font-bold text-brand-indigo uppercase tracking-tight">
                      {lab.title}
                    </h2>
                  </div>
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white border border-slate-200 text-slate-400 group-hover:text-brand-red group-hover:border-brand-red/30 transition-all group-hover:translate-x-1 shadow-sm">
                    <ArrowRight size={20} />
                  </div>
                </div>
                
                <div className={`w-20 h-1.5 ${colors.bg} rounded-full mb-8 shadow-sm`}></div>
                
                <p className="text-slate-600 text-lg leading-relaxed mb-10 font-light">
                  {lab.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {['Industrial Equipment', 'Global Safety Standards', 'Expert Supervision', 'Student-Led Projects'].map((item, i) => (
                    <div key={i} className="flex items-center text-slate-400 text-[10px] font-black uppercase tracking-widest">
                      <div className={`w-2 h-2 rounded-full ${colors.bg} mr-3`}></div>
                      {item}
                    </div>
                  ))}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Labs;
