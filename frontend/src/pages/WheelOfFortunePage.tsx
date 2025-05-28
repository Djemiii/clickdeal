import React from 'react';
import WheelOfFortune from '../components/fortune/WheelOfFortune';

const WheelOfFortunePage: React.FC = () => {
  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-3">Roue de la Fortune</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Tentez votre chance et faites tourner la roue pour gagner des réductions supplémentaires
            et des avantages exclusifs utilisables chez nos partenaires.
          </p>
        </div>
        
        <WheelOfFortune />
        
        <div className="mt-16 max-w-2xl mx-auto bg-blue-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Comment ça marche</h2>
          <ol className="list-decimal pl-5 space-y-2">
            <li className="text-gray-700">
              Faites tourner la roue une fois par jour pour tenter de gagner des avantages supplémentaires.
            </li>
            <li className="text-gray-700">
              Si vous gagnez, un code unique s'affichera à l'écran.
            </li>
            <li className="text-gray-700">
              Présentez ce code aux commerçants participants pour bénéficier de votre réduction supplémentaire.
            </li>
            <li className="text-gray-700">
              Les gains sont cumulables avec les coupons disponibles sur ClickDeal, 
              pour des économies encore plus importantes !
            </li>
          </ol>
          
          <div className="mt-4 text-sm text-gray-500">
            <p>* Chaque utilisateur peut faire tourner la roue une fois par jour.</p>
            <p>* Les gains sont valables pendant 48 heures après avoir été obtenus.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WheelOfFortunePage;