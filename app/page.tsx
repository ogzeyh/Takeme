"use client";

import { useState } from "react";
import { LinkItem, useLinks } from "@/hooks/useLinks";
import UrlInput from "@/components/UrlInput";
import UrlTable from "@/components/UrlTable";
import EditModal from "@/components/EditModal";
import ErrorNotification from "@/components/ErrorNotification";
import BackgroundEffects from "@/components/BackgroundEffects";
import { motion, AnimatePresence } from "framer-motion";
import QrModal from "@/components/QRModal";

export default function TakeMeDashboard() {
  const { links, createUrl, editUrl, deleteUrl, error, setError } = useLinks();
  const [urlInput, setUrlInput] = useState("");
  const [editData, setEditData] = useState<LinkItem | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [qrUrl, setQrUrl] = useState<string | null>(null);

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setError("Copied to clipboard");
    } catch {
      setError("Clipboard not available");
    }
  };

  const handleCreate = async () => {
    if (!urlInput.trim()) {
      setError("Please enter a URL first");
      return;
    }
    await createUrl(urlInput);
    setUrlInput("");
  };

  return (
    <div className="min-h-screen bg-[#041014] text-white flex flex-col items-center justify-center relative overflow-hidden">
      <BackgroundEffects />
      <ErrorNotification message={error} />

      <main className="container mx-auto px-6 py-12 relative z-10 flex flex-col items-center justify-center text-center space-y-12">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-green-500 to-lime-400">
              Take.me
            </span>{" "}
            - shorten your links fast.
          </h1>
          <p className="mt-4 text-sm text-gray-300/80">
            A modern link shortener that combines speed, security, and modern
            design. Take.me helps you share faster and with style.
          </p>
        </motion.header>

        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.5 }}
          className="w-full max-w-3xl"
        >
          <UrlInput
            value={urlInput}
            onChange={setUrlInput}
            onSubmit={handleCreate}
          />
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.16, duration: 0.6 }}
          className="w-full max-w-6xl"
        >
          <UrlTable
            links={links}
            onEdit={(link) => {
              setEditData(link);
              setIsEditOpen(true);
            }}
            onDelete={deleteUrl}
            onCopy={handleCopy}
            onQr={(link) =>
              setQrUrl(`${window.location.origin}/${link.shortCode}`)
            }
          />
        </motion.section>

        <AnimatePresence>
          {isEditOpen && editData && (
            <EditModal
              key="edit-modal"
              link={editData}
              onSave={editUrl}
              onClose={() => {
                setIsEditOpen(false);
                setEditData(null);
              }}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {qrUrl && (
            <QrModal
              key="qr-modal"
              url={qrUrl}
              onClose={() => setQrUrl(null)}
            />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
