import { useEffect } from "react";

export default function Lightbox({ open, src, alt = "", onClose }) {
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
    <div className="fixed inset-0 z-[100] bg-black/70 grid place-items-center" onClick={onClose}>
      <div className="max-w-[92vw] max-h-[92vh]" onClick={(e) => e.stopPropagation()}>
        <img src={src} alt={alt} className="max-w-full max-h-[92vh] rounded-lg shadow-2xl" />
      </div>
    </div>
  );
}
