import { useState } from "react";
import { deleteRuangan } from "../../services";

export const useDeleteRuangan = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDeleteRuangan = async (id) => {
    setLoading(true);
    try {
      await deleteRuangan(id);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { handleDeleteRuangan, loading, error };
};
