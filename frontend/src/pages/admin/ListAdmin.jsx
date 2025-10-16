// src/pages/admin/ListAdmin.jsx
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getUsers, deleteUser } from "../../services";
import PageShell from "../../components/PageShell";
import Table from "../../components/Table";
import Button from "../../components/Button";
import RowActions from "../../components/RowActions";
import Swal from "sweetalert2";

export default function ListAdmin() {
  const [users, setUsers] = useState();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchData();
  }, [location.key]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getUsers();
      const newData = data.map((item, idx) => ({ ...item, no: idx + 1 }));

      setUsers(newData);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  // Hapus user: terima password konfirmasi dari RowActions
  const removeById = async (id, confirmPassword) => {
    try {
      await deleteUser(id, confirmPassword);
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
    const s = search.trim().toLowerCase();
    const src = Array.isArray(users) ? users : [];
    if (!s) return src;
    return src.filter(
      (r) =>
        String(r.no).includes(s) ||
        (r?.username ?? "").toLowerCase().includes(s) ||
        (r?.email ?? "").toLowerCase().includes(s)
    );
  }, [users, search]);

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
            requireDeletePassword // ← hanya di Users
            onDelete={removeById}
            hideEdit
            getDeleteName={() => row.username}
            labels={{ view: "Detail", edit: "Ubah", delete: "Hapus" }}
          />
        ),
      },
    ],
    []
  );

  const emptyText = loading
    ? "Memuat..."
    : error
    ? `Gagal memuat data`
    : "Tidak ada data";

  return (
    <PageShell breadcrumb={[{ label: "Home", to: "/" }, { label: "Admin" }]}>
      <div className="mb-4 flex items-center justify-between gap-3 flex-wrap">
        <h2 className="text-2xl font-semibold text-gray-700">Data Admin</h2>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari username/email"
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
