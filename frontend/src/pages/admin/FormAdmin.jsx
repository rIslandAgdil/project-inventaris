// src/pages/admin/FormAdmin.jsx
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";
import PageShell from "../../components/PageShell";
import Button from "../../components/Button";

const DUMMY_ADMIN = [
  { id: 1, no: 1, username: "saya", email: "saya@gmail.com", password: "saya123" },
  { id: 2, no: 2, username: "aku",  email: "aku@gmail.com",  password: "aku123"  },
  { id: 3, no: 3, username: "kita", email: "kita@gmail.com", password: "kita123" },
];

export default function FormAdmin() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const mode = useMemo(() => {
    if (location.pathname.includes("/view/")) return "view";
    if (id) return "edit";
    return "create";
  }, [id, location.pathname]);

  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => {
      if (id) {
        const found = DUMMY_ADMIN.find((r) => String(r.id) === String(id));
        if (!found) {
          Swal.fire("Gagal", "Data tidak ditemukan (dummy)", "error");
          navigate("/admin");
          return;
        }
        setForm({
          username: found.username ?? "",
          email: found.email ?? "",
          password: found.password ?? "",
        });
      }
      setLoading(false);
    }, 200);
    return () => clearTimeout(t);
  }, [id, navigate]);

  const readOnly = mode === "view";
  const titleMap = { create: "Tambah", edit: "Edit", view: "Detail" };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (readOnly) return;

    if (!form.username.trim() || !form.email.trim() || !form.password.trim()) {
      Swal.fire("Validasi", "Username, Email, dan Password wajib diisi", "warning");
      return;
    }

    // UI-only
    Swal.fire("Sukses", `Data berhasil disimpan (${mode}) — UI-only`, "success");
    navigate("/admin");
  };

  return (
    <PageShell
      breadcrumb={[
        { label: "Home", to: "/" },
        { label: "Admin", to: "/admin" },
        { label: titleMap[mode] },
      ]}
    >
      <div className="mb-4">
        <h2 className="text-2xl font-semibold text-blue-700">
          {titleMap[mode]} Admin
        </h2>
        <p className="text-slate-600 text-sm mt-1">
          Form {mode === "create" ? "penambahan" : mode === "edit" ? "pengubahan" : "detail"} admin (UI-only).
        </p>
      </div>

      {loading ? (
        <p>Loading…</p>
      ) : (
        <form onSubmit={handleSubmit} className="grid gap-4 max-w-md">
          <div>
            <label className="block text-sm text-slate-700 mb-1">Username</label>
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              readOnly={readOnly}
              className="w-full border rounded-md px-3 py-2 text-sm"
              placeholder="Masukkan username admin"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              readOnly={readOnly}
              className="w-full border rounded-md px-3 py-2 text-sm"
              placeholder="Masukkan Email"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              readOnly={readOnly}
              className="w-full border rounded-md px-3 py-2 text-sm"
              placeholder="Masukkan Password"
            />
          </div>

          <div className="flex items-center gap-2 pt-2">
            <Button variant="secondary" type="button" onClick={() => navigate("/admin")}>
              Batal
            </Button>

            {mode === "view" ? (
              <Button variant="success" type="button" onClick={() => navigate(`/admin/edit/${id}`)}>
                Edit
              </Button>
            ) : (
              <Button variant="primary" type="submit">
                Simpan
              </Button>
            )}
          </div>
        </form>
      )}
    </PageShell>
  );
}
