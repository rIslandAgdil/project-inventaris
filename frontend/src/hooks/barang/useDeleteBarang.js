import { useState } from "react";
import { deleteBarang } from "../../services";

export const useDeleteBarang = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const deleteBarangById = async (id) => {
    setError("");
    setLoading(true);
    try {
      await deleteBarang(id);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { error, loading, deleteBarangById };
};
