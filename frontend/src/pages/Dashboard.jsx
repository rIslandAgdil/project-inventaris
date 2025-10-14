import PageShell from "../components/PageShell";
import StatCard from "../components/StatCard";
import ActivityList from "../components/ActivityList";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../api/api";

export default function Dashboard() {
  const [dataBarang, setDataBarang] = useState();
  const [dataRuangan, setDataRuangan] = useState();
  const [dataPengguna, setDataPengguna] = useState();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [barangRes, ruanganRes, penggunaRes] = await Promise.all([
        axios.get(`${baseUrl}/barang`),
        axios.get(`${baseUrl}/ruangan`),
        axios.get(`${baseUrl}/users`),
      ]);

      setDataBarang(barangRes.data.length);
      setDataRuangan(ruanganRes.data.length);
      setDataPengguna(penggunaRes.data.data.length);
    } catch (error) {
      console.error("Error fetching data:", error);
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

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title="Total Barang" value={dataBarang} />
        <StatCard title="Total Ruangan" value={dataRuangan} />
        <StatCard title="Pengguna Aktif" value={dataPengguna} />
      </div>

      {/* <div>
        <h3 className="text-base font-semibold mb-3">Aktivitas Terbaru</h3>
        <ActivityList items={activities} />
      </div> */}
    </PageShell>
  );
}
