import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
// import Dashboard from "./pages/Dashboard";
// import ListAdmin from "./pages/admin/ListAdmin";
// import FormAdmin from "./pages/admin/FormAdmin";
// import ListBarang from "./pages/barang/ListBarang";
// import FormBarang from "./pages/barang/FormBarang";
// import ListRuangan from "./pages/ruangan/ListRuangan";
// import FormRuangan from "./pages/ruangan/FormRuangan";
// import Login from "./pages/Login";
// import PrivateRoute from "./components/PrivateRoute";

// Lazy load components for better performance (hanya load saat page  dibutuhkan)
const Login = lazy(() => import("./pages/Login"));
const PrivateRoute = lazy(() => import("./components/PrivateRoute"));
const Dashboard = lazy(() => import("./pages/Dashboard"));

const ListAdmin = lazy(() => import("./pages/admin/ListAdmin"));
const FormAdmin = lazy(() => import("./pages/admin/FormAdmin"));

const ListBarang = lazy(() => import("./pages/barang/ListBarang"));
const FormBarang = lazy(() => import("./pages/barang/FormBarang"));

const ListRuangan = lazy(() => import("./pages/ruangan/ListRuangan"));
const FormRuangan = lazy(() => import("./pages/ruangan/FormRuangan"));

export default function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<PrivateRoute />}>
          {/* Dashboard */}
          <Route path="/" element={<Dashboard />} />

          {/* Barang */}
          <Route path="/barang" element={<ListBarang />} />
          <Route path="/barang/tambah" element={<FormBarang />} />
          <Route path="/barang/edit/:id" element={<FormBarang />} />
          <Route path="/barang/view/:id" element={<FormBarang />} />

          {/* Ruangan */}
          <Route path="/ruangan" element={<ListRuangan />} />
          <Route path="/ruangan/tambah" element={<FormRuangan />} />
          <Route path="/ruangan/edit/:id" element={<FormRuangan />} />
          <Route path="/ruangan/view/:id" element={<FormRuangan />} />

          {/* Admin */}
          <Route path="/admin" element={<ListAdmin />} />
          <Route path="/admin/tambah" element={<FormAdmin mode="create" />} />
          <Route path="/admin/edit" element={<FormAdmin mode="edit" />} />
          <Route path="/admin/view/:id" element={<FormAdmin mode="view" />} />
          <Route
            path="/admin/password"
            element={<FormAdmin mode="password" />}
          />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}
