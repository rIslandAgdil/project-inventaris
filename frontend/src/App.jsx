import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";

// Admin (Users)
import ListAdmin from "./pages/admin/ListAdmin";
import FormAdmin from "./pages/admin/FormAdmin";

// Barang (sementara placeholder aman)
import ListBarang from "./pages/barang/ListBarang";
import FormBarang from "./pages/barang/FormBarang";

// Ruangan (sementara placeholder aman)
import ListRuangan from "./pages/ruangan/ListRuangan";
import FormRuangan from "./pages/ruangan/FormRuangan";

// Login (tidak dipakai untuk proteksi sementara)
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";

export default function App() {
  return (
    <Routes>

      <Route path="/login" element={<Login />} />

      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Dashboard />} />

        <Route path="/barang" element={<ListBarang />} />
        <Route path="/barang/tambah" element={<FormBarang />} />
        <Route path="/barang/edit/:id" element={<FormBarang />} />
        <Route path="/barang/view/:id" element={<FormBarang />} />

        <Route path="/ruangan" element={<ListRuangan />} />
        <Route path="/ruangan/tambah" element={<FormRuangan />} />
        <Route path="/ruangan/edit/:id" element={<FormRuangan />} />
        <Route path="/ruangan/view/:id" element={<FormRuangan />} />

        {/* Admin */}
      <Route path="/admin" element={<ListAdmin />} />
      <Route path="/admin/tambah" element={<FormAdmin mode="create" />} />
      <Route path="/admin/edit/:id" element={<FormAdmin mode="edit" />} />
      <Route path="/admin/view/:id" element={<FormAdmin mode="view" />} />
      </Route>
      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
