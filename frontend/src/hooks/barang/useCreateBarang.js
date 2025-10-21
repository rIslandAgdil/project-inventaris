import { useState } from "react";
import Swal from "sweetalert2";
import { createBarang, updateBarang } from "../../services";
import { useNavigate } from "react-router-dom";

export const useCreateBarang = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmitBarang = async (payload, mode, id = null) => {
    //CEK JIKA DATA BELUM LENGKAP
    if (
      !payload.nama_barang.trim() ||
      !payload.kode_inventaris.trim() ||
      !payload.jumlah
    ) {
      return Swal.fire("Validasi", "Data belum lengkap!", "warning");
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
            ? await createBarang(payload)
            : await updateBarang(id, payload);

          Swal.fire("Sukses", `Data berhasil disimpan`, "success").then(() =>
            navigate("/barang")
          );
        } catch (error) {
          Swal.fire("Gagal", error.message, "error");
        } finally {
          setLoading(false);
        }
      }
    });
  };

  return { loading, handleSubmitBarang };
};
