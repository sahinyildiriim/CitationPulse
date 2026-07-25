import { useRef, useState } from 'react';
import { checkCitations } from './api';
import type { BusinessSearchRequest, CitationCheckResponse } from './types';
import { useTheme } from './hooks/useTheme';
import { ThemeToggle } from './components/ThemeToggle';
import { BusinessForm } from './components/BusinessForm';
import { ScanningProgress } from './components/ScanningProgress';
import { ResultsView } from './components/ResultsView';

type ViewState =
  | { status: 'form' }
  | { status: 'scanning' }
  | { status: 'done'; response: CitationCheckResponse }
  | { status: 'error'; message: string };

function App() {
  const { theme, toggleTheme } = useTheme();
  const [view, setView] = useState<ViewState>({ status: 'form' });
  const abortRef = useRef<AbortController | null>(null);

  const handleSubmit = async (request: BusinessSearchRequest) => {
    setView({ status: 'scanning' });
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const response = await checkCitations(request, controller.signal);
      setView({ status: 'done', response });
    } catch (error) {
      if (controller.signal.aborted) return;
      setView({
        status: 'error',
        message: error instanceof Error ? error.message : 'Beklenmeyen bir hata oluştu.',
      });
    }
  };

  const handleReset = () => {
    abortRef.current?.abort();
    setView({ status: 'form' });
  };

  return (
    <div className="min-h-screen bg-page">
      <header className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-6 sm:px-6">
        <div className="flex flex-col">
          <span className="text-base font-semibold text-primary">CitationPulse</span>
          <span className="text-xs text-muted">Yerel citation tutarlılık denetimi</span>
        </div>
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
      </header>

      <main className="mx-auto flex w-full max-w-5xl flex-col items-center gap-6 px-4 pb-16 sm:px-6">
        {view.status === 'form' && <BusinessForm onSubmit={handleSubmit} />}

        {view.status === 'scanning' && (
          <>
            <BusinessForm onSubmit={handleSubmit} disabled />
            <ScanningProgress done={false} />
          </>
        )}

        {view.status === 'error' && (
          <div className="flex w-full max-w-xl flex-col gap-4 rounded-2xl border border-hairline bg-surface p-6 text-center">
            <p className="text-sm font-medium text-[var(--status-critical)]">{view.message}</p>
            <button
              type="button"
              onClick={handleReset}
              className="mx-auto rounded-lg border border-hairline px-4 py-2 text-sm font-medium text-secondary hover:text-primary"
            >
              Tekrar dene
            </button>
          </div>
        )}

        {view.status === 'done' && <ResultsView response={view.response} onReset={handleReset} />}
      </main>
    </div>
  );
}

export default App;
