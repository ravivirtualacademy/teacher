
import React, { useState, useCallback, useRef } from 'react';
import type { ResearchPaper } from './types';
import { generateResearchPaper } from './services/geminiService';
import { Header } from './components/Header';
import { LoadingIndicator } from './components/LoadingIndicator';
import { PaperDisplay } from './components/PaperDisplay';
import { DownloadButtons } from './components/DownloadButtons';
import { Icon } from './components/Icon';

const App: React.FC = () => {
  const [topic, setTopic] = useState<string>('');
  const [paper, setPaper] = useState<ResearchPaper | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const paperDisplayRef = useRef<HTMLDivElement>(null);


  const handleGenerate = useCallback(async () => {
    if (!topic.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    setPaper(null);

    try {
      const result = await generateResearchPaper(topic);
      setPaper(result);
    } catch (e) {
      console.error(e);
      setError('Failed to generate research paper. The model may have refused to answer. Please try a different topic.');
    } finally {
      setIsLoading(false);
    }
  }, [topic, isLoading]);

  return (
    <div className="min-h-screen bg-slate-900 font-sans flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl mx-auto">
        <Header />

        <main className="mt-8">
          <div className="bg-slate-800/50 p-6 rounded-xl shadow-lg border border-slate-700">
            <h2 className="text-xl font-bold text-cyan-400">Enter Research Topic</h2>
            <p className="text-slate-400 mt-2">
              Provide a topic, and our AI will generate a comprehensive research paper, complete with an abstract, introduction, and more.
            </p>
            <div className="mt-4 flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., The Impact of Quantum Computing on Cryptography"
                disabled={isLoading}
                className="flex-grow bg-slate-900 border border-slate-600 rounded-md px-4 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 disabled:opacity-50 transition-all"
                onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
              />
              <button
                onClick={handleGenerate}
                disabled={isLoading || !topic.trim()}
                className="flex items-center justify-center gap-2 bg-cyan-500 text-slate-900 font-bold px-6 py-3 rounded-md hover:bg-cyan-400 disabled:bg-slate-600 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-cyan-500/30"
              >
                {isLoading ? 'Generating...' : <><Icon name="Sparkles" className="w-5 h-5" /> Generate Paper</>}
              </button>
            </div>
          </div>
          
          {isLoading && <LoadingIndicator />}

          {error && (
            <div className="mt-6 bg-red-900/50 border border-red-700 text-red-300 p-4 rounded-lg">
              <p><span className="font-bold">Error:</span> {error}</p>
            </div>
          )}

          {paper && !isLoading && (
            <div className="mt-8">
               <DownloadButtons paper={paper} />
               <PaperDisplay ref={paperDisplayRef} paper={paper} />
            </div>
          )}
        </main>
      </div>
       <footer className="w-full max-w-4xl mx-auto text-center mt-12 text-slate-500 text-sm pb-4">
            <p>Powered by Google Gemini. Generated content may require verification.</p>
        </footer>
    </div>
  );
};

export default App;
