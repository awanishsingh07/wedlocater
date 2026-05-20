import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  RiBuilding2Line,
  RiCameraLine,
  RiRestaurantLine,
  RiScissorsLine,
  RiMusicLine,
  RiCarLine,
  RiFlowerLine,
  RiVideoLine,
  RiArrowRightLine,
} from "react-icons/ri";

const CATEGORIES = [
  {
    icon: RiBuilding2Line,
    label: "Venues",
    description: "Palaces, farmhouses, hotels & banquet halls",
    count: "320+ listed",
    path: "/venues",
    accent: "from-maroon/10 to-maroon/5",
    iconColor: "text-maroon",
    badge: "Most Booked",
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&q=80&auto=format&fit=crop",
  },
  {
    icon: RiCameraLine,
    label: "Photographers",
    description: "Candid, traditional & cinematic coverage",
    count: "180+ artists",
    path: "/photographers",
    accent: "from-gold/10 to-gold/5",
    iconColor: "text-gold-dark",
    badge: "Top Rated",
    image: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=600&q=80&auto=format&fit=crop",
  },
  {
    icon: RiRestaurantLine,
    label: "Caterers",
    description: "Multi-cuisine, live counters & royal thalis",
    count: "240+ services",
    path: "/vendors",
    accent: "from-maroon/8 to-cream",
    iconColor: "text-maroon",
    badge: null,
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?w=600&q=80&auto=format&fit=crop",
  },
  {
    icon: RiFlowerLine,
    label: "Decorators",
    description: "Floral mandaps, themes & luxury draping",
    count: "150+ designers",
    path: "/vendors",
    accent: "from-gold/8 to-cream",
    iconColor: "text-gold-dark",
    badge: "Trending",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80&auto=format&fit=crop",
  },
  {
    icon: RiMusicLine,
    label: "Entertainment",
    description: "Live bands, DJs & classical performances",
    count: "90+ acts",
    path: "/vendors",
    accent: "from-maroon/10 to-maroon/5",
    iconColor: "text-maroon",
    badge: null,
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&q=80&auto=format&fit=crop",
  },
  {
    icon: RiScissorsLine,
    label: "Bridal Makeup",
    description: "Airbrush, HD & traditional bridal looks",
    count: "200+ artists",
    path: "/vendors",
    accent: "from-gold/10 to-gold/5",
    iconColor: "text-gold-dark",
    badge: "AI Match",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80&auto=format&fit=crop",
  },
  {
    icon: RiVideoLine,
    label: "Videography",
    description: "Drone, cinematic & highlight reels",
    count: "120+ studios",
    path: "/vendors",
    accent: "from-maroon/8 to-cream",
    iconColor: "text-maroon",
    badge: null,
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&q=80&auto=format&fit=crop",
  },
  {
    icon: RiCarLine,
    label: "Bridal Cars",
    description: "Vintage, luxury & decorated wedding cars",
    count: "60+ fleets",
    path: "/vendors",
    accent: "from-gold/8 to-cream",
    iconColor: "text-gold-dark",
    badge: null,
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&q=80&auto=format&fit=crop",
  },
];

// Animation variants
const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1, y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

function CategoryCard({ cat, index }) {
  return (
    <motion.div variants={cardVariants}>
      <Link
        to={cat.path}
        className="group block relative overflow-hidden rounded-luxury
                   bg-white border border-cream shadow-luxury
                   hover:shadow-luxury-md hover:-translate-y-1.5
                   transition-all duration-300 ease-luxury h-full"
      >
        {/* Image */}
        <div className="relative h-44 overflow-hidden">
          <img
            src={cat.image}
            alt={cat.label}
            loading="lazy"
            className="w-full h-full object-cover object-center
                       group-hover:scale-105 transition-transform duration-500 ease-luxury"
          />
          {/* Image overlay */}
          <div className="absolute inset-0 bg-gradient-to-t
                          from-dark/60 via-dark/10 to-transparent" />

          {/* Badge */}
          {cat.badge && (
            <span className="absolute top-3 right-3 badge-gold !text-[10px] !py-0.5">
              {cat.badge}
            </span>
          )}

          {/* Icon circle */}
          <div className="absolute bottom-3 left-4">
            <div className={`w-10 h-10 rounded-full bg-white/15 backdrop-blur-md
                             border border-white/25 flex items-center justify-center`}>
              <cat.icon size={18} className="text-ivory" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 pb-5">
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <h3 className="font-heading text-xl font-semibold text-dark
                           group-hover:text-maroon transition-colors duration-200">
              {cat.label}
            </h3>
            <RiArrowRightLine
              size={16}
              className="text-muted group-hover:text-gold shrink-0 mt-1
                         group-hover:translate-x-0.5 transition-all duration-200"
            />
          </div>

          <p className="font-body text-xs text-muted leading-relaxed mb-3">
            {cat.description}
          </p>

          {/* Count chip */}
          <div className="inline-flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-gold" />
            <span className="text-[11px] font-body font-medium text-gold-dark">
              {cat.count}
            </span>
          </div>
        </div>

        {/* Hover gold bottom border */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5
                        bg-gold-gradient scale-x-0 group-hover:scale-x-100
                        transition-transform duration-300 origin-left" />
      </Link>
    </motion.div>
  );
}

export default function FeaturedCategories() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="section-padding bg-ivory" ref={ref}>
      <div className="container-luxury">

        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-14"
        >
          <p className="label-gold mb-4">Everything In One Place</p>
          <h2 className="heading-xl text-dark mb-5 text-balance">
            Explore Wedding{" "}
            <span className="text-shimmer">Categories</span>
          </h2>
          <div className="divider-center mb-5" />
          <p className="body-lg max-w-xl mx-auto">
            From grand palace venues to intimate candid photographers — every element
            of your celebration, curated and verified by our team.
          </p>
        </motion.div>

        {/* ── Cards grid ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-6"
        >
          {CATEGORIES.map((cat, i) => (
            <CategoryCard key={cat.label} cat={cat} index={i} />
          ))}
        </motion.div>

        {/* ── CTA strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-14 text-center"
        >
          <Link
            to="/vendors"
            className="btn-secondary !text-sm !px-10"
          >
            Browse All Categories
            <RiArrowRightLine size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}