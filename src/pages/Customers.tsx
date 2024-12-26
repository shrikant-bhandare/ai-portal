import React from 'react';
import { GradientText } from '../components/ui/GradientText';
import { CustomerList } from '../components/customers/CustomerList';
import { Button } from '../components/ui/Button';

export function Customers() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">
            <GradientText>Customers</GradientText>
          </h1>
          <p className="text-gray-400">
            Manage and track your customer relationships
          </p>
        </div>
        <Button>Add Customer</Button>
      </div>

      <CustomerList />
    </div>
  );
}