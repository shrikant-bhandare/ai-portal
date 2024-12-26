import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface Customer {
  name: string;
  email: string;
  phone: string;
  company: string;
  status: string;
}

interface Conversation {
  id: string;
  content: string;
  type: string;
  created_at: string;
}

export function useCustomerDetails(customerId: string | null) {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);

  useEffect(() => {
    if (!customerId) {
      setCustomer(null);
      setConversations([]);
      return;
    }

    async function loadCustomerDetails() {
      try {
        // Load customer details
        const { data: customerData, error: customerError } = await supabase
          .from('customers')
          .select('*')
          .eq('id', customerId)
          .single();

        if (customerError) throw customerError;
        setCustomer(customerData);

        // Load customer conversations
        const { data: conversationsData, error: conversationsError } = await supabase
          .from('conversations')
          .select('*')
          .eq('customer_id', customerId)
          .order('created_at', { ascending: false });

        if (conversationsError) throw conversationsError;
        setConversations(conversationsData);
      } catch (error) {
        console.error('Error loading customer details:', error);
      }
    }

    loadCustomerDetails();
  }, [customerId]);

  return { customer, conversations };
}