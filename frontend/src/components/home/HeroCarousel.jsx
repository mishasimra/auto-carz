import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import androidSystem from "../../assets/products/android-car-system.jpg";
import bumper from "../../assets/products/car-bumper.jpg";
import dashcam from "../../assets/products/dashcam.jpg";
import leatherSeat from "../../assets/products/leather-seat-covers.jpg";
import led from "../../assets/products/led-headlight-bulb.jpg";

const slides = [
  {
    category: "Exterior",
    title: "Bold Looks. Stronger Presence.",
    description: "Body kits, headlights, grills and more to stand out.",
    buttonText: "Explore Exterior",
    route: "/products?category=exterior",
    image: bumper
  },
  {
    category: "Audio",
    title: "Sound That Hits Different.",
    description: "Speakers, subwoofers and amplifiers tuned for your ride.",
    buttonText: "View Audio",
    route: "/products?category=audio",
    image: androidSystem
  },
  {
    category: "Interior",
    title: "Comfort Meets Character.",
    description: "Seat covers, ambient lights and dashboard upgrades.",
    buttonText: "Style Your Cabin",
    route: "/products?category=interior",
    image: leatherSeat
  },
  {
    category: "Safety",
    title: "Drive Safer. Record Smarter.",
    description: "Reliable cameras and smart safety accessories.",
    buttonText: "View Dashcams",
    route: "/products?category=safety",
    image: dashcam
  },
  {
    category: "Lighting",
    title: "Light Up Every Detail.",
    description: "LEDs, projectors and ambient lighting installs.",
    buttonText: "View Lighting",
    route: "/products?category=lighting",
    image: led
  }
];

const slideVariants = {
  enter: (direction) => ({
    opacity: 0,
    x: direction > 0 ? 70 : -70,
    scale: 0.96
  }),
  center: {
    opacity: 1,
    x: 0,
    scale: 1
  },
  exit: (direction) => ({
    opacity: 0,
    x: direction > 0 ? -70 : 70,
    scale: 0.98
  })
};

const progressDuration = 3;

const HeroCarousel = () => {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);

  const activeSlide = slides[index];
  const previousSlide = useMemo(
    () => slides[(index - 1 + slides.length) % slides.length],
    [index]
  );
  const nextSlide = useMemo(() => slides[(index + 1) % slides.length], [index]);

  useEffect(() => {
    if (paused) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setDirection(1);
      setIndex((current) => (current + 1) % slides.length);
    }, progressDuration * 1000);

    return () => window.clearInterval(timer);
  }, [paused]);

  const goTo = (nextIndex) => {
    if (nextIndex === index) {
      return;
    }

    const normalizedIndex = (nextIndex + slides.length) % slides.length;
    setDirection(normalizedIndex > index ? 1 : -1);
    setIndex(normalizedIndex);
  };

  const goPrev = () => {
    setDirection(-1);
    setIndex((current) => (current - 1 + slides.length) % slides.length);
  };

  const goNext = () => {
    setDirection(1);
    setIndex((current) => (current + 1) % slides.length);
  };

  const handleNavigate = (route) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate(route);
  };

  return (
    <div
      className="relative mx-auto w-full max-w-[720px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="pointer-events-none absolute inset-x-10 top-14 h-56 rounded-full bg-red-600/30 blur-[110px]" />
      <div className="pointer-events-none absolute inset-x-20 bottom-10 h-28 rounded-full bg-red-700/18 blur-[90px]" />

      <div className="relative min-h-[500px] sm:min-h-[590px]">
        <motion.div
          aria-hidden="true"
          className="absolute inset-y-12 left-1 hidden w-[24%] overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.03] md:block"
          initial={false}
          animate={{ x: 14, scale: 0.9, opacity: 0.28 }}
          transition={{ duration: 0.55, ease: "easeInOut" }}
        >
          <img src={previousSlide.image} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 to-black/20" />
        </motion.div>

        <motion.div
          aria-hidden="true"
          className="absolute inset-y-12 right-1 hidden w-[24%] overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.03] md:block"
          initial={false}
          animate={{ x: -14, scale: 0.9, opacity: 0.28 }}
          transition={{ duration: 0.55, ease: "easeInOut" }}
        >
          <img src={nextSlide.image} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-l from-black/75 to-black/20" />
        </motion.div>

        <div className="relative z-10 overflow-hidden rounded-[34px] border border-white/10 bg-white/[0.05] p-3 shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_0_90px_rgba(239,35,45,0.22),0_36px_90px_rgba(0,0,0,0.58)] backdrop-blur-xl">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[30px] sm:aspect-[4/4]">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={activeSlide.image}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.65, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <motion.img
                  src={activeSlide.image}
                  alt={activeSlide.title}
                  className="h-full w-full object-cover"
                  initial={{ scale: 1, x: 0 }}
                  animate={{ scale: 1.05, x: [0, -10, 0] }}
                  transition={{
                    scale: { duration: 3, ease: "easeInOut" },
                    x: { duration: 8, repeat: Infinity, ease: "easeInOut" }
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-red-950/10" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(239,35,45,0.3),transparent_34%)]" />
                <div className="absolute inset-x-0 bottom-0 p-7 sm:p-9">
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.45, ease: "easeInOut" }}
                    className="max-w-md rounded-[26px] border border-white/10 bg-black/32 p-6 backdrop-blur-md"
                  >
                    <span className="mb-3 inline-flex rounded-full border border-red-400/20 bg-red-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.34em] text-red-200">
                      {activeSlide.category}
                    </span>
                    <h3 className="text-2xl font-black tracking-[-0.04em] text-white sm:text-3xl">
                      {activeSlide.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-zinc-300 sm:text-base">
                      {activeSlide.description}
                    </p>
                    <button
                      type="button"
                      onClick={() => handleNavigate(activeSlide.route)}
                      className="mt-5 inline-flex items-center rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:border-red-400/40 hover:bg-red-500/20"
                    >
                      {activeSlide.buttonText}
                    </button>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4 sm:p-5">
              <div className="rounded-full border border-white/10 bg-black/35 px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-zinc-300 backdrop-blur-md">
                {String(index + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
              </div>
              <button
                type="button"
                onClick={() => setPaused((current) => !current)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/35 text-white backdrop-blur-md transition hover:border-red-400/40 hover:bg-red-500/20 hover:shadow-[0_0_24px_rgba(239,35,45,0.18)] sm:h-11 sm:w-11"
                aria-label={paused ? "Play carousel" : "Pause carousel"}
              >
                {paused ? <Play size={16} /> : <Pause size={16} />}
              </button>
            </div>

            <div className="absolute inset-y-0 left-0 flex items-center pl-3 sm:pl-5">
              <button
                type="button"
                onClick={goPrev}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/35 text-white backdrop-blur-md transition hover:border-red-400/40 hover:bg-red-500/20 hover:shadow-[0_0_24px_rgba(239,35,45,0.18)] sm:h-12 sm:w-12"
                aria-label="Previous slide"
              >
                <ChevronLeft size={18} />
              </button>
            </div>

            <div className="absolute inset-y-0 right-0 flex items-center pr-3 sm:pr-5">
              <button
                type="button"
                onClick={goNext}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/35 text-white backdrop-blur-md transition hover:border-red-400/40 hover:bg-red-500/20 hover:shadow-[0_0_24px_rgba(239,35,45,0.18)] sm:h-12 sm:w-12"
                aria-label="Next slide"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
              <div className="mx-auto mb-4 h-[2px] w-full max-w-[240px] overflow-hidden rounded-full bg-white/10">
                <motion.div
                  key={`${index}-${paused ? "paused" : "playing"}`}
                  className="h-full rounded-full bg-gradient-to-r from-red-500 to-red-700"
                  initial={{ width: "0%" }}
                  animate={{ width: paused ? "100%" : "100%" }}
                  transition={{
                    duration: paused ? 0 : progressDuration,
                    ease: "linear"
                  }}
                />
              </div>

              <div className="flex items-center justify-center gap-2">
                {slides.map((slide, slideIndex) => (
                  <button
                    key={slide.title}
                    type="button"
                    onClick={() => goTo(slideIndex)}
                    className={`h-2.5 rounded-full transition-all ${
                      slideIndex === index ? "w-8 bg-red-500" : "w-2.5 bg-white/35 hover:bg-white/55"
                    }`}
                    aria-label={`Go to slide ${slideIndex + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroCarousel;
