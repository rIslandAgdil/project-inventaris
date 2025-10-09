// src/pages/admin/FormAdmin.jsx
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";
import PageShell from "../../components/PageShell";
import Button from "../../components/Button";
import { api } from "../../api/api";

const USERS_ENDPOINT = "/api/users";

function pickOne(payload) {
  const p = payload?.data ?? payload;
  if (Array.isArray(p)) return p[0] ?? {};
  if (Array.isArray(p?.data)) return p.data[0] ?? {};
  if (p && typeof p === "object") return p;
  return {};
}

export default function FormAdmin({ mode: modeProp }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const mode = useMemo(() => {
    if (modeProp) return modeProp;
    if (location.pathname.includes("/view/")) return "view";
    if (id) return "edit";
    return "create";
  }, [modeProp, id, location.pathname]);

  // create: password; edit: confirmPassword (wajib), newPassword (opsional)
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",          // create only
    confirmPassword: "",   // edit required
    newPassword: "",       // edit optional
  });
  const [loading, setLoading] = useState(!!id);

  useEffect(() => {
    if (!(mode === "edit" || mode === "view")) return;
    if (!id) return;
    let ignore = false;

    (async () => {
      setLoading(true);
      try {
        const res = await api.get(`${USERS_ENDPOINT}/${id}`);
        const u = pickOne(res?.data);
        if (!ignore) {
          setForm((s) => ({
            ...s,
            username: u?.username ?? "",
            email: u?.email ?? "",
            password: "",
            confirmPassword: "",
            newPassword: "",
          }));
        }
      } catch (e) {
        Swal.fire("Gagal", e?.response?.data?.error || e.message, "error");
        navigate("/admin");
      } finally {
        if (!ignore) setLoading(false);
      }
    })();

    return () => { ignore = true; };
  }, [id, mode, navigate]);

  const readOnly = mode === "view";
  const titleMap = { create: "Tambah", edit: "Edit", view: "Detail" };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (readOnly) return;

    if (!form.username.trim()) return Swal.fire("Validasi", "Username wajib diisi", "warning");
    if (!form.email.trim()) return Swal.fire("Validasi", "Email wajib diisi", "warning");

    try {
      setLoading(true);

      if (mode === "edit" && id) {
        // wajib konfirmasi password saat menyimpan perubahan
        if (!form.confirmPassword || form.confirmPassword.trim().length < 4) {
          setLoading(false);
          return Swal.fire("Validasi", "Password konfirmasi minimal 4 karakter.", "warning");
        }
        const payload = {
          username: form.username,
          email: form.email,
          confirmPassword: form.confirmPassword.trim(),
        };
        // ganti password bila diisi
        if (form.newPassword && form.newPassword.trim()) {
          if (form.newPassword.trim().length < 4) {
            setLoading(false);
            return Swal.fire("Validasi", "Password baru minimal 4 karakter.", "warning");
          }
          payload.password = form.newPassword.trim();
        }
        await api.put(`${USERS_ENDPOINT}/${id}`, payload);
      } else if (mode === "create") {
        if (!form.password || form.password.trim().length < 4) {
          setLoading(false);
          return Swal.fire("Lengkapi", "Password minimal 4 karakter.", "warning");
        }
        await api.post(USERS_ENDPOINT, {
          username: form.username,
          email: form.email,
          password: form.password.trim(),
        });
      }

      await Swal.fire("Sukses", "Data admin berhasil disimpan.", "success");
      navigate("/admin");
    } catch (e) {
      Swal.fire("Gagal", e?.response?.data?.error || e.message, "error");
    } finally {
      setLoading(false);
    }
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
              {/* Username */}
              <div>
                <label className="block text-sm text-slate-700 mb-1">Username</label>
                <input
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  readOnly={readOnly}
                  className="w-full border rounded-md px-3 py-2 text-sm"
                  placeholder="Masukkan username"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm text-slate-700 mb-1">Email</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  readOnly={readOnly}
                  className="w-full border rounded-md px-3 py-2 text-sm"
                  placeholder="nama@email.com"
                  required
                />
              </div>

              {/* Create: password wajib */}
              {mode === "create" && (
                <div>
                  <label className="block text-sm text-slate-700 mb-1">Password</label>
                  <input
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    readOnly={readOnly}
                    className="w-full border rounded-md px-3 py-2 text-sm"
                    placeholder="Minimal 4 karakter"
                    minLength={4}
                    required
                  />
                </div>
              )}

              {/* Edit: password konfirmasi (wajib) + password baru (opsional) */}
              {mode === "edit" && (
                <>
                  <div>
                    <label className="block text-sm text-slate-700 mb-1">Password Konfirmasi</label>
                    <input
                      name="confirmPassword"
                      type="password"
                      value={form.confirmPassword}
                      onChange={handleChange}
                      readOnly={readOnly}
                      className="w-full border rounded-md px-3 py-2 text-sm"
                      placeholder="Masukkan password akun untuk menyimpan perubahan"
                      minLength={4}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-slate-700 mb-1">Password Baru (opsional)</label>
                    <input
                      name="newPassword"
                      type="password"
                      value={form.newPassword}
                      onChange={handleChange}
                      readOnly={readOnly}
                      className="w-full border rounded-md px-3 py-2 text-sm"
                      placeholder="Isi jika ingin ganti, minimal 4 karakter"
                      minLength={4}
                    />
                  </div>
                </>
              )}

              <div className="flex items-center gap-2 pt-4 mt-2 border-t justify-end">
                <Button variant="secondary" type="button" onClick={() => navigate("/admin")}>
                  {readOnly ? "Kembali" : "Batal"}
                </Button>
                {!readOnly && (
                  <Button type="submit" variant="primary" disabled={loading}>
                    {loading ? "Menyimpan..." : "Simpan"}
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
