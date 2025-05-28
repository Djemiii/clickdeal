import React from 'react';
import { Search, MapPin } from 'lucide-react';
import Button from '../ui/Button';

const Hero: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white overflow-hidden pt-28 pb-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-white"></div>
        <div className="absolute top-20 left-20 w-40 h-40 rounded-full bg-white"></div>
        <div className="absolute bottom-10 left-40 w-60 h-60 rounded-full bg-white"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Des économies à portée de <span className="text-yellow-300">clic</span>
          </h1>
          
          <p className="text-lg md:text-xl text-blue-100 mb-8">
            Découvrez les meilleures offres des commerces locaux au Bénin. 
            Économisez sur vos achats quotidiens grâce à des coupons exclusifs.
          </p>
          
          <div className="bg-white rounded-lg p-2 shadow-lg flex flex-col sm:flex-row items-center">
            <div className="relative flex-grow mb-2 sm:mb-0 w-full sm:w-auto">
              <input
                type="text"
                placeholder="Rechercher un coupon..."
                className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-800 focus:outline-none"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
            
            <div className="relative flex-grow mb-2 sm:mb-0 sm:mx-2 w-full sm:w-auto">
              <input
                type="text"
                placeholder="Localisation..."
                className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-800 focus:outline-none"
              />
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
            
            <Button
              variant="primary"
              className="w-full sm:w-auto px-6"
              size="lg"
            >
              Rechercher
            </Button>
          </div>
          
          <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
            <span className="text-blue-200">Populaires:</span>
            <a href="#" className="text-white hover:text-yellow-300 transition-colors">Restaurants</a>
            <a href="#" className="text-white hover:text-yellow-300 transition-colors">Beauté</a>
            <a href="#" className="text-white hover:text-yellow-300 transition-colors">Mode</a>
            <a href="#" className="text-white hover:text-yellow-300 transition-colors">Alimentation</a>
          </div>
        </div>
      </div>
      
      {/* Wave Shape */}
      <div className="absolute bottom-0 left-0 right-0 h-16">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,224L80,213.3C160,203,320,181,480,181.3C640,181,800,203,960,197.3C1120,192,1280,160,1360,144L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default Hero;