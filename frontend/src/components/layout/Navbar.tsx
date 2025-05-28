import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X, Bell, User, Tag } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navItems = [
    { path: '/', label: 'Accueil' },
    { path: '/coupons', label: 'Coupons' },
    { path: '/partners', label: 'Partenaires' },
    { path: '/wheel-of-fortune', label: 'Roue de la fortune' },
    { path: '/business', label: 'Pour les entreprises' }
  ];

  const getNavbarStyle = () => {
    if (!isHomePage) return 'bg-white shadow-md';
    if (isScrolled) return 'bg-white shadow-md';
    return 'bg-transparent';
  };

  const getTextStyle = () => {
    if (!isHomePage) return 'text-gray-700';
    if (isScrolled) return 'text-gray-700';
    return 'text-white';
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 ${getNavbarStyle()}`}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Tag className={`h-8 w-8 ${isHomePage && !isScrolled ? 'text-white' : 'text-blue-600'}`} />
            <span className={`text-xl font-bold ${isHomePage && !isScrolled ? 'text-white' : 'text-blue-600'}`}>
              ClickDeal
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`font-medium transition-colors ${
                  isHomePage && !isScrolled
                    ? 'text-white hover:text-blue-200'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button
              variant={isHomePage && !isScrolled ? 'text' : 'outline'}
              as={Link}
              to="/login"
              className={isHomePage && !isScrolled ? 'text-white border-white hover:bg-white/10' : ''}
            >
              Connexion
            </Button>
            <Button
              variant={isHomePage && !isScrolled ? 'outline' : 'primary'}
              as={Link}
              to="/signup"
              className={isHomePage && !isScrolled ? 'text-white border-white hover:bg-white/10' : ''}
            >
              Inscription
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 rounded-md ${getTextStyle()}`}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 top-16 bg-white z-40">
            <div className="p-4 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="block py-2 text-gray-700 hover:text-blue-600 font-medium"
                >
                  {item.label}
                </Link>
              ))}
              <hr className="my-4" />
              <div className="space-y-2">
                <Button
                  variant="outline"
                  as={Link}
                  to="/login"
                  fullWidth
                >
                  Connexion
                </Button>
                <Button
                  variant="primary"
                  as={Link}
                  to="/signup"
                  fullWidth
                >
                  Inscription
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;