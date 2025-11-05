"use client";

import { QRCodeCanvas } from "qrcode.react";
import { X } from "lucide-react";
import { motion } from "framer-motion";

interface QrModalProps {
  url: string;
  onClose: () => void;
}

export default function QrModal({ url, onClose }: QrModalProps) {
  return (
    <motion.div
      key="overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        key="modal"
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 30 }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        onClick={(e) => e.stopPropagation()}
        className="
          bg-[#0b1a1f]/70
          backdrop-blur-lg
          border border-white/10
          rounded-3xl 
          p-10 
          text-center 
          shadow-2xl 
          relative 
          w-[460px] 
          min-h-[480px] 
          flex 
          flex-col 
          items-center 
          justify-center
        "
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
        >
          <X size={24} />
        </button>

        <div className="bg-white/90 backdrop-blur-sm p-5 rounded-2xl inline-block shadow-lg">
          <QRCodeCanvas value={url} size={260} />
        </div>

        <a
          href={url}
          target="_blank"
          className="text-sm text-gray-300 mt-6 max-w-[360px] break-all hover:text-gray-100 transition"
        >
          {url}
        </a>
      </motion.div>
    </motion.div>
  );
}
