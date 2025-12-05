import { useState, useEffect } from 'react';
import { User, MapPin } from 'lucide-react';
import type { CustomerInfo } from '../types/database';

interface CustomerInfoModalProps {
  onSubmit: (info: CustomerInfo) => void;
}

export default function CustomerInfoModal({ onSubmit }: CustomerInfoModalProps) {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [errors, setErrors] = useState({ name: '', address: '' });

  useEffect(() => {
    const savedInfo = sessionStorage.getItem('customerInfo');
    if (savedInfo) {
      const info: CustomerInfo = JSON.parse(savedInfo);
      onSubmit(info);
    }
  }, [onSubmit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = { name: '', address: '' };
    let hasError = false;

    if (!name.trim()) {
      newErrors.name = 'Name is required';
      hasError = true;
    }

    if (!address.trim()) {
      newErrors.address = 'Address is required';
      hasError = true;
    }

    setErrors(newErrors);

    if (!hasError) {
      const info: CustomerInfo = { name: name.trim(), address: address.trim() };
      sessionStorage.setItem('customerInfo', JSON.stringify(info));
      onSubmit(info);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 animate-fadeIn">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome!</h2>
        <p className="text-gray-600 mb-6">Please provide your details for delivery</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <User className="inline w-4 h-4 mr-1" />
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your full name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MapPin className="inline w-4 h-4 mr-1" />
              Complete Shipping Address
            </label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition resize-none ${
                errors.address ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your complete address"
              rows={3}
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">{errors.address}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition duration-200 transform hover:scale-[1.02]"
          >
            Continue Shopping
          </button>
        </form>
      </div>
    </div>
  );
}
