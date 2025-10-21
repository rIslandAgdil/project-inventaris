import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useFetchRuangan } from "../../hooks/ruangan/useFetchRuangan";
import { useDeleteRuangan } from "../../hooks/ruangan/useDeleteRuangan";
import PageShell from "../../components/PageShell";
import Table from "../../components/Table";
import Button from "../../components/Button";
import RowActions from "../../components/RowActions";

export default function DataRuangan() {
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const {
    ruangan,
    loading: loadingFetch,
    error: errorFetch,
    handleFetchRuangan,
  } = useFetchRuangan();
  const { handleDeleteRuangan } = useDeleteRuangan();

  useEffect(() => {
    handleFetchRuangan();
  }, [location.key]);

  const filtered = ruangan.filter((p) => {
    const s = q.toLowerCase();
    return p.nama_ruangan.toLowerCase().includes(s);
  });

  const columns = [
    { header: "No.", accessor: "no", hideBelow: "md" },
    { header: "Ruangan", accessor: "nama_ruangan" },
    {
      header: "Aksi",
      accessor: "actions",
      render: (row) => (
        <RowActions
          basePath="/ruangan"
          id={row.id}
          onDelete={() => handleDeleteRuangan(row.id)}
          getDeleteName={() => row.username}
        />
      ),
    },
  ];

  const emptyText = loadingFetch
    ? "Memuat..."
    : errorFetch
    ? `Gagal memuat data`
    : "Tidak ada data";

  return (
    <PageShell breadcrumb={[{ label: "Home", to: "/" }, { label: "Ruangan" }]}>
      <div className="mb-4 flex items-center justify-between gap-3 flex-wrap">
        <h2 className="text-2xl font-semibold text-gray-700">Data Ruangan</h2>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Cari no/ruangan/barang"
            className="border rounded-md px-3 py-2 text-sm"
          />
          <Button
            variant="secondary"
            onClick={() => navigate("/ruangan/tambah")}
          >
            + Tambah Ruangan
          </Button>
        </div>
      </div>

      <Table columns={columns} data={filtered} emptyText={emptyText} />
    </PageShell>
  );
}
