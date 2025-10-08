import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";


export default function PageShell({ breadcrumb = [], children }) {
  const [menuOpen, setMenuOpen] = useState(false); // state mobile

  return (
    <div className="min-h-[100dvh] bg-slate-50">

      <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />

 
      <main className="lg:ml-60 min-h-[100dvh] flex flex-col">
        <Topbar breadcrumb={breadcrumb} onOpenMenu={() => setMenuOpen(true)} />
        <div className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
