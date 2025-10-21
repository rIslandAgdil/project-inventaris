import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFetchRuangan } from "../../hooks/ruangan/useFetchRuangan";
import { useCreateRuangan } from "../../hooks/ruangan/useCreateRuangan";
import PageShell from "../../components/PageShell";
import Button from "../../components/Button";

export default function FormRuangan({ mode }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    handleFetchRuanganById,
    ruangan,
    loading: fetchLoading,
    error: fetchError,
  } = useFetchRuangan();
  const { handleCreateRuangan, loading: createLoading } = useCreateRuangan();
  const [form, setForm] = useState({
    nama_ruangan: ruangan.nama_ruangan ?? "",
  });

  // Menggabungkan status loading dan error dari fetch dan create
  const loading = fetchLoading || createLoading;

  // Gabungkan error dari fetch dan create
  const error = fetchError;

  // Mengambil data ruangan saat komponen dimount jika mode bukan "create"
  useEffect(() => {
    if (mode !== "create") {
      handleFetchRuanganById(id);
    }
  }, [id, mode]);

  // Mentransfer data ruangan ke form ketika data ruangan berubah
  useEffect(() => {
    if (ruangan.nama_ruangan) {
      setForm({ nama_ruangan: ruangan.nama_ruangan });
    }
  }, [ruangan]);

  // Menentukan apakah form dalam mode read-only
  const readOnly = mode === "view";
  const titleMap = { create: "Tambah", edit: "Edit", view: "Detail" };

  const handleChange = (e) => setForm({ nama_ruangan: e.target.value });

  // Menangani submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    handleCreateRuangan(id, mode, form);
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
          ) : error ? (
            <div className="px-6 py-6 text-red-600">{error}</div>
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
