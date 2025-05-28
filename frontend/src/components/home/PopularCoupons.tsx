import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { coupons } from '../../data/coupons';
import CouponCard from '../coupons/CouponCard';
import Button from '../ui/Button';

const PopularCoupons: React.FC = () => {
  // Get coupons with most views
  const popularCoupons = [...coupons]
    .filter(coupon => coupon.isActive)
    .sort((a, b) => b.views - a.views)
    .slice(0, 4);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold">Offres populaires</h2>
          <Button 
            variant="text" 
            rightIcon={<ArrowRight className="h-4 w-4" />}
            as={Link}
            to="/coupons"
          >
            Voir toutes les offres
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularCoupons.map((coupon) => (
            <CouponCard key={coupon.id} coupon={coupon} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularCoupons;