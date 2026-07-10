export function Divider() {
  return (
    <div className="container-page" aria-hidden>
      <div className="mx-auto flex max-w-3xl items-center gap-4 py-1">
        <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[#1a1613]/10 to-[#1a1613]/25" />
        <span className="text-[9px] tracking-[0.3em] text-[#1a1613]/35">◆</span>
        <span className="h-px flex-1 bg-gradient-to-l from-transparent via-[#1a1613]/10 to-[#1a1613]/25" />
      </div>
    </div>
  );
}
