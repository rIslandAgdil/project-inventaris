import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function PageShell({ breadcrumb, children }) {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar />
      <main className="flex-1 flex flex-col">
        <Topbar breadcrumb={breadcrumb} />
        <div className="flex-1 max-w-7xl mx-auto w-full p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
