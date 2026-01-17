import React from 'react';
import { useSite } from '../../contexts/SiteContext';
// Added PenTool and Settings to fix "Cannot find name" errors in the component
import { ShieldCheck, Activity, Users, Database, Zap, Cpu, Server, Globe, PenTool, Settings } from 'lucide-react';

const AdminSummary: React.FC = () => {
  const { content } = useSite();

  const metrics = [
    { label: 'Published Articles', value: (content.blogs || []).length, icon: Database, color: 'text-brand-red' },
    { label: 'Media Assets', value: (content.gallery || []).length, icon: Activity, color: 'text-blue-400' },
    { label: 'Core Integrity', value: '100%', icon: ShieldCheck, color: 'text-green-400' },
    { label: 'Network Node', value: 'SYMMETRIC', icon: Globe, color: 'text-gold-400' },
  ];

  return (
    <div className="p-16 max-w-7xl mx-auto space-y-16">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-3 px-5 py-2 bg-brand-red/10 border border-brand-red/30 rounded-full">
             <Activity size={16} className="text-brand-red animate-pulse" />
             <span className="text-brand-red text-[9px] font-black uppercase tracking-[0.4em]">Administrative Nexus Active</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-display font-bold text-white uppercase tracking-tighter leading-none">
            Command <span className="text-brand-red">Center</span>
          </h2>
        </div>
        <div className="bg-[#0a0f1d] border border-white/5 px-8 py-4 rounded-3xl text-right">
           <div className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">Last Secure Sync</div>
           <div className="text-white font-mono text-xs flex items-center gap-3">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
              {new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
           </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {metrics.map((m, i) => (
          <div key={i} className="bg-[#0a0f1d] border border-white/5 p-10 rounded-[2.5rem] shadow-2xl hover:border-brand-red/30 transition-all group relative overflow-hidden">
             <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                <m.icon size={120} />
             </div>
             <div className={`w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center ${m.color} mb-8 shadow-inner`}>
                <m.icon size={28} />
             </div>
             <div className="text-4xl font-display font-bold text-white mb-3 tracking-tight">{m.value}</div>
             <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">{m.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <section className="lg:col-span-8 bg-gradient-to-br from-brand-red/10 to-transparent p-16 rounded-[4rem] border border-brand-red/20 relative overflow-hidden">
           <div className="absolute top-0 right-0 p-16 opacity-[0.05] pointer-events-none">
              <Server size={300} className="text-brand-red" />
           </div>
           <div className="max-w-2xl relative z-10 space-y-10">
              <h3 className="text-3xl font-display font-bold text-white uppercase tracking-widest">Operation Protocol</h3>
              <p className="text-slate-400 text-xl leading-relaxed font-light">
                 System v4.5 is now architected for <span className="text-brand-red font-bold">Isolated Module Management</span>. Use the tactical sidebar to access specific institutional nodes. All data is cached locally until the <span className="text-brand-red font-bold">Synchronize Nexus</span> protocol is executed.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="p-6 bg-navy-950/80 rounded-3xl border border-white/5 group hover:border-brand-red/20 transition-all">
                    <div className="text-brand-red font-bold text-xs uppercase mb-2 flex items-center gap-2"><PenTool size={14}/> Journal Studio</div>
                    <p className="text-[10px] text-slate-500 leading-relaxed uppercase tracking-widest">Update Novagzine research papers and academic news.</p>
                 </div>
                 <div className="p-6 bg-navy-950/80 rounded-3xl border border-white/5 group hover:border-brand-red/20 transition-all">
                    <div className="text-brand-red font-bold text-xs uppercase mb-2 flex items-center gap-2"><Settings size={14}/> Global Config</div>
                    <p className="text-[10px] text-slate-500 leading-relaxed uppercase tracking-widest">Manage biometrics, SEO metadata, and admissions toggles.</p>
                 </div>
              </div>
           </div>
        </section>

        <section className="lg:col-span-4 bg-[#0a0f1d] p-12 rounded-[4rem] border border-white/5 flex flex-col justify-center items-center text-center space-y-8">
           <div className="w-24 h-24 bg-brand-red/10 rounded-full flex items-center justify-center border border-brand-red/20">
              <Cpu size={48} className="text-brand-red" />
           </div>
           <h4 className="text-2xl font-display font-bold text-white uppercase tracking-widest">System Health</h4>
           <div className="w-full space-y-6">
              {[
                { label: 'Neural Link', val: '98%', color: 'bg-brand-red' },
                { label: 'Database Sync', val: '100%', color: 'bg-green-500' },
                { label: 'Resource Load', val: '12%', color: 'bg-blue-500' }
              ].map(stat => (
                <div key={stat.label} className="space-y-2">
                   <div className="flex justify-between text-[8px] font-black uppercase tracking-widest text-slate-500">
                      <span>{stat.label}</span>
                      <span>{stat.val}</span>
                   </div>
                   <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div className={`h-full ${stat.color} transition-all duration-1000`} style={{ width: stat.val }}></div>
                   </div>
                </div>
              ))}
           </div>
        </section>
      </div>
    </div>
  );
};

export default AdminSummary;