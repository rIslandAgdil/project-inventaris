import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (

    <div className="min-h-[100dvh] bg-slate-50">
  
      <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />


      <main className="md:ml-60 min-h-[100dvh] flex flex-col">
        <Topbar onOpenMenu={() => setMenuOpen(true)} />
        <div className="p-4 md:p-6 flex-1">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
