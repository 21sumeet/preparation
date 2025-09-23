import React from 'react';

const CTA: React.FC = () => {
  return (
    <section className="py-32 bg-gradient-to-r from-red-900 to-red-700 text-center">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-5xl md:text-6xl font-bold mb-8">READY TO DRIVE?</h2>
        <p className="text-xl mb-12 opacity-90">
          Configure your dream Porsche and experience what pure performance feels like.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <button className="bg-black hover:bg-gray-900 px-12 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
            BUILD & PRICE
          </button>
          <button className="border-2 border-white hover:bg-white hover:text-red-600 px-12 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105">
            FIND A DEALER
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTA;