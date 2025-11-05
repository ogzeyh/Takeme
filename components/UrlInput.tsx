import { Link2 } from "lucide-react";

export default function UrlInput({
  value,
  onChange,
  onSubmit,
}: {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
}) {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="relative">
        <div className="absolute inset-0 rounded-3xl -z-10 p-1">
          <div className="h-full w-full rounded-3xl bg-gradient-to-r from-emerald-500 to-lime-400 opacity-20 blur-2xl" />
        </div>

        <div className="bg-[rgba(10,14,18,0.6)] border border-[rgba(255,255,255,0.04)] rounded-3xl px-3 py-3 flex items-center gap-3 backdrop-blur-md shadow-[0_8px_30px_rgba(16,185,129,0.06)]">
          <Link2 className="w-6 h-6 text-emerald-300/80 ml-2" />
          <input
            type="text"
            placeholder="Enter your long link..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-gray-200 placeholder:opacity-60 text-sm md:text-base px-2 py-2"
            onKeyDown={(e) => e.key === "Enter" && onSubmit()}
          />
          <button
            onClick={onSubmit}
            className="ml-2 px-5 py-2 rounded-full bg-gradient-to-r from-emerald-400 to-lime-400 hover:from-emerald-500 hover:to-lime-300 transition-all font-semibold text-black shadow-[0_10px_30px_rgba(72,187,120,0.14)]"
            aria-label="Shorten Now"
          >
            Shorten Now
          </button>
        </div>

        <div className="mt-3 text-xs text-gray-400 text-center">
          Fast • Minimal • Comfortable
        </div>
      </div>
    </div>
  );
}
