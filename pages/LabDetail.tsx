
import React, { useMemo, useState, useEffect } from 'react';
/* Fix: Standard imports for react-router-dom v6 hooks */
import { useParams, Link } from 'react-router-dom';
import { useSite } from '../contexts/SiteContext';
import { 
  ArrowLeft, Cpu, Zap, Beaker, Bot, Hammer, Sigma, 
  Lightbulb, ShieldCheck, UserCheck, Activity, Globe,
  Search, Terminal, Layers, Monitor, Activity as ActivityIcon, Server, Database
} from 'lucide-react';
import Button from '../components/Button';
import SEO from '../components/SEO';

const LabDetail: React.FC = () => {
  const { id } = useParams();
  const { content } = useSite();
  const [metrics, setMetrics] = useState({ cpu: 42, temp: 24, load: 15 });
  
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics({
        cpu: Math.floor(Math.random() * (65 - 30) + 30),
        temp: Math.floor(Math.random() * (26 - 22) + 22),
        load: Math.floor(Math.random() * (80 - 10) + 10)
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const labData = useMemo(() => {
    const infrastructure = content.infrastructure || [];
    const labs = content.labs || [];
    
    const fromInfrastructure = infrastructure.find(z => z.id === id);
    if (fromInfrastructure) {
      return {
        ...fromInfrastructure,
        type: 'infrastructure',
        color: 'neon-blue'
      };
    }
    const fromLabs = labs.find(l => l.id === id);
    if (fromLabs) {
      return {
        ...fromLabs,
        type: 'specialized',
        techFeatures: fromLabs.techFeatures || ['Advanced Instrumentation', 'Controlled Environment', 'Digital Interface'],
        color: fromLabs.colorClass
      };
    }
    return null;
  }, [id, content]);

  const iconMap: Record<string, React.ElementType> = {
    Monitor: Monitor,
    Cpu: Cpu,
    BookOpen: Globe,
    Trophy: Activity,
    Zap: Zap,
    Bot: Bot,
    Beaker: Beaker,
    Hammer: Hammer,
    Sigma: Sigma,
    Lightbulb: Lightbulb
  };

  if (!labData) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
        <h2 className="text-4xl font-display font-bold text-brand-indigo mb-8 uppercase tracking-widest">Access Protocol Restricted</h2>
        <Link to="/campus">
          <Button variant="primary">Return to Campus</Button>
        </Link>
      </div>
    );
  }

  const Icon = iconMap[labData.icon] || Zap;
  const accentColor = 'text-brand-red';
  const accentBg = 'bg-brand-red';

  return (
    <div className="min-h-screen bg-white pb-20 pt-20">
      <SEO 
        title={`${labData.title} | Infrastructure`} 
        description={`Explore the ${labData.title} at QuantaNova. ${labData.description?.substring(0, 100)}...`}
        keywords={`${labData.title}, school lab, STEM facility, ${(labData.techFeatures || []).join(', ')}`}
      />
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-16">
        <Link 
          to="/campus"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-brand-red mb-12 transition-colors uppercase text-[10px] font-black tracking-[0.3em] group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          EXIT ZONE
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-7 space-y-12">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-full px-5 py-2 shadow-sm">
                 <span className={`w-2.5 h-2.5 rounded-full animate-pulse ${accentBg}`}></span>
                 <span className={`font-mono text-[10px] uppercase tracking-widest font-black text-brand-indigo`}>Live Facility Status: Operational</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-display font-bold text-brand-indigo uppercase tracking-tighter leading-none">
                {labData.title}
              </h1>
              <p className="text-xl text-slate-500 font-light leading-relaxed max-w-2xl italic">
                {labData.description}
              </p>
            </div>

            <div className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-8 relative overflow-hidden shadow-inner">
               <div className="space-y-2">
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                     <ActivityIcon size={12} className="text-brand-red" /> Facility Load
                  </div>
                  <div className="flex items-end gap-2">
                     <span className="text-3xl font-display font-bold text-brand-indigo">{metrics.load}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                     <div className={`h-full ${accentBg} transition-all duration-1000`} style={{ width: `${metrics.load}%` }}></div>
                  </div>
               </div>
               <div className="space-y-2">
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                     <Server size={12} className="text-brand-red" /> Lab Ambient
                  </div>
                  <div className="text-3xl font-display font-bold text-brand-indigo">{metrics.temp}°C</div>
                  <div className="text-[10px] text-green-600 font-black uppercase tracking-widest">Climate Synced</div>
               </div>
               <div className="space-y-2">
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                     <Database size={12} className="text-brand-red" /> Project Delta
                  </div>
                  <div className="text-3xl font-display font-bold text-brand-indigo tracking-tight">ACTIVE</div>
                  <div className="text-[10px] text-brand-red font-black uppercase tracking-widest">Priority Node</div>
               </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
               <div className="p-10 bg-white rounded-[2.5rem] border border-slate-100 space-y-6 shadow-sm group hover:border-brand-red/20 transition-all">
                  <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-brand-indigo border border-slate-100 group-hover:text-brand-red transition-colors"><Terminal size={24} /></div>
                  <h3 className="text-brand-indigo font-bold text-xl uppercase tracking-tight">Curriculum Impact</h3>
                  <p className="text-slate-500 text-sm leading-relaxed font-light">Every lab session is meticulously mapped to the Oxford Advantage and TS State Board standards, ensuring institutional excellence through hands-on mastery.</p>
               </div>
               <div className="p-10 bg-white rounded-[2.5rem] border border-slate-100 space-y-6 shadow-sm group hover:border-brand-red/20 transition-all">
                  <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-brand-indigo border border-slate-100 group-hover:text-brand-red transition-colors"><ShieldCheck size={24} /></div>
                  <h3 className="text-brand-indigo font-bold text-xl uppercase tracking-tight">Safety Protocols</h3>
                  <p className="text-slate-500 text-sm leading-relaxed font-light">Global safety standards, industrial-grade PPE, and constant expert supervision define our laboratory culture and student well-being.</p>
               </div>
            </div>
          </div>

          <div className="lg:col-span-5">
             <div className="bg-slate-50 rounded-[3.5rem] border border-slate-100 p-12 space-y-10 sticky top-32 shadow-xl">
                <div className="flex items-center justify-between">
                   <div className="text-[10px] font-black uppercase text-slate-400 tracking-[0.4em]">Hardware Inventory</div>
                   <Layers size={18} className="text-brand-indigo/30" />
                </div>

                <div className="flex items-center justify-center p-12 bg-white rounded-[2.5rem] border border-slate-100 shadow-inner group overflow-hidden relative">
                   <div className="absolute inset-0 bg-brand-red/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                   <Icon size={120} className="text-brand-indigo opacity-20 group-hover:scale-110 transition-transform duration-700" />
                </div>

                <div className="space-y-8">
                   <h4 className="text-brand-indigo font-display font-bold text-sm uppercase tracking-[0.2em] border-b border-slate-200 pb-4">Key Infrastructure</h4>
                   <div className="space-y-4">
                      {(labData.techFeatures || []).map((tech: string, i: number) => (
                        <div key={i} className="flex items-center justify-between p-5 bg-white rounded-2xl border border-slate-100 text-sm group hover:border-brand-red/30 transition-all shadow-sm">
                           <span className="text-slate-500 group-hover:text-brand-indigo transition-colors font-medium">{tech}</span>
                           <div className="text-brand-red group-hover:scale-110 transition-transform"><CheckCircle2 size={18} /></div>
                        </div>
                      ))}
                   </div>
                </div>

                <div className="pt-6">
                   <Link to="/contact">
                      <Button fullWidth variant="primary" className="py-5 rounded-3xl uppercase font-black text-xs tracking-widest shadow-xl shadow-brand-red/20">
                        Schedule Institutional Visit
                      </Button>
                   </Link>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Fix: added optional className to props to avoid type error
const CheckCircle2 = ({ size, className = "" }: { size: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

export default LabDetail;
