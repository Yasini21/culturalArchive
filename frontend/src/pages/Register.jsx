import { useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../services/api";
import loginImg from "../assets/images/login.jpg";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen bg-[#F7F3EE]">

      {/* 🖼️ TOP IMAGE */}
      <div className="w-full h-56 md:h-48 lg:h-56">
        <img
          src={loginImg}
          alt="Cultural heritage"
          className="w-full h-full object-cover object-top md:object-center"
        />
      </div>

      {/* 📝 REGISTER CARD */}
      <div className="flex justify-center px-4 py-10">
        <div
          className="
            bg-white
            w-full
            max-w-md
            p-8
            rounded-xl
            border border-[#E6DCD2]
            shadow-sm
          "
        >
          {/* TITLE */}
          <h2 className="text-2xl font-semibold text-center text-[#3E2F2F] mb-2">
            Create an Account
          </h2>

          {/* SUBTEXT */}
          <p className="text-center text-sm text-[#5A4A42] mb-8">
            Join us to preserve and share cultural stories
          </p>

          {/* FORM */}
          <form className="space-y-5">
            {/* NAME */}
            <div>
              <label className="block text-sm mb-1 text-[#3E2F2F]">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="
                  w-full
                  px-4 py-2
                  border border-[#E6DCD2]
                  rounded-lg
                  focus:outline-none
                  focus:border-[#B08968]
                "
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="block text-sm mb-1 text-[#3E2F2F]">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="
                  w-full
                  px-4 py-2
                  border border-[#E6DCD2]
                  rounded-lg
                  focus:outline-none
                  focus:border-[#B08968]
                "
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-sm mb-1 text-[#3E2F2F]">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 6 characters"
                className="
                  w-full
                  px-4 py-2
                  border border-[#E6DCD2]
                  rounded-lg
                  focus:outline-none
                  focus:border-[#B08968]
                "
              />
            </div>

            {/* REGISTER BUTTON */}
            <button
              type="button"
              onClick={async () => {
                try {
                  await API.post("/auth/register", {
                    name,
                    email,
                    password,
                  });
                  alert("Registration successful! Please login.");
                  navigate("/login");
                } catch (err) {
                  alert(err.response?.data?.msg || "Registration failed");
                }
              }}
              className="
                w-full
                bg-[#7F5539]
                text-white
                py-2
                rounded-lg
                font-medium
                hover:bg-[#9C6644]
                transition
              "
            >
              Register
            </button>
          </form>

          {/* FOOTER */}
          <p className="text-center text-sm mt-6 text-[#5A4A42]">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-[#7F5539] cursor-pointer hover:underline"
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
