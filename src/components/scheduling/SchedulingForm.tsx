import React, { useState } from 'react';
import { FormInput } from '../ui/FormInput';
import { FormSelect } from '../ui/FormSelect';
import { FormTextArea } from '../forms/brand/FormTextArea';
import { Button } from '../ui/Button';
import { useMeetings } from '../../hooks/useMeetings';
import { sendMeetingInvite } from '../../utils/email';
import { MeetingConfirmation } from './MeetingConfirmation';
import { isValidMeetingTime } from '../../utils/date';

interface SchedulingFormProps {
  onSuccess?: () => void;
}

const timeSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00'
].map(time => ({
  value: time,
  label: `${time} ${parseInt(time) < 12 ? 'AM' : 'PM'}`
}));

export function SchedulingForm({ onSuccess }: SchedulingFormProps) {
  const { scheduleMeeting } = useMeetings();
  const [date, setDate] = useState('');
  const [scheduledMeeting, setScheduledMeeting] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const meetingDate = formData.get('date') as string;
      const meetingTime = formData.get('time') as string;

      if (!isValidMeetingTime(meetingDate, meetingTime)) {
        throw new Error('Please select a future date and time');
      }

      const meetingDetails = {
        meeting_date: meetingDate,
        meeting_time: meetingTime,
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        company: formData.get('company') as string,
        topic: formData.get('topic') as string,
        notes: formData.get('notes') as string
      };

      const meeting = await scheduleMeeting(meetingDetails);
      await sendMeetingInvite(meetingDetails);
      
      setScheduledMeeting(meeting);
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to schedule meeting');
    } finally {
      setLoading(false);
    }
  };

  if (scheduledMeeting) {
    return <MeetingConfirmation meeting={scheduledMeeting} />;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-500/10 border border-red-500 text-red-500 rounded-lg p-3 text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          type="date"
          name="date"
          label="Date"
          required
          min={minDate}
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <FormSelect
          name="time"
          label="Time"
          options={timeSlots}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          name="name"
          label="Your Name"
          placeholder="Enter your name"
          required
        />
        <FormInput
          name="email"
          type="email"
          label="Email"
          placeholder="Enter your email"
          required
        />
      </div>

      <FormInput
        name="company"
        label="Company"
        placeholder="Enter your company name"
        required
      />

      <FormInput
        name="topic"
        label="Meeting Topic"
        placeholder="What would you like to discuss?"
        required
      />

      <FormTextArea
        name="notes"
        label="Additional Notes"
        placeholder="Any specific points you'd like to cover?"
      />

      <Button 
        type="submit" 
        size="large" 
        fullWidth
        disabled={loading}
      >
        {loading ? 'Scheduling...' : 'Schedule Meeting'}
      </Button>
    </form>
  );
}