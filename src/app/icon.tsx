import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";
export const dynamic = "force-static";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#424E4F",
        }}
      >
        {/* Bracket pair, the current recommendation. Swap the paths if the
            client picks another symbol in the sketch's review bar. */}
        <svg
          width="44"
          height="44"
          viewBox="0 0 32 32"
          fill="none"
          stroke="#FBF8F1"
          strokeWidth={4.5}
          strokeLinecap="butt"
        >
          <path d="M11 4.5H4.75v23H11" />
          <path d="M21 4.5h6.25v23H21" />
        </svg>
      </div>
    ),
    size,
  );
}
