import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState, useMemo, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Swal from "sweetalert2";
import axios from "axios";
import { baseUrl } from "../../api/api";

import PageShell from "../../components/PageShell";
import Button from "../../components/Button";

export default function FormBarang() {
  const { id } = useParams();
  const { username, idUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [ruangan, setRuangan] = useState([]);
  const [form, setForm] = useState({
    nama_barang: "",
    kode_inventaris: "",
    jumlah: "",
    kondisi: "Baik",
    ruanganId: 1,
    userId: idUser,
  });

  const mode = useMemo(
    () =>
      location.pathname.includes("/view/") ? "view" : id ? "edit" : "create",
    [id, location.pathname]
  );
  const [loading, setLoading] = useState(!!id);
  const readOnly = mode === "view";
  const titleMap = { create: "Tambah", edit: "Edit", view: "Detail" };

  useEffect(() => {
    if (mode !== "create") {
      fetchDataUser(id);
    }
    fetchDataRuangan();
  }, []);

  // AMBIL DATA USER
  const fetchDataUser = async (id) => {
    try {
      setLoading(true);
      const res = await axios.get(`${baseUrl}/barang/${id}`);
      setForm(res.data);
    } catch (error) {
      console.log(error.message);
    }
    setLoading(false);
  };

  // AMBIL DATA RUANGAN
  const fetchDataRuangan = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${baseUrl}/ruangan`);
      setRuangan(res.data);
    } catch (error) {
      console.log(error.message);
    }
    setLoading(false);
  };

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

    //CEK JIKA DATA BELUM LENGKAP
    if (
      !form.nama_barang.trim() ||
      !form.kode_inventaris.trim() ||
      !form.jumlah
    ) {
      Swal.fire("Validasi", "Data belum lengkap!", "warning");
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
            ? await axios.post(`${baseUrl}/barang`, form)
            : await axios.put(`${baseUrl}/barang/${id}`, form);

          Swal.fire("Sukses", `Data berhasil disimpan`, "success").then(() =>
            navigate("/barang")
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
