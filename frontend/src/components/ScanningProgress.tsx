import { useEffect, useState } from 'react';

const PROVIDERS = [
  'OpenStreetMap',
  'Google Maps',
  'TomTom',
  'Foursquare',
  'Bulurum.com (Firma Rehberi)',
  'HERE',
  'Azure Maps',
  'Apple Maps',
  'Yellow Pages Türkiye',
  'TripAdvisor Türkiye',
];

interface ScanningProgressProps {
  done: boolean;
}

export function ScanningProgress({ done }: ScanningProgressProps) {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [providerIndex, setProviderIndex] = useState(0);
  const [progress, setProgress] = useState(4);

  useEffect(() => {
    const tick = setInterval(() => setElapsedSeconds((s) => s + 1), 1000);
    const cycle = setInterval(() => setProviderIndex((i) => (i + 1) % PROVIDERS.length), 550);
    const ease = setInterval(() => {
      setProgress((p) => (p >= 92 ? 92 : p + (92 - p) * 0.12));
    }, 200);

    return () => {
      clearInterval(tick);
      clearInterval(cycle);
      clearInterval(ease);
    };
  }, []);

  const displayProgress = done ? 100 : Math.round(progress);

  return (
    <div className="mx-auto flex w-full max-w-xl flex-col items-center gap-5 rounded-2xl border border-hairline bg-surface p-8 text-center">
      <div role="status" aria-live="polite" className="sr-only">
        {done ? 'Tarama tamamlandı.' : 'İşletme 10 kaynakta taranıyor, lütfen bekleyin.'}
      </div>

      <div aria-hidden="true" className="flex w-full flex-col items-center gap-5">
        <div className="h-10 w-10 animate-spin rounded-full border-[3px] border-(--series-blue) border-t-transparent" />

        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-primary">
            {done ? 'Tamamlandı' : `${PROVIDERS[providerIndex]} taranıyor…`}
          </p>
          <p className="text-xs text-muted">10 kaynak kontrol ediliyor · {elapsedSeconds}s</p>
        </div>

        <div className="h-2 w-full overflow-hidden rounded-full" style={{ background: 'var(--gridline)' }}>
          <div
            className="h-full rounded-full bg-(--series-blue) transition-all duration-300 ease-out"
            style={{ width: `${displayProgress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
