import React from 'react';
import { MoreVertical, Edit, Archive, Trash2, Star } from 'lucide-react';
import { useConversationOptions } from '../../hooks/useConversationOptions';

interface ConversationOptionsProps {
  conversationId: string;
  isFavorite?: boolean;
}

export function ConversationOptions({ conversationId, isFavorite }: ConversationOptionsProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const optionsRef = React.useRef<HTMLDivElement>(null);
  const { toggleFavorite, archiveConversation, deleteConversation } = useConversationOptions();

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (optionsRef.current && !optionsRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await toggleFavorite(conversationId);
    setIsOpen(false);
  };

  const handleArchive = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await archiveConversation(conversationId);
    setIsOpen(false);
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this conversation?')) {
      await deleteConversation(conversationId);
    }
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={optionsRef}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="p-1 hover:bg-gray-700/50 rounded-full transition-colors"
      >
        <MoreVertical className="w-4 h-4 text-gray-400" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-[#1A2737] rounded-lg shadow-lg border border-gray-700 py-1 z-10">
          <button
            onClick={handleToggleFavorite}
            className="w-full px-4 py-2 text-sm text-left text-gray-300 hover:bg-gray-700/50 flex items-center"
          >
            <Star className={`w-4 h-4 mr-2 ${isFavorite ? 'text-yellow-400' : 'text-gray-400'}`} />
            {isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          </button>
          <button
            onClick={handleArchive}
            className="w-full px-4 py-2 text-sm text-left text-gray-300 hover:bg-gray-700/50 flex items-center"
          >
            <Archive className="w-4 h-4 mr-2 text-gray-400" />
            Archive
          </button>
          <button
            onClick={handleDelete}
            className="w-full px-4 py-2 text-sm text-left text-red-400 hover:bg-gray-700/50 flex items-center"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </button>
        </div>
      )}
    </div>
  );
}