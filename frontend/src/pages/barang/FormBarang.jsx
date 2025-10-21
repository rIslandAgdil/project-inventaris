import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useCreateBarang } from "../../hooks/barang/useCreateBarang";
import { useFetchBarang } from "../../hooks/barang/useFetchBarang";
import { useFetchRuangan } from "../../hooks/ruangan/useFetchRuangan";
import PageShell from "../../components/PageShell";
import Button from "../../components/Button";

export default function FormBarang({ mode }) {
  const { id } = useParams();
  const { username, idUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const { handleSubmitBarang } = useCreateBarang();
  const { handleFetchBarangById, barang } = useFetchBarang();
  const { handleFetchRuangan, ruangan } = useFetchRuangan();
  const [form, setForm] = useState({
    nama_barang: barang.nama_barang ?? "",
    kode_inventaris: barang.kode_inventaris ?? "",
    jumlah: barang.jumlah ?? "",
    kondisi: barang.kondisi ?? "Baik",
    ruanganId: barang.ruanganId ?? 1,
    userId: idUser,
  });

  const [loading, setLoading] = useState(!!id);
  const readOnly = mode === "view";
  const titleMap = { create: "Tambah", edit: "Edit", view: "Detail" };

  useEffect(() => {
    if (mode !== "create") {
      handleFetchBarangById(id);
    }
    handleFetchRuangan();
  }, [id, mode]);

  useEffect(() => {
    if (barang.nama_barang) {
      setForm({
        nama_barang: barang.nama_barang,
        kode_inventaris: barang.kode_inventaris,
        jumlah: barang.jumlah,
        kondisi: barang.kondisi,
        ruanganId: barang.ruanganId,
        userId: idUser,
      });
    }
    setLoading(false);
  }, [barang]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "jumlah") {
      setForm((s) => ({ ...s, jumlah: value.replace(/[^\d]/g, "") }));
    } else {
      setForm((s) => ({ ...s, [name]: value }));
    }
  };

  // KETIKA TOMBOL SIMPAN DI KLIK
  const handleSubmit = async (e) => {
    e.preventDefault();

    handleSubmitBarang(form, mode, id);
  };

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
              Form{" "}
              {mode === "create"
                ? "penambahan"
                : mode === "edit"
                ? "pengubahan"
                : "detail"}{" "}
              barang (UI-only).
            </p>
          </div>

          {loading ? (
            <div className="px-6 py-6">Loading…</div>
          ) : (
            <form onSubmit={handleSubmit} className="px-6 py-6 grid gap-4">
              <input type="hidden" name="userId" value={form.userId} readOnly />
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-700 mb-1">
                    Nama Barang
                  </label>
                  <input
                    name="nama_barang"
                    value={form.nama_barang}
                    onChange={handleChange}
                    readOnly={readOnly}
                    className="w-full border rounded-md px-3 py-2 text-sm"
                    placeholder="Masukkan nama barang"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-700 mb-1">
                    Kode Inventaris
                  </label>
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
                  <label className="block text-sm text-slate-700 mb-1">
                    Jumlah
                  </label>
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
                  <label className="block text-sm text-slate-700 mb-1">
                    Kondisi
                  </label>
                  <select
                    name="kondisi"
                    value={form.kondisi}
                    onChange={handleChange}
                    disabled={readOnly}
                    className="w-full border rounded-md px-3 py-2 text-sm bg-white"
                  >
                    <option value="Baik">Baik</option>
                    <option value="Rusak">Rusak</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-slate-700 mb-1">
                    Ruangan
                  </label>
                  <select
                    name="ruanganId"
                    value={form.ruanganId}
                    onChange={handleChange}
                    disabled={readOnly}
                    className="w-full border rounded-md px-3 py-2 text-sm bg-white"
                  >
                    {ruangan.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.nama_ruangan}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-700 mb-1">
                    User/Penanggung Jawab
                  </label>
                  <input
                    name="username"
                    value={username}
                    readOnly
                    className="w-full border rounded-md px-3 py-2 text-sm bg-gray-200 outline-0"
                    placeholder="User"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2 pt-4 mt-2 border-t justify-end">
                <Button
                  variant="secondary"
                  type="button"
                  onClick={() => navigate("/barang")}
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
