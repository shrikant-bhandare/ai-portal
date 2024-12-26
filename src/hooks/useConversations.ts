import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface Conversation {
  id: string;
  content: string;
  type: string;
  created_at: string;
  customer_id: string;
  customer: {
    name: string;
    company: string;
  };
}

export function useConversations() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadConversations();
  }, []);

  const loadConversations = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setError('No authenticated user');
        return;
      }

      const { data, error } = await supabase
        .from('conversations')
        .select(`
          id,
          content,
          type,
          created_at,
          customer_id,
          customer:customers!customer_id (
            name,
            company
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setConversations(data || []);
    } catch (error) {
      console.error('Error loading conversations:', error);
      setError('Failed to load conversations');
    } finally {
      setLoading(false);
    }
  };

  return {
    conversations,
    loading,
    error,
    refresh: loadConversations
  };
}