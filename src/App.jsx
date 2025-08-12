import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import VideoSection from "./components/VideoSection";
import GraduatesGridCarousel from "./components/GraduatesGridCarousel";
import LibrarySection from "./components/LibrarySection";
import FasikullerSection from "./components/FasikullerSection";
import KadromuzSection from "./components/KadromuzSection";
import BinamizSection from "./components/BinamizSection";
import IletisimSection from "./components/IletisimSection";
import ExamSignupModal from "./components/ExamSignupModal";
import DuyuruPopup from "./components/DuyuruPopup";

// Örnek veri (yerine kendi listenizi koyabilirsiniz)
const mezunlar = Array.from({ length: 25 }).map((_, i) => ({
  ad: `Ad${i + 1}`,
  soyad: `Soyad${i + 1}`,
  bolum: "Üniversite – Bölüm",
}));

export default function App() {
  // Deneme Sınavı modal durumu
  const [examOpen, setExamOpen] = useState(false);
  const [duyuruOpen, setDuyuruOpen] = useState(false);

  // Duyuru otomatik gösterim (1 gün kuralı)
  useEffect(() => {
    const KEY = "duyuru:lastSeen";
    const last = localStorage.getItem(KEY);
    const now = Date.now();
    const DAY = 24 * 60 * 60 * 1000; // 1 gün
    if (!last || now - Number(last) > DAY) {
      setDuyuruOpen(true);
      localStorage.setItem(KEY, String(now));
    }
  }, []);

  return (
    <>
      {/* Navbar: CTA modali açsın */}
      <Navbar onExamClick={() => setExamOpen(true)} />

      {/* 1) Video — BEYAZ */}
      <section id="video" className="bg-white">
        <VideoSection />
      </section>

      {/* 2) Mezunlarımız — KIRMIZI (bileşenin kendi arka planı var) */}
      {mezunlar.length > 0 && <GraduatesGridCarousel data={mezunlar} />}

      {/* 3) Kütüphane — BEYAZ (varsayılan: /library/hero.jpg ve /library/1..4.jpg) */}
      <section className="bg-white">
        <LibrarySection />
      </section>

      {/* 4) Fasiküller — KIRMIZI (varsayılan: /fasikuller/hero.jpg ve /fasikuller/1..4.jpg) */}
      <FasikullerSection />

      {/* 5) Kadromuz — BEYAZ */}
      <KadromuzSection />

      {/* 6) Binamız — KIRMIZI */}
      <BinamizSection />

      {/* 7) İletişim — BEYAZ */}
      <IletisimSection
        telDisplay="0542 396 90 07 veya 0552 382 86 83"
        address="Güzelyalı, 81123. Sk. No:9, 01170 Çukurova/Adana"
        instagram="https://www.instagram.com/modelogretim/"
        mapSrc="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3184.3322687699465!2d35.3047921!3d37.0495644!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15288fb60826e4f3%3A0x8ca1463a86ba39c!2sModel%20E%C4%9Fitim%20Kurumlar%C4%B1!5e0!3m2!1str!2str!4v1754996501011!5m2!1str!2str"
      />

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/905423969007?text=Merhaba%2C%20bilgi%20almak%20istiyorum."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 z-50 bg-green-500 p-3 rounded-full shadow-lg hover:bg-green-600 transition"
      >
        <img src="/whatsapp-icon.png" alt="WhatsApp" className="w-8 h-8" />
      </a>

      {/* Deneme Sınavı Kayıt Modali */}
      <ExamSignupModal open={examOpen} onClose={() => setExamOpen(false)} />

      {/* Duyuru Popup */}
      <DuyuruPopup
        open={duyuruOpen}
        onClose={() => setDuyuruOpen(false)}
        imageSrc="/duyuru/duyuru.jpg"  // fotoğrafını buraya koyuyorsun
        imageAlt="Duyuru"
        // linkHref="https://ornek-link.com" // duyuruya tıklayınca gitsin istersen aç
      />
    </>
  );
}
