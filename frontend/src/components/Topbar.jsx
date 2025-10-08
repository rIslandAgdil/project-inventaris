import { ChevronDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";

export default function Topbar({ breadcrumb = [], onOpenMenu }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

const handleLogout = async () => {
  const res = await Swal.fire({
    title: "Logout sekarang?",
    text: "Sesi kamu akan diakhiri.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Ya, logout",
    cancelButtonText: "Batal",
    reverseButtons: true,
    focusCancel: true,
    confirmButtonColor: "#e11d48",
  });

  if (!res.isConfirmed) return;

  localStorage.removeItem("token");
  setOpen(false);
  navigate("/Login");
};


  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b">
      <div className="max-w-7xl mx-auto px-3 md:px-6 py-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">

          {/* breadcrumb */}
          <nav className="text-sm text-slate-500 truncate">
            <ol className="flex items-center gap-2">
              {breadcrumb.map((item, i) => (
                <li key={i} className="flex items-center gap-2 truncate">
                  {i > 0 && <span className="text-slate-300">/</span>}
                  {item.to ? (
                    <Link to={item.to} className="hover:text-slate-700 truncate">
                      {item.label}
                    </Link>
                  ) : (
                    <span className="text-slate-900 font-medium truncate">
                      {item.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        </div>

        <div className="flex items-center gap-1 sm:gap-2 relative">

          <div className="relative">
            <button
              className="flex bg-slate-100 items-center gap-2 px-2 sm:px-3 py-2 rounded-lg hover:bg-gray-300"
              onClick={() => setOpen(!open)}
            >
              <span className="hidden sm:block text-sm font-medium">
                Nofryanti
              </span>
              <ChevronDown size={16} />
            </button>


            {open && (
              <div className="absolute right-0 mt-2 w-30 bg-rose-600 rounded-md shadow-lg justify hover:bg-red-700">
                <ul className="py-2 text-sm text-slate-700 text-center">
                  <li
                    className="cursor-pointer font-medium text-white"
                    onClick={handleLogout}
                  >
                    Logout
                  </li>
                </ul>
              </div>
            )}


          </div>
        </div>
      </div>
    </header>
  );
}