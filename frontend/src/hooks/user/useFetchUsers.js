import { useState } from "react";
import { getUserById, getUsers } from "../../services";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";

export const useFetchUsers = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState();

  const handleFetchUsers = async () => {
    setLoading(true);
    try {
      const data = await getUsers();
      const newData = data.map((item, idx) => ({ ...item, no: idx + 1 }));

      setUsers(newData);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFetchUserById = async (id) => {
    setLoading(true);
    try {
      const data = await getUserById(id);
      setUsers({
        username: data?.username ?? "",
        email: data?.email ?? "",
        password: "",
        confirmPassword: "",
      });
    } catch (e) {
      Swal.fire("Gagal", e?.response?.data?.error || e.message, "error");
      Navigate("/admin");
    } finally {
      setLoading(false);
    }
  };

  return { handleFetchUsers, handleFetchUserById, loading, error, users };
};
