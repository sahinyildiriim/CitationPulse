import { useRef, useState } from 'react';
import { checkCitations } from './api';
import type { BusinessSearchRequest, CitationCheckResponse } from './types';
import { useTheme } from './hooks/useTheme';
import { ThemeToggle } from './components/ThemeToggle';
import { BusinessForm, type BusinessLiveFields } from './components/BusinessForm';
import { BusinessCardPreview } from './components/BusinessCardPreview';
import { ScanningProgress } from './components/ScanningProgress';
import { ResultsView } from './components/ResultsView';
import { Hero } from './components/Hero';
import { HowItWorks } from './components/HowItWorks';

const EMPTY_LIVE_FIELDS: BusinessLiveFields = {
  businessName: '',
  address: '',
  phoneNumber: '',
  website: '',
};

type ViewState =
  | { status: 'form' }
  | { status: 'scanning' }
  | { status: 'done'; response: CitationCheckResponse }
  | { status: 'error'; message: string };

function App() {
  const { theme, toggleTheme } = useTheme();
  const [view, setView] = useState<ViewState>({ status: 'form' });
  const [liveFields, setLiveFields] = useState<BusinessLiveFields>(EMPTY_LIVE_FIELDS);
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
    setLiveFields(EMPTY_LIVE_FIELDS);
    setView({ status: 'form' });
  };

  return (
    <div className="flex min-h-screen flex-col bg-page">
      <header className="sticky top-0 z-20 border-b border-hairline bg-page/80 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-2.5">
            <span
              aria-hidden="true"
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-(--series-blue) text-sm font-bold text-white"
            >
              C
            </span>
            <div className="flex flex-col">
              <h1 className="text-base font-semibold leading-tight text-primary">CitationPulse</h1>
              <span className="text-xs leading-tight text-muted">Yerel citation tutarlılık denetimi</span>
            </div>
          </div>
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </div>
      </header>

      <main className="relative isolate mx-auto flex w-full max-w-6xl flex-1 flex-col items-center gap-14 px-4 py-12 sm:px-6 sm:py-16">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-0 top-1/2 h-128 w-lg -translate-x-1/2 -translate-y-1/2 rounded-full bg-(--series-blue) opacity-[0.16] blur-[110px]" />
          <div className="absolute right-0 top-1/2 h-128 w-lg -translate-y-1/2 translate-x-1/2 rounded-full bg-(--series-violet) opacity-[0.14] blur-[110px]" />
        </div>

        {view.status === 'form' && <Hero />}

        {(view.status === 'form' || view.status === 'scanning') && (
          <div className="flex w-full flex-col items-center gap-6 lg:flex-row lg:items-start lg:justify-center">
            <BusinessCardPreview {...liveFields} />
            <BusinessForm
              onSubmit={handleSubmit}
              onLiveChange={setLiveFields}
              disabled={view.status === 'scanning'}
            />
          </div>
        )}

        {view.status === 'scanning' && <ScanningProgress done={false} />}

        {view.status === 'form' && <HowItWorks />}

        {view.status === 'error' && (
          <div
            role="alert"
            className="flex w-full max-w-xl flex-col gap-4 rounded-2xl border border-hairline bg-surface p-6 text-center"
          >
            <p className="text-sm font-medium text-(--status-critical)">{view.message}</p>
            <button
              type="button"
              onClick={handleReset}
              className="focus-ring mx-auto rounded-lg border border-hairline px-4 py-2 text-sm font-medium text-secondary hover:text-primary"
            >
              Tekrar dene
            </button>
          </div>
        )}

        {view.status === 'done' && <ResultsView response={view.response} onReset={handleReset} />}
      </main>

      <footer className="border-t border-hairline">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-1 px-4 py-8 text-center sm:px-6">
          <span className="text-xs text-muted">
            © {new Date().getFullYear()} CitationPulse — yerel citation tutarlılık denetim aracı
          </span>
          <span className="text-[11px] text-muted/80">
            OpenStreetMap · Google Maps · TomTom · Foursquare · Bulurum.com üzerinden veri toplar
          </span>
        </div>
      </footer>
    </div>
  );
}

export default App;
