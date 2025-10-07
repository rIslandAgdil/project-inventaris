import PageShell from "../components/PageShell";
import StatCard from "../components/StatCard";
import ActivityList from "../components/ActivityList";

const activities = [
  { timeAgo: "3 hari yang lalu", message: { before: "Barang", entity: "‘Printer’", after: "diperbarui" } },
  { timeAgo: "5 hari yang lalu", message: { before: "Barang", entity: "‘Switch’", after: "ditambahkan ke ‘Ruang B101’" } },
  { timeAgo: "3 hari yang lalu", message: { before: "Barang", entity: "‘Laptop’", after: "dihapus dari ‘IT Lab’" } },
  { timeAgo: "5 hari yang lalu", message: { before: "Barang", entity: "‘Proyektor’", after: "diperbarui" } },
];

export default function Dashboard() {
  return (
    <PageShell
      breadcrumb={[
        { label: "Home", to: "/" },
        { label: "Dashboard" },
      ]}
    >
      {/* Section: Header */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold">
          Dashboard <span className="text-slate-500 font-normal">Overview</span>
        </h2>
        <p className="text-slate-600 text-sm mt-1">
          Ringkasan data inventaris & aktivitas terbaru.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title="Total Barang" value="120" />
        <StatCard title="Total Ruangan" value="8" />
        <StatCard title="Pengguna Aktif" value="56" />
        <StatCard title="Perlu Servis" value="5" />
      </div>

    
      <div>
        <h3 className="text-base font-semibold mb-3">Aktivitas Terbaru</h3>
        <ActivityList items={activities} />
      </div>
    </PageShell>
  );
}
