import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ListBarang from "./pages/barang/ListBarang"; 
import FormBarang from "./pages/barang/FormBarang"; 
import FormRuangan from "./pages/ruangan/FormRuangan";
import ListRuangan from "./pages/ruangan/ListRuangan";
import ListAdmin from "./pages/admin/ListAdmin";
import FormAdmin from "./pages/admin/FormAdmin";
import Login from "./pages/Login"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />

      <Route path="/barang" element={<ListBarang />} />
      <Route path="/barang/tambah" element={<FormBarang />} />
      <Route path="/barang/edit/:id" element={<FormBarang />} />
      <Route path="/barang/view/:id" element={<FormBarang />} />

      <Route path="/ruangan" element={<ListRuangan />} />
      <Route path="/ruangan/tambah" element={<FormRuangan />} />
      <Route path="/ruangan/edit/:id" element={<FormRuangan />} />
      <Route path="/ruangan/view/:id" element={<FormRuangan />} />

      <Route path="/admin" element={<ListAdmin />} />
      <Route path="/admin/tambah" element={<FormAdmin />} />
      <Route path="/admin/edit/:id" element={<FormAdmin />} />
      <Route path="/admin/view/:id" element={<FormAdmin />} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
