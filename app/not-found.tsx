"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import BackgroundEffects from "@/components/BackgroundEffects";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#041014] text-white text-center relative overflow-hidden">
      <BackgroundEffects />

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold mb-4"
      >
        Short link not found
      </motion.h1>

      <p className="text-gray-400 text-sm">
        Looks like this short link doesn’t exist or has expired.{" "}
        <Link
          href="/"
          className="text-emerald-400 hover:text-emerald-300 underline transition"
        >
          Go home page
        </Link>
      </p>
    </div>
  );
}
