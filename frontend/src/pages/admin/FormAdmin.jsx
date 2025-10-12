import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { baseUrl } from "../../api/api";
import { AuthContext } from "../../context/AuthContext";
import Swal from "sweetalert2";
import PageShell from "../../components/PageShell";
import Button from "../../components/Button";
import axios from "axios";

/**
 * Mengambil satu objek dari payload yang mungkin berbentuk array atau object.
 *
 * @param {Object|Array} payload - Data yang dikembalikan dari API.
 * @returns {Object} Objek tunggal hasil ekstraksi dari array atau object.
 *                   Jika tidak ada data, akan mengembalikan objek kosong.
 *
 * @example
 * pickOne([{ id: 1 }, { id: 2 }]); // { id: 1 }
 * pickOne({ data: [{ id: 1 }] });  // { id: 1 }
 * pickOne({ id: 1 });              // { id: 1 }
 */
function pickOne(payload) {
  const p = payload?.data ?? payload;
  if (Array.isArray(p)) return p[0] ?? {};
  if (Array.isArray(p?.data)) return p.data[0] ?? {};
  if (p && typeof p === "object") return p;
  return {};
}

export default function FormAdmin({ mode = "view" }) {
  const { idUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(!!idUser);
  const navigate = useNavigate();

  // create: password; edit: confirmPassword (wajib), newPassword (opsional)
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "", // create and edit only
    confirmPassword: "", // create and edit required
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${baseUrl}/users/${idUser}`);
      const data = pickOne(res?.data);
      setForm({
        username: data?.username ?? "",
        email: data?.email ?? "",
        password: "",
        confirmPassword: "",
      });
      // if (!ignore) {
      // }
    } catch (e) {
      Swal.fire("Gagal", e?.response?.data?.error || e.message, "error");
      navigate("/admin");
    } finally {
      // if (!ignore) setLoading(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!(mode === "edit" || mode === "view" || mode === "password" || idUser))
      return;

    fetchData();
  }, [mode]);

  const readOnly = mode === "view";
  const titleMap = { create: "Tambah", edit: "Edit", view: "Detail" };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (readOnly) return;

    try {
      setLoading(true);

      if (mode === "password") {
        if (form.password.trim() !== form.confirmPassword.trim()) {
          setLoading(false);
          return Swal.fire(
            "Gagal!",
            "Password dan konfirmasi password tidak cocok.",
            "error"
          );
        }

        // Minta konfirmasi password lama
        const res = await Swal.fire({
          title: "Konfirmasi Password Lama",
          html: `<span class="text-sm text-slate-600">Masukkan password untuk melanjutkan.</span>`,
          input: "password",
          inputPlaceholder: "Password",
          showCancelButton: true,
          cancelButtonText: "Batal",
          confirmButtonText: "Ya, Hapus",
          confirmButtonColor: "#e11d48",
          reverseButtons: true,
          focusCancel: true,
          preConfirm: async (value) => {
            if (!value || value.length < 4) {
              Swal.showValidationMessage("Password minimal 4 karakter");
              return false;
            }
            try {
              await axios.put(`${baseUrl}/users/${idUser}`, {
                password: value,
                newPassword: form.confirmPassword.trim(),
              });
              await Swal.fire("Berhasil", "Data telah dihapus", "success");
            } catch (e) {
              Swal.showValidationMessage(
                e?.response?.data?.error || e.message || "Gagal menghapus."
              );
            }
            navigate("/admin");
            return false;
          },
        });
        if (!res.isConfirmed) return;
      }

      if (mode === "edit" && idUser) {
        const payload = {
          username: form.username,
          email: form.email,
          // confirmPassword: form.confirmPassword.trim(),
        };

        try {
          const res = await axios.put(`${baseUrl}/users/${idUser}`, payload);
          const { username } = res.data;

          localStorage.setItem("username", JSON.stringify(username));
        } catch (error) {
          return Swal.fire(
            "Gagal",
            error?.response?.data?.error || error.message,
            "error"
          );
        }
      }

      if (mode === "create") {
        if (form.password.trim() !== form.confirmPassword.trim()) {
          setLoading(false);
          return Swal.fire(
            "Gagal!",
            "Password dan konfirmasi password tidak cocok.",
            "error"
          );
        }
        try {
          await axios.post(`${baseUrl}/users`, {
            username: form.username,
            email: form.email,
            password: form.password.trim(),
          });
        } catch (error) {
          return Swal.fire(
            "Gagal",
            error?.response?.data?.error || error.message,
            "error"
          );
        }
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
              {mode !== "password"
                ? `${titleMap[mode]} Admin`
                : "Ganti Password"}
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Form{" "}
              {mode === "create"
                ? "penambahan"
                : mode === "edit"
                ? "pengubahan"
                : mode === "password"
                ? "penggantian password"
                : "detail"}{" "}
              admin.
            </p>
          </div>

          {loading ? (
            <div className="px-6 py-6">Loading…</div>
          ) : (
            <form onSubmit={handleSubmit} className="px-6 py-6 grid gap-4">
              {mode !== "password" && (
                <>
                  {/* Username */}
                  <div>
                    <label className="block text-sm text-slate-700 mb-1">
                      Username
                    </label>
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
                    <label className="block text-sm text-slate-700 mb-1">
                      Email
                    </label>
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
                </>
              )}

              {/* Create: password wajib */}
              {(mode === "create" || mode === "password") && (
                <>
                  <div>
                    <label className="block text-sm text-slate-700 mb-1">
                      Password
                    </label>
                    <input
                      name="password"
                      type="password"
                      value={form.password}
                      onChange={handleChange}
                      className="w-full border rounded-md px-3 py-2 text-sm"
                      placeholder="Minimal 4 karakter"
                      minLength={4}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-700 mb-1">
                      Konfirmasi Password
                    </label>
                    <input
                      name="confirmPassword"
                      type="password"
                      value={form.confirmPassword}
                      onChange={handleChange}
                      className="w-full border rounded-md px-3 py-2 text-sm"
                      placeholder="Minimal 4 karakter"
                      minLength={4}
                      required
                    />
                  </div>
                </>
              )}

              <div className="flex items-center gap-2 pt-4 mt-2 border-t justify-end">
                <Button
                  variant="secondary"
                  type="button"
                  onClick={() => navigate("/admin")}
                >
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
