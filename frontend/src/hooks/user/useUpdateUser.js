import Swal from "sweetalert2";
import { createUser, updateUser } from "../../services";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export const useUpdateUser = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);

  const handleUpdateUser = async (mode, id, form) => {
    try {
      setLoading(true);

      // Change Password mode
      if (mode === "password") {
        if (form.password.trim() !== form.confirmPassword.trim()) {
          setLoading(false);
          return Swal.fire(
            "Gagal!",
            "Password dan konfirmasi password tidak cocok.",
            "error"
          );
        }

        // Minta konfirmasi password lama
        const res = await Swal.fire({
          title: "Konfirmasi Password Lama",
          html: `<span class="text-sm text-slate-600">Masukkan password untuk melanjutkan.</span>`,
          input: "password",
          inputPlaceholder: "Password",
          showCancelButton: true,
          cancelButtonText: "Batal",
          confirmButtonText: "Kirim",
          confirmButtonColor: "#e11d48",
          reverseButtons: true,
          focusCancel: true,
          preConfirm: async (value) => {
            // Validasi input
            if (!value || value.length < 4) {
              Swal.showValidationMessage("Password minimal 4 karakter");
              return false;
            }

            // Siapkan payload
            const payload = {
              password: value,
              newPassword: form.confirmPassword.trim(),
            };

            // Kirim request ubah password
            try {
              await updateUser(id, payload);
              await Swal.fire("Berhasil", "Password telah diubah", "success");
              navigate("/admin");
            } catch (e) {
              Swal.showValidationMessage(
                e?.response?.data?.error || e.message || "Gagal menghapus."
              );
            }
            return false;
          },
        });
        if (!res.isConfirmed) return;
      }

      // Edit Profile mode
      if (mode === "edit" && id) {
        const payload = {
          username: form.username,
          email: form.email,
        };

        try {
          const { username } = await updateUser(id, payload);

          localStorage.setItem("username", JSON.stringify(username));

          //fetch data username ulang
          setAuth((prev) => ({ ...prev, username }));
        } catch (error) {
          return Swal.fire(
            "Gagal",
            error?.response?.data?.error || error.message,
            "error"
          );
        }
      }

      // Create mode
      if (mode === "create") {
        // Validasi password
        if (form.password.trim() !== form.confirmPassword.trim()) {
          setLoading(false);
          return Swal.fire(
            "Gagal!",
            "Password dan konfirmasi password tidak cocok.",
            "error"
          );
        }

        // Siapkan payload
        const payload = {
          username: form.username,
          email: form.email,
          password: form.password.trim(),
        };

        // Kirim request pembuatan admin baru
        try {
          await createUser(payload);
        } catch (error) {
          return Swal.fire(
            "Gagal",
            error?.response?.data?.error || error.message,
            "error"
          );
        }
      }

      await Swal.fire("Sukses", "Data admin berhasil disimpan.", "success");
      navigate("/admin");
    } catch (e) {
      Swal.fire("Gagal", e?.response?.data?.error || e.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return { handleUpdateUser, loading };
};
