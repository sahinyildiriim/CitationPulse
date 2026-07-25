import type { CitationStatus } from '../types';

interface StatusConfig {
  label: string;
  color: string;
  icon: React.ReactNode;
}

const CheckIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
    <circle cx="12" cy="12" r="9" />
    <path d="m8.5 12.5 2.3 2.3L15.5 10" />
  </svg>
);

const AlertIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
    <path d="M12 3 2 20h20L12 3Z" />
    <path d="M12 10v4M12 17.5v.01" />
  </svg>
);

const CrossIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
    <circle cx="12" cy="12" r="9" />
    <path d="m9 9 6 6M15 9l-6 6" />
  </svg>
);

const MinusIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
    <circle cx="12" cy="12" r="9" />
    <path d="M8.5 12h7" />
  </svg>
);

const STATUS_CONFIG: Record<CitationStatus, StatusConfig> = {
  Found: { label: 'Bulundu', color: 'var(--status-good)', icon: CheckIcon },
  NotFound: { label: 'Bulunamadı', color: 'var(--status-warning)', icon: CrossIcon },
  NotConfigured: { label: 'Yapılandırılmadı', color: 'var(--muted-ink)', icon: MinusIcon },
  Unavailable: { label: 'Erişilemedi', color: 'var(--status-critical)', icon: AlertIcon },
  ManualReviewRequired: { label: 'Manuel İnceleme', color: 'var(--status-serious)', icon: AlertIcon },
};

export function StatusBadge({ status }: { status: CitationStatus }) {
  const config = STATUS_CONFIG[status];

  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium text-primary"
      style={{
        borderColor: `color-mix(in srgb, ${config.color} 35%, transparent)`,
        backgroundColor: `color-mix(in srgb, ${config.color} 12%, transparent)`,
      }}
    >
      <span style={{ color: config.color }} aria-hidden="true">
        {config.icon}
      </span>
      {config.label}
    </span>
  );
}
