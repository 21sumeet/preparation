import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-gray-800 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">PORSCHE</h3>
            <p className="text-gray-400">Engineering excellence since 1931</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">MODELS</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors duration-300">911</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-300">Taycan</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-300">Panamera</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-300">Cayenne</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">SERVICES</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors duration-300">Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-300">Parts</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-300">Financing</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-300">Insurance</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">COMPANY</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors duration-300">About</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-300">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-300">Press</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-300">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Porsche. All rights reserved. | Privacy Policy | Terms of Service</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;