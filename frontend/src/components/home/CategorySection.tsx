import React from 'react';
import { Link } from 'react-router-dom';
import { Utensils, Scissors, ShoppingBag, Shirt, Book, Dumbbell, Car, Film, Home, ChevronFirst as FirstAid } from 'lucide-react';
import { categories } from '../../data/categories';

const CategorySection: React.FC = () => {
  // Icon mapping
  const getIcon = (iconName: string) => {
    const iconProps = { className: "h-6 w-6" };
    switch (iconName) {
      case 'utensils': return <Utensils {...iconProps} />;
      case 'scissors': return <Scissors {...iconProps} />;
      case 'shopping-bag': return <ShoppingBag {...iconProps} />;
      case 'shirt': return <Shirt {...iconProps} />;
      case 'book': return <Book {...iconProps} />;
      case 'dumbbell': return <Dumbbell {...iconProps} />;
      case 'car': return <Car {...iconProps} />;
      case 'film': return <Film {...iconProps} />;
      case 'home': return <Home {...iconProps} />;
      case 'first-aid': return <FirstAid {...iconProps} />;
      default: return <ShoppingBag {...iconProps} />;
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">Parcourir par catégorie</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explorez nos offres par catégories pour trouver rapidement les coupons qui correspondent à vos besoins.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {categories.map((category) => (
            <Link 
              to={`/category/${category.name.toLowerCase()}`} 
              key={category.id}
              className="flex flex-col items-center p-4 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div 
                className="w-14 h-14 rounded-full flex items-center justify-center mb-3"
                style={{ backgroundColor: `${category.color}20`, color: category.color }}
              >
                {getIcon(category.icon)}
              </div>
              <span className="text-sm font-medium text-gray-800">{category.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;