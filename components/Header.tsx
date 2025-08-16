
import React from 'react';
import { Icon } from './Icon';

export const Header: React.FC = () => {
  return (
    <header className="text-center">
      <div className="flex justify-center items-center gap-4">
        <Icon name="FlaskConical" className="w-12 h-12 text-cyan-400" />
        <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-200">
          AI Research Paper Generator
        </h1>
      </div>
      <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
        Leverage the power of Google's Gemini to instantly generate structured academic papers on any topic.
      </p>
    </header>
  );
};
