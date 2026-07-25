type IconProps = { className?: string };

export const BuildingIcon = ({ className = 'h-4 w-4' }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="M4 21V5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v16" />
    <path d="M14 9h5a1 1 0 0 1 1 1v11" />
    <path d="M9 21v-3M9 14v.01M9 10v.01M9 6v.01" />
    <path d="M2 21h20" />
  </svg>
);

export const MapPinIcon = ({ className = 'h-4 w-4' }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);

export const PhoneIcon = ({ className = 'h-4 w-4' }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="M4 5c0-.6.4-1 1-1h2.4c.5 0 .9.3 1 .8l.8 3.3c.1.4 0 .8-.3 1.1l-1.5 1.5a12 12 0 0 0 5.9 5.9l1.5-1.5c.3-.3.7-.4 1.1-.3l3.3.8c.5.1.8.5.8 1V19c0 .6-.4 1-1 1h-1C9.6 20 4 14.4 4 6V5Z" />
  </svg>
);

export const GlobeIcon = ({ className = 'h-4 w-4' }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.5 2.6 3.8 5.7 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.7-3.8-9S9.5 5.6 12 3Z" />
  </svg>
);

export const ArrowRightIcon = ({ className = 'h-4 w-4' }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const SpinnerIcon = ({ className = 'h-4 w-4' }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={`animate-spin ${className}`} aria-hidden="true">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.5" opacity="0.25" />
    <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

export const PencilIcon = ({ className = 'h-4 w-4' }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="M4 17.25V20h2.75L17.8 8.94l-2.75-2.75L4 17.25Z" />
    <path d="M15.5 5.6 17 4c.5-.5 1.3-.5 1.8 0l1.2 1.2c.5.5.5 1.3 0 1.8L18.4 8.4l-2.9-2.8Z" />
  </svg>
);

export const RadarIcon = ({ className = 'h-4 w-4' }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <circle cx="12" cy="12" r="9" opacity="0.35" />
    <circle cx="12" cy="12" r="5.5" opacity="0.6" />
    <circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none" />
    <path d="M12 12 18.5 7" />
  </svg>
);

export const GaugeIcon = ({ className = 'h-4 w-4' }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="M4 15a8 8 0 1 1 16 0" />
    <path d="M12 15 15.2 9.8" />
    <path d="M12 15v.01" />
  </svg>
);

export const SparkleIcon = ({ className = 'h-4 w-4' }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 2.5c.4 3.4 1.3 5.7 2.6 7s3.6 2.2 7 2.6c-3.4.4-5.7 1.3-7 2.6s-2.2 3.6-2.6 7c-.4-3.4-1.3-5.7-2.6-7s-3.6-2.2-7-2.6c3.4-.4 5.7-1.3 7-2.6s2.2-3.6 2.6-7Z" />
  </svg>
);
