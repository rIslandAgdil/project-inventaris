import Swal from "sweetalert2";
import { deleteUser } from "../../services";

export const useDeleteUser = () => {
  const handleDeleteUser = async (id, confirmPassword) => {
    try {
      await deleteUser(id, confirmPassword);
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "Gagal menghapus",
        text: e?.response?.data?.error || e.message,
      });
      throw e; // biar RowActions bisa tangani error toast-nya juga
    }
  };

  return { handleDeleteUser };
};
