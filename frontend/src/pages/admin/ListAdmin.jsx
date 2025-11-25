import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageShell from "../../components/PageShell";
import Table from "../../components/Table";
import Button from "../../components/Button";
import RowActions from "../../components/RowActions";
import { useDeleteUser, useGetUsers } from "../../hooks/userQueries";

export default function ListAdmin() {
  const [search, setSearch] = useState("");
  const { data, isLoading, error } = useGetUsers();
  const deleteUser = useDeleteUser();
  const navigate = useNavigate();

  const filtered = useMemo(() => {
    const users = data?.data || [];

    // pastikan user ada sebelum mapping data
    if (isLoading || !users || users.length === 0) return [];

    const mappedUsers = users.map((user, idx) => ({
      no: idx + 1,
      ...user,
    }));

    // jika tidak ada search, kembalikan semua data
    if (!search.trim()) return mappedUsers;

    // filter berdasarkan search query
    return mappedUsers.filter(
      (r) =>
        String(r.no).includes(search) ||
        (r?.username ?? "").toLowerCase().includes(search) ||
        (r?.email ?? "").toLowerCase().includes(search)
    );
  }, [data, search, isLoading]);

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
            onDelete={() => deleteUser.mutate(row.id)}
            hideEdit
            getDeleteName={() => row.username}
            labels={{ view: "Detail", edit: "Ubah", delete: "Hapus" }}
          />
        ),
      },
    ],
    []
  );

  const emptyText = isLoading
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
