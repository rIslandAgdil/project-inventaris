import axiosInstance from "../api/api";

export const getUsers = async () => {
  return (await axiosInstance.get("/users")).data;
};

export const getUserById = async (id) => {
  return (await axiosInstance.get(`/users/${id}`)).data;
};

export const createUser = async (userData) => {
  return (await axiosInstance.post("/users", userData)).data;
};

export const updateUser = async (id, userData) => {
  return (await axiosInstance.put(`/users/${id}`, userData)).data;
};

export const deleteUser = async (id, confirmPassword) => {
  return (
    await axiosInstance.delete(`/users/${id}`, { data: { confirmPassword } })
  ).data;
};

// Additional user-related services can be added here
