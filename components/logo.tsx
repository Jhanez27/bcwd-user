export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm">
        <span className="text-xs">BCWD</span>
      </div>
      <div className="flex flex-col">
        <span className="font-bold text-sm leading-none text-foreground">BCWD</span>
        <span className="text-xs text-muted-foreground">Billing System</span>
      </div>
    </div>
  );
}
