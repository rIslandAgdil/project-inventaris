import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useGetBarang, useDeleteBarang } from "../../hooks/barangQueries";
import PageShell from "../../components/PageShell";
import Table from "../../components/Table";
import Button from "../../components/Button";
import RowActions from "../../components/RowActions";

export default function Databarang() {
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const deleteBarang = useDeleteBarang();
  const {
    data: responseData,
    isLoading: fetchLoading,
    error: fetchError,
  } = useGetBarang();

  // Lakukan transformasi dan filter data
  const transformedBarang = useMemo(() => {
    const barang = responseData?.data || [];

    // Pastikan data ada sebelum melakukan map
    if (fetchLoading || !barang || barang.length === 0) return [];

    const mapped = barang.map((item, idx) => ({
      id: item.id,
      no: idx + 1,
      name: item.nama_barang,
      kode_inventaris: item.kode_inventaris,
      jumlah: item.jumlah,
      kondisi: item.kondisi,
      ruangan: item.ruangan?.nama_ruangan || "-",
      user: item.user?.username || "-",
    }));

    // Filter berdasarkan search query
    if (!q.trim()) return mapped;

    return mapped.filter(
      (p) =>
        p.name.toLowerCase().includes(q.toLowerCase()) ||
        p.kode_inventaris.toString().toLowerCase().includes(q.toLowerCase()) ||
        p.ruangan.toLowerCase().includes(q.toLowerCase()) ||
        p.user.toLowerCase().includes(q.toLowerCase())
    );
  }, [responseData, fetchLoading, q]);

  const columns = [
    { header: "No.", accessor: "no" },
    { header: "Nama", accessor: "name" },
    { header: "Kode Inventaris", accessor: "kode_inventaris" },
    { header: "Jumlah", accessor: "jumlah" },
    { header: "Kondisi", accessor: "kondisi" },
    { header: "Ruangan", accessor: "ruangan" },
    { header: "User", accessor: "user" },
    {
      header: "Aksi",
      accessor: "actions",
      render: (row) => (
        <RowActions
          basePath="/barang"
          id={row.id}
          onDelete={() => deleteBarang.mutate(row.id)}
          getDeleteName={() => row.name} // ✅ gunakan row.name, bukan row.username
        />
      ),
    },
  ];

  const emptyText = fetchLoading
    ? "Memuat..."
    : fetchError
    ? `Gagal memuat data`
    : "Tidak ada data";

  return (
    <PageShell breadcrumb={[{ label: "Home", to: "/" }, { label: "Barang" }]}>
      <div>
        <div className="mb-4 flex items-center justify-between gap-3 flex-wrap">
          <h2 className="text-2xl font-semibold text-gray-700">Data Barang</h2>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Cari barang / ruangan / user"
              className="border rounded-md px-3 py-2 text-sm"
            />
            <Button
              variant="secondary"
              onClick={() => navigate("/barang/tambah")}
            >
              + Tambah Barang
            </Button>
          </div>
        </div>

        <Table
          columns={columns}
          data={transformedBarang}
          emptyText={emptyText}
        />
      </div>
    </PageShell>
  );
}
