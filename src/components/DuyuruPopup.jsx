import { useEffect } from "react";

export default function DuyuruPopup({
  open,
  onClose,
  onDontShowToday,
  imageSrc = "/duyuru/duyuru.jpg",
  imageAlt = "Duyuru",
  linkHref,
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 grid place-items-center"
      style={{ zIndex: 9400 }}     // WhatsApp 9500, bu 9400: altta kalır ama popup yine görünür
      onClick={onClose}
    >
      <div
        className="w-[92vw] max-w-xl rounded-2xl overflow-hidden bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 h-12" style={{ backgroundColor:"#E30613", color:"#fff" }}>
          <h3 className="font-semibold">Duyuru</h3>
          <button type="button" onClick={onClose} className="rounded-md px-2 py-1 hover:bg-white/10" aria-label="Kapat">✕</button>
        </div>

        {linkHref ? (
          <a href={linkHref} target="_blank" rel="noreferrer">
            <img src={imageSrc} alt={imageAlt} className="w-full h-auto object-cover" />
          </a>
        ) : (
          <img src={imageSrc} alt={imageAlt} className="w-full h-auto object-cover" />
        )}

        <div className="flex items-center justify-between gap-3 px-4 py-3 border-t">
          <button onClick={onDontShowToday} className="text-sm underline underline-offset-4 hover:opacity-80">
            Bugün tekrar gösterme
          </button>
          <button onClick={onClose} className="px-4 h-10 rounded-xl text-white" style={{ backgroundColor:"#E30613" }}>
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
}
