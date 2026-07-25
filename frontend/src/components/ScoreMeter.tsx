import { RadialBar, RadialBarChart, PolarAngleAxis } from 'recharts';

interface ScoreMeterProps {
  label: string;
  value: number;
  accent: 'blue' | 'orange';
}

export function ScoreMeter({ label, value, accent }: ScoreMeterProps) {
  const accentVar = accent === 'blue' ? 'var(--series-blue)' : 'var(--series-orange)';
  const trackVar = `color-mix(in srgb, ${accentVar} 16%, var(--surface-1))`;
  const data = [{ value }];

  return (
    <div
      role="group"
      aria-label={`${label}: ${Math.round(value)} / 100`}
      className="flex flex-col items-center gap-2 rounded-2xl border border-hairline bg-surface p-6"
    >
      <div className="relative h-40 w-40" aria-hidden="true">
        <RadialBarChart
          width={160}
          height={160}
          cx="50%"
          cy="50%"
          innerRadius={62}
          outerRadius={78}
          barSize={16}
          data={data}
          startAngle={90}
          endAngle={-270}
        >
          <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
          <RadialBar
            background={{ fill: trackVar }}
            dataKey="value"
            cornerRadius={8}
            fill={accentVar}
            isAnimationActive={true}
          />
        </RadialBarChart>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-semibold text-primary">{Math.round(value)}</span>
          <span className="text-xs text-muted">/ 100</span>
        </div>
      </div>
      <span aria-hidden="true" className="text-sm font-medium text-secondary">
        {label}
      </span>
    </div>
  );
}
