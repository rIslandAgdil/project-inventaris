import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = () => {
  const { username } = useContext(AuthContext); // ganti dengan context jika pakai

  return username ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
