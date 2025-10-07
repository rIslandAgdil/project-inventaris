import { Bell, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

export default function Topbar({ breadcrumb = [] }) {
  return (
    <header className="sticky top-0 z-10 bg-white border-b">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <nav className="text-sm text-slate-500">
          <ol className="flex items-center gap-2">
            {breadcrumb.map((item, i) => (
              <li key={i} className="flex items-center gap-2">
                {i > 0 && <span>/</span>}
                {item.to ? (
                  <Link to={item.to} className="hover:text-slate-700">{item.label}</Link>
                ) : (
                  <span className="text-slate-900 font-medium">{item.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-lg hover:bg-slate-50">
            <Bell size={18} />
          </button>
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-50 transition">
            <div className="w-8 h-8 rounded-full bg-slate-200" />
            <span className="text-sm font-medium">Nofryanti (Admin)</span>
            <ChevronDown size={16} />
          </button>
        </div>
      </div>
    </header>
  );
}
