import { WheelPrize } from '../types';

export const wheelPrizes: WheelPrize[] = [
  {
    id: '1',
    label: '-30% Lunch chez Mama Africa',
    color: '#FF6B6B',
    probability: 10,
    businessLogo: 'https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    reward: {
      type: 'discount',
      value: '30%',
      code: 'MAMA30'
    }
  },
  {
    id: '2',
    label: '-20% Café Le Petit Coin',
    color: '#48DBFB',
    probability: 15,
    businessLogo: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    reward: {
      type: 'discount',
      value: '20%',
      code: 'CAFE20'
    }
  },
  {
    id: '3',
    label: '-50% Salon Élégance',
    color: '#FF9F43',
    probability: 5,
    businessLogo: 'https://images.pexels.com/photos/705255/pexels-photo-705255.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    reward: {
      type: 'discount',
      value: '50%',
      code: 'BEAUTY50'
    }
  },
  {
    id: '4',
    label: '-15% Supermarché Économie',
    color: '#1DD1A1',
    probability: 20,
    businessLogo: 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    reward: {
      type: 'discount',
      value: '15%',
      code: 'SUPER15'
    }
  },
  {
    id: '5',
    label: '-25% Librairie Savoir',
    color: '#54A0FF',
    probability: 15,
    businessLogo: 'https://images.pexels.com/photos/1319854/pexels-photo-1319854.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    reward: {
      type: 'discount',
      value: '25%',
      code: 'BOOK25'
    }
  },
  {
    id: '6',
    label: '-40% Garage AutoPro',
    color: '#FF9FF3',
    probability: 5,
    businessLogo: 'https://images.pexels.com/photos/3807329/pexels-photo-3807329.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    reward: {
      type: 'discount',
      value: '40%',
      code: 'AUTO40'
    }
  },
  {
    id: '7',
    label: '-10% Pharmacie Santé Plus',
    color: '#5F27CD',
    probability: 20,
    businessLogo: 'https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    reward: {
      type: 'discount',
      value: '10%',
      code: 'SANTE10'
    }
  },
  {
    id: '8',
    label: 'Réessayez demain',
    color: '#C8D6E5',
    probability: 10,
    businessLogo: 'https://images.pexels.com/photos/1314410/pexels-photo-1314410.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    reward: {
      type: 'special',
      value: 'none',
      code: ''
    }
  }
];