import React from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';

interface HeroProps {
  scrollY: number;
}

const Hero: React.FC<HeroProps> = ({ scrollY }) => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-110"
        style={{
          backgroundImage: 'url("https://images.pexels.com/photos/337909/pexels-photo-337909.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop")',
          transform: `translateY(${scrollY * 0.5}px) scale(1.1)`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
      
      {/* Hero Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 text-left">
        <div className="max-w-3xl animate-fade-in-up">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-none">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
              PURE
            </span>
            <br />
            <span className="text-red-600 animate-pulse">PERFORMANCE</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300 font-light">
            Experience the ultimate driving machine. Where engineering excellence meets artistic beauty.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="group bg-red-600 hover:bg-red-700 px-8 py-4 rounded-none text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
              EXPLORE MODELS
              <ArrowRight className="inline-block ml-2 group-hover:translate-x-2 transition-transform duration-300" size={20} />
            </button>
            <button className="border-2 border-white hover:bg-white hover:text-black px-8 py-4 rounded-none text-lg font-semibold transition-all duration-300 transform hover:scale-105">
              CONFIGURE YOURS
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown size={32} className="text-white/70" />
      </div>
    </section>
  );
};

export default Hero;