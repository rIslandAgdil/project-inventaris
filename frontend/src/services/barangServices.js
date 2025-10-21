import axiosInstance from "../api/api";

export const getBarang = async () => {
  return (await axiosInstance.get("/barang")).data;
};

export const getBarangById = async (id) => {
  return (await axiosInstance.get(`/barang/${id}`)).data;
};

export const createBarang = async (barangData) => {
  return await axiosInstance.post("/barang", barangData);
};

export const updateBarang = async (id, barangData) => {
  return await axiosInstance.put(`/barang/${id}`, barangData);
};

export const deleteBarang = async (id) => {
  return await axiosInstance.delete(`/barang/${id}`);
};

// Additional barang-related services can be added here
