
import React, { forwardRef } from 'react';
import type { ResearchPaper, PaperSection } from '../types';

interface PaperDisplayProps {
  paper: ResearchPaper;
}

const SECTION_TITLES: Record<PaperSection, string> = {
  title: 'Title', // Title is handled separately
  abstract: 'Abstract',
  introduction: '1. Introduction',
  literatureReview: '2. Literature Review',
  methodology: '3. Methodology',
  results: '4. Results',
  discussion: '5. Discussion',
  conclusion: '6. Conclusion',
  references: 'References',
};

export const PaperDisplay = forwardRef<HTMLDivElement, PaperDisplayProps>(({ paper }, ref) => {
  const renderSection = (title: string, content: string) => (
    <div key={title} className="mb-8">
      <h3 className="text-2xl font-bold text-cyan-400 border-b-2 border-slate-700 pb-2 mb-4">{title}</h3>
      <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">{content}</p>
    </div>
  );

  const renderReferences = (references: string[]) => (
    <div key="references" className="mb-6">
      <h3 className="text-2xl font-bold text-cyan-400 border-b-2 border-slate-700 pb-2 mb-4">{SECTION_TITLES.references}</h3>
      <ul className="space-y-3">
        {references.map((ref, index) => (
          <li key={index} className="text-slate-300 leading-relaxed text-sm">{ref}</li>
        ))}
      </ul>
    </div>
  );
  
  const sectionsToRender: PaperSection[] = ['abstract', 'introduction', 'literatureReview', 'methodology', 'results', 'discussion', 'conclusion'];

  return (
    <article ref={ref} className="bg-slate-800/50 p-6 sm:p-8 rounded-xl shadow-lg border border-slate-700 mt-6">
      <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-teal-100 mb-8 pb-4 border-b-2 border-slate-700">
        {paper.title}
      </h2>
      
      {sectionsToRender.map(sectionKey => 
        renderSection(SECTION_TITLES[sectionKey], paper[sectionKey] as string)
      )}

      {paper.references && renderReferences(paper.references)}
    </article>
  );
});

PaperDisplay.displayName = 'PaperDisplay';
