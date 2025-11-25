import PageShell from "../components/PageShell";
import StatCard from "../components/StatCard";
import { getUsers, getBarang, getRuangan } from "../services";
import ActivityList from "../components/ActivityList";
import { useQuery } from "@tanstack/react-query";

export default function Dashboard() {

  // Query data barang
  const {data: dataBarang, isLoading: isLoadingBarang, isError: isErrorBarang, error: errorBarang} = useQuery({
    queryKey: ["barang"],
    queryFn: getBarang,
  });

  // Query data ruangan
  const {data: dataRuangan, isLoading: isLoadingRuangan, isError: isErrorRuangan, error: errorRuangan} = useQuery({
    queryKey: ["ruangan"],
    queryFn: getRuangan,
  });

  // Query data pengguna
  const {data: dataPengguna, isLoading: isLoadingPengguna, isError: isErrorPengguna, error: errorPengguna} = useQuery({
    queryKey: ["pengguna"],
    queryFn: getUsers,
  });

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

      {isLoadingBarang || isLoadingRuangan || isLoadingPengguna ? (
        //jika loading tampilkan loading
        <p className="text-center animate-pulse">Loading...</p>
      ) : isErrorBarang || isErrorRuangan || isErrorPengguna ? (
        //jika error tampilkan pesan error
        <p className="text-center text-red-500">{errorBarang?.message || errorRuangan?.message || errorPengguna?.message}</p>
      ) : (
        //jika data ada tampilkan data
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard title="Total Barang" value={dataBarang.data.length} />
          <StatCard title="Total Ruangan" value={dataRuangan.data.length} />
          <StatCard title="Pengguna Aktif" value={dataPengguna.data.length} />
        </div>
      )}

      {/* <div>
        <h3 className="text-base font-semibold mb-3">Aktivitas Terbaru</h3>
        <ActivityList items={activities} />
      </div> */}
    </PageShell>
  );
}
