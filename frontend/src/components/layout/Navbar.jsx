import { Menu, Phone, X } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from "../common/Logo.jsx";
import { businessInfo, businessLinks } from "../../constants/businessInfo.js";

const navItems = [
  ["Home", "/"],
  ["Products", "/products"],
  ["Services", "/services"],
  ["About", "/about"],
  ["Reviews", "/reviews"],
  ["Contact", "/contact"]
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/60 backdrop-blur-2xl">
      <nav className="container flex min-h-[84px] items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <div
          className={`absolute left-4 right-4 top-[84px] flex flex-col gap-3 rounded-[26px] border border-white/10 bg-black/95 p-5 shadow-2xl lg:static lg:flex lg:flex-1 lg:flex-row lg:items-center lg:justify-center lg:gap-8 lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none ${
            open ? "flex" : "hidden"
          }`}
        >
          {navItems.map(([label, href]) => (
            <NavLink
              key={href}
              to={href}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `text-sm font-semibold uppercase tracking-[0.14em] transition ${
                  isActive ? "text-red-400" : "text-zinc-300 hover:text-white"
                }`
              }
            >
              {({ isActive }) => (
                <span className="relative inline-flex flex-col">
                  {label}
                  {isActive ? (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="mt-2 h-[2px] rounded-full bg-red-500"
                    />
                  ) : (
                    <span className="mt-2 h-[2px] rounded-full bg-transparent" />
                  )}
                </span>
              )}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={businessLinks.telPrimary}
            className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-red-400/40 hover:bg-red-500/10 sm:inline-flex"
          >
            <Phone size={16} />
            {businessInfo.phonePrimary}
          </a>
          <a
            href={businessLinks.whatsapp}
            className="hidden rounded-full border border-red-500/40 bg-gradient-to-r from-red-500 to-red-700 px-5 py-3 text-sm font-semibold text-white shadow-[0_0_28px_rgba(239,35,45,0.22)] transition hover:-translate-y-0.5 hover:shadow-[0_0_42px_rgba(239,35,45,0.32)] sm:inline-flex"
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp
          </a>
          <button
            className="inline-flex rounded-full border border-white/10 bg-white/[0.05] p-3 text-white lg:hidden"
            onClick={() => setOpen((current) => !current)}
            aria-label="Toggle navigation menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
