"use client";

import { Copy, Edit, Trash2, QrCode } from "lucide-react";
import { LinkItem } from "@/hooks/useLinks";

export default function UrlTable({
  links,
  onEdit,
  onDelete,
  onCopy,
  onQr,
}: {
  links: LinkItem[];
  onEdit: (link: LinkItem) => void;
  onDelete: (id: string) => void;
  onCopy: (text: string) => void;
  onQr: (link: LinkItem) => void;
}) {
  return (
    <div className="mx-auto w-full max-w-7xl bg-[rgba(10,14,18,0.45)] border border-[rgba(255,255,255,0.05)] rounded-2xl overflow-hidden backdrop-blur-md shadow-[0_0_8px_rgba(6,95,70,0.03)] mt-10">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-gray-300 border-collapse">
          <thead>
            <tr className="bg-[rgba(8,12,16,0.5)] border-b border-[rgba(255,255,255,0.05)]">
              <th className="py-4 px-6 font-medium text-gray-400 text-left whitespace-nowrap">
                ID
              </th>
              <th className="py-4 px-6 font-medium text-gray-400 text-left whitespace-nowrap">
                Original Link
              </th>
              <th className="py-4 px-6 font-medium text-gray-400 text-left whitespace-nowrap">
                Short Link
              </th>
              <th className="py-4 px-6 font-medium text-gray-400 text-center whitespace-nowrap">
                Actions
              </th>
              <th className="py-4 px-6 font-medium text-gray-400 text-center whitespace-nowrap">
                Date
              </th>
            </tr>
          </thead>

          <tbody>
            {links.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="py-8 px-5 text-center text-gray-500 italic"
                >
                  No shortened links yet - try adding one above!
                </td>
              </tr>
            ) : (
              links.map((link) => (
                <tr
                  key={link.id}
                  className="border-t border-[rgba(255,255,255,0.03)] hover:bg-[rgba(72,187,120,0.04)] transition-colors"
                >
                  <td className="py-4 px-6 text-gray-500 align-middle text-left">
                    <div className="max-w-[200px] truncate">{link.id}</div>
                  </td>

                  <td className="py-4 px-6 align-middle text-left">
                    <a
                      href={link.longUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-emerald-300 transition-colors"
                      title={link.longUrl}
                    >
                      {link.longUrl.length > 25
                        ? `${link.longUrl.substring(0, 25)}...`
                        : link.longUrl}
                    </a>
                  </td>

                  <td className="py-4 px-6 align-middle text-left">
                    <div className="flex items-center gap-2 justify-start max-w-[250px]">
                      <a
                        href={`${window.location.origin}/${link.shortCode}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-emerald-300 hover:underline truncate"
                      >
                        {`${window.location.origin}/${link.shortCode}`}
                      </a>
                      <button
                        onClick={() =>
                          onCopy(`${window.location.origin}/${link.shortCode}`)
                        }
                        className="p-1.5 rounded-md hover:bg-[rgba(72,187,120,0.08)] transition flex-shrink-0"
                        title="Copy link"
                      >
                        <Copy className="w-4 h-4 text-emerald-300" />
                      </button>
                    </div>
                  </td>

                  <td className="py-4 px-6 text-center align-middle">
                    <div className="flex items-center justify-center gap-3">
                      <button
                        onClick={() => onQr(link)}
                        className="p-2 rounded-md hover:bg-[rgba(72,187,120,0.08)] transition"
                        title="Show QR code"
                      >
                        <QrCode className="w-4 h-4 text-emerald-400" />
                      </button>
                      <button
                        onClick={() => onEdit(link)}
                        className="p-2 rounded-md hover:bg-[rgba(72,187,120,0.08)] transition"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4 text-emerald-300" />
                      </button>
                      <button
                        onClick={() => onDelete(link.id)}
                        className="p-2 rounded-md hover:bg-[rgba(72,187,120,0.08)] transition"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4 text-emerald-400" />
                      </button>
                    </div>
                  </td>

                  <td className="py-4 px-6 text-gray-400 text-sm text-center align-middle whitespace-nowrap">
                    {new Date(link.created_at).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
