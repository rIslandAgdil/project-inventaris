import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";
import PageShell from "../../components/PageShell";
import Button from "../../components/Button";

const DUMMY_RUANGAN = [
  { id: 1, no: 1, ruangan: "Ruang B101" },
  { id: 2, no: 2, ruangan: "Ruang B102" },
  { id: 3, no: 3, ruangan: "Aula" },
];

export default function FormRuangan() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const mode = useMemo(() => {
    if (location.pathname.includes("/view/")) return "view";
    if (id) return "edit";
    return "create";
  }, [id, location.pathname]);

  const [form, setForm] = useState({ ruangan: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => {
      if (id) {
        const found = DUMMY_RUANGAN.find((r) => String(r.id) === String(id));
        if (!found) {
          Swal.fire("Gagal", "Data tidak ditemukan (dummy)", "error");
          navigate("/ruangan");
          return;
        }
        setForm({ ruangan: found.ruangan ?? "" });
      }
      setLoading(false);
    }, 200);
    return () => clearTimeout(t);
  }, [id, navigate]);

  const readOnly = mode === "view";
  const titleMap = { create: "Tambah", edit: "Edit", view: "Detail" };

  const handleChange = (e) => {
    setForm({ ruangan: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (readOnly) return;

    if (!form.ruangan.trim()) {
      Swal.fire("Validasi", "Nama ruangan wajib diisi", "warning");
      return;
    }

    // UI-only
    Swal.fire("Sukses", `Data berhasil disimpan (${mode}) — UI-only`, "success");
    navigate("/ruangan");
  };

  return (
    <PageShell
      breadcrumb={[
        { label: "Home", to: "/" },
        { label: "Ruangan", to: "/ruangan" },
        { label: titleMap[mode] },
      ]}
    >
      <div className="mb-4">
        <h2 className="text-2xl font-semibold text-blue-700">
          {titleMap[mode]} Ruangan
        </h2>
        <p className="text-slate-600 text-sm mt-1">
          Form {mode === "create" ? "penambahan" : mode === "edit" ? "pengubahan" : "detail"} ruangan.
        </p>
      </div>

      {loading ? (
        <p>Loading…</p>
      ) : (
        <form onSubmit={handleSubmit} className="grid gap-4 max-w-md">
          <div>
            <label className="block text-sm text-slate-700 mb-1">Nama Ruangan</label>
            <input
              name="ruangan"
              value={form.ruangan}
              onChange={handleChange}
              readOnly={readOnly}
              className="w-full border rounded-md px-3 py-2 text-sm"
              placeholder="Masukkan nama ruangan"
            />
          </div>

          <div className="flex items-center gap-2 pt-2">
            <Button variant="secondary" type="button" onClick={() => navigate("/ruangan")}>
              Batal
            </Button>

            {mode === "view" ? (
              <Button variant="success" type="button" onClick={() => navigate(`/ruangan/edit/${id}`)}>
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
