const Logo = () => (
  <div className="group/logo flex items-center gap-3">
    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-red-500/25 bg-gradient-to-br from-red-500/20 to-red-950/35 text-red-500 shadow-[0_0_24px_rgba(239,35,45,0.16)] transition duration-300 group-hover/logo:border-red-400/45 group-hover/logo:shadow-[0_0_30px_rgba(239,68,68,0.3)]">
      <svg
        viewBox="0 0 64 40"
        aria-hidden="true"
        className="h-7 w-9 fill-current"
      >
        <path d="M9.5 25.5h4.2c.9-3.7 4.2-6.4 8.1-6.4s7.2 2.7 8.1 6.4h12.8c.9-3.7 4.2-6.4 8.1-6.4 3.8 0 7.1 2.7 8 6.4h2.4c1.2 0 2.2-1 2.2-2.2v-2.1c0-1.8-1.2-3.4-3-3.9l-9.9-2.7-8.3-8.1a6.7 6.7 0 0 0-4.7-1.9H24.2c-3.1 0-6 1.4-8 3.8l-6.3 7.7-7.3 2.4A3.8 3.8 0 0 0 0 22v1.3c0 1.2 1 2.2 2.2 2.2h7.3Zm13.6-16h13.3c1 0 2 .4 2.7 1.1l4.7 4.6H14.5l4.7-4.3a5.8 5.8 0 0 1 3.9-1.4Z" />
        <path d="M21.8 22.6a4.7 4.7 0 1 0 0 9.4 4.7 4.7 0 0 0 0-9.4Zm29 0a4.7 4.7 0 1 0 0 9.4 4.7 4.7 0 0 0 0-9.4Z" />
      </svg>
    </div>
    <div className="leading-none">
      <div className="text-xl font-black tracking-[0.01em] text-white">
        Auto <span className="text-red-500">Carz</span>
      </div>
      <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-zinc-400">
        Premium Car Accessories
      </div>
    </div>
  </div>
);

export default Logo;
