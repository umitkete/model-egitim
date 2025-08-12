import { useEffect, useRef, useState } from "react";

const cfg = {
  imageUrl: "/public/duyuru.jpg",        // public/duyuru.jpg koy; sonra burayı sadece değiştir
  altText: "Güncel duyuru",
  linkUrl: "",                    // istersen bir kampanya sayfasına bağla
  showFrequency: "oncePerDay",    // once | oncePerDay | everyVisit
  openDelayMs: 800,
  resumeScroll: true
};

function shouldOpen(freq){
  if(freq==="everyVisit") return true;
  const key="announce_last";
  const last=localStorage.getItem(key);
  const now=new Date();
  if(!last){ localStorage.setItem(key, now.toISOString()); return true; }
  if(freq==="once") return false;
  if(freq==="oncePerDay"){
    const lastDate=new Date(last);
    const diff=(now-lastDate)/(1000*60*60*24);
    if(diff>=1){ localStorage.setItem(key, now.toISOString()); return true; }
    return false;
  }
  return true;
}

export default function AnnouncementModal(){
  const [open,setOpen]=useState(false);
  const close=()=>setOpen(false);
  const firstBtnRef=useRef(null);

  useEffect(()=>{
    const t=setTimeout(()=>{ if(shouldOpen(cfg.showFrequency)) setOpen(true); }, cfg.openDelayMs);
    return ()=>clearTimeout(t);
  },[]);

  useEffect(()=>{
    if(!open) return;
    const onKey=(e)=>{ if(e.key==="Escape") close(); };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow="hidden";
    window.addEventListener("keydown", onKey);
    firstBtnRef.current?.focus();
    return ()=>{
      document.body.style.overflow=prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  },[open]);

  if(!open) return null;

  const content = (
    <img src={cfg.imageUrl} alt={cfg.altText} className="max-h-[80vh] w-auto object-contain"/>
  );

  return (
    <div role="dialog" aria-modal="true"
         className="fixed inset-0 z-50 grid place-items-center bg-black/50"
         onClick={close}>
      <div className="bg-white p-3 rounded-xl shadow-xl max-w-[90vw]" onClick={(e)=>e.stopPropagation()}>
        <div className="flex justify-end">
          <button ref={firstBtnRef} className="btn-outline text-xs" onClick={close}>Kapat</button>
        </div>
        <div className="p-2">
          {cfg.linkUrl ? <a href={cfg.linkUrl} target="_blank" rel="noreferrer">{content}</a> : content}
        </div>
      </div>
    </div>
  );
}
