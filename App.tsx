
import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import IStem from './pages/IStem';
import Academics from './pages/Academics';
import Experience from './pages/Experience';
import Manifesto from './pages/Manifesto';
import Contact from './pages/Contact';
import { SiteProvider } from './contexts/SiteContext';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

const AppLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-brand-indigo relative">
      <ScrollToTop />
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/istem" element={<IStem />} />
          <Route path="/academics" element={<Academics />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/manifesto" element={<Manifesto />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <SiteProvider>
      <Router>
        <AppLayout />
      </Router>
    </SiteProvider>
  );
};

export default App;
