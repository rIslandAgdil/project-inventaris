import PageShell from "../components/PageShell";
import StatCard from "../components/StatCard";
import { useEffect, useState } from "react";
import { getUsers, getBarang, getRuangan } from "../services";
import ActivityList from "../components/ActivityList";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dataBarang, setDataBarang] = useState();
  const [dataRuangan, setDataRuangan] = useState();
  const [dataPengguna, setDataPengguna] = useState();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch data from backend
      const [jumlahBarang, jumlahRuangan, jumlahPengguna] = await Promise.all([
        getBarang(),
        getRuangan(),
        getUsers(),
      ]);

      // Update state with fetched data
      setDataBarang(jumlahBarang.data.length);
      setDataRuangan(jumlahRuangan.data.length);
      setDataPengguna(jumlahPengguna.data.length);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Tampilkan pesan error kepada pengguna
      setError("Gagal memuat data. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageShell
      breadcrumb={[{ label: "Home", to: "/" }, { label: "Dashboard" }]}
    >
      <div className="mb-6">
        <h2 className="text-xl font-semibold">
          Dashboard <span className="text-slate-500 font-normal">Overview</span>
        </h2>
        <p className="text-slate-600 text-sm mt-1">
          Ringkasan data inventaris & aktivitas terbaru.
        </p>
      </div>

      {loading ? (
        //jika loading tampilkan loading
        <p className="text-center animate-pulse">Loading...</p>
      ) : error ? (
        //jika error tampilkan pesan error
        <p className="text-center text-red-500">{error}</p>
      ) : (
        //jika data ada tampilkan data
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard title="Total Barang" value={dataBarang} />
          <StatCard title="Total Ruangan" value={dataRuangan} />
          <StatCard title="Pengguna Aktif" value={dataPengguna} />
        </div>
      )}

      {/* <div>
        <h3 className="text-base font-semibold mb-3">Aktivitas Terbaru</h3>
        <ActivityList items={activities} />
      </div> */}
    </PageShell>
  );
}
