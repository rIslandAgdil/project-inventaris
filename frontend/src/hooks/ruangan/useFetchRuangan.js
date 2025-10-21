import { useState } from "react";
import { getRuangan, getRuanganById } from "../../services";

export const useFetchRuangan = () => {
  const [ruangan, setRuangan] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFetchRuangan = async () => {
    setLoading(true);
    try {
      // ✅ panggil getRuangan untuk fetch data
      const data = await getRuangan();

      // ✅ transform data sesuai kebutuhan
      // tambahkan nomor urut pada setiap item
      const newData = data.map((item, idx) => ({ ...item, no: idx + 1 }));

      // ✅ set state dengan data yang sudah di-transform
      setRuangan(newData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFetchRuanganById = async (id) => {
    setLoading(true);
    try {
      // MENGAMBIL DATA RUANGAN BERDASARKAN ID
      const data = await getRuanganById(id);

      // MENGISI DATA KE FORM
      setRuangan(data);
    } catch (error) {
      // JIKA TERJADI KESALAHAN
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    ruangan,
    loading,
    error,
    handleFetchRuangan,
    handleFetchRuanganById,
  };
};
