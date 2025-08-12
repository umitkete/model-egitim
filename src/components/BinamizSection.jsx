import { useState } from "react";
import Lightbox from "./Lightbox";

export default function BinamizSection({
  hero = "/binamiz/hero-discephe.jpg",
  images = [
    { src: "/binamiz/sinif-1.jpg", alt: "Geniş sınıf — akıllı tahta" },
    { src: "/binamiz/sinif-2.jpg", alt: "Modern sınıf — rahat oturma düzeni" },
    { src: "/binamiz/study-lounge.jpg", alt: "Öğrenci yaşam alanı / lounge" },
    { src: "/binamiz/discephe.jpg", alt: "Binamız — dış cephe görünümü" },
  ],
}) {
  const [lb, setLb] = useState({ open:false, src:"", alt:"" });

  return (
    <section id="kampus" className="bg-[#E30613] text-white py-16">
      <div className="max-w-6xl mx-auto px-4 space-y-8">
        {/* Başlık + metin */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold">Binamız</h2>
          <p className="mt-3 text-white/90 leading-relaxed">
            Derslerin işlendiği sınıflarımız ferah, aydınlık ve teknolojik donanımlıdır.
            Dıştan modern mimarisiyle dikkat çeken binamızın içinde öğrenciler için
            <strong> rahat yaşam alanları</strong>, sosyalleşme ve kısa molalar için
            <strong> samimi lounge</strong> noktaları bulunur. Hedef: gün boyu
            <strong> konfor + verim</strong>.
          </p>
        </div>

        {/* Hero (dış cephe veya geniş açı sınıf) */}
        <button
          type="button"
          className="block w-full rounded-2xl overflow-hidden border border-white/20 shadow-lg"
          onClick={() => setLb({ open:true, src:hero, alt:"Binamız — geniş görünüm" })}
          title="Büyüt"
        >
          <img
            src={hero}
            alt="Binamız — geniş görünüm"
            className="w-full h-[42vh] md:h-[60vh] object-cover"
            loading="eager"
          />
        </button>

        {/* 4’lü galeri */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {images.map((img,i)=>(
            <button
              key={i}
              type="button"
              className="rounded-xl overflow-hidden border border-white/20 bg-white/5 hover:bg-white/10 transition"
              onClick={() => setLb({ open:true, src:img.src, alt:img.alt })}
              title="Büyüt"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="aspect-[4/3] w-full object-cover"
                loading={i < 2 ? "eager" : "lazy"}
              />
            </button>
          ))}
        </div>

        {/* Heveslendirici alt vurgu */}
        <div className="rounded-2xl border border-white/20 bg-white/5 p-4 md:p-5">
          <p className="text-white/95">
            Sadece ders değil; <strong>güçlü bir çalışma rutini</strong> ve
            <strong> motive eden bir ortam</strong>. Öğrencilerimiz burada ders aralarında nefes alır,
            enerjisini toplar ve hedeflerine <strong>istikrarlı</strong> adımlarla yürür.
          </p>
        </div>

        {/* Lightbox */}
        <Lightbox
          open={lb.open}
          src={lb.src}
          alt={lb.alt}
          onClose={() => setLb({ open:false, src:"", alt:"" })}
        />
      </div>
    </section>
  );
}
