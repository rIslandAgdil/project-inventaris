import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ActionIcon from "./ActionIcon";
import { Eye, Pencil, Trash2 } from "lucide-react";

export default function RowActions({
  basePath,
  id,
  onDelete,
  getDeleteName,
  hideView = false,
  hideEdit = false,
  hideDelete = false,
  labels = { view: "Lihat", edit: "Ubah", delete: "Hapus" },
  requireDeletePassword = false,   // ⬅️ baru
}) {
  const navigate = useNavigate();

  const handleDeleteClick = async () => {
    const name = getDeleteName?.() ?? "data ini";

    if (requireDeletePassword) {
      // Mode khusus: minta password dulu (untuk Users)
      const res = await Swal.fire({
        title: "Konfirmasi Hapus",
        html: `Hapus <b>${name}</b>?<br /><span class="text-sm text-slate-600">Masukkan password untuk melanjutkan.</span>`,
        input: "password",
        inputPlaceholder: "Password",
        inputAttributes: { minlength: 4, autocomplete: "current-password" },
        showCancelButton: true,
        cancelButtonText: "Batal",
        confirmButtonText: "Ya, Hapus",
        confirmButtonColor: "#e11d48",
        reverseButtons: true,
        focusCancel: true,
        preConfirm: (value) => {
          if (!value || value.length < 4) {
            Swal.showValidationMessage("Password minimal 4 karakter");
            return false;
          }
          return value;
        },
      });
      if (!res.isConfirmed) return;

      try {
        await onDelete?.(res.value); // kirim password ke pemanggil
        await Swal.fire("Berhasil", "Data telah dihapus", "success");
        if (basePath) navigate(`${basePath}`);
      } catch (e) {
        Swal.fire("Gagal", e?.response?.data?.error || e.message || "Gagal menghapus.", "error");
      }
      return;
    }

    // Mode default: konfirmasi biasa (untuk halaman lain)
    const confirm = await Swal.fire({
      title: "Yakin?",
      text: `Hapus ${name}?`,
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Batal",
      confirmButtonText: "Ya, hapus",
      reverseButtons: true,
      focusCancel: true,
      confirmButtonColor: "#e11d48",
    }).then((res) => {
      if (res.isConfirmed) {
        onDelete?.();
        Swal.fire("Berhasil", "Data telah dihapus", "success");
        navigate(`${basePath}`);
      }
    });
    if (!confirm.isConfirmed) return;

    try {
      await onDelete?.(); // tidak butuh password
      await Swal.fire("Berhasil", "Data telah dihapus", "success");
      if (basePath) navigate(`${basePath}`);
    } catch (e) {
      Swal.fire("Gagal", e?.response?.data?.error || e.message || "Gagal menghapus.", "error");
    }
  };

  return (
    <div className="flex items-center gap-4">
      {!hideView && (
        <ActionIcon
          title={labels.view}
          onClick={() => navigate(`${basePath}/view/${id}`)}
          className="text-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <Eye />
        </ActionIcon>
      )}
      {!hideEdit && (
        <ActionIcon
          title={labels.edit}
          onClick={() => navigate(`${basePath}/edit/${id}`)}
          className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
        >
          <Pencil />
        </ActionIcon>
      )}
      {!hideDelete && (
        <ActionIcon
          title={labels.delete}
          onClick={handleDeleteClick}
          className="text-rose-600 hover:text-rose-700 dark:text-rose-400 dark:hover:text-rose-300"
        >
          <Trash2 />
        </ActionIcon>
      )}
    </div>
  );
}
