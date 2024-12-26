import React from 'react';
import { ConversationItem } from './ConversationItem';
import { useConversations } from '../../hooks/useConversations';
import { Loader } from '../ui/Loader';

interface ConversationListProps {
  onSelectCustomer: (customerId: string) => void;
  selectedCustomerId: string | null;
}

export function ConversationList({ onSelectCustomer, selectedCustomerId }: ConversationListProps) {
  const { conversations, loading, error } = useConversations();

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

  if (!conversations.length) {
    return (
      <div className="text-center py-8 text-gray-400">
        No conversations found. Start by adding a new conversation.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {conversations.map((conversation) => (
        <ConversationItem 
          key={conversation.id} 
          conversation={conversation}
          onClick={() => onSelectCustomer(conversation.customer_id)}
          isSelected={selectedCustomerId === conversation.customer_id}
        />
      ))}
    </div>
  );
}