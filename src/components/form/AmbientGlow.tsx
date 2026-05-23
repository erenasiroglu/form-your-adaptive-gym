export function AmbientGlow() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-40 -right-40 size-[600px] rounded-full bg-primary/10 blur-[140px]" />
      <div className="absolute -bottom-40 -left-40 size-[500px] rounded-full bg-primary/5 blur-[140px]" />
    </div>
  );
}
