import React from 'react';

const Models: React.FC = () => {
  const models = [
    {
      name: "911 CARRERA",
      price: "FROM $99,200",
      image: "https://images.pexels.com/photos/544542/pexels-photo-544542.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      description: "The iconic sports car that defines Porsche"
    },
    {
      name: "TAYCAN",
      price: "FROM $79,900",
      image: "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      description: "Electric performance redefined"
    },
    {
      name: "PANAMERA",
      price: "FROM $87,200",
      image: "https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      description: "Luxury meets performance"
    }
  ];

  return (
    <section id="models" className="py-32 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">ICONIC MODELS</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Each Porsche is a masterpiece of engineering, designed to deliver an unparalleled driving experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {models.map((model, index) => (
            <div 
              key={index} 
              className="group relative overflow-hidden bg-gray-800 hover:bg-gray-700 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl cursor-pointer"
            >
              <div className="aspect-w-16 aspect-h-12 overflow-hidden">
                <img 
                  src={model.image} 
                  alt={model.name}
                  className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2 group-hover:text-red-500 transition-colors duration-300">
                  {model.name}
                </h3>
                <p className="text-red-600 text-lg font-semibold mb-2">{model.price}</p>
                <p className="text-gray-400">{model.description}</p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Models;