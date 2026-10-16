import React from "react";
import ReactDOM from "react-dom/client";
// Self-hosted variable fonts (no Google Fonts request blocking first paint).
import "@fontsource-variable/bricolage-grotesque/opsz.css";
import "@fontsource-variable/schibsted-grotesk";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
