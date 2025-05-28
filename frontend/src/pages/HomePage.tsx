import React from 'react';
import Hero from '../components/home/Hero';
import CategorySection from '../components/home/CategorySection';
import PopularCoupons from '../components/home/PopularCoupons';
import HowItWorks from '../components/home/HowItWorks';
import FAQSection from '../components/home/FAQSection';

const HomePage: React.FC = () => {
  return (
    <div>
      <Hero />
      <CategorySection />
      <PopularCoupons />
      <HowItWorks />
      <FAQSection />
    </div>
  );
};

export default HomePage;