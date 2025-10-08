import Input from "../components/Input";
import { Lock } from "lucide-react";
import { User } from "lucide-react";
import { baseUrl } from "../api/api";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${baseUrl}/login`, formData);

      navigate("/");
      console.log("Response:", response.status);
    } catch (error) {
      if (error.response) {
        // Server memberikan response error, misal 401, 500
        console.error("Backend error:", error.response.data.message);
        setMessage(error.response.data.message);
      } else {
        // Error lain, misal jaringan
        console.error("Error:", error.message);
      }
    }
  };

  return (
    <div className="w-dvw h-dvh flex justify-center items-center bg-[url(/bg-login-2.jpg)]">
      <div className="w-xl h-[400px] p-4">
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
              type="password"
              placeholder="Password"
              name="password"
              required={true}
              value={formData.password}
              onChange={handleChange}
              className="outline-0 border-0"
            />
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
    <div className="flex items-center bg-gray-300/70 rounded-sm overflow-hidden w-[90%] pr-3 backdrop-blur-md">
      {children}
    </div>
  );
};
