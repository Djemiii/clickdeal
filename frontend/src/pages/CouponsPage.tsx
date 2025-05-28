import React, { useState } from 'react';
import { Search, Filter, MapPin, Tag } from 'lucide-react';
import { coupons } from '../data/coupons';
import { categories } from '../data/categories';
import CouponCard from '../components/coupons/CouponCard';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const CouponsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [locationFilter, setLocationFilter] = useState<string>('');
  const [discountFilter, setDiscountFilter] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  // Get unique cities
  const cities = [...new Set(coupons.map(coupon => coupon.location.city))];

  // Filter coupons
  const filteredCoupons = coupons.filter(coupon => {
    // Filter by active status
    if (!coupon.isActive) return false;
    
    // Filter by search query
    if (searchQuery && !coupon.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !coupon.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !coupon.businessName.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Filter by category
    if (selectedCategory && coupon.category !== selectedCategory) {
      return false;
    }
    
    // Filter by location
    if (locationFilter && coupon.location.city !== locationFilter) {
      return false;
    }
    
    // Filter by discount
    if (discountFilter && coupon.discountPercentage < discountFilter) {
      return false;
    }
    
    return true;
  });

  return (
    <div className="pt-20 pb-16">
      <div className="bg-blue-50 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6">Tous les coupons</h1>
          
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow">
              <Input
                placeholder="Rechercher des coupons..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leftIcon={<Search className="h-4 w-4" />}
                fullWidth
              />
            </div>
            
            <Button
              variant="secondary"
              leftIcon={<Filter className="h-4 w-4" />}
              onClick={() => setShowFilters(!showFilters)}
            >
              Filtres
            </Button>
          </div>
          
          {showFilters && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-4 rounded-lg shadow-sm">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Catégorie
                </label>
                <select
                  className="w-full rounded-md border border-gray-300 p-2"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">Toutes les catégories</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ville
                </label>
                <select
                  className="w-full rounded-md border border-gray-300 p-2"
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                >
                  <option value="">Toutes les villes</option>
                  {cities.map(city => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Réduction minimale
                </label>
                <select
                  className="w-full rounded-md border border-gray-300 p-2"
                  value={discountFilter?.toString() || ''}
                  onChange={(e) => setDiscountFilter(e.target.value ? Number(e.target.value) : null)}
                >
                  <option value="">Toutes les réductions</option>
                  <option value="5">5% et plus</option>
                  <option value="10">10% et plus</option>
                  <option value="15">15% et plus</option>
                  <option value="20">20% et plus</option>
                  <option value="25">25% et plus</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        {filteredCoupons.length > 0 ? (
          <>
            <p className="text-gray-600 mb-6">
              {filteredCoupons.length} coupon{filteredCoupons.length > 1 ? 's' : ''} trouvé{filteredCoupons.length > 1 ? 's' : ''}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCoupons.map(coupon => (
                <CouponCard key={coupon.id} coupon={coupon} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <Tag className="h-16 w-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Aucun coupon trouvé</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Essayez d'ajuster vos critères de recherche ou revenez plus tard pour de nouvelles offres.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CouponsPage;