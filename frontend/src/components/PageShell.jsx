// import Sidebar from "./Sidebar";
// import Topbar from "./Topbar";

// export default function PageShell({ breadcrumb, children }) {
//   return (
//     <div className="min-h-screen bg-slate-50 flex">
//       <Sidebar />
//       <main className="flex-1 flex flex-col">
//         <Topbar breadcrumb={breadcrumb} />
//         <div className="flex-1 max-w-7xl mx-auto w-full p-6">
//           {children}
//         </div>
//       </main>
//     </div>
//   );
// }
// src/components/PageShell.jsx (minimal tapi lengkap)
import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function PageShell({ breadcrumb = [], children }) {
  const [menuOpen, setMenuOpen] = useState(false); // <- 1) state buat mobile menu

  return (
    <div className="min-h-[100dvh] bg-slate-50">
      {/* 2) Sidebar: desktop fixed + mobile off-canvas */}
      <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* 3) Geser konten 240px saat md+ biar gak ketiban sidebar */}
      <main className="lg:ml-60 min-h-[100dvh] flex flex-col">
        <Topbar breadcrumb={breadcrumb} onOpenMenu={() => setMenuOpen(true)} />
        <div className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
