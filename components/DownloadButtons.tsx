
import React from 'react';
import type { ResearchPaper } from '../types';
import { generatePdf, generateDocx, generateTex } from '../services/exportService';
import { Icon } from './Icon';

interface DownloadButtonsProps {
  paper: ResearchPaper | null;
}

const DownloadButton: React.FC<{ onClick: () => void; disabled: boolean; iconName: string; label: string }> = ({ onClick, disabled, iconName, label }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className="flex-1 flex items-center justify-center gap-2 bg-slate-700 text-slate-200 font-semibold px-4 py-2 rounded-md hover:bg-slate-600 disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed transition-colors duration-200"
    >
        <Icon name={iconName} className="w-5 h-5" />
        <span>{label}</span>
    </button>
);


export const DownloadButtons: React.FC<DownloadButtonsProps> = ({ paper }) => {
  const handlePdfDownload = () => {
    if (paper) generatePdf(paper);
  };

  const handleWordDownload = () => {
    if (paper) generateDocx(paper);
  };

  const handleLatexDownload = () => {
    if (paper) generateTex(paper);
  };

  return (
    <div className="bg-slate-800/50 p-4 rounded-t-xl shadow-lg border-b-0 border border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
      <h3 className="text-lg font-bold text-cyan-400">Download Paper</h3>
      <div className="flex w-full sm:w-auto gap-3">
        <DownloadButton onClick={handlePdfDownload} disabled={!paper} iconName="FileText" label="PDF" />
        <DownloadButton onClick={handleWordDownload} disabled={!paper} iconName="FileText" label="Word" />
        <DownloadButton onClick={handleLatexDownload} disabled={!paper} iconName="FileCode" label="LaTeX" />
      </div>
    </div>
  );
};
