import { useState } from "react";
import { getBarang, getBarangById } from "../../services";

export const useFetchBarang = () => {
  const [barang, setBarang] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleFetchBarang = async () => {
    setLoading(true);
    try {
      // ✅ panggil getBarang untuk fetch data
      const data = await getBarang();

      // ✅ transform data sesuai kebutuhan
      const newData = data.map((item, idx) => ({
        id: item.id,
        no: idx + 1,
        name: item.nama_barang,
        kode_inventaris: item.kode_inventaris,
        jumlah: item.jumlah,
        kondisi: item.kondisi,
        ruangan: item.ruangan?.nama_ruangan || "-",
        user: item.user?.username || "-", // ✅ ganti nama field
      }));

      // ✅ set state dengan data yang sudah di-transform
      setBarang(newData);
    } catch (err) {
      // ✅ set error message jika fetch gagal
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFetchBarangById = async (id) => {
    setLoading(true);
    try {
      const data = await getBarangById(id);
      setBarang({
        nama_barang: data.nama_barang,
        kode_inventaris: data.kode_inventaris,
        jumlah: data.jumlah,
        kondisi: data.kondisi,
        ruanganId: data.ruanganId,
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { barang, loading, error, handleFetchBarang, handleFetchBarangById };
};
