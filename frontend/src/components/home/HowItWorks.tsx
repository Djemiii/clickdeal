import React from 'react';
import { Search, Tag, Scan, Percent } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: <Search className="h-10 w-10 text-blue-600" />,
      title: 'Trouvez',
      description: 'Parcourez des centaines de coupons pour trouver les meilleures offres près de chez vous.'
    },
    {
      icon: <Tag className="h-10 w-10 text-blue-600" />,
      title: 'Téléchargez',
      description: 'Enregistrez le coupon ou copiez le code de réduction en un seul clic.'
    },
    {
      icon: <Scan className="h-10 w-10 text-blue-600" />,
      title: 'Présentez',
      description: 'Montrez le coupon au marchand ou utilisez le code promo lors de votre achat.'
    },
    {
      icon: <Percent className="h-10 w-10 text-blue-600" />,
      title: 'Économisez',
      description: 'Profitez de vos remises et économisez à chaque achat auprès des commerces locaux.'
    }
  ];

  return (
    <section className="py-16 bg-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">Comment ça marche</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            ClickDeal rend l'utilisation des coupons simple et rapide. Suivez ces étapes pour commencer à économiser dès aujourd'hui.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg p-6 shadow-sm relative"
            >
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 right-0 transform translate-x-1/2 z-10">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 0L25 10L15 10L20 0Z" fill="#BFDBFE" transform="rotate(90 20 20)" />
                    <path d="M23 17.5H17V22.5H23V17.5Z" fill="#BFDBFE"/>
                  </svg>
                </div>
              )}
              
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                {step.icon}
              </div>
              
              <h3 className="text-xl font-semibold mb-2 text-center">{step.title}</h3>
              
              <p className="text-gray-600 text-center">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;