import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageShell from "../../components/PageShell";
import FormBarang from "../barang/FormBarang";
import Table from "../../components/Table";
import Button from "../../components/Button";
import Swal from "sweetalert2";
import RowActions from "../../components/RowActions";


const DUMMY_BARANG = [
  {
    id: 1,
    no: 1,
    name: "Printer",
    kode_inventaris: "INV-0001",
    jumlah: 3,
    kondisi: "Baik",
    ruangan: "Ruang B101",
    user: "Nofryanti",
  },
  // ...
];

export default function Databarang() {
  const [barang, setbarang] = useState([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => {
      const withNo = DUMMY_BARANG.map((item, idx) => ({
        ...item,
        no: idx + 1,
      }));
      setbarang(withNo);
      setLoading(false);
    }, 400); 
    return () => clearTimeout(t);
  }, []);

  const handleDelete = (row) => {
    Swal.fire({
      title: "Yakin?",
      text: `Hapus ${row.name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus",
      cancelButtonText: "Batal",
    }).then((res) => {
      if (res.isConfirmed) {
        setbarang((prev) => {
          const filtered = prev.filter((p) => p.id !== row.id);
      
          return filtered.map((it, idx) => ({ ...it, no: idx + 1 }));
        });
        Swal.fire("Berhasil", "barang telah dihapus (lokal)", "success");
      }
    });
  };

  const filtered = barang.filter(
    (p) =>
      p.name.toLowerCase().includes(q.toLowerCase()) ||
      String(p.no).includes(q) ||
      p.status.toLowerCase().includes(q.toLowerCase())
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
          onDelete={() => {
            setRows((prev) =>
              prev
                .filter((p) => p.id !== row.id)
                .map((it, i) => ({ ...it, no: i + 1 }))
            );
          }}
          getDeleteName={() => row.username}
        />
      ),
    },
  ];

  return (
    <PageShell breadcrumb={[{ label: "Home", to: "/" }, { label: "Barang" }]}>
      <div>
        <div className="mb-4 flex items-center justify-between gap-3 flex-wrap">
          <h2 className="text-2xl font-semibold text-gray-700">Data barang</h2>
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
              + Tambah barang
            </Button>
          </div>
        </div>

        {loading ? (
          <p>Loading…</p>
        ) : (
          <Table columns={columns} data={filtered} />
        )}
      </div>
    </PageShell>
  );
}
