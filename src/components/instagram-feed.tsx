"use client";

import { useState } from "react";
import { INSTAGRAM_EMBED_URL, INSTAGRAM_HANDLE } from "@/lib/kontakt";

export function InstagramFeed() {
  const [ucitan, setUcitan] = useState(false);

  if (!ucitan) {
    return (
      <div className="flex min-h-[22rem] flex-col justify-end border border-line bg-surface-alt p-6 sm:p-8">
        <p className="text-lg font-bold text-brand-deep">@{INSTAGRAM_HANDLE}</p>
        <p className="mt-2 max-w-sm leading-relaxed text-ink-muted">
          Zadnje objave učitavaju se s Instagrama tek kad to zatražite.
          Instagram tada može postaviti vlastite kolačiće.
        </p>
        <button
          type="button"
          onClick={() => setUcitan(true)}
          className="mt-6 inline-flex items-center justify-center self-start bg-accent-clay px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-accent-clay-dark"
        >
          Prikaži zadnje objave
        </button>
      </div>
    );
  }

  return (
    <iframe
      src={INSTAGRAM_EMBED_URL}
      title={`Zadnje objave @${INSTAGRAM_HANDLE} na Instagramu`}
      className="h-[46rem] w-full border border-line bg-white"
      loading="lazy"
      referrerPolicy="strict-origin-when-cross-origin"
    />
  );
}
