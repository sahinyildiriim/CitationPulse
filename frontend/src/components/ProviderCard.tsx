import type { CitationResultDto } from '../types';
import { StatusBadge } from './StatusBadge';

interface ProviderCardProps {
  result: CitationResultDto;
  style?: React.CSSProperties;
}

const MATCH_FIELDS: Array<{ key: keyof CitationResultDto; label: string }> = [
  { key: 'nameMatches', label: 'İsim' },
  { key: 'addressMatches', label: 'Adres' },
  { key: 'phoneMatches', label: 'Telefon' },
  { key: 'websiteMatches', label: 'Web sitesi' },
];

function MatchPill({ label, value }: { label: string; value: boolean | null | undefined }) {
  const color = value ? 'var(--status-good)' : 'var(--muted-ink)';

  return (
    <div className="flex items-center gap-1.5 text-xs text-secondary">
      <span
        className="flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold"
        style={{
          color,
          backgroundColor: `color-mix(in srgb, ${color} 14%, transparent)`,
        }}
      >
        {value ? '✓' : '–'}
      </span>
      {label}
    </div>
  );
}

export function ProviderCard({ result, style }: ProviderCardProps) {
  const isFound = result.status === 'Found';

  return (
    <div
      className="animate-fade-in-up flex flex-col gap-3 rounded-2xl border border-hairline bg-surface p-5"
      style={style}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm font-semibold text-primary">{result.provider}</h3>
        <StatusBadge status={result.status} />
      </div>

      {isFound && (
        <>
          {typeof result.matchScore === 'number' && (
            <div className="flex flex-col gap-1">
              <div className="flex items-baseline justify-between text-xs text-muted">
                <span>Eşleşme skoru</span>
                <span className="font-medium text-secondary">{result.matchScore}/100</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full" style={{ background: 'var(--gridline)' }}>
                <div
                  className="h-full rounded-full bg-(--series-blue)"
                  style={{ width: `${result.matchScore}%` }}
                />
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-x-3 gap-y-2">
            {MATCH_FIELDS.map(({ key, label }) => (
              <MatchPill key={key} label={label} value={result[key] as boolean | null | undefined} />
            ))}
          </div>
        </>
      )}

      {result.notes && <p className="text-xs italic text-muted">{result.notes}</p>}
    </div>
  );
}
