import { SparkleIcon } from './icons';

const TRUST_PROVIDERS = ['OpenStreetMap', 'Google Maps', 'TomTom', 'Foursquare', 'Bulurum.com'];

export function Hero() {
  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <span
        className="animate-fade-in-up inline-flex items-center gap-1.5 rounded-full border border-hairline bg-surface px-3.5 py-1.5 text-xs font-medium text-secondary"
        style={{ animationDelay: '0ms' }}
      >
        <SparkleIcon className="h-3.5 w-3.5 text-(--series-blue)" />
        10 kaynakta ücretsiz citation taraması
      </span>

      <p
        className="animate-fade-in-up max-w-2xl text-4xl font-semibold tracking-tight text-primary sm:text-5xl"
        style={{ animationDelay: '60ms' }}
      >
        İşletmeniz haritalarda{' '}
        <span className="bg-linear-to-r from-(--series-blue) to-(--series-violet) bg-clip-text text-transparent">
          tutarlı
        </span>{' '}
        görünüyor mu?
      </p>

      <p
        className="animate-fade-in-up max-w-lg text-balance text-base text-secondary"
        style={{ animationDelay: '120ms' }}
      >
        İşletme bilgilerinizi girin; CitationPulse adınızı, adresinizi ve telefonunuzu 10 farklı
        harita ve rehber sitesinde saniyeler içinde karşılaştırıp nerede eksik ya da hatalı
        göründüğünüzü gösterir.
      </p>

      <div
        className="animate-fade-in-up flex flex-wrap items-center justify-center gap-2"
        style={{ animationDelay: '180ms' }}
      >
        {TRUST_PROVIDERS.map((provider) => (
          <span
            key={provider}
            className="rounded-full border border-hairline bg-surface px-3 py-1 text-xs text-muted"
          >
            {provider}
          </span>
        ))}
        <span className="rounded-full border border-hairline bg-surface px-3 py-1 text-xs text-muted">
          +5 kaynak daha
        </span>
      </div>
    </div>
  );
}
