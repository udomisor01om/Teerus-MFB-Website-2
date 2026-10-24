import { ImageResponse } from "next/og";
export const alt =
  "Teerus Microfinance Bank — Banking that gives your dreams wings";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        background: "#061c22",
        color: "#fdffff",
        padding: 80,
      }}
    >
      <div style={{ fontSize: 30, color: "#21d7a7", marginBottom: 45 }}>
        TEERUS MICROFINANCE BANK
      </div>
      <div style={{ fontSize: 86, letterSpacing: -4, lineHeight: 1.05 }}>
        Banking that gives your dreams wings.
      </div>
    </div>,
    size,
  );
}
