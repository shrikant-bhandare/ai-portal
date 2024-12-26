import React from 'react';
import { Building2, Mail, Phone, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';

interface CustomerCardProps {
  customer: {
    id: string;
    name: string;
    email: string;
    phone: string;
    company: string;
    status: string;
    last_contact: string;
  };
}

export function CustomerCard({ customer }: CustomerCardProps) {
  const navigate = useNavigate();

  const handleViewConversations = () => {
    navigate('/conversations', { state: { customerId: customer.id } });
  };

  return (
    <div className="bg-[#1A2737] rounded-lg border border-gray-800 p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-white">{customer.name}</h3>
          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-2 
            ${customer.status === 'active' ? 'bg-emerald-500/10 text-emerald-400' : 
              customer.status === 'new' ? 'bg-blue-500/10 text-blue-400' : 
              'bg-gray-500/10 text-gray-400'}`}>
            {customer.status}
          </span>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex items-center text-gray-400">
          <Building2 className="w-4 h-4 mr-2" />
          <span>{customer.company}</span>
        </div>
        <div className="flex items-center text-gray-400">
          <Mail className="w-4 h-4 mr-2" />
          <span>{customer.email}</span>
        </div>
        <div className="flex items-center text-gray-400">
          <Phone className="w-4 h-4 mr-2" />
          <span>{customer.phone}</span>
        </div>
      </div>

      <Button 
        variant="secondary" 
        onClick={handleViewConversations}
        className="w-full"
      >
        <MessageSquare className="w-4 h-4 mr-2" />
        View Conversations
      </Button>
    </div>
  );
}