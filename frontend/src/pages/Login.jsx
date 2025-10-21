import Input from "../components/Input";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { User, Lock, Eye, EyeOff } from "lucide-react";
import { login } from "../services";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const { token, username, idUser } = await login(formData);
      console.log(token, username, idUser);

      // SIMPAN DATA LOGIN DI LOCALSTORAGE
      // biar pas refresh halaman, data login ga ilang
      // dan bisa diakses di context
      // (tapi kalo mau lebih aman, pake httpOnly cookie aja)
      localStorage.setItem("token", JSON.stringify(token));
      localStorage.setItem("username", JSON.stringify(username));
      localStorage.setItem("idUser", JSON.stringify(idUser));
      setAuth({ token, username, idUser });

      navigate("/");
    } catch (error) {
      const msg =
        error?.response?.data?.message || error.message || "Login gagal";
      console.error("Login error:", msg);
      setMessage(msg);
    }
  };

  return (
    <div className="w-dvw h-dvh flex justify-center items-center bg-[url(/bg-login-2.jpg)]">
      <div className="w-xl p-4">
        <img
          src="./profile.png"
          alt="profile"
          className="w-35 aspect-square mx-auto mb-15"
        />

        <form
          onSubmit={handleSubmit}
          method="POST"
          className="flex flex-col gap-6 justify-center items-center"
        >
          <InputLogin>
            <User
              color="currentColor"
              className="w-20 h-15 bg-gray-300/30 p-3"
            />
            <Input
              type="email"
              placeholder="Email"
              name="email"
              required={true}
              value={formData.email}
              onChange={handleChange}
              className="outline-0 border-0"
            />
          </InputLogin>

          <InputLogin>
            <Lock
              color="currentColor"
              className="w-20 h-15 bg-gray-300/10 p-3"
            />
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              name="password"
              required={true}
              value={formData.password}
              onChange={handleChange}
              className="outline-0 border-0"
            />
            {showPassword ? (
              <Eye
                size={30}
                color="currentColor"
                className="absolute right-0 mr-3 hover:cursor-pointer"
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <EyeOff
                color="currentColor"
                size={30}
                className="absolute right-0 mr-3 hover:cursor-pointer"
                onClick={() => setShowPassword(true)}
              />
            )}
          </InputLogin>

          {message && (
            <p className="py-2 text-white text-center bg-red-800 rounded w-[60%] mx-auto">
              {message}
            </p>
          )}

          <button
            type="submit"
            className="hover:cursor-pointer hover:bg-gray-900 backdrop-blur-3xl bg-gray-900/30 px-4 py-3 w-[40%] text-gray-200 tracking-widest text-xl mt-5"
          >
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;

const InputLogin = ({ children }) => {
  return (
    <div className="relative flex items-center bg-gray-300/70 rounded-sm overflow-hidden w-[90%] backdrop-blur-md">
      {children}
    </div>
  );
};
