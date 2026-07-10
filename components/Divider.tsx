export function Divider() {
  return (
    <div className="container-page" aria-hidden>
      <div className="mx-auto flex max-w-3xl items-center gap-4 py-1">
        <span className="h-px flex-1 bg-gradient-to-r from-transparent via-black/10 to-black/25" />
        <span className="text-[9px] tracking-[0.3em] text-black/35">◆</span>
        <span className="h-px flex-1 bg-gradient-to-l from-transparent via-black/10 to-black/25" />
      </div>
    </div>
  );
}
