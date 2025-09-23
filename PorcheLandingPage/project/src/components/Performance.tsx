import React, { useState, useEffect } from 'react';
import { Gauge, Zap, Trophy } from 'lucide-react';

const Performance: React.FC = () => {
  const [animatedStats, setAnimatedStats] = useState({
    speed: 0,
    acceleration: 0,
    power: 0
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateStats();
          }
        });
      },
      { threshold: 0.5 }
    );

    const statsSection = document.querySelector('#stats');
    if (statsSection) {
      observer.observe(statsSection);
    }

    return () => observer.disconnect();
  }, []);

  const animateStats = () => {
    const duration = 2000;
    const targets = { speed: 205, acceleration: 2.8, power: 630 };
    const start = Date.now();

    const animate = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      
      const easeOut = 1 - Math.pow(1 - progress, 3);
      
      setAnimatedStats({
        speed: Math.floor(targets.speed * easeOut),
        acceleration: (targets.acceleration * easeOut).toFixed(1),
        power: Math.floor(targets.power * easeOut)
      });

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  };

  return (
    <section id="stats" className="py-32 bg-black relative">
      <div className="absolute inset-0 bg-gradient-to-r from-red-900/20 to-transparent" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">PERFORMANCE</h2>
          <p className="text-xl text-gray-400">Numbers that speak for themselves</p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          <div className="text-center group">
            <div className="mb-4 flex justify-center">
              <Gauge className="text-red-500 group-hover:scale-110 transition-transform duration-300" size={48} />
            </div>
            <div className="text-5xl md:text-6xl font-bold text-red-500 mb-2">
              {animatedStats.speed}
            </div>
            <div className="text-lg text-gray-400">MPH TOP SPEED</div>
          </div>

          <div className="text-center group">
            <div className="mb-4 flex justify-center">
              <Zap className="text-red-500 group-hover:scale-110 transition-transform duration-300" size={48} />
            </div>
            <div className="text-5xl md:text-6xl font-bold text-red-500 mb-2">
              {animatedStats.acceleration}s
            </div>
            <div className="text-lg text-gray-400">0-60 MPH</div>
          </div>

          <div className="text-center group">
            <div className="mb-4 flex justify-center">
              <Trophy className="text-red-500 group-hover:scale-110 transition-transform duration-300" size={48} />
            </div>
            <div className="text-5xl md:text-6xl font-bold text-red-500 mb-2">
              {animatedStats.power}
            </div>
            <div className="text-lg text-gray-400">HORSEPOWER</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Performance;