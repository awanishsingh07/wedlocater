import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (data.status === "ok") {
      toast.success("Registered successfully!");
      setTimeout(() => navigate("/"), 1500); // Go to login
    } else {
      setError(data.error || "Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-blue-900 p-8 rounded-xl shadow-lg w-full max-w-md text-white">
        <h2 className="text-3xl font-bold mb-6 text-center">Register</h2>
        {error && <p className="text-red-400 text-sm text-center">{error}</p>}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            name="name"
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 rounded bg-blue-800 text-white placeholder-gray-300"
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 rounded bg-blue-800 text-white placeholder-gray-300"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-3 rounded bg-blue-800 text-white placeholder-gray-300"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white p-3 rounded font-semibold"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <a href="/" className="text-blue-300 underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
