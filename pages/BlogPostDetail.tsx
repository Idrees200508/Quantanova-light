
import React, { useState } from 'react';
/* Fix: Standard imports for react-router-dom v6 hooks */
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSite } from '../contexts/SiteContext';
import { GoogleGenAI, Modality } from '@google/genai';
import { ArrowLeft, Calendar, User, Clock, Facebook, Linkedin, Video, Headphones, Loader2, PauseCircle, Tag } from 'lucide-react';
import Button from '../components/Button';
import SEO from '../components/SEO';

const BlogPostDetail: React.FC = () => {
  const { id } = useParams();
  const { content } = useSite();
  const navigate = useNavigate();
  const [isTtsLoading, setIsTtsLoading] = useState(false);
  const [isTtsPlaying, setIsTtsPlaying] = useState(false);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  
  const post = content.blogs.find(b => b.id === id);

  const startTts = async () => {
    if (isTtsPlaying) {
        audioRef.current?.pause();
        setIsTtsPlaying(false);
        return;
    }
    
    setIsTtsLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: `Read this article: ${post?.title}. ${post?.content.replace(/<[^>]*>?/gm, '')}` }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } } },
        },
      });

      const audioData = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (audioData) setIsTtsPlaying(true);
    } catch (e) { alert("TTS System Offline."); }
    finally { setIsTtsLoading(false); }
  };

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-center">
         <div><h2 className="text-3xl font-display font-bold text-brand-indigo mb-6 uppercase tracking-widest">Article Removed</h2><Link to="/blog"><Button variant="primary">Return to Archive</Button></Link></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-20 pt-16">
      <SEO title={post.title} description={post.excerpt} keywords={post.tags?.join(', ') || ''} />
      <style>{`
        .rich-content h3 { font-family: 'Orbitron'; font-size: 2.2rem; color: #393182; margin: 3rem 0 1.5rem; text-transform: uppercase; border-left: 6px solid #c61920; padding-left: 1.5rem; }
        .rich-content p { margin-bottom: 2rem; font-size: 1.3rem; line-height: 1.8; color: #475569; font-weight: 300; }
        .rich-content table { width: 100%; border-collapse: collapse; margin: 3rem 0; background: #f8fafc; border: 1px solid #e2e8f0; }
        .rich-content th { background: #393182; color: white; font-family: 'Orbitron'; text-transform: uppercase; font-size: 0.8rem; padding: 1.5rem; text-align: left; }
        .rich-content td { padding: 1.5rem; border: 1px solid #e2e8f0; color: #393182; font-size: 1.1rem; }
        .rich-content blockquote { border-left: 6px solid #c61920; padding-left: 2rem; font-style: italic; color: #393182; margin: 3.5rem 0; font-size: 1.6rem; background: #fff1f2; padding: 2.5rem; border-radius: 0 2rem 2rem 0; }
      `}</style>

      <section className="relative pt-32 pb-16 bg-slate-50 border-b border-slate-100">
        <div className="max-w-[1000px] mx-auto px-6 relative z-10 text-center">
          <button onClick={() => navigate('/blog')} className="flex items-center gap-2 text-slate-400 hover:text-brand-red mb-12 transition-colors uppercase text-[10px] font-black tracking-[0.3em] mx-auto">
            <ArrowLeft size={16} /> EXIT JOURNAL
          </button>
          <div className="flex justify-center gap-3 mb-8">
            <div className="px-6 py-2 bg-brand-red text-white text-[9px] font-black uppercase tracking-widest rounded-full shadow-lg shadow-brand-red/20">{post.category}</div>
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-bold text-brand-indigo mb-12 tracking-tighter uppercase leading-[0.95]">{post.title}</h1>
          <div className="flex flex-wrap justify-center items-center gap-10 py-10 border-y border-slate-200">
            <div className="flex items-center gap-3"><User size={18} className="text-brand-red" /><span className="text-[10px] font-black uppercase text-brand-indigo tracking-widest">{post.author}</span></div>
            <div className="flex items-center gap-3"><Calendar size={18} className="text-brand-red" /><span className="text-[10px] font-black uppercase text-brand-indigo tracking-widest">{post.date}</span></div>
            <button onClick={startTts} className="flex items-center gap-2 text-brand-red hover:text-brand-indigo transition-colors group">
              {isTtsLoading ? <Loader2 size={18} className="animate-spin" /> : isTtsPlaying ? <PauseCircle size={18} /> : <Headphones size={18} className="group-hover:scale-110 transition-transform" />}
              <span className="text-[10px] font-black uppercase tracking-widest">Listen to Briefing</span>
            </button>
          </div>
        </div>
      </section>

      <section className="max-w-[900px] mx-auto px-6 mt-20">
         <div className="rich-content" dangerouslySetInnerHTML={{ __html: post.content }} />
      </section>
    </div>
  );
};

export default BlogPostDetail;
