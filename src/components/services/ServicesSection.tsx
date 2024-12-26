import React from 'react';
import { ServiceCard } from './ServiceCard';
import { services } from '../../data/services';
import { LayoutGrid } from 'lucide-react';
import { GradientText } from '../ui/GradientText';

export function ServicesSection() {
  const allServices = [
    ...services,
    {
      id: 'crm',
      title: 'CRM',
      description: 'Manage your customer relationships effectively with our CRM solution.',
      icon: LayoutGrid,
      gradient: 'bg-gradient-to-br from-blue-600 to-purple-400',
      isCRM: true
    }
  ];

  return (
    <div className="py-20 bg-[#0A1628]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            <GradientText>Our Services</GradientText>
          </h2>
          <p className="text-gray-400">
            Comprehensive digital solutions to help your business grow
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allServices.map((service) => (
            <ServiceCard
              key={service.id}
              {...service}
            />
          ))}
        </div>
      </div>
    </div>
  );
}