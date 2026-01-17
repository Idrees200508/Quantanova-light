import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import SmoothReveal from '../components/SmoothReveal';
import SEO from '../components/SEO';
import Iridescence from '../components/Iridescence';
import TextType from '../components/TextType';

const SPREADSHEET_CSV_URL = "";

const FALLBACK_GALLERY = [
  "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2000",
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2000",
  "https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=2000",
  "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2000",
  "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2000"
];

const FullscreenBackground: React.FC = () => {
  const [images, setImages] = useState<string[]>(FALLBACK_GALLERY);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (SPREADSHEET_CSV_URL) {
      fetch(SPREADSHEET_CSV_URL)
        .then(res => res.text())
        .then(csv => {
          const rows = csv.split('\n').map(row => row.trim()).filter(row => row.startsWith('http'));
          if (rows.length > 0) setImages([...rows, ...FALLBACK_GALLERY]);
        })
        .catch(() => { });
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-white">
      <Iridescence colorA={[0.89, 0.22, 0.24]} colorB={[0.14, 0.23, 0.49]} speed={0.1} className="opacity-10 z-10" />

      <div className="relative h-full w-full">
        {images.map((img, i) => (
          <div
            key={img}
            className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${i === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-102'}`}
          >
            <img
              src={img}
              className="w-full h-full object-cover"
              alt=""
            />
          </div>
        ))}
      </div>


      <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/10 to-white/60 z-20"></div>
      <div className="absolute inset-0 bg-white/5 z-15"></div>
      <div className="absolute inset-0 blueprint-grid pointer-events-none opacity-[0.05] z-20"></div>
    </div>
  );
};

const Home: React.FC = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  }, [hash]);

  return (
    <div className="w-full bg-white relative">
      <SEO />

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex flex-col items-center justify-center text-center overflow-hidden">
        <FullscreenBackground />

        <div className="max-w-[1800px] mx-auto space-y-6 relative z-30 w-full px-6 flex flex-col items-center">
          <SmoothReveal delay={200}>
            <div className="space-y-4 text-center flex flex-col items-center">
              <div className="bg-brand-red text-white px-8 py-2 rounded-full font-display font-black text-[10px] md:text-xs tracking-[0.6em] mb-4 uppercase">
                QuantaNova School of Excellence
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-display font-bold text-brand-indigo uppercase tracking-tighter leading-[0.9] drop-shadow-sm">
                PREPARING <br /> MINDS FOR THE <br /> <span className="text-brand-red">QUANTUM</span> AGE
              </h1>
              <div className="text-xs sm:text-base md:text-xl text-slate-600 font-medium max-w-3xl mx-auto leading-relaxed pt-6 tracking-widest uppercase h-12">
                <TextType
                  text="Welcome to Asia’s first iSTEM-BASED school."
                  speed={40}
                  delay={1000}
                />
              </div>
            </div>
          </SmoothReveal>

          <SmoothReveal delay={800}>
            <div className="pt-10">
              <Link to="/manifesto">
                <button className="bg-brand-indigo text-white px-10 py-4 rounded-full font-display font-black text-xs tracking-widest uppercase hover:bg-brand-red transition-all shadow-xl active:scale-95">
                  Explore our Manifesto
                </button>
              </Link>
            </div>
          </SmoothReveal>
        </div>
      </section>

      {/* Manifesto Intro / Philosophy */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0 blueprint-grid opacity-5 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center space-y-20 relative z-10">
          <SmoothReveal>
            <h2 className="text-3xl md:text-6xl font-display font-bold text-brand-indigo uppercase tracking-tight leading-none mb-6">
              The <span className="text-brand-red italic">iSTEM</span> Philosophy
            </h2>
            <p className="max-w-3xl mx-auto text-lg md:text-xl text-slate-500 font-light leading-relaxed">
              Traditional schools often focus on heavy syllabi and memorization, but at QuantaNova, we believe curiosity is more powerful than fear. We bridge the gap between old teaching methods and the future by redesigning how students think.
            </p>
          </SmoothReveal>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              { l: 'i', t: 'Innovation', d: 'Innovation is a habit.' },
              { l: 'S', t: 'Science', d: 'Science is experiments.' },
              { l: 'T', t: 'Technology', d: 'Technology is creation.' },
              { l: 'E', t: 'Engineering', d: 'Engineering is building.' },
              { l: 'M', t: 'Mathematics', d: 'Math is logic.' }
            ].map((item, idx) => (
              <SmoothReveal key={idx} delay={idx * 100}>
                <div className="p-8 bg-slate-50 border border-slate-100 rounded-3xl group hover:border-brand-red/20 hover:shadow-2xl transition-all h-full">
                  <div className="text-5xl font-display font-black text-slate-200 mb-4 group-hover:text-brand-red transition-colors">{item.l}</div>
                  <h3 className="font-bold text-brand-indigo uppercase tracking-wide mb-2">{item.t}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-light">{item.d}</p>
                </div>
              </SmoothReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Signature Programs */}
      <section className="py-32 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row gap-20 items-center">
          <div className="md:w-1/2 space-y-10 text-left">
            <SmoothReveal>
              <div className="space-y-4">
                <span className="text-brand-red text-xs font-black uppercase tracking-widest">Beyond The Textbook</span>
                <h2 className="text-4xl md:text-6xl font-display font-bold text-brand-indigo uppercase tracking-tight leading-[0.9]">
                  CONCRETE <br /> ACTION
                </h2>
              </div>
            </SmoothReveal>

            <div className="space-y-8">
              {[
                {
                  title: "Weekly iSTEM Day",
                  desc: "Dedicating one full day every week to convert theory into experience. No books, just building."
                },
                {
                  title: "Novagzine: The No-Internet Initiative",
                  desc: "A student-led, handwritten monthly magazine. Research powered by books, not screens."
                },
                {
                  title: "Industry Expert Interactions",
                  desc: "Connecting students directly with distinguished professionals from global industries."
                }
              ].map((item, i) => (
                <SmoothReveal key={i} delay={i * 200}>
                  <div className="flex gap-6 items-start">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center font-display font-black text-brand-red shadow-sm shrink-0">{i + 1}</div>
                    <div className="space-y-1">
                      <h4 className="text-lg font-bold text-brand-indigo uppercase">{item.title}</h4>
                      <p className="text-slate-500 leading-relaxed font-light">{item.desc}</p>
                    </div>
                  </div>
                </SmoothReveal>
              ))}
            </div>
          </div>

          <div className="md:w-1/2 relative">
            <SmoothReveal delay={400}>
              <div className="aspect-square bg-white rounded-[4rem] border border-slate-100 shadow-2xl overflow-hidden p-3 relative">
                <img
                  src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2000"
                  alt="Innovation Lab"
                  className="w-full h-full object-cover rounded-[3.5rem]"
                />
                <div className="absolute inset-0 bg-brand-red/5 mix-blend-overlay"></div>
              </div>
              {/* Floating Badge */}
              <div className="absolute -bottom-10 -right-10 bg-brand-red p-8 rounded-[2rem] text-white shadow-2xl animate-pulse-slow text-center min-w-[140px]">
                <div className="text-4xl font-display font-black">2026</div>
                <div className="text-[8px] font-bold uppercase tracking-widest opacity-80">Opening Doors</div>
              </div>
            </SmoothReveal>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-24 bg-white text-center">
        <div className="max-w-7xl mx-auto px-6">
          <SmoothReveal>
            <h3 className="text-slate-400 font-display font-black text-[10px] uppercase tracking-[0.5em] mb-12">Academic & Tech Partners</h3>
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all font-display font-black text-xl md:text-3xl text-slate-400">
              <div>OXFORD ADVANTAGE</div>
              <div>JOIN ROBOTICS</div>
              <div>WHERESOFT</div>
            </div>
          </SmoothReveal>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-32 bg-brand-indigo relative overflow-hidden">
        <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-10">
          <SmoothReveal>
            <h2 className="text-4xl md:text-7xl font-display font-bold text-white uppercase tracking-tighter leading-none">
              Initialize Your <br /> Child's <span className="text-brand-red">Legacy</span>
            </h2>
            <p className="text-white/80 text-xl md:text-2xl font-light italic leading-relaxed">
              "Because we are the only institution where subject experts are foundational partners."
            </p>
          </SmoothReveal>

          <SmoothReveal delay={400}>
            <div className="flex justify-center pt-6">
              <Link to="/contact">
                <button className="bg-brand-red text-white px-16 py-6 rounded-full font-display font-black text-base uppercase tracking-widest hover:bg-white hover:text-brand-red transition-all shadow-2xl active:scale-95">
                  Apply for Admission
                </button>
              </Link>
            </div>
          </SmoothReveal>
        </div>
      </section>
    </div>
  );
};

export default Home;