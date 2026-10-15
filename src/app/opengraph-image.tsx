import { ImageResponse } from "next/og";
import { metrics, profile } from "@/data/profile";

// Required for the static export used on GitHub Pages.
export const dynamic = "force-static";

export const alt = `${profile.name} — ${profile.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#12110f",
          color: "#ece6dc",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 72, fontWeight: 700 }}>{profile.name}</div>
          <div style={{ fontSize: 36, color: "#ff6a3d", marginTop: 8 }}>{profile.title}</div>
          <div style={{ fontSize: 30, color: "#a39b8f", marginTop: 28, maxWidth: 1000 }}>
            Real-time voice AI · LLM/RAG pipelines · Secure production backends
          </div>
        </div>
        <div style={{ display: "flex", gap: 56 }}>
          {metrics.slice(0, 2).map((m) => (
            <div key={m.label} style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 56, fontWeight: 700, color: "#ff6a3d" }}>{m.value}</div>
              <div style={{ fontSize: 24, color: "#a39b8f" }}>{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
