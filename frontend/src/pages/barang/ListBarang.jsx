import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios"; // ✅ perlu diimport
import Swal from "sweetalert2"; // ✅ perlu diimport
import { baseUrl } from "../../api/api";
import PageShell from "../../components/PageShell";
import Table from "../../components/Table";
import Button from "../../components/Button";
import RowActions from "../../components/RowActions";

export default function Databarang() {
  const [barang, setBarang] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // pastikan endpoint sesuai backend-mu
        const res = await axios.get(`${baseUrl}/barang`);
        const data = res.data.map((item, idx) => ({
          id: item.id,
          no: idx + 1,
          name: item.nama_barang,
          kode_inventaris: item.kode_inventaris,
          jumlah: item.jumlah,
          kondisi: item.kondisi,
          ruangan: item.ruangan?.nama_ruangan || "-",
          user: item.user?.username || "-", // ✅ ganti nama field
        }));
        setBarang(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [location.key]);

  const removeById = async (id) => {
    try {
      await axios.delete(`${baseUrl}/barang/${id}`);
    } catch (error) {
      return console.log(error.message);
    }
  };

  // ✅ ubah toLowerCase untuk kode_inventaris agar tidak error
  const filtered = barang.filter(
    (p) =>
      p.name.toLowerCase().includes(q.toLowerCase()) ||
      p.kode_inventaris.toString().toLowerCase().includes(q.toLowerCase())
  );

  const columns = [
    { header: "No.", accessor: "no" },
    { header: "Nama", accessor: "name" },
    { header: "Kode Inventaris", accessor: "kode_inventaris" },
    { header: "Jumlah", accessor: "jumlah" },
    { header: "Kondisi", accessor: "kondisi" },
    { header: "Ruangan", accessor: "ruangan" },
    { header: "User", accessor: "user" },
    {
      header: "Aksi",
      accessor: "actions",
      render: (row) => (
        <RowActions
          basePath="/barang"
          id={row.id}
          onDelete={() => removeById(row.id)}
          getDeleteName={() => row.name} // ✅ gunakan row.name, bukan row.username
        />
      ),
    },
  ];

  const emptyText = loading
    ? "Memuat..."
    : error
    ? `Gagal memuat data`
    : "Tidak ada data";

  return (
    <PageShell breadcrumb={[{ label: "Home", to: "/" }, { label: "Barang" }]}>
      <div>
        <div className="mb-4 flex items-center justify-between gap-3 flex-wrap">
          <h2 className="text-2xl font-semibold text-gray-700">Data Barang</h2>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Cari barang / ruangan / user"
              className="border rounded-md px-3 py-2 text-sm"
            />
            <Button
              variant="secondary"
              onClick={() => navigate("/barang/tambah")}
            >
              + Tambah Barang
            </Button>
          </div>
        </div>

        <Table columns={columns} data={filtered} emptyText={emptyText} />
      </div>
    </PageShell>
  );
}
