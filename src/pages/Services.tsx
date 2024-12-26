import React from 'react';
import { ServiceCard } from '../components/services/ServiceCard';
import { services } from '../data/services';
import { LayoutGrid } from 'lucide-react';
import { GradientText } from '../components/ui/GradientText';

export function Services() {
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
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">
          <GradientText>Our Services</GradientText>
        </h1>
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
  );
}