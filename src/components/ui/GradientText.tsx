import React from 'react';
import { cn } from '../../utils/cn';
import { getTextGradientClasses } from '../../utils/colors';

interface GradientTextProps {
  children: React.ReactNode;
  size?: 'small' | 'large';
  className?: string;
}

export function GradientText({ children, size = 'large', className }: GradientTextProps) {
  return (
    <span className={cn(
      getTextGradientClasses(size === 'large' ? 'full' : 'mid'),
      className
    )}>
      {children}
    </span>
  );
}