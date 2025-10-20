import { useState } from "react";
import { createRuangan, updateRuangan } from "../../services";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const useCreateRuangan = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleCreateRuangan = async (id = null, mode, payload) => {
    // JIKA DATA BELUM LENGKAP
    if (!payload.nama_ruangan.trim()) {
      Swal.fire("Validasi", "Nama ruangan wajib diisi", "warning");
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
            ? await createRuangan(payload)
            : await updateRuangan(id, payload);

          Swal.fire("Sukses", `Data berhasil disimpan`, "success").then(() =>
            navigate("/ruangan")
          );
        } catch (error) {
          Swal.fire("Gagal", error.message, "error");
          setError(error.message);
        } finally {
          setLoading(false);
        }
      }
    });
  };

  return { handleCreateRuangan, loading, error };
};
