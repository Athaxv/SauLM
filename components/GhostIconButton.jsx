import React from "react";

export default function GhostIconButton({ label, children }) {
  return (
    <button
      className="hidden rounded-full border border-gray-200 bg-white/70 p-2 text-gray-600 hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 md:inline-flex transition-colors"
      aria-label={label}
      title={label}
    >
      {children}
    </button>
  );
}
