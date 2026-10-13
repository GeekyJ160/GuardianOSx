import { cn } from "@/lib/utils";

export function CapsuleMark({
  className,
  live = false,
}: {
  className?: string;
  live?: boolean;
}) {
  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 overflow-hidden rounded-full",
        className,
      )}
      aria-hidden="true"
    >
      <img
        src="/brand/mark-g.jpg"
        alt=""
        className="size-full object-cover object-center"
      />
      {live ? (
        <span className="absolute right-0 bottom-0 size-2 rounded-full bg-live ring-2 ring-bg" />
      ) : null}
    </span>
  );
}

export function CapsuleObject({
  serial,
  sealed,
  live,
}: {
  serial: string;
  sealed?: boolean;
  live?: boolean;
}) {
  return (
    <div className="relative mx-auto flex h-44 w-24 items-center justify-center">
      <div className="absolute inset-y-2 left-1/2 w-16 -translate-x-1/2 rounded-[28px] bg-elevated shadow-[var(--shadow-border)]" />
      <div className="absolute top-6 left-1/2 h-1.5 w-10 -translate-x-1/2 rounded-full bg-border" />
      <div className="absolute bottom-6 left-1/2 h-1.5 w-10 -translate-x-1/2 rounded-full bg-border" />
      <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1">
        <span
          className={cn(
            "size-2.5 rounded-full",
            live ? "bg-live live-dot" : sealed ? "bg-ok" : "bg-accent",
          )}
        />
        <span className="mt-2 max-w-14 truncate font-mono text-[9px] tracking-widest text-subtle uppercase">
          {serial.slice(0, 8)}
        </span>
      </div>
    </div>
  );
}
