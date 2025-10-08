import React from "react";

export default function ActionIcon({
  title,
  onClick,
  className = "",
  children,
}) {
  // icon-only, transparan
  const base =
    "inline-flex items-center justify-center bg-transparent p-1.5 h-auto w-auto " +
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ring-offset-white " +
    "active:scale-[0.98] dark:ring-offset-slate-900";
  return (
    <button
      type="button"
      title={title}
      aria-label={title}
      onClick={onClick}
      className={`${base} ${className}`}
    >
      <span className="[&>svg]:h-5 [&>svg]:w-5 transition-transform hover:scale-110">
        {children}
      </span>
    </button>
  );
}
