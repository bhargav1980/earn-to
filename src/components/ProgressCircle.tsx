
import React from 'react';

type ProgressCircleProps = {
  progress: number; // 0 to 100
  size?: number;
  strokeWidth?: number;
  className?: string;
  showPercentage?: boolean;
  children?: React.ReactNode;
};

const ProgressCircle = ({
  progress,
  size = 120,
  strokeWidth = 10,
  className = '',
  showPercentage = true,
  children
}: ProgressCircleProps) => {
  // Ensure progress is between 0 and 100
  const normalizedProgress = Math.min(100, Math.max(0, progress));
  
  // Calculate circle properties
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (normalizedProgress / 100) * circumference;
  
  // Color based on progress
  const getProgressColor = () => {
    if (normalizedProgress < 30) return 'stroke-red-500';
    if (normalizedProgress < 70) return 'stroke-brand-amber';
    return 'stroke-green-500';
  };

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          className="opacity-10"
        />
        
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className={`progress-ring-circle ${getProgressColor()}`}
        />
      </svg>
      
      {/* Content inside the circle */}
      <div className="absolute flex flex-col items-center justify-center">
        {showPercentage && (
          <span className="text-xl font-bold">{Math.round(normalizedProgress)}%</span>
        )}
        {children}
      </div>
    </div>
  );
};

export default ProgressCircle;
