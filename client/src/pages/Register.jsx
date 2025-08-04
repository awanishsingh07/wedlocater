import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    console.log("Register Response:", data);

    if (data.status === "ok") {
      toast.success("Registration successful! Please login.");
      navigate("/login");
    } else {
      toast.error(data.error || "Something went wrong.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#fefdfb] font-serif px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-[#e6dccf]">
        <h2 className="text-3xl font-bold mb-6 text-center text-[#b28a64]">
          Register
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            name="name"
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 rounded border border-[#d8c5b1] focus:outline-none focus:ring-2 focus:ring-[#b28a64] placeholder-gray-500"
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 rounded border border-[#d8c5b1] focus:outline-none focus:ring-2 focus:ring-[#b28a64] placeholder-gray-500"
            required
          />

          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full p-3 rounded border border-[#d8c5b1] focus:outline-none focus:ring-2 focus:ring-[#b28a64] placeholder-gray-500"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-3 text-sm text-[#b28a64]"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-[#b28a64] hover:bg-[#9a7356] text-white p-3 rounded-full font-semibold transition shadow"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-[#5a4637]">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#b28a64] underline hover:text-[#9a7356]"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
