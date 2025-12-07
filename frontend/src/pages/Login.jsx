import { useState } from "react";
import toast from "react-hot-toast";

// Login Page Component
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle form submission
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");

      // Save the tokens + role
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("username", username);

      toast.success("Welcome back ✨");

      
      window.location.href = "/employees";

    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  
  return (
    <div className="
      h-screen w-full flex items-center justify-center 
      bg-gradient-to-br from-slate-100 to-slate-200 
      relative overflow-hidden
    ">

      {/* Glow circles */}
      <div className="absolute top-10 left-10 w-60 h-60 bg-blue-200 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-200 rounded-full blur-3xl opacity-30"></div>

      <div className="
        backdrop-blur-2xl bg-white/40 
        border border-white/20 shadow-2xl 
        rounded-3xl p-10 w-[420px]
        transform transition-all duration-300
        hover:shadow-[0_8px_40px_rgba(0,0,0,0.15)]
      ">
        <h2 className="text-3xl font-semibold text-center mb-8 tracking-tight text-slate-800">
          UltraShip Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Username */}
          <div className="relative">
            <input
              type="text"
              className="
                w-full px-4 py-3 rounded-xl border border-slate-300 
                bg-white/60 backdrop-blur-sm
                focus:ring-2 focus:ring-blue-500 outline-none
                transition-all
              "
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label className="
              absolute left-4 -top-3 bg-white/60 px-2 text-xs text-slate-600
            ">
              Username
            </label>
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type="password"
              className="
                w-full px-4 py-3 rounded-xl border border-slate-300 
                bg-white/60 backdrop-blur-sm
                focus:ring-2 focus:ring-blue-500 outline-none
                transition-all
              "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label className="
              absolute left-4 -top-3 bg-white/60 px-2 text-xs text-slate-600
            ">
              Password
            </label>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full py-3 rounded-xl font-medium 
              bg-blue-600 text-white shadow-lg shadow-blue-300
              hover:bg-blue-700 active:scale-[0.98]
              transition-all
            "
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
