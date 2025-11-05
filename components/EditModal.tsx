"use client";

import { useEffect, useState } from "react";
import { LinkItem } from "@/hooks/useLinks";
import { motion } from "framer-motion";
import { X } from "lucide-react";

interface EditModalProps {
  link: LinkItem | null;
  onSave: (id: string, newUrl: string) => Promise<void>;
  onClose: () => void;
}

export default function EditModal({ link, onSave, onClose }: EditModalProps) {
  const [newLongUrl, setNewLongUrl] = useState(link?.longUrl || "");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setNewLongUrl(link?.longUrl || "");
  }, [link]);

  if (!link) return null;

  const handleSave = async () => {
    if (!newLongUrl.trim()) return;
    setLoading(true);
    try {
      await onSave(link.id, newLongUrl);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      key="overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-md px-4"
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
          w-full
          max-w-lg
          shadow-2xl
          relative
          flex
          flex-col
        "
      >
        <button
          onClick={onClose}
          disabled={loading}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
        >
          <X size={22} />
        </button>

        <h2 className="text-xl font-semibold text-white mb-6 text-left">
          Edit Link
        </h2>

        <label className="text-sm text-gray-300 mb-2 block text-left">
          Original Link
        </label>
        <input
          type="text"
          value={newLongUrl}
          onChange={(e) => setNewLongUrl(e.target.value)}
          className="
            w-full
            bg-white/5
            border border-white/10
            rounded-md
            px-3
            py-2
            text-gray-100
            mb-5
            focus:outline-none
            focus:ring-2
            focus:ring-emerald-400
            placeholder-gray-500
          "
        />

        <label className="text-sm text-gray-400 block mb-2 text-left">
          Short Link
        </label>
        <input
          type="text"
          value={`${typeof window !== "undefined" ? window.location.origin : ""}/${link.shortCode}`}
          disabled
          className="
            w-full
            bg-white/[0.03]
            border border-white/10
            rounded-md
            px-3
            py-2
            text-gray-400
            cursor-not-allowed
            mb-6
          "
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="
              px-4 py-2 rounded-md
              bg-white/[0.05]
              text-gray-300
              hover:bg-white/[0.08]
              transition
              disabled:opacity-60
            "
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={loading}
            className="
              px-4 py-2 rounded-md
              bg-gradient-to-r from-emerald-400 to-lime-400
              text-black font-semibold
              hover:brightness-105
              transition
              disabled:opacity-60
            "
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
