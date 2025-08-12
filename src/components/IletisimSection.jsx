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

  // Telefonu canlı biçimle
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
  const onPhoneInput = (e) => { e.target.value = formatPhone(e.target.value); };

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    const f = formRef.current;
    const ad = f.first_name.value.trim();
    const soyad = f.last_name.value.trim();
    const tel = f.phone.value.trim();
    const mesaj = f.message.value.trim();

    if (!ad || !soyad || !tel || !mesaj) {
      setMsg("Lütfen tüm alanları doldurun.");
      return;
    }
    const telRaw = tel.replace(/\s+/g, "");
    if (!TR_MOBILE_RE.test(telRaw) && !TR_MOBILE_RE.test(tel)) {
      setMsg("Telefon 05xx xxx xx xx formatında olmalı.");
      return;
    }

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
    // Tüm bölüm KIRMIZI zemin, yazılar varsayılan beyaz
    <section id="iletisim" className="py-16 text-white" style={{ backgroundColor: RED }}>
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Sol: Form (beyaz kart) */}
        <div className="rounded-2xl bg-white text-[hsl(var(--foreground))] p-6 shadow-lg">
          <h2 className="text-3xl font-extrabold mb-6" style={{ color: RED }}>Bize Ulaşın</h2>

          <form ref={formRef} onSubmit={onSubmit} className="space-y-4" noValidate>
            <input type="hidden" name="from_name" />

            <div>
              <label className="block text-sm mb-1 font-semibold" style={{ color: RED }}>Ad</label>
              <input
                name="first_name"
                type="text"
                placeholder="Adınız"
                className="w-full h-11 rounded-xl border px-3 outline-none focus:border-black/60 font-semibold bg-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm mb-1 font-semibold" style={{ color: RED }}>Soyad</label>
              <input
                name="last_name"
                type="text"
                placeholder="Soyadınız"
                className="w-full h-11 rounded-xl border px-3 outline-none focus:border-black/60 font-semibold bg-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm mb-1 font-semibold" style={{ color: RED }}>
                Telefon (05xx xxx xx xx)
              </label>
              <input
                name="phone"
                inputMode="tel"
                pattern="^05\d{2}\s?\d{3}\s?\d{2}\s?\d{2}$"
                placeholder="0533 555 55 55"
                className="w-full h-11 rounded-xl border px-3 outline-none focus:border-black/60 font-semibold bg-white"
                onInput={onPhoneInput}
                required
              />
            </div>

            <div>
              <label className="block text-sm mb-1 font-semibold" style={{ color: RED }}>Mesaj</label>
              <textarea
                name="message"
                rows={5}
                placeholder="Mesajınızı yazın..."
                className="w-full rounded-xl border px-3 py-2 outline-none focus:border-black/60 bg-white"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full h-11 rounded-2xl font-extrabold border transition hover:opacity-90"
              style={{ backgroundColor: "#fff", color: RED, borderColor: RED, borderWidth: 2 }}
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

        {/* Sağ: Bilgiler (beyaz kartlar) */}
        <div className="space-y-5">
          <div className="rounded-2xl bg-white p-5 shadow-lg">
            <h3 className="font-extrabold text-lg" style={{ color: RED }}>Telefon</h3>
            <p className="font-semibold text-black">{telDisplay}</p>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-lg">
            <h3 className="font-extrabold text-lg" style={{ color: RED }}>Adres</h3>
            <p className="font-semibold text-black">{address}</p>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-lg flex items-center gap-3">
            <a href={instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
              <img src="/icons/instagram.svg" alt="" className="w-6 h-6" />
            </a>
            <h3 className="font-extrabold text-lg" style={{ color: RED }}>Instagram</h3>
          </div>

          {mapSrc && (
            <div className="rounded-2xl overflow-hidden bg-white shadow-lg">
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
