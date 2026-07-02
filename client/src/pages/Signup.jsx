import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const Signup = () => {
  const navigate = useNavigate();
  const { signup, isLoading } = useAuthStore();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await signup(formData);

    if (success) navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] px-6">
      <div className="max-w-7xl mx-auto min-h-screen grid lg:grid-cols-2 gap-16 items-center">

        {/* Left Side */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            AI-TALK
          </h1>

          <h2 className="mt-8 text-5xl md:text-6xl font-bold leading-tight tracking-tight text-slate-900">
            Create your workspace.
          </h2>

          <p className="mt-5 text-lg text-slate-500 max-w-lg leading-relaxed">
            Start smarter AI conversations with a fast, clean and private workspace.
          </p>
        </motion.div>

        {/* Right Side */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-slate-200 rounded-[32px] p-10 shadow-sm"
        >
          <h3 className="text-3xl font-bold text-slate-900">
            Create Account
          </h3>

          <p className="mt-2 text-slate-500">
            Join AI-TALK in seconds.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">
                Full Name
              </label>

              <div className="flex items-center gap-3 border border-slate-200 rounded-2xl px-4 py-4 focus-within:border-slate-400 transition">
                <User size={18} className="text-slate-400" />

                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: e.target.value,
                    })
                  }
                  placeholder="John Doe"
                  className="flex-1 bg-transparent outline-none text-slate-900 placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">
                Email
              </label>

              <div className="flex items-center gap-3 border border-slate-200 rounded-2xl px-4 py-4 focus-within:border-slate-400 transition">
                <Mail size={18} className="text-slate-400" />

                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      email: e.target.value,
                    })
                  }
                  placeholder="you@example.com"
                  className="flex-1 bg-transparent outline-none text-slate-900 placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">
                Password
              </label>

              <div className="flex items-center gap-3 border border-slate-200 rounded-2xl px-4 py-4 focus-within:border-slate-400 transition">
                <Lock size={18} className="text-slate-400" />

                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      password: e.target.value,
                    })
                  }
                  placeholder="Create password"
                  className="flex-1 bg-transparent outline-none text-slate-900 placeholder:text-slate-400"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-slate-400 hover:text-slate-700 transition"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 rounded-2xl bg-slate-900 text-white font-semibold hover:bg-black transition disabled:opacity-60"
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <p className="mt-6 text-sm text-slate-500 text-center">
            By continuing, you agree to our Terms and Privacy Policy.
          </p>

          <p className="mt-6 text-slate-500 text-center">
            Already have an account?
            <Link
              to="/login"
              className="ml-2 font-medium text-slate-900"
            >
              Sign In
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;