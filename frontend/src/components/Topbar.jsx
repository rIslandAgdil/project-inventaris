import { ChevronDown, Menu } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";

export default function Topbar({ breadcrumb = [], onOpenMenu }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { setAuth, username } = useContext(AuthContext);

  const handleLogout = async () => {
    const { isConfirmed } = await Swal.fire({
      title: "Logout sekarang?",
      text: "Sesi kamu akan diakhiri.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, logout",
      cancelButtonText: "Batal",
      confirmButtonColor: "#e11d48",
      reverseButtons: true,
    });
    if (!isConfirmed) return;

    // HAPUS DATA LOGIN DI LOCALSTORAGE
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    localStorage.removeItem("idUser");

    setAuth({ username: null, token: null, idUser: null });

    setOpen(false);
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b">
      <div className="max-w-7xl mx-auto px-3 md:px-6 py-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          {/* button menu saat mobile */}
          <button
            className="lg:hidden p-2 rounded-md hover:bg-slate-100"
            onClick={onOpenMenu}
            aria-label="Buka menu"
          >
            <Menu size={20} />
          </button>

          {!!breadcrumb.length && (
            <ol className="flex items-center gap-2 text-sm text-slate-500 truncate">
              {breadcrumb.map((item, i) => (
                <li key={i} className="flex items-center gap-2 truncate">
                  {i > 0 && <span className="text-slate-300">/</span>}
                  {item.to ? (
                    <Link
                      to={item.to}
                      className="hover:text-slate-700 truncate"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span className="truncate">{item.label}</span>
                  )}
                </li>
              ))}
            </ol>
          )}
        </div>

        <div className="relative">
          <button
            className="flex items-center gap-2 px-3 py-1.5 rounded-md border hover:bg-slate-50"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="text-sm">{username}</span>
            <ChevronDown size={16} />
          </button>
          {open && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow overflow-hidden tracking-wide z-999">
              <div
                className="w-full text-left px-3 py-2 text-sm hover:bg-slate-600 hover:text-white cursor-pointer"
                onClick={() => navigate(`/admin/edit`)}
              >
                Edit Profile
              </div>
              <div
                className="w-full text-left px-3 py-2 text-sm hover:bg-slate-600 hover:text-white cursor-pointer border-gray-300 border-t border-b"
                onClick={() => navigate(`/admin/password`)}
              >
                Ganti Password
              </div>
              <div
                className="w-full text-left px-3 py-2 text-sm hover:bg-slate-600 hover:text-white cursor-pointer"
                onClick={handleLogout}
              >
                Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
