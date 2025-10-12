import { LayoutGrid, Boxes, Building2, Users, X } from "lucide-react";
import { NavLink } from "react-router-dom";

const NavItem = ({ to, icon: Icon, label, onClick }) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) =>
      `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
        isActive
          ? "bg-slate-100 text-gray-600 font-medium"
          : "text-slate-600 hover:bg-slate-50"
      }`
    }
  >
    <Icon size={18} />
    <span>{label}</span>
  </NavLink>
);

export default function Sidebar({ open = false, onClose = () => {} }) {
  const panel = "w-60 border-r bg-white h-full flex flex-col";

  return (
    <>
      {/* Desktop: fixed full-height */}
      <aside className={`${panel} hidden lg:flex fixed inset-y-0 left-0 z-40`}>
        <div className="px-4 py-4">
          <h1 className="font-bold text-lg text-slate-800">
            Inventory Project
          </h1>
        </div>
        <nav className="px-3 space-y-1 pb-4">
          <NavItem to="/" icon={LayoutGrid} label="Dashboard" />
          <NavItem to="/barang" icon={Boxes} label="Barang" />
          <NavItem to="/ruangan" icon={Building2} label="Ruangan" />
          <NavItem to="/admin" icon={Users} label="Users (admin)" />
        </nav>
      </aside>

      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity lg:hidden ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />
      <aside
        className={`fixed inset-y-0 left-0 z-50 lg:hidden transform transition-transform duration-200 ${panel} ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="px-4 py-4 flex items-center justify-between">
          <h1 className="font-semibold text-lg text-slate-800">Inventaris</h1>
          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-slate-100"
          >
            {" "}
            <X size={18} />{" "}
          </button>
        </div>
        <nav className="px-3 space-y-1 pb-4">
          <NavItem
            to="/"
            icon={LayoutGrid}
            label="Dashboard"
            onClick={onClose}
          />
          <NavItem to="/barang" icon={Boxes} label="Barang" onClick={onClose} />
          <NavItem
            to="/ruangan"
            icon={Building2}
            label="Ruangan"
            onClick={onClose}
          />
          <NavItem
            to="/admin"
            icon={Users}
            label="Users (admin)"
            onClick={onClose}
          />
        </nav>
      </aside>
    </>
  );
}
