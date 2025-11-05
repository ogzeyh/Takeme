"use client";

import { motion } from "framer-motion";

export default function BackgroundEffects() {
  return (
    <div className="pointer-events-none">
      <motion.div
        animate={{ scale: [1, 1.03, 1], opacity: [0.25, 0.35, 0.25] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-gradient-to-r from-emerald-400 via-green-500 to-lime-400 rounded-full blur-[100px] opacity-20"
      />
      <motion.div
        animate={{ y: [0, -10, 0], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-40 -left-20 w-[480px] h-[480px] bg-gradient-to-r from-emerald-300 to-emerald-500 rounded-full blur-[90px] opacity-15"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.12)_1px,transparent_1px)] bg-[length:36px_36px] opacity-20 animate-[gridMove_12s_linear_infinite]" />
      <style jsx>{`
        @keyframes gridMove {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 36px 36px;
          }
        }
      `}</style>
    </div>
  );
}
