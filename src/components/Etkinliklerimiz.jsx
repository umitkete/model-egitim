import React from "react";
import "./Etkinliklerimiz.css";

export default function Etkinliklerimiz() {
  return (
    <section id="etkinlikler" className="etkinliklerimiz-container">
      <div className="etkinliklerimiz-content">
        <h2>Etkinliklerimiz</h2>
        <p>
          Etüt içinde ve dışında düzenlediğimiz etkinliklerle öğrencilerimizin
          enerjisini yüksek tutuyoruz. Yıl boyunca gerçekleştirilen sosyal,
          sportif ve kültürel faaliyetler; öğrencilerimizin motivasyonunu
          artırırken, eğitim sürecimizi tüm yönleriyle kapsamlı hale getiriyor.
        </p>

        <div className="etkinliklerimiz-galeri">
          <img src="/etkinlik1.jpg" alt="Etkinlik 1" />
          <img src="/etkinlik2.jpg" alt="Etkinlik 2" />
          <img src="/etkinlik3.jpg" alt="Etkinlik 3" />
          <img src="/etkinlik4.jpg" alt="Etkinlik 4" />
          <img src="/etkinlik5.jpg" alt="Etkinlik 5" />
        </div>
      </div>
    </section>
  );
}
