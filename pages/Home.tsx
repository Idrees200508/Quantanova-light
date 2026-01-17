import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
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
                EMPOWERING <br /> FUTURE <span className="text-brand-red">QUANTUM</span> <br /> LEADERS
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
        </div>
      </section>
    </div>
  );
};

export default Home;