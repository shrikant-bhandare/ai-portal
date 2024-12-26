import { supabase } from '../lib/supabase';

export function useConversationOptions() {
  const toggleFavorite = async (conversationId: string) => {
    try {
      const { data: conversation } = await supabase
        .from('conversations')
        .select('is_favorite')
        .eq('id', conversationId)
        .single();

      const { error } = await supabase
        .from('conversations')
        .update({ is_favorite: !conversation?.is_favorite })
        .eq('id', conversationId);

      if (error) throw error;
    } catch (error) {
      console.error('Error toggling favorite:', error);
      throw error;
    }
  };

  const archiveConversation = async (conversationId: string) => {
    try {
      const { error } = await supabase
        .from('conversations')
        .update({ status: 'archived' })
        .eq('id', conversationId);

      if (error) throw error;
    } catch (error) {
      console.error('Error archiving conversation:', error);
      throw error;
    }
  };

  const deleteConversation = async (conversationId: string) => {
    try {
      const { error } = await supabase
        .from('conversations')
        .delete()
        .eq('id', conversationId);

      if (error) throw error;
    } catch (error) {
      console.error('Error deleting conversation:', error);
      throw error;
    }
  };

  return {
    toggleFavorite,
    archiveConversation,
    deleteConversation
  };
}