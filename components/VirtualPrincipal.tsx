import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Modality, LiveServerMessage, FunctionDeclaration, Type } from '@google/genai';
import { Mic, MicOff, X, Loader2, Volume2, UserCheck, ShieldCheck, Zap, Navigation, Sparkles, BookOpen, GraduationCap, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

const VirtualPrincipal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [visualizerBars, setVisualizerBars] = useState<number[]>(new Array(12).fill(20));
  const navigate = useNavigate();
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const sessionRef = useRef<any>(null);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  let nextStartTime = 0;

  const navigateFunctionDeclaration: FunctionDeclaration = {
    name: 'navigateToPath',
    parameters: {
      type: Type.OBJECT,
      description: 'Navigates the user to specific school sections.',
      properties: {
        path: { type: Type.STRING, description: 'The route path. Targets: /, /why-quantanova, /about, /academics, /i-stem, /campus, /gallery, /blog, /contact.' },
        pageName: { type: Type.STRING, description: 'The friendly name of the page.' }
      },
      required: ['path'],
    },
  };

  const encode = (bytes: Uint8Array) => {
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
    return btoa(binary);
  };

  const decode = (base64: string) => {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) bytes[i] = binaryString.charCodeAt(i);
    return bytes;
  };

  const decodeAudioData = async (data: Uint8Array, ctx: AudioContext, sampleRate: number): Promise<AudioBuffer> => {
    const dataInt16 = new Int16Array(data.buffer);
    const buffer = ctx.createBuffer(1, dataInt16.length, sampleRate);
    const channelData = buffer.getChannelData(0);
    for (let i = 0; i < dataInt16.length; i++) channelData[i] = dataInt16[i] / 32768.0;
    return buffer;
  };

  useEffect(() => {
    let interval: any;
    if (isActive) {
      interval = setInterval(() => {
        setVisualizerBars(prev => prev.map(() => 20 + Math.random() * 60));
      }, 100);
    } else {
      setVisualizerBars(new Array(12).fill(20));
    }
    return () => clearInterval(interval);
  }, [isActive]);

  const startSession = async () => {
    if (!(await (window as any).aistudio?.hasSelectedApiKey())) {
        await (window as any).aistudio?.openSelectKey();
    }
    
    setIsConnecting(true);
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    const inputContext = new AudioContext({ sampleRate: 16000 });
    
    const sessionPromise = ai.live.connect({
      model: 'gemini-2.5-flash-native-audio-preview-12-2025',
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Puck' } } },
        tools: [{ functionDeclarations: [navigateFunctionDeclaration] }],
        systemInstruction: `You are Dr. Nova, the Neural Principal of QuantaNova School of Excellence. 
        You represent a prestigious, future-forward institution. You are intelligent, authoritative but very helpful.
        Your goal is to guide parents through our institutional matrix. Keep responses brief and premium.`
      },
      callbacks: {
        onopen: async () => {
          setIsConnecting(false);
          setIsActive(true);
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          const source = inputContext.createMediaStreamSource(stream);
          const processor = inputContext.createScriptProcessor(4096, 1, 1);
          processor.onaudioprocess = (e) => {
            const inputData = e.inputBuffer.getChannelData(0);
            const int16 = new Int16Array(inputData.length);
            for (let i = 0; i < inputData.length; i++) int16[i] = inputData[i] * 32768;
            sessionPromise.then(session => {
              session.sendRealtimeInput({ media: { data: encode(new Uint8Array(int16.buffer)), mimeType: 'audio/pcm;rate=16000' } });
            });
          };
          source.connect(processor);
          processor.connect(inputContext.destination);
          setIsListening(true);
        },
        onmessage: async (msg: LiveServerMessage) => {
          if (msg.toolCall) {
            for (const fc of msg.toolCall.functionCalls) {
              if (fc.name === 'navigateToPath') {
                const path = fc.args.path as string;
                navigate(path);
                sessionPromise.then(s => s.sendToolResponse({ functionResponses: { id: fc.id, name: fc.name, response: { result: "Redirecting to your requested module." } } }));
              }
            }
          }
          const audioData = msg.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
          if (audioData && audioContextRef.current) {
            const buffer = await decodeAudioData(decode(audioData), audioContextRef.current, 24000);
            const source = audioContextRef.current.createBufferSource();
            source.buffer = buffer;
            source.connect(audioContextRef.current.destination);
            nextStartTime = Math.max(nextStartTime, audioContextRef.current.currentTime);
            source.start(nextStartTime);
            nextStartTime += buffer.duration;
            sourcesRef.current.add(source);
          }
        },
        onclose: () => setIsActive(false),
        onerror: () => setIsConnecting(false)
      }
    });
    sessionRef.current = await sessionPromise;
  };

  const stopSession = () => {
    sessionRef.current?.close();
    sourcesRef.current.forEach(s => { try { s.stop(); } catch(e) {} });
    setIsActive(false);
    setIsListening(false);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed right-0 top-[42%] -translate-y-1/2 z-[100] group flex items-center justify-end"
      >
        <div className="bg-white backdrop-blur-3xl border border-slate-200 rounded-l-[2rem] flex items-center transition-all duration-500 overflow-hidden shadow-2xl border-r-0 hover:scale-110">
          <div className="w-20 h-20 flex items-center justify-center text-brand-red shrink-0">
            <GraduationCap size={32} className="group-hover:rotate-12 transition-transform" />
          </div>
          <div className="max-w-0 overflow-hidden whitespace-nowrap transition-all duration-500 group-hover:max-w-[240px] group-hover:pl-6 group-hover:pr-10">
            <span className="text-[12px] font-black uppercase tracking-[0.4em] text-brand-indigo">DR. NOVA AI</span>
          </div>
        </div>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[1000] bg-navy-950/98 backdrop-blur-3xl flex items-center justify-center p-6 animate-in fade-in duration-500">
           <div className="w-full max-w-2xl bg-[#0a0f1d] border border-white/10 rounded-[4rem] p-12 md:p-20 relative shadow-2xl overflow-hidden animate-in zoom-in duration-300">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-red to-transparent animate-scan"></div>
              
              <button onClick={() => { stopSession(); setIsOpen(false); }} className="absolute top-10 right-10 text-slate-500 hover:text-white p-3 hover:bg-white/5 rounded-full transition-all">
                 <X size={32} />
              </button>
              
              <div className="text-center space-y-12">
                 <div className="relative mx-auto">
                    <div className="absolute inset-0 bg-brand-red/20 rounded-full blur-[120px] animate-pulse"></div>
                    <div className="w-56 h-56 mx-auto bg-navy-950 rounded-full border-4 border-brand-red/30 flex items-center justify-center relative z-10 overflow-hidden shadow-2xl quantum-glow">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-red/20 to-transparent animate-scan z-0"></div>
                        
                        <div className="flex items-end gap-1.5 px-6 relative z-10 h-24">
                           {visualizerBars.map((h, i) => (
                             <div 
                               key={i} 
                               className="w-2 bg-brand-red rounded-full transition-all duration-100 ease-out" 
                               style={{ height: `${h}%` }} 
                             />
                           ))}
                        </div>

                        {isConnecting && <Loader2 className="absolute text-brand-red animate-spin" size={64} />}
                    </div>
                 </div>

                 <div className="space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-red/10 border border-brand-red/20 rounded-full">
                       <Activity size={14} className="text-brand-red animate-pulse" />
                       <span className="text-[10px] font-black uppercase tracking-widest text-brand-red">Quantum Interface Active</span>
                    </div>
                    <h3 className="text-3xl md:text-5xl font-display font-bold text-white uppercase tracking-tighter">NEURAL PRINCIPAL</h3>
                    <p className="text-slate-400 text-lg md:text-xl font-light leading-relaxed max-w-lg mx-auto italic">
                       {isActive 
                        ? "Dr. Nova is listening. Ask about our I-STEM curriculum, infrastructure, or institutional vision." 
                        : "Initialize the neural link to speak directly with our AI Principal."}
                    </p>
                 </div>

                 <div className="pt-6">
                    {!isActive ? (
                      <Button onClick={startSession} variant="primary" fullWidth className="py-8 text-xl md:text-2xl rounded-[2.5rem] tracking-[0.4em] font-black bg-brand-red text-white shadow-3xl hover:scale-105 transition-transform" disabled={isConnecting}>
                         {isConnecting ? "SYNCHRONIZING..." : "INITIALIZE AGENT"}
                      </Button>
                    ) : (
                      <Button onClick={stopSession} variant="outline" fullWidth className="py-8 text-xl md:text-2xl rounded-[2.5rem] border-white/20 text-white font-black hover:bg-white/5">
                         TERMINATE LINK
                      </Button>
                    )}
                 </div>

                 <div className="text-[8px] font-mono text-slate-600 uppercase tracking-[0.4em]">
                    Auth_Level: Institutional_High_Bandwidth
                 </div>
              </div>
           </div>
        </div>
      )}
    </>
  );
};

export default VirtualPrincipal;