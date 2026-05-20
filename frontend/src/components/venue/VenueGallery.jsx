import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  RiCloseLine, RiArrowLeftSLine, RiArrowRightSLine,
  RiGridLine, RiFullscreenLine,
} from "react-icons/ri";

export default function VenueGallery({ images = [], venueName = "" }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIdx,    setActiveIdx]    = useState(0);
  const [showAll,      setShowAll]      = useState(false);

  const openLightbox = (i) => { setActiveIdx(i); setLightboxOpen(true); };
  const closeLightbox = () => setLightboxOpen(false);
  const prev = () => setActiveIdx(i => (i - 1 + images.length) % images.length);
  const next = () => setActiveIdx(i => (i + 1) % images.length);

  const displayed = showAll ? images : images.slice(0, 5);

  return (
    <>
      {/* ── Grid layout ── */}
      <div className="relative">
        {images.length === 1 ? (
          <div className="h-[420px] md:h-[520px] rounded-luxury overflow-hidden cursor-pointer"
            onClick={() => openLightbox(0)}>
            <img src={images[0]} alt={venueName}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
          </div>
        ) : (
          <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[340px] sm:h-[420px] md:h-[480px]">
            {/* Main large image */}
            <div className="col-span-2 row-span-2 rounded-l-luxury overflow-hidden cursor-pointer group"
              onClick={() => openLightbox(0)}>
              <img src={images[0]} alt={venueName}
                className="w-full h-full object-cover group-hover:scale-105
                           transition-transform duration-500" />
            </div>

            {/* Right 4 thumbnails */}
            {displayed.slice(1, 5).map((img, i) => {
              const isLast = i === 3 && images.length > 5 && !showAll;
              return (
                <div
                  key={i}
                  onClick={() => isLast ? setShowAll(true) : openLightbox(i + 1)}
                  className={`relative overflow-hidden cursor-pointer group
                    ${i === 1 ? "rounded-tr-luxury" : ""}
                    ${i === 3 ? "rounded-br-luxury" : ""}`}
                >
                  <img src={img} alt={`${venueName} ${i + 2}`}
                    className="w-full h-full object-cover group-hover:scale-105
                               transition-transform duration-500" />
                  {isLast && (
                    <div className="absolute inset-0 bg-dark/60 flex flex-col
                                    items-center justify-center gap-1">
                      <RiGridLine size={20} className="text-ivory" />
                      <span className="font-body text-sm font-medium text-ivory">
                        +{images.length - 4} more
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* View all button */}
        <button
          onClick={() => openLightbox(0)}
          className="absolute bottom-4 right-4 inline-flex items-center gap-2
                     px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm
                     border border-cream shadow-luxury text-xs font-body font-medium text-dark
                     hover:bg-white hover:shadow-luxury-md transition-all duration-200"
        >
          <RiFullscreenLine size={14} />
          View all {images.length} photos
        </button>
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-dark/95 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 shrink-0">
              <span className="font-heading text-base text-ivory/80">
                {venueName}
              </span>
              <div className="flex items-center gap-3">
                <span className="font-body text-xs text-ivory/40">
                  {activeIdx + 1} / {images.length}
                </span>
                <button onClick={closeLightbox}
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center
                             text-ivory hover:bg-white/20 transition-all duration-200">
                  <RiCloseLine size={20} />
                </button>
              </div>
            </div>

            {/* Main image */}
            <div className="flex-1 flex items-center justify-center px-4 sm:px-16 relative overflow-hidden">
              <button onClick={prev}
                className="absolute left-4 sm:left-8 w-11 h-11 rounded-full bg-white/10
                           flex items-center justify-center text-ivory z-10
                           hover:bg-white/20 transition-all duration-200">
                <RiArrowLeftSLine size={22} />
              </button>

              <AnimatePresence mode="wait">
                <motion.img
                  key={activeIdx}
                  src={images[activeIdx]}
                  alt={`${venueName} ${activeIdx + 1}`}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="max-h-full max-w-full object-contain rounded-xl select-none"
                />
              </AnimatePresence>

              <button onClick={next}
                className="absolute right-4 sm:right-8 w-11 h-11 rounded-full bg-white/10
                           flex items-center justify-center text-ivory z-10
                           hover:bg-white/20 transition-all duration-200">
                <RiArrowRightSLine size={22} />
              </button>
            </div>

            {/* Thumbnail strip */}
            <div className="flex items-center justify-center gap-2 px-4 py-4
                            overflow-x-auto hide-scrollbar shrink-0">
              {images.map((img, i) => (
                <button key={i} onClick={() => setActiveIdx(i)}
                  className={`w-14 h-10 rounded-lg overflow-hidden border-2 shrink-0
                              transition-all duration-200
                              ${i === activeIdx ? "border-gold" : "border-transparent opacity-50 hover:opacity-80"}`}>
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