// src/components/ActionButton.tsx
import React from 'react';

interface ActionButtonProps {
  onClick: () => void;
  gradientClasses: string;
  children: React.ReactNode;
}

const ActionButton: React.FC<ActionButtonProps> = ({ onClick, gradientClasses, children }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center px-6 py-3 rounded-lg text-white font-semibold transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${gradientClasses}`}
    >
      {children}
    </button>
  );
};

export default ActionButton;
