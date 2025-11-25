import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageShell from "../../components/PageShell";
import Table from "../../components/Table";
import Button from "../../components/Button";
import RowActions from "../../components/RowActions";
import { useDeleteRuangan, useGetRuangan } from "../../hooks/ruanganQueries";

export default function DataRuangan() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetRuangan();
  const deleteRuangan = useDeleteRuangan();

  const filtered = useMemo(() => {
    const ruangan = data?.data || [];

    // pastikan ruangan ada sebelum mapping data
    if (isLoading || !ruangan || ruangan.length === 0) return [];

    const mappedRuangan = ruangan.map((item, idx) => ({
      no: idx + 1,
      ...item,
    }));

    // jika tidak ada search, kembalikan semua data
    if (!search.trim()) return mappedRuangan;

    // filter berdasarkan search query
    return mappedRuangan.filter((r) =>
      r?.nama_ruangan.toLowerCase().includes(search.toLowerCase())
    );
  }, [data, search, isLoading]);

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
          onDelete={() => deleteRuangan.mutate(row.id)}
          getDeleteName={() => row.username}
        />
      ),
    },
  ];

  const emptyText = isLoading
    ? "Memuat..."
    : error
    ? `Gagal memuat data`
    : "Tidak ada data";

  return (
    <PageShell breadcrumb={[{ label: "Home", to: "/" }, { label: "Ruangan" }]}>
      <div className="mb-4 flex items-center justify-between gap-3 flex-wrap">
        <h2 className="text-2xl font-semibold text-gray-700">Data Ruangan</h2>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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
