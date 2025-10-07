import Input from "../components/Input";
import { Lock } from "lucide-react";
import { User } from "lucide-react";

function Login() {
  return (
    <div className="w-dvw h-dvh flex justify-center items-center bg-[url(/bg-login-2.jpg)]">
      <div className="w-xl h-[400px] p-4">
        <img
          src="./profile.png"
          alt="profile"
          className="w-35 aspect-square mx-auto mb-15"
        />
        <form
          action=""
          className="flex flex-col gap-6 justify-center items-center"
        >
          <div className="flex items-center bg-gray-300/70 rounded-sm overflow-hidden w-[90%] pr-3 backdrop-blur-md">
            <User
              color="currentColor"
              className="w-20 h-15 bg-gray-300/30 p-2"
            />
            <Input type="text" placeholder="Username" />
          </div>
          <div className="flex items-center bg-gray-300/70 rounded-sm overflow-hidden w-[90%] pr-3 backdrop-blur-md">
            <Lock
              color="currentColor"
              className="w-20 h-15 bg-gray-300/10 p-2"
            />
            <Input type="password" placeholder="Password" />
          </div>
          <button
            type="submit"
            className="hover:cursor-pointer hover:bg-gray-900 backdrop-blur-md bg-gray-900/50 px-4 py-3 w-[40%] text-gray-200 tracking-widest text-xl mt-5"
          >
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
