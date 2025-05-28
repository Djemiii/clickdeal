import React from 'react';
import { MapPin, Phone, Mail, ExternalLink } from 'lucide-react';
import { coupons } from '../data/coupons';
import Button from '../components/ui/Button';

const PartnersPage: React.FC = () => {
  // Get unique businesses from coupons
  const partners = [...new Map(coupons.map(coupon => [
    coupon.businessId,
    {
      id: coupon.businessId,
      name: coupon.businessName,
      logo: coupon.businessLogo,
      location: coupon.location,
      activeCoupons: coupons.filter(c => 
        c.businessId === coupon.businessId && c.isActive
      ).length
    }
  ])).values()];

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">Nos Partenaires</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Découvrez les entreprises locales qui font confiance à ClickDeal pour 
            proposer des offres exclusives à leurs clients.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {partners.map(partner => (
            <div 
              key={partner.id}
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={partner.logo}
                  alt={partner.name}
                  className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                />
              </div>

              <div className="p-6">
                <h2 className="text-xl font-bold mb-2">{partner.name}</h2>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{partner.location.address}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Phone className="h-4 w-4 mr-2" />
                    <span>+229 XX XX XX XX</span>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-blue-800">
                    <span className="font-bold">{partner.activeCoupons}</span> offre{partner.activeCoupons > 1 ? 's' : ''} active{partner.activeCoupons > 1 ? 's' : ''}
                  </p>
                </div>

                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    leftIcon={<ExternalLink className="h-4 w-4" />}
                    className="flex-1"
                    onClick={() => {
                      window.open(`https://www.google.com/maps/search/?api=1&query=${partner.location.coordinates.latitude},${partner.location.coordinates.longitude}`, '_blank');
                    }}
                  >
                    Y aller
                  </Button>
                  <Button
                    variant="primary"
                    className="flex-1"
                    as="link"
                    to={`/partners/${partner.id}`}
                  >
                    Voir les offres
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PartnersPage;