export interface Coupon {
  id: string;
  businessId: string;
  businessName: string;
  businessLogo: string;
  title: string;
  description: string;
  category: string;
  discountPercentage: number;
  code: string;
  qrCodeUrl: string;
  location: {
    city: string;
    address: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
  validFrom: string;
  validUntil: string;
  conditions: string;
  views: number;
  downloads: number;
  conversions: number;
  isActive: boolean;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface WheelPrize {
  id: string;
  label: string;
  color: string;
  probability: number;
  businessLogo: string;
  reward: {
    type: 'discount' | 'freebie' | 'special';
    value: string;
    code: string;
  };
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'new' | 'expiring' | 'popular';
  couponId: string;
  createdAt: string;
  isRead: boolean;
}

export interface FAQ {
  question: string;
  answer: string;
}