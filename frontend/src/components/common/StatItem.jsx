import { motion } from "framer-motion";

const StatItem = ({ label, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 22 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.45, delay: 0.35 + index * 0.1 }}
    className="group rounded-[24px] border border-white/10 bg-white/[0.04] px-4 py-4 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-red-500/40 hover:bg-white/[0.06] hover:shadow-[0_0_30px_rgba(239,35,45,0.12)]"
  >
    <span className="block text-sm font-medium text-zinc-300">{label}</span>
  </motion.div>
);

export default StatItem;
