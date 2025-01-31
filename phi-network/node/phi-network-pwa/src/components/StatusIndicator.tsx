// src/components/StatusIndicator.tsx
import React from 'react';

interface StatusIndicatorProps {
  label: string;
  status: string;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ label, status }) => {
  const isError = status.startsWith('❌');
  return (
    <div className="flex items-center">
      <span className={`w-3 h-3 rounded-full mr-2 ${isError ? 'bg-red-500' : 'bg-green-500'}`}></span>
      <span className="font-medium">{label}:</span>
      <span className={`ml-2 ${isError ? 'text-red-400' : 'text-green-400'}`}>{status}</span>
    </div>
  );
};

export default StatusIndicator;
