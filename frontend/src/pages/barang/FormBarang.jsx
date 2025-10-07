// src/pages/barang/FormBarang.jsx
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";

// SESUAIKAN path komponen
import PageShell from "../../components/PageShell";
import Button from "../../components/Button";

// Data dummy yang sama dengan list (opsional, cukup untuk demo view/edit)
const DUMMY_BARANG = [
  { id: 1, name: "Printer",  kode_inventaris: "INV-0001", jumlah: 3, kondisi: "Baik",         ruangan: "Ruang B101", user: "Nofryanti" },
  { id: 2, name: "Switch",   kode_inventaris: "INV-0002", jumlah: 5, kondisi: "Baik",         ruangan: "IT Lab",     user: "Admin" },
  { id: 3, name: "Laptop",   kode_inventaris: "INV-0003", jumlah: 2, kondisi: "Perlu Servis", ruangan: "IT Lab",     user: "Andi" },
  { id: 4, name: "Proyektor",kode_inventaris: "INV-0004", jumlah: 1, kondisi: "Baik",         ruangan: "Aula",       user: "Sari" },
];

const ROOM_OPTIONS = [
  "Aula",
  "Talent Corner",
  "Gudang TIK",
  "Gedung 1",
  "IT Lab",
  "Ruang B101",
];


export default function FormBarang() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const mode = useMemo(() => {
    if (location.pathname.includes("/view/")) return "view";
    if (id) return "edit";
    return "create";
  }, [id, location.pathname]);

  const [form, setForm] = useState({
    name: "",
    kode_inventaris: "",
    jumlah: "",
    kondisi: "Baik",
    ruangan: "",
    user: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => {
      if (id) {
        const found = DUMMY_BARANG.find((b) => String(b.id) === String(id));
        if (!found) {
          Swal.fire("Gagal", "Data tidak ditemukan (dummy)", "error");
          navigate("/barang");
          return;
        }
        setForm({
          name: found.name ?? "",
          kode_inventaris: found.kode_inventaris ?? "",
          jumlah: String(found.jumlah ?? ""),
          kondisi: found.kondisi ?? "Baik",
          ruangan: found.ruangan ?? "",
          user: found.user ?? "",
        });
      }
      setLoading(false);
    }, 250);
    return () => clearTimeout(t);
  }, [id, navigate]);

  const readOnly = mode === "view";
  const titleMap = { create: "Tambah", edit: "Edit", view: "Detail" };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "jumlah") {
      const onlyNum = value.replace(/[^\d]/g, "");
      setForm((s) => ({ ...s, [name]: onlyNum }));
    } else {
      setForm((s) => ({ ...s, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (readOnly) return;

    if (!form.name || !form.kode_inventaris) {
      Swal.fire("Validasi", "Nama & Kode Inventaris wajib diisi", "warning");
      return;
    }
    Swal.fire("Sukses", `Data berhasil disimpan (${mode}) — dummy data`, "success");
    navigate("/barang");
  };

  return (
    <PageShell
      breadcrumb={[
        { label: "Home", to: "/" },
        { label: "Barang", to: "/barang" },
        { label: titleMap[mode] },
      ]}
    >
      <div className="mb-4">
        <h2 className="text-2xl font-semibold text-blue-700">{titleMap[mode]} Barang</h2>
        <p className="text-slate-600 text-sm mt-1">
          Form {mode === "create" ? "penambahan" : mode === "edit" ? "pengubahan" : "detail"} barang (UI-only).
        </p>
      </div>

      {loading ? (
        <p>Loading…</p>
      ) : (
        <form onSubmit={handleSubmit} className="grid gap-4 max-w-2xl">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-700 mb-1">Nama Barang</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                readOnly={readOnly}
                className="w-full border rounded-md px-3 py-2 text-sm"
                placeholder="Masukkan nama barang"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-700 mb-1">Kode Inventaris</label>
              <input
                name="kode_inventaris"
                value={form.kode_inventaris}
                onChange={handleChange}
                readOnly={readOnly}
                className="w-full border rounded-md px-3 py-2 text-sm"
                placeholder="Kode Inventaris Barang"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-slate-700 mb-1">Jumlah</label>
              <input
                name="jumlah"
                value={form.jumlah}
                onChange={handleChange}
                readOnly={readOnly}
                className="w-full border rounded-md px-3 py-2 text-sm"
                placeholder="Jumlah barang"
                inputMode="numeric"
              />
            </div>

            {/* ada 2 ini kondisi sama ruangan beda cara, yang ruangan pake const list di atas. */}
            <div>
              <label className="block text-sm text-slate-700 mb-1">Kondisi</label>
              <select
                name="kondisi"
                value={form.kondisi}
                onChange={handleChange}
                disabled={readOnly}
                className="w-full border rounded-md px-3 py-2 text-sm bg-white"
              >
                <option value="Baik">Baik</option>
                <option value="Perlu Servis">Perlu Servis</option>
                <option value="Rusak">Rusak</option>
                <option value="Hilang">Hilang</option>
              </select>
            </div>
               <div>
                  <label className="block text-sm text-slate-700 mb-1">Ruangan</label>
                  <select
                    name="ruangan"
                    value={form.ruangan}
                    onChange={handleChange}
                    disabled={readOnly}
                    className="w-full border rounded-md px-3 py-2 text-sm bg-white"
                  >
                    <option value=""></option>
                    {ROOM_OPTIONS.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}

                    {/* kalau data lama punya ruangan yang tidak ada di daftar, tetap tampil */}
                    {form.ruangan &&
                      !ROOM_OPTIONS.includes(form.ruangan) && (
                        <option value={form.ruangan}>{form.ruangan}</option>
                      )}
                  </select>
              </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-700 mb-1">User/Penanggung Jawab</label>
              <input
                name="user"
                value={form.user}
                onChange={handleChange}
                readOnly={readOnly}
                className="w-full border rounded-md px-3 py-2 text-sm"
                placeholder="User"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <Button variant="secondary" type="button" onClick={() => navigate("/barang")}>
              Batal
            </Button>

            {mode === "view" ? (
              <Button variant="success" type="button" onClick={() => navigate(`/barang/edit/${id}`)}>
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
