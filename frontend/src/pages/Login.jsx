import { useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../services/api";


const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen bg-[#FBF8F4] flex items-center justify-center px-4">

      {/* LOGIN CARD */}
      <div
        className="
          bg-white
          w-full
          max-w-md
          p-10
          rounded-2xl
          border
          border-[#E8DED4]
          shadow-[0_10px_40px_rgba(0,0,0,0.05)]
        "
      >
        {/* TITLE */}
        <h2 className="text-3xl font-semibold text-center text-[#3A2F2A] mb-3">
          Welcome Back
        </h2>

        {/* SUBTEXT */}
        <p className="text-center text-sm text-[#6B5B52] mb-10">
          Login to continue preserving and exploring cultural stories
        </p>

        {/* FORM */}
        <form className="space-y-6">

          {/* EMAIL */}
          <div>
            <label className="block text-sm mb-1 text-[#3A2F2A]">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder=""
              className="
                w-full
                px-4
                py-2.5
                border
                border-[#E6DCD2]
                rounded-lg
                focus:outline-none
                focus:border-[#A89CC8]
                focus:ring-1
                focus:ring-[#C6BDE2]
              "
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-sm mb-1 text-[#3A2F2A]">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=""
              className="
                w-full
                px-4
                py-2.5
                border
                border-[#E6DCD2]
                rounded-lg
                focus:outline-none
                focus:border-[#A89CC8]
                focus:ring-1
                focus:ring-[#C6BDE2]
              "
            />
          </div>

          {/* LOGIN BUTTON */}
          <button
            type="button"
            onClick={async () => {
              try {
                const res = await API.post("/auth/login", {
                  email,
                  password,
                });

                localStorage.setItem("token", res.data.token);
                localStorage.setItem("role", res.data.role);
                localStorage.setItem(
                  "userName",
                  res.data.name || email
                );
                
                
               

                if (res.data.role === "admin") {
                  navigate("/admin");
                } else {
                  navigate("/addstory");
                }
              } catch (err) {
                alert(err.response?.data?.msg || "Login failed");
              }
            }}
            className="
              w-full
              bg-[#A89CC8]
              text-white
              py-2.5
              rounded-lg
              font-medium
              hover:bg-[#9488B8]
              transition
            "
          >
            Login
          </button>
        </form>

        {/* FOOTER */}
        <p className="text-center text-sm mt-8 text-[#6B5B52]">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-[#7A6BB7] cursor-pointer hover:underline"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
