import type { BusinessLiveFields } from './BusinessForm';
import { GlobeIcon } from './icons';

export function BusinessCardPreview({ businessName, address, phoneNumber, website }: BusinessLiveFields) {
  return (
    <div
      aria-hidden="true"
      className="relative isolate w-full max-w-xl overflow-hidden rounded-3xl p-6 text-white shadow-[0_35px_70px_-30px_var(--shadow-color)] ring-1 ring-inset ring-white/10 sm:p-7
        before:absolute before:-left-16 before:-top-16 before:-z-10 before:h-56 before:w-56 before:rounded-full
        before:bg-(--series-blue) before:opacity-60 before:blur-3xl before:content-['']
        after:absolute after:-right-20 after:-bottom-14 after:-z-10 after:h-56 after:w-56 after:rounded-full
        after:bg-(--series-violet) after:opacity-50 after:blur-3xl after:content-['']"
      style={{ background: 'linear-gradient(135deg, #2e333b 0%, #0a0d12 100%)' }}
    >
      <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-white/8 via-transparent to-transparent" />

      <div className="relative z-10 flex flex-col gap-7">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-white/55">CitationPulse</span>
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 p-1">
            <img src="/logo-mark.png" alt="" className="h-full w-full object-contain" />
          </span>
        </div>

        <p
          className={`truncate text-xl font-semibold tracking-wide transition-colors duration-300 ${
            businessName ? 'text-white' : 'text-white/30'
          }`}
        >
          {businessName || 'İŞLETME ADI'}
        </p>

        <div className="flex items-end justify-between gap-4">
          <div className="flex min-w-0 flex-col gap-1">
            <span className="text-[10px] font-medium uppercase tracking-wide text-white/40">Adres</span>
            <span
              className={`truncate text-sm transition-colors duration-300 ${
                address ? 'text-white/90' : 'text-white/30'
              }`}
            >
              {address || 'Eklenmedi'}
            </span>
          </div>
          <div className="flex flex-col items-end gap-1 text-right">
            <span className="text-[10px] font-medium uppercase tracking-wide text-white/40">Telefon</span>
            <span
              className={`text-sm transition-colors duration-300 ${phoneNumber ? 'text-white/90' : 'text-white/30'}`}
            >
              {phoneNumber || 'Eklenmedi'}
            </span>
          </div>
        </div>

        <div
          className={`flex items-center gap-1.5 text-xs transition-colors duration-300 ${
            website ? 'text-white/70' : 'text-white/25'
          }`}
        >
          <GlobeIcon className="h-3.5 w-3.5" />
          <span className="truncate">{website || 'Web sitesi eklenmedi'}</span>
        </div>
      </div>
    </div>
  );
}
