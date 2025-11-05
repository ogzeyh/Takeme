"use client";
import { useState, useEffect } from "react";

export type LinkItem = {
  id: string;
  longUrl: string;
  shortCode: string;
  created_at: string;
};

export const useLinks = () => {
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const getHistory = async () => {
    const urls = localStorage.getItem("urls");
    if (!urls) return;

    const ids = JSON.parse(urls);
    if (!Array.isArray(ids) || ids.length === 0) return;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/url?urlIds=${encodeURIComponent(ids.join(","))}`,
    );
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      if (errorData?.code === "INVALID_URL_FORMAT")
        return setError("Invalid URL format");
      if (errorData?.code === "DB_ERROR")
        return setError("Problem with database");
      if (errorData?.code === "INTERNAL_ERROR")
        return setError("Internal server error");
    }

    const data = await response.json();
    setLinks(data.data);
  };

  useEffect(() => {
    getHistory();
  }, []);

  const createUrl = async (url: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/url`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ longUrl: url }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        if (errorData?.code === "INVALID_URL_FORMAT")
          throw new Error("Invalid URL format");
        if (errorData?.code === "DB_ERROR")
          throw new Error("Problem with database");
        if (errorData?.code === "INTERNAL_ERROR")
          throw new Error("Internal server error");
      }

      const data = await res.json();

      const stored = localStorage.getItem("urls");
      const ids = stored ? JSON.parse(stored) : [];
      ids.push(data.data.id);
      localStorage.setItem("urls", JSON.stringify(ids));

      setLinks((prev) => [...prev, data.data]);
    } catch (e: any) {
      setError(e.message);
    }
  };

  const editUrl = async (id: string, newUrl: string) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/url/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ longUrl: newUrl }),
      },
    );
    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      if (errorData?.code === "INVALID_URL_FORMAT")
        return setError("Invalid URL format");
      if (errorData?.code === "DB_ERROR")
        return setError("Problem with database");
      if (errorData?.code === "NOT_FOUND") return setError("URL not found");
      if (errorData?.code === "INTERNAL_ERROR")
        return setError("Internal server error");
    }

    setLinks((prev) =>
      prev.map((l) => (l.id === id ? { ...l, longUrl: newUrl } : l)),
    );
  };

  const deleteUrl = async (id: string) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/url/${id}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      },
    );
    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      if (errorData?.code === "INVALID_URL_FORMAT")
        return setError("Invalid URL format");
      if (errorData?.code === "DB_ERROR")
        return setError("Problem with database");
      if (errorData?.code === "NOT_FOUND") return setError("URL not found");
      if (errorData?.code === "INTERNAL_ERROR")
        return setError("Internal server error");
    }

    const urls = localStorage.getItem("urls");
    let ids = urls ? JSON.parse(urls) : [];
    ids = ids.filter((x: string) => x !== id);
    localStorage.setItem("urls", JSON.stringify(ids));

    setLinks((prev) => prev.filter((l) => l.id !== id));
  };

  return { links, createUrl, editUrl, deleteUrl, error, setError };
};
