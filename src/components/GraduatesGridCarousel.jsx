// src/components/GraduatesGridCarousel.jsx
import { useEffect, useMemo, useRef, useState } from "react";

export default function GraduatesGridCarousel({ data = [] }) {
  // 4x5 = 20 kişi/ekran
  const pageSize = 20;

  const pages = useMemo(() => {
    const arr = [];
    for (let i = 0; i < data.length; i += pageSize) arr.push(data.slice(i, i + pageSize));
    return arr.length ? arr : [[]];
  }, [data]);

  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const resumeTimer = useRef(null);

  // 3 sn’de bir otomatik geçiş (kullanıcı etkileşimi yoksa)
  useEffect(() => {
    const t = setInterval(() => {
      if (!paused) setIdx((p) => (p + 1) % pages.length);
    }, 3000);
    return () => clearInterval(t);
  }, [paused, pages.length]);

  const userInteracted = () => {
    setPaused(true);
    clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setPaused(false), 6000);
  };

  const page = pages[idx] ?? [];

  return (
    <section
      id="mezunlar"
      className="py-10"
      style={{ backgroundColor: "#E30613" }} // logo kırmızısı
      onMouseMove={userInteracted}
      onKeyDown={userInteracted}
      onTouchStart={userInteracted}
    >
      <div className="max-w-6xl mx-auto px-4 space-y-4 text-white">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Başarı Tablomuz</h2>
          <div className="space-x-2">
            <button
              className="text-xs rounded-2xl border border-white px-3 h-9 hover:bg-white/10 transition"
              onClick={() => { userInteracted(); setIdx((p) => (p - 1 + pages.length) % pages.length); }}
            >
              Önceki
            </button>
            <button
              className="text-xs rounded-2xl bg-white text-[#E30613] px-3 h-9 hover:opacity-90 transition"
              onClick={() => { userInteracted(); setIdx((p) => (p + 1) % pages.length); }}
            >
              Sonraki
            </button>
          </div>
        </div>

        {/* 4 sütun (lg ve üzeri). Küçük ekranlarda akıllı kırılım */}
        <div
          role="list"
          aria-label="Mezun listesi"
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3"
        >
          {page.map((s, i) => (
            <article
              key={i}
              role="listitem"
              className="rounded-xl border border-white/30 bg-white/5 p-3 hover:bg-white/10 transition"
              title={`${s.ad} ${s.soyad} — ${s.bolum}`}
            >
              <div className="font-semibold truncate text-white">
                {s.ad} {s.soyad}
              </div>
              <div className="text-sm truncate text-white/80">{s.bolum}</div>
            </article>
          ))}

          {/* 20’den azsa boş kartlarla hizayı koru (4x5 görünümü sabit kalsın) */}
          {Array.from({ length: Math.max(0, 20 - page.length) }).map((_, i) => (
            <div key={`empty-${i}`} className="rounded-xl border border-white/20 bg-white/5 p-3 opacity-50" />
          ))}
        </div>
      </div>
    </section>
  );
}

