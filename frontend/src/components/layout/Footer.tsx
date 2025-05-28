import React from 'react';
import { Link } from 'react-router-dom';
import { Tag, Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <Tag className="h-10 w-10 text-blue-300" />
              <span className="text-2xl font-bold text-white">ClickDeal</span>
            </div>
            <p className="text-blue-200 leading-relaxed">
              La meilleure plateforme de coupons au Bénin. 
              Trouvez des promotions exclusives auprès des 
              entreprises locales et économisez à chaque achat.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-blue-300 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-blue-300 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-blue-300 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full">
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-blue-200">Liens Rapides</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/" className="text-blue-200 hover:text-white transition-colors flex items-center">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/coupons" className="text-blue-200 hover:text-white transition-colors flex items-center">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                  Tous les coupons
                </Link>
              </li>
              <li>
                <Link to="/wheel-of-fortune" className="text-blue-200 hover:text-white transition-colors flex items-center">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                  Roue de la fortune
                </Link>
              </li>
              <li>
                <Link to="/business" className="text-blue-200 hover:text-white transition-colors flex items-center">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                  Espace entreprises
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-blue-200 hover:text-white transition-colors flex items-center">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                  À propos
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-blue-200">Catégories</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/category/restauration" className="text-blue-200 hover:text-white transition-colors flex items-center">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                  Restauration
                </Link>
              </li>
              <li>
                <Link to="/category/beaute" className="text-blue-200 hover:text-white transition-colors flex items-center">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                  Beauté & Bien-être
                </Link>
              </li>
              <li>
                <Link to="/category/mode" className="text-blue-200 hover:text-white transition-colors flex items-center">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                  Mode & Accessoires
                </Link>
              </li>
              <li>
                <Link to="/category/alimentation" className="text-blue-200 hover:text-white transition-colors flex items-center">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                  Alimentation
                </Link>
              </li>
              <li>
                <Link to="/category/services" className="text-blue-200 hover:text-white transition-colors flex items-center">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                  Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="bg-white/5 p-6 rounded-2xl backdrop-blur-sm">
            <h3 className="text-lg font-semibold mb-6 text-blue-200">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="h-6 w-6 text-blue-300 mt-1 flex-shrink-0" />
                <span className="text-blue-200">
                  123 Rue du Commerce, Cotonou, Bénin
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-6 w-6 text-blue-300 flex-shrink-0" />
                <span className="text-blue-200">+229 12 34 56 78</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-6 w-6 text-blue-300 flex-shrink-0" />
                <span className="text-blue-200">contact@clickdeal.bj</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-blue-800/50 text-center">
          <p className="text-blue-200">
            &copy; {new Date().getFullYear()} ClickDeal. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;