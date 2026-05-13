export function SpecsTable({ specs }: { specs: Record<string, string> }) {
  const entries = Object.entries(specs).filter(([, v]) => v && v !== "—");

  return (
    <div className="surface p-5 md:p-6">
      <div className="flex items-center gap-3">
        <h2 className="text-lg font-black text-white md:text-xl">Характеристики</h2>
        <span className="h-[2px] flex-1 rounded-full bg-gradient-to-r from-gold/70 to-transparent" />
      </div>

      <dl className="mt-5 divide-y divide-bg-line">
        {entries.map(([k, v]) => (
          <div
            key={k}
            className="flex items-baseline justify-between gap-4 py-2.5 text-[13px] md:text-sm"
          >
            <dt className="text-muted">{k}</dt>
            <span
              aria-hidden
              className="mx-2 flex-1 border-b border-dashed border-bg-line/70"
            />
            <dd className="text-right font-semibold text-white">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
