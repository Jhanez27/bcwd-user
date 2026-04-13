import Image from "next/image";

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="flex h-10 w-10 justify-center rounded-full bg-white text-primary-foreground font-bold text-sm">
        <Image
          src="/logo.webp"
          alt="Logo"
          width={0}
          height={0}
          className="h-10 w-auto"
        />
      </div>
      <div className="flex flex-col">
        <span className="font-bold text-sm leading-none text-background">
          BCWD
        </span>
        <span className="text-xs text-muted">Billing System</span>
      </div>
    </div>
  );
}
