// src/components/Topbar.jsx
import { Bell, ChevronDown, Menu } from "lucide-react";
import { Link } from "react-router-dom";

export default function Topbar({ breadcrumb = [], onOpenMenu }) {
  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b">
      <div className="max-w-7xl mx-auto px-3 md:px-6 py-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-slate-100 text-slate-700"
            onClick={onOpenMenu}
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
          {/* breadcrumb kamu… (boleh dipertahankan) */}
          <nav className="text-sm text-slate-500 truncate">
            <ol className="flex items-center gap-2">
              {breadcrumb.map((item, i) => (
                <li key={i} className="flex items-center gap-2 truncate">
                  {i > 0 && <span className="text-slate-300">/</span>}
                  {item.to ? (
                    <Link to={item.to} className="hover:text-slate-700 truncate">{item.label}</Link>
                  ) : (
                    <span className="text-slate-900 font-medium truncate">{item.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <button className="p-2 rounded-lg hover:bg-slate-50 text-slate-700"><Bell size={18} /></button>
          <button className="flex items-center gap-2 px-2 sm:px-3 py-2 rounded-lg hover:bg-slate-50">
            <div className="w-8 h-8 rounded-full bg-slate-200" />
            <span className="hidden sm:block text-sm font-medium">Nofryanti (Admin)</span>
            <ChevronDown size={16} />
          </button>
        </div>
      </div>
    </header>
  );
}
