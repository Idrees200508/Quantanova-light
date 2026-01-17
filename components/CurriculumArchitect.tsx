
import React, { useState } from 'react';
import { GoogleGenAI, Type } from '@google/genai';
import { Wand2, Rocket, Brain, Sigma, Loader2, Download, Sparkles } from 'lucide-react';
import Button from './Button';

const CurriculumArchitect: React.FC = () => {
  const [interest, setInterest] = useState('');
  const [loading, setLoading] = useState(false);
  const [roadmap, setRoadmap] = useState<any>(null);

  const generateRoadmap = async () => {
    if (!interest.trim()) return;
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Generate a personalized 3-phase I-STEM learning roadmap for a student interested in: "${interest}". 
        Include:
        1. "Foundational Mastery" (Phase 1)
        2. "Creative Synthesis" (Phase 2)
        3. "Quantum Leadership" (Phase 3)
        For each phase, provide a Title, a specific Lab at QuantaNova (Robotics, Physics, or Chemistry), and a "Key Project".
        Return JSON format.`,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              phases: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING },
                    lab: { type: Type.STRING },
                    project: { type: Type.STRING },
                    description: { type: Type.STRING }
                  },
                  required: ['title', 'lab', 'project', 'description']
                }
              }
            }
          }
        }
      });
      
      setRoadmap(JSON.parse(response.text));
    } catch (e) {
      console.error(e);
      alert("System connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#0a0f1d] border border-white/5 rounded-[3.5rem] p-12 relative overflow-hidden shadow-2xl">
      <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
         <Wand2 size={200} className="text-gold-500" />
      </div>

      <div className="max-w-3xl">
        <div className="flex items-center gap-3 mb-6">
           <div className="p-2 bg-gold-500/10 rounded-xl border border-gold-500/20 text-gold-500">
             <Sparkles size={20} />
           </div>
           <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">AI Innovation Hub</span>
        </div>
        
        <h2 className="text-4xl font-display font-bold text-white mb-6 uppercase tracking-tighter">I-STEM <span className="text-gold-500">Architect</span></h2>
        <p className="text-slate-400 text-lg mb-10 font-light leading-relaxed">
           Input your child's passion (e.g., Space Travel, Digital Art, Sustainable Energy) and our AI will architect a custom technical roadmap within the QuantaNova ecosystem.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-12">
           <input 
             type="text" 
             value={interest}
             onChange={e => setInterest(e.target.value)}
             placeholder="Enter interest (e.g. Artificial Intelligence)..." 
             className="flex-1 bg-navy-950 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-gold-500 transition-colors"
           />
           <Button onClick={generateRoadmap} disabled={loading || !interest.trim()} variant="primary" className="px-10 py-4 rounded-2xl uppercase font-black text-xs tracking-widest shadow-xl">
             {loading ? <Loader2 size={20} className="animate-spin" /> : "Architect Roadmap"}
           </Button>
        </div>

        {roadmap && (
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in slide-in-from-bottom-6 duration-700">
             {roadmap.phases.map((phase: any, i: number) => (
                <div key={i} className="bg-navy-900 border border-white/5 p-8 rounded-3xl space-y-4 hover:border-gold-500/30 transition-all group">
                   <div className="text-[10px] font-black text-gold-500 uppercase tracking-widest">Phase 0{i+1}</div>
                   <h4 className="text-white font-bold text-lg leading-tight">{phase.title}</h4>
                   <div className="text-[9px] font-mono text-slate-500 uppercase flex items-center gap-2">
                      <Rocket size={12} className="text-gold-500" /> {phase.lab}
                   </div>
                   <p className="text-slate-400 text-xs leading-relaxed">{phase.description}</p>
                   <div className="pt-4 border-t border-white/5">
                      <div className="text-[9px] font-black text-white uppercase tracking-widest mb-1">Key Project</div>
                      <div className="text-gold-400 font-bold text-xs">{phase.project}</div>
                   </div>
                </div>
             ))}
           </div>
        )}
      </div>
    </div>
  );
};

export default CurriculumArchitect;
