import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { loadLocalTranscript } from "./lib/episodeTranscripts";

const container = document.getElementById("root")!;
if (container.hasChildNodes()) {
  // SSR includes the route's transcript. Load that same chunk before hydration
  // so the first client render matches, rather than replacing it with a loader.
  // Other transcripts remain lazy; no feed request or content rewrite is needed.
  const episodeSlug = window.location.pathname.match(/^\/episodes\/([^/]+)\/?$/)?.[1];
  void loadLocalTranscript(episodeSlug).then(() => {
    hydrateRoot(container, <App />);
  });
} else {
  createRoot(container).render(<App />);
}
