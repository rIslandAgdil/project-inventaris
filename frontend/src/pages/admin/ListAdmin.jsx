// pages/admin/DataAdmin.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageShell from "../../components/PageShell";
import Table from "../../components/Table";
import Button from "../../components/Button";
import RowActions from "../../components/RowActions";

const DUMMY_ADMIN = [
  { id: 1, username: "saya", email:"saya@gmail.com", password:"saya123" },
  { id: 2, username: "aku",  email:"aku@gmail.com",  password:"aku123"  },
  { id: 3, username: "kita", email:"kita@gmail.com", password:"kita123" },
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

  // Hapus item & re-number kolom "no"
  const removeById = (id) => {
    setRows((prev) =>
      prev.filter((p) => p.id !== id).map((it, i) => ({ ...it, no: i + 1 }))
    );
  };

  // Pencarian berdasarkan field yang ada
  const filtered = rows.filter((p) => {
    const s = q.toLowerCase();
    return (
      String(p.no).includes(s) ||
      p.username.toLowerCase().includes(s) ||
      p.email.toLowerCase().includes(s) ||
      p.password.toLowerCase().includes(s)
    );
  });

  const columns = [
    { header: "No.", accessor: "no" },
    { header: "Username", accessor: "username" },
    { header: "Email", accessor: "email" },
    { header: "Password", accessor: "password" }, // pertimbangkan untuk tidak menampilkan password di produksi
    {
      header: "Aksi",
      accessor: "actions",
      render: (row) => (
        <RowActions
          basePath="/admin"
          id={row.id}
          onDelete={() => removeById(row.id)}      // konfirmasi sudah ditangani RowActions
          getDeleteName={() => row.username}       // nama yang tampil di dialog
          labels={{ view: "Detail", edit: "Ubah", delete: "Hapus" }}
        />
      ),
    },
  ];

  return (
    <PageShell breadcrumb={[{ label: "Home", to: "/" }, { label: "Admin" }]}>
      <div className="mb-4 flex items-center justify-between gap-3 flex-wrap">
        <h2 className="text-2xl font-semibold text-gray-700">Data Admin</h2>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Cari no/username/email"
            className="border rounded-md px-3 py-2 text-sm"
          />
          <Button variant="secondary" onClick={() => navigate("/admin/tambah")}>+ Tambah Admin</Button>
        </div>
      </div>

      {loading ? <p>Loading…</p> : <Table columns={columns} data={filtered} />}
    </PageShell>
  );
}
