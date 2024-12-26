import React from 'react';
import { formatDate, formatTime } from '../../utils/date';
import { GradientText } from '../ui/GradientText';

interface MeetingConfirmationProps {
  meeting: {
    meeting_date: string;
    meeting_time: string;
    name: string;
    email: string;
    topic: string;
  };
}

export function MeetingConfirmation({ meeting }: MeetingConfirmationProps) {
  return (
    <div className="text-center space-y-4">
      <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto">
        <svg
          className="w-8 h-8 text-green-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      <h3 className="text-2xl font-bold text-white">
        <GradientText>Meeting Scheduled!</GradientText>
      </h3>

      <div className="text-gray-400 space-y-2">
        <p>Your meeting has been scheduled for:</p>
        <p className="text-white font-medium">
          {formatDate(meeting.meeting_date)} at {formatTime(meeting.meeting_time)}
        </p>
      </div>

      <p className="text-sm text-gray-400">
        A confirmation email has been sent to {meeting.email}
      </p>
    </div>
  );
}