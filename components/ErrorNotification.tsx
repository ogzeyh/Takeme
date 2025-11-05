"use client";

import { motion, AnimatePresence } from "framer-motion";

export default function ErrorNotification({
  message,
}: {
  message: string | null;
}) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 28, scale: 0.98 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <div className="relative">
            <div className="absolute -inset-[1px] rounded-full blur-sm opacity-40 bg-gradient-to-r from-emerald-400 to-lime-300 -z-10" />
            <div className="px-5 py-3 rounded-full bg-[rgba(6,10,12,0.9)] border border-[rgba(255,255,255,0.04)] text-sm font-medium text-emerald-100 shadow-[0_2px_6px_rgba(72,187,120,0.05)]">
              {message}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
