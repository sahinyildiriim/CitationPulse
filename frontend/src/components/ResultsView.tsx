import type { CitationCheckResponse } from '../types';
import { ScoreMeter } from './ScoreMeter';
import { ProviderCard } from './ProviderCard';

interface ResultsViewProps {
  response: CitationCheckResponse;
  onReset: () => void;
}

export function ResultsView({ response, onReset }: ResultsViewProps) {
  return (
    <div className="flex w-full max-w-6xl flex-col gap-8">
      <h2 className="sr-only">Tarama sonuçları</h2>

      <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-center sm:gap-10">
        <ScoreMeter label="Kapsama Skoru (Coverage)" value={response.coverageScore} accent="blue" />
        <ScoreMeter label="Tutarlılık Skoru (Consistency)" value={response.consistencyScore} accent="orange" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {response.results.map((result, index) => (
          <ProviderCard key={result.provider} result={result} style={{ animationDelay: `${index * 60}ms` }} />
        ))}
      </div>

      <button
        type="button"
        onClick={onReset}
        className="focus-ring mx-auto rounded-lg border border-hairline px-4 py-2 text-sm font-medium text-secondary transition-colors hover:text-primary"
      >
        Yeni bir tarama başlat
      </button>
    </div>
  );
}
