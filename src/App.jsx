import { useEffect, useState } from "react";
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
import Etkinliklerimiz from "./components/Etkinliklerimiz";

// örnek veri (varsa seninkini kullan)
const mezunlar = Array.from({ length: 25 }).map((_, i) => ({
  ad: `Ad${i + 1}`,
  soyad: `Soyad${i + 1}`,
  bolum: "Üniversite – Bölüm",
}));

// bugünün tarihini YYYY-MM-DD üret
const todayKey = () => {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};

export default function App() {
  const [examOpen, setExamOpen] = useState(false);
  const [duyuruOpen, setDuyuruOpen] = useState(false);

  // Açılışta: sadece "bugün gösterme" işaretlenmediyse aç
  useEffect(() => {
    const KEY = "duyuru:hiddenForDay";
    const hiddenFor = localStorage.getItem(KEY);
    if (hiddenFor === todayKey()) {
      setDuyuruOpen(false); // bugün için kapalı
    } else {
      setDuyuruOpen(true);  // her açılışta göster
    }
  }, []);

  // "Bugün tekrar gösterme" butonu
  const handleDontShowToday = () => {
    localStorage.setItem("duyuru:hiddenForDay", todayKey());
    setDuyuruOpen(false);
  };

  return (
    <>
      <Navbar onExamClick={() => setExamOpen(true)} />

      {/* 1) Video — BEYAZ */}
      <section id="video" className="bg-white">
        <VideoSection />
      </section>

      {/* 2) Mezunlarımız — KIRMIZI */}
      {mezunlar.length > 0 && <GraduatesGridCarousel data={mezunlar} />}

      {/* 3) Kütüphane — BEYAZ */}
      <section className="bg-white">
        <LibrarySection />
      </section>

      {/* 4) Fasiküller — KIRMIZI */}
      <FasikullerSection />

      {/* 5) Kadromuz — BEYAZ */}
      <KadromuzSection />

      {/* 6) Binamız — KIRMIZI */}
      <BinamizSection />

      {/* 7) Etkinliklerimiz-BEYAZ */}
      <Etkinliklerimiz />

      {/* 7) İletişim — KIRMIZI */}
      <section className="bg-white">
        <IletisimSection
          telDisplay="0542 396 90 07"
          address="Güzelyalı, 81123. Sk. No:9, 01170 Çukurova/Adana"
          instagram="https://www.instagram.com/modelogretim/"
          mapSrc="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3184.3322687699465!2d35.3047921!3d37.0495644!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15288fb60826e4f3%3A0x8ca1463a86ba39c!2sModel%20E%C4%9Fitim%20Kurumlar%C4%B1!5e0!3m2!1str!2str!4v1754996501011!5m2!1str!2str"
        />
      </section>

      {/* Modaller */}
      <ExamSignupModal open={examOpen} onClose={() => setExamOpen(false)} />

      {/* Duyuru Popup — her açılışta göster; "Bugün tekrar gösterme" tıklanırsa gün boyu kapat */}
      <DuyuruPopup
        open={duyuruOpen}
        onClose={() => setDuyuruOpen(false)}
        onDontShowToday={handleDontShowToday}
        imageSrc="/duyuru/duyuru.jpg"
        imageAlt="Duyuru"
        // linkHref="https://ornek-link.com" // istersen aç
      />
    </>
  );
}
