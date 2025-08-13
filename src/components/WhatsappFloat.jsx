import { createPortal } from "react-dom";

export default function WhatsappFloat({
  phone = "905423969007",
  message = "Merhaba, bilgi almak istiyorum."
}) {
  const href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  const node = (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="WhatsApp ile yaz"
      className="fixed right-4 bottom-4 w-14 h-14 rounded-full grid place-items-center shadow-2xl hover:scale-105 transition"
      style={{ backgroundColor: "#25D366", zIndex: 9500 }}
    >
      {/* Inline WhatsApp SVG (dosyaya ihtiyaç yok) */}
      <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">
        <path fill="#fff" d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.48 0 .13 5.35.13 11.94c0 2.1.56 4.16 1.63 5.96L0 24l6.29-1.65A11.93 11.93 0 0 0 12.06 24c6.59 0 11.94-5.36 11.94-11.94c0-3.19-1.24-6.19-3.48-8.58zM12.06 22.05c-1.96 0-3.86-.53-5.52-1.54l-.4-.24l-3.74.98l1-3.65l-.26-.42A9.9 9.9 0 0 1 2.14 11.94c0-5.46 4.44-9.9 9.92-9.9c2.64 0 5.13 1.03 7 2.9c1.87 1.87 2.9 4.36 2.9 7c0 5.47-4.45 9.9-9.9 9.9zm5.66-7.43c-.31-.16-1.85-.91-2.14-1.01c-.29-.11-.5-.16-.72.16c-.21.31-.83 1.01-1.02 1.22c-.19.21-.38.23-.7.08c-.31-.16-1.32-.49-2.51-1.57c-.93-.83-1.56-1.86-1.74-2.17c-.18-.31-.02-.48.14-.63c.14-.14.31-.36.46-.54c.16-.19.21-.31.31-.52c.1-.21.05-.39-.02-.54c-.08-.16-.72-1.73-.99-2.37c-.26-.63-.53-.54-.72-.55l-.61-.01c-.2 0-.52.08-.79.39c-.27.31-1.04 1.02-1.04 2.48c0 1.46 1.07 2.87 1.22 3.07c.16.21 2.11 3.22 5.12 4.51c.72.31 1.28.5 1.72.64c.72.23 1.38.2 1.9.12c.58-.09 1.85-.75 2.11-1.47c.26-.72.26-1.34.18-1.47c-.08-.13-.29-.21-.6-.37z"/>
      </svg>
    </a>
  );

  return createPortal(node, document.body);
}
