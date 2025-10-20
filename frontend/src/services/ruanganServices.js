import axiosInstance from "../api/api";

export const getRuangan = async () => {
  return (await axiosInstance.get("/ruangan")).data;
};

export const getRuanganById = async (id) => {
  return (await axiosInstance.get(`/ruangan/${id}`)).data;
};

export const createRuangan = async (ruanganData) => {
  return await axiosInstance.post("/ruangan", ruanganData);
};

export const updateRuangan = async (id, ruanganData) => {
  return await axiosInstance.put(`/ruangan/${id}`, ruanganData);
};

export const deleteRuangan = async (id) => {
  return await axiosInstance.delete(`/ruangan/${id}`);
};

// Additional ruangan-related services can be added here
