import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";

export const alt = "Juan.Dev — Juan Diego Montaguth Rodríguez";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 90px",
          color: "#ffffff",
          background:
            "linear-gradient(135deg, #04060c 0%, #1e1b4b 55%, #0b3a5b 100%)",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -140,
            right: -100,
            width: 520,
            height: 520,
            borderRadius: 9999,
            background: "rgba(56, 189, 248, 0.28)",
            filter: "blur(90px)",
          }}
        />

        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: 76,
              height: 76,
              borderRadius: 18,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 46,
              fontWeight: 700,
              background: "linear-gradient(135deg, #22d3ee, #2563eb)",
            }}
          >
            J
          </div>
          <div style={{ marginLeft: 22, fontSize: 40, fontWeight: 600 }}>
            Juan.Dev
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 56,
            fontSize: 84,
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: -2,
          }}
        >
          <div style={{ display: "flex" }}>Juan Diego</div>
          <div style={{ display: "flex", color: "#38bdf8" }}>
            Montaguth Rodríguez
          </div>
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 40,
            fontSize: 34,
            color: "#cbd5e1",
          }}
        >
          {t("ogSubtitle")}
        </div>
      </div>
    ),
    { ...size },
  );
}
