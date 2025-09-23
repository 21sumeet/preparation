import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Models from './components/Models';
import Performance from './components/Performance';
import Gallery from './components/Gallery';
import CTA from './components/CTA';
import Footer from './components/Footer';

function App() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-black text-white overflow-x-hidden">
      <Navigation scrollY={scrollY} />
      <Hero scrollY={scrollY} />
      <Models />
      <Performance />
      <Gallery />
      <CTA />
      <Footer />
    </div>
  );
}

export default App;