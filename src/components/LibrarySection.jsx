import { useState } from "react";
import Lightbox from "./Lightbox";

export default function LibrarySection({
  hero = "/library/hero.jpg",
  images = [
    { src: "/library/1.jpg", alt: "Sessiz alan" },
    { src: "/library/2.jpg", alt: "Kişiye özel çalışma alanı" },
    { src: "/library/3.jpg", alt: "Kişiye özel kitap dolapları" },
    { src: "/library/4.jpg", alt: "Sessiz alan 2" },
  ],
}) {
  const [lb, setLb] = useState({ open: false, src: "", alt: "" });

  return (
    <section id="kutuphane" className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-4 space-y-8">
        {/* Hero Foto */}
        <div className="relative rounded-2xl overflow-hidden border border-[hsl(var(--border))]">
          <img
            src={hero}
            alt="Kütüphanemiz geniş açı görünüm"
            className="w-full h-[42vh] md:h-[60vh] object-cover"
            loading="eager"
          />
        </div>

        {/* Başlık ve Tanıtım */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-[#E30613]">Kütüphanemiz</h2>
          <p className="mt-3 text-lg">
            09.00–22.30 arası açık. Her öğrenciye <b>kişisel çalışma alanı</b> ve
            <b> kişisel kitap dolabı</b> sunuyoruz; sessiz alan politikamızla verimi artırıyoruz.
          </p>
        </div>

        {/* Galeri */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {images.map((img, i) => (
            <figure
              key={i}
              className="group relative rounded-xl overflow-hidden border border-[hsl(var(--border))] bg-white"
            >
              <button
                type="button"
                onClick={() => setLb({ open: true, src: img.src, alt: img.alt })}
                className="block w-full"
                title="Büyüt"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading={i < 2 ? "eager" : "lazy"}
                />
              </button>
              <figcaption className="absolute inset-x-0 bottom-0 p-2 text-xs text-white/95 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                {img.alt}
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Lightbox */}
        <Lightbox
          open={lb.open}
          src={lb.src}
          alt={lb.alt}
          onClose={() => setLb({ open: false, src: "", alt: "" })}
        />
      </div>
    </section>
  );
}
