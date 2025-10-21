// src/pages/admin/ListAdmin.jsx
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PageShell from "../../components/PageShell";
import Table from "../../components/Table";
import Button from "../../components/Button";
import RowActions from "../../components/RowActions";
import { useFetchUsers } from "../../hooks/user/useFetchUsers";
import { useDeleteUser } from "../../hooks/user/useDeleteUser";

export default function ListAdmin() {
  const [search, setSearch] = useState("");
  const { handleFetchUsers, loading, error, users } = useFetchUsers();
  const { handleDeleteUser } = useDeleteUser();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    handleFetchUsers();
  }, [location.key]);

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
            onDelete={handleDeleteUser}
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
