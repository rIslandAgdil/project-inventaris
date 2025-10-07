import { LayoutGrid, Boxes, Building2, Users } from "lucide-react";
import { NavLink } from "react-router-dom";

const NavItem = ({ to, icon: Icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
        isActive ? "bg-slate-100 text-blue-600 font-medium" : "text-slate-600 hover:bg-slate-50"
      }`
    }
  >
    <Icon size={18} />
    <span>{label}</span>
  </NavLink>
);

export default function Sidebar() {
  return (
    <aside className="w-60 shrink-0 border-r bg-white h-screen sticky top-0">
      <div className="px-4 py-4">
        <h1 className="font-semibold text-lg text-slate-800">Job Sheet</h1>
      </div>
      <nav className="px-3 space-y-1">
        <NavItem to="/" icon={LayoutGrid} label="Dashboard" />
        <NavItem to="/barang" icon={Boxes} label="Barang" />
        <NavItem to="/ruangan" icon={Building2} label="Ruangan" />
        <NavItem to="/admin" icon={Users} label="Users (admin)" />
      </nav>
    </aside>
  );
}
