import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { FormTextArea } from '../forms/brand/FormTextArea';

interface TaskActionsProps {
  taskId: number;
  status: string;
}

export function TaskActions({ taskId, status }: TaskActionsProps) {
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState('');

  const handleApprove = async () => {
    // Implement task approval logic
    console.log('Task approved:', taskId);
  };

  const handleSubmitFeedback = async () => {
    // Implement feedback submission logic
    console.log('Feedback submitted:', feedback);
    setShowFeedback(false);
    setFeedback('');
  };

  return (
    <div className="space-y-4">
      {status !== 'completed' && (
        <div className="flex gap-4">
          <Button onClick={handleApprove} fullWidth>
            Approve Task
          </Button>
          <Button variant="secondary" onClick={() => setShowFeedback(true)} fullWidth>
            Request Changes
          </Button>
        </div>
      )}

      {showFeedback && (
        <div className="space-y-4">
          <FormTextArea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Enter your feedback..."
            rows={4}
          />
          <div className="flex gap-4">
            <Button onClick={handleSubmitFeedback} fullWidth>
              Submit Feedback
            </Button>
            <Button variant="secondary" onClick={() => setShowFeedback(false)} fullWidth>
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}