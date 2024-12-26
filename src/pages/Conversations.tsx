import React, { useState } from 'react';
import { GradientText } from '../components/ui/GradientText';
import { ConversationList } from '../components/conversations/ConversationList';
import { ConversationDetails } from '../components/conversations/ConversationDetails';
import { Button } from '../components/ui/Button';
import { useCustomerDetails } from '../hooks/useCustomerDetails';

export function Conversations() {
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);
  const { customer, conversations } = useCustomerDetails(selectedCustomerId);

  return (
    <div className="p-6 h-[calc(100vh-64px)] flex gap-6">
      <div className="w-1/2">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              <GradientText>Conversations</GradientText>
            </h1>
            <p className="text-gray-400">
              Track and manage customer communications
            </p>
          </div>
          <Button>New Conversation</Button>
        </div>

        <ConversationList 
          onSelectCustomer={setSelectedCustomerId}
          selectedCustomerId={selectedCustomerId}
        />
      </div>

      <div className="w-1/2 bg-[#1A2737] rounded-lg border border-gray-800">
        {customer && conversations ? (
          <ConversationDetails 
            customer={customer}
            conversations={conversations}
          />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-400">
            Select a conversation to view details
          </div>
        )}
      </div>
    </div>
  );
}