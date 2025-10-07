import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageShell from "../../components/PageShell";
import Table from "../../components/Table";
import Button from "../../components/Button";
import Swal from "sweetalert2";
import RowActions from "../../components/RowActions";

// Data dummy
const DUMMY_ADMIN = [
  { id: 1, no: 1, username: "saya", email:"saya@gmail.com", password:"saya123" },
  { id: 2, no: 1, username: "aku", email:"aku@gmail.com", password:"aku123" },
  { id: 3, no: 1, username: "kita", email:"kita@gmail.com", password:"kita123" },
];

export default function DataAdmin() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => {
      setRows(DUMMY_ADMIN.map((item, idx) => ({ ...item, no: idx + 1 })));
      setLoading(false);
    }, 300);
    return () => clearTimeout(t);
  }, []);

  const handleDelete = (row) => {
    Swal.fire({
      title: "Yakin?",
      text: `Hapus ${row.admin}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus",
      cancelButtonText: "Batal",
    }).then((res) => {
      if (res.isConfirmed) {
        setRows((prev) =>
          prev.filter((p) => p.id !== row.id).map((it, i) => ({ ...it, no: i + 1 }))
        );
        Swal.fire("Berhasil", "Admin dihapus (lokal)", "success");
      }
    });
  };

  // Filter sesuai field yang ada
  const filtered = rows.filter((p) => {
    const s = q.toLowerCase();
    return (
      String(p.no).includes(s) ||
      p.admin.toLowerCase().includes(s) ||
      p.barang.toLowerCase().includes(s)
    );
  });

  const columns = [
    { header: "No.", accessor: "no" },
    { header: "Username", accessor: "username" },
    { header: "Email", accessor: "email" },
    { header: "Password", accessor: "password" },
    {
        header: "Aksi",
        accessor: "actions",
        render: (row) => (
          <RowActions
            basePath="/admin"
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
    <PageShell breadcrumb={[{ label: "Home", to: "/" }, { label: "Admin" }]}>
      <div className="mb-4 flex items-center justify-between gap-3 flex-wrap">
        <h2 className="text-2xl font-semibold text-blue-700">Data Admin</h2>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Cari no/admin/barang"
            className="border rounded-md px-3 py-2 text-sm"
          />
          <Button onClick={() => navigate("/admin/tambah")}>+ Tambah Admin</Button>
        </div>
      </div>

      {loading ? <p>Loading…</p> : <Table columns={columns} data={filtered} />}
    </PageShell>
  );
}
