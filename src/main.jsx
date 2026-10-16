import React from "react";
import ReactDOM from "react-dom/client";
// Self-hosted variable fonts (no Google Fonts request blocking first paint).
import "@fontsource-variable/bricolage-grotesque/opsz.css";
import "@fontsource-variable/schibsted-grotesk";
import "./index.css";
import App from "./App";

const container = document.getElementById("root");
const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Production HTML is pre-rendered (scripts/prerender.js), so hydrate it; the dev
// server serves an empty root, so render from scratch there.
if (container.hasChildNodes()) ReactDOM.hydrateRoot(container, app);
else ReactDOM.createRoot(container).render(app);
