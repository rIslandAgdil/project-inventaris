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
}) {
  const navigate = useNavigate();

  const handleDeleteClick = () => {
    const name = getDeleteName?.() ?? "data ini";
    Swal.fire({
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
