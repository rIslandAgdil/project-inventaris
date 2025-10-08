import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import PageShell from "../../components/PageShell";
import Button from "../../components/Button";
import Input from "../../components/Input";

const DUMMY_ADMIN = [
  { id: 1, username: "saya", email: "saya@gmail.com", password: "saya123" },
  { id: 2, username: "aku",  email: "aku@gmail.com",  password: "aku123"  },
  { id: 3, username: "kita", email: "kita@gmail.com", password: "kita123" },
];

export default function FormAdmin() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const mode = location.pathname.includes("/view/") ? "view" : id ? "edit" : "create";

  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(!!id);

  useEffect(() => {
    if (!id) return;
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
    setLoading(false);
  }, [id, navigate]);

  const readOnly = mode === "view";
  const titleMap = { create: "Tambah", edit: "Edit", view: "Detail" };

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (readOnly) return;

    if (!form.username.trim() || !form.email.trim() || !form.password.trim()) {
      Swal.fire("Validasi", "Username, Email, dan Password wajib diisi", "warning");
      return;
    }
    Swal.fire("Sukses", `Data berhasil disimpan (${mode}) — UI-only`, "success")
      .then(() => navigate("/admin"));
  };

  return (
    <PageShell
      breadcrumb={[
        { label: "Home", to: "/" },
        { label: "Admin", to: "/admin" },
        { label: titleMap[mode] },
      ]}
    >
      <div className="max-w-xl mx-auto">
        <div className="bg-white border rounded-md shadow-sm overflow-hidden">

          <div className="px-6 py-4 border-b">
            <h2 className="text-xl font-semibold text-gray-800">
              {titleMap[mode]} Admin
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Form {mode === "create" ? "penambahan" : mode === "edit" ? "pengubahan" : "detail"} admin.
            </p>
          </div>

  
          {loading ? (
            <div className="px-6 py-6">Loading…</div>
          ) : (
            <form onSubmit={handleSubmit} className="px-6 py-6 grid gap-4">
              <div>
                <label className="block text-sm text-slate-700 mb-1">Username</label>
                <Input
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  readOnly={readOnly}
                  placeholder="Masukkan username admin"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-700 mb-1">Email</label>
                <Input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  readOnly={readOnly}
                  placeholder="Masukkan Email"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-700 mb-1">Password</label>
                <Input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  readOnly={readOnly}
                  placeholder="Masukkan Password"
                />
              </div>

     
              <div className="flex items-center gap-2 pt-4 mt-2 border-t justify-end">
                <Button variant="secondary" type="button" onClick={() => navigate("/admin")}>
                  Batal
                </Button>

                {mode === "view" ? (
                  <Button type="button" variant="primary" onClick={() => navigate(`/admin/edit/${id}`)}>
                    Edit
                  </Button>
                ) : (
                  <Button type="submit" variant="primary">
                    Simpan
                  </Button>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </PageShell>
  );
}
