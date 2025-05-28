import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Clock, MapPin, Copy, Download, CheckCircle, Percent, 
  AlertCircle, ChevronLeft, Navigation 
} from 'lucide-react';
import { coupons } from '../data/coupons';
import { Coupon } from '../types';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';

const CouponDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [coupon, setCoupon] = useState<Coupon | null>(null);
  const [copied, setCopied] = useState(false);
  const [showAllConditions, setShowAllConditions] = useState(false);

  useEffect(() => {
    if (id) {
      const foundCoupon = coupons.find(c => c.id === id);
      if (foundCoupon) {
        setCoupon(foundCoupon);
      }
    }
  }, [id]);

  const handleCopyCode = () => {
    if (coupon) {
      navigator.clipboard.writeText(coupon.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR').format(date);
  };

  if (!coupon) {
    return (
      <div className="pt-24 pb-16 container mx-auto px-4 text-center">
        <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-4">Coupon non trouvé</h1>
        <p className="mb-6">Le coupon que vous recherchez n'existe pas ou a été supprimé.</p>
        <Button 
          variant="primary" 
          as={Link} 
          to="/coupons"
          leftIcon={<ChevronLeft className="h-4 w-4" />}
        >
          Retour aux coupons
        </Button>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <Button
            variant="outline"
            as={Link}
            to="/coupons"
            leftIcon={<ChevronLeft className="h-4 w-4" />}
            className="mb-6"
          >
            Retour aux coupons
          </Button>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="md:flex">
            {/* Left Column: Image */}
            <div className="md:w-1/2 relative">
              <img 
                src={coupon.businessLogo} 
                alt={coupon.businessName} 
                className="w-full h-64 md:h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <Badge 
                  variant="primary" 
                  size="lg"
                  className="font-bold text-lg"
                >
                  -{coupon.discountPercentage}%
                </Badge>
              </div>
            </div>
            
            {/* Right Column: Details */}
            <div className="md:w-1/2 p-6 md:p-8">
              <div className="mb-6">
                <h1 className="text-2xl md:text-3xl font-bold mb-2">{coupon.title}</h1>
                <p className="text-lg text-gray-600">{coupon.businessName}</p>
              </div>
              
              <div className="mb-6">
                <p className="text-gray-700 mb-4">{coupon.description}</p>
                
                <div className="flex items-center text-gray-600 mb-2">
                  <Clock className="h-5 w-5 mr-2" />
                  <span>Valable du {formatDate(coupon.validFrom)} au {formatDate(coupon.validUntil)}</span>
                </div>
                
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>{coupon.location.address}, {coupon.location.city}</span>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Conditions d'utilisation</h3>
                <p className={`text-gray-700 ${!showAllConditions && 'line-clamp-2'}`}>
                  {coupon.conditions}
                </p>
                {coupon.conditions.length > 120 && (
                  <button
                    onClick={() => setShowAllConditions(!showAllConditions)}
                    className="text-blue-600 text-sm mt-1 hover:underline"
                  >
                    {showAllConditions ? 'Voir moins' : 'Voir plus'}
                  </button>
                )}
              </div>
              
              <div className="flex flex-col space-y-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Code promo:</p>
                  <div className="flex items-center bg-gray-100 rounded-md p-3">
                    <code className="text-gray-800 font-mono bg-transparent flex-grow text-center text-lg">
                      {coupon.code}
                    </code>
                    <Button 
                      variant="text" 
                      onClick={handleCopyCode} 
                      className="ml-2"
                      aria-label="Copier le code"
                    >
                      {copied ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <Copy className="h-5 w-5" />
                      )}
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <Button 
                    variant="outline" 
                    leftIcon={<Download className="h-4 w-4" />}
                    fullWidth
                  >
                    Télécharger le QR Code
                  </Button>
                  
                  <Button 
                    variant="primary" 
                    leftIcon={<Navigation className="h-4 w-4" />}
                    fullWidth
                    onClick={() => {
                      window.open(`https://www.google.com/maps/search/?api=1&query=${coupon.location.coordinates.latitude},${coupon.location.coordinates.longitude}`, '_blank');
                    }}
                  >
                    S'y rendre
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-6 border-t border-gray-200">
            <div className="flex flex-wrap justify-around text-center">
              <div className="px-4 py-2">
                <p className="text-sm text-gray-500">Vues</p>
                <p className="text-xl font-semibold">{coupon.views}</p>
              </div>
              <div className="px-4 py-2">
                <p className="text-sm text-gray-500">Téléchargements</p>
                <p className="text-xl font-semibold">{coupon.downloads}</p>
              </div>
              <div className="px-4 py-2">
                <p className="text-sm text-gray-500">Utilisations</p>
                <p className="text-xl font-semibold">{coupon.conversions}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CouponDetailPage;