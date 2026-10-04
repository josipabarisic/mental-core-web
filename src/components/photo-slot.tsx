import { Camera } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Stands in for the documentary photography that has not been shot yet.
 * Deliberately flat and unstyled so nobody mistakes it for a design decision.
 */
export function PhotoSlot({
  label,
  className,
  tone = "dark",
}: {
  label: string;
  className?: string;
  tone?: "dark" | "light";
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 border border-dashed p-6 text-center",
        tone === "dark"
          ? "border-white/25 bg-white/5 text-line"
          : "border-line bg-surface-alt text-ink-muted",
        className,
      )}
    >
      <Camera size={20} strokeWidth={1.5} className="opacity-60" />
      <p className="max-w-[24ch] text-xs leading-relaxed">{label}</p>
    </div>
  );
}
