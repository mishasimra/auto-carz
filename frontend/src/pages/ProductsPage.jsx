import { AnimatePresence, motion } from "framer-motion";
import { MessageCircleMore, Search, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import EmptyState from "../components/common/EmptyState.jsx";
import SectionHeading from "../components/common/SectionHeading.jsx";
import { productCatalog, productFilters } from "../constants/productCatalog.js";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 }
};

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");
  const normalizedCategoryParam = categoryParam
    ? categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1).toLowerCase()
    : "All";
  const initialCategory = productFilters.includes(normalizedCategoryParam)
    ? normalizedCategoryParam
    : "All";

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isFiltering, setIsFiltering] = useState(false);

  useEffect(() => {
    setActiveCategory(initialCategory);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsFiltering(true);

    const timer = window.setTimeout(() => {
      setIsFiltering(false);
    }, 220);

    return () => window.clearTimeout(timer);
  }, [initialCategory]);

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return productCatalog.filter((product) => {
      const matchesCategory =
        activeCategory === "All" || product.category === activeCategory;
      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.shortDescription.toLowerCase().includes(query) ||
        product.badge.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search]);

  useEffect(() => {
    if (!selectedProduct) {
      return undefined;
    }

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setSelectedProduct(null);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [selectedProduct]);

  const handleCategoryChange = (filter) => {
    setActiveCategory(filter);
    setIsFiltering(true);

    if (filter === "All") {
      setSearchParams((currentParams) => {
        const nextParams = new URLSearchParams(currentParams);
        nextParams.delete("category");
        return nextParams;
      });
    } else {
      setSearchParams((currentParams) => {
        const nextParams = new URLSearchParams(currentParams);
        nextParams.set("category", filter.toLowerCase());
        return nextParams;
      });
    }

    window.setTimeout(() => {
      setIsFiltering(false);
    }, 220);
  };

  return (
    <>
      <section className="section page-hero-pad overflow-hidden">
        <div className="container">
          <div className="relative overflow-hidden rounded-[34px] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(239,35,45,0.16),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] px-5 py-6 shadow-[0_30px_80px_rgba(0,0,0,0.38)] backdrop-blur-xl sm:px-8 sm:py-8">
            <div className="pointer-events-none absolute -right-12 top-0 h-44 w-44 rounded-full bg-red-600/16 blur-[90px]" />
            <div className="pointer-events-none absolute left-0 top-0 h-full w-full bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:42px_42px] opacity-[0.06]" />

            <SectionHeading
              eyebrow="Products"
              title="Premium accessories curated for style, sound, comfort, and road presence"
              description="Browse Auto Carz's core product lineup, filter by category, and contact the team directly for price and availability."
            />

            <div className="mb-6 flex flex-col gap-4">
              <div className="search-box border-white/10 bg-black/30 backdrop-blur-md">
                <Search size={18} />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search seat covers, Android systems, LED bulbs, dashcams..."
                />
              </div>
              <div className="filter-pills">
                {productFilters.map((filter) => (
                  <button
                    key={filter}
                    className={activeCategory === filter ? "active" : ""}
                    onClick={() => handleCategoryChange(filter)}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {isFiltering ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid gap-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
              >
                {Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-[360px] animate-pulse rounded-[28px] border border-white/8 bg-white/[0.03]"
                  />
                ))}
              </motion.div>
            ) : filteredProducts.length ? (
              <motion.div
                key={`${activeCategory}-${search}`}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.25 }}
                className="grid gap-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
              >
                <AnimatePresence>
                  {filteredProducts.map((product, index) => (
                    <motion.article
                      key={product.id}
                      layout
                      variants={fadeUp}
                      initial="hidden"
                      animate="visible"
                      exit={{ opacity: 0, y: 12 }}
                      transition={{ duration: 0.35, delay: index * 0.02 }}
                      className="group overflow-hidden rounded-[28px] border border-white/10 bg-black/35 shadow-[0_24px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-red-500/45 hover:shadow-[0_0_32px_rgba(239,35,45,0.14),0_24px_60px_rgba(0,0,0,0.4)]"
                    >
                      <div className="product-image-wrap relative">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-56 object-cover rounded-t-2xl"
                        />
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />
                        <span className="absolute left-4 top-4 inline-flex rounded-full border border-red-400/20 bg-red-500/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-red-100">
                          {product.badge}
                        </span>
                      </div>

                      <div className="space-y-4 p-5">
                        <div className="space-y-2">
                          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-400">
                            {product.category}
                          </div>
                          <h3 className="text-xl font-black tracking-[-0.04em] text-white">
                            {product.name}
                          </h3>
                          <p className="text-sm leading-7 text-zinc-300">
                            {product.shortDescription}
                          </p>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row">
                          <a
                            href={product.whatsappLink}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-red-500/40 bg-gradient-to-r from-red-500 to-red-700 px-4 py-3 text-sm font-semibold text-white shadow-[0_0_26px_rgba(239,35,45,0.18)] transition hover:-translate-y-0.5 hover:shadow-[0_0_36px_rgba(239,35,45,0.24)]"
                          >
                            <MessageCircleMore size={16} />
                            {product.inquiryLabel}
                          </a>
                          <button
                            type="button"
                            onClick={() => setSelectedProduct(product)}
                            className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/[0.05] px-4 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-red-400/35 hover:bg-red-500/10"
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <EmptyState
                title="No matching products"
                description="Try a different search term or switch to another category."
              />
            )}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedProduct ? (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/72 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.28 }}
              onClick={(event) => event.stopPropagation()}
              className="relative w-full max-w-4xl overflow-hidden rounded-[32px] border border-white/10 bg-[#090909] shadow-[0_0_50px_rgba(239,35,45,0.16),0_40px_100px_rgba(0,0,0,0.55)]"
            >
              <button
                type="button"
                onClick={() => setSelectedProduct(null)}
                className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/45 text-white backdrop-blur-md transition hover:border-red-400/40 hover:bg-red-500/15"
                aria-label="Close details"
              >
                <X size={18} />
              </button>

              <div className="grid md:grid-cols-[1.05fr_0.95fr]">
                <div className="relative min-h-[280px]">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="h-full w-full object-cover"
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />
                </div>

                <div className="space-y-5 p-6 sm:p-8">
                  <div className="space-y-3">
                    <span className="inline-flex rounded-full border border-red-400/20 bg-red-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-red-200">
                      {selectedProduct.badge}
                    </span>
                    <div className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-400">
                      {selectedProduct.category}
                    </div>
                    <h3 className="text-3xl font-black tracking-[-0.05em] text-white">
                      {selectedProduct.name}
                    </h3>
                    <p className="text-base leading-8 text-zinc-300">
                      {selectedProduct.shortDescription}
                    </p>
                  </div>

                  <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5 text-sm leading-7 text-zinc-300">
                    Auto Carz can confirm fitment, brand options, installation support, and current
                    availability for this item on WhatsApp.
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <a
                      href={selectedProduct.whatsappLink}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-red-500/40 bg-gradient-to-r from-red-500 to-red-700 px-5 py-3 text-sm font-semibold text-white shadow-[0_0_28px_rgba(239,35,45,0.2)] transition hover:-translate-y-0.5"
                    >
                      <MessageCircleMore size={16} />
                      Ask Price on WhatsApp
                    </a>
                    <button
                      type="button"
                      onClick={() => setSelectedProduct(null)}
                      className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/[0.05] px-5 py-3 text-sm font-semibold text-white transition hover:border-red-400/35 hover:bg-red-500/10"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
};

export default ProductsPage;
