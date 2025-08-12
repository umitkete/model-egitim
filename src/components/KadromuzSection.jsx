import { useMemo, useRef, useState } from "react";

/**
 * Kullanım:
 * <KadromuzSection
 *   featured={[
 *     { ad:"Umut", soyad:"K.", brans:"Kurucu / Eğitim Koçu", photo:"/kadro/kurucu1.jpg",
 *       bio:"20 senedir rehberlik hizmetinde; eğitim koçluğu ile yüzlerce öğrenciyi hayallerine ulaştırdı." },
 *     { ad:"Ayşe", soyad:"Yılmaz", brans:"Kurucu / Matematik", photo:"/kadro/kurucu2.jpg",
 *       bio:"Sınav stratejileri ve özgün fasikül geliştirme deneyimiyle başarı grafiğini sürekli yükseltti." }
 *   ]}
 *   teachers={...}  // (opsiyonel) 12 öğretmenlik liste; vermezsen defaultTeachers kullanılır
 * />
 */

export default function KadromuzSection({ featured = defaultFeatured, teachers = defaultTeachers }) {
  // Öne çıkanlar (büyük kartlar)
  const hasFeatured = Array.isArray(featured) && featured.length > 0;

  // Sayfalı listeye girecek öğretmenler (featured olmayanlar)
  const regular = useMemo(() => {
    const isFeatured = new Set(featured.map(f => `${f.ad}|${f.soyad}`));
    return teachers.filter(t => !isFeatured.has(`${t.ad}|${t.soyad}`));
  }, [teachers, featured]);

  // 4'lü sayfalar
  const pages = useMemo(() => {
    const out = [];
    for (let i = 0; i < regular.length; i += 4) out.push(regular.slice(i, i + 4));
    return out.length ? out : [[]];
  }, [regular]);

  const [page, setPage] = useState(0);
  const touchX = useRef(null);
  const SWIPE = 40;

  const prev = () => setPage(p => (p - 1 + pages.length) % pages.length);
  const next = () => setPage(p => (p + 1) % pages.length);

  const onTouchStart = (e) => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (dx > SWIPE) prev();
    if (dx < -SWIPE) next();
    touchX.current = null;
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  };

  const curr = pages[page] ?? [];

  return (
    <section
      id="kadro"
      className="bg-white text-[hsl(var(--foreground))] py-16"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="max-w-6xl mx-auto px-4 space-y-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center">Tecrübeli Kadromuz</h2>

        {/* Öne çıkan kurucular / büyük kartlar */}
        {hasFeatured && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featured.map((t, i) => (
              <article
                key={`f-${i}`}
                className="rounded-2xl border border-[hsl(var(--border))] overflow-hidden bg-white shadow-sm hover:shadow transition"
              >
                <div className="grid md:grid-cols-5 gap-0">
                  <div className="md:col-span-2 aspect-[4/3] md:aspect-auto md:h-full overflow-hidden">
                    <img
                      src={t.photo}
                      alt={`${t.ad} ${t.soyad}`}
                      className="w-full h-full object-cover"
                      loading={i < 1 ? "eager" : "lazy"}
                    />
                  </div>
                  <div className="md:col-span-3 p-4 md:p-6 flex flex-col justify-center">
                    <h3 className="text-xl font-semibold">{t.ad} {t.soyad}</h3>
                    <p className="text-sm text-[hsl(var(--muted-foreground))] mb-3">{t.brans}</p>
                    <p className="leading-relaxed">{t.bio}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* 4’lü sayfalı galeri */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Öğretmenlerimiz</h3>
          <div className="space-x-2">
            <button type="button" className="btn-outline text-xs h-9 px-3" onClick={prev}>← Önceki</button>
            <button type="button" className="btn-primary text-xs h-9 px-3" onClick={next}>Sonraki →</button>
          </div>
        </div>

        <div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
          tabIndex={0}
          onKeyDown={onKeyDown}
          aria-label="Öğretmen listesi"
        >
          {curr.map((t, i) => (
            <article
              key={i}
              className="rounded-xl border border-[hsl(var(--border))] overflow-hidden bg-white shadow-sm hover:shadow transition"
            >
              <div className="aspect-square w-full overflow-hidden">
                <img src={t.photo} alt={`${t.ad} ${t.soyad}`} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="p-3">
                <h4 className="font-semibold truncate">{t.ad} {t.soyad}</h4>
                <p className="text-sm text-[hsl(var(--muted-foreground))] truncate">{t.brans}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-[hsl(var(--muted-foreground))]">{page + 1} / {pages.length}</span>
        </div>

        {/* Alt vurgu metni */}
        <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--muted))] p-5 md:p-6">
          <p className="text-sm md:text-base text-[hsl(var(--foreground))]/90 leading-relaxed">
            Kadromuz, yıllardır sahada edindiği<strong> derin tecrübe</strong> ve
            <strong> kanıtlı başarılarla</strong> öğrencilerimizin yanında. Her branşta özgün materyaller,
            bireysel takip ve sınav stratejileriyle<strong> istikrarlı sonuçlar</strong> üretiyoruz.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---- Varsayılan veriler (istersen App’te kendi listenle override edebilirsin) ---- */
const defaultFeatured = [
  {
    ad: "Umut",
    soyad: "K.",
    brans: "Kurucu / Eğitim Koçu",
    photo: "/kadro/kurucu1.jpg",
    bio: "20 senedir rehberlik hizmetinde; eğitim koçluğu ile yüzlerce öğrenciyi hayallerine ulaştırdı."
  },
  {
    ad: "Ayşe",
    soyad: "Yılmaz",
    brans: "Kurucu / Matematik",
    photo: "/kadro/kurucu2.jpg",
    bio: "Sınav stratejileri ve özgün fasikül geliştirme deneyimiyle başarı grafiğini sürekli yükseltti."
  }
];

const defaultTeachers = [
  { ad: "Mehmet", soyad: "Demir",  photo: "/kadro/1.jpg",  brans: "Matematik" },
  { ad: "Elif",   soyad: "Kaya",   photo: "/kadro/2.jpg",  brans: "Fizik"     },
  { ad: "Ali",    soyad: "Çelik",  photo: "/kadro/3.jpg",  brans: "Kimya"     },
  { ad: "Deniz",  soyad: "Yıldız", photo: "/kadro/4.jpg",  brans: "Biyoloji"  },
  { ad: "Zeynep", soyad: "Aydın",  photo: "/kadro/5.jpg",  brans: "Türkçe"    },
  { ad: "Can",    soyad: "Şahin",  photo: "/kadro/6.jpg",  brans: "Matematik" },
  { ad: "Ece",    soyad: "Koç",    photo: "/kadro/7.jpg",  brans: "Fizik"     },
  { ad: "Berk",   soyad: "Arslan", photo: "/kadro/8.jpg",  brans: "Kimya"     },
  { ad: "İrem",   soyad: "Kara",   photo: "/kadro/9.jpg",  brans: "Biyoloji"  },
  { ad: "Mert",   soyad: "Öztürk", photo: "/kadro/10.jpg", brans: "Matematik" },
  { ad: "Seda",   soyad: "Er",     photo: "/kadro/11.jpg", brans: "Fizik"     },
  { ad: "Tolga",  soyad: "Akın",   photo: "/kadro/12.jpg", brans: "Türkçe"    },
];
