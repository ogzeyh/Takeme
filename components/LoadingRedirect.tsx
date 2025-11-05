"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import BackgroundEffects from "./BackgroundEffects";

export default function LoadingRedirect({ targetUrl }: { targetUrl: string }) {
  const [secondsLeft, setSecondsLeft] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((s) => s - 1);
    }, 1000);

    const timeout = setTimeout(() => {
      window.location.href = targetUrl;
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [targetUrl]);

  return (
    <div className="min-h-screen bg-[#041014] text-white flex flex-col items-center justify-center relative overflow-hidden">
      <BackgroundEffects />

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold mb-4"
      >
        Redirecting you in {secondsLeft}...
      </motion.h1>

      <p className="mt-6 text-gray-400 text-sm">
        Taking you to <span className="text-emerald-400">{targetUrl}</span>
      </p>
    </div>
  );
}
