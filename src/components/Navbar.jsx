import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar({ onExamClick }) {
  const [open, setOpen] = useState(false);

  const NavLinks = () => (
    <>
      <a href="#mezunlar" className="hover:opacity-90 text-base font-medium">Mezunlarımız</a>
      <a href="#kutuphane" className="hover:opacity-90 text-base font-medium">Kütüphane</a>
      <a href="#fasikuller" className="hover:opacity-90 text-base font-medium">Fasiküller</a>
      <a href="#kadro" className="hover:opacity-90 text-base font-medium">Kadromuz</a>
      <a href="#kampus" className="hover:opacity-90 text-base font-medium">Binamız</a>
      <a href="#iletisim" className="hover:opacity-90 text-base font-medium">İletişim</a>
    </>
  );

  const CTAGroup = () => (
    <div className="flex items-center gap-3">
      <button
        onClick={() => onExamClick?.()}
        className="text-sm px-6 py-3 flex items-center justify-center rounded-2xl border border-white text-white hover:bg-white/10 transition font-semibold"
      >
        Deneme Sınavına Kaydol
      </button>
    </div>
  );

  return (
    <header className="sticky top-0 z-40">
      <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center text-white">
        {/* Logo */}
        <a href="#" className="flex items-center min-w-0">
          <img
            src="/logo.png"
            alt="Özel Model Eğitim Kursu"
            className="h-16 w-auto" // h-12 → h-16
          />
        </a>

        {/* Arka plan */}
        <div className="absolute inset-0 -z-10 bg-[#E30613]/95 backdrop-blur" />

        {/* Orta linkler */}
        <div className="hidden lg:flex items-center gap-8 ml-8">
          <NavLinks />
        </div>

        {/* Sağ tarafta CTA */}
        <div className="hidden lg:block ml-auto">
          <CTAGroup />
        </div>

        {/* Mobil menü butonu */}
        <button
          className="lg:hidden ml-auto h-12 w-12 grid place-items-center rounded-2xl border border-white/60 hover:bg-white/10 transition"
          aria-label="Menüyü aç/kapat"
          onClick={() => setOpen((s) => !s)}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobil açılır menü */}
      {open && (
        <div className="lg:hidden text-white" style={{ backgroundColor: "#E30613" }}>
          <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-4 text-base font-medium">
            <NavLinks />
            <div className="pt-3"><CTAGroup /></div>
          </div>
        </div>
      )}
    </header>
  );
}
