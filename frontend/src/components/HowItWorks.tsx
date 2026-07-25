import { GaugeIcon, PencilIcon, RadarIcon } from './icons';

const STEPS = [
  {
    icon: PencilIcon,
    title: 'Bilgilerini gir',
    description: 'İşletme adı, adres, telefon ve web sitesi — sadece isim zorunlu.',
  },
  {
    icon: RadarIcon,
    title: '10 kaynakta tarama yap',
    description: 'Google Maps, OpenStreetMap, TomTom, Foursquare ve daha fazlası eş zamanlı taranır.',
  },
  {
    icon: GaugeIcon,
    title: 'Skorunu al',
    description: 'Kaç kaynakta bulunduğunu (Coverage) ve bilgilerin ne kadar tutarlı olduğunu (Consistency) gör.',
  },
];

export function HowItWorks() {
  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
      {STEPS.map(({ icon: Icon, title, description }, index) => (
        <div
          key={title}
          className="animate-fade-in-up flex flex-col gap-3 rounded-2xl border border-hairline bg-surface p-5"
          style={{ animationDelay: `${240 + index * 80}ms` }}
        >
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-(--series-blue)/10 text-(--series-blue)">
              <Icon className="h-4.5 w-4.5" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-wide text-muted">
              Adım {index + 1}
            </span>
          </div>
          <h3 className="text-sm font-semibold text-primary">{title}</h3>
          <p className="text-sm text-secondary">{description}</p>
        </div>
      ))}
    </div>
  );
}
