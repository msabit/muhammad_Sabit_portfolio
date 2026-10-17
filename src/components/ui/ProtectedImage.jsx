// Deters casual saving of personal photos: no right-click "Save image", no drag
// to desktop, no long-press save on phones. A transparent layer sits over the
// image so the browser's image menu never opens. This cannot stop screenshots
// or someone reading the file URL from DevTools; nothing on the web can.
const block = (e) => e.preventDefault();

export default function ProtectedImage({ className = "", wrapperClassName = "relative block", ...img }) {
  return (
    <span className={`protected-image ${wrapperClassName}`} onContextMenu={block} onDragStart={block}>
      <img {...img} className={className} draggable={false} />
      <span aria-hidden="true" className="absolute inset-0" />
    </span>
  );
}
