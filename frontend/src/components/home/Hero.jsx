import { Phone } from "lucide-react";
import { motion } from "framer-motion";
import HeroCarousel from "./HeroCarousel.jsx";
import StatItem from "../common/StatItem.jsx";
import { businessInfo, businessLinks } from "../../constants/businessInfo.js";

const stats = [
  "19+ Years Experience",
  "5000+ Happy Customers",
  "Premium Quality Products",
  "Expert Installation"
];

const Hero = () => (
  <section className="relative overflow-hidden bg-[#050505] pb-16 pt-32 sm:pb-20 sm:pt-36">
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(239,35,45,0.16),transparent_34%),radial-gradient(circle_at_80%_18%,rgba(239,35,45,0.12),transparent_28%),linear-gradient(180deg,#040404_0%,#090909_55%,#0d0d0d_100%)]" />
      <div className="absolute inset-0 bg-hero-grid bg-[size:44px_44px] opacity-[0.06]" />
      <div className="absolute inset-0 bg-noise opacity-60" />
      <div className="absolute -left-20 top-24 h-56 w-56 rounded-full bg-red-600/20 blur-[100px] animate-drift" />
      <div className="absolute right-0 top-10 h-72 w-72 rounded-full bg-red-700/20 blur-[110px] animate-drift" />
      <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-red-500/10 blur-[110px]" />
    </div>

    <div className="relative container">
      <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="max-w-2xl">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="inline-flex rounded-full border border-red-500/20 bg-red-500/10 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.34em] text-red-300"
          >
            Premium Automotive Styling
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="mt-6 text-[2.95rem] font-black leading-[0.94] tracking-[-0.06em] text-white sm:text-[4.3rem] xl:text-[5.35rem]"
          >
            Accessories and upgrades that make every drive feel{" "}
            <span className="bg-gradient-to-r from-red-400 via-red-500 to-red-700 bg-clip-text text-transparent">
              sharper
            </span>
            .
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.12 }}
            className="mt-6 max-w-xl text-base leading-8 text-zinc-300 sm:text-lg"
          >
            High-performance audio, custom interiors, ambient lighting and more, everything your
            car deserves.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="mt-8 flex flex-col gap-4 sm:flex-row"
          >
            <a
              href={businessLinks.telPrimary}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-red-500/50 bg-gradient-to-r from-red-500 to-red-700 px-7 py-4 text-sm font-bold uppercase tracking-[0.18em] text-white shadow-[0_0_35px_rgba(239,35,45,0.28)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_0_50px_rgba(239,35,45,0.38)] sm:w-auto"
            >
              <Phone size={16} />
              Call {businessInfo.phonePrimary}
            </a>
            <a
              href={businessLinks.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full items-center justify-center rounded-full border border-white/15 bg-white/[0.03] px-7 py-4 text-sm font-bold uppercase tracking-[0.18em] text-zinc-100 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-red-400/40 hover:bg-red-500/10 hover:shadow-[0_0_28px_rgba(239,35,45,0.14)] sm:w-auto"
            >
              Chat on WhatsApp
            </a>
          </motion.div>

          <div className="mt-10 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat, index) => (
              <StatItem key={stat} label={stat} index={index} />
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.65, delay: 0.15 }}
          className="w-full"
        >
          <HeroCarousel />
        </motion.div>
      </div>
    </div>
  </section>
);

export default Hero;
