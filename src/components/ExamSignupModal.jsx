import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const RED = "#E30613";
const TR_MOBILE_RE = /^05\d{2}\s?\d{3}\s?\d{2}\s?\d{2}$/;

export default function ExamSignupModal({ open, onClose }) {
  const formRef = useRef(null);
  const [sending, setSending] = useState(false);
  const [notice, setNotice] = useState(""); // üstte görünen bilgi metni

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
      setNotice("");
      setSending(false);
      formRef.current?.reset();
    };
  }, [open, onClose]);

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

  const submit = async (e) => {
    e.preventDefault();
    const f = formRef.current;
    const ad = f.first_name.value.trim();
    const soyad = f.last_name.value.trim();
    const tel = f.phone.value.trim();
    const grade = f.grade.value; // 9/10/11/12/mezun

    if (!ad || !soyad || !tel || !grade) {
      setNotice("Lütfen tüm alanları doldurun.");
      return;
    }
    const telRaw = tel.replace(/\s+/g, "");
    if (!TR_MOBILE_RE.test(telRaw) && !TR_MOBILE_RE.test(tel)) {
      setNotice("Telefon 05xx xxx xx xx formatında olmalı.");
      return;
    }

    // tekrar kontrolü (localStorage)
    const KEY = "exam-phones";
    const setStr = localStorage.getItem(KEY);
    const set = new Set(setStr ? JSON.parse(setStr) : []);
    const isRepeat = set.has(telRaw);
    // from_name + message EmailJS template’ine uygun
    f.from_name.value = `${ad} ${soyad}`;
    f.message.value = `Deneme Sınavı Kaydı\nSınıf: ${grade}\nTelefon: ${tel}`;

    try {
      setSending(true);
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID, // aynı şablonu kullanıyoruz
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      // numarayı kaydet
      set.add(telRaw);
      localStorage.setItem(KEY, JSON.stringify([...set]));
      // bilgi yazısı
      setNotice(isRepeat ? "Kaydınız tekrar alındı." : "Bilgileriniz alındı, size geri dönüş yapacağız.");
      // 2.5 sn sonra kapan
      setTimeout(() => { onClose(); }, 2500);
    } catch (err) {
      console.error("EXAM MODAL EMAILJS ERROR:", err);
      setNotice("Gönderimde sorun oldu. Lütfen tekrar deneyin.");
    } finally {
      setSending(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[120] bg-black/60 grid place-items-center" onClick={onClose}>
      <div
        className="w-[92vw] max-w-lg rounded-2xl bg-white shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-5 py-4" style={{ backgroundColor: RED, color: "#fff" }}>
          <h3 className="text-lg font-bold">Deneme Sınavı Kaydı</h3>
        </div>

        <form ref={formRef} onSubmit={submit} className="p-5 space-y-4">
          {/* EmailJS değişkenleri */}
          <input type="hidden" name="from_name" />
          <input type="hidden" name="message" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm mb-1 font-semibold">Ad</label>
              <input
                name="first_name"
                type="text"
                placeholder="Adınız"
                className="w-full h-11 rounded-xl border px-3 font-semibold outline-none focus:border-black/60"
                required
              />
            </div>
            <div>
              <label className="block text-sm mb-1 font-semibold">Soyad</label>
              <input
                name="last_name"
                type="text"
                placeholder="Soyadınız"
                className="w-full h-11 rounded-xl border px-3 font-semibold outline-none focus:border-black/60"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1 font-semibold">Telefon (05xx xxx xx xx)</label>
            <input
              name="phone"
              inputMode="tel"
              pattern="^05\d{2}\s?\d{3}\s?\d{2}\s?\d{2}$"
              placeholder="0533 555 55 55"
              className="w-full h-11 rounded-xl border px-3 font-semibold outline-none focus:border-black/60"
              onInput={onPhoneInput}
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1 font-semibold">Sınıf</label>
            <select
              name="grade"
              className="w-full h-11 rounded-xl border px-3 outline-none focus:border-black/60"
              defaultValue=""
              required
            >
              <option value="" disabled>Seçiniz…</option>
              <option value="9">9. Sınıf</option>
              <option value="10">10. Sınıf</option>
              <option value="11">11. Sınıf</option>
              <option value="12">12. Sınıf</option>
              <option value="Mezun">Mezun</option>
            </select>
          </div>

          {notice && (
            <p className={`text-sm ${notice.includes("sorun") ? "text-red-600" : "text-green-700"}`}>
              {notice}
            </p>
          )}

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              className="h-10 px-4 rounded-xl border"
              onClick={onClose}
              disabled={sending}
            >
              Kapat
            </button>
            <button
              type="submit"
              className="h-10 px-4 rounded-xl text-white"
              style={{ backgroundColor: RED }}
              disabled={sending}
            >
              {sending ? "Gönderiliyor…" : "Gönder"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
