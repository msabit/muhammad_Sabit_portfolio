import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import App from "./App";

// Used at build time only (scripts/prerender.js) to bake the page into index.html.
export function render() {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
