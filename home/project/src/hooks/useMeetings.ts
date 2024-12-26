import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface Meeting {
  id: string;
  meeting_date: string;
  meeting_time: string;
  name: string;
  email: string;
  company: string;
  topic: string;
  notes?: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
}

export function useMeetings() {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMeetings();
  }, []);

  const loadMeetings = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('meetings')
        .select('*')
        .eq('user_id', user.id)
        .order('meeting_date', { ascending: true });

      if (error) throw error;
      setMeetings(data || []);
    } catch (error) {
      console.error('Error loading meetings:', error);
    } finally {
      setLoading(false);
    }
  };

  const scheduleMeeting = async (meetingData: Omit<Meeting, 'id' | 'status'>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No authenticated user');

      const { data, error } = await supabase
        .from('meetings')
        .insert([{
          ...meetingData,
          user_id: user.id,
          status: 'pending'
        }])
        .select()
        .single();

      if (error) throw error;
      
      setMeetings(prev => [...prev, data]);
      return data;
    } catch (error) {
      console.error('Error scheduling meeting:', error);
      throw error;
    }
  };

  const updateMeetingStatus = async (meetingId: string, status: Meeting['status']) => {
    try {
      const { error } = await supabase
        .from('meetings')
        .update({ status })
        .eq('id', meetingId);

      if (error) throw error;
      
      setMeetings(prev => 
        prev.map(meeting => 
          meeting.id === meetingId ? { ...meeting, status } : meeting
        )
      );
    } catch (error) {
      console.error('Error updating meeting status:', error);
      throw error;
    }
  };

  return {
    meetings,
    loading,
    scheduleMeeting,
    updateMeetingStatus,
    refresh: loadMeetings
  };
}