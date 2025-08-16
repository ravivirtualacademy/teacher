
import React, { useState, useEffect } from 'react';
import { Icon } from './Icon';

const loadingMessages = [
  "Consulting the digital archives...",
  "Synthesizing literature review...",
  "Formulating a hypothesis...",
  "Running statistical analysis (simulated)...",
  "Drafting the discussion section...",
  "Compiling references...",
  "Performing final proofread..."
];

export const LoadingIndicator: React.FC = () => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % loadingMessages.length);
    }, 2500);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="mt-8 flex flex-col items-center justify-center bg-slate-800/50 p-6 rounded-xl border border-slate-700">
      <Icon name="LoaderCircle" className="w-12 h-12 text-cyan-400 animate-spin" />
      <p className="mt-4 text-lg font-semibold text-slate-300">Generating Paper...</p>
      <p className="mt-2 text-slate-400 text-center transition-opacity duration-500">
        {loadingMessages[messageIndex]}
      </p>
    </div>
  );
};
