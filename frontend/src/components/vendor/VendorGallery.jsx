import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RiCloseLine, RiArrowLeftSLine, RiArrowRightSLine, RiFullscreenLine } from "react-icons/ri";

export default function VendorGallery({ images = [], name = "" }) {
  const [lightbox, setLightbox] = useState(false);
  const [idx, setIdx]           = useState(0);

  const open  = (i) => { setIdx(i); setLightbox(true); };
  const close = ()  => setLightbox(false);
  const prev  = ()  => setIdx(i => (i - 1 + images.length) % images.length);
  const next  = ()  => setIdx(i => (i + 1) % images.length);

  return (
    <>
      <div className={`grid gap-2 h-64 sm:h-80 ${images.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}>
        {images.slice(0, images.length === 1 ? 1 : 2).map((src, i) => (
          <div key={i}
            onClick={() => open(i)}
            className={`relative overflow-hidden cursor-pointer group
              ${i === 0 && images.length > 1 ? "rounded-l-luxury" : ""}
              ${i === 1 ? "rounded-r-luxury grid grid-rows-2 gap-2 h-full" : "rounded-luxury"}`}
          >
            {i === 1 && images.length > 2 ? (
              images.slice(1, 3).map((s, j) => (
                <div key={j}
                  className={`relative overflow-hidden cursor-pointer
                    ${j === 0 ? "rounded-tr-luxury" : "rounded-br-luxury"}`}
                  onClick={(e) => { e.stopPropagation(); open(j + 1); }}
                >
                  <img src={s} alt={`${name} ${j + 2}`}
                    className="w-full h-full object-cover group-hover:scale-105
                               transition-transform duration-500" />
                  {j === 1 && images.length > 3 && (
                    <div className="absolute inset-0 bg-dark/55 flex items-center justify-center">
                      <span className="font-body text-sm font-semibold text-ivory">
                        +{images.length - 3} more
                      </span>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <img src={src} alt={`${name} ${i + 1}`}
                className="w-full h-full object-cover group-hover:scale-105
                           transition-transform duration-500" />
            )}
          </div>
        ))}
        {/* View all button */}
        {images.length > 0 && (
          <button onClick={() => open(0)}
            className="absolute bottom-4 right-4 inline-flex items-center gap-1.5
                       px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm border border-cream
                       shadow-luxury text-xs font-body font-medium text-dark z-10
                       hover:bg-white transition-all duration-200">
            <RiFullscreenLine size={13} />
            All photos
          </button>
        )}
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-dark/95 flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 shrink-0">
              <span className="font-heading text-base text-ivory/70">{name}</span>
              <div className="flex items-center gap-3">
                <span className="font-body text-xs text-ivory/40">{idx + 1} / {images.length}</span>
                <button onClick={close}
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center
                             text-ivory hover:bg-white/20 transition-all duration-200">
                  <RiCloseLine size={20} />
                </button>
              </div>
            </div>
            <div className="flex-1 flex items-center justify-center px-12 relative">
              <button onClick={prev}
                className="absolute left-4 w-10 h-10 rounded-full bg-white/10 flex items-center
                           justify-center text-ivory hover:bg-white/20 transition-all">
                <RiArrowLeftSLine size={22} />
              </button>
              <AnimatePresence mode="wait">
                <motion.img key={idx} src={images[idx]} alt={`${name} ${idx + 1}`}
                  initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
                  className="max-h-full max-w-full object-contain rounded-xl select-none" />
              </AnimatePresence>
              <button onClick={next}
                className="absolute right-4 w-10 h-10 rounded-full bg-white/10 flex items-center
                           justify-center text-ivory hover:bg-white/20 transition-all">
                <RiArrowRightSLine size={22} />
              </button>
            </div>
            <div className="flex gap-2 justify-center px-4 py-4 overflow-x-auto hide-scrollbar shrink-0">
              {images.map((img, i) => (
                <button key={i} onClick={() => setIdx(i)}
                  className={`w-14 h-10 rounded-lg overflow-hidden border-2 shrink-0 transition-all
                              ${i === idx ? "border-gold" : "border-transparent opacity-50 hover:opacity-80"}`}>
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