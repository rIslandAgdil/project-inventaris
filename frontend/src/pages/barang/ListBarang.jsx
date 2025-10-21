import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useFetchBarang } from "../../hooks/barang/useFetchBarang";
import { useDeleteBarang } from "../../hooks/barang/useDeleteBarang";
import PageShell from "../../components/PageShell";
import Table from "../../components/Table";
import Button from "../../components/Button";
import RowActions from "../../components/RowActions";

export default function Databarang() {
  const {
    barang,
    handleFetchBarang,
    loading: fetchLoading,
    error: fetchError,
  } = useFetchBarang();
  const { deleteBarangById } = useDeleteBarang();
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    handleFetchBarang();
  }, [location.key]);

  // ✅ ubah toLowerCase untuk kode_inventaris agar tidak error
  const filtered = barang.filter(
    (p) =>
      p.name.toLowerCase().includes(q.toLowerCase()) ||
      p.kode_inventaris.toString().toLowerCase().includes(q.toLowerCase()) ||
      p.ruangan.toLowerCase().includes(q.toLowerCase()) ||
      p.user.toLowerCase().includes(q.toLowerCase())
  );

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
          onDelete={() => deleteBarangById(row.id)}
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

        <Table columns={columns} data={filtered} emptyText={emptyText} />
      </div>
    </PageShell>
  );
}
