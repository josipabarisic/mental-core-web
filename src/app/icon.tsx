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
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#424E4F",
          color: "#FBF8F1",
        }}
      >
        {/* Letter M with the rule from the wordmark underneath. */}
        <div style={{ fontSize: 40, fontWeight: 700, lineHeight: 1 }}>M</div>
        <div
          style={{ marginTop: 4, width: 26, height: 4, background: "#FBF8F1" }}
        />
      </div>
    ),
    size,
  );
}
