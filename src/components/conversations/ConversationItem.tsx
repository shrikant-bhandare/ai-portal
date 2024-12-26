import React from 'react';
import { formatDate } from '../../utils/date';
import { User, MessageSquare, Star } from 'lucide-react';
import { ConversationOptions } from './ConversationOptions';

interface ConversationItemProps {
  conversation: {
    id: string;
    content: string;
    type: string;
    created_at: string;
    is_favorite?: boolean;
    customer: {
      name: string;
      company: string;
    };
  };
  onClick: () => void;
  isSelected?: boolean;
}

export function ConversationItem({ conversation, onClick, isSelected }: ConversationItemProps) {
  return (
    <div 
      onClick={onClick}
      className={`bg-[#1A2737] rounded-lg border border-gray-800 p-4 hover:bg-[#1E2E42] transition-colors cursor-pointer ${
        isSelected ? 'ring-2 ring-emerald-400' : ''
      }`}
    >
      <div className="flex items-start space-x-4">
        <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
          {conversation.type === 'note' ? (
            <MessageSquare className="w-5 h-5 text-emerald-400" />
          ) : (
            <User className="w-5 h-5 text-emerald-400" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-2">
              <h4 className="text-white font-medium truncate">
                {conversation.customer.name}
              </h4>
              {conversation.is_favorite && (
                <Star className="w-4 h-4 text-yellow-400" />
              )}
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-400">
                {formatDate(conversation.created_at)}
              </span>
              <ConversationOptions 
                conversationId={conversation.id}
                isFavorite={conversation.is_favorite}
              />
            </div>
          </div>
          <p className="text-sm text-gray-400">
            {conversation.customer.company}
          </p>
          <p className="mt-2 text-gray-300">
            {conversation.content}
          </p>
        </div>
      </div>
    </div>
  );
}