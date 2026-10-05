import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Download, Film, Presentation, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CapsuleMark } from "@/components/capsule-mark";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/campaign")({
  component: Campaign,
});

const SLIDES = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;
const SOCIAL = [1, 2, 3, 4, 5, 6] as const;

const CAPTIONS = [
  "The black box for your real life.",
  "The moments nobody knows will matter until they do.",
  "Not a tracker. Not a panic app. A black box.",
  "Prevent · Detect · Preserve · Escalate · Reconstruct.",
  "Authorize a session. Guardian records facts — not danger.",
  "Original evidence. Observed events. Never a verdict.",
  "Your circle. Your protocol. Including dead-man escrow.",
  "PIN, phrase, gesture. Decoy calculator. Covert by design.",
  "Start a Guardian Session. Keep the record original.",
];

const SOCIAL_CAPTIONS = [
  "Hook. Stay protected. Preserve the truth.",
  "Late meeting. First date. Rideshare. They want the record.",
  "Prevent, detect, preserve, escalate, reconstruct.",
  "If I don’t check in, start my protocol.",
  "Your people. Your rules. Dead-man escrow.",
  "Start a session. Keep the record original.",
];

type Mode = "deck" | "social" | "reel";

function Campaign() {
  const [mode, setMode] = useState<Mode>("social");
  const [i, setI] = useState(0);
  const count = mode === "social" ? SOCIAL.length : SLIDES.length;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (mode === "reel") return;
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        setI((n) => Math.min(count - 1, n + 1));
      }
      if (e.key === "ArrowLeft") setI((n) => Math.max(0, n - 1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mode, count]);

  const pptx =
    mode === "deck"
      ? "/campaign/GuardianOS-campaign.pptx"
      : "/campaign/DigitalGuardian-social.pptx";

  return (
    <div className="flex min-h-dvh flex-col bg-bg text-fg">
      <header className="flex items-center justify-between gap-3 px-4 py-3 md:px-6">
        <Link to="/" className="flex h-11 items-center gap-2 text-sm text-muted hover:text-fg">
          <CapsuleMark className="size-6" />
          <span className="hidden sm:inline">GuardianOS</span>
        </Link>
        <div className="flex rounded-full bg-elevated p-1 shadow-[var(--shadow-border)]">
          {(
            [
              ["social", "Social", Smartphone],
              ["deck", "Deck", Presentation],
              ["reel", "Reel", Film],
            ] as const
          ).map(([id, label, Icon]) => (
            <button
              key={id}
              type="button"
              className={cn(
                "flex h-11 items-center gap-1.5 rounded-full px-3 text-xs md:px-4",
                mode === id ? "bg-surface text-fg" : "text-muted",
              )}
              onClick={() => {
                setMode(id);
                setI(0);
              }}
            >
              <Icon className="size-3.5" />
              {label}
            </button>
          ))}
        </div>
        <Button asChild size="sm" variant="secondary">
          <a href={pptx} download>
            <Download className="size-3.5" />
            PPTX
          </a>
        </Button>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center px-3 pb-6">
        {mode === "reel" ? (
          <div className="w-full max-w-sm space-y-3">
            <div className="overflow-hidden rounded-xl bg-black shadow-[var(--shadow-border)]">
              <video
                className="aspect-[9/16] w-full"
                src="/campaign/DigitalGuardian-social-reel.mp4"
                controls
                playsInline
                poster="/campaign/social/c1.png"
              />
            </div>
            <Button asChild variant="secondary" className="w-full">
              <a href="/campaign/DigitalGuardian-social-reel.mp4" download>
                <Download className="size-3.5" />
                Download reel
              </a>
            </Button>
          </div>
        ) : (
          <>
            <button
              type="button"
              className={cn(
                "relative overflow-hidden rounded-lg bg-black shadow-[var(--shadow-border)]",
                mode === "social" ? "w-full max-w-sm" : "w-full max-w-6xl",
              )}
              onClick={() => setI((n) => Math.min(count - 1, n + 1))}
              aria-label="Next slide"
            >
              <img
                src={
                  mode === "social"
                    ? `/campaign/social/c${SOCIAL[i]}.png`
                    : `/campaign/s${SLIDES[i]}.png`
                }
                alt={
                  mode === "social"
                    ? `GuardianOS social card ${i + 1} of ${count}`
                    : `GuardianOS briefing slide ${i + 1} of ${count}`
                }
                className={cn(
                  "w-full object-contain",
                  mode === "social" ? "aspect-[9/16]" : "aspect-video",
                )}
              />
            </button>
            <p className="mt-4 max-w-xl text-center text-sm text-muted">
              {mode === "social" ? SOCIAL_CAPTIONS[i] : CAPTIONS[i]}
            </p>
            <div className="mt-3 flex items-center gap-3">
              <Button
                size="icon"
                variant="secondary"
                aria-label="Previous slide"
                disabled={i === 0}
                onClick={() => setI((n) => n - 1)}
              >
                <ChevronLeft className="size-4" />
              </Button>
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  {Array.from({ length: count }, (_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      aria-label={`Slide ${idx + 1}`}
                      className={cn("h-11 min-w-3 px-0.5", idx === i ? "w-8" : "w-3")}
                      onClick={() => setI(idx)}
                    >
                      <span
                        className={cn(
                          "block h-1.5 rounded-full transition-[width,background-color] duration-150",
                          idx === i ? "w-6 bg-accent" : "w-2 bg-border",
                        )}
                      />
                    </button>
                  ))}
                </div>
                <span className="tabular-nums text-xs text-subtle">
                  {String(i + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
                </span>
              </div>
              <Button
                size="icon"
                variant="secondary"
                aria-label="Next slide"
                disabled={i === count - 1}
                onClick={() => setI((n) => n + 1)}
              >
                <ChevronRight className="size-4" />
              </Button>
            </div>
            <p className="mt-3 text-[11px] tracking-[0.16em] text-subtle uppercase">
              {mode === "social" ? "Stories · Reels · X" : "Arrow keys or tap the frame"}
            </p>
          </>
        )}
      </main>
    </div>
  );
}
