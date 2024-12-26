import React from 'react';
import { useCustomers } from '../../hooks/useCustomers';
import { CustomerCard } from './CustomerCard';
import { Loader } from '../ui/Loader';

export function CustomerList() {
  const { customers, loading, error } = useCustomers();

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500 text-red-500 rounded-lg p-4">
        {error}
      </div>
    );
  }

  if (!customers.length) {
    return (
      <div className="text-center py-8 text-gray-400">
        No customers found. Start by adding a new customer.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {customers.map((customer) => (
        <CustomerCard key={customer.id} customer={customer} />
      ))}
    </div>
  );
}