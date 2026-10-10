import type { ReactNode } from "react";

export function LegalOdlomak({
  naslov,
  children,
}: {
  naslov: string;
  children: ReactNode;
}) {
  return (
    <div className="border-t border-line pt-8">
      <h2 className="text-xl font-bold text-brand-deep">{naslov}</h2>
      <div className="mt-4 space-y-4 leading-relaxed text-ink">{children}</div>
    </div>
  );
}
