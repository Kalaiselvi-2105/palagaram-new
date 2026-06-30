import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Lock, User, ChefHat, Loader2 } from "lucide-react";
import { useAuth } from "./AdminApp";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [, setLocation] = useLocation();
  const { login } = useAuth();

  useEffect(() => {
    const saved = localStorage.getItem("palagaram_admin_remember");
    if (saved) setUsername(saved);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    const success = login(username, password);
    if (success) {
      if (rememberMe) localStorage.setItem("palagaram_admin_remember", username);
      else localStorage.removeItem("palagaram_admin_remember");
      setLocation("/admin/dashboard");
    } else {
      setError("Invalid credentials. Use admin / palagaram@2024");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center" style={{ background: "linear-gradient(135deg, #0d0604 0%, #1a0f0a 40%, #2d1810 70%, #1a0f0a 100%)" }}>
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              background: `radial-gradient(circle, rgba(212,175,55,${0.06 + i * 0.02}) 0%, transparent 70%)`,
              width: `${200 + i * 80}px`,
              height: `${200 + i * 80}px`,
              left: `${[10, 70, 30, 80, 5, 60][i]}%`,
              top: `${[20, 10, 60, 70, 80, 40][i]}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.8, 0.4],
              x: [0, 20, 0],
              y: [0, -15, 0],
            }}
            transition={{ duration: 4 + i * 1.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
          />
        ))}
        {/* Grid pattern */}
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(212,175,55,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.03) 1px, transparent 1px)`,
          backgroundSize: "60px 60px"
        }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        {/* Logo Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-4" style={{ background: "linear-gradient(135deg, #d4af37, #f0c040)", boxShadow: "0 0 40px rgba(212,175,55,0.4)" }}>
            <ChefHat className="w-10 h-10 text-stone-900" />
          </div>
          <h1 className="text-3xl font-bold tracking-wide" style={{ fontFamily: "'Playfair Display', serif", color: "#d4af37" }}>
            Palagaram
          </h1>
          <p className="text-sm mt-1" style={{ color: "rgba(212,175,55,0.6)" }}>Restaurant Management System</p>
        </motion.div>

        {/* Glass Card */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl p-8 border"
          style={{
            background: "rgba(255,255,255,0.04)",
            backdropFilter: "blur(20px)",
            borderColor: "rgba(212,175,55,0.2)",
            boxShadow: "0 25px 50px rgba(0,0,0,0.5), inset 0 1px 0 rgba(212,175,55,0.1)"
          }}
        >
          <h2 className="text-xl font-semibold mb-1" style={{ color: "#faf6f0" }}>Welcome back</h2>
          <p className="text-sm mb-6" style={{ color: "rgba(250,246,240,0.4)" }}>Sign in to your admin dashboard</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username */}
            <div>
              <label className="block text-xs font-medium mb-1.5 tracking-wider uppercase" style={{ color: "rgba(212,175,55,0.8)" }}>Username</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "rgba(212,175,55,0.5)" }} />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none transition-all"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(212,175,55,0.2)",
                    color: "#faf6f0",
                  }}
                  onFocus={(e) => e.target.style.borderColor = "rgba(212,175,55,0.6)"}
                  onBlur={(e) => e.target.style.borderColor = "rgba(212,175,55,0.2)"}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-medium mb-1.5 tracking-wider uppercase" style={{ color: "rgba(212,175,55,0.8)" }}>Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "rgba(212,175,55,0.5)" }} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full pl-10 pr-12 py-3 rounded-xl text-sm outline-none transition-all"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(212,175,55,0.2)",
                    color: "#faf6f0",
                  }}
                  onFocus={(e) => e.target.style.borderColor = "rgba(212,175,55,0.6)"}
                  onBlur={(e) => e.target.style.borderColor = "rgba(212,175,55,0.2)"}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 transition-colors"
                  style={{ color: "rgba(212,175,55,0.5)" }}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded accent-yellow-500"
                />
                <span className="text-sm" style={{ color: "rgba(250,246,240,0.5)" }}>Remember me</span>
              </label>
              <button type="button" className="text-sm transition-colors" style={{ color: "rgba(212,175,55,0.7)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#d4af37")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(212,175,55,0.7)")}>
                Forgot password?
              </button>
            </div>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-sm px-3 py-2 rounded-lg text-center"
                  style={{ background: "rgba(239,68,68,0.15)", color: "#fca5a5", border: "1px solid rgba(239,68,68,0.3)" }}
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={loading || !username || !password}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full py-3 rounded-xl font-semibold text-sm tracking-wider transition-all flex items-center justify-center gap-2 disabled:opacity-60"
              style={{ background: "linear-gradient(135deg, #d4af37, #f0c040)", color: "#1a0f0a", boxShadow: "0 4px 20px rgba(212,175,55,0.3)" }}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Authenticating...
                </>
              ) : (
                "Sign In to Dashboard"
              )}
            </motion.button>
          </form>

          <div className="mt-6 pt-6 text-center" style={{ borderTop: "1px solid rgba(212,175,55,0.1)" }}>
            <p className="text-xs" style={{ color: "rgba(250,246,240,0.3)" }}>
              Secured Admin Access · Palagaram Restaurant
            </p>
          </div>
        </motion.div>

        <p className="text-center mt-4 text-xs" style={{ color: "rgba(212,175,55,0.3)" }}>
          Demo: admin / palagaram@2024
        </p>
      </motion.div>
    </div>
  );
}
