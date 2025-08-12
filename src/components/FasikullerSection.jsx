import { useState } from "react";
import Lightbox from "./Lightbox";

export default function FasikullerSection({
  hero = "/fasikuller/hero.jpg",
  images = [
    { src: "/fasikuller/1.jpg", alt: "Matematik Fasikülü" },
    { src: "/fasikuller/2.jpg", alt: "Fizik Fasikülü" },
    { src: "/fasikuller/3.jpg", alt: "Kimya Fasikülü" },
    { src: "/fasikuller/4.jpg", alt: "Edebiyat Fasikülü" },
  ],
}) {
  const [lb, setLb] = useState({ open: false, src: "", alt: "" });

  return (
    <section id="fasikuller" className="bg-[#E30613] text-white py-16">
      <div className="max-w-6xl mx-auto px-4 space-y-8">
        <h2 className="text-3xl font-bold text-center">Fasiküllerimiz</h2>
        <p className="text-center max-w-3xl mx-auto text-white/90">
          Deneyimli öğretmenler tarafından titizlikle hazırlanmış, her branşa ait kapsamlı fasiküllerle
          öğrencilerimizin tüm öğrenim ihtiyaçlarını karşılıyoruz.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Büyük Hero Foto */}
          <button
            type="button"
            className="md:row-span-2 rounded-lg overflow-hidden shadow-lg block"
            onClick={() => setLb({ open: true, src: hero, alt: "Fasiküller ana görsel" })}
            title="Büyüt"
          >
            <img src={hero} alt="Fasiküller ana görsel" className="w-full h-full object-cover" />
          </button>

          {/* 4 küçük foto */}
          <div className="grid grid-cols-2 gap-4">
            {images.map((img, i) => (
              <button
                key={i}
                type="button"
                className="rounded-lg shadow-md overflow-hidden block"
                onClick={() => setLb({ open: true, src: img.src, alt: img.alt })}
                title="Büyüt"
              >
                <img src={img.src} alt={img.alt} className="object-cover w-full h-40" />
              </button>
            ))}
          </div>
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
