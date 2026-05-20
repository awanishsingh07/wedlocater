import { useState, memo } from "react";
import { motion } from "framer-motion";

const LazyImage = memo(function LazyImage({
  src,
  alt        = "",
  className  = "",
  wrapperCls = "",
  fallback   = null,
  aspectRatio,
}) {
  const [loaded,  setLoaded]  = useState(false);
  const [errored, setErrored] = useState(false);

  const shimmerStyle = {
    background: "linear-gradient(90deg,#F5EFE4 0%,#FAF7F2 50%,#F5EFE4 100%)",
    backgroundSize: "200% 100%",
    animation: "skeleton-shimmer 1.6s ease-in-out infinite",
  };

  return (
    <div
      className={`relative overflow-hidden ${wrapperCls}`}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      {/* Shimmer placeholder */}
      {!loaded && !errored && (
        <div className="absolute inset-0" style={shimmerStyle} />
      )}

      {/* Fallback */}
      {errored && (
        <div className="absolute inset-0 bg-cream flex items-center justify-center">
          {fallback || (
            <div className="flex flex-col items-center gap-2 text-muted">
              <span className="text-3xl">🖼️</span>
              <span className="font-body text-xs">Image unavailable</span>
            </div>
          )}
        </div>
      )}

      {/* Actual image */}
      {!errored && (
        <motion.img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => { setLoaded(true); setErrored(true); }}
          initial={{ opacity: 0 }}
          animate={{ opacity: loaded ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          className={`w-full h-full object-cover ${className}`}
        />
      )}
    </div>
  );
});

export default LazyImage;