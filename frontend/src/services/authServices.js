import axiosInstance from "../api/api";

export const login = async (data) => {
  return (await axiosInstance.post("/login", data)).data;
};

export const logout = async () => {
  return (await axiosInstance.post("/logout")).data;
};
