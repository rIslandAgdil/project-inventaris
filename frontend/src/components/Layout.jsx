import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    // pastikan full-viewport height
    <div className="min-h-[100dvh] bg-slate-50">
      {/* Sidebar (desktop: fixed; mobile: off-canvas) */}
      <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* Konten digeser 240px saat >= md */}
      <main className="md:ml-60 min-h-[100dvh] flex flex-col">
        <Topbar onOpenMenu={() => setMenuOpen(true)} />
        <div className="p-4 md:p-6 flex-1">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
