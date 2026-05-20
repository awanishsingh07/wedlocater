import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RiCloseLine, RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

export default function PortfolioGrid({ images = [], name = "" }) {
  const [lightbox, setLightbox] = useState(false);
  const [idx, setIdx] = useState(0);

  const open  = (i) => { setIdx(i); setLightbox(true); };
  const close = ()  => setLightbox(false);
  const prev  = ()  => setIdx(i => (i - 1 + images.length) % images.length);
  const next  = ()  => setIdx(i => (i + 1) % images.length);

  const layouts = [
    "col-span-2 row-span-2",
    "col-span-1 row-span-1",
    "col-span-1 row-span-1",
    "col-span-1 row-span-1",
    "col-span-1 row-span-1",
    "col-span-1 row-span-1",
  ];

  return (
    <>
      <div className="grid grid-cols-3 grid-rows-3 gap-2 h-[340px] sm:h-[420px]">
        {images.slice(0, 6).map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.07, duration: 0.4 }}
            onClick={() => open(i)}
            className={`relative overflow-hidden cursor-pointer group
              ${layouts[i] || "col-span-1 row-span-1"}
              ${i === 0 ? "rounded-tl-luxury" : ""}
              ${i === 1 ? "rounded-tr-luxury" : ""}
              ${i === 4 ? "rounded-bl-luxury" : ""}
              ${i === 5 || (i === 3 && images.length <= 5) ? "rounded-br-luxury" : ""}`}
          >
            <img src={img} alt={`${name} ${i + 1}`}
              className="w-full h-full object-cover group-hover:scale-110
                         transition-transform duration-500 ease-luxury" />
            <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/25
                            transition-all duration-300 flex items-center justify-center">
              <span className="font-body text-xs text-ivory font-medium opacity-0
                               group-hover:opacity-100 transition-opacity duration-300">
                View
              </span>
            </div>
            {i === 5 && images.length > 6 && (
              <div className="absolute inset-0 bg-dark/60 flex items-center justify-center">
                <span className="font-body text-sm font-semibold text-ivory">
                  +{images.length - 6} more
                </span>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-dark/97 flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 shrink-0">
              <span className="font-heading text-base text-ivory/70">{name} — Portfolio</span>
              <div className="flex items-center gap-3">
                <span className="font-body text-xs text-ivory/40">{idx + 1} / {images.length}</span>
                <button onClick={close}
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center
                             text-ivory hover:bg-white/20 transition-all">
                  <RiCloseLine size={20} />
                </button>
              </div>
            </div>
            <div className="flex-1 flex items-center justify-center px-12 relative overflow-hidden">
              <button onClick={prev}
                className="absolute left-4 w-10 h-10 rounded-full bg-white/10 flex items-center
                           justify-center text-ivory hover:bg-white/20 transition-all z-10">
                <RiArrowLeftSLine size={22} />
              </button>
              <AnimatePresence mode="wait">
                <motion.img key={idx} src={images[idx]} alt={`${name} ${idx + 1}`}
                  initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.3 }}
                  className="max-h-full max-w-full object-contain rounded-xl select-none" />
              </AnimatePresence>
              <button onClick={next}
                className="absolute right-4 w-10 h-10 rounded-full bg-white/10 flex items-center
                           justify-center text-ivory hover:bg-white/20 transition-all z-10">
                <RiArrowRightSLine size={22} />
              </button>
            </div>
            <div className="flex gap-2 justify-center px-4 py-4 overflow-x-auto hide-scrollbar shrink-0">
              {images.map((img, i) => (
                <button key={i} onClick={() => setIdx(i)}
                  className={`w-14 h-10 rounded-lg overflow-hidden border-2 shrink-0 transition-all
                              ${i === idx ? "border-gold" : "border-transparent opacity-40 hover:opacity-70"}`}>
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}