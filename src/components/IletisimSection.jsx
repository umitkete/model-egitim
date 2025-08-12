import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const RED = "#E30613";
const TR_MOBILE_RE = /^05\d{2}\s?\d{3}\s?\d{2}\s?\d{2}$/;

export default function IletisimSection({
  telDisplay = "0 532 000 00 00",
  address = "Mahalle Sokak No:5, İlçe / Şehir",
  instagram = "https://instagram.com/kullaniciadiniz",
  mapSrc = "",
}) {
  const formRef = useRef(null);
  const [sending, setSending] = useState(false);
  const [msg, setMsg] = useState("");

  // Canlı telefon biçimleme
  const formatPhone = (v) => {
    let d = v.replace(/\D/g, "");
    if (!d.startsWith("05")) { if (d.startsWith("5")) d = "0" + d; }
    d = d.slice(0, 11);
    const out = [];
    if (d.length <= 4) out.push(d);
    else if (d.length <= 7) out.push(d.slice(0,4), d.slice(4));
    else if (d.length <= 9) out.push(d.slice(0,4), d.slice(4,7), d.slice(7));
    else out.push(d.slice(0,4), d.slice(4,7), d.slice(7,9), d.slice(9,11));
    return out.join(" ");
  };

  const onPhoneInput = (e) => {
    e.target.value = formatPhone(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    const f = formRef.current;
    const ad = f.first_name.value.trim();
    const soyad = f.last_name.value.trim();
    const tel = f.phone.value.trim();
    const mesaj = f.message.value.trim();

    // temel doğrulamalar
    if (!ad || !soyad || !tel || !mesaj) {
      setMsg("Lütfen tüm alanları doldurun.");
      return;
    }
    const telRaw = tel.replace(/\s+/g, "");
    if (!TR_MOBILE_RE.test(telRaw) && !TR_MOBILE_RE.test(tel)) {
      setMsg("Telefon 05xx xxx xx xx formatında olmalı.");
      return;
    }

    // gizli from_name alanını doldur (EmailJS şablonun bu değişkeni bekliyor)
    f.from_name.value = `${ad} ${soyad}`;

    try {
      setSending(true);
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      setMsg("Mesajınız başarıyla gönderildi. Teşekkürler!");
      f.reset();
    } catch (err) {
      console.error(err);
      setMsg("Gönderimde sorun oldu. Lütfen tekrar deneyin.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="iletisim" className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sol: Form */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold" style={{ color: RED }}>Bize Ulaşın</h2>

          <form ref={formRef} onSubmit={onSubmit} className="space-y-4" noValidate>
            {/* Gizli alan: EmailJS template -> {{from_name}} */}
            <input type="hidden" name="from_name" />

            <div>
              <label className="block text-sm mb-1 font-semibold">Ad</label>
              <input
                name="first_name"
                type="text"
                placeholder="Adınız"
                className="w-full h-11 rounded-xl border px-3 outline-none focus:border-black/60 font-semibold"
                required
              />
            </div>

            <div>
              <label className="block text-sm mb-1 font-semibold">Soyad</label>
              <input
                name="last_name"
                type="text"
                placeholder="Soyadınız"
                className="w-full h-11 rounded-xl border px-3 outline-none focus:border-black/60 font-semibold"
                required
              />
            </div>

            <div>
              <label className="block text-sm mb-1 font-semibold">Telefon (05xx xxx xx xx)</label>
              <input
                name="phone"
                inputMode="tel"
                pattern="^05\d{2}\s?\d{3}\s?\d{2}\s?\d{2}$"
                placeholder="0533 555 55 55"
                className="w-full h-11 rounded-xl border px-3 outline-none focus:border-black/60 font-semibold"
                onInput={onPhoneInput}
                required
              />
            </div>

            <div>
              <label className="block text-sm mb-1 font-semibold">Mesaj</label>
              <textarea
                name="message"
                rows={5}
                placeholder="Mesajınızı yazın..."
                className="w-full rounded-xl border px-3 py-2 outline-none focus:border-black/60"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full h-11 rounded-2xl font-semibold disabled:opacity-50"
              style={{ backgroundColor: RED, color: "#fff" }}
              disabled={sending}
            >
              {sending ? "Gönderiliyor..." : "Gönder"}
            </button>

            {msg && (
              <p className={`text-sm ${msg.includes("başarı") ? "text-green-600" : "text-red-600"}`}>
                {msg}
              </p>
            )}
          </form>
        </div>

        {/* Sağ: Bilgiler + Instagram + Harita */}
        <div className="space-y-5">
          <div className="rounded-2xl border p-5 text-white" style={{ backgroundColor: RED }}>
            <h3 className="font-bold text-lg">Telefon</h3>
            <p>{telDisplay}</p>
          </div>

          <div className="rounded-2xl border p-5 text-white" style={{ backgroundColor: RED }}>
            <h3 className="font-bold text-lg">Adres</h3>
            <p>{address}</p>
          </div>

          <div className="rounded-2xl border p-5 text-white flex items-center gap-3" style={{ backgroundColor: RED }}>            
            <a href={instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
              {/* Kendi ikon dosyan: /public/icons/instagram.svg */}
              <img src="/icons/instagram.svg" alt="" className="w-6 h-6" />
            </a>
            <h3 className="font-bold text-lg">Instagram</h3>
          </div>

          {mapSrc && (
            <div className="rounded-2xl overflow-hidden border">
              <iframe
                src={mapSrc}
                className="w-full h-64"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                title="Harita"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
