import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavigationProps {
  scrollY: number;
}

const Navigation: React.FC<NavigationProps> = ({ scrollY }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold tracking-wide">PORSCHE</div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <a href="#home" className="hover:text-red-500 transition-colors duration-300">Home</a>
            <a href="#models" className="hover:text-red-500 transition-colors duration-300">Models</a>
            <a href="#performance" className="hover:text-red-500 transition-colors duration-300">Performance</a>
            <a href="#gallery" className="hover:text-red-500 transition-colors duration-300">Gallery</a>
            <a href="#contact" className="hover:text-red-500 transition-colors duration-300">Contact</a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-800">
            <div className="flex flex-col space-y-4 mt-4">
              <a href="#home" className="hover:text-red-500 transition-colors duration-300">Home</a>
              <a href="#models" className="hover:text-red-500 transition-colors duration-300">Models</a>
              <a href="#performance" className="hover:text-red-500 transition-colors duration-300">Performance</a>
              <a href="#gallery" className="hover:text-red-500 transition-colors duration-300">Gallery</a>
              <a href="#contact" className="hover:text-red-500 transition-colors duration-300">Contact</a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;