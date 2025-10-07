import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Button from "./Button";


export default function RowActions({
  basePath,
  id,
  onDelete,
  getDeleteName,
  hideView = false,
  hideEdit = false,
  hideDelete = false,
  labels = { view: "View", edit: "Edit", delete: "Hapus" },
}) {
  const navigate = useNavigate();

  const handleDeleteClick = () => {
    const name = getDeleteName?.() ?? "data ini";
    Swal.fire({
      title: "Yakin?",
      text: `Hapus ${name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus",
      cancelButtonText: "Batal",
    }).then((res) => {
      if (res.isConfirmed) {
        onDelete?.();
        Swal.fire("Berhasil", "Data telah dihapus (lokal)", "success");
      }
    });
  };

  return (
    <div className="flex gap-2">
      {!hideView && (
        <Button variant="secondary" onClick={() => navigate(`${basePath}/view/${id}`)}>
          {labels.view}
        </Button>
      )}
      {!hideEdit && (
        <Button variant="success" onClick={() => navigate(`${basePath}/edit/${id}`)}>
          {labels.edit}
        </Button>
      )}
      {!hideDelete && (
        <Button variant="danger" onClick={handleDeleteClick}>
          {labels.delete}
        </Button>
      )}
    </div>
  );
}
