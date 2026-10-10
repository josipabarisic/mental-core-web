import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
// Required so the image is baked into the static export for GitHub Pages.
export const dynamic = "force-static";
export const alt =
  "Mental Core. Uspjeh je rezultat uspješnog funkcioniranja tima. Zatražite razgovor.";

export default async function OpengraphImage() {
  const font = await readFile(
    join(process.cwd(), "src/fonts/OpenSauceOne-Bold.ttf"),
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#424E4F",
          color: "#FBF8F1",
          padding: "72px 80px",
          fontFamily: "Open Sauce One",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 26,
              fontWeight: 700,
              letterSpacing: "0.14em",
            }}
          >
            MENTAL CORE
          </div>
          <div
            style={{
              marginTop: 10,
              width: 250,
              height: 1,
              background: "#D3C8BB",
            }}
          />
          <div
            style={{
              marginTop: 10,
              fontSize: 14,
              letterSpacing: "0.3em",
              color: "#D3C8BB",
            }}
          >
            RAZVOJ TIMOVA I LIDERA
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 62,
              fontWeight: 700,
              lineHeight: 1.18,
              letterSpacing: "0.01em",
            }}
          >
            Uspjeh je rezultat uspješnog
          </div>
          <div
            style={{
              fontSize: 62,
              fontWeight: 700,
              lineHeight: 1.18,
              letterSpacing: "0.01em",
            }}
          >
            funkcioniranja tima.
          </div>
          <div style={{ marginTop: 22, fontSize: 26, color: "#D3C8BB" }}>
            Gradimo timove koji vjeruju jedni drugima.
          </div>
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              marginTop: 32,
              background: "#FBF8F1",
              color: "#2D3839",
              fontSize: 24,
              fontWeight: 700,
              padding: "16px 28px",
            }}
          >
            Zatražite razgovor
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Open Sauce One",
          data: font,
          style: "normal",
          weight: 700,
        },
      ],
    },
  );
}
