import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";
export const dynamic = "force-static";

export default function AppleIcon() {
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
        <div style={{ fontSize: 112, fontWeight: 700, lineHeight: 1 }}>M</div>
        <div
          style={{ marginTop: 12, width: 72, height: 10, background: "#FBF8F1" }}
        />
      </div>
    ),
    size,
  );
}
