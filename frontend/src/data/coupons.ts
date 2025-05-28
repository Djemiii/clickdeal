import { Coupon } from '../types';

export const coupons: Coupon[] = [
  {
    id: '1',
    businessId: 'b1',
    businessName: 'Restaurant Le Petit Coin',
    businessLogo: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    title: '15% de réduction sur tous les plats',
    description: 'Profitez d\'une réduction de 15% sur tous nos plats du jour, valable du lundi au vendredi entre 12h et 14h.',
    category: 'Restauration',
    discountPercentage: 15,
    code: 'PETITCOIN15',
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=PETITCOIN15',
    location: {
      city: 'Cotonou',
      address: '123 Rue des Restaurants, Cotonou',
      coordinates: {
        latitude: 6.36536,
        longitude: 2.41833
      }
    },
    validFrom: '2025-01-01',
    validUntil: '2025-12-31',
    conditions: 'Non cumulable avec d\'autres offres. Valable uniquement sur place.',
    views: 245,
    downloads: 87,
    conversions: 43,
    isActive: true,
    createdAt: '2024-12-01'
  },
  {
    id: '2',
    businessId: 'b2',
    businessName: 'Salon Élégance',
    businessLogo: 'https://images.pexels.com/photos/705255/pexels-photo-705255.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    title: '20% sur les soins du visage',
    description: 'Offrez-vous un moment de détente avec une réduction de 20% sur tous nos soins du visage.',
    category: 'Beauté',
    discountPercentage: 20,
    code: 'ELEGANCE20',
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=ELEGANCE20',
    location: {
      city: 'Cotonou',
      address: '45 Avenue de la Beauté, Cotonou',
      coordinates: {
        latitude: 6.37011,
        longitude: 2.43306
      }
    },
    validFrom: '2025-01-01',
    validUntil: '2025-03-31',
    conditions: 'Sur rendez-vous uniquement. Valable une seule fois par client.',
    views: 178,
    downloads: 54,
    conversions: 31,
    isActive: true,
    createdAt: '2024-12-05'
  },
  {
    id: '3',
    businessId: 'b3',
    businessName: 'Supermarché Économie',
    businessLogo: 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    title: '10% de réduction sur les produits locaux',
    description: 'Soutenez les producteurs locaux et bénéficiez d\'une réduction de 10% sur tous les produits du terroir béninois.',
    category: 'Alimentation',
    discountPercentage: 10,
    code: 'LOCAL10',
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=LOCAL10',
    location: {
      city: 'Porto-Novo',
      address: '78 Rue du Marché, Porto-Novo',
      coordinates: {
        latitude: 6.49647,
        longitude: 2.60359
      }
    },
    validFrom: '2025-01-01',
    validUntil: '2025-06-30',
    conditions: 'Valable uniquement sur les produits marqués "Produit local".',
    views: 312,
    downloads: 145,
    conversions: 98,
    isActive: true,
    createdAt: '2024-12-03'
  },
  {
    id: '4',
    businessId: 'b4',
    businessName: 'Pharmacie Santé Plus',
    businessLogo: 'https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    title: '5% sur les produits d\'hygiène',
    description: 'Prenez soin de vous avec une réduction de 5% sur tous nos produits d\'hygiène et de soins personnels.',
    category: 'Santé',
    discountPercentage: 5,
    code: 'HYGIENE5',
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=HYGIENE5',
    location: {
      city: 'Cotonou',
      address: '22 Boulevard de la Santé, Cotonou',
      coordinates: {
        latitude: 6.36814,
        longitude: 2.45237
      }
    },
    validFrom: '2025-01-01',
    validUntil: '2025-12-31',
    conditions: 'Non cumulable avec d\'autres offres promotionnelles.',
    views: 156,
    downloads: 67,
    conversions: 42,
    isActive: true,
    createdAt: '2024-12-07'
  },
  {
    id: '5',
    businessId: 'b5',
    businessName: 'Librairie Savoir',
    businessLogo: 'https://images.pexels.com/photos/1319854/pexels-photo-1319854.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    title: '15% sur les fournitures scolaires',
    description: 'Préparez la rentrée avec une réduction de 15% sur toutes les fournitures scolaires.',
    category: 'Éducation',
    discountPercentage: 15,
    code: 'RENTREE15',
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=RENTREE15',
    location: {
      city: 'Parakou',
      address: '67 Avenue des Écoles, Parakou',
      coordinates: {
        latitude: 9.33716,
        longitude: 2.63031
      }
    },
    validFrom: '2025-08-01',
    validUntil: '2025-09-30',
    conditions: 'Valable pour un achat minimum de 5000 FCFA.',
    views: 203,
    downloads: 98,
    conversions: 76,
    isActive: false,
    createdAt: '2024-12-10'
  },
  {
    id: '6',
    businessId: 'b6',
    businessName: 'Garage AutoPro',
    businessLogo: 'https://images.pexels.com/photos/3807329/pexels-photo-3807329.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    title: '25% sur la vidange',
    description: 'Entretenez votre véhicule avec une réduction de 25% sur le service de vidange complet.',
    category: 'Automobile',
    discountPercentage: 25,
    code: 'VIDANGE25',
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=VIDANGE25',
    location: {
      city: 'Cotonou',
      address: '110 Route des Mécaniciens, Cotonou',
      coordinates: {
        latitude: 6.35273,
        longitude: 2.39856
      }
    },
    validFrom: '2025-01-01',
    validUntil: '2025-03-31',
    conditions: 'Valable pour tous types de véhicules. Sur rendez-vous uniquement.',
    views: 134,
    downloads: 45,
    conversions: 23,
    isActive: true,
    createdAt: '2024-12-12'
  }
];