export function Divider() {
  return (
    <div className="container-page" aria-hidden>
      <div className="mx-auto flex max-w-3xl items-center gap-4 py-1">
        <span className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-white/25" />
        <span className="text-[9px] tracking-[0.3em] text-white/35">◆</span>
        <span className="h-px flex-1 bg-gradient-to-l from-transparent via-white/10 to-white/25" />
      </div>
    </div>
  );
}
