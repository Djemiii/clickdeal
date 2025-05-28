import React, { useState, useRef, useEffect } from 'react';
import { motion, useAnimation, useMotionValue } from 'framer-motion';
import { useGesture } from '@use-gesture/react';
import { useWindowSize, useMedia } from 'react-use';
import confetti from 'canvas-confetti';
import { HelpCircle, Gift } from 'lucide-react';
import { wheelPrizes } from '../../data/wheelPrizes';
import Button from '../ui/Button';

const WheelOfFortune: React.FC = () => {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [prize, setPrize] = useState<typeof wheelPrizes[0] | null>(null);
  const [showRules, setShowRules] = useState(false);
  const wheelRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const wheelRotation = useMotionValue(0);
  const { width } = useWindowSize();
  const isMobile = useMedia('(max-width: 768px)');
  
  const spinWheel = async () => {
    if (isSpinning) return;
    
    setPrize(null);
    setIsSpinning(true);
    
    // Determine the winning prize
    const weights = wheelPrizes.map(prize => prize.probability);
    const totalWeight = weights.reduce((a, b) => a + b, 0);
    let random = Math.random() * totalWeight;
    
    let winIndex = 0;
    for (let i = 0; i < weights.length; i++) {
      random -= weights[i];
      if (random <= 0) {
        winIndex = i;
        break;
      }
    }
    
    // Calculate the rotation
    const segmentSize = 360 / wheelPrizes.length;
    const destinationDegree = 360 - (winIndex * segmentSize) - (segmentSize / 2);
    const spins = 5; // Number of full rotations
    const newRotation = spins * 360 + destinationDegree;
    
    // Animate the wheel
    await controls.start({
      rotate: newRotation,
      transition: {
        duration: 5,
        ease: [0.3, 1, 0.7, 1],
      }
    });
    
    // Show prize and trigger effects
    setIsSpinning(false);
    setPrize(wheelPrizes[winIndex]);
    
    if (wheelPrizes[winIndex].reward.type !== 'special') {
      // Trigger confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      
      // Trigger haptic feedback on mobile
      if (isMobile && window.navigator.vibrate) {
        window.navigator.vibrate(200);
      }
    }
  };

  // Handle touch/drag gestures
  const bind = useGesture(
    {
      onDrag: ({ movement: [x, y], velocity }) => {
        if (!isSpinning) {
          const angle = Math.atan2(y, x) * (180 / Math.PI);
          wheelRotation.set(angle);
        }
      },
      onDragEnd: ({ velocity }) => {
        if (!isSpinning && velocity > 1) {
          spinWheel();
        }
      },
    },
    {
      drag: {
        from: () => [wheelRotation.get(), 0],
      },
    }
  );

  const wheelSize = isMobile ? Math.min(width - 40, 320) : 400;

  return (
    <div className="flex flex-col items-center max-w-4xl mx-auto relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl blur-3xl" />
      
      <div className="relative z-10">
        {/* Rules Button */}
        <button
          onClick={() => setShowRules(!showRules)}
          className="self-end mb-4 text-blue-600 hover:text-blue-700 flex items-center bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm transition-all hover:shadow-md"
        >
          <HelpCircle className="h-5 w-5 mr-2" />
          <span>Comment ça marche ?</span>
        </button>
        
        {/* Rules Panel */}
        {showRules && (
          <div className="w-full bg-white/90 backdrop-blur-sm rounded-2xl p-6 mb-8 shadow-xl">
            <h3 className="font-semibold mb-4 text-gray-800">Comment jouer ?</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Faites tourner la roue une fois par jour</li>
              <li>Sur mobile, vous pouvez glisser pour faire tourner la roue</li>
              <li>Les gains sont valables pendant 48h</li>
              <li>Les réductions sont cumulables avec les coupons existants</li>
            </ul>
          </div>
        )}
        
        <div className="relative mb-12">
          {/* Marker/Pointer */}
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
            <div className="w-8 h-12 relative">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-red-600 rounded-full shadow-lg" />
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[16px] border-l-transparent border-r-[16px] border-r-transparent border-t-[24px] border-t-red-600" />
            </div>
          </div>
          
          {/* Wheel Container with 3D effect */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 rounded-full transform -skew-y-1 translate-y-2 blur-md opacity-30" />
            
            {/* Wheel */}
            <motion.div 
              ref={wheelRef}
              {...bind()}
              animate={controls}
              style={{ 
                width: wheelSize,
                height: wheelSize,
                rotate: wheelRotation
              }}
              className="rounded-full relative border-8 border-gray-800 shadow-[0_0_50px_rgba(0,0,0,0.3)] overflow-hidden cursor-grab active:cursor-grabbing bg-white transform-gpu"
            >
              {wheelPrizes.map((prize, index) => {
                const segmentSize = 360 / wheelPrizes.length;
                const rotation = index * segmentSize;
                return (
                  <div 
                    key={prize.id}
                    className="absolute top-0 right-0 bottom-0 left-0 transition-transform"
                    style={{ 
                      transform: `rotate(${rotation}deg)`,
                      clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.cos((segmentSize * Math.PI) / 180)}% ${50 - 50 * Math.sin((segmentSize * Math.PI) / 180)}%)`,
                      backgroundColor: prize.color
                    }}
                  >
                    <div 
                      className="absolute flex flex-col items-center"
                      style={{ 
                        top: '15%', 
                        left: '50%', 
                        transform: `translate(-50%, 0%) rotate(${segmentSize / 2}deg)`,
                        width: '120px'
                      }}
                    >
                      <img 
                        src={prize.businessLogo} 
                        alt=""
                        className="w-10 h-10 rounded-full object-cover mb-2 border-2 border-white shadow-md"
                      />
                      <span className="text-white text-sm font-semibold text-center leading-tight whitespace-normal px-2 drop-shadow-md">
                        {prize.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
        
        {/* Prize Display */}
        {prize && (
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mb-8 p-8 bg-white rounded-2xl border border-blue-200 text-center shadow-xl"
          >
            <div className="flex items-center justify-center mb-6">
              <Gift className="h-12 w-12 text-blue-600 mr-3" />
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Félicitations !
              </h3>
            </div>
            
            <div className="flex items-center justify-center mb-6">
              <img 
                src={prize.businessLogo} 
                alt="" 
                className="w-16 h-16 rounded-full object-cover mr-4 border-4 border-blue-100"
              />
              <div className="text-left">
                <p className="text-xl font-semibold">{prize.label}</p>
                {prize.reward.code && (
                  <p className="text-gray-600">
                    Code: <span className="font-mono font-bold text-blue-700">{prize.reward.code}</span>
                  </p>
                )}
              </div>
            </div>
            
            <p className="text-gray-600">
              Valable pendant 48h. Présentez ce code en magasin.
            </p>
          </motion.div>
        )}
        
        {/* Spin Button */}
        <Button 
          size="lg"
          variant="primary"
          onClick={spinWheel}
          disabled={isSpinning}
          className={`px-8 py-4 text-lg shadow-xl hover:shadow-2xl transform transition-all ${
            isSpinning ? 'opacity-70' : 'hover:-translate-y-1'
          }`}
        >
          {isSpinning ? 'La roue tourne...' : 'Faire tourner la roue'}
        </Button>
        
        <p className="text-sm text-gray-500 mt-6 text-center">
          Tentez votre chance une fois par jour pour gagner des réductions exclusives !
        </p>
      </div>
    </div>
  );
};

export default WheelOfFortune;