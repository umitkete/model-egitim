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
import WhatsappFloat from "./components/WhatsappFloat";

const mezunlar = Array.from({ length: 60 }).map((_, i) => ({
  ad: `Ad${i + 1}`,
  soyad: `Soyad${i + 1}`,
  bolum: "Üniversite – Bölüm",
}));

const todayKey = () => {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};

// Yeni key: v2 ile eski localStorage kayıtlarını baypas ediyoruz
const DUYURU_KEY = "duyuru:v2:hiddenForDay";

export default function App() {
  const [examOpen, setExamOpen] = useState(false);
  const [duyuruOpen, setDuyuruOpen] = useState(false);

  useEffect(() => {
    // ?announce=1 ile zorla aç (debug/deneme için birebir)
    const params = new URLSearchParams(window.location.search);
    if (params.get("announce") === "1") {
      setDuyuruOpen(true);
      return;
    }

    // localStorage güvenli erişim (Safari private vs.)
    let hiddenFor = null;
    try {
      hiddenFor = localStorage.getItem(DUYURU_KEY);
    } catch {
      hiddenFor = null;
    }

    if (hiddenFor === todayKey()) setDuyuruOpen(false);
    else setDuyuruOpen(true);
  }, []);

  const handleDontShowToday = () => {
    try {
      localStorage.setItem(DUYURU_KEY, todayKey());
    } catch {}
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

      {/* 7) Etkinliklerimiz — BEYAZ */}
      <section className="bg-white">
        <Etkinliklerimiz />
      </section>

      {/* 8) İletişim — KIRMIZI */}
      <IletisimSection
        telDisplay="0542 396 90 07"
        address="Güzelyalı, 81123. Sk. No:9, 01170 Çukurova/Adana"
        instagram="https://www.instagram.com/modelogretim/"
        mapSrc="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3184.3322687699465!2d35.3047921!3d37.0495644!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15288fb60826e4f3%3A0x8ca1463a86ba39c!2sModel%20E%C4%9Fitim%20Kurumlar%C4%B1!5e0!3m2!1str!2str!4v1754996501011!5m2!1str!2str"
      />

      {/* Modaller */}
      <ExamSignupModal open={examOpen} onClose={() => setExamOpen(false)} />

      {/* Duyuru Popup */}
      <DuyuruPopup
        open={duyuruOpen}
        onClose={() => setDuyuruOpen(false)}
        onDontShowToday={handleDontShowToday}
        imageSrc="/duyuru/duyuru.jpg"
        imageAlt="Duyuru"
      />

      {/* WhatsApp — portal + zIndex:9500 */}
      <WhatsappFloat phone="905423969007" message="Merhaba, Model Eğitim hakkında bilgi almak istiyorum." />
    </>
  );
}
