import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Input from "./Input";
import Button from "./Button";
import axios from "axios";
import { baseUrl } from "../config/Constants";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";

function Form({ mode = "create" }) {
  const [form, setForm] = useState({ name: "", status: "aktif" });
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const isReadOnly = mode === "view";

  const title =
    mode === "create"
      ? "Tambah Barang"
      : mode === "edit"
      ? "Edit barang"
      : "Detail barang";

  useEffect(() => {
    if ((mode === "edit" || mode === "view") && id) {
      axios
        .get(`${baseUrl}/barang/${id}`)
        .then((res) => {
          const { name, status } = res.data.data;
          setForm({ name, status });
        })
        .catch(() => {
          Swal.fire("Error", "Gagal mengambil data", "error");
          navigate("/barang");
        });
    }
  }, [id, mode, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (mode === "create") {
        await axios.post(`${baseUrl}/barang`, form, {
          headers: { Authorization: `Bearer ${user.accessToken}` },
        });
      } else if (mode === "edit" && id) {
        await axios.put(`${baseUrl}/barang/${id}`, form, {
          headers: { Authorization: `Bearer ${user.accessToken}` },
        });
      }
      Swal.fire("Berhasil", "Data barang disimpan", "success");
      navigate("/barang");
    } catch (err) {
      Swal.fire("Gagal", err.response?.data?.message || "Terjadi kesalahan", "error");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-blue-700 mb-4">{title}</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Nama barang"
            required
            readOnly={isReadOnly}
          />
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            disabled={isReadOnly}
            className="p-2 border rounded"
          >
            <option value="aktif">Aktif</option>
            <option value="nonaktif">Nonaktif</option>
          </select>

          <div className="flex gap-2 justify-end">
            {!isReadOnly && (
              <Button type="submit" variant="primary">
                Simpan
              </Button>
            )}
            <Button type="button" variant="secondary" onClick={() => navigate("/barang")}>
              Kembali
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Form;