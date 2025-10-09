// src/pages/admin/ListAdmin.jsx
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageShell from "../../components/PageShell";
import Table from "../../components/Table";
import Button from "../../components/Button";
import RowActions from "../../components/RowActions";
import { api } from "../../api/api";
import Swal from "sweetalert2";

const USERS_ENDPOINT = "/api/users";

export default function ListAdmin() {
  const [rows, setRows] = useState([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await api.get(USERS_ENDPOINT); // -> http://localhost:5000/api/users
        const data = Array.isArray(res?.data?.data)
          ? res.data.data
          : Array.isArray(res?.data)
          ? res.data
          : [];
        const withNo = data.map((it, i) => ({ ...it, no: i + 1 }));
        setRows(withNo);
        setError("");
      } catch (e) {
        setRows([]);
        setError(e?.response?.data?.error || e.message || "Gagal memuat data users");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Hapus user: terima password konfirmasi dari RowActions
  const removeById = async (id, confirmPassword) => {
    try {
      await api.delete(`${USERS_ENDPOINT}/${id}`, {
        data: { confirmPassword }, // kirim password ke backend
      });
      setRows((prev) =>
        (Array.isArray(prev) ? prev : [])
          .filter((p) => p.id !== id)
          .map((it, i) => ({ ...it, no: i + 1 }))
      );
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "Gagal menghapus",
        text: e?.response?.data?.error || e.message,
      });
      throw e; // biar RowActions bisa tangani error toast-nya juga
    }
  };

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    const src = Array.isArray(rows) ? rows : [];
    if (!s) return src;
    return src.filter(
      (r) =>
        String(r.no).includes(s) ||
        (r?.username ?? "").toLowerCase().includes(s) ||
        (r?.email ?? "").toLowerCase().includes(s)
    );
  }, [rows, q]);

  const columns = useMemo(
    () => [
      { header: "No.", accessor: "no" },
      { header: "Username", accessor: "username" },
      { header: "Email", accessor: "email" },
      {
        header: "Aksi",
        accessor: "actions",
        render: (row) => (
          <RowActions
            basePath="/admin"
            id={row.id}
            requireDeletePassword              // ← hanya di Users
            onDelete={(pwd) => removeById(row.id, pwd)} // pwd dari modal RowActions
            getDeleteName={() => row.username}
            labels={{ view: "Detail", edit: "Ubah", delete: "Hapus" }}
          />
        ),
      },
    ],
    [removeById]
  );

  const emptyText = loading ? "Memuat..." : error || "Tidak ada data";

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
          <Button variant="secondary" onClick={() => navigate("/admin/tambah")}>
            + Tambah Admin
          </Button>
        </div>
      </div>

      <Table columns={columns} data={filtered} emptyText={emptyText} />
    </PageShell>
  );
}
