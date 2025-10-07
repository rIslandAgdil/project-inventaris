import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageShell from "../../components/PageShell";
import Table from "../../components/Table";
import Button from "../../components/Button";
import Swal from "sweetalert2";
import RowActions from "../../components/RowActions";

// Data dummy
const DUMMY_RUANGAN = [
  { id: 1, no: 1, ruangan: "Ruang B101", barang: "Komputer, monitor" },
  { id: 2, no: 2, ruangan: "Ruang B102", barang: "Kompor" },
  { id: 3, no: 3, ruangan: "Ruang B101", barang: "Gorden" },
];

export default function DataRuangan() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => {
      setRows(DUMMY_RUANGAN.map((item, idx) => ({ ...item, no: idx + 1 })));
      setLoading(false);
    }, 300);
    return () => clearTimeout(t);
  }, []);

  const handleDelete = (row) => {
    Swal.fire({
      title: "Yakin?",
      text: `Hapus ${row.ruangan}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus",
      cancelButtonText: "Batal",
    }).then((res) => {
      if (res.isConfirmed) {
        setRows((prev) =>
          prev.filter((p) => p.id !== row.id).map((it, i) => ({ ...it, no: i + 1 }))
        );
        Swal.fire("Berhasil", "Ruangan dihapus (lokal)", "success");
      }
    });
  };

  // Filter sesuai field yang ada
  const filtered = rows.filter((p) => {
    const s = q.toLowerCase();
    return (
      String(p.no).includes(s) ||
      p.ruangan.toLowerCase().includes(s) ||
      p.barang.toLowerCase().includes(s)
    );
  });

  const columns = [
    { header: "No.", accessor: "no", hideBelow: "md" },
    { header: "Ruangan", accessor: "ruangan" },
    { header: "Barang", accessor: "barang" },
    {
           header: "Aksi",
           accessor: "actions",
           render: (row) => (
             <RowActions
               basePath="/ruangan"
               id={row.id}
               onDelete={() => {
                 setRows((prev) =>
                   prev.filter((p) => p.id !== row.id).map((it, i) => ({ ...it, no: i + 1 }))
                 );
               }}
               getDeleteName={() => row.username}
             />
           ),
         },
      ];

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
          <Button variant="secondary" onClick={() => navigate("/ruangan/tambah")}>+ Tambah Ruangan</Button>
        </div>
      </div>

      {loading ? <p>Loading…</p> : <Table columns={columns} data={filtered} />}
    </PageShell>
  );
}
