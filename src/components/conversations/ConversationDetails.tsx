import React from 'react';
import { formatDate } from '../../utils/date';
import { Building2, Mail, Phone } from 'lucide-react';

interface ConversationDetailsProps {
  customer: {
    name: string;
    email: string;
    phone: string;
    company: string;
    status: string;
  };
  conversations: Array<{
    id: string;
    content: string;
    type: string;
    created_at: string;
  }>;
}

export function ConversationDetails({ customer, conversations }: ConversationDetailsProps) {
  return (
    <div className="h-full flex flex-col">
      {/* Customer Info */}
      <div className="bg-[#1A2737] border-b border-gray-800 p-6">
        <h2 className="text-xl font-semibold text-white mb-4">{customer.name}</h2>
        <div className="space-y-3">
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
      </div>

      {/* Conversation History */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {conversations.map((conversation) => (
          <div 
            key={conversation.id}
            className="bg-[#1E2E42] rounded-lg p-4"
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs text-gray-400">
                {formatDate(conversation.created_at)}
              </span>
              <span className="text-xs px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400">
                {conversation.type}
              </span>
            </div>
            <p className="text-gray-300">{conversation.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}