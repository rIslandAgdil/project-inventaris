import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../api/api";
import Swal from "sweetalert2";
import PageShell from "../../components/PageShell";
import Button from "../../components/Button";

export default function FormRuangan() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const mode = location.pathname.includes("/view/")
    ? "view"
    : id
    ? "edit"
    : "create";

  const [form, setForm] = useState({ nama_ruangan: "" });
  const [loading, setLoading] = useState(!!id);

  useEffect(() => {
    if (mode !== "create") {
      fetchData(id);
    }
  }, []);

  const fetchData = async (id) => {
    try {
      setLoading(true);
      const res = await axios.get(`${baseUrl}/ruangan/${id}`);

      setForm(res.data);
    } catch (error) {
      console.log(error.message);
    }
    setLoading(false);
  };

  const readOnly = mode === "view";
  const titleMap = { create: "Tambah", edit: "Edit", view: "Detail" };

  const handleChange = (e) => setForm({ nama_ruangan: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    // JIKA DATA BELUM LENGKAP
    if (!form.nama_ruangan.trim()) {
      Swal.fire("Validasi", "Nama ruangan wajib diisi", "warning");
      return;
    }

    // JIKA DATA LENGKAP
    Swal.fire({
      title: "Simpan Data?",
      text: `Pastikan data yang anda input sudah benar!`,
      icon: "question",
      showCancelButton: true,
      cancelButtonText: "Batal",
      confirmButtonText: "Simpan",
      reverseButtons: true,
      focusCancel: true,
      confirmButtonColor: "#e11d48",
    }).then(async (res) => {
      if (res.isConfirmed) {
        try {
          setLoading(true);

          mode === "create"
            ? await axios.post(`${baseUrl}/ruangan`, form)
            : await axios.put(`${baseUrl}/ruangan/${id}`, form);

          Swal.fire("Sukses", `Data berhasil disimpan`, "success").then(() =>
            navigate("/ruangan")
          );
        } catch (error) {
          console.log(error.message);
        }
        setLoading(false);
      }
    });
  };

  return (
    <PageShell
      breadcrumb={[
        { label: "Home", to: "/" },
        { label: "Ruangan", to: "/ruangan" },
        { label: titleMap[mode] },
      ]}
    >
      <div className="max-w-xl mx-auto">
        <div className="bg-white border rounded-md shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h2 className="text-xl font-semibold text-gray-800">
              {titleMap[mode]} Ruangan
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Form{" "}
              {mode === "create"
                ? "penambahan"
                : mode === "edit"
                ? "pengubahan"
                : "detail"}{" "}
              ruangan.
            </p>
          </div>

          {loading ? (
            <div className="px-6 py-6">Loading…</div>
          ) : (
            <form onSubmit={handleSubmit} className="px-6 py-6 grid gap-4">
              <div>
                <label className="block text-sm text-slate-700 mb-1">
                  Nama Ruangan
                </label>
                <input
                  name="nama_ruangan"
                  value={form.nama_ruangan}
                  onChange={handleChange}
                  readOnly={readOnly}
                  className="w-full border rounded-md px-3 py-2 text-sm"
                  placeholder="Masukkan nama ruangan"
                />
              </div>

              <div className="flex items-center gap-2 pt-4 mt-2 border-t justify-end">
                <Button
                  variant="secondary"
                  type="button"
                  onClick={() => navigate("/ruangan")}
                >
                  {mode === "view" ? "Kembali" : "Batal"}
                </Button>

                {mode !== "view" && (
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
