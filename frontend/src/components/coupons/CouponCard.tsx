import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, MapPin, Copy, Download, CheckCircle, Scissors } from 'lucide-react';
import { Coupon } from '../../types';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

interface CouponCardProps {
  coupon: Coupon;
}

const CouponCard: React.FC<CouponCardProps> = ({ coupon }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(coupon.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR').format(date);
  };

  return (
    <div className="relative bg-white rounded-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Coupon Edge Effect */}
      <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-3 bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
      <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-b from-transparent via-gray-200 to-transparent"></div>
      <div className="absolute right-0 top-0 bottom-0 w-3 bg-gradient-to-b from-transparent via-gray-200 to-transparent"></div>
      
      {/* Scissors Icon */}
      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 text-gray-400">
        <Scissors className="h-6 w-6" />
      </div>

      {/* Dotted Border */}
      <div className="m-3 border-2 border-dashed border-gray-300 rounded-lg">
        <div className="p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <img 
              src={coupon.businessLogo} 
              alt={coupon.businessName}
              className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
            />
            <Badge 
              variant="primary" 
              size="lg"
              className="text-xl font-bold"
            >
              -{coupon.discountPercentage}%
            </Badge>
          </div>

          {/* Content */}
          <div className="mb-4">
            <h3 className="text-xl font-bold mb-1 line-clamp-2">{coupon.title}</h3>
            <p className="text-gray-600 font-medium mb-2">{coupon.businessName}</p>
            <p className="text-gray-600 text-sm line-clamp-2 mb-3">{coupon.description}</p>
            
            <div className="space-y-2 text-sm text-gray-500">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                <span>Valable jusqu'au {formatDate(coupon.validUntil)}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                <span>{coupon.location.city}</span>
              </div>
            </div>
          </div>

          {/* Code Section */}
          <div className="bg-blue-50 p-3 rounded-lg mb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-blue-600 font-medium mb-1">CODE PROMO</p>
                <code className="text-lg font-bold font-mono text-blue-800">{coupon.code}</code>
              </div>
              <Button 
                variant="text" 
                onClick={handleCopyCode}
                className="text-blue-600 hover:text-blue-700"
              >
                {copied ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : (
                  <Copy className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              leftIcon={<Download className="h-4 w-4" />}
              className="flex-1"
            >
              QR Code
            </Button>
            <Button 
              variant="primary"
              className="flex-1"
              as={Link}
              to={`/coupon/${coupon.id}`}
            >
              Détails
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CouponCard;