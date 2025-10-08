import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import Swal from "sweetalert2";

import PageShell from "../../components/PageShell";
import Button from "../../components/Button";

const DUMMY_BARANG = [
  { id: 1, name: "Printer",  kode_inventaris: "INV-0001", jumlah: 3, kondisi: "Baik",         ruangan: "Ruang B101", user: "Nofryanti" },
  { id: 2, name: "Switch",   kode_inventaris: "INV-0002", jumlah: 5, kondisi: "Baik",         ruangan: "IT Lab",     user: "Admin" },
  { id: 3, name: "Laptop",   kode_inventaris: "INV-0003", jumlah: 2, kondisi: "Perlu Servis", ruangan: "IT Lab",     user: "Andi" },
  { id: 4, name: "Proyektor",kode_inventaris: "INV-0004", jumlah: 1, kondisi: "Baik",         ruangan: "Aula",       user: "Sari" },
];

const ROOM_OPTIONS = ["Aula", "Talent Corner", "Gudang TIK", "Gedung 1", "IT Lab", "Ruang B101"];

export default function FormBarang() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const mode = useMemo(() => (
    location.pathname.includes("/view/") ? "view" : (id ? "edit" : "create")
  ), [id, location.pathname]);

  const [form, setForm] = useState({
    name: "",
    kode_inventaris: "",
    jumlah: "",
    kondisi: "Baik",
    ruangan: "",
    user: "",
  });
  const [loading, setLoading] = useState(!!id);

  useEffect(() => {
    if (!id) return setLoading(false);
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
    setLoading(false);
  }, [id, navigate]);

  const readOnly = mode === "view";
  const titleMap = { create: "Tambah", edit: "Edit", view: "Detail" };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "jumlah") {
      setForm((s) => ({ ...s, jumlah: value.replace(/[^\d]/g, "") }));
    } else {
      setForm((s) => ({ ...s, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (readOnly) return;
    if (!form.name.trim() || !form.kode_inventaris.trim()) {
      Swal.fire("Validasi", "Nama & Kode Inventaris wajib diisi", "warning");
      return;
    }
    Swal.fire("Sukses", `Data berhasil disimpan (${mode}) — dummy data`, "success")
      .then(() => navigate("/barang"));
  };

  const extraRoomOption =
    form.ruangan && !ROOM_OPTIONS.includes(form.ruangan) ? form.ruangan : null;

  return (
    <PageShell
      breadcrumb={[
        { label: "Home", to: "/" },
        { label: "Barang", to: "/barang" },
        { label: titleMap[mode] },
      ]}
    >
      <div className="max-w-3xl mx-auto">
        <div className="bg-white border rounded-md shadow-sm overflow-hidden">
        
          <div className="px-6 py-4 border-b">
            <h2 className="text-xl font-semibold text-gray-800">
              {titleMap[mode]} Barang
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Form {mode === "create" ? "penambahan" : mode === "edit" ? "pengubahan" : "detail"} barang (UI-only).
            </p>
          </div>

        
          {loading ? (
            <div className="px-6 py-6">Loading…</div>
          ) : (
            <form onSubmit={handleSubmit} className="px-6 py-6 grid gap-4">
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
                    type="tel"
                  />
                </div>

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
                      <option key={r} value={r}>{r}</option>
                    ))}
                    {extraRoomOption && <option value={extraRoomOption}>{extraRoomOption}</option>}
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

              {/* Card footer */}
              <div className="flex items-center gap-2 pt-4 mt-2 border-t justify-end">
                <Button variant="secondary" type="button" onClick={() => navigate("/barang")}>
                  Batal
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </PageShell>
  );
}
